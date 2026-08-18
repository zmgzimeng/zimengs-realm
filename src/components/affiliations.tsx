'use client';

import Image from 'next/image';
import FadeIn from '@/components/fadeIn';

export default function Affiliations() {
  return (
    <section id="affiliations" className="min-h-screen pt-24 pb-12 w-full">
      <FadeIn delay={0.1} direction="up">
        <h2 className="font-display text-[clamp(1.5rem,5vw,5rem)] text-white flex items-baseline gap-[clamp(0.5rem,1.5vw,1rem)] leading-none">
          <span className="text-transparent [-webkit-text-stroke:1px_var(--color-blue)] sm:[-webkit-text-stroke:2px_var(--color-blue)] text-[clamp(1rem,4vw,3rem)] leading-none">
            #
          </span>
          COMING SOON
        </h2>
      </FadeIn>
    </section>
  );
}
