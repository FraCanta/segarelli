import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getDate } from "@/utils/utils";
import { Icon } from "@iconify/react";
import RevealImage from "../layout/RevealImage";

export default function PostSection({ post, featuredMedia, locale }) {
  const [minutiLettura, setMinutiLettura] = useState(0);

  useEffect(() => {
    const testoSenzaTag = post?.content?.rendered.replace(/(<([^>]+)>)/gi, "");
    const parole = testoSenzaTag
      .split(" ")
      .filter((p) => p.trim() !== "").length;
    setMinutiLettura(Math.ceil(parole / 250));
  }, [post]);

  const imageUrl =
    featuredMedia?.["media_details"]?.sizes?.full?.["source_url"] ||
    "/assets/hero.jpg";

  return (
    <div className="flex flex-col w-full h-[350px] lg:h-auto ">
      {/* contenitore flessibile verticale che occupa tutta l’altezza */}
      <div className="flex flex-col h-full justify-between overflow-hidden ">
        {/* Immagine */}
        <Link href={`/blog/${post?.slug}`} title={post?.title?.rendered}>
          <figure className="flex-shrink-0">
            <RevealImage
              src={imageUrl}
              width={461}
              height={420}
              alt={featuredMedia?.alt_text || "Don't Call It Blog"}
              className="w-full h-[240px] md:h-[350px] lg:h-[375px] 3xl:h-[380px] object-cover"
              priority
              quality={70}
            />
          </figure>
        </Link>

        {/* Titolo */}
        <div className="flex-grow flex flex-col justify-between pt-4">
          <Link href={`/blog/${post?.slug}`} title={post?.title?.rendered}>
            <h3
              className="text-blu hover:underline text-xl  lg:text-[20px] leading-[120%] transition-all 3xl:text-3xl"
              dangerouslySetInnerHTML={{ __html: post?.title?.rendered }}
            />
          </Link>

          {/* Footer info */}
          <div className="flex items-center w-full pt-4">
            <span className="text-blu/70">
              {getDate(post?.date, locale === "it" ? "it-IT" : "en-US")}
            </span>
            <span className="w-[0.3rem] h-[0.3rem] bg-blu/70 rounded-full mx-2"></span>
            <span className="text-blu/70 flex">{minutiLettura} min read</span>
          </div>
        </div>
      </div>
    </div>
  );
}
