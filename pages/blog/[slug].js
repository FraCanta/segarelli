import CategoriesCarousel from "@/components/CategoriesCarousel/CategoriesCarousel";
import RevealImage from "@/components/layout/RevealImage";
import SectionBreak from "@/components/SectionBreak/SectionBreak";
import { getDate } from "@/utils/utils";
import {
  getCategories,
  getPost,
  getPosts,
  getSlugs,
  getTagId,
  getTagNameList,
} from "@/utils/wordpress";
import { Icon } from "@iconify/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "glightbox/dist/css/glightbox.css";

function PostPage({ post, featuredMedia }) {
  console.log(post);
  const [minutiLettura, setMinutiLettura] = useState(0);

  useEffect(() => {
    const testoSenzaTag = post?.content?.rendered.replace(/(<([^>]+)>)/gi, "");
    const parole = testoSenzaTag
      .split(" ")
      .filter((p) => p.trim() !== "").length;
    setMinutiLettura(Math.ceil(parole / 250));
  }, [post]);

  useEffect(() => {
    let lightbox;

    const initLightbox = async () => {
      if (typeof window === "undefined") return;

      const GLightbox = (await import("glightbox")).default;
      await import("glightbox/dist/css/glightbox.css");

      const links = document.querySelectorAll(".gallery a");
      if (!links.length) return;

      links.forEach((link) => {
        link.classList.add("glightbox");
      });

      lightbox = GLightbox({
        selector: ".gallery a",
        loop: true,
        touchNavigation: true,
      });
    };

    initLightbox();

    return () => {
      if (lightbox) lightbox.destroy();
    };
  }, [post]);

  return (
    <>
      <div className=" bg-primary/70 flex items-center px-4 lg:px-20 w-full min-h-[80svh]">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-end justify-between w-full mt-32 mb-10 gap-y-10">
          <div className="h-full flex flex-col gap-10 justify-between">
            <div>
              <Link
                href="/blog"
                className="flex items-center gap-2 mb-6 text-white uppercase hover:underline"
              >
                <Icon
                  icon="iconoir:arrow-left"
                  className="text-white text-lg"
                />
                Back
              </Link>
            </div>
            <div>
              {" "}
              <h1
                className="max-w-2xl text-3xl md:text-5xl lg:text-6xl text-white leading-none"
                dangerouslySetInnerHTML={{
                  __html: post.title.rendered,
                }}
              ></h1>
              <div className="flex items-center  w-full pt-2">
                <small className="text-white text-sm md:text-[2.5vw] xl:text-base 2xl:text-[0.8vw]  3xl:text-2xl">
                  {getDate(post?.date)}
                </small>

                <div className="flex items-center text-white text-md md:text-[2.5vw] xl:text-base 2xl:text-[0.8vw] 3xl:text-lg  ml-6">
                  <span className=" text-sm md:text-[2.5vw] xl:text-base 2xl:text-[0.8vw]  3xl:text-2xl flex ">
                    - {minutiLettura}min read
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="relative aspect-square lg:aspect-video h-auto  lg:h-[500px] w-full lg:w-2/3  ml-auto">
            <RevealImage
              src={featuredMedia?.source_url || "/assets/hero.jpg"} // fallback se non c'è immagine
              alt={featuredMedia?.alt_text || post.title.rendered}
              fill
              className="object-cover h-full"
            />
          </div>
        </div>
      </div>
      <div
        className="px-4 lg:w-[70%] lg:mx-auto my-20 text-lg wp-title wp-content"
        dangerouslySetInnerHTML={{
          __html: post.content.rendered,
        }}
      ></div>

      <div className="px-6 my-20 text-center">
        <div>related attività</div>
      </div>
      <SectionBreak />
      <CategoriesCarousel />
    </>
  );
}

export default PostPage;

export async function getStaticPaths() {
  const paths = await getSlugs("posts");

  return {
    paths,
    //this option below renders in the server (at request time) pages that were not rendered at build time
    //e.g when a new blogpost is added to the app
    fallback: "blocking",
  };
}

//access the router, get the id, and get the data for that post
export async function getStaticProps({ params, locale }) {
  const post = await getPost(params?.slug);
  const idLocale = await getTagId(locale); // recupera id della lingua attuale
  const allPosts = await getPosts(idLocale);

  const modifiedContent = post?.content?.rendered?.replace(
    "data-src-fg",
    "src"
  );
  const featuredMedia = post?.["_embedded"]?.["wp:featuredmedia"]?.[0] || null;

  const tags = await getTagNameList(post?.tags);
  const category = await getCategories(locale);

  const postCategories = category?.filter((el) =>
    post?.categories?.includes(el?.id)
  );

  return {
    props: {
      post,
      modifiedContent: modifiedContent,
      featuredMedia: featuredMedia,
      tags: tags,
      category: category, //array delle categorie presenti
      recent: allPosts
        ?.filter((el) => el.id !== post.id)
        .sort((a, b) => a?.date > b?.date)
        .filter((el, i) => i < 3),
      postCategories: postCategories,
      lang: locale,
    },
    revalidate: 10, // In seconds
  };
}
