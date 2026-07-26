/**
 * trim-brand-logos.mjs
 *
 * Batch-trims transparent (or solid-color) padding from every PNG in
 * /public/assets/brands and writes the result back in place (with a
 * backup of the originals in /public/assets/brands/_originals).
 *
 * Why: object-contain fits the WHOLE canvas of a PNG into its box, so
 * logos exported with extra transparent margin end up looking tiny
 * next to tightly-cropped logos. Trimming makes every logo's canvas
 * match its actual visible content, so they all scale consistently.
 *
 * Usage:
 *   npm install sharp
 *   node trim-brand-logos.mjs
 *
 * Optional flags:
 *   --dir=./public/assets/brands   (defaults to this path)
 *   --padding=6                    (px of padding to re-add after trim)
 *   --dry-run                      (report what would change, don't write)
 */

import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const args = Object.fromEntries(
    process.argv.slice(2).map((arg) => {
        const [key, value] = arg.replace(/^--/, "").split("=");
        return [key, value ?? true];
    })
);

const BRANDS_DIR = path.resolve(args.dir || "./public/assets/brands");
const BACKUP_DIR = path.join(BRANDS_DIR, "_originals");
const RE_PADDING = Number(args.padding ?? 6); // px of transparent padding to re-add
const DRY_RUN = Boolean(args["dry-run"]);

async function main() {
    let entries;
    try {
        entries = await fs.readdir(BRANDS_DIR, { withFileTypes: true });
    } catch (err) {
        console.error(`Could not read directory: ${BRANDS_DIR}`);
        console.error(err.message);
        process.exit(1);
    }

    const pngFiles = entries
        .filter((e) => e.isFile() && e.name.toLowerCase().endsWith(".png"))
        .map((e) => e.name);

    if (pngFiles.length === 0) {
        console.log(`No PNG files found in ${BRANDS_DIR}`);
        return;
    }

    if (!DRY_RUN) {
        await fs.mkdir(BACKUP_DIR, { recursive: true });
    }

    console.log(
        `${DRY_RUN ? "[DRY RUN] " : ""}Trimming ${pngFiles.length} PNG(s) in ${BRANDS_DIR}\n`
    );

    const results = [];

    for (const file of pngFiles) {
        const fullPath = path.join(BRANDS_DIR, file);

        try {
            const original = sharp(fullPath);
            const meta = await original.metadata();

            // trim: removes "edge" pixels that match the color of the
            // top-left pixel (handles both transparent and solid-fill
            // padding), then we re-add a small uniform padding so logos
            // aren't touching the very edge of their box.
            const trimmedBuffer = await sharp(fullPath)
                .trim({ threshold: 10 })
                .extend({
                    top: RE_PADDING,
                    bottom: RE_PADDING,
                    left: RE_PADDING,
                    right: RE_PADDING,
                    background: { r: 0, g: 0, b: 0, alpha: 0 },
                })
                .png()
                .toBuffer();

            const trimmedMeta = await sharp(trimmedBuffer).metadata();

            const before = `${meta.width}x${meta.height}`;
            const after = `${trimmedMeta.width}x${trimmedMeta.height}`;
            const changed = before !== after;

            results.push({ file, before, after, changed });

            if (!DRY_RUN && changed) {
                // back up original first
                await fs.copyFile(fullPath, path.join(BACKUP_DIR, file));
                await fs.writeFile(fullPath, trimmedBuffer);
            }
        } catch (err) {
            results.push({ file, error: err.message });
        }
    }

    const nameWidth = Math.max(...results.map((r) => r.file.length), 20);

    for (const r of results) {
        if (r.error) {
            console.log(`  ✗ ${r.file.padEnd(nameWidth)}  ERROR: ${r.error}`);
        } else {
            const marker = r.changed ? "✓ trimmed" : "  no change";
            console.log(
                `  ${r.changed ? "✓" : "·"} ${r.file.padEnd(nameWidth)}  ${r.before.padEnd(11)} -> ${r.after.padEnd(11)} ${r.changed ? "" : "(already tight)"}`
            );
        }
    }

    const changedCount = results.filter((r) => r.changed).length;
    console.log(
        `\n${DRY_RUN ? "Would trim" : "Trimmed"} ${changedCount}/${pngFiles.length} file(s).`
    );
    if (!DRY_RUN && changedCount > 0) {
        console.log(`Originals backed up to: ${BACKUP_DIR}`);
    }
    if (DRY_RUN) {
        console.log("Run again without --dry-run to write changes.");
    }
}

main();
