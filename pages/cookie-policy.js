import Head from "next/head";
import { useRouter } from "next/router";
import { openCookiePreferences } from "@/components/CookieConsent/CookieBanner";
import HreflangLinks from "@/components/SEO/HreflangLinks";

function Section({ title, children }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-2xl lg:text-3xl text-primary">{title}</h2>
      <div className="flex flex-col gap-3 text-blu/80 leading-relaxed">
        {children}
      </div>
    </section>
  );
}

export default function CookiePolicy() {
  const { locale } = useRouter();
  const isEn = locale === "en";

  return (
    <>
      <Head>
        <title>Cookie Policy | Agriturismo Segarelli</title>
        <meta
          name="description"
          content={
            isEn
              ? "Cookie policy for Agriturismo Segarelli."
              : "Cookie policy del sito Agriturismo Segarelli."
            }
        />
        <link
          rel="canonical"
          href={`https://www.agriturismosegarelli.it${isEn ? "/en" : ""}/cookie-policy`}
        />
        <HreflangLinks it="/cookie-policy" en="/en/cookie-policy" />
      </Head>

      <main className="px-4 lg:px-0 lg:w-[70%] mx-auto my-32 flex flex-col gap-10">
        <header className="flex flex-col gap-4">
          <h1 className="text-4xl lg:text-6xl text-primary">Cookie Policy</h1>
          <p className="text-blu/70">
            {isEn ? "Last updated: May 2026" : "Ultimo aggiornamento: maggio 2026"}
          </p>
        </header>

        {isEn ? (
          <>
            <Section title="What Cookies and Similar Technologies Are">
              <p>
                Cookies and similar technologies store or read information on
                the user's device. They can be necessary for the website or used
                by third-party services.
              </p>
            </Section>

            <Section title="Technical Storage">
              <p>
                This website uses local storage to remember your cookie choices
                under the key <code>segarelli-cookie-consent</code>. This is
                necessary to avoid showing the banner at every visit and to apply
                your preferences.
              </p>
              <p>
                The website may also generate technical server logs and use
                scripts required for navigation, forms, image galleries and date
                selection. These are not used for profiling.
              </p>
            </Section>

            <Section title="Third-Party Services">
              <p>
                With your consent, the website may load Google Analytics,
                Google Maps embeds and Elfsight external widgets. These services
                may set cookies or use other tracking technologies according to
                their own policies. Google Analytics is used only after consent
                and is configured with IP anonymization.
              </p>
              <p>
                Google Analytics may use cookies such as <code>_ga</code> and
                related identifiers to collect aggregated statistics about pages
                visited and interactions with the website. Google Search Console
                verification is performed through a meta tag and does not load
                cookies on the user's device.
              </p>
              <p>
                Links to Facebook, Instagram, TripAdvisor and WhatsApp are simple
                outbound links until you click them. After clicking, the
                destination service applies its own rules.
              </p>
            </Section>

            <Section title="How to Manage Consent">
              <p>
                You can accept all, reject optional third-party services or
                customize your choices from the banner. You can reopen the
                preferences at any time.
              </p>
              <button
                type="button"
                onClick={openCookiePreferences}
                className="w-max px-6 py-3 bg-siena text-white uppercase text-sm"
              >
                Manage preferences
              </button>
            </Section>
          </>
        ) : (
          <>
            <Section title="Cosa sono cookie e tecnologie simili">
              <p>
                Cookie e tecnologie simili permettono di memorizzare o leggere
                informazioni sul dispositivo dell'utente. Possono essere
                necessari al sito oppure usati da servizi di terze parti.
              </p>
            </Section>

            <Section title="Memorizzazioni tecniche">
              <p>
                Questo sito usa il local storage per ricordare le preferenze
                cookie con la chiave <code>segarelli-cookie-consent</code>. E
                necessario per evitare di mostrare il banner a ogni visita e per
                applicare le preferenze.
              </p>
              <p>
                Il sito puo generare log tecnici lato server e usare script
                necessari per navigazione, form, gallerie immagini e selezione
                date. Questi strumenti non sono usati per profilazione.
              </p>
            </Section>

            <Section title="Servizi di terze parti">
              <p>
                Con il tuo consenso il sito puo caricare Google Analytics,
                incorporamenti Google Maps e widget esterni Elfsight. Questi
                servizi possono impostare cookie o usare altri strumenti di
                tracciamento secondo le proprie informative. Google Analytics
                viene usato solo dopo il consenso ed e configurato con
                anonimizzazione IP.
              </p>
              <p>
                Google Analytics puo usare cookie come <code>_ga</code> e
                identificatori collegati per raccogliere statistiche aggregate
                sulle pagine visitate e sulle interazioni con il sito. La
                verifica di Google Search Console avviene tramite meta tag e non
                carica cookie sul dispositivo dell'utente.
              </p>
              <p>
                I link a Facebook, Instagram, TripAdvisor e WhatsApp sono
                semplici link in uscita finche non li clicchi. Dopo il click si
                applicano le regole del servizio di destinazione.
              </p>
            </Section>

            <Section title="Come gestire il consenso">
              <p>
                Puoi accettare tutto, rifiutare i servizi facoltativi di terze
                parti oppure personalizzare le scelte dal banner. Puoi riaprire
                le preferenze in qualsiasi momento.
              </p>
              <button
                type="button"
                onClick={openCookiePreferences}
                className="w-max px-6 py-3 bg-siena text-white uppercase text-sm"
              >
                Gestisci preferenze
              </button>
            </Section>
          </>
        )}
      </main>
    </>
  );
}
