// app/tratamientos/odontologia-conservadora/cirugia-y-complejos/page.tsx

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

import { Info, RefreshCcw, Scissors, Stethoscope, CheckCircle2, AlertCircle } from "lucide-react"; 

export const metadata: Metadata = {
  title: "Cirugía Periapical y Reendodoncias | DKV Dentisalud",
  description: "Segundas oportunidades para tu diente. Reendodoncias, apicectomías y apicoformaciones para curar infecciones complejas y evitar la extracción.",
};

// --- Componente Ficha de Tratamiento Estándar ---
const TreatmentRow = ({ id, name, price, image, imageAlt, children }: any) => (
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

    {image && (
      <div className="mb-6 w-full overflow-hidden rounded-xl border border-gray-100 bg-gray-50/50 flex justify-center py-4">
        <img 
          src={image} 
          alt={imageAlt || name} 
          className="w-full h-auto object-contain max-h-[200px] md:max-h-[300px] transition-transform duration-700 hover:scale-105"
          loading="lazy"
        />
      </div>
    )}

    <div className="text-dkv-gray font-fsme leading-relaxed text-lg space-y-4">
      {children}
    </div>
  </div>
);

export default function CasosComplejosPage() {
  const breadcrumbs = [
    { label: "Inicio", href: "/" },
    { label: "Tratamientos", href: "/tratamientos" },
    { label: "Odontología Conservadora", href: "/tratamientos/odontologia-conservadora" },
    { label: "Cirugía y Casos Complejos", href: "#" }
  ];

  return (
    <div className="min-h-screen bg-white font-fsme text-dkv-gray pb-32">
      <CookieBanner />
      <Header />

      <main className="pt-[30px] md:pt-[110px]">
        <FixedBreadcrumb items={breadcrumbs} behavior="smart" />

        <TreatmentsHero 
          badgeText="Casos Complejos"
          title={{ dark: "SEGUNDAS OPORTUNIDADES", normal: "Y CIRUGÍA" }} 
          description={[
            "¿Qué hacer cuando una endodoncia antigua vuelve a dar problemas o se infecta años después?",
            "Agotar las opciones clínicas para preservar tu dentadura natural siempre será la alternativa biológica y económica más inteligente frente a la extracción."
          ]}
        />

        <StickySubNav activeId="casos-complejos" />

        <section className="bg-dkv-gray-border/20 py-16">
          <div className="container mx-auto px-4 max-w-4xl space-y-8">

            {/* Ficha 1: Reendodoncia */}
            <ScrollReveal>
              <TreatmentRow id="reendodoncia" name="Reendodoncia (1, 2 o 3 conductos)" price="130 €">
                <div className="flex items-center gap-2 mb-2 text-dkv-gray">
                   <RefreshCcw className="w-5 h-5 text-dkv-green" />
                   <span className="font-bold tracking-widest text-xs uppercase text-dkv-green">Limpieza de repetición</span>
                </div>
                <p><strong>¿En qué consiste?</strong> Hay que destapar el diente, sacar el material antiguo contaminado, volver a desinfectar todo el sistema de conductos a fondo y volver a sellar.</p>
                <div className="bg-white p-5 rounded-2xl border border-dkv-gray-border/50 mt-4">
                  <p className="text-sm text-dkv-gray leading-relaxed">
                    Es un trabajo muy minucioso (generalmente provocado por filtraciones en coronas antiguas o bacterias resistentes) cuyo único fin es intentar no tener que extraer la muela.
                  </p>
                </div>
              </TreatmentRow>
            </ScrollReveal>

            {/* Ficha 2: Apicectomía (CON LA IMAGEN DEL CÓDIGO ANTIGUO) */}
            <ScrollReveal delay={100}>
              <TreatmentRow 
                id="apicectomia" 
                name="Apicectomía (Cirugía periapical)" 
                price="38 €"
                image="/images/apicectomia.png"
                imageAlt="Ilustración visual de una apicectomía o cirugía periapical"
              >
                <div className="flex items-center gap-2 mb-2 text-dkv-gray">
                   <Scissors className="w-5 h-5 text-dkv-green" />
                   <span className="font-bold tracking-widest text-xs uppercase text-dkv-green">La alternativa quirúrgica</span>
                </div>
                <p>Si la infección en la punta de la raíz (el ápice) no se cura ni siquiera repitiendo la endodoncia y se ha enquistado en el hueso, debemos intervenir desde fuera.</p>
                <p className="flex items-center gap-2 text-dkv-green-dark font-bold mt-2"><CheckCircle2 className="w-4 h-4 text-dkv-green" /> Abrimos un poquito la encía, cortamos la punta infectada de la raíz, extirpamos el quiste y sellamos la raíz desde abajo.</p>
              </TreatmentRow>
            </ScrollReveal>

            {/* Ficha 3: Apicoformación */}
            <ScrollReveal delay={200}>
              <TreatmentRow id="apicoformacion" name="Apicoformación (por sesión)" price="54 €">
                <div className="flex items-center gap-2 mb-2 text-dkv-gray">
                   <Stethoscope className="w-5 h-5 text-dkv-green" />
                   <span className="font-bold tracking-widest text-xs uppercase text-dkv-green">Para dientes inmaduros</span>
                </div>
                <p>Tratamiento especial, generalmente para jóvenes, que han sufrido un traumatismo severo en un diente definitivo cuya raíz aún no se había formado por completo.</p>
                <p>Utilizamos materiales especiales biocerámicos para ayudar a "cerrar" y crear una barrera artificial dura en la punta de esa raíz inmadura de forma química.</p>
              </TreatmentRow>
            </ScrollReveal>

            {/* AVISO MÉDICO POSTOPERATORIO (Reciclado de tu código antiguo) */}
            <ScrollReveal delay={150}>
              <div className="mt-16 bg-dkv-gray-light p-6 md:p-8 rounded-xl border border-dkv-gray-border font-fsme text-dkv-gray shadow-inner">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-5 h-5 text-dkv-green-dark" />
                  <h3 className="font-bold text-dkv-green-dark uppercase tracking-wide font-lemon text-sm">El factor de adaptación</h3>
                </div>
                <p className="text-sm md:text-base leading-relaxed">
                  Es fundamental mantener expectativas realistas. Después de intervenciones profundas como una reendodoncia o cirugía periapical, es normal experimentar inflamación local, sensibilidad o molestias al masticar durante los primeros 3 a 7 días. Durante las primeras semanas, y estrictamente hasta que su diente reciba la reconstrucción o corona definitiva, <strong>deberá evitar masticar alimentos duros por ese lado</strong> para proteger la estructura en su fase más vulnerable.
                </p>
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
                  <h2 className="text-3xl font-lemon text-dkv-green-dark mb-4 uppercase leading-tight">La última frontera</h2>
                  <div className="bg-dkv-green/5 p-4 rounded-xl border border-dkv-green/20 mb-8 flex items-start gap-3">
                    <Info className="w-5 h-5 text-dkv-green shrink-0 mt-0.5" />
                    <p className="text-lg text-dkv-gray font-fsme leading-relaxed">
                      "Agotar las opciones clínicas y restauradoras para preservar su dentadura natural siempre será la alternativa biológica, estética y económicamente más inteligente frente a la extracción y los implantes."
                    </p>
                  </div>
                  <p className="text-lg text-dkv-gray mb-6 font-fsme">
                    Si te han dicho que tu muela no tiene salvación, pide una segunda opinión. Nuestros especialistas evaluarán si la cirugía periapical o la reendodoncia pueden salvarla:
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
