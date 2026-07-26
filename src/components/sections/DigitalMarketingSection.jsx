"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import SplitTextTitle from "@/components/UI/SplitTextTitle";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import digitalMarketingData from "@/data/digitalMarketing.json";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function DigitalMarketingSection() {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);
    const imageRefs = useRef([]);
    const groupRef = useRef(null);

    // Staggered fade & slide up animation on scroll entry
    useEffect(() => {
        if (!sectionRef.current) return;
        const cards = sectionRef.current.querySelectorAll(".marketing-card");
        console.log("DigitalMarketingSection cards found:", cards.length);

        // Set initial state
        gsap.set(cards, { y: 40, opacity: 0 });

        const anim = gsap.to(cards, {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                toggleActions: "play none none none",
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
        });

        return () => {
            if (anim.scrollTrigger) anim.scrollTrigger.kill();
            anim.kill();
        };
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let ticking = false;

        const applyParallax = () => {
            const rect = container.getBoundingClientRect();
            const viewportH = window.innerHeight || 1;

            const progress =
                (viewportH / 2 - (rect.top + rect.height / 2)) /
                (viewportH / 2 + rect.height / 2);

            imageRefs.current.forEach((el, i) => {
                if (!el) return;
                const speed = digitalMarketingData.floatingImages[i]?.speed || 0.1;
                const offset = progress * speed * 100; // px
                el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
            });

            if (groupRef.current) {
                const offset = progress * 0.18 * 100;
                groupRef.current.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
            }

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
        <section ref={sectionRef} className="bg-[var(--background-main)] py-16 sm:py-20 lg:py-24">
            <div className="mx-auto grid max-w-7xl grid-cols-1 items-stretch gap-12 px-6 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-8">
                {/* Left: image with floating stat cards */}
                <div className="relative mx-auto h-[450px] w-full max-w-md sm:h-[550px] lg:h-full lg:max-w-none">
                    <div
                        ref={containerRef}
                        className="relative h-full overflow-hidden rounded-3xl bg-gradient-to-b from-neutral-100 to-white px-6 sm:px-8"
                    >
                        {/* Center image — pinned to the bottom of the card, no parallax movement */}
                        <div className="absolute inset-0">
                            <Image
                                src="/assets/expert/center.png"
                                alt="Digital marketing expert working on a laptop"
                                fill
                                className="object-contain object-bottom"
                                priority
                            />
                        </div>

                        {/* Floating images — 1, 4 & 6 on the left, 2 & 3 on the right. */}
                        {digitalMarketingData.floatingImages
                            .filter((img) => img.src !== "/assets/expert/5.png")
                            .map((img) => {
                                const i = digitalMarketingData.floatingImages.findIndex((f) => f.src === img.src);
                                return (
                                    <div
                                        key={img.src}
                                        className={`marketing-card absolute z-20 ${img.className}`}
                                    >
                                        <div
                                            ref={(el) => (imageRefs.current[i] = el)}
                                            className="will-change-transform"
                                        >
                                            <Image
                                                src={img.src}
                                                alt={img.alt}
                                                width={400}
                                                height={400}
                                                className="h-auto w-full object-contain drop-shadow-lg"
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                    </div>

                    {/* 5.png + Group.png grouped as one unit */}
                    <div
                        className="marketing-card absolute bottom-32 right-[-8px] z-30 w-32 sm:bottom-40 sm:right-[-12px] sm:w-40"
                    >
                        <div
                            ref={(el) => (imageRefs.current[5] = el)}
                            className="will-change-transform"
                        >
                            <Image
                                src="/assets/expert/5.png"
                                alt="Video playlist graphic"
                                width={400}
                                height={400}
                                className="h-auto w-full object-contain drop-shadow-lg"
                            />
                        </div>

                        {/* Group arrow graphic */}
                        <div
                            ref={groupRef}
                            className="absolute -top-8 -right-1 z-40 w-14 will-change-transform sm:-top-10 sm:-right-2 sm:w-20"
                        >
                            <Image
                                src="/assets/expert/Group.png"
                                alt="Decorative arrow graphic"
                                width={200}
                                height={200}
                                className="h-auto w-full object-contain"
                            />
                        </div>
                    </div>
                </div>

                {/* Right: copy */}
                <div className="text-white">
                    <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
                        <SplitTextTitle text={digitalMarketingData.title} justify="left" />
                    </h2>

                    <ul className="mt-8 space-y-6 text-sm leading-relaxed text-neutral-300 sm:text-base">
                        {digitalMarketingData.paragraphs.map((para, index) => (
                            <li key={index} className="flex gap-3">
                                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-violet-500" />
                                <span>{para}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}