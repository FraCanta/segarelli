import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";

const STORAGE_KEY = "segarelli-cookie-consent";

const defaultConsent = {
  necessary: true,
  thirdParty: false,
};

export function getStoredCookieConsent() {
  if (typeof window === "undefined") return null;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? { ...defaultConsent, ...JSON.parse(stored) } : null;
  } catch {
    return null;
  }
}

export function saveCookieConsent(consent) {
  if (typeof window === "undefined") return;

  const nextConsent = {
    necessary: true,
    thirdParty: Boolean(consent.thirdParty),
  };

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextConsent));
  window.dispatchEvent(
    new CustomEvent("segarelli-cookie-consent-change", {
      detail: nextConsent,
    }),
  );
}

export function useCookieConsent() {
  const [consent, setConsent] = useState(null);

  useEffect(() => {
    setConsent(getStoredCookieConsent());

    const handleChange = (event) => {
      setConsent(event.detail || getStoredCookieConsent());
    };

    window.addEventListener("segarelli-cookie-consent-change", handleChange);
    return () => {
      window.removeEventListener("segarelli-cookie-consent-change", handleChange);
    };
  }, []);

  return consent;
}

export function openCookiePreferences() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("segarelli-open-cookie-preferences"));
}

export default function CookieBanner() {
  const { locale } = useRouter();
  const [visible, setVisible] = useState(false);
  const [customize, setCustomize] = useState(false);
  const [thirdParty, setThirdParty] = useState(false);

  const isEn = locale === "en";

  useEffect(() => {
    const stored = getStoredCookieConsent();
    setVisible(!stored);
    setThirdParty(Boolean(stored?.thirdParty));

    const openPreferences = () => {
      const latest = getStoredCookieConsent();
      setThirdParty(Boolean(latest?.thirdParty));
      setCustomize(true);
      setVisible(true);
    };

    window.addEventListener("segarelli-open-cookie-preferences", openPreferences);
    return () => {
      window.removeEventListener(
        "segarelli-open-cookie-preferences",
        openPreferences,
      );
    };
  }, []);

  const closeWithConsent = (consent) => {
    saveCookieConsent(consent);
    setVisible(false);
    setCustomize(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          const latest = getStoredCookieConsent();
          setThirdParty(Boolean(latest?.thirdParty));
          setCustomize(true);
          setVisible(true);
        }}
        className="fixed bottom-4 left-4 z-[9997] h-12 w-12 rounded-full bg-primary text-white shadow-xl flex items-center justify-center hover:bg-siena transition-colors"
        aria-label={isEn ? "Open cookie preferences" : "Apri preferenze cookie"}
        title={isEn ? "Cookie preferences" : "Preferenze cookie"}
      >
        <Icon icon="lucide:cookie" width="24" height="24" />
      </button>

      {visible && (
        <div className="fixed inset-x-0 bottom-0 z-[9998] px-4 pb-4">
          <div className="mx-auto max-w-4xl bg-white text-blu shadow-2xl border border-blu/10 p-5 lg:p-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl text-primary">
              {isEn ? "Cookie preferences" : "Preferenze cookie"}
            </h2>
            <p className="text-sm leading-relaxed text-blu/75">
              {isEn
                ? "We use technical storage needed for the website and, only with your consent, third-party services such as maps and embedded widgets."
                : "Usiamo memorizzazioni tecniche necessarie al funzionamento del sito e, solo con il tuo consenso, servizi di terze parti come mappe e widget incorporati."}
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              <Link href="/privacy-policy" className="text-primary underline">
                Privacy policy
              </Link>
              <Link href="/cookie-policy" className="text-primary underline">
                Cookie policy
              </Link>
            </div>
          </div>

          {customize && (
            <div className="grid gap-3 border-y border-blu/10 py-4">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked
                  disabled
                  className="mt-1 h-4 w-4 accent-primary"
                />
                <span>
                  <span className="block text-sm font-medium text-primary">
                    {isEn ? "Necessary" : "Necessari"}
                  </span>
                  <span className="block text-sm text-blu/70">
                    {isEn
                      ? "Required for security, forms and remembering your choices."
                      : "Richiesti per sicurezza, form e memorizzazione delle preferenze."}
                  </span>
                </span>
              </label>
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={thirdParty}
                  onChange={(event) => setThirdParty(event.target.checked)}
                  className="mt-1 h-4 w-4 accent-primary"
                />
                <span>
                  <span className="block text-sm font-medium text-primary">
                    {isEn ? "Third-party services" : "Servizi di terze parti"}
                  </span>
                  <span className="block text-sm text-blu/70">
                    {isEn
                      ? "Google Maps and embedded external widgets may process data according to their own policies."
                      : "Google Maps e widget esterni incorporati possono trattare dati secondo le rispettive informative."}
                  </span>
                </span>
              </label>
            </div>
          )}

          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => closeWithConsent({ thirdParty: false })}
              className="px-5 py-3 border border-primary text-primary uppercase text-sm"
            >
              {isEn ? "Reject" : "Rifiuta"}
            </button>
            <button
              type="button"
              onClick={() =>
                customize
                  ? closeWithConsent({ thirdParty })
                  : setCustomize(true)
              }
              className="px-5 py-3 border border-primary text-primary uppercase text-sm"
            >
              {customize
                ? isEn
                  ? "Save choices"
                  : "Salva scelte"
                : isEn
                  ? "Customize"
                  : "Personalizza"}
            </button>
            <button
              type="button"
              onClick={() => closeWithConsent({ thirdParty: true })}
              className="px-5 py-3 bg-siena text-white uppercase text-sm"
            >
              {isEn ? "Accept all" : "Accetta tutto"}
            </button>
          </div>
        </div>
      </div>
        </div>
      )}
    </>
  );
}
