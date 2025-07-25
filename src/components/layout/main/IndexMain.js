"use client";
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import Hero from "@/components/sections/heros/Hero";
import Services from "@/components/sections/services/Services";
import TutorialVideos from "@/components/sections/tutorials/TutorialVideos";
import FeaturesOnDemand from "@/components/sections/features/FeaturesOnDemand";
import UsVsOthers from "@/components/sections/comparison/UsVsOthers";
import MissionStatement from "@/components/sections/about/MissionStatement";
import Pricing from "@/components/sections/pricing/Pricing";
import TestimonialSection from "@/components/sections/testimonials/TestimonialSection";
import CTASection from "@/components/sections/cta/CTASection";

const IndexMain = () => {
  return (
    <>
      <Header isSticky={false} />
      <main>
        <Hero />
        <Services />
        <TutorialVideos />
        <FeaturesOnDemand />
        <UsVsOthers />
        <MissionStatement />
        <Pricing />
        <TestimonialSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
};

export default IndexMain;
