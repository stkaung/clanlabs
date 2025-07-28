"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useTheme from "@/hooks/useTheme";

export default function LoginPage() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const theme = useTheme();
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  function handleDiscordLogin(): void {
    router.push("/groups");
  }

  return (
    <main className="min-h-screen md:h-screen flex flex-col md:flex-row">
      {/* Left side - Brand */}
      <div className="w-full md:w-1/2 min-h-[50vh] md:h-screen flex flex-col justify-center items-center p-4 sm:p-6 md:p-16 relative overflow-hidden">
        {/* Modern background with layers */}
        <div
          className={`absolute inset-0 ${
            theme === "dark"
              ? "bg-gradient-to-br from-slate-950 via-gray-900 to-black"
              : "bg-gradient-to-br from-slate-300 via-gray-200 to-slate-400"
          }`}
        />

        {/* Subtle gradient overlay */}
        <div
          className={`absolute inset-0 ${
            theme === "dark"
              ? "bg-gradient-to-br from-blue-950/15 via-indigo-950/8 to-slate-950/20"
              : "bg-gradient-to-br from-blue-100/50 via-purple-50/30 to-slate-200/40"
          }`}
        />

        {/* Vignette effect */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, transparent 0%, transparent 60%, rgba(0,0,0,0.3) 100%)",
          }}
        />

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
        />

        {/* Content */}
        <div className="relative z-10">
          <div
            className={`text-center transition-all duration-700 ease-out ${
              isLoaded
                ? "translate-y-0 opacity-100 scale-100"
                : "translate-y-8 opacity-0 scale-95"
            }`}
          >
            {/* Logo */}
            <div className="mb-6 md:mb-8 relative">
              {/* Logo backdrop glow */}
              <div
                className={`absolute inset-0 blur-2xl transition-all duration-500 ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-blue-400/20 via-white/10 to-purple-400/20"
                    : "bg-gradient-to-r from-slate-300/40 via-gray-200/30 to-slate-400/40"
                }`}
                style={{ transform: "scale(1.2)" }}
              />

              {/* Logo container with border */}
              <div
                className={`relative backdrop-blur-sm rounded-2xl p-6 border transition-all duration-500 hover:scale-105 ${
                  theme === "dark"
                    ? "bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20"
                    : "bg-white/60 border-gray-200/50 hover:bg-white/80 hover:border-gray-300/70"
                }`}
              >
                {/* Inner glow */}
                <div
                  className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10"
                      : "bg-gradient-to-br from-gray-100/50 via-white/30 to-gray-200/50"
                  }`}
                />

                <Image
                  src="/img/logo/mainlogo.png"
                  alt="Clan Labs"
                  width={300}
                  height={90}
                  className="relative mx-auto transition-all duration-300 w-24 sm:w-40 md:w-72 h-auto drop-shadow-2xl"
                  priority
                />
              </div>
            </div>

            {/* Brand text with better typography */}
            <div className="space-y-4 md:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-7xl font-black tracking-wide drop-shadow-lg text-center">
                <span
                  className={theme === "dark" ? "text-white" : "text-blue-800"}
                >
                  CLAN
                </span>{" "}
                <span
                  className={theme === "dark" ? "text-white" : "text-blue-800"}
                >
                  LABS
                </span>
              </h1>
              <div className="relative">
                <div
                  className={`absolute inset-0 blur-xl rounded-full ${
                    theme === "dark"
                      ? "bg-gradient-to-r from-blue-400/20 to-indigo-400/20"
                      : "bg-gradient-to-r from-slate-300/30 to-gray-400/20"
                  }`}
                />
                <p
                  className={`relative text-lg sm:text-xl lg:text-2xl font-medium tracking-wide text-center ${
                    theme === "dark" ? "text-white" : "text-gray-700"
                  }`}
                >
                  For Serious Clans.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Glowy transition bridge between columns */}
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-blue-400/30 to-transparent" />
        <div className="absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b from-transparent via-white/10 to-transparent blur-sm" />
      </div>

      {/* Right side - Login */}
      <div
        className={`w-full md:w-1/2 min-h-[50vh] md:h-screen flex flex-col justify-center items-center p-4 sm:p-6 md:p-16 transition-all duration-500 relative overflow-hidden ${
          theme === "dark"
            ? "bg-gradient-to-br from-slate-900 via-slate-950 to-black"
            : "bg-gradient-to-br from-white via-gray-50 to-slate-50"
        }`}
      >
        {/* Light mode depth effects */}
        {theme !== "dark" && (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-transparent to-gray-100/60" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
          </>
        )}
        {/* VERY VISIBLE mobile-responsive orbs */}
        <div
          className={`absolute top-4 right-4 sm:top-16 sm:right-20 w-24 h-24 sm:w-36 sm:h-36 rounded-full blur-xl sm:blur-2xl animate-pulse transition-all duration-500 z-0`}
          style={{
            backgroundColor: theme === "dark" ? "#3b82f6" : "#1e40af",
            opacity: theme === "dark" ? 0.3 : 0.6,
            animationDelay: "0s",
          }}
        />
        <div
          className={`absolute bottom-4 left-4 sm:bottom-20 sm:left-16 w-20 h-20 sm:w-28 sm:h-28 rounded-full blur-lg sm:blur-xl animate-pulse transition-all duration-500 z-0`}
          style={{
            backgroundColor: theme === "dark" ? "#6366f1" : "#3730a3",
            opacity: theme === "dark" ? 0.25 : 0.5,
            animationDelay: "2s",
          }}
        />
        <div
          className={`absolute top-16 left-4 sm:top-32 sm:left-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full blur-md sm:blur-lg animate-pulse transition-all duration-500 z-0`}
          style={{
            backgroundColor: theme === "dark" ? "#8b5cf6" : "#581c87",
            opacity: theme === "dark" ? 0.2 : 0.45,
            animationDelay: "1s",
          }}
        />
        <div
          className={`absolute bottom-16 right-4 sm:bottom-40 sm:right-12 w-18 h-18 sm:w-24 sm:h-24 rounded-full blur-lg sm:blur-xl animate-pulse transition-all duration-500 z-0`}
          style={{
            backgroundColor: theme === "dark" ? "#06b6d4" : "#0e7490",
            opacity: theme === "dark" ? 0.25 : 0.5,
            animationDelay: "3s",
          }}
        />
        {/* Main content - centered */}
        <div
          className={`w-full max-w-xs sm:max-w-sm transition-all duration-700 ease-out relative z-10 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          {/* Beta badge */}
          <div className="text-center mb-8 sm:mb-2">
            <div
              className={`inline-flex items-center px-4 py-2 rounded-full border mb-6 ${
                theme === "dark"
                  ? "bg-blue-500/20 border-blue-400/30"
                  : "bg-blue-100 border-blue-300"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full mr-2 animate-pulse ${
                  theme === "dark" ? "bg-blue-400" : "bg-blue-600"
                }`}
              />
              <span
                className={`text-sm font-semibold uppercase tracking-wider ${
                  theme === "dark" ? "text-blue-300" : "text-blue-800"
                }`}
              >
                Open Beta
              </span>
            </div>
          </div>

          {/* Welcome text */}
          <div className="text-center mb-6 sm:mb-8">
            <h2
              className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Welcome back!
            </h2>
            <p
              className={`text-base sm:text-lg ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Start managing your Roblox clan today.
            </p>
          </div>

          {/* Discord login button */}
          <div className="flex justify-center mb-8">
            <button
              onClick={handleDiscordLogin}
              className="bg-white hover:bg-blue-50 text-gray-900 hover:text-blue-900 font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-2xl hover:shadow-blue-500/25 group relative overflow-hidden"
            >
              <div className="flex items-center justify-center space-x-3 relative z-10">
                <i className="fab fa-discord text-indigo-600 group-hover:text-blue-600 text-lg transition-colors duration-300" />
                <span className="text-base">Continue with Discord</span>
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-lg bg-blue-400/10 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none" />
            </button>
          </div>

          {/* Terms */}
          <div className="text-center">
            <p
              className={`text-sm leading-relaxed ${
                theme === "dark" ? "text-gray-500" : "text-gray-600"
              }`}
            >
              By continuing, you agree to our{" "}
              <Link
                href="/terms"
                className={`transition-colors duration-200 ${
                  theme === "dark"
                    ? "text-blue-400 hover:text-blue-300"
                    : "text-blue-600 hover:text-blue-700"
                }`}
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className={`transition-colors duration-200 ${
                  theme === "dark"
                    ? "text-blue-400 hover:text-blue-300"
                    : "text-blue-600 hover:text-blue-700"
                }`}
              >
                Privacy Policy
              </Link>
            </p>
          </div>

          {/* New user link */}
          <div className="text-center mt-8">
            <p
              className={`text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              New to Clan Labs?{" "}
              <Link
                href="/"
                className={`font-semibold transition-colors duration-200 ${
                  theme === "dark"
                    ? "text-white hover:text-blue-300"
                    : "text-gray-900 hover:text-blue-600"
                }`}
              >
                Learn more
              </Link>
            </p>
          </div>
          <div className="w-full text-center mt-8">
            <p
              className={`text-xs ${
                theme === "dark" ? "text-gray-600" : "text-gray-500"
              }`}
            >
              © {new Date().getFullYear()} Software Ventures Pty Ltd. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
