"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 55, stiffness: 650, mass: 0.18 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  const scrollDelta = useMotionValue(0);
  const smoothDelta = useSpring(scrollDelta, { damping: 25, stiffness: 350, mass: 0.1 });

  const topOffset = useTransform(smoothDelta, [-150, 0, 150], [-3, -3, -24]);
  const bottomOffset = useTransform(smoothDelta, [-150, 0, 150], [24, 3, 3]);
  const dotHeight = useTransform(
    [topOffset, bottomOffset],
    ([t, b]: any) => `${b - t}px`
  );

  const ringTopOffsetUnspring = useTransform(smoothDelta, [-150, 0, 150], [-16, -16, -34]);
  const ringBottomOffsetUnspring = useTransform(smoothDelta, [-150, 0, 150], [34, 16, 16]);

  const ringTopOffset = useSpring(ringTopOffsetUnspring, { damping: 30, stiffness: 400 });
  const ringBottomOffset = useSpring(ringBottomOffsetUnspring, { damping: 30, stiffness: 400 });

  const ringHeight = useTransform(
    [ringTopOffset, ringBottomOffset],
    ([t, b]: any) => `${b - t}px`
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine) and (hover: hover)");
    
    const updatePointerType = () => {
      setIsFinePointer(mediaQuery.matches);
    };

    updatePointerType();
    mediaQuery.addEventListener("change", updatePointerType);

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, input, textarea, [data-cursor-hover]")) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    let wheelTimeout: NodeJS.Timeout;
    const handleWheel = (e: WheelEvent) => {
      const clampedDelta = Math.max(-150, Math.min(150, e.deltaY));
      scrollDelta.set(clampedDelta);

      clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => {
        scrollDelta.set(0);
      }, 100);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("wheel", handleWheel, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      mediaQuery.removeEventListener("change", updatePointerType);
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("wheel", handleWheel);
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(wheelTimeout);
    };
  }, [mouseX, mouseY, isVisible, scrollDelta]);

  if (!isFinePointer) return null;

  return (
    <div className={isVisible ? "opacity-100" : "opacity-0 transition-opacity duration-300"}>
      <motion.div
        className="fixed w-1.5 rounded-full pointer-events-none z-[9999]"
        style={{
          left: mouseX,
          top: mouseY,
          translateX: "-50%",
          marginTop: topOffset,
          marginBottom: bottomOffset,
          height: dotHeight,
        }}
        animate={{
          backgroundColor: isHovered ? "var(--color-cyan)" : "var(--color-pink)",
        }}
        transition={{ duration: 0.15 }}
      />

      <motion.div
        className="fixed w-8 rounded-full pointer-events-none z-[9998] border"
        style={{
          left: ringX,
          top: ringY,
          translateX: "-50%",
          marginTop: ringTopOffset,
          marginBottom: ringBottomOffset,
          height: ringHeight,
        }}
        animate={{
          scale: isHovered ? 1.25 : 1,
          borderColor: isHovered ? "var(--color-cyan)" : "var(--color-pink)",
          backgroundColor: isHovered
            ? "rgba(111, 255, 232, 0.12)"
            : "rgba(160, 97, 138, 0)",
        }}
        transition={{
          scale: { type: "spring", stiffness: 400, damping: 30 },
          borderColor: { duration: 0.15 },
          backgroundColor: { duration: 0.15 },
        }}
      >
        <motion.div
          className="absolute inset-[-4px] pointer-events-none flex items-center justify-center"
          animate={{
            rotate: isHovered ? 360 : 0,
            scale: isHovered ? 1 : 0.8,
            opacity: isHovered ? 0.85 : 0,
          }}
          transition={{
            rotate: { repeat: Infinity, duration: 10, ease: "linear" },
            scale: { type: "spring", stiffness: 300, damping: 25 },
            opacity: { duration: 0.15 },
          }}
        >
          <div className="absolute top-0 w-1 h-[1px] bg-[var(--color-cyan)] transform -translate-y-1/2 rotate-90" />
          <div className="absolute bottom-0 w-1 h-[1px] bg-[var(--color-cyan)] transform translate-y-1/2 rotate-90" />
          <div className="absolute left-0 w-1 h-[1px] bg-[var(--color-cyan)] transform -translate-x-1/2" />
          <div className="absolute right-0 w-1 h-[1px] bg-[var(--color-cyan)] transform translate-x-1/2" />
        </motion.div>
      </motion.div>
    </div>
  );
}
