import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { fontDisplay, fontLabel } from "@/lib/fonts";
import SmoothScroll from "@/components/motion/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import { siteConfig } from "@/data/siteConfig";
import "./globals.css";

export const metadata: Metadata = {
  title: `${siteConfig.name} | The Ultimate Burger Club`,
  description: siteConfig.description,
};

export const viewport: Viewport = {
  themeColor: "#12372A",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${fontDisplay.variable} ${fontLabel.variable}`}>
      <body>
        <SmoothScroll>
          {/* The Navbar lives in the layout, so every page gets it. */}
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}