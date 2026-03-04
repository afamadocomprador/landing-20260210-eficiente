// app/(home)/page.tsx

import React from 'react';
import dynamic from 'next/dynamic'; 
import Link from 'next/link';   
import type { Metadata, Viewport } from 'next';

import { Smile, Zap, Stethoscope, Sparkles, ArrowRight } from "lucide-react"; 

import { SITE_CONFIG } from '@/constants/config';
import MainHero from '@/components/hero/MainHero'; 
import PricingCards from '@/components/PricingCards'; 
import FooterLegal from '@/components/FooterLegal'; 
import Archetypes from '@/components/Archetypes'; 
import HeroSearch from '@/components/home/HeroSearch';
import ScrollReveal from '@/components/ui/ScrollReveal';

const CookieBanner = dynamic(() => import('@/components/CookieBanner'), {
  ssr: false, 
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://landing-20260210-eficiente.vercel.app';

export async function generateMetadata(): Promise<Metadata> {
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

export const viewport: Viewport = {
   themeColor: [
     { media: '(prefers-color-scheme: light)', color: '#849700' },
     { media: '(prefers-color-scheme: dark)', color: '#033B37' },
   ],
   width: 'device-width',
   initialScale: 1,
};

const nationalMasterSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["InsuranceAgency", "Organization"],
      "@id": SITE_CONFIG.ids.agent,
      "name": "Bernardo Sobrecasas - Especialista Nacional DKV Dentisalud",
      "legalName": "Bernardo Sobrecasas Gallizo",
      "url": SITE_CONFIG.domain,
      "telephone": "+34976217463",
      "priceRange": "124€", 
      "image": { "@type": "ImageObject", "url": `${SITE_CONFIG.domain}/images/oficina-central-dkv.jpg` },
      "logo": { "@type": "ImageObject", "url": `${SITE_CONFIG.domain}/images/logo-dkv-dentisalud.png` },
      "identifier": { "@type": "PropertyValue", "name": "Registro Oficial", "propertyID": "DGSFP-MEDIADOR", "value": "C016125451380V" },
      "memberOf": { "@type": "Organization", "@id": "https://dkv.es/#organization", "name": "Red Comercial DKV Seguros España" },
      "brand": { "@type": "Brand", "@id": "https://dkv.es/#brand-dentisalud", "name": "DKV Dentisalud Élite" },
      "areaServed": { "@type": "Country", "name": "ES" },
      "address": { "@type": "PostalAddress", "streetAddress": "Av. César Augusto, 33", "addressLocality": "Zaragoza", "postalCode": "50004", "addressCountry": "ES" },
      "hasOfferCatalog": [ { "@id": SITE_CONFIG.ids.masterCatalog }, { "@id": SITE_CONFIG.ids.packsCatalog } ],
      "publishingPrinciples": [ `${SITE_CONFIG.domain}/condiciones-generales.pdf`, `${SITE_CONFIG.domain}/ipid.pdf` ],
      "mainEntityOfPage": { "@id": `${SITE_CONFIG.domain}/#webpage` }
    },
    { "@type": "WebSite", "@id": `${SITE_CONFIG.domain}/#website`, "url": SITE_CONFIG.domain, "name": "DKV Dentisalud Élite Nacional", "publisher": { "@id": SITE_CONFIG.ids.agent } },
    { "@type": "WebPage", "@id": `${SITE_CONFIG.domain}/#webpage`, "url": SITE_CONFIG.domain, "name": "Seguro Dental DKV | Bernardo Sobrecasas", "isPartOf": { "@id": `${SITE_CONFIG.domain}/#website` } }
  ]
};

