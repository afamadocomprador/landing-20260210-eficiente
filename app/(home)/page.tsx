"use client"; // ⚡️ IMPORTANTE: Necesitamos interactividad

"use client"; // ⚡️ IMPORTANTE: Necesitamos interactividad

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic'; 
import Link from 'next/link';   
import { Viewport } from 'next';

import { Smile, Zap, Stethoscope, Sparkles, Baby, HeartPulse, Activity, ShieldCheck, ChevronRight, X } from "lucide-react"; 

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

const tratamientosList = [
  { id: 1, href: "/tratamientos/estetica", icon: Baby, image: "/images/tratamientos/estetica.png", title: "Estética" },
  { id: 2, hasSub: true, icon: Sparkles, image: "/images/tratamientos/ortodoncia-brackets-cristal-zafiro-standard-un-diente.png", title: "Ortodoncia" },
  { id: 3, href: "/categorias/implantes#implantes", icon: Stethoscope, image: "/images/tratamientos/implantes.png", title: "Implantes" },
  { id: 4, href: "/tratamientos/odontologia-conservadora#dolor", icon: Zap, image: "/images/tratamientos/endodoncia.png", title: "Dolor" },
  { id: 5, href: "/tratamientos/odontologia-protesis", icon: Activity, title: "Prótesis", image: "/images/tratamientos/protesis.png" },
  { id: 6, href: "/tratamientos/odontopediatría", icon: Smile, image: "/images/tratamientos/odontopediatria.png", title: "Niñ@s" },
  { id: 7, href: "/tratamientos/periodoncia#encias", icon: HeartPulse, image: "/images/tratamientos/general.png", title: "Limpieza" },
  { id: 8, href: "/categorias/higiene-y-prevencion#prevencion", icon: ShieldCheck, image: "/images/tratamientos/ferula.png", title: "Prevención" },
];

const ortodonciaSubOptions = [
  { id: 'invisalign', title: 'Invisalign', href: '/tratamientos/ortodoncia/invisalign', tag: 'Invisible' }, 
  { id: 'lingual', title: 'Lingual', href: '/tratamientos/ortodoncia/lingual', tag: 'Interior' },
  { id: 'zirconio', title: 'Zirconio', href: '/tratamientos/ortodoncia/zirconio', tag: 'Estética Fija' },
  { id: 'metalica', title: 'Metálica', href: '/tratamientos/ortodoncia/metalica', tag: 'Tradicional' }
];

