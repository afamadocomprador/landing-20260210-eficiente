// app/tratamientos/ortodoncia/metalica/page.tsx

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
  title: "Ortodoncia Fija Metálica | Precios Cerrados DKV Dentisalud",
  description: "Tratamientos de ortodoncia metálica convencional y autoligable. Eficacia probada y durabilidad con precios exclusivos para asegurados DKV.",
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

export default function OrtodonciaMetalicaPage() {
  const breadcrumbs = [
    { label: "Inicio", href: "/" },
    { label: "Tratamientos", href: "/tratamientos" },
    { label: "Ortodoncia", href: "/tratamientos/ortodoncia" },
    { label: "Metálica", href: "#" }
  ];

  return (
    <div className="min-h-screen bg-white font-fsme text-dkv-gray selection:bg-dkv-green selection:text-white pb-32">
      <CookieBanner />
      <Header />

      <main className="pt-[30px] md:pt-[110px] lg:pt-[130px]">
        <FixedBreadcrumb items={breadcrumbs} behavior="smart" />

        <TreatmentsHero 
          badgeText="Ortodoncia Tradicional"
          title={{ dark: "ORTODONCIA FIJA", normal: "METÁLICA" }} 
          description={[
            "El sistema más robusto y de eficacia probada. Perfecto para corregir cualquier tipo de maloclusión garantizando la máxima durabilidad.",
          ]}
        />

        {/* ⚡️ Inyección del menú transversal corregido */}
        <StickySubNav activeId="lingual" />

        <section className="bg-dkv-gray-border/30 pt-12 pb-20">
          <div className="container mx-auto px-4 max-w-4xl flow-root">

            <div className="space-y-8">
              {/* Ficha 1: Metálicos Convencionales */}
              <ScrollReveal delay={100} direction="up">
                <TreatmentRow 
                    id="metalicos" 
                    name="Brackets Metálicos Convencionales" 
                    image="/images/tratamientos/ortodoncia-brackets-metalico-standard.png"
                    secondaryImage="/images/tratamientos/ortodoncia-brackets-metalico-standard-un-diente.png"
                  >
                  <p>El sistema tradicional, más robusto y económico. Perfecto para corregir cualquier tipo de maloclusión, muy utilizado en adolescentes por su durabilidad.</p>
                  
                  <div className="bg-dkv-gray-light/30 rounded-2xl p-5 border border-dkv-gray-border mt-4">
                    <ul className="space-y-4">
                      <li className="flex flex-col md:flex-row md:justify-between items-start md:items-center pb-3 border-b border-dkv-gray-border/50">
                        <span className="font-bold text-dkv-gray">Aparato por maxilar</span>
                        <span className="font-lemon text-lg text-dkv-green-dark shrink-0">298 €</span>
                      </li>
                      <li className="flex flex-col md:flex-row md:justify-between items-start md:items-center">
                        <span className="font-medium text-dkv-gray/80 italic text-sm">Tratamientos asociados: Visitas de revisión (30€) y reposición de bracket (20€).</span>
                      </li>
                    </ul>
                  </div>
                </TreatmentRow>
              </ScrollReveal>

              {/* Ficha 2: Metálicos Autoligables */}
              <ScrollReveal delay={150} direction="up">
                <TreatmentRow 
                      id="autoligables" 
                      name="Brackets Metálicos Autoligables" 
                      image="/images/tratamientos/ortodoncia-brackets-metalico-autoligable.png"
                      secondaryImage="/images/tratamientos/ortodoncia-brackets-metalico-autoligable-un-diente.png"
                >
                  <p>Una evolución tecnológica del bracket metálico tradicional que prescinde de ataduras.</p>
                  <p><strong>Por qué elegirlo:</strong> Poseen una pequeña "compuerta" que sujeta el arco, eliminando las gomitas elásticas. Esto reduce la fricción, aplica fuerzas más biológicas y facilita enormemente el cepillado diario.</p>
                  <div className="bg-dkv-gray-light/30 rounded-2xl p-5 border border-dkv-gray-border mt-4">
                    <ul className="space-y-4">
                      <li className="flex flex-col md:flex-row md:justify-between items-start md:items-center pb-3 border-b border-dkv-gray-border/50">
                        <span className="font-bold text-dkv-gray">Aparato por maxilar</span>
                        <span className="font-lemon text-lg text-dkv-green-dark shrink-0">298 €</span>
                      </li>
                      <li className="flex flex-col md:flex-row md:justify-between items-start md:items-center pb-3 border-b border-dkv-gray-border/50">
                        <span className="font-bold text-dkv-gray">Suplemento autoligable (por maxilar)</span>
                        <span className="font-lemon text-lg text-dkv-green-dark shrink-0">140 €</span>
                      </li>
                      <li className="flex flex-col md:flex-row md:justify-between items-start md:items-center">
                        <span className="font-medium text-dkv-gray/80 italic text-sm">Tratamientos asociados: Visitas de revisión (30€) y reposición de bracket (20€).</span>
                      </li>
                    </ul>
                  </div>
                </TreatmentRow>
              </ScrollReveal>

              {/* Ficha 3: Diagnóstico y Retención (Cierre del proceso clínico) */}
              <ScrollReveal delay={200} direction="up">
                <div className="mt-16 mb-8 text-center md:text-left">
                  <span className="text-dkv-green font-bold text-lg uppercase tracking-[0.2em] font-fsme">Requisito Clínico</span>
                  <h3 className="text-2xl font-bold font-lemon text-dkv-green-dark border-b-2 border-dkv-green pb-3 inline-block w-full mt-2 uppercase tracking-wide">
                    Diagnóstico y Retención
                  </h3>
                  <p className="text-dkv-gray mt-4 font-fsme text-lg">Estos procedimientos son el inicio y el fin necesario para que tu tratamiento sea un éxito a largo plazo.</p>
                </div>
                
                <TreatmentRow id="diagnostico" name="Diagnóstico Preciso y Estabilización Final">
                  <div className="mb-6">
                    <h3 className="text-dkv-green-dark font-bold font-lemon text-sm uppercase mb-3">Diagnóstico Ortodóntico Inicial</h3>
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
                    <h3 className="text-dkv-green-dark font-bold font-lemon text-sm uppercase mb-3">Estabilización y Mantenimiento</h3>
                    <p className="text-sm italic mb-4">Los dientes tienen memoria y tienden a moverse al retirar los aparatos.</p>
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
                  <h2 className="text-3xl font-lemon text-dkv-green-dark mb-4">Planifica tu tratamiento</h2>
                  <div className="bg-dkv-gray-light p-4 rounded-xl border border-dkv-gray-border/50 mb-8 flex items-start gap-3">
                    <Info className="w-5 h-5 text-dkv-green shrink-0 mt-0.5" />
                    <p className="text-lg text-dkv-gray font-fsme leading-relaxed">
                      La información reflejada en esta página tiene mero carácter orientativo. El diagnóstico profesional que necesitas únicamente te lo podrá proporcionar un dentista en su consulta.
                    </p>
                  </div>
                  <p className="text-lg text-dkv-gray mb-6">
                    Te invitamos a solicitar una cita de valoración en uno de nuestros centros dentales para estudiar tu caso, y ofrecerte el plan exacto que se requiere para alinear tu sonrisa. Encuentra tu centro:
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
