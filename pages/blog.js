import { MaskText } from "@/components/layout/MaskText";
import { getDate } from "@/utils/utils";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import blogIT from "../public/locales/it/blog.json";
import blogEN from "../public/locales/en/blog.json";
import blogPostsIT from "../public/locales/it/blogPosts.json";
import blogPostsEN from "../public/locales/en/blogPosts.json";

function Blog({ posts, translation }) {
  const { locale } = useRouter();
  const t = translation || blogIT.blog;

  const calcolaMinutiLettura = (testo, velocitaLetturaMedia = 250) => {
    const parole = (testo || "").split(" ");
    const paroleLette = parole.filter((parola) => parola.trim() !== "").length;
    return Math.max(1, Math.ceil(paroleLette / velocitaLetturaMedia));
  };

  return (
    <>
      <Head>
        <title>{t?.head?.title || "Agriturismo Segarelli | Blog"}</title>
        <meta name="description" content={t?.head?.description || ""} />
        <meta name="keywords" content={t?.head?.keywords || ""} />
        <meta name="robots" content={t?.head?.robots || "index,follow"} />
        <link rel="canonical" href={t?.head?.canonical || ""} />
        <meta property="og:title" content={t?.head?.og?.title || ""} />
        <meta property="og:description" content={t?.head?.og?.description || ""} />
        <meta property="og:type" content={t?.head?.og?.type || "website"} />
        <meta property="og:url" content={t?.head?.og?.url || ""} />
        <meta property="og:image" content={t?.head?.og?.image || ""} />
        <meta property="og:site_name" content={t?.head?.og?.site_name || ""} />
        <meta
          name="twitter:card"
          content={t?.head?.twitter?.card || "summary_large_image"}
        />
        <meta name="twitter:title" content={t?.head?.twitter?.title || ""} />
        <meta
          name="twitter:description"
          content={t?.head?.twitter?.description || ""}
        />
        <meta name="twitter:image" content={t?.head?.twitter?.image || ""} />
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        {(t?.head?.schema?.organization || t?.head?.schema?.website) && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@graph": [
                  t?.head?.schema?.organization || {},
                  t?.head?.schema?.website || {},
                ],
              }),
            }}
          />
        )}
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

      <div className="lg:w-[90%] mx-auto grid lg:grid-cols-3 px-4 lg:px-6 my-20 gap-x-6 gap-y-10">
        {posts.map((p, i) => {
          const minutiLettura = calcolaMinutiLettura(
            (p?.content || "").replace(/(<([^>]+)>)/gi, ""),
          );

          return (
            <div key={i} className="flex flex-col min-h-full">
              <Link href={`/blog/${p.slug}`} title={p.title}>
                <figure>
                  <Image
                    src={p.image || "/assets/hero.jpg"}
                    width={461}
                    height={420}
                    alt={p.imageAlt || p.title}
                    className="object-cover w-full aspect-square"
                    priority={i < 3}
                  />
                </figure>
              </Link>

              <div className="h-[4rem] flex items-start mt-2">
                <Link href={`/blog/${p.slug}`} title={p.title}>
                  <h3 className="text-lg fxl:text-[1.3rem] leading-[1.2] break-words">
                    {p.title}
                  </h3>
                </Link>
              </div>

              <div className="flex items-center w-full">
                <span className="text-blu/70">
                  {getDate(p?.date, locale === "it" ? "it-IT" : "en-US")}
                </span>
                <span className="w-[0.3rem] h-[0.3rem] bg-blu/70 rounded-full mx-2"></span>
                <span className="text-blu/70 flex">{minutiLettura} min read</span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Blog;

export async function getStaticProps({ locale }) {
  const isEn = locale === "en";
  return {
    props: {
      translation: isEn ? blogEN.blog : blogIT.blog,
      posts: (isEn ? blogPostsEN.posts : blogPostsIT.posts) || [],
    },
    revalidate: 60,
  };
}
