import LogoWhite from "@/public/assets/logo_segarelli_white.svg";
import LogoBlack from "@/public/assets/logo_segarelli.svg";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import ButtonSecondary from "./ButtonSecondary";

function Mobile({ isDarkHero = true }) {
  const { locale, pathname } = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [appartamentiOpen, setAppartamentiOpen] = useState(false);

  const appartamentiLinks = [
    { name: "Acacia", href: "/appartamenti/acacia" },
    { name: "Edera", href: "/appartamenti/edera" },
    { name: "Gelsomino", href: "/appartamenti/gelsomino" },
  ];

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // inizializza correttamente al mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Gestione classi dinamiche
  const logoSrc = isDarkHero
    ? scrolled || showMenu
      ? LogoBlack
      : LogoWhite
    : LogoBlack;
  const navbarBgClass = isDarkHero
    ? scrolled || showMenu
      ? "bg-yellow"
      : "bg-transparent"
    : "bg-yellow";
  const navbarBorderClass = isDarkHero
    ? scrolled || showMenu
      ? "border-b-blu/20"
      : "border-b-white/20"
    : "border-b-blu/20";
  const textColorClass = isDarkHero
    ? scrolled || showMenu
      ? "text-blu"
      : "text-white"
    : "text-blu";

  return (
    <div className="lg:hidden fixed top-0 left-0 w-full z-50">
      {/* Navbar */}
      <div
        className={`flex justify-between border-b px-4 items-center w-full uppercase p-4 transition-all duration-500 ${navbarBgClass} ${navbarBorderClass}`}
      >
        {/* LOGO */}
        <Link
          href="/"
          className="flex justify-center transition-all duration-500 z-50"
        >
          <Image
            src={logoSrc}
            alt="Logo"
            className={`transition-all duration-500 ${
              scrolled || showMenu ? "w-[160px]" : "w-[180px]"
            }`}
          />
        </Link>

        {/* Hamburger */}
        <button onClick={() => setShowMenu(!showMenu)} className="nav__burger">
          <div
            className={`nav__burger__line transition-all duration-500 ${
              showMenu
                ? "rotate-45 translate-y-1 width-20 opacity-100"
                : "width-20 opacity-100"
            }`}
          >
            <div className="nav__burger__line__fill" />
          </div>
          <div
            className={`nav__burger__line transition-all duration-500 ${
              showMenu
                ? "-rotate-45 -translate-y-1 width-20 opacity-100"
                : "width-20 opacity-100"
            }`}
          >
            <div className="nav__burger__line__fill" />
          </div>
        </button>
      </div>

      {/* Menu Fullscreen */}
      <div
        className={`fixed top-0 left-0 w-full h-screen ${navbarBgClass} ${textColorClass} flex flex-col items-start justify-between transform transition-transform duration-500 ${
          showMenu ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <ul
          className={`flex flex-col gap-6 text-2xl uppercase px-6 mt-32 w-full ${textColorClass}`}
        >
          {/* Appartamenti dropdown */}
          <li className="w-full">
            <div className="flex items-center justify-between w-full">
              <Link
                href="/appartamenti"
                onClick={() => setShowMenu(false)}
                className="flex-1"
              >
                <span>Appartamenti</span>
              </Link>

              <button
                onClick={() => setAppartamentiOpen((prev) => !prev)}
                aria-label="Apri appartamenti"
                className="p-2"
              >
                <svg
                  className={`w-5 h-5 transition-transform duration-300 ${
                    appartamentiOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>

            <AnimatePresence>
              {appartamentiOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="flex flex-col gap-4 my-6 overflow-hidden text-base "
                >
                  {appartamentiLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => {
                        setShowMenu(false);
                        setAppartamentiOpen(false);
                      }}
                      className={`${
                        pathname === link.href
                          ? "font-semibold transition-all ease-linear"
                          : ""
                      }`}
                    >
                      <span>{link.name}</span>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          {/* Altri link */}
          <li>
            <Link href="/chi-siamo" onClick={() => setShowMenu(false)}>
              <span>Chi siamo</span>
            </Link>
          </li>
          <li>
            <Link href="/contatti" onClick={() => setShowMenu(false)}>
              <span>Contatti</span>
            </Link>
          </li>
          <li>
            <Link href="/blog" onClick={() => setShowMenu(false)}>
              <span>Blog</span>
            </Link>
          </li>
        </ul>

        {/* Footer */}
        <div className="px-6 mb-6 w-full">
          <div className="bg-white/20 w-full px-4 h-[1px] mt-10"></div>
          <div className="flex flex-wrap items-center w-full px-0 py-6 justify-between gap-2">
            <div className="flex flex-col lg:flex-row items-center gap-4">
              <div className="flex items-center gap-2">
                <Icon
                  className="text-siena"
                  icon="mdi:star"
                  width="20"
                  height="20"
                />
                <Icon
                  className="text-siena"
                  icon="mdi:star"
                  width="20"
                  height="20"
                />
                <Icon
                  className="text-siena"
                  icon="mdi:star"
                  width="20"
                  height="20"
                />
                <Icon
                  className="text-siena"
                  icon="mdi:star"
                  width="20"
                  height="20"
                />
                <Icon
                  className="text-siena"
                  icon="mdi:star"
                  width="20"
                  height="20"
                />
                <span className="text-blu font-semibold ml-2">5.0</span>
              </div>
              <div className="flex items-center gap-2">
                &bull; <span>Facebook</span> &bull; <span>Instagram</span>
              </div>
            </div>
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Agriturismo Segarelli.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mobile;
