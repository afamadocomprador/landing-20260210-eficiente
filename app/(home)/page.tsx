// app/(home)/page.tsx

import React from 'react';
import dynamic from 'next/dynamic'; 
import Link from 'next/link';   
import Image from 'next/image'; 
// Añadimos Viewport
//import type { Metadata } from 'next';
import type { Metadata, Viewport } from 'next';

// --- IMPORTACIÓN DE COMPONENTES ---
// LCP: El hero debe ser cargar estático para que cargue rápido
import MainHero from '@/components/hero/MainHero'; 
import PricingCards from '@/components/PricingCards'; 
import FooterLegal from '@/components/FooterLegal'; 
import Archetypes from '@/components/Archetypes'; 

const LeadForm = dynamic(() => import('@/components/LeadForm'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-xl"></div>, 
});

const CookieBanner = dynamic(() => import('@/components/CookieBanner'), {
  ssr: false, 
});

export const metadata: Metadata = {
  title: 'DKV Dentisalud Élite | Seguro Dental con Precios Pactados',
  description: 'Contrata tu seguro dental DKV con hasta 40% de descuento. Niños gratis en póliza familiar.',
  alternates: {
       canonical: '/',
  },
  openGraph: {
     title: 'DKV Dentisalud Élite | Precios Pactados con dentistas en toda España',
     description: 'Tratamientos dentales con hasta 40% de descuento.',
     url: 'https://landing-20260210-eficiente.vercel.app', // Asegúrate de que coincida con tu dominio real
     siteName: 'DKV Dentisalud',
     images: [
       { url: '/images/og-home.jpg', 
         width: 1200, 
         height: 630,
         alt: 'Cliente sonriendo DKV Dentisalud', 
       }
     ],
     type: 'website',
   },
};

// --- CONFIGURACIÓN VIEWPORT (Nuevo estándar Next.js 14) ---
export const viewport: Viewport = {
   themeColor: [
     { media: '(prefers-color-scheme: light)', color: '#849700' }, // Verde DKV
     { media: '(prefers-color-scheme: dark)', color: '#033B37' },  // Verde Oscuro
   ],
   width: 'device-width',
   initialScale: 1,
};


/* ************************************************** DESDE AQUI 
const jsonLd = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency", // Eres una agencia/agente, no la corporación entera
    "name": "DKV Dentisalud Élite",
    "description": "Dentistas en toda España con precios pactados y grandes descuentos.",
    "url": "https://landing-20260210-eficiente.vercel.app",
    "telephone": "+34976217463",
    "logo": "https://landing-20260210-eficiente.vercel.app/images/logo-dkv.png",
    "image": [
        "https://landing-20260210-eficiente.vercel.app/images/og-home.jpg",
        "https://landing-20260210-eficiente.vercel.app/images/logo-dkv.png"
      ],

    // 1. TU DIRECCIÓN (Da confianza y valida la entidad)
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. César Augusto, 33", // Tu dirección fiscal/oficina
      "addressLocality": "Zaragoza",
      "postalCode": "50004",
      "addressCountry": "ES"
    },

    // 2. EL ANTÍDOTO (Esto evita que te limiten localmente)
   "areaServed": {
      "@type": "Country",
      "name": "España" // 👈 ESTO le dice a Google que tu ámbito es nacional
    },

    // 3. TIPO DE SERVICIO
    "priceRange": "$$",
    "parentOrganization": {
        "@type": "InsuranceCompany",
        "name": "DKV Seguros",
        "url": "https://dkv.es"
    },

  // Solo pon sameAs si tienes TUS PROPIAS redes (ej: facebook.com/AgenteDKVJuan)
  // Si no tienes, déjalo vacío o bórralo para no enviar tráfico a la central.
  "sameAs": []

};

******************************** hata aqui * */


