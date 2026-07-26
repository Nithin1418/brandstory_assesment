"use client";

import { useEffect } from "react";
import Hero from "@/components/sections/Hero";
import ServicesSection from "@/components/sections/ServicesSection";
import DigitalMarketingSection from "@/components/sections/DigitalMarketingSection";
import WhatSetsUsApartSection from "@/components/sections/WhatsetusApartSection";
import TrustedPartnerSection from "@/components/sections/TrustedPartnerSection";
import StatisticsSection from "@/components/sections/StatisticsSection";
import FAQSection from "@/components/sections/FaqSection";
import CaseStudiesSection from "@/components/sections/CaseStudiesSection";
import TeamSection from "@/components/sections/TeamSection";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLoading } from "@/context/LoadingContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const { loading } = useLoading();

  // Refresh ScrollTrigger positions after page loading completes and DOM settles
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  return (
    <div>
      <Hero loading={loading} />
      <ServicesSection />
      <DigitalMarketingSection />
      <WhatSetsUsApartSection />
      <TrustedPartnerSection />
      <StatisticsSection />
      <TeamSection />
      <FAQSection />
      <CaseStudiesSection />
    </div>
  );
}

