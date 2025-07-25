"use client";
import { useVideoModal } from "@/context_api/VideoModalContext";
import { useEffect, useState } from "react";
import Image from "next/image";
import useTheme from "@/hooks/useTheme";

const TutorialVideos = () => {
  const [isVisible, setIsVisible] = useState(false);
  const theme = useTheme();
  const {
    isAnyVideoModalOpen,
    openModalType,
    openVideoModal,
    closeVideoModal,
  } = useVideoModal();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("tutorial-videos");
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const openVideoModalHandler = () => {
    openVideoModal("tutorial");
  };

  return (
    <section id="tutorial-videos">
      <div
        className={`relative py-24 lg:py-32 overflow-hidden transition-all duration-500 ${
          theme === "dark"
            ? "bg-gradient-to-br from-slate-800 via-blue-900/20 to-indigo-900/30"
            : "bg-gradient-to-br from-indigo-50 via-purple-50 to-violet-50"
        }`}
      >
        {/* Professional overlay */}
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            theme === "dark" ? "bg-black/20" : ""
          }`}
        ></div>

        {/* Soft, organic gradient shapes */}
        <div className="absolute inset-0">
          <div
            className={`absolute top-0 left-0 w-1/2 h-1/2 rounded-full blur-3xl transition-all duration-500 ${
              theme === "dark"
                ? "bg-gradient-to-br from-blue-500/10 via-transparent to-transparent"
                : "bg-gradient-to-br from-blue-400/20 via-transparent to-transparent"
            }`}
          ></div>
          <div
            className={`absolute top-1/4 right-0 w-1/2 h-1/2 rounded-full blur-3xl transition-all duration-500 ${
              theme === "dark"
                ? "bg-gradient-to-bl from-indigo-500/10 via-transparent to-transparent"
                : "bg-gradient-to-bl from-indigo-400/20 via-transparent to-transparent"
            }`}
          ></div>
          <div
            className={`absolute bottom-0 left-1/3 w-1/2 h-1/2 rounded-full blur-3xl transition-all duration-500 ${
              theme === "dark"
                ? "bg-gradient-to-tr from-cyan-500/8 via-transparent to-transparent"
                : "bg-gradient-to-tr from-cyan-400/15 via-transparent to-transparent"
            }`}
          ></div>
        </div>

        {/* Subtle grid pattern */}
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            theme === "dark" ? "opacity-5" : "opacity-30"
          }`}
          style={{
            backgroundImage:
              theme === "dark"
                ? `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `
                : `
                linear-gradient(rgba(59,130,246,0.2) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59,130,246,0.2) 1px, transparent 1px)
              `,
            backgroundSize: "100px 100px",
          }}
        ></div>

        {/* Enhanced floating elements with more orbs */}
        <div
          className={`absolute top-24 left-1/3 w-32 h-32 rounded-full blur-xl animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-blue-500/8" : "bg-blue-400/15"
          }`}
        ></div>
        <div
          className={`absolute bottom-24 right-1/4 w-24 h-24 rounded-full blur-xl animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-indigo-500/6" : "bg-indigo-400/12"
          }`}
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className={`absolute top-1/3 right-1/3 w-28 h-28 rounded-full blur-xl animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-cyan-500/7" : "bg-cyan-400/14"
          }`}
          style={{ animationDelay: "4s" }}
        ></div>
        <div
          className={`absolute bottom-1/3 left-1/4 w-20 h-20 rounded-full blur-xl animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-blue-500/5" : "bg-blue-400/10"
          }`}
          style={{ animationDelay: "6s" }}
        ></div>

        {/* Additional glowy orbs like hero section */}
        <div
          className={`absolute top-1/4 right-1/4 w-36 h-36 rounded-full blur-2xl animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-indigo-400/4" : "bg-indigo-400/8"
          }`}
          style={{ animationDelay: "3s" }}
        ></div>
        <div
          className={`absolute bottom-1/4 left-1/3 w-40 h-40 rounded-full blur-3xl animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-cyan-400/3" : "bg-cyan-400/6"
          }`}
          style={{ animationDelay: "7s" }}
        ></div>
        <div
          className={`absolute top-2/3 right-1/4 w-16 h-16 rounded-full blur-lg animate-bounce transition-all duration-500 ${
            theme === "dark" ? "bg-blue-400/9" : "bg-blue-400/18"
          }`}
          style={{ animationDelay: "5s" }}
        ></div>
        <div
          className={`absolute bottom-1/2 right-1/2 transform translate-x-1/2 w-44 h-44 rounded-full blur-3xl animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-indigo-500/2" : "bg-indigo-400/4"
          }`}
          style={{ animationDelay: "8s" }}
        ></div>
        <div
          className={`absolute top-1/2 left-1/4 w-12 h-12 rounded-full blur-md animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-cyan-500/10" : "bg-cyan-400/20"
          }`}
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className={`absolute bottom-1/4 right-1/3 w-20 h-20 rounded-full blur-sm animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-blue-400/6" : "bg-blue-400/12"
          }`}
          style={{ animationDelay: "9s" }}
        ></div>
        <div
          className={`absolute top-1/3 left-1/2 transform -translate-x-1/2 w-48 h-48 rounded-full blur-3xl animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-indigo-400/2" : "bg-indigo-400/4"
          }`}
          style={{ animationDelay: "10s" }}
        ></div>

        {/* Subtle connection lines */}
        <div
          className={`absolute top-1/3 left-0 w-32 h-px transition-all duration-500 ${
            theme === "dark"
              ? "bg-gradient-to-r from-transparent via-blue-400/10 to-transparent"
              : "bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"
          }`}
        ></div>
        <div
          className={`absolute bottom-1/3 right-0 w-32 h-px transition-all duration-500 ${
            theme === "dark"
              ? "bg-gradient-to-l from-transparent via-indigo-400/10 to-transparent"
              : "bg-gradient-to-l from-transparent via-indigo-500/20 to-transparent"
          }`}
        ></div>
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 w-24 h-px transition-all duration-500 ${
            theme === "dark"
              ? "bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent"
              : "bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
          }`}
        ></div>

        <div className="container relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Two-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
              {/* Left Column - Text Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Badge */}
                <div
                  className={`inline-flex items-center px-4 py-2 backdrop-blur-sm rounded-full border transition-all duration-1000 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  } ${
                    theme === "dark"
                      ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-400/30"
                      : "bg-gradient-to-r from-cyan-400/30 to-purple-400/30 border-cyan-500/40"
                  }`}
                >
                  <span
                    className={`text-sm font-medium mr-2 transition-colors duration-300 ${
                      theme === "dark" ? "text-cyan-300" : "text-cyan-600"
                    }`}
                  >
                    📚
                  </span>
                  <span
                    className={`text-sm font-semibold tracking-wide transition-colors duration-300 ${
                      theme === "dark" ? "text-white" : "text-gray-800"
                    }`}
                  >
                    Learn & Support
                  </span>
                </div>

                {/* Main Title */}
                <h1
                  className={`text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight transition-all duration-1000 delay-200 ${
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
                  Tutorial Videos
                </h1>

                {/* Description */}
                <div
                  className={`space-y-4 transition-all duration-1000 delay-400 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                >
                  <p
                    className={`text-2xl md:text-3xl font-bold transition-colors duration-300 ${
                      theme === "dark" ? "text-cyan-300" : "text-blue-700"
                    }`}
                  >
                    Clan Labs helps you manage your group from Discord!
                  </p>
                  <p
                    className={`text-lg md:text-xl leading-relaxed transition-colors duration-300 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    We provide guides for our customers to be able to setup our
                    service to meet their needs and understand the features we
                    provide. If you can&apos;t find anything documented, talk to
                    our customer service for support.
                  </p>
                </div>

                {/* Discord Support Button */}
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
                    className={`group relative inline-flex items-center px-8 py-4 backdrop-blur-sm border rounded-xl font-bold text-lg shadow-2xl transition-all duration-300 hover:scale-105 transform ${
                      theme === "dark"
                        ? "bg-white/10 border-white/20 text-white hover:bg-white/15 hover:border-white/30"
                        : "bg-white/80 border-blue-200/50 text-gray-800 hover:bg-white/90 hover:border-blue-300/70"
                    }`}
                  >
                    <div className="relative flex items-center">
                      <svg
                        className="w-6 h-6 mr-3 group-hover:animate-bounce"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0190 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z" />
                      </svg>
                      Join the Discord for Support
                      <svg
                        className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300"
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

                {/* Decorative elements */}
                <div
                  className={`flex space-x-6 transition-all duration-1000 delay-800 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 ${
                      theme === "dark"
                        ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-400/30"
                        : "bg-gradient-to-r from-cyan-400/30 to-blue-400/30 border-cyan-500/40"
                    }`}
                  >
                    <span className="text-xl">💡</span>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 ${
                      theme === "dark"
                        ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/30"
                        : "bg-gradient-to-r from-purple-400/30 to-pink-400/30 border-purple-500/40"
                    }`}
                  >
                    <span className="text-xl">🎯</span>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 ${
                      theme === "dark"
                        ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400/30"
                        : "bg-gradient-to-r from-green-400/30 to-emerald-400/30 border-green-500/40"
                    }`}
                  >
                    <span className="text-xl">🚀</span>
                  </div>
                </div>
              </div>

              {/* Right Column - Video Thumbnail */}
              <div
                className={`lg:col-span-3 flex justify-center lg:justify-end transition-all duration-1000 delay-600 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                <div
                  className="relative group cursor-pointer"
                  onClick={openVideoModalHandler}
                >
                  <div
                    className={`relative w-[600px] h-[338px] rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:scale-105 ${
                      theme === "dark"
                        ? "hover:shadow-purple-500/50"
                        : "hover:shadow-blue-500/30"
                    }`}
                  >
                    <Image
                      src="/img/misc/tutorial-thumbnail.png"
                      alt="Tutorial Video Thumbnail"
                      fill
                      className="object-cover"
                    />
                    {/* Dark overlay on hover */}
                    <div
                      className={`absolute inset-0 transition-all duration-300 ${
                        theme === "dark"
                          ? "bg-black/20 group-hover:bg-black/40"
                          : "bg-black/10 group-hover:bg-black/20"
                      }`}
                    ></div>

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-300 backdrop-blur-sm ${
                          theme === "dark"
                            ? "bg-gradient-to-r from-blue-500/90 to-blue-600/90"
                            : "bg-gradient-to-r from-blue-600/90 to-blue-700/90"
                        }`}
                      >
                        <svg
                          className="w-12 h-12 text-white ml-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>

                    {/* Gradient border */}
                    <div
                      className={`absolute inset-0 rounded-2xl border-2 border-transparent transition-all duration-300 opacity-0 group-hover:opacity-100 ${
                        theme === "dark"
                          ? "bg-gradient-to-r from-cyan-500/50 via-purple-500/50 to-pink-500/50 group-hover:from-cyan-500/80 group-hover:via-purple-500/80 group-hover:to-pink-500/80"
                          : "bg-gradient-to-r from-cyan-500/40 via-purple-500/40 to-pink-500/40 group-hover:from-cyan-500/60 group-hover:via-purple-500/60 group-hover:to-pink-500/60"
                      }`}
                      style={{
                        backgroundClip: "border-box",
                        WebkitBackgroundClip: "border-box",
                        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMask:
                          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        maskComposite: "xor",
                        WebkitMaskComposite: "xor",
                      }}
                    ></div>
                  </div>

                  {/* Video title below thumbnail */}
                  <p
                    className={`font-semibold text-lg mt-4 text-center transition-colors duration-300 ${
                      theme === "dark"
                        ? "text-white group-hover:text-cyan-300"
                        : "text-gray-800 group-hover:text-blue-600"
                    }`}
                  >
                    Watch Tutorial Video
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal - Same as Hero component */}
      {openModalType === "tutorial" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={closeVideoModal}
        >
          <div
            className={`relative w-full max-w-4xl mx-4 backdrop-blur-xl border rounded-2xl p-6 shadow-2xl transition-all duration-500 ${
              theme === "dark"
                ? "bg-white/10 border-white/20"
                : "bg-white/90 border-blue-200/50"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeVideoModal}
              className={`absolute -top-4 -right-4 w-12 h-12 backdrop-blur-sm border rounded-full flex items-center justify-center transition-all duration-300 ${
                theme === "dark"
                  ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
                  : "bg-white/80 border-blue-200/50 text-gray-800 hover:bg-white/90"
              }`}
            >
              <i className="fa-solid fa-times text-xl"></i>
            </button>

            {/* Video embed */}
            <div
              className="relative w-full"
              style={{ paddingBottom: "56.25%" }}
            >
              <iframe
                className="absolute inset-0 w-full h-full rounded-xl"
                src="https://www.youtube.com/embed/25bCIIZ-yYU"
                title="Clan Labs Tutorial"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TutorialVideos;
