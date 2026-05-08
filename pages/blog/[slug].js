import RevealImage from "@/components/layout/RevealImage";
import SectionBreak from "@/components/SectionBreak/SectionBreak";
import { getDate } from "@/utils/utils";
import { Icon } from "@iconify/react";
import Link from "next/link";
import React, { useEffect, useMemo } from "react";
import ShareButtons from "@/components/ShareButtons/ShareButtons";
import Image from "next/image";
import Head from "next/head";
import blogPostsIT from "../../public/locales/it/blogPosts.json";
import blogPostsEN from "../../public/locales/en/blogPosts.json";
import HreflangLinks from "@/components/SEO/HreflangLinks";

const SITE_URL = "https://www.agriturismosegarelli.it";

function PostPage({ post, recent, locale, alternateSlug }) {
  const cleanHtml = (html) => html?.replace(/(<([^>]+)>)/gi, "").trim() || "";
  const cleanTitle = cleanHtml(post.title);
  const cleanDescription = cleanHtml(post.excerpt || post.content);
  const pageUrl = `${SITE_URL}${locale === "en" ? "/en" : ""}/blog/${post.slug}`;
  const imageUrl = post.image?.startsWith("http")
    ? post.image
    : `${SITE_URL}${post.image || "/assets/hero.jpg"}`;

  const minutiLettura = useMemo(() => {
    const testoSenzaTag = (post?.content || "").replace(/(<([^>]+)>)/gi, "");
    const parole = testoSenzaTag.split(" ").filter((p) => p.trim() !== "").length;
    return Math.max(1, Math.ceil(parole / 250));
  }, [post]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    let lightbox;
    const initLightbox = async () => {
      const links = document.querySelectorAll(".gallery a, .wp-block-gallery a");
      if (!links.length) return;

      const GLightbox = (await import("glightbox")).default;
      await import("glightbox/dist/css/glightbox.css");

      links.forEach((link) => link.classList.add("glightbox"));
      if (lightbox) lightbox.destroy();

      lightbox = GLightbox({
        selector: ".glightbox",
        loop: true,
        touchNavigation: true,
      });

      links.forEach((link, index) => {
        link.addEventListener("click", (event) => {
          event.preventDefault();
          lightbox.openAt(index);
        });
      });
    };

    const timeout = setTimeout(initLightbox, 50);
    return () => {
      clearTimeout(timeout);
      if (lightbox) lightbox.destroy();
    };
  }, [post]);

  return (
    <>
      <Head>
        <title>Agriturismo Segarelli | {cleanTitle}</title>
        <meta name="description" content={cleanDescription} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={pageUrl} />
        {alternateSlug && (
          <HreflangLinks
            it={`/blog/${locale === "it" ? post.slug : alternateSlug}`}
            en={`/en/blog/${locale === "en" ? post.slug : alternateSlug}`}
          />
        )}
        <meta property="og:title" content={cleanTitle} />
        <meta property="og:description" content={cleanDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:site_name" content="Agriturismo Segarelli" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={cleanTitle} />
        <meta name="twitter:description" content={cleanDescription} />
        <meta name="twitter:image" content={imageUrl} />
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <div className="bg-primary/70 flex items-center px-4 lg:px-10 w-full min-h-[90svh]">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-end justify-between w-full mt-32 mb-10 gap-10 lg:gap-20">
          <div className="h-full flex flex-col gap-10 justify-between">
            <div>
              <Link
                href="/blog"
                className="flex items-center gap-2 mb-6 text-white uppercase hover:underline"
              >
                <Icon icon="iconoir:arrow-left" className="text-white text-lg" />
                Back
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              <h1
                className="max-w-3xl text-4xl md:text-5xl 2xl:text-[3.2rem] text-white capitalize"
                dangerouslySetInnerHTML={{ __html: post.title }}
              />
              <div className="flex items-center w-full pt-2">
                <span className="text-white text-sm xl:text-base">
                  {getDate(post?.date, locale === "it" ? "it-IT" : "en-US")}
                </span>
                <span className="w-[0.3rem] h-[0.3rem] bg-white rounded-full mx-2"></span>
                <span className="text-white text-sm xl:text-base">
                  {minutiLettura} min read
                </span>
              </div>
              <ShareButtons
                title={post.title}
                link={pageUrl}
              />
            </div>
          </div>
          <div className="relative aspect-square xl:aspect-video h-auto xl:h-[400px] fxl:h-[500px] w-full fxl:w-2/3 ml-auto">
            <RevealImage
              src={post.image || "/assets/hero.jpg"}
              alt={post.imageAlt || post.title}
              fill
              className="object-cover h-full"
            />
          </div>
        </div>
      </div>

      <div
        className="px-4 lg:w-[70%] lg:mx-auto my-20 text-lg wp-title wp-content text-blu/80"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {recent.length > 0 && (
        <div className="px-4 lg:px-6 my-20">
          <h2 className="text-blu text-3xl mb-10">Recent Posts</h2>
          <div className="grid lg:grid-cols-3 gap-6">
            {recent.map((p, i) => (
              <div key={i} className="w-full h-full">
                <Link href={`/blog/${p.slug}`} title={p.title}>
                  <figure>
                    <Image
                      src={p.image || "/assets/hero.jpg"}
                      width={461}
                      height={420}
                      alt={p.imageAlt || p.title}
                      className="object-cover w-full aspect-video"
                    />
                  </figure>
                </Link>

                <div className="flex flex-col justify-between mt-4">
                  <Link href={`/blog/${p.slug}`} title={p.title}>
                    <h3 className="pb-2 text-xl capitalize">{p.title}</h3>
                  </Link>
                  <div className="w-full h-[1px] bg-second/30"></div>
                  <div className="flex items-center justify-between w-full py-2">
                    <span className="text-blu/70">
                      {getDate(p?.date, locale === "it" ? "it-IT" : "en-US")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default PostPage;

export async function getStaticPaths() {
  const locales = ["it", "en"];
  const paths = locales.flatMap((locale) => {
    const posts = locale === "en" ? blogPostsEN.posts : blogPostsIT.posts;
    return posts.map((p) => ({ params: { slug: p.slug }, locale }));
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params, locale }) {
  const posts = locale === "en" ? blogPostsEN.posts : blogPostsIT.posts;
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return { notFound: true };
  const postIndex = posts.findIndex((p) => p.slug === params.slug);
  const alternatePosts = locale === "en" ? blogPostsIT.posts : blogPostsEN.posts;
  const alternateSlug = alternatePosts[postIndex]?.slug || null;

  const recent = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return {
    props: { post, recent, locale, alternateSlug },
    revalidate: 60,
  };
}
