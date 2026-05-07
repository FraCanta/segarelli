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

function AttivitaSection({ pages = [], translation, locale = "it" }) {
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleSlideChange = (swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };
  const fallbackCards =
    locale === "en"
      ? [
          {
            id: "discover",
            title: "Discover the Surroundings",
            image: "/assets/meet.jpg",
            imageAlt: "Tuscan surroundings",
            link: "/scopri-i-dintorni",
          },
          {
            id: "nature",
            title: "Relax and Nature",
            image: "/assets/pool3.jpg",
            imageAlt: "Nature and relax",
            link: "/relax-e-natura-da-segarelli",
          },
          {
            id: "food",
            title: "Eat at the Agriturismo",
            image: "/assets/eat2.jpg",
            imageAlt: "Local food",
            link: "/mangiare-in-agriturismo",
          },
        ]
      : [
          {
            id: "discover",
            title: "Scopri i dintorni",
            image: "/assets/meet.jpg",
            imageAlt: "Dintorni toscani",
            link: "/scopri-i-dintorni",
          },
          {
            id: "nature",
            title: "Relax e natura",
            image: "/assets/pool3.jpg",
            imageAlt: "Relax nella natura",
            link: "/relax-e-natura-da-segarelli",
          },
          {
            id: "food",
            title: "Mangiare in agriturismo",
            image: "/assets/eat2.jpg",
            imageAlt: "Cucina locale",
            link: "/mangiare-in-agriturismo",
          },
        ];

  const cards =
    Array.isArray(pages) && pages.length > 0
      ? pages.map((p, index) => ({
          id: p.id || `${p.slug || "page"}-${index}`,
          title: p.title,
          image: p.image,
          imageAlt: p.imageAlt || p.alt || p.title,
          link: p.link || `/dintorni/${p.slug}`,
        }))
      : fallbackCards;

  return (
    <section className="flex flex-wrap 2xl:flex-nowrap  w-full justify-between gap-20 mb-20 lg:my-32 pl-4 lg:pl-6">
      <div className="2xl:max-w-4xl xl:w-full 2xl:w-1/2 flex flex-col gap-6 h-full">
        <div>
          <MaskText>
            <h2 className="text-blu text-3xl xl:text-4xl 2xl:text-5xl  leading-snug lg:p-1">
              {translation.title.title1}
            </h2>
          </MaskText>
          <MaskText>
            <h2 className="text-blu text-3xl xl:text-4xl 2xl:text-5xl  leading-snug lg:p-1">
              {translation.title.title2}
            </h2>
          </MaskText>
        </div>

        <ParagraphText>
          {translation.description}
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
        {cards.map((p) => (
          <SwiperSlide key={p.id}>
            <Link href={p.link}>
              {p.image ? (
                <div className="relative h-[20rem] 2xl:h-[30rem]  w-full mb-6">
                  <RevealImage
                    src={p.image}
                    alt={p.imageAlt}
                    fill
                    className="object-cover h-full"
                  />
                </div>
              ) : null}
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
