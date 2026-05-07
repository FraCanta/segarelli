import { useState } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";

function ContattiForm({ lang = "it" }) {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    apartment: "",
    subject: "",
    message: "",
    privacyConsent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/contatti", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, lang }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Errore invio form");

      // Reset form e mostra messaggio
      setFormData({
        name: "",
        surname: "",
        email: "",
        apartment: "",
        subject: "",
        message: "",
        privacyConsent: false,
      });
      setShowThankYou(true);

      // Nascondi messaggio dopo 5 secondi
      setTimeout(() => setShowThankYou(false), 3000);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-32 px-6 sm:px-10">
      <AnimatePresence mode="wait">
        {showThankYou ? (
          <motion.div
            key="thankyou"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="text-center py-20 bg-blu/10 rounded-xl"
          >
            <h2 className="text-3xl sm:text-5xl mb-4">
              {lang === "it"
                ? "Grazie per averci contattati"
                : "Thank you for contacting us"}
            </h2>
            <p className="text-lg sm:text-xl">
              {lang === "it"
                ? "Risponderemo alla tua richiesta il prima possibile."
                : "We will get back to you as soon as possible."}
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* NOME + COGNOME */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm text-primary uppercase"
                >
                  {lang === "it" ? "Nome" : "First Name"}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-blu/30 mt-1 focus:outline-none focus:ring-1 focus:ring-primary/30"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="surname"
                  className="block text-sm text-primary uppercase"
                >
                  {lang === "it" ? "Cognome" : "Last Name"}
                </label>
                <input
                  type="text"
                  id="surname"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-blu/30 mt-1 focus:outline-none focus:ring-1 focus:ring-primary/30"
                  required
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm text-primary uppercase"
              >
                {lang === "it" ? "Email" : "Email"}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2.5 border border-blu/30 mt-1 focus:outline-none focus:ring-1 focus:ring-primary/30"
                required
              />
            </div>

            {/* APPARTAMENTO */}
            <div>
              <label
                htmlFor="apartment"
                className="block text-sm text-primary uppercase"
              >
                {lang === "it"
                  ? "Appartamento di interesse"
                  : "Apartment of interest"}
              </label>
              <select
                id="apartment"
                name="apartment"
                value={formData.apartment}
                onChange={handleChange}
                className="w-full p-2.5 border border-blu/30 mt-1 focus:outline-none focus:ring-1 focus:ring-primary/50"
                required
              >
                <option value="" disabled>
                  {lang === "it"
                    ? "Seleziona un appartamento"
                    : "Select an apartment"}
                </option>
                <option value="acacia">Acacia</option>
                <option value="edera">Edera</option>
                <option value="gelsomino">Gelsomino</option>
              </select>
            </div>

            {/* SUBJECT */}
            <div>
              <label
                htmlFor="subject"
                className="block text-sm text-primary uppercase"
              >
                {lang === "it" ? "Oggetto" : "Subject"}
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-2.5 border border-blu/30 mt-1 focus:outline-none focus:ring-1 focus:ring-primary/30"
                required
              />
            </div>

            {/* MESSAGGIO */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm text-primary uppercase"
              >
                {lang === "it" ? "Messaggio" : "Message"}
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full p-2.5 border border-blu/30 mt-1 focus:outline-none focus:ring-1 focus:ring-primary/50"
                required
              />
            </div>

            <label className="flex items-start gap-3 text-sm text-blu/70">
              <input
                type="checkbox"
                name="privacyConsent"
                checked={formData.privacyConsent}
                onChange={handleChange}
                className="mt-1 h-4 w-4 accent-primary"
                required
              />
              <span>
                {lang === "it"
                  ? "Acconsento al trattamento dei dati personali inviati tramite questo form per ricevere risposta alla mia richiesta.*"
                  : "I consent to the processing of the personal data submitted through this form in order to receive a reply to my request.*"}
              </span>
            </label>

            {/* CTA */}
            <button
              type="submit"
              disabled={isSubmitting || !formData.privacyConsent}
              className="px-8 py-4 bg-siena rounded-full text-white uppercase tracking-wide text-base w-full flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                lang === "it" ? (
                  "Invio in corso..."
                ) : (
                  "Sending..."
                )
              ) : (
                <>
                  <span className="split-hover flex flex-col justify-center relative">
                    <span className="line line-normal block p-1">
                      {lang === "it" ? "Invia richiesta" : "Submit Request"}
                    </span>
                    <span className="line line-hover block absolute top-0 left-0 w-full p-1">
                      {lang === "it" ? "Invia richiesta" : "Submit Request"}
                    </span>
                  </span>
                  <Icon icon="prime:arrow-up-right" width="24" height="24" />
                </>
              )}
            </button>

            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ContattiForm;
