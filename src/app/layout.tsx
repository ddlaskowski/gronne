import type { Metadata } from "next";
import { DM_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gronne-murogflis.no"),
  title: "Grønne Mur og Flis AS | Flis og murarbeid i Oslo",
  description:
    "Grønne Mur og Flis AS utfører flislegging, baderomsarbeid, mur og puss samt betongarbeid i Oslo og omegn.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nb" className={`${dmSans.variable} ${ibmPlexMono.variable}`}>
      <body><Header />{children}</body>
    </html>
  );
}
