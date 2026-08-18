import localFont from 'next/font/local';
import { IBM_Plex_Mono } from 'next/font/google';
import { Bilbo_Swash_Caps } from 'next/font/google';

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

export const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});

export const bilboSwashCaps = Bilbo_Swash_Caps({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-script',
});
