import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // disable on touch / small screens
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const t = e.target as HTMLElement | null;
      setHover(!!t?.closest("a, button, [role='button'], input, textarea, [data-cursor='hover']"));
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-difference"
        animate={{
          x: pos.x,
          y: pos.y,
          width: hover ? 44 : 14,
          height: hover ? 44 : 14,
          backgroundColor: "rgba(255,255,255,0.9)",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 35, mass: 0.4 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2 rounded-full border border-aurora-cyan/40"
        animate={{ x: pos.x, y: pos.y, width: hover ? 56 : 36, height: hover ? 56 : 36 }}
        transition={{ type: "spring", stiffness: 180, damping: 22 }}
      />
    </>
  );
}
