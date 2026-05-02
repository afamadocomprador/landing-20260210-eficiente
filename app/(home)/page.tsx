// app/(home)/page.tsx

// app/(home)/page.tsx

import { Viewport } from 'next';
import dynamic from 'next/dynamic';
import { SITE_CONFIG } from '@/constants/config';
import MainHero from '@/components/hero/MainHero';
import FooterLegal from '@/components/FooterLegal';

// ⚡️ Importaciones necesarias para las secciones que ahora renderizará el servidor
import HeroSearch from '@/components/home/HeroSearch';
import ScrollReveal from '@/components/ui/ScrollReveal';

// ⚡️ LA SOLUCIÓN AL TTI: 
// Importamos dinámicamente la interactividad y forzamos a que no bloquee el servidor
//const InteractiveContent = dynamic(() => import('./InteractiveContent'), {
//  ssr: false, // Asegura que solo se renderice en el cliente
//});
//hay que reservar espacio para evitarl CLS
const InteractiveContent = dynamic(() => import('./InteractiveContent'), {
  ssr: false,
  loading: () => <div className="w-full min-h-[800px] bg-[#F0F0F0] animate-pulse" />
});

// Carga dinámica del banner para no penalizar el tiempo de carga inicial
const CookieBanner = dynamic(() => import('@/components/CookieBanner'), {
  ssr: false, 
});

// Carga dinámica que tenías originalmente en InteractiveContent.tsx, trasladada aquí
//const Archetypes = dynamic(() => import('@/components/Archetypes'), { ssr: false });
// para no penalizar CLS
const Archetypes = dynamic(() => import('@/components/Archetypes'), { 
  ssr: false,
  loading: () => <div className="w-full min-h-[400px] bg-white animate-pulse" />
});

//const PricingCards = dynamic(() => import('@/components/PricingCards'), { ssr: false });
// para no penalizar CLS
const PricingCards = dynamic(() => import('@/components/PricingCards'), { 
  ssr: false,
  loading: () => <div className="w-full min-h-[600px] bg-white animate-pulse" />
});

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
  // ⚡️ Construimos el bloque del buscador puramente aquí, fuera del "use client"
  const dentistasSection = (
    <section id="dentistas" className="py-24 bg-white border-t border-dkv-gray-border scroll-mt-28 relative overflow-visible">
      <div className="container mx-auto px-4 text-center relative z-40">
         <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-lemon text-dkv-green-dark mb-6 uppercase tracking-wide">Dentistas.</h2>
         </ScrollReveal>
         <ScrollReveal delay={100}>
          <p className="text-xl text-dkv-gray font-fsme max-w-3xl mx-auto mb-10 text-left md:text-center leading-relaxed">
            Nuestra red está formada por más de 2.600 dentistas en más de 1.450 centros dentales en toda España. Encuentra el tuyo.
          </p>
         </ScrollReveal>
         <ScrollReveal delay={200}>       
          <div className="max-w-4xl mx-auto mb-8">
            <HeroSearch />
          </div>
         </ScrollReveal>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-white text-dkv-gray selection:bg-dkv-green selection:text-white relative">
      <CookieBanner />
      
      <main>
        {/* Inyección de Datos Estructurados para SEO (Google Merchant/Knowledge Graph) */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(nationalMasterSchema) }} />
        
        {/* Sección estática de alto impacto (LCP) */}
        <MainHero /> 

        {/* ⚡️ Bloque interactivo recibiendo los Server Components por props */}
        <InteractiveContent 
          dentistasSection={dentistasSection}
          archetypesSection={<Archetypes />}
          pricingCardsSection={<PricingCards />}
        />

        <FooterLegal />
      </main>
    </div>
  );
}
