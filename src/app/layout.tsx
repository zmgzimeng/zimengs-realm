import type { Metadata } from "next";
import { myzar, jetbrainsMono } from "@/app/ui/fonts";
import '@/app/ui/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://zimengsrealm.com'),
  title: {
    default: "Zimeng's Realm",
    template: "%s | Zimeng's Realm",
  },
  description: "Welcome to Zimeng's Realm. Explore a portfolio featuring interactive web applications, robotics projects, and more.",
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: "Zimeng's Realm",
    description: "Welcome to Zimeng's Realm. Explore a portfolio featuring interactive web applications, robotics projects, and more.",
    url: 'https://zimengsrealm.com',
    siteName: "Zimeng's Realm",
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://zimengsrealm.com/#website',
        'url': 'https://zimengsrealm.com',
        'name': "Zimeng's Realm",
        'description': "Welcome to Zimeng's Realm. Explore a portfolio featuring interactive web applications, robotics projects, and more.",
      },
      {
        '@type': 'SiteNavigationElement',
        '@id': 'https://zimengsrealm.com/#navigation',
        'name': ['2262 VR', 'Interstate Interception'],
        'url': [
          'https://2262vr.zimengsrealm.com',
          'https://interstateinterception.zimengsrealm.com'
        ]
      }
    ]
  };

  return (
    <html
      lang="en"
      className={`${myzar.variable} ${jetbrainsMono.variable} h-full w-full overflow-x-hidden antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body 
        className="min-h-full w-full overflow-x-hidden flex flex-col font-body bg-slate-950 text-slate-100"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
