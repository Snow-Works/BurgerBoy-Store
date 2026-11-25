import { Lexend_Zetta, Sansita_Swashed } from "next/font/google";

// Display font: the gaint "Burger Club" headline and the nav links.
export const fontDisplay = Sansita_Swashed({
    subsets: ["latin"],
    weight: ["500", "700"],
    variable: "--font-display", //exposes the font as a css
    display: "swap",
});


// Label font: wordmark, "MENU", and small uppercase labels (wide and bold).
export const fontLabel = Lexend_Zetta({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-label",
    display: "swap",
});
