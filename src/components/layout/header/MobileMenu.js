"use client";
import { useHeaderContext } from "@/context_api/HeaderContext";
import useTheme from "@/hooks/useTheme";
import getNavItems from "@/libs/getNavItems";
import Link from "next/link";
import { useEffect, useRef } from "react";

const MobileMenu = ({ isActiveMobileMenu, setIsActiveMobileMenu }) => {
  const { isIndexPage } = useHeaderContext();
  const theme = useTheme();
  const navItems = getNavItems();
  const menuRef = useRef(null);
  const scrollPositionRef = useRef(0);

  // Track scroll position and handle focus trap for mobile menu
  useEffect(() => {
    if (isActiveMobileMenu) {
      // Store current scroll position when menu opens
      scrollPositionRef.current = window.scrollY;

      // Immediately restore position to prevent auto-scroll to top
      window.scrollTo({
        top: scrollPositionRef.current,
        behavior: "instant",
      });

      // Focus trap
      if (menuRef.current) {
        const focusableElements = menuRef.current.querySelectorAll(
          'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length > 0) {
          focusableElements[0].focus();
        }
      }
    } else {
      // Restore scroll position when menu closes
      if (scrollPositionRef.current > 0) {
        window.scrollTo({
          top: scrollPositionRef.current,
          behavior: "instant",
        });
      }
    }
  }, [isActiveMobileMenu]);

  // Force scroll position restoration whenever hamburger is pressed
  useEffect(() => {
    if (scrollPositionRef.current > 0) {
      window.scrollTo({
        top: scrollPositionRef.current,
        behavior: "instant",
      });
    }
  }, [isActiveMobileMenu]);

  const handleLinkClick = () => {
    // Close mobile menu when a link is clicked
    if (setIsActiveMobileMenu) {
      setIsActiveMobileMenu(false);
    }
  };

  return (
    <div
      ref={menuRef}
      className={`mobile-menu absolute left-0 top-full min-h-screen-90 w-full border-t block origin-top-left lg:hidden transition-all duration-300 ${
        isActiveMobileMenu ? "active" : ""
      } ${
        theme === "dark"
          ? "bg-gray-950 border-white/10"
          : "bg-white border-gray-200/50"
      }`}
      role="navigation"
      aria-label="Mobile navigation menu"
      aria-hidden={!isActiveMobileMenu}
    >
      <div className="container py-8 pt-16">
        <ul className="space-y-6">
          {navItems?.length
            ? navItems?.map(({ name, path, path2 }, idx) => (
                <li key={idx}>
                  <Link
                    href={isIndexPage ? path : path2}
                    className={`block font-medium text-lg transition-colors duration-300 hover:text-blue-300 ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                    onClick={handleLinkClick}
                    tabIndex={isActiveMobileMenu ? 0 : -1}
                  >
                    {name}
                  </Link>
                </li>
              ))
            : ""}
          <li>
            <Link
              href="/login"
              className={`inline-flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium transition-all duration-200 ${
                theme === "dark"
                  ? "bg-blue-500/80 border-blue-400/30 text-white hover:bg-blue-600/90"
                  : "bg-blue-600/90 border-blue-500/50 text-white hover:bg-blue-700/90"
              }`}
              onClick={handleLinkClick}
              tabIndex={isActiveMobileMenu ? 0 : -1}
            >
              <i className="fab fa-discord text-lg"></i>
              Login
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MobileMenu;
