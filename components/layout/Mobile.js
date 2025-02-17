import Logo from "@/public/assets/logo_segarelli.svg";
import Image from "next/image";
import React from "react";

function Mobile() {
  return (
    <div className="lg:hidden flex justify-between items-center mx-6">
      <div>
        <Image src={Logo} alt="Logo" className="w-[180px] h-20" />
      </div>
      <div>it</div>
    </div>
  );
}

export default Mobile;
