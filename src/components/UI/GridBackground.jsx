"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// ---- tune these ----
const CELL_SIZE = 70; // px, matches the reference screenshot

// traveling shine lines along full column height
// Direction is assigned by odd/even line number instead of a hardcoded list —
// this way it auto-adapts whenever CELL_SIZE changes and the column count shifts.
const ODD_LINES_DIRECTION = "top-to-bottom"; // "top-to-bottom" | "bottom-to-top"
// even-numbered lines automatically get the opposite direction

const SHINE_STREAK_HEIGHT = 50; // px length of the traveling glow
const SHINE_DURATION = [10, 18]; // seconds, [min, max] per one-way pass — slow & smooth
const SHINE_REPEAT_DELAY = [2, 5]; // pause between passes

// ---- filled cell pattern ----
// The reference screenshot has no repeating formula (not a checkerboard,
// not every-nth-diagonal) — it's a sparse RANDOM scatter with one rule:
// no two filled cells may touch, including diagonally. That's what keeps
// them visually separated instead of clumping into a bigger blob.
const FILL_CELL_DENSITY = 0.03; // ~3% of cells filled, matches reference density
const FILL_CELL_BG = "rgba(167, 139, 250, 0.12)"; // brighter than the 0.08 grid lines
const FILL_CELL_BORDER = "1px solid rgb(196 181 253 / 0%);";

// Picks random (row, col) cells such that no two chosen cells are
// adjacent — including diagonal neighbors — so filled squares never
// touch or merge into a bigger shape.
function generateNonTouchingCells(rows, cols, density) {
    const targetCount = Math.max(1, Math.round(rows * cols * density));
    const occupied = new Set();
    const chosen = [];

    const isFree = (r, c) => {
        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
                if (occupied.has(`${r + dr},${c + dc}`)) return false;
            }
        }
        return true;
    };

    // Cap attempts so we bail out gracefully on tiny/dense grids instead
    // of looping forever once free spots run out.
    const maxAttempts = targetCount * 40;
    let attempts = 0;
    while (chosen.length < targetCount && attempts < maxAttempts) {
        attempts++;
        const r = Math.floor(Math.random() * rows);
        const c = Math.floor(Math.random() * cols);
        if (isFree(r, c)) {
            occupied.add(`${r},${c}`);
            chosen.push({ row: r, col: c });
        }
    }
    return chosen;
}

export default function GridBackground() {
    const containerRef = useRef(null);
    const cleanupRefs = useRef([]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let ctx;
        const raf = requestAnimationFrame(() => {
            const width = container.offsetWidth;
            const height = container.offsetHeight;
            const cols = Math.ceil(width / CELL_SIZE);
            const rows = Math.ceil(height / CELL_SIZE);

            container
                .querySelectorAll("[data-shine-col], [data-fill-cell]")
                .forEach((el) => el.remove());
            const createdEls = [];

            // filled cells — sparse, random, never touching (see generator above)
            const filledCells = generateNonTouchingCells(rows, cols, FILL_CELL_DENSITY);
            filledCells.forEach(({ row, col }) => {
                const cellEl = document.createElement("div");
                cellEl.dataset.fillCell = "true";
                Object.assign(cellEl.style, {
                    position: "absolute",
                    top: `${row * CELL_SIZE}px`,
                    left: `${col * CELL_SIZE}px`,
                    width: `${CELL_SIZE}px`,
                    height: `${CELL_SIZE}px`,
                    background: FILL_CELL_BG,
                    border: FILL_CELL_BORDER,
                    boxSizing: "border-box",
                });
                container.appendChild(cellEl);
                createdEls.push(cellEl);
            });

            ctx = gsap.context(() => {
                // every internal vertical line, 1..cols-1
                const allLines = Array.from({ length: cols - 1 }, (_, i) => i + 1);

                const oddIsTopToBottom = ODD_LINES_DIRECTION === "top-to-bottom";

                const shineCols = allLines.map((col) => {
                    const isOdd = col % 2 === 1;
                    const topToBottom = isOdd ? oddIsTopToBottom : !oddIsTopToBottom;
                    return { col, topToBottom };
                });

                shineCols.forEach(({ col, topToBottom }) => {
                    const x = col * CELL_SIZE;

                    // clipping wrapper so the streak disappears at the grid edges
                    const wrapper = document.createElement("div");
                    wrapper.dataset.shineCol = "true";
                    Object.assign(wrapper.style, {
                        position: "absolute",
                        top: "0px",
                        left: `${x}px`,
                        width: "1px",
                        height: `${height}px`,
                        overflow: "hidden",
                        transform: "translateX(-0.5px)",
                    });

                    const streak = document.createElement("div");
                    Object.assign(streak.style, {
                        position: "absolute",
                        left: "0px",
                        width: "2px",
                        height: `${SHINE_STREAK_HEIGHT}px`,
                        marginLeft: "-0.5px",
                        background:
                            "linear-gradient(to bottom, rgba(167,139,250,0), rgba(196,181,253,0.95) 50%, rgba(167,139,250,0))",
                        boxShadow: "0 0 12px 1px rgba(167,139,250,0.6)",
                        top: topToBottom ? `${-SHINE_STREAK_HEIGHT}px` : `${height}px`,
                    });

                    wrapper.appendChild(streak);
                    container.appendChild(wrapper);
                    createdEls.push(wrapper);

                    gsap.to(streak, {
                        top: topToBottom ? height : -SHINE_STREAK_HEIGHT,
                        duration: gsap.utils.random(SHINE_DURATION[0], SHINE_DURATION[1]),
                        ease: "sine.inOut",
                        repeat: -1,
                        delay: gsap.utils.random(0, 3),
                        repeatDelay: gsap.utils.random(
                            SHINE_REPEAT_DELAY[0],
                            SHINE_REPEAT_DELAY[1]
                        ),
                    });
                });
            }, container);

            cleanupRefs.current = createdEls;
        });

        return () => {
            cancelAnimationFrame(raf);
            ctx?.revert();
            cleanupRefs.current.forEach((el) => el.remove());
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="pointer-events-none absolute inset-0 overflow-hidden"
            style={{
                backgroundImage:
                    "linear-gradient(rgba(139,92,246,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.08) 1px, transparent 1px)",
                backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`,
            }}
        />
    );
}