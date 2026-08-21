'use client';

import { useState, useRef, MouseEvent } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const navLinks = [
  { name: 'Works', href: '#works' },
  { name: 'Teams', href: '#teams' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: 'https://www.linkedin.com/in/zmgzimeng/', external: true },
];

function NavLink({ link }: { link: (typeof navLinks)[number] }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 250, damping: 30, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = (e.clientX - centerX) * 0.2;
    const distanceY = (e.clientY - centerY) * 0.2;

    mouseX.set(Math.max(-5, Math.min(5, distanceX)));
    mouseY.set(Math.max(-5, Math.min(5, distanceY)));
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
        href={link.href}
        target={link.external ? '_blank' : undefined}
        rel={link.external ? 'noopener noreferrer' : undefined}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={isHovered ? 'hover' : 'initial'}
        initial="initial"
        style={{ x, y }}
        className={`relative z-10 transition-colors duration-300 ease-out flex items-center cursor-pointer ${
          isHovered ? 'text-cyan' : 'text-silver1'
        }`}
      >
        <motion.span
          className="inline-block"
          variants={{
            initial: { y: 0 },
            hover: { y: -2 },
          }}
          transition={{
            duration: 0.2,
            ease: 'easeOut',
          }}
        >
          {link.name}
        </motion.span>
      </motion.a>

      <span
        className={`pointer-events-none absolute bottom-0 left-0 h-[1px] w-full bg-pink transition-transform duration-300 ease-out ${
          isHovered
            ? 'scale-x-100 origin-left'
            : 'scale-x-0 origin-right'
        }`}
      />
    </div>
  );
}

export default function Navbar() {
  const [rotation, setRotation] = useState(0);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const logoRef = useRef<HTMLButtonElement>(null);

  const logoMouseX = useMotionValue(0);
  const logoMouseY = useMotionValue(0);

  const springConfig = { stiffness: 250, damping: 30, mass: 0.5 };
  const logoX = useSpring(logoMouseX, springConfig);
  const logoY = useSpring(logoMouseY, springConfig);

  const handleLogoMouseEnter = () => {
    setIsLogoHovered(true);
    setRotation((prev) => prev + 360);
  };

  const handleLogoMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!logoRef.current) return;
    const rect = logoRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = (e.clientX - centerX) * 0.2;
    const distanceY = (e.clientY - centerY) * 0.2;

    logoMouseX.set(Math.max(-5, Math.min(5, distanceX)));
    logoMouseY.set(Math.max(-5, Math.min(5, distanceY)));
  };

  const handleLogoMouseLeave = () => {
    setIsLogoHovered(false);
    logoMouseX.set(0);
    logoMouseY.set(0);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    if (window.location.hash) {
      window.history.replaceState(
        null,
        document.title,
        window.location.pathname + window.location.search
      );
    }
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.6,
        delay: 0.05,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="hidden sm:block fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-[var(--color-bg)]/60 border-b border-solid [border-image:linear-gradient(to_right,transparent,var(--color-silver2),var(--color-silver1),var(--color-silver2),transparent)_1]"
    >
      <div className="w-[92%] mx-auto h-18 flex items-center justify-between">
        <motion.button
          ref={logoRef}
          type="button"
          onClick={scrollToTop}
          onMouseEnter={handleLogoMouseEnter}
          onMouseMove={handleLogoMouseMove}
          onMouseLeave={handleLogoMouseLeave}
          style={{ x: logoX, y: logoY }}
          aria-label="Scroll to top"
          className="flex items-center gap-3 cursor-pointer select-none border-none bg-transparent p-0 outline-none focus:outline-none"
        >
          <motion.img
            src="/myzar.svg"
            alt="Zimeng's Realm"
            className="w-12 h-12 drop-shadow-[0_0_8px_rgba(111,255,233,0.3)]"
            animate={{ 
              rotate: rotation,
              scale: isLogoHovered ? 1.15 : 1,
            }}
            transition={{
              rotate: { duration: 0.8, ease: [0.7, 0, 0.3, 1] },
              scale: { duration: 0.25, ease: 'easeOut' },
            }}
          />
        </motion.button>

        <nav className="flex items-center gap-4 md:gap-8 font-body text-xs tracking-wider uppercase">
          {navLinks.map((link) => (
            <NavLink key={link.name} link={link} />
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2.5 font-body text-gray">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs tracking-tight">REALM ONLINE</span>
        </div>
      </div>
    </motion.header>
  );
}
