// app/tratamientos/implantologia/sobredentadura/page.tsx

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

import { Info, ShieldCheck, Smile } from "lucide-react"; 

export const metadata: Metadata = {
  title: "Sobredentadura sobre Implantes | Precios DKV Dentisalud",
  description: "Fija tu dentadura postiza con implantes y anclajes tipo Locator. La solución más económica y segura con tarifas exclusivas DKV.",
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

export default function SobredentaduraPage() {
  const breadcrumbs = [
    { label: "Inicio", href: "/" },
    { label: "Tratamientos", href: "/tratamientos" },
    { label: "Implantología", href: "/tratamientos/implantologia" },
    { label: "Sobredentadura", href: "#" }
  ];

  return (
    <div className="min-h-screen bg-white font-fsme text-dkv-gray selection:bg-dkv-green selection:text-white pb-32">
      <CookieBanner />
      <Header />

      <main className="pt-[30px] md:pt-[110px] lg:pt-[130px]">
        <FixedBreadcrumb items={breadcrumbs} behavior="smart" />

        <TreatmentsHero 
          badgeText="Económica y Segura"
          title={{ dark: "SOBREDENTADURA", normal: "REMOVIBLE" }} 
          description={[
            "Si tu dentadura postiza tradicional es un infierno diario, te hace llagas o se te cae al hablar, esta es tu salvación.",
            "Una prótesis que hace 'clic' sobre implantes. Mínimamente invasiva, fácil de limpiar y totalmente segura."
          ]}
        />

        {/* Menú transversal apuntando a "sobredentadura" */}
        <StickySubNav activeId="sobredentadura" />

        <section className="bg-dkv-gray-border/30 pt-12 pb-20">
          <div className="container mx-auto px-4 max-w-4xl flow-root">

            <div className="space-y-8">
              {/* Ficha 1: El Presupuesto "Normal" (Caso Ideal) */}
              <ScrollReveal delay={100} direction="up">
                <div className="mb-8 text-center md:text-left">
                  <span className="text-dkv-green font-bold text-lg uppercase tracking-[0.2em] font-fsme">Presupuesto Real Total</span>
                  <h3 className="text-2xl font-bold font-lemon text-dkv-green-dark border-b-2 border-dkv-green pb-3 inline-block w-full mt-2 uppercase tracking-wide">
                    El Caso Ideal (Estabilización con 2 Implantes)
                  </h3>
                  <p className="text-dkv-gray mt-4 font-fsme text-lg">
                    La forma más eficiente y económica de estabilizar una mandíbula inferior. Colocamos solo 2 implantes (un procedimiento rápido). Tu nueva prótesis llevará unos "broches" en su interior. Te la pones, hace "clic" y queda bloqueada para masticar. Solo te la quitas tú, con un pequeño tirón, para lavarla.
                  </p>
                </div>

                <TreatmentRow 
                    id="sobredentadura-ideal" 
                    name="Sobredentadura sobre 2 Implantes" 
                    price="2.450 €"
                  >
                  <p>Te mostramos la <strong>inversión total real</strong> sumando los implantes, los anclajes de precisión (Locator) y la prótesis reforzada.</p>
                  
                  <div className="bg-dkv-gray-light/30 rounded-2xl p-5 border border-dkv-gray-border mt-4">
                    <ul className="space-y-4">
                      <li className="flex flex-col md:flex-row md:justify-between items-start md:items-center pb-3 border-b border-dkv-gray-border/50">
                        <span className="font-bold text-dkv-gray">Diagnóstico y Estudio <span className="font-normal block text-sm text-dkv-gray/80">TAC 3D y planificación</span></span>
                        <span className="font-lemon text-lg text-dkv-green-dark shrink-0">Incluido</span>
                      </li>
                      <li className="flex flex-col md:flex-row md:justify-between items-start md:items-center pb-3 border-b border-dkv-gray-border/50">
                        <span className="font-bold text-dkv-gray">Fase Quirúrgica <span className="font-normal block text-sm text-dkv-gray/80">2 Implantes de titanio (2 x 550 €)</span></span>
                        <span className="font-lemon text-lg text-dkv-green-dark shrink-0">1.100 €</span>
                      </li>
                      <li className="flex flex-col md:flex-row md:justify-between items-start md:items-center pb-3 border-b border-dkv-gray-border/50">
                        <span className="font-bold text-dkv-gray">Fijaciones de Precisión <span className="font-normal block text-sm text-dkv-gray/80">2 Sistemas de anclaje tipo Locator/Bolas (2 x 230 €)</span></span>
                        <span className="font-lemon text-lg text-dkv-green-dark shrink-0">460 €</span>
                      </li>
                      <li className="flex flex-col md:flex-row md:justify-between items-start md:items-center">
                        <span className="font-bold text-dkv-gray">La Prótesis <span className="font-normal block text-sm text-dkv-gray/80">Sobredentadura reforzada completa</span></span>
                        <span className="font-lemon text-lg text-dkv-green-dark shrink-0">890 €</span>
                      </li>
                    </ul>
                  </div>
                </TreatmentRow>
              </ScrollReveal>


              {/* SECCIÓN TRATAMIENTOS ADICIONALES */}
              <ScrollReveal delay={200} direction="up">
                <div className="mt-16 mb-8 text-center md:text-left">
                  <span className="text-dkv-green font-bold text-lg uppercase tracking-[0.2em] font-fsme">Según Valoración Clínica</span>
                  <h3 className="text-2xl font-bold font-lemon text-dkv-green-dark border-b-2 border-dkv-green pb-3 inline-block w-full mt-2 uppercase tracking-wide">
                    Tratamientos Adicionales Posibles
                  </h3>
                  <p className="text-dkv-gray mt-4 font-fsme text-lg">
                    Para que una sobredentadura sea cómoda y duradera, la anatomía sobre la que se apoya debe ser la adecuada. El cirujano valorará si requieres alguno de estos ajustes.
                  </p>
                </div>
                
                {/* Ficha Encía */}
                <TreatmentRow id="vestibuloplastia" name="Adecuación de la Encía (Vestibuloplastia)">
                  <div className="mb-6">
                    <p className="mb-4">Falta de encía dura (queratinizada): Si la encía que recubre tu hueso es muy fina y se mueve mucho, los implantes pueden sufrir. En ese caso, necesitamos realizar una pequeña cirugía para crear un entorno de encía fuerte y evitar que la musculatura del labio tire de la prótesis al hablar.</p>
                    <div className="bg-dkv-gray-light/30 rounded-2xl p-5 border border-dkv-gray-border">
                      <ul className="space-y-4">
                        <li className="flex justify-between items-center">
                          <span className="font-bold text-dkv-gray">Vestibuloplastia <span className="text-sm font-normal text-dkv-gray/80">(por cuadrante)</span></span>
                          <span className="font-lemon text-lg text-dkv-green-dark">75 €</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </TreatmentRow>

                {/* Ficha Aumento de anclajes */}
                <div className="mt-8">
                  <TreatmentRow id="aumento-anclajes" name="Aumento de Estabilidad (4 Implantes)">
                    <p className="mb-4">Si muerdes con mucha fuerza, eres un paciente corpulento, o la prótesis va a ir colocada en el <strong>maxilar superior</strong> (que tiene un hueso más blando), el doctor te recomendará colocar 4 implantes en lugar de 2 para garantizar que la prótesis no bascule bajo ningún concepto.</p>
                    <div className="bg-dkv-green/5 rounded-2xl p-5 border border-dkv-green/20 flex items-start gap-3">
                      <ShieldCheck className="w-6 h-6 text-dkv-green shrink-0 mt-0.5" />
                      <p className="text-dkv-gray font-fsme text-sm">
                        En este caso, al presupuesto base sencillamente habría que sumarle el coste de los 2 implantes adicionales (+1.100 €) y sus respectivos 2 anclajes Locator (+460 €).
                      </p>
                    </div>
                  </TreatmentRow>
                </div>

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
                      La información reflejada en esta página tiene mero carácter orientativo. El diagnóstico clínico que determinará si tu hueso es apto para 2 o 4 implantes únicamente te lo podrá proporcionar un especialista.
                    </p>
                  </div>
                  <p className="text-lg text-dkv-gray mb-6">
                    Te invitamos a solicitar una cita gratuita de valoración. Analizaremos tu boca y te daremos el presupuesto exacto para que vuelvas a morder con seguridad. Encuentra tu centro:
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
