import AccordionContatti from "@/components/Accordion/AccordionContatti";
import CategoriesCarousel from "@/components/CategoriesCarousel/CategoriesCarousel";
import SectionBreak from "@/components/SectionBreak/SectionBreak";
import { Icon } from "@iconify/react";
import React from "react";

function Contatti() {
  return (
    <div>
      <div className="my-20 lg:my-32 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-6 lg:p-10 flex flex-col gap-4">
          <h1 className="text-4xl lg:text-6xl  mb-6">
            Come raggiungerci e contattarci
          </h1>
          <p className="mb-4 text-blu text-lg lg:text-xl ">
            Via Podere Segarelli n°6, 56045 Pomarance – Pisa (Italy)
          </p>
          <p className="mb-4 text-blu text-lg lg:text-xl ">
            Luigi: +39 347 7447180
          </p>
          <p className="mb-4 text-blu text-lg lg:text-xl ">
            Coordinate GPS: Podere Segarelli, Pomarance N 43.25153° E 10.86636°
          </p>
          <AccordionContatti />
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2905.98057101759!2d10.86625!3d43.251829!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1329f6398dc1cb93%3A0xdc3344ec38b9bd12!2sAgriturismo%20Segarelli!5e0!3m2!1sen!2sus!4v1766761445966!5m2!1sen!2sus"
          width="600"
          height="850"
          style={{ border: "0" }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          className="!h-[650px]"
        ></iframe>
      </div>
      <SectionBreak />
      {/* WRAPPER FORM */}
      <div className="my-32 px-6 sm:px-10 max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-5xl my-10 text-center">
          Preferisci mandarci un messaggio?
        </h2>

        <form action="https://" method="POST" className="space-y-5">
          {/* NOME + COGNOME */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm  text-blu/80 uppercase"
              >
                Nome
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full p-2.5 border border-blu/60 mt-1 focus:outline-none focus:ring-1 focus:ring-primary/50"
                required
              />
            </div>

            <div>
              <label
                htmlFor="surname"
                className="block text-sm  text-blu/80 uppercase"
              >
                Cognome
              </label>
              <input
                type="text"
                id="surname"
                name="surname"
                className="w-full p-2.5 border border-blu/60 mt-1 focus:outline-none focus:ring-1 focus:ring-primary/50"
                required
              />
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label
              className="block text-sm  text-blu/80 uppercase"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-2.5 border border-blu/60 mt-1 focus:outline-none focus:ring-1 focus:ring-primary/50"
              required
            />
          </div>

          {/* APPARTAMENTO */}
          <div>
            <label
              className="block text-sm  text-blu/80 uppercase"
              htmlFor="apartment"
            >
              Appartamento
            </label>
            <select
              id="apartment"
              name="apartment"
              className="w-full p-2.5 border border-blu/60 mt-1 focus:outline-none focus:ring-1 focus:ring-primary/50"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Seleziona un appartamento
              </option>
              <option value="mare-aurora">Mare Aurora</option>
              <option value="residenza-oliva">Residenza Oliva</option>
              <option value="villa-luna">Villa Luna</option>
            </select>
          </div>

          {/* SUBJECT */}
          <div>
            <label
              className="block text-sm text-blu/80 uppercase"
              htmlFor="subject"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              className="w-full p-2.5 border border-blu/60 mt-1 focus:outline-none focus:ring-1 focus:ring-primary/50"
              required
            />
          </div>

          {/* MESSAGGIO */}
          <div>
            <label
              className="block text-sm text-blu/80 uppercase"
              htmlFor="message"
            >
              Messaggio
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="w-full p-2.5 border border-blu/60 mt-1 focus:outline-none focus:ring-1 focus:ring-primary/50"
              required
            ></textarea>
          </div>

          {/* CTA */}
          <button
            type="submit"
            className="px-8 py-4 bg-siena rounded-full text-white uppercase tracking-wide text-base w-full justify-center lg:max-w-max flex items-center gap-2"
          >
            <span className="split-hover flex flex-col justify-center relative">
              <span className="line line-normal block p-1">
                Invia richiesta
              </span>
              <span className="line line-hover block absolute top-0 left-0 w-full p-1">
                Invia richiesta
              </span>
            </span>
            <Icon icon="prime:arrow-up-right" width="24" height="24" />
          </button>
        </form>
      </div>
      <CategoriesCarousel />
    </div>
  );
}

export default Contatti;
