const smoothScroll = () => {
  var links = document.querySelectorAll('a[href^="#"]');
  if (!links.length) {
    return;
  }

  links.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      var targetId = this.getAttribute("href").substring(1);
      var targetElement = document.getElementById(targetId);

      if (targetElement) {
        // Calculate the position to center the element in the viewport
        const elementRect = targetElement.getBoundingClientRect();
        const absoluteElementTop = elementRect.top + window.pageYOffset;

        // Add extra offset for specific sections
        let headerOffset = 80; // Default offset
        let additionalOffset = 0; // Additional offset for specific sections

        // Add extra offset for the experiences section
        if (targetId === "experiences" || targetId === "portfolio") {
          additionalOffset = 150; // Significant additional offset for experiences section
        }

        const elementPosition = absoluteElementTop - headerOffset;
        const offsetPosition =
          elementPosition -
          window.innerHeight / 2 +
          elementRect.height / 2 -
          additionalOffset;

        // Scroll to the calculated position
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      } else {
        window.scroll({ top: 0, left: 0, behavior: "smooth" });
      }
    });
  });
};

export default smoothScroll;
