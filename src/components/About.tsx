'use client';

import { useState, useRef, MouseEvent } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, Variants } from 'framer-motion';
import FadeIn from '@/components/FadeIn';

const cascadeContainerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: (customDelay: number = 0) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.045,
      delayChildren: customDelay,
    },
  }),
};

const hashtagVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const riseLetterVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: '120%', 
    rotate: 12,
  },
  visible: {
    opacity: 1,
    y: '0%',
    rotate: 0,
    transition: {
      duration: 0.95,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function About() {
  const aboutChars = ['A', 'B', 'O', 'U', 'T'];

  const [isImgHovered, setIsImgHovered] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 120, damping: 35, mass: 0.8 };
  const imgX = useSpring(mouseX, springConfig);
  const imgY = useSpring(mouseY, springConfig);

  const handleImgMouseEnter = () => {
    setIsImgHovered(true);
  };

  const handleImgMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = (e.clientX - centerX) * 0.05;
    const distanceY = (e.clientY - centerY) * 0.05;

    mouseX.set(Math.max(-5, Math.min(5, distanceX)));
    mouseY.set(Math.max(-5, Math.min(5, distanceY)));
  };

  const handleImgMouseLeave = () => {
    setIsImgHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section id="about" className="min-h-screen pt-24 pb-12 w-full">
      <motion.h2 
        variants={cascadeContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6, margin: "0px 0px -80px 0px" }}
        custom={0.1}
        className="font-display text-[clamp(1.5rem,5vw,5rem)] text-silver1 flex items-baseline gap-[clamp(0.5rem,1.5vw,1rem)] leading-none overflow-visible"
      >
        <motion.span 
          variants={hashtagVariants}
          className="inline-block text-transparent [-webkit-text-stroke:1px_var(--color-blue)] sm:[-webkit-text-stroke:2px_var(--color-blue)] text-[clamp(1rem,4vw,3rem)] leading-none select-none"
        >
          #
        </motion.span>

        <span className="inline-flex overflow-visible [clip-path:inset(-200px_-200px_0px_-200px)]">
          {aboutChars.map((char, index) => (
            <motion.span
              key={index}
              variants={riseLetterVariants}
              style={{ transformOrigin: 'bottom center' }}
              className="inline-block whitespace-pre"
            >
              {char}
            </motion.span>
          ))}
        </span>
      </motion.h2>

      <FadeIn delay={0.25} direction="up" className="mt-12 sm:mt-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          <div 
            ref={imgRef}
            onMouseEnter={handleImgMouseEnter}
            onMouseMove={handleImgMouseMove}
            onMouseLeave={handleImgMouseLeave}
            className="relative md:col-span-5 w-full aspect-[16/9] group cursor-pointer"
          >
            <div className="absolute inset-0 border border-pink translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500 ease-out pointer-events-none z-0" />

            <motion.div 
              style={{ x: imgX, y: imgY }}
              className="relative w-full h-full overflow-hidden z-10 will-change-transform"
            >
              <Image
                src="/desk.jpg"
                alt="Workstation"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover object-center grayscale-[50%] group-hover:grayscale-0 transition-all duration-500"
                priority
              />
            </motion.div>
          </div>

          <div className="md:col-span-7 flex flex-col justify-center h-full pt-2 md:pt-0">
            <div className="flex items-stretch gap-6">
              
              <div className="flex flex-col items-center justify-between py-1">
                <div className="w-[2px] h-full bg-blue" />
                <img 
                  src="/accents/element3.svg" 
                  alt="Chevron"
                  className="h-8 w-auto my-2 select-none"
                />
                <div className="w-[2px] h-full bg-blue" />
              </div>

              <blockquote className="py-2">
                <p className="font-script text-3xl sm:text-4xl md:text-4xl lg:text-5xl text-silver1/90 leading-snug">
                  “ To achieve great things, two things are needed—a plan, and not quite enough time.”
                </p>
              </blockquote>

            </div>
          </div>

        </div>
      </FadeIn>

      <FadeIn delay={0.4} direction="up" className="mt-16 sm:mt-20 max-w-4xl">
        <div className="space-y-8 font-body text-gray text-sm sm:text-base leading-relaxed">
          <p>
            I'm Zimeng—a developer and graphics hobbyist based in Massachusetts. I spend my time designing online and building web experiences.
          </p>
          <p>
            My track: front-end, robotics, and experimental interfaces. I create a variety of works, from independent projects to competitive solutions.
          </p>
        </div>
      </FadeIn>
    </section>
  );
}
