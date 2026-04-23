//app/layout.tsx

import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
// IMPORTANTE: Ruta correcta del Header migrado
import Header from "@/components/layout/Header";

// Configuración de Fuentes Corporativas (Setup original del proyecto)
const lemonMilk = localFont({
  src: "./fonts/LemonMilkPro-Bold.woff2",
  variable: "--font-lemon-milk",
  weight: "700",
  display: "swap",
});

const fsMe = localFont({
  src: "./fonts/FSMe-Regular.woff2",
  variable: "--font-fs-me",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DKV Dentisalud Élite | Bernardo Sobrecasas",
  description: "Tratamientos dentales con precios pactados. Implantes a 1.200€ y menores incluidos.",
  verification: {
    google: 'ZcZv1ys4X1ftnI0uYOf6EfLkxGXAUsuaiK_9h1DaRv0', // Código de Search Console original
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        {/* 1. GOOGLE CONSENT MODE v2 (CRÍTICO - LEGALIDAD) */}
        <Script id="google-consent-mode" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            
            // Configuración por defecto: TODO DENEGADO (Cumplimiento AEPD)
            gtag('consent', 'default', {
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'analytics_storage': 'denied',
                'wait_for_update': 500
            });
            
            // Marca de tiempo inicial
            gtag('js', new Date());
          `}
        </Script>
      </head>
      
      <body className={`${lemonMilk.variable} ${fsMe.variable} font-fsme antialiased bg-white`}>
        
        {/* Header V1 Restaurado (Ruta: @/components/layout/Header) */}
        <Header />

        {/* Padding-top de 110px para compensar el header fijo y no tapar el Hero */}
        <main className="pt-[110px] min-h-screen">
          {children}
        </main>
        
      </body>
    </html>
  );
}
