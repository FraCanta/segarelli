import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";

function ScrollSection() {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const pin = gsap.fromTo(
      sectionRef.current,
      {
        translateX: 0,
      },
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

    return () => {
      {
        /* A return function for killing the animation on component unmount */
      }
      pin.kill();
    };
  }, []);

  return (
    <section className="scroll-section-outer">
      <div ref={triggerRef}>
        <div ref={sectionRef} className="scroll-section-inner">
          <div className="w-screen h-screen grid grid-cols-1 lg:grid-cols-2 items-center">
            <div className="mx-6 lg:ml-10 flex flex-col gap-6 max-h-0 ">
              <h1 className="text-4xl lg:text-8xl font-semibold text-primary">
                Agriturismo Segarelli
              </h1>
              <p className="text-3xl font-regular text-body max-w-2xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
            <div className="relative h-full ">
              <Image
                src="/assets/segarelli.jpg"
                alt="Segarelli"
                fill
                className="object-cover object-top rounded-tl-[600px]"
              />
              <div className="absolute inset-0 bg-primary/25 rounded-tl-[600px]"></div>
            </div>
          </div>
          <div className="w-screen h-screen grid grid-cols-1 lg:grid-cols-2 items-center">
            <div className="ml-6 lg:ml-10">testo</div>
            <div className="relative h-full ">
              <Image
                src="/assets/appartamenti.jpg"
                alt="Segarelli"
                fill
                className="object-cover object-top rounded-tl-[600px]"
              />
              <div className="absolute inset-0 bg-primary/25 rounded-tl-[600px]"></div>
            </div>
          </div>
          <div className="w-screen h-screen grid grid-cols-1 lg:grid-cols-2 items-center">
            <div className="ml-6 lg:ml-10">testo</div>
            <div className="relative h-full ">
              <Image
                src="/assets/toscana.jpg"
                alt="Segarelli"
                fill
                className="object-cover rounded-tl-[600px]"
              />
              <div className="absolute inset-0 bg-primary/25 rounded-tl-[600px]"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ScrollSection;
