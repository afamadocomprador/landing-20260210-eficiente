// app/tratamientos/estetica/incrustaciones/page.tsx

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

import { Info, ShieldCheck, Layers, Sparkles, CheckCircle2 } from "lucide-react"; 

export const metadata: Metadata = {
  title: "Incrustaciones Estéticas Dentales | Precios DKV Dentisalud",
  description: "Salva tu muela dañada con incrustaciones de porcelana a medida sin necesidad de tallarla. Estética, resistencia 100% invisible y tarifas exclusivas DKV.",
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

export default function IncrustacionesPage() {
  const breadcrumbs = [
    { label: "Inicio", href: "/" },
    { label: "Tratamientos", href: "/tratamientos" },
    { label: "Estética Dental", href: "/tratamientos/estetica" },
    { label: "Incrustaciones", href: "#" }
  ];

  return (
    <div className="min-h-screen bg-white font-fsme text-dkv-gray selection:bg-dkv-green selection:text-white pb-32">
      <CookieBanner />
      <Header />

      <main className="pt-[30px] md:pt-[110px] lg:pt-[130px]">
        <FixedBreadcrumb items={breadcrumbs} behavior="smart" />

        <TreatmentsHero 
          badgeText="Restauración Conservadora"
          title={{ dark: "INCRUSTACIONES", normal: "ESTÉTICAS" }} 
          description={[
            "El objetivo: Salvar una muela muy dañada de forma totalmente estética (sin metales oscuros) y sin tener que rebajarla entera para ponerle una funda o corona.",
            "Fabricamos la parte de tu muela que falta a medida. Es como la pieza de un rompecabezas que encaja y se sella en tu diente para devolverle el 100% de su dureza."
          ]}
        />

        {/* Menú transversal asegurándonos de que activeId apunte a las incrustaciones */}
        <StickySubNav activeId="incrustaciones" />

        <section className="bg-dkv-gray-border/30 pt-12 pb-20">
          <div className="container mx-auto px-4 max-w-4xl flow-root">

            <div className="space-y-8">
              
              {/* INTRODUCCIÓN CLÍNICA */}
              <ScrollReveal delay={100} direction="up">
                <div className="mb-8 text-center md:text-left">
                  <span className="text-dkv-green font-bold text-lg uppercase tracking-[0.2em] font-fsme">¿Cuándo son necesarias?</span>
                  <h3 className="text-2xl font-bold font-lemon text-dkv-green-dark border-b-2 border-dkv-green pb-3 inline-block w-full mt-2 uppercase tracking-wide">
                    La Alternativa al Empaste Grande
                  </h3>
                  <p className="text-dkv-gray mt-4 font-fsme text-lg">
                    Cuando tienes una caries muy grande, se ha roto un trozo importante de muela o hay que cambiar un empaste antiguo de metal (amalgama) muy extenso, pero aún queda pared de diente sano. En lugar de un empaste tradicional (que podría fracturarse al ser tan grande y no soportar la fuerza de la masticación), el laboratorio fabrica un bloque sólido a medida.
                  </p>
                </div>
              </ScrollReveal>

              {/* Ficha 1: Incrustación de Porcelana */}
              <ScrollReveal delay={200} direction="up">
                <TreatmentRow 
                    id="incrustacion-porcelana" 
                    name="Incrustación Estética de Porcelana" 
                    price="140 €"
                  >
                  <p><strong>Devuelve la fuerza original a tu diente.</strong> A diferencia de la resina de los empastes convencionales, la porcelana tiene una resistencia extrema, ideal para las muelas posteriores que soportan todo el peso de la masticación.</p>
                  
                  <div className="bg-dkv-gray-light/30 rounded-2xl p-5 border border-dkv-gray-border mt-4">
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <ShieldCheck className="w-5 h-5 text-dkv-green shrink-0 mt-0.5" />
                        <span className="text-dkv-gray font-medium"><strong>Mínimamente invasivo:</strong> Salvamos tu pieza original sin necesidad de limarla entera como haríamos con una funda o corona completa.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-dkv-green shrink-0 mt-0.5" />
                        <span className="text-dkv-gray font-medium"><strong>Alta resistencia:</strong> Podrás volver a masticar alimentos duros sin miedo a que el diente se fracture.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-dkv-green shrink-0 mt-0.5" />
                        <span className="text-dkv-gray font-medium"><strong>100% Invisible:</strong> Se mimetiza con tu esmalte. El diente queda como si nunca hubiera tenido una caries o rotura.</span>
                      </li>
                    </ul>
                  </div>
                  <p className="text-sm font-medium text-dkv-gray/80 italic mt-4 text-right">
                    * Precio por pieza tratada. Tratamiento disponible en todas nuestras clínicas.
                  </p>
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
                  <h2 className="text-3xl font-lemon text-dkv-green-dark mb-4">Planifica tu tratamiento</h2>
                  <div className="bg-dkv-gray-light p-4 rounded-xl border border-dkv-gray-border/50 mb-8 flex items-start gap-3">
                    <Info className="w-5 h-5 text-dkv-green shrink-0 mt-0.5" />
                    <p className="text-lg text-dkv-gray font-fsme leading-relaxed">
                      La información reflejada en esta página tiene mero carácter orientativo. Para asegurar que tu muela tiene paredes sanas suficientes para soportar una incrustación (y descartar la necesidad de una corona completa), es imprescindible una evaluación clínica y radiológica.
                    </p>
                  </div>
                  <p className="text-lg text-dkv-gray mb-6">
                    Solicita tu cita de valoración y descubre la forma más conservadora y estética de salvar tus piezas dentales. Encuentra tu clínica más cercana:
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
