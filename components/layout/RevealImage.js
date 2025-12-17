import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

function RevealImage({ src, alt, className = "" }) {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <div ref={ref} className={`relative overflow-hidden flex ${className}`}>
      <motion.div
        initial={{ clipPath: "inset(0 0 100% 0)" }}
        animate={
          inView
            ? { clipPath: "inset(0 0 0% 0)" }
            : { clipPath: "inset(0 0 100% 0)" }
        }
        transition={{
          duration: 1,
          ease: [0.33, 1, 0.68, 1],
        }}
        className="absolute inset-0"
      >
        <Image src={src} alt={alt} fill className="object-cover" />
      </motion.div>
    </div>
  );
}

export default RevealImage;
