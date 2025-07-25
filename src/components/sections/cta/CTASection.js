"use client";
import { useEffect, useState } from "react";
import useTheme from "@/hooks/useTheme";

const CTASection = () => {
  const [isVisible, setIsVisible] = useState(false);
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

    const section = document.getElementById("cta-section");
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="cta-section">
      <div
        className={`relative py-24 lg:py-32 overflow-hidden transition-all duration-500 ${
          theme === "dark"
            ? "bg-gradient-to-br from-slate-950 via-orange-900/20 to-red-900/30"
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
                ? "bg-gradient-to-br from-orange-900/40 via-transparent to-red-900/40"
                : "bg-gradient-to-br from-orange-200/40 via-transparent to-red-200/40"
            } animate-pulse`}
          ></div>
          <div
            className={`absolute top-0 right-0 w-1/2 h-full transition-all duration-500 ${
              theme === "dark"
                ? "bg-gradient-to-bl from-red-900/30 via-transparent to-transparent"
                : "bg-gradient-to-bl from-red-200/30 via-transparent to-transparent"
            }`}
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        {/* Floating particles with theme-based colors */}
        <div
          className={`absolute top-36 left-1/3 w-40 h-40 rounded-full blur-xl animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-red-500 opacity-8" : "opacity-0"
          }`}
        ></div>

        <div
          className={`absolute bottom-36 right-1/4 w-32 h-32 rounded-full blur-xl animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-rose-500 opacity-12" : "opacity-0"
          }`}
          style={{ animationDelay: "2s" }}
        ></div>

        <div
          className={`absolute top-1/3 left-1/4 w-36 h-36 rounded-full blur-lg animate-ping transition-all duration-500 ${
            theme === "dark" ? "bg-red-400 opacity-10" : "opacity-0"
          }`}
          style={{ animationDelay: "1s" }}
        ></div>

        <div
          className={`absolute bottom-1/3 right-1/3 w-28 h-28 rounded-full blur-2xl animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-pink-500 opacity-6" : "opacity-0"
          }`}
          style={{ animationDelay: "4s" }}
        ></div>

        <div
          className={`absolute top-2/3 right-1/4 w-16 h-16 rounded-full blur-xl animate-bounce transition-all duration-500 ${
            theme === "dark" ? "bg-rose-400 opacity-8" : "opacity-0"
          }`}
          style={{ animationDelay: "3s" }}
        ></div>

        {/* Additional glowy orbs like hero section */}
        <div
          className={`absolute top-1/4 left-1/4 w-28 h-28 rounded-full blur-xl animate-ping transition-all duration-500 ${
            theme === "dark" ? "bg-red-400/16" : "opacity-0"
          }`}
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className={`absolute bottom-1/4 left-1/4 w-52 h-52 rounded-full blur-3xl animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-rose-400/8" : "opacity-0"
          }`}
          style={{ animationDelay: "7s" }}
        ></div>
        <div
          className={`absolute top-1/2 right-1/3 w-24 h-24 rounded-full blur-lg animate-bounce transition-all duration-500 ${
            theme === "dark" ? "bg-pink-400/18" : "opacity-0"
          }`}
          style={{ animationDelay: "4s" }}
        ></div>
        <div
          className={`absolute bottom-1/2 right-1/2 transform translate-x-1/2 w-36 h-36 rounded-full blur-2xl animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-red-500/10" : "opacity-0"
          }`}
          style={{ animationDelay: "8s" }}
        ></div>
        <div
          className={`absolute top-3/4 left-1/3 w-20 h-20 rounded-full blur-md animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-rose-500/20" : "opacity-0"
          }`}
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className={`absolute bottom-1/4 right-1/3 w-16 h-16 rounded-full blur-sm animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-red-400/14" : "opacity-0"
          }`}
          style={{ animationDelay: "5s" }}
        ></div>
        <div
          className={`absolute top-1/3 right-1/2 transform translate-x-1/2 w-44 h-44 rounded-full blur-3xl animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-pink-500/6" : "opacity-0"
          }`}
          style={{ animationDelay: "10s" }}
        ></div>

        {/* Minimal connection lines */}
        <div
          className={`absolute top-1/3 left-0 w-40 h-px transition-all duration-500 ${
            theme === "dark"
              ? "bg-gradient-to-r from-transparent via-orange-400/8 to-transparent"
              : "opacity-0"
          }`}
        ></div>
        <div
          className={`absolute bottom-1/3 right-0 w-40 h-px transition-all duration-500 ${
            theme === "dark"
              ? "bg-gradient-to-l from-transparent via-red-400/8 to-transparent"
              : "opacity-0"
          }`}
        ></div>

        {/* Subtle action indicators */}
        <div
          className={`absolute top-1/3 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full transition-all duration-500 ${
            theme === "dark" ? "bg-orange-400/20" : "opacity-0"
          }`}
        ></div>
        <div
          className={`absolute bottom-1/3 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full transition-all duration-500 ${
            theme === "dark" ? "bg-red-400/20" : "opacity-0"
          }`}
        ></div>

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
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
                Get Support
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
              Still not sure about Clan Labs?
            </h2>

            {/* Description */}
            <p
              className={`text-xl md:text-2xl leading-relaxed mb-12 transition-all duration-1000 delay-400 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              } ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
            >
              Talk to us on Discord so we can help figure out if our service is
              right for you. There&apos;s more updates always being made.
            </p>

            {/* CTA Button */}
            <div
              className={`transition-all duration-1000 delay-600 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <a
                href="https://discord.gg/A7bSWBw"
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative inline-flex items-center px-12 py-6 font-bold text-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 transform ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                }`}
              >
                <div className="relative flex items-center">
                  <svg
                    className="w-8 h-8 mr-4 group-hover:animate-bounce"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0190 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z" />
                  </svg>
                  Join Our Discord
                  <svg
                    className="w-6 h-6 ml-4 group-hover:translate-x-1 transition-transform duration-300"
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
                </div>
              </a>
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
            transform: translateY(-6px) rotate(1deg);
          }
          66% {
            transform: translateY(3px) rotate(-1deg);
          }
        }
      `}</style>
    </section>
  );
};

export default CTASection;
