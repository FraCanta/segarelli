import React, { useState, useEffect, useRef } from "react";
import LogoWhite from "@/public/assets/logo_segarelli_white.svg";
import LogoBlack from "@/public/assets/logo_segarelli.svg";
import Image from "next/image";
import ButtonSecondary from "./ButtonSecondary";
import { useRouter } from "next/router";
import Link from "next/link";
import { Icon } from "@iconify/react";
import gsap from "gsap";

function Menu({ translation }) {
  const { locale } = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);

  const timeoutRef = useRef(null);
  const megaMenuRef = useRef(null);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Megamenu animations
  useEffect(() => {
    const menu = megaMenuRef.current;
    if (!menu) return;

    if (showMegaMenu) {
      clearTimeout(timeoutRef.current);
      gsap.killTweensOf(menu);
      gsap.set(menu, { display: "block" });

      // animazione del container
      gsap.fromTo(
        menu,
        { height: 0, opacity: 0 },
        { height: 550, opacity: 1, duration: 0.5, ease: "power2.out" }
      );

      // animazione immagini
      gsap.fromTo(
        menu.querySelectorAll(".image-wrapper"),
        { height: 0, opacity: 0 },
        {
          height: "100%",
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
        }
      );

      // animazione testi menu
      gsap.fromTo(
        menu.querySelectorAll(".menu-item"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
      );
    } else {
      gsap.killTweensOf(menu);
      gsap.to(menu, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => gsap.set(menu, { display: "none" }),
      });
    }
  }, [showMegaMenu]);

  const handleLinkClick = () => {
    setShowMegaMenu(false);
  };

  const handleEnter = () => {
    clearTimeout(timeoutRef.current);
    setShowMegaMenu(true);
  };
  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setShowMegaMenu(false), 100);
  };

  return (
    <div
      className={`hidden lg:flex justify-between border-b px-10 items-center uppercase p-4 top-0 left-0 w-full fixed z-50 transition-all duration-500 ${
        scrolled
          ? "bg-yellow border-b-blu/20 "
          : "bg-transparent border-b-white/20"
      }`}
    >
      {/* MENU */}
      <nav
        className={`hidden lg:flex flex-1 font-bold relative z-50 ${
          scrolled ? "text-blu" : "text-white"
        }`}
      >
        <ul className="flex gap-4 2xl:gap-10 items-center">
          {/* Appartamenti */}
          <li
            className="relative group"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            <Link href="/appartamenti" className="flex items-center gap-2">
              <span className="split-hover flex flex-col justify-center">
                <span className="line line-normal block">Appartamenti</span>
                <span className="line line-hover block absolute top-0 left-0 w-full">
                  Appartamenti
                </span>
              </span>
              <Icon
                icon="mdi:chevron-down"
                className="text-lg transition-transform duration-300 group-hover:rotate-180 flex-shrink-0"
              />
            </Link>
          </li>

          {/* Altri menu */}
          <li className="flex">
            <Link href="/chi-siamo" className="split-hover block relative">
              <span className="line line-normal block pl-[0.1rem]">
                Chi siamo
              </span>
              <span className="line line-hover block pl-[0.1rem]">
                Chi siamo
              </span>
            </Link>
          </li>
          <li className="flex">
            <Link href="/contatti" className="split-hover block relative">
              <span className="line line-normal block">Contatti</span>
              <span className="line line-hover block">Contatti</span>
            </Link>
          </li>
          <li className="flex">
            <Link href="/blog" className="split-hover block relative">
              <span className="line line-normal block">Blog</span>
              <span className="line line-hover block">Blog</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* LOGO */}
      <Link
        href="/"
        className="hidden flex-1 lg:flex justify-center transition-all duration-500 z-50"
      >
        <Image
          src={scrolled ? LogoBlack : LogoWhite}
          alt="Logo"
          className={`transition-all duration-500 ${
            scrolled
              ? "w-[150px] xl:w-[180px] 2xl:w-[200px]"
              : "w-[180px] xl:w-[200px] 2xl:w-[240px]"
          }`}
        />
      </Link>

      {/* CTA */}
      <div className="hidden lg:flex items-center gap-2 flex-1 justify-end z-50">
        <ButtonSecondary>{translation?.[locale]?.book}</ButtonSecondary>
      </div>

      {/* Megamenu */}
      <div
        ref={megaMenuRef}
        className={`absolute top-0 left-0 right-0 w-full  z-40 overflow-hidden transition-colors duration-300 ${
          scrolled ? "bg-yellow" : "bg-blu"
        }`}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <div className="flex justify-center items-start h-full w-full my-32  fxl:my-20">
          <div className="grid grid-cols-3 gap-6 px-6 pt-4 w-full">
            {/* Colonna 1 */}
            <div className="flex flex-col gap-2 ">
              <Link
                href="/appartamenti/acacia"
                className="overflow-hidden image-wrapper relative"
                onClick={handleLinkClick}
              >
                <Image
                  src="/assets/appartamenti/acacia/acacia.jpg"
                  width={400}
                  height={300}
                  className="w-full h-auto object-cover "
                  alt="Acacia"
                />
              </Link>
              <Link
                href="/appartamenti/acacia"
                className={`menu-item hover:underline ${
                  scrolled ? "text-blu" : "text-white"
                }`}
                onClick={handleLinkClick}
              >
                Acacia
              </Link>
            </div>

            {/* Colonna 2 */}
            <div className="flex flex-col gap-2">
              <Link
                href="/appartamenti/edera"
                className="overflow-hidden image-wrapper relative"
                onClick={handleLinkClick}
              >
                <Image
                  src="/assets/appartamenti/edera/edera.jpg"
                  width={400}
                  height={300}
                  className="w-full h-auto object-cover "
                  alt="Edera"
                />
              </Link>
              <Link
                href="/appartamenti/edera"
                className={`menu-item hover:underline ${
                  scrolled ? "text-blu" : "text-white"
                }`}
                onClick={handleLinkClick}
              >
                Edera
              </Link>
            </div>

            {/* Colonna 3 */}
            <div className="flex flex-col gap-2">
              <Link
                href="/appartamenti/gelsomino"
                className="overflow-hidden image-wrapper relative"
                onClick={handleLinkClick}
              >
                <Image
                  src="/assets/appartamenti/gelsomino/gelsomino.jpg"
                  width={400}
                  height={300}
                  className="w-full h-auto object-cover "
                  alt="Gelsomino"
                />
              </Link>
              <Link
                href="/appartamenti/gelsomino"
                className={`menu-item hover:underline ${
                  scrolled ? "text-blu" : "text-white"
                }`}
                onClick={handleLinkClick}
              >
                Gelsomino
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-primary/30 transition-opacity duration-500 ${
          showMegaMenu ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onMouseEnter={handleLeave}
      />
    </div>
  );
}

export default Menu;
