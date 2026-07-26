"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";


const SPRINKLE_COUNT = 55;
const SPRINKLE_ZONE_HEIGHT = 0.72;
export default function ArchGlow({ loading }) {
    const containerRef = useRef(null);
    const cleanupRefs = useRef([]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let ctx;
        const raf = requestAnimationFrame(() => {
            container
                .querySelectorAll("[data-ray], [data-sprinkle]")
                .forEach((el) => el.remove());
            const created = [];

            ctx = gsap.context(() => {

                // ---- twinkling sprinkle particles ----
                const width = container.offsetWidth;
                const height = container.offsetHeight;

                for (let i = 0; i < SPRINKLE_COUNT; i++) {
                    const dot = document.createElement("div");
                    dot.dataset.sprinkle = "true";
                    const size = gsap.utils.random(1, 2.4);
                    const x = gsap.utils.random(0, width);
                    const y = gsap.utils.random(0, height * SPRINKLE_ZONE_HEIGHT);

                    Object.assign(dot.style, {
                        position: "absolute",
                        left: `${x}px`,
                        top: `${y}px`,
                        width: `${size}px`,
                        height: `${size}px`,
                        borderRadius: "50%",
                        background: "rgba(230,220,255,0.9)",
                        boxShadow: "0 0 4px 1px rgba(196,181,253,0.6)",
                        opacity: 0,
                    });
                    container.appendChild(dot);
                    created.push(dot);

                    gsap.to(dot, {
                        opacity: gsap.utils.random(0.5, 1),
                        scale: gsap.utils.random(1.3, 1.8),
                        duration: gsap.utils.random(1.4, 3),
                        ease: "sine.inOut",
                        repeat: -1,
                        yoyo: true,
                        delay: gsap.utils.random(0, 4),
                        transformOrigin: "center center",
                    });
                }
            }, container);

            cleanupRefs.current = created;
        });

        return () => {
            cancelAnimationFrame(raf);
            ctx?.revert();
            cleanupRefs.current.forEach((el) => el.remove());
        };
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const paths = container.querySelectorAll("svg path");

        if (loading) {
            paths.forEach((path) => {
                const length = path.getTotalLength() || 2000;
                gsap.set(path, {
                    strokeDasharray: length,
                    strokeDashoffset: length,
                });
            });
        } else {
            paths.forEach((path) => {
                const length = path.getTotalLength() || 2000;
                gsap.set(path, {
                    strokeDasharray: length,
                });
            });

            gsap.to(paths, {
                strokeDashoffset: 0,
                duration: 2.2,
                ease: "power3.out",
                stagger: 0.08,
            });
        }
    }, [loading]);

    return (
        <div
            ref={containerRef}
            className="pointer-events-none absolute inset-x-0 top-0 h-[100vh] overflow-hidden z-[3]"
        >
            {/* the glowing arc itself */}
            <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 1440 380"
                preserveAspectRatio="none"
            >
                {/* soft wide outer glow — very broad, heavily blurred */}
                <path
                    d="M -100,260 Q 720,-90 1540,260"
                    fill="none"
                    stroke="rgba(138, 92, 246, 0.36)"
                    strokeWidth="50"
                    style={{ filter: "blur(45px)", strokeDasharray: 2000, strokeDashoffset: 2000 }}
                />
                {/* mid band — the visible thick body of the arch */}
                <path
                    d="M -100,260 Q 720,-90 1540,260"
                    fill="none"
                    stroke="rgba(158, 120, 246, 0.64)"
                    strokeWidth="30"
                    style={{ filter: "blur(18px)", strokeDasharray: 2000, strokeDashoffset: 2000 }}
                />
                {/* brighter inner band, still soft-edged, no hard line */}
                <path
                    d="M -100,260 Q 720,-90 1540,260"
                    fill="none"
                    stroke="rgba(195, 181, 253, 0.14)"
                    strokeWidth="34"
                    style={{ filter: "blur(9px)", strokeDasharray: 2000, strokeDashoffset: 2000 }}
                />
                {/* subtle brighter core running through the middle of the band */}
                <path
                    d="M -100,260 Q 720,-90 1540,260"
                    fill="none"
                    stroke="rgba(157, 137, 237, 0.72)"
                    strokeWidth="10"
                    style={{ filter: "blur(4px)", strokeDasharray: 2000, strokeDashoffset: 2000 }}
                />
            </svg>
        </div>
    );
}