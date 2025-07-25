"use client";
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import Contact from "@/components/sections/contact/Contact";
import HeaderContextProvider from "@/context_api/HeaderContext";
import FooterContextProvider from "@/context_api/FooterContext";
import { useEffect, useState } from "react";

export default function ContactPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set a small delay to ensure the animation is visible
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <HeaderContextProvider value={{ isInnerPage: true, headerType: 1 }}>
      <FooterContextProvider value={{ footerType: 1 }}>
        <Header isSticky={false} />
        <main>
          <Contact isVisible={isVisible} />
        </main>
        <Footer />
      </FooterContextProvider>
    </HeaderContextProvider>
  );
}
