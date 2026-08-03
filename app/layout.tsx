import type { Metadata } from "next";
import { gilroy } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Azed — веб и мобильная разработка",
  description:
    "Разработка сайтов и мобильных приложений: от идеи до продакшена. Портфолио и контакты.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${gilroy.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
