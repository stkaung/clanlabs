"use client";
import { useHeaderContext } from "@/context_api/HeaderContext";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="logo flex items-center">
      <Image
        src="/img/logo/mainlogo.png"
        alt="Clan Labs"
        width={180}
        height={50}
        className="h-10 w-auto"
        priority
      />
    </Link>
  );
};

export default Logo;
