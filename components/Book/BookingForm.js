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
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  // Datepicker setup
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
    if (type === "adults") setAdults((prev) => prev + 1);
    if (type === "children") setChildren((prev) => prev + 1);
  };

  const decrement = (type) => {
    if (type === "adults") setAdults((prev) => Math.max(1, prev - 1));
    if (type === "children") setChildren((prev) => Math.max(0, prev - 1));
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
          lastName,
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
        // reset form
        setAdults(1);
        setChildren(0);
        setNotes("");
        setEmail("");
      } else {
        alert(lang === "it" ? "Errore nell'invio" : "Error sending booking");
      }
    } catch (error) {
      console.error(error);
      alert(lang === "it" ? "Errore nella connessione" : "Connection error");
    }
  };

  return (
    <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
      {/* Date Pickers */}
      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="text-lg font-medium text-primary mb-1 normal-case text-left">
            {lang === "it" ? "Data di arrivo" : "Check-in Date"}
          </label>
          <div className="flex items-center justify-between border border-blu/20 px-2 text-blu">
            <input
              ref={checkInRef}
              className="flex-1 air-input py-2 focus:outline-none"
              placeholder={
                lang === "it" ? "Seleziona una data" : "Select a date"
              }
            />
            <Icon
              icon="clarity:calendar-line"
              width="18"
              height="18"
              className="text-blu"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-medium text-primary mb-1 normal-case text-left">
            {lang === "it" ? "Data di partenza" : "Check-out Date"}
          </label>
          <div className="flex items-center justify-between border border-blu/20 px-2 text-blu">
            <input
              ref={checkOutRef}
              className="flex-1 air-input py-2 focus:outline-none"
              placeholder={
                lang === "it" ? "Seleziona una data" : "Select a date"
              }
            />
            <Icon
              icon="clarity:calendar-line"
              width="18"
              height="18"
              className="text-blu"
            />
          </div>
        </div>
      </div>

      {/* Guests Picker */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-lg text-blu font-medium">
            {lang === "it" ? "Adulti" : "Adults"}
          </span>
          <div className="flex items-center gap-2 border border-blu/20 text-blu px-2">
            <button
              type="button"
              onClick={() => decrement("adults")}
              className="text-lg p-1"
            >
              <Icon icon="mdi-light:minus" width="20px" height="20px" />
            </button>
            <span className="w-6 text-center">{adults}</span>
            <button
              type="button"
              onClick={() => increment("adults")}
              className="text-lg p-1"
            >
              <Icon icon="mdi-light:plus" width="20px" height="20px" />
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg text-blu font-medium">
            {lang === "it" ? "Bambini" : "Children"}
          </span>
          <div className="flex items-center gap-2 border border-blu/20 text-blu px-2">
            <button
              type="button"
              onClick={() => decrement("children")}
              className="text-lg p-1"
            >
              <Icon icon="mdi-light:minus" width="20px" height="20px" />
            </button>
            <span className="w-6 text-center">{children}</span>
            <button
              type="button"
              onClick={() => increment("children")}
              className="text-lg p-1"
            >
              <Icon icon="mdi-light:plus" width="20px" height="20px" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        {/* Nome */}
        <div className="flex flex-col">
          <label className="text-lg font-medium text-primary mb-1">
            {lang === "it" ? "Nome" : "First Name"}
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border border-blu/20 p-2 focus:outline-none focus:ring-1 focus:ring-blu/50 air-input"
            placeholder={
              lang === "it" ? "Inserisci il nome" : "Enter first name"
            }
            required
          />
        </div>
        {/* Cognome */}
        <div className="flex flex-col">
          <label className="text-lg font-medium text-primary mb-1">
            {lang === "it" ? "Cognome" : "Last Name"}
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border border-blu/20 p-2 focus:outline-none focus:ring-1 focus:ring-blu/50 air-input"
            placeholder={
              lang === "it" ? "Inserisci il cognome" : "Enter last name"
            }
            required
          />
        </div>
      </div>
      <div className="flex gap-2">
        {/* Telefono */}
        <div className="flex flex-col">
          <label className="text-lg font-medium text-primary mb-1">
            {lang === "it" ? "Telefono" : "Phone"}
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border border-blu/20 p-2 focus:outline-none focus:ring-1 focus:ring-blu/50 air-input"
            placeholder={
              lang === "it"
                ? "Inserisci il numero di telefono"
                : "Enter phone number"
            }
            required
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-lg font-medium text-primary mb-1 normal-case text-left">
            {lang === "it" ? "Email" : "Email"}
          </label>
          <input
            type="email"
            className="border border-blu/20 p-2 text-blu focus:outline-none focus:ring-1 focus:ring-blu/50 air-input"
            placeholder={
              lang === "it" ? "Inserisci la tua email" : "Enter your email"
            }
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>
      {/* Notes */}
      <div className="flex flex-col">
        <label className="text-lg font-medium text-primary mb-1 normal-case text-left">
          {lang === "it" ? "Note" : "Notes"}
        </label>
        <textarea
          className="border border-blu/20 p-2 text-blu focus:outline-none focus:ring-1 focus:ring-blu/50 air-input"
          placeholder={
            lang === "it" ? "Inserisci eventuali note..." : "Enter any notes..."
          }
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="px-6 py-4 lg:px-6 lg:py-3 2xl:px-8 2xl:py-4 bg-siena rounded-full text-white uppercase tracking-wide xl:text-sm 2xl:text-base w-full justify-center lg:max-w-max flex items-center gap-2"
      >
        <span className="split-hover flex flex-col justify-center relative">
          <span className="line line-normal block p-1">
            {lang === "it" ? "Prenota" : "Book"}
          </span>
          <span className="line line-hover block absolute top-0 left-0 w-full p-1">
            {lang === "it" ? "Prenota" : "Book"}
          </span>
        </span>
        <Icon icon="prime:arrow-up-right" width="24" height="24" />
      </button>
    </form>
  );
}
