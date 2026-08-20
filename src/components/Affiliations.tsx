'use client';

import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
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

export default function Affiliations() {
  const comingSoonChars = 'COMING SOON'.split('');

  return (
    <section id="affiliations" className="min-h-screen pt-24 pb-12 w-full">
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
          {comingSoonChars.map((char, index) => (
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
    </section>
  );
}
