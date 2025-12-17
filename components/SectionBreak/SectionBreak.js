import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import House from "../../public/assets/house.svg";

export default function SectionBreak() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      className="section-break flex items-center justify-center gap-4 px-6 my-20"
    >
      {/* Linea sinistra */}
      <motion.span
        className="flex-1 h-[1px] bg-primary"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.33, 1, 0.68, 1],
        }}
        style={{ transformOrigin: "100% 50%" }}
      />

      {/* Icona */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={
          inView ? { scale: 1, opacity: 1 } : { scale: 0.85, opacity: 0 }
        }
        transition={{
          duration: 0.6,
          ease: [0.33, 1, 0.68, 1],
          delay: 0.2,
        }}
      >
        <Image width={77} height={40} src={House} alt="Section divider" />
      </motion.div>

      {/* Linea destra */}
      <motion.span
        className="flex-1 h-[1px] bg-primary"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.33, 1, 0.68, 1],
        }}
        style={{ transformOrigin: "0% 50%" }}
      />
    </div>
  );
}
