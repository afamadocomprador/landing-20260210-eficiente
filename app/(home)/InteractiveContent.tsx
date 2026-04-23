//app/(home)/InteractiveContent.tsx

"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic'; 
import Link from 'next/link';   
import Image from 'next/image';
import { ChevronRight, X, ArrowRight, Stethoscope, HeartPulse, Sparkles, Activity, Smile, Baby, Zap, ShieldCheck, Moon, Scissors } from "lucide-react"; 

import HeroSearch from '@/components/home/HeroSearch';
import ScrollReveal from '@/components/ui/ScrollReveal';

// Componentes pesados con carga diferida
const Archetypes = dynamic(() => import('@/components/Archetypes'), { ssr: false });
const PricingCards = dynamic(() => import('@/components/PricingCards'), { ssr: false });

// DATA ORIGINAL RESTAURADA (Para evitar fallos de rutas de imagen)
const tratamientosList = [
  { id: 1, href: "/categorias/implantes#implantes", icon: Stethoscope, image: "/images/tratamientos/implantes.png", title: "Implantes", hasSub: true },
  { id: 2, href: "/tratamientos/periodoncia#encias", icon: HeartPulse, image: "/images/tratamientos/general.png", title: "General", hasSub: true },
  { id: 3, href: "/tratamientos/ortodoncia-estetica#sonrisa", icon: Sparkles, image: "/images/tratamientos/ortodoncia-brackets-cristal-zafiro-standard-un-diente.png", title: "Ortodoncia", hasSub: true },
  { id: 4, href: "/tratamientos/odontologia-protesis", icon: Activity, title: "Prótesis", image: "/images/tratamientos/protesis.png", hasSub: true },
  { id: 6, href: "/tratamientos/odontopediatría", icon: Smile, image: "/images/tratamientos/odontopediatria.png", title: "Niñ@s", hasSub: true },
  { id: 5, href: "/tratamientos/estetica", icon: Baby, image: "/images/tratamientos/estetica.png", title: "Estética", hasSub: true },
  { id: 7, href: "/tratamientos/odontologia-conservadora#dolor", icon: Zap, image: "/images/tratamientos/endodoncia.png", title: "Salvar piezas", hasSub: true },
  { id: 8, href: "/categorias/higiene-y-prevencion#prevencion", icon: ShieldCheck, image: "/images/tratamientos/ferula.png", title: "Prevención", hasSub: true },
];

