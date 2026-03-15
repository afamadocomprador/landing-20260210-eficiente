// app/tratamientos/odontopediatria/prevencion/page.tsx

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

import { Info, ShieldCheck, Baby, Sparkles, CheckCircle2, Heart } from "lucide-react"; 

export const metadata: Metadata = {
  title: "Prevención y Educación Dental Infantil | DKV Dentisalud",
  description: "Protege la sonrisa de tus hijos. Selladores, fluoraciones y enseñanza de higiene bucal con tratamientos gratuitos en tu póliza DKV.",
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
          <span className="bg-dkv-green/10 px-4 py-1.5 rounded-full text-2xl font-lemon font-bold text-dkv-green">
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

export default function PrevencionInfantilPage() {
  const breadcrumbs = [
    { label: "Inicio", href: "/" },
    { label: "Tratamientos", href: "/tratamientos" },
    { label: "Odontopediatría", href: "/tratamientos/odontopediatria" },
    { label: "Prevención y Educación", href: "#" }
  ];

  return (
    <div className="min-h-screen bg-white font-fsme text-dkv-gray pb-32">
      <CookieBanner />
      <Header />

      <main className="pt-[30px] md:pt-[110px]">
        <FixedBreadcrumb items={breadcrumbs} behavior="smart" />

        <TreatmentsHero 
          badgeText="El escudo protector"
          title={{ dark: "PREVENCIÓN Y", normal: "EDUCACIÓN" }} 
          description={[
            "Cuidar la boca de los más pequeños no es solo curar caries; es educar, prevenir y guiar el crecimiento de sus huesos y dientes definitivos.",
            "El objetivo es evitar que aparezca la caries enseñando buenos hábitos y fortaleciendo el esmalte antes de que los problemas empiecen."
          ]}
        />

        {/* El StickySubNav requerirá que añadas el cluster de odontopediatria en el futuro */}
        <StickySubNav activeId="prevencion" />

        <section className="bg-dkv-gray-border/20 py-16">
          <div className="container mx-auto px-4 max-w-4xl space-y-8">
            
            {/* Ficha 1: Educación y Limpieza */}
            <ScrollReveal>
              <TreatmentRow id="higiene-educacion" name="Educación y Limpieza Base" price="0 €">
                <p className="mb-4">Los niños no nacen sabiendo cepillarse. De forma lúdica, instauramos un hábito que les ahorrará muchos problemas y dolor en el futuro.</p>
                <div className="bg-dkv-green/5 p-5 rounded-2xl border border-dkv-green/20">
                  <ul className="space-y-4">
                    <li className="flex flex-col md:flex-row justify-between items-start md:items-center pb-3 border-b border-dkv-green/10">
                      <div>
                        <span className="font-bold text-dkv-gray flex items-center gap-2"><Baby className="w-4 h-4 text-dkv-green"/> Cursillo odontológico</span>
                        <span className="font-normal text-sm text-dkv-gray/80 block mt-1">Enseñanza de cepillado y técnicas de higiene bucal para padres y niños.</span>
                      </div>
                      <span className="font-lemon text-xl text-dkv-green shrink-0 mt-2 md:mt-0">Incluido</span>
                    </li>
                    <li className="flex flex-col md:flex-row justify-between items-start md:items-center">
                      <div>
                        <span className="font-bold text-dkv-gray flex items-center gap-2"><Sparkles className="w-4 h-4 text-dkv-green"/> Limpieza de boca (Tartrectomía)</span>
                        <span className="font-normal text-sm text-dkv-gray/80 block mt-1">Retiramos la placa bacteriana y el sarro que el cepillo de casa no logra quitar, evitando la inflamación de las encías.</span>
                      </div>
                      <span className="font-lemon text-xl text-dkv-green shrink-0 mt-2 md:mt-0">Incluido</span>
                    </li>
                  </ul>
                </div>
              </TreatmentRow>
            </ScrollReveal>

            {/* Ficha 2: Fluoraciones */}
            <ScrollReveal delay={100}>
              <TreatmentRow id="fluor" name="Fluoraciones tópicas (por sesión)" price="0 €">
                <p className="mb-4">Aplicamos un gel o barniz de flúor de alta concentración sobre los dientes del niño. Este mineral esencial se absorbe y actúa como un "escudo", endureciendo el esmalte de forma inmediata y haciéndolo súper resistente a los ataques de los ácidos de las bacterias.</p>
                <div className="flex items-center gap-2 text-dkv-green font-bold text-sm mt-4 uppercase tracking-tight">
                   <ShieldCheck className="w-5 h-5" />
                   Tratamiento 100% cubierto por tu póliza
                </div>
              </TreatmentRow>
            </ScrollReveal>

            {/* Ficha 3: Selladores de fisuras */}
            <ScrollReveal delay={200}>
              <TreatmentRow id="selladores" name="Selladores de fisuras (Menores de 15 años)" price="17 €">
                <p><strong>¿Por qué hacen falta?</strong> Las muelas definitivas que salen a los 6 años tienen unos surcos muy profundos donde las cerdas del cepillo no llegan, y ahí es donde empiezan el 90% de las caries infantiles.</p>
                <div className="bg-white p-5 rounded-2xl border border-dkv-gray-border/50 mt-4">
                  <p className="text-sm text-dkv-gray">
                    <strong>¿Cómo se aplica?</strong> Pintamos esos surcos con una resina transparente que los "sella" dejándolos completamente lisos. Es un proceso muy rápido, <strong>no duele absolutamente nada</strong> (no hay que usar el torno) y el beneficio es una muela blindada contra la caries durante años. <em>(Precio por pieza)</em>.
                  </p>
                </div>
              </TreatmentRow>
            </ScrollReveal>

            {/* Ficha 4: Radiología Infantil */}
            <ScrollReveal delay={150}>
              <TreatmentRow id="radiologia" name="Radiovisiografía digital (RVG)" price="0 €">
                <p>La seguridad de tus hijos es lo primero. Utilizamos radiografías intraorales digitales de última generación con una dosis de radiación mínima (casi nula).</p>
                <p className="text-sm mt-2 text-dkv-gray/80">
                  Son pruebas fundamentales e indoloras para que el odontopediatra pueda ver si hay caries escondidas entre los dientes que no se detectan a simple vista.
                </p>
              </TreatmentRow>
            </ScrollReveal>

            {/* CONSEJO CLÍNICO (Destacado Especial) */}
            <ScrollReveal delay={250}>
              <div className="mt-12 bg-dkv-green-dark text-white p-8 md:p-10 rounded-3xl shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Heart className="w-32 h-32 text-white" />
                </div>
                <div className="relative z-10">
                  <h3 className="font-lemon text-xl mb-4 text-dkv-green-light uppercase tracking-wide">El Consejo Clínico</h3>
                  <p className="font-fsme text-lg leading-relaxed italic text-white/90">
                    "Un mantenedor de espacio o un simple sellador hoy te puede ahorrar un tratamiento de ortodoncia de miles de euros mañana. La odontopediatría no es un gasto, es la inversión más rentable en la salud estructural de tus hijos. Además, verás que <strong>la inmensa mayoría de los tratamientos preventivos están incluidos a coste cero</strong> en tu póliza DKV Dentisalud."
                  </p>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <ScrollReveal>
              <div className="grid lg:grid-cols-2 gap-12 items-center text-left">
                <div>
                  <h2 className="text-3xl font-lemon text-dkv-green-dark mb-4 uppercase leading-tight">Su primera visita</h2>
                  <div className="bg-dkv-gray-light p-4 rounded-xl border border-dkv-gray-border/50 mb-8 flex items-start gap-3">
                    <Info className="w-5 h-5 text-dkv-green shrink-0 mt-0.5" />
                    <p className="text-lg text-dkv-gray font-fsme leading-relaxed">
                      "Total, como se le van a caer, ¿para qué arreglar los dientes de leche?". Este gran mito es el origen de muchísimos problemas de espacio, dolores e infecciones graves.
                    </p>
                  </div>
                  <p className="text-lg text-dkv-gray mb-6 font-fsme">
                    Acostumbra a tu hijo a visitar al dentista desde pequeño en un entorno amigable y sin dolor. Pide cita para su primera revisión y limpieza sin coste:
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
