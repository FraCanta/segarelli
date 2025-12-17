import CategoriesCarousel from "@/components/CategoriesCarousel/CategoriesCarousel";
import SectionBreak from "@/components/SectionBreak/SectionBreak";
import { motion, useScroll, useTransform } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { getPosts, getTagId } from "../utils/wordpress";
import BlogSection from "@/components/blogSection/blogSection";
import { StaggerImages } from "@/components/StaggerImages";
import React from "react";
import { MaskText } from "@/components/layout/MaskText";

const features = [
  {
    title: ["Grande", "Giardino"],
    src: "https://www.vineyard.co.za/wp-content/uploads/2025/07/Expansive-Gardens-icon.svg",
  },

  {
    title: ["Vicino", "alle attrazioni"],
    src: "https://www.vineyard.co.za/wp-content/uploads/2025/07/Close-to-Attractions-icon.svg",
  },

  {
    title: ["Design", "senza tempo"],
    src: "https://www.vineyard.co.za/wp-content/uploads/2025/07/TIme-Honouored-Design-icon.svg",
  },
  {
    title: ["Amato", "dai locals"],
    src: "https://www.vineyard.co.za/wp-content/uploads/2025/07/Loved-By-Locals-icon.svg",
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

// Paragrafo animato
export function ParagraphText({ children }) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
  const animate = inView || isMobile;

  const animation = {
    initial: { y: "100%", opacity: 0 },
    enter: (i) => ({
      y: "0%",
      opacity: 1,
      transition: { duration: 0.75, ease: [0.33, 1, 0.68, 1], delay: 0.05 * i },
    }),
  };

  const lines = children.split(". ");

  return (
    <div ref={ref} className="overflow-hidden">
      {lines.map((line, i) => (
        <motion.p
          key={i}
          variants={animation}
          initial="initial"
          animate={animate ? "enter" : "initial"}
          custom={i}
          className="max-w-4xl p-2 lg:mt-4 text-sm text-center lg:text-lg text-blu/80"
        >
          {line.trim()}.
        </motion.p>
      ))}
    </div>
  );
}

export default function Home({ post }) {
  console.log(post);
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.5], {
    clamp: true,
  });
  const y = useTransform(scrollYProgress, [0, 0.4], [0, 200], { clamp: true });
  const spacerHeight = useTransform(
    scrollYProgress,
    [0, 0.4],
    ["0px", "300px"]
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
      <section className="h-[200vh] relative">
        <motion.div
          style={{ scale, y }}
          className="sticky top-0 h-screen w-full lg:aspect-video"
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
            className="text-blu text-sm lg:text-[1.2rem] uppercase"
          >
            Agriturismo Segarelli
          </h1>
        </MaskText>
        <MaskText>
          <h2
            style={{ opacity: titleOpacity, y: titleY }}
            className="text-blu text-4xl lg:text-[46px]"
          >
            Riscopri il piacere di fermarti
          </h2>
        </MaskText>

        <ParagraphText>
          C’è un luogo nella campagna toscana dove i ritmi rallentano e tutto
          diventa più semplice. All’Agriturismo Segarelli troverai natura, spazi
          tranquilli e un’accoglienza genuina, fatta di condivisione e
          attenzione. Un posto dove stare bene, prendersi il proprio tempo e
          godersi ciò che c’è intorno
        </ParagraphText>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 w-full justify-evenly max-w-6xl mt-10 ">
          {features.map((feature, index) => (
            <FeatureItem key={index} {...feature} />
          ))}
        </div>
      </section>
      <section>
        <CategoriesCarousel />
      </section>
      <SectionBreak />
      <StaggerImages />

      <section className="bg-primary/30  w-full flex flex-col gap-10 items-center my-10 justify-center py-8 lg:py-20 px-8 lg:px-10">
        <MaskText>
          <h2 className="text-blu text-3xl lg:text-5xl lg:my-10 leading-snug p-1">
            Esperienze all'Agriturismo Segarelli
          </h2>
        </MaskText>
        <script src="https://elfsightcdn.com/platform.js" async></script>
        <div
          class="elfsight-app-89aabd6e-f658-4c8a-84c4-59bc7c67227e"
          data-elfsight-app-lazy
        ></div>
      </section>
      <SectionBreak />
      <div className="h-screen w-full relative">
        <Image src="/assets/segarelli_alto.jpg" fill className="object-cover" />
      </div>
      <SectionBreak />
      <div className="h-screen"></div>
      <div className="bg-primary/10 w-full flex items-center py-8">
        {" "}
        <BlogSection post={post} />
      </div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  const idLocale = await getTagId(locale); // recupera id della lingua attuale
  const post = await getPosts(idLocale); //recupera post nella lingua attuale

  return {
    props: {
      post: post.sort((a, b) => a?.date > b?.date).filter((el, i) => i < 3), //elimino i post per sideeffect
      // instagramPosts: posts,
    },
    revalidate: 60,
  };
}
