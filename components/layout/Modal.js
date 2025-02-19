import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Modal({ content, onClose }) {
  return (
    <AnimatePresence>
      {content && (
        <motion.div
          className="fixed inset-0 bg-primary/50 backdrop-blur-sm z-20 flex items-end overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          onClick={onClose}
        >
          <motion.div
            className="w-full h-screen bg-white p-6 flex flex-col"
            initial={{ y: "100%" }}
            animate={{ y: 0, transition: { duration: 0.4, ease: "easeOut" } }}
            exit={{ y: "100%", transition: { duration: 0.3 } }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className=" text-primary bg-white flex justify-end sticky inset-0  w-full h-full"
              onClick={onClose}
            >
              ✖ Chiudi
            </button>
            <div className="mt-4">
              {content === "storia" && (
                <>
                  <img
                    src="/assets/segarelli.jpg"
                    alt="appartamenti"
                    className="rounded-lg w-full"
                  />
                  <div>
                    <h2>Ciccio</h2>
                  </div>
                </>
              )}
              {content === "appartamenti" && (
                <img
                  src="/assets/appartamenti.jpg"
                  alt="servizi"
                  className="rounded-lg"
                />
              )}
              {content === "toscana" && (
                <img
                  src="/assets/toscana.jpg"
                  alt="toscana"
                  className="rounded-lg"
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Modal;
