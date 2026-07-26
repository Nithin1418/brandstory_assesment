"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import SplitTextTitle from "@/components/UI/SplitTextTitle";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import trustedPartnerData from "@/data/trustedPartner.json";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TrustedPartnerSection() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll(".partner-card-wrapper");
    console.log("TrustedPartnerSection cards found:", cards.length);

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
    <section ref={containerRef} className="bg-[var(--background-main)] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-8">
        {/* Heading */}
        <h2 className="text-center text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">
          <SplitTextTitle text={trustedPartnerData.title} justify="center" />
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-gray-400 sm:text-base">
          {trustedPartnerData.subtitle}
        </p>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 md:grid-cols-3 items-stretch">
          {trustedPartnerData.points.map(({ image, title, description }) => (
            <div key={title} className="partner-card-wrapper h-full">
              <div
                className="group flex h-full flex-col rounded-2xl border border-white/10 bg-gradient-to-b from-[#1b1830] to-[#120f1d] p-6
                   transition-all duration-300 ease-out
                   hover:border-transparent
                   hover:bg-white hover:bg-none hover:shadow-2xl hover:shadow-purple-900/40 sm:p-8"
              >
                {/* Image showcase */}
                <div className="mb-6 flex h-28 items-center justify-center sm:h-32">
                  <div className="relative h-24 w-24 sm:h-28 sm:w-28">
                    <Image
                      src={image}
                      alt={title}
                      fill
                      className="object-contain grayscale contrast-125 transition-all duration-500 ease-out
                         group-hover:grayscale-0"
                      sizes="112px"
                    />
                  </div>
                </div>

                {/* Title */}
                <h3
                  className="mb-3 text-base font-semibold text-white transition-colors duration-300
                     group-hover:text-violet-600 sm:text-lg"
                >
                  {title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed text-gray-400 transition-colors duration-300
                     group-hover:text-gray-600"
                >
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}