"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Mousewheel } from "swiper/modules";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import SplitTextTitle from "@/components/UI/SplitTextTitle";
import caseStudiesData from "@/data/caseStudies.json";

import "swiper/css";
import "swiper/css/navigation";

export default function CaseStudiesSection() {
    const [prevEl, setPrevEl] = useState(null);
    const [nextEl, setNextEl] = useState(null);

    // Triplicate case studies for continuous loop
    const slideItems = [...caseStudiesData.caseStudies, ...caseStudiesData.caseStudies, ...caseStudiesData.caseStudies];

    return (
        <section className="bg-[var(--background-main)] py-16 sm:py-20 lg:py-24">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-8">
                {/* Heading + Nav Arrows */}
                <div className="text-center">
                    <h2 className="max-w-2xl mx-auto text-2xl font-bold leading-snug text-white sm:text-3xl lg:text-[2rem]">
                        <SplitTextTitle text={caseStudiesData.title} justify="center" />
                    </h2>
                </div>
                <div className="mt-6 flex w-full justify-end">
                    <div className="flex items-center gap-3">
                        <button
                            ref={setPrevEl}
                            aria-label="Previous slide"
                            className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black transition-transform duration-200 hover:scale-105 active:scale-95"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </button>

                        <button
                            ref={setNextEl}
                            aria-label="Next slide"
                            className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-white transition-transform duration-200 hover:scale-105 active:scale-95"
                        >
                            <ArrowRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Slider */}
                <div className="mt-10 sm:mt-12">
                    <Swiper
                        modules={[Navigation, Autoplay, Mousewheel]}
                        spaceBetween={24}
                        slidesPerView={1}
                        loop={true}
                        loopAdditionalSlides={6}
                        centeredSlides={false}
                        observer={true}
                        observeParents={true}
                        watchOverflow={false}
                        grabCursor={true}
                        mousewheel={{
                            forceToAxis: true,
                            sensitivity: 1,
                            releaseOnEdges: true,
                        }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        speed={700}
                        navigation={{
                            prevEl,
                            nextEl,
                        }}
                        breakpoints={{
                            0: { slidesPerView: 1.05, spaceBetween: 16 },
                            640: { slidesPerView: 1.4, spaceBetween: 20 },
                            768: { slidesPerView: 2.1, spaceBetween: 20 },
                            1024: { slidesPerView: 3, spaceBetween: 24 },
                        }}
                    >
                        {slideItems.map((study, idx) => (
                            <SwiperSlide key={`${study.id}-${idx}`}>
                                <div className="group relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-neutral-900">
                                    <Image
                                        src={study.image}
                                        alt={study.title}
                                        fill
                                        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    {/* Shadow overlay */}
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                                    <div className="pointer-events-none absolute inset-0 shadow-[inset_0_-60px_90px_-20px_rgba(0,0,0,0.8)]" />

                                    {/* Badge */}
                                    <div className="absolute left-5 top-5">
                                        <span className="inline-flex items-center rounded-full bg-[#7C4DFF] px-4 py-2 text-sm font-semibold text-white">
                                            {study.badge}
                                        </span>
                                    </div>

                                    {/* Title + Case Study link */}
                                    <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-5">
                                        <h3 className="text-2xl font-bold leading-snug text-white">
                                            {study.title}
                                        </h3>
                                        <a
                                            href={study.href}
                                            className="inline-flex w-fit items-center gap-2 text-base font-medium text-[#FF6F61] transition-all duration-200 hover:gap-3"
                                        >
                                            View Case Study
                                            <ArrowUpRight className="h-4 w-4" />
                                        </a>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section >
    );
}