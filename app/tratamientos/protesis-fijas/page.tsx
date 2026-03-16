// app/tratamientos/protesis/fijas/page.tsx

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

import { Info, ShieldCheck, Sparkles, Diamond, Layers, CheckCircle2 } from "lucide-react"; 

export const metadata: Metadata = {
  title: "Prótesis Fijas y Coronas Dentales | Precios DKV Dentisalud",
  description: "Dientes artificiales que no se quitan. Coronas de zirconio, puentes de porcelana y restauraciones estéticas con tarifas exclusivas DKV.",
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

export default function ProtesisFijasPage() {
  const breadcrumbs = [
    { label: "Inicio", href: "/" },
    { label: "Tratamientos", href: "/tratamientos" },
    { label: "Prótesis y Rehabilitación", href: "/tratamientos/protesis" },
    { label: "Prótesis Fijas", href: "#" }
  ];

  return (
    <div className="min-h-screen bg-white font-fsme text-dkv-gray selection:bg-dkv-green selection:text-white pb-32">
      <CookieBanner />
      <Header />

      <main className="pt-[30px] md:pt-[110px] lg:pt-[130px]">
        <FixedBreadcrumb items={breadcrumbs} behavior="smart" />

        <TreatmentsHero 
          badgeText="Dientes que no se quitan"
          title={{ dark: "PRÓTESIS", normal: "FIJAS" }} 
          description={[
            "Son dientes artificiales (coronas o fundas) y puentes que van pegados firmemente a tus propios dientes naturales previamente limados, o a raíces muy dañadas.",
            "No te los tienes que quitar nunca; los cepillas y los sientes como si fueran tuyos."
          ]}
        />

        {/* Asegúrate de que tu StickySubNav acepte "fija" como ID en el cluster de prótesis */}
        <StickySubNav activeId="fija" />

        <section className="bg-dkv-gray-border/30 pt-12 pb-20">
          <div className="container mx-auto px-4 max-w-4xl flow-root">

            <div className="space-y-8">
              
              {/* INTRODUCCIÓN CLÍNICA */}
              <ScrollReveal delay={100} direction="up">
                <div className="mb-8 text-center md:text-left">
                  <span className="text-dkv-green font-bold text-lg uppercase tracking-[0.2em] font-fsme">Soluciones Definitivas</span>
                  <h3 className="text-2xl font-bold font-lemon text-dkv-green-dark border-b-2 border-dkv-green pb-3 inline-block w-full mt-2 uppercase tracking-wide">
                    Coronas y Puentes
                  </h3>
                  <p className="text-dkv-gray mt-4 font-fsme text-lg">
                    Perder dientes o tenerlos muy desgastados no solo afecta a tu estética, sino que envejece tu rostro y arruina tus digestiones. Te ofrecemos un abanico de soluciones fijas adaptadas a todas las necesidades (estéticas o de fuerza) y presupuestos.
                  </p>
                </div>
              </ScrollReveal>

              {/* Ficha 1: Alta Estética (Sin Metal) */}
              <ScrollReveal delay={200} direction="up">
                <TreatmentRow 
                    id="alta-estetica" 
                    name="Coronas y Puentes de Alta Estética (Sin metal)" 
                    price="Desde 299 €"
                  >
                  <p><strong>Motivo:</strong> Necesitas cubrir un diente muy dañado, pero está en una zona visible y quieres que nadie note que es falso.</p>
                  <p><strong>Cómo se hace:</strong> Tallamos un poco tu diente, tomamos medidas exactas y el laboratorio crea una funda o "corona" que encaja a la perfección, imitando la luz y textura natural.</p>
                  
                  <div className="bg-dkv-gray-light/30 rounded-2xl p-5 border border-dkv-gray-border mt-4">
                    <ul className="space-y-4">
                      <li className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-dkv-gray-border/50">
                        <div>
                          <span className="font-bold text-dkv-gray flex items-center gap-2"><Sparkles className="w-4 h-4 text-dkv-green"/> Corona de cerámica sin metal</span>
                          <span className="font-normal text-sm text-dkv-gray/80 block mt-1">(tipo Empress, Captek, etc.). Deja pasar la luz natural, ideal para dientes frontales.</span>
                        </div>
                        <span className="font-lemon text-xl text-dkv-green-dark shrink-0 mt-2 md:mt-0">299 €</span>
                      </li>
                      <li className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div>
                          <span className="font-bold text-dkv-gray flex items-center gap-2"><Diamond className="w-4 h-4 text-dkv-green"/> Corona o puente fijo de Zirconio</span>
                          <span className="font-normal text-sm text-dkv-gray/80 block mt-1">El material más duro y blanco del mercado. No oscurece la encía con el tiempo.</span>
                        </div>
                        <span className="font-lemon text-xl text-dkv-green-dark shrink-0 mt-2 md:mt-0">325 €</span>
                      </li>
                    </ul>
                  </div>
                </TreatmentRow>
              </ScrollReveal>

              {/* Ficha 2: Coronas Clásicas (Con Metal) */}
              <ScrollReveal delay={300} direction="up">
                <TreatmentRow 
                    id="clasicas-metal" 
                    name="Coronas y Puentes Clásicos (Con base de metal)" 
                    price="Desde 100 €"
                  >
                  <p><strong>Motivo:</strong> Buscas máxima resistencia para masticar en las muelas del fondo, o tienes un presupuesto más ajustado y la estética perfecta no es tu máxima prioridad.</p>
                  
                  <div className="bg-dkv-gray-light/30 rounded-2xl p-5 border border-dkv-gray-border mt-4">
                    <ul className="space-y-4">
                      <li className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-dkv-gray-border/50">
                        <div>
                          <span className="font-bold text-dkv-gray">Corona o puente de metal noble/seminoble con porcelana</span>
                          <span className="font-normal text-sm text-dkv-gray/80 block mt-1">El interior es de metal para aguantar la fuerza extrema, y el exterior está recubierto de porcelana blanca.</span>
                        </div>
                        <span className="font-lemon text-xl text-dkv-green-dark shrink-0 mt-2 md:mt-0">210 €</span>
                      </li>
                      <li className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-dkv-gray-border/50">
                        <div>
                          <span className="font-bold text-dkv-gray">Corona o puente metal-resina</span>
                          <span className="font-normal text-sm text-dkv-gray/80 block mt-1">Más económico. El exterior está cubierto de resina estética en lugar de cerámica.</span>
                        </div>
                        <span className="font-lemon text-xl text-dkv-green-dark shrink-0 mt-2 md:mt-0">144 €</span>
                      </li>
                      <li className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div>
                          <span className="font-bold text-dkv-gray">Corona o puente colada de metal</span>
                          <span className="font-normal text-sm text-dkv-gray/80 block mt-1">Totalmente metálicas. Usadas solo en casos muy específicos o muelas muy escondidas.</span>
                        </div>
                        <span className="font-lemon text-xl text-dkv-green-dark shrink-0 mt-2 md:mt-0">100 €</span>
                      </li>
                    </ul>
                  </div>
                </TreatmentRow>
              </ScrollReveal>

              {/* Ficha 3: Restauraciones e Incrustaciones */}
              <ScrollReveal delay={150} direction="up">
                <TreatmentRow 
                    id="restauraciones" 
                    name="Soluciones para dientes muy rotos (Restauraciones)" 
                  >
                  <p>A veces el daño es extenso, pero aún podemos salvar tu raíz original en lugar de extraerla.</p>
                  
                  <div className="bg-dkv-gray-light/30 rounded-2xl p-5 border border-dkv-gray-border mt-4">
                    <ul className="space-y-4">
                      <li className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-dkv-gray-border/50">
                        <div>
                          <span className="font-bold text-dkv-gray flex items-center gap-2"><Layers className="w-4 h-4 text-dkv-green"/> Muñón colado</span>
                          <span className="font-normal text-sm text-dkv-gray/80 block mt-1">Cuando el diente está tan roto que no queda casi nada, fabricamos un "pilar" a medida que se mete en la raíz para luego poder pegar una corona encima.</span>
                        </div>
                        <span className="font-lemon text-xl text-dkv-green-dark shrink-0 mt-2 md:mt-0">65 €</span>
                      </li>
                      <li className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div>
                          <span className="font-bold text-dkv-gray flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-dkv-green"/> Incrustación de resina (65 €) o composite (72 €)</span>
                          <span className="font-normal text-sm text-dkv-gray/80 block mt-1">Cuando un empaste es demasiado grande y se caería, el laboratorio fabrica el "trozo de muela" exacto que te falta y nosotros lo encajamos como la pieza de un puzle.</span>
                        </div>
                        <span className="font-lemon text-xl text-dkv-green-dark shrink-0 mt-2 md:mt-0">Desde 65 €</span>
                      </li>
                    </ul>
                  </div>
                </TreatmentRow>
              </ScrollReveal>

              {/* Ficha 4: Suplementos Especiales */}
              <ScrollReveal delay={250} direction="up">
                <TreatmentRow 
                    id="suplementos-fijos" 
                    name="Suplementos Especiales y Refuerzos" 
                  >
                  <p>Técnicas avanzadas para dar soporte o evitar dañar piezas sanas en casos concretos.</p>
                  
                  <div className="bg-dkv-gray-light/30 rounded-2xl p-5 border border-dkv-gray-border mt-4">
                    <ul className="space-y-4">
                      <li className="flex justify-between items-center pb-4 border-b border-dkv-gray-border/50">
                        <div>
                          <span className="font-bold text-dkv-gray">Puente tipo Maryland</span>
                          <span className="font-normal text-sm text-dkv-gray/80 block mt-1">Un suplemento para pegar un diente falso apoyándose en la parte trasera de los dientes vecinos mediante unas "aletas", sin tener que limarlos apenas.</span>
                        </div>
                        <span className="font-lemon text-xl text-dkv-green-dark shrink-0 ml-4">70 €</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <div>
                          <span className="font-bold text-dkv-gray">Barra de Ackerman</span>
                          <span className="font-normal text-sm text-dkv-gray/80 block mt-1">Una barra de metal que une varias raíces o implantes para dar muchísima firmeza a una prótesis.</span>
                        </div>
                        <span className="font-lemon text-xl text-dkv-green-dark shrink-0 ml-4">70 €</span>
                      </li>
                    </ul>
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
                      La información reflejada en esta página tiene mero carácter orientativo. Para asegurar qué tipo de corona (zirconio vs metal-cerámica) requiere tu caso o si podemos salvar tu raíz con una incrustación, es imprescindible una valoración clínica.
                    </p>
                  </div>
                  <p className="text-lg text-dkv-gray mb-6">
                    Solicita tu cita de valoración en tu clínica más cercana. Analizaremos tu boca y te ofreceremos la solución fija más resistente y estética para ti.
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
