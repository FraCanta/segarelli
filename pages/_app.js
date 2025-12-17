import { appWithTranslation } from "next-i18next";
import Layout from "@/components/layout/layout";
import "@/styles/globals.css";
import "@/styles/swiper_bullet.css";
import "@/styles/split.css";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import IntroLoader from "@/components/IntroLoader/IntroLoader";

function App({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => setLoading(true);
    const end = () => setLoading(false);

    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);

    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
    };
  }, [router]);

  return (
    <Layout>
      <IntroLoader isVisible={loading} />
      <Component {...pageProps} />
    </Layout>
  );
}

export default appWithTranslation(App);
