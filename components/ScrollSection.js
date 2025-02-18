import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import ButtonPrimary from "./layout/ButtonPrimary";
import Modal from "./layout/Modal";

gsap.registerPlugin(ScrollTrigger);

function ScrollSection() {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    const pin = gsap.fromTo(
      sectionRef.current,
      { translateX: 0 },
      {
        translateX: "-200vw",
        ease: "none",
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "2000 top",
          scrub: 0.6,
          pin: true,
        },
      }
    );

    return () => pin.kill();
  }, []);

  return (
    <section className="overflow-hidden">
      <div ref={triggerRef} className="relative w-full h-screen">
        <div ref={sectionRef} className="flex w-[300vw] h-screen">
          {/* Sezione 1 */}
          <div className="w-screen h-screen flex flex-col lg:flex-row items-center justify-center">
            <div className="mx-6 lg:ml-10 flex flex-col gap-4 lg:gap-6 my-10 lg:my-0">
              <h1 className="text-4xl lg:text-8xl font-semibold text-primary">
                Agriturismo Segarelli
              </h1>
              <p className="text-xl lg:text-3xl font-regular text-body max-w-2xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <ButtonPrimary onClick={() => setModalContent("storia")}>
                La nostra storia
              </ButtonPrimary>
            </div>
            <div className="relative h-full w-full lg:w-1/2">
              <Image
                src="/assets/segarelli.jpg"
                alt="Segarelli"
                fill
                className="object-cover object-top rounded-tl-[600px]"
              />
              <div className="absolute inset-0 bg-primary/35 rounded-tl-[600px]"></div>
            </div>
          </div>

          {/* Sezione 2 */}
          <div className="w-screen h-screen flex flex-col lg:flex-row items-center justify-center">
            <div className="mx-6 lg:ml-10 flex flex-col gap-6 my-6">
              <h1 className="text-4xl lg:text-8xl font-semibold text-primary">
                I nostri appartamenti
              </h1>
              <p className="text-xl lg:text-3xl font-regular text-body max-w-2xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <ButtonPrimary onClick={() => setModalContent("appartamenti")}>
                Scopri di più
              </ButtonPrimary>
            </div>
            <div className="relative w-full h-full lg:w-1/2">
              <Image
                src="/assets/appartamenti.jpg"
                alt="appartamenti"
                fill
                className="object-cover object-top rounded-tl-[600px]"
              />
              <div className="absolute inset-0 bg-primary/35 rounded-tl-[600px]"></div>
            </div>
          </div>

          {/* Sezione 3 */}
          <div className="w-screen h-screen flex flex-col lg:flex-row items-center justify-center">
            <div className="mx-6 lg:ml-10 flex flex-col gap-6 my-6">
              <h1 className="text-4xl lg:text-8xl font-semibold text-primary">
                Toscana da vivere
              </h1>
              <p className="text-xl lg:text-3xl font-regular text-body max-w-2xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <ButtonPrimary onClick={() => setModalContent("toscana")}>
                Scopri di più
              </ButtonPrimary>
            </div>
            <div className="relative w-full h-full lg:w-1/2">
              <Image
                src="/assets/toscana.jpg"
                alt="vivere la toscana"
                fill
                className="object-cover object-top rounded-tl-[600px]"
              />
              <div className="absolute inset-0 bg-primary/35 rounded-tl-[600px]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Modale */}
      <Modal content={modalContent} onClose={() => setModalContent(null)} />
    </section>
  );
}

export default ScrollSection;
