import type { Metadata } from "next";
import { myzar, spaceGrotesk } from "@/app/ui/fonts";
import '@/app/ui/globals.css';

export const metadata: Metadata = {
  title: "Zimeng's Realm",
  description: "Welcome to Zimeng's Realm",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${myzar.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body bg-slate-950 text-slate-100">{children}</body>
    </html>
  );
}
