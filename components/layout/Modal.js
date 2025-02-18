import React from "react";
import { motion, AnimatePresence } from "framer-motion";

function Modal({ content, onClose }) {
  return (
    <AnimatePresence>
      {content && (
        <motion.div
          className="fixed inset-0 bg-primary/50 backdrop-blur-sm z-20 flex items-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          onClick={onClose}
        >
          <motion.div
            className="w-full h-screen bg-white p-6 flex flex-col overflow-y-auto"
            initial={{ y: "100%" }}
            animate={{ y: 0, transition: { duration: 0.4, ease: "easeOut" } }}
            exit={{ y: "100%", transition: { duration: 0.3 } }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-primary bg-gray-300 px-4 py-2 rounded-full"
              onClick={onClose}
            >
              ✖ Chiudi
            </button>
            <div className="mt-10">
              <h2 className="text-xl font-semibold">{content}</h2>
              <p className="mt-4 text-gray-700">
                Questo è il contenuto della modale per "{content}".
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Modal;
