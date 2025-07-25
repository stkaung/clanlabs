"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import useTheme from "@/hooks/useTheme";

const FeaturesOnDemand = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const theme = useTheme();

  const features = [
    {
      title: "Experience Tracking",
      description:
        "Use our dynamic experience system, to enable your members to be promoted throughout your ranks for activity awarded by officers.",
      icon: "🏆",
      gradient: "from-cyan-600 to-blue-600",
      border: "border-cyan-500",
      iconBg: "bg-cyan-500",
    },
    {
      title: "Quota tracking",
      description:
        "Keep track of your member's activity and have a historical log of how often your members are completing their assigned quotas.",
      icon: "📊",
      gradient: "from-purple-600 to-pink-600",
      border: "border-purple-500",
      iconBg: "bg-purple-500",
    },
    {
      title: "Blacklist",
      description:
        "Don't want someone progressing in your clan? Use the blacklist to prevent them from being promoted or gaining experience.",
      icon: "🚫",
      gradient: "from-red-600 to-orange-600",
      border: "border-red-500",
      iconBg: "bg-red-500",
    },
    {
      title: "Medals",
      description:
        "Award your members using our medals system to show off on their profiles, and put a spin on it by adding your own emote icons.",
      icon: "🥇",
      gradient: "from-yellow-600 to-amber-600",
      border: "border-yellow-500",
      iconBg: "bg-yellow-500",
    },
    {
      title: "Qualifications",
      description:
        "Keep track of your member's qualifications, you can use this in-game to allow your members to use certain tools or abilities.",
      icon: "📋",
      gradient: "from-green-600 to-emerald-600",
      border: "border-green-500",
      iconBg: "bg-green-500",
    },
    {
      title: "Warnings",
      description:
        "Keep a record of users misbehaviors by using our warning citations which show up on their profiles. This will help decrease misbehavior and keeping track of users who may cause you issues.",
      icon: "⚠️",
      gradient: "from-orange-600 to-red-600",
      border: "border-orange-500",
      iconBg: "bg-orange-500",
    },
    {
      title: "Analytics",
      description:
        "We track and store data on your group member count, game visits, favorites, game product and gamepass sales. You'll be able to see how well your clan is doing and profiting over the period of several months.",
      icon: "📈",
      gradient: "from-indigo-600 to-purple-600",
      border: "border-indigo-500",
      iconBg: "bg-indigo-500",
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

    const section = document.getElementById("features-on-demand");
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-advance cards every 5 seconds
  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setCurrentCard((prev) => (prev + 1) % features.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isVisible, features.length]);

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % features.length);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + features.length) % features.length);
  };

  const goToCard = (index) => {
    setCurrentCard(index);
  };

  return (
    <section id="features-on-demand">
      <div
        className={`relative py-24 lg:py-32 overflow-hidden transition-all duration-500 ${
          theme === "dark"
            ? "bg-gradient-to-br from-gray-950 via-slate-900 to-gray-900"
            : "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"
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
                ? "bg-gradient-to-br from-blue-900/40 via-transparent to-purple-900/40"
                : "bg-gradient-to-br from-blue-200/40 via-transparent to-purple-200/40"
            } animate-pulse`}
          ></div>
          <div
            className={`absolute top-0 right-0 w-1/2 h-full transition-all duration-500 ${
              theme === "dark"
                ? "bg-gradient-to-bl from-cyan-900/30 via-transparent to-transparent"
                : "bg-gradient-to-bl from-cyan-200/30 via-transparent to-transparent"
            }`}
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        {/* Floating particles with theme-based colors */}
        <div
          className={`absolute top-20 left-20 w-40 h-40 rounded-full opacity-8 blur-xl animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-red-500" : "bg-red-400"
          }`}
        ></div>

        <div
          className={`absolute top-32 right-24 w-32 h-32 rounded-full opacity-12 blur-xl animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-rose-500" : "bg-rose-400"
          }`}
          style={{ animationDelay: "2s" }}
        ></div>

        <div
          className={`absolute bottom-24 left-32 w-36 h-36 rounded-full opacity-10 blur-lg animate-ping transition-all duration-500 ${
            theme === "dark" ? "bg-red-400" : "bg-red-300"
          }`}
          style={{ animationDelay: "1s" }}
        ></div>

        <div
          className={`absolute bottom-16 right-16 w-28 h-28 rounded-full opacity-6 blur-2xl animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-pink-500" : "bg-pink-400"
          }`}
          style={{ animationDelay: "4s" }}
        ></div>

        <div
          className={`absolute bottom-20 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full opacity-8 blur-xl animate-bounce transition-all duration-500 ${
            theme === "dark" ? "bg-rose-400" : "bg-rose-300"
          }`}
          style={{ animationDelay: "3s" }}
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
                    ? "bg-white/10 border-white/20"
                    : "bg-white/80 border-blue-200/50"
                }`}
              >
                <span
                  className={`text-sm font-medium mr-2 transition-all duration-300 hover:scale-110 ${
                    theme === "dark" ? "text-blue-300" : "text-blue-600"
                  }`}
                >
                  ⚡
                </span>
                <span
                  className={`text-sm font-medium transition-all duration-300 ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}
                >
                  On-Demand Features
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
                Features on Demand
              </h2>

              {/* Description */}
              <div
                className={`max-w-4xl mx-auto space-y-4 transition-all duration-1000 delay-400 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                <p
                  className={`text-xl md:text-2xl font-semibold transition-all duration-300 ${
                    theme === "dark" ? "text-cyan-300" : "text-blue-600"
                  }`}
                >
                  Providing free new updates and maintenance.
                </p>
                <p
                  className={`text-lg md:text-xl leading-relaxed transition-all duration-300 ${
                    theme === "dark" ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  We work on unique and helpful tools to our system every week
                  to help give you the tools to modernize, organize, and
                  increase your clans quality of life.
                </p>
              </div>
            </div>

            {/* Card Carousel and Mockup */}
            <div
              className={`relative transition-all duration-1000 delay-600 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              {/* Two-column layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Column - Card Carousel */}
                <div className="order-2 lg:order-1">
                  {/* Main card container */}
                  <div className="relative h-96 md:h-80 lg:h-96 mb-8">
                    {features.map((feature, index) => {
                      const isActive = index === currentCard;
                      const isNext =
                        index === (currentCard + 1) % features.length;
                      const isPrev =
                        index ===
                        (currentCard - 1 + features.length) % features.length;

                      let cardClass =
                        "absolute inset-0 transition-all duration-700 ease-in-out";

                      if (isActive) {
                        cardClass +=
                          " opacity-100 scale-100 z-30 translate-x-0";
                      } else if (isNext) {
                        cardClass +=
                          " opacity-100 scale-95 z-20 translate-x-8 rotate-2";
                      } else if (isPrev) {
                        cardClass +=
                          " opacity-100 scale-95 z-20 -translate-x-8 -rotate-2";
                      } else {
                        cardClass += " opacity-100 scale-90 z-10 translate-x-0";
                      }

                      return (
                        <div
                          key={index}
                          className={cardClass}
                          onClick={() => goToCard(index)}
                        >
                          <div
                            className={`h-full bg-gradient-to-br ${feature.gradient} border ${feature.border} rounded-2xl p-8 cursor-pointer hover:scale-105 transition-all duration-300 relative overflow-hidden`}
                          >
                            <div className="flex flex-col h-full relative z-10">
                              {/* Icon */}
                              <div
                                className={`w-16 h-16 rounded-full ${feature.iconBg} flex items-center justify-center mb-6`}
                              >
                                <span className="text-2xl">{feature.icon}</span>
                              </div>

                              {/* Title */}
                              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                {feature.title}
                              </h3>

                              {/* Description */}
                              <p className="text-gray-300 text-lg leading-relaxed flex-1">
                                {feature.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Navigation controls */}
                  <div className="flex items-center justify-center gap-4 mb-8">
                    <button
                      onClick={prevCard}
                      className={`p-3 backdrop-blur-sm border rounded-full transition-all duration-300 hover:scale-110 ${
                        theme === "dark"
                          ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
                          : "bg-white/80 border-blue-200/50 text-gray-800 hover:bg-white/90"
                      }`}
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>

                    <button
                      onClick={nextCard}
                      className={`p-3 backdrop-blur-sm border rounded-full transition-all duration-300 hover:scale-110 ${
                        theme === "dark"
                          ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
                          : "bg-white/80 border-blue-200/50 text-gray-800 hover:bg-white/90"
                      }`}
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Card indicators */}
                  <div className="flex justify-center gap-2">
                    {features.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToCard(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentCard
                            ? theme === "dark"
                              ? "bg-white scale-125"
                              : "bg-blue-600 scale-125"
                            : theme === "dark"
                            ? "bg-white/30 hover:bg-white/50"
                            : "bg-blue-400/50 hover:bg-blue-500/70"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Right Column - Mockup */}
                <div className="order-1 lg:order-2 flex justify-center">
                  <div className="relative">
                    <Image
                      src="/img/misc/mockup.png"
                      alt="Clan Labs Mobile App Mockup"
                      width={400}
                      height={600}
                      className="drop-shadow-2xl"
                    />
                    {/* Floating animation */}
                    <div
                      className={`absolute inset-0 rounded-3xl blur-xl transform scale-110 animate-pulse transition-all duration-500 ${
                        theme === "dark"
                          ? "bg-gradient-to-r from-cyan-500/10 to-purple-500/10"
                          : "bg-gradient-to-r from-cyan-400/20 to-purple-400/20"
                      }`}
                    ></div>
                  </div>
                </div>
              </div>
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
            transform: translateY(-10px) rotate(1deg);
          }
          66% {
            transform: translateY(5px) rotate(-1deg);
          }
        }
      `}</style>
    </section>
  );
};

export default FeaturesOnDemand;
