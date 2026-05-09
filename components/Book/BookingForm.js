import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import AirDatepicker from "air-datepicker";
import "air-datepicker/air-datepicker.css";
import localeIt from "air-datepicker/locale/it";
import localeEn from "air-datepicker/locale/en";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";

const APARTMENT_OPTIONS = [
  { value: "acacia", label: "Acacia" },
  { value: "edera", label: "Edera" },
  { value: "gelsomino", label: "Gelsomino" },
];

const normalizeApartment = (value = "") => {
  const normalized = value.toString().trim().toLowerCase();
  return APARTMENT_OPTIONS.some((opt) => opt.value === normalized)
    ? normalized
    : "";
};

export default function BookingForm({ lang = "it", apartmentName = "" }) {
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
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [apartment, setApartment] = useState(normalizeApartment(apartmentName));
  const [blockedDates, setBlockedDates] = useState([]);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [availabilityLoading, setAvailabilityLoading] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const blockedDatesRef = useRef(new Set());

  const formatDateKey = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  /* Datepicker setup */
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    setCheckInDate(today);
    setCheckOutDate(tomorrow);

    dpInRef.current = new AirDatepicker(checkInRef.current, {
      minDate: today,
      selectedDates: [today],
      locale,
      autoClose: true,
      onRenderCell({ date, cellType }) {
        if (cellType !== "day") return;
        const key = formatDateKey(date);
        if (blockedDatesRef.current.has(key)) {
          return {
            disabled: true,
            classes: "air-date-blocked",
            attrs: {
              title: lang === "it" ? "Non disponibile" : "Unavailable",
            },
          };
        }
      },
      onSelect({ date }) {
        if (!date) return;
        const nextDay = new Date(date);
        nextDay.setDate(nextDay.getDate() + 1);
        setCheckInDate(date);
        setCheckOutDate(nextDay);
        dpOutRef.current.update({ minDate: nextDay });
        dpOutRef.current.selectDate(nextDay);
      },
    });

    dpOutRef.current = new AirDatepicker(checkOutRef.current, {
      minDate: tomorrow,
      selectedDates: [tomorrow],
      locale,
      autoClose: true,
      onSelect({ date }) {
        if (!date) return;
        setCheckOutDate(date);
      },
      onRenderCell({ date, cellType }) {
        if (cellType !== "day") return;
        const key = formatDateKey(date);
        if (blockedDatesRef.current.has(key)) {
          return {
            disabled: true,
            classes: "air-date-blocked",
            attrs: {
              title: lang === "it" ? "Non disponibile" : "Unavailable",
            },
          };
        }
      },
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

  useEffect(() => {
    setApartment(normalizeApartment(apartmentName));
  }, [apartmentName]);

  useEffect(() => {
    blockedDatesRef.current = new Set(blockedDates);
    dpInRef.current?.update({});
    dpOutRef.current?.update({});
  }, [blockedDates]);

  useEffect(() => {
    if (!apartment) {
      setBlockedDates([]);
      setAvailabilityLoading(false);
      return;
    }

    const loadAvailability = async () => {
      setAvailabilityLoading(true);
      try {
        const res = await fetch(`/api/availability?apartment=${apartment}`);
        if (!res.ok) {
          setBlockedDates([]);
          return;
        }
        const data = await res.json();
        setBlockedDates(Array.isArray(data?.blockedDates) ? data.blockedDates : []);
      } catch (error) {
        setBlockedDates([]);
      } finally {
        setAvailabilityLoading(false);
      }
    };

    loadAvailability();
  }, [apartment]);

  const increment = (type) => {
    if (type === "adults") setAdults((p) => p + 1);
    if (type === "children") setChildren((p) => p + 1);
  };

  const decrement = (type) => {
    if (type === "adults") setAdults((p) => Math.max(1, p - 1));
    if (type === "children") setChildren((p) => Math.max(0, p - 1));
  };

  const hasBlockedDateInStay = () => {
    if (!checkInDate || !checkOutDate) return false;

    const cursor = new Date(checkInDate);
    cursor.setHours(0, 0, 0, 0);

    const end = new Date(checkOutDate);
    end.setHours(0, 0, 0, 0);

    while (cursor < end) {
      if (blockedDatesRef.current.has(formatDateKey(cursor))) {
        return true;
      }
      cursor.setDate(cursor.getDate() + 1);
    }

    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const submittedEmail = (formData.get("booking_email") || "")
      .toString()
      .trim();

    if (!apartment) {
      toast.error(
        lang === "it"
          ? "Seleziona l'appartamento"
          : "Select the apartment",
      );
      return;
    }

    if (hasBlockedDateInStay()) {
      toast.error(
        lang === "it"
          ? "Le date selezionate includono giorni non disponibili"
          : "The selected stay includes unavailable dates",
      );
      return;
    }

    if (!submittedEmail) {
      toast.error(
        lang === "it" ? "Inserisci un'email valida" : "Enter a valid email",
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
          apartment,
          notes,
          email: submittedEmail,
          privacyConsent,
          lang, // <- aggiungi la lingua qui
        }),
      });

      const data = await res.json();
      if (res.ok && data.message) {
        toast.success(
          lang === "it" ? "Prenotazione inviata!" : "Request sent!",
        );
        setAdults(1);
        setChildren(0);
        setNotes("");
        setEmail("");
        setFirstName("");
        setPhone("");
        setPrivacyConsent(false);
        setApartment(normalizeApartment(apartmentName));
      } else {
        toast.error(data?.error || (lang === "it" ? "Errore nell'invio" : "Error sending booking"));
      }
    } catch (error) {
      toast.error(lang === "it" ? "Errore di connessione" : "Connection error");
    }
  };

  return (
    <form className="flex flex-col gap-6 mb-8" onSubmit={handleSubmit}>
      {/* Apartment */}
      <div>
        <label className="text-md font-medium mb-2 text-primary normal-case">
          {lang === "it" ? "Appartamento" : "Apartment"}
        </label>
        <select
          value={apartment}
          onChange={(e) => setApartment(e.target.value)}
          className="w-full border border-blu/20 p-2 air-input"
          required
        >
          <option value="">
            {lang === "it"
              ? "Seleziona appartamento"
              : "Select apartment"}
          </option>
          {APARTMENT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {apartment && (
        <p className="text-sm text-blu/60 -mt-4">
          {availabilityLoading
            ? lang === "it"
              ? "Caricamento disponibilità..."
              : "Loading availability..."
            : blockedDates.length > 0
              ? lang === "it"
                ? "Le date non disponibili sono evidenziate in rosso."
                : "Unavailable dates are highlighted in red."
              : lang === "it"
                ? "Nessuna data non disponibile ricevuta per questo appartamento."
                : "No unavailable dates received for this apartment."}
        </p>
      )}

      <div className="w-full bg-primary/30 h-[0.1px]" />

      {/* Date pickers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <div>
          <label className="text-md font-medium mb-2 text-primary normal-case">
            {lang === "it" ? "Data di arrivo" : "Check-in Date"}
          </label>
          <div
            className="flex items-center border border-blu/20 px-2 cursor-pointer"
            onClick={() => dpInRef.current?.show()}
          >
            <input
              ref={checkInRef}
              className="flex-1 py-2 air-input cursor-pointer"
              readOnly
            />
            <Icon icon="clarity:calendar-line" width="18" />
          </div>
        </div>

        <div>
          <label className="text-md font-medium mb-2 text-primary normal-case">
            {lang === "it" ? "Data di partenza" : "Check-out Date"}
          </label>
          <div
            className="flex items-center border border-blu/20 px-2 cursor-pointer"
            onClick={() => dpOutRef.current?.show()}
          >
            <input
              ref={checkOutRef}
              className="flex-1 py-2 air-input cursor-pointer"
              readOnly
            />
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
              name="booking_email"
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

      <label className="flex items-start gap-3 text-sm text-blu/70">
        <input
          type="checkbox"
          checked={privacyConsent}
          onChange={(e) => setPrivacyConsent(e.target.checked)}
          className="mt-1 h-4 w-4 accent-primary"
          required
        />
        <span>
          {lang === "it" ? (
            <>
              Acconsento al trattamento dei dati personali inviati tramite
              questo form per ricevere risposta alla mia richiesta di
              prenotazione, ai sensi del GDPR. Ho letto la{" "}
              <Link href="/privacy-policy" className="underline">
                Privacy Policy
              </Link>
              .*
            </>
          ) : (
            <>
              I consent to the processing of the personal data submitted through
              this form in order to receive a reply to my booking request, in
              accordance with the GDPR. I have read the{" "}
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
        disabled={!privacyConsent}
        className="px-6 py-4 bg-siena rounded-full text-white uppercase flex justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {lang === "it" ? "Prenota" : "Book"}
        <Icon icon="prime:arrow-up-right" width="24" />
      </button>
    </form>
  );
}
