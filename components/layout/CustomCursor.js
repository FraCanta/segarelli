import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const text = textRef.current;

    const move = (e) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    document.addEventListener("mousemove", move);

    document.querySelectorAll("[data-cursor-text]").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.classList.add("scale-150");
        text.textContent = el.dataset.cursorText;
        text.classList.remove("opacity-0");
      });

      el.addEventListener("mouseleave", () => {
        cursor.classList.remove("scale-150");
        text.textContent = "";
        text.classList.add("opacity-0");
      });
    });

    return () => document.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none
                 -translate-x-1/2 -translate-y-1/2
                 transition-transform duration-150 ease-out"
    >
      <div className="w-12 h-12 border border-white rounded-full flex items-center justify-center">
        <span
          ref={textRef}
          className="text-[10px] tracking-widest uppercase opacity-0 transition-opacity"
        />
      </div>
    </div>
  );
}
