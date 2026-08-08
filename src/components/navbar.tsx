'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Affiliations', href: '#affiliations' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [rotation, setRotation] = useState(0);

  const handleLogoHover = () => {
    setRotation((prev) => prev + 360);
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
      className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-[var(--color-bg)]/60 border-b border-solid [border-image:linear-gradient(to_right,transparent,var(--color-silver2),var(--color-silver1),var(--color-silver2),transparent)_1]"
    >
      <div className="w-[92%] mx-auto h-18 flex items-center justify-between">
        
        <a href="#top" className="flex items-center gap-3 cursor-pointer">
          <motion.img
            src="/myzar.svg"
            alt="Zimeng's Realm Logo"
            className="w-12 h-12 drop-shadow-[0_0_8px_rgba(111,255,233,0.3)]"
            onMouseEnter={handleLogoHover}
            animate={{ rotate: rotation }}
            transition={{
              duration: 0.8,
              // Custom cubic bezier tan(x)
              ease: [0.7, 0, 0.3, 1],
            }}
          />
        </a>

        <nav className="hidden md:flex items-center gap-8 font-body text-xs tracking-wider uppercase text-[var(--color-silver1)]">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative py-1 transition-colors duration-300 ease-out hover:text-cyan group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 h-[1px] w-full bg-pink scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5 font-body text-xs text-silver2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] tracking-tight">REALM ONLINE</span>
        </div>

      </div>
    </motion.header>
  );
}
