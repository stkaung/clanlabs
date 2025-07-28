"use client";

import { useState } from "react";
import useTheme from "@/hooks/useTheme";

interface TopNavBarProps {
  onDrawerToggle: () => void;
  breadcrumb?: string[];
}

function TopNavBar({
  onDrawerToggle,
  breadcrumb = ["Dashboard", "Groups"],
}: TopNavBarProps) {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState<string>("");

  function handleSearch(): void {
    console.log("Search query:", searchQuery);
  }

  function handleThemeToggle(): void {
    const html = document.querySelector("html");
    const isDark = html?.classList?.contains("dark");

    if (isDark) {
      html?.classList.remove("dark");
      html?.classList.add("light");
    } else {
      html?.classList.remove("light");
      html?.classList.add("dark");
    }

    // Dispatch custom event for theme change
    const event = new CustomEvent("themeChanged", {
      detail: { theme: isDark ? "light" : "dark" },
    });
    document.dispatchEvent(event);
  }

  return (
    <div
      className="navbar shadow-md border-b h-16 px-6 backdrop-blur-md relative z-50"
      style={{
        backgroundColor:
          theme === "dark"
            ? "rgba(26, 26, 26, 0.95)"
            : "rgba(255, 255, 255, 0.95)",
        borderColor: theme === "dark" ? "#2A2A2A" : "#E5E7EB",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Left Section - Mobile Toggle & Breadcrumb */}
      <div className="navbar-start">
        {/* Mobile Sidebar Toggle Button */}
        <button
          onClick={onDrawerToggle}
          className={`md:hidden btn btn-ghost btn-sm w-10 h-10 rounded-lg flex items-center justify-center mr-3 transition-all duration-200 hover:scale-105 ${
            theme === "dark" ? "hover:bg-white/10" : "hover:bg-gray-100"
          }`}
          aria-label="Toggle menu"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Breadcrumb */}
        <div className="flex items-center">
          <nav className="text-sm">
            <ol className="flex items-center space-x-2">
              {breadcrumb.map((item, index) => (
                <li key={index} className="flex items-center">
                  {index > 0 && (
                    <i
                      className={`fas fa-chevron-right mx-2 text-xs ${
                        theme === "dark" ? "text-gray-500" : "text-gray-400"
                      }`}
                    />
                  )}
                  <span
                    className={`font-medium ${
                      index === breadcrumb.length - 1
                        ? theme === "dark"
                          ? "text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300"
                          : "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"
                        : theme === "dark"
                        ? "text-gray-400 hover:text-gray-300"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      textShadow:
                        index === breadcrumb.length - 1
                          ? theme === "dark"
                            ? "0 1px 2px rgba(59, 130, 246, 0.3)"
                            : "0 1px 2px rgba(0, 0, 0, 0.1)"
                          : undefined,
                    }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>

      {/* Right Section - Search & Theme Toggle */}
      <div className="navbar-end">
        <div className="flex items-center space-x-3">
          {/* Search Bar */}
          <div className="relative hidden sm:block">
            <i
              className={`fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-sm pointer-events-none z-10 ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
              style={{
                filter:
                  theme === "dark"
                    ? "drop-shadow(0 1px 1px rgba(255,255,255,0.1))"
                    : "drop-shadow(0 1px 1px rgba(0,0,0,0.1))",
              }}
            />
            <input
              type="text"
              placeholder="Search groups, users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className={`w-64 lg:w-80 pl-10 pr-4 py-2.5 rounded-full border transition-all duration-200 focus:outline-none focus:ring-2 backdrop-blur-sm ${
                theme === "dark"
                  ? "bg-gray-800/80 border-gray-600/50 text-white placeholder-gray-400 focus:ring-blue-500/50 focus:border-blue-500/50"
                  : "bg-white/80 border-gray-300/50 text-gray-900 placeholder-gray-500 focus:ring-blue-500/50 focus:border-blue-500/50"
              }`}
              style={{
                fontFamily: "'Poppins', sans-serif",
                backdropFilter: "blur(8px)",
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className={`absolute inset-y-0 right-0 pr-3 flex items-center ${
                  theme === "dark"
                    ? "text-gray-400 hover:text-gray-300"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <i className="fas fa-times text-sm" />
              </button>
            )}
          </div>

          {/* Mobile Search Button */}
          <button
            className={`sm:hidden btn btn-ghost btn-sm w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 ${
              theme === "dark" ? "hover:bg-white/10" : "hover:bg-gray-100"
            }`}
            aria-label="Search"
          >
            <i className="fas fa-search text-sm" />
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={handleThemeToggle}
            className={`btn btn-ghost btn-sm w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 ${
              theme === "dark"
                ? "hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 hover:shadow-lg"
                : "hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 hover:shadow-lg"
            }`}
            style={{
              background:
                theme === "dark"
                  ? "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))"
                  : "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))",
              backdropFilter: "blur(8px)",
              border:
                theme === "dark"
                  ? "1px solid rgba(255,255,255,0.1)"
                  : "1px solid rgba(59, 130, 246, 0.2)",
            }}
            aria-label="Toggle theme"
          >
            {/* Dark mode icon (show in light mode) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-4 h-4 transition-all duration-300 ${
                theme === "dark" ? "hidden" : "block"
              }`}
              viewBox="0 0 512 512"
              style={{
                backgroundImage: "linear-gradient(135deg, #1E40AF, #7C3AED)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              <path
                d="M160 136c0-30.62 4.51-61.61 16-88C99.57 81.27 48 159.32 48 248c0 119.29 96.71 216 216 216 88.68 0 166.73-51.57 200-128-26.39 11.49-57.38 16-88 16-119.29 0-216-96.71-216-216z"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
              />
            </svg>

            {/* Light mode icon (show in dark mode) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-4 h-4 transition-all duration-300 ${
                theme === "dark" ? "block" : "hidden"
              }`}
              viewBox="0 0 512 512"
              style={{
                backgroundImage: "linear-gradient(135deg, #F59E0B, #FBBF24)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth="32"
                d="M256 48v48M256 416v48M403.08 108.92l-33.94 33.94M142.86 369.14l-33.94 33.94M464 256h-48M96 256H48M403.08 403.08l-33.94-33.94M142.86 142.86l-33.94-33.94"
              />
              <circle
                cx="256"
                cy="256"
                r="80"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth="32"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TopNavBar;
