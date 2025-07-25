"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import useTheme from "@/hooks/useTheme";

const UsVsOthers = () => {
  const [isVisible, setIsVisible] = useState(false);
  const theme = useTheme();

  const comparisons = [
    {
      title: "We've been around for",
      highlight: "6 years",
      icon: <i className="fas fa-clock text-cyan-400 text-5xl"></i>,
      them: {
        title: "Them",
        description:
          "Other developers may quit on your group, normally after an internal dispute from ranks or arguing over payment.",
        icon: "⚠️",
        color: "text-red-400",
        bgColor: "bg-red-500/10",
        borderColor: "border-red-400/30",
      },
      us: {
        title: "Us",
        description:
          "We care about our service, and plan to continue running indefinitely for the years to come!",
        icon: "🏆",
        color: "text-green-400",
        bgColor: "bg-green-500/10",
        borderColor: "border-green-400/30",
      },
    },
    {
      title: "Every feature is",
      highlight: "Free",
      icon: <i className="fas fa-puzzle-piece text-cyan-400 text-5xl"></i>,
      them: {
        title: "Them",
        description:
          "Your cost with a contracted developer may drive up as you need more features to run effectively. Most developers may charge a large sum as well as additional hosting fees, while we're only $5 a month.",
        icon: "💸",
        color: "text-red-400",
        bgColor: "bg-red-500/10",
        borderColor: "border-red-400/30",
      },
      us: {
        title: "Us",
        description:
          "We will never raise our price, every update is free to paying subscribers!",
        icon: "🎁",
        color: "text-green-400",
        bgColor: "bg-green-500/10",
        borderColor: "border-green-400/30",
      },
    },
    {
      title: "Our service runs",
      highlight: "Superclans",
      icon: <i className="fas fa-users text-cyan-400 text-5xl"></i>,
      them: {
        title: "Them",
        description:
          "Getting a new database functional takes time, and requires months of debugging and testing, it's not always proven to work and you have to hope it does get fixed.",
        icon: "🐛",
        color: "text-red-400",
        bgColor: "bg-red-500/10",
        borderColor: "border-red-400/30",
      },
      us: {
        title: "Us",
        description:
          "You can run your clan with our service by following our tutorial video on how to set it up, many clans that use us run without issue.",
        icon: "⚡",
        color: "text-green-400",
        bgColor: "bg-green-500/10",
        borderColor: "border-green-400/30",
      },
    },
    {
      title: "Our service is",
      highlight: "Trusted",
      icon: <i className="fas fa-gavel text-cyan-400 text-5xl"></i>,
      them: {
        title: "Them",
        description:
          "Depending on who you hire, you may have issues with being able to trust your developer to not backdoor your game and possibly mass admin abuse.",
        icon: "🔓",
        color: "text-red-400",
        bgColor: "bg-red-500/10",
        borderColor: "border-red-400/30",
      },
      us: {
        title: "Us",
        description:
          "We manage over 3,000 groups and share no bias towards one or another as we're a neutral party that simply wants your group to thrive.",
        icon: "🛡️",
        color: "text-green-400",
        bgColor: "bg-green-500/10",
        borderColor: "border-green-400/30",
      },
    },
    {
      title: "We keep your data",
      highlight: "Secure",
      icon: <i className="fas fa-database text-cyan-400 text-5xl"></i>,
      them: {
        title: "Them",
        description:
          "Not every developer knows best practices, and may host the data in a manner that is exploitable, and once gone, can't be restored.",
        icon: "🔐",
        color: "text-red-400",
        bgColor: "bg-red-500/10",
        borderColor: "border-red-400/30",
      },
      us: {
        title: "Us",
        description:
          "Every clan has their own credentials, and API security settings. Our databases are backed up daily, and you can request to download any data stored at any time.",
        icon: "🔒",
        color: "text-green-400",
        bgColor: "bg-green-500/10",
        borderColor: "border-green-400/30",
      },
    },
    {
      title: "We keep you",
      highlight: "Informed",
      icon: <i className="fas fa-bell text-cyan-400 text-5xl"></i>,
      them: {
        title: "Them",
        description:
          "You may not always get updates on changes, or know if a command is properly documented with a new service or contracted developer, which cause delays in help.",
        icon: "❓",
        color: "text-red-400",
        bgColor: "bg-red-500/10",
        borderColor: "border-red-400/30",
      },
      us: {
        title: "Us",
        description:
          "We actively announce our updates, and every command has examples with their syntax, we also have a staff team experienced with the service to help.",
        icon: "📢",
        color: "text-green-400",
        bgColor: "bg-green-500/10",
        borderColor: "border-green-400/30",
      },
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

    const section = document.getElementById("us-vs-others");
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="us-vs-others">
      <div
        className={`relative py-24 lg:py-32 overflow-hidden transition-all duration-500 ${
          theme === "dark"
            ? "bg-gradient-to-br from-slate-950 via-blue-900/20 to-cyan-900/30"
            : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
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
                ? "bg-gradient-to-br from-blue-900/40 via-transparent to-cyan-900/40"
                : "bg-gradient-to-br from-orange-200/40 via-transparent to-amber-200/40"
            } animate-pulse`}
          ></div>
          <div
            className={`absolute top-0 right-0 w-1/2 h-full transition-all duration-500 ${
              theme === "dark"
                ? "bg-gradient-to-bl from-cyan-900/30 via-transparent to-transparent"
                : "bg-gradient-to-bl from-yellow-200/30 via-transparent to-transparent"
            }`}
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        {/* Floating particles with theme-based colors */}
        <div
          className={`absolute top-20 left-20 w-40 h-40 rounded-full opacity-8 blur-xl animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-blue-500" : "bg-orange-400"
          }`}
        ></div>

        <div
          className={`absolute top-32 right-24 w-32 h-32 rounded-full opacity-12 blur-xl animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-cyan-500" : "bg-amber-400"
          }`}
          style={{ animationDelay: "2s" }}
        ></div>

        <div
          className={`absolute bottom-24 left-32 w-36 h-36 rounded-full opacity-10 blur-lg animate-ping transition-all duration-500 ${
            theme === "dark" ? "bg-blue-500" : "bg-yellow-400"
          }`}
          style={{ animationDelay: "1s" }}
        ></div>

        <div
          className={`absolute bottom-16 right-16 w-28 h-28 rounded-full opacity-6 blur-2xl animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-cyan-500" : "bg-orange-400"
          }`}
          style={{ animationDelay: "4s" }}
        ></div>

        <div
          className={`absolute bottom-20 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full opacity-8 blur-xl animate-bounce transition-all duration-500 ${
            theme === "dark" ? "bg-blue-400" : "bg-amber-300"
          }`}
          style={{ animationDelay: "3s" }}
        ></div>

        {/* Minimal connection lines */}
        <div
          className={`absolute top-1/3 left-0 w-40 h-px transition-all duration-500 ${
            theme === "dark"
              ? "bg-gradient-to-r from-transparent via-blue-400/8 to-transparent"
              : "bg-gradient-to-r from-transparent via-orange-500/20 to-transparent"
          }`}
        ></div>
        <div
          className={`absolute bottom-1/3 right-0 w-40 h-px transition-all duration-500 ${
            theme === "dark"
              ? "bg-gradient-to-l from-transparent via-cyan-400/8 to-transparent"
              : "bg-gradient-to-l from-transparent via-amber-500/20 to-transparent"
          }`}
        ></div>

        {/* Subtle center divider */}
        <div
          className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-full transition-all duration-500 ${
            theme === "dark"
              ? "bg-gradient-to-b from-transparent via-blue-400/10 to-transparent"
              : "bg-gradient-to-b from-transparent via-orange-400/20 to-transparent"
          }`}
        ></div>

        <div className="container relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-20">
              {/* Badge */}
              <div
                className={`inline-flex items-center px-4 py-2 backdrop-blur-sm rounded-full border shadow-lg mb-8 transition-all duration-1000 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                } ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-blue-500/20 to-green-500/20 border-blue-400/30"
                    : "bg-gradient-to-r from-orange-400/30 to-amber-400/30 border-orange-500/40"
                }`}
              >
                <span
                  className={`text-sm font-medium mr-2 transition-all duration-300 hover:scale-110 ${
                    theme === "dark" ? "text-blue-300" : "text-orange-600"
                  }`}
                >
                  ⚖️
                </span>
                <span
                  className={`text-sm font-semibold tracking-wide transition-all duration-300 ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}
                >
                  Comparison
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
                Us vs. Others
              </h2>

              {/* Subtitle */}
              <p
                className={`text-xl md:text-2xl transition-all duration-1000 delay-400 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                } ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
              >
                Why you may want to choose us.
              </p>
            </div>

            {/* Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {comparisons.map((comparison, index) => (
                <div
                  key={index}
                  className={`transition-all duration-1000 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${600 + index * 100}ms` }}
                >
                  <div
                    className={`backdrop-blur-sm border rounded-3xl p-6 h-full shadow-xl transition-all duration-500 ${
                      theme === "dark"
                        ? "bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-slate-700/40"
                        : "bg-gradient-to-br from-white/80 to-white/60 border-orange-200/50"
                    }`}
                  >
                    {/* Header */}
                    <div className="text-center mb-6">
                      <div className="flex justify-center mb-4">
                        {comparison.icon}
                      </div>
                      <h3
                        className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
                          theme === "dark" ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {comparison.title}
                      </h3>
                      <div
                        className={`text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent transition-all duration-300 ${
                          theme === "dark" ? "" : "from-orange-500 to-amber-500"
                        }`}
                      >
                        {comparison.highlight}
                      </div>
                    </div>

                    {/* Comparison containers with equal heights */}
                    <div className="flex flex-col gap-4 flex-1">
                      {/* Us Section */}
                      <div
                        className={`${comparison.us.bgColor} ${
                          comparison.us.borderColor
                        } border backdrop-blur-sm rounded-2xl p-4 flex flex-col flex-1 transition-all duration-300 ${
                          theme === "dark"
                            ? ""
                            : "bg-green-400/20 border-green-400/40"
                        }`}
                      >
                        <div className="flex items-center mb-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 transition-all duration-300 ${
                              theme === "dark"
                                ? "bg-green-500/20"
                                : "bg-green-500/30"
                            }`}
                          >
                            <span className="text-lg">
                              {comparison.us.icon}
                            </span>
                          </div>
                          <h4
                            className={`font-bold text-lg transition-colors duration-300 ${
                              theme === "dark"
                                ? comparison.us.color
                                : "text-green-600"
                            }`}
                          >
                            {comparison.us.title}
                          </h4>
                        </div>
                        <p
                          className={`text-sm leading-relaxed flex-1 transition-colors duration-300 ${
                            theme === "dark" ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          {comparison.us.description}
                        </p>
                      </div>

                      {/* Them Section */}
                      <div
                        className={`${comparison.them.bgColor} ${
                          comparison.them.borderColor
                        } border backdrop-blur-sm rounded-2xl p-4 flex flex-col flex-1 transition-all duration-300 ${
                          theme === "dark"
                            ? ""
                            : "bg-red-400/20 border-red-400/40"
                        }`}
                      >
                        <div className="flex items-center mb-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 transition-all duration-300 ${
                              theme === "dark"
                                ? "bg-red-500/20"
                                : "bg-red-500/30"
                            }`}
                          >
                            <span className="text-lg">
                              {comparison.them.icon}
                            </span>
                          </div>
                          <h4
                            className={`font-bold text-lg transition-colors duration-300 ${
                              theme === "dark"
                                ? comparison.them.color
                                : "text-red-600"
                            }`}
                          >
                            {comparison.them.title}
                          </h4>
                        </div>
                        <p
                          className={`text-sm leading-relaxed flex-1 transition-colors duration-300 ${
                            theme === "dark" ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          {comparison.them.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Square Grid Floor Background - Full Width */}
        <div className="absolute bottom-0 left-0 w-full h-48 overflow-hidden">
          <div className="absolute bottom-0 left-0 z-10 w-full">
            <Image
              src="/img/misc/square-floor.png"
              alt="Square Grid Floor"
              width={1920}
              height={200}
              className={`opacity-100 w-full transition-all duration-500 ${
                theme === "dark" ? "brightness-200" : "brightness-75"
              }`}
              priority
            />
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

export default UsVsOthers;
