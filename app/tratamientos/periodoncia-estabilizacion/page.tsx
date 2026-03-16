// app/tratamientos/periodoncia/estabilizacion/page.tsx

import { Metadata } from "next";
import React from "react";

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

import { Info, CalendarCheck, ShieldPlus, Link as LinkIcon, AlertCircle } from "lucide-react"; 

export const metadata: Metadata = {
  title: "Mantenimiento Periodontal y Ferulización | DKV Dentisalud",
  description: "Frena la caída de tus dientes. Mantenimientos periodontales y ferulización de dientes móviles con tu tarifa DKV.",
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

export default function PeriodonciaEstabilizacionPage() {
  const breadcrumbs = [
    { label: "Inicio", href: "/" },
    { label: "Tratamientos", href: "/tratamientos" },
    { label: "Periodoncia", href: "/tratamientos/periodoncia/basico" },
    { label: "Estabilización", href: "#" }
  ];

  return (
    <div className="min-h-screen bg-white font-fsme text-dkv-gray selection:bg-dkv-green selection:text-white pb-32">
      <CookieBanner />
      <Header />

      <main className="pt-[30px] md:pt-[110px] lg:pt-[130px]">
        <FixedBreadcrumb items={breadcrumbs} behavior="smart" />

        <TreatmentsHero 
          badgeText="Frenando la caída"
          title={{ dark: "MANTENIMIENTO Y", normal: "ESTABILIZACIÓN" }} 
          description={[
            "La enfermedad periodontal (piorrea) es crónica. De nada sirve limpiar a fondo si no mantenemos la infección a raya a lo largo del tiempo.",
            "Aquí consolidamos los resultados del tratamiento básico y estabilizamos los dientes que han empezado a moverse por la pérdida de hueso."
          ]}
        />

        <StickySubNav activeId="estabilizacion" />

        <section className="bg-dkv-gray-border/20 py-16">
          <div className="container mx-auto px-4 max-w-4xl space-y-8">

            {/* INTRODUCCIÓN CLÍNICA */}
            <ScrollReveal>
              <div className="mb-4 text-center md:text-left">
                <span className="text-dkv-green font-bold text-lg uppercase tracking-[0.2em] font-fsme">Control Crónico</span>
                <h3 className="text-2xl font-bold font-lemon text-dkv-green-dark border-b-2 border-dkv-green pb-3 inline-block w-full mt-2 uppercase tracking-wide">
                  Revisiones y Mantenimiento
                </h3>
              </div>
            </ScrollReveal>

            {/* Ficha 1: Revisiones */}
            <ScrollReveal delay={100}>
              <TreatmentRow id="revisiones-periodontales" name="Revisiones de mantenimiento y control" price="Incluido (0 €)">
                <div className="flex items-center gap-2 mb-2 text-dkv-gray">
                   <CalendarCheck className="w-5 h-5 text-dkv-green" />
                   <span className="font-bold tracking-widest text-xs uppercase text-dkv-green">Vigilancia constante</span>
                </div>
                <p>
                  Evaluamos periódicamente el estado de tus encías, la profundidad de las bolsas periodontales y tu índice de placa para asegurarnos de que la enfermedad está inactiva y detenida.
                </p>
              </TreatmentRow>
            </ScrollReveal>

            {/* Ficha 2: Tratamiento de Mantenimiento */}
            <ScrollReveal delay={200}>
              <TreatmentRow id="tratamiento-mantenimiento" name="Tratamiento periodontal de mantenimiento" price="65 €">
                <div className="flex items-center gap-2 mb-2 text-dkv-gray">
                   <ShieldPlus className="w-5 h-5 text-dkv-green" />
                   <span className="font-bold tracking-widest text-xs uppercase text-dkv-green">Limpieza médica exhaustiva</span>
                </div>
                <p>
                  Es una limpieza médica súper exhaustiva que los pacientes con problemas de encías deben hacerse estrictamente cada 4-6 meses para que la infección no vuelva a penetrar bajo la encía.
                </p>
                <div className="bg-white p-5 rounded-2xl border border-dkv-gray-border/50 mt-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-dkv-green shrink-0 mt-0.5" />
                  <p className="text-sm text-dkv-gray leading-relaxed font-fsme">
                    Saltarse estos mantenimientos es la principal causa de recaída. La limpieza dental estándar anual no es suficiente para los pacientes que ya han perdido soporte óseo.
                  </p>
                </div>
              </TreatmentRow>
            </ScrollReveal>

            {/* INTRODUCCIÓN ESTABILIZACIÓN */}
            <ScrollReveal delay={100}>
              <div className="mt-12 mb-4 text-center md:text-left">
                <span className="text-dkv-green font-bold text-lg uppercase tracking-[0.2em] font-fsme">Soluciones Mecánicas</span>
                <h3 className="text-2xl font-bold font-lemon text-dkv-green-dark border-b-2 border-dkv-green pb-3 inline-block w-full mt-2 uppercase tracking-wide">
                  Ferulización Dental
                </h3>
              </div>
            </ScrollReveal>

            {/* Ficha 3: Ferulización */}
            <ScrollReveal delay={200}>
              <TreatmentRow id="ferulizacion" name="Ferulización de dientes">
                <div className="flex items-center gap-2 mb-2 text-dkv-gray">
                   <LinkIcon className="w-5 h-5 text-dkv-green" />
                   <span className="font-bold tracking-widest text-xs uppercase text-dkv-green">Firmeza estructural</span>
                </div>
                <p className="mb-4">
                  <strong>El beneficio:</strong> Si tus dientes se mueven porque han perdido hueso, los "atamos" unos a otros por la parte de atrás con una fibra invisible o alambre trenzado adherido con resina. Esto reparte las fuerzas masticatorias, dándoles firmeza para que puedas morder sin miedo a que se caigan.
                </p>

                <div className="bg-dkv-gray-light/50 p-5 rounded-2xl border border-dkv-gray-border/80">
                  <ul className="space-y-4">
                    <li className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-dkv-gray-border/60">
                      <span className="font-bold text-dkv-gray">Por pieza dental</span>
                      <span className="font-lemon text-xl text-dkv-green-dark shrink-0 mt-2 md:mt-0">18 €</span>
                    </li>
                    <li className="flex flex-col md:flex-row justify-between items-start md:items-center">
                      <span className="font-bold text-dkv-gray">Por sextante (Tramo completo de colmillo a colmillo)</span>
                      <span className="font-lemon text-xl text-dkv-green-dark shrink-0 mt-2 md:mt-0">100 €</span>
                    </li>
                  </ul>
                </div>
              </TreatmentRow>
            </ScrollReveal>

          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-20 bg-white border-t border-dkv-gray-border">
          <div className="container mx-auto px-4 max-w-5xl">
            <ScrollReveal>
              <div className="grid lg:grid-cols-2 gap-12 items-center text-left">
                <div>
                  <h2 className="text-3xl font-lemon text-dkv-green-dark mb-4 uppercase leading-tight">No des tu diente por perdido</h2>
                  <div className="bg-dkv-gray-light p-4 rounded-xl border border-dkv-gray-border/50 mb-8 flex items-start gap-3">
                    <Info className="w-5 h-5 text-dkv-green shrink-0 mt-0.5" />
                    <p className="text-lg text-dkv-gray font-fsme leading-relaxed">
                      Incluso los dientes con una gran movilidad pueden salvarse durante años si logramos detener la infección bacteriana y los ferulizamos a tiempo.
                    </p>
                  </div>
                  <p className="text-lg text-dkv-gray mb-6 font-fsme">
                    Acude a uno de nuestros especialistas en periodoncia para valorar si tus dientes tienen salvación. Encuentra tu centro DKV más cercano:
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
