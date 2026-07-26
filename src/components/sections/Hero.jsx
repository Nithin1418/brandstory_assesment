"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import GridBackground from "../UI/GridBackground";
import ArchGlow from "../UI/ArchGlow";
import BrandMarquee from "./BrandMarquee";
import { gsap } from "gsap";
import heroData from "@/data/hero.json";

export default function Hero({ loading }) {
    const titleRef = useRef(null);
    const paraRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        // Set initial state immediately on mount (opacity: 0, positioned below)
        if (titleRef.current) {
            gsap.set(titleRef.current.querySelectorAll(".title-word"), { yPercent: 110, opacity: 0 });
        }
        if (paraRef.current) {
            gsap.set(paraRef.current.querySelectorAll(".para-word"), { yPercent: 110, opacity: 0 });
        }
        if (buttonRef.current) {
            gsap.set(buttonRef.current, { y: 20, opacity: 0 });
        }
    }, []);

    useEffect(() => {
        if (!loading) {
            const tl = gsap.timeline();

            // Animate title words (fade in from bottom to top)
            if (titleRef.current) {
                tl.to(titleRef.current.querySelectorAll(".title-word"), {
                    yPercent: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.03,
                    ease: "power3.out",
                });
            }

            // Animate paragraph words (fade in from bottom to top)
            if (paraRef.current) {
                tl.to(paraRef.current.querySelectorAll(".para-word"), {
                    yPercent: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.008,
                    ease: "power3.out",
                }, "-=0.6"); // starts slightly before title finishes
            }

            // Animate CTA button
            if (buttonRef.current) {
                tl.to(buttonRef.current, {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    ease: "power3.out"
                }, "-=0.4");
            }
        }
    }, [loading]);

    const titleText = heroData.titleText;
    const titleWords = titleText.split(" ");

    const paraText = heroData.paraText;
    const paraWords = paraText.split(" ");

    return (
        <section className="relative min-h-[130vh] w-full overflow-hidden bg-[#0a0714] text-white">

            <GridBackground />
            <div className="absolute inset-x-0 top-[-30vh] h-full">
                <Image
                    src="/assets/bg/bg.png"
                    alt="Tilted Light"
                    fill
                    className="object-cover object-top"
                />
            </div>
            <ArchGlow loading={loading} />

            <div className="relative z-10 flex flex-col">
                {/* hero content — exactly 100vh */}
                <div className="flex h-screen flex-col">
                    <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                        <h1 
                            ref={titleRef}
                            className="max-w-7xl text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl flex flex-wrap justify-center"
                        >
                            {titleWords.map((word, i) => (
                                <span key={i} className="inline-block overflow-hidden py-1">
                                    <span className="title-word inline-block">
                                        {word}
                                        {i < titleWords.length - 1 && "\u00A0"}
                                    </span>
                                </span>
                            ))}
                        </h1>
                        <p 
                            ref={paraRef}
                            className="mt-6 max-w-2xl text-sm text-white/70 md:text-base flex flex-wrap justify-center"
                        >
                            {paraWords.map((word, i) => (
                                <span key={i} className="inline-block overflow-hidden py-0.5">
                                    <span className="para-word inline-block">
                                        {word}
                                        {i < paraWords.length - 1 && "\u00A0"}
                                    </span>
                                </span>
                            ))}
                        </p>

                        <a
                            ref={buttonRef}
                            href={heroData.ctaLink}
                            className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition-colors duration-200 hover:bg-white/[0.1]"
                        >
                            <span className="text-violet-300">&rsaquo;</span>
                            {heroData.ctaText}
                        </a>
                    </div>
                </div>

                {/* brand strip — exactly 30vh, infinite dual-direction marquee */}
                <BrandMarquee />
            </div>
        </section>
    );
}