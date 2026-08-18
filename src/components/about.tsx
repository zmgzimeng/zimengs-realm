'use client';

import Image from 'next/image';
import FadeIn from '@/components/fadeIn';

export default function About() {
  return (
    <section id="about" className="min-h-screen pt-24 pb-12 w-full">
      <FadeIn delay={0.1} direction="up">
        <h2 className="font-display text-[clamp(1.5rem,5vw,5rem)] text-white flex items-baseline gap-[clamp(0.5rem,1.5vw,1rem)] leading-none">
          <span className="text-transparent [-webkit-text-stroke:1px_var(--color-blue)] sm:[-webkit-text-stroke:2px_var(--color-blue)] text-[clamp(1rem,4vw,3rem)] leading-none">
            #
          </span>
          ABOUT
        </h2>
      </FadeIn>

      <FadeIn delay={0.25} direction="up" className="mt-12 sm:mt-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          <div className="relative md:col-span-5 w-full aspect-[16/9] group">
            <div className="absolute inset-0 border border-pink translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500 ease-out pointer-events-none z-0" />

            <div className="relative w-full h-full overflow-hidden z-10">
              <Image
                src="/desk.jpg"
                alt="Workstation"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover object-center grayscale-[50%] group-hover:grayscale-0 transition-all duration-500"
                priority
              />
            </div>
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
                <p className="font-script text-3xl sm:text-4xl md:text-4xl lg:text-5xl text-white/90 leading-snug">
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
