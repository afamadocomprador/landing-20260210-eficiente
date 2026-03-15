// app/tratamientos/odontologia-conservadora/endodoncias/page.tsx

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

import { Info, Activity, HeartPulse, Stethoscope, Diamond, Microscope, Zap, CheckCircle2 } from "lucide-react"; 

export const metadata: Metadata = {
  title: "Endodoncias y Tratamiento de Conductos | DKV Dentisalud",
  description: "Salvamos tu diente cuando el dolor no te deja dormir. Endodoncias, urgencias y endodoncia microscópica exclusiva en Centros Propios DKV.",
};

// --- Componente Ficha de Tratamiento Estándar ---
const TreatmentRow = ({ id, name, price, image, imageAlt, titleTag = "h2", children }: any) => {
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
        <div className="mb-6 w-full overflow-hidden rounded-xl border border-gray-100 bg-gray-50/50 flex justify-center py-4">
          <img 
            src={image} 
            alt={imageAlt || name} 
            className="w-full h-auto object-contain max-h-[200px] md:max-h-[300px] transition-transform duration-700 hover:scale-105"
            loading="lazy"
          />
        </div>
      )}
      
      <div className="text-dkv-gray font-fsme leading-relaxed text-lg md:text-lg space-y-4">
        {children}
      </div>
    </div>
  );
};

