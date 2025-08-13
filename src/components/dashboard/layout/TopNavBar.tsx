"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useTheme from "@/hooks/useTheme";
import MobileSearchModal from "@/components/dashboard/shared/MobileSearchModal";

interface TopNavBarProps {
  onDrawerToggle: () => void;
  breadcrumb?: string[];
  showBackButton?: boolean;
  showSearch?: boolean;
  onSearch?: (query: string) => void;
  searchPlaceholder?: string;
  sidebarCollapsed?: boolean;
}

function TopNavBar({
  onDrawerToggle,
  breadcrumb = ["Dashboard", "Groups"],
  showBackButton = false,
  showSearch = true,
  onSearch,
  searchPlaceholder = "Search groups, users...",
  sidebarCollapsed = false,
}: TopNavBarProps) {
  const theme = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState<boolean>(false);
  const [viewportWidth, setViewportWidth] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 1200);

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  function getDisplayedBreadcrumb(items: string[], width: number): Array<string> {
    const len = items.length;
    if (len <= 2) return items;
    if (width < 480) {
      // Tiny screens: Root … Current
      return [items[0], "…", items[len - 1]];
    }
    if (width < 768) {
      // Small screens: Root … Prev Current
      if (len <= 3) return items;
      return [items[0], "…", items[len - 2], items[len - 1]];
    }
    if (width < 1024) {
      // Medium screens: Root … Last 3
      if (len <= 4) return items;
      return [items[0], "…", ...items.slice(len - 3)];
    }
    // Large screens: show all
    return items;
  }

  const displayed = getDisplayedBreadcrumb(breadcrumb, viewportWidth);
  const isMobileHeader = viewportWidth < 768;
  const currentTitle = breadcrumb[breadcrumb.length - 1] ?? "";

  function handleSearch(query?: string): void {
    const searchTerm = query || searchQuery;
    if (onSearch) {
      onSearch(searchTerm);
    } else {
      console.log("Search query:", searchTerm);
    }
  }

  function handleSearchChange(value: string): void {
    setSearchQuery(value);
    // Real-time search - update results as user types
    if (onSearch) {
      onSearch(value);
    }
  }

  function handleMobileSearch(query: string): void {
    setSearchQuery(query);
    handleSearch(query);
  }

  function handleClearSearch(): void {
    setSearchQuery("");
    if (onSearch) {
      onSearch("");
    }
  }

  function handleBack(): void {
    // Always go back to /groups
    router.push("/groups");
  }

  function handleThemeToggle(): void {
    const html = document.querySelector("html");
    const isDark = html?.classList?.contains("dark");
    const newTheme = isDark ? "light" : "dark";

    if (html) {
      html.classList.remove("dark", "light");
      html.classList.add(newTheme);
    }

    // Save to localStorage
    localStorage.setItem("theme", newTheme);

    // Dispatch custom event for theme change
    const event = new CustomEvent("themeChanged", {
      detail: { theme: newTheme },
    });
    document.dispatchEvent(event);
  }

  return (
    <>
      <div
        className="w-full h-16 backdrop-blur-xl relative z-50 transition-all duration-300"
        style={{
          backgroundColor:
            theme === "dark"
              ? "rgba(15, 23, 42, 0.85)"
              : "rgba(248, 250, 252, 0.85)",
          borderBottom: `1px solid ${
            theme === "dark"
              ? "rgba(59, 130, 246, 0.2)"
              : "rgba(30, 64, 175, 0.15)"
          }`,
          backdropFilter: "blur(16px)",
          boxShadow:
            theme === "dark"
              ? "0 4px 24px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(59, 130, 246, 0.1)"
              : "0 4px 24px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
        }}
      >
        {/* Subtle gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              theme === "dark"
                ? "linear-gradient(90deg, rgba(59, 130, 246, 0.02) 0%, rgba(124, 58, 237, 0.01) 50%, rgba(6, 182, 212, 0.02) 100%)"
                : "linear-gradient(90deg, rgba(59, 130, 246, 0.015) 0%, rgba(124, 58, 237, 0.01) 50%, rgba(6, 182, 212, 0.015) 100%)",
          }}
        />

        <div className="flex items-center h-full px-6">
          {/* Left Section - Mobile Toggle & Breadcrumb */}
          <div className="flex-1 flex items-center">
            {/* Mobile Sidebar Toggle Button */}
            <button
              onClick={onDrawerToggle}
              className={`md:hidden btn btn-ghost btn-sm w-10 h-10 rounded-xl flex items-center justify-center mr-3 transition-all duration-200 hover:scale-105 backdrop-blur-sm border ${
                theme === "dark" ? "hover:bg-white/5" : "hover:bg-gray-100/50"
              }`}
              style={{
                backgroundColor:
                  theme === "dark"
                    ? "rgba(30, 41, 59, 0.4)"
                    : "rgba(241, 245, 249, 0.6)",
                borderColor:
                  theme === "dark"
                    ? "rgba(59, 130, 246, 0.15)"
                    : "rgba(30, 64, 175, 0.1)",
              }}
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

            {/* Back Button */}
            {showBackButton && (
              <button
                onClick={handleBack}
                className={`btn btn-ghost btn-sm w-10 h-10 rounded-xl flex items-center justify-center mr-3 transition-all duration-200 hover:scale-105 backdrop-blur-sm border ${
                  theme === "dark" ? "hover:bg-white/5" : "hover:bg-gray-100/50"
                }`}
                style={{
                  backgroundColor:
                    theme === "dark"
                      ? "rgba(30, 41, 59, 0.4)"
                      : "rgba(241, 245, 249, 0.6)",
                  borderColor:
                    theme === "dark"
                      ? "rgba(59, 130, 246, 0.15)"
                      : "rgba(30, 64, 175, 0.1)",
                }}
                aria-label="Go back"
              >
                <i className={`fas fa-arrow-left ${
                  theme === "dark" ? "text-slate-200" : "text-gray-700"
                }`} />
              </button>
            )}

            {/* Mobile title or desktop breadcrumb */}
            {isMobileHeader ? (
              <div className="min-w-0">
                <span
                  className={`block truncate font-semibold ${
                    theme === "dark" ? "text-white" : "text-slate-900"
                  }`}
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                  title={currentTitle}
                >
                  {currentTitle}
                </span>
              </div>
            ) : (
              <nav className="text-sm max-w-full overflow-hidden">
                <ol className="flex items-center space-x-2">
                  {displayed.map((item, index) => (
                    <li key={`${item}-${index}`} className="flex items-center min-w-0">
                      {index > 0 && (
                        <i
                          className={`fas fa-chevron-right mx-2 text-xs ${
                            theme === "dark" ? "text-gray-500" : "text-gray-400"
                          }`}
                        />
                      )}
                      {item === "…" ? (
                        <span className={theme === "dark" ? "text-slate-400" : "text-slate-500"} aria-hidden>
                          …
                        </span>
                      ) : (
                        <span
                          className={`font-medium truncate ${
                            index === displayed.length - 1
                              ? theme === "dark"
                                ? "text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-200"
                                : "text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-700"
                              : theme === "dark"
                              ? "text-slate-300 hover:text-slate-200"
                              : "text-slate-600 hover:text-slate-800"
                          }`}
                          style={{
                            fontFamily: "'Poppins', sans-serif",
                            maxWidth: index === displayed.length - 1 ? "52vw" : "28vw",
                            textShadow:
                              index === displayed.length - 1
                                ? theme === "dark"
                                  ? "0 1px 2px rgba(59, 130, 246, 0.3)"
                                  : "0 1px 2px rgba(0, 0, 0, 0.1)"
                                : undefined,
                          }}
                          title={item}
                        >
                          {item}
                        </span>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
            )}
          </div>

          {/* Right Section - Search & Theme Toggle */}
          <div className="flex items-center space-x-3">
            {/* Search Bar */}
            {showSearch && (
              <>
                <div className="relative hidden sm:block">
                  <i
                    className={`fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-sm pointer-events-none z-10 ${
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
                    placeholder={searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className={`w-64 lg:w-80 pl-12 pr-4 py-2.5 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 backdrop-blur-sm ${
                      theme === "dark"
                        ? "bg-slate-800/60 border-blue-500/20 text-slate-100 placeholder-slate-400 focus:ring-blue-400/30 focus:border-blue-400/40"
                        : "bg-white/60 border-blue-300/30 text-slate-900 placeholder-slate-500 focus:ring-blue-500/30 focus:border-blue-500/40"
                    }`}
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      backdropFilter: "blur(12px)",
                      boxShadow:
                        theme === "dark"
                          ? "0 4px 12px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(59, 130, 246, 0.1)"
                          : "0 2px 8px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                    }}
                  />
                  {searchQuery && (
                    <button
                      onClick={handleClearSearch}
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
                  onClick={() => setIsMobileSearchOpen(true)}
                  className={`sm:hidden btn btn-ghost btn-sm w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 backdrop-blur-sm border ${
                    theme === "dark"
                      ? "hover:bg-white/5"
                      : "hover:bg-gray-100/50"
                  }`}
                  style={{
                    backgroundColor:
                      theme === "dark"
                        ? "rgba(30, 41, 59, 0.4)"
                        : "rgba(241, 245, 249, 0.6)",
                    borderColor:
                      theme === "dark"
                        ? "rgba(59, 130, 246, 0.15)"
                        : "rgba(30, 64, 175, 0.1)",
                  }}
                  aria-label="Search"
                >
                  <i className="fas fa-search text-sm" />
                </button>
              </>
            )}

            {/* Theme Toggle Button */}
            <button
              onClick={handleThemeToggle}
              className={`btn btn-ghost btn-sm w-11 h-11 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105 backdrop-blur-sm border ${
                theme === "dark"
                  ? "hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20"
                  : "hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20"
              }`}
              style={{
                background:
                  theme === "dark"
                    ? "linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(139, 92, 246, 0.08))"
                    : "linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(139, 92, 246, 0.06))",
                backdropFilter: "blur(12px)",
                borderColor:
                  theme === "dark"
                    ? "rgba(59, 130, 246, 0.2)"
                    : "rgba(30, 64, 175, 0.15)",
                boxShadow:
                  theme === "dark"
                    ? "0 4px 12px rgba(59, 130, 246, 0.15), inset 0 1px 0 rgba(59, 130, 246, 0.1)"
                    : "0 2px 8px rgba(59, 130, 246, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
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
                   stroke="url(#darkModeGradient)"
                   strokeLinecap="round"
                   strokeLinejoin="round"
                   strokeWidth="32"
                 />
                 <defs>
                   <linearGradient id="darkModeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                     <stop offset="0%" stopColor="#1E40AF" />
                     <stop offset="100%" stopColor="#7C3AED" />
                   </linearGradient>
                 </defs>
               </svg>

               {/* Light mode icon (show in dark mode) */}
               <svg
                 xmlns="http://www.w3.org/2000/svg"
                 className={`w-4 h-4 transition-all duration-300 ${
                   theme === "dark" ? "block" : "hidden"
                 }`}
                 viewBox="0 0 512 512"
                 style={{
                   backgroundImage: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                   WebkitBackgroundClip: "text",
                   WebkitTextFillColor: "transparent",
                   backgroundClip: "text",
                 }}
               >
                 <path
                   fill="none"
                   stroke="url(#lightModeGradient)"
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
                   stroke="url(#lightModeGradient)"
                   strokeLinecap="round"
                   strokeMiterlimit="10"
                   strokeWidth="32"
                 />
                 <defs>
                   <linearGradient id="lightModeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                     <stop offset="0%" stopColor="#3B82F6" />
                     <stop offset="100%" stopColor="#8B5CF6" />
                   </linearGradient>
                 </defs>
               </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Modal */}
      <MobileSearchModal
        isOpen={isMobileSearchOpen}
        onClose={() => setIsMobileSearchOpen(false)}
        onSearch={handleMobileSearch}
        placeholder={searchPlaceholder}
        initialQuery={searchQuery}
      />
    </>
  );
}

export default TopNavBar;
