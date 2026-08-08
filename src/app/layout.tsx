import type { Metadata } from "next";
import { myzar, jetbrainsMono } from "@/app/ui/fonts";
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
      className={`${myzar.variable} ${jetbrainsMono.variable} h-full w-full overflow-x-hidden antialiased`}
    >
      <body className="min-h-full w-full overflow-x-hidden flex flex-col font-body bg-slate-950 text-slate-100">
        {children}
      </body>
    </html>
  );
}
