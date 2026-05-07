import CategoriesCarousel from "@/components/CategoriesCarousel/CategoriesCarousel";
import RevealImage from "@/components/layout/RevealImage";
import SectionBreak from "@/components/SectionBreak/SectionBreak";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useCookieConsent } from "@/components/CookieConsent/CookieBanner";
import ThirdPartyPlaceholder from "@/components/CookieConsent/ThirdPartyPlaceholder";
import dintorniIT from "../../public/locales/it/dintorni.json";
import dintorniEN from "../../public/locales/en/dintorni.json";
import dintorniPagesIT from "../../public/locales/it/dintorniPages.json";
import dintorniPagesEN from "../../public/locales/en/dintorniPages.json";
import Head from "next/head";

function DintorniPage({ pages, currentPage, translation }) {
  const { locale } = useRouter();
  const cookieConsent = useCookieConsent();

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    let lightbox;
    const initLightbox = async () => {
      const links = document.querySelectorAll(".wp-block-gallery a, .gallery a");
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
  }, [currentPage]);

  const cleanHtml = (html) => html?.replace(/(<([^>]+)>)/gi, "").trim() || "";
  const cleanTitle = cleanHtml(currentPage.title);
  const cleanDescription = cleanHtml(currentPage.excerpt || currentPage.content);
  const contentWithoutIframes = currentPage.content?.replace(
    /<iframe[\s\S]*?<\/iframe>/gi,
    "",
  );
  const iframeMatch = currentPage.content?.match(/<iframe[\s\S]*?<\/iframe>/i);

  return (
    <>
      <Head>
        <title>Agriturismo Segarelli | {cleanTitle}</title>
        <meta name="description" content={cleanDescription} />
        <meta property="og:title" content={cleanTitle} />
        <meta property="og:description" content={cleanDescription} />
        <meta property="og:image" content={currentPage.image} />
        <meta name="twitter:title" content={cleanTitle} />
        <meta name="twitter:description" content={cleanDescription} />
        <meta name="twitter:image" content={currentPage.image} />
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <div className="bg-primary/70 flex items-center px-4 lg:px-20 w-full min-h-[80svh]">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-end justify-between w-full mt-32 mb-10 gap-y-10">
          <h1
            className="max-w-3xl text-3xl md:text-5xl 2xl:text-6xl text-white leading-none capitalize"
            dangerouslySetInnerHTML={{ __html: currentPage.title }}
          />
          <div className="relative aspect-square xl:aspect-video h-auto xl:h-[400px] fxl:h-[500px] w-full fxl:w-2/3 ml-auto">
            <RevealImage
              fill
              className="object-cover h-full"
              src={currentPage.image}
              alt={currentPage.imageAlt || currentPage.title}
            />
          </div>
        </div>
      </div>

      <div
        className="px-4 lg:px-0 lg:w-[70%] mx-auto my-20 wp-content text-blu wp-title"
        dangerouslySetInnerHTML={{ __html: contentWithoutIframes }}
      />

      {iframeMatch && (
        <div className="px-4 lg:px-0 lg:w-[70%] mx-auto mb-20 wp-content">
          {cookieConsent?.thirdParty ? (
            <div dangerouslySetInnerHTML={{ __html: iframeMatch[0] }} />
          ) : (
            <ThirdPartyPlaceholder
              title={locale === "en" ? "Map blocked" : "Mappa bloccata"}
              description={
                locale === "en"
                  ? "Google Maps is a third-party service. Accept third-party services to view the route."
                  : "Google Maps e un servizio di terze parti. Accetta i servizi di terze parti per visualizzare il percorso."
              }
              buttonLabel={locale === "en" ? "Manage preferences" : "Gestisci preferenze"}
            />
          )}
        </div>
      )}

      <SectionBreak />

      <section className="my-20 px-6">
        <h2 className="text-primary text-center text-3xl lg:text-4xl 2xl:text-5xl mb-10">
          {locale === "en" ? "Discover More Nearby" : "Scopri anche nei dintorni"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {pages
          .filter((p) => p.slug !== currentPage.slug)
          .map((p) => (
            <Link href={`/dintorni/${p.slug}`} key={p.slug} className="group">
              <div className="relative aspect-video">
                <RevealImage
                  src={p.image}
                  alt={p.imageAlt || p.title}
                  fill
                  className="object-cover w-full h-full"
                />
              </div>
              <h3
                className="pt-2 text-xl capitalize"
                dangerouslySetInnerHTML={{ __html: p.title }}
              />
            </Link>
          ))}
        </div>
      </section>

      <SectionBreak />
      <CategoriesCarousel translation={translation} />
    </>
  );
}

export default DintorniPage;

export async function getStaticPaths() {
  const locales = ["it", "en"];
  const paths = locales.flatMap((locale) => {
    const pages = locale === "en" ? dintorniPagesEN.pages : dintorniPagesIT.pages;
    return pages.map((page) => ({
      params: { slug: page.slug },
      locale,
    }));
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params, locale }) {
  const pages = locale === "en" ? dintorniPagesEN.pages : dintorniPagesIT.pages;
  const currentPage = pages.find((p) => p.slug === params.slug);
  if (!currentPage) return { notFound: true };

  return {
    props: {
      pages,
      currentPage,
      translation: (locale === "en" ? dintorniEN : dintorniIT).dintorni,
    },
    revalidate: 60,
  };
}
