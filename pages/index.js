import ScrollSection from "@/components/ScrollSection";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Vacanze in Toscana - Agriturismo Segarelli</title>
        <meta
          name="description"
          content="Vacanze in Toscana - Agriturismo Segarelli. Conduzione familiare, vicino Volterra. Piscina,tre appartamenti indipendenti, colazione, free wi-fi."
        />
        <link rel="canonical" href="https://agriturismosegarelli.it/" />
        <link
          rel="publisher"
          href="https://plus.google.com/106924514725907056377/posts"
        />
        <meta property="og:locale" content="it_IT" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Vacanze in Toscana - Agriturismo Segarelli"
        />
        <meta
          property="og:description"
          content="Vacanze in Toscana - Agriturismo Segarelli. Conduzione familiare, vicino Volterra. Piscina,tre appartamenti indipendenti, colazione, free wi-fi."
        />
        <meta property="og:url" content="https://agriturismosegarelli.it/" />
        <meta property="og:site_name" content="Agriturismo Segarelli" />
        <meta
          property="og:image"
          content="https://agriturismosegarelli.it/wp-content/uploads/2016/02/512x512.png"
        />
        <meta
          property="og:image:secure_url"
          content="https://agriturismosegarelli.it/wp-content/uploads/2016/02/512x512.png"
        />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:description"
          content="Vacanze in Toscana - Agriturismo Segarelli. Conduzione familiare, vicino Volterra. Piscina,tre appartamenti indipendenti, colazione, free wi-fi."
        />
        <meta
          name="twitter:title"
          content="Vacanze in Toscana - Agriturismo Segarelli"
        />
        <meta name="twitter:site" content="@segarelli" />
        <meta
          name="twitter:image"
          content="http://agriturismosegarelli.it/wp-content/uploads/2016/02/testata-gallery-300x300.jpg"
        />
        <meta name="twitter:creator" content="@segarelli" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "website",
              name: "Agriturismo Segarelli",
              id: "https://agriturismosegarelli.it/#website",
              url: "https://agriturismosegarelli.it/",
              logo: "/favicon.ico",
            }),
          }}
        />
        {/* <meta
          name="google-site-verification"
          content="ZD2Fp_Z5kdRO9gux6tlilo0hsXbWWi3VyhHly9f_7O0"
        /> */}
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <meta
          name="apple-mobile-web-app-title"
          content="Agriturismo Segarelli"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>{" "}
      <ScrollSection />
    </>
  );
}
