const themeController = () => {
  const html = document.querySelector("html");

  // Initialize theme from localStorage or default to dark
  const savedTheme = localStorage.getItem("theme");
  const initialTheme = savedTheme || "dark";
  html.classList.remove("dark", "light");
  html.classList.add(initialTheme);

  const themeController = document.querySelector(".theme-controller");
  themeController.addEventListener("click", function () {
    const isDark = html.classList.contains("dark");
    const newTheme = isDark ? "light" : "dark";

    html.classList.remove("dark", "light");
    html.classList.add(newTheme);

    // Save to localStorage
    localStorage.setItem("theme", newTheme);

    // Dispatch custom event for React components to listen to
    const themeChangeEvent = new CustomEvent("themeChanged", {
      detail: { theme: newTheme },
    });
    document.dispatchEvent(themeChangeEvent);
  });
};

export default themeController;
