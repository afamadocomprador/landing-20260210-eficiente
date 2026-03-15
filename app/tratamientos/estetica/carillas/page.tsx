// app/tratamientos/estetica/carillas/page.tsx

import { Metadata } from "next";
import React from "react";
import Link from "next/link";

// Componentes de Layout y UI
import Header from "@/components/layout/Header";
import FooterLegal from "@/components/FooterLegal";
import CookieBanner from "@/components/CookieBanner";
import FixedBreadcrumb from "@/components/layout/FixedBreadcrumb";
import StickySubNav from "@/components/layout/StickySubNav";
import TreatmentsHero from "@/components/hero/TreatmentsHero";
import HeroSearch from '@/components/home/HeroSearch';
import ScrollReveal from "@/components/ui/ScrollReveal";
import ShareButton from "@/components/ui/ShareButton";

import { Info, Sparkles, Diamond, ShieldCheck, Layers, Smile } from "lucide-react"; 

export const metadata: Metadata = {
  title: "Carillas Dentales y Diseño de Sonrisa | Precios DKV Dentisalud",
  description: "Cambia el color, forma y tamaño de tus dientes. Descubre nuestras carillas de composite, porcelana y disilicato de litio con diseño digital 3D.",
};

// --- Componente Ficha de Tratamiento ---
const TreatmentRow = ({ id, name, price, image, imageAlt, secondaryImage, secondaryImageAlt, titleTag = "h2", children }: any) => {
  const Tag = titleTag; 
  return (
    <div id={id} className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-md border border-dkv-gray-border/80 hover:shadow-xl hover:border-dkv-green/40 hover:-translate-y-1 transition-all duration-300 group scroll-mt-[220px]">
      <Tag className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 md:gap-4 mb-5 text-lg md:text-xl font-bold font-lemon text-dkv-green-dark leading-snug uppercase">
        <span className="pr-4 mt-1">{name}</span>
        <span className="flex items-center gap-3 self-end md:self-auto mt-2 md:mt-0">
          {price && (
            <span className="inline-flex items-center justify-center bg-dkv-green/10 px-4 py-1.5 rounded-full shrink-0 text-2xl font-lemon font-bold text-dkv-green normal-case">
              {price}
            </span>
          )}
          <ShareButton id={id} title={name} />
        </span>
      </Tag>

      {image && (
        <div className="mb-6 w-full overflow-hidden rounded-xl border border-gray-100 flex items-center justify-center bg-gray-50/50 py-4">
          <img src={image} alt={imageAlt || name} className="w-full h-auto object-contain max-h-[200px] md:max-h-[250px] transition-transform duration-700 group-hover:scale-105" loading="lazy" />
        </div>
      )}
      
      <div className="text-dkv-gray font-fsme leading-relaxed text-lg md:text-lg space-y-4">
        {children}
      </div>

      {secondaryImage && (
        <div className="mt-8 w-full overflow-hidden rounded-xl border border-gray-100 flex items-center justify-center bg-gray-50/30 py-4">
          <img src={secondaryImage} alt={secondaryImageAlt || `${name} - detalle`} className="w-full h-auto object-contain max-h-[140px] md:max-h-[180px] transition-transform duration-700 group-hover:scale-105" loading="lazy" />
        </div>
      )}
    </div>
  );
};

