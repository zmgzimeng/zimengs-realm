import localFont from 'next/font/local';
import { JetBrains_Mono } from 'next/font/google';

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

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});
