import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header"; // use o header que preferir
import CookieConsent from "@/components/CookieConsent";

const siteName = "RJGLOBAL • Certificadoras";
const baseUrl = "https://www.gruporjglobal.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description:
    "Curadoria premium de certificadoras: governança, transparência e performance. Compare e escolha com confiança.",
  applicationName: siteName,
  keywords: [
    "certificadoras",
    "pós-graduação",
    "cursos técnicos",
    "MBA",
    "educação",
    "parcerias acadêmicas",
    "credenciamento",
  ],
  openGraph: {
    type: "website",
    url: baseUrl,
    siteName,
    title: siteName,
    description:
      "Curadoria premium de certificadoras com governança e resultado.",
    images: [{ url: "/og/cover.png", width: 1200, height: 630, alt: siteName }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@seuperfil",
    creator: "@seuperfil",
    title: siteName,
    description:
      "Curadoria premium de certificadoras com governança e resultado.",
    images: ["/og/cover.png"],
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicons/favicon-32.png",
    apple: "/favicons/apple-touch-icon.png",
    other: [{ rel: "mask-icon", url: "/favicons/safari-pinned-tab.svg" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  category: "education",
};
export const viewport: Viewport = {
  themeColor: "#0B0F13",
  colorScheme: "dark light",
};
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-br" className={inter.variable}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            {
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://www.seudominio.com#organization",
                  name: "RJGLOBAL",
                  url: "https://www.seudominio.com",
                  logo: "https://www.seudominio.com/favicons/android-chrome-512x512.png",
                  sameAs: [
                    "https://www.linkedin.com/company/rjglobal",
                    "https://www.instagram.com/rjglobal",
                    "https://twitter.com/rjglobal",
                  ],
                  contactPoint: [
                    {
                      "@type": "ContactPoint",
                      telephone: "+55-31-0000-0000",
                      contactType: "customer service",
                      availableLanguage: ["Portuguese", "English"],
                    },
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.seudominio.com#website",
                  url: "https://www.seudominio.com",
                  name: "RJGLOBAL • Certificadoras",
                  publisher: {
                    "@id": "https://www.seudominio.com#organization",
                  },
                  potentialAction: {
                    "@type": "SearchAction",
                    target:
                      "https://www.seudominio.com/certificadoras?q={search_term_string}",
                    "query-input": "required name=search_term_string",
                  },
                },
                {
                  "@type": "WebPage",
                  "@id": "https://www.seudominio.com#webpage",
                  url: "https://www.seudominio.com",
                  name: "RJGLOBAL - Educação e Certificadoras",
                  isPartOf: { "@id": "https://www.seudominio.com#website" },
                  about: { "@id": "https://www.seudominio.com#organization" },
                },
                {
                  "@type": "FAQPage",
                  "@id": "https://www.seudominio.com#faq",
                  mainEntity: [
                    {
                      "@type": "Question",
                      name: "Quem é a RJGLOBAL?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "A RJGLOBAL é uma empresa de curadoria e integração de certificadoras premium no Brasil.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "Como funciona a parceria com certificadoras?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Conectamos estudantes e empresas a certificadoras credenciadas, com métricas de empregabilidade e governança.",
                      },
                    },
                  ],
                },
              ],
            },
            null,
            2
          ),
        }}
      />
      <body
        className="min-h-dvh text-white antialiased overflow-x-clip"
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
