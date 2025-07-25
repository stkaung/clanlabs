const stickyHeader = () => {
  let lastScrollTop = 0;

  window.addEventListener("scroll", () => {
    const scroll = window.scrollY;
    const header = document.querySelector(".header-area.header-sticky");
    const mobileMenu = document.querySelector(".mobile-menu");
    const isMobileMenuActive =
      mobileMenu && mobileMenu.classList.contains("active");
    const isMobile = window.innerWidth <= 768;

    if (header) {
      // If mobile menu is active, keep the sticky header visible
      if (isMobileMenuActive) {
        header.classList.add("sticky");
        header.classList.remove("sticky-out");
        header.classList.remove("pointer-events-none");
        return;
      }

      // On mobile, always keep the sticky header visible
      if (isMobile) {
        header.classList.add("sticky");
        header.classList.remove("sticky-out");
        header.classList.remove("pointer-events-none");
        return;
      }

      // Desktop behavior - normal scroll-based logic
      if (scroll > 1) {
        header.classList.add("sticky");
        header.classList.remove("sticky-out");
        header.classList.remove("pointer-events-none");
      } else if (scroll < lastScrollTop) {
        if (scroll < 1) {
          header.classList.add("sticky-out");
          header.classList.add("pointer-events-none");
          header.classList.remove("sticky");
        }
      } else {
        header.classList.remove("sticky");
        if (scroll < 1) {
          header.classList.add("pointer-events-none");
        }
      }

      lastScrollTop = scroll;
    }
  });
};

export default stickyHeader;
