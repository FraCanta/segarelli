import AccordionContatti from "@/components/Accordion/AccordionContatti";
import ContattiForm from "@/components/Book/ContattiForm";
import CategoriesCarousel from "@/components/CategoriesCarousel/CategoriesCarousel";
import SectionBreak from "@/components/SectionBreak/SectionBreak";
import { Icon } from "@iconify/react";
import React, { useState } from "react";
import contattiIT from "../public/locales/it/contatti.json";
import contattiEN from "../public/locales/en/contatti.json";
import { useRouter } from "next/router";
import Head from "next/head";

function Contatti({ translation }) {
  const { locale, pathname } = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    apartment: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState(null); // 'success', 'error', null
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/contatti", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Errore invio form");

      setStatus("success");
      setFormData({
        name: "",
        surname: "",
        email: "",
        apartment: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Head>
        <title>{translation.head.title}</title>
        <meta name="description" content={translation.head.description} />
        <meta name="keywords" content={translation.head.keywords} />
        <meta name="robots" content={translation.head.robots} />
        <link rel="canonical" href={translation.head.canonical} />

        {/* Open Graph */}
        <meta property="og:title" content={translation.head.og.title} />
        <meta
          property="og:description"
          content={translation.head.og.description}
        />
        <meta property="og:type" content={translation.head.og.type} />
        <meta property="og:url" content={translation.head.og.url} />
        <meta property="og:image" content={translation.head.og.image} />
        <meta property="og:site_name" content={translation.head.og.site_name} />

        {/* Twitter Card */}
        <meta name="twitter:card" content={translation.head.twitter.card} />
        <meta name="twitter:title" content={translation.head.twitter.title} />
        <meta
          name="twitter:description"
          content={translation.head.twitter.description}
        />
        <meta name="twitter:image" content={translation.head.twitter.image} />

        {/* Favicon */}
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />

        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@graph": [
                translation.head.schema.organization,
                translation.head.schema.website,
              ],
            }),
          }}
        />
      </Head>
      <div className="my-20 lg:my-32 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-6 lg:p-10 flex flex-col gap-4">
          <h1 className="text-4xl lg:text-5xl  mb-6">{translation.title}</h1>
          <div className="flex gap-4">
            <Icon
              icon="jam:map-marker-f"
              width="28px"
              height="28px"
              className="text-siena"
            />
            <div className="flex flex-col gap-2">
              <h3 className="text-primary text-xl font-bold leading-none">
                {translation.address}
              </h3>
              <p className="mb-4 text-blu/80 text-base">
                Via Podere Segarelli n°6, 56045 Pomarance – Pisa (Italy)
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Icon
              icon="majesticons:phone"
              width="28px"
              height="28px"
              className="text-siena"
            />
            <div className="flex flex-col gap-2">
              <h3 className="text-primary text-xl font-bold leading-none">
                {translation.phone}
              </h3>
              <p className="mb-4 text-blu/80 text-base">
                Luigi: +39 347 7447180
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Icon
              icon="tabler:gps-filled"
              width="28px"
              height="28px"
              className="text-siena"
            />
            <div className="flex flex-col gap-2">
              <h3 className="text-primary text-xl font-bold leading-none">
                {translation.gps}
              </h3>
              <p className="mb-4 text-blu/80 text-base">
                Podere Segarelli, Pomarance N 43.25153° E 10.86636°
              </p>
            </div>
          </div>

          <AccordionContatti translation={translation} />
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21151.126956936132!2d10.855290149752639!3d43.25177972877499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1329f6398dc1cb93%3A0xdc3344ec38b9bd12!2sAgriturismo%20Segarelli!5e0!3m2!1sen!2sus!4v1774551309711!5m2!1sen!2sus"
          width="600"
          height="850"
          style={{ border: "0" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="!h-[650px] grayscale hover:grayscale-0 transition-all duration-700"
        ></iframe>
      </div>

      <SectionBreak />

      {/* FORM */}
      <ContattiForm lang={locale === "it" ? "it" : "en"} />

      <CategoriesCarousel translation={translation} />
    </div>
  );
}

export default Contatti;

export async function getStaticProps({ locale }) {
  let obj;
  switch (locale) {
    case "it":
      obj = contattiIT;
      break;
    case "en":
      obj = contattiEN;
      break;
    default:
      obj = contattiIT;
      break;
  }
  return {
    props: {
      translation: obj?.contatti,
    },
    revalidate: 60,
  };
}
