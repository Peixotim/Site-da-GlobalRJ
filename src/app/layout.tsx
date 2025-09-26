// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header"; // use o header que preferir
import CookieConsent from "@/components/CookieConsent";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RJ GLOBAL",
  description: "Site da RJ GLOBAL",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-br" className={inter.variable}>
      <body
        className="min-h-dvh text-white antialiased"
        style={{
          // mesmo visual do site, aplicado globalmente
          backgroundImage:
            "radial-gradient(40% 50% at 90% 0%, #1e2d4d 0%, transparent 70%)," +
            "radial-gradient(60% 60% at 10% 100%, #241645 0%, transparent 70%)," +
            "linear-gradient(180deg, #140326 0%, #1a0b28 100%)",
          backgroundAttachment: "fixed",
        }}
      >
        <CookieConsent />
        <Header />

        {/* Conteúdo das páginas */}
        {children}
      </body>
    </html>
  );
}
