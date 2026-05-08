import React, { useState } from "react";
import Link from "next/link";

export default function BookingFormMeals({ lang = "it" }) {
  // stato iniziale del form
  const initialForm = {
    name: "",
    surname: "",
    phone: "",
    breakfast: false,
    notes: "",
    privacyConsent: false,
  };
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const phone = "393477447180"; // numero WhatsApp
    const message = `
Prenotazione pasto:
Nome: ${form.name} ${form.surname}
Telefono: ${form.phone}
Colazione: ${form.breakfast ? "Yes" : "No"}
Note: ${form.notes || "-"}
`;

    // apre WhatsApp
    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      "_blank",
    );

    // resetta tutti i campi del form
    setForm(initialForm);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-blu">
      {/* Dati cliente */}
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder={lang === "it" ? "Nome" : "First Name"}
        className="border border-blu/20 px-2 py-2 air-input"
        required
      />
      <input
        type="text"
        name="surname"
        value={form.surname}
        onChange={handleChange}
        placeholder={lang === "it" ? "Cognome" : "Last Name"}
        className="border border-blu/20 px-2 py-2 air-input"
        required
      />

      <input
        type="tel"
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder={lang === "it" ? "Telefono" : "Phone"}
        className="border border-blu/20 px-2 py-2 air-input"
        required
      />

      {/* Checkbox Colazione */}
      <div className="flex items-center gap-2 mt-2">
        <input
          type="checkbox"
          name="breakfast"
          checked={form.breakfast}
          onChange={handleChange}
          className="w-5 h-5 accent-primary"
        />
        <span className="text-lg text-blu/60">
          {lang === "it" ? "Colazione" : "Breakfast"}
        </span>
      </div>

      {/* Note opzionali */}
      <textarea
        name="notes"
        value={form.notes}
        onChange={handleChange}
        placeholder={
          lang === "it"
            ? "Note ( segnalazioni, intolleranze alimentari ed altre comunicazioni )"
            : "Notes (allergies, dietary restrictions, and other information)"
        }
        className="border border-blu/20 px-2 py-2 air-input"
        rows={3}
      />

      <label className="flex items-start gap-3 text-sm text-blu/70">
        <input
          type="checkbox"
          name="privacyConsent"
          checked={form.privacyConsent}
          onChange={handleChange}
          className="mt-1 h-4 w-4 accent-primary"
          required
        />
        <span>
          {lang === "it" ? (
            <>
              Acconsento al trattamento dei dati personali inviati tramite
              questo form per gestire la richiesta pasto, ai sensi del GDPR. Ho
              letto la{" "}
              <Link href="/privacy-policy" className="underline">
                Privacy Policy
              </Link>
              .*
            </>
          ) : (
            <>
              I consent to the processing of the personal data submitted through
              this form in order to manage my meal request, in accordance with
              the GDPR. I have read the{" "}
              <Link href="/privacy-policy" className="underline">
                Privacy Policy
              </Link>
              .*
            </>
          )}
        </span>
      </label>

      {/* Submit */}
      <button
        type="submit"
        disabled={!form.privacyConsent}
        className="mt-4 px-6 py-3 bg-siena text-white rounded-full uppercase tracking-wide disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {lang === "it" ? "Prenota pasto" : "Book meal"}
      </button>
    </form>
  );
}
