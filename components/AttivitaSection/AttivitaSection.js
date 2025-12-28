import Image from "next/image";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { ParagraphText } from "../layout/ParagraphText";
import { MaskText } from "../layout/MaskText";
import RevealImage from "../layout/RevealImage";

function AttivitaSection({ pages }) {
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleSlideChange = (swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };
  return (
    <section className="flex flex-wrap 2xl:flex-nowrap  w-full justify-between gap-20 mb-20 lg:my-32 pl-4 lg:pl-6">
      <div className="2xl:max-w-4xl xl:w-full 2xl:w-1/2 flex flex-col gap-6 h-full">
        <div>
          <MaskText>
            <h2 className="text-blu text-3xl xl:text-4xl 2xl:text-5xl  leading-snug lg:p-1">
              Cultura:
            </h2>
          </MaskText>
          <MaskText>
            <h2 className="text-blu text-3xl xl:text-4xl 2xl:text-5xl  leading-snug lg:p-1">
              Tra Colli, Valli e Mare
            </h2>
          </MaskText>
        </div>

        <ParagraphText>
          Gli ospiti dell’agriturismo possono visitare molti borghi medievali,
          alcuni dei quali sono visibili in lontananza: Micciano, Libbiano,
          Pomarance, Montecastelli e Radicondoli. Qui per tutta l’estate, quasi
          ogni domenica, si svolgono le feste paesane e alle rievocazioni
          storiche si accompagna sempre la degustazione dei prodotti tipici
          locali. Inoltre durante il periodo primavera-estate-autunno
          organizzano escursioni, trakking e altre attività
        </ParagraphText>
        <div className="s-swiper-nav w-full flex gap-6 mt-4 lg:mt-10">
          <div
            className={`s-swiper-nav-btn s-swiper-prev border border-blu  rounded-full flex items-center justify-center transition-opacity 
            ${isBeginning ? "opacity-30 pointer-events-none" : "opacity-100"}`}
            style={{
              width: "3rem",
              height: "3rem",
            }}
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <Icon icon="formkit:arrowleft" width="24px" height="24px" />
          </div>

          <div
            className={`s-swiper-nav-btn s-swiper-next rounded-full border border-blu flex items-center justify-center transition-opacity 
            ${isEnd ? "opacity-30 pointer-events-none" : "opacity-100"}`}
            style={{
              width: "3rem",
              height: "3rem",
            }}
            onClick={() => swiperRef.current?.slideNext()}
          >
            <Icon icon="formkit:arrowright" width="24px" height="24px" />
          </div>
        </div>
      </div>
      <Swiper
        modules={[Navigation]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSlideChange={handleSlideChange}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        slidesPerView={2.5}
        className="mySwiper"
        breakpoints={{
          280: { slidesPerView: 1.25, spaceBetween: 20 },
          768: { slidesPerView: 1.25, spaceBetween: 40 },
          1024: { slidesPerView: 1, spaceBetween: 20 },
          1280: { slidesPerView: 2.5, spaceBetween: 20 },
        }}
      >
        {pages.map((p) => (
          <SwiperSlide key={p.id}>
            <Link href={`/dintorni/${p.slug}`}>
              {p.image && (
                <div className="relative h-[20rem] 2xl:h-[30rem]  w-full mb-6">
                  <RevealImage
                    src={p.image}
                    alt={p.imageAlt}
                    fill
                    className="object-cover h-full"
                  />
                </div>
              )}
              <h3
                dangerouslySetInnerHTML={{ __html: p.title }}
                className="text-xl g:text-3xl"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default AttivitaSection;
