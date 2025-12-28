import AttivitaSection from "@/components/AttivitaSection/AttivitaSection";
import BlogSection from "@/components/blogSection/blogSection";
import CategoriesCarousel from "@/components/CategoriesCarousel/CategoriesCarousel";
import Reviews from "@/components/Reviews";
import SectionBreak from "@/components/SectionBreak/SectionBreak";
import { getPagesByIds, getPosts, getTagId } from "@/utils/wordpress";
import React from "react";
import appartamentiIT from "../public/locales/it/appartamenti.json";
import appartamentiEN from "../public/locales/en/appartamenti.json";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { MaskText } from "@/components/layout/MaskText";
import { ParagraphText } from "@/components/layout/ParagraphText";
import Image from "next/image";
import ButtonSecondary from "@/components/layout/ButtonSecondary";
import ButtonPrimaryOutline from "@/components/layout/ButtonPrimaryOutline";
import RevealImage from "@/components/layout/RevealImage";

const features = [
  {
    title: ["Grande", "Giardino"],
    src: "/assets/garden.svg",
  },

  {
    title: ["Vicino", "alle attrazioni"],
    src: "/assets/attraction.svg",
  },

  {
    title: ["Design", "senza tempo"],
    src: "/assets/design.svg",
  },
  {
    title: ["Eco", "friendly"],
    src: "/assets/green.svg",
  },
  {
    title: ["Amato", "dai locals"],
    src: "/assets/locals.svg",
  },
];

function FeatureItem({ title, src, desktopOnly = false }) {
  return (
    <div
      className={`flex flex-col items-center ${
        desktopOnly ? "hidden lg:flex" : ""
      }`}
    >
      <figure className="w-24 h-24 relative mb-4">
        <Image
          src={src}
          alt={title.join(" ")}
          fill
          className="object-contain"
        />
      </figure>
      <div className="text-center">
        {title.map((line, i) => (
          <div key={i} className="block">
            <div className="inline-block text-sm">{line}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Appartamenti({ pages, post, translation }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, 80]);
  return (
    <>
      <div className="relative  h-screen overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center flex items-center justify-center"
          style={{
            y,
            backgroundImage: `url(${translation?.herobg})`,
          }}
        >
          <div className="z-40 flex flex-col items-center justify-center text-center px-4 gap-4">
            <MaskText>
              <h2 className="text-white text-6xl  md:text-5xl lg:text-[128px]   px-4 py-2 rounded">
                {translation?.title}
              </h2>
            </MaskText>
            <p className="text-white text-base lg:text-xl max-w-2xl">
              {translation?.description}
            </p>
          </div>
          <Link
            href="#appartamenti"
            className="absolute bottom-20 2xl:bottom-14 fxl:bottom-32 z-40"
          >
            <Icon
              icon="bi:chevron-double-down"
              width="32px"
              height="32px"
              style={{ color: "#fff" }}
            />
          </Link>

          <div className="absolute inset-0 w-full h-full bg-blu/30"></div>
        </motion.div>
      </div>
      <div className="my-20 text-center">
        <div className="flex flex-col items-center justify-center gap-4 px-4">
          <MaskText>
            <h1 className="text-blu text-base lg:text-[1.2rem] uppercase">
              {translation?.subtitle1}
            </h1>
          </MaskText>
          <MaskText>
            <h2 className="text-blu text-4xl lg:text-[46px] leading-[1.2]">
              {translation?.title1}
            </h2>
          </MaskText>

          <ParagraphText>{translation?.paragraph1}</ParagraphText>
          <div className="flex flex-wrap gap-8 lg:gap-0 w-full max-w-6xl mt-10 justify-center lg:justify-evenly">
            {features.map((feature, index) => (
              <FeatureItem key={index} {...feature} />
            ))}
          </div>
        </div>
      </div>
      <SectionBreak />
      <div id="appartamenti" className="text-center my-20">
        {translation?.apartments.map((apt, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center justify-center gap-10 px-4 mb-0 lg:mb-20">
              <div className="flex flex-col gap-4 lg:gap-1">
                <MaskText>
                  <h2 className="text-blu text-4xl lg:text-[46px] p-1.5">
                    {apt.name}
                  </h2>
                </MaskText>

                <ParagraphText>{apt.description}</ParagraphText>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <ButtonSecondary>Book Now</ButtonSecondary>
                <ButtonPrimaryOutline
                  link={`/appartamenti/${apt.name.toLowerCase()}`}
                  title="Scopri di più"
                  target="_self"
                >
                  Scopri di più
                </ButtonPrimaryOutline>
              </div>
            </div>

            <div className="mx-auto pt-10 lg:py-12 px-4 lg:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 justify-center items-end gap-4 lg:h-[70svh]">
                {/* Immagine sinistra - landscape */}
                <div className="hidden lg:block w-full h-full lg:h-96 relative">
                  <RevealImage
                    src={apt.leftImg.src}
                    alt={`${apt.name} - esterno`}
                    className="w-full h-96"
                  />
                </div>

                {/* Immagine centrale - portrait */}
                <div className="hidden lg:block w-full h-full relative">
                  <RevealImage
                    src={apt.centerImg.src}
                    alt={`${apt.name} - ingresso`}
                    fill
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Immagine destra - landscape */}
                <div className="w-full h-96 relative">
                  <RevealImage
                    src={apt.rightImg.src}
                    alt={`${apt.name} - cucina-soggiorno`}
                    fill
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>

            {/* Alterna SectionBreak tra appartamenti tranne l’ultimo */}
            {index < translation.apartments.length - 1 && <SectionBreak />}
          </React.Fragment>
        ))}
      </div>

      <Reviews />
      <AttivitaSection pages={pages} />

      <CategoriesCarousel />
      <div className="bg-primary/10 w-full flex items-center py-8">
        {" "}
        <BlogSection post={post} />
      </div>
    </>
  );
}

export default Appartamenti;

export async function getStaticProps({ locale }) {
  const idLocale = await getTagId(locale); // recupera id della lingua attuale
  const post = await getPosts(idLocale); //recupera post nella lingua attuale
  const HOME_PAGE_IDS = [2248, 2026, 1997, 1957];
  const pages = await getPagesByIds(HOME_PAGE_IDS);

  let obj;
  switch (locale) {
    case "it":
      obj = appartamentiIT;
      break;
    case "en":
      obj = appartamentiEN;
      break;
    default:
      obj = appartamentiIT;
      break;
  }

  return {
    props: {
      translation: obj?.appartamenti,

      post: post.sort((a, b) => a?.date > b?.date).filter((el, i) => i < 3), //elimino i post per sideeffect
      // instagramPosts: posts,
      pages,
    },
    revalidate: 60,
  };
}
