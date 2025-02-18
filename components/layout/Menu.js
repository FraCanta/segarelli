import React from "react";
import Logo from "@/public/assets/logo_segarelli.svg";
import Image from "next/image";
import Mobile from "./Mobile";
import ButtonSecondary from "./ButtonSecondary";
function Menu() {
  return (
    <>
      <div className="hidden lg:flex justify-between items-center mx-10 py-6">
        <div>it</div>
        <div>
          <Image src={Logo} alt="Logo" className="w-[240px] h-full" />
        </div>
        <div>
          <ButtonSecondary>Prenota</ButtonSecondary>
        </div>
      </div>
      <Mobile />
    </>
  );
}

export default Menu;
