import { Icon } from "@iconify/react";
import SectionBreakWhite from "../SectionBreak/SectionBreakWhite";

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-12">
      <SectionBreakWhite />
      <div className="text-center mt-6  text-white/40 mb-20">
        <h3 className="text-2xl lg:text-3xl">
          Tradizione, comfort e natura nel cuore della Toscana
        </h3>
      </div>
      <div className="container mx-auto px-4 text-center">
        menu
        <div className="bg-white/20 w-full px-4 lg:px-6 h-[1px] mt-10"></div>
        <div className="flex flex-wrap items-center w-full px-0 lg:px-6 py-6 justify-between gap-2">
          <div className="flex flex-col lg:flex-row items-center gap-4">
            {" "}
            <div className="flex items-center gap-2 ">
              {/* 5 stelle piene */}
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

              {/* Valutazione numerica */}
              <span className="text-white font-semibold ml-2">5.0</span>
            </div>
            <div className="flex items-center gap-2">
              &bull; <span>Facebook</span> &bull; <span>Instagram</span>
            </div>
          </div>
          <p className=" text-sm">
            &copy; {new Date().getFullYear()} Agriturismo Segarelli.
          </p>
        </div>
      </div>
    </footer>
  );
}
