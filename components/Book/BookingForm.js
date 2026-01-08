import React, { useEffect, useRef, useState } from "react";
import AirDatepicker from "air-datepicker";
import "air-datepicker/air-datepicker.css";
import localeIt from "air-datepicker/locale/it";
import localeEn from "air-datepicker/locale/en";
import { Icon } from "@iconify/react";

export default function BookingForm({ lang = "it" }) {
  const checkInRef = useRef(null);
  const checkOutRef = useRef(null);
  const dpInRef = useRef(null);
  const dpOutRef = useRef(null);

  const locale = lang === "it" ? localeIt : localeEn;

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [notes, setNotes] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [contactOpen, setContactOpen] = useState(false);

  /* Datepicker setup */
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    dpInRef.current = new AirDatepicker(checkInRef.current, {
      minDate: today,
      selectedDates: [today],
      locale,
      autoClose: true,
      onSelect({ date }) {
        if (!date) return;
        const nextDay = new Date(date);
        nextDay.setDate(nextDay.getDate() + 1);
        dpOutRef.current.update({ minDate: nextDay });
        dpOutRef.current.selectDate(nextDay);
      },
    });

    dpOutRef.current = new AirDatepicker(checkOutRef.current, {
      minDate: tomorrow,
      selectedDates: [tomorrow],
      locale,
      autoClose: true,
    });

    return () => {
      dpInRef.current?.destroy();
      dpOutRef.current?.destroy();
    };
  }, []);

  useEffect(() => {
    dpInRef.current?.update({ locale });
    dpOutRef.current?.update({ locale });
  }, [lang]);

  const increment = (type) => {
    if (type === "adults") setAdults((p) => p + 1);
    if (type === "children") setChildren((p) => p + 1);
  };

  const decrement = (type) => {
    if (type === "adults") setAdults((p) => Math.max(1, p - 1));
    if (type === "children") setChildren((p) => Math.max(0, p - 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      alert(
        lang === "it" ? "Inserisci un'email valida" : "Enter a valid email"
      );
      return;
    }

    try {
      const res = await fetch("/api/bookingMailer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          phone,
          checkIn: checkInRef.current.value,
          checkOut: checkOutRef.current.value,
          adults,
          children,
          notes,
          email,
        }),
      });

      const data = await res.json();
      if (data.message) {
        alert(lang === "it" ? "Prenotazione inviata!" : "Booking sent!");
        setAdults(1);
        setChildren(0);
        setNotes("");
        setEmail("");
        setFirstName("");
        setPhone("");
      } else {
        alert(lang === "it" ? "Errore nell'invio" : "Error sending booking");
      }
    } catch (error) {
      alert(lang === "it" ? "Errore di connessione" : "Connection error");
    }
  };

  return (
    <form className="flex flex-col gap-6 mb-8" onSubmit={handleSubmit}>
      {/* Date pickers */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-md font-medium mb-2 text-primary normal-case">
            {lang === "it" ? "Data di arrivo" : "Check-in Date"}
          </label>
          <div className="flex items-center border border-blu/20 px-2">
            <input ref={checkInRef} className="flex-1 py-2 air-input" />
            <Icon icon="clarity:calendar-line" width="18" />
          </div>
        </div>

        <div>
          <label className="text-md font-medium mb-2 text-primary normal-case">
            {lang === "it" ? "Data di partenza" : "Check-out Date"}
          </label>
          <div className="flex items-center border border-blu/20 px-2">
            <input ref={checkOutRef} className="flex-1 py-2 air-input" />
            <Icon icon="clarity:calendar-line" width="18" />
          </div>
        </div>
      </div>
      <div className="w-full bg-primary/30 h-[0.1px]" />
      {/* Guests */}
      <div className="space-y-6">
        {[
          {
            key: "adults",
            labelIt: "Adulti",
            labelEn: "Adults",
            value: adults,
          },
          {
            key: "children",
            labelIt: "Bambini",
            labelEn: "Children",
            value: children,
          },
        ].map((item) => (
          <div key={item.key} className="flex justify-between">
            <label className="text-md font-medium normal-case text-primary">
              {lang === "it" ? item.labelIt : item.labelEn}
            </label>
            <div className="flex items-center gap-2 border border-blu/20 px-2">
              <button type="button" onClick={() => decrement(item.key)}>
                <Icon icon="mdi-light:minus" width="20" />
              </button>
              <span className="w-6 text-center">{item.value}</span>
              <button type="button" onClick={() => increment(item.key)}>
                <Icon icon="mdi-light:plus" width="20" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full bg-primary/30 h-[0.1px]" />

      {/* ACCORDION – DATI CONTATTO */}
      <div className="">
        <button
          type="button"
          onClick={() => setContactOpen(!contactOpen)}
          className="w-full flex items-center justify-between py-3 text-left"
        >
          <div>
            <p className="font-medium text-primary text-md">
              {lang === "it" ? "Dati di contatto*" : "Contact details*"}
            </p>
            <p className="text-sm text-blu/60">
              {lang === "it"
                ? "Servono solo per ricontattarti e confermare la richiesta"
                : "Used only to contact you and confirm the request"}
            </p>
          </div>
          <Icon
            icon="mdi:chevron-down"
            className={`transition-transform text-blu/80 ${
              contactOpen ? "rotate-180" : ""
            }`}
            width="24"
          />
        </button>

        {contactOpen && (
          <div className="py-4 flex flex-col gap-4">
            <input
              type="text"
              placeholder={lang === "it" ? "Nome e cognome*" : "Full name*"}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="border border-blu/20 p-2 air-input"
            />

            <input
              type="tel"
              placeholder={lang === "it" ? "Telefono*" : "Phone*"}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="border border-blu/20 p-2 air-input"
            />

            <input
              type="email"
              placeholder="Email*"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-blu/20 p-2 air-input"
            />
          </div>
        )}
      </div>

      {/* Notes */}
      <textarea
        className="border border-blu/20 p-2 air-input"
        placeholder={lang === "it" ? "Note..." : "Notes..."}
        rows={4}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      {/* Submit */}
      <button
        type="submit"
        className="px-6 py-4 bg-siena rounded-full text-white uppercase flex justify-center gap-2"
      >
        {lang === "it" ? "Prenota" : "Book"}
        <Icon icon="prime:arrow-up-right" width="24" />
      </button>
    </form>
  );
}
