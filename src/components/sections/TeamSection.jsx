"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SplitTextTitle from "@/components/UI/SplitTextTitle";
import teamData from "@/data/team.json";

import "swiper/css";
import "swiper/css/navigation";

export default function TeamSection() {
    const [prevEl, setPrevEl] = useState(null);
    const [nextEl, setNextEl] = useState(null);

    // Triplicate team array (18 slides)
    const slideItems = [...teamData.team, ...teamData.team, ...teamData.team];

    return (
        <section className="overflow-hidden bg-[var(--background-main)] py-16 sm:py-20 lg:py-24">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-8">
                {/* Heading + Nav Arrows */}
                <div className="flex flex-col items-center gap-4">
                    <h2 className="text-center text-2xl font-bold text-white sm:text-3xl">
                        <SplitTextTitle text={teamData.title} justify="center" />
                    </h2>

                    <div className="flex w-full shrink-0 items-center justify-end gap-3">
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
            </div>

            {/* Slider */}
            <div className="mt-10 sm:mt-12">
                <Swiper
                    modules={[Navigation, Autoplay]}
                    centeredSlides={true}
                    loop={true}
                    loopAdditionalSlides={6}
                    watchOverflow={false}
                    spaceBetween={16}
                    slidesPerView={1.6}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    speed={700}
                    navigation={{
                        prevEl,
                        nextEl,
                    }}
                    breakpoints={{
                        0: { slidesPerView: 1.3, spaceBetween: 12 },
                        480: { slidesPerView: 1.8, spaceBetween: 14 },
                        768: { slidesPerView: 2.6, spaceBetween: 16 },
                        1024: { slidesPerView: 3.6, spaceBetween: 20 },
                        1280: { slidesPerView: 4.4, spaceBetween: 24 },
                    }}
                    className="!px-6 sm:!px-8 lg:!px-8"
                >
                    {slideItems.map((member, idx) => (
                        <SwiperSlide key={`${member.id}-${idx}`}>
                            <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-neutral-900">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    sizes="(max-width: 480px) 75vw, (max-width: 1024px) 40vw, 25vw"
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}