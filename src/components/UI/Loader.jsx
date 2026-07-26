"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const ROW_COUNT = 5;

export default function Loader({ onComplete }) {
    const rowRefs = useRef([]);
    const titleRef = useRef(null);
    const subRef = useRef(null);
    const loaderRef = useRef(null);
    const [animationDone, setAnimationDone] = useState(false);

    useEffect(() => {
        console.log("Loader: Animation starting");
        // Disable page scroll during loader transition
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";

        // Set initial position of rows to 0
        gsap.set(rowRefs.current, { x: 0 });

        const tl = gsap.timeline({
            onComplete: () => {
                console.log("Loader: Animation complete");
                setAnimationDone(true);
            },
        });

        tl.fromTo(
            [subRef.current, titleRef.current],
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "power2.out",
                stagger: 0.08,
            },
            0.4
        );

        tl.to(
            [subRef.current, titleRef.current],
            {
                opacity: 0,
                y: -28,
                duration: 0.4,
                ease: "power2.in",
                stagger: 0.05,
            },
            2.0
        );

        tl.to(
            rowRefs.current,
            {
                x: "0.4vw",
                duration: 0.18,
                ease: "power2.out",
                stagger: {
                    each: 0.075,
                    from: "start",
                },
            },
            2.4
        );

        tl.to(
            rowRefs.current,
            {
                x: "100vw",
                duration: 1.35,
                ease: "expo.out",
                stagger: {
                    each: 0.055,
                    from: "end",
                },
            },
            2.68
        );

        return () => {
            // Restore page scroll after loader completes and unmounts
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
            tl.kill();
        };
    }, []);

    useEffect(() => {
        if (animationDone) {
            console.log("Loader: Calling onComplete");
            if (typeof onComplete === "function") {
                onComplete(); // No fade out needed, rows already revealed the page
            }
        }
    }, [animationDone, onComplete]);

    return (
        // .loader
        <div
            ref={loaderRef}
            className="fixed inset-0 z-[9999] overflow-hidden pointer-events-auto [will-change:opacity]"
        >
            {Array.from({ length: ROW_COUNT }, (_, index) => {
                return (
                    // .row
                    <div
                        key={index}
                        ref={(el) => (rowRefs.current[index] = el)}
                        className="absolute left-0 w-full h-[22vh] bg-[#210942] z-[10000] [will-change:transform]"
                        style={{
                            top: `${index * 20}vh`,
                        }}
                    />
                );
            })}

            {/* .titleWrap */}
            <div className="fixed inset-0 flex flex-col items-center justify-center z-[10000] pointer-events-none [will-change:transform,opacity]">
                {/* .sub */}
                <span
                    ref={subRef}
                    className="font-serif font-normal uppercase text-[#7a6e64] mb-[0.25em] opacity-0 translate-y-[30px] text-[clamp(0.75rem,1.8vw,1rem)] tracking-[0.55em]"
                    style={{
                        fontFamily:
                            '"Cormorant Garamond", "Garamond", "Times New Roman", serif',
                    }}
                ></span>
                {/* .logo */}
                <img
                    ref={titleRef}
                    src="/assets/header/logo.png"
                    alt="Brandstory"
                    className="block object-contain opacity-0 translate-y-[30px] w-[clamp(180px,35vw,320px)] h-auto"
                />
            </div>
        </div>
    );
}