// app/tratamientos/cirugia-avanzada/reconstruccion-osea/page.tsx

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

import { Info, Activity, Layers, Droplet, Diamond, ShieldCheck, MoveUp, Stethoscope } from "lucide-react"; 

export const metadata: Metadata = {
  title: "Reconstrucción de Hueso e Injertos Dentales | DKV Dentisalud",
  description: "Regeneración ósea, injertos y elevación de seno maxilar. Preparamos el terreno para tus futuros implantes con la máxima seguridad.",
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
          <span className="bg-dkv-green/10 px-4 py-1.5 rounded-full text-2xl font-lemon font-bold text-dkv-green shrink-0">
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

export default function ReconstruccionOseaPage() {

  const breadcrumbs = [
    { label: "Inicio", href: "/" },
    { label: "Tratamientos", href: "/tratamientos" },
    { label: "Cirugía Avanzada", href: "/tratamientos/cirugia-avanzada/extracciones" }, // Enlace a la categoría "padre"
    { label: "Reconstrucción del Hueso", href: "#" }
  ];





  return (
    <div className="min-h-screen bg-white font-fsme text-dkv-gray selection:bg-dkv-green selection:text-white pb-32">
      <CookieBanner />
      <Header />

      <main className="pt-[30px] md:pt-[110px] lg:pt-[130px]">
        <FixedBreadcrumb items={breadcrumbs} behavior="smart" />

        <TreatmentsHero 
          badgeText="Preparando el terreno"
          title={{ dark: "RECONSTRUCCIÓN DEL", normal: "HUESO" }} 
          description={[
            "Cuando sacamos un diente, el hueso se colapsa y se encoge. Si en el futuro quieres ponerte un implante, necesitamos 'rellenar' ese agujero.",
            "Utilizamos técnicas y biomateriales de última generación para estimular a tu cuerpo a crear hueso nuevo y recuperar el volumen perdido."
          ]}
        />

        <StickySubNav activeId="hueso" />

        <section className="bg-dkv-gray-border/20 py-16">
          <div className="container mx-auto px-4 max-w-4xl space-y-8">

            {/* INTRODUCCIÓN CLÍNICA */}
            <ScrollReveal>
              <div className="mb-4 text-center md:text-left">
                <span className="text-dkv-green font-bold text-lg uppercase tracking-[0.2em] font-fsme">Regeneración Ósea</span>
                <h3 className="text-2xl font-bold font-lemon text-dkv-green-dark border-b-2 border-dkv-green pb-3 inline-block w-full mt-2 uppercase tracking-wide">
                  Preservación e Injertos
                </h3>
              </div>
            </ScrollReveal>

            {/* Ficha 1: Regenerativo postexodoncia */}
            <ScrollReveal delay={100}>
              <TreatmentRow id="postexodoncia" name="Tratamiento regenerativo postexodoncia">
                <div className="flex items-center gap-2 mb-2 text-dkv-gray">
                   <Activity className="w-5 h-5 text-dkv-green" />
                   <span className="font-bold tracking-widest text-xs uppercase text-dkv-green">Prevenir el colapso</span>
                </div>
                <p className="mb-4">
                  <strong>¿Qué es?</strong> Justo en el momento de sacarte el diente, rellenamos el hueco con materiales que estimulan a tu cuerpo a crear hueso nuevo, evitando así que la encía se hunda.
                </p>
                <div className="bg-dkv-gray-light/50 p-5 rounded-2xl border border-dkv-gray-border/80">
                  <ul className="space-y-4">
                    <li className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-dkv-gray-border/60">
                      <span className="font-bold text-dkv-gray">Tratamiento para 1 pieza</span>
                      <span className="font-lemon text-xl text-dkv-green-dark shrink-0 mt-2 md:mt-0">80 €</span>
                    </li>
                    <li className="flex flex-col md:flex-row justify-between items-start md:items-center">
                      <span className="font-bold text-dkv-gray">Tratamiento para más de 1 pieza</span>
                      <span className="font-lemon text-xl text-dkv-green-dark shrink-0 mt-2 md:mt-0">150 €</span>
                    </li>
                  </ul>
                </div>
              </TreatmentRow>
            </ScrollReveal>

            {/* Ficha 2: Materiales y Membranas */}
            <ScrollReveal delay={200}>
              <TreatmentRow id="materiales-regeneracion" name="Materiales de Relleno y Membranas">
                <p className="mb-4">
                  Biomateriales de altísima calidad que utilizamos como "andamio" estructural para guiar a tus propias células en la formación de hueso nuevo.
                </p>
                
                <div className="bg-white border border-dkv-gray-border/80 rounded-2xl overflow-hidden mt-6">
                  <div className="p-5 md:p-6 border-b border-dkv-gray-border/50">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Layers className="w-5 h-5 text-dkv-green" />
                          <h3 className="font-bold text-dkv-gray text-lg">Materiales alternativos de relleno</h3>
                        </div>
                        <p className="text-sm text-dkv-gray/80">(hidroxiapatita, hueso liofilizado). El "polvo de hueso" estéril que hace de andamio. Precio por unidad.</p>
                      </div>
                      <span className="font-lemon text-xl text-dkv-green-dark shrink-0">150 €</span>
                    </div>
                  </div>
                  <div className="p-5 md:p-6 bg-dkv-gray-light/30">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <ShieldCheck className="w-5 h-5 text-dkv-green" />
                          <h3 className="font-bold text-dkv-gray text-lg">Membranas regenerativas</h3>
                        </div>
                        <p className="text-sm text-dkv-gray/80">La "tirita" interna especializada que protege el injerto de hueso para que no se mueva ni se contamine.</p>
                      </div>
                      <span className="font-lemon text-xl text-dkv-green-dark shrink-0">150 €</span>
                    </div>
                  </div>
                </div>
              </TreatmentRow>
            </ScrollReveal>

            {/* Ficha 3: Injertos */}
            <ScrollReveal delay={150}>
              <TreatmentRow id="injertos" name="Injertos Biológicos">
                <div className="flex items-center gap-2 mb-2 text-dkv-gray">
                   <Droplet className="w-5 h-5 text-dkv-green" />
                   <span className="font-bold tracking-widest text-xs uppercase text-dkv-green">Tu propio tejido</span>
                </div>
                <p className="mb-4">
                  La técnica consiste en coger un poquito de hueso o encía sana de otra parte de tu propia boca (normalmente de la zona posterior de las muelas del juicio) para injertarlo allí donde te falta grosor o altura.
                </p>

                <div className="bg-dkv-gray-light/50 p-5 rounded-2xl border border-dkv-gray-border/80">
                  <ul className="space-y-4">
                    <li className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-dkv-gray-border/60">
                      <span className="font-bold text-dkv-gray">Cirugía periodontal de injerto</span>
                      <span className="font-lemon text-xl text-dkv-green-dark shrink-0 mt-2 md:mt-0">130 €</span>
                    </li>
                    <li className="flex flex-col md:flex-row justify-between items-start md:items-center">
                      <span className="font-bold text-dkv-gray">Injerto autólogo</span>
                      <span className="font-lemon text-xl text-dkv-green-dark shrink-0 mt-2 md:mt-0">190 €</span>
                    </li>
                  </ul>
                </div>
              </TreatmentRow>
            </ScrollReveal>


            {/* 💎 BLOQUE PREMIUM: CIRUGÍA MAXILAR DE ALTA COMPLEJIDAD */}
            <ScrollReveal delay={250} direction="up">
              <div id="cirugia-alta-complejidad" className="bg-gradient-to-br from-slate-900 to-[#022A27] rounded-2xl md:rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden mt-12 mb-4 scroll-mt-[120px] text-white">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <MoveUp className="w-32 h-32 text-[#D4AF37]" />
                </div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#D4AF37] opacity-10 blur-[80px] rounded-full"></div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <Diamond className="w-6 h-6 text-[#D4AF37]" />
                    <span className="text-[#D4AF37] font-bold text-sm md:text-base uppercase tracking-[0.2em] font-fsme">Upgrade Premium</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-lemon mb-4 uppercase tracking-wide leading-tight">
                    Cirugía Maxilar de Alta Complejidad
                  </h2>
                  <div className="inline-block bg-[#D4AF37]/20 border border-[#D4AF37]/40 px-4 py-1.5 rounded-full text-sm font-bold text-[#D4AF37] mb-8 uppercase tracking-widest">
                    Exclusivo en Centros Propios
                  </div>

                  <div className="space-y-6">
                    {/* Elevación de Seno Abierto */}
                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 mb-4 border-b border-white/10">
                        <div className="flex items-center gap-3">
                          <MoveUp className="w-6 h-6 text-[#D4AF37] shrink-0" />
                          <h3 className="font-bold text-lg md:text-xl text-white">Elevación de seno abierto</h3>
                        </div>
                        <span className="text-[#D4AF37] font-lemon font-bold text-2xl mt-4 md:mt-0 shrink-0">
                          310 €
                        </span>
                      </div>
                      <p className="text-white/80 font-fsme leading-relaxed text-lg mb-3">
                        <strong>¿Por qué se hace?</strong> Es una técnica avanzada para pacientes que han perdido las muelas superiores hace mucho tiempo y apenas les queda 1 o 2 milímetros de hueso debajo del pómulo.
                      </p>
                      <p className="text-white/80 font-fsme leading-relaxed text-lg">
                        <strong>La técnica:</strong> A través de una pequeña "ventana" lateral en la encía, elevamos la membrana respiratoria y creamos un gran lecho óseo capaz de soportar futuros implantes con total seguridad.
                      </p>
                    </div>

                    {/* RTG */}
                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 mb-4 border-b border-white/10">
                        <div className="flex items-center gap-3">
                          <Stethoscope className="w-6 h-6 text-[#D4AF37] shrink-0" />
                          <h3 className="font-bold text-lg md:text-xl text-white">Técnicas de Regeneración Tisular Guiada (RTG)</h3>
                        </div>
                        <span className="text-[#D4AF37] font-lemon font-bold text-2xl mt-4 md:mt-0 shrink-0">
                          325 €
                        </span>
                      </div>
                      <p className="text-white/80 font-fsme leading-relaxed text-lg">
                        Técnicas de microcirugía guiada con membrana reabsorbible para reconstruir defectos óseos enormes con la máxima predictibilidad clínica, recuperando la anatomía original de tu maxilar.
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </ScrollReveal>

          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-20 bg-white border-t border-dkv-gray-border">
          <div className="container mx-auto px-4 max-w-5xl">
            <ScrollReveal>
              <div className="grid lg:grid-cols-2 gap-12 items-center text-left">
                <div>
                  <h2 className="text-3xl font-lemon text-dkv-green-dark mb-4 uppercase leading-tight">Invierte en tus cimientos</h2>
                  <div className="bg-dkv-gray-light p-4 rounded-xl border border-dkv-gray-border/50 mb-8 flex items-start gap-3">
                    <Info className="w-5 h-5 text-dkv-green shrink-0 mt-0.5" />
                    <p className="text-lg text-dkv-gray font-fsme leading-relaxed">
                      El éxito de un implante a largo plazo depende enteramente de la cantidad y calidad del hueso que lo rodea. Un buen andamiaje hoy evitará problemas mañana.
                    </p>
                  </div>
                  <p className="text-lg text-dkv-gray mb-6 font-fsme">
                    Acude a uno de nuestros especialistas en cirugía maxilar para realizar un estudio en 3D y valorar las opciones de reconstrucción ósea para tu caso:
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
