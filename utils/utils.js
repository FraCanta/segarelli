// Funzione per ottenere la data formattata con zeri iniziali
export function getDate(date, locale = "it-IT") {
  return new Date(date).toLocaleDateString(locale, {
    day: "2-digit", // Assicura due cifre per il giorno
    month: "2-digit", // Assicura due cifre per il mese
    year: "numeric",
  });
}

// Funzione per ottenere l'ora, considerando un eventuale offset
export function getHour(date, offset = 0, locale = "it-IT") {
  const dateObj = new Date(date);
  const localTime = new Date(dateObj.getTime() - offset * 60 * 1000);
  return localTime.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Funzione per decodificare entità HTML
export function decodeHtml(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}
