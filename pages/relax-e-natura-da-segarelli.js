import React from "react";
import playIT from "../public/locales/it/play.json";
import playEN from "../public/locales/en/play.json";
import { motion, useScroll, useTransform } from "framer-motion";
import { MaskText } from "@/components/layout/MaskText";
import { ParagraphText } from "@/components/layout/ParagraphText";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import SectionBreak from "@/components/SectionBreak/SectionBreak";
import SliderAppartamento from "@/components/SliderAppartamento/SliderAppartamento";
import ButtonSecondary from "@/components/layout/ButtonSecondary";
import AttivitaSection from "@/components/AttivitaSection/AttivitaSection";
import CategoriesCarousel from "@/components/CategoriesCarousel/CategoriesCarousel";
import BlogSection from "@/components/blogSection/blogSection";
import FeatureItem from "@/components/FeatureItem/FeatureItem";
import Head from "next/head";
import blogPostsIT from "../public/locales/it/blogPosts.json";
import blogPostsEN from "../public/locales/en/blogPosts.json";

function Piscina({ pages, post, translation }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, 80]);

  return (
    <>
      <Head>
        <title>{translation.head.title}</title>
        <meta name="description" content={translation.head.description} />
        <meta name="keywords" content={translation.head.keywords} />
        <meta name="robots" content={translation.head.robots} />
        <link rel="canonical" href={translation.head.canonical} />

        {/* Open Graph */}
        <meta property="og:title" content={translation.head.og.title} />
        <meta
          property="og:description"
          content={translation.head.og.description}
        />
        <meta property="og:type" content={translation.head.og.type} />
        <meta property="og:url" content={translation.head.og.url} />
        <meta property="og:image" content={translation.head.og.image} />
        <meta property="og:site_name" content={translation.head.og.site_name} />

        {/* Twitter Card */}
        <meta name="twitter:card" content={translation.head.twitter.card} />
        <meta name="twitter:title" content={translation.head.twitter.title} />
        <meta
          name="twitter:description"
          content={translation.head.twitter.description}
        />
        <meta name="twitter:image" content={translation.head.twitter.image} />

        {/* Favicon */}
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />

        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@graph": [
                translation.head.schema.organization,
                translation.head.schema.website,
              ],
            }),
          }}
        />
      </Head>
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
      <div className="my-20 max-w-7xl mx-auto  text-center  gap-10">
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
          <div className="max-w-3xl mx-auto">
            {" "}
            <ParagraphText>{translation?.paragraph1}</ParagraphText>
          </div>
        </div>
        <div className="flex flex-wrap gap-8 lg:gap-0 w-full  mt-10 justify-center lg:justify-evenly">
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
              <div key={i} className="text-center  mx-auto">
                <ParagraphText>{p}</ParagraphText>
              </div>
            );
          })}
        </div>

        <SliderAppartamento slides={translation?.gallery} />
      </div>

      <div className="my-20 flex flex-col gap-20 py-20   ">
        <div className="flex flex-col gap-2 text-center px-4">
          <MaskText>
            <h3 className="text-blu text-base 2xl:text-[1.2rem] uppercase">
              {translation.SezioneGallery2.subTitle}
            </h3>
          </MaskText>
          <MaskText>
            <h2 className="text-blu text-3xl lg:text-4xl 2xl:text-5xl text-center  lg:leading-[1] py-2 overflow-hidden  lg:max-w-3xl mx-auto">
              {translation.SezioneGallery2.title}
            </h2>
          </MaskText>
          {translation.SezioneGallery2.description.map((p, i) => {
            return (
              <div key={i} className="text-center  mx-auto">
                <ParagraphText>{p}</ParagraphText>
              </div>
            );
          })}
        </div>

        <SliderAppartamento slides={translation?.gallery2} />
      </div>
      <SectionBreak />
      <AttivitaSection
        pages={pages}
        post={post}
        translation={translation.activities}
      />
      <CategoriesCarousel translation={translation} />
      <BlogSection post={post} translation={translation.blog} />
    </>
  );
}

export default Piscina;

export async function getStaticProps({ locale }) {
  let obj;
  switch (locale) {
    case "it":
      obj = playIT;
      break;
    case "en":
      obj = playEN;
      break;
    default:
      obj = playIT;
      break;
  }

  return {
    props: {
      translation: obj?.play,
      post: ((locale === "en" ? blogPostsEN.posts : blogPostsIT.posts) || [])
        .sort((a, b) => new Date(b?.date || 0) - new Date(a?.date || 0))
        .slice(0, 3),
      pages: [],
    },
    revalidate: 60,
  };
}
