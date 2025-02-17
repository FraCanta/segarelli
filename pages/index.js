import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useEffect } from "react";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import ScrollSection from "@/components/ScrollSection";
import Footer from "@/components/layout/Footer";

gsap.registerPlugin(ScrollTrigger);

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  // useEffect(() => {
  //   const sections = gsap.utils.toArray(".panel");

  //   gsap.to(sections, {
  //     xPercent: -100 * (sections.length - 1),
  //     ease: "none",
  //     scrollTrigger: {
  //       trigger: ".container",
  //       pin: true,
  //       invalidateOnRefresh: true,
  //       anticipatePin: 1,
  //       scrub: 1.23,
  //       end: () => "+=" + document.querySelector(".container").offsetWidth,
  //     },
  //   });
  // }, []);
  return (
    // <div className="container">
    //   <section className="panel">
    //     <h1>SCROLL DOWN</h1>
    //   </section>
    //   <section className="panel">
    //     <h2>ONE</h2>
    //   </section>
    //   <section className="panel">
    //     <h2>TWO</h2>
    //   </section>
    //   <section className="panel">
    //     <h2>THREE</h2>
    //   </section>
    // </div>
    <>
      {" "}
      <ScrollSection />
    </>
  );
}