export default function LandingPage() {
  
  // ⚡️ Variables de sombra EXACTAS
  const neumorphicBase = "shadow-[8px_8px_12px_#033b3720,-5px_-5px_10px_#ffffff]";
  const neumorphicActive = "active:shadow-[inset_4px_4px_8px_#033b3730,inset_-4px_-4px_8px_#ffffff]";

  return (
    <div className="min-h-screen bg-white text-dkv-gray selection:bg-dkv-green selection:text-white">
      <CookieBanner />
      
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(nationalMasterSchema) }} />
        
        <MainHero /> 

        <section  id="tratamientos" className="py-20 bg-[#F0F0F0] border-t border-dkv-gray-border relative z-40 ">
          <div className="container mx-auto px-4 text-center">

            <ScrollReveal delay={0}>
              <h2 className="text-4xl md:text-5xl font-lemon text-dkv-green-dark mb-6">
                Tratamientos.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <p className="text-xl md:text-xl text-dkv-gray font-fsme max-w-3xl mx-auto mb-10 md:mb-12 leading-relaxed text-left md:text-center px-4 md:px-0">
                Ofrecemos servicios básicos gratuitos, y el resto, a <strong>precios inferiores a mercado</strong>.
              </p>
            </ScrollReveal>

            <div className="max-w-4xl mx-auto">
              
              <div className="relative z-40 px-2 md:px-0">
                
                <div className="grid grid-cols-2 gap-5 md:gap-10 pb-6">
                  
                  {/* FICHA 1: DOLOR */}
                  <ScrollReveal delay={200}>
                    <Link 
                      href="/tratamientos/endodoncias-extracciones-curas" 
                      className={`h-full relative flex flex-col items-center text-center p-5 md:p-8 rounded-3xl bg-[#F0F0F0] group transition-all duration-300 ${neumorphicBase} ${neumorphicActive} hover:scale-[1.02] active:scale-[0.98]`}
                    >
                      <div className="absolute top-4 right-4 md:top-5 md:right-5 text-dkv-green-dark opacity-70 group-hover:opacity-100 group-hover:text-dkv-green transition-all duration-300 group-hover:translate-x-1">
                        <ArrowRight className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
                      </div>

                      <div className="mb-4 md:mb-6 flex items-center justify-center text-dkv-green transition-transform group-hover:scale-110 group-hover:-translate-y-1 duration-300">
                        <Zap className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1.5} />
                      </div>
                      <span className="block font-bold text-dkv-green-dark group-hover:text-dkv-green transition-colors text-lg md:text-2xl leading-tight mb-2">
                        Tengo dolor
                      </span>
                      {/* ⚡️ Fuente corregida a text-sm md:text-base */}
                      <span className="text-sm md:text-base text-gray-500 leading-snug max-w-[150px] md:max-w-none mt-1">
                        Caries, <span className="text-dkv-green font-bold">endodoncia</span>...
                      </span>
                    </Link>
                  </ScrollReveal>

                  {/* FICHA 2: HIGIENE */}
                  <ScrollReveal delay={300}>
                    <Link 
                      href="/categorias/higiene-y-prevencion" 
                      className={`h-full relative flex flex-col items-center text-center p-5 md:p-8 rounded-3xl bg-[#F0F0F0] group transition-all duration-300 ${neumorphicBase} ${neumorphicActive} hover:scale-[1.02] active:scale-[0.98]`}
                    >
                      <div className="absolute top-4 right-4 md:top-5 md:right-5 text-dkv-green-dark opacity-70 group-hover:opacity-100 group-hover:text-dkv-green transition-all duration-300 group-hover:translate-x-1">
                        <ArrowRight className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
                      </div>

                      <div className="mb-4 md:mb-6 flex items-center justify-center text-dkv-green transition-transform group-hover:scale-110 group-hover:-translate-y-1 duration-300">
                        <Sparkles className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1.5} />
                      </div>
                      <span className="block font-bold text-dkv-green-dark group-hover:text-dkv-green transition-colors text-lg md:text-2xl leading-tight mb-2">
                        Limpieza
                      </span>
                      {/* ⚡️ Fuente corregida a text-sm md:text-base */}
                      <span className="text-sm md:text-base text-gray-500 leading-snug max-w-[150px] md:max-w-none mt-1">
                        <span className="text-dkv-green font-bold">Limpieza</span>, diagnóstico...
                      </span>
                    </Link>
                  </ScrollReveal>

                  {/* FICHA 3: PIEZAS */}
                  <ScrollReveal delay={400}>
                    <Link 
                      href="/categorias/implantes" 
                      className={`h-full relative flex flex-col items-center text-center p-5 md:p-8 rounded-3xl bg-[#F0F0F0] group transition-all duration-300 ${neumorphicBase} ${neumorphicActive} hover:scale-[1.02] active:scale-[0.98]`}
                    >
                      <div className="absolute top-4 right-4 md:top-5 md:right-5 text-dkv-green-dark opacity-70 group-hover:opacity-100 group-hover:text-dkv-green transition-all duration-300 group-hover:translate-x-1">
                        <ArrowRight className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
                      </div>

                      <div className="mb-4 md:mb-6 flex items-center justify-center text-dkv-green transition-transform group-hover:scale-110 group-hover:-translate-y-1 duration-300">
                        <Stethoscope className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1.5} />
                      </div>
                      <span className="block font-bold text-dkv-green-dark group-hover:text-dkv-green transition-colors text-lg md:text-2xl leading-tight mb-2">
                        Faltan piezas
                      </span>
                      {/* ⚡️ Fuente corregida a text-sm md:text-base */}
                      <span className="text-sm md:text-base text-gray-500 leading-snug max-w-[150px] md:max-w-none mt-1">
                        <span className="text-dkv-green font-bold">Implantes</span>, puentes...
                      </span>
                    </Link>
                  </ScrollReveal>

                  {/* FICHA 4: SONRISA */}
                  <ScrollReveal delay={500}>
                    <Link 
                      href="/tratamientos/ortodoncia-estetica" 
                      className={`h-full relative flex flex-col items-center text-center p-5 md:p-8 rounded-3xl bg-[#F0F0F0] group transition-all duration-300 ${neumorphicBase} ${neumorphicActive} hover:scale-[1.02] active:scale-[0.98]`}
                    >
                      <div className="absolute top-4 right-4 md:top-5 md:right-5 text-dkv-green-dark opacity-70 group-hover:opacity-100 group-hover:text-dkv-green transition-all duration-300 group-hover:translate-x-1">
                        <ArrowRight className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
                      </div>

                      <div className="mb-4 md:mb-6 flex items-center justify-center text-dkv-green transition-transform group-hover:scale-110 group-hover:-translate-y-1 duration-300">
                        <Smile className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1.5} />
                      </div>
                      <span className="block font-bold text-dkv-green-dark group-hover:text-dkv-green transition-colors text-lg md:text-2xl leading-tight mb-2">
                        Mejorar sonrisa
                      </span>
                      {/* ⚡️ Fuente corregida a text-sm md:text-base */}
                      <span className="text-sm md:text-base text-gray-500 leading-snug max-w-[150px] md:max-w-none mt-1">
                        <span className="text-dkv-green font-bold">Ortodoncia</span>, estética...
                      </span>
                    </Link>
                  </ScrollReveal>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* --- SECCIÓN DENTISTAS --- */}
        <section id="dentistas" className="py-24 bg-white border-t border-dkv-gray-border relative overflow-visible">
        {/*<section id="dentistas" className="py-24 bg-[url('/images/utensilios.png')] bg-cover bg-center bg-no-repeat border-t border-dkv-gray-border relative overflow-visible">*/}
          <div className="container mx-auto px-4 text-center relative z-20">
           <ScrollReveal delay={0}>
            <h2 className="text-4xl md:text-5xl font-lemon text-dkv-green-dark mb-6">Dentistas.</h2>
           </ScrollReveal>
           <ScrollReveal delay={100}>
            {/* ⚡️ TEXTO MODIFICADO CON ESTILOS MOBILE-FIRST (mb-6, px-4, text-left) */}
            <p className="text-xl text-dkv-gray font-fsme max-w-3xl mx-auto mb-6 md:mb-10 px-4 md:px-0 text-left md:text-center leading-relaxed">
              Nuestra red está formada por más de 2.600 dentistas en más de 1.450 centros dentales en toda España. Seguro que tienes uno cerca. Encuentra el tuyo.
            </p>
           </ScrollReveal>
           <ScrollReveal delay={200}>       
            <div className="max-w-4xl mx-auto mb-8">
              <HeroSearch />
            </div>
            {/* ⚡️ ELIMINADO EL TEXTO INFERIOR SOBRE LOS REGISTROS PREVIOS */}
           </ScrollReveal>
          </div>
        </section>

        {/* --- SECCIÓN COMENTAR --- */}
        <section id="información" className="py-20 bg-white border-t border-dkv-gray-border scroll-mt-28">
         <ScrollReveal>
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-lemon text-dkv-green-dark mb-6">¿Algo que comentar?</h2>
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

        <div className="scroll-mt-28">
          <PricingCards />
        </div>
        
        <FooterLegal />
      </main>
    </div>
  );
}
