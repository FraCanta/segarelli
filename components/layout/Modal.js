import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

function Modal({ content, onClose }) {
  return (
    // <AnimatePresence>
    //   {content && (
    //     <motion.div
    //       className="fixed inset-0 bg-primary/50 backdrop-blur-sm z-20 flex items-center justify-center"
    //       initial={{ opacity: 0 }}
    //       animate={{ opacity: 1 }}
    //       exit={{ opacity: 0, transition: { duration: 0.3 } }}
    //       onClick={onClose}
    //     >
    //       <motion.div
    //         className="w-full h-screen bg-white flex flex-col"
    //         initial={{ y: "100%" }}
    //         animate={{ y: 0, transition: { duration: 0.4, ease: "easeOut" } }}
    //         exit={{ y: "100%", transition: { duration: 0.3 } }}
    //         onClick={(e) => e.stopPropagation()}
    //       >
    //         {/* Bottone di chiusura */}
    //         <div className="p-4 bg-white sticky top-0 z-10 flex justify-end ">
    //           <button className="text-primary text-lg" onClick={onClose}>
    //             chiudi x
    //           </button>
    //         </div>

    //         {/* Wrapper scrollabile */}
    //         <div className="overflow-y-auto">
    //           {content === "storia" && (
    //             <div className="w-[95%] mx-auto">
    //               <img
    //                 src="/assets/segarelli.jpg"
    //                 alt="appartamenti"
    //                 className="rounded-lg w-full"
    //               />
    //               <h2 className="mt-4 text-xl font-semibold">Ciccio</h2>
    //             </div>
    //           )}
    //           {content === "appartamenti" && (
    //             <img
    //               src="/assets/appartamenti.jpg"
    //               alt="servizi"
    //               className="rounded-lg w-full"
    //             />
    //           )}
    //           {content === "toscana" && (
    //             <img
    //               src="/assets/toscana.jpg"
    //               alt="toscana"
    //               className="rounded-lg w-full"
    //             />
    //           )}
    //         </div>
    //       </motion.div>
    //     </motion.div>
    //   )}
    // </AnimatePresence>
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-2xl w-full h-3/4 overflow-auto">
        <button
          className="absolute top-4 right-4 text-primary"
          onClick={onClose}
        >
          X
        </button>
        <h2 className="text-xl font-semibold mb-4">Titolo Modal</h2>
        <div className="modal-content">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
            amet felis ac augue luctus pharetra. Nulla facilisi. Sed eget nulla
            sit amet ante ultricies gravida non eget orci.
          </p>
          {/* Puoi aggiungere molto altro contenuto per vedere come diventa scrollabile */}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
            amet felis ac augue luctus pharetra. Nulla facilisi. Sed eget nulla
            sit amet ante ultricies gravida non eget orci.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
            amet felis ac augue luctus pharetra. Nulla facilisi. Sed eget nulla
            sit amet ante ultricies gravida non eget orci.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
            amet felis ac augue luctus pharetra. Nulla facilisi. Sed eget nulla
            sit amet ante ultricies gravida non eget orci.
          </p>
          {/* Puoi aggiungere molto altro contenuto per vedere come diventa scrollabile */}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
            amet felis ac augue luctus pharetra. Nulla facilisi. Sed eget nulla
            sit amet ante ultricies gravida non eget orci.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
            amet felis ac augue luctus pharetra. Nulla facilisi. Sed eget nulla
            sit amet ante ultricies gravida non eget orci.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
            amet felis ac augue luctus pharetra. Nulla facilisi. Sed eget nulla
            sit amet ante ultricies gravida non eget orci.
          </p>
          {/* Puoi aggiungere molto altro contenuto per vedere come diventa scrollabile */}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
            amet felis ac augue luctus pharetra. Nulla facilisi. Sed eget nulla
            sit amet ante ultricies gravida non eget orci.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
            amet felis ac augue luctus pharetra. Nulla facilisi. Sed eget nulla
            sit amet ante ultricies gravida non eget orci.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
            amet felis ac augue luctus pharetra. Nulla facilisi. Sed eget nulla
            sit amet ante ultricies gravida non eget orci.
          </p>
          {/* Puoi aggiungere molto altro contenuto per vedere come diventa scrollabile */}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
            amet felis ac augue luctus pharetra. Nulla facilisi. Sed eget nulla
            sit amet ante ultricies gravida non eget orci.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
            amet felis ac augue luctus pharetra. Nulla facilisi. Sed eget nulla
            sit amet ante ultricies gravida non eget orci.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
            amet felis ac augue luctus pharetra. Nulla facilisi. Sed eget nulla
            sit amet ante ultricies gravida non eget orci.
          </p>
          {/* Puoi aggiungere molto altro contenuto per vedere come diventa scrollabile */}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
            amet felis ac augue luctus pharetra. Nulla facilisi. Sed eget nulla
            sit amet ante ultricies gravida non eget orci.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
            amet felis ac augue luctus pharetra. Nulla facilisi. Sed eget nulla
            sit amet ante ultricies gravida non eget orci.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
            amet felis ac augue luctus pharetra. Nulla facilisi. Sed eget nulla
            sit amet ante ultricies gravida non eget orci.
          </p>
          {/* Puoi aggiungere molto altro contenuto per vedere come diventa scrollabile */}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
            amet felis ac augue luctus pharetra. Nulla facilisi. Sed eget nulla
            sit amet ante ultricies gravida non eget orci.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
            amet felis ac augue luctus pharetra. Nulla facilisi. Sed eget nulla
            sit amet ante ultricies gravida non eget orci.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
            amet felis ac augue luctus pharetra. Nulla facilisi. Sed eget nulla
            sit amet ante ultricies gravida non eget orci.
          </p>
          {/* Puoi aggiungere molto altro contenuto per vedere come diventa scrollabile */}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
            amet felis ac augue luctus pharetra. Nulla facilisi. Sed eget nulla
            sit amet ante ultricies gravida non eget orci.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
            amet felis ac augue luctus pharetra. Nulla facilisi. Sed eget nulla
            sit amet ante ultricies gravida non eget orci.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Modal;
