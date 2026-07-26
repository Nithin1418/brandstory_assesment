"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import Image from "next/image";
import SplitTextTitle from "@/components/UI/SplitTextTitle";
import statisticsData from "@/data/statistics.json";

// particles.js config — as provided, background/image stripped out so it
// stays transparent and sits over the purple gradient banner.
const PARTICLES_CONFIG = {
    particles: {
        number: {
            value: 220,
            density: { enable: true, value_area: 800 },
        },
        color: { value: "#ffffff" },
        shape: {
            type: "circle",
            stroke: { width: 0, color: "#000000" },
            polygon: { nb_sides: 5 },
        },
        opacity: {
            value: 0.5,
            random: false,
            anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
        },
        size: {
            value: 3,
            random: true,
            anim: { enable: false, speed: 40, size_min: 0.1, sync: false },
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1,
        },
        move: {
            enable: true,
            speed: 6,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: { enable: false, rotateX: 600, rotateY: 1200 },
        },
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" },
            resize: true,
        },
        modes: {
            grab: { distance: 140, line_linked: { opacity: 1 } },
            bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
            repulse: { distance: 100, duration: 0.4 },
            push: { particles_nb: 4 },
            remove: { particles_nb: 2 },
        },
    },
    retina_detect: true,
};

function ParticleField({ id = "particles-js-stats" }) {
    const [scriptLoaded, setScriptLoaded] = useState(false);

    useEffect(() => {
        if (!scriptLoaded || typeof window === "undefined" || !window.particlesJS) {
            return;
        }

        window.particlesJS(id, PARTICLES_CONFIG);

        return () => {
            // Clean up the pJS instance on unmount / re-render so particles.js
            // doesn't stack multiple canvases into the same container.
            if (window.pJSDom && window.pJSDom.length) {
                const index = window.pJSDom.findIndex(
                    (dom) => dom.pJS.canvas.el.parentElement?.id === id
                );
                if (index > -1) {
                    window.pJSDom[index].pJS.fn.vendors.destroypJS();
                    window.pJSDom?.splice(index, 1);
                }
            }
        };
    }, [scriptLoaded, id]);

    return (
        <>
            <Script
                src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"
                strategy="afterInteractive"
                onLoad={() => setScriptLoaded(true)}
            />
            <div id={id} className="absolute inset-0 h-full w-full" aria-hidden="true" />
        </>
    );
}

// Counts from 0 -> target once `active` becomes true. Runs only once per
// mount (re-triggering on every scroll in/out looks jittery), eased so it
// slows down near the end instead of ticking linearly.
function useCountUp(target, active, duration = 1600) {
    const [value, setValue] = useState(0);
    const hasRun = useRef(false);

    useEffect(() => {
        if (!active || hasRun.current) return;
        hasRun.current = true;

        let rafId;
        let startTime = null;

        const tick = (timestamp) => {
            if (startTime === null) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            setValue(Math.round(eased * target));

            if (progress < 1) {
                rafId = requestAnimationFrame(tick);
            }
        };

        rafId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafId);
    }, [active, target, duration]);

    return value;
}

function StatCard({ value, suffix, label, active }) {
    const count = useCountUp(value, active);

    return (
        <div className="group relative">
            <div
                className="relative flex min-h-[120px] flex-col justify-center rounded-2xl border border-black/5 bg-white p-5 shadow-lg text-center
                   transition-all duration-300 ease-out
                   group-hover:-translate-y-2 group-hover:scale-[1.04]
                   group-hover:border-violet-200 group-hover:shadow-2xl
                   group-hover:shadow-violet-500/30 sm:min-h-[140px] sm:p-6 md:min-h-[160px]"
            >
                <p
                    className="text-2xl text-violet-600 transition-colors duration-300
                     tabular-nums group-hover:text-violet-700 sm:text-3xl md:text-4xl"
                >
                    {count}
                    {suffix}
                </p>
                <p className="mt-1 text-xs text-gray-600 sm:text-sm">{label}</p>
            </div>
        </div>
    );
}

export default function StatisticsSection() {
    const gridRef = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const node = gridRef.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect(); // only trigger once
                }
            },
            { threshold: 0.3 }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="bg-[var(--background-main)] py-16 sm:py-20 lg:py-24">
            <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-8">
                {/* Purple banner */}

                <div className="relative min-h-[260px] overflow-hidden rounded-3xl bg-gradient-to-b from-[#7c5cff] to-[#c9bdfa] sm:min-h-[280px] md:min-h-[300px]">
                    {/* Left illustration */}
                    <div className="absolute inset-0 z-10 flex items-center justify-center">
                        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                            <SplitTextTitle text={statisticsData.title} justify="center" />
                        </h2>
                    </div>
                    <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/2 opacity-90 mix-blend-screen sm:block md:w-2/5">
                        <Image
                            src="/assets/bg/statistics-bg.png"
                            alt=""
                            fill
                            className="object-contain object-left"
                            priority
                        />
                    </div>

                    {/* Right animated particle field */}
                    <div className="absolute inset-y-0 right-0 w-full sm:w-3/5 md:w-2/3">
                        <ParticleField />
                    </div>
                </div>

                {/* Stat cards */}
                <div
                    ref={gridRef}
                    className="relative z-10 -mt-10 grid grid-cols-2 gap-2 px-2 sm:-mt-10 sm:grid-cols-4 sm:gap-2 sm:px-4"
                >
                    {statisticsData.stats.map((stat) => (
                        <StatCard key={stat.label} {...stat} active={inView} />
                    ))}
                </div>
            </div>
        </section>
    );
}