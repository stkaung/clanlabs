"use client";
import { useEffect, useState } from "react";
import getTestimonials from "@/libs/getTestimonials";
import useTheme from "@/hooks/useTheme";

const TestimonialSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const testimonials = getTestimonials();
  const theme = useTheme();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("testimonial-section");
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const nextTestimonial = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      setIsTransitioning(false);
    }, 350);
  };

  const prevTestimonial = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(
        (prev) => (prev - 1 + testimonials.length) % testimonials.length
      );
      setIsTransitioning(false);
    }, 350);
  };

  const goToTestimonial = (index) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 350);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonial-section">
      <div
        className={`relative py-24 lg:py-32 overflow-hidden transition-all duration-500 ${
          theme === "dark"
            ? "bg-gradient-to-br from-slate-950 via-indigo-900/20 to-purple-900/30"
            : "bg-gradient-to-br from-indigo-50 via-purple-50 to-violet-50"
        }`}
      >
        {/* Dynamic vignette */}
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            theme === "dark"
              ? "bg-gradient-radial from-transparent via-black/10 to-black/30"
              : ""
          }`}
        ></div>

        {/* Animated gradient mesh */}
        <div className="absolute inset-0 opacity-30">
          <div
            className={`absolute top-0 left-0 w-full h-full transition-all duration-500 ${
              theme === "dark"
                ? "bg-gradient-to-br from-indigo-900/40 via-transparent to-purple-900/40"
                : "bg-gradient-to-br from-indigo-200/40 via-transparent to-purple-200/40"
            } animate-pulse`}
          ></div>
          <div
            className={`absolute top-0 right-0 w-1/2 h-full transition-all duration-500 ${
              theme === "dark"
                ? "bg-gradient-to-bl from-purple-900/30 via-transparent to-transparent"
                : "bg-gradient-to-bl from-purple-200/30 via-transparent to-transparent"
            }`}
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        {/* Floating particles with theme-based colors */}
        <div
          className={`absolute top-28 left-1/4 w-40 h-40 rounded-full blur-xl animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-purple-500 opacity-8" : "opacity-0"
          }`}
        ></div>

        <div
          className={`absolute bottom-28 right-1/3 w-32 h-32 rounded-full blur-xl animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-violet-500 opacity-12" : "opacity-0"
          }`}
          style={{ animationDelay: "2s" }}
        ></div>

        <div
          className={`absolute top-1/4 right-1/4 w-36 h-36 rounded-full blur-lg animate-ping transition-all duration-500 ${
            theme === "dark" ? "bg-purple-400 opacity-10" : "opacity-0"
          }`}
          style={{ animationDelay: "1s" }}
        ></div>

        <div
          className={`absolute bottom-1/4 left-1/4 w-28 h-28 rounded-full blur-2xl animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-indigo-500 opacity-6" : "opacity-0"
          }`}
          style={{ animationDelay: "4s" }}
        ></div>

        <div
          className={`absolute top-1/2 left-1/3 w-16 h-16 rounded-full blur-xl animate-bounce transition-all duration-500 ${
            theme === "dark" ? "bg-violet-400 opacity-8" : "opacity-0"
          }`}
          style={{ animationDelay: "3s" }}
        ></div>

        {/* Additional glowy orbs like hero section */}
        <div
          className={`absolute top-1/3 right-1/3 w-28 h-28 rounded-full blur-xl animate-ping transition-all duration-500 ${
            theme === "dark" ? "bg-purple-400/16" : "opacity-0"
          }`}
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className={`absolute bottom-1/3 right-1/4 w-52 h-52 rounded-full blur-3xl animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-violet-400/8" : "opacity-0"
          }`}
          style={{ animationDelay: "7s" }}
        ></div>
        <div
          className={`absolute top-2/3 left-1/4 w-24 h-24 rounded-full blur-lg animate-bounce transition-all duration-500 ${
            theme === "dark" ? "bg-indigo-400/18" : "opacity-0"
          }`}
          style={{ animationDelay: "4s" }}
        ></div>
        <div
          className={`absolute bottom-1/2 left-1/2 transform -translate-x-1/2 w-36 h-36 rounded-full blur-2xl animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-purple-500/10" : "opacity-0"
          }`}
          style={{ animationDelay: "8s" }}
        ></div>
        <div
          className={`absolute top-3/4 right-1/4 w-20 h-20 rounded-full blur-md animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-violet-500/20" : "opacity-0"
          }`}
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className={`absolute bottom-1/3 left-1/3 w-16 h-16 rounded-full blur-sm animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-purple-400/14" : "opacity-0"
          }`}
          style={{ animationDelay: "5s" }}
        ></div>
        <div
          className={`absolute top-1/4 left-1/3 w-44 h-44 rounded-full blur-3xl animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-indigo-500/6" : "opacity-0"
          }`}
          style={{ animationDelay: "10s" }}
        ></div>

        {/* Minimal connection lines */}
        <div
          className={`absolute top-1/3 left-0 w-40 h-px transition-all duration-500 ${
            theme === "dark"
              ? "bg-gradient-to-r from-transparent via-indigo-400/8 to-transparent"
              : "bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"
          }`}
        ></div>
        <div
          className={`absolute bottom-1/3 right-0 w-40 h-px transition-all duration-500 ${
            theme === "dark"
              ? "bg-gradient-to-l from-transparent via-purple-400/8 to-transparent"
              : "bg-gradient-to-l from-transparent via-purple-500/20 to-transparent"
          }`}
        ></div>

        {/* Subtle trust indicators */}
        <div
          className={`absolute top-1/3 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full transition-all duration-500 ${
            theme === "dark" ? "bg-indigo-400/20" : "bg-indigo-500/40"
          }`}
        ></div>
        <div
          className={`absolute bottom-1/3 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full transition-all duration-500 ${
            theme === "dark" ? "bg-purple-400/20" : "bg-purple-500/40"
          }`}
        ></div>

        <div className="container relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              {/* Badge */}
              <div
                className={`inline-flex items-center px-4 py-2 backdrop-blur-sm rounded-full border shadow-lg mb-8 transition-all duration-1000 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                } ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-400/30"
                    : "bg-gradient-to-r from-blue-400/30 to-purple-400/30 border-blue-500/40"
                }`}
              >
                <span
                  className={`text-sm font-medium mr-2 transition-all duration-300 hover:scale-110 ${
                    theme === "dark" ? "text-blue-300" : "text-blue-600"
                  }`}
                >
                  💬
                </span>
                <span
                  className={`text-sm font-semibold tracking-wide transition-all duration-300 ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}
                >
                  Client Stories
                </span>
              </div>

              {/* Title */}
              <h2
                className={`text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 transition-all duration-1000 delay-200 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                } ${theme === "dark" ? "text-white" : "text-blue-600"}`}
                style={{
                  textShadow:
                    theme === "dark"
                      ? "0 2px 10px rgba(0, 0, 0, 0.7), 0 4px 20px rgba(0, 0, 0, 0.5)"
                      : "0 2px 10px rgba(0, 0, 0, 0.1), 0 4px 20px rgba(0, 0, 0, 0.05)",
                  filter:
                    theme === "dark"
                      ? "drop-shadow(0 1px 3px rgba(255, 255, 255, 0.1))"
                      : "drop-shadow(0 1px 3px rgba(0, 0, 0, 0.05))",
                }}
              >
                3,000+ GROUPS TRUST CLAN LABS
              </h2>

              {/* Subtitle */}
              <div
                className={`space-y-2 transition-all duration-1000 delay-400 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                <p
                  className={`text-xl md:text-2xl font-semibold transition-colors duration-300 ${
                    theme === "dark" ? "text-cyan-300" : "text-blue-700"
                  }`}
                >
                  Our clients love us.
                </p>
                <p
                  className={`text-lg md:text-xl transition-colors duration-300 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Here&apos;s some of their stories.
                </p>
              </div>
            </div>

            {/* Testimonial Card with Smooth Transitions */}
            <div
              className={`transition-all duration-1000 delay-600 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="relative">
                {/* Card Container with Smooth Transitions */}
                <div
                  className={`backdrop-blur-sm border rounded-3xl p-8 md:p-12 shadow-2xl relative h-[600px] md:h-[700px] flex flex-col transition-all duration-500 ${
                    theme === "dark"
                      ? "bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-slate-700/40"
                      : "bg-gradient-to-br from-white/80 to-white/60 border-blue-200/50"
                  }`}
                >
                  {/* Additional overlay for better text readability */}
                  <div
                    className={`absolute inset-0 rounded-3xl transition-all duration-300 ${
                      theme === "dark" ? "bg-black/20" : "bg-white/20"
                    }`}
                  ></div>

                  {/* Content with Smooth Fade Transitions */}
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Quote Icon - Static */}
                    <div className="flex justify-center mb-6">
                      <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-sm border transition-all duration-300 ${
                          theme === "dark"
                            ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-400/30"
                            : "bg-gradient-to-r from-cyan-400/30 to-blue-400/30 border-cyan-500/40"
                        }`}
                      >
                        <i
                          className={`fas fa-quote-left text-2xl transition-colors duration-300 ${
                            theme === "dark" ? "text-cyan-400" : "text-cyan-600"
                          }`}
                        ></i>
                      </div>
                    </div>

                    {/* Testimonial Text with Smooth Transitions - Flex grow to fill space */}
                    <blockquote
                      className={`text-lg md:text-xl leading-relaxed mb-6 text-center transition-all duration-700 ease-in-out flex-1 flex flex-col justify-center overflow-y-auto custom-scrollbar ${
                        isTransitioning
                          ? "opacity-0 transform translate-y-4"
                          : "opacity-100 transform translate-y-0"
                      } ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}
                      style={{
                        transition: "all 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                    >
                      &ldquo;
                      {currentTestimonial?.quote
                        ?.split("\n\n")
                        .map((paragraph, index) => (
                          <span key={index}>
                            {paragraph}
                            {index <
                              currentTestimonial.quote.split("\n\n").length -
                                1 && (
                              <>
                                <br />
                                <br />
                              </>
                            )}
                          </span>
                        ))}
                      &rdquo;
                    </blockquote>

                    {/* Author Information with Smooth Transitions - Fixed at bottom */}
                    <div
                      className={`text-center transition-all duration-700 ease-in-out mt-auto ${
                        isTransitioning
                          ? "opacity-0 transform translate-y-4"
                          : "opacity-100 transform translate-y-0"
                      }`}
                    >
                      <div
                        className={`w-16 h-1 mx-auto mb-4 transition-all duration-700 ease-in-out ${
                          theme === "dark"
                            ? "bg-gradient-to-r from-cyan-400 to-blue-400"
                            : "bg-gradient-to-r from-cyan-500 to-blue-500"
                        }`}
                      ></div>
                      <h4
                        className={`text-2xl font-bold mb-2 transition-all duration-700 ease-in-out ${
                          theme === "dark" ? "text-white" : "text-gray-800"
                        }`}
                      >
                        {currentTestimonial?.author}
                      </h4>
                      <p
                        className={`text-lg font-semibold transition-all duration-700 ease-in-out ${
                          theme === "dark" ? "text-cyan-300" : "text-blue-600"
                        }`}
                      >
                        {currentTestimonial?.organization}
                      </p>
                    </div>
                  </div>

                  {/* Navigation Arrows - Positioned outside the card */}
                  {testimonials.length > 1 && (
                    <>
                      <button
                        onClick={prevTestimonial}
                        className={`absolute -left-8 top-1/2 transform -translate-y-1/2 w-14 h-14 backdrop-blur-md border rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-30 shadow-2xl hover:shadow-3xl ${
                          theme === "dark"
                            ? "bg-gradient-to-r from-slate-800/90 to-slate-900/90 border-slate-500/50 text-white hover:bg-white/20 hover:border-white/40"
                            : "bg-gradient-to-r from-white/90 to-white/80 border-blue-300/50 text-gray-800 hover:bg-blue-50/80 hover:border-blue-400/60"
                        }`}
                      >
                        <i className="fas fa-chevron-left text-lg"></i>
                      </button>
                      <button
                        onClick={nextTestimonial}
                        className={`absolute -right-8 top-1/2 transform -translate-y-1/2 w-14 h-14 backdrop-blur-md border rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-30 shadow-2xl hover:shadow-3xl ${
                          theme === "dark"
                            ? "bg-gradient-to-r from-slate-800/90 to-slate-900/90 border-slate-500/50 text-white hover:bg-white/20 hover:border-white/40"
                            : "bg-gradient-to-r from-white/90 to-white/80 border-blue-300/50 text-gray-800 hover:bg-blue-50/80 hover:border-blue-400/60"
                        }`}
                      >
                        <i className="fas fa-chevron-right text-lg"></i>
                      </button>
                    </>
                  )}
                </div>

                {/* Smooth Transition Overlay for Card Changes */}
                <div
                  className={`absolute inset-0 backdrop-blur-sm border rounded-3xl transition-all duration-700 ease-in-out ${
                    theme === "dark"
                      ? "bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-slate-700/40"
                      : "bg-gradient-to-br from-white/80 to-white/60 border-blue-200/50"
                  }`}
                  style={{
                    opacity: 0,
                    pointerEvents: "none",
                    zIndex: 5,
                  }}
                />
              </div>

              {/* Pagination Dots */}
              {testimonials.length > 1 && (
                <div className="flex justify-center mt-8 space-x-3">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? theme === "dark"
                            ? "bg-cyan-400 scale-125"
                            : "bg-blue-600 scale-125"
                          : theme === "dark"
                          ? "bg-white/30 hover:bg-white/50"
                          : "bg-blue-400/50 hover:bg-blue-500/70"
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Testimonial Counter */}
              {testimonials.length > 1 && (
                <div className="text-center mt-4">
                  <span
                    className={`text-sm transition-colors duration-300 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {currentIndex + 1} of {testimonials.length}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-8px) rotate(1deg);
          }
          66% {
            transform: translateY(4px) rotate(-1deg);
          }
        }
      `}</style>
    </section>
  );
};

export default TestimonialSection;
