'use client';

import { motion, Variants } from 'framer-motion';
import FadeIn from '@/components/FadeIn';
import { WORKS } from '@/lib/works';

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

export default function Works() {
  const worksChars = ['W', 'O', 'R', 'K', 'S'];

  return (
    <section id="works" className="min-h-screen pt-20 pb-12 w-full">
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
          {worksChars.map((char, index) => (
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

      <div className="mt-12 sm:mt-16 border-t border-silver1/20 divide-y divide-silver1/20">
        {WORKS.map((work, index) => {
          const hasUrl = Boolean(work.url);
          const Component = hasUrl ? 'a' : 'div';
          
          return (
            <FadeIn key={work.id} delay={0.2 + index * 0.15} direction="up">
              <Component
                {...(hasUrl ? {
                  href: work.url,
                  target: '_blank',
                  rel: 'noopener noreferrer',
                } : {})}
                className={`group relative block w-full py-8 sm:py-10 px-4 sm:px-6 bg-transparent overflow-hidden transition-all duration-500 ${
                  !hasUrl ? 'cursor-default' : ''
                }`}
              >
                {hasUrl && (
                  <div className="pointer-events-none absolute top-0 left-0 h-[2px] w-full bg-cyan transition-transform duration-500 ease-out scale-x-0 origin-right group-hover:scale-x-100 group-hover:origin-left" />
                )}

                {hasUrl && (
                  <div className="absolute inset-0 bg-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                )}

                <div className="relative z-10 flex flex-col gap-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-baseline gap-[clamp(0.75rem,2vw,1.5rem)]">
                      <span
                        className={`inline-block font-display text-pink text-[clamp(0.75rem,2.5vw,1.75rem)] tracking-widest leading-none transition-transform duration-300 ease-out ${
                          hasUrl ? 'group-hover:-translate-y-[38%]' : ''
                        }`}
                      >
                        {work.id}
                      </span>

                      <h3
                        className={`font-body font-bold text-[clamp(1rem,3.5vw,3.25rem)] text-silver1 tracking-wide leading-tight transition-colors transition-transform duration-300 ${
                          hasUrl ? 'group-hover:text-cyan group-hover:translate-x-2' : ''
                        }`}
                      >
                        {work.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`font-body text-[9px] sm:text-xs md:text-sm px-2 sm:px-3 md:px-4 py-0.5 sm:py-1 md:py-1.5 rounded-full uppercase tracking-widest ${
                          hasUrl
                            ? 'text-blue border border-blue'
                            : 'text-gray border border-gray'
                        }`}
                      >
                        {work.year}
                      </span>
                      {hasUrl && (
                        <span className="relative inline-block h-4 w-4 sm:h-5 sm:w-5 overflow-hidden group-hover:translate-x-2 transition-transform duration-300">
                          <img
                            src="/accents/element5.svg"
                            alt="Chevron"
                            className="h-full w-full object-contain group-hover:opacity-0 transition-opacity duration-300 absolute inset-0"
                          />
                          <img
                            src="/accents/element7.svg"
                            alt="Chevron"
                            className="h-full w-full object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-0"
                          />
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="font-body text-gray text-sm sm:text-base leading-relaxed max-w-3xl">
                    {work.description}
                  </p>
                </div>
              </Component>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
