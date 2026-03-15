import type { Metadata } from "next";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { siteConfig } from "@/data/site";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.shortName} | Premium Youth Soccer Club`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description:
    "Semo Swarm Soccer Club develops ambitious youth players through elite training, competitive teams, and a strong club identity across Southeast Missouri.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="text-white antialiased">
        <div className="relative min-h-screen overflow-hidden">
          <div className="absolute inset-x-0 top-0 -z-10 h-[30rem] bg-[radial-gradient(circle,_rgba(245,158,11,0.14),_transparent_55%)]" />
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
