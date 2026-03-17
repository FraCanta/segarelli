import React from "react";
import mangiareIT from "../public/locales/it/mangiare.json";
import mangiareEN from "../public/locales/en/mangiare.json";
import { motion, useScroll, useTransform } from "framer-motion";
import { MaskText } from "@/components/layout/MaskText";
import { ParagraphText } from "@/components/layout/ParagraphText";
import Image from "next/image";
import Link from "next/link";
import { getPagesByIds, getPosts, getTagId } from "@/utils/wordpress";
import { Icon } from "@iconify/react";
import SectionBreak from "@/components/SectionBreak/SectionBreak";
import SliderAppartamento from "@/components/SliderAppartamento/SliderAppartamento";
import ButtonSecondary from "@/components/layout/ButtonSecondary";
import AttivitaSection from "@/components/AttivitaSection/AttivitaSection";
import CategoriesCarousel from "@/components/CategoriesCarousel/CategoriesCarousel";
import BlogSection from "@/components/blogSection/blogSection";

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
function Mangiare({ pages, post, translation }) {
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
              <h2 className="text-white text-6xl  md:text-5xl lg:text-[92px] 2xl:text-[128px]   px-4 py-2 rounded">
                {translation?.title}
              </h2>
            </MaskText>
            <p className="text-white text-base lg:text-xl max-w-2xl">
              {translation?.description}
            </p>
          </div>
          <div className="absolute bottom-20 2xl:bottom-14 fxl:bottom-32 z-40">
            <Icon
              icon="bi:chevron-double-down"
              width="32px"
              height="32px"
              style={{ color: "#fff" }}
            />
          </div>

          <div className="absolute inset-0 w-full h-full bg-blu/30"></div>
        </motion.div>
      </div>
      <div className="flex flex-col items-center">
        <div className="my-20 max-w-7xl mx-auto  grid grid-cols-1 lg:grid-cols-2  gap-10">
          <div className="relative  aspect-square ">
            <Image
              src="/assets/coffee.jpg"
              alt="Agriturismo Segarelli"
              className="mx-auto  object-cover  object-bottom px-4 lg:px-0"
              fill
            />
          </div>
          <div className="flex flex-col  justify-center gap-4 px-4">
            <MaskText>
              <h1 className="text-blu text-base 2xl:text-[1.2rem] uppercase">
                {translation?.subtitle1}
              </h1>
            </MaskText>
            <MaskText>
              <h2 className="text-blu text-4xl 2xl:text-[46px] leading-[1.2]">
                {translation?.title1}
              </h2>
            </MaskText>

            <ParagraphText>{translation?.paragraph1}</ParagraphText>
          </div>
        </div>
        <div className="flex flex-wrap gap-8 lg:gap-0 w-full max-w-6xl mt-10 justify-center lg:justify-evenly">
          {translation?.features.map((feature, index) => (
            <FeatureItem key={index} {...feature} />
          ))}
        </div>
      </div>
      <div className="my-20 flex flex-col gap-20 py-20  bg-primary/10 ">
        <div className="flex flex-col gap-2 text-center px-4">
          <MaskText>
            <h3 className="text-blu text-base 2xl:text-[1.2rem] uppercase">
              {translation.SezioneGallery.subTitle}
            </h3>
          </MaskText>
          <MaskText>
            <h2 className="text-blu text-3xl lg:text-4xl 2xl:text-5xl text-center  lg:leading-[1] py-2 overflow-hidden  lg:max-w-3xl mx-auto">
              {translation.SezioneGallery.title}
            </h2>
          </MaskText>
          {translation.SezioneGallery.description.map((p, i) => {
            return (
              <div key={i} className="text-center max-w-5xl mx-auto">
                <ParagraphText>{p}</ParagraphText>
              </div>
            );
          })}

          <div className="w-full flex justify-center mt-10 px-4">
            <ButtonSecondary>{translation?.book}</ButtonSecondary>
          </div>
        </div>

        <SliderAppartamento slides={translation?.gallery} />
      </div>
      <SectionBreak />
      <AttivitaSection
        pages={pages}
        post={post}
        translation={translation?.activities}
      />
      <CategoriesCarousel translation={translation} />
      <BlogSection post={post} translation={translation.blog} />
    </>
  );
}

export default Mangiare;

export async function getStaticProps({ locale }) {
  const idLocale = await getTagId(locale); // recupera id della lingua attuale
  const post = await getPosts(idLocale); //recupera post nella lingua attuale
  const HOME_PAGE_IDS = [2248, 2026, 1997, 1957];
  const pages = await getPagesByIds(HOME_PAGE_IDS);

  let obj;
  switch (locale) {
    case "it":
      obj = mangiareIT;
      break;
    case "en":
      obj = mangiareEN;
      break;
    default:
      obj = mangiareIT;
      break;
  }

  return {
    props: {
      translation: obj?.mangiare,

      post: post.sort((a, b) => a?.date > b?.date).filter((el, i) => i < 3), //elimino i post per sideeffect
      pages,
    },
    revalidate: 60,
  };
}
