"use client";
import { ReactNode, useEffect, useState } from "react";
import useTheme from "@/hooks/useTheme";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl";
  showCloseButton?: boolean;
}

function BaseModal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = "2xl",
  showCloseButton = true,
}: BaseModalProps) {
  const theme = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
  };

  // Handle escape key and mounting state
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
      // Set mounted after a small delay to trigger animation
      setTimeout(() => setIsMounted(true), 10);
    } else {
      // Start close animation
      setIsMounted(false);
             // Wait for animation to finish before hiding modal
       setTimeout(() => {
         // Modal will be hidden by parent opacity
       }, 300);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-300 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
      }`}
    >
             {/* Full-screen backdrop overlay */}
       <div
         className={`absolute inset-0 transition-all duration-300 ${
           isOpen ? "backdrop-blur-md" : "backdrop-blur-none"
         } ${theme === "dark" ? "bg-black/15" : "bg-black/8"}`}
         style={{
           backdropFilter: isOpen ? "blur(12px)" : "blur(0px)",
         }}
       />

      {/* Modal container */}
      <div className="relative z-10 w-full h-full flex items-center justify-center p-4 pt-12">
        {/* Modal */}
                 <div
           className={`relative w-full max-h-[85vh] ${
             maxWidthClasses[maxWidth]
           } rounded-2xl border shadow-2xl backdrop-blur-md flex flex-col transition-all duration-300 ease-out transform ${
             isMounted
               ? "scale-100 translate-y-0 opacity-100"
               : "scale-90 translate-y-6 opacity-0"
           } ${
             theme === "dark"
               ? "bg-gray-800/95 border-gray-600/50"
               : "bg-white/95 border-gray-200/50"
           }`}
           style={{ backdropFilter: "blur(12px)" }}
         >
          {/* Header */}
          {(title || showCloseButton) && (
            <div
              className={`px-6 py-4 border-b flex-shrink-0 ${
                theme === "dark" ? "border-gray-600/50" : "border-gray-200/50"
              }`}
            >
              <div className="flex items-center justify-between">
                {title && (
                  <div>
                    <h2
                      className={`text-xl font-bold ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {title}
                    </h2>
                    {subtitle && (
                      <p
                        className={`text-sm mt-1 ${
                          theme === "dark" ? "text-gray-400" : "text-gray-600"
                        }`}
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        {subtitle}
                      </p>
                    )}
                  </div>
                )}
                {showCloseButton && (
                  <button
                    onClick={onClose}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 ${
                      theme === "dark"
                        ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                    }`}
                  >
                    <i className="fas fa-times text-sm" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default BaseModal;
