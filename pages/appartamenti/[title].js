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
import Accordion from "@/components/Accordion/Accordion";

const AppartamentoPage = ({ appartamento, pages }) => {
  console.log("appartamento:", appartamento);
  return (
    <>
      <div className="min-h-[100svh] lg:min-h-screen  flex flex-col items-center  lg:py-10">
        <div className="text-center mt-20">
          <div className="py-16 lg:py-32 h-full">
            <MaskText>
              <h1 className="text-blu text-base lg:text-[1.5rem] uppercase lg:p-4">
                {appartamento.name}
              </h1>
            </MaskText>
            <MaskText>
              <h2 className="text-blu text-4xl sm:text-[2.5rem] xl:text-5xl 2xl:text-7xl text-center  leading-[1] py-2 overflow-hidden lg:max-w-xl lg:mx-auto">
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
      <div className="my-0 mb-20 lg:my-32 px-4 lg:px-6 grid lg:grid-cols-2 gap-20 lg:gap-10 max-w-[1400px] fxl:max-w-[1600px] mx-auto">
        <div className="lg:py-4">
          <div>
            <MaskText>
              <h2 className="text-blu text-3xl lg:text-4xl 2xl:text-5xl leading-[1.2]">
                {appartamento.titleAmeneties}
              </h2>
            </MaskText>
            <ParagraphText>{appartamento.size}</ParagraphText>
          </div>
          <div className="w-full flex items-start justify-start gap-x-10 gap-y-5 lg:gap-10 max-w-max flex-wrap mt-10 lg:max-w-2xl">
            {appartamento.amenetiesItems.map((item) => (
              <div key={item.name} className="flex items-center gap-2 text-blu">
                <Icon icon={item.icon} width={24} />
                <span className="text-lg">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className=" flex flex-col gap-6 bg-primary/10 p-6 ">
          <div className="flex flex-wrap w-full gap-4 justify-between items-center">
            {" "}
            <MaskText>
              <h2 className="text-blu text-3xl lg:text-4xl 2xl:text-5xl ">
                {appartamento.prezzi.title}
              </h2>
            </MaskText>
            <ButtonSecondary>Prenota </ButtonSecondary>
          </div>

          <div className="grid gap-6 mt-6">
            {appartamento.prezzi.list.map((item, index) => (
              <div
                key={index}
                className="border border-primary/60 p-4 flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-5 2xl:gap-10"
              >
                <div>
                  <MaskText>
                    <h3 className="text-blu uppercase text-lg 2xl:text-xl">
                      {item.name}
                    </h3>
                  </MaskText>
                  <p className="text-blu/70 text-sm">{item.period}</p>
                </div>
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-2 2xl:gap-4 mt-2 lg:mt-0 text-blu">
                  <div>
                    <span className="uppercase text-sm 2xl:text-base">
                      {item.nightTitle}:
                    </span>{" "}
                    {item.price}
                  </div>
                  <div>
                    <span className="uppercase text-sm 2xl:text-base">
                      {item.weekTitle}:
                    </span>{" "}
                    {item.weekPrice}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {appartamento?.galleryPiano0 && (
        <div className="my-20 flex flex-col gap-20 py-20  bg-primary/10 ">
          <div className="flex flex-col gap-2 text-center px-4">
            <MaskText>
              <h3 className="text-blu text-base 2xl:text-[1.2rem] uppercase">
                {appartamento.SezionePiano0.subTitle &&
                  appartamento.SezionePiano0.subTitle}
              </h3>
            </MaskText>
            <MaskText>
              <h2 className="text-blu text-3xl lg:text-4xl 2xl:text-5xl text-center  lg:leading-[1] py-2 overflow-hidden  lg:max-w-xl mx-auto">
                {appartamento.SezionePiano0.title &&
                  appartamento.SezionePiano0.title}
              </h2>
            </MaskText>
            <div className="text-center max-w-3xl mx-auto ">
              <ParagraphText>
                {appartamento.SezionePiano0.description &&
                  appartamento.SezionePiano0.description}
              </ParagraphText>
            </div>
            <div className="w-full flex justify-center mt-10 px-4">
              <ButtonSecondary>Check Availability</ButtonSecondary>
            </div>
          </div>

          <SliderAppartamento slides={appartamento?.galleryPiano0} />
        </div>
      )}
      {appartamento?.galleryPiano1 && (
        <div className="my-20 flex flex-col gap-20  ">
          <div className="flex flex-col gap-2 text-center px-4">
            <MaskText>
              <h3 className="text-blu text-base 2xl:text-[1.2rem] uppercase">
                {appartamento.SezionePiano1.subTitle &&
                  appartamento.SezionePiano1.subTitle}
              </h3>
            </MaskText>
            <MaskText>
              <h2 className="text-blu text-3xl lg:text-4xl 2xl:text-5xl text-center  lg:leading-[1] py-2 overflow-hidden  lg:max-w-xl mx-auto">
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
      <SectionBreak />
      <div className="flex flex-col gap-20 py-20  px-4">
        <MaskText>
          <h2 className="text-blu text-3xl lg:text-4xl 2xl:text-5xl text-center  lg:leading-[1] py-2 overflow-hidden  lg:max-w-xl mx-auto">
            Informazioni utili
          </h2>
        </MaskText>
        <Accordion />
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

export async function getStaticPaths() {
  const locales = ["it", "en"];

  const paths = locales.flatMap((locale) => {
    const obj = locale === "en" ? appartamentiEN : appartamentiIT;

    const apartments = Object.keys(obj?.appartamenti?.singleApartment || {});

    return apartments.map((title) => ({
      params: { title },
      locale,
    }));
  });

  return {
    paths,
    fallback: false,
  };
}
