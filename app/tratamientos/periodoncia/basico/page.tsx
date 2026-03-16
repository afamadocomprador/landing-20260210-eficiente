// app/tratamientos/periodoncia/basico/page.tsx

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

import { Info, Activity, Ruler, Sparkles, Droplet, ShieldCheck, HeartPulse } from "lucide-react"; 

export const metadata: Metadata = {
  title: "Diagnóstico Periodontal y Curetajes | DKV Dentisalud",
  description: "Tratamiento básico de encías. Periodontograma, detartraje y curetajes para frenar la piorrea y salvar tus dientes desde la raíz.",
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

export default function PeriodonciaBasicaPage() {
  const breadcrumbs = [
    { label: "Inicio", href: "/" },
    { label: "Tratamientos", href: "/tratamientos" },
    { label: "Periodoncia", href: "/tratamientos/periodoncia/basico" },
    { label: "Diagnóstico y Tratamiento Básico", href: "#" }
  ];

  return (
    <div className="min-h-screen bg-white font-fsme text-dkv-gray selection:bg-dkv-green selection:text-white pb-32">
      <CookieBanner />
      <Header />

      <main className="pt-[30px] md:pt-[110px] lg:pt-[130px]">
        <FixedBreadcrumb items={breadcrumbs} behavior="smart" />

        <TreatmentsHero 
          badgeText="Salva tus dientes desde la raíz"
          title={{ dark: "ENCÍAS Y", normal: "PERIODONCIA" }} 
          description={[
            "Si te sangran las encías al cepillarte, tienes mal aliento crónico o notas que algún diente se mueve, tienes enfermedad periodontal ('Piorrea').",
            "Esta sección es vital: de nada sirve un diente sin caries si el hueso y la encía que lo sujetan están enfermos."
          ]}
        />

        {/* Necesitarás añadir 'periodoncia' al StickySubNav con sus 3 rutas */}
        <StickySubNav activeId="diagnostico-basico" />

        <section className="bg-dkv-gray-border/20 py-16">
          <div className="container mx-auto px-4 max-w-4xl space-y-8">

            {/* INTRODUCCIÓN CLÍNICA */}
            <ScrollReveal>
              <div className="mb-4 text-center md:text-left">
                <span className="text-dkv-green font-bold text-lg uppercase tracking-[0.2em] font-fsme">Fase Inicial</span>
                <h3 className="text-2xl font-bold font-lemon text-dkv-green-dark border-b-2 border-dkv-green pb-3 inline-block w-full mt-2 uppercase tracking-wide">
                  Diagnóstico y Tratamiento Básico
                </h3>
              </div>
            </ScrollReveal>

            {/* Ficha 1: Diagnóstico y Periodontograma */}
            <ScrollReveal delay={100}>
              <TreatmentRow id="periodontograma" name="Diagnóstico, medición de bolsas y Periodontograma" price="Incluido (0 €)">
                <div className="flex items-center gap-2 mb-2 text-dkv-gray">
                   <Ruler className="w-5 h-5 text-dkv-green" />
                   <span className="font-bold tracking-widest text-xs uppercase text-dkv-green">El mapa de daños</span>
                </div>
                <p>
                  Para tratar la enfermedad de las encías, primero necesitamos saber exactamente dónde está y qué profundidad tiene.
                </p>
                <div className="bg-dkv-gray-light/50 p-4 rounded-xl border border-dkv-gray-border/50 mt-4">
                  <p className="text-sm text-dkv-gray leading-relaxed">
                    Utilizando una pequeña sonda milimetrada, medimos el espacio entre el diente y la encía (la "bolsa periodontal") diente por diente. Así sabemos milímetro a milímetro cuánto hueso de soporte has perdido y dónde debemos atacar la infección.
                  </p>
                </div>
              </TreatmentRow>
            </ScrollReveal>

            {/* Ficha 2: Detartraje */}
            <ScrollReveal delay={200}>
              <TreatmentRow id="detartraje" name="Limpieza profunda (Detartraje subgingival)" price="Incluido (0 €)">
                <div className="flex items-center gap-2 mb-2 text-dkv-gray">
                   <Sparkles className="w-5 h-5 text-dkv-green" />
                   <span className="font-bold tracking-widest text-xs uppercase text-dkv-green">Bajo la línea de la encía</span>
                </div>
                <p>
                  A diferencia de la limpieza normal (que solo quita el sarro visible), el detartraje es una limpieza un poco más profunda y focalizada que nos permite eliminar la placa bacteriana que ha empezado a esconderse justo por debajo de la encía.
                </p>
              </TreatmentRow>
            </ScrollReveal>

            {/* Ficha 3: Curetajes */}
            <ScrollReveal delay={150}>
              <TreatmentRow id="curetaje" name="Curetaje, alisado y pulido radicular" price="40 €">
                <div className="flex items-center gap-2 mb-2 text-dkv-gray">
                   <Activity className="w-5 h-5 text-dkv-green" />
                   <span className="font-bold tracking-widest text-xs uppercase text-dkv-green">Limpieza de raíces (Por cuadrante)</span>
                </div>
                <p><strong>¿Qué es y por qué hace falta?</strong> Si el sarro ha penetrado muy por debajo de la encía, la "limpieza normal" ya no sirve porque las bacterias han creado costras duras pegadas a la raíz de tu diente.</p>
                <p className="mt-4">
                  Con anestesia local (para que no sientas molestias), introducimos unas herramientas especiales llamadas curetas con las que "raspamos" y alisamos las raíces de tus dientes. Esto elimina las bacterias que se están comiendo tu hueso y permite que la encía vuelva a pegarse al diente.
                </p>
              </TreatmentRow>
            </ScrollReveal>

            {/* Ficha 4: Flúor post-curetaje */}
            <ScrollReveal delay={250}>
              <TreatmentRow id="fluor-sensibilidad" name="Aplicación gel de flúor para sensibilidad dentinaria" price="Incluido (0 €)">
                <div className="flex items-center gap-2 mb-2 text-dkv-gray">
                   <Droplet className="w-5 h-5 text-dkv-green" />
                   <span className="font-bold tracking-widest text-xs uppercase text-dkv-green">Alivio post-tratamiento</span>
                </div>
                <p>
                  Tras realizar los curetajes y quitar el sarro que "abrigaba" la raíz, los dientes pueden quedar temporalmente sensibles a los alimentos y bebidas frías. 
                </p>
                <div className="bg-dkv-green/5 p-4 rounded-xl border border-dkv-green/20 mt-4 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-dkv-green shrink-0 mt-0.5" />
                  <p className="text-sm text-dkv-gray font-fsme leading-relaxed">
                    Aplicamos un gel desensibilizante de flúor de alta concentración que sella los poros del diente y proporciona un alivio inmediato.
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
                  <h2 className="text-3xl font-lemon text-dkv-green-dark mb-4 uppercase leading-tight">Actúa antes de perder hueso</h2>
                  <div className="bg-dkv-gray-light p-4 rounded-xl border border-dkv-gray-border/50 mb-8 flex items-start gap-3">
                    <HeartPulse className="w-5 h-5 text-dkv-green shrink-0 mt-0.5" />
                    <p className="text-lg text-dkv-gray font-fsme leading-relaxed">
                      El sangrado de encías <strong>nunca es normal</strong>. Es el primer grito de auxilio de tu boca indicando que hay una infección activa comiéndose el hueso que soporta tus dientes.
                    </p>
                  </div>
                  <p className="text-lg text-dkv-gray mb-6 font-fsme">
                    No esperes a que tus dientes se muevan. Un diagnóstico periodontal a tiempo (incluido en tu póliza) puede salvar tu sonrisa. Busca tu clínica:
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
