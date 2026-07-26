"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure ScrollTrigger is registered
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function SplitTextTitle({ text, className = "", justify = "center" }) {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const words = containerRef.current.querySelectorAll(".split-word");
        
        // Set initial state: shifted down and transparent
        gsap.set(words, { yPercent: 110, opacity: 0 });

        const anim = gsap.to(words, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 85%", // Animation triggers when top of element is 85% from viewport top
                toggleActions: "play none none none",
            },
            yPercent: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.03,
            ease: "power3.out",
        });

        return () => {
            if (anim.scrollTrigger) anim.scrollTrigger.kill();
            anim.kill();
        };
    }, [text]);

    const words = text.split(" ");
    const justifyClass = justify === "center" ? "justify-center" : "justify-start";

    return (
        <span 
            ref={containerRef} 
            className={`inline-flex flex-wrap ${justifyClass} ${className}`}
        >
            {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden py-1">
                    <span className="split-word inline-block">
                        {word}
                        {i < words.length - 1 && "\u00A0"}
                    </span>
                </span>
            ))}
        </span>
    );
}
