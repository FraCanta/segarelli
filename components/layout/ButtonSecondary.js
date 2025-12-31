import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";

function ButtonSecondary({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="px-6 py-4 lg:px-6 lg:py-3 2xl:px-8 2xl:py-4 bg-siena rounded-full text-white uppercase tracking-wide xl:text-sm 2xl:text-base w-full justify-center lg:max-w-max flex items-center gap-2"
        onClick={() => setIsOpen(true)}
      >
        <span className="split-hover flex flex-col justify-center relative">
          <span className="line line-normal block p-1">{children}</span>
          <span className="line line-hover block absolute top-0 left-0 w-full p-1">
            {children}
          </span>
        </span>
        <Icon icon="prime:arrow-up-right" width="24" height="24" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-blu/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="fixed top-0 right-0 h-full w-full md:w-[500px] bg-[#f8f6ec] z-50 shadow-xl flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-blu   rounded-full"
                onClick={() => setIsOpen(false)}
              >
                <Icon
                  icon="material-symbols-light:close-rounded"
                  width="32px"
                  height="32px"
                />
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
