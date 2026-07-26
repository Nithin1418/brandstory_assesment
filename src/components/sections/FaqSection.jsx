"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import SplitTextTitle from "@/components/UI/SplitTextTitle";
import faqData from "@/data/faq.json";

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState(0);

    const toggleFAQ = (index) => {
        setOpenIndex((prev) => (prev === index ? -1 : index));
    };

    return (
        <section className="bg-[var(--background-main)] py-16 sm:py-20 lg:py-24">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-8">
                <h2 className="mb-10 text-center text-4xl font-bold text-white">
                    <SplitTextTitle text={faqData.title} justify="center" />
                </h2>

                <div className="flex flex-col gap-4">
                    {faqData.faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={index}
                                className="overflow-hidden rounded-xl bg-[#242327]"
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    aria-expanded={isOpen}
                                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                                >
                                    <span
                                        className={`text-lg ${isOpen ? "font-normal text-gray-200" : "font-semibold text-white"
                                            }`}
                                    >
                                        {faq.question}
                                    </span>

                                    <span
                                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${isOpen ? "bg-violet-600" : "bg-black"
                                            }`}
                                    >
                                        {isOpen ? (
                                            <ChevronUp className="h-5 w-5 text-white" />
                                        ) : (
                                            <ChevronDown className="h-5 w-5 text-white" />
                                        )}
                                    </span>
                                </button>

                                <div
                                    className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                        }`}
                                >
                                    <div className="overflow-hidden">
                                        <p className="px-6 pb-6 text-base font-semibold leading-relaxed text-white">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}