export default function InteractiveContent() {
  const [activeFloatingId, setActiveFloatingId] = useState<number | null>(null); 
  
  const neumorphicBase = "shadow-[8px_8px_12px_#033b3720,-5px_-5px_10px_#ffffff]";
  const neumorphicActive = "active:shadow-[inset_4px_4px_8px_#033b3730,inset_-4px_-4px_8px_#ffffff]";

  // Bloqueo de scroll y gestión de URL
  useEffect(() => {
    document.body.style.overflow = activeFloatingId !== null ? 'hidden' : '';
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 400);
    }
    return () => { document.body.style.overflow = ''; }; 
  }, [activeFloatingId]);

  return (
    <>
      {/* SECCIÓN TRATAMIENTOS. (Con el punto original) */}
      <section id="tratamientos" className="py-20 bg-[#F0F0F0] border-t border-dkv-gray-border relative z-40">
        <div className="container mx-auto max-w-5xl px-6 md:px-8">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-lemon text-dkv-green-dark mb-6 text-left md:text-center uppercase tracking-wide">
              Tratamientos.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <p className="text-xl text-dkv-gray font-fsme max-w-3xl mb-12 md:mb-16 leading-relaxed text-left md:text-center mx-auto">
              Ofrecemos servicios básicos gratuitos, y el resto, a <strong>precios inferiores a mercado</strong>.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 xs:gap-5 md:gap-8 relative z-40">
            {tratamientosList.map((item, index) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={item.id} delay={index * 100}>
                  <button 
                    onClick={() => setActiveFloatingId(item.id)}
                    className={`w-full relative flex flex-col overflow-hidden rounded-3xl bg-[#F0F0F0] group transition-all duration-300 aspect-square hover:scale-[1.02] ${neumorphicBase} ${neumorphicActive}`}
                  >
                    <div className="w-full bg-white flex flex-col justify-start text-left px-3.5 pt-3.5 pb-3 md:px-5 md:pt-5 md:pb-4 relative z-10">
                      <div className="flex justify-between items-start w-full gap-1.5">
                        <span className="block font-bold text-dkv-green-dark group-hover:text-dkv-green transition-colors text-[17px] md:text-xl leading-tight tracking-tight uppercase line-clamp-1">
                          {item.title}
                        </span>
                        <ArrowRight className="w-4 h-4 text-dkv-green-dark opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                    <div className="w-full flex-1 flex items-center justify-center relative overflow-hidden bg-white group-hover:bg-dkv-green/5">
                      {item.image ? (
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" />
                      ) : (
                        <Icon className="w-10 h-10 text-dkv-green" />
                      )}
                    </div>
                  </button>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECCIÓN DENTISTAS. (Con el punto original) */}
      <section id="dentistas" className="py-24 bg-white border-t border-dkv-gray-border relative overflow-visible">
        <div className="container mx-auto px-4 text-center relative z-40">
          <ScrollReveal><h2 className="text-4xl md:text-5xl font-lemon text-dkv-green-dark mb-6 uppercase tracking-wide">Dentistas.</h2></ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="text-xl text-dkv-gray font-fsme max-w-3xl mx-auto mb-10 text-left md:text-center leading-relaxed px-4">
              Nuestra red está formada por más de 2.600 dentistas en más de 1.450 centros dentales. Encuentra el tuyo.
            </p>
          </ScrollReveal>
          <div className="max-w-4xl mx-auto mb-8"><HeroSearch /></div>
        </div>
      </section>

      {/* RESTAURACIÓN: SECCIÓN ¿Algo que comentar? */}
      <section id="información" className="py-20 bg-white border-t border-dkv-gray-border scroll-mt-28 relative z-30">
         <ScrollReveal>
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-lemon text-dkv-green-dark mb-6 uppercase tracking-wide">¿Algo que comentar?</h2>
            <p className="text-xl text-dkv-gray font-fsme max-w-3xl mx-auto mb-10 leading-relaxed">
                Plantéanos cualquier duda sobre tus circunstancias y cómo te puedes beneficiar de nuestros tratamientos.
            </p>
            <Link 
              href="/comentarios"
              className="inline-flex items-center justify-center rounded-dkv font-fsme font-bold bg-dkv-green text-white hover:bg-dkv-green-hover shadow-xl hover:scale-105 transition-transform text-xl px-8 py-6"
            >
              Plantear Consulta
            </Link>
          </div>
         </ScrollReveal>
      </section>

      <Archetypes />
      <div className="scroll-mt-28 relative z-30"><PricingCards /></div>

      {/* PANEL FLOTANTE (RESTAURADO) */}
      {activeFloatingId && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end md:justify-center items-center px-4">
          <div className="absolute inset-0 bg-white/60 backdrop-blur-md" onClick={() => setActiveFloatingId(null)} />
          <div className="relative w-full md:max-w-[420px] bg-white shadow-2xl rounded-t-[28px] md:rounded-[28px] overflow-hidden flex flex-col max-h-[85vh]">
            <div className="bg-[#F5F5F5] px-5 py-4 flex items-center justify-between border-b border-gray-300">
              <span className="text-sm font-bold text-gray-500 font-fsme uppercase">Opciones disponibles</span>
              <button onClick={() => setActiveFloatingId(null)} className="p-1.5 rounded-full bg-[#E5E5E5]"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 overflow-y-auto italic text-dkv-gray">
               {/* Aquí se cargan las sub-opciones del archivo constants/tratamientos.ts */}
               Cargando opciones...
            </div>
          </div>
        </div>
      )}
    </>
  );
}