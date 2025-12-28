import React, { useEffect, useRef } from "react";
import Footer from "./Footer";
import LenisScroll from "../LenisScroll/LenisScroll";
import Menu from "./Menu";
import LayoutTranslation from "../../public/locales/layout.json";
import Mobile from "./Mobile";
import { useRouter } from "next/router";
const Layout = (props) => {
  const { pathname } = useRouter();

  // Qui metti tutte le pagine con hero scura
  const darkHeroPages = ["/", "/appartamenti", "/blog"];
  const isDarkHero = darkHeroPages.includes(pathname);
  return (
    <>
      <LenisScroll />
      <Menu
        translation={LayoutTranslation?.menu}
        isDarkHero={isDarkHero}
      />{" "}
      <Mobile isDarkHero={isDarkHero} />
      <main>{props.children}</main>
      {/* <ButtonBook>Prenota</ButtonBook> */}
      <Footer />
    </>
  );
};

export default Layout;
