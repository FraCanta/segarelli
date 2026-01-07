import BlogSection from "@/components/blogSection/blogSection";
import CategoriesCarousel from "@/components/CategoriesCarousel/CategoriesCarousel";
import { MaskText } from "@/components/layout/MaskText";
import RevealImage from "@/components/layout/RevealImage";
import { getPagesByIds, getPosts, getTagId } from "@/utils/wordpress";
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

function ChiSiamo({ post }) {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  return (
    <div>
      <div className="min-h-[100svh] lg:min-h-screen  flex flex-col items-center  lg:py-10">
        <div className="text-center mt-20">
          <div className="py-16 lg:pt-32 lg:pb-16 h-full">
            <MaskText>
              <h1 className="text-blu text-base lg:text-[1.5rem] uppercase lg:p-4">
                chi siamo
              </h1>
            </MaskText>
            <MaskText>
              <h2 className="text-blu text-4xl sm:text-[2.5rem] xl:text-5xl 2xl:text-7xl text-center  leading-[1] py-2 overflow-hidden lg:max-w-5xl lg:mx-auto">
                Storia dell’ Agriturismo Segarelli
              </h2>
            </MaskText>
          </div>

          <div
            ref={ref}
            className="relative overflow-hidden flex px-4 lg:px-0 lg:w-[calc(100vw-3rem)] aspect-square lg:h-[800px]"
          >
            <motion.div
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              animate={
                inView
                  ? { clipPath: "inset(0 0 0% 0)" }
                  : { clipPath: "inset(0 0 100% 0)" }
              }
              transition={{
                duration: 1,
                ease: [0.33, 1, 0.68, 1],
              }}
              className="absolute inset-0"
            >
              <Image
                src="/assets/chisiamo_hero.jpg"
                alt="chi siamo"
                fill
                className=" object-cover object-top w-full h-full"
              />
            </motion.div>
          </div>
        </div>
      </div>
      <CategoriesCarousel />
      <div className=" w-full flex items-center py-8">
        {" "}
        <BlogSection post={post} />
      </div>
    </div>
  );
}

export default ChiSiamo;

export async function getStaticProps({ locale }) {
  const idLocale = await getTagId(locale); // recupera id della lingua attuale
  const post = await getPosts(idLocale); //recupera post nella lingua attuale
  const HOME_PAGE_IDS = [2248, 2026, 1997, 1957];
  const pages = await getPagesByIds(HOME_PAGE_IDS);
  return {
    props: {
      post: post.sort((a, b) => a?.date > b?.date).filter((el, i) => i < 3), //elimino i post per sideeffect
      // instagramPosts: posts,
      pages,
    },
    revalidate: 60,
  };
}
