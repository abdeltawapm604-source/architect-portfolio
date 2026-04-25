import type { Metadata } from "next";
import { Bebas_Neue, Syne, JetBrains_Mono } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import IntroLoader from "@/components/IntroLoader";
import "./globals.css";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-syne",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Abdeltawap Tarek El-Tawil | Software Engineer",
  description:
    "Portfolio of Abdeltawap Tarek El-Tawil, Software Engineer. Creating impactful digital solutions with advanced technologies.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${bebas.variable} ${syne.variable} ${mono.variable} noise bg-bg text-white selection:bg-accent/30 selection:text-white overflow-x-hidden w-full max-w-[100vw]`}
      >
        {/* شاشة البداية اللي بتعرض الآية والحديث */}
        <IntroLoader />

        {/* السكرول الناعم اللي بيضم محتوى الموقع كله */}
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}