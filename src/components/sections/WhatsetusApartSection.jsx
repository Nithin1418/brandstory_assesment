"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronUp } from "lucide-react";
import SplitTextTitle from "@/components/UI/SplitTextTitle";
import whatSetsUsApartData from "@/data/whatSetsUsApart.json";

export default function WhatSetsUsApartSection() {
    const [openIndex, setOpenIndex] = useState(0);
    const containerRef = useRef(null);
    const imageRefs = useRef([]);

    const toggle = (i) => setOpenIndex((prev) => (prev === i ? -1 : i));

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let ticking = false;

        const applyParallax = () => {
            const rect = container.getBoundingClientRect();
            const viewportH = window.innerHeight || 1;

            // progress goes from -0.5 (section below viewport) to 0.5
            // (section above viewport), 0 when centered in view.
            const progress =
                (viewportH / 2 - (rect.top + rect.height / 2)) /
                (viewportH / 2 + rect.height / 2);

            imageRefs.current.forEach((el, i) => {
                if (!el) return;
                const speed = whatSetsUsApartData.floatingImages[i]?.speed || 0.1;
                const offset = progress * speed * 100; // px
                el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
            });

            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(applyParallax);
                ticking = true;
            }
        };

        applyParallax();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);

    return (
        <section className="bg-[var(--background-main)] py-16 sm:py-20 lg:py-24">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-8">
                <h2 className="mx-auto max-w-2xl text-center text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-4xl">
                    <SplitTextTitle text={whatSetsUsApartData.title} justify="center" />
                </h2>

                <div className="mt-12 grid grid-cols-1 items-stretch gap-4 lg:grid-cols-[40%_60%] lg:gap-6">
                    {/* Left: image section with parallax floating images */}
                    <div
                        ref={containerRef}
                        className="relative w-full h-[450px] sm:h-[550px] lg:h-full overflow-hidden rounded-[28px] bg-gradient-to-br from-violet-50 via-white to-violet-50 shadow-2xl shadow-black/30"
                    >
                        {/* Center image — pinned to the bottom of the card, no parallax movement */}
                        <div className="absolute inset-0">
                            <Image
                                src="/assets/setusaprt/center.png"
                                alt="Digital marketing strategist reviewing analytics on a laptop"
                                fill
                                className="object-contain object-bottom"
                                priority
                            />
                        </div>

                        {/* Floating images */}
                        {whatSetsUsApartData.floatingImages.map((img, i) => (
                            <div
                                key={img.src}
                                ref={(el) => (imageRefs.current[i] = el)}
                                className={`absolute z-20 will-change-transform ${img.className}`}
                            >
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    width={400}
                                    height={400}
                                    className="h-auto w-full object-contain drop-shadow-lg"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Right: accordion */}
                    <div className="flex flex-col gap-4">
                        {whatSetsUsApartData.items.map((item, i) => {
                            const isOpen = openIndex === i;
                            return (
                                <div
                                    key={item.title}
                                    className={`rounded-2xl border transition-colors ${isOpen
                                        ? "border-transparent bg-white"
                                        : "border-white/10 bg-gradient-to-r from-[#1a1230] to-[#150f24]"
                                        }`}
                                >
                                    <button
                                        type="button"
                                        onClick={() => toggle(i)}
                                        aria-expanded={isOpen}
                                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                                    >
                                        <span
                                            className={`text-sm font-semibold sm:text-base ${isOpen ? "text-violet-700" : "text-white"
                                                }`}
                                        >
                                            {item.title}
                                        </span>
                                        <span
                                            className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-transform ${isOpen
                                                ? "bg-violet-600 text-white rotate-0"
                                                : "bg-white/10 text-white rotate-180"
                                                }`}
                                        >
                                            <ChevronUp className="h-4 w-4" />
                                        </span>
                                    </button>

                                    {isOpen && (
                                        <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                                            <p className="text-sm leading-relaxed text-neutral-600 sm:text-[15px]">
                                                {item.body}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}