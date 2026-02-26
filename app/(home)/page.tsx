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
import HeroSearch from '@/components/home/HeroSearch';
import ScrollReveal from '@/components/ui/ScrollReveal';

//const LeadForm = dynamic(() => import('@/components/LeadForm'), {
//  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-xl"></div>, 
//});

const CookieBanner = dynamic(() => import('@/components/CookieBanner'), {
  ssr: false, 
});

  // 🌟 Usamos tu variable global (cambia el nombre si en tu .env.local se llama distinto)
  // Si no la encuentra, usa la de Vercel por defecto para que nunca rompa.
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;



/* **********************************
export const metadata: Metadata = {
  title: 'DKV Dentisalud Élite | Seguro Dental con Precios Pactados',
  description: 'Contrata tu seguro dental DKV con hasta 40% de descuento. Niños gratis en póliza familiar.',
  alternates: {
       canonical: '/',
  },
  openGraph: {
      title: metaTitle,
      description: metaDesc,
      url: ciudad ? `/dentistas/${rawSlug}` : '/', // 🔴 Corregido: si no hay ciudad, la canonical es '/'
      siteName: 'DKV Dentisalud',
      images: [
        { 
          // 🌟 AQUÍ ESTÁ LA MAGIA: Llamamos al nuevo generador
          url: '/api/og-home', 
          width: 1200, 
          height: 630,
          alt: 'Lo fácil es cuidar tu sonrisa', 
        }
      ],
      type: 'website',
    },
};

********************************* */


type Props = {
  params: { slug?: string[] }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // 1. Miramos si en la URL hay una ciudad (ej: /dentistas/zaragoza -> "Zaragoza")
  const rawSlug = params?.slug?.[0];
  const ciudad = rawSlug 
    ? rawSlug.charAt(0).toUpperCase() + rawSlug.slice(1).replace(/-/g, ' ') 
    : null;

  // 2. Adaptamos los textos. Si hay ciudad, la ponemos. Si no, texto genérico.
  const metaTitle = ciudad 
    ? `Dentistas DKV en ${ciudad} | Seguro con Precios Pactados`
    : 'DKV Dentisalud Élite | Seguro Dental con Precios Pactados';
    
  const metaDesc = ciudad
    ? `Tratamientos dentales en ${ciudad} con hasta 40% de descuento. Niños gratis.`
    : 'Contrata tu seguro dental DKV con hasta 40% de descuento. Niños gratis en póliza familiar.';


  return {
    // 🌟 AQUÍ APLICAMOS LA VARIABLE GLOBAL
    metadataBase: new URL(baseUrl),

    title: metaTitle,
    description: metaDesc,
    alternates: {
      // Actualizamos el canonical para el SEO
      canonical: ciudad ? `/dentistas/${rawSlug}` : '/dentistas',
    },
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      url: ciudad ? `/dentistas/${rawSlug}` : '/', // 🔴 Corregido: si no hay ciudad, la canonical es '/'
      siteName: 'DKV Dentisalud',
      images: [
        { 
          // 🌟 AQUÍ ESTÁ LA MAGIA: Llamamos al nuevo generador
          url: '/api/og-home', 
          width: 1200, 
          height: 630,
          alt: 'Lo fácil es cuidar tu sonrisa', 
        }
      ],
      type: 'website',
    },
  };
}



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
      "priceRange": "124€", // Obligatorio para InsuranceAgency
      "image": {
        "@type": "ImageObject",
        "url": `${SITE_CONFIG.domain}/images/oficina-central-dkv.jpg`
      },
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
      ],
      // LA LLAVE MAESTRA: Decimos que esta agencia es la dueña de esta URL
      "mainEntityOfPage": { "@id": `${SITE_CONFIG.domain}/#webpage` }
    },

    // --- NODO WEBSITE: LA FIRMA DE AUTORIDAD DEL DOMINIO ---
    {
      "@type": "WebSite",
      "@id": `${SITE_CONFIG.domain}/#website`,
      "url": SITE_CONFIG.domain,
      "name": "DKV Dentisalud Élite Nacional",
      "publisher": { "@id": SITE_CONFIG.ids.agent }
    },

    // NODO 3: LA PÁGINA ESPECÍFICA (WebPage)
    {
      "@type": "WebPage",
      "@id": `${SITE_CONFIG.domain}/#webpage`,
      "url": SITE_CONFIG.domain,
      "name": "Seguro Dental DKV | Bernardo Sobrecasas",
      "isPartOf": { "@id": `${SITE_CONFIG.domain}/#website` }
      // En lugar de "about" (que anida), usamos "mainEntity" para indicar 
      // que la página REPRESENTA a la agencia.
      //"mainEntity": { "@id": SITE_CONFIG.ids.agent } 
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

           {/* 1. El Título sube primero (delay 0, inmediato) */}
           <ScrollReveal delay={0}>
            <h2 className="text-4xl font-lemon text-dkv-green-dark mb-6">
              Tratamientos.
            </h2>
           </ScrollReveal>

           {/* 2. El Párrafo sube un instante después (150ms de retraso) */}
           <ScrollReveal delay={100}>
            <p className="text-xl text-dkv-gray font-fsme max-w-3xl mx-auto mb-10 leading-relaxed text-balance">
              Numerosos servicios dentales gratuitos y resto a precios muy inferiores a mercado.
            </p>
           </ScrollReveal>

           {/* 3. La pastilla del Buscador sube la última, coronando la escena (400ms) */}   
           <ScrollReveal delay={150}>       
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
           </ScrollReveal>

          </div>
        </section>



        {/* --- SECCIÓN DENTISTAS --- */}
        <section 
          id="dentistas" 
          className="py-24 bg-white border-t border-dkv-gray-border relative overflow-visible"
        >

          <div className="container mx-auto px-4 text-center relative z-20">

           {/* 1. El Título sube primero (delay 0, inmediato) */}
           <ScrollReveal delay={0}>

            <h2 className="text-4xl md:text-5xl font-lemon text-dkv-green-dark mb-6">
              Dentistas.
            </h2>
           </ScrollReveal>

           {/* 2. El Párrafo sube un instante después (100ms de retraso) */}
           <ScrollReveal delay={100}>

            <p className="text-xl text-dkv-gray font-fsme max-w-3xl mx-auto mb-10 text-balance leading-relaxed">
              Tan fácil como elegir tu dentista y pedir cita en consulta. Seguro que tienes uno cerca. 
            </p>
           </ScrollReveal>


           {/* 3. La pastilla del Buscador sube la última, coronando la escena (200ms) */}   
           <ScrollReveal delay={200}>       

            {/* AQUÍ INYECTAMOS EL BUSCADOR GIGANTE */}
            <div className="max-w-4xl mx-auto mb-8">
              <HeroSearch />
            </div>
    
            <p className="text-sm font-medium text-dkv-green-dark mt-6">
              Busca centros dentales en toda España. <span className="block mt-1"> Sin registros previos.</span>
            </p>
           </ScrollReveal>


          </div>
        </section>



        {/* --- SECCIÓN COMENTAR --- */}
        <section 
          id="información" 
          className="py-20 bg-white border-t border-dkv-gray-border scroll-mt-28"
        >
         <ScrollReveal>
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
         </ScrollReveal>
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
