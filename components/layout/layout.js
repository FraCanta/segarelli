import React from "react";
import Footer from "./Footer";
import LenisScroll from "../LenisScroll/LenisScroll";
import Menu from "./Menu";
import LayoutTranslation from "../../public/locales/layout.json";
import Mobile from "./Mobile";
import { useRouter } from "next/router";

const Layout = (props) => {
  const { pathname } = useRouter();

  const darkHeroPages = [
    "/",
    "/appartamenti",
    "/mangiare-in-agriturismo",
    "/relax-e-natura-da-segarelli",
    "/scopri-i-dintorni",
  ];

  const isDarkHero =
    darkHeroPages.includes(pathname) ||
    pathname.startsWith("/blog") ||
    pathname.startsWith("/dintorni/");

  return (
    <>
      <LenisScroll />
      <Menu translation={LayoutTranslation?.menu} isDarkHero={isDarkHero} />
      <Mobile isDarkHero={isDarkHero} />
      <main>{props.children}</main>
      <Footer />
    </>
  );
};

export default Layout;
