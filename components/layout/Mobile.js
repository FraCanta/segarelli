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
      className={`lg:hidden flex justify-between border-b px-4 items-center w-full uppercase p-4 top-0 left-0  fixed z-50 transition-all duration-500 ${
        scrolled
          ? "bg-yellow border-b-blu/20 "
          : "bg-transparent border-b-white/20"
      }`}
    >
      {" "}
      {/* LOGO */}
      <Link
        href="/"
        className="lg:hidden flex justify-center transition-all duration-500 z-50"
      >
        <Image
          src={scrolled ? LogoBlack : LogoWhite}
          alt="Logo"
          className={`transition-all duration-500 ${
            scrolled ? "w-[160px] " : "w-[180px] "
          }`}
        />
      </Link>
      <div className="">menu</div>
    </div>
  );
}

export default Mobile;
