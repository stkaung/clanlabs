"use client";
import { useState, useEffect } from "react";
import BaseModal from "@/components/dashboard/shared/BaseModal";
import useTheme from "@/hooks/useTheme";

interface MobileSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string) => void;
  placeholder?: string;
  initialQuery?: string;
}

function MobileSearchModal({
  isOpen,
  onClose,
  onSearch,
  placeholder = "Search...",
  initialQuery = "",
}: MobileSearchModalProps) {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Prevent hydration mismatch by only rendering on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Update search query when initialQuery changes
  useEffect(() => {
    setSearchQuery(initialQuery);
  }, [initialQuery]);

  // Close modal on escape key
  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent): void {
      if (event.key === "Escape") {
        onClose();
      }
    }

    if (isOpen && isMounted) {
      document.addEventListener("keydown", handleEscapeKey);
      // Focus on input when modal opens
      const input = document.getElementById("mobile-search-input");
      setTimeout(() => input?.focus(), 100);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose, isMounted]);

  // Don't render anything until mounted
  if (!isMounted) return null;

  function handleSearch(): void {
    onSearch(searchQuery);
    onClose();
  }

  function handleSearchChange(value: string): void {
    setSearchQuery(value);
    // Real-time search - update results as user types
    onSearch(value);
  }

  function handleClear(): void {
    setSearchQuery("");
    // Clear search results immediately
    onSearch("");
  }

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Search" showCloseButton={true} maxWidth="md">
      <div
        className={`mx-0 rounded-xl ${
          theme === "dark" ? "" : ""
        }`}
      >
          {/* Header */}
        <div className={`px-0`}></div>

          {/* Search Input */}
          <div className="p-4">
            <div className="relative">
              <i
                className={`fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <input
                id="mobile-search-input"
                type="text"
                placeholder={placeholder}
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className={`w-full pl-12 pr-12 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 ${
                  theme === "dark"
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                }`}
                style={{ fontFamily: "'Poppins', sans-serif" }}
              />
              {searchQuery && (
                <button
                  onClick={handleClear}
                  className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${
                    theme === "dark"
                      ? "text-gray-400 hover:text-gray-300"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <i className="fas fa-times text-sm" />
                </button>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 mt-4">
              <button
                onClick={onClose}
                className="flex-1 py-3 px-6 rounded-lg font-medium bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white hover:scale-105 shadow-lg transition-all duration-200"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                <i className="fas fa-check mr-2" />
                Done
              </button>
            </div>
          </div>
      </div>
    </BaseModal>
  );
}

export default MobileSearchModal;
