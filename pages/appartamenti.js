import AttivitaSection from "@/components/AttivitaSection/AttivitaSection";
import BlogSection from "@/components/blogSection/blogSection";
import CategoriesCarousel from "@/components/CategoriesCarousel/CategoriesCarousel";
import Reviews from "@/components/Reviews";
import SectionBreak from "@/components/SectionBreak/SectionBreak";
import React from "react";
import appartamentiIT from "../public/locales/it/appartamenti.json";
import appartamentiEN from "../public/locales/en/appartamenti.json";
import blogPostsIT from "../public/locales/it/blogPosts.json";
import blogPostsEN from "../public/locales/en/blogPosts.json";
import dintorniPagesIT from "../public/locales/it/dintorniPages.json";
import dintorniPagesEN from "../public/locales/en/dintorniPages.json";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { MaskText } from "@/components/layout/MaskText";
import { ParagraphText } from "@/components/layout/ParagraphText";
import Image from "next/image";
import ButtonSecondary from "@/components/layout/ButtonSecondary";
import ButtonPrimaryOutline from "@/components/layout/ButtonPrimaryOutline";
import RevealImage from "@/components/layout/RevealImage";
import FeatureItem from "@/components/FeatureItem/FeatureItem";
import Head from "next/head";
import HreflangLinks from "@/components/SEO/HreflangLinks";

function Appartamenti({ pages, post, translation, locale }) {
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
        <HreflangLinks it="/appartamenti" en="/en/appartamenti" />

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
            <h1 className="text-blu text-base 2xl:text-[1.2rem] uppercase">
              {translation?.subtitle1}
            </h1>
          </MaskText>
          <MaskText>
            <h2 className="text-blu text-4xl 2xl:text-[46px] leading-[1.2]">
              {translation?.title1}
            </h2>
          </MaskText>
          <div className="max-w-5xl">
            <ParagraphText>{translation?.paragraph1}</ParagraphText>
          </div>
          <div className="flex flex-wrap gap-8 lg:gap-0 w-full max-w-6xl mt-10 justify-center lg:justify-evenly">
            {translation.features.map((feature, index) => (
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
                  <h2 className="text-blu text-4xl 2xl:text-[46px] p-1.5">
                    {apt.name}
                  </h2>
                </MaskText>
                <div className="max-w-3xl">
                  <ParagraphText>{apt.description}</ParagraphText>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <ButtonSecondary apartmentName={apt.name}>
                  {apt?.ctaSecondary}
                </ButtonSecondary>
                <ButtonPrimaryOutline
                  link={`/appartamenti/${apt.name.toLowerCase()}`}
                  title="Scopri di più"
                  target="_self"
                >
                  {apt?.ctaPrimary}
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

      <Reviews translation={translation.reviewsTitle} />
      <AttivitaSection
        pages={pages}
        translation={translation.activities}
        locale={locale}
      />

      <CategoriesCarousel translation={translation} />
      <div className="bg-primary/10 w-full flex items-center py-8">
        {" "}
        <BlogSection post={post} translation={translation.blog} />
      </div>
    </>
  );
}

export default Appartamenti;

export async function getStaticProps({ locale }) {
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
  const rawPages =
    locale === "en" ? dintorniPagesEN.pages || [] : dintorniPagesIT.pages || [];
  const pages = rawPages.map((p) => ({
    ...p,
    link: `/dintorni/${p.slug}`,
  }));

  return {
    props: {
      translation: obj?.appartamenti,
      post: ((locale === "en" ? blogPostsEN.posts : blogPostsIT.posts) || [])
        .sort((a, b) => new Date(b?.date || 0) - new Date(a?.date || 0))
        .slice(0, 3),
      pages,
      locale,
    },
    revalidate: 60,
  };
}
