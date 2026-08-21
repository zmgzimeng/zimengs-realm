'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 120, mass: 2 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const layer1X = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);
  const layer2X = useTransform(smoothX, [-0.5, 0.5], [-35, 35]);
  const layer3X = useTransform(smoothX, [-0.5, 0.5], [-50, 50]);

  const layer1Y = useTransform(smoothY, [-0.5, 0.5], [-2, 1]);
  const layer2Y = useTransform(smoothY, [-0.5, 0.5], [-4, 2]);
  const layer3Y = useTransform(smoothY, [-0.5, 0.5], [-6, 3]);

  const blobScaleY1 = useTransform(smoothY, [-0.5, 0.5], [1.01, 0.99]);
  const blobScaleY2 = useTransform(smoothY, [-0.5, 0.5], [1.02, 0.98]);
  const blobScaleY3 = useTransform(smoothY, [-0.5, 0.5], [1.03, 0.97]);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      const relativeX = e.clientX / window.innerWidth - 0.5;

      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const relativeY = (e.clientY - rect.top) / rect.height - 0.5;
        mouseY.set(relativeY);
      }

      mouseX.set(relativeX);
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, [mouseX, mouseY]);

  const iceWhite = 'var(--color-silver-ice)';
  const textColor = 'var(--color-gray)';

  return (
    <footer 
      ref={containerRef}
      className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden pt-8 group"
    >
      <div className="absolute inset-x-0 top-0 bottom-[100px] bg-gradient-to-b from-transparent via-[#2d1b4e]/30 to-[#6b468a]/40 pointer-events-none" />

      <div className="relative w-full min-h-[140px] flex flex-col justify-end select-none overflow-hidden">
        
        <motion.div
          style={{ 
            x: layer1X, 
            y: layer1Y, 
            scaleY: blobScaleY1,
            willChange: 'transform',
          }}
          className="absolute bottom-4 -left-[10vw] w-[120vw] opacity-70 filter blur-[8px] pointer-events-none"
        >
          <svg viewBox="0 0 1400 160" className="w-full h-32" preserveAspectRatio="none">
            <defs>
              <linearGradient id="cloudGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#6b468a" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#b28ec7" stopOpacity="0.95" />
                <stop offset="100%" stopColor={iceWhite} stopOpacity="1" />
              </linearGradient>
            </defs>
            <path
              d="M-50,110 C20,50 120,40 220,70 C310,30 420,40 520,85 C640,110 740,90 850,115 C950,80 1080,45 1200,65 C1300,30 1400,60 1450,100 L1450,160 L-50,160 Z"
              fill="url(#cloudGrad1)"
            />
          </svg>
        </motion.div>

        <motion.div
          style={{ 
            x: layer2X, 
            y: layer2Y, 
            scaleY: blobScaleY2,
            willChange: 'transform',
          }}
          className="absolute bottom-2 -left-[10vw] w-[120vw] opacity-90 filter blur-[5px] pointer-events-none"
        >
          <svg viewBox="0 0 1400 140" className="w-full h-28" preserveAspectRatio="none">
            <defs>
              <linearGradient id="cloudGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#a783c2" stopOpacity="0.8" />
                <stop offset="45%" stopColor="#e8daef" stopOpacity="0.98" />
                <stop offset="100%" stopColor={iceWhite} stopOpacity="1" />
              </linearGradient>
            </defs>
            <path
              d="M-50,90 C40,25 150,30 260,65 C360,95 480,75 580,95 C700,55 820,70 930,90 C1050,45 1160,25 1270,55 C1350,75 1410,65 1450,85 L1450,140 L-50,140 Z"
              fill="url(#cloudGrad2)"
            />
          </svg>
        </motion.div>

        <motion.div 
          style={{ 
            x: layer3X, 
            y: layer3Y, 
            scaleY: blobScaleY3,
            willChange: 'transform',
            color: iceWhite,
          }}
          className="relative z-10 -left-[10vw] w-[120vw] filter blur-[3.5px] pointer-events-none origin-bottom"
        >
          <svg viewBox="0 0 1400 120" className="w-full h-20 sm:h-24 block fill-current" preserveAspectRatio="none">
            <path d="M-50,70 C50,10 180,15 280,50 C380,80 500,60 610,75 C720,40 850,55 960,75 C1070,25 1200,10 1310,40 C1380,60 1420,50 1450,65 L1450,120 L-50,120 Z" />
          </svg>
        </motion.div>

      </div>

      <div 
        style={{ backgroundColor: iceWhite }}
        className="relative z-20 w-full -mt-2 pt-2 border-none outline-none pb-[env(safe-area-inset-bottom)]"
      >
        <div 
          className="absolute top-full left-0 right-0 h-[50vh] pointer-events-none"
          style={{ backgroundColor: iceWhite }}
        />

        <div 
          className="absolute -top-6 left-0 right-0 h-6 pointer-events-none z-10"
          style={{
            background: `linear-gradient(to top, ${iceWhite}, transparent)`,
          }}
        />

        <div 
          style={{ color: textColor }}
          className="relative z-40 w-[92%] mx-auto py-6 flex flex-col lg:flex-row items-center justify-between gap-4 font-body text-xs tracking-wider"
        >
          <p className="text-center lg:text-left">
            © {new Date().getFullYear()} Zimeng Zhang
          </p>

          <p className="text-center lg:text-right normal-case tracking-normal sm:text-xs text-[11px] opacity-90">
            Built with Next.js + Tailwind CSS + Motion. <span className="inline-block">Myzar is a custom typeface designed by Zimeng.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
