'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import FadeIn from '@/components/fadeIn';

export default function Hero() {
  const { scrollY } = useScroll();

  const smoothScrollY = useSpring(scrollY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const yParallax = useTransform(smoothScrollY, [0, 1000], [0, -400]);
  const extraRotation = useTransform(smoothScrollY, [0, 1000], [0, 40]);
  const scrollOpacity = useTransform(smoothScrollY, [0, 600], [1, 0]);

  return (
    <section 
      id="top" 
      className="relative min-h-screen flex flex-col justify-center pt-24 pb-12 w-full px-6 sm:px-8 lg:px-12"
    >
      <div className="max-w-4xl z-10 w-full">

        <FadeIn delay={0.1} direction="down">
          <p className="font-body text-[10px] sm:text-xs tracking-widest text-silver2 uppercase mb-10">
            ZIMENG ZHANG &nbsp;•&nbsp; MASSACHUSETTS USA &nbsp;•&nbsp; CLASS OF 2027
          </p>
        </FadeIn>

        <FadeIn delay={0.2} direction="up">
          <div className="flex flex-col items-start gap-10 mb-4">
            <img 
              src="/accents/element1.svg" 
              alt="Chevron"
              className="h-4 w-auto opacity-80"
            />
            <span className="font-body text-xl sm:text-3xl font-bold tracking-widest text-silver1 uppercase">
              WELCOME TO
            </span>
          </div>
        </FadeIn>

        <FadeIn delay={0.35} direction="up">
          <h1 className="font-display text-[clamp(2rem,8vw,8rem)] tracking-normal sm:tracking-wider text-white leading-none">
            ZIMENG'S
          </h1>
          <h1 className="font-display text-[clamp(2rem,8vw,8rem)] tracking-normal sm:tracking-wider text-transparent [-webkit-text-stroke:2px_#5A79B3] leading-none mt-2">
            REALM
          </h1>
        </FadeIn>

        <FadeIn delay={0.5} direction="up" className="mt-12 sm:mt-20">
          <div>
            <a
              href="#projects"
              className="inline-flex items-center gap-[clamp(0.5rem,1.5vw,0.75rem)] px-[clamp(1rem,3vw,1.5rem)] py-[clamp(0.5rem,1.5vw,0.75rem)] rounded-xl backdrop-blur-md bg-[var(--color-bg)]/40 border-2 border-pink/30 text-pink font-body text-[clamp(0.75rem,1.8vw,0.875rem)] tracking-wide hover:bg-[var(--color-bg)]/70 hover:border-pink/60 hover:text-cyan transition-all duration-300 group"
            >
              // TAKE ME SOMEWHERE
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </FadeIn>

      </div>

      <motion.div
        style={{ 
          y: yParallax, 
          rotate: extraRotation,
          opacity: scrollOpacity 
        }}
        className="absolute -bottom-80 -right-150 w-[1000px] h-[1000px] sm:w-[1200px] sm:h-[1200px] pointer-events-none select-none z-0 will-change-transform transform-gpu"
      >
        <motion.img
          src="/myzar.svg"
          alt=""
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ 
            opacity: 0.2,
            rotate: 360 
          }}
          transition={{
            opacity: { duration: 1.2, delay: 0.2, ease: 'easeOut' },
            rotate: { duration: 80, repeat: Infinity, ease: 'linear' }
          }}
          className="w-full h-full"
        />
      </motion.div>

    </section>
  );
}
