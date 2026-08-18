'use client';

import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionValueEvent } from 'framer-motion';

interface ChevronProps {
  speed?: number; // Distance translated per scroll increment
  className?: string;
}

// Custom wrapping function for seamless looping
function wrap(min: number, max: number, v: number) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

export default function Chevron({ 
  speed = 600, 
  className = "" 
}: ChevronProps) {
  const { scrollY } = useScroll();

  // Smooth out raw scroll position
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Calculate raw scroll displacement
  const rawX = useTransform(smoothScrollY, [0, 2000], [0, speed]);
  
  // Wrapped percentage output for infinite loop between -50% and 0%
  const xPercent = useMotionValue(-25);

  useMotionValueEvent(rawX, "change", (latest) => {
    // Map scroll value into a smooth, wrapped -50% to 0% range
    const percentShift = (latest / 20) % 50; 
    const wrapped = wrap(-50, 0, -percentShift);
    xPercent.set(wrapped);
  });

  return (
    <div className={`relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden select-none pointer-events-none py-4 ${className}`}>
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
