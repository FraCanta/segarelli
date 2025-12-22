import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function SliderAppartamento({ slides }) {
  const swiperRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(1);

  return (
    <div className="s-slider " data-amount={slides.length}>
      {/* Swiper */}
      <div className="s-swipers" dataAmount={3}>
        <div className="s-swipers-inner">
          <Swiper
            modules={[Autoplay, Pagination]}
            slidesPerView={3}
            spaceBetween={20}
            loop
            centeredSlides
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            speed={1200}
            navigation={{
              nextEl: ".s-swiper-nav-next",
              prevEl: ".s-swiper-nav-prev",
            }}
            pagination={{ clickable: true, el: ".swiper-pagination" }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => {
              setCurrentSlide(swiper.realIndex + 1);
            }}
            className="swiper"
            breakpoints={{
              360: {
                slidesPerView: 1.2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
            }}
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <figure className="media-wrapper cursor-grab">
                  <Image
                    src={slide.src}
                    alt={`Slide ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Pagination */}
      <div className="relative">
        <div className="swiper-pagination-wrapper2 light   flex flex-col items-center gap-6 z-20">
          <div className="swiper-pagination  flex gap-2">
            {slides.map((_, index) => (
              <span
                key={index}
                className={`swiper-pagination-bullet ${
                  currentSlide - 1 === index
                    ? "swiper-pagination-bullet-active"
                    : ""
                }`}
                onClick={() => swiperRef.current.slideToLoop(index)}
              >
                <span className="swiper-pagination-bullet-base !bg-blu"></span>
                <span
                  className="swiper-pagination-bullet-overlay !bg-blu"
                  style={{
                    opacity: 1,
                    visibility: "inherit",
                  }}
                ></span>
              </span>
            ))}
          </div>

          <div
            className="swiper-numbers flex items-center gap-2 text-blu text-lg md:text-xl font-medium"
            style={{
              marginTop: "60px",
            }}
          >
            <span className="swiper-numbers-current !text-blu">
              {currentSlide}
            </span>
            <span className="slash !text-blu">/</span>
            <span className="swiper-numbers-total !text-blu">
              {slides.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
