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
  const clean = raw.trim();
  const y = Number(clean.slice(0, 4));
  const m = Number(clean.slice(4, 6));
  const d = Number(clean.slice(6, 8));
  if (!y || !m || !d) return null;
  return new Date(Date.UTC(y, m - 1, d));
};

const parseYmdUtc = (ymd) => {
  const [y, m, d] = ymd.split("-").map((n) => Number(n));
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

    const cursor = new Date(start);
    const last = new Date(end);
    last.setUTCDate(last.getUTCDate() - 1); // DTEND is exclusive

    while (cursor <= last) {
      blocked.add(formatDateKey(cursor));
      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }
  }

  return blocked;
};

const toIcsDate = (date) => {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  return `${y}${m}${d}`;
};

const nowStamp = () => {
  const date = new Date();
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  const hh = String(date.getUTCHours()).padStart(2, "0");
  const mm = String(date.getUTCMinutes()).padStart(2, "0");
  const ss = String(date.getUTCSeconds()).padStart(2, "0");
  return `${y}${m}${d}T${hh}${mm}${ss}Z`;
};

const toDateRanges = (dateKeys) => {
  if (!dateKeys.length) return [];

  const ranges = [];
  let start = parseYmdUtc(dateKeys[0]);
  let prev = parseYmdUtc(dateKeys[0]);
  if (!start || !prev) return ranges;

  for (let i = 1; i < dateKeys.length; i += 1) {
    const current = parseYmdUtc(dateKeys[i]);
    if (!current) continue;

    const expectedNext = new Date(prev);
    expectedNext.setUTCDate(expectedNext.getUTCDate() + 1);

    if (current.getTime() === expectedNext.getTime()) {
      prev = current;
      continue;
    }

    ranges.push({ start, endInclusive: prev });
    start = current;
    prev = current;
  }

  ranges.push({ start, endInclusive: prev });
  return ranges;
};

const buildIcs = ({ apartment, ranges, host }) => {
  const stamp = nowStamp();
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Agriturismo Segarelli//Availability Calendar//IT",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:Agriturismo Segarelli - " + apartment,
    "X-WR-TIMEZONE:UTC",
  ];

  ranges.forEach((range, index) => {
    const dtStart = toIcsDate(range.start);
    const dtEndExclusive = new Date(range.endInclusive);
    dtEndExclusive.setUTCDate(dtEndExclusive.getUTCDate() + 1);
    const dtEnd = toIcsDate(dtEndExclusive);

    lines.push("BEGIN:VEVENT");
    lines.push(`UID:${apartment}-${index}-${dtStart}@${host}`);
    lines.push(`DTSTAMP:${stamp}`);
    lines.push(`SUMMARY:Unavailable (${apartment})`);
    lines.push(`DTSTART;VALUE=DATE:${dtStart}`);
    lines.push(`DTEND;VALUE=DATE:${dtEnd}`);
    lines.push("STATUS:CONFIRMED");
    lines.push("TRANSP:OPAQUE");
    lines.push("END:VEVENT");
  });

  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
};

export default async function apartmentIcal(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Metodo non consentito" });
  }

  const apartment = (req.query.apartment || "").toString().toLowerCase();
  const envKey = APARTMENT_TO_ENV[apartment];
  if (!envKey) {
    return res.status(400).json({ error: "Appartamento non valido" });
  }

  const blockedDates = new Set();
  const sourceIcsUrl = process.env[envKey];

  if (sourceIcsUrl) {
    try {
      const response = await fetch(sourceIcsUrl, { cache: "no-store" });
      if (response.ok) {
        const icsText = await response.text();
        const parsed = extractBlockedDates(icsText);
        parsed.forEach((d) => blockedDates.add(d));
      }
    } catch (error) {
      // Keep going and expose a valid calendar even if source feed is unreachable.
    }
  }

  const sortedDates = Array.from(blockedDates).sort();
  const ranges = toDateRanges(sortedDates);
  const host = req.headers.host || "agriturismosegarelli.it";
  const ics = buildIcs({ apartment, ranges, host });

  res.setHeader("Content-Type", "text/calendar; charset=utf-8");
  res.setHeader(
    "Content-Disposition",
    `inline; filename="${apartment}-availability.ics"`,
  );
  res.setHeader("Cache-Control", "public, max-age=300, stale-while-revalidate=600");

  return res.status(200).send(ics);
}
