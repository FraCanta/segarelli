import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getDate } from "@/utils/utils";
import { Icon } from "@iconify/react";

export default function PostSection({ post, featuredMedia }) {
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
    <div className="flex flex-col w-full h-auto fxl:h-[380px]  ">
      {/* contenitore flessibile verticale che occupa tutta l’altezza */}
      <div className="flex flex-col h-full justify-between overflow-hidden ">
        {/* Immagine */}
        <Link href={`/posts/${post?.slug}`} title={post?.title?.rendered}>
          <figure className="flex-shrink-0">
            <Image
              src={imageUrl}
              width={461}
              height={420}
              alt={featuredMedia?.alt_text || "Don't Call It Blog"}
              className="w-full h-[240px] md:h-[350px] lg:h-[300px] 3xl:h-[380px] object-cover"
              priority
              quality={70}
            />
          </figure>
        </Link>

        {/* Titolo */}
        <div className="flex-grow flex flex-col justify-between pt-4">
          <Link href={`/posts/${post?.slug}`} title={post?.title?.rendered}>
            <h3
              className="text-blu hover:underline text-base  lg:text-[22px] leading-[120%] transition-all 3xl:text-3xl"
              dangerouslySetInnerHTML={{ __html: post?.title?.rendered }}
            />
          </Link>

          {/* Footer info */}
          <div className="flex items-center  w-full pt-2">
            <small className="text-blu/60 text-xs md:text-[2.5vw] xl:text-base 2xl:text-[0.8vw]  3xl:text-2xl">
              {getDate(post?.date)}
            </small>

            <div className="flex items-center text-blu/60 text-md md:text-[2.5vw] xl:text-base 2xl:text-[0.8vw] 3xl:text-lg  ml-6">
              <span className="text-blu/60 text-xs md:text-[2.5vw] xl:text-base 2xl:text-[0.8vw]  3xl:text-2xl flex ">
                &bull; {minutiLettura}min read
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
