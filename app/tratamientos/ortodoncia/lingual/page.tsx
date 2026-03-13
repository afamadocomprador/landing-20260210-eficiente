// app/tratamientos/ortodoncia/lingual/page.tsx

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

import { AlertCircle, Info, Zap, Sparkles, Smile, ShieldCheck } from "lucide-react"; 

export const metadata: Metadata = {
  title: "Ortodoncia Lingual 100% Invisible | Precios Cerrados DKV Dentisalud",
  description: "La única técnica ortodóntica verdaderamente imperceptible. Brackets colocados en la cara interna del diente para pacientes con altas exigencias estéticas.",
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

export default function OrtodonciaLingualPage() {
  const breadcrumbs = [
    { label: "Inicio", href: "/" },
    { label: "Tratamientos", href: "/tratamientos" },
    { label: "Ortodoncia", href: "/tratamientos/ortodoncia" },
    { label: "Lingual", href: "#" }
  ];

  return (
    <div className="min-h-screen bg-white font-fsme text-dkv-gray selection:bg-dkv-green selection:text-white pb-32">
      <CookieBanner />
      <Header />

      <main className="pt-[30px] md:pt-[110px] lg:pt-[130px]">
        <FixedBreadcrumb items={breadcrumbs} behavior="smart" />

        <TreatmentsHero 
          badgeText="100% Invisible"
          title={{ dark: "ORTODONCIA", normal: "LINGUAL" }} 
          description={[
            "La única técnica verdaderamente imperceptible desde el exterior, diseñada para pacientes con las más altas exigencias sociolaborales que no desean comprometer su imagen.",
          ]}
        />

       {/* ⚡️ Inyección del menú transversal importado y pasándole el activeId */}
       <StickySubNav activeId="lingual" />

        <section className="bg-dkv-gray-border/30 pt-12 pb-20">
          <div className="container mx-auto px-4 max-w-4xl flow-root">

            <div className="space-y-8">
              {/* Ficha 1: Ortodoncia Lingual */}
              <ScrollReveal delay={100} direction="up">
                <TreatmentRow 
                    id="lingual" 
                    name="Ortodoncia Fija Lingual (100% Invisible)" 
                    image="/images/tratamientos/ortodoncia-lingual.png"
                  >
                  <p>La máxima expresión de la ortodoncia estética. Consiste en la colocación de brackets diseñados a medida en la <strong>cara interna (lingual) de los dientes</strong>.</p>
                  <p><strong>Por qué elegirlo:</strong> Porque quedan totalmente ocultos a la vista de los demás. Nadie sabrá que llevas ortodoncia, ni siquiera en distancias cortas. Ofrece un control tridimensional del movimiento dental idéntico al de los brackets exteriores de alta gama, pero con cero impacto en tu estética facial durante el tratamiento.</p>
                  
                  <div className="bg-dkv-gray-light/30 rounded-2xl p-5 border border-dkv-gray-border mt-6">
                    <h3 className="text-dkv-green-dark font-bold font-lemon text-sm uppercase mb-4">Desglose de la Técnica Lingual</h3>
                    <ul className="space-y-4">
                      <li className="flex flex-col md:flex-row md:justify-between items-start md:items-center pb-3 border-b border-dkv-gray-border/50">
                        <span className="font-bold text-dkv-gray">Aparato base por maxilar</span>
                        <span className="font-lemon text-lg text-dkv-green-dark shrink-0">298 €</span>
                      </li>
                      <li className="flex flex-col md:flex-row md:justify-between items-start md:items-center pb-3 border-b border-dkv-gray-border/50">
                        <span className="font-bold text-dkv-green-dark">Suplemento técnica lingual a medida (por maxilar)</span>
                        <span className="font-lemon text-lg text-dkv-green-dark shrink-0">+ 1.442 €</span>
                      </li>
                      <li className="flex flex-col md:flex-row md:justify-between items-start md:items-center">
                        <span className="font-medium text-dkv-gray/80 italic text-sm">Tratamientos asociados: Visitas de revisión periódica.</span>
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
                    Diagnóstico y Retención
                  </h3>
                  <p className="text-dkv-gray mt-4 font-fsme text-lg">La precisión de la técnica lingual exige un estudio milimétrico previo y una estabilización final perfecta para garantizar el éxito.</p>
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
                    <p className="text-sm italic mb-4">Asegura el resultado de tu inversión a largo plazo, evitando que los dientes recuperen su posición original.</p>
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
                  <h2 className="text-3xl font-lemon text-dkv-green-dark mb-4">Alta especialización clínica</h2>
                  <div className="bg-dkv-gray-light p-4 rounded-xl border border-dkv-gray-border/50 mb-8 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-dkv-green shrink-0 mt-0.5" />
                    <p className="text-lg text-dkv-gray font-fsme leading-relaxed">
                      La ortodoncia lingual es una técnica compleja que requiere un alto nivel de pericia por parte del especialista. La información aquí reflejada es orientativa; el diagnóstico final te lo dará un ortodoncista certificado.
                    </p>
                  </div>
                  <p className="text-lg text-dkv-gray mb-6">
                    Pide tu cita de valoración en nuestros centros para que analicemos tu oclusión y confirmemos si eres candidato para la técnica lingual.
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
