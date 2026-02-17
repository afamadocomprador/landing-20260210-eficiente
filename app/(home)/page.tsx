// app/(home)/page.tsx

import React from 'react';
import dynamic from 'next/dynamic'; 
import Link from 'next/link';   
import Image from 'next/image'; 
// Añadimos Viewport
//import type { Metadata } from 'next';
import type { Metadata, Viewport } from 'next';

// --- NUEVOS IMPORTS DE CONFIGURACIÓN ---
import { SITE_CONFIG } from '@/constants/config';

// --- IMPORTACIÓN DE COMPONENTES ---
// LCP: El hero debe ser cargar estático para que cargue rápido
import MainHero from '@/components/hero/MainHero'; 
import PricingCards from '@/components/PricingCards'; 
import FooterLegal from '@/components/FooterLegal'; 
import Archetypes from '@/components/Archetypes'; 

//const LeadForm = dynamic(() => import('@/components/LeadForm'), {
//  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-xl"></div>, 
//});

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


/**
 * JSON-LD MAESTRO: AUTORIDAD NUCLEAR NACIONAL
 * Este nodo centraliza la identidad legal de Bernardo y su vínculo oficial con DKV.
 */
const nationalMasterSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      // --- IDENTIDAD CORE: AGENTE NACIONAL ---
      "@type": ["InsuranceAgency", "Organization"],
      "@id": SITE_CONFIG.ids.agent,
      "name": "Bernardo Sobrecasas - Especialista Nacional DKV Dentisalud",
      "legalName": "Bernardo Sobrecasas Gallizo",
      "url": SITE_CONFIG.domain,
      "telephone": "+34976217463",
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_CONFIG.domain}/images/logo-dkv-dentisalud.png`
      },

      // --- AUTORIDAD DGSFP (CREDENCIAL PROFESIONAL) ---
      "identifier": {
        "@type": "PropertyValue",
        "name": "Registro Oficial de Distribuidores de Seguros (DGSFP)",
        "propertyID": "DGSFP-MEDIADOR",
        "value": "C016125451380V",
        "description": "Inscripción oficial como Agente de Seguros Exclusivo en el Registro de la DGSFP.",
        "url": "https://rrpp.dgsfp.mineco.es/Mediador"
      },

      // --- VÍNCULO CORPORATIVO: RED OFICIAL DKV ESPAÑA ---
      "memberOf": {
        "@type": "Organization",
        "@id": "https://dkv.es/#organization",
        "name": "Red Comercial DKV Seguros España",
        "parentOrganization": {
          "@type": "Organization",
          "name": "DKV Seguros y Reaseguros SAE",
          "url": "https://dkv.es",
          "sameAs": [
            "https://es.wikipedia.org/wiki/DKV_Seguros",
            "https://www.wikidata.org/wiki/Q1154568"
          ]
        }
      },

      // --- VÍNCULO CON EL PRODUCTO / MARCA ---
      "brand": {
        "@type": "Brand",
        "@id": "https://dkv.es/#brand-dentisalud",
        "name": "DKV Dentisalud Élite",
        "alternateName": "Seguro Dental DKV",
        "logo": "https://dkv.es/sites/default/files/logo-dkv.png"
      },

      // --- ALCANCE NACIONAL (ÁREA SERVIDA) ---
      "areaServed": {
        "@type": "Country",
        "name": "ES",
        "containsPlace": "España"
      },

      // --- SEDE CENTRAL (TRANSPARENCIA) ---
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Av. César Augusto, 33",
        "addressLocality": "Zaragoza",
        "postalCode": "50004",
        "addressCountry": "ES"
      },

      // --- CONEXIÓN CON LOS CATÁLOGOS DEFINIDOS EN /TRATAMIENTOS ---
      "hasOfferCatalog": [
        { "@id": SITE_CONFIG.ids.masterCatalog },
        { "@id": SITE_CONFIG.ids.packsCatalog }
      ],

      // --- IPID Y CONDICIONES (COMPLIANCE) ---
      "publishingPrinciples": [
        `${SITE_CONFIG.domain}/condiciones-generales.pdf`,
        `${SITE_CONFIG.domain}/ipid.pdf`
      ]
    },

    // --- NODO WEBSITE: LA FIRMA DE AUTORIDAD DEL DOMINIO ---
    {
      "@type": "WebSite",
      "@id": `${SITE_CONFIG.domain}/#website`,
      "url": SITE_CONFIG.domain,
      "name": "DKV Dentisalud Élite Nacional",
      "publisher": { "@id": SITE_CONFIG.ids.agent }
    }
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(nationalMasterSchema) }} 
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


        {/* --- SECCIÓN COMENTAR --- */}
        <section 
          id="información" 
          className="py-20 bg-white border-t border-dkv-gray-border scroll-mt-28"
        >
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-lemon text-dkv-green-dark mb-6">
              ¿Algo que comentar?
            </h2>
            <p className="text-xl text-dkv-gray font-fsme max-w-3xl mx-auto mb-10 leading-relaxed text-balance">
                Plantéanos cualquier duda sobre tus circunstancias y cómo te puedes beneficiar de nuestros tratamientos.
            </p>
            
            <Link 
              href="/comentarios"
              className="inline-flex items-center justify-center rounded-dkv font-fsme font-bold duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-dkv-green text-white hover:bg-dkv-green-hover focus:ring-dkv-green disabled:bg-dkv-gray-disabled shadow-xl hover:scale-105 transition-transform gap-3 text-xl px-8 py-6 h-auto"
            >
              Plantear Consulta
            </Link>

           
            <p className="text-sm font-medium text-dkv-green-dark mt-6">
              No te quedes con la duda. <br /> Respuesta personal.
            </p>
          </div>
        </section>



        <Archetypes />

        {/* --- PRICING CARDS --- */}
        <div id="tratamientos" className="scroll-mt-28">
          <PricingCards />
        </div>
        

        <FooterLegal />
      </main>

    </div>
  );
}
