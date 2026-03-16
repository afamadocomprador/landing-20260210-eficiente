// app/tratamientos/prevencion/higiene/page.tsx

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

import { Info, Sparkles, Wind, ShieldCheck, Paintbrush, BookOpen, HeartPulse, CheckCircle2 } from "lucide-react"; 

export const metadata: Metadata = {
  title: "Higiene Dental y Prevención | DKV Dentisalud",
  description: "Limpiezas, fluorizaciones, bicarbonato y selladores a coste cero. Mantén tus dientes limpios y fuertes con tu seguro DKV.",
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

export default function HigieneYPrevencionPage() {
  const breadcrumbs = [
    { label: "Inicio", href: "/" },
    { label: "Tratamientos", href: "/tratamientos" },
    { label: "Prevención", href: "/tratamientos/prevencion/primera-visita" },
    { label: "Higiene y Prevención", href: "#" }
  ];

  return (
    <div className="min-h-screen bg-white font-fsme text-dkv-gray selection:bg-dkv-green selection:text-white pb-32">
      <CookieBanner />
      <Header />

      <main className="pt-[30px] md:pt-[110px] lg:pt-[130px]">
        <FixedBreadcrumb items={breadcrumbs} behavior="smart" />

        <TreatmentsHero 
          badgeText="El escudo protector"
          title={{ dark: "HIGIENE Y", normal: "PREVENCIÓN" }} 
          description={[
            "Tratamientos esenciales para mantener tus dientes limpios y fuertes frente a las bacterias.",
            "De nada sirve curar si no prevenimos. Aprovecha al máximo las coberturas gratuitas de tu póliza para blindar tu sonrisa."
          ]}
        />

        <StickySubNav activeId="higiene" />

        <section className="bg-dkv-gray-border/20 py-16">
          <div className="container mx-auto px-4 max-w-4xl space-y-8">

            {/* INTRODUCCIÓN CLÍNICA */}
            <ScrollReveal>
              <div className="mb-4 text-center md:text-left">
                <span className="text-dkv-green font-bold text-lg uppercase tracking-[0.2em] font-fsme">Mantenimiento Base</span>
                <h3 className="text-2xl font-bold font-lemon text-dkv-green-dark border-b-2 border-dkv-green pb-3 inline-block w-full mt-2 uppercase tracking-wide">
                  Limpieza y Estética Natural
                </h3>
              </div>
            </ScrollReveal>

            {/* Ficha 1: Limpieza y Bicarbonato agrupados por sinergia clínica */}
            <ScrollReveal delay={100}>
              <TreatmentRow id="limpieza-bicarbonato" name="Limpieza Profesional y Eliminación de Manchas" price="Incluido (0 €)">
                <div className="bg-dkv-gray-light/30 rounded-2xl p-5 border border-dkv-gray-border/60">
                  <ul className="space-y-6">
                    <li className="flex flex-col md:flex-row justify-between items-start md:items-center pb-5 border-b border-dkv-gray-border/50">
                      <div>
                        <span className="font-bold text-dkv-gray text-[17px] flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-dkv-green" /> Limpieza de boca, higiene o tartrectomía
                        </span>
                        <span className="font-normal text-[15px] text-dkv-gray/80 block mt-2">
                          Quitar el sarro superficial que el cepillo no puede eliminar. Es vital para prevenir la inflamación de las encías y el mal aliento.
                        </span>
                      </div>
                    </li>
                    <li className="flex flex-col md:flex-row justify-between items-start md:items-center">
                      <div>
                        <span className="font-bold text-dkv-gray text-[17px] flex items-center gap-2">
                          <Wind className="w-5 h-5 text-dkv-green" /> Bicarbonato
                        </span>
                        <span className="font-normal text-[15px] text-dkv-gray/80 block mt-2">
                          Un spray a presión para borrar manchas de café, té o tabaco del esmalte, devolviéndole a tus dientes su brillo natural sin dañar la superficie.
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
              </TreatmentRow>
            </ScrollReveal>

            {/* INTRODUCCIÓN ESCUDO PROTECTOR */}
            <ScrollReveal delay={100}>
              <div className="mt-12 mb-4 text-center md:text-left">
                <span className="text-dkv-green font-bold text-lg uppercase tracking-[0.2em] font-fsme">Fortaleciendo el Esmalte</span>
                <h3 className="text-2xl font-bold font-lemon text-dkv-green-dark border-b-2 border-dkv-green pb-3 inline-block w-full mt-2 uppercase tracking-wide">
                  Protección Estructural
                </h3>
              </div>
            </ScrollReveal>

            {/* Ficha 2: Flúor y Selladores */}
            <ScrollReveal delay={200}>
              <TreatmentRow id="proteccion-esmalte" name="Flúor y Sellado de Fisuras" price="Incluido (0 €)">
                <div className="bg-dkv-gray-light/30 rounded-2xl p-5 border border-dkv-gray-border/60">
                  <ul className="space-y-6">
                    <li className="flex flex-col md:flex-row justify-between items-start md:items-center pb-5 border-b border-dkv-gray-border/50">
                      <div>
                        <span className="font-bold text-dkv-gray text-[17px] flex items-center gap-2">
                          <ShieldCheck className="w-5 h-5 text-dkv-green" /> Fluorizaciones tópicas
                        </span>
                        <span className="font-normal text-[15px] text-dkv-gray/80 block mt-2">
                          Un baño de minerales de alta concentración para endurecer tus dientes y hacerlos súper resistentes a los ataques ácidos de las bacterias.
                        </span>
                      </div>
                    </li>
                    <li className="flex flex-col md:flex-row justify-between items-start md:items-center">
                      <div>
                        <span className="font-bold text-dkv-gray text-[17px] flex items-center gap-2">
                          <Paintbrush className="w-5 h-5 text-dkv-green" /> Selladores de fisuras
                        </span>
                        <span className="font-normal text-[15px] text-dkv-gray/80 block mt-2">
                          Pintamos los surcos profundos de las muelas adultas con una resina transparente para que no entre la comida ni la placa bacteriana.
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
              </TreatmentRow>
            </ScrollReveal>

            {/* Ficha 3: Recubrimiento pulpar */}
            <ScrollReveal delay={300}>
              <TreatmentRow id="recubrimiento-pulpar" name="Recubrimiento Pulpar" price="Incluido (0 €)">
                <div className="flex items-center gap-2 mb-2 text-dkv-gray">
                   <HeartPulse className="w-5 h-5 text-dkv-green" />
                   <span className="font-bold tracking-widest text-xs uppercase text-dkv-green">La "tirita" biológica</span>
                </div>
                <p className="mt-2 text-dkv-gray">
                  Se trata de una "tirita" interna de calcio que aplicamos si el esmalte está muy desgastado o si una lesión se ha acercado peligrosamente al nervio. Protege la pulpa dental y estimula la regeneración interna del diente para evitar la sensibilidad.
                </p>
              </TreatmentRow>
            </ScrollReveal>

            {/* Ficha 4: Cursillo Odontológico */}
            <ScrollReveal delay={150}>
              <TreatmentRow id="cursillo" name="Cursillo Odontológico" price="Incluido (0 €)">
                <div className="flex items-center gap-2 mb-2 text-dkv-gray">
                   <BookOpen className="w-5 h-5 text-dkv-green" />
                   <span className="font-bold tracking-widest text-xs uppercase text-dkv-green">Educación para la salud</span>
                </div>
                <p className="mt-2 text-dkv-gray mb-4">
                  De poco sirven los tratamientos si en casa no mantenemos el cuidado adecuado. 
                </p>
                <div className="bg-dkv-green/5 p-4 rounded-xl border border-dkv-green/20 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-dkv-green shrink-0 mt-0.5" />
                  <p className="text-sm text-dkv-gray font-fsme leading-relaxed">
                    Nuestros higienistas te enseñan la técnica correcta de cepillado, el uso del hilo dental y los cepillos interproximales adaptados a la anatomía específica de tu boca.
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
                  <h2 className="text-3xl font-lemon text-dkv-green-dark mb-4 uppercase leading-tight">Tu sonrisa al 100%</h2>
                  <div className="bg-dkv-gray-light p-4 rounded-xl border border-dkv-gray-border/50 mb-8 flex items-start gap-3">
                    <Info className="w-5 h-5 text-dkv-green shrink-0 mt-0.5" />
                    <p className="text-lg text-dkv-gray font-fsme leading-relaxed">
                      Si notas tus dientes ásperos, manchas superficiales o hace más de un año que no te haces una limpieza profesional, es el momento perfecto para blindar tu boca.
                    </p>
                  </div>
                  <p className="text-lg text-dkv-gray mb-6 font-fsme">
                    Disfruta de tu "ITV dental" y sal de la clínica con los dientes limpios, pulidos y fortalecidos sin pagar absolutamente nada. Busca tu centro:
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
