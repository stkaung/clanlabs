"use client";

import { useState, useRef, useEffect } from "react";
import useTheme from "@/hooks/useTheme";

interface TypeFilterHeaderProps {
  onFilterChange: (type: "all" | "User" | "Group") => void;
}

function TypeFilterHeader({ onFilterChange }: TypeFilterHeaderProps) {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<"all" | "User" | "Group">("all");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(type: typeof selectedType) {
    setSelectedType(type);
    onFilterChange(type);
    setIsOpen(false);
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group flex items-center focus:outline-none ${
          theme === "dark" ? "text-gray-300" : "text-gray-600"
        }`}
      >
        <div className="flex flex-col -space-y-1">
          <i className={`fas fa-chevron-up text-[8px] transition-colors duration-200 ${
            isOpen || selectedType !== "all"
              ? theme === "dark"
                ? "text-blue-400"
                : "text-blue-600"
              : "group-hover:text-gray-400"
          }`} />
          <i className={`fas fa-chevron-down text-[8px] transition-colors duration-200 ${
            isOpen || selectedType !== "all"
              ? theme === "dark"
                ? "text-blue-400"
                : "text-blue-600"
              : "group-hover:text-gray-400"
          }`} />
        </div>
        {selectedType !== "all" && (
          <div className={`ml-1.5 w-2 h-2 rounded-full ${
            theme === "dark" ? "bg-blue-400" : "bg-blue-500"
          }`} />
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute z-[100] mt-2 -left-2 w-48 rounded-lg border shadow-lg transition-all duration-200 ${
            theme === "dark"
              ? "bg-gray-800/95 border-gray-700"
              : "bg-white/95 border-gray-200"
          }`}
          style={{
            backdropFilter: "blur(8px)",
            boxShadow: theme === "dark"
              ? "0 4px 20px rgba(0, 0, 0, 0.3)"
              : "0 4px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="p-2 space-y-1">
            {[
              { value: "all", label: "All Types", icon: "fas fa-globe" },
              { value: "User", label: "Users Only", icon: "fas fa-user" },
              { value: "Group", label: "Groups Only", icon: "fas fa-users" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value as typeof selectedType)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                  selectedType === option.value
                    ? theme === "dark"
                      ? "bg-blue-500/20 text-blue-300"
                      : "bg-blue-50 text-blue-700"
                    : theme === "dark"
                    ? "text-gray-300 hover:bg-gray-700/50"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <i className={`${option.icon} text-sm opacity-75`} />
                <span>{option.label}</span>
                {selectedType === option.value && (
                  <i className="fas fa-check ml-auto text-xs" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TypeFilterHeader;