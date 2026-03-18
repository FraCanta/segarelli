import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import ButtonPrimary from "../layout/ButtonPrimary";

export default function CategoriesCarousel({ translation }) {
  const [currentSlide, setCurrentSlide] = useState(1);
  const swiperRef = useRef(null);

  return (
    <div className="relative h-screen">
      {/* Background images */}
      {translation.slides.map((slide, index) => (
        <div
          key={index}
          style={{ backgroundImage: `url(${slide.bg})` }}
          className={`absolute top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${
            index === 0 ? "opacity-100" : "opacity-0"
          }`}
          data-bg-index={index}
        />
      ))}

      <Swiper
        modules={[Navigation, EffectFade, Autoplay]}
        loop
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        speed={1200}
        slidesPerView="auto"
        centeredSlides
        spaceBetween={40}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => {
          setCurrentSlide(swiper.realIndex + 1);
          document.querySelectorAll("[data-bg-index]").forEach((bg, i) => {
            bg.classList.toggle("opacity-100", i === swiper.realIndex);
            bg.classList.toggle("opacity-0", i !== swiper.realIndex);
          });
        }}
        className="relative z-10 h-full"
      >
        {translation.slides.map((slide, index) => (
          <SwiperSlide
            key={index}
            className="!w-full lg:!w-[45%] h-full flex items-center justify-center px-4 lg:px-0"
          >
            <div
              className="
        slide-content
       
        mx-auto
        text-center
        flex flex-col items-center gap-4 h-full justify-center
        transition-opacity duration-700 px-4
      "
            >
              <h2 className="text-5xl md:text-7xl font-light tracking-wide text-white">
                {slide.title}
              </h2>

              <p className="text-lg md:text-2xl text-white">{slide.tagline}</p>

              <p className="text-sm md:text-base text-white max-w-xl">
                {slide.text}
              </p>

              <ButtonPrimary link={slide.link} title={slide.title}>
                {slide.cta}
              </ButtonPrimary>
            </div>
          </SwiperSlide>
        ))}

        <div className="bg-blu/30 absolute inset-0 w-full h-full"></div>
      </Swiper>

      {/* Custom pagination */}
      <div className="swiper-pagination-wrapper light  absolute bottom-20 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-6 z-20">
        <div className="swiper-pagination  flex gap-2">
          {translation.slides.map((_, index) => (
            <span
              key={index}
              className={`swiper-pagination-bullet ${
                currentSlide - 1 === index
                  ? "swiper-pagination-bullet-active"
                  : ""
              }`}
              onClick={() => swiperRef.current.slideToLoop(index)}
            >
              <span className="swiper-pagination-bullet-base"></span>
              <span
                className="swiper-pagination-bullet-overlay"
                style={{
                  opacity: 1,
                  visibility: "inherit",
                }}
              ></span>
            </span>
          ))}
        </div>

        <div
          className="swiper-numbers flex items-center gap-2 text-white text-lg md:text-xl font-medium"
          style={{
            marginTop: "60px",
          }}
        >
          <span className="swiper-numbers-current">{currentSlide}</span>
          <span className="slash">/</span>
          <span className="swiper-numbers-total">
            {translation.slides.length}
          </span>
        </div>
      </div>
    </div>
  );
}