/**
 * JSON-LD ESTRATÉGICO 2026 - VERSIÓN FINAL DE CUMPLIMIENTO
 * Proyecto: Red Dental Élite (Bernardo Sobrecasas)
 * Validador: Compatible con validator.schema.org y Google Search Console.
 * Cumplimiento: LSSI, LDS (Ley de Distribución) y ToolKit DKV 2025.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["InsuranceAgency", "Organization"],
  "@id": "https://landing-20260210-eficiente.vercel.app/#agency-identity",
  "mainEntityOfPage": "https://landing-20260210-eficiente.vercel.app",
  
  // Nombre comercial para captación
  "name": "Portal Red Dental Élite - Precios Pactados",
  
  // Identificación legal obligatoria (LSSI Art. 10 y Ley de Distribución de Seguros)
  "legalName": "Bernardo Sobrecasas Gallizo - Agente de Seguros Exclusivo DKV",
  "identifier": "C016125451380V", // Número de registro DGSFP sin prefijos para facilitar lectura de bots
  
  "description": "Distribuidor oficial del Plan DKV Dentisalud. Acceso a red nacional con 1.400 dentistas y baremos de precios protegidos en implantes y ortodoncia.",
  "url": "https://landing-20260210-eficiente.vercel.app",
  "telephone": "+34976217463",
  
  // Ajuste Compliance: Definimos el rango de precios vinculado a la suscripción
  "priceRange": "124€ (Cuota Anual del Plan)",

  "image": "https://landing-20260210-eficiente.vercel.app/images/clinica-dental-equipo.jpg",
  "logo": "https://landing-20260210-eficiente.vercel.app/images/logo-dkv.png",

  // Declaración de Servicio Nacional para evitar sesgo geográfico
  "areaServed": {
    "@type": "Country",
    "name": "ES"
  },

  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Av. César Augusto, 33",
    "addressLocality": "Zaragoza",
    "postalCode": "50004",
    "addressCountry": "ES"
  },

  "brand": {
    "@type": "Brand",
    "name": "DKV Dentisalud",
    "description": "Seguro dental oficial con baremos franquiciados garantizados"
  },

  // Catálogo con protección legal contra "Publicidad Engañosa"
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Catálogo de Baremos Protegidos 2026",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Suscripción al Plan Dental (Acceso Anual)",
          "description": "Cuota única anual que otorga acceso a toda la red de dentistas y precios pactados."
        },
        "price": "124.00",
        "priceCurrency": "EUR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Implante Dental Completo (Precio Protegido)",
          "description": "Precio máximo garantizado para miembros del plan. Incluye cirugía y corona.",
          "areaServed": { "@type": "Country", "name": "ES" }
        },
        "price": "1100.00",
        "priceCurrency": "EUR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Limpieza de Boca y Fluoración (Incluida)",
          "description": "Servicio sin coste adicional incluido en la cuota anual para asegurados.",
          "areaServed": { "@type": "Country", "name": "ES" }
        },
        "price": "0.00",
        "priceCurrency": "EUR"
      }
    ]
  },

  // Documentación de Transparencia (IPID y CG) requerida por normativa UE
  "publishingPrinciples": [
    "https://landing-20260210-eficiente.vercel.app/condiciones-generales.pdf",
    "https://landing-20260210-eficiente.vercel.app/ipid.pdf"
  ]
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-dkv-gray selection:bg-dkv-green selection:text-white">
      
      <CookieBanner />
      
      <main>

        {/* Script JSON-LD inyectado */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} 
        />


        <MainHero /> 

        {/* --- SECCIÓN TRATAMIENTOS --- */}
        <section className="py-20 bg-white border-t border-dkv-gray-border">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-lemon text-dkv-green-dark mb-6">
              Tratamientos.
            </h2>
            <p className="text-xl text-dkv-gray font-fsme max-w-3xl mx-auto mb-10 leading-relaxed text-balance">
              Numerosos servicios dentales gratuitos y resto a precios muy inferiores a mercado.
            </p>
            
            <Link 
              href="/tratamientos"
              // CAMBIO ACCESIBILIDAD: De text-lg a text-xl para cumplir ratio de contraste
              className="inline-flex items-center justify-center rounded-dkv font-fsme font-bold duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-dkv-green text-white hover:bg-dkv-green-hover focus:ring-dkv-green shadow-xl hover:scale-105 transition-transform text-xl px-8 py-6 h-auto cursor-pointer"
            >
              Ver Tratamientos y Precios
            </Link>
            
            <p className="text-sm font-medium text-dkv-green-dark mt-6">
              Aquí puedes ver los tratamientos y sus precios. <br /> Directamente y sin formularios.
            </p>
          </div>
        </section>

        {/* --- SECCIÓN DENTISTAS --- */}
        <section 
          id="dentistas" 
          className="py-20 bg-white border-t border-dkv-gray-border scroll-mt-28"
        >
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-lemon text-dkv-green-dark mb-6">
              Dentistas.
            </h2>
            <p className="text-xl text-dkv-gray font-fsme max-w-3xl mx-auto mb-10 leading-relaxed text-balance">
              Tan fácil como elegir tu dentista y pedir cita en su consulta.
              Seguro que tienes uno cerca de ti.
            </p>
            
            <Link 
              href="/dentistas"
              // CAMBIO ACCESIBILIDAD: De text-lg a text-xl
              className="inline-flex items-center justify-center rounded-dkv font-fsme font-bold duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-dkv-green text-white hover:bg-dkv-green-hover focus:ring-dkv-green disabled:bg-dkv-gray-disabled shadow-xl hover:scale-105 transition-transform gap-3 text-xl px-8 py-6 h-auto"
            >
              <Image 
                alt="Ubicación" 
                width={28} 
                height={28} 
                className="w-7 h-7 object-contain brightness-0 invert" 
                src="/icons/location-pin.svg" 
              />
              Ver Centros Dentales
            </Link>
            
            <p className="text-sm font-medium text-dkv-green-dark mt-6">
              Busca centros dentales en toda España. <br /> Sin registros previos.
            </p>
          </div>
        </section>

        <Archetypes />

        {/* --- PRICING CARDS --- */}
        <div id="tratamientos" className="scroll-mt-28">
          <PricingCards />
        </div>
        
        {/* --- FORMULARIO --- */}
        <section 
          id="información" 
          className="py-20 bg-dkv-gray-border border-y border-dkv-gray/10 scroll-mt-28"
        >
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                 <h2 className="text-3xl lg:text-4xl font-lemon font-bold text-dkv-green-dark uppercase leading-tight">
                   ¿Listo para empezar <br/> a ahorrar?
                 </h2>
                 <p className="text-lg text-dkv-gray">
                   Déjanos tus datos y calculamos tu cuota personalizada en menos de 24h.
                 </p>
              </div>
              
              <div className="relative">
                 <div className="absolute -inset-4 bg-dkv-green/5 rounded-xl blur-lg -z-10"></div>
                 <LeadForm />
              </div>
            </div>
           </div>
        </section>

        <section className="py-16 bg-white">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           </div>
        </section>

        <FooterLegal />
      </main>

    </div>
  );
}
