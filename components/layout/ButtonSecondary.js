import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";

function ButtonSecondary({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="px-10 py-4 bg-siena rounded-full text-white uppercase font-semibold text-[12px] lg:text-base  max-w-max flex items-center gap-2"
        onClick={() => setIsOpen(true)}
      >
        {children}
        <Icon icon="prime:arrow-up-right" width="24" height="24" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-primary/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="fixed top-0 right-0 h-full w-[90vw] md:w-[500px] bg-[#f8f6ec] z-50 shadow-xl flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-siena bg-red-500 px-4 py-2 rounded-full"
                onClick={() => setIsOpen(false)}
              >
                ✖ Chiudi
              </button>

              <div className="flex-1 flex items-center justify-center">
                <p className="text-black text-lg">
                  Questo è un drawer che scivola da destra
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default ButtonSecondary;
