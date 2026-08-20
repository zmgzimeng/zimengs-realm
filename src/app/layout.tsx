import type { Metadata } from "next";
import type { Viewport } from "next";
import { myzar, ibmPlexMono, bilboSwashCaps } from "@/lib/fonts";
import CustomScrollbar from "../components/CustomScrollbar";
import ScrollReset from "@/components/ScrollReset";
import "@/app/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://zimengsrealm.com"),
  title: {
    default: "Zimeng's Realm",
    template: "%s | Zimeng's Realm",
  },
  description:
    "Welcome to Zimeng's Realm. Explore a portfolio featuring interactive web applications, robotics projects, and more.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Zimeng's Realm",
    description:
      "Welcome to Zimeng's Realm. Explore a portfolio featuring interactive web applications, robotics projects, and more.",
    url: "https://zimengsrealm.com",
    siteName: "Zimeng's Realm",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://zimengsrealm.com/#website",
        url: "https://zimengsrealm.com",
        name: "Zimeng's Realm",
        description:
          "Welcome to Zimeng's Realm. Explore a portfolio featuring interactive web applications, robotics projects, and more.",
      },
      {
        "@type": "SiteNavigationElement",
        "@id": "https://zimengsrealm.com/#navigation",
        name: [
          "2262 VR",
          "Interstate Interception",
          "Let Me Search That",
          "Cannon Cursor",
          "Inquiry Pad",
        ],
        url: [
          "https://2262vr.zimengsrealm.com",
          "https://interstateinterception.zimengsrealm.com",
          "https://search.zimengsrealm.com",
          "https://cannoncursor.zimengsrealm.com",
          "https://zimengsrealm.com/#projects",
        ],
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${myzar.variable} ${ibmPlexMono.variable} ${bilboSwashCaps.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body 
        className="font-body bg-slate-950 text-slate-100 min-h-screen"
        suppressHydrationWarning
      >
        <ScrollReset />
        <CustomScrollbar>{children}</CustomScrollbar>
      </body>
    </html>
  );
}
