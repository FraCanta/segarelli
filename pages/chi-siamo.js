import BlogSection from "@/components/blogSection/blogSection";
import CategoriesCarousel from "@/components/CategoriesCarousel/CategoriesCarousel";
import { MaskText } from "@/components/layout/MaskText";
import RevealImage from "@/components/layout/RevealImage";
import { getPagesByIds, getPosts, getTagId } from "@/utils/wordpress";
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { ParagraphText } from "@/components/layout/ParagraphText";
import SliderAppartamento from "@/components/SliderAppartamento/SliderAppartamento";

function ChiSiamo({ post }) {
  const gallery = [
    { src: "/assets/storia/4.jpg" },
    { src: "/assets/storia/5.jpg" },
    { src: "/assets/storia/6.jpg" },
    { src: "/assets/storia/7.jpg" },
    { src: "/assets/storia/8.jpg" },
    { src: "/assets/storia/9.jpg" },
  ];

  const gallery2 = [
    { src: "/assets/storia/10.jpg" },
    { src: "/assets/storia/11.jpg" },
    { src: "/assets/storia/12.jpg" },
    { src: "/assets/storia/13.jpg" },
    { src: "/assets/storia/14.jpg" },
    { src: "/assets/storia/15.jpg" },
    { src: "/assets/storia/16.jpg" },
    { src: "/assets/storia/17.jpg" },
    { src: "/assets/storia/18.jpg" },
  ];

  const gallery3 = [
    { src: "/assets/storia/19.jpg" },
    { src: "/assets/storia/20.jpg" },
    { src: "/assets/storia/21.jpg" },
    { src: "/assets/storia/22.jpg" },
    { src: "/assets/storia/23.jpg" },
    { src: "/assets/storia/24.jpg" },
    { src: "/assets/storia/25.jpg" },
    { src: "/assets/storia/26.jpg" },
  ];
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2, // 0.2s tra un'immagine e l'altra
        ease: [0.33, 1, 0.68, 1],
      },
    },
  };
  return (
    <div>
      <div className="min-h-[100svh] lg:min-h-screen  flex flex-col items-center  lg:py-10">
        <div className="text-center mt-20">
          <div className="py-16 lg:pt-32 lg:pb-16 h-full">
            <MaskText>
              <h1 className="text-blu text-base lg:text-[1.5rem] uppercase lg:p-4">
                chi siamo
              </h1>
            </MaskText>
            <MaskText>
              <h2 className="text-blu text-4xl sm:text-[2.5rem] xl:text-5xl 2xl:text-7xl text-center  leading-[1] py-2 overflow-hidden lg:max-w-5xl lg:mx-auto">
                Storia dell’ Agriturismo Segarelli
              </h2>
            </MaskText>
          </div>

          <div
            ref={ref}
            className="relative overflow-hidden flex px-4 lg:px-0 lg:w-[calc(100vw-3rem)] aspect-square lg:h-[800px]"
          >
            <motion.div
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              animate={
                inView
                  ? { clipPath: "inset(0 0 0% 0)" }
                  : { clipPath: "inset(0 0 100% 0)" }
              }
              transition={{
                duration: 1,
                ease: [0.33, 1, 0.68, 1],
              }}
              className="absolute inset-0"
            >
              <Image
                src="/assets/chisiamo_hero.jpg"
                alt="chi siamo"
                fill
                className=" object-cover object-top w-full h-full"
              />
            </motion.div>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto lg:my-20 lg:text-center px-4">
        <ParagraphText>
          Segarelli è un antico podere situato su una collina, circondato da
          campi coltivati e boschi, a 520 metri di altitudine. La costruzione
          del primo nucleo abitativo risale all´inizio del 1600 e la struttura
          attuale, la cui planimetria è riportata sulle mappe del catasto
          Leopoldino è senza dubbio antecedente al 1800. Il podere è stato
          ristrutturato più di 40 anni fa, ma ha mantenuto molte delle
          caratteristiche architettoniche originarie. Prima di allora Segarelli
          era il classico podere dove vivevano i contadini che lavoravano come
          mezzadri per una nobile famiglia del posto, i Bicocchi
        </ParagraphText>
      </div>

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="flex flex-col lg:flex-row justify-center gap-6 min-h-[80vh]  items-center px-4 lg:px-6 my-20"
      >
        <RevealImage
          src="/assets/storia/1.jpg"
          alt="Left"
          className="block flex-1 aspect-video"
        />

        <RevealImage
          src="/assets/storia/3.jpg"
          alt="Center"
          className="flex-1 aspect-video lg:aspect-square"
        />

        <RevealImage
          src="/assets/storia/2.jpg"
          alt="Right"
          className="block flex-1 aspect-video"
        />
      </motion.div>
      <div className="my-20 lg:text-center  px-4 flex flex-col gap-4">
        <MaskText>
          <h2 className="text-blu text-3xl 2xl:text-[46px] leading-[1.2]">
            Fine anni '30'
          </h2>
        </MaskText>
        <div className="max-w-6xl mx-auto ">
          <ParagraphText>
            Nel 1890 nacque tra queste mura il mio bisnonno paterno Luigi
            Fulceri e visse qui con la sua famiglia fino al 1938. Il caso ha
            voluto che lo stesso anno, il mio bisnonno materno Giovanni Cucini
            insieme a sua moglie Armida e i suoi figli Nello, Amato e Federigo
            si trasferissero qui a Segarelli. Con l’inizio della seconda guerra
            mondiale mio nonno Nello e i suoi fratelli vengono chiamati alle
            armi. Ancor prima che la guerra finisse i fratelli Amato e Federigo
            riescono a tornare a casa ma la trovano occupata da un avamposto
            tedesco e per questo sono costretti a nascondersi nei boschi dei
            dintorni di Segarelli. Mio nonno Nello invece viene catturato nel
            1943 e deportato a Mauthausen in Austria
          </ParagraphText>
        </div>
        <div className="my-20">
          {" "}
          <SliderAppartamento slides={gallery2} />
        </div>
      </div>
      <div className="my-20 lg:text-center bg-primary/10 py-20 flex flex-col gap-4 px-4">
        <MaskText>
          <h2 className="text-blu text-3xl 2xl:text-[46px] leading-[1.2]">
            Dopo la Seconda Guerra Mondiale
          </h2>
        </MaskText>
        <div className="max-w-6xl mx-auto">
          <ParagraphText>
            Finita la guerra riesce a tornare a casa e sposare la sua fidanza
            Bruna, una contadina che viveva non lontano da Segarelli insieme a
            sua sorella Rosa. Il 10 Ottobre del 1945 Nello sposa Bruna, Rosa
            sposa Amato e vengono a vivere tutti a Segarelli. Nel 1947 nasce mia
            madre Norma e rimane figlia e nipote unica per quasi 12 anni fino a
            che non nasce Donatella, la figlia dei miei prozii Amato e Rosa. Con
            il boom economico degli anni ’60, Amato e Federigo decidono di
            cercare una sicurezza economica e si trasferiscono nella provincia
            di Siena, a Colle Val d’Elsa, nel 1966. Ormai a Segarelli sono
            rimasti solo Nello, Bruna e Norma. Mia madre si fidanza nel 1962 con
            mio padre Enzo (amico di infanzia e vicino di casa). Si sposano nel
            1968 e anche loro decidono di rimanere a vivere a Segarelli. Però al
            casolare urge un restauro. Quindi per più di 40 anni, quando le
            condizioni economiche lo permettevano, la mia famiglia ha
            effettutato opere di restauro assicurandosi di rispettare lo stile e
            la tradizione di Segarelli e più in generale, della Toscana
          </ParagraphText>
        </div>
        <div className="my-20">
          {" "}
          <SliderAppartamento slides={gallery} />
        </div>
      </div>
      <div className="my-20 lg:text-center flex flex-col gap-4 px-4">
        <MaskText>
          <h2 className="text-blu text-3xl 2xl:text-[46px] leading-[1.2]">
            Oggi
          </h2>
        </MaskText>
        <div className="max-w-6xl mx-auto ">
          <ParagraphText>
            Nel 1979 nasco io, Luigi e insieme alla mia famiglia decidiamo, nel
            2008, di trasformare una parte di Segarelli in agriturismo che oggi
            gestisco con la mia compagna Luisa. Da allora chiunque sia venuto a
            trovarci ha potuto godere del verde e della tranquillità che ha
            sempre caratterizzato Segarelli, ha potuto conoscere e apprezzare la
            sua lunga e affascinante storia, conoscere la nostra famiglia e
            soprattuto gustare i prodotti della nostra terra. Pertanto ci tengo
            a dire che Segarelli per noi non è soltanto una residenza per
            vacanze estive ma è la casa che ha accolto la mia famiglia da più di
            un secolo e non è una cosa comune. Qui non solo vivono le mie radici
            ma anche un piccolo pezzetto di storia che ha contribuito a modo suo
            a creare la cultura del Territorio
          </ParagraphText>
        </div>
        <div className="my-20">
          {" "}
          <SliderAppartamento slides={gallery3} />
        </div>
      </div>
      <CategoriesCarousel />
      <div className=" w-full flex items-center py-8">
        {" "}
        <BlogSection post={post} />
      </div>
    </div>
  );
}

export default ChiSiamo;

export async function getStaticProps({ locale }) {
  const idLocale = await getTagId(locale); // recupera id della lingua attuale
  const post = await getPosts(idLocale); //recupera post nella lingua attuale
  const HOME_PAGE_IDS = [2248, 2026, 1997, 1957];
  const pages = await getPagesByIds(HOME_PAGE_IDS);
  return {
    props: {
      post: post.sort((a, b) => a?.date > b?.date).filter((el, i) => i < 3), //elimino i post per sideeffect
      // instagramPosts: posts,
      pages,
    },
    revalidate: 60,
  };
}
