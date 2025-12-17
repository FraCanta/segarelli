import React, { useEffect, useRef } from "react";
import Footer from "./Footer";
import LenisScroll from "../LenisScroll/LenisScroll";
import Menu from "./Menu";
import LayoutTranslation from "../../public/locales/layout.json";
import Mobile from "./Mobile";

const Layout = (props) => {
  return (
    <>
      <LenisScroll />
      <Menu translation={LayoutTranslation?.menu} />
      <Mobile />
      <main>{props.children}</main>
      {/* <ButtonBook>Prenota</ButtonBook> */}
      <Footer />
    </>
  );
};

export default Layout;
