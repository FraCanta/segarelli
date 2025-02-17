import React from "react";

function ButtonPrimary({ children, link }) {
  return (
    <button className="px-10 py-2 bg-siena rounded-full text-white font-semibold text-base uppercase">
      {children}
    </button>
  );
}

export default ButtonPrimary;
