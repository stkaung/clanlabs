const indexingAndActiveLink = () => {
  const sections = document.querySelectorAll("section"); // All sections
  const navLinks = document.querySelectorAll("nav>ul li:has(a) > a"); // All nav links

  window.addEventListener("scroll", () => {
    if (navLinks?.length) {
      let currentSection = "";

      // Loop through sections to find the current one
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const scrollPosition = window.scrollY + window.innerHeight / 2;

        // Check if the middle of the viewport is within this section
        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          currentSection = section.getAttribute("id");
        }
      });

      // Remove 'active' class from all links and add it to the current one
      navLinks.forEach((link) => {
        link.classList.remove("active");

        if (link.getAttribute("href")?.includes(currentSection)) {
          link.classList.add("active");
        }
      });
    }
  });
};

export default indexingAndActiveLink;
