// app/tratamientos/periodoncia/micro-cirugia/page.tsx

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

import { Info, Activity, Scissors, Diamond, Zap, Droplet, CheckCircle2 } from "lucide-react"; 

export const metadata: Metadata = {
  title: "Micro-cirugía de Encías y Láser Periodontal | DKV Dentisalud",
  description: "Tratamientos periodontales avanzados. Gingivectomía, cirugía a colgajo, tecnología láser y plasma rico en plaquetas (PRGF).",
};

// --- Componente Ficha de Tratamiento Estándar ---
const TreatmentRow = ({ id, name, price, children }: any) => (
  <div 
    id={id} 
    className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-md border border-dkv-gray-border/80 hover:shadow-xl transition-all duration-300 scroll-mt-[120px]"
  >
    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 mb-5">
      <h2 className="text-lg md:text-xl font-bold font-lemon text-dkv-green-dark uppercase leading-tight">
        {name}
      </h2>
      <div className="flex items-center gap-3 self-end md:self-auto">
        {price && (
          <span className="bg-dkv-green/10 px-4 py-1.5 rounded-full text-2xl font-lemon font-bold text-dkv-green shrink-0">
            {price}
          </span>
        )}
        <ShareButton id={id} title={name} />
      </div>
    </div>
    <div className="text-dkv-gray font-fsme leading-relaxed text-lg space-y-4">
      {children}
    </div>
  </div>
);

