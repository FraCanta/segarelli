import React, { useEffect, useRef } from "react";
import Footer from "./Footer";
import LenisScroll from "../LenisScroll/LenisScroll";
import Menu from "./Menu";
import ButtonBook from "../ButtonBook/ButtonBook";

const Layout = (props) => {
  return (
    <>
      <LenisScroll />
      <Menu />
      <main>{props.children}</main>
      <ButtonBook>Prenota</ButtonBook>
      <Footer />
    </>
  );
};

export default Layout;
