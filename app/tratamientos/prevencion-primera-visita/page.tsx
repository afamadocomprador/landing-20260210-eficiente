// app/tratamientos/prevencion/primera-visita/page.tsx

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

import { Info, ClipboardList, Scan, Activity, Brain, ShieldCheck } from "lucide-react"; 

export const metadata: Metadata = {
  title: "Primera Visita y Diagnóstico Dental | DKV Dentisalud",
  description: "Tu ITV dental. Consulta, radiografías y diagnóstico de dolor orofacial incluidos en tu póliza. Descubre a tiempo cualquier problema.",
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

export default function PrimeraVisitaPage() {

  const breadcrumbs = [
    { label: "Inicio", href: "/" },
    { label: "Tratamientos", href: "/tratamientos" },
    { label: "Prevención", href: "/tratamientos/prevencion/primera-visita" }, // Redirige a esta misma página como "home" de prevención
    { label: "Primera Visita", href: "#" }
  ];




  return (
    <div className="min-h-screen bg-white font-fsme text-dkv-gray selection:bg-dkv-green selection:text-white pb-32">
      <CookieBanner />
      <Header />

      <main className="pt-[30px] md:pt-[110px] lg:pt-[130px]">
        <FixedBreadcrumb items={breadcrumbs} behavior="smart" />

        <TreatmentsHero 
          badgeText="Tu ITV Dental"
          title={{ dark: "REVISIÓN Y", normal: "DIAGNÓSTICO" }} 
          description={[
            "Para todo el mundo. Es la puerta de entrada a la clínica. El objetivo aquí no es curar, sino evitar que te enfermes y descubrir a tiempo cualquier pequeño problema antes de que duela (y cueste dinero).",
            "En esta fase evaluamos tu salud total y ponemos nombre a lo que te duele."
          ]}
        />

        {/* El StickySubNav requerirá que añadas el cluster 'prevencion' luego */}
        <StickySubNav activeId="primera-visita" />

        <section className="bg-dkv-gray-border/20 py-16">
          <div className="container mx-auto px-4 max-w-4xl space-y-8">

            {/* INTRODUCCIÓN CLÍNICA */}
            <ScrollReveal>
              <div className="mb-4 text-center md:text-left">
                <span className="text-dkv-green font-bold text-lg uppercase tracking-[0.2em] font-fsme">El mapa de tu boca</span>
                <h3 className="text-2xl font-bold font-lemon text-dkv-green-dark border-b-2 border-dkv-green pb-3 inline-block w-full mt-2 uppercase tracking-wide">
                  Consultas y Revisiones
                </h3>
              </div>
            </ScrollReveal>

            {/* Ficha 1: Consulta y Revisión */}
            <ScrollReveal delay={100}>
              <TreatmentRow id="consulta" name="Consulta, Presupuesto y Revisión" price="Incluido (0 €)">
                <div className="flex items-center gap-2 mb-2 text-dkv-gray">
                   <ClipboardList className="w-5 h-5 text-dkv-green" />
                   <span className="font-bold tracking-widest text-xs uppercase text-dkv-green">Tu evaluación inicial</span>
                </div>
                <div className="bg-dkv-gray-light/30 rounded-2xl p-5 border border-dkv-gray-border/60">
                  <ul className="space-y-4">
                    <li className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-dkv-gray-border/50">
                      <div>
                        <span className="font-bold text-dkv-gray">Consulta, presupuesto y plan de tratamiento</span>
                        <span className="font-normal text-sm text-dkv-gray/80 block mt-1">Nuestros doctores analizan tu caso sin compromiso para trazar la hoja de ruta.</span>
                      </div>
                    </li>
                    <li className="flex flex-col md:flex-row justify-between items-start md:items-center">
                      <div>
                        <span className="font-bold text-dkv-gray">Visita de revisión o control</span>
                        <span className="font-normal text-sm text-dkv-gray/80 block mt-1">Tu revisión anual obligatoria para mantener tus dientes bajo estricto control.</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </TreatmentRow>
            </ScrollReveal>

            {/* Ficha 2: Pruebas Radiológicas */}
            <ScrollReveal delay={200}>
              <TreatmentRow id="radiografias" name="Pruebas y Radiografías" price="Incluido (0 €)">
                <div className="flex items-center gap-2 mb-2 text-dkv-gray">
                   <Scan className="w-5 h-5 text-dkv-green" />
                   <span className="font-bold tracking-widest text-xs uppercase text-dkv-green">Tecnología Diagnóstica</span>
                </div>
                
                <div className="bg-white p-5 rounded-2xl border border-dkv-gray-border/50 mt-4">
                  <h3 className="font-bold text-dkv-gray mb-2">Radiografías de control en el sillón</h3>
                  <p className="text-sm text-dkv-gray leading-relaxed mb-4">
                    (Intrabucales, Periapicales, RVG digital). Pequeñas radiografías instantáneas imprescindibles para ver debajo de la encía o confirmar si hay caries escondidas entre los dientes donde el ojo humano no llega.
                  </p>
                  
                  <h3 className="font-bold text-dkv-gray mb-2 border-t border-gray-100 pt-4">Placa oclusal</h3>
                  <p className="text-sm text-dkv-gray leading-relaxed">
                    Radiografías de mordida para valorar grandes áreas del maxilar o mandíbula de un solo vistazo.
                  </p>
                </div>
              </TreatmentRow>
            </ScrollReveal>

            {/* Ficha 3: Dolor Orofacial */}
            <ScrollReveal delay={300}>
              <TreatmentRow id="dolor-orofacial" name="Consultas de Dolor Orofacial" price="Incluido (0 €)">
                <div className="flex items-center gap-2 mb-2 text-dkv-gray">
                   <Brain className="w-5 h-5 text-dkv-green" />
                   <span className="font-bold tracking-widest text-xs uppercase text-dkv-green">Especialistas en dolor complejo</span>
                </div>
                <p className="mb-4">
                  (Neuralgias, Dolor facial, Parálisis). Si te duele la cara de forma inexplicable, te molesta la mandíbula al despertar o sientes calambres y pinchazos nerviosos, la causa no siempre es una caries.
                </p>
                <div className="bg-dkv-green/5 p-4 rounded-xl border border-dkv-green/20 flex items-start gap-3">
                  <Activity className="w-5 h-5 text-dkv-green shrink-0 mt-0.5" />
                  <p className="text-sm text-dkv-gray font-fsme leading-relaxed">
                    Nuestros especialistas estudiarán detalladamente tus síntomas para diagnosticar el origen neurológico o muscular del problema y ofrecerte alivio clínico.
                  </p>
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
                  <h2 className="text-3xl font-lemon text-dkv-green-dark mb-4 uppercase leading-tight">Prevenir cuesta 0 €</h2>
                  <div className="bg-dkv-gray-light p-4 rounded-xl border border-dkv-gray-border/50 mb-8 flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-dkv-green shrink-0 mt-0.5" />
                    <p className="text-lg text-dkv-gray font-fsme leading-relaxed">
                      El 80% de los problemas graves (y costosos) en odontología podrían evitarse con una simple revisión anual de 20 minutos. Aprovecha las coberturas gratuitas de tu póliza.
                    </p>
                  </div>
                  <p className="text-lg text-dkv-gray mb-6 font-fsme">
                    Encuentra tu clínica dental DKV más cercana y reserva hoy mismo tu Primera Visita y revisión general:
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
