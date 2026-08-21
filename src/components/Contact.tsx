'use client';

import { useState, useRef, MouseEvent } from 'react';
import { motion, useSpring, useMotionValue, useAnimationControls, Variants } from 'framer-motion';
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

const TOTAL_DURATION = 0.3;

const SOCIAL_LINKS = [
  { label: 'LINKEDIN', href: 'https://www.linkedin.com/in/zmgzimeng', unhovered: '/icons/icon1.svg', hovered: '/icons/icon2.svg' },
  { label: 'GITHUB', href: 'https://github.com/zmgzimeng', unhovered: '/icons/icon3.svg', hovered: '/icons/icon4.svg' },
  { label: 'INSTAGRAM', href: 'https://instagram.com/zmgzimeng', unhovered: '/icons/icon5.svg', hovered: '/icons/icon6.svg' },
  { label: 'GMAIL', href: 'mailto:zimeng.zhang.08@gmail.com', unhovered: '/icons/icon7.svg', hovered: '/icons/icon8.svg' },
];

function MagneticSocialIcon({ href, unhovered, hovered, label }: { href: string; unhovered: string; hovered: string; label: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 250, damping: 30, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const screenFactor = typeof window !== 'undefined' ? Math.min(Math.max(window.innerWidth / 1200, 0.4), 1) : 1;

    const distanceX = (e.clientX - centerX) * 0.2 * screenFactor;
    const distanceY = (e.clientY - centerY) * 0.2 * screenFactor;

    mouseX.set(Math.max(-5 * screenFactor, Math.min(5 * screenFactor, distanceX)));
    mouseY.set(Math.max(-5 * screenFactor, Math.min(5 * screenFactor, distanceY)));
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="relative py-1 inline-flex items-center justify-center">
      <motion.a
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={isHovered ? 'hover' : 'initial'}
        initial="initial"
        style={{ x, y }}
        className="relative z-10 cursor-pointer block"
        aria-label={label}
      >
        <motion.div
          className="relative w-7 h-7 sm:w-9 sm:h-9"
          variants={{
            initial: { y: 0 },
            hover: { y: -2 },
          }}
          transition={{
            duration: 0.2,
            ease: 'easeOut',
          }}
        >
          <img
            src={unhovered}
            alt={label}
            className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${
              isHovered ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <img
            src={hovered}
            alt={`${label} hovered`}
            className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </motion.div>
      </motion.a>
    </div>
  );
}

export default function Contact() {
  const sayHiChars = ['S', 'A', 'Y', ' ', 'H', 'I'];

  const controls = useAnimationControls();
  const currentOffset = useRef(100);
  const [clipRight, setClipRight] = useState(100);
  const textRef = useRef<HTMLAnchorElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 280, damping: 28, mass: 0.5 };
  const headingX = useSpring(mouseX, springConfig);
  const headingY = useSpring(mouseY, springConfig);

  const handleMouseEnter = () => {
    const pos = currentOffset.current;
    
    let target = 0;
    let dist = Math.abs(pos - target);

    if (pos < -50) {
      target = 0;
      dist = Math.abs(pos - target);
    }

    const duration = Math.max(0.03, (dist / 100) * TOTAL_DURATION);

    controls.start({
      strokeDashoffset: target,
      transition: {
        duration,
        ease: 'easeOut',
      },
    });
  };

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!textRef.current) return;
    const rect = textRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const maxDistanceX = rect.width / 2;
    const maxDistanceY = rect.height / 2;

    const screenFactor = typeof window !== 'undefined' ? Math.min(Math.max(window.innerWidth / 1200, 0.4), 1) : 1;

    const rawX = (e.clientX - centerX) * 0.22 * screenFactor;
    const rawY = (e.clientY - centerY) * 0.45 * screenFactor;

    mouseX.set(Math.max(-maxDistanceX, Math.min(maxDistanceX, rawX)));
    mouseY.set(Math.max(-maxDistanceY, Math.min(maxDistanceY, rawY)));
  };

  const handleMouseLeave = () => {
    const pos = currentOffset.current;

    const distToForwardExit = Math.abs(pos - (-100));
    const distToBackwardReset = Math.abs(100 - pos);

    let target = -100;
    let dist = distToForwardExit;

    if (distToBackwardReset < distToForwardExit) {
      target = 100;
      dist = distToBackwardReset;
    }

    const duration = Math.max(0.03, (dist / 100) * TOTAL_DURATION);

    controls.start({
      strokeDashoffset: target,
      transition: {
        duration,
        ease: 'easeOut',
      },
    });

    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section id="contact" className="pt-0 pb-20 w-full">
      <div className="flex flex-col items-start gap-10 mb-8 sm:mb-12">
        <img 
          src="/accents/element1.svg" 
          alt="Chevron"
          className="h-4 w-auto opacity-80"
        />
        
        <FadeIn delay={0.1} direction="up">
          <div className="font-body text-base sm:text-2xl font-bold tracking-widest text-silver1 uppercase flex flex-col gap-2">
            <span>INTERESTING PROBLEM? NEW IDEA?</span>
            <span>OR JUST WANT TO TALK?</span>
          </div>
        </FadeIn>
      </div>

      <div className="my-8 sm:my-12 overflow-visible">
        <div className="[clip-path:inset(-200px_-200px_0px_-200px)] -mr-12 pr-12 inline-block p-6 sm:p-10 -m-6 sm:-m-10">
          <motion.a
            ref={textRef}
            href="https://www.linkedin.com/in/zmgzimeng"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: headingX, y: headingY }}
            className="inline-block cursor-pointer group relative will-change-transform"
          >
            <motion.h2 
              variants={cascadeContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.25}
              className="font-display text-[clamp(3.2rem,8.5vw,6.5rem)] text-transparent [-webkit-text-stroke:1px_#5A79B3] sm:[-webkit-text-stroke:2px_#5A79B3] leading-none flex items-baseline overflow-visible select-none"
            >
              <span className="inline-flex overflow-visible [clip-path:inset(-200px_-200px_0px_-200px)]">
                {sayHiChars.map((char, index) => (
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

            <svg
              className="pointer-events-none absolute inset-0 h-full w-full z-20 overflow-visible opacity-0 hidden"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                fill="none"
                stroke="transparent"
                pathLength={100}
                strokeDasharray="100 100"
                initial={{ strokeDashoffset: 100 }}
                animate={controls}
                onUpdate={(latest) => {
                  if (typeof latest.strokeDashoffset === 'number') {
                    currentOffset.current = latest.strokeDashoffset;
                    let val = latest.strokeDashoffset;
                    if (val >= 0) {
                      setClipRight(val);
                    } else {
                      setClipRight(val); 
                    }
                  }
                }}
                onAnimationComplete={() => {
                  if (currentOffset.current <= -100 || currentOffset.current >= 100) {
                    controls.set({ strokeDashoffset: 100 });
                    currentOffset.current = 100;
                    setClipRight(100);
                  }
                }}
              />
            </svg>

            <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
              <motion.h2 
                variants={cascadeContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0.25}
                aria-hidden="true"
                style={{
                  clipPath: clipRight >= 0 
                    ? `inset(0 ${clipRight}% 0 0)` 
                    : `inset(0 0 0 ${Math.abs(clipRight)}%)`,
                }}
                className="absolute inset-0 font-display text-[clamp(3.2rem,8.5vw,6.5rem)] text-[var(--color-blue)] [-webkit-text-fill-color:var(--color-blue)] leading-none flex items-baseline select-none"
              >
                <span className="inline-flex overflow-visible [clip-path:inset(-200px_-200px_0px_-200px)]">
                  {sayHiChars.map((char, index) => (
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
            </div>
          </motion.a>
        </div>
      </div>

      <div className="mt-6 sm:mt-8">
        <motion.div 
          className="flex flex-wrap items-center gap-6 sm:gap-8"
          variants={cascadeContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.4}
        >
          {SOCIAL_LINKS.map((link) => (
            <motion.div key={link.label} variants={riseLetterVariants}>
              <MagneticSocialIcon
                href={link.href}
                unhovered={link.unhovered}
                hovered={link.hovered}
                label={link.label}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
