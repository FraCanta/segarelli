import { Icon } from "@iconify/react";
import SectionBreakWhite from "../SectionBreak/SectionBreakWhite";
import Link from "next/link";
import ButtonWhiteOutline from "./ButtonWhiteOutline";
import { useRouter } from "next/router";
import Weather from "../Weather/Weather";
import { openCookiePreferences } from "../CookieConsent/CookieBanner";

export default function Footer({ translation }) {
  const { locale } = useRouter();

  return (
    <footer className="bg-primary text-white pt-12">
      <SectionBreakWhite />
      <div className="text-center mt-6  text-white/40 mb-20">
        <h3 className="text-2xl lg:text-3xl">{translation?.[locale].title}</h3>
      </div>
      <div className="container mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="border-b border-r-0 lg:border-b-0 lg:border-r border-white/20 md:col-span-1">
            <h3 className="text-white/50 uppercase mb-4 text-base lg:text-sm 2xl:text-base">
              {translation?.[locale].gridOne.title}
            </h3>
            <div>
              <ul className="grid grid-cols-2 lg:grid-cols-1 gap-y-6 pb-4">
                <li>
                  <Link
                    href="/appartamenti"
                    className="text-white text-4xl lg:text-5xl 2xl:text-6xl"
                  >
                    <span className="split-hover flex flex-col justify-center">
                      <span className="line line-normal block">Sleep</span>
                      <span className="line line-hover block absolute top-0 left-0 w-full">
                        Sleep
                      </span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/mangiare-in-agriturismo"
                    className="text-white text-4xl lg:text-5xl 2xl:text-6xl"
                  >
                    <span className="split-hover flex flex-col justify-center">
                      <span className="line line-normal block">Eat</span>
                      <span className="line line-hover block absolute top-0 left-0 w-full">
                        Eat
                      </span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/relax-e-natura-da-segarelli"
                    className="text-white text-4xl lg:text-5xl 2xl:text-6xl"
                  >
                    <span className="split-hover flex flex-col justify-center">
                      <span className="line line-normal block">Play</span>
                      <span className="line line-hover block absolute top-0 left-0 w-full">
                        Play
                      </span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/scopri-i-dintorni"
                    className="text-white text-4xl lg:text-5xl 2xl:text-6xl"
                  >
                    <span className="split-hover flex flex-col justify-center">
                      <span className="line line-normal block">Discover</span>
                      <span className="line line-hover block absolute top-0 left-0 w-full">
                        Discover
                      </span>
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-b border-r-0 lg:border-b-0 lg:border-r border-white/20 grid grid-cols-2 lg:grid-cols-4 gap-8 pb-10 md:pb-0 md:col-span-2">
            <div>
              <h3 className="text-white/50 uppercase mb-4">sleep</h3>
              <ul className="flex flex-col gap-2">
                <li>
                  <Link
                    href="/appartamenti/acacia"
                    className="text-white text-base 2xl:text-lg"
                  >
                    Acacia
                  </Link>
                </li>
                <li>
                  <Link
                    href="/appartamenti/edera"
                    className="text-white text-base 2xl:text-lg"
                  >
                    Edera
                  </Link>
                </li>
                <li>
                  <Link
                    href="/appartamenti/gelsomino"
                    className="text-white text-base 2xl:text-lg"
                  >
                    Gelsomino
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white/50 uppercase mb-4">Eat</h3>
              <ul className="flex flex-col gap-2 ">
                <li>
                  <Link
                    href="/mangiare-in-agriturismo"
                    className="text-white text-base 2xl:text-lg"
                  >
                    {translation?.[locale].gridTwo.eat}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white/50 uppercase mb-4">Play</h3>
              <ul className="flex flex-col gap-2 pb-4">
                <li>
                  <Link
                    href="/relax-e-natura-da-segarelli"
                    className="text-white text-base 2xl:text-lg"
                  >
                    {translation?.[locale].gridTwo.play}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white/50 uppercase mb-4">Discover</h3>
              <ul className="flex flex-col gap-2 pb-4">
                <li>
                  <Link
                    href="/dintorni/relax"
                    className="text-white text-base 2xl:text-lg"
                  >
                    Relax
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dintorni/luoghi-da-visitare"
                    className="text-white text-base 2xl:text-lg"
                  >
                    {translation?.[locale].gridTwo.discover[1]}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dintorni/escursioni-toscana"
                    className="text-white text-base 2xl:text-lg"
                  >
                    {translation?.[locale].gridTwo.discover[2]}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dintorni/citta-da-visitare-toscana"
                    className="text-white text-base 2xl:text-lg"
                  >
                    {translation?.[locale].gridTwo.discover[3]}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white/50 uppercase mb-4">
                {translation?.[locale].gridTwo.about.title}
              </h3>
              <ul className="flex flex-col gap-2 pb-4">
                <li>
                  <Link
                    href="/chi-siamo"
                    className="text-white text-base 2xl:text-lg"
                  >
                    {translation?.[locale].gridTwo.about.cta}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white/50 uppercase mb-4">
                {translation?.[locale].gridTwo.contact.title}
              </h3>
              <ul className="flex flex-col gap-2 pb-4">
                <li>
                  <Link
                    href="/contatti"
                    className="text-white text-base 2xl:text-lg"
                  >
                    {translation?.[locale].gridTwo.contact.cta}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white/50 uppercase mb-4">Blog</h3>
              <ul className="flex flex-col gap-2 pb-4">
                <li>
                  <Link
                    href="/blog"
                    className="text-white text-base 2xl:text-lg"
                  >
                    {translation?.[locale].gridTwo.blog}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-10 md:col-span-1">
            <div className="flex flex-col gap-2">
              <h3 className="text-white/50 uppercase mb-4">
                {translation?.[locale].gridThree.title}
              </h3>
              <p className="text-white text-base 2xl:text-lg">
                Via Podere Segarelli n°6, <br /> 56045 Pomarance – Pisa (Italy)
              </p>
            </div>

            <p className="text-white text-base 2xl:text-lg">
              agriturismosegarelli@gmail.com
            </p>
            <p className="text-white text-base 2xl:text-lg">
              t: +39 347 7447180
            </p>
            <ButtonWhiteOutline
              link="/contatti"
              title="Contatti"
              icon="mdi:email-outline"
              target="_self"
            >
              {translation?.[locale].gridThree.cta}
            </ButtonWhiteOutline>
          </div>
        </div>

        <div className="bg-white/20 w-full px-4 lg:px-6 h-[0.9px] mt-10"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 items-center w-full px-0 lg:px-6 py-6 gap-4">
          <div className="flex flex-col lg:flex-row items-center gap-4 lg:justify-start">
            {" "}
            <div className="flex items-center gap-2 ">
              {/* 5 stelle piene */}
              <Icon
                className="text-siena"
                icon="mdi:star"
                width="20"
                height="20"
              />
              <Icon
                className="text-siena"
                icon="mdi:star"
                width="20"
                height="20"
              />
              <Icon
                className="text-siena"
                icon="mdi:star"
                width="20"
                height="20"
              />
              <Icon
                className="text-siena"
                icon="mdi:star"
                width="20"
                height="20"
              />
              <Icon
                className="text-siena"
                icon="mdi:star"
                width="20"
                height="20"
              />

              {/* Valutazione numerica */}
              <span className="text-white/80 font-semibold ml-2">5.0</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              &bull;{" "}
              <Link
                href="https://www.facebook.com/Segarelli"
                className="hover:underline"
                target="_blank"
              >
                Facebook
              </Link>
              &bull;{" "}
              <Link
                href="https://www.instagram.com/agriturismo_segarelli/"
                className="hover:underline"
                target="_blank"
              >
                Instagram
              </Link>
              &bull;{" "}
              <Link
                href="https://www.tripadvisor.it/Hotel_Review-g776018-d2063072-Reviews-Agriturismo_Segarelli-Pomarance_Province_of_Pisa_Tuscany.html"
                target="_blank"
                className="hover:underline"
              >
                TripAdvisor
              </Link>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-white/80 text-sm">
            <Link href="/privacy-policy" className="hover:underline">
              Privacy Policy
            </Link>
            <span>&bull;</span>
            <Link href="/cookie-policy" className="hover:underline">
              Cookie Policy
            </Link>
            <span>&bull;</span>
            <button
              type="button"
              onClick={openCookiePreferences}
              className="hover:underline"
            >
              {locale === "en" ? "Cookie preferences" : "Preferenze cookie"}
            </button>
          </div>
          <div className="flex flex-col lg:flex-row gap-y-2 lg:items-center lg:justify-end">
            <Weather />
            <p className="text-white/80 text-sm">
              <span>
                &copy; {new Date().getFullYear()} Agriturismo Segarelli.
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
