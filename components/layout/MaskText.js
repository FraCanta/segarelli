import React from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

export function MaskText({ children }) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
  const animate = inView;

  const animation = {
    initial: { y: "100%" },
    enter: (i) => ({
      y: "0%",
      transition: {
        duration: 0.75,
        ease: [0.33, 1, 0.68, 1],
        delay: 0.075 * i,
      },
    }),
  };

  // recupero testo
  const text =
    typeof children === "string" ? children : children.props.children;

  const words = text.split(" ");

  // se è una stringa, fallback semplice
  if (typeof children === "string") {
    return (
      <span ref={ref} className="overflow-hidden inline-block">
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={animation}
            initial="initial"
            animate={animate ? "enter" : "initial"}
            custom={i}
            className="inline-block mr-2"
          >
            {word}
          </motion.span>
        ))}
      </span>
    );
  }

  // CLONE dell'elemento originale (🔥 punto chiave)
  return React.cloneElement(
    children,
    {
      ref,
      className: `${children.props.className} overflow-hidden`,
    },
    words.map((word, i) => (
      <motion.span
        key={i}
        variants={animation}
        initial="initial"
        animate={animate ? "enter" : "initial"}
        custom={i}
        className="inline-block mr-2"
      >
        {word}
      </motion.span>
    ))
  );
}
