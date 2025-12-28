import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const accordionData = [
  {
    title: "Per chi arriva dal mare",
    content:
      "Uscire a Cecina e proseguire sulla ss 68 in direzione di Volterra per circa 30 km – Nel paese di Saline di Volterra, all´incrocio svoltare a destra, oltrepassare la ferrovia e proseguire in direzione di Pomarance per circa 10 km – Superare il paese di Pomarance proseguendo per circa 5 km in direzione di Larderello – 300 m prima del cartello di Montecerboli svoltare a destra e proseguire seguendo i cartelli dell´agriturismo per una strada in salita per circa 1 km – Mantenendosi sempre sulla strada principale si arriva all´agriturismo Segarelli.",
  },
  {
    title: "Per chi arriva dalla A1",
    content:
      " A Firenze Nord uscire dall´autostrada e prendere la superstrada Fi-Pi-Li in direzione di Pisa – Uscire a Pontedera e proseguire in direzione di Volterra – A Saline di Volterra, nel centro del paese svoltare a sinistra, oltrepassare la ferrovia, e proseguire in direzione di Pomarance per circa 10 km – Superare il paese di Pomarance proseguendo per circa 5 km in direzione di Larderello – 300 m prima del cartello di Montecerboli svoltare a destra e proseguire seguendo i cartelli dell´agriturismo per una strada in salita per circa 1 km – Mantenendosi sempre sulla strada principale si arriva all´agriturismo Segarelli.",
  },
];

export default function AccordionContatti() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="s-accordion w-full max-w-4xl mx-auto">
      {accordionData.map((item, index) => (
        <div key={index} className="accordion relative border-b border-blu/20">
          <div className="accordion-border absolute left-0 top-0 w-full h-full" />

          {/* Accordion Header */}
          <div
            className="accordion-header flex justify-between items-center cursor-pointer  py-4 transition-transform duration-300 hover:translate-x-2"
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
                className="accordion-body overflow-hidden  pb-4"
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
