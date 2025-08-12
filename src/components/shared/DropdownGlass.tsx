"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

export interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownGlassProps {
  value: string;
  options: DropdownOption[];
  onChange: (next: string) => void;
  placeholder?: string;
  className?: string;
  buttonClassName?: string;
  menuClassName?: string;
  ariaLabel?: string;
}

export default function DropdownGlass({
  value,
  options,
  onChange,
  placeholder = "Select",
  className = "",
  buttonClassName = "",
  menuClassName = "",
  ariaLabel,
}: DropdownGlassProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [menuPos, setMenuPos] = useState<{ left: number; top: number; width: number } | null>(null);

  const selectedLabel = useMemo(() => {
    const match = options.find((o) => o.value === value);
    return match?.label ?? placeholder;
  }, [value, options, placeholder]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      const target = event.target as Node;
      const c = containerRef.current;
      const m = document.getElementById(menuIdRef.current);
      if (!c) return;
      if (!c.contains(target) && (!m || !m.contains(target))) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuIdRef = useRef<string>(() => `dg-${Math.random().toString(36).slice(2)}` as unknown as string);
  if (typeof menuIdRef.current !== "string") {
    // initialize once if function left in ref from SSR
    menuIdRef.current = `dg-${Math.random().toString(36).slice(2)}`;
  }

  useEffect(() => {
    if (!open) return;
    function updatePosition() {
      const btn = buttonRef.current;
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      setMenuPos({ left: rect.left, top: rect.bottom + 8, width: rect.width });
    }
    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement | HTMLDivElement>): void {
    if (!open && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      setOpen(true);
      setActiveIndex(Math.max(0, options.findIndex((o) => o.value === value)));
      return;
    }
    if (!open) return;
    if (event.key === "Escape") {
      setOpen(false);
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((prev) => (prev + 1) % options.length);
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((prev) => (prev - 1 + options.length) % options.length);
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      const active = options[activeIndex];
      if (active) {
        onChange(active.value);
        setOpen(false);
      }
      return;
    }
  }

  return (
    <div ref={containerRef} className={`relative ${className}`} style={{ overflow: "visible" }}>
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel ?? placeholder}
        onClick={() => setOpen((s) => !s)}
        onKeyDown={handleKeyDown}
        className={`w-full h-10 rounded-xl px-3 pr-10 text-left transition-all outline-none border backdrop-blur-md
          ${open ? 'ring-2 ring-indigo-500/40' : ''}
          bg-white/60 dark:bg-white/5 border-gray-200/40 dark:border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]
          text-gray-900 dark:text-white/90 hover:bg-white/70 dark:hover:bg-white/10 focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/30 ${buttonClassName}`}
      >
        <span className="truncate">{selectedLabel}</span>
        <i className="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-700/60 dark:text-white/50" />
      </button>

      {open && menuPos && typeof document !== 'undefined' && createPortal(
        <div
          id={menuIdRef.current}
          role="listbox"
          tabIndex={-1}
          onKeyDown={handleKeyDown}
          style={{ position: 'fixed', left: menuPos.left, top: menuPos.top, width: menuPos.width }}
          className={`z-[9999] rounded-xl overflow-hidden border backdrop-blur-xl
            bg-white/90 dark:bg-[#0f1222]/90 border-gray-200/60 dark:border-white/10 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)] ${menuClassName}`}
        >
          <div className="max-h-64 overflow-auto">
            {options.map((opt, idx) => {
              const isActive = idx === activeIndex || opt.value === value;
              return (
                <button
                  key={opt.value}
                  role="option"
                  aria-selected={opt.value === value}
                  className={`w-full text-left px-3 py-2 text-sm transition-colors
                    ${isActive ? 'bg-indigo-500/15 text-indigo-200' : 'text-gray-800 dark:text-gray-200'}
                    hover:bg-white/80 dark:hover:bg-white/10`}
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

