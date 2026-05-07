import BlogSection from "@/components/blogSection/blogSection";
import CategoriesCarousel from "@/components/CategoriesCarousel/CategoriesCarousel";
import { MaskText } from "@/components/layout/MaskText";
import RevealImage from "@/components/layout/RevealImage";
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import chiSiamoIT from "../public/locales/it/chiSiamo.json";
import chiSiamoEN from "../public/locales/en/chiSiamo.json";
import blogPostsIT from "../public/locales/it/blogPosts.json";
import blogPostsEN from "../public/locales/en/blogPosts.json";
import { ParagraphText } from "@/components/layout/ParagraphText";
import SliderAppartamento from "@/components/SliderAppartamento/SliderAppartamento";
import Head from "next/head";

function ChiSiamo({ post, translation }) {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2, // 0.2s tra un'immagine e l'altra
        ease: [0.33, 1, 0.68, 1],
      },
    },
  };
  return (
    <div>
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
      <div className="min-h-[80svh] lg:min-h-screen  flex flex-col items-center  lg:py-10">
        <div className="text-center mt-20">
          <div className="py-16 lg:pt-32 lg:pb-16 h-full">
            <MaskText>
              <h1 className="text-blu text-base lg:text-[1.5rem] uppercase lg:p-4">
                {translation.title}
              </h1>
            </MaskText>
            <MaskText>
              <h2 className="text-blu text-4xl sm:text-[2.5rem] xl:text-5xl 2xl:text-7xl text-center  leading-[1] py-2 overflow-hidden lg:max-w-5xl lg:mx-auto">
                {translation.secondTitle}
              </h2>
            </MaskText>
          </div>

          <div className="relative px-4 lg:px-0 lg:w-[calc(100vw-3rem)] aspect-video lg:aspect-square lg:h-[800px]  ">
            <RevealImage
              src="/assets/chisiamo_hero.webp"
              alt="chi siamo"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto lg:my-20 lg:text-center px-4">
        <ParagraphText>{translation?.firstParagraph}</ParagraphText>
      </div>

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="flex flex-col lg:flex-row justify-center gap-6 min-h-[80vh]  items-center px-4 lg:px-6 my-20"
      >
        <RevealImage
          src="/assets/storia/1.jpg"
          alt="Left"
          className="block flex-1 aspect-video"
        />

        <RevealImage
          src="/assets/storia/3.jpg"
          alt="Center"
          className="flex-1 aspect-video lg:aspect-square"
        />

        <RevealImage
          src="/assets/storia/2.jpg"
          alt="Right"
          className="block flex-1 aspect-video"
        />
      </motion.div>
      <div className="my-20 lg:text-center  px-4 flex flex-col gap-4">
        <MaskText>
          <h2 className="text-blu text-3xl 2xl:text-[46px] leading-[1.2]">
            {translation?.anni30?.title}
          </h2>
        </MaskText>
        <div className="max-w-6xl mx-auto ">
          <ParagraphText>{translation?.anni30?.description}</ParagraphText>
        </div>
        <div className="my-20">
          {" "}
          <SliderAppartamento slides={translation?.anni30?.gallery2} />
        </div>
      </div>
      <div className="my-20 lg:text-center bg-primary/10 py-20 flex flex-col gap-4 px-4">
        <MaskText>
          <h2 className="text-blu text-3xl 2xl:text-[46px] leading-[1.2]">
            {translation?.anni50?.title}
          </h2>
        </MaskText>
        <div className="max-w-6xl mx-auto">
          <ParagraphText>{translation?.anni50?.description}</ParagraphText>
        </div>
        <div className="my-20">
          {" "}
          <SliderAppartamento slides={translation?.anni50?.gallery} />
        </div>
      </div>
      <div className="my-20 lg:text-center flex flex-col gap-4 px-4">
        <MaskText>
          <h2 className="text-blu text-3xl 2xl:text-[46px] leading-[1.2]">
            {translation?.nowday?.title}
          </h2>
        </MaskText>
        <div className="max-w-6xl mx-auto ">
          <ParagraphText>{translation?.nowday?.description}</ParagraphText>
        </div>
        <div className="my-20">
          {" "}
          <SliderAppartamento slides={translation?.nowday?.gallery3} />
        </div>
      </div>
      <CategoriesCarousel translation={translation} />
      <div className=" w-full flex items-center py-8">
        {" "}
        <BlogSection post={post} translation={translation.blog} />
      </div>
    </div>
  );
}

export default ChiSiamo;

export async function getStaticProps({ locale }) {
  let obj;
  switch (locale) {
    case "it":
      obj = chiSiamoIT;
      break;
    case "en":
      obj = chiSiamoEN;
      break;
    default:
      obj = chiSiamoIT;
      break;
  }

  return {
    props: {
      translation: obj?.chiSiamo,
      post: ((locale === "en" ? blogPostsEN.posts : blogPostsIT.posts) || [])
        .sort((a, b) => new Date(b?.date || 0) - new Date(a?.date || 0))
        .slice(0, 3),
    },
    revalidate: 60,
  };
}
