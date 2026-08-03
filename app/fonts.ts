import localFont from "next/font/local";

/**
 * Gilroy is self-hosted from public/fonts/. Only the weights the design
 * system actually uses are wired up (see specs/DESIGN.md): Light/Regular
 * for body copy, SemiBold/Bold/ExtraBold for headings. The remaining
 * weight files (Thin, UltraLight, Medium, Black, Heavy) are left unused —
 * add an entry below if a future design tweak needs one.
 */
export const gilroy = localFont({
  src: [
    {
      path: "../public/fonts/Gilroy-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Gilroy-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Gilroy-Semibold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/Gilroy-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Gilroy-Extrabold.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-gilroy",
  display: "swap",
});
