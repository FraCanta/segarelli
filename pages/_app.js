import { appWithTranslation } from "next-i18next";
import Layout from "@/components/layout/layout";
import "@/styles/globals.css";
import "@/styles/swiper_bullet.css";
import "@/styles/split.css";
import "@/styles/wordpress.css";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import IntroLoader from "@/components/IntroLoader/IntroLoader";
import Script from "next/script";

function App({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  // Scroll to top on every route change
  useEffect(() => {
    const handleScrollTop = () => {
      window.scrollTo(0, 0);
    };

    router.events.on("routeChangeComplete", handleScrollTop);
    return () => {
      router.events.off("routeChangeComplete", handleScrollTop);
    };
  }, [router]);

  return (
    <>
      <Layout>
        <IntroLoader isVisible={loading} />
        <Component {...pageProps} />
      </Layout>

      <Script
        src="https://elfsightcdn.com/platform.js"
        data-use-service-core
        strategy="afterInteractive"
      ></Script>
    </>
  );
}

export default appWithTranslation(App);
