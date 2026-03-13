// app/(home)/page.tsx

"use client"; // ⚡️ IMPORTANTE: Necesitamos interactividad

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic'; 
import Link from 'next/link';   
import type { Metadata, Viewport } from 'next';

import { Smile, Zap, Stethoscope, Sparkles, ArrowRight, Baby, HeartPulse, Activity, ShieldCheck, ChevronRight, ChevronLeft, ChevronDown, X } from "lucide-react"; 

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
  { id: 1, href: "/tratamientos/estetica", icon: Baby, image: "/images/tratamientos/estetica.png", title: "ESTÉTICA", descMain: "", descBold: "", descEnd: "" },
  { id: 2, hasSub: true, icon: Sparkles, image: "/images/tratamientos/ortodoncia-brackets-cristal-zafiro-standard-un-diente.png", title: "ORTODONCIA", descMain: "", descBold: "", descEnd: "" },
  { id: 3, href: "/categorias/implantes#implantes", icon: Stethoscope, image: "/images/tratamientos/implantes.png", title: "IMPLANTES", descMain: "", descBold: "", descEnd: "" },
  { id: 4, href: "/tratamientos/odontologia-conservadora#dolor", icon: Zap, image: "/images/tratamientos/endodoncia.png", title: "ENDODONCIA", descMain: "", descBold: "", descEnd: "" },
  { id: 5, href: "/tratamientos/odontopediatría", icon: Smile, image: "/images/tratamientos/odontopediatria.png", title: "ODONTOPEDIATRÍA", descMain: "", descBold: "", descEnd: "" },
  { id: 6, href: "/tratamientos/periodoncia#encias", icon: HeartPulse, image: "/images/tratamientos/general.png", title: "LIMPIEZA GENERAL", descMain: " ", descBold: "", descEnd: "" },
  { id: 7, href: "/tratamientos/odontologia-protesis", icon: Activity, title: "PRÓTESIS", image: "/images/tratamientos/protesis.png", descMain: "", descBold: "", descEnd: "" },
  { id: 8, href: "/categorias/higiene-y-prevencion#prevencion", icon: ShieldCheck, image: "/images/tratamientos/ferula.png", title: "PREVENCIÓN", descMain: "", descBold: "", descEnd: "" },
];

// ⚡️ ACTUALIZADO: Añadimos iconos/imágenes para el Mini-Bento
const ortodonciaSubOptions = [
  { id: 'invisalign', title: 'Invisalign', href: '/tratamientos/ortodoncia/invisalign', tag: 'Invisible', icon: Sparkles, image: '/images/tratamientos/ortodoncia-invisalign.png' }, 
  { id: 'lingual', title: 'Lingual', href: '/tratamientos/ortodoncia/lingual', tag: 'Interior', icon: Smile, image: '/images/tratamientos/ortodoncia-lingual.png' },
  { id: 'zirconio', title: 'Zirconio', href: '/tratamientos/ortodoncia/zirconio', tag: 'Estética Fija', icon: ShieldCheck, image: '/images/tratamientos/ortodoncia-brackets-cristal-zafiro-standard.png' },
  { id: 'metalica', title: 'Metálica', href: '/tratamientos/ortodoncia/metalica', tag: 'Tradicional', icon: Zap, image: '/images/tratamientos/ortodoncia-brackets-metalico-standard.png' }
  // NOTA: Cuando tengas imágenes reales, pon la ruta en 'image', ej: '/images/tratamientos/invisalign-mini.png'
];

