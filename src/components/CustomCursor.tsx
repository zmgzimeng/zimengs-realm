"use client";

import { useEffect, useState, useRef } from "react";
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
    (values: number[]) => {
      const [t, b] = values;
      return `${b - t}px`;
    }
  );

  const ringTopOffsetUnspring = useTransform(smoothDelta, [-150, 0, 150], [-16, -16, -34]);
  const ringBottomOffsetUnspring = useTransform(smoothDelta, [-150, 0, 150], [34, 16, 16]);

  const ringTopOffset = useSpring(ringTopOffsetUnspring, { damping: 30, stiffness: 400 });
  const ringBottomOffset = useSpring(ringBottomOffsetUnspring, { damping: 30, stiffness: 400 });

  const ringHeight = useTransform(
    [ringTopOffset, ringBottomOffset],
    (values: number[]) => {
      const [t, b] = values;
      return `${b - t}px`;
    }
  );

  const rotation = useMotionValue(0);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    let lastTime = performance.now();

    const updateRotation = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      if (isHovered) {
        rotation.set((rotation.get() + delta * 36) % 360);
      }

      animFrameRef.current = requestAnimationFrame(updateRotation);
    };

    animFrameRef.current = requestAnimationFrame(updateRotation);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isHovered, rotation]);

  const TicksOverlay = () => {
    const [params, setParams] = useState({ height: 32, angle: 0 });

    useEffect(() => {
      const update = () => {
        const h = ringBottomOffset.get() - ringTopOffset.get();
        setParams({ height: h, angle: (rotation.get() * Math.PI) / 180 });
      };

      const unSubTop = ringTopOffset.on("change", update);
      const unSubBot = ringBottomOffset.on("change", update);
      const unSubRot = rotation.on("change", update);
      update();

      return () => {
        unSubTop();
        unSubBot();
        unSubRot();
      };
    }, []);

    const { height, angle } = params;
    const width = 32;

    const strokeWidth = 1;
    const tickLength = 5;
    const gapOffset = 4;

    const R = width / 2 + gapOffset;
    const straightH = Math.max(0, height - width);
    const halfStraight = straightH / 2;
    const capArc = Math.PI * R;
    const totalPerimeter = 2 * capArc + 2 * straightH;

    return (
      <svg className="w-full h-full overflow-visible pointer-events-none" viewBox="-50 -50 100 100">
        {[0, 1, 2, 3].map((i) => {
          const tAngle = (angle + Math.PI / 4 + (i * Math.PI) / 2) % (Math.PI * 2);
          const normAngle = tAngle < 0 ? tAngle + Math.PI * 2 : tAngle;
          const dist = (normAngle / (Math.PI * 2)) * totalPerimeter;

          let x = 0, y = 0, nx = 0, ny = 0;

          if (dist < straightH) {
            x = R; y = -halfStraight + dist; nx = 1; ny = 0;
          } else if (dist < straightH + capArc) {
            const theta = ((dist - straightH) / capArc) * Math.PI;
            nx = Math.cos(theta); ny = Math.sin(theta);
            x = R * nx; y = halfStraight + R * ny;
          } else if (dist < 2 * straightH + capArc) {
            x = -R; y = halfStraight - (dist - (straightH + capArc)); nx = -1; ny = 0;
          } else {
            const theta = Math.PI + ((dist - (2 * straightH + capArc)) / capArc) * Math.PI;
            nx = Math.cos(theta); ny = Math.sin(theta);
            x = R * nx; y = -halfStraight + R * ny;
          }

          return (
            <line
              key={i}
              x1={x}
              y1={y}
              x2={x + tickLength * nx}
              y2={y + tickLength * ny}
              stroke="var(--color-cyan)"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
          );
        })}
      </svg>
    );
  };

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
      {/* Center Dot */}
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
        className="fixed w-8 rounded-full pointer-events-none z-[9998] border flex items-center justify-center overflow-visible"
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
          className="absolute -inset-8 pointer-events-none flex items-center justify-center overflow-visible"
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{
            opacity: { duration: 0.15 },
          }}
        >
          <TicksOverlay />
        </motion.div>
      </motion.div>
    </div>
  );
}