export default function CarillasPage() {
  const breadcrumbs = [
    { label: "Inicio", href: "/" },
    { label: "Tratamientos", href: "/tratamientos" },
    { label: "Estética Dental", href: "/tratamientos/estetica" },
    { label: "Carillas y Diseño", href: "#" }
  ];

  return (
    <div className="min-h-screen bg-white font-fsme text-dkv-gray selection:bg-dkv-green selection:text-white pb-32">
      <CookieBanner />
      <Header />

      <main className="pt-[30px] md:pt-[110px] lg:pt-[130px]">
        <FixedBreadcrumb items={breadcrumbs} behavior="smart" />

        <TreatmentsHero 
          badgeText="Transformación Total"
          title={{ dark: "CARILLAS Y DISEÑO DE", normal: "SONRISA" }} 
          description={[
            "El objetivo: Cambiar radicalmente el color, la forma, el tamaño o cerrar espacios (diastemas) entre los dientes frontales.",
            "Las carillas son unas láminas finísimas que se adhieren fuertemente a la cara visible del diente, logrando una armonía perfecta."
          ]}
        />

        {/* Menú transversal asegurándonos de que activeId coincida con la ruta estética */}
        <StickySubNav activeId="carillas" />

        <section className="bg-dkv-gray-border/30 pt-12 pb-20">
          <div className="container mx-auto px-4 max-w-4xl flow-root">

            <div className="space-y-8">
              
              {/* INTRODUCCIÓN A LAS OPCIONES BÁSICAS */}
              <ScrollReveal delay={100} direction="up">
                <div className="mb-8 text-center md:text-left">
                  <span className="text-dkv-green font-bold text-lg uppercase tracking-[0.2em] font-fsme">Tratamientos Base</span>
                  <h3 className="text-2xl font-bold font-lemon text-dkv-green-dark border-b-2 border-dkv-green pb-3 inline-block w-full mt-2 uppercase tracking-wide">
                    Opción Básica y Tradicional
                  </h3>
                  <p className="text-dkv-gray mt-4 font-fsme text-lg">
                    Soluciones rápidas y efectivas disponibles en todas nuestras clínicas para mejorar la estética de tus dientes frontales de forma económica.
                  </p>
                </div>
              </ScrollReveal>

              {/* Ficha 1: Carillas de Composite */}
              <ScrollReveal delay={200} direction="up">
                <TreatmentRow 
                    id="carillas-composite" 
                    name="Carillas Estéticas de Composite" 
                    price="75 €"
                  >
                  <p><strong>Rápido y económico.</strong> El dentista modela una resina estética directamente sobre tu diente, capa a capa, y la endurece con luz en una sola sesión.</p>
                  <p className="text-sm font-medium text-dkv-gray/80 italic mt-2">
                    * Precio por diente. Ideal para pequeñas correcciones de forma o color en una sola visita.
                  </p>
                </TreatmentRow>
              </ScrollReveal>

              {/* Ficha 2: Carillas de Porcelana Tradicional */}
              <ScrollReveal delay={300} direction="up">
                <TreatmentRow 
                    id="carillas-porcelana" 
                    name="Carillas Estéticas de Porcelana" 
                    price="180 €"
                  >
                  <p><strong>Máxima estabilidad de color.</strong> A diferencia de la resina, estas "losetas" de cerámica se fabrican a medida en el laboratorio. No se tiñen ni pierden color con el paso de los años (no absorben café ni tabaco).</p>
                  
                  <div className="bg-dkv-gray-light/30 rounded-2xl p-5 border border-dkv-gray-border mt-4">
                    <ul className="space-y-4">
                      <li className="flex flex-col md:flex-row md:justify-between items-start md:items-center pb-3 border-b border-dkv-gray-border/50">
                        <span className="font-bold text-dkv-gray">Carilla de porcelana estándar <span className="font-normal block text-sm text-dkv-gray/80">(precio por diente)</span></span>
                        <span className="font-lemon text-lg text-dkv-green-dark shrink-0">180 €</span>
                      </li>
                      <li className="flex flex-col md:flex-row md:justify-between items-start md:items-center">
                        <span className="font-bold text-dkv-gray">Suplemento porcelanas y efectos especiales <span className="font-normal block text-sm text-dkv-gray/80">El laboratorio pinta y texturiza imitando las transparencias de un diente natural perfecto.</span></span>
                        <span className="font-lemon text-lg text-dkv-green-dark shrink-0">50 €</span>
                      </li>
                    </ul>
                  </div>
                </TreatmentRow>
              </ScrollReveal>


              {/* 💎 BLOQUE PREMIUM: ALTA ESTÉTICA DIGITAL */}
              <ScrollReveal delay={150} direction="up">
                <div id="alta-estetica-digital" className="bg-gradient-to-br from-dkv-green-dark to-[#022A27] rounded-2xl md:rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden mt-16 mb-12 scroll-mt-[220px] text-white">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 blur-[100px] rounded-full"></div>
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#D4AF37] opacity-10 blur-[80px] rounded-full"></div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <Diamond className="w-8 h-8 text-[#D4AF37]" />
                      <span className="text-[#D4AF37] font-bold text-sm md:text-base uppercase tracking-[0.2em] font-fsme">Upgrade Premium Exclusivo</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-lemon mb-6 uppercase tracking-wide">
                      Alta Estética Digital (DSD)
                    </h2>
                    <p className="font-fsme text-lg mb-6 text-white/90 leading-relaxed">
                      Para los pacientes más exigentes que buscan una transformación total (el famoso <strong>"Hollywood Smile"</strong>) sin sorpresas. Aquí no imaginamos el resultado; <strong>te lo probamos en tu boca antes de empezar</strong>. Disponible exclusivamente en nuestros Centros Propios Especiales.
                    </p>

                    <h3 className="font-lemon text-xl text-[#D4AF37] mb-4 uppercase mt-8 border-b border-white/20 pb-2">1. Diseño Digital de Sonrisas (Dental Smile Design)</h3>
                    <p className="font-fsme text-sm text-white/80 mb-4">Estudio fotográfico y simulación por ordenador para que apruebes el resultado final antes de tocar tu esmalte real.</p>
                    
                    <div className="bg-white/10 rounded-2xl p-6 border border-white/20 backdrop-blur-sm mb-8">
                      <ul className="space-y-4">
                        <li className="flex flex-col md:flex-row md:justify-between items-start md:items-center pb-3 border-b border-white/20">
                          <span className="font-bold text-white">Modelos de análisis y estudio fotográfico</span>
                          <span className="font-lemon text-lg text-[#D4AF37] shrink-0 mt-1 md:mt-0">Incluido (0 €)</span>
                        </li>
                        <li className="flex flex-col md:flex-row md:justify-between items-start md:items-center pb-3 border-b border-white/20">
                          <span className="font-bold text-white">Encerado diagnóstico estético <span className="font-normal block text-sm text-white/70">Diseño de tu sonrisa en ordenador</span></span>
                          <span className="font-lemon text-lg text-[#D4AF37] shrink-0 mt-1 md:mt-0">Incluido (0 €)</span>
                        </li>
                        <li className="flex flex-col md:flex-row md:justify-between items-start md:items-center pb-3 border-b border-white/20">
                          <span className="font-bold text-white">Mock-up (Carilla provisional de prueba) <span className="font-normal block text-sm text-white/70">Imprimimos tu nueva sonrisa y te la ponemos sobre tus dientes temporalmente.</span></span>
                          <span className="font-lemon text-lg text-[#D4AF37] shrink-0 mt-1 md:mt-0">Incluido (0 €)</span>
                        </li>
                        <li className="flex flex-col md:flex-row md:justify-between items-start md:items-center">
                          <span className="font-bold text-white">Informe presentación del estudio <span className="font-normal block text-sm text-white/70">Te llevas tu proyecto a casa.</span></span>
                          <span className="font-lemon text-lg text-[#D4AF37] shrink-0 mt-1 md:mt-0">Incluido (0 €)</span>
                        </li>
                      </ul>
                    </div>

                    <h3 className="font-lemon text-xl text-[#D4AF37] mb-4 uppercase border-b border-white/20 pb-2">2. Fabricación de Carillas de Alta Gama</h3>
                    <p className="font-fsme text-sm text-white/80 mb-4">Resistencia y estética suprema. Fabricación robótica de ultra precisión.</p>
                    
                    <div className="bg-white/10 rounded-2xl p-6 border border-white/20 backdrop-blur-sm">
                      <ul className="space-y-6">
                        <li className="flex flex-col md:flex-row md:justify-between items-start md:items-center pb-4 border-b border-white/20">
                          <div>
                            <span className="font-bold text-white text-lg block mb-1">Carilla de porcelana 3D (CAD-CAM)</span>
                            <span className="font-normal text-sm text-white/80 block max-w-lg">Fabricada por ordenadores y robótica en 3D para un ajuste microscópico perfecto.</span>
                          </div>
                          <span className="font-lemon text-2xl text-[#D4AF37] shrink-0 mt-2 md:mt-0">396 € <span className="text-sm font-fsme text-white/70 block md:inline">/diente</span></span>
                        </li>
                        <li className="flex flex-col md:flex-row md:justify-between items-start md:items-center">
                          <div>
                            <span className="font-bold text-white text-lg block mb-1">Carilla de Disilicato de Litio</span>
                            <span className="font-normal text-sm text-white/80 block max-w-lg">El material más avanzado del mundo. 3 veces más resistente que la porcelana tradicional, permite fabricar carillas del grosor de una lente de contacto. <strong className="text-[#D4AF37]">A menudo sin necesidad de limar el diente natural.</strong></span>
                          </div>
                          <span className="font-lemon text-2xl text-[#D4AF37] shrink-0 mt-2 md:mt-0">400 € <span className="text-sm font-fsme text-white/70 block md:inline">/diente</span></span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

            </div>
          </div>
        </section>

        {/* ⚡️ SECCIÓN DE CTA */}
        <section className="py-20 bg-white border-t border-dkv-gray-border">
          <div className="container mx-auto px-4 max-w-5xl">
            <ScrollReveal>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-lemon text-dkv-green-dark mb-4">Planifica tu tratamiento</h2>
                  <div className="bg-dkv-gray-light p-4 rounded-xl border border-dkv-gray-border/50 mb-8 flex items-start gap-3">
                    <Info className="w-5 h-5 text-dkv-green shrink-0 mt-0.5" />
                    <p className="text-lg text-dkv-gray font-fsme leading-relaxed">
                      La información reflejada en esta página tiene mero carácter orientativo. Para asegurar que tus dientes son aptos para recibir carillas y decidir el material óptimo (composite vs disilicato), necesitas la evaluación clínica de uno de nuestros especialistas en estética.
                    </p>
                  </div>
                  <p className="text-lg text-dkv-gray mb-6">
                    Reserva tu cita de valoración y descubre cómo quedaría tu sonrisa ideal antes incluso de empezar. Encuentra tu centro más cercano:
                  </p>
                </div>
                
                <div className="w-full">
                  <HeroSearch />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

      </main>

      <FooterLegal />
    </div>
  );
}