export default function LandingPage() {
  
  const [isAllPanelOpen, setAllPanelOpen] = useState(false);
  const [activeFloatingId, setActiveFloatingId] = useState<number | null>(null); 

  const neumorphicBase = "shadow-[8px_8px_12px_#033b3720,-5px_-5px_10px_#ffffff]";
  const neumorphicActive = "active:shadow-[inset_4px_4px_8px_#033b3730,inset_-4px_-4px_8px_#ffffff]";

  const RightArrowIcon = ({ className = "" }) => (
    <div className={`absolute top-3 right-3 md:top-4 md:right-4 text-dkv-green-dark opacity-70 group-hover:opacity-100 group-hover:text-dkv-green transition-all duration-300 group-hover:translate-x-1 z-10 ${className}`}>
      <ArrowRight className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2.5} />
    </div>
  );

  useEffect(() => {
    if (isAllPanelOpen || activeFloatingId !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; }; 
  }, [isAllPanelOpen, activeFloatingId]);

  return (
    <div className="min-h-screen bg-white text-dkv-gray selection:bg-dkv-green selection:text-white relative">
      <CookieBanner />
      
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(nationalMasterSchema) }} />
        <MainHero /> 

        <section id="tratamientos" className="py-20 bg-[#F0F0F0] border-t border-dkv-gray-border relative z-40 overflow-hidden">
          <div className="container mx-auto max-w-5xl">

            <ScrollReveal delay={0}>
              <h2 className="text-4xl md:text-5xl font-lemon text-dkv-green-dark mb-6 px-8 text-left md:text-center uppercase tracking-wide">
                Tratamientos.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <p className="text-xl md:text-xl text-dkv-gray font-fsme max-w-3xl mb-10 md:mb-12 leading-relaxed text-left md:text-center px-8 relative">
                Ofrecemos servicios básicos gratuitos, y el resto, a <strong>precios inferiores a mercado</strong>.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <div className="flex justify-end mb-6 px-8 md:hidden relative z-50">
                <button 
                  onClick={() => setAllPanelOpen(true)} 
                  className="flex items-center gap-1.5 text-dkv-green font-bold hover:text-dkv-green-dark transition-colors text-lg pb-1"
                >
                  Mostrar todos <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="relative z-40 px-0 md:px-8">
                <div 
                  className="w-full overflow-x-auto md:overflow-visible snap-x snap-mandatory pt-4 pb-12 md:pb-16 px-8 md:px-0 scroll-pl-8" 
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  <style dangerouslySetInnerHTML={{__html: `::-webkit-scrollbar { display: none; }`}} />

                  <div className="grid grid-rows-2 grid-flow-col md:grid-rows-none md:grid-flow-row md:grid-cols-4 gap-5 xs:gap-6 md:gap-8 w-fit md:w-full items-start">
                    
                    {tratamientosList.map((item) => {
                      const Icon = item.icon;
                      const Wrapper = item.hasSub ? 'button' : Link; 

                      return (
                        <Wrapper 
                          key={item.id}
                          href={(item.hasSub ? undefined : item.href) as any}
                          onClick={item.hasSub ? () => setActiveFloatingId(item.id) : undefined}
                          className={`snap-start shrink-0 w-[145px] xs:w-[155px] sm:w-[170px] md:w-full relative flex flex-col overflow-hidden rounded-3xl bg-[#F0F0F0] group transition-all duration-300 ease-out aspect-square hover:scale-[1.02] active:scale-[0.98] ${neumorphicBase} ${neumorphicActive} ${item.hasSub ? 'text-left' : ''}`}
                        >
                          {!item.hasSub && <RightArrowIcon />}

                          <div className={`w-full bg-white flex items-center justify-center transition-all duration-500 relative overflow-hidden group-hover:bg-dkv-green/5 h-[45%]`}>
                            {item.image ? (
                              <img 
                                src={item.image} 
                                alt={item.title} 
                                className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" 
                              />
                            ) : (
                              <div className="text-dkv-green transition-transform group-hover:scale-110 duration-300">
                                <Icon className="w-8 h-8 xs:w-10 xs:h-10 md:w-12 md:h-12" strokeWidth={1.5} />
                              </div>
                            )}
                          </div>

                          <div className="w-full flex flex-col justify-start text-left p-3 xs:p-4 md:p-5 relative z-10 flex-1">
                            <div className="flex justify-between items-center w-full">
                              <span className="block font-bold text-dkv-green-dark group-hover:text-dkv-green transition-colors text-base xs:text-lg md:text-xl leading-tight mb-1 md:mb-1.5 uppercase tracking-tight line-clamp-1">
                                {item.title}
                              </span>
                              {item.hasSub && (
                                <ChevronDown className="w-5 h-5 text-dkv-green group-hover:translate-y-1 transition-transform duration-300" />
                              )}
                            </div>
                            
                            <span className="text-sm md:text-base text-gray-500 leading-snug line-clamp-2">
                              {item.descMain}<span className="text-dkv-green font-bold">{item.descBold}</span>{item.descEnd}
                            </span>
                          </div>
                        </Wrapper>
                      );
                    })}

                  </div>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </section>

        {/* --- SECCIONES RESTANTES --- */}
        <section id="dentistas" className="py-24 bg-white border-t border-dkv-gray-border relative overflow-visible">
          <div className="container mx-auto px-4 text-center relative z-40">
           <ScrollReveal delay={0}>
            <h2 className="text-4xl md:text-5xl font-lemon text-dkv-green-dark mb-6 uppercase tracking-wide">Dentistas.</h2>
           </ScrollReveal>
           <ScrollReveal delay={100}>
            <p className="text-xl text-dkv-gray font-fsme max-w-3xl mx-auto mb-6 md:mb-10 px-4 md:px-0 text-left md:text-center leading-relaxed">
              Nuestra red está formada por más de 2.600 dentistas en más de 1.450 centros dentales en toda España. Seguro que tienes uno cerca. Encuentra el tuyo.
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

      {/* ⚡️⚡️ 1. EL SUB-BENTO VOLADOR CON REJILLA 2x2 ⚡️⚡️ */}
      <div 
        className={`fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-0 transition-all duration-500 ease-out ${
          activeFloatingId !== null ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Overlay desenfocado */}
        <div 
          className={`absolute inset-0 bg-[#033B37]/30 backdrop-blur-md transition-opacity duration-500 ${
            activeFloatingId !== null ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setActiveFloatingId(null)}
        />

        {/* Modal Glassmorphism */}
        <div 
          className={`relative w-full max-w-[340px] bg-[#F0F0F0]/95 backdrop-blur-xl border border-white/50 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.3)] rounded-3xl p-5 transition-all duration-400 transform ${
            activeFloatingId !== null ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-10 opacity-0'
          }`}
        >
          <div className="flex justify-between items-center mb-5 px-1">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-dkv-green/10 rounded-xl text-dkv-green">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-dkv-green-dark uppercase tracking-tight">Ortodoncia</h3>
            </div>
            <button 
              onClick={() => setActiveFloatingId(null)}
              className="p-1.5 rounded-full bg-black/5 text-gray-500 hover:bg-black/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* ⚡️ LA REJILLA FRACTAL (Mini Bento) */}
          <div className="grid grid-cols-2 gap-3">
            {ortodonciaSubOptions.map(sub => {
              const SubIcon = sub.icon;
              return (
                <Link 
                  key={sub.id} 
                  href={sub.href}
                  onClick={() => setActiveFloatingId(null)}
                  className={`relative flex flex-col overflow-hidden rounded-2xl bg-[#F0F0F0] group transition-all duration-300 aspect-square hover:scale-[1.03] active:scale-[0.97] ${neumorphicBase} ${neumorphicActive}`}
                >
                  {/* Mitad Superior: Imagen / Icono */}
                  <div className="h-[55%] w-full bg-white flex items-center justify-center transition-colors group-hover:bg-dkv-green/5 overflow-hidden">
                    {sub.image ? (
                      <img src={sub.image} alt={sub.title} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" />
                    ) : (
                      <div className="text-dkv-green transition-transform group-hover:scale-110 duration-300">
                        <SubIcon className="w-6 h-6" strokeWidth={1.5} />
                      </div>
                    )}
                  </div>

                  {/* Mitad Inferior: Título y Tag */}
                  <div className="h-[45%] w-full flex flex-col justify-center items-start p-2.5 z-10">
                    <span className="block font-bold text-dkv-green-dark group-hover:text-dkv-green transition-colors text-sm leading-tight mb-1 uppercase tracking-tight line-clamp-1">
                      {sub.title}
                    </span>
                    <span className="text-[9px] font-bold uppercase bg-dkv-green/10 text-dkv-green px-2 py-0.5 rounded-full line-clamp-1">
                      {sub.tag}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* ⚡️⚡️ 2. PANEL LATERAL ORIGINAL (Para "Mostrar todos" en mobile) ⚡️⚡️ */}
      <div 
        className={`fixed inset-0 bg-black/50 z-[40] transition-opacity duration-300 ${isAllPanelOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} 
        onClick={() => setAllPanelOpen(false)} 
      />

      <div 
        className={`fixed right-0 top-0 h-full w-full bg-[#F0F0F0] z-[45] pt-[80px] md:pt-[130px] shadow-2xl transition-transform duration-300 transform flex flex-col ${isAllPanelOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="relative flex items-center justify-center w-full px-4 py-5 border-b border-dkv-gray-border/50 sticky top-0 bg-[#F0F0F0] z-10">
          <button 
            onClick={() => setAllPanelOpen(false)} 
            className="absolute left-4 w-10 h-10 flex items-center justify-center rounded-full bg-white text-dkv-green-dark shadow-sm border border-dkv-gray-border active:scale-95 transition-transform"
          >
            <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
          </button>
          <h3 className="text-2xl font-lemon text-dkv-green-dark uppercase tracking-wide text-center">
            Tratamientos
          </h3>
        </div>

        <div className="flex-1 overflow-y-auto px-6 xs:px-8 pt-8 pb-24">
          <style dangerouslySetInnerHTML={{__html: `::-webkit-scrollbar { display: none; }`}} />
          
          <div className="grid grid-cols-2 gap-4 xs:gap-6 items-start">
            {tratamientosList.map((item) => {
              const Icon = item.icon;
              const Wrapper = item.hasSub ? 'button' : Link;

              return (
                <Wrapper 
                  key={`panel-${item.id}`}
                  href={item.hasSub ? undefined : item.href} 
                  onClick={item.hasSub ? () => setActiveFloatingId(item.id) : () => setAllPanelOpen(false)}
                  className={`w-full relative flex flex-col overflow-hidden rounded-3xl bg-[#F0F0F0] group transition-all duration-300 ease-out aspect-square hover:scale-[1.02] active:scale-[0.98] ${neumorphicBase} ${neumorphicActive} ${item.hasSub ? 'text-left' : ''}`}
                >
                  {!item.hasSub && <RightArrowIcon className="top-3 right-3 opacity-60 group-hover:opacity-100" />}

                  <div className={`w-full bg-white flex items-center justify-center transition-all duration-500 relative overflow-hidden group-hover:bg-dkv-green/5 h-[45%]`}>
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" 
                      />
                    ) : (
                      <div className="text-dkv-green transition-transform group-hover:scale-110 duration-300">
                        <Icon className="w-8 h-8 xs:w-10 xs:h-10" strokeWidth={1.5} />
                      </div>
                    )}
                  </div>

                  <div className="w-full flex flex-col justify-start text-left p-3 xs:p-4 relative z-10 flex-1">
                    <div className="flex justify-between items-center w-full">
                      <span className="block font-bold text-dkv-green-dark group-hover:text-dkv-green transition-colors text-base xs:text-lg leading-tight mb-1 uppercase tracking-tight line-clamp-1">
                        {item.title}
                      </span>
                      {item.hasSub && (
                         <ChevronDown className="w-4 h-4 text-dkv-green group-hover:translate-y-1 transition-transform duration-300" />
                      )}
                    </div>
                  </div>
                </Wrapper>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}
