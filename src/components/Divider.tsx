'use client';

import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionValueEvent } from 'framer-motion';

interface ChevronProps {
  speed?: number;
  className?: string;
}

function wrap(min: number, max: number, v: number) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

export default function Chevron({ 
  speed = 600, 
  className = "" 
}: ChevronProps) {
  const { scrollY } = useScroll();

  const smoothScrollY = useSpring(scrollY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const rawX = useTransform(smoothScrollY, (y) => (y / 2000) * speed);
  const xPercent = useMotionValue(-25);

  useMotionValueEvent(rawX, "change", (latest) => {
    const percentShift = (latest / 20) % 50;
    const wrapped = wrap(-50, 0, percentShift - 25);
    xPercent.set(wrapped);
  });

  return (
    <div className={`relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden select-none pointer-events-none py-1 ${className}`}>
      <motion.div 
        style={{ x: useTransform(xPercent, (v) => `${v}%`) }} 
        className="flex whitespace-nowrap min-w-max transform-gpu will-change-transform"
      >
        {[0, 1, 2, 3].map((blockIndex) => (
          <div key={blockIndex} className="flex items-center gap-2 sm:gap-4 shrink-0 pr-2 sm:pr-4">
            {Array.from({ length: 16 }).map((_, j) => (
              <img
                key={j}
                src="/accents/element2.svg"
                alt="Chevron"
                className="h-4 w-auto opacity-40 sm:h-6 shrink-0"
              />
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
