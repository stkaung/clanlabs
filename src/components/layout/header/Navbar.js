"use client";
import { useHeaderContext } from "@/context_api/HeaderContext";
import useTheme from "@/hooks/useTheme";
import getNavItems from "@/libs/getNavItems";
import indexingAndActiveLink from "@/libs/indexingAndActiveLink";
import Link from "next/link";
import { useEffect } from "react";

const Navbar = ({ isActiveMobileMenu, setIsActiveMobileMenu, isSticky }) => {
  const { isIndexPage } = useHeaderContext();
  const theme = useTheme();
  const navItems = getNavItems();

  useEffect(() => {
    indexingAndActiveLink();
  }, []);

  return (
    <nav>
      <ul className="nav flex items-center gap-x-8">
        {navItems?.length
          ? navItems?.map(({ name, path, path2 }, idx) => (
              <li key={idx} className="nav_item group relative hidden lg:block">
                <Link
                  href={isIndexPage ? path : path2}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    theme === "dark"
                      ? "text-white/80 hover:text-white"
                      : "text-gray-700/80 hover:text-gray-900"
                  }`}
                >
                  {name}
                </Link>
              </li>
            ))
          : ""}
      </ul>
    </nav>
  );
};

export default Navbar;
