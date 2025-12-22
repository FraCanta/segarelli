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
import { ParagraphText } from "@/components/layout/ParagraphText";
import SliderAppartamento from "@/components/SliderAppartamento/SliderAppartamento";
import ButtonSecondary from "@/components/layout/ButtonSecondary";
import { Icon } from "@iconify/react";

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
              <h2 className="text-white text-4xl xl:text-5xl 2xl:text-7xl text-center  leading-[1] py-2 overflow-hidden  lg:max-w-xl mx-auto">
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
      {/* <div className="text-center max-w-3xl mx-auto my-16 px-4">
        <ParagraphText>{appartamento?.description}</ParagraphText>
      </div> */}

      {appartamento?.galleryPiano0 && (
        <div className="my-20 flex flex-col gap-20">
          <div className="flex flex-col gap-2 text-center">
            <MaskText>
              <h3 className="text-blu text-base lg:text-[1.2rem] uppercase">
                {appartamento.SezionePiano0.subTitle &&
                  appartamento.SezionePiano0.subTitle}
              </h3>
            </MaskText>
            <MaskText>
              <h2 className="text-blu text-3xl xl:text-5xl text-center  leading-[1] py-2 overflow-hidden  lg:max-w-xl mx-auto">
                {appartamento.SezionePiano0.title &&
                  appartamento.SezionePiano0.title}
              </h2>
            </MaskText>
            <div className="text-center max-w-3xl mx-auto px-4">
              <ParagraphText>
                {appartamento.SezionePiano0.description &&
                  appartamento.SezionePiano0.description}
              </ParagraphText>
            </div>
            <div className="w-full flex justify-center mt-10">
              <ButtonSecondary>Check Availability</ButtonSecondary>
            </div>
          </div>

          <SliderAppartamento slides={appartamento?.galleryPiano0} />
        </div>
      )}
      {appartamento?.galleryPiano1 && (
        <div className="my-20 flex flex-col gap-20  py-20 bg-primary/10">
          <div className="flex flex-col gap-2 text-center">
            <MaskText>
              <h3 className="text-blu text-base lg:text-[1.2rem] uppercase">
                {appartamento.SezionePiano1.subTitle &&
                  appartamento.SezionePiano1.subTitle}
              </h3>
            </MaskText>
            <MaskText>
              <h2 className="text-blu text-3xl xl:text-5xl text-center  leading-[1] py-2 overflow-hidden  lg:max-w-xl mx-auto">
                {appartamento.SezionePiano1.title &&
                  appartamento.SezionePiano1.title}
              </h2>
            </MaskText>
            <div className="text-center max-w-3xl mx-auto px-4">
              <ParagraphText>
                {appartamento.SezionePiano1.description &&
                  appartamento.SezionePiano1.description}
              </ParagraphText>
            </div>
            <div className="w-full flex justify-center mt-10">
              <ButtonSecondary>Check Availability</ButtonSecondary>
            </div>
          </div>
          <SliderAppartamento slides={appartamento?.galleryPiano1} />
        </div>
      )}
      <div className="my-20 px-4 lg:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <MaskText>
            <h2 className="text-blu text-3xl lg:text-5xl leading-[1.2]">
              {appartamento.titleAmeneties}
            </h2>
          </MaskText>
          <ParagraphText>{appartamento.size}</ParagraphText>
        </div>
        <div className="w-full flex items-center justify-center gap-8 max-w-3xl lg:gap-10 flex-wrap mt-10 lg:max-w-4xl mx-auto">
          {appartamento.amenetiesItems.map((item) => (
            <div key={item.name} className="flex items-center gap-2 text-blu">
              <Icon icon={item.icon} width={24} />
              <span className="uppercase">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
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
