"use client";
import { useState, useEffect } from "react";

type Theme = "dark" | "light";

interface ThemeChangeEvent extends CustomEvent {
  detail: {
    theme: Theme;
  };
}

function useTheme(): Theme {
  // Always start with 'dark' to match SSR markup and avoid hydration mismatches
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    // Resolve actual theme on client after mount
    const resolveTheme = (): Theme => {
      try {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "light" || savedTheme === "dark") {
          return savedTheme as Theme;
        }
        const html = document.documentElement;
        return html.classList.contains("dark") ? "dark" : "light";
      } catch {
        return "dark";
      }
    };

    const actual = resolveTheme();
    setTheme(actual);

    // Ensure HTML class matches the resolved theme
    const html = document.documentElement;
    html.classList.remove("dark", "light");
    html.classList.add(actual);

    // Persist
    try {
      localStorage.setItem("theme", actual);
    } catch {}

    // Listen for external theme changes
    const handleThemeChange = (event: Event): void => {
      const themeEvent = event as ThemeChangeEvent;
      const nextTheme = themeEvent.detail.theme;
      setTheme(nextTheme);
      html.classList.remove("dark", "light");
      html.classList.add(nextTheme);
      try {
        localStorage.setItem("theme", nextTheme);
      } catch {}
    };

    document.addEventListener("themeChanged", handleThemeChange);
    return () => document.removeEventListener("themeChanged", handleThemeChange);
  }, []);

  return theme;
}

export default useTheme;
