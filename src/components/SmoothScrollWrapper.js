"use client";

import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

export default function SmoothScrollWrapper({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Disable smooth scroll on mobile devices and for users who prefer reduced motion
    const isMobile = window.innerWidth <= 768;

    if (prefersReducedMotion || isMobile) {
      return; // Skip smooth scroll initialization
    }

    const lenis = new Lenis({
      duration: 1.0, // Reduced from 1.5 for better performance
      smooth: true,
      lerp: 0.08, // Slightly increased for better performance
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis?.stop(); // Cleanup
  }, []);

  return <div>{children}</div>;
}
