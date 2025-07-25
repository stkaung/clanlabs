"use client";
import { useEffect, useState } from "react";
import useTheme from "@/hooks/useTheme";

const Pricing = () => {
  const [isVisible, setIsVisible] = useState(false);
  const theme = useTheme();

  const pricingPlans = [
    {
      duration: "1 Month",
      period: "30 Days",
      price: "$5",
      buttonText: "Subscribe",
      isPopular: false,
    },
    {
      duration: "3 Months",
      period: "90 Days",
      price: "$13",
      buttonText: "Save $2",
      isPopular: true,
    },
    {
      duration: "6 Months",
      period: "180 Days",
      price: "$25",
      buttonText: "Save $5",
      isPopular: false,
    },
    {
      duration: "1 Year",
      period: "365 Days",
      price: "$48",
      buttonText: "Save $12",
      isPopular: false,
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

    const section = document.getElementById("pricing");
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="pricing">
      <div
        className={`relative py-24 lg:py-32 overflow-hidden transition-all duration-500 ${
          theme === "dark"
            ? "bg-gradient-to-br from-slate-950 via-amber-900/20 to-yellow-900/30"
            : "bg-white"
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
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            theme === "dark" ? "opacity-30" : "opacity-0"
          }`}
        >
          <div
            className={`absolute top-0 left-0 w-full h-full transition-all duration-500 ${
              theme === "dark"
                ? "bg-gradient-to-br from-amber-900/40 via-transparent to-yellow-900/40"
                : "bg-gradient-to-br from-amber-200/40 via-transparent to-yellow-200/40"
            } animate-pulse`}
          ></div>
          <div
            className={`absolute top-0 right-0 w-1/2 h-full transition-all duration-500 ${
              theme === "dark"
                ? "bg-gradient-to-bl from-yellow-900/30 via-transparent to-transparent"
                : "bg-gradient-to-bl from-yellow-200/30 via-transparent to-transparent"
            }`}
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        {/* Floating particles with theme-based colors */}
        <div
          className={`absolute top-24 left-1/3 w-40 h-40 rounded-full blur-xl animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-green-500 opacity-8" : "opacity-0"
          }`}
        ></div>

        <div
          className={`absolute bottom-24 right-1/4 w-32 h-32 rounded-full blur-xl animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-emerald-500 opacity-12" : "opacity-0"
          }`}
          style={{ animationDelay: "2s" }}
        ></div>

        <div
          className={`absolute top-1/3 right-1/3 w-36 h-36 rounded-full blur-lg animate-ping transition-all duration-500 ${
            theme === "dark" ? "bg-green-400 opacity-10" : "opacity-0"
          }`}
          style={{ animationDelay: "1s" }}
        ></div>

        <div
          className={`absolute bottom-1/3 left-1/3 w-28 h-28 rounded-full blur-2xl animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-teal-500 opacity-6" : "opacity-0"
          }`}
          style={{ animationDelay: "4s" }}
        ></div>

        <div
          className={`absolute top-2/3 left-1/4 w-16 h-16 rounded-full blur-xl animate-bounce transition-all duration-500 ${
            theme === "dark" ? "bg-emerald-400 opacity-8" : "opacity-0"
          }`}
          style={{ animationDelay: "3s" }}
        ></div>

        {/* Additional glowy orbs like hero section */}
        <div
          className={`absolute top-1/4 left-1/4 w-28 h-28 rounded-full blur-xl animate-ping transition-all duration-500 ${
            theme === "dark" ? "bg-green-400/16" : "opacity-0"
          }`}
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className={`absolute bottom-1/4 left-1/4 w-52 h-52 rounded-full blur-3xl animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-emerald-400/8" : "opacity-0"
          }`}
          style={{ animationDelay: "7s" }}
        ></div>
        <div
          className={`absolute top-1/2 right-1/4 w-24 h-24 rounded-full blur-lg animate-bounce transition-all duration-500 ${
            theme === "dark" ? "bg-teal-400/18" : "opacity-0"
          }`}
          style={{ animationDelay: "4s" }}
        ></div>
        <div
          className={`absolute bottom-1/2 right-1/2 transform translate-x-1/2 w-36 h-36 rounded-full blur-2xl animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-green-500/10" : "opacity-0"
          }`}
          style={{ animationDelay: "8s" }}
        ></div>
        <div
          className={`absolute top-3/4 left-1/3 w-20 h-20 rounded-full blur-md animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-emerald-500/20" : "opacity-0"
          }`}
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className={`absolute bottom-1/4 right-1/3 w-16 h-16 rounded-full blur-sm animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-green-400/14" : "opacity-0"
          }`}
          style={{ animationDelay: "5s" }}
        ></div>
        <div
          className={`absolute top-1/3 left-1/2 transform -translate-x-1/2 w-44 h-44 rounded-full blur-3xl animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-teal-500/6" : "opacity-0"
          }`}
          style={{ animationDelay: "10s" }}
        ></div>

        {/* Minimal connection lines */}
        <div
          className={`absolute top-1/3 left-0 w-40 h-px transition-all duration-500 ${
            theme === "dark"
              ? "bg-gradient-to-r from-transparent via-amber-400/8 to-transparent"
              : "opacity-0"
          }`}
        ></div>
        <div
          className={`absolute bottom-1/3 right-0 w-40 h-px transition-all duration-500 ${
            theme === "dark"
              ? "bg-gradient-to-l from-transparent via-yellow-400/8 to-transparent"
              : "opacity-0"
          }`}
        ></div>

        {/* Subtle value indicators */}
        <div
          className={`absolute top-1/3 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full transition-all duration-500 ${
            theme === "dark" ? "bg-amber-400/20" : "opacity-0"
          }`}
        ></div>
        <div
          className={`absolute bottom-1/3 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full transition-all duration-500 ${
            theme === "dark" ? "bg-yellow-400/20" : "opacity-0"
          }`}
        ></div>

        <div className="container relative z-10">
          <div className="max-w-7xl mx-auto">
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
                  💰
                </span>
                <span
                  className={`text-sm font-semibold tracking-wide transition-all duration-300 ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}
                >
                  Subscription Plans
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
                Pricing
              </h2>

              {/* Subtitle */}
              <div
                className={`max-w-3xl mx-auto space-y-2 transition-all duration-1000 delay-400 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                <p
                  className={`text-xl md:text-2xl transition-colors duration-300 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Choose a subscription that fits your needs.
                </p>
                <p
                  className={`text-lg transition-colors duration-300 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Prices shown are in USD.
                </p>
              </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {pricingPlans.map((plan, index) => (
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
                    className={`relative backdrop-blur-sm border rounded-3xl p-8 h-full shadow-2xl hover:scale-105 transition-all duration-300 ${
                      plan.isPopular
                        ? theme === "dark"
                          ? "border-blue-400/50 ring-2 ring-blue-400/30"
                          : "border-blue-500/60 ring-2 ring-blue-500/40"
                        : theme === "dark"
                        ? "border-slate-700/50"
                        : "border-gray-300/50"
                    } ${
                      theme === "dark"
                        ? "bg-gradient-to-br from-slate-800/70 to-slate-900/70"
                        : "bg-gradient-to-br from-white/80 to-white/60"
                    }`}
                  >
                    {/* Popular badge */}
                    {plan.isPopular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <div
                          className={`px-4 py-1 rounded-full text-sm font-bold transition-all duration-300 ${
                            theme === "dark"
                              ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                              : "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                          }`}
                        >
                          Most Popular
                        </div>
                      </div>
                    )}

                    {/* Additional overlay for better readability */}
                    <div
                      className={`absolute inset-0 rounded-3xl transition-all duration-300 ${
                        theme === "dark" ? "bg-black/20" : "bg-white/20"
                      }`}
                    ></div>

                    <div className="relative z-10 text-center">
                      {/* Duration */}
                      <h3
                        className={`text-2xl font-bold mb-2 transition-colors duration-300 ${
                          theme === "dark" ? "text-white" : "text-gray-800"
                        }`}
                      >
                        {plan.duration}
                      </h3>

                      {/* Period */}
                      <p
                        className={`text-lg mb-8 transition-colors duration-300 ${
                          theme === "dark" ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {plan.period}
                      </p>

                      {/* Price */}
                      <div className="mb-8">
                        <span
                          className={`text-5xl font-bold transition-colors duration-300 ${
                            theme === "dark" ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {plan.price}
                        </span>
                      </div>

                      {/* Button */}
                      <a
                        href="https://store.clanlabs.co/product/subscription"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-block w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 transform ${
                          plan.isPopular
                            ? theme === "dark"
                              ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl"
                              : "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl"
                            : theme === "dark"
                            ? "bg-slate-700/50 text-white border border-slate-600/50 hover:bg-slate-600/50 hover:border-slate-500/50"
                            : "bg-gray-200/50 text-gray-800 border border-gray-300/50 hover:bg-gray-300/50 hover:border-gray-400/50"
                        }`}
                      >
                        {plan.buttonText}
                      </a>
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

export default Pricing;
