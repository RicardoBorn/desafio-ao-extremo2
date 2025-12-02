import type { Metadata } from "next";
import { Teko, Rajdhani, Bebas_Neue } from "next/font/google";
import "./globals.css";

const teko = Teko({
  variable: "--font-teko",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: {
    default: "Desafio ao Extremo - A Maior Competição de Arremesso de Facas do Brasil",
    template: "%s | Desafio ao Extremo"
  },
  description: "A maior competição de arremesso de facas do YouTube Brasil. 9 guerreiros, 1 objetivo: vencer o Desafio ao Extremo. Estreia 25 de Janeiro de 2026.",
  keywords: [
    "desafio ao extremo",
    "arremesso de facas",
    "competição",
    "youtube brasil",
    "born ao extremo",
    "sobrevivência",
    "bushcraft",
    "facas táticas",
    "ricardo born"
  ],
  authors: [{ name: "Ricardo Born", url: "https://youtube.com/@BornaoExtremo" }],
  creator: "Ricardo Born",
  publisher: "Born ao Extremo",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://desafioaoextremo.com.br"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://desafioaoextremo.com.br",
    title: "Desafio ao Extremo - A Maior Competição de Arremesso de Facas do Brasil",
    description: "A maior competição de arremesso de facas do YouTube Brasil. 9 guerreiros, 1 objetivo: vencer o Desafio ao Extremo. Estreia 25 de Janeiro de 2026.",
    siteName: "Desafio ao Extremo",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Desafio ao Extremo - Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Desafio ao Extremo - A Maior Competição de Arremesso de Facas do Brasil",
    description: "A maior competição de arremesso de facas do YouTube Brasil. 9 guerreiros, 1 objetivo. Estreia 25/01/2026.",
    creator: "@BornaoExtremo",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },
  manifest: "/manifest.json",
  verification: {
    google: "google-site-verification-code", // Substituir pelo código real
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Desafio ao Extremo",
  },
  applicationName: "Desafio ao Extremo",
  category: "entertainment",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#FFC107",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        suppressHydrationWarning
        className={`${teko.variable} ${rajdhani.variable} ${bebas.variable} font-sans antialiased bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}
