"use client";
import { useHeaderContext } from "@/context_api/HeaderContext";
import { useVideoModal } from "@/context_api/VideoModalContext";
import useTheme from "@/hooks/useTheme";
import stickyHeader from "@/libs/stickyHeader";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import Navbar from "./Navbar";

const Header = ({ isSticky, useAlternativeStickyStyle = false }) => {
  const [isActiveMobileMenu, setIsActiveMobileMenu] = useState(false);
  const { isInnerPage, headerType } = useHeaderContext();
  const { isAnyVideoModalOpen } = useVideoModal();
  const theme = useTheme();
  const mobileMenuRef = useRef(null);
  const mobileButtonRef = useRef(null);

  useEffect(() => {
    stickyHeader();

    // Add pointer-events-none to the sticky header initially
    const header = document.querySelector(".header-area.header-sticky");
    if (header) {
      header.classList.add("pointer-events-none");
    }
  }, [isSticky]);

  // Click outside handler to close mobile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isActiveMobileMenu &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        mobileButtonRef.current &&
        !mobileButtonRef.current.contains(event.target)
      ) {
        setIsActiveMobileMenu(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isActiveMobileMenu) {
        setIsActiveMobileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isActiveMobileMenu]);

  // Force sticky header to stay visible when mobile menu is active
  useEffect(() => {
    const header = document.querySelector(".header-area.header-sticky");
    if (header) {
      if (isActiveMobileMenu) {
        header.classList.add("sticky");
        header.classList.remove("sticky-out");
        header.classList.remove("pointer-events-none");
      } else {
        // Let the normal scroll logic handle the sticky header state
        // Trigger a scroll event to update the sticky header state
        window.dispatchEvent(new Event("scroll"));
      }
    }
  }, [isActiveMobileMenu]);

  // Prevent body scrolling when mobile menu is active
  useEffect(() => {
    if (isActiveMobileMenu) {
      // Completely disable scrolling
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      // Re-enable scrolling (do NOT restore scroll position, let browser handle hash navigation)
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      // window.scrollTo(...) and parseInt logic removed
    }

    // Cleanup function to restore scrolling when component unmounts
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
    };
  }, [isActiveMobileMenu]);

  // Function to get sticky header styling based on boolean
  const getStickyHeaderStyle = () => {
    if (useAlternativeStickyStyle) {
      // Alternative styling
      return theme === "dark"
        ? "header-2 header-sticky bg-gradient-to-br from-purple-900/95 via-indigo-900/95 to-purple-800/95 backdrop-blur-md border-b border-purple-400/20"
        : "header-2 header-sticky bg-gradient-to-br from-purple-50/95 via-indigo-50/95 to-purple-100/95 backdrop-blur-md border-b border-purple-300/30";
    } else {
      // Default styling
      return theme === "dark"
        ? "header-2 header-sticky bg-gradient-to-br from-gray-950/95 via-slate-900/95 to-gray-900/95 backdrop-blur-md border-b border-white/10"
        : "header-2 header-sticky bg-gradient-to-br from-white/95 via-blue-50/95 to-purple-50/95 backdrop-blur-md border-b border-blue-200/30";
    }
  };

  return (
    <>
      {/* Regular Header - Always visible at top */}
      {!isSticky && (
        <header
          className={`header-area py-[20px] transition-all duration-300 bg-red-500 z-50 header-absolute lg:block hidden ${
            isAnyVideoModalOpen
              ? "opacity-0 pointer-events-none transform -translate-y-full"
              : "opacity-100 pointer-events-auto transform translate-y-0"
          }`}
        >
          <div className="pt-15px xl:pt-5 pb-5 md:pb-30px xl:pb-5 relative">
            <div className="container">
              <div className="flex flex-wrap justify-between items-center">
                {/* <!-- logo and brand --> */}
                <div className="flex items-center gap-x-4">
                  <Logo isSticky={false} />
                  {headerType === 3 ? (
                    ""
                  ) : (
                    <Link href="/">
                      <span
                        className={`hidden md:block text-xl font-bold transition-colors duration-300 hover:scale-105 cursor-pointer ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                      >
                        Clan Labs
                      </span>
                    </Link>
                  )}
                </div>

                {/* <!-- centered main menu --> */}
                <div className="absolute left-1/2 transform -translate-x-1/2">
                  <Navbar
                    isActiveMobileMenu={isActiveMobileMenu}
                    setIsActiveMobileMenu={setIsActiveMobileMenu}
                    isSticky={false}
                  />
                </div>

                {/* <!-- dashboard button on the right --> */}
                <div className="hidden lg:block">
                  {headerType === 3 ? (
                    ""
                  ) : (
                    <div>
                      <Link
                        href="/login"
                        className={`px-4 py-2 backdrop-blur-sm border rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                          theme === "dark"
                            ? "bg-blue-500/80 border-blue-400/30 text-white hover:bg-blue-600/90"
                            : "bg-blue-600/90 border-blue-500/50 text-white hover:bg-blue-700/90"
                        }`}
                      >
                        <i className="fab fa-discord text-lg"></i>
                        Login
                      </Link>
                    </div>
                  )}
                </div>

                {/* <!-- mobile menu button --> */}
                <div className="lg:hidden">
                  <button
                    type="button"
                    className={`menu-bar w-8 h-8 flex flex-col items-center justify-center gap-1 ${
                      isActiveMobileMenu ? "active" : ""
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsActiveMobileMenu(!isActiveMobileMenu);
                    }}
                    aria-label={isActiveMobileMenu ? "Close menu" : "Open menu"}
                    aria-expanded={isActiveMobileMenu}
                  >
                    <span
                      className={`w-5 h-0.5 transition-all duration-300 ${
                        theme === "dark" ? "bg-white" : "bg-gray-900"
                      }`}
                    ></span>
                    <span
                      className={`w-5 h-0.5 transition-all duration-300 ${
                        theme === "dark" ? "bg-white" : "bg-gray-900"
                      }`}
                    ></span>
                    <span
                      className={`w-5 h-0.5 transition-all duration-300 ${
                        theme === "dark" ? "bg-white" : "bg-gray-900"
                      }`}
                    ></span>
                  </button>
                </div>
              </div>
            </div>
            {/* <!-- mobile menu --> */}
            <MobileMenu
              isActiveMobileMenu={isActiveMobileMenu}
              setIsActiveMobileMenu={setIsActiveMobileMenu}
            />
          </div>
        </header>
      )}

      {/* Sticky Header - Appears on scroll */}
      {!isSticky && (
        <header
          className={`header-area py-[20px] transition-all duration-300 z-50 ${getStickyHeaderStyle()} ${
            isAnyVideoModalOpen
              ? "opacity-0 pointer-events-none transform -translate-y-full"
              : "opacity-100 pointer-events-auto transform translate-y-0"
          }`}
        >
          <div className="py-10px relative">
            <div className="container">
              <div className="flex flex-wrap justify-between items-center">
                {/* <!-- logo and brand --> */}
                <div className="flex items-center gap-x-4">
                  <Logo isSticky={true} />
                  {headerType === 3 ? (
                    ""
                  ) : (
                    <Link href="/">
                      <span
                        className={`hidden md:block text-xl font-bold transition-colors duration-300 hover:scale-105 cursor-pointer ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                      >
                        Clan Labs
                      </span>
                    </Link>
                  )}
                </div>

                {/* <!-- centered main menu --> */}
                <div className="absolute left-1/2 transform -translate-x-1/2">
                  <Navbar
                    isActiveMobileMenu={isActiveMobileMenu}
                    setIsActiveMobileMenu={setIsActiveMobileMenu}
                    isSticky={true}
                  />
                </div>

                {/* <!-- dashboard button on the right --> */}
                <div className="hidden lg:block">
                  {headerType === 3 ? (
                    ""
                  ) : (
                    <div>
                      <Link
                        href="/login"
                        className={`px-4 py-2 backdrop-blur-sm border rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                          theme === "dark"
                            ? "bg-blue-500/80 border-blue-400/30 text-white hover:bg-blue-600/90"
                            : "bg-blue-600/90 border-blue-500/50 text-white hover:bg-blue-700/90"
                        }`}
                      >
                        <i className="fab fa-discord text-lg"></i>
                        Login
                      </Link>
                    </div>
                  )}
                </div>

                {/* <!-- mobile menu button --> */}
                <div className="lg:hidden">
                  <button
                    type="button"
                    className={`menu-bar w-8 h-8 flex flex-col items-center justify-center gap-1 ${
                      isActiveMobileMenu ? "active" : ""
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsActiveMobileMenu(!isActiveMobileMenu);
                    }}
                    aria-label={isActiveMobileMenu ? "Close menu" : "Open menu"}
                    aria-expanded={isActiveMobileMenu}
                  >
                    <span
                      className={`w-5 h-0.5 transition-all duration-300 ${
                        theme === "dark" ? "bg-white" : "bg-gray-900"
                      }`}
                    ></span>
                    <span
                      className={`w-5 h-0.5 transition-all duration-300 ${
                        theme === "dark" ? "bg-white" : "bg-gray-900"
                      }`}
                    ></span>
                    <span
                      className={`w-5 h-0.5 transition-all duration-300 ${
                        theme === "dark" ? "bg-white" : "bg-gray-900"
                      }`}
                    ></span>
                  </button>
                </div>
              </div>
            </div>
            {/* <!-- mobile menu --> */}
            <MobileMenu
              isActiveMobileMenu={isActiveMobileMenu}
              setIsActiveMobileMenu={setIsActiveMobileMenu}
            />
          </div>
        </header>
      )}

      {/* Sticky Header for inner pages */}
      {isSticky && (
        <header
          className={`header-area py-[20px] transition-all duration-300 z-50 ${getStickyHeaderStyle()} ${
            isAnyVideoModalOpen
              ? "opacity-0 pointer-events-none transform -translate-y-full"
              : "opacity-100 pointer-events-auto transform translate-y-0"
          }`}
        >
          <div className="py-10px relative">
            <div className="container">
              <div className="flex flex-wrap justify-between items-center">
                {/* <!-- logo and brand --> */}
                <div className="flex items-center gap-x-4">
                  <Logo isSticky={isSticky} />
                  {headerType === 3 ? (
                    ""
                  ) : (
                    <Link href="/">
                      <span
                        className={`hidden md:block text-xl font-bold transition-colors duration-300 hover:scale-105 cursor-pointer ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                      >
                        Clan Labs
                      </span>
                    </Link>
                  )}
                </div>

                {/* <!-- centered main menu --> */}
                <div className="absolute left-1/2 transform -translate-x-1/2">
                  <Navbar
                    isActiveMobileMenu={isActiveMobileMenu}
                    setIsActiveMobileMenu={setIsActiveMobileMenu}
                    isSticky={isSticky}
                  />
                </div>

                {/* <!-- dashboard button on the right --> */}
                <div className="hidden lg:block">
                  {headerType === 3 ? (
                    ""
                  ) : (
                    <div>
                      <Link
                        href="/login"
                        className={`px-4 py-2 backdrop-blur-sm border rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                          theme === "dark"
                            ? "bg-blue-500/80 border-blue-400/30 text-white hover:bg-blue-600/90"
                            : "bg-blue-600/90 border-blue-500/50 text-white hover:bg-blue-700/90"
                        }`}
                      >
                        <i className="fab fa-discord text-lg"></i>
                        Login
                      </Link>
                    </div>
                  )}
                </div>

                {/* <!-- mobile menu button --> */}
                <div className="lg:hidden">
                  <button
                    type="button"
                    className={`menu-bar w-8 h-8 flex flex-col items-center justify-center gap-1 ${
                      isActiveMobileMenu ? "active" : ""
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsActiveMobileMenu(!isActiveMobileMenu);
                    }}
                    aria-label={isActiveMobileMenu ? "Close menu" : "Open menu"}
                    aria-expanded={isActiveMobileMenu}
                  >
                    <span
                      className={`w-5 h-0.5 transition-all duration-300 ${
                        theme === "dark" ? "bg-white" : "bg-gray-900"
                      }`}
                    ></span>
                    <span
                      className={`w-5 h-0.5 transition-all duration-300 ${
                        theme === "dark" ? "bg-white" : "bg-gray-900"
                      }`}
                    ></span>
                    <span
                      className={`w-5 h-0.5 transition-all duration-300 ${
                        theme === "dark" ? "bg-white" : "bg-gray-900"
                      }`}
                    ></span>
                  </button>
                </div>
              </div>
            </div>
            {/* <!-- mobile menu --> */}
            <MobileMenu
              isActiveMobileMenu={isActiveMobileMenu}
              setIsActiveMobileMenu={setIsActiveMobileMenu}
            />
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
