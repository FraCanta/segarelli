import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";

function ButtonBook({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="fixed bottom-10 right-10 lg:hidden">
      <button
        className="px-10 py-2 bg-siena rounded-full text-white font-semibold text-base uppercase max-w-max flex items-center gap-2"
        onClick={() => setIsModalOpen(true)}
      >
        {children} <Icon icon="prime:arrow-up-right" width="24" height="24" />
      </button>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-primary/60 backdrop-blur-sm z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              className="relative w-[90vw] h-[90vh] bg-[#f8f6ec] rounded-2xl shadow-lg p-6 flex flex-col"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-primary bg-red-500 px-4 py-2 rounded-full"
                onClick={() => setIsModalOpen(false)}
              >
                ✖ Chiudi
              </button>
              <div className="flex-1 flex items-center justify-center">
                <p className="text-black text-lg">Questa è la tua modale!</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ButtonBook;
