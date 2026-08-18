'use client';

import FadeIn from '@/components/FadeIn';

interface Project {
  id: string;
  title: string;
  description: string;
  url: string;
  year: string;
}

const PROJECTS: Project[] = [
  {
    id: '01',
    title: '2262 VR',
    description:
      'Free, browser-based tool for onboarding rookies to FIRST by introducing coding, driving, and playing a sample match in a 2D, 1v1 game environment.',
    url: 'https://2262vr.zimengsrealm.com/',
    year: '2026',
  },
  {
    id: '02',
    title: 'INTERSTATE INTERCEPTION',
    description:
      'Car-chase game featuring stylized collision physics, spark and impact effects, and time-warping slow-motion zoom sequences for a responsive experience.',
    url: 'https://interstateinterception.zimengsrealm.com/',
    year: '2025',
  },
  {
    id: '03',
    title: 'LET ME SEARCH THAT',
    description:
      'Satirical modernized recreation of LMGTFY that plays a searching animation to send to those who are too lazy to search a question themselves.',
    url: 'https://search.zimengsrealm.com/',
    year: '2025',
  },
  {
    id: '04',
    title: 'CANNON CURSOR',
    description:
      'Cursor-based game featuring simplistic graphics, selective difficulties, and unique cannon-shooting mechanics for a fun and challenging experience.',
    url: 'https://cannoncursor.zimengsrealm.com/',
    year: '2024',
  },
  {
    id: '05',
    title: 'INQUIRY PAD',
    description:
      'Interactive STEM learning platform integrating custom physical hardware with real-time software feedback engines for dynamic assignment assistance.',
    url: '',
    year: 'ANON 2027',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="min-h-screen pt-24 pb-12 w-full">
      <FadeIn delay={0.1} direction="up">
        <h2 className="font-display text-[clamp(1.5rem,5vw,5rem)] text-silver1 flex items-baseline gap-[clamp(0.5rem,1.5vw,1rem)] leading-none">
          <span className="text-transparent [-webkit-text-stroke:1px_var(--color-blue)] sm:[-webkit-text-stroke:2px_var(--color-blue)] text-[clamp(1rem,4vw,3rem)] leading-none">
            #
          </span>
          PROJECTS
        </h2>
      </FadeIn>

      <div className="mt-12 sm:mt-16 border-t border-silver1/20 divide-y divide-silver1/20">
        {PROJECTS.map((project, index) => {
          const hasUrl = Boolean(project.url);
          const Component = hasUrl ? 'a' : 'div';
          
          return (
            <FadeIn key={project.id} delay={0.2 + index * 0.15} direction="up">
              <Component
                {...(hasUrl ? {
                  href: project.url,
                  target: '_blank',
                  rel: 'noopener noreferrer',
                } : {})}
                className={`group relative block w-full py-8 sm:py-10 px-4 sm:px-6 bg-transparent overflow-hidden transition-all duration-500 ${
                  !hasUrl ? 'cursor-default' : ''
                }`}
              >
                {hasUrl && (
                  <div className="absolute top-0 left-0 h-[2px] w-full bg-cyan -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                )}

                {hasUrl && (
                  <div className="absolute inset-0 bg-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                )}

                <div className="relative z-10 flex flex-col gap-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-baseline gap-[clamp(0.75rem,2vw,1.5rem)]">
                      <span className="font-display text-pink text-[clamp(0.75rem,2.5vw,1.75rem)] tracking-widest leading-none">
                        {project.id}
                      </span>
                      <h3
                        className={`font-body font-bold text-[clamp(1rem,3.5vw,3.25rem)] text-silver1 tracking-wide leading-tight transition-colors ${
                          hasUrl ? 'group-hover:text-cyan' : ''
                        }`}
                      >
                        {project.title}
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
                        {project.year}
                      </span>
                      {hasUrl && (
                        <span className="font-body text-lg sm:text-2xl text-gray transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-cyan">
                          ↗
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="font-body text-gray text-sm sm:text-base leading-relaxed max-w-3xl">
                    {project.description}
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
