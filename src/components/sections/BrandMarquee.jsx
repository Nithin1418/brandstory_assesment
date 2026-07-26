"use client";

import Image from "next/image";
import brandMarqueeData from "@/data/brandMarquee.json";

function MarqueeRow({ brands, direction = "left", speed = 38 }) {
    // Duplicate the list so the loop is seamless.
    const items = [...brands, ...brands, ...brands];

    return (
        <div className="marquee-row group relative flex w-full overflow-hidden">
            {/* edge fade masks */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#0a0714] to-transparent md:w-32" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#0a0714] to-transparent md:w-32" />

            <div
                className={`marquee-track marquee-${direction} flex shrink-0 items-center gap-12 pr-12 md:gap-16 md:pr-16`}
                style={{ "--marquee-speed": `${speed}s` }}
            >
                {items.map((brand, i) => (
                    <span
                        key={`${brand.slug}-${i}`}
                        className="relative flex h-14 w-32 shrink-0 items-center justify-center opacity-70 grayscale transition duration-200 hover:opacity-100 hover:grayscale-0 md:h-16 md:w-40"
                    >
                        <Image
                            src={`/assets/brands/${brand.slug}.png`}
                            alt={brand.name}
                            fill
                            sizes="160px"
                            className="object-contain p-1"
                        />
                    </span>
                ))}
            </div>
        </div>
    );
}

export default function BrandMarquee() {
    return (
        <div className="flex h-[40vh] flex-col items-center justify-center gap-8 px-6">
            <p className="text-xl tracking-wide text-white/60">
                {brandMarqueeData.title}
            </p>

            <div className="flex w-full flex-col gap-8">
                <MarqueeRow brands={brandMarqueeData.brandsRow1} direction="left" speed={38} />
                <MarqueeRow brands={brandMarqueeData.brandsRow2} direction="right" speed={38} />
            </div>
        </div>
    );
}