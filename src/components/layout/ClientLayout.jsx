"use client";

import { useEffect } from "react";
import { LoadingProvider, useLoading } from "@/context/LoadingContext";
import Loader from "@/components/UI/Loader";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import CursorFollower from "@/components/UI/CursorFollower";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function ClientLayoutContent({ children }) {
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    window.lenis = lenis;

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <CursorFollower />
      <Navbar loading={loading} />
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      <Footer />
    </>
  );
}

export default function ClientLayout({ children }) {
  return (
    <LoadingProvider>
      <ClientLayoutContent>{children}</ClientLayoutContent>
    </LoadingProvider>
  );
}
