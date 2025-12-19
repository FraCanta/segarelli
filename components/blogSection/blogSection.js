import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import ButtonSecondary from "../layout/ButtonSecondary";
import { MaskText } from "../layout/MaskText";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { Icon } from "@iconify/react";

const PostSection = dynamic(() => import("./postSection"), { ssr: false });

const BlogSection = ({ post }) => {
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const jsxPosts = post.map((p, i) => {
    const featuredMedia = p?._embedded?.["wp:featuredmedia"]?.[0] || {
      source_url: "/assets/hero.jpg",
      alt_text: "Immagine di default",
    };

    return (
      <SwiperSlide key={i}>
        <PostSection post={p} featuredMedia={featuredMedia} id={p?.id} />
      </SwiperSlide>
    );
  });

  const handleSlideChange = (swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <div className="pl-4 lg:px-6 w-full flex flex-col justify-center items-center my-10">
      <div className="flex flex-col w-full h-full gap-10 2xl:gap-20 lg:items-center">
        <div className="flex flex-col items-end justify-between w-full lg:flex-row">
          <div className="flex flex-col gap-3 items-center w-full justify-center relative">
            <div className="relative h-[100px] w-[100px]">
              <Image
                src="/assets/book.svg"
                fill
                className="object-cover h-full w-full"
              />
            </div>

            <MaskText>
              <h3 className="text-blu text-3xl xl:text-4xl 2xl:text-5xl text-center p-1">
                Il Blog dell'Agriturismo Segarelli
              </h3>
            </MaskText>
          </div>
        </div>

        <div className="relative w-full">
          <Swiper
            modules={[Navigation]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            onSlideChange={handleSlideChange}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            slidesPerView={3}
            className="mySwiper"
            breakpoints={{
              280: { slidesPerView: 1.25, spaceBetween: 20 },
              768: { slidesPerView: 1.25, spaceBetween: 40 },
              1024: { slidesPerView: 1, spaceBetween: 20 },
              1280: { slidesPerView: 3, spaceBetween: 20 },
            }}
          >
            {jsxPosts}
          </Swiper>

          {/* Pulsanti mobile custom */}
          <div className="s-swiper-nav lg:hidden  w-full flex gap-6 mt-6 ">
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

        <ButtonSecondary>Leggi tutti gli articoli</ButtonSecondary>
      </div>
    </div>
  );
};

export default BlogSection;
