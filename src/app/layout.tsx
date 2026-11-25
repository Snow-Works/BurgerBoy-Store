import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { fontDisplay, fontLabel } from "@/lib/fonts";
import SmoothScroll from "@/components/motion/SmoothScroll";
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
    // Putting both font variables on <html> makes them usable in all our CSS.
    <html lang="en" className={`${fontDisplay.variable} ${fontLabel.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}