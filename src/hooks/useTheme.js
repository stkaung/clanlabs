"use client";
import { useState, useEffect } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState("dark"); // default to dark

  useEffect(() => {
    // Check HTML class for current theme
    const html = document.querySelector("html");
    const isDark = html?.classList?.contains("dark");
    setTheme(isDark ? "dark" : "light");

    // Listen for theme changes from the theme controller
    const handleThemeChange = (event) => {
      setTheme(event.detail.theme);
    };

    document.addEventListener("themeChanged", handleThemeChange);

    return () => {
      document.removeEventListener("themeChanged", handleThemeChange);
    };
  }, []);

  return theme;
};

export default useTheme;
