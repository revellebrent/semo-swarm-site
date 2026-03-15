import type { Metadata } from "next";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { siteConfig } from "@/data/site";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.shortName} | Premium Youth Soccer Club`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description:
    "Semo Swarm Soccer Club develops ambitious youth players through elite training, competitive teams, and a strong club identity across Southeast Missouri.",
  alternates: {
    canonical: siteConfig.siteUrl,
  },
  openGraph: {
    title: `${siteConfig.shortName} | Premium Youth Soccer Club`,
    description:
      "Semo Swarm Soccer Club develops ambitious youth players through elite training, competitive teams, and a strong club identity across Southeast Missouri.",
    url: siteConfig.siteUrl,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.shortName} | Premium Youth Soccer Club`,
    description:
      "Semo Swarm Soccer Club develops ambitious youth players through elite training, competitive teams, and a strong club identity across Southeast Missouri.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="text-white antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-amber-300 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-slate-950"
        >
          Skip to content
        </a>
        <div className="relative min-h-screen overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 -z-10 h-[30rem] bg-[radial-gradient(circle,_rgba(245,158,11,0.14),_transparent_55%)]"
          />
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
