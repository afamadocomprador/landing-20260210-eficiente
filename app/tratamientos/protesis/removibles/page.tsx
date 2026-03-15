// app/tratamientos/protesis/removibles/page.tsx

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

import { Info, ShieldCheck, Smile, Layers, Sparkles, PlusCircle } from "lucide-react"; 

export const metadata: Metadata = {
  title: "Prótesis Removibles y Dentaduras Postizas | Precios DKV",
  description: "Aparatos dentales de quita y pon. Prótesis completas, flexibles sin ganchos metálicos y esqueléticos con tarifas exclusivas DKV Dentisalud.",
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

export default function ProtesisRemoviblesPage() {
  const breadcrumbs = [
    { label: "Inicio", href: "/" },
    { label: "Tratamientos", href: "/tratamientos" },
    { label: "Prótesis y Rehabilitación", href: "/tratamientos/protesis" },
    { label: "Prótesis Removibles", href: "#" }
  ];

  return (
    <div className="min-h-screen bg-white font-fsme text-dkv-gray selection:bg-dkv-green selection:text-white pb-32">
      <CookieBanner />
      <Header />

      <main className="pt-[30px] md:pt-[110px] lg:pt-[130px]">
        <FixedBreadcrumb items={breadcrumbs} behavior="smart" />

        <TreatmentsHero 
          badgeText="Aparatos de Quita y Pon"
          title={{ dark: "PRÓTESIS", normal: "REMOVIBLES" }} 
          description={[
            "La solución ideal cuando faltan muchos dientes y no se pueden (o no se desean) colocar implantes ni prótesis fijas.",
            "Te las quitas para dormir y limpiarlas. Diseños modernos y estéticos que te devolverán la confianza."
          ]}
        />

        {/* Asegúrate de añadir "removible" al diccionario de StickySubNav en el futuro para este cluster */}
        <StickySubNav activeId="removible" />

        <section className="bg-dkv-gray-border/30 pt-12 pb-20">
          <div className="container mx-auto px-4 max-w-4xl flow-root">

            <div className="space-y-8">
              
              {/* INTRODUCCIÓN CLÍNICA */}
              <ScrollReveal delay={100} direction="up">
                <div className="mb-8 text-center md:text-left">
                  <span className="text-dkv-green font-bold text-lg uppercase tracking-[0.2em] font-fsme">Recupera tu sonrisa</span>
                  <h3 className="text-2xl font-bold font-lemon text-dkv-green-dark border-b-2 border-dkv-green pb-3 inline-block w-full mt-2 uppercase tracking-wide">
                    Opciones Removibles Modernas
                  </h3>
                  <p className="text-dkv-gray mt-4 font-fsme text-lg">
                    La tecnología ha avanzado mucho. Hoy en día disponemos de materiales flexibles y ligeros que hacen que llevar un aparato removible sea mucho más cómodo y estético que antes. Descubre la opción que mejor encaja con tus necesidades.
                  </p>
                </div>
              </ScrollReveal>

              {/* Ficha 1: Prótesis Completas */}
              <ScrollReveal delay={200} direction="up">
                <TreatmentRow 
                    id="completas" 
                    name="Prótesis Completas (Arcada entera)" 
                    price="Desde 370 €"
                  >
                  <p><strong>Para quien no tiene ningún diente.</strong> El mayor beneficio es recuperar la sonrisa completa al instante, devolver el soporte natural a los labios (evitando las arrugas peribucales de envejecimiento) y restaurar tu capacidad de masticar. Se apoyan directamente sobre la encía.</p>
                  
                  <div className="bg-dkv-gray-light/30 rounded-2xl p-5 border border-dkv-gray-border mt-4">
                    <ul className="space-y-4">
                      <li className="flex justify-between items-center pb-4 border-b border-dkv-gray-border/50">
                        <span className="font-bold text-dkv-gray">Prótesis completa superior o inferior</span>
                        <span className="font-lemon text-xl text-dkv-green-dark shrink-0">370 €</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span className="font-bold text-dkv-gray">Prótesis completa superior + inferior</span>
                        <span className="font-lemon text-xl text-dkv-green-dark shrink-0">740 €</span>
                      </li>
                    </ul>
                  </div>
                </TreatmentRow>
              </ScrollReveal>

              {/* Ficha 2: Prótesis Flexibles (El top ventas) */}
              <ScrollReveal delay={300} direction="up">
                <TreatmentRow 
                    id="flexibles" 
                    name="Prótesis Parciales Flexibles" 
                    price="Desde 477 €"
                  >
                  <p><strong>La opción más estética y cómoda.</strong> No están hechas de plástico duro, sino de un material flexible (tipo Valplast o Flexite) que se dobla ligeramente, evitando las dolorosas rozaduras. Además, <strong>¡no llevan ganchos de metal!</strong> Los ganchos son del mismo color que la encía, haciéndolas casi invisibles cuando sonríes.</p>
                  
                  <div className="bg-dkv-gray-light/30 rounded-2xl p-5 border border-dkv-gray-border mt-4">
                    <ul className="space-y-4">
                      <li className="flex justify-between items-center pb-3 border-b border-dkv-gray-border/50">
                        <span className="font-bold text-dkv-gray">De 1 a 4 piezas</span>
                        <span className="font-lemon text-xl text-dkv-green-dark shrink-0">477 €</span>
                      </li>
                      <li className="flex justify-between items-center pb-3 border-b border-dkv-gray-border/50">
                        <span className="font-bold text-dkv-gray">De 5 a 6 piezas</span>
                        <span className="font-lemon text-xl text-dkv-green-dark shrink-0">532 €</span>
                      </li>
                      <li className="flex justify-between items-center pb-3 border-b border-dkv-gray-border/50">
                        <span className="font-bold text-dkv-gray">Más de 7 piezas</span>
                        <span className="font-lemon text-xl text-dkv-green-dark shrink-0">584 €</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span className="font-bold text-dkv-gray text-sm flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-dkv-green"/> Suplemento resinas hipoalergénicas</span>
                        <span className="font-lemon text-lg text-dkv-green-dark shrink-0">48 €</span>
                      </li>
                    </ul>
                  </div>
                </TreatmentRow>
              </ScrollReveal>

              {/* Ficha 3: Prótesis Esqueléticas */}
              <ScrollReveal delay={150} direction="up">
                <TreatmentRow 
                    id="esqueleticas" 
                    name="Prótesis Parciales Esqueléticas (Metálicas)" 
                    price="Desde 345 €"
                  >
                  <p><strong>Para los que quieren saborear la comida.</strong> En lugar de llevar mucho plástico rosa que tapa el paladar, estas prótesis tienen un "esqueleto" de metal muy fino y resistente. Al no tapar el paladar, la comida sabe mejor, ocupan menos espacio en la boca y son extremadamente estables al masticar.</p>
                  
                  <div className="bg-dkv-gray-light/30 rounded-2xl p-5 border border-dkv-gray-border mt-4">
                    <ul className="space-y-4">
                      <li className="flex justify-between items-center pb-3 border-b border-dkv-gray-border/50">
                        <span className="font-bold text-dkv-gray">Esquelético de 1 a 4 piezas</span>
                        <span className="font-lemon text-xl text-dkv-green-dark shrink-0">345 €</span>
                      </li>
                      <li className="flex justify-between items-center pb-3 border-b border-dkv-gray-border/50">
                        <span className="font-bold text-dkv-gray">Esquelético de 5 a 6 piezas</span>
                        <span className="font-lemon text-xl text-dkv-green-dark shrink-0">434 €</span>
                      </li>
                      <li className="flex justify-between items-center pb-3 border-b border-dkv-gray-border/50">
                        <span className="font-bold text-dkv-gray">Esquelético de 7 a 8 piezas</span>
                        <span className="font-lemon text-xl text-dkv-green-dark shrink-0">551 €</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span className="font-bold text-dkv-gray">Esquelético de 9 piezas en adelante</span>
                        <span className="font-lemon text-xl text-dkv-green-dark shrink-0">650 €</span>
                      </li>
                    </ul>
                  </div>
                </TreatmentRow>
              </ScrollReveal>

              {/* Ficha 4: Prótesis Acrílicas */}
              <ScrollReveal delay={250} direction="up">
                <TreatmentRow 
                    id="acrilicas" 
                    name="Prótesis Parciales de Resina (Acrílicas)" 
                    price="Desde 209 €"
                  >
                  <p><strong>La opción más económica.</strong> Cuando te faltan algunas piezas y buscas salir del paso sin hacer un gran desembolso. Llevan una base de resina rosa (imitando la encía) y unos ganchitos de metal convencionales para agarrarse a tus dientes sanos restantes.</p>
                  
                  <div className="bg-dkv-gray-light/30 rounded-2xl p-5 border border-dkv-gray-border mt-4">
                    <ul className="space-y-4">
                      <li className="flex justify-between items-center pb-3 border-b border-dkv-gray-border/50">
                        <span className="font-bold text-dkv-gray">De 1 a 4 piezas</span>
                        <span className="font-lemon text-xl text-dkv-green-dark shrink-0">209 €</span>
                      </li>
                      <li className="flex justify-between items-center pb-3 border-b border-dkv-gray-border/50">
                        <span className="font-bold text-dkv-gray">De 5 a 6 piezas</span>
                        <span className="font-lemon text-xl text-dkv-green-dark shrink-0">281 €</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span className="font-bold text-dkv-gray">De 7 piezas en adelante</span>
                        <span className="font-lemon text-xl text-dkv-green-dark shrink-0">353 €</span>
                      </li>
                    </ul>
                  </div>
                </TreatmentRow>
              </ScrollReveal>

              {/* Ficha 5: Suplementos y Mejoras */}
              <ScrollReveal delay={150} direction="up">
                <TreatmentRow 
                    id="suplementos-removibles" 
                    name="Mejoras y Personalización de tu Prótesis" 
                  >
                  <p>Porque cada boca es un mundo, te ofrecemos suplementos opcionales para hacer que tu prótesis sea aún más dura, estética o hipoalergénica.</p>
                  
                  <div className="bg-dkv-gray-light/30 rounded-2xl p-5 border border-dkv-gray-border mt-4">
                    <ul className="space-y-4">
                      <li className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-dkv-gray-border/50">
                        <div>
                          <span className="font-bold text-dkv-gray flex items-center gap-2"><Smile className="w-4 h-4 text-dkv-green"/> Suplemento por dientes de porcelana</span>
                          <span className="font-normal text-sm text-dkv-gray/80 block mt-1">Sustituimos los dientes de resina del aparato por cerámica. Ideal si tienes una mordida muy fuerte.</span>
                        </div>
                        <span className="font-lemon text-xl text-dkv-green-dark shrink-0 mt-2 md:mt-0">90 €</span>
                      </li>
                      <li className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-dkv-gray-border/50">
                        <div>
                          <span className="font-bold text-dkv-gray flex items-center gap-2"><Sparkles className="w-4 h-4 text-dkv-green"/> Suplemento ganchos estéticos (por unidad)</span>
                          <span className="font-normal text-sm text-dkv-gray/80 block mt-1">Cambiamos el gancho de metal gris que sujeta la prótesis por uno transparente o color encía.</span>
                        </div>
                        <span className="font-lemon text-xl text-dkv-green-dark shrink-0 mt-2 md:mt-0">56 €</span>
                      </li>
                      <li className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-dkv-gray-border/50">
                        <div>
                          <span className="font-bold text-dkv-gray flex items-center gap-2"><Layers className="w-4 h-4 text-dkv-green"/> Ataches de precisión (108 €) / Complejos (120 €)</span>
                          <span className="font-normal text-sm text-dkv-gray/80 block mt-1">"Corchetes" totalmente ocultos. Se usan para enganchar la prótesis de quita y pon a unas fundas fijas sin que se vea absolutamente nada de metal al sonreír.</span>
                        </div>
                        <span className="font-lemon text-xl text-dkv-green-dark shrink-0 mt-2 md:mt-0">Desde 108 €</span>
                      </li>
                      <li className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div>
                          <span className="font-bold text-dkv-gray flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-dkv-green"/> Metales nobles / seminobles</span>
                          <span className="font-normal text-sm text-dkv-gray/80 block mt-1">Aleaciones exclusivas recomendadas para pacientes con alergias a ciertos metales.</span>
                        </div>
                        <span className="font-lemon text-xl text-dkv-green-dark shrink-0 mt-2 md:mt-0">72 €</span>
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
                  <h2 className="text-3xl font-lemon text-dkv-green-dark mb-4">Vuelve a sonreír sin complejos</h2>
                  <div className="bg-dkv-gray-light p-4 rounded-xl border border-dkv-gray-border/50 mb-8 flex items-start gap-3">
                    <Info className="w-5 h-5 text-dkv-green shrink-0 mt-0.5" />
                    <p className="text-lg text-dkv-gray font-fsme leading-relaxed">
                      La información reflejada en esta página tiene mero carácter orientativo. Un odontólogo especialista debe estudiar cuántos dientes sanos te quedan y el estado de tu hueso para decidir qué tipo de soporte (esquelético, flexible o resina) te dará mayor estabilidad.
                    </p>
                  </div>
                  <p className="text-lg text-dkv-gray mb-6">
                    Solicita tu cita de valoración en tu clínica más cercana. Diseñaremos un aparato cómodo y a medida para que te olvides de que lo llevas puesto.
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
