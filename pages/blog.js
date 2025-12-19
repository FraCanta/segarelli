import { MaskText } from "@/components/layout/MaskText";
import { getDate } from "@/utils/utils";
import { getCategories, getPosts, getTagId } from "@/utils/wordpress";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Blog({ post, pages, currentP }) {
  function calcolaMinutiLettura(testo, velocitaLetturaMedia = 250) {
    const parole = (testo || "").split(" "); // fallback su stringa vuota
    const paroleLette = parole.filter((parola) => parola.trim() !== "").length;
    return Math.ceil(paroleLette / velocitaLetturaMedia);
  }

  return (
    <>
      <div className="h-[60svh] bg-primary/60 flex items-center">
        <div className="flex flex-col gap-3 items-center w-full justify-center relative">
          <MaskText>
            <h1 className="text-blu text-3xl lg:text-6xl text-center p-1">
              Il Blog dell'Agriturismo Segarelli
            </h1>
          </MaskText>
        </div>
      </div>

      <div className="grid grid-cols-3 px-6 my-20 gap-4">
        {post.map((p, i) => {
          const featuredMedia = p?._embedded?.["wp:featuredmedia"]?.[0];

          // Calcolo minuti di lettura per ogni post
          const testoSenzaTag =
            p?.content?.rendered?.replace(/(<([^>]+)>)/gi, "") || "";
          const minutiLettura = calcolaMinutiLettura(testoSenzaTag);

          return (
            <div key={i} className="w-full h-full">
              <Link href={`/blog/${p?.slug}`} title={`${p?.title?.rendered}`}>
                <figure>
                  <Image
                    src={
                      featuredMedia?.media_details?.sizes?.full?.source_url ||
                      "/assets/hero.jpg"
                    }
                    width={461}
                    height={420}
                    alt={featuredMedia?.alt_text || p?.title?.rendered}
                    className="object-cover w-full aspect-video"
                    priority
                  />
                </figure>
              </Link>

              <div className="flex flex-col justify-between mt-4">
                <Link href={`/blog/${p?.slug}`} title={`${p?.title?.rendered}`}>
                  <p
                    className="pb-2 text-xl font-bold underline capitalize underline-offset-4 decoration-second/60 decoration-2 text-pink hover:text-second"
                    dangerouslySetInnerHTML={{ __html: p?.title?.rendered }}
                  ></p>
                </Link>

                <div
                  dangerouslySetInnerHTML={{ __html: p?.excerpt?.rendered }}
                  className="mb-4 text-xs lg:text-base line-clamp2 text-pink/80"
                ></div>

                <div className="w-full h-[1px] bg-second/30 "></div>

                <div className="flex items-center justify-between w-full py-2">
                  <small className=" text-pink text-md md:text-[2.5vw] xl:text-base 2xl:text-[0.8vw] fxl:text-lg 3xl:text-2xl">
                    {getDate(p?.date)}
                  </small>

                  <div className=" text-pink text-md md:text-[2.5vw] xl:text-base 2xl:text-[0.8vw]  3xl:text-lg flex font-bold ml-6">
                    <Icon
                      icon="tabler:clock-hour-3"
                      color="#749a97"
                      className="mr-2"
                    />
                    <span className=" text-pink text-xs md:text-[2.5vw] xl:text-base 2xl:text-[0.8vw] fxl:text-lg 3xl:text-2xl flex font-bold">
                      {minutiLettura} min read
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Blog;

export async function getServerSideProps(context) {
  const { locale, query, res } = context;
  res.setHeader("Cache-Control", "public, stale-while-revalidate");

  let { page = 1, categories = 0, search = null } = query;
  page = page || 1;
  categories = categories || 0;
  const itemPerPage = 6;

  const idLocale = await getTagId(locale); // es. "it" -> 123
  const post = await getPosts(idLocale, search);

  const filteredPosts = post.filter((el) => {
    return parseInt(categories) !== 0
      ? el?.categories.includes(parseInt(categories))
      : true;
  });

  const paginationTrim = filteredPosts.slice(
    (page - 1) * itemPerPage,
    itemPerPage * page
  );

  const category = await getCategories(locale);

  return {
    props: {
      post: paginationTrim,
      pages: Math.ceil(filteredPosts.length / itemPerPage),
      category,
      currentP: page,
    },
  };
}
