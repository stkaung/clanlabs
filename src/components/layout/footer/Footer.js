"use client";
import { useFooterContext } from "@/context_api/FooterContext";
import useTheme from "@/hooks/useTheme";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const { footerType } = useFooterContext();
  const theme = useTheme();

  return (
    <footer>
      <div
        className={`footer-inner transition-all duration-500 ${
          theme === "dark"
            ? footerType === 2
              ? "bg-seondary-color"
              : "bg-dark-color"
            : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
        }`}
      >
        <div className="container">
          <div className="flex flex-col items-center pt-20px pb-5 md:pt-30px">
            {/* logo */}
            <div className="footer-logo w-50px h-50px mb-4">
              <Link href="/">
                <Image
                  src="/img/logo/mainlogo.png"
                  alt=""
                  width={400}
                  height={400}
                  className="rounded-full"
                />
              </Link>
            </div>
            {/* <!-- nav --> */}
            <div>
              <ul className="nav flex flex-wrap justify-center items-center gap-x-25px">
                <li className="nav_item group relative">
                  <Link
                    href="#"
                    className={`text-size-15 font-medium capitalize py-5px md:py-8px lg:py-12px relative z-0 transition-colors duration-300 ${
                      theme === "dark"
                        ? "text-white-color"
                        : "text-gray-800 hover:text-blue-600"
                    }`}
                  >
                    Home
                  </Link>
                </li>
                <li className="nav_item group relative">
                  <Link
                    href="#features"
                    className={`text-size-15 font-medium capitalize py-5px md:py-8px lg:py-12px relative z-0 transition-colors duration-300 ${
                      theme === "dark"
                        ? "text-white-color"
                        : "text-gray-800 hover:text-blue-600"
                    }`}
                  >
                    Services
                  </Link>
                </li>
                <li className="nav_item group relative">
                  <Link
                    href="#tutorial-videos"
                    className={`text-size-15 font-medium capitalize py-5px md:py-8px lg:py-12px relative z-0 transition-colors duration-300 ${
                      theme === "dark"
                        ? "text-white-color"
                        : "text-gray-800 hover:text-blue-600"
                    }`}
                  >
                    Tutorials
                  </Link>
                </li>
                <li className="nav_item group relative">
                  <Link
                    href="#features-on-demand"
                    className={`text-size-15 font-medium capitalize py-5px md:py-8px lg:py-12px relative z-0 transition-colors duration-300 ${
                      theme === "dark"
                        ? "text-white-color"
                        : "text-gray-800 hover:text-blue-600"
                    }`}
                  >
                    Features
                  </Link>
                </li>
                <li className="nav_item group relative">
                  <Link
                    href="#us-vs-others"
                    className={`text-size-15 font-medium capitalize py-5px md:py-8px lg:py-12px relative z-0 transition-colors duration-300 ${
                      theme === "dark"
                        ? "text-white-color"
                        : "text-gray-800 hover:text-blue-600"
                    }`}
                  >
                    Comparison
                  </Link>
                </li>
                <li className="nav_item group relative">
                  <Link
                    href="#mission-statement"
                    className={`text-size-15 font-medium capitalize py-5px md:py-8px lg:py-12px relative z-0 transition-colors duration-300 ${
                      theme === "dark"
                        ? "text-white-color"
                        : "text-gray-800 hover:text-blue-600"
                    }`}
                  >
                    About
                  </Link>
                </li>
                <li className="nav_item group relative">
                  <Link
                    href="#pricing"
                    className={`text-size-15 font-medium capitalize py-5px md:py-8px lg:py-12px relative z-0 transition-colors duration-300 ${
                      theme === "dark"
                        ? "text-white-color"
                        : "text-gray-800 hover:text-blue-600"
                    }`}
                  >
                    Pricing
                  </Link>
                </li>
                <li className="nav_item group relative">
                  <Link
                    href="#testimonial-section"
                    className={`text-size-15 font-medium capitalize py-5px md:py-8px lg:py-12px relative z-0 transition-colors duration-300 ${
                      theme === "dark"
                        ? "text-white-color"
                        : "text-gray-800 hover:text-blue-600"
                    }`}
                  >
                    Testimonials
                  </Link>
                </li>
                <li className="nav_item group relative">
                  <Link
                    href="/contact"
                    className={`text-size-15 font-medium capitalize py-5px md:py-8px lg:py-12px relative z-0 transition-colors duration-300 ${
                      theme === "dark"
                        ? "text-white-color"
                        : "text-gray-800 hover:text-blue-600"
                    }`}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            {/* Copyright with reduced margin */}
            <div
              className={`copyright whitespace-nowrap text-xs mt-3 transition-colors duration-300 ${
                theme === "dark"
                  ? footerType === 2 || footerType === 3
                    ? "text-primary-color"
                    : "text-gray-color"
                  : "text-gray-600"
              }`}
            >
              © {new Date().getFullYear()} All rights reserved by{" "}
              <Link
                href="/"
                className={`transition-colors duration-300 ${
                  theme === "dark"
                    ? footerType === 2 || footerType === 3
                      ? "text-primary-color"
                      : "text-white-color"
                    : "text-blue-600"
                } hover:text-primary-color`}
              >
                Software Ventures Pty Ltd
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
