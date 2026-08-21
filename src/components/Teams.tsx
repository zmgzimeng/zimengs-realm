'use client';

import { useRef, MouseEvent } from 'react';
import Image from 'next/image';
import { motion, useAnimationControls, Variants } from 'framer-motion';
import FadeIn from '@/components/FadeIn';
import { TEAMS } from '@/lib/teams';

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

const TOTAL_DURATION = 0.6;

function TeamCard({ team, index }: { team: typeof TEAMS[number]; index: number }) {
  const controls = useAnimationControls();
  const currentOffset = useRef(100);
  const hasUrl = Boolean(team.url);
  const Component = hasUrl ? 'a' : 'div';

  const handleMouseEnter = (e: MouseEvent<HTMLElement>) => {
    if (!hasUrl) return;

    const pos = currentOffset.current;
    
    let target = 0;
    let dist = Math.abs(pos - target);

    if (pos < -50) {
      target = 0;
      dist = Math.abs(pos - target);
    }

    const duration = Math.max(0.05, (dist / 100) * TOTAL_DURATION);

    controls.start({
      strokeDashoffset: target,
      transition: {
        duration,
        ease: 'easeOut',
      },
    });
  };

  const handleMouseLeave = (e: MouseEvent<HTMLElement>) => {
    if (!hasUrl) return;

    const pos = currentOffset.current;

    const distToForwardExit = Math.abs(pos - (-100));
    const distToBackwardReset = Math.abs(100 - pos);

    let target = -100;
    let dist = distToForwardExit;

    if (distToBackwardReset < distToForwardExit) {
      target = 100;
      dist = distToBackwardReset;
    }

    const duration = Math.max(0.05, (dist / 100) * TOTAL_DURATION);

    controls.start({
      strokeDashoffset: target,
      transition: {
        duration,
        ease: 'easeOut',
      },
    });
  };

  return (
    <FadeIn delay={0.2 + index * 0.15} direction="up" className="relative mb-8 sm:mb-12">
      <div className="relative group w-full">
        <div className="absolute inset-0 border border-pink translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500 ease-out pointer-events-none z-0" />

        <Component
          {...(hasUrl
            ? {
                href: team.url,
                target: '_blank',
                rel: 'noopener noreferrer',
              }
            : {})}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`relative z-10 block w-full p-6 sm:p-10 md:p-12 bg-bg border border-silver1/20 overflow-hidden transition-all duration-500 ${
            !hasUrl ? 'cursor-default' : ''
          }`}
        >
          {hasUrl && (
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full z-20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                fill="none"
                stroke="var(--color-cyan)"
                strokeWidth="3"
                pathLength={100}
                strokeDasharray="100 100"
                initial={{ strokeDashoffset: 100 }}
                animate={controls}
                onUpdate={(latest) => {
                  if (typeof latest.strokeDashoffset === 'number') {
                    currentOffset.current = latest.strokeDashoffset;
                  }
                }}
                onAnimationComplete={() => {
                  if (currentOffset.current <= -100 || currentOffset.current >= 100) {
                    controls.set({ strokeDashoffset: 100 });
                    currentOffset.current = 100;
                  }
                }}
              />
            </svg>
          )}

          {hasUrl && (
            <div className="absolute inset-0 bg-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
          )}

          <div className="relative z-10 flex flex-col gap-4 sm:gap-6">
            <div className="flex items-center gap-4 sm:gap-6 min-w-0">
              
              <div className="relative shrink-0 self-center">
                <Image
                  src={team.logo}
                  alt={`${team.title} Logo`}
                  width={80}
                  height={80}
                  className="h-16 w-16 sm:h-20 sm:w-20 object-contain"
                />
              </div>

              <div className="flex flex-col gap-1 min-w-0 flex-1">
                
                <div className="flex items-center justify-between gap-4">
                  <h3
                    className={`font-body font-bold text-[clamp(1.25rem,3.5vw,3rem)] text-silver1 tracking-wide leading-tight transition-colors transition-transform duration-300 ${
                      hasUrl ? 'group-hover:text-cyan group-hover:translate-x-2' : ''
                    }`}
                  >
                    {team.title}
                  </h3>

                  <div className="hidden sm:flex items-center gap-3 shrink-0">
                    <span
                      className={`font-body text-xs md:text-sm px-3 md:px-4 py-1 md:py-1.5 rounded-full uppercase tracking-widest ${
                        hasUrl
                          ? 'text-blue border border-blue'
                          : 'text-gray border border-gray'
                      }`}
                    >
                      {team.year}
                    </span>
                    {hasUrl && (
                      <span className="relative inline-block h-5 w-5 overflow-hidden group-hover:translate-x-2 transition-transform duration-300">
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

                <p
                  className={`font-body text-[clamp(0.75rem,2vw,1.25rem)] sm:text-xl md:text-2xl text-silver1 tracking-wide uppercase leading-tight transition-colors transition-transform duration-300 ${
                    hasUrl ? 'group-hover:text-cyan group-hover:translate-x-2' : ''
                  }`}
                >
                  {team.subtitle}
                </p>
              </div>

            </div>
            <p className="font-body text-gray text-sm sm:text-base leading-relaxed max-w-3xl mt-1 sm:mt-2">
              {team.description}
            </p>

            <div className="flex sm:hidden items-center justify-end gap-3 mt-2">
              <span
                className={`font-body text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-widest ${
                  hasUrl
                    ? 'text-blue border border-blue'
                    : 'text-gray border border-gray'
                }`}
              >
                {team.year}
              </span>
              {hasUrl && (
                <span className="relative inline-block h-4 w-4 overflow-hidden">
                  <img
                    src="/accents/element5.svg"
                    alt="Chevron"
                    className="h-full w-full object-contain absolute inset-0"
                  />
                </span>
              )}
            </div>

          </div>
        </Component>
      </div>
    </FadeIn>
  );
}

export default function Teams() {
  const teamsChars = ['T', 'E', 'A', 'M', 'S'];

  return (
    <section id="teams" className="pt-20 pb-20 sm:pb-16 w-full">
      <motion.h2 
        variants={cascadeContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6, margin: '0px 0px -80px 0px' }}
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
          {teamsChars.map((char, index) => (
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

      <div className="mt-12 sm:mt-16 mb-[-1.5rem] sm:mb-0">
        {TEAMS.map((team, index) => (
          <TeamCard key={team.id} team={team} index={index} />
        ))}
      </div>
    </section>
  );
}
