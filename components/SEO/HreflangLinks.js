const SITE_URL = "https://www.agriturismosegarelli.it";

const toAbsoluteUrl = (path) => {
  if (!path) return SITE_URL;
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};

export default function HreflangLinks({ it, en, xDefault = it }) {
  return (
    <>
      {it && <link rel="alternate" hrefLang="it" href={toAbsoluteUrl(it)} />}
      {en && <link rel="alternate" hrefLang="en" href={toAbsoluteUrl(en)} />}
      {xDefault && (
        <link
          rel="alternate"
          hrefLang="x-default"
          href={toAbsoluteUrl(xDefault)}
        />
      )}
    </>
  );
}
