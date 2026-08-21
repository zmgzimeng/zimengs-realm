export interface Team {
  id: string;
  logo: string;
  title: string;
  subtitle: string;
  description: string;
  url: string;
  year: string;
}

export const TEAMS: Team[] = [
  {
    id: '01',
    logo: '/logos/logo1.svg',
    title: 'HOLLISTON ROBOPANTHERS',
    subtitle: 'FIRST ROBOTICS COMPETITION TEAM 2262',
    description:
      'Competitive high school robotics team designing, constructing, and programming autonomous and driver-controlled robots for the annual FIRST Robotics Competition.',
    url: 'https://team2262.zimengsrealm.com/',
    year: '2024 - Present',
  },
  {
    id: '02',
    logo: '/logos/logo2.svg',
    title: 'MASSREF',
    subtitle: 'MASSACHUSETTS STATE REFEREE COMMITTEE',
    description:
      'BAYS certified referee enforcing match laws across local travel games. Managing high-intensity matches, making real-time decisions, and resolving conflict on the field.',
    url: 'https://massref.net/',
    year: '2022 - Present',
  },
];
