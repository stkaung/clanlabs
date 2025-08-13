"use client";
import { ReactNode, useEffect, useState, useLayoutEffect, useRef } from "react";
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
  const [show, setShow] = useState(false);

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
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    }

    if (isOpen) {
      setShow(true);
      document.addEventListener("keydown", handleEscape);
      // Lock background scroll (both html and body)
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      // For withinContainer modals, add a positioned blur overlay that covers ONLY the main content area
      if (withinContainer) {
        const ensureOverlay = () => {
          if (!overlayRef.current) {
            const div = document.createElement("div");
            div.style.position = "fixed";
            div.style.inset = "0px";
            div.style.zIndex = "9998"; // below modal (9999)
            div.style.pointerEvents = "auto";
            div.style.backdropFilter = "blur(6px)";
            div.style.backgroundColor = theme === "dark" ? "rgba(0,0,0,0.45)" : "rgba(0,0,0,0.25)";
            document.body.appendChild(div);
            overlayRef.current = div;
            const prevent = (e: Event) => {
              e.preventDefault();
            };
            overlayRef.current.addEventListener("wheel", prevent, { passive: false });
            overlayRef.current.addEventListener("touchmove", prevent, { passive: false });
          }
        };
        ensureOverlay();
        // Position overlay to cover only the page content container (not navbar/sidebar)
        const content = document.getElementById("main-content-container");
        const pageRoot = document.getElementById("page-blur-root");
        const targetEl = pageRoot || content;
        if (overlayRef.current && targetEl) {
          const rect = targetEl.getBoundingClientRect();
          const navHeight = 64; // TopNavBar h-16
          const top = Math.max(navHeight, rect.top);
          const bottom = rect.top + rect.height;
          overlayRef.current.style.top = `${top}px`;
          overlayRef.current.style.left = `${rect.left}px`;
          overlayRef.current.style.width = `${rect.width}px`;
          overlayRef.current.style.height = `${Math.max(0, bottom - top)}px`;
        }
      }
      // Mount first in reduced scale, then animate to full
      setIsMounted(false);
      requestAnimationFrame(() => setIsMounted(true));
    } else {
      // Start close animation
      setIsMounted(false);
      // Wait for animation to finish before removing from DOM and overlay
      const timeout = window.setTimeout(() => {
        setShow(false);
        if (withinContainer) {
          if (overlayRef.current) {
            overlayRef.current.remove();
            overlayRef.current = null;
          }
        }
      }, 220);
      return () => window.clearTimeout(timeout);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
      // Ensure overlay is removed on unmount/cleanup regardless of state
      if (overlayRef.current) {
        overlayRef.current.remove();
        overlayRef.current = null;
      }
    };
  }, [isOpen, onClose, withinContainer]);

  // Track container size to constrain modal width when withinContainer is true
  const [containerSize, setContainerSize] = useState<{ width: number; height: number } | null>(null);
  // Track horizontal center (left) for withinContainer; vertical is handled via Tailwind classes
  const [leftCenter, setLeftCenter] = useState<number | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!withinContainer || !isOpen) return;
    function computePosition() {
      const content = document.getElementById("main-content-container");
      const pageRoot = document.getElementById("page-blur-root");
      const targetEl = pageRoot || content;
      if (!targetEl) return;
      const rect = targetEl.getBoundingClientRect();
      setContainerSize({ width: rect.width, height: rect.height });
      setLeftCenter(rect.left + rect.width / 2);
      if (overlayRef.current) {
        const navHeight = 64;
        const top = Math.max(navHeight, rect.top);
        const bottom = rect.top + rect.height;
        overlayRef.current.style.top = `${top}px`;
        overlayRef.current.style.left = `${rect.left}px`;
        overlayRef.current.style.width = `${rect.width}px`;
        overlayRef.current.style.height = `${Math.max(0, bottom - top)}px`;
      }
    }
    computePosition();
  }, [withinContainer, isOpen]);

  useEffect(() => {
    if (!withinContainer || !isOpen) return;
    function computePosition() {
      const container = document.getElementById("main-content-container");
      if (!container) return;
      const rect = container.getBoundingClientRect();
      setContainerSize({ width: rect.width, height: rect.height });
      setLeftCenter(rect.left + rect.width / 2);
    }
    window.addEventListener("resize", computePosition);
    window.addEventListener("scroll", computePosition, true);
    // Also recompute immediately to capture current viewport size
    computePosition();
    return () => {
      window.removeEventListener("resize", computePosition);
      window.removeEventListener("scroll", computePosition, true);
    };
  }, [withinContainer, isOpen]);

  // Prevent background scroll: block wheel/touch outside the modal panel
  useEffect(() => {
    if (!isOpen) return;
    const blockIfOutside = (e: Event) => {
      const path = (e as any).composedPath?.() as Node[] | undefined;
      if (panelRef.current) {
        if (path && path.includes(panelRef.current)) return; // allow scrolling inside
        const target = e.target as Node | null;
        if (target && panelRef.current.contains(target)) return;
      }
      e.preventDefault();
    };
    document.addEventListener("wheel", blockIfOutside, { passive: false });
    document.addEventListener("touchmove", blockIfOutside, { passive: false });
    return () => {
      document.removeEventListener("wheel", blockIfOutside);
      document.removeEventListener("touchmove", blockIfOutside);
    };
  }, [isOpen]);

  if (!show) return null;

  const modalNode = (
    <div className={`fixed inset-0 z-[9999] transition-opacity duration-200 ${
      (!withinContainer || leftCenter !== null) && (isOpen || isMounted) ? "opacity-100 visible" : "opacity-0 visible"
    }`}>
      {/* Backdrop overlay: full-viewport for global modals; content-area-only for withinContainer (via body overlay) */}
      {!withinContainer && (
        <div
          className="absolute inset-0 pointer-events-none backdrop-blur-sm"
          style={{ backgroundColor: theme === "dark" ? "rgba(0,0,0,0.45)" : "rgba(0,0,0,0.25)" }}
        />
      )}

      {/* Centering wrapper */}
      <div
        className={
          withinContainer
            ? "absolute top-1/2 transform -translate-x-1/2 translate-y-[calc(-50%+32px)]"
            : "absolute inset-0 flex items-center justify-center"
        }
        style={withinContainer && leftCenter !== null ? { left: leftCenter } : undefined}
      >
        <div
          className={`relative w-full max-h-[85vh] ${maxWidthClasses[maxWidth]} rounded-2xl border shadow-2xl flex flex-col transition-transform duration-200 ease-out transform ${
            isMounted ? "scale-100" : "scale-95"
          } ${theme === "dark" ? "bg-gray-800/95 border-gray-600/50" : "bg-white/95 border-gray-200/50"}`}
          ref={panelRef}
          style={{
            width: withinContainer
              ? containerSize
                ? `min(96vw, ${Math.min(containerSize.width - 24, 1536)}px)`
                : "min(96vw, 1280px)"
              : undefined,
            margin: withinContainer ? "0 auto" : undefined,
            overscrollBehavior: "contain",
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
          <div
            ref={contentRef}
            className="flex-1 overflow-y-auto p-6 overscroll-contain"
            onWheelCapture={(e) => {
              const el = contentRef.current;
              if (!el) return;
              e.preventDefault();
              e.stopPropagation();
              const next = el.scrollTop + e.deltaY;
              const max = el.scrollHeight - el.clientHeight;
              el.scrollTop = Math.max(0, Math.min(max, next));
            }}
            onTouchMoveCapture={(e) => {
              const el = contentRef.current;
              if (!el) return;
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalNode, typeof document !== "undefined" ? document.body : ({} as any));
}

export default BaseModal;
