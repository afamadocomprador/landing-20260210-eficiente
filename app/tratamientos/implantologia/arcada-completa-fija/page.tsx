// app/tratamientos/implantologia/arcada-completa-fija/page.tsx

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

import { AlertCircle, Info, Zap, Sparkles, Smile, ShieldCheck, Layers } from "lucide-react"; 

export const metadata: Metadata = {
  title: "Arcada Completa Fija sobre Implantes | Precios DKV Dentisalud",
  description: "Recupera todos tus dientes fijos. Presupuesto real y transparente para rehabilitación completa con implantes, sin letra pequeña y tarifa DKV.",
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

export default function ArcadaCompletaFijaPage() {
  const breadcrumbs = [
    { label: "Inicio", href: "/" },
    { label: "Tratamientos", href: "/tratamientos" },
    { label: "Implantología", href: "/tratamientos/implantologia" },
    { label: "Arcada Completa Fija", href: "#" }
  ];

  return (
    <div className="min-h-screen bg-white font-fsme text-dkv-gray selection:bg-dkv-green selection:text-white pb-32">
      <CookieBanner />
      <Header />

      <main className="pt-[30px] md:pt-[110px] lg:pt-[130px]">
        <FixedBreadcrumb items={breadcrumbs} behavior="smart" />

        <TreatmentsHero 
          badgeText="Todos los Dientes Fijos"
          title={{ dark: "ARCADA COMPLETA", normal: "FIJA" }} 
          description={[
            "La solución definitiva para pacientes que han perdido todos los dientes de un maxilar y rechazan usar prótesis de 'quita y pon'.",
            "Muerde manzanas y sonríe con total seguridad, recuperando la estética y función de tus dientes naturales."
          ]}
        />

        {/* Menú transversal apuntando a "arcada" */}
        <StickySubNav activeId="arcada" />

        <section className="bg-dkv-gray-border/30 pt-12 pb-20">
          <div className="container mx-auto px-4 max-w-4xl flow-root">

            <div className="space-y-8">
              {/* Ficha 1: El Presupuesto "Normal" (Caso Ideal) */}
              <ScrollReveal delay={100} direction="up">
                <div className="mb-8 text-center md:text-left">
                  <span className="text-dkv-green font-bold text-lg uppercase tracking-[0.2em] font-fsme">Presupuesto Real Total</span>
                  <h3 className="text-2xl font-bold font-lemon text-dkv-green-dark border-b-2 border-dkv-green pb-3 inline-block w-full mt-2 uppercase tracking-wide">
                    El Caso Ideal (Técnica de 4 Implantes)
                  </h3>
                  <p className="text-dkv-gray mt-4 font-fsme text-lg">
                    Devolvemos la función y estética a toda tu boca. Colocamos estratégicamente 4 implantes de titanio que actuarán como los pilares de un puente. Sobre ellos, atornillamos una estructura completa de 10 a 12 dientes que no se mueve, no roza el paladar y no te tienes que quitar para dormir.
                  </p>
                </div>

                <TreatmentRow 
                    id="arcada-ideal" 
                    name="Rehabilitación Fija de Arcada Completa" 
                    price="6.018 €"
                    image="/images/tratamientos/protesis.png"
                  >
                  <p>A diferencia de otras clínicas que anuncian solo el precio de la prótesis, en DKV Dentisalud te mostramos la <strong>inversión total real</strong> sumando los "cimientos" (implantes) y el "tejado" (dientes).</p>
                  
                  <div className="bg-dkv-gray-light/30 rounded-2xl p-5 border border-dkv-gray-border mt-4">
                    <ul className="space-y-4">
                      <li className="flex flex-col md:flex-row md:justify-between items-start md:items-center pb-3 border-b border-dkv-gray-border/50">
                        <span className="font-bold text-dkv-gray">Diagnóstico 3D y Guías Quirúrgicas <span className="font-normal block text-sm text-dkv-gray/80">Estudio implantológico y Férulas</span></span>
                        <span className="font-lemon text-lg text-dkv-green-dark shrink-0">Incluido</span>
                      </li>
                      <li className="flex flex-col md:flex-row md:justify-between items-start md:items-center pb-3 border-b border-dkv-gray-border/50">
                        <span className="font-bold text-dkv-gray">Fase Quirúrgica <span className="font-normal block text-sm text-dkv-gray/80">4 Implantes de titanio (4 x 550 €)</span></span>
                        <span className="font-lemon text-lg text-dkv-green-dark shrink-0">2.200 €</span>
                      </li>
                      <li className="flex flex-col md:flex-row md:justify-between items-start md:items-center pb-3 border-b border-dkv-gray-border/50">
                        <span className="font-bold text-dkv-gray">Fase Conectiva <span className="font-normal block text-sm text-dkv-gray/80">4 Aditamentos protésicos (4 x 247 €)</span></span>
                        <span className="font-lemon text-lg text-dkv-green-dark shrink-0">988 €</span>
                      </li>
                      <li className="flex flex-col md:flex-row md:justify-between items-start md:items-center">
                        <span className="font-bold text-dkv-gray">La Dentadura Fija <span className="font-normal block text-sm text-dkv-gray/80">Arcada fija metal-resina (10-12 dientes)</span></span>
                        <span className="font-lemon text-lg text-dkv-green-dark shrink-0">2.830 €</span>
                      </li>
                    </ul>
                  </div>
                  <p className="text-sm font-medium text-dkv-gray/80 italic mt-3 text-right">
                    * El especialista evaluará si tu caso requiere 4 o 6 implantes para una estabilidad óptima.
                  </p>
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
                    Las rehabilitaciones completas son complejas. Dependiendo del estado en el que se encuentre tu hueso maxilar tras años de desgaste, podríamos necesitar acondicionar el terreno con alguno de estos procedimientos.
                  </p>
                </div>
                
                {/* Ficha Nivelación Ósea */}
                <TreatmentRow id="nivelacion" name="Preparación y Nivelación del Hueso">
                  <div className="mb-6">
                    <p className="mb-4">Si hay infecciones previas o el hueso ha quedado irregular, necesitaremos nivelarlo mediante una alveoloplastia para que la nueva prótesis asiente perfectamente plana y evitar molestias o acumulación de comida.</p>
                    <div className="bg-dkv-gray-light/30 rounded-2xl p-5 border border-dkv-gray-border">
                      <ul className="space-y-4">
                        <li className="flex justify-between items-center">
                          <span className="font-bold text-dkv-gray">Remodelación maxilar / Alveoloplastia</span>
                          <span className="font-lemon text-lg text-dkv-green-dark">99 €</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </TreatmentRow>

                {/* Ficha Regeneración Extrema */}
                <div className="mt-8">
                  <TreatmentRow id="elevacion-seno" name="Elevación de Seno y Hueso (Maxilar Superior)">
                    <p className="mb-4">Si los senos paranasales han bajado mucho por llevar tiempo sin muelas arriba, nos quedamos sin altura física. Necesitaremos realizar una pequeña elevación e introducir material regenerativo para crear un lecho seguro donde anclar los implantes posteriores.</p>
                    <div className="bg-dkv-gray-light/30 rounded-2xl p-5 border border-dkv-gray-border mb-6">
                      <ul className="space-y-4">
                        <li className="flex justify-between items-center pb-3 border-b border-dkv-gray-border/50">
                          <span className="font-bold text-dkv-gray">Elevación de seno cerrado</span>
                          <span className="font-lemon text-lg text-dkv-green-dark">130 €</span>
                        </li>
                        <li className="flex justify-between items-center">
                          <span className="font-bold text-dkv-gray">Material de relleno regenerativo</span>
                          <span className="font-lemon text-lg text-dkv-green-dark">175 €</span>
                        </li>
                      </ul>
                    </div>
                  </TreatmentRow>
                </div>

                {/* Ficha Falsos Muñones */}
                <div className="mt-8">
                  <TreatmentRow id="falso-munon" name="Ajuste de Ángulos (Falsos Muñones)">
                    <p className="mb-4">En rehabilitaciones completas, a menudo debemos colocar los implantes de los extremos muy inclinados para aprovechar tu hueso natural sano. Para que los dientes atornillados salgan rectos y la mordida sea perfecta, usamos unas piezas correctoras hechas a medida en laboratorio.</p>
                    <div className="bg-dkv-gray-light/30 rounded-2xl p-5 border border-dkv-gray-border">
                      <ul className="space-y-4">
                        <li className="flex justify-between items-center">
                          <span className="font-bold text-dkv-gray">Falso muñón de titanio <span className="text-sm font-normal text-dkv-gray/80">(por pieza)</span></span>
                          <span className="font-lemon text-lg text-dkv-green-dark">216 €</span>
                        </li>
                      </ul>
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
                      La información reflejada en esta página tiene mero carácter orientativo. Una rehabilitación de arcada completa requiere un diseño de alta precisión. El diagnóstico definitivo únicamente te lo podrá proporcionar el equipo de cirugía maxilofacial en consulta.
                    </p>
                  </div>
                  <p className="text-lg text-dkv-gray mb-6">
                    Te invitamos a solicitar un Estudio Implantológico Gratuito. Realizaremos un TAC 3D para diseñar tu nueva sonrisa y darte un presupuesto exacto y cerrado. Encuentra tu clínica:
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
