export interface Work {
  id: string;
  title: string;
  description: string;
  url: string;
  year: string;
}

export const WORKS: Work[] = [
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
