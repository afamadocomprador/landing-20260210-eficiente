// app/tratamientos/odontopediatria/cirugia-y-espacio/page.tsx

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

import { Info, ArrowLeftRight, Activity, Scissors, CheckCircle2, Sparkles } from "lucide-react"; 

export const metadata: Metadata = {
  title: "Cirugía Infantil y Mantenedores de Espacio | DKV Dentisalud",
  description: "Guiamos el recambio dental de tus hijos. Extracciones de dientes de leche y mantenedores de espacio para evitar ortodoncias complejas.",
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
          <span className="bg-dkv-green/10 px-4 py-1.5 rounded-full text-2xl font-lemon font-bold text-dkv-green">
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

export default function CirugiaEspacioInfantilPage() {
  const breadcrumbs = [
    { label: "Inicio", href: "/" },
    { label: "Tratamientos", href: "/tratamientos" },
    { label: "Odontopediatría", href: "/tratamientos/odontopediatria" },
    { label: "Cirugía y Espacio", href: "#" }
  ];

  return (
    <div className="min-h-screen bg-white font-fsme text-dkv-gray pb-32">
      <CookieBanner />
      <Header />

      <main className="pt-[30px] md:pt-[110px]">
        <FixedBreadcrumb items={breadcrumbs} behavior="smart" />

        <TreatmentsHero 
          badgeText="Guiando el recambio"
          title={{ dark: "CIRUGÍA Y GESTIÓN", normal: "DEL ESPACIO" }} 
          description={[
            "El objetivo: Asegurar que los dientes definitivos tengan sitio para salir rectos y evitar ortodoncias complejísimas en el futuro.",
            "Extraemos a tiempo las piezas que estorban y colocamos aparatología sencilla para guardar el sitio cuando una muela se pierde prematuramente."
          ]}
        />

        <StickySubNav activeId="cirugia-pediatria" />

        <section className="bg-dkv-gray-border/20 py-16">
          <div className="container mx-auto px-4 max-w-4xl space-y-8">

            {/* INTRODUCCIÓN CLÍNICA */}
            <ScrollReveal>
              <div className="mb-4 text-center md:text-left">
                <span className="text-dkv-green font-bold text-lg uppercase tracking-[0.2em] font-fsme">Intervenciones Menores</span>
                <h3 className="text-2xl font-bold font-lemon text-dkv-green-dark border-b-2 border-dkv-green pb-3 inline-block w-full mt-2 uppercase tracking-wide">
                  Extracciones Infantiles
                </h3>
              </div>
            </ScrollReveal>

            {/* Ficha 1: Extracciones */}
            <ScrollReveal delay={100}>
              <TreatmentRow id="extracciones" name="Extracciones dentales simples" price="0 €">
                <div className="flex items-center gap-2 mb-2 text-dkv-gray">
                   <Scissors className="w-5 h-5 text-dkv-green" />
                   <span className="font-bold tracking-widest text-xs uppercase text-dkv-green">Quitar las "dobles filas"</span>
                </div>
                <p><strong>¿Por qué se hace?</strong> Principalmente para quitar dientes de leche que están muy infectados y no se pueden salvar mediante endodoncia.</p>
                <div className="bg-white p-5 rounded-2xl border border-dkv-gray-border/50 mt-4">
                  <p className="text-sm text-dkv-gray leading-relaxed">
                    También es muy común realizarlas para extraer aquellos <strong>dientes que no se caen a tiempo</strong> y están estorbando al diente definitivo, obligándolo a salir torcido por detrás o por delante de la encía (lo que coloquialmente llamamos dientes "en doble fila").
                  </p>
                </div>
              </TreatmentRow>
            </ScrollReveal>

            {/* Ficha 2: Supernumerario */}
            <ScrollReveal delay={200}>
              <TreatmentRow id="supernumerario" name="Extracción diente supernumerario retenido" price="25 €">
                <div className="flex items-center gap-2 mb-2 text-dkv-gray">
                   <Activity className="w-5 h-5 text-dkv-green" />
                   <span className="font-bold tracking-widest text-xs uppercase text-dkv-green">El diente extra (Por unidad)</span>
                </div>
                <p><strong>¿Qué es?</strong> A veces la naturaleza es caprichosa y crea un diente "extra" (supernumerario) que se queda atrapado en el hueso, bloqueando el camino e impidiendo que los dientes normales salgan a la superficie.</p>
                <p>En estos casos, hay que hacer una pequeña y precisa cirugía infantil para retirar ese obstáculo óseo y liberar la vía de erupción.</p>
              </TreatmentRow>
            </ScrollReveal>

            {/* INTRODUCCIÓN MANTENEDORES */}
            <ScrollReveal delay={100}>
              <div className="mt-12 mb-4 text-center md:text-left">
                <span className="text-dkv-green font-bold text-lg uppercase tracking-[0.2em] font-fsme">La Inversión Inteligente</span>
                <h3 className="text-2xl font-bold font-lemon text-dkv-green-dark border-b-2 border-dkv-green pb-3 inline-block w-full mt-2 uppercase tracking-wide">
                  Los Mantenedores de Espacio
                </h3>
              </div>
            </ScrollReveal>

            {/* Ficha 3: Mantenedores */}
            <ScrollReveal delay={200}>
              <TreatmentRow id="mantenedores" name="Guardando el sitio al definitivo">
                <p className="mb-4">Si tenemos que quitar una muela de leche varios años antes de que toque (por una gran caries, por ejemplo), <strong>el hueco no se queda abierto mágicamente</strong>.</p>
                <p className="mb-6">Las muelas vecinas se inclinarán rápidamente para tapar el agujero, dejando al diente definitivo atrapado dentro del hueso sin poder salir. Para evitarlo, colocamos un aparatito a medida que "sujeta" el espacio abierto hasta que asome el diente nuevo.</p>

                <div className="bg-dkv-gray-light/50 p-5 rounded-2xl border border-dkv-gray-border/80">
                  <ul className="space-y-4">
                    <li className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-dkv-gray-border/60">
                      <div>
                        <span className="font-bold text-dkv-gray flex items-center gap-2"><ArrowLeftRight className="w-4 h-4 text-dkv-green"/> Mantenedor fijo unilateral</span>
                        <span className="font-normal text-sm text-dkv-gray/80 block mt-1">Va pegado a un solo lado de la boca para guardar un hueco concreto.</span>
                      </div>
                      <span className="font-lemon text-xl text-dkv-green-dark shrink-0 mt-2 md:mt-0">58 €</span>
                    </li>
                    <li className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-dkv-gray-border/60">
                      <div>
                        <span className="font-bold text-dkv-gray flex items-center gap-2"><ArrowLeftRight className="w-4 h-4 text-dkv-green"/> Mantenedor fijo bilateral</span>
                        <span className="font-normal text-sm text-dkv-gray/80 block mt-1">Lleva un arco metálico que cruza por detrás de los dientes para sujetar espacios a ambos lados a la vez.</span>
                      </div>
                      <span className="font-lemon text-xl text-dkv-green-dark shrink-0 mt-2 md:mt-0">87 €</span>
                    </li>
                    <li className="flex flex-col md:flex-row justify-between items-start md:items-center">
                      <div>
                        <span className="font-bold text-dkv-gray flex items-center gap-2"><Sparkles className="w-4 h-4 text-dkv-green"/> Mantenedor removible</span>
                        <span className="font-normal text-sm text-dkv-gray/80 block mt-1">Es como un aparato de resina de quita y pon que, además de guardar el sitio, a veces lleva un diente falso por estética.</span>
                      </div>
                      <span className="font-lemon text-xl text-dkv-green-dark shrink-0 mt-2 md:mt-0">72 €</span>
                    </li>
                  </ul>
                </div>
              </TreatmentRow>
            </ScrollReveal>

          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <ScrollReveal>
              <div className="grid lg:grid-cols-2 gap-12 items-center text-left">
                <div>
                  <h2 className="text-3xl font-lemon text-dkv-green-dark mb-4 uppercase leading-tight">Prevenir es Ahorrar</h2>
                  <div className="bg-dkv-green/5 p-4 rounded-xl border border-dkv-green/20 mb-8 flex items-start gap-3">
                    <Info className="w-5 h-5 text-dkv-green shrink-0 mt-0.5" />
                    <p className="text-lg text-dkv-gray font-fsme leading-relaxed">
                      "Un mantenedor de espacio de 58 € hoy te puede ahorrar un tratamiento de ortodoncia de 3.000 € mañana."
                    </p>
                  </div>
                  <p className="text-lg text-dkv-gray mb-6 font-fsme">
                    Acude con tu pequeño a una revisión gratuita. Nuestro equipo de odontopediatría evaluará si el recambio dental se está produciendo correctamente.
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