export default function EndodonciasPage() {
  const breadcrumbs = [
    { label: "Inicio", href: "/" },
    { label: "Tratamientos", href: "/tratamientos" },
    { label: "Odontología Conservadora", href: "/tratamientos/odontologia-conservadora" },
    { label: "Endodoncias", href: "#" }
  ];

  return (
    <div className="min-h-screen bg-white font-fsme text-dkv-gray selection:bg-dkv-green selection:text-white pb-32">
      <CookieBanner />
      <Header />

      <main className="pt-[30px] md:pt-[110px] lg:pt-[130px]">
        <FixedBreadcrumb items={breadcrumbs} behavior="smart" />

        <TreatmentsHero 
          badgeText="Cuando el dolor no te deja dormir"
          title={{ dark: "TRATAMIENTO DE", normal: "ENDODONCIA" }} 
          description={[
            "El objetivo es salvar un diente en el que la caries ha llegado hasta el centro (la pulpa o nervio), causando una infección y ese dolor punzante y terrible que no se va con analgésicos.",
            "Te explicamos cada paso del camino para conservar tu sonrisa sana y sin dolor."
          ]}
        />

        {/* El StickySubNav requerirá que añadas el cluster de conservadora en el futuro */}
        <StickySubNav activeId="endodoncias" />

        <section className="bg-dkv-gray-border/30 pt-12 pb-20">
          <div className="container mx-auto px-4 max-w-4xl flow-root">
            <div className="space-y-8">

              {/* Ficha 1: Urgencia */}
              <ScrollReveal delay={100} direction="up">
                <TreatmentRow id="urgencias" name="Pulpectomía de urgencias (incluye curas)" price="30 €">
                  <div className="flex items-center gap-2 mb-2 text-dkv-green">
                     <HeartPulse className="w-5 h-5" />
                     <span className="font-bold tracking-widest text-xs uppercase">El alivio inmediato</span>
                  </div>
                  <p>Si llegas a la clínica de urgencia llorando de dolor, te anestesiamos, abrimos el diente y sacamos la parte superior del nervio infectado. <strong>El dolor desaparece al instante.</strong> La endodoncia definitiva se terminará en una cita posterior.</p>
                </TreatmentRow>
              </ScrollReveal>

              {/* Ficha 2: Endodoncias (Con lista de precios integrada) */}
              <ScrollReveal delay={200} direction="up">
                <TreatmentRow 
                    id="tratamiento-conductos" 
                    name="El Tratamiento de Conductos Definitivo" 
                    image="/images/endodoncia.png" 
                    imageAlt="Esquema de una endodoncia completa en un diente"
                  >
                  <p className="mb-6">
                    Conocido coloquialmente como "matar el nervio". La técnica consiste en vaciar las raíces del diente, desinfectarlas por dentro y rellenarlas con un material plástico (gutapercha) para que las bacterias no vuelvan a entrar. El precio depende del número de raíces que tenga el diente:
                  </p>

                  <div className="bg-dkv-gray-light/30 rounded-2xl p-5 md:p-6 border border-dkv-gray-border">
                    <ul className="space-y-5">
                      <li className="pb-4 border-b border-dkv-gray-border/50">
                        <h2 className="flex flex-row justify-between items-start gap-4 mb-1.5">
                          <span className="font-bold text-dkv-gray text-base md:text-lg leading-tight">Endodoncia (un conducto)</span>
                          <span className="font-lemon text-lg md:text-xl text-dkv-green-dark font-bold shrink-0 mt-0.5">80 €</span>
                        </h2>
                        <p className="text-sm md:text-base text-dkv-gray/80 italic pr-12">Normalmente para los incisivos y caninos, que solo tienen una raíz.</p>
                      </li>
                      <li className="pb-4 border-b border-dkv-gray-border/50">
                        <h2 className="flex flex-row justify-between items-start gap-4 mb-1.5">
                          <span className="font-bold text-dkv-gray text-base md:text-lg leading-tight">Endodoncia (dos conductos)</span>
                          <span className="font-lemon text-lg md:text-xl text-dkv-green-dark font-bold shrink-0 mt-0.5">94 €</span>
                        </h2>
                        <p className="text-sm md:text-base text-dkv-gray/80 italic pr-12">Usada habitualmente para los dientes premolares.</p>
                      </li>
                      <li>
                        <h2 className="flex flex-row justify-between items-start gap-4 mb-1.5">
                          <span className="font-bold text-dkv-gray text-base md:text-lg leading-tight">Endodoncia (tres conductos o más)</span>
                          <span className="font-lemon text-lg md:text-xl text-dkv-green-dark font-bold shrink-0 mt-0.5">123 €</span>
                        </h2>
                        <p className="text-sm md:text-base text-dkv-gray/80 italic pr-12">Para las grandes muelas del fondo, que son más difíciles y laboriosas de tratar.</p>
                      </li>
                    </ul>
                    
                    <div className="mt-6 pt-5 border-t-2 border-dkv-gray-border">
                      <div className="bg-white p-4 md:p-5 rounded-xl shadow-sm border border-dkv-gray-border/50">
                        <h2 className="flex flex-row justify-between items-start gap-4 mb-2">
                          <span className="flex items-start gap-2 font-bold text-dkv-green-dark text-base md:text-lg leading-tight">
                            <Stethoscope className="w-5 h-5 text-dkv-green shrink-0 mt-0.5" />
                            <span>Suplemento sistema rotatorio</span>
                          </span>
                          <span className="font-lemon text-lg md:text-xl text-dkv-green font-bold shrink-0 mt-0.5">15 €</span>
                        </h2>
                        <p className="text-sm md:text-base text-dkv-gray leading-relaxed pl-7"><strong>El beneficio:</strong> En lugar de limpiar las raíces a mano con pequeñas limas, usamos un motor de precisión con limas súper flexibles. Limpia mejor, más rápido, y llega a las curvas más difíciles de tus raíces, asegurando el éxito del tratamiento.</p>
                      </div>
                    </div>
                  </div>
                </TreatmentRow>
              </ScrollReveal>

              {/* 💎 BLOQUE PREMIUM: ENDODONCIA MICROSCÓPICA */}
              <ScrollReveal delay={150} direction="up">
                <div id="microscopio" className="bg-gradient-to-br from-slate-900 to-[#022A27] rounded-2xl md:rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden mt-8 mb-4 scroll-mt-[220px] text-white">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Microscope className="w-32 h-32 text-[#D4AF37]" />
                  </div>
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#D4AF37] opacity-10 blur-[80px] rounded-full"></div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <Diamond className="w-6 h-6 text-[#D4AF37]" />
                      <span className="text-[#D4AF37] font-bold text-sm md:text-base uppercase tracking-[0.2em] font-fsme">Upgrade Premium</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-lemon mb-4 uppercase tracking-wide">
                      Endodoncia Microscópica
                    </h2>
                    <div className="inline-block bg-[#D4AF37]/20 border border-[#D4AF37]/40 px-4 py-1.5 rounded-full text-sm font-bold text-[#D4AF37] mb-6 uppercase tracking-widest">
                      Exclusivo en Centros Propios Especiales
                    </div>

                    <p className="font-fsme text-lg mb-6 text-white/90 leading-relaxed max-w-2xl">
                      Las raíces de los dientes son conductos más finos que un cabello humano, y muchas veces están escondidos, curvados o calcificados. Trabajar a simple vista o con gafas lupa normales tiene sus límites.
                    </p>

                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm mt-6">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 mb-4 border-b border-white/10">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-6 h-6 text-[#D4AF37] shrink-0" />
                          <h3 className="font-bold text-lg text-white">Suplemento por utilización de microscopía</h3>
                        </div>
                        <span className="bg-[#D4AF37] text-slate-900 px-4 py-1.5 rounded-full text-xl font-lemon font-bold mt-4 md:mt-0">
                          Incluido (0 €)
                        </span>
                      </div>
                      
                      <p className="text-white/80 font-fsme leading-relaxed">
                        <strong>¿Por qué es un salto de calidad brutal?</strong> En nuestros centros especiales, realizamos la endodoncia utilizando un Microscopio Clínico Operatorio que amplía la visión hasta 20 o 30 veces. Nos permite encontrar micro-conductos que de otra forma pasarían desapercibidos (y que causarían dolor en el futuro), limpiar con una precisión absoluta y salvar dientes que en otras clínicas estarían desahuciados. <strong>Y lo mejor de todo: este despliegue tecnológico no tiene coste adicional para ti.</strong>
                      </p>
                    </div>
                  </div>
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
                  <h2 className="text-3xl font-lemon text-dkv-green-dark mb-4">No sufras innecesariamente</h2>
                  <div className="bg-dkv-gray-light p-4 rounded-xl border border-dkv-gray-border/50 mb-8 flex items-start gap-3">
                    <Info className="w-5 h-5 text-dkv-green shrink-0 mt-0.5" />
                    <p className="text-lg text-dkv-gray font-fsme leading-relaxed">
                      Si el dolor te despierta por la noche o necesitas tomar analgésicos constantemente, tu nervio dental necesita ayuda urgente. Un diagnóstico a tiempo salvará la muela de la extracción.
                    </p>
                  </div>
                  <p className="text-lg text-dkv-gray mb-6">
                    Te invitamos a solicitar una cita de valoración en uno de nuestros centros dentales para estudiar tu caso y aliviar tu dolor inmediatamente. Encuentra tu centro:
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
