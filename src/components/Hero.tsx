'use client';

import { useState, useRef, MouseEvent } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, Variants } from 'framer-motion';
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

const cascadeLetterVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.215, 0.61, 0.355, 1],
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

export default function Hero() {
  const [isBtnHovered, setIsBtnHovered] = useState(false);
  const btnTextRef = useRef<HTMLSpanElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 250, damping: 30, mass: 0.5 };
  const textX = useSpring(mouseX, springConfig);
  const textY = useSpring(mouseY, springConfig);

  const handleBtnMouseEnter = () => {
    setIsBtnHovered(true);
  };

  const handleBtnMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!btnTextRef.current) return;
    const rect = btnTextRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = (e.clientX - centerX) * 0.2;
    const distanceY = (e.clientY - centerY) * 0.2;

    mouseX.set(Math.max(-5, Math.min(5, distanceX)));
    mouseY.set(Math.max(-5, Math.min(5, distanceY)));
  };

  const handleBtnMouseLeave = () => {
    setIsBtnHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const { scrollY } = useScroll();

  const smoothScrollY = useSpring(scrollY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const yParallax = useTransform(smoothScrollY, [0, 1000], [0, -400]);
  const extraRotation = useTransform(smoothScrollY, [0, 1000], [0, 40]);
  const scrollOpacity = useTransform(smoothScrollY, [0, 600], [1, 0]);

  const handleTakeMeSomewhere = () => {
    const worksSection = document.getElementById('works');
    if (worksSection) {
      worksSection.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', '#works');
    }

    const validWorks = WORKS.filter((work) => Boolean(work.url));
    if (validWorks.length === 0) return;

    const randomIndex = Math.floor(Math.random() * validWorks.length);
    const randomProject = validWorks[randomIndex];

    window.open(randomProject.url, '_blank', 'noopener,noreferrer');
  };

  const zimengsChars = ['Z', 'I', 'M', 'E', 'N', 'G', "'", 'S'];
  const realmChars = ['R', 'E', 'A', 'L', 'M'];

  return (
    <section 
      id="top"
      className="relative min-h-screen flex flex-col justify-center items-start pt-24 pb-12 w-full"
    >
      <div className="z-10 w-full overflow-visible">

        <FadeIn delay={0.1} direction="down">
          <p className="font-body text-[10px] sm:text-sm tracking-widest text-gray uppercase mb-10">
            ZIMENG ZHANG &nbsp;•&nbsp; MASSACHUSETTS USA &nbsp;•&nbsp; CLASS OF 2027
          </p>
        </FadeIn>

        <FadeIn delay={0.2} direction="up">
          <div className="flex flex-col items-start gap-10 mb-4">
            <img 
              src="/accents/element1.svg" 
              alt="Chevron"
              style={{ height: 'clamp(0.75rem, 1.5vw, 1rem)' }}
              className="w-auto opacity-80"
            />
            <motion.div 
              variants={cascadeContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.25}
              className="font-body text-[clamp(0.875rem,1.5vw,1.5rem)] sm:text-xl lg:text-2xl font-bold tracking-widest text-silver1 uppercase flex flex-col gap-2"
            >
              <span>
                {"WELCOME TO".split('').map((char, index) => (
                  <motion.span
                    key={index}
                    variants={cascadeLetterVariants}
                    className="inline-block whitespace-pre"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            </motion.div>
          </div>
        </FadeIn>

        <div className="my-2 overflow-visible">
          <div className="[clip-path:inset(-200px_-200px_0px_-200px)]">
            <motion.h1 
              variants={cascadeContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.35}
              className="font-display text-[clamp(2rem,8vw,8rem)] tracking-normal sm:tracking-wider text-silver1 leading-none whitespace-nowrap overflow-visible"
            >
              {zimengsChars.map((char, index) => (
                <motion.span
                  key={index}
                  variants={riseLetterVariants}
                  style={{ transformOrigin: 'bottom left' }}
                  className="inline-block whitespace-pre"
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>
          </div>

          <div className="[clip-path:inset(-200px_-200px_0px_-200px)] mt-2">
            <motion.h1 
              variants={cascadeContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.55}
              className="font-display text-[clamp(2rem,8vw,8rem)] tracking-normal sm:tracking-wider text-transparent [-webkit-text-stroke:1px_#5A79B3] sm:[-webkit-text-stroke:2px_#5A79B3] leading-none whitespace-nowrap overflow-visible"
            >
              {realmChars.map((char, index) => (
                <motion.span
                  key={index}
                  variants={riseLetterVariants}
                  style={{ transformOrigin: 'bottom left' }}
                  className="inline-block whitespace-pre"
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>
          </div>
        </div>

        <FadeIn delay={0.5} direction="up" className="mt-12 sm:mt-20">
          <div>
            <button
              type="button"
              onClick={handleTakeMeSomewhere}
              onMouseEnter={handleBtnMouseEnter}
              onMouseMove={handleBtnMouseMove}
              onMouseLeave={handleBtnMouseLeave}
              className="inline-flex items-center gap-[clamp(0.3rem,1.5vw,0.75rem)] px-[clamp(1rem,3vw,1.5rem)] py-[clamp(0.5rem,1.5vw,0.75rem)] rounded-lg backdrop-blur-md bg-[var(--color-bg)]/40 border sm:border-2 border-[var(--color-pink)]/50 text-[var(--color-pink)] font-body font-bold text-[clamp(0.75rem,1.8vw,0.875rem)] tracking-wide hover:bg-[var(--color-bg)]/70 hover:border-[var(--color-pink)] hover:text-[var(--color-cyan)] transition-all duration-300 group cursor-pointer"
            >
              <motion.span
                ref={btnTextRef}
                style={{ x: textX, y: textY }}
                className="inline-block"
              >
                TAKE ME SOMEWHERE
              </motion.span>
              <span className="relative inline-block h-4 w-4 overflow-hidden group-hover:translate-x-1 transition-transform duration-300">
                <img 
                  src="/accents/element6.svg"
                  alt="Chevron"
                  className="h-full w-full object-contain group-hover:opacity-0 transition-opacity duration-300 absolute inset-0"
                />
                <img 
                  src="/accents/element7.svg"
                  alt="Chevron"
                  className="h-full w-full object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-0"
                />
              </span>
            </button>
          </div>
        </FadeIn>

      </div>

      <motion.div
        initial={{ y: 220, opacity: 0, rotate: -8 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        transition={{
          duration: 1.2,
          delay: 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute -bottom-80 -right-150 w-[1000px] h-[1000px] sm:w-[1200px] sm:h-[1200px] pointer-events-none select-none z-0"
      >
        <motion.div
          style={{ 
            y: yParallax, 
            rotate: extraRotation,
            opacity: scrollOpacity 
          }}
          className="w-full h-full will-change-transform transform-gpu"
        >
          <motion.img
            src="/myzar.svg"
            alt="Myzar"
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ 
              opacity: 0.2,
              rotate: 360 
            }}
            transition={{
              opacity: { duration: 1.2, delay: 0.35, ease: 'easeOut' },
              rotate: { duration: 80, repeat: Infinity, ease: 'linear' }
            }}
            className="w-full h-full"
          />
        </motion.div>
      </motion.div>

    </section>
  );
}
