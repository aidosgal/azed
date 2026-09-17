import type { Metadata } from "next";
import { gilroy } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Azed — веб и мобильная разработка",
  description:
    "Разработка сайтов и мобильных приложений: от идеи до продакшена. Портфолио и контакты.",
};

/**
 * Applies the saved theme before first paint. Without this, a visitor who
 * chose light mode sees a frame of the default dark theme on every load.
 *
 * This must be a raw <script> in <head> so the parser runs it synchronously,
 * before the body paints. next/script's `beforeInteractive` does NOT work
 * here: it emits `self.__next_s.push(...)` and defers execution to Next's
 * loader during bootstrap, which is after the first paint — so the flash
 * comes back. React logs a dev warning about script tags in the tree; it
 * concerns client re-renders, which don't apply to a one-shot boot script.
 * It mutates <html>, hence suppressHydrationWarning.
 */
const themeInit = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark"){document.documentElement.dataset.theme=t}}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${gilroy.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
