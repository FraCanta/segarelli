import CategoriesCarousel from "@/components/CategoriesCarousel/CategoriesCarousel";
import SectionBreak from "@/components/SectionBreak/SectionBreak";
import React from "react";

function DintorniPage({ page }) {
  return (
    <>
      <div className="h-[60svh] bg-primary/90 flex items-center px-6">
        <div>
          <div>titolo + social</div>
          <div>image</div>
        </div>
      </div>
      <div className="w-[70%] mx-auto my-20">contenuto</div>

      <div className="px-6 my-20 text-center">
        <div>related attività</div>
      </div>
      <SectionBreak />
      <CategoriesCarousel />
    </>
  );
}

export default DintorniPage;
