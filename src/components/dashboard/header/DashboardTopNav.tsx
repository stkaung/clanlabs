"use client";
import { useState } from "react";
import useTheme from "@/hooks/useTheme";

interface DashboardTopNavProps {
  onMobileMenuToggle?: () => void;
}

function DashboardTopNav({ onMobileMenuToggle }: DashboardTopNavProps = {}) {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState<string>("");

  function handleRefresh(): void {
    // TODO: Implement refresh functionality
    console.log("Refreshing data...");
  }

  return (
    <header
      className="h-16 border-b transition-all duration-300"
      style={{
        backgroundColor: theme === "dark" ? "#1A1A1A" : "#FFFFFF",
        borderColor: theme === "dark" ? "#2A2A2A" : "#E5E7EB",
      }}
    >
      <div className="flex items-center justify-between h-full px-6">
        {/* Left: Mobile menu button + Page title */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <button
            onClick={onMobileMenuToggle}
            className="md:hidden w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              backgroundColor: theme === "dark" ? "#2A2A2A" : "#F3F4F6",
              color: theme === "dark" ? "#A0A0A0" : "#6B7280",
            }}
          >
            <i className="fas fa-bars text-sm" />
          </button>

          <div>
            <h1
              className="text-base md:text-xl font-semibold"
              style={{
                color: theme === "dark" ? "#FFFFFF" : "#1F2937",
              }}
            >
              Groups
            </h1>
            <p
              className="text-xs mt-0.5 hidden md:block"
              style={{
                color: theme === "dark" ? "#A0A0A0" : "#6B7280",
              }}
            >
              Manage your organizational groups
            </p>
          </div>
        </div>

        {/* Right: Search, Refresh, Theme toggle */}
        <div className="flex items-center space-x-4">
          {/* Search Input */}
          <div className="relative hidden sm:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i
                className="fas fa-search text-sm"
                style={{
                  color: theme === "dark" ? "#A0A0A0" : "#6B7280",
                }}
              />
            </div>
            <input
              type="text"
              placeholder="Search groups..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-48 md:w-64 pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200"
              style={{
                backgroundColor: theme === "dark" ? "#1E1E1E" : "#F9FAFB",
                borderColor: theme === "dark" ? "#2A2A2A" : "#D1D5DB",
                color: theme === "dark" ? "#FFFFFF" : "#1F2937",
              }}
            />
          </div>

          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            className="w-10 h-10 rounded-lg border transition-all duration-200 hover:scale-105 flex items-center justify-center"
            style={{
              backgroundColor: theme === "dark" ? "#1E1E1E" : "#F9FAFB",
              borderColor: theme === "dark" ? "#2A2A2A" : "#D1D5DB",
            }}
          >
            <i
              className="fas fa-sync-alt text-sm"
              style={{
                color: theme === "dark" ? "#A0A0A0" : "#6B7280",
              }}
            />
          </button>
        </div>
      </div>
    </header>
  );
}

export default DashboardTopNav;
