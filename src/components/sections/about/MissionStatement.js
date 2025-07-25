"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import useTheme from "@/hooks/useTheme";

const MissionStatement = () => {
  const [isVisible, setIsVisible] = useState(false);
  const theme = useTheme();

  const features = [
    {
      title: "Multiple Genres",
      description:
        "We're part of different communities - Star Wars, Modern Military, Sci-Fi Military, Roleplay Groups, Sword Clans, SCP, Restaurants, and more.",
      icon: "fas fa-globe",
      gradient: "from-blue-500/20 to-cyan-500/20",
      border: "border-blue-400/40",
      iconBg: "bg-blue-500/20",
    },
    {
      title: "Experienced Developers",
      description:
        "The developers behind the service are experienced in web and game development, to help you have the best tools on discord and integrate our service into your roblox games.",
      icon: "fas fa-code",
      gradient: "from-purple-500/20 to-pink-500/20",
      border: "border-purple-400/40",
      iconBg: "bg-purple-500/20",
    },
    {
      title: "Great Price",
      description:
        "We constantly add new updates for the same affordable price of $5 a month. Patrons who want to spend longer with our service get discounts.",
      icon: "fas fa-dollar-sign",
      gradient: "from-green-500/20 to-emerald-500/20",
      border: "border-green-400/40",
      iconBg: "bg-green-500/20",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("mission-statement");
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="mission-statement">
      <div
        className={`relative py-24 lg:py-32 overflow-hidden transition-all duration-500 ${
          theme === "dark"
            ? "bg-gradient-to-br from-slate-950 via-purple-900/20 to-violet-900/30"
            : "bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50"
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
                ? "bg-gradient-to-br from-purple-900/40 via-transparent to-violet-900/40"
                : "bg-gradient-to-br from-purple-200/40 via-transparent to-violet-200/40"
            } animate-pulse`}
          ></div>
          <div
            className={`absolute top-0 right-0 w-1/2 h-full transition-all duration-500 ${
              theme === "dark"
                ? "bg-gradient-to-bl from-violet-900/30 via-transparent to-transparent"
                : "bg-gradient-to-bl from-violet-200/30 via-transparent to-transparent"
            }`}
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        {/* Floating particles with theme-based colors */}
        <div
          className={`absolute top-16 left-1/4 w-40 h-40 rounded-full blur-xl animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-red-500 opacity-8" : "opacity-0"
          }`}
        ></div>

        <div
          className={`absolute bottom-32 right-1/3 w-32 h-32 rounded-full blur-xl animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-rose-500 opacity-12" : "opacity-0"
          }`}
          style={{ animationDelay: "2s" }}
        ></div>

        <div
          className={`absolute top-1/2 right-16 w-36 h-36 rounded-full blur-lg animate-ping transition-all duration-500 ${
            theme === "dark" ? "bg-red-400 opacity-10" : "opacity-0"
          }`}
          style={{ animationDelay: "1s" }}
        ></div>

        <div
          className={`absolute bottom-1/3 left-1/4 w-28 h-28 rounded-full blur-2xl animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-pink-500 opacity-6" : "opacity-0"
          }`}
          style={{ animationDelay: "4s" }}
        ></div>

        <div
          className={`absolute top-2/3 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full blur-xl animate-bounce transition-all duration-500 ${
            theme === "dark" ? "bg-rose-400 opacity-8" : "opacity-0"
          }`}
          style={{ animationDelay: "3s" }}
        ></div>

        {/* Additional glowy orbs like hero section */}
        <div
          className={`absolute top-1/4 right-1/4 w-28 h-28 rounded-full blur-xl animate-ping transition-all duration-500 ${
            theme === "dark" ? "bg-red-400/16" : "opacity-0"
          }`}
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className={`absolute bottom-1/4 right-1/4 w-52 h-52 rounded-full blur-3xl animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-rose-400/8" : "opacity-0"
          }`}
          style={{ animationDelay: "7s" }}
        ></div>
        <div
          className={`absolute top-1/3 left-1/3 w-24 h-24 rounded-full blur-lg animate-bounce transition-all duration-500 ${
            theme === "dark" ? "bg-pink-400/18" : "opacity-0"
          }`}
          style={{ animationDelay: "4s" }}
        ></div>
        <div
          className={`absolute bottom-1/2 left-1/2 transform -translate-x-1/2 w-36 h-36 rounded-full blur-2xl animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-red-500/10" : "opacity-0"
          }`}
          style={{ animationDelay: "8s" }}
        ></div>
        <div
          className={`absolute top-3/4 right-1/3 w-20 h-20 rounded-full blur-md animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-rose-500/20" : "opacity-0"
          }`}
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className={`absolute bottom-1/3 left-1/3 w-16 h-16 rounded-full blur-sm animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-red-400/14" : "opacity-0"
          }`}
          style={{ animationDelay: "5s" }}
        ></div>
        <div
          className={`absolute top-1/2 right-1/3 w-44 h-44 rounded-full blur-3xl animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-pink-500/6" : "opacity-0"
          }`}
          style={{ animationDelay: "10s" }}
        ></div>

        {/* Minimal connection lines */}
        <div
          className={`absolute top-1/3 left-0 w-40 h-px transition-all duration-500 ${
            theme === "dark"
              ? "bg-gradient-to-r from-transparent via-purple-400/8 to-transparent"
              : "bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"
          }`}
        ></div>
        <div
          className={`absolute bottom-1/3 right-0 w-40 h-px transition-all duration-500 ${
            theme === "dark"
              ? "bg-gradient-to-l from-transparent via-violet-400/8 to-transparent"
              : "bg-gradient-to-l from-transparent via-violet-500/20 to-transparent"
          }`}
        ></div>

        {/* Subtle target ring */}
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border rounded-full blur-sm transition-all duration-500 ${
            theme === "dark" ? "border-purple-400/10" : "border-purple-400/20"
          }`}
        ></div>

        <div className="container relative z-10">
          <div className="max-w-6xl mx-auto">
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
                  🎯
                </span>
                <span
                  className={`text-sm font-semibold tracking-wide transition-all duration-300 ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}
                >
                  Our Mission
                </span>
              </div>

              {/* Title */}
              <h2
                className={`text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 transition-all duration-1000 delay-200 ${
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
                Our Mission Statement
              </h2>

              {/* Mission Statement with Guy */}
              <div
                className={`max-w-6xl mx-auto mb-16 transition-all duration-1000 delay-400 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Mission Statement */}
                  <div
                    className={`backdrop-blur-sm border rounded-2xl p-8 transition-all duration-500 ${
                      theme === "dark"
                        ? "bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-400/30"
                        : "bg-gradient-to-r from-cyan-400/20 to-blue-400/20 border-cyan-500/40"
                    }`}
                  >
                    <p
                      className={`text-2xl md:text-3xl font-bold leading-relaxed transition-colors duration-300 ${
                        theme === "dark" ? "text-white" : "text-gray-800"
                      }`}
                    >
                      Be the most accessible, reliable, and affordable service.
                    </p>
                  </div>

                  {/* Guy Image */}
                  <div className="flex justify-center">
                    <div className="relative">
                      <Image
                        src="/img/misc/guy.png"
                        alt="Team Member"
                        width={500}
                        height={500}
                        className="drop-shadow-2xl"
                      />
                      {/* Glowing effect */}
                      <div
                        className={`absolute inset-0 rounded-full blur-xl transform scale-110 animate-pulse transition-all duration-500 ${
                          theme === "dark"
                            ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20"
                            : "bg-gradient-to-r from-cyan-400/30 to-blue-400/30"
                        }`}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`transition-all duration-1000 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${600 + index * 200}ms` }}
                >
                  <div
                    className={`backdrop-blur-sm border rounded-2xl p-8 h-full shadow-xl hover:scale-105 transition-all duration-300 ${
                      theme === "dark"
                        ? `bg-gradient-to-br ${feature.gradient} ${feature.border}`
                        : `bg-gradient-to-br ${feature.gradient} ${feature.border}`
                    }`}
                  >
                    <div className="relative">
                      <div className="relative z-10">
                        {/* Icon */}
                        <div
                          className={`w-16 h-16 rounded-full backdrop-blur-sm flex items-center justify-center mb-6 transition-all duration-300 ${
                            theme === "dark" ? feature.iconBg : feature.iconBg
                          }`}
                        >
                          <i
                            className={`${
                              feature.icon
                            } text-2xl transition-colors duration-300 ${
                              theme === "dark" ? "text-white" : "text-gray-800"
                            }`}
                          ></i>
                        </div>

                        {/* Title */}
                        <h3
                          className={`text-2xl font-bold mb-4 transition-colors duration-300 ${
                            theme === "dark" ? "text-white" : "text-gray-800"
                          }`}
                        >
                          {feature.title}
                        </h3>

                        {/* Description */}
                        <p
                          className={`text-lg leading-relaxed transition-colors duration-300 ${
                            theme === "dark" ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
            transform: translateY(-12px) rotate(2deg);
          }
          66% {
            transform: translateY(6px) rotate(-2deg);
          }
        }
      `}</style>
    </section>
  );
};

export default MissionStatement;
