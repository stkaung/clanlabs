"use client";
import { ReactNode, useEffect, useState, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import useTheme from "@/hooks/useTheme";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl";
  showCloseButton?: boolean;
  withinContainer?: boolean;
}

function BaseModal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = "2xl",
  showCloseButton = true,
  withinContainer = false,
}: BaseModalProps) {
  const theme = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  const maxWidthClasses: Record<NonNullable<BaseModalProps["maxWidth"]>, string> = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    "6xl": "max-w-6xl",
    "7xl": "max-w-7xl",
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
      // Apply blur to main content container when requested
      // Only blur the background content element, not this modal
      if (withinContainer) {
        const content = document.getElementById("main-content-blur");
        if (content) {
          content.style.transition = "filter 200ms ease";
          content.style.filter = "blur(6px)";
        }
      }
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
      if (withinContainer) {
        const content = document.getElementById("main-content-blur");
        if (content) {
          content.style.filter = "";
        }
      }
    };
  }, [isOpen, onClose, withinContainer]);

  // Compute positioning when withinContainer is true (center within main content container)
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const [containerSize, setContainerSize] = useState<{ width: number; height: number } | null>(null);

  useLayoutEffect(() => {
    if (!withinContainer || !isOpen) return;
    function computePosition() {
      const container = document.getElementById("main-content-container");
      if (!container) return;
      const rect = container.getBoundingClientRect();
      setPosition({ top: rect.top + rect.height / 2, left: rect.left + rect.width / 2 });
      setContainerSize({ width: rect.width, height: rect.height });
    }
    computePosition();
  }, [withinContainer, isOpen]);

  useEffect(() => {
    if (!withinContainer || !isOpen) return;
    function computePosition() {
      const container = document.getElementById("main-content-container");
      if (!container) return;
      const rect = container.getBoundingClientRect();
      setPosition({ top: rect.top + rect.height / 2, left: rect.left + rect.width / 2 });
      setContainerSize({ width: rect.width, height: rect.height });
    }
    window.addEventListener("resize", computePosition);
    window.addEventListener("scroll", computePosition, true);
    return () => {
      window.removeEventListener("resize", computePosition);
      window.removeEventListener("scroll", computePosition, true);
    };
  }, [withinContainer, isOpen]);

  const modalNode = (
    <div
      className={`z-[9999] transition-opacity duration-200 ${
        isOpen && (!withinContainer || position) ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
      }`}
      style={
        withinContainer && position
          ? {
              position: "fixed",
              top: position.top,
              left: position.left,
              transform: "translate(-50%, -50%)",
              maxWidth: containerSize ? `${containerSize.width}px` : undefined,
              width: "100%",
            }
          : { position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }
      }
    >
      {/* No backdrop; modal only */}
      <div
        className={`relative w-full max-h-[85vh] ${maxWidthClasses[maxWidth]} rounded-2xl border shadow-2xl flex flex-col transition-transform duration-200 ease-out transform ${
          isMounted ? "scale-100" : "scale-95"
        } ${theme === "dark" ? "bg-gray-800/95 border-gray-600/50" : "bg-white/95 border-gray-200/50"}`}
        style={{
          width: withinContainer
            ? containerSize
              ? `min(96vw, ${Math.min(containerSize.width - 24, 1536)}px)`
              : "min(96vw, 1280px)"
            : undefined,
          margin: withinContainer ? "0 auto" : undefined,
        }}
      >
        {(title || showCloseButton) && (
          <div className={`px-6 py-4 border-b flex-shrink-0 ${theme === "dark" ? "border-gray-600/50" : "border-gray-200/50"}`}>
            <div className="flex items-center justify-between">
              {title && (
                <div>
                  <h2 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`} style={{ fontFamily: "'Poppins', sans-serif" }}>
                    {title}
                  </h2>
                  {subtitle && (
                    <p className={`text-sm mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`} style={{ fontFamily: "'Poppins', sans-serif" }}>
                      {subtitle}
                    </p>
                  )}
                </div>
              )}
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 ${
                    theme === "dark" ? "bg-gray-700 hover:bg-gray-600 text-gray-300" : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                  }`}
                >
                  <i className="fas fa-times text-sm" />
                </button>
              )}
            </div>
          </div>
        )}
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );

  return createPortal(modalNode, typeof document !== "undefined" ? document.body : ({} as any));
}

export default BaseModal;
