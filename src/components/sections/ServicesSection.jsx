"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import servicesData from "@/data/services.json";
import SplitTextTitle from "@/components/UI/SplitTextTitle";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function ServicesSection() {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const cards = containerRef.current.querySelectorAll(".service-card-wrapper");

        // Set initial state
        gsap.set(cards, { y: 40, opacity: 0 });

        const anim = gsap.to(cards, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 85%",
                toggleActions: "play none none none",
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
        });

        return () => {
            if (anim.scrollTrigger) anim.scrollTrigger.kill();
            anim.kill();
        };
    }, []);

    return (
        <section ref={containerRef} className="overflow-y-auto bg-[var(--background-main)] py-16 sm:py-20 lg:py-24">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-8">
                <h2 className="mb-12 text-center text-3xl font-bold leading-tight text-white md:text-4xl">
                    <SplitTextTitle text={servicesData.title} justify="center" />
                </h2>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3 items-stretch">
                    {servicesData.services.map(({ icon, iconWhite, title, description, linkText }) => (
                        <div key={title} className="service-card-wrapper h-full">
                            <div
                                className="group relative flex h-full flex-col rounded-2xl border border-white/10 bg-[#15131f] p-8
                     transition-all duration-300 ease-out
                     hover:border-transparent
                     hover:bg-white hover:shadow-2xl hover:shadow-purple-900/40"
                            >
                                {/* Icon */}
                                <div
                                    className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white
                       transition-colors duration-300 group-hover:bg-violet-600"
                                >
                                    <img
                                        src={icon}
                                        alt={title}
                                        className="absolute h-10 w-10 object-contain transition-opacity duration-300
                         group-hover:opacity-0"
                                    />
                                    <img
                                        src={iconWhite}
                                        alt=""
                                        aria-hidden="true"
                                        className="absolute h-10 w-10 object-contain opacity-0 transition-opacity duration-300
                         group-hover:opacity-100"
                                    />
                                </div>

                                {/* Title */}
                                <h3
                                    className="mb-3 text-lg font-semibold text-violet-400 transition-colors duration-300
                       group-hover:text-violet-600"
                                >
                                    {title}
                                </h3>

                                {/* Description */}
                                <p
                                    className="mb-6 text-sm leading-relaxed text-gray-400 transition-colors duration-300
                       group-hover:text-gray-600"
                                >
                                    {description}
                                </p>

                                {/* CTA */}
                                <button
                                    className="mt-auto flex items-center gap-2 text-sm font-medium text-white transition-colors
                       duration-300 group-hover:text-gray-900"
                                >
                                    {linkText || "Know more"}
                                    <ArrowRight
                                        className="h-4 w-4 text-violet-400 transition-transform duration-300
                         group-hover:translate-x-1 group-hover:text-violet-600"
                                    />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}