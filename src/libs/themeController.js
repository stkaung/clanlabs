const themeController = () => {
  const html = document.querySelector("html");

  // Default to dark mode
  html.classList.add("dark");

  const themeController = document.querySelector(".theme-controller");
  themeController.addEventListener("click", function () {
    html.classList.toggle("dark");
    const isDark = html.classList.contains("dark");

    // Dispatch custom event for React components to listen to
    const themeChangeEvent = new CustomEvent("themeChanged", {
      detail: { theme: isDark ? "dark" : "light" },
    });
    document.dispatchEvent(themeChangeEvent);
  });
};

export default themeController;
