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
import FeatureItem from "@/components/FeatureItem/FeatureItem";

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
      {/* <SectionBreak /> */}
      {/* <div className="h-screen w-full relative bg-[url('/assets/segarelli_alto.jpg')] bg-cover bg-fixed bg-center"> */}
        {/* <Image src="/assets/segarelli_alto.jpg" fill className="object-cover" /> */}
      {/* </div> */}
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
