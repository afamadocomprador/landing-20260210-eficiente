// app/(home)/page.tsx

import React from 'react';
import dynamic from 'next/dynamic'; 
import Link from 'next/link';   
import Image from 'next/image'; 
// Añadimos Viewport
//import type { Metadata } from 'next';
import type { Metadata, Viewport } from 'next';

import { Smile, Zap, Stethoscope } from "lucide-react";

// --- NUEVOS IMPORTS DE CONFIGURACIÓN ---
import { SITE_CONFIG } from '@/constants/config';

// --- IMPORTACIÓN DE COMPONENTES ---
// LCP: El hero debe ser cargar estático para que cargue rápido
import MainHero from '@/components/hero/MainHero'; 
import PricingCards from '@/components/PricingCards'; 
import FooterLegal from '@/components/FooterLegal'; 
import Archetypes from '@/components/Archetypes'; 
import HeroSearch from '@/components/home/HeroSearch';
import TreatmentSearch from '@/components/home/TreatmentSearch';
import ScrollReveal from '@/components/ui/ScrollReveal';

//const LeadForm = dynamic(() => import('@/components/LeadForm'), {
//  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-xl"></div>, 
//});

const CookieBanner = dynamic(() => import('@/components/CookieBanner'), {
  ssr: false, 
});

  // 🌟 Usamos tu variable global (cambia el nombre si en tu .env.local se llama distinto)
  // Si no la encuentra, usa la de Vercel por defecto para que nunca rompa.
  // const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  // Le damos un salvavidas (fallback) para que TypeScript sepa que nunca será 'undefined'
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://landing-20260210-eficiente.vercel.app';



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

export async function generateMetadata(): Promise<Metadata> {
  // 1. Definimos la URL base aquí dentro de forma segura
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://landing-20260210-eficiente.vercel.app';

  // 2. Textos fijos para la Home (aquí no hay ciudades)
  const metaTitle = 'DKV Dentisalud Élite | Seguro Dental con Precios Pactados';
  const metaDesc = 'Contrata tu seguro dental DKV con hasta 40% de descuento. Niños gratis en póliza familiar.';

  return {
    metadataBase: new URL(baseUrl),
    title: metaTitle,
    description: metaDesc,
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      url: '/', 
      siteName: 'DKV Dentisalud',
      images: [
        { 
          // 💥 EL TRUCO MAGISTRAL: Le añadimos ?v=1 a la URL de la imagen. 
          // Así WhatsApp se cree que es un archivo nuevo que nunca ha visto y lo descarga obligatoriamente.
          url: '/api/og-home?v=1', 
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
        <section className="py-20 bg-white border-t border-dkv-gray-border relative z-40 scroll-mt-28">
          <div className="container mx-auto px-4 text-center">

            {/* 1. Título */}
            <ScrollReveal delay={0}>
              <h2 className="text-4xl md:text-5xl font-lemon text-dkv-green-dark mb-6">
                Tratamientos.
              </h2>
            </ScrollReveal>

            {/* 2. Párrafo 1 (Beneficio Económico) */}
            <ScrollReveal delay={100}>
              <p className="text-xl md:text-xl text-dkv-gray font-fsme max-w-3xl mx-auto mb-6 leading-relaxed text-left px-4">
                Ofrecemos servicios básicos gratuitos, y el resto, a <strong>precios inferiores a mercado</strong>.
              </p>
            </ScrollReveal>

            {/* 3. Párrafo 2 (Llamada a la acción del Buscador) */}
            <ScrollReveal delay={120}>
              <p className="text-xl md:text-xl text-dkv-gray font-fsme max-w-3xl mx-auto mb-4 leading-relaxed text-left px-4">
                Consulta el precio de tu tratamiento al instante, sin formularios.
              </p>
            </ScrollReveal>

            {/* 4. Buscador Predictivo (Ahora más ligero) */}   
            <ScrollReveal delay={150}>       
              <div className="max-w-4xl mx-auto mb-10 w-full relative z-50 px-4">
                <TreatmentSearch />
              </div>
            </ScrollReveal>

            {/* 5. Título de las Categorías */}
            <ScrollReveal delay={200}>
              <p className="text-xl md:text-xl text-dkv-gray font-fsme max-w-3xl mx-auto mb-4 leading-relaxed text-left px-4">
                O bien, consulta la solución a tu problema dental.
              </p>


            </ScrollReveal>

            {/* 6. Enlaces SEO Directos (El Bento Grid expuesto) */}
            <ScrollReveal delay={250}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto relative z-40">
                
                <Link href="/categorias/odontologia-general" className="flex items-center p-5 rounded-2xl border border-gray-200 shadow-sm transition-all hover:border-dkv-green hover:shadow-md hover:-translate-y-1 text-left bg-white group">
                  <div className="mr-4 text-dkv-green transition-transform group-hover:scale-110 shrink-0">
                    <Zap className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="block font-bold text-dkv-green-dark text-lg leading-tight mb-1">Tengo dolor</span>
                    <span className="text-sm text-gray-500 leading-snug">Caries, endodoncia...</span>
                  </div>
                </Link>

                <Link href="/categorias/implantes" className="flex items-center p-5 rounded-2xl border border-gray-200 shadow-sm transition-all hover:border-dkv-green hover:shadow-md hover:-translate-y-1 text-left bg-white group">
                  <div className="mr-4 text-dkv-green transition-transform group-hover:scale-110 shrink-0">
                    <Stethoscope className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="block font-bold text-dkv-green-dark text-lg leading-tight mb-1">Me faltan piezas</span>
                    <span className="text-sm text-gray-500 leading-snug">Implantes, puentes...</span>
                  </div>
                </Link>

                <Link href="/categorias/ortodoncia" className="flex items-center p-5 rounded-2xl border border-gray-200 shadow-sm transition-all hover:border-dkv-green hover:shadow-md hover:-translate-y-1 text-left bg-white group">
                  <div className="mr-4 text-dkv-green transition-transform group-hover:scale-110 shrink-0">
                    <Smile className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="block font-bold text-dkv-green-dark text-lg leading-tight mb-1">Necesito mejorar mi sonrisa</span>
                    <span className="text-sm text-gray-500 leading-snug">Ortodoncia, estética...</span>
                  </div>
                </Link>

              </div>
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
