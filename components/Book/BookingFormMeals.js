import React, { useState } from "react";

export default function BookingFormMeals({ lang = "it" }) {
  // stato iniziale del form
  const initialForm = {
    name: "",
    surname: "",
    phone: "",
    breakfast: false,
    notes: "",
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
      "_blank"
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

      {/* Submit */}
      <button
        type="submit"
        className="mt-4 px-6 py-3 bg-siena text-white rounded-full uppercase tracking-wide"
      >
        {lang === "it" ? "Prenota pasto" : "Book meal"}
      </button>
    </form>
  );
}
