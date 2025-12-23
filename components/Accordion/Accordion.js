import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const accordionData = [
  {
    title: "Cosa rende l'Agriturismo Segarelli unico?",
    content:
      "All’Agriturismo Segarelli troverete i suoni, i colori e i profumi tipici della campagna toscana. L’azzurro del cielo che si riflette nell’acqua della piscina, il verde del prato e del bosco che circonda tutto il podere, garantendo privacy e tranquillità; i caldi colori dei muri possenti, che già da soli raccontano la storia di questo posto, iniziata almeno dal 1680; il rosso intenso dei gerani, che Norma coltiva con molta cura.",
  },
  {
    title: "Quali attività sono disponibili nelle vicinanze?",
    content:
      "L’Agriturismo Segarelli si trova in una posizione strategica, nel cuore della Toscana: siamo a 30 minuti da Volterra, un’ora da Siena, poco più di un’ora da Pisa o da Lucca e un’ora e mezza da Firenze. In più, in mezz’ora arriverete sulla costa tanto cara agli Etruschi.",
  },
  {
    title: "La piscina è disponibile tutto l'anno?",
    content:
      "Purtroppo no. La piscina è aperta stagionalmente, generalmente da maggio a settembre, a seconda delle condizioni meteorologiche.",
  },
  {
    title: "Siete aperti tutto l'anno?",
    content:
      "Si certo! Lo sapevate che questo territorio è storicamente famoso per la geotermia? Qui, per riscaldarci, usiamo il vapore che viene anche usato per produrre energia elettrica. Quindi potete stare tranquilli, durante l’inverno qui si sta al calduccio. ",
  },
  {
    title: "Offrite opzioni di ristorazione in loco?",
    content:
      "Mangiare in agriturismo si può e a  noi di Segarelli fa sempre molto piacere! Potrete deliziare il vostro palato con i prodotti dell’orto, che si trova a poca distanza dal podere, e di cui Enzo è molto orgoglioso. E non potete perdervi le torte e altri dolci fatti in casa per la vostra colazione! Se avete bisogno di informazioni e/o volete prenotare, parlerete con Luisa e Luigi: per telefono, mail o social, come preferite. ",
  },
];

export default function Accordion() {
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
