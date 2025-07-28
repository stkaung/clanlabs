"use client";
import { useState, useEffect } from "react";

type Theme = "dark" | "light";

interface ThemeChangeEvent extends CustomEvent {
  detail: {
    theme: Theme;
  };
}

function useTheme(): Theme {
  // Initialize theme synchronously to prevent flash
  const getInitialTheme = (): Theme => {
    if (typeof window === "undefined") return "dark"; // SSR fallback

    // First check localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme as Theme;
    }

    // Then check HTML class
    const html = document.querySelector("html");
    const isDark = html?.classList?.contains("dark");
    return isDark ? "dark" : "light";
  };

  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    // Ensure HTML class matches the theme
    const html = document.querySelector("html");
    if (html) {
      html.classList.remove("dark", "light");
      html.classList.add(theme);
    }

    // Save theme to localStorage
    localStorage.setItem("theme", theme);

    // Listen for theme changes from the theme controller
    const handleThemeChange = (event: Event): void => {
      const themeEvent = event as ThemeChangeEvent;
      setTheme(themeEvent.detail.theme);
    };

    document.addEventListener("themeChanged", handleThemeChange);

    return (): void => {
      document.removeEventListener("themeChanged", handleThemeChange);
    };
  }, [theme]);

  return theme;
}

export default useTheme;
