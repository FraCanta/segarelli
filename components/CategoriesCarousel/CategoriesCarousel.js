import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import ButtonSecondary from "../layout/ButtonSecondary";
import ButtonPrimary from "../layout/ButtonPrimary";

const slides = [
  {
    title: "Sleep",
    tagline: "Dove il tempo rallenta",
    text: "Spazi ampi, silenziosi e accoglienti. Tre appartamenti, alcuni comunicanti, per sentirti davvero a casa: Acacia, Edera e Gelsomino.",
    bg: "/assets/sleep2.jpg",
    link: "/appartamenti",
    cta: "Scopri di più",
  },
  {
    title: "Eat",
    tagline: "Food is our love language",
    text: "Seasonally driven, carefully considered, generously presented, and served with pride and purpose.",
    bg: "/assets/eat2.jpg",
    link: "/mangiare-in-agriturismo",
  },
  {
    title: "Play",
    tagline: "Share in your surroundings",
    text: "Lose track of time amid the lush greenery and unexpected corners.",
    bg: "/assets/pool3.jpg",
    link: "/appartamenti",
  },
  {
    title: "Meet",
    tagline: "Versatile venues for every occasion",
    text: "Host your next event in a space where creativity flows, ideas thrive, and connections come standard.",
    bg: "/assets/meet.jpg",
    link: "/appartamenti",
  },
];

export default function CategoriesCarousel() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const swiperRef = useRef(null);

  return (
    <div className="relative h-screen">
      {/* Background images */}
      {slides.map((slide, index) => (
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
        {slides.map((slide, index) => (
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
                {slide.cta || "Scopri di più"}
              </ButtonPrimary>
            </div>
          </SwiperSlide>
        ))}

        <div className="bg-blu/30 absolute inset-0 w-full h-full"></div>
      </Swiper>

      {/* Custom pagination */}
      <div className="swiper-pagination-wrapper light  absolute bottom-20 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-6 z-20">
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
          <span className="swiper-numbers-total">{slides.length}</span>
        </div>
      </div>
    </div>
  );
}
