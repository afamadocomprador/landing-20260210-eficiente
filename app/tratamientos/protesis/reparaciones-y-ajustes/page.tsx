// app/tratamientos/protesis/reparaciones-y-ajustes/page.tsx

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

import { Info, ShieldCheck, Settings, CheckCircle2, Zap, Layers } from "lucide-react"; 

export const metadata: Metadata = {
  title: "Reparaciones y Ajustes de Prótesis Dentales | DKV Dentisalud",
  description: "Arreglamos coronas desconchadas, puentes caídos, aparatos partidos y realizamos rebases. Taller dental con tarifas reducidas para asegurados DKV.",
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

export default function ReparacionesAjustesPage() {
  const breadcrumbs = [
    { label: "Inicio", href: "/" },
    { label: "Tratamientos", href: "/tratamientos" },
    { label: "Prótesis y Rehabilitación", href: "/tratamientos/protesis" },
    { label: "Reparaciones y Ajustes", href: "#" }
  ];

  return (
    <div className="min-h-screen bg-white font-fsme text-dkv-gray selection:bg-dkv-green selection:text-white pb-32">
      <CookieBanner />
      <Header />

      <main className="pt-[30px] md:pt-[110px] lg:pt-[130px]">
        <FixedBreadcrumb items={breadcrumbs} behavior="smart" />

        <TreatmentsHero 
          badgeText="Tu Taller Dental"
          title={{ dark: "REPARACIONES Y", normal: "AJUSTES" }} 
          description={[
            "Tu boca cambia (la encía adelgaza con los años) y a veces las cosas se rompen o se aflojan.",
            "No siempre hay que hacer un aparato o corona nueva; la mayoría de las veces nuestro taller puede arreglarlo de forma rápida y económica."
          ]}
        />

        <StickySubNav activeId="reparaciones" />

        <section className="bg-dkv-gray-border/30 pt-12 pb-20">
          <div className="container mx-auto px-4 max-w-4xl flow-root">

            <div className="space-y-8">
              
              {/* INTRODUCCIÓN CLÍNICA */}
              <ScrollReveal delay={100} direction="up">
                <div className="mb-8 text-center md:text-left">
                  <span className="text-dkv-green font-bold text-lg uppercase tracking-[0.2em] font-fsme">Mantenimiento y Urgencias</span>
                  <h3 className="text-2xl font-bold font-lemon text-dkv-green-dark border-b-2 border-dkv-green pb-3 inline-block w-full mt-2 uppercase tracking-wide">
                    Cuidamos de tu Prótesis
                  </h3>
                  <p className="text-dkv-gray mt-4 font-fsme text-lg">
                    Un aparato de resina que se cae al lavabo, un puente que se despegó comiendo o una funda a la que se le saltó la cerámica. Son urgencias cotidianas que resolvemos a diario devolviéndole a tu prótesis su función original.
                  </p>
                </div>
              </ScrollReveal>

              {/* Ficha 1: Coronas y Puentes Fijos */}
              <ScrollReveal delay={200} direction="up">
                <TreatmentRow 
                    id="reparacion-fija" 
                    name="Ajustes y Reparaciones de Prótesis Fijas" 
                  >
                  <p>Soluciones para coronas y puentes que han sufrido una fractura estética o que simplemente necesitan ser vueltos a cementar.</p>
                  
                  <div className="bg-dkv-gray-light/30 rounded-2xl p-5 border border-dkv-gray-border mt-4">
                    <ul className="space-y-4">
                      <li className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-dkv-gray-border/50">
                        <div>
                          <span className="font-bold text-dkv-gray flex items-center gap-2"><Zap className="w-4 h-4 text-dkv-green"/> Cementación de coronas y puentes caídos</span>
                          <span className="font-normal text-sm text-dkv-gray/80 block mt-1">Si se te ha despegado una funda que está en buen estado, te la volvemos a pegar con un cemento especial de alta resistencia.</span>
                        </div>
                        <span className="font-lemon text-xl text-dkv-green-dark shrink-0 mt-2 md:mt-0">22 €</span>
                      </li>
                      <li className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-dkv-gray-border/50">
                        <div>
                          <span className="font-bold text-dkv-gray flex items-center gap-2"><Settings className="w-4 h-4 text-dkv-green"/> Soldar metal</span>
                          <span className="font-normal text-sm text-dkv-gray/80 block mt-1">Para puentes o esqueléticos que han sufrido una fractura en su estructura interna.</span>
                        </div>
                        <span className="font-lemon text-xl text-dkv-green-dark shrink-0 mt-2 md:mt-0">36 €</span>
                      </li>
                      <li className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-dkv-gray-border/50">
                        <div>
                          <span className="font-bold text-dkv-gray flex items-center gap-2"><Layers className="w-4 h-4 text-dkv-green"/> Reparaciones de facetas estéticas</span>
                          <span className="font-normal text-sm text-dkv-gray/80 block mt-1">Si se te ha "desconchado" la capa blanca visible de una corona, la reparamos sin tener que cambiarla entera.</span>
                        </div>
                        <div className="flex flex-col text-right shrink-0 mt-2 md:mt-0">
                          <span className="font-lemon text-lg text-dkv-green-dark">Porcelana: 45 €</span>
                          <span className="font-lemon text-lg text-dkv-green-dark">Cerámica: 50 €</span>
                          <span className="font-lemon text-lg text-dkv-green-dark">Resina: 43 €</span>
                        </div>
                      </li>
                      <li className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div>
                          <span className="font-bold text-dkv-gray flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-dkv-green"/> Ajustes oclusales en prótesis ya colocadas</span>
                          <span className="font-normal text-sm text-dkv-gray/80 block mt-1">Ligeros pulidos si notas que la corona choca de forma extraña al morder.</span>
                        </div>
                        <span className="font-lemon text-xl text-dkv-green-dark shrink-0 mt-2 md:mt-0">Incluido (0 €)</span>
                      </li>
                    </ul>
                  </div>
                </TreatmentRow>
              </ScrollReveal>

              {/* Ficha 2: Roturas en Removibles */}
              <ScrollReveal delay={300} direction="up">
                <TreatmentRow 
                    id="reparacion-removible" 
                    name="Arreglos en Aparatos Removibles" 
                  >
                  <p>Cuando un aparato de "quita y pon" se parte, pierde un gancho o cuando necesitas añadirle un diente nuevo a tu prótesis actual.</p>
                  
                  <div className="bg-dkv-gray-light/30 rounded-2xl p-5 border border-dkv-gray-border mt-4">
                    <ul className="space-y-4">
                      <li className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-dkv-gray-border/50">
                        <div>
                          <span className="font-bold text-dkv-gray">Añadir una pieza o gancho al aparato</span>
                          <span className="font-normal text-sm text-dkv-gray/80 block mt-1">Si pierdes un diente natural más, o se rompe una sujeción, se lo añadimos a la prótesis que ya tienes.</span>
                        </div>
                        <span className="font-lemon text-xl text-dkv-green-dark shrink-0 mt-2 md:mt-0">49 €</span>
                      </li>
                      <li className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-dkv-gray-border/50">
                        <div>
                          <span className="font-bold text-dkv-gray">Compostura en aparato partido de resina</span>
                          <span className="font-normal text-sm text-dkv-gray/80 block mt-1">Para cuando el aparato de resina acrílica sufre un golpe (típica caída al lavabo al limpiarlo) y se parte.</span>
                        </div>
                        <span className="font-lemon text-xl text-dkv-green-dark shrink-0 mt-2 md:mt-0">43 €</span>
                      </li>
                      <li className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div>
                          <span className="font-bold text-dkv-gray">Otras composturas</span>
                          <span className="font-normal text-sm text-dkv-gray/80 block mt-1">Ajustes estructurales menores en laboratorio.</span>
                        </div>
                        <span className="font-lemon text-xl text-dkv-green-dark shrink-0 mt-2 md:mt-0">36 €</span>
                      </li>
                    </ul>
                  </div>
                </TreatmentRow>
              </ScrollReveal>

              {/* Ficha 3: Rebases */}
              <ScrollReveal delay={150} direction="up">
                <TreatmentRow 
                    id="rebases" 
                    name="Rebases (Ajuste a la encía mermada)" 
                    price="Desde 50 €"
                  >
                  <p><strong>¿Por qué hace falta?</strong> Con el tiempo, al no haber raíces, tu hueso y tu encía merman (se encogen). Como resultado, un aparato que antes encajaba perfecto, ahora empieza a "bailar". El rebase consiste en rellenar la prótesis por dentro con resina nueva para que vuelva a encajar como un guante.</p>
                  
                  <div className="bg-dkv-gray-light/30 rounded-2xl p-5 border border-dkv-gray-border mt-4">
                    <ul className="space-y-4">
                      <li className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-dkv-gray-border/50">
                        <div>
                          <span className="font-bold text-dkv-gray flex items-center gap-2"><Zap className="w-4 h-4 text-dkv-green"/> Rebase en consulta</span>
                          <span className="font-normal text-sm text-dkv-gray/80 block mt-1">Método rápido realizado en el propio sillón dental con resinas autopolimerizables.</span>
                        </div>
                        <span className="font-lemon text-xl text-dkv-green-dark shrink-0 mt-2 md:mt-0">50 €</span>
                      </li>
                      <li className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-dkv-gray-border/50">
                        <div>
                          <span className="font-bold text-dkv-gray flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-dkv-green"/> Rebase en laboratorio</span>
                          <span className="font-normal text-sm text-dkv-gray/80 block mt-1">Más resistente y duradero. Se toman medidas y se realiza un relleno con resina termopolimerizada de alta densidad.</span>
                        </div>
                        <span className="font-lemon text-xl text-dkv-green-dark shrink-0 mt-2 md:mt-0">65 €</span>
                      </li>
                      <li className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div>
                          <span className="font-bold text-dkv-gray flex items-center gap-2"><Settings className="w-4 h-4 text-dkv-green"/> Compostura de rebases</span>
                          <span className="font-normal text-sm text-dkv-gray/80 block mt-1">Para ajustes mayores o reestructuraciones completas del lecho de la prótesis.</span>
                        </div>
                        <span className="font-lemon text-xl text-dkv-green-dark shrink-0 mt-2 md:mt-0">70 €</span>
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
                  <h2 className="text-3xl font-lemon text-dkv-green-dark mb-4">¿Tu prótesis necesita un arreglo?</h2>
                  <div className="bg-dkv-gray-light p-4 rounded-xl border border-dkv-gray-border/50 mb-8 flex items-start gap-3">
                    <Info className="w-5 h-5 text-dkv-green shrink-0 mt-0.5" />
                    <p className="text-lg text-dkv-gray font-fsme leading-relaxed">
                      No apliques pegamentos no homologados (tipo Superglue) en casa; son tóxicos y arruinarán la posibilidad de que el laboratorio repare tu funda o aparato.
                    </p>
                  </div>
                  <p className="text-lg text-dkv-gray mb-6">
                    Guarda todas las piezas que se hayan roto, solicita tu cita en tu clínica más cercana y nuestro taller dental le devolverá la vida a tu prótesis en tiempo récord.
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
