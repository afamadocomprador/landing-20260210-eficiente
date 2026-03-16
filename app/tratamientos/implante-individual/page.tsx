// app/tratamientos/implantologia/implante-individual/page.tsx

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

import { AlertCircle, Info, Zap, Sparkles, Smile, ShieldCheck, Stethoscope } from "lucide-react"; 

export const metadata: Metadata = {
  title: "Implante Dental Individual | Precios Cerrados DKV Dentisalud",
  description: "Repón un diente perdido con un implante de titanio de alta gama y corona a medida. Presupuesto cerrado, sin letra pequeña y con garantía DKV.",
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

export default function ImplanteIndividualPage() {
  const breadcrumbs = [
    { label: "Inicio", href: "/" },
    { label: "Tratamientos", href: "/tratamientos" },
    { label: "Implantología", href: "/tratamientos/implantologia" },
    { label: "Implante Individual", href: "#" }
  ];

  return (
    <div className="min-h-screen bg-white font-fsme text-dkv-gray selection:bg-dkv-green selection:text-white pb-32">
      <CookieBanner />
      <Header />

      <main className="pt-[30px] md:pt-[110px] lg:pt-[130px]">
        <FixedBreadcrumb items={breadcrumbs} behavior="smart" />

        <TreatmentsHero 
          badgeText="Sustitución de 1 Pieza"
          title={{ dark: "IMPLANTE", normal: "INDIVIDUAL" }} 
          description={[
            "La solución ideal para reponer un diente perdido (por golpe, caries profunda o fractura) sin tener que tallar ni estropear los dientes sanos vecinos.",
          ]}
        />

        {/* Menú transversal (asegúrate de que en tu StickySubNav existe el ID "individual" si lo has configurado para implantes) */}
        <StickySubNav activeId="individual" />

        <section className="bg-dkv-gray-border/30 pt-12 pb-20">
          <div className="container mx-auto px-4 max-w-4xl flow-root">

            <div className="space-y-8">
              {/* Ficha 1: El Presupuesto "Normal" (Caso Ideal) */}
              <ScrollReveal delay={100} direction="up">
                <div className="mb-8 text-center md:text-left">
                  <span className="text-dkv-green font-bold text-lg uppercase tracking-[0.2em] font-fsme">Presupuesto Cerrado</span>
                  <h3 className="text-2xl font-bold font-lemon text-dkv-green-dark border-b-2 border-dkv-green pb-3 inline-block w-full mt-2 uppercase tracking-wide">
                    El Caso Ideal (Diente Completo)
                  </h3>
                  <p className="text-dkv-gray mt-4 font-fsme text-lg">
                    Para un paciente con encía sana y hueso suficiente. Te colocamos una raíz artificial de titanio de alta gama y, tras el periodo de integración, atornillamos una corona diseñada a medida. Sin sorpresas, sin letra pequeña: un diente nuevo, fuerte y estético.
                  </p>
                </div>

                <TreatmentRow 
                    id="implante-ideal" 
                    name="Rehabilitación Completa Individual" 
                    price="1.100 €"
                    image="/images/tratamientos/implantes.png"
                  >
                  <p>Este tratamiento contempla todas las fases biológicas y clínicas necesarias para devolverte la funcionalidad y estética de un diente desde cero.</p>
                  
                  <div className="bg-dkv-gray-light/30 rounded-2xl p-5 border border-dkv-gray-border mt-4">
                    <ul className="space-y-4">
                      <li className="flex flex-col md:flex-row md:justify-between items-start md:items-center pb-3 border-b border-dkv-gray-border/50">
                        <span className="font-bold text-dkv-gray">Diagnóstico y Planificación <span className="font-normal block text-sm text-dkv-gray/80">Estudio implantológico, Férulas y Radiografías</span></span>
                        <span className="font-lemon text-lg text-dkv-green-dark shrink-0">Incluido</span>
                      </li>
                      <li className="flex flex-col md:flex-row md:justify-between items-start md:items-center pb-3 border-b border-dkv-gray-border/50">
                        <span className="font-bold text-dkv-gray">Fase Quirúrgica <span className="font-normal block text-sm text-dkv-gray/80">Implante de titanio (550€) + Tornillos de cicatrización</span></span>
                        <span className="font-lemon text-lg text-dkv-green-dark shrink-0">550 €</span>
                      </li>
                      <li className="flex flex-col md:flex-row md:justify-between items-start md:items-center pb-3 border-b border-dkv-gray-border/50">
                        <span className="font-bold text-dkv-gray">Fase Protésica (Conexión) <span className="font-normal block text-sm text-dkv-gray/80">Aditamentos protésicos / Piezas intermedias</span></span>
                        <span className="font-lemon text-lg text-dkv-green-dark shrink-0">247 €</span>
                      </li>
                      <li className="flex flex-col md:flex-row md:justify-between items-start md:items-center">
                        <span className="font-bold text-dkv-gray">Corona Definitiva <span className="font-normal block text-sm text-dkv-gray/80">Corona metal-cerámica sobre implante</span></span>
                        <span className="font-lemon text-lg text-dkv-green-dark shrink-0">303 €</span>
                      </li>
                    </ul>
                  </div>
                  <p className="text-sm font-medium text-dkv-gray/80 italic mt-3 text-right">
                    * El proceso completo suele durar entre 3 y 4 meses.
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
                    Nuestra política es la transparencia radical. Dependiendo de tu anatomía particular o tus exigencias estéticas, el odontólogo podría requerir o recomendar alguno de estos procedimientos complementarios.
                  </p>
                </div>
                
                {/* Ficha Zirconio */}
                <TreatmentRow id="zirconio" name="Mejora a Corona de Zirconio (Zona Estética)">
                  <div className="mb-6">
                    <p className="mb-4">Si el diente a reponer es un incisivo (diente frontal), te recomendaremos cambiar la corona de metal-cerámica estándar por una Corona de Zirconio. La luz pasa a través de ella como en un diente natural y evita que la encía se oscurezca con los años.</p>
                    <div className="bg-dkv-gray-light/30 rounded-2xl p-5 border border-dkv-gray-border">
                      <ul className="space-y-4">
                        <li className="flex justify-between items-center">
                          <span className="font-bold text-dkv-gray">Corona Zirconio sobre implante</span>
                          <span className="font-lemon text-lg text-dkv-green-dark">325 € <span className="text-sm font-fsme text-dkv-gray/70 block text-right">(+22 € dif.)</span></span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </TreatmentRow>

                {/* Ficha Regeneración Ósea */}
                <div className="mt-8">
                  <TreatmentRow id="regeneracion" name="Regeneración Ósea y Tisular">
                    <p className="mb-4">Si perdiste el diente hace mucho tiempo, es probable que el hueso se haya encogido. Para garantizar el éxito del implante a largo plazo, necesitaremos crear una base sólida con hueso regenerativo y protegerlo.</p>
                    <div className="bg-dkv-gray-light/30 rounded-2xl p-5 border border-dkv-gray-border mb-6">
                      <ul className="space-y-4">
                        <li className="flex justify-between items-center pb-3 border-b border-dkv-gray-border/50">
                          <span className="font-bold text-dkv-gray">Material de relleno regenerativo</span>
                          <span className="font-lemon text-lg text-dkv-green-dark">175 €</span>
                        </li>
                        <li className="flex justify-between items-center">
                          <span className="font-bold text-dkv-gray">Membrana reabsorbible</span>
                          <span className="font-lemon text-lg text-dkv-green-dark">200 €</span>
                        </li>
                      </ul>
                    </div>

                    <h3 className="text-dkv-green-dark font-bold font-lemon text-sm uppercase mt-6 mb-3 flex items-center gap-2">
                      <Zap className="w-4 h-4" /> Acelerador Biológico
                    </h3>
                    <p className="mb-4">Si buscas una cicatrización ultrarrápida (y con una drástica reducción de la inflamación y el dolor), podemos aplicar tecnología extraída de tu propia sangre.</p>
                    <div className="bg-dkv-gray-light/30 rounded-2xl p-5 border border-dkv-gray-border">
                      <ul className="space-y-4">
                        <li className="flex justify-between items-center">
                          <span className="font-bold text-dkv-gray">Plasma Rico en Plaquetas (P.R.G.F)</span>
                          <span className="font-lemon text-lg text-dkv-green-dark">150 €</span>
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
                      La información reflejada en esta página tiene mero carácter orientativo. El diagnóstico profesional que necesitas (y la confirmación de si requieres o no tratamientos adicionales) únicamente te lo podrá proporcionar un dentista tras evaluar tu escáner 3D.
                    </p>
                  </div>
                  <p className="text-lg text-dkv-gray mb-6">
                    Te invitamos a solicitar tu Estudio Implantológico Gratuito en uno de nuestros centros dentales para estudiar tu caso y ofrecerte el plan exacto. Encuentra tu clínica:
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
