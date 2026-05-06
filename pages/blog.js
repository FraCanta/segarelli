import { MaskText } from "@/components/layout/MaskText";
import { getDate } from "@/utils/utils";
import { getCategories, getPosts, getTagId } from "@/utils/wordpress";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import blogIT from "../public/locales/it/blog.json";
import blogEN from "../public/locales/en/blog.json";

function Blog({ post, pages, currentP, translation }) {
  const { locale, query } = useRouter();
  function calcolaMinutiLettura(testo, velocitaLetturaMedia = 250) {
    const parole = (testo || "").split(" "); // fallback su stringa vuota
    const paroleLette = parole.filter((parola) => parola.trim() !== "").length;
    return Math.ceil(paroleLette / velocitaLetturaMedia);
  }

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
      <div className="h-[40svh] lg:h-[60svh] bg-primary/60 flex items-center">
        <div className="flex flex-col gap-3 items-center w-full justify-center relative">
          <MaskText>
            <h1 className="text-blu text-4xl xl:text-5xl 2xl:text-6xl text-center py-2 mt-20 ">
              {locale === "it"
                ? "Il Blog dell'Agriturismo Segarelli"
                : "The Agriturismo Segarelli Blog"}
            </h1>
          </MaskText>
        </div>
      </div>

      <div className="lg:w-[90%] mx-auto grid lg:grid-cols-4 px-4 lg:px-6 my-20 gap-x-6 gap-y-10">
        {post.map((p, i) => {
          const featuredMedia = p?._embedded?.["wp:featuredmedia"]?.[0];

          // Calcolo minuti di lettura per ogni post
          const testoSenzaTag =
            p?.content?.rendered?.replace(/(<([^>]+)>)/gi, "") || "";
          const minutiLettura = calcolaMinutiLettura(testoSenzaTag);

          return (
            <div key={i} className="flex flex-col min-h-full">
              {/* Immagine */}
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
                    className="object-cover w-full aspect-square"
                    priority
                  />
                </figure>
              </Link>

              {/* Titolo */}
              <div className="h-[4rem] flex items-start mt-2">
                <Link href={`/blog/${p?.slug}`} title={`${p?.title?.rendered}`}>
                  <h3
                    className="text-lg fxl:text-[1.3rem] leading-[1.2] break-words"
                    dangerouslySetInnerHTML={{ __html: p?.title?.rendered }}
                  />
                </Link>
              </div>

              {/* Meta info */}
              <div className="flex items-center w-full ">
                <span className="text-blu/70">
                  {getDate(p?.date, locale === "it" ? "it-IT" : "en-US")}
                </span>
                <span className="w-[0.3rem] h-[0.3rem] bg-blu/70 rounded-full mx-2"></span>
                <span className="text-blu/70 flex">
                  {minutiLettura} min read
                </span>
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
  page = Number.parseInt(page, 10) || 1;
  categories = Number.parseInt(categories, 10) || 0;
  const itemPerPage = 10;

  let post = [];
  let category = [];
  let filteredPosts = [];

  try {
    const idLocale = await getTagId(locale); // es. "it" -> 123
    post = (await getPosts(idLocale, search)) || [];
    category = (await getCategories(locale)) || [];

    filteredPosts = post.filter((el) => {
      return categories !== 0 ? el?.categories?.includes(categories) : true;
    });
  } catch (error) {
    console.error("Blog getServerSideProps error:", error);
    filteredPosts = [];
    category = [];
  }

  const paginationTrim = filteredPosts.slice(
    (page - 1) * itemPerPage,
    itemPerPage * page,
  );

  let obj;
  switch (locale) {
    case "it":
      obj = blogIT;
      break;
    case "en":
      obj = blogEN;
      break;
    default:
      obj = blogIT;
      break;
  }

  return {
    props: {
      translation: obj?.blog,
      post: paginationTrim || [],
      pages: Math.ceil(filteredPosts.length / itemPerPage),
      category,
      currentP: page,
    },
  };
}
