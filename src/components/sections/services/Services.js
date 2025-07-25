"use client";
import { useEffect, useState } from "react";
import useTheme from "@/hooks/useTheme";

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [typewriterText, setTypewriterText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();

  const fullText = "A Proven, Powerful Group Management Solution";
  const typewriterSpeed = 15; // milliseconds per character

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("features");
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (isVisible && currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setTypewriterText(fullText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, typewriterSpeed);

      return () => clearTimeout(timeout);
    }
  }, [isVisible, currentIndex, fullText]);

  const featureBadges = [
    {
      name: "Discord Integration",
      colors: "from-blue-500/60 to-cyan-500/60",
      border: "border-blue-400/50",
      dot: "bg-blue-400",
      delay: "0s",
    },
    {
      name: "API Management",
      colors: "from-purple-500/60 to-pink-500/60",
      border: "border-purple-400/50",
      dot: "bg-purple-400",
      delay: "0.1s",
    },
    {
      name: "Expert Support",
      colors: "from-green-500/60 to-emerald-500/60",
      border: "border-green-400/50",
      dot: "bg-green-400",
      delay: "0.2s",
    },
    {
      name: "24/7 Availability",
      colors: "from-orange-500/60 to-yellow-500/60",
      border: "border-orange-400/50",
      dot: "bg-orange-400",
      delay: "0.3s",
    },
  ];

  const featureBadges2 = [
    {
      name: "Advanced Analytics",
      colors: "from-red-500/60 to-rose-500/60",
      border: "border-red-400/50",
      dot: "bg-red-400",
      delay: "0.4s",
    },
    {
      name: "Dashboard Control",
      colors: "from-indigo-500/60 to-blue-500/60",
      border: "border-indigo-400/50",
      dot: "bg-indigo-400",
      delay: "0.5s",
    },
    {
      name: "Member Management",
      colors: "from-teal-500/60 to-cyan-500/60",
      border: "border-teal-400/50",
      dot: "bg-teal-400",
      delay: "0.6s",
    },
  ];

  return (
    <section id="features">
      <div
        className={`py-20 lg:py-32 overflow-hidden relative transition-all duration-500 ${
          theme === "dark"
            ? "bg-gradient-to-br from-gray-950 via-slate-900 to-gray-900"
            : "bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50"
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

        {/* Grid background */}
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            theme === "dark" ? "opacity-40" : "opacity-60"
          }`}
          style={{
            backgroundImage:
              theme === "dark"
                ? `
              linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)
              `
                : `
                linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        ></div>

        {/* Gradient mesh with theme-based colors */}
        <div className="absolute inset-0 opacity-25">
          <div
            className={`absolute top-0 left-0 w-full h-full transition-all duration-500 ${
              theme === "dark"
                ? "bg-gradient-to-br from-blue-900/30 via-transparent to-purple-900/20"
                : "bg-gradient-to-br from-blue-200/30 via-transparent to-purple-200/20"
            }`}
          ></div>
          <div
            className={`absolute top-0 right-0 w-1/2 h-full transition-all duration-500 ${
              theme === "dark"
                ? "bg-gradient-to-bl from-cyan-900/25 via-transparent to-transparent"
                : "bg-gradient-to-bl from-cyan-200/25 via-transparent to-transparent"
            }`}
          ></div>
          <div
            className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-1/2 transition-all duration-500 ${
              theme === "dark"
                ? "bg-gradient-to-t from-indigo-800/20 via-transparent to-transparent"
                : "bg-gradient-to-t from-indigo-200/20 via-transparent to-transparent"
            }`}
          ></div>
        </div>

        {/* Floating orbs with theme-based colors */}
        <div
          className={`absolute top-32 left-16 w-32 h-32 rounded-full blur-xl animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-blue-500/15" : "bg-blue-400/20"
          }`}
        ></div>
        <div
          className={`absolute bottom-32 right-24 w-40 h-40 rounded-full blur-xl animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-purple-500/12" : "bg-purple-400/15"
          }`}
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className={`absolute top-1/3 right-1/4 w-24 h-24 rounded-full blur-lg animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-cyan-400/10" : "bg-cyan-300/15"
          }`}
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className={`absolute bottom-1/4 left-1/3 w-28 h-28 rounded-full blur-lg animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-indigo-500/8" : "bg-indigo-400/12"
          }`}
          style={{ animationDelay: "3s" }}
        ></div>

        {/* Additional glowy orbs */}
        <div
          className={`absolute top-1/4 right-1/3 w-20 h-20 rounded-full blur-lg animate-ping transition-all duration-500 ${
            theme === "dark" ? "bg-blue-400/12" : "bg-blue-300/18"
          }`}
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className={`absolute top-2/3 right-1/4 w-36 h-36 rounded-full blur-2xl animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-purple-400/10" : "bg-purple-300/12"
          }`}
          style={{ animationDelay: "4s" }}
        ></div>
        <div
          className={`absolute bottom-1/3 left-1/4 w-16 h-16 rounded-full blur-md animate-bounce transition-all duration-500 ${
            theme === "dark" ? "bg-cyan-400/14" : "bg-cyan-300/20"
          }`}
          style={{ animationDelay: "3s" }}
        ></div>
        <div
          className={`absolute top-1/2 left-1/4 w-44 h-44 rounded-full blur-3xl animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-indigo-500/8" : "bg-indigo-400/10"
          }`}
          style={{ animationDelay: "5s" }}
        ></div>
        <div
          className={`absolute bottom-1/4 right-1/3 w-12 h-12 rounded-full blur-sm animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-blue-500/16" : "bg-blue-400/25"
          }`}
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="container relative z-10">
          {/* Section heading with animations */}
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div
              className={`inline-flex items-center px-6 py-3 mb-8 backdrop-blur-sm rounded-full border transition-all duration-300 hover:scale-105 shadow-lg ${
                theme === "dark"
                  ? "bg-white/10 border-white/20 hover:bg-white/15 hover:border-white/30"
                  : "bg-white/80 border-blue-200/50 hover:bg-white/90 hover:border-blue-300/70"
              }`}
            >
              <span
                className={`text-sm font-medium mr-3 animate-pulse transition-colors duration-300 ${
                  theme === "dark" ? "text-blue-300" : "text-blue-600"
                }`}
              >
                ⚡
              </span>
              <span
                className={`text-sm font-semibold tracking-wide transition-colors duration-300 ${
                  theme === "dark" ? "text-white" : "text-gray-800"
                }`}
              >
                Why Choose Clan Labs?
              </span>
            </div>

            <h2
              className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 leading-tight transition-all duration-1000 delay-200 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              } ${theme === "dark" ? "text-white" : "text-blue-500"}`}
              style={{
                textShadow:
                  theme === "dark"
                    ? "0 0 40px rgba(56, 189, 248, 0.3), 0 0 80px rgba(56, 189, 248, 0.2)"
                    : "0 0 40px rgba(59, 130, 246, 0.2), 0 0 80px rgba(139, 92, 246, 0.1)",
                filter:
                  theme === "dark"
                    ? "drop-shadow(0 4px 20px rgba(56, 189, 248, 0.4))"
                    : "drop-shadow(0 4px 20px rgba(59, 130, 246, 0.3))",
              }}
            >
              {typewriterText}
              {currentIndex < fullText.length && (
                <span className="animate-pulse">|</span>
              )}
            </h2>

            <p
              className={`text-xl md:text-2xl max-w-5xl mx-auto mb-12 leading-relaxed transition-all duration-1000 delay-300 font-medium ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              } ${theme === "dark" ? "text-gray-100" : "text-gray-700"}`}
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
              Transform your Roblox group with our comprehensive management
              platform. From Discord integration to in-game APIs, we provide
              everything you need to run a professional, organized clan that
              scales with your ambitions.
            </p>

            <button
              className={`inline-flex items-center px-6 py-3 backdrop-blur-sm border rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 group ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              } ${
                theme === "dark"
                  ? "bg-white/10 border-white/20 text-white hover:bg-white/15 hover:border-white/30"
                  : "bg-white/80 border-blue-200/50 text-gray-800 hover:bg-white/90 hover:border-blue-300/70"
              }`}
              style={{
                transitionDelay: "0.4s",
              }}
            >
              <a href="#mission-statement">Learn More About Us</a>
              <svg
                className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>

          {/* Feature badges with staggered animations */}
          <div className="max-w-6xl mx-auto">
            {/* First row */}
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              {featureBadges.map((badge, index) => (
                <div
                  key={badge.name}
                  className={`px-6 py-3 backdrop-blur-sm border rounded-full hover:scale-110 hover:-translate-y-2 transition-all duration-300 cursor-pointer hover:shadow-lg group ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  } ${
                    theme === "dark"
                      ? `bg-gradient-to-r ${badge.colors} ${badge.border} hover:shadow-blue-500/25`
                      : `bg-gradient-to-r ${badge.colors} ${badge.border} hover:shadow-blue-500/25`
                  }`}
                  style={{ transitionDelay: isVisible ? badge.delay : "0s" }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full group-hover:scale-150 transition-transform duration-300 ${
                        theme === "dark" ? badge.dot : "bg-white"
                      }`}
                    ></div>
                    <span
                      className={`font-medium transition-colors duration-300 ${
                        theme === "dark"
                          ? "text-white group-hover:text-white"
                          : "text-white group-hover:text-white"
                      }`}
                      style={{
                        textShadow:
                          theme === "dark"
                            ? "0 1px 2px rgba(0, 0, 0, 0.5)"
                            : "0 1px 2px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      {badge.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Second row */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {featureBadges2.map((badge, index) => (
                <div
                  key={badge.name}
                  className={`px-6 py-3 backdrop-blur-sm border rounded-full hover:scale-110 hover:-translate-y-2 transition-all duration-300 cursor-pointer hover:shadow-lg group ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  } ${
                    theme === "dark"
                      ? `bg-gradient-to-r ${badge.colors} ${badge.border} hover:shadow-purple-500/25`
                      : `bg-gradient-to-r ${badge.colors} ${badge.border} hover:shadow-purple-500/25`
                  }`}
                  style={{ transitionDelay: isVisible ? badge.delay : "0s" }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full group-hover:scale-150 transition-transform duration-300 ${
                        theme === "dark" ? badge.dot : "bg-white"
                      }`}
                    ></div>
                    <span
                      className={`font-medium transition-colors duration-300 ${
                        theme === "dark"
                          ? "text-white group-hover:text-white"
                          : "text-white group-hover:text-white"
                      }`}
                      style={{
                        textShadow:
                          theme === "dark"
                            ? "0 1px 2px rgba(0, 0, 0, 0.5)"
                            : "0 1px 2px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      {badge.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom section with animation */}
          <div
            className={`text-center transition-all duration-1000 delay-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div
              className={`inline-flex items-center gap-3 px-8 py-4 backdrop-blur-sm border rounded-2xl transition-all duration-300 hover:scale-105 cursor-pointer group ${
                theme === "dark"
                  ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                  : "bg-white/80 border-blue-200/50 hover:bg-white/90 hover:border-blue-300/70"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-blue-400 to-purple-400"
                    : "bg-gradient-to-r from-blue-600 to-purple-600"
                }`}
              >
                <svg
                  className="w-4 h-4 text-white group-hover:animate-pulse"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span
                className={`font-semibold transition-colors duration-300 ${
                  theme === "dark"
                    ? "text-gray-100 group-hover:text-white"
                    : "text-gray-800 group-hover:text-gray-900"
                }`}
                style={{
                  textShadow:
                    theme === "dark"
                      ? "0 1px 2px rgba(0, 0, 0, 0.5)"
                      : "0 1px 2px rgba(0, 0, 0, 0.1)",
                }}
              >
                Join 3,000+ groups already using Clan Labs
              </span>
            </div>
          </div>
        </div>

        {/* Enhanced floating animation keyframes */}
        <style jsx>{`
          @keyframes float {
            0%,
            100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
          }

          @keyframes floatSlow {
            0%,
            100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }

          @keyframes shimmer {
            0% {
              background-position: -1000px 0;
            }
            100% {
              background-position: 1000px 0;
            }
          }

          .animate-float {
            animation: float 6s ease-in-out infinite;
          }

          .animate-float-slow {
            animation: floatSlow 8s ease-in-out infinite;
          }

          .animate-shimmer {
            animation: shimmer 3s ease-in-out infinite;
            background-size: 2000px 100%;
          }
        `}</style>
      </div>
    </section>
  );
};

export default Services;
