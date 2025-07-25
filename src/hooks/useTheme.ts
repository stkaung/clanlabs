"use client";
import { useState, useEffect } from "react";

type Theme = "dark" | "light";

interface ThemeChangeEvent extends CustomEvent {
  detail: {
    theme: Theme;
  };
}

function useTheme(): Theme {
  const [theme, setTheme] = useState<Theme>("dark"); // default to dark

  useEffect(() => {
    // Check HTML class for current theme
    const html = document.querySelector("html");
    const isDark = html?.classList?.contains("dark");
    setTheme(isDark ? "dark" : "light");

    // Listen for theme changes from the theme controller
    const handleThemeChange = (event: Event): void => {
      const themeEvent = event as ThemeChangeEvent;
      setTheme(themeEvent.detail.theme);
    };

    document.addEventListener("themeChanged", handleThemeChange);

    return (): void => {
      document.removeEventListener("themeChanged", handleThemeChange);
    };
  }, []);

  return theme;
}

export default useTheme;
