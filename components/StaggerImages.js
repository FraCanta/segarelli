import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import RevealImage from "./layout/RevealImage";

export function StaggerImages() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2, // 0.2s tra un'immagine e l'altra
        ease: [0.33, 1, 0.68, 1],
      },
    },
  };

  const itemVariants = {
    hidden: { height: 0 },
    show: { height: "100%" },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className="flex justify-center gap-6 h-[60vh] lg:h-screen items-center px-6 py-0 lg:py-20"
    >
      <RevealImage
        src="/assets/luigi.jpg"
        alt="Left"
        className="hidden md:block flex-1 aspect-video"
      />

      <RevealImage
        src="/assets/giardino.jpg"
        alt="Center"
        className="flex-1 self-stretch "
      />

      <RevealImage
        src="/assets/pozzo.jpg"
        alt="Right"
        className="hidden md:block flex-1 aspect-video"
      />
    </motion.div>
  );
}
