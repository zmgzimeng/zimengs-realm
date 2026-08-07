import localFont from 'next/font/local';
import { Space_Grotesk } from 'next/font/google';

export const myzar = localFont({
  src: [
    {
      path: '../../../public/fonts/myzar.woff2',
      weight: 'normal',
      style: 'normal',
    },
  ],
  variable: '--font-myzar',
  display: 'swap',
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});
