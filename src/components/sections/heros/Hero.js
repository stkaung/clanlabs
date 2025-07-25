"use client";
import { useVideoModal } from "@/context_api/VideoModalContext";
import Image from "next/image";
import { useState, useEffect } from "react";
import useTheme from "@/hooks/useTheme";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Enable/disable buttons - true to enable, false to disable
  const buttonConfig = {
    discord: true,
    shop: true,
    tutorial: true,
    partnership: true,
  };

  const theme = useTheme();

  const {
    isAnyVideoModalOpen,
    openModalType,
    openVideoModal,
    closeVideoModal,
  } = useVideoModal();

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => setIsLoaded(true), 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero-section relative pt-[120px] md:pt-[140px] lg:pt-[160px] pb-20 overflow-hidden">
      {/* Dynamic background based on theme */}
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          theme === "dark"
            ? "bg-gradient-to-br from-gray-950 via-slate-900 to-gray-900"
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

        {/* Flowing background waves */}
        <div className="absolute inset-0 overflow-hidden opacity-50">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1200 800"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient
                id="gradient1"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stopColor={theme === "dark" ? "#1e40af" : "#3b82f6"}
                  stopOpacity="0.5"
                />
                <stop
                  offset="100%"
                  stopColor={theme === "dark" ? "#7c3aed" : "#a855f7"}
                  stopOpacity="0.4"
                />
              </linearGradient>
              <linearGradient
                id="gradient2"
                x1="100%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stopColor={theme === "dark" ? "#06b6d4" : "#06b6d4"}
                  stopOpacity="0.3"
                />
                <stop
                  offset="100%"
                  stopColor={theme === "dark" ? "#3b82f6" : "#3b82f6"}
                  stopOpacity="0.3"
                />
              </linearGradient>
            </defs>
            <path
              d="M0,400 Q400,200 800,400 T1200,400 L1200,800 L0,800 Z"
              fill="url(#gradient1)"
            />
            <path
              d="M0,600 Q600,500 1200,600 L1200,800 L0,800 Z"
              fill="url(#gradient2)"
              className="animate-pulse"
              style={{ animationDelay: "2s" }}
            />
          </svg>
        </div>

        {/* Floating particles with theme-based colors */}
        {/* Top right - large blue orb */}
        <div
          className={`absolute top-20 right-16 w-40 h-40 rounded-full opacity-8 blur-xl animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-blue-500" : "bg-blue-400"
          }`}
        ></div>

        {/* Left side of hero text - medium purple orb */}
        <div
          className={`absolute top-1/2 left-8 w-28 h-28 rounded-full opacity-12 blur-xl animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-purple-500" : "bg-purple-400"
          }`}
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Bottom right - small cyan orb */}
        <div
          className={`absolute bottom-1/4 right-12 w-20 h-20 rounded-full opacity-10 blur-lg animate-ping transition-all duration-500 ${
            theme === "dark" ? "bg-cyan-400" : "bg-cyan-300"
          }`}
          style={{ animationDelay: "1s" }}
        ></div>

        {/* Top left background - subtle indigo orb */}
        <div
          className={`absolute top-32 left-1/4 w-24 h-24 rounded-full opacity-6 blur-2xl animate-pulse transition-all duration-500 ${
            theme === "dark" ? "bg-indigo-500" : "bg-indigo-400"
          }`}
          style={{ animationDelay: "4s" }}
        ></div>

        {/* Bottom center - small accent orb */}
        <div
          className={`absolute bottom-20 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full opacity-8 blur-xl animate-bounce transition-all duration-500 ${
            theme === "dark" ? "bg-pink-400" : "bg-pink-300"
          }`}
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      {/* Keep original intro text for continuity */}
      <div className="intro_text">
        <svg viewBox="0 0 1320 300" className="overflow-hidden">
          <text x="50%" y="50%" textAnchor="middle" className="animate-stroke">
            FP
          </text>
        </svg>
      </div>

      <div className="container relative z-10">
        <div className="text-center max-w-6xl mx-auto">
          {/* Top badge with theme-based styling */}
          <div
            className={`inline-flex items-center px-4 py-2 mb-6 backdrop-blur-sm rounded-full border shadow-lg transition-all duration-700 ease-out ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
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
              className={`text-sm font-medium ${
                theme === "dark" ? "text-white" : "text-gray-800"
              }`}
            >
              Discord & API Integration
            </span>
          </div>

          {/* Dynamic heading colors */}
          <h1
            className={`text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium mb-6 leading-tight transition-all duration-400 ease-out ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0"
            }`}
            style={{ transitionDelay: "20ms" }}
          >
            <span
              className={`transition-all duration-300 ${
                theme === "dark" ? "text-white" : "text-blue-600"
              }`}
              style={{
                textShadow:
                  theme === "dark"
                    ? "0 2px 8px rgba(0, 0, 0, 0.5)"
                    : "0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              The Most Trusted
            </span>
            <br />
            <span
              className={`bg-clip-text text-transparent transition-all duration-300 ${
                theme === "dark"
                  ? "bg-gradient-to-r from-blue-400 to-purple-400"
                  : "bg-gradient-to-r from-indigo-600 to-purple-600"
              }`}
              style={{
                filter:
                  theme === "dark"
                    ? "drop-shadow(0 2px 8px rgba(0, 0, 0, 0.5))"
                    : "drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1))",
              }}
            >
              Roblox Group Management
            </span>
            <br />
            <span
              className={`transition-all duration-300 ${
                theme === "dark" ? "text-white" : "text-blue-600"
              }`}
              style={{
                textShadow:
                  theme === "dark"
                    ? "0 2px 8px rgba(0, 0, 0, 0.5)"
                    : "0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              Service for Serious Clans
            </span>
          </h1>

          {/* Dynamic subtitle colors */}
          <p
            className={`text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed transition-all duration-400 ease-out ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0"
            } ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}
            style={{
              textShadow:
                theme === "dark"
                  ? "0 1px 4px rgba(0, 0, 0, 0.4)"
                  : "0 1px 4px rgba(0, 0, 0, 0.1)",
              transitionDelay: "40ms",
            }}
          >
            In service for six years, and hosting over 3,000 groups. Subscribe
            to Clan Labs to start automating your group members&apos;
            progression and management.
          </p>

          {/* Pricing highlight with theme-based styling */}
          <div
            className={`text-center mb-8 transition-all duration-400 ease-out ${
              isLoaded
                ? "translate-y-0 opacity-100 scale-100"
                : "translate-y-12 opacity-0 scale-95"
            }`}
            style={{ transitionDelay: "60ms" }}
          >
            <div
              className={`inline-block px-10 py-6 backdrop-blur-md border-2 rounded-2xl shadow-2xl relative overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-3xl ${
                theme === "dark"
                  ? "bg-gradient-to-br from-blue-500/20 via-purple-500/15 to-cyan-500/20 border-blue-400/40 hover:border-blue-300/60"
                  : "bg-gradient-to-br from-blue-100/80 via-purple-100/60 to-cyan-100/80 border-blue-300/60 hover:border-blue-400/80"
              }`}
            >
              {/* Background glow effect */}
              <div
                className={`absolute inset-0 animate-pulse transition-all duration-500 ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10"
                    : "bg-gradient-to-r from-blue-200/20 via-purple-200/20 to-cyan-200/20"
                }`}
              ></div>

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-baseline justify-center gap-2 mb-3">
                  <span
                    className={`text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
                      theme === "dark" ? "text-blue-300" : "text-blue-700"
                    }`}
                  >
                    starts at
                  </span>
                  <span
                    className={`text-4xl font-bold drop-shadow-lg transition-all duration-300 hover:scale-110 ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    $5
                  </span>
                  <span
                    className={`text-lg font-medium transition-all duration-300 ${
                      theme === "dark" ? "text-blue-100" : "text-blue-800"
                    }`}
                  >
                    per month
                  </span>
                </div>
                <div className="flex items-center justify-center gap-3 text-sm font-medium">
                  <span
                    className={`transition-all duration-300 ${
                      theme === "dark" ? "text-blue-200" : "text-blue-700"
                    }`}
                  >
                    No setup fees
                  </span>
                  <span
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 hover:scale-150 ${
                      theme === "dark" ? "bg-blue-400" : "bg-blue-500"
                    }`}
                  ></span>
                  <span
                    className={`transition-all duration-300 ${
                      theme === "dark" ? "text-blue-200" : "text-blue-700"
                    }`}
                  >
                    Cancel anytime
                  </span>
                  <span
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 hover:scale-150 ${
                      theme === "dark" ? "bg-blue-400" : "bg-blue-500"
                    }`}
                  ></span>
                  <span
                    className={`transition-all duration-300 ${
                      theme === "dark" ? "text-blue-200" : "text-blue-700"
                    }`}
                  >
                    All features included
                  </span>
                </div>
              </div>

              {/* Decorative elements */}
              <div
                className={`absolute -top-2 -right-2 w-16 h-16 rounded-full blur-xl transition-all duration-500 hover:scale-125 ${
                  theme === "dark" ? "bg-blue-500/30" : "bg-blue-400/40"
                }`}
              ></div>
              <div
                className={`absolute -bottom-2 -left-2 w-12 h-12 rounded-full blur-lg transition-all duration-500 hover:scale-125 ${
                  theme === "dark" ? "bg-purple-500/30" : "bg-purple-400/40"
                }`}
              ></div>
            </div>
          </div>

          {/* Action buttons with theme-based styling */}
          <div
            className={`grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16 transition-all duration-400 ease-out ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0"
            }`}
            style={{ transitionDelay: "80ms" }}
          >
            {/* Discord Button */}
            <div className="relative">
              <a
                href={
                  !buttonConfig.discord ? "#" : "https://discord.gg/A7bSWBw"
                }
                target="_blank"
                rel="noopener noreferrer"
                onClick={
                  !buttonConfig.discord ? (e) => e.preventDefault() : undefined
                }
                className={`group relative p-6 backdrop-blur-xl border rounded-2xl transition-all duration-500 shadow-lg w-full ${
                  !buttonConfig.discord
                    ? theme === "dark"
                      ? "bg-gradient-to-br from-gray-500/20 to-gray-600/20 border-gray-400/30 cursor-not-allowed opacity-50"
                      : "bg-gradient-to-br from-gray-200/50 to-gray-300/50 border-gray-400/30 cursor-not-allowed opacity-50"
                    : theme === "dark"
                    ? "bg-gradient-to-br from-white/5 to-white/10 border-white/20 hover:from-white/10 hover:to-white/15 hover:border-white/30 hover:shadow-xl hover:-translate-y-1"
                    : "bg-gradient-to-br from-white/80 to-white/60 border-blue-200/50 hover:from-white/90 hover:to-white/70 hover:border-blue-300/70 hover:shadow-xl hover:-translate-y-1"
                }`}
              >
                <div className="text-center">
                  <div
                    className={`w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center transition-all duration-500 ${
                      !buttonConfig.discord
                        ? theme === "dark"
                          ? "bg-gradient-to-r from-gray-500/20 to-gray-600/20"
                          : "bg-gradient-to-r from-gray-300/50 to-gray-400/50"
                        : theme === "dark"
                        ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 group-hover:from-blue-500/30 group-hover:to-purple-500/30"
                        : "bg-gradient-to-r from-blue-500/30 to-purple-500/30 group-hover:from-blue-500/40 group-hover:to-purple-500/40"
                    }`}
                  >
                    <i
                      className={`fa-brands fa-discord text-2xl transition-all duration-300 ${
                        theme === "dark" ? "text-white" : "text-gray-800"
                      }`}
                    ></i>
                  </div>
                  <h3
                    className={`font-semibold text-sm uppercase tracking-wider transition-all duration-300 ${
                      !buttonConfig.discord
                        ? theme === "dark"
                          ? "text-gray-400"
                          : "text-gray-500"
                        : theme === "dark"
                        ? "text-white group-hover:text-blue-200"
                        : "text-gray-800 group-hover:text-blue-600"
                    }`}
                  >
                    Discord
                  </h3>
                </div>
              </a>
            </div>

            {/* Shop Button */}
            <div className="relative">
              <a
                href={!buttonConfig.shop ? "#" : "https://store.clanlabs.co/"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={
                  !buttonConfig.shop ? (e) => e.preventDefault() : undefined
                }
                className={`group relative p-6 backdrop-blur-xl border rounded-2xl transition-all duration-500 shadow-lg w-full ${
                  !buttonConfig.shop
                    ? theme === "dark"
                      ? "bg-gradient-to-br from-gray-500/20 to-gray-600/20 border-gray-400/30 cursor-not-allowed opacity-50"
                      : "bg-gradient-to-br from-gray-200/50 to-gray-300/50 border-gray-400/30 cursor-not-allowed opacity-50"
                    : theme === "dark"
                    ? "bg-gradient-to-br from-white/5 to-white/10 border-white/20 hover:from-white/10 hover:to-white/15 hover:border-white/30 hover:shadow-xl hover:-translate-y-1"
                    : "bg-gradient-to-br from-white/80 to-white/60 border-blue-200/50 hover:from-white/90 hover:to-white/70 hover:border-blue-300/70 hover:shadow-xl hover:-translate-y-1"
                }`}
              >
                <div className="text-center">
                  <div
                    className={`w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center transition-all duration-500 ${
                      !buttonConfig.shop
                        ? theme === "dark"
                          ? "bg-gradient-to-r from-gray-500/20 to-gray-600/20"
                          : "bg-gradient-to-r from-gray-300/50 to-gray-400/50"
                        : theme === "dark"
                        ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 group-hover:from-green-500/30 group-hover:to-emerald-500/30"
                        : "bg-gradient-to-r from-green-500/30 to-emerald-500/30 group-hover:from-green-500/40 group-hover:to-emerald-500/40"
                    }`}
                  >
                    <i
                      className={`fa-solid fa-shopping-cart text-2xl transition-all duration-300 ${
                        theme === "dark" ? "text-white" : "text-gray-800"
                      }`}
                    ></i>
                  </div>
                  <h3
                    className={`font-semibold text-sm uppercase tracking-wider transition-all duration-300 ${
                      !buttonConfig.shop
                        ? theme === "dark"
                          ? "text-gray-400"
                          : "text-gray-500"
                        : theme === "dark"
                        ? "text-white group-hover:text-green-200"
                        : "text-gray-800 group-hover:text-green-600"
                    }`}
                  >
                    Shop
                  </h3>
                </div>
              </a>
            </div>

            {/* Tutorial Video Button */}
            <div className="relative">
              <button
                onClick={
                  !buttonConfig.tutorial
                    ? (e) => e.preventDefault()
                    : () => openVideoModal("hero")
                }
                className={`group relative p-6 backdrop-blur-xl border rounded-2xl transition-all duration-500 shadow-lg w-full ${
                  !buttonConfig.tutorial
                    ? theme === "dark"
                      ? "bg-gradient-to-br from-gray-500/20 to-gray-600/20 border-gray-400/30 cursor-not-allowed opacity-50"
                      : "bg-gradient-to-br from-gray-200/50 to-gray-300/50 border-gray-400/30 cursor-not-allowed opacity-50"
                    : theme === "dark"
                    ? "bg-gradient-to-br from-white/5 to-white/10 border-white/20 hover:from-white/10 hover:to-white/15 hover:border-white/30 hover:shadow-xl hover:-translate-y-1"
                    : "bg-gradient-to-br from-white/80 to-white/60 border-blue-200/50 hover:from-white/90 hover:to-white/70 hover:border-blue-300/70 hover:shadow-xl hover:-translate-y-1"
                }`}
              >
                <div className="text-center">
                  <div
                    className={`w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center transition-all duration-500 ${
                      !buttonConfig.tutorial
                        ? theme === "dark"
                          ? "bg-gradient-to-r from-gray-500/20 to-gray-600/20"
                          : "bg-gradient-to-r from-gray-300/50 to-gray-400/50"
                        : theme === "dark"
                        ? "bg-gradient-to-r from-red-500/20 to-pink-500/20 group-hover:from-red-500/30 group-hover:to-pink-500/30"
                        : "bg-gradient-to-r from-red-500/30 to-pink-500/30 group-hover:from-red-500/40 group-hover:to-pink-500/40"
                    }`}
                  >
                    <i
                      className={`fa-solid fa-play text-2xl transition-all duration-300 ${
                        theme === "dark" ? "text-white" : "text-gray-800"
                      }`}
                    ></i>
                  </div>
                  <h3
                    className={`font-semibold text-sm uppercase tracking-wider transition-all duration-300 ${
                      !buttonConfig.tutorial
                        ? theme === "dark"
                          ? "text-gray-400"
                          : "text-gray-500"
                        : theme === "dark"
                        ? "text-white group-hover:text-red-200"
                        : "text-gray-800 group-hover:text-red-600"
                    }`}
                  >
                    Tutorial Video
                  </h3>
                </div>
              </button>
            </div>

            {/* Partnership Button */}
            <div className="relative">
              <a
                href={
                  !buttonConfig.partnership
                    ? "#"
                    : "https://drive.google.com/file/d/17lhzK_nmtquGCB8DOdipGGgHdnp_NFkR/view?usp=sharing"
                }
                target="_blank"
                rel="noopener noreferrer"
                onClick={
                  !buttonConfig.partnership
                    ? (e) => e.preventDefault()
                    : undefined
                }
                className={`group relative p-6 backdrop-blur-xl border rounded-2xl transition-all duration-500 shadow-lg w-full ${
                  !buttonConfig.partnership
                    ? theme === "dark"
                      ? "bg-gradient-to-br from-gray-500/20 to-gray-600/20 border-gray-400/30 cursor-not-allowed opacity-50"
                      : "bg-gradient-to-br from-gray-200/50 to-gray-300/50 border-gray-400/30 cursor-not-allowed opacity-50"
                    : theme === "dark"
                    ? "bg-gradient-to-br from-white/5 to-white/10 border-white/20 hover:from-white/10 hover:to-white/15 hover:border-white/30 hover:shadow-xl hover:-translate-y-1"
                    : "bg-gradient-to-br from-white/80 to-white/60 border-blue-200/50 hover:from-white/90 hover:to-white/70 hover:border-blue-300/70 hover:shadow-xl hover:-translate-y-1"
                }`}
              >
                <div className="text-center">
                  <div
                    className={`w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center transition-all duration-500 ${
                      !buttonConfig.partnership
                        ? theme === "dark"
                          ? "bg-gradient-to-r from-gray-500/20 to-gray-600/20"
                          : "bg-gradient-to-r from-gray-300/50 to-gray-400/50"
                        : theme === "dark"
                        ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 group-hover:from-yellow-500/30 group-hover:to-orange-500/30"
                        : "bg-gradient-to-r from-yellow-500/30 to-orange-500/30 group-hover:from-yellow-500/40 group-hover:to-orange-500/40"
                    }`}
                  >
                    <i
                      className={`fa-solid fa-handshake text-2xl transition-all duration-300 ${
                        theme === "dark" ? "text-white" : "text-gray-800"
                      }`}
                    ></i>
                  </div>
                  <h3
                    className={`font-semibold text-sm uppercase tracking-wider transition-all duration-300 ${
                      !buttonConfig.partnership
                        ? theme === "dark"
                          ? "text-gray-400"
                          : "text-gray-500"
                        : theme === "dark"
                        ? "text-white group-hover:text-yellow-200"
                        : "text-gray-800 group-hover:text-yellow-600"
                    }`}
                  >
                    Partnership
                  </h3>
                </div>
              </a>
            </div>
          </div>

          {/* Dashboard Preview with theme-based styling */}
          <div
            className={`relative mt-16 max-w-5xl mx-auto transition-all duration-500 ease-out ${
              isLoaded
                ? "translate-y-0 opacity-100 scale-100"
                : "translate-y-16 opacity-0 scale-95"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            {/* Background glow effects */}
            <div
              className={`absolute inset-0 rounded-2xl blur-3xl transform scale-110 transition-all duration-1000 hover:scale-125 ${
                theme === "dark"
                  ? "bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20"
                  : "bg-gradient-to-r from-blue-200/30 via-purple-200/30 to-cyan-200/30"
              }`}
            ></div>
            <div
              className={`absolute inset-0 rounded-2xl blur-2xl transition-all duration-1000 ${
                theme === "dark"
                  ? "bg-gradient-to-b from-transparent via-blue-500/10 to-purple-500/10"
                  : "bg-gradient-to-b from-transparent via-blue-200/20 to-purple-200/20"
              }`}
            ></div>

            {/* Main dashboard container */}
            <div
              className={`relative backdrop-blur-xl border rounded-2xl p-4 shadow-2xl transition-all duration-700 hover:shadow-3xl hover:scale-[1.02] ${
                theme === "dark"
                  ? "bg-white/5 border-white/10 hover:border-white/20"
                  : "bg-white/80 border-blue-200/50 hover:border-blue-300/70"
              }`}
            >
              {/* Inner shadow and glow */}
              <div
                className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
                  theme === "dark"
                    ? "bg-gradient-to-br from-white/5 via-transparent to-black/10"
                    : "bg-gradient-to-br from-white/20 via-transparent to-blue-50/30"
                }`}
              ></div>

              {/* Dashboard image */}
              <div className="relative overflow-hidden rounded-xl transition-all duration-500 hover:shadow-2xl">
                <Image
                  src="/img/hero/dashboard.png"
                  width={1200}
                  height={800}
                  alt="Clan Labs Dashboard"
                  className="w-full h-auto shadow-xl rounded-xl transition-all duration-700 hover:scale-105"
                  style={{
                    filter:
                      theme === "dark"
                        ? "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.3))"
                        : "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.1))",
                  }}
                />

                {/* Overlay gradient for integration */}
                <div
                  className={`absolute inset-0 rounded-xl transition-all duration-500 ${
                    theme === "dark"
                      ? "bg-gradient-to-t from-black/20 via-transparent to-transparent"
                      : "bg-gradient-to-t from-white/10 via-transparent to-transparent"
                  }`}
                ></div>

                {/* Floating elements for extra pop */}
                <div
                  className={`absolute -top-4 -right-4 w-20 h-20 rounded-full blur-xl animate-pulse transition-all duration-500 hover:scale-125 ${
                    theme === "dark" ? "bg-blue-500/30" : "bg-blue-400/40"
                  }`}
                ></div>
                <div
                  className={`absolute -bottom-6 -left-6 w-32 h-32 rounded-full blur-2xl animate-pulse transition-all duration-500 hover:scale-125 ${
                    theme === "dark" ? "bg-purple-500/20" : "bg-purple-400/30"
                  }`}
                  style={{ animationDelay: "1s" }}
                ></div>
              </div>

              {/* Bottom reflection effect */}
              <div
                className={`absolute bottom-0 left-4 right-4 h-32 rounded-b-xl blur-sm transition-all duration-500 ${
                  theme === "dark"
                    ? "bg-gradient-to-t from-white/5 to-transparent"
                    : "bg-gradient-to-t from-blue-100/20 to-transparent"
                }`}
              ></div>
            </div>

            {/* Additional ambient lighting */}
            <div
              className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-96 h-8 blur-2xl transition-all duration-1000 ${
                theme === "dark"
                  ? "bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"
                  : "bg-gradient-to-r from-transparent via-blue-300/40 to-transparent"
              }`}
            ></div>
          </div>
        </div>
      </div>

      {/* Video Modal with theme-based styling */}
      {openModalType === "hero" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm transition-all duration-300"
          onClick={closeVideoModal}
        >
          <div
            className={`relative w-full max-w-4xl mx-4 backdrop-blur-xl border rounded-2xl p-6 shadow-2xl transition-all duration-500 hover:scale-105 ${
              theme === "dark"
                ? "bg-white/10 border-white/20"
                : "bg-white/90 border-blue-200/50"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeVideoModal}
              className={`absolute -top-4 -right-4 w-12 h-12 backdrop-blur-sm border rounded-full flex items-center justify-center hover:scale-110 hover:rotate-90 transition-all duration-300 ${
                theme === "dark"
                  ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
                  : "bg-white/80 border-blue-200/50 text-gray-800 hover:bg-white/90"
              }`}
            >
              <i className="fa-solid fa-times text-xl"></i>
            </button>

            {/* Video embed */}
            <div
              className="relative w-full transition-all duration-500 hover:shadow-2xl"
              style={{ paddingBottom: "56.25%" }}
            >
              <iframe
                className="absolute inset-0 w-full h-full rounded-xl transition-all duration-500"
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

export default Hero;
