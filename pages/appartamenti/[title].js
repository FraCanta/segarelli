import React from "react";
import appartamentiIT from "../../public/locales/it/appartamenti.json";
import appartamentiEN from "../../public/locales/en/appartamenti.json";
import Reviews from "@/components/Reviews";
import RevealImage from "@/components/layout/RevealImage";
import { MaskText } from "@/components/layout/MaskText";
import { getPagesByIds } from "@/utils/wordpress";
import AttivitaSection from "@/components/AttivitaSection/AttivitaSection";
import CategoriesCarousel from "@/components/CategoriesCarousel/CategoriesCarousel";
import SectionBreak from "@/components/SectionBreak/SectionBreak";

const AppartamentoPage = ({ appartamento, pages }) => {
  console.log("appartamento:", appartamento);
  return (
    <>
      <div className="min-h-[100svh] lg:min-h-screen bg-primary/60 flex flex-col items-center  lg:py-10">
        <div className="text-center mt-20">
          <div className="py-16 lg:py-32 h-full">
            <MaskText>
              <h1 className="text-white text-base lg:text-[2rem] uppercase lg:p-4">
                {appartamento.name}
              </h1>
            </MaskText>
            <MaskText>
              <h2 className="text-white text-5xl lg:text-[96px] leading-[1.2]  lg:max-w-3xl mx-auto">
                {appartamento?.title}
              </h2>
            </MaskText>
          </div>

          <div className="relative px-4 lg:px-0 lg:w-[calc(100vw-3rem)] aspect-square lg:h-[800px]  ">
            <RevealImage
              src={appartamento.img}
              alt={appartamento.name}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
      <div className="h-screen">Dettagli dell'appartamento + gallery</div>
      <SectionBreak />
      <Reviews />
      <AttivitaSection pages={pages} />

      <CategoriesCarousel />
    </>
  );
};

export default AppartamentoPage;

export async function getStaticProps({ params, locale }) {
  const HOME_PAGE_IDS = [2248, 2026, 1997, 1957];
  const pages = await getPagesByIds(HOME_PAGE_IDS);

  const obj = locale === "en" ? appartamentiEN : appartamentiIT;

  const apartments = obj?.appartamenti?.singleApartment || {};
  const targetObj = apartments[params.title];

  if (!targetObj) {
    return { notFound: true };
  }

  const others = Object.keys(apartments)
    .filter((el) => el !== params.title)
    .map((el) => ({
      name: apartments[el].name,
      img: apartments[el].img,
      link: el,
    }));

  return {
    props: {
      appartamento: targetObj,
      pages,
    },
  };
}

export async function getStaticPaths({ locale }) {
  let obj;

  switch (locale) {
    case "it":
      obj = appartamentiIT;
      break;
    case "en":
      obj = appartamentiEN;
      break;
    default:
      obj = appartamentiIT;
  }

  const apartments = Object.keys(obj?.appartamenti?.singleApartment || {});

  const paths = apartments.map((el) => ({
    params: { title: el },
    locale,
  }));

  return {
    paths,
    fallback: false,
  };
}
