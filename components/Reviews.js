import React from "react";
import { MaskText } from "./layout/MaskText";

function Reviews() {
  return (
    <section className="bg-primary/30 text-center  w-full flex flex-col gap-10 items-center overflow-hidden my-10 justify-center py-8 lg:py-20 px-8 lg:px-10">
      <MaskText>
        <h2 className="text-blu text-[1.60rem] 2xs:text-[1.75rem] sm:text-3xl xl:text-4xl 2xl:text-5xl lg:my-10 leading-snug p-1">
          Esperienze all'Agriturismo Segarelli
        </h2>
      </MaskText>
      <div
        className="elfsight-app-89aabd6e-f658-4c8a-84c4-59bc7c67227e"
        data-elfsight-app-lazy
      ></div>
    </section>
  );
}

export default Reviews;
