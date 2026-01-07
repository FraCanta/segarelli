import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import BookingForm from "../Book/BookingForm";

function ButtonSecondary({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("sleep");
  const { locale } = useRouter();

  return (
    <>
      <button
        className="px-6 py-4 lg:px-6 lg:py-3 2xl:px-8 2xl:py-4 bg-siena rounded-full text-white uppercase tracking-wide xl:text-sm 2xl:text-base w-full justify-center lg:max-w-max flex items-center gap-2"
        onClick={() => setIsOpen(true)}
      >
        {" "}
        <span className="split-hover flex flex-col justify-center relative">
          {" "}
          <span className="line line-normal block p-1">{children}</span>{" "}
          <span className="line line-hover block absolute top-0 left-0 w-full p-1">
            {" "}
            {children}{" "}
          </span>{" "}
        </span>{" "}
        <Icon icon="prime:arrow-up-right" width="24" height="24" />{" "}
      </button>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-blu/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className="fixed top-0 right-0 h-full w-full md:w-[500px] bg-[#f8f6ec] z-50 shadow-xl flex flex-col overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="absolute top-6 lg:top-10 w-full">
                <div className="mx-4 lg:mx-6 flex items-center justify-between ">
                  {/* ------- TABS ------- */}
                  <div className="flex gap-3  ">
                    <button
                      onClick={() => setActiveTab("sleep")}
                      className={`px-4 py-2 uppercase tracking-wide text-sm ${
                        activeTab === "sleep"
                          ? "text-blu border rounded-full border-blu"
                          : "text-blu/50  border rounded-full border-blu/50"
                      }`}
                    >
                      Sleep
                    </button>

                    <button
                      onClick={() => setActiveTab("eat")}
                      className={`px-4 py-2 uppercase tracking-wide text-sm ${
                        activeTab === "eat"
                          ? "text-blu border rounded-full border-blu"
                          : "text-blu/50  border rounded-full border-blu/50"
                      }`}
                    >
                      Eat
                    </button>
                  </div>
                  <button className="text-blu" onClick={() => setIsOpen(false)}>
                    <Icon
                      icon="material-symbols-light:close-rounded"
                      width="32"
                      height="32"
                    />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="mt-24 lg:mt-32 mx-4 lg:mx-6">
                {/* ------- TAB CONTENT ------- */}
                {activeTab === "sleep" && (
                  <>
                    <div className="text-3xl normal-case mb-8 text-left">
                      <h2>
                        {locale === "it"
                          ? "Richiesta di Prenotazione"
                          : "Booking"}
                      </h2>
                    </div>
                    <BookingForm
                      range={true}
                      lang={locale === "it" ? "it" : "en"}
                    />
                  </>
                )}

                {activeTab === "eat" && (
                  <div className="text-gray-500 italic">
                    (Contenuto Eat — placeholder per ora)
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default ButtonSecondary;
