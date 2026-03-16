// app/tratamientos/ortodoncia/invisalign/page.tsx

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

// ⚡️ Añadido el icono Diamond para el bloque Premium
import { AlertCircle, Info, Zap, Sparkles, Smile, ShieldCheck, CheckCircle2, Diamond } from "lucide-react"; 

export const metadata: Metadata = {
  title: "Ortodoncia Invisible Invisalign | Precios Cerrados DKV Dentisalud",
  description: "Alineadores transparentes y removibles. El sistema más demandado por adultos para una ortodoncia cómoda, estética y planificada en 3D.",
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

export default function OrtodonciaInvisalignPage() {
  const breadcrumbs = [
    { label: "Inicio", href: "/" },
    { label: "Tratamientos", href: "/tratamientos" },
    { label: "Ortodoncia", href: "/tratamientos/ortodoncia" },
    { label: "Invisalign", href: "#" }
  ];

  return (
    <div className="min-h-screen bg-white font-fsme text-dkv-gray selection:bg-dkv-green selection:text-white pb-32">
      <CookieBanner />
      <Header />

      <main className="pt-[30px] md:pt-[110px] lg:pt-[130px]">
        <FixedBreadcrumb items={breadcrumbs} behavior="smart" />

        <TreatmentsHero 
          badgeText="El sistema más demandado"
          title={{ dark: "ORTODONCIA", normal: "INVISIBLE" }} 
          description={[
            "La revolución de la ortodoncia. Alineadores transparentes y removibles para diseñar tu sonrisa sin interrumpir tu estilo de vida ni tu comodidad.",
          ]}
        />

        {/* ⚡️ Inyección del menú transversal (Invisalign Activo) */}
        <StickySubNav activeId="invisalign" />

        <section className="bg-dkv-gray-border/30 pt-12 pb-20">
          <div className="container mx-auto px-4 max-w-4xl flow-root">

            <div className="space-y-8">
              {/* Ficha 1: Invisalign */}
              <ScrollReveal delay={100} direction="up">
                <TreatmentRow 
                    id="invisalign" 
                    name="Alineadores Transparentes / Invisalign" 
                    image="/images/tratamientos/ortodoncia-invisalign.png"
                    secondaryImage="/images/tratamientos/ortodoncia-invisalign-un-diente.png"
                  >
                  <p>Es actualmente el sistema más demandado por pacientes adultos debido a su comodidad y altísima estética. Consiste en una secuencia de férulas de plástico transparente y removibles fabricadas a medida mediante tecnología digital tridimensional.</p>
                  
                  <div className="my-6">
                    <h3 className="text-dkv-green-dark font-bold font-lemon text-sm uppercase mb-3">Por qué elegirlo</h3>
                    <ul className="space-y-2 text-base">
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-dkv-green shrink-0 mt-0.5" /> <span><strong>Comodidad absoluta:</strong> Prácticamente invisibles y eliminan el riesgo de rozaduras o llagas.</span></li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-dkv-green shrink-0 mt-0.5" /> <span><strong>Libertad total:</strong> Al ser removibles, permiten comer con total normalidad.</span></li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-dkv-green shrink-0 mt-0.5" /> <span><strong>Higiene perfecta:</strong> Cepilla tus dientes y usa hilo dental sin obstáculos metálicos.</span></li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-dkv-green shrink-0 mt-0.5" /> <span><strong>Previsibilidad:</strong> A través de un software 3D, podrás ver la evolución de tu sonrisa antes de empezar.</span></li>
                    </ul>
                  </div>

                  <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 mb-6">
                    <p className="text-sm text-slate-700">
                      <strong>El factor de adaptación:</strong> Los primeros días de cada férula nueva sentirás una ligera presión (señal de que los dientes se están moviendo) y puede que notes un levísimo cambio en la pronunciación, el cual desaparece en unos días.
                    </p>
                  </div>
                  
                  {/* 💎 BLOQUE PREMIUM: CENTROS PROPIOS (Integrado dentro o justo antes de precios) */}
                  <div id="garantia-centros-propios" className="bg-gradient-to-br from-dkv-green-dark to-[#022A27] rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden my-8 text-white border border-[#D4AF37]/30">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-5 blur-[80px] rounded-full"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#D4AF37] opacity-10 blur-[60px] rounded-full"></div>

                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-3">
                        <Diamond className="w-6 h-6 text-[#D4AF37]" />
                        <span className="text-[#D4AF37] font-bold text-xs md:text-sm uppercase tracking-[0.2em] font-fsme">Garantía Exclusiva</span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-lemon mb-3 uppercase tracking-wide">
                        Centros Propios Especiales DKV
                      </h3>
                      <p className="font-fsme text-base text-white/90 leading-relaxed mb-0">
                        Los tratamientos de Ortodoncia Invisible que vendemos se realizan <strong>EXCLUSIVAMENTE en nuestros Centros Propios Especiales</strong>. Solo a través de nuestra red clínica de élite podemos asegurar el rigor de la planificación 3D, la autenticidad de los materiales y ofrecerte una <strong>garantía total sobre los resultados</strong>. Si no es en un Centro Propio, no está garantizado.
                      </p>
                    </div>
                  </div>

                  <div className="bg-dkv-gray-light/30 rounded-2xl p-5 md:p-6 border border-dkv-gray-border mt-6">
                    <h3 className="text-dkv-green-dark font-bold font-lemon text-sm uppercase mb-4">Precios Integrales Cerrados</h3>
                    <ul className="space-y-4">
                      <li className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-dkv-gray-border/50">
                        <span className="font-bold text-dkv-gray">Tratamiento completo ambos maxilares hasta 12 meses</span>
                        <span className="font-lemon text-2xl text-dkv-green-dark shrink-0 mt-1 md:mt-0">3.210 €</span>
                      </li>
                      <li className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-dkv-gray-border/50">
                        <span className="font-bold text-dkv-gray">Tratamiento completo ambos maxilares hasta 24 meses</span>
                        <span className="font-lemon text-2xl text-dkv-green-dark shrink-0 mt-1 md:mt-0">4.000 €</span>
                      </li>
                      <li className="flex flex-col md:flex-row justify-between items-start md:items-center pt-2">
                        <span className="font-medium text-dkv-gray/80 italic text-sm">Requiere Diagnóstico inicial (para trazar el mapa de ruta 3D) y Aparatología estabilizadora final.</span>
                      </li>
                    </ul>
                  </div>
                </TreatmentRow>
              </ScrollReveal>

              {/* Ficha 2: Diagnóstico y Retención */}
              <ScrollReveal delay={200} direction="up">
                <div className="mt-16 mb-8 text-center md:text-left">
                  <span className="text-dkv-green font-bold text-lg uppercase tracking-[0.2em] font-fsme">Requisito Clínico</span>
                  <h3 className="text-2xl font-bold font-lemon text-dkv-green-dark border-b-2 border-dkv-green pb-3 inline-block w-full mt-2 uppercase tracking-wide">
                    Diagnóstico 3D y Retención
                  </h3>
                  <p className="text-dkv-gray mt-4 font-fsme text-lg">La ortodoncia invisible se basa en la planificación digital previa. Estos pasos son fundamentales para tu tratamiento.</p>
                </div>
                
                <TreatmentRow id="diagnostico" name="Estudio Ortodóntico y Estabilización">
                  <div className="mb-6">
                    <h3 className="text-dkv-green-dark font-bold font-lemon text-sm uppercase mb-3">Diagnóstico Preciso Inicial</h3>
                    <div className="bg-dkv-gray-light/30 rounded-2xl p-5 border border-dkv-gray-border">
                      <ul className="space-y-4">
                        <li className="flex justify-between items-center pb-3 border-b border-dkv-gray-border/50">
                          <span className="font-bold text-dkv-gray">Estudio cefalométrico <span className="text-sm font-normal block md:inline text-dkv-gray/80">(Radiografía ángulos óseos)</span></span>
                          <span className="font-lemon text-lg text-dkv-green-dark">50 €</span>
                        </li>
                        <li className="flex justify-between items-center pb-3 border-b border-dkv-gray-border/50">
                          <span className="font-bold text-dkv-gray">Estudio fotográfico <span className="text-sm font-normal block md:inline text-dkv-gray/80">(Proporciones faciales)</span></span>
                          <span className="font-lemon text-lg text-dkv-green-dark">30 €</span>
                        </li>
                        <li className="flex justify-between items-center">
                          <span className="font-bold text-dkv-gray">Modelos de estudio</span>
                          <span className="font-lemon text-lg text-dkv-green-dark">Incluido</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-dkv-green-dark font-bold font-lemon text-sm uppercase mb-3">Retención y Mantenimiento</h3>
                    <p className="text-sm italic mb-4">Los dientes tienen memoria y tienden a moverse al retirar los aparatos.</p>
                    <div className="bg-dkv-gray-light/30 rounded-2xl p-5 border border-dkv-gray-border">
                      <ul className="space-y-4">
                        <li className="flex justify-between items-center pb-3 border-b border-dkv-gray-border/50">
                          <span className="font-bold text-dkv-gray">Aparatología estabilizadora por aparato</span>
                          <span className="font-lemon text-lg text-dkv-green-dark">108 €</span>
                        </li>
                        <li className="flex justify-between items-center pb-3 border-b border-dkv-gray-border/50">
                          <span className="font-bold text-dkv-gray">Visitas de revisión postratamiento</span>
                          <span className="font-lemon text-lg text-dkv-green-dark">25 €</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </TreatmentRow>
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
                  <h2 className="text-3xl font-lemon text-dkv-green-dark mb-4">Diseña tu sonrisa en 3D</h2>
                  <div className="bg-dkv-gray-light p-4 rounded-xl border border-dkv-gray-border/50 mb-8 flex items-start gap-3">
                    <Info className="w-5 h-5 text-dkv-green shrink-0 mt-0.5" />
                    <p className="text-lg text-dkv-gray font-fsme leading-relaxed">
                      El primer paso es un escaneado digital de tu boca. Acude a una primera visita en uno de nuestros <strong>Centros Propios Especiales</strong> para evaluar tu caso, garantizar los resultados y previsualizar cómo quedará tu sonrisa.
                    </p>
                  </div>
                  <p className="text-lg text-dkv-gray mb-6">
                    Encuentra tu centro DKV Especializado más cercano y pide tu cita de valoración sin compromiso:
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