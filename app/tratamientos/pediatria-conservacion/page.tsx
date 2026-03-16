// app/tratamientos/odontopediatria/conservadora/page.tsx

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

import { Info, ShieldCheck, Bug, Layers, CheckCircle2, Smile } from "lucide-react"; 

export const metadata: Metadata = {
  title: "Odontología Conservadora Infantil | DKV Dentisalud",
  description: "Empastes, reconstrucciones y coronas para niños. Curamos la caries de tus hijos para que coman y sonrían sin dolor con coberturas DKV.",
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

export default function ConservadoraInfantilPage() {
  const breadcrumbs = [
    { label: "Inicio", href: "/" },
    { label: "Tratamientos", href: "/tratamientos" },
    { label: "Odontopediatría", href: "/tratamientos/odontopediatria" },
    { label: "Odontología Conservadora", href: "#" }
  ];

  return (
    <div className="min-h-screen bg-white font-fsme text-dkv-gray pb-32">
      <CookieBanner />
      <Header />

      <main className="pt-[30px] md:pt-[110px]">
        <FixedBreadcrumb items={breadcrumbs} behavior="smart" />

        <TreatmentsHero 
          badgeText="Curando al bichito"
          title={{ dark: "ODONTOLOGÍA", normal: "CONSERVADORA" }} 
          description={[
            "Cuando la prevención no ha sido suficiente y aparece una caries, nuestro objetivo es actuar rápido.",
            "Limpiamos la infección y restauramos el diente para que tu hijo pueda volver a comer y sonreír sin dolor."
          ]}
        />

        <StickySubNav activeId="conservadora-pediatria" />

        <section className="bg-dkv-gray-border/20 py-16">
          <div className="container mx-auto px-4 max-w-4xl space-y-8">

            {/* Ficha 1: Obturación / Empaste */}
            <ScrollReveal>
              <TreatmentRow id="obturacion" name="Obturación con o sin recubrimiento pulpar" price="0 €">
                <div className="flex items-center gap-2 mb-2 text-dkv-green">
                   <Bug className="w-5 h-5" />
                   <span className="font-bold tracking-widest text-xs uppercase">El famoso "empaste"</span>
                </div>
                <p><strong>¿Qué es?</strong> Limpiamos cuidadosamente la caries y rellenamos el hueco con una resina estética del mismo color del diente para devolverle su función y forma.</p>
                <div className="bg-dkv-green/5 p-4 rounded-xl border border-dkv-green/20 mt-4 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-dkv-green shrink-0 mt-0.5" />
                  <p className="text-sm text-dkv-gray">
                    <strong>El beneficio:</strong> Al estar 100% incluido en tu póliza DKV para menores de 15 años, no hay excusa para dejar que una caries avance hasta llegar al nervio y causar dolor.
                  </p>
                </div>
              </TreatmentRow>
            </ScrollReveal>

            {/* Ficha 2: Reconstrucción de Molares Definitivos */}
            <ScrollReveal delay={100}>
              <TreatmentRow id="reconstruccion" name="Reconstrucción de molares definitivos" price="40 €">
                <div className="flex items-center gap-2 mb-2 text-dkv-gray">
                   <Layers className="w-5 h-5 text-dkv-green" />
                   <span className="font-bold tracking-widest text-xs uppercase text-dkv-green">Para menores de 15 años</span>
                </div>
                <p><strong>¿Cuándo se hace?</strong> Cuando la caries ataca a una muela definitiva (de las que ya son para toda la vida) y es tan grande que ha destruido una gran parte de la estructura del diente.</p>
                <p>En estos casos, un empaste normal no aguantaría la fuerza de la masticación. Utilizamos materiales especiales de alta resistencia para reconstruir la anatomía completa de la muela y devolverle toda su fuerza original.</p>
              </TreatmentRow>
            </ScrollReveal>

            {/* Ficha 3: Coronas Prefabricadas Metálicas */}
            <ScrollReveal delay={200}>
              <TreatmentRow id="corona-metalica" name="Corona prefabricada metálica (acero)" price="65 €">
                <div className="flex items-center gap-2 mb-2 text-dkv-gray">
                   <ShieldCheck className="w-5 h-5 text-dkv-green" />
                   <span className="font-bold tracking-widest text-xs uppercase text-dkv-green">El "Casquito" protector</span>
                </div>
                <p><strong>¿Por qué hace falta?</strong> Imagina que una muela de leche está destrozada por la caries, pero el niño aún tiene 5 años y esa muela no se va a caer de forma natural hasta los 10 años.</p>
                <div className="bg-white p-5 rounded-2xl border border-dkv-gray-border/50 mt-4">
                  <p className="text-sm text-dkv-gray leading-relaxed">
                    No podemos sacarla porque perderíamos el espacio para el diente definitivo, y tampoco podemos hacer un empaste normal porque se rompería. La solución ideal es limpiar la muela y ponerle un "casquito" de acero inoxidable que la abraza y la protege completamente hasta que llegue el momento de que se caiga sola.
                  </p>
                </div>
              </TreatmentRow>
            </ScrollReveal>

          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <ScrollReveal>
              <div className="grid lg:grid-cols-2 gap-12 items-center text-left">
                <div>
                  <h2 className="text-3xl font-lemon text-dkv-green-dark mb-4 uppercase leading-tight">No esperes a que duela</h2>
                  <div className="bg-dkv-gray-light p-4 rounded-xl border border-dkv-gray-border/50 mb-8 flex items-start gap-3">
                    <Info className="w-5 h-5 text-dkv-green shrink-0 mt-0.5" />
                    <p className="text-lg text-dkv-gray font-fsme leading-relaxed">
                      Los niños a menudo no avisan de que tienen una molestia hasta que la caries ya ha llegado al nervio. Las revisiones periódicas nos permiten detectar y empastar estas pequeñas lesiones a tiempo (y sin coste para ti).
                    </p>
                  </div>
                  <p className="text-lg text-dkv-gray mb-6 font-fsme">
                    Acude con tu pequeño a tu clínica DKV más cercana. Trataremos esa caries en un ambiente relajado y con las técnicas menos invasivas:
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
