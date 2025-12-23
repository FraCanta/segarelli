import CategoriesCarousel from "@/components/CategoriesCarousel/CategoriesCarousel";
import RevealImage from "@/components/layout/RevealImage";
import SectionBreak from "@/components/SectionBreak/SectionBreak";
import { getPagesByIds } from "@/utils/wordpress";
import Link from "next/link";
import React, { useEffect } from "react";
import "glightbox/dist/css/glightbox.css";

function DintorniPage({ pages, currentPage }) {
  useEffect(() => {
    let lightbox;

    const initLightbox = async () => {
      if (typeof window === "undefined") return;

      const GLightbox = (await import("glightbox")).default;
      await import("glightbox/dist/css/glightbox.css");

      const links = document.querySelectorAll(".wp-block-gallery a");
      if (!links.length) return;

      links.forEach((link) => {
        link.classList.add("glightbox");
      });

      lightbox = GLightbox({
        selector: ".wp-block-gallery a",
        loop: true,
        touchNavigation: true,
      });
    };

    initLightbox();

    return () => {
      if (lightbox) lightbox.destroy();
    };
  }, [pages]);

  return (
    <>
      <div className=" bg-primary/70 flex items-center px-4 lg:px-20 w-full min-h-[80svh]">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-end justify-between w-full mt-32 mb-10 gap-y-10">
          <h1
            className="max-w-3xl text-3xl md:text-5xl 2xl:text-6xl text-white leading-none capitalize"
            dangerouslySetInnerHTML={{ __html: currentPage.title }}
          />
          <div className="relative aspect-square xl:aspect-video h-auto xl:h-[400px]  fxl:h-[500px] w-full fxl:w-2/3  ml-auto">
            <RevealImage
              fill
              className="object-cover h-full"
              src={currentPage.image}
              alt={currentPage.alt}
            />
          </div>
        </div>
      </div>

      <div
        className="px-4 lg:px-0 lg:w-[70%] mx-auto my-20 wp-content text-blu wp-title"
        dangerouslySetInnerHTML={{
          __html: currentPage.content,
        }}
      />

      <section className="my-20 grid grid-cols-1 md:grid-cols-3 gap-10 px-6">
        {pages
          .filter((p) => p.id !== currentPage.id) // esclude la pagina corrente
          .map((p) => (
            <Link href={`/dintorni/${p.slug}`} key={p.id} className="group">
              <div>
                <RevealImage
                  src={p.image}
                  alt={p.alt}
                  fill
                  className="object-cover w-full aspect-video"
                />
              </div>

              <h3
                className="pt-2 text-xl capitalize"
                dangerouslySetInnerHTML={{ __html: p.title }}
              />
            </Link>
          ))}
      </section>

      <SectionBreak />
      <CategoriesCarousel />
    </>
  );
}

export default DintorniPage;

export async function getStaticPaths() {
  const PAGE_IDS = [2248, 2026, 1997, 1957];
  const pages = await getPagesByIds(PAGE_IDS);

  const paths = pages.map((page) => ({
    params: { slug: page.slug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params, locale }) {
  const PAGE_IDS = [2248, 2026, 1997, 1957];
  const pages = await getPagesByIds(PAGE_IDS);

  const currentPage = pages.find((p) => p.slug === params.slug);

  if (!currentPage) {
    return { notFound: true };
  }

  return {
    props: {
      pages,
      currentPage,
      lang: locale,
    },
    revalidate: 60,
  };
}
