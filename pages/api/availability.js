const APARTMENT_TO_ENV = {
  acacia: "AIRBNB_ICAL_ACACIA",
  edera: "AIRBNB_ICAL_EDERA",
  gelsomino: "AIRBNB_ICAL_GELSOMINO",
};

const formatDateKey = (date) => {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const parseIcsDate = (raw) => {
  // Supports values like 20260507 or 20260507T120000Z
  const clean = raw.trim();
  const y = Number(clean.slice(0, 4));
  const m = Number(clean.slice(4, 6));
  const d = Number(clean.slice(6, 8));
  if (!y || !m || !d) return null;
  return new Date(Date.UTC(y, m - 1, d));
};

const extractBlockedDates = (icsText) => {
  const blocked = new Set();
  const events = icsText.split("BEGIN:VEVENT").slice(1);

  for (const event of events) {
    const dtStartLine = event
      .split("\n")
      .find((line) => line.startsWith("DTSTART"));
    const dtEndLine = event
      .split("\n")
      .find((line) => line.startsWith("DTEND"));

    if (!dtStartLine || !dtEndLine) continue;

    const rawStart = dtStartLine.split(":")[1] || "";
    const rawEnd = dtEndLine.split(":")[1] || "";
    const start = parseIcsDate(rawStart);
    const end = parseIcsDate(rawEnd);
    if (!start || !end) continue;

    // DTEND in iCal is usually exclusive; block up to previous day.
    const cursor = new Date(start);
    const last = new Date(end);
    last.setUTCDate(last.getUTCDate() - 1);

    while (cursor <= last) {
      blocked.add(formatDateKey(cursor));
      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }
  }

  return Array.from(blocked).sort();
};

export default async function availability(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Metodo non consentito" });
  }

  const apartment = (req.query.apartment || "").toString().toLowerCase();
  const envKey = APARTMENT_TO_ENV[apartment];

  if (!envKey) {
    return res.status(400).json({ error: "Appartamento non valido" });
  }

  const icsUrl = process.env[envKey];
  if (!icsUrl) {
    return res.status(200).json({ apartment, blockedDates: [] });
  }

  try {
    const response = await fetch(icsUrl, { cache: "no-store" });
    if (!response.ok) {
      return res.status(502).json({ error: "Errore fetch iCal" });
    }

    const icsText = await response.text();
    const blockedDates = extractBlockedDates(icsText);
    return res.status(200).json({ apartment, blockedDates });
  } catch (error) {
    return res.status(500).json({ error: "Errore parsing iCal" });
  }
}
