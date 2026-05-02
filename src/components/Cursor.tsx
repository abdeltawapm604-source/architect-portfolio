"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const trailX = useSpring(mouseX, { stiffness: 1000, damping: 40 });
  const trailY = useSpring(mouseY, { stiffness: 1000, damping: 40 });

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovered(
        !!(
          t.closest("a") ||
          t.closest("button") ||
          t.closest("[data-cursor]") ||
          window.getComputedStyle(t).cursor === "pointer"
        )
      );
    };

    const down = () => setClicked(true);
    const up = () => setClicked(false);
    
    const leave = () => setIsVisible(false);
    const enter = () => setIsVisible(true);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          className="rounded-full bg-cyan-400"
          style={{ boxShadow: "0 0 10px rgba(34, 211, 238, 0.4)" }}
          animate={{
            width: clicked ? 4 : hovered ? 12 : 6,
            height: clicked ? 4 : hovered ? 12 : 6,
          }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        />
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ x: trailX, y: trailY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          className="rounded-full border border-cyan-400/50"
          animate={{
            width: clicked ? 20 : hovered ? 44 : 28,
            height: clicked ? 20 : hovered ? 44 : 28,
            opacity: clicked ? 0.8 : hovered ? 1 : 0.4,
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        />
      </motion.div>
    </>
  );
}