export default function LandingPage() {
  const [activeFloatingId, setActiveFloatingId] = useState<number | null>(null); 
  
  const neumorphicBase = "shadow-[8px_8px_12px_#033b3720,-5px_-5px_10px_#ffffff]";
  const neumorphicActive = "active:shadow-[inset_4px_4px_8px_#033b3730,inset_-4px_-4px_8px_#ffffff]";

  useEffect(() => {
    if (activeFloatingId !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; }; 
  }, [activeFloatingId]);

  return (
    <div className="min-h-screen bg-white text-dkv-gray selection:bg-dkv-green selection:text-white relative">
      <CookieBanner />
      
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(nationalMasterSchema) }} />
        <MainHero /> 

        <section id="tratamientos" className="py-20 bg-[#F0F0F0] border-t border-dkv-gray-border relative z-40">
          <div className="container mx-auto max-w-5xl px-6 md:px-8">

            <ScrollReveal>
              <h2 className="text-4xl md:text-5xl font-lemon text-dkv-green-dark mb-6 text-left md:text-center uppercase tracking-wide">
                Tratamientos.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <p className="text-xl md:text-xl text-dkv-gray font-fsme max-w-3xl mb-12 md:mb-16 leading-relaxed text-left md:text-center mx-auto">
                Servicios básicos sin coste en consulta, y el resto, a <strong>precios inferiores a mercado</strong>.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 xs:gap-5 md:gap-8 relative z-40">
              {tratamientosList.map((item, index) => {
                const Icon = item.icon;
                const Wrapper = item.hasSub ? 'button' : Link; 

                // Lógica de Delay escalonado
                const columnDelay = (index % 2) * 150; 
                const rowDelay = Math.floor(index / 2) * 100;
                const finalDelay = columnDelay + rowDelay;

                return (
                  <ScrollReveal 
                    key={item.id} 
                    delay={finalDelay}
                  >
                    <Wrapper 
                      href={(item.hasSub ? undefined : item.href) as any}
                      onClick={item.hasSub ? () => setActiveFloatingId(item.id) : undefined}
                      className={`w-full relative flex flex-col overflow-hidden rounded-3xl bg-[#F0F0F0] group transition-all duration-300 ease-out aspect-square hover:scale-[1.02] active:scale-[0.98] ${neumorphicBase} ${neumorphicActive}`}
                    >
                      <div className="w-full bg-white flex flex-col justify-start text-left px-3.5 pt-3.5 pb-3 md:px-5 md:pt-5 md:pb-4 relative z-10">
                        <div className="flex justify-between items-start w-full gap-1.5">
                          <span className="block font-bold text-dkv-green-dark group-hover:text-dkv-green transition-colors text-[17px] md:text-xl leading-tight tracking-tight line-clamp-2">
                            {item.title}
                          </span>
                          <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-dkv-green/10 group-hover:scale-110 transition-all duration-300 shrink-0">
                            <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-dkv-green-dark group-hover:text-dkv-green group-hover:translate-x-0.5 transition-all duration-300" strokeWidth={2.5} />
                          </div>
                        </div>
                      </div>

                      <div className={`w-full flex-1 flex items-center justify-center transition-all duration-500 relative overflow-hidden group-hover:bg-dkv-green/5`}>
                        {item.image ? (
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" 
                          />
                        ) : (
                          <div className="text-dkv-green transition-transform group-hover:scale-110 duration-300">
                            <Icon className="w-10 h-10 md:w-14 md:h-14" strokeWidth={1.5} />
                          </div>
                        )}
                      </div>
                    </Wrapper>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        <section id="dentistas" className="py-24 bg-white border-t border-dkv-gray-border relative overflow-visible">
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

        <section id="información" className="py-20 bg-white border-t border-dkv-gray-border scroll-mt-28 relative z-30">
         <ScrollReveal>
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-lemon text-dkv-green-dark mb-6 uppercase tracking-wide">¿Algo que comentar?</h2>
            <p className="text-xl text-dkv-gray font-fsme max-w-3xl mx-auto mb-10 leading-relaxed text-balance">
                Plantéanos cualquier duda sobre tus circunstancias y cómo te puedes beneficiar de nuestros tratamientos.
            </p>
            <Link 
              href="/comentarios"
              className="inline-flex items-center justify-center rounded-dkv font-fsme font-bold duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-dkv-green text-white hover:bg-dkv-green-hover focus:ring-dkv-green disabled:bg-dkv-gray-disabled shadow-xl hover:scale-105 transition-transform gap-3 text-xl px-8 py-6 h-auto"
            >
              Plantear Consulta
            </Link>
          </div>
         </ScrollReveal>
        </section>

        <Archetypes />

        <div className="scroll-mt-28 relative z-30">
          <PricingCards />
        </div>
        
        <FooterLegal />
      </main>

      {/* PANEL FLOTANTE ORTODONCIA */}
      <div 
        className={`fixed inset-0 z-[100] flex flex-col justify-end md:justify-center items-center px-4 pb-0 md:p-4 transition-all duration-500 ease-out ${
          activeFloatingId !== null ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div 
          className={`absolute inset-0 bg-white/60 backdrop-blur-md transition-opacity duration-500 ${
            activeFloatingId !== null ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setActiveFloatingId(null)}
        />

        <div 
          className={`relative w-full md:max-w-[400px] bg-white shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.2)] rounded-t-[28px] md:rounded-[28px] overflow-hidden transition-transform duration-500 ${
            activeFloatingId !== null 
              ? 'translate-y-0 scale-100 opacity-100' 
              : 'translate-y-[100%] md:translate-y-10 md:scale-95 opacity-0'
          }`}
        >
          <div className="bg-[#F5F5F5] px-5 py-4 flex items-center justify-between border-b border-gray-300">
            <div className="flex items-center gap-1.5 text-[15px] font-medium text-gray-500 font-fsme">
              <span>Tratamientos</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900">Ortodoncia</span>
            </div>
            
            <button 
              onClick={() => setActiveFloatingId(null)}
              className="p-1.5 rounded-full bg-[#E5E5E5] text-dkv-green-dark hover:bg-[#D5D5D5] transition-colors"
            >
              <X className="w-5 h-5" strokeWidth={2.5} />
            </button>
          </div>

          <div className="px-5 pt-6 pb-10 md:pb-6">
            <h3 className="text-[26px] font-lemon text-dkv-green-dark uppercase tracking-tight mb-1 leading-none">
              ORTODONCIA
            </h3>
            <p className="text-gray-500 text-[17px] font-fsme mb-4">
              Elige el tipo de aparato:
            </p>

            <div className="flex flex-col border-t border-gray-300">
              {ortodonciaSubOptions.map(sub => (
                <Link 
                  key={sub.id} 
                  href={sub.href}
                  onClick={() => setActiveFloatingId(null)}
                  className="group flex items-center justify-between py-4 border-b border-gray-300 hover:bg-gray-50 transition-colors active:bg-gray-100"
                >
                  <div className="flex items-center flex-wrap gap-2">
                    <span className="font-bold text-[17px] text-dkv-green-dark group-hover:text-dkv-green transition-colors">
                      {sub.title}
                    </span>
                    <span className="text-[16px] text-gray-500">
                      ({sub.tag})
                    </span>
                  </div>
                  <ChevronRight className="w-6 h-6 text-dkv-green-dark group-hover:text-dkv-green transition-colors shrink-0" strokeWidth={2.5} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

