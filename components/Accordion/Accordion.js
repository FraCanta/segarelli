import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Accordion({ translation }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="s-accordion w-full max-w-4xl mx-auto">
      {translation.map((item, index) => (
        <div key={index} className="accordion relative border-b border-blu/20">
          <div className="accordion-border absolute left-0 top-0 w-full h-full" />

          {/* Accordion Header */}
          <div
            className="accordion-header flex justify-between items-center cursor-pointer px-4 py-4 transition-transform duration-300 hover:translate-x-2"
            onClick={() => toggleAccordion(index)}
          >
            <h4 className="accordion-title split-text text-blu text-xl ">
              <div className="line line1">
                <div className="line-inner">{item.title}</div>
              </div>
            </h4>
            {/* Toggle + / − con linee */}
            <span className="accordion-toggle relative w-3 h-2 flex items-center justify-center">
              <motion.span
                className="block absolute w-full h-[2px] bg-blu/80"
                animate={{
                  rotate: openIndex === index ? 0 : 90, // linea verticale diventa orizzontale
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="block absolute w-full h-[2px] bg-blu/80"
                animate={{
                  rotate: 0, // linea orizzontale sempre fissa
                }}
                transition={{ duration: 0.3 }}
              />
            </span>
          </div>

          {/* Accordion Body */}
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="accordion-body overflow-hidden px-4 pb-4"
              >
                <div className="accordion-text text-blu/80 text-base">
                  <p>{item.content}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
