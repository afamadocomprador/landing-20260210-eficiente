// app/tratamientos/cirugia-avanzada/extracciones/page.tsx

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

import { Info, Scissors, Activity, ShieldCheck, CheckCircle2 } from "lucide-react"; 

export const metadata: Metadata = {
  title: "Extracciones Complejas y Muelas del Juicio | DKV Dentisalud",
  description: "Cirugía de muelas del juicio impactadas y amputaciones radiculares. Intervenciones precisas y seguras con la garantía de tu seguro DKV.",
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

export default function ExtraccionesComplejasPage() {

  const breadcrumbs = [
    { label: "Inicio", href: "/" },
    { label: "Tratamientos", href: "/tratamientos" },
    { label: "Cirugía Avanzada", href: "/tratamientos/cirugia-avanzada/extracciones" }, // Le damos una ruta única
    { label: "Extracciones Complejas", href: "#" }
  ];

  return (
    <div className="min-h-screen bg-white font-fsme text-dkv-gray selection:bg-dkv-green selection:text-white pb-32">
      <CookieBanner />
      <Header />

      <main className="pt-[30px] md:pt-[110px] lg:pt-[130px]">
        <FixedBreadcrumb items={breadcrumbs} behavior="smart" />

        <TreatmentsHero 
          badgeText="Muelas del juicio y más"
          title={{ dark: "EXTRACCIONES", normal: "COMPLEJAS" }} 
          description={[
            "Intervenciones precisas y seguras para pacientes que necesitan extracciones muy complejas o dientes severamente dañados.",
            "Técnicas avanzadas para minimizar el impacto, preservar el hueso sano y asegurar una recuperación rápida y sin complicaciones."
          ]}
        />

        {/* Recuerda que luego añadiremos este cluster al StickySubNav.tsx */}
        <StickySubNav activeId="extracciones" />

        <section className="bg-dkv-gray-border/20 py-16">
          <div className="container mx-auto px-4 max-w-4xl space-y-8">

            {/* INTRODUCCIÓN CLÍNICA */}
            <ScrollReveal>
              <div className="mb-4 text-center md:text-left">
                <span className="text-dkv-green font-bold text-lg uppercase tracking-[0.2em] font-fsme">Cirugía Menor</span>
                <h3 className="text-2xl font-bold font-lemon text-dkv-green-dark border-b-2 border-dkv-green pb-3 inline-block w-full mt-2 uppercase tracking-wide">
                  Muelas del Juicio y Retenciones
                </h3>
              </div>
            </ScrollReveal>

            {/* Ficha 1: Muelas del juicio */}
            <ScrollReveal delay={100}>
              <TreatmentRow id="muelas-juicio" name="Cirugía de la muela del juicio (con o sin quiste)" price="25 €">
                <div className="flex items-center gap-2 mb-2 text-dkv-gray">
                   <Scissors className="w-5 h-5 text-dkv-green" />
                   <span className="font-bold tracking-widest text-xs uppercase text-dkv-green">Extracción quirúrgica</span>
                </div>
                <p>
                  <strong>¿Por qué se hace?</strong> Cuando las muelas del juicio vienen torcidas, empujan al resto de dientes causando apiñamiento, o se quedan atrapadas parcial o totalmente bajo el hueso (impactadas).
                </p>
                <div className="bg-dkv-gray-light/50 p-5 rounded-2xl border border-dkv-gray-border/80 mt-4">
                  <p className="text-sm text-dkv-gray leading-relaxed">
                    A diferencia de una extracción simple, esto requiere una pequeña intervención quirúrgica para partirlas (odontosección) y sacarlas sin dañar el hueso circundante ni los nervios o dientes vecinos de la boca.
                  </p>
                </div>
              </TreatmentRow>
            </ScrollReveal>

            {/* INTRODUCCIÓN PRESERVACIÓN */}
            <ScrollReveal delay={100}>
              <div className="mt-12 mb-4 text-center md:text-left">
                <span className="text-dkv-green font-bold text-lg uppercase tracking-[0.2em] font-fsme">Preservación Biológica</span>
                <h3 className="text-2xl font-bold font-lemon text-dkv-green-dark border-b-2 border-dkv-green pb-3 inline-block w-full mt-2 uppercase tracking-wide">
                  Técnicas de Hemisección
                </h3>
              </div>
            </ScrollReveal>

            {/* Ficha 2: Amputación radicular */}
            <ScrollReveal delay={200}>
              <TreatmentRow id="amputacion-radicular" name="Amputación radicular (hemisección)" price="Incluido (0 €)">
                <div className="flex items-center gap-2 mb-2 text-dkv-gray">
                   <Activity className="w-5 h-5 text-dkv-green" />
                   <span className="font-bold tracking-widest text-xs uppercase text-dkv-green">Salvar la mitad sana</span>
                </div>
                <p>
                  Una técnica quirúrgica fascinante. A veces, una gran muela (que suele tener dos o tres raíces) presenta una infección masiva o fractura en una sola de sus raíces, mientras que la otra permanece perfectamente sana y firme en el hueso.
                </p>
                <div className="bg-dkv-green/5 p-4 rounded-xl border border-dkv-green/20 mt-4 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-dkv-green shrink-0 mt-0.5" />
                  <p className="text-sm text-dkv-gray font-fsme leading-relaxed">
                    <strong>El beneficio:</strong> En lugar de sacar la muela entera y perder el diente, cortamos verticalmente y sacamos solo la raíz mala. Esto nos permite salvar la mitad del diente para utilizarlo como pilar de una futura corona.
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
                  <h2 className="text-3xl font-lemon text-dkv-green-dark mb-4 uppercase leading-tight">En manos expertas</h2>
                  <div className="bg-dkv-gray-light p-4 rounded-xl border border-dkv-gray-border/50 mb-8 flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-dkv-green shrink-0 mt-0.5" />
                    <p className="text-lg text-dkv-gray font-fsme leading-relaxed">
                      La cirugía oral avanzada requiere pericia y experiencia. Nuestros cirujanos maxilofaciales y odontólogos especialistas garantizan intervenciones limpias con el mejor postoperatorio posible.
                    </p>
                  </div>
                  <p className="text-lg text-dkv-gray mb-6 font-fsme">
                    Si te han diagnosticado la necesidad de extraer una muela del juicio o un caso complejo, busca tu clínica DKV más cercana y ponte en las mejores manos:
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
