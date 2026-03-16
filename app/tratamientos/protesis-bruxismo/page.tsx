// app/tratamientos/protesis/bruxismo/page.tsx

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

import { Info, ShieldCheck, Activity, Zap, CheckCircle2 } from "lucide-react"; 

export const metadata: Metadata = {
  title: "Oclusión y Férulas de Bruxismo | Precios DKV Dentisalud",
  description: "Protege tus dientes y articulación del desgaste nocturno. Férulas de descarga a medida y rehabilitación oclusal con tarifas exclusivas DKV.",
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

export default function OclusionBruxismoPage() {
  const breadcrumbs = [
    { label: "Inicio", href: "/" },
    { label: "Tratamientos", href: "/tratamientos" },
    { label: "Prótesis y Rehabilitación", href: "/tratamientos/protesis" },
    { label: "Oclusión y Bruxismo", href: "#" }
  ];

  return (
    <div className="min-h-screen bg-white font-fsme text-dkv-gray selection:bg-dkv-green selection:text-white pb-32">
      <CookieBanner />
      <Header />

      <main className="pt-[30px] md:pt-[110px] lg:pt-[130px]">
        <FixedBreadcrumb items={breadcrumbs} behavior="smart" />

        <TreatmentsHero 
          badgeText="Protección Articular y Dental"
          title={{ dark: "OCLUSIÓN Y", normal: "BRUXISMO" }} 
          description={[
            "Si aprietas o rechinas los dientes por la noche (bruxismo), acabarás rompiendo tus dientes naturales, tus empastes y sufriendo dolores de cabeza y cuello.",
            "Protege tu sonrisa y tu articulación mandibular con nuestras férulas y tratamientos de rehabilitación."
          ]}
        />

        <StickySubNav activeId="bruxismo" />

        <section className="bg-dkv-gray-border/30 pt-12 pb-20">
          <div className="container mx-auto px-4 max-w-4xl flow-root">

            <div className="space-y-8">
              
              {/* INTRODUCCIÓN CLÍNICA */}
              <ScrollReveal delay={100} direction="up">
                <div className="mb-8 text-center md:text-left">
                  <span className="text-dkv-green font-bold text-lg uppercase tracking-[0.2em] font-fsme">Tu Escudo Protector</span>
                  <h3 className="text-2xl font-bold font-lemon text-dkv-green-dark border-b-2 border-dkv-green pb-3 inline-block w-full mt-2 uppercase tracking-wide">
                    Férulas de Descarga a Medida
                  </h3>
                  <p className="text-dkv-gray mt-4 font-fsme text-lg">
                    La solución más rápida y efectiva contra el desgaste dental nocturno. Un protector duro y fabricado a la medida exacta de tu boca que relaja la musculatura y absorbe toda la fuerza de la mandíbula mientras duermes.
                  </p>
                </div>
              </ScrollReveal>

              {/* Ficha 1: Férulas de Descarga */}
              <ScrollReveal delay={200} direction="up">
                <TreatmentRow 
                    id="ferulas" 
                    name="Férulas de Descarga y Protección" 
                    price="Desde 108 €"
                  >
                  <p>A diferencia de los protectores blandos de farmacia (que pueden agravar el problema), nuestras férulas están fabricadas en acrílico rígido. Esto permite que tu mandíbula resbale libremente, "desprogramando" el hábito de apretar.</p>
                  
                  <div className="bg-dkv-gray-light/30 rounded-2xl p-5 border border-dkv-gray-border mt-4">
                    <ul className="space-y-4">
                      <li className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-dkv-gray-border/50">
                        <div>
                          <span className="font-bold text-dkv-gray flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-dkv-green"/> Férula de descarga simple</span>
                          <span className="font-normal text-sm text-dkv-gray/80 block mt-1">El estándar para frenar el desgaste de los dientes y relajar la musculatura de la mandíbula y el cuello.</span>
                        </div>
                        <span className="font-lemon text-xl text-dkv-green-dark shrink-0 mt-2 md:mt-0">108 €</span>
                      </li>
                      <li className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div>
                          <span className="font-bold text-dkv-gray flex items-center gap-2"><Activity className="w-4 h-4 text-dkv-green"/> Férula compleja (Patología articular)</span>
                          <span className="font-normal text-sm text-dkv-gray/80 block mt-1">Especial y más gruesa. Diseñada para pacientes que ya tienen problemas graves en la articulación (ATM): ruidos al abrir la boca, dolores crónicos o bloqueos.</span>
                        </div>
                        <span className="font-lemon text-xl text-dkv-green-dark shrink-0 mt-2 md:mt-0">217 €</span>
                      </li>
                    </ul>
                  </div>
                </TreatmentRow>
              </ScrollReveal>

              {/* Ficha 2: Revisión y Ajustes */}
              <ScrollReveal delay={300} direction="up">
                <TreatmentRow 
                    id="ajustes-ferula" 
                    name="Revisión y Ajuste de Férula" 
                    price="25 €"
                  >
                  <p>Tu férula de descarga cumple su función recibiendo todo el impacto que antes sufrían tus dientes. Por ello, con el uso diario se desgastará. Es fundamental traerla a consulta periódicamente para que el doctor la reequilibre y asegure que sigue protegiendo tu articulación de forma simétrica.</p>
                </TreatmentRow>
              </ScrollReveal>

              {/* Ficha 3: Diagnóstico y Rehabilitación Avanzada */}
              <ScrollReveal delay={150} direction="up">
                <div className="mt-16 mb-8 text-center md:text-left">
                  <span className="text-dkv-green font-bold text-lg uppercase tracking-[0.2em] font-fsme">Diagnóstico Avanzado</span>
                  <h3 className="text-2xl font-bold font-lemon text-dkv-green-dark border-b-2 border-dkv-green pb-3 inline-block w-full mt-2 uppercase tracking-wide">
                    Estudios Oclusales
                  </h3>
                  <p className="text-dkv-gray mt-4 font-fsme text-lg">
                    Cuando el bruxismo ha causado dolores severos o asimetrías, o cuando vamos a realizar una gran rehabilitación con coronas, necesitamos medir exactamente cómo se mueve tu mandíbula.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={250} direction="up">
                <TreatmentRow 
                    id="estudios-oclusales" 
                    name="Estudios de ATM y Rehabilitación" 
                  >
                  <p>Pruebas de alta precisión para trazar el mapa de tus movimientos mandibulares y diseñar una solución que devuelva el equilibrio neuromuscular a tu rostro.</p>
                  
                  <div className="bg-dkv-gray-light/30 rounded-2xl p-5 border border-dkv-gray-border mt-4">
                    <ul className="space-y-4">
                      <li className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-dkv-gray-border/50">
                        <div>
                          <span className="font-bold text-dkv-gray flex items-center gap-2"><Zap className="w-4 h-4 text-dkv-green"/> Axiografía y pruebas diagnósticas</span>
                          <span className="font-normal text-sm text-dkv-gray/80 block mt-1">Estudio informatizado o mecánico del trazado exacto de los movimientos de tus cóndilos (articulación).</span>
                        </div>
                        <span className="font-lemon text-xl text-dkv-green-dark shrink-0 mt-2 md:mt-0">180 €</span>
                      </li>
                      <li className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div>
                          <span className="font-bold text-dkv-gray flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-dkv-green"/> Sesión de rehabilitación neuro-oclusal</span>
                          <span className="font-normal text-sm text-dkv-gray/80 block mt-1">Tratamiento en clínica para corregir las interferencias y aliviar las tensiones musculares.</span>
                        </div>
                        <span className="font-lemon text-xl text-dkv-green-dark shrink-0 mt-2 md:mt-0">72 €</span>
                      </li>
                    </ul>
                  </div>
                </TreatmentRow>
              </ScrollReveal>

              {/* Ficha 4: Servicios Incluidos */}
              <ScrollReveal delay={350} direction="up">
                <TreatmentRow 
                    id="servicios-incluidos" 
                    name="Procedimientos y Ajustes Incluidos" 
                    price="Incluido (0 €)"
                  >
                  <p>Como parte de nuestro compromiso con la correcta función de tu boca, muchos de los procedimientos preparatorios y de ajuste de la mordida no tienen ningún coste para nuestros pacientes asegurados.</p>
                  
                  <div className="bg-dkv-green/5 rounded-2xl p-5 border border-dkv-green/20 mt-4">
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-dkv-green shrink-0 mt-0.5" /> 
                        <span className="text-dkv-gray"><strong>Análisis Oclusal:</strong> Toma de modelos y evaluación de tu mordida en articulador.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-dkv-green shrink-0 mt-0.5" /> 
                        <span className="text-dkv-gray"><strong>Tallado Selectivo:</strong> Pequeños pulidos en el esmalte para eliminar puntos que chocan mal y desvían la mandíbula.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-dkv-green shrink-0 mt-0.5" /> 
                        <span className="text-dkv-gray"><strong>Retirar prótesis antiguas:</strong> Retirada de coronas o puentes viejos que estén causando mala mordida.</span>
                      </li>
                    </ul>
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
                  <h2 className="text-3xl font-lemon text-dkv-green-dark mb-4">No dejes que el estrés rompa tus dientes</h2>
                  <div className="bg-dkv-gray-light p-4 rounded-xl border border-dkv-gray-border/50 mb-8 flex items-start gap-3">
                    <Info className="w-5 h-5 text-dkv-green shrink-0 mt-0.5" />
                    <p className="text-lg text-dkv-gray font-fsme leading-relaxed">
                      El bruxismo es una acción involuntaria. Si te levantas con dolor de cabeza, tensión en las cervicales o notas tus dientes más cortos y planos, necesitas una férula de descarga cuanto antes para frenar el daño.
                    </p>
                  </div>
                  <p className="text-lg text-dkv-gray mb-6">
                    Solicita tu cita de valoración en tu clínica más cercana. Revisaremos tu articulación y te fabricaremos un escudo protector a medida.
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
