import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

export function ParagraphText({ children }) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
  const animate = inView || isMobile;

  const animation = {
    initial: { y: "100%", opacity: 0 },
    enter: (i) => ({
      y: "0%",
      opacity: 1,
      transition: { duration: 0.75, ease: [0.33, 1, 0.68, 1], delay: 0.05 * i },
    }),
  };

  const lines = children.split(". ");

  return (
    <div ref={ref} className="overflow-hidden">
      {lines.map((line, i) => (
        <motion.p
          key={i}
          variants={animation}
          initial="initial"
          animate={animate ? "enter" : "initial"}
          custom={i}
          className="max-w-4xl p-2 lg:mt-4 text-lg  text-blu/80"
        >
          {line.trim()}.
        </motion.p>
      ))}
    </div>
  );
}
