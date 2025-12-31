import React from "react";
import dintorniIT from "../public/locales/it/dintorni.json";
import dintorniEN from "../public/locales/en/dintorni.json";
import { motion, useScroll, useTransform } from "framer-motion";
import { MaskText } from "@/components/layout/MaskText";
import { ParagraphText } from "@/components/layout/ParagraphText";
import Image from "next/image";
import Link from "next/link";
import { getPagesByIds, getPosts, getTagId } from "@/utils/wordpress";
import { Icon } from "@iconify/react";
import SectionBreak from "@/components/SectionBreak/SectionBreak";
import SliderAppartamento from "@/components/SliderAppartamento/SliderAppartamento";
import AttivitaSection from "@/components/AttivitaSection/AttivitaSection";
import CategoriesCarousel from "@/components/CategoriesCarousel/CategoriesCarousel";
import BlogSection from "@/components/blogSection/blogSection";

function Dintorni({ pages, post, translation }) {
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
      <div className="py-10">
        <AttivitaSection pages={pages} post={post} />
      </div>

      <div className="py-20 flex flex-col gap-20 bg-primary/10">
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
              <div key={i} className="text-center max-w-3xl  mx-auto">
                <ParagraphText>{p}</ParagraphText>
              </div>
            );
          })}
        </div>

        <SliderAppartamento slides={translation?.gallery} />
      </div>

      <SectionBreak />
      <CategoriesCarousel />
      <div className="py-20">
        <BlogSection post={post} />
      </div>
    </>
  );
}

export default Dintorni;

export async function getStaticProps({ locale }) {
  const idLocale = await getTagId(locale); // recupera id della lingua attuale
  const post = await getPosts(idLocale); //recupera post nella lingua attuale
  const HOME_PAGE_IDS = [2248, 2026, 1997, 1957];
  const pages = await getPagesByIds(HOME_PAGE_IDS);

  let obj;
  switch (locale) {
    case "it":
      obj = dintorniIT;
      break;
    case "en":
      obj = dintorniEN;
      break;
    default:
      obj = dintorniIT;
      break;
  }

  return {
    props: {
      translation: obj?.dintorni,

      post: post.sort((a, b) => a?.date > b?.date).filter((el, i) => i < 3), //elimino i post per sideeffect
      // instagramPosts: posts,
      pages,
    },
    revalidate: 60,
  };
}
