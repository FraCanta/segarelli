import LogoWhite from "@/public/assets/logo_segarelli_white.svg";
import LogoBlack from "@/public/assets/logo_segarelli.svg";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

function Mobile() {
  const { locale } = useRouter();
  const [scrolled, setScrolled] = useState(false);

  const timeoutRef = useRef(null);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div
      className={`lg:hidden flex justify-between border-b px-4 items-center uppercase p-4 top-0 left-0 w-full fixed z-50 transition-all duration-500 ${
        scrolled
          ? "bg-yellow border-b-blu/20 "
          : "bg-transparent border-b-white/20"
      }`}
    >
      {" "}
      <div className="flex-1">menu</div>
      {/* LOGO */}
      <Link
        href="/"
        className="lg:hidden flex-1 flex justify-center transition-all duration-500 z-50"
      >
        <Image
          src={scrolled ? LogoBlack : LogoWhite}
          alt="Logo"
          className={`transition-all duration-500 ${
            scrolled ? "w-[150px] lg:w-[200px]" : "w-[180px] lg:w-[240px]"
          }`}
        />
      </Link>
      <div className="flex-1"></div>
    </div>
  );
}

export default Mobile;
