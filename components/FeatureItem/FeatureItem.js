import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

function FeatureItem({ title, src, desktopOnly = false }) {
  return (
    <div
      className={`flex flex-col items-center ${
        desktopOnly ? "hidden lg:flex" : ""
      }`}
    >
      <motion.figure
        className="w-20 h-20 sm:w-24 sm:h-24 relative sm:mb-4"
        initial={{ scale: 0, opacity: 0 }} // parte da 0
        whileInView={{ scale: 1, opacity: 1 }} // scala a 1 quando entra in viewport
        viewport={{ once: true, amount: 0.3 }} // anima solo la prima volta, 30% visibile
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Image
          src={src}
          alt={title.join(" ")}
          fill
          className="object-contain"
        />
      </motion.figure>

      <div className="text-center">
        {title.map((line, i) => (
          <div key={i} className="block">
            <div className="inline-block lg:text-lg lg:-mt-6">{line}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeatureItem;
