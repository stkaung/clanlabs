import Link from "next/link";
import React, { Children } from "react";

const ButtonSeondary = ({ children, url }) => {
  return (
    <Link
      href={url ? url : "#"}
      className="text-size-15 font-medium text-primary-color hover:text-body-color capitalize py-17px px-35px rounded-full leading-1 border border-primary-color text-nowrap tracking-1px transition-all duration-300"
      style={{
        backgroundImage: 'linear-gradient(135deg, transparent 0%, var(--tw-gradient-stops, rgba(37,99,235,0.15)) 100%)',
        backgroundSize: '200% 100%',
        backgroundPosition: '0% 50%',
        transition: 'background-position 400ms ease, color 200ms ease',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget).style.backgroundPosition = '100% 50%';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget).style.backgroundPosition = '0% 50%';
      }}
    >
      {children}
    </Link>
  );
};

export default ButtonSeondary;