export default function PeriodonciaMicroCirugiaPage() {
  const breadcrumbs = [
    { label: "Inicio", href: "/" },
    { label: "Tratamientos", href: "/tratamientos" },
    { label: "Periodoncia", href: "/tratamientos/periodoncia/basico" },
    { label: "Micro-Cirugía", href: "#" }
  ];

  return (
    <div className="min-h-screen bg-white font-fsme text-dkv-gray selection:bg-dkv-green selection:text-white pb-32">
      <CookieBanner />
      <Header />

      <main className="pt-[30px] md:pt-[110px] lg:pt-[130px]">
        <FixedBreadcrumb items={breadcrumbs} behavior="smart" />

        <TreatmentsHero 
          badgeText="Intervenciones de precisión"
          title={{ dark: "MICRO-CIRUGÍA", normal: "DE ENCÍAS" }} 
          description={[
            "Tratamientos quirúrgicos especializados para modelar, sanar y acceder a las zonas más profundas de tus encías.",
            "Descubre la vanguardia en periodoncia quirúrgica para erradicar las infecciones más rebeldes y mejorar la estética de tu sonrisa."
          ]}
        />

        <StickySubNav activeId="micro-cirugia" />

        <section className="bg-dkv-gray-border/20 py-16">
          <div className="container mx-auto px-4 max-w-4xl space-y-8">

            {/* INTRODUCCIÓN CLÍNICA */}
            <ScrollReveal>
              <div className="mb-4 text-center md:text-left">
                <span className="text-dkv-green font-bold text-lg uppercase tracking-[0.2em] font-fsme">Acceso Directo</span>
                <h3 className="text-2xl font-bold font-lemon text-dkv-green-dark border-b-2 border-dkv-green pb-3 inline-block w-full mt-2 uppercase tracking-wide">
                  Cirugía Periodontal Convencional
                </h3>
              </div>
            </ScrollReveal>

            {/* Ficha 1: Épulis */}
            <ScrollReveal delay={100}>
              <TreatmentRow id="epulis" name="Extirpación de un épulis" price="40 €">
                <div className="flex items-center gap-2 mb-2 text-dkv-gray">
                   <Activity className="w-5 h-5 text-dkv-green" />
                   <span className="font-bold tracking-widest text-xs uppercase text-dkv-green">Lesiones localizadas</span>
                </div>
                <p>
                  Intervención menor para quitar un pequeño bulto benigno o quiste que se haya formado en la encía, generalmente a causa de una irritación crónica.
                </p>
              </TreatmentRow>
            </ScrollReveal>

            {/* Ficha 2: Gingivectomía */}
            <ScrollReveal delay={200}>
              <TreatmentRow id="gingivectomia" name="Modelado de la encía">
                <div className="flex items-center gap-2 mb-2 text-dkv-gray">
                   <Scissors className="w-5 h-5 text-dkv-green" />
                   <span className="font-bold tracking-widest text-xs uppercase text-dkv-green">Salud y Estética</span>
                </div>
                <p className="mb-4">
                  Tratamientos enfocados en recortar la encía con absoluta precisión si está demasiado inflamada (hiperplasia) o si "tapa" demasiado al diente, mejorando también enormemente la estética de tu sonrisa.
                </p>

                <div className="bg-dkv-gray-light/50 p-5 rounded-2xl border border-dkv-gray-border/80">
                  <ul className="space-y-4">
                    <li className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-dkv-gray-border/60">
                      <div>
                        <span className="font-bold text-dkv-gray">Gingivectomía total</span>
                        <span className="font-normal text-sm text-dkv-gray/80 block mt-1">Precio por cuadrante.</span>
                      </div>
                      <span className="font-lemon text-xl text-dkv-green-dark shrink-0 mt-2 md:mt-0">17 €</span>
                    </li>
                    <li className="flex flex-col md:flex-row justify-between items-start md:items-center">
                      <div>
                        <span className="font-bold text-dkv-gray">Alargamiento coronario</span>
                        <span className="font-normal text-sm text-dkv-gray/80 block mt-1">Exposición de mayor superficie del diente.</span>
                      </div>
                      <span className="font-lemon text-xl text-dkv-green-dark shrink-0 mt-2 md:mt-0">100 €</span>
                    </li>
                  </ul>
                </div>
              </TreatmentRow>
            </ScrollReveal>

            {/* Ficha 3: Cirugía a colgajo */}
            <ScrollReveal delay={150}>
              <TreatmentRow id="colgajo" name="Cirugía periodontal a colgajo">
                <p className="mb-4">
                  <strong>¿Por qué hace falta?</strong> Si la infección es tan profunda que el curetaje tradicional no llega a limpiar el fondo de la bolsa periodontal.
                </p>
                <p className="mb-4">
                  Bajo anestesia, apartamos suavemente la encía como si fuera la solapa de un sobre, limpiamos el hueso y las raíces directamente visualizando el daño, y volvemos a cerrar y suturar.
                </p>

                <div className="bg-dkv-gray-light/50 p-5 rounded-2xl border border-dkv-gray-border/80">
                  <ul className="space-y-4">
                    <li className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-dkv-gray-border/60">
                      <span className="font-bold text-dkv-gray">Por pieza dental</span>
                      <span className="font-lemon text-xl text-dkv-green-dark shrink-0 mt-2 md:mt-0">26 €</span>
                    </li>
                    <li className="flex flex-col md:flex-row justify-between items-start md:items-center">
                      <span className="font-bold text-dkv-gray">Por cuadrante completo</span>
                      <span className="font-lemon text-xl text-dkv-green-dark shrink-0 mt-2 md:mt-0">100 €</span>
                    </li>
                  </ul>
                </div>
              </TreatmentRow>
            </ScrollReveal>

            {/* 💎 BLOQUE PREMIUM: TECNOLOGÍA LÁSER Y BIOLÓGICA */}
            <ScrollReveal delay={250} direction="up">
              <div id="tecnologia-laser" className="bg-gradient-to-br from-slate-900 to-[#022A27] rounded-2xl md:rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden mt-12 mb-4 scroll-mt-[120px] text-white">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Zap className="w-32 h-32 text-[#D4AF37]" />
                </div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#D4AF37] opacity-10 blur-[80px] rounded-full"></div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <Diamond className="w-6 h-6 text-[#D4AF37]" />
                    <span className="text-[#D4AF37] font-bold text-sm md:text-base uppercase tracking-[0.2em] font-fsme">Upgrade Premium</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-lemon mb-4 uppercase tracking-wide leading-tight">
                    Tecnología Láser y Biológica
                  </h2>
                  <div className="inline-block bg-[#D4AF37]/20 border border-[#D4AF37]/40 px-4 py-1.5 rounded-full text-sm font-bold text-[#D4AF37] mb-8 uppercase tracking-widest">
                    Exclusivo en Centros Propios
                  </div>

                  <div className="space-y-6">
                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 mb-4 border-b border-white/10">
                        <div className="flex items-center gap-3">
                          <Zap className="w-6 h-6 text-[#D4AF37] shrink-0" />
                          <h3 className="font-bold text-lg md:text-xl text-white">Suplemento láser de diodo en cirugía periodontal</h3>
                        </div>
                        <span className="text-[#D4AF37] font-lemon font-bold text-2xl mt-4 md:mt-0 shrink-0">
                          55 € <span className="text-sm font-fsme text-white/70 block md:inline md:ml-1">/acto</span>
                        </span>
                      </div>
                      <p className="text-white/80 font-fsme leading-relaxed text-lg">
                        <strong>El beneficio:</strong> Usamos la luz del láser en lugar del bisturí tradicional. Esto cauteriza al instante, desinfecta a nivel microscópico, no sangra y <strong>elimina prácticamente el dolor postoperatorio.</strong>
                      </p>
                    </div>

                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 mb-4 border-b border-white/10">
                        <div className="flex items-center gap-3">
                          <Droplet className="w-6 h-6 text-[#D4AF37] shrink-0" />
                          <h3 className="font-bold text-lg md:text-xl text-white">Terapia regenerativa con Plasma (PRGF)</h3>
                        </div>
                        <span className="text-[#D4AF37] font-lemon font-bold text-2xl mt-4 md:mt-0 shrink-0">
                          150 €
                        </span>
                      </div>
                      <p className="text-white/80 font-fsme leading-relaxed text-lg">
                        Usamos las proteínas y factores de crecimiento de tu propia sangre (Plasma Rico en Plaquetas) para aplicarlas en la zona intervenida, logrando que tus encías y huesos <strong>cicatricen a velocidad récord</strong> y de forma totalmente natural.
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </ScrollReveal>

          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-20 bg-white border-t border-dkv-gray-border">
          <div className="container mx-auto px-4 max-w-5xl">
            <ScrollReveal>
              <div className="grid lg:grid-cols-2 gap-12 items-center text-left">
                <div>
                  <h2 className="text-3xl font-lemon text-dkv-green-dark mb-4 uppercase leading-tight">Mínima invasión, máxima eficacia</h2>
                  <div className="bg-dkv-gray-light p-4 rounded-xl border border-dkv-gray-border/50 mb-8 flex items-start gap-3">
                    <Info className="w-5 h-5 text-dkv-green shrink-0 mt-0.5" />
                    <p className="text-lg text-dkv-gray font-fsme leading-relaxed">
                      La tecnología actual nos permite realizar intervenciones en las encías de forma rápida, segura y con un postoperatorio sumamente llevadero.
                    </p>
                  </div>
                  <p className="text-lg text-dkv-gray mb-6 font-fsme">
                    Acude a uno de nuestros especialistas para valorar la salud profunda de tus encías y la viabilidad de utilizar tecnología láser en tu tratamiento:
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
