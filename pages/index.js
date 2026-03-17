import CategoriesCarousel from "@/components/CategoriesCarousel/CategoriesCarousel";
import SectionBreak from "@/components/SectionBreak/SectionBreak";
import { motion, useScroll, useTransform } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import { getPagesByIds, getPosts, getTagId } from "../utils/wordpress";
import BlogSection from "@/components/blogSection/blogSection";
import { StaggerImages } from "@/components/StaggerImages";
import React from "react";
import { MaskText } from "@/components/layout/MaskText";
import AttivitaSection from "@/components/AttivitaSection/AttivitaSection";
import { ParagraphText } from "@/components/layout/ParagraphText";
import Reviews from "@/components/Reviews";
import homeIT from "../public/locales/it/home.json";
import homeEN from "../public/locales/en/home.json";
import { useRouter } from "next/router";

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

export default function Home({ post, pages, translation }) {
  const { locale } = useRouter();
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.5], {
    clamp: true,
  });
  const y = useTransform(scrollYProgress, [0, 0.4], [0, 200], { clamp: true });
  const spacerHeight = useTransform(
    scrollYProgress,
    [0, 0.4],
    ["0px", "250px"],
  );
  const titleOpacity = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0.35, 0.45], [40, 0]);

  return (
    <>
      <Head>
        <title>Vacanze in Toscana - Agriturismo Segarelli</title>
        <meta
          name="description"
          content="Vacanze in Toscana - Agriturismo Segarelli. Conduzione familiare, vicino Volterra. Piscina, tre appartamenti indipendenti, colazione, free wi-fi."
        />
        <link rel="canonical" href="https://segarelli.vercel.app/" />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      {/* HERO SCROLL */}
      <section className="h-[140vh] lg:h-[200vh] relative">
        <motion.div
          style={{ scale, y }}
          className="sticky top-0 h-screen w-full lg:aspect-video  overflow-x-hidden"
        >
          <Image
            src="/assets/hero.jpg"
            fill
            className="object-cover object-top"
            alt="Hero"
            priority
          />
          <div className="absolute inset-0 bg-primary/20" />
        </motion.div>
        <motion.div style={{ height: spacerHeight }} />
      </section>
      {/* TESTO */}
      <section className="flex px-4 gap-2 flex-col items-center 2xl:pt-20 fxl:pt-0 text-center mt-16 lg:mt-10 mb-16 lg:mb-32">
        <MaskText>
          <h1
            style={{ opacity: titleOpacity, y: titleY }}
            className="text-blu text-base lg:text-[1.2rem] uppercase"
          >
            Agriturismo Segarelli
          </h1>
        </MaskText>
        <MaskText>
          <h2
            style={{ opacity: titleOpacity, y: titleY }}
            className="text-blu text-4xl lg:text-[46px] leading-[1.2]"
          >
            {translation.title}
          </h2>
        </MaskText>

        <ParagraphText>{translation.description}</ParagraphText>

        <div className="flex flex-wrap gap-8 lg:gap-0 w-full max-w-6xl mt-10 justify-center lg:justify-evenly">
          {translation.features.map((feature, index) => (
            <FeatureItem key={index} {...feature} />
          ))}
        </div>
      </section>

      <section>
        <CategoriesCarousel translation={translation} />
      </section>
      <SectionBreak />
      <StaggerImages />

      <Reviews translation={translation.reviewsTitle} />
      <SectionBreak />
      <div className="h-screen w-full relative bg-[url('/assets/segarelli_alto.jpg')] bg-cover bg-fixed bg-center">
        {/* <Image src="/assets/segarelli_alto.jpg" fill className="object-cover" /> */}
      </div>
      <SectionBreak />
      <AttivitaSection pages={pages} translation={translation.activities} />
      <div className="bg-primary/10 w-full flex items-center py-8">
        {" "}
        <BlogSection
          post={post}
          translation={translation.blog}
          locale={locale}
        />
      </div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  const idLocale = await getTagId(locale); // recupera id della lingua attuale
  const post = await getPosts(idLocale); //recupera post nella lingua attuale
  const HOME_PAGE_IDS = [2248, 2026, 1997, 1957];
  const pages = await getPagesByIds(HOME_PAGE_IDS);

  let obj;
  switch (locale) {
    case "it":
      obj = homeIT;
      break;
    case "en":
      obj = homeEN;
      break;
    default:
      obj = homeIT;
      break;
  }

  return {
    props: {
      translation: obj?.home,

      post: post.sort((a, b) => a?.date > b?.date).filter((el, i) => i < 3), //elimino i post per sideeffect
      // instagramPosts: posts,
      pages,
    },
    revalidate: 60,
  };
}
