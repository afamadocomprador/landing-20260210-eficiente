// app/tratamientos/odontopediatria/endodoncia/page.tsx

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

import { Info, Activity, HeartPulse, ShieldAlert, Zap, CheckCircle2, Stethoscope } from "lucide-react"; 

export const metadata: Metadata = {
  title: "Endodoncia Infantil y Pulpotomía | DKV Dentisalud",
  description: "Salvamos los dientes de leche de tu hijo cuando la caries llega al nervio. Pulpotomías, pulpectomías y urgencias dentales infantiles con DKV.",
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

export default function EndodonciaInfantilPage() {
  const breadcrumbs = [
    { label: "Inicio", href: "/" },
    { label: "Tratamientos", href: "/tratamientos" },
    { label: "Odontopediatría", href: "/tratamientos/odontopediatria" },
    { label: "Endodoncia Infantil", href: "#" }
  ];

  return (
    <div className="min-h-screen bg-white font-fsme text-dkv-gray pb-32">
      <CookieBanner />
      <Header />

      <main className="pt-[30px] md:pt-[110px]">
        <FixedBreadcrumb items={breadcrumbs} behavior="smart" />

        <TreatmentsHero 
          badgeText="Cuando la caries llega al nervio"
          title={{ dark: "ENDODONCIA", normal: "INFANTIL" }} 
          description={[
            "Salvar un diente de leche que duele es fundamental para no tener que extraerlo antes de tiempo y perder el espacio.",
            "Sí, ¡los dientes de leche también tienen nervio y raíz! Descubre cómo curamos las infecciones profundas sin dolor."
          ]}
        />

        <StickySubNav activeId="endodoncia-pediatria" />

        <section className="bg-dkv-gray-border/20 py-16">
          <div className="container mx-auto px-4 max-w-4xl space-y-8">

            {/* Ficha 1: Pulpotomía */}
            <ScrollReveal>
              <TreatmentRow id="pulpotomia" name="Pulpotomía (Menores de 15 años)" price="44 €">
                <div className="flex items-center gap-2 mb-2 text-dkv-gray">
                   <Activity className="w-5 h-5 text-dkv-green" />
                   <span className="font-bold tracking-widest text-xs uppercase text-dkv-green">Endodoncia Parcial</span>
                </div>
                <p><strong>¿En qué consiste?</strong> Podríamos llamarlo una "endodoncia a medias". Se realiza cuando la caries es muy profunda pero solo ha tocado la parte superior de la cámara del nervio.</p>
                <div className="bg-white p-5 rounded-2xl border border-dkv-gray-border/50 mt-4">
                  <p className="text-sm text-dkv-gray leading-relaxed">
                    Quitamos únicamente esa parte superficial infectada, colocamos un medicamento especial para calmar el tejido sano restante y sellamos la muela. El diente deja de doler inmediatamente y <strong>se mantiene vivo y sano en sus raíces</strong> hasta que se caiga de forma natural.
                  </p>
                </div>
              </TreatmentRow>
            </ScrollReveal>

            {/* Ficha 2: Pulpectomía */}
            <ScrollReveal delay={100}>
              <TreatmentRow id="pulpectomia" name="Pulpectomía (Incluye curas)" price="36 €">
                <div className="flex items-center gap-2 mb-2 text-dkv-gray">
                   <HeartPulse className="w-5 h-5 text-dkv-green" />
                   <span className="font-bold tracking-widest text-xs uppercase text-dkv-green">Tratamiento de conductos</span>
                </div>
                <p><strong>¿Cuándo se hace?</strong> Cuando la infección de la caries ha avanzado tanto que ha llegado hasta el final de las raíces del diente de leche.</p>
                <p>En este caso, limpiamos los conductos enteros para eliminar todas las bacterias y los rellenamos con una pasta especial. Esta pasta está diseñada de forma inteligente: <strong>se reabsorberá por sí sola</strong> al mismo tiempo que la raíz del diente de leche desaparece cuando empuja el diente definitivo para salir.</p>
              </TreatmentRow>
            </ScrollReveal>

            {/* Ficha 3: Apicoformación */}
            <ScrollReveal delay={200}>
              <TreatmentRow id="apicoformacion" name="Apicoformación (por sesión)" price="20 €">
                <div className="flex items-center gap-2 mb-2 text-dkv-gray">
                   <Stethoscope className="w-5 h-5 text-dkv-green" />
                   <span className="font-bold tracking-widest text-xs uppercase text-dkv-green">Guía de crecimiento radicular</span>
                </div>
                <p><strong>¿Qué supone?</strong> Imagina que tu hijo se da un golpe fuerte jugando y se rompe un diente definitivo que acaba de salir y que aún no ha terminado de formar su raíz por completo por dentro del hueso.</p>
                <p>En lugar de dar el diente por perdido, usamos medicamentos especiales a lo largo de varias sesiones para estimular y <strong>ayudar a que esa raíz termine de crecer y cerrarse</strong> de forma natural, salvando la pieza para toda la vida.</p>
              </TreatmentRow>
            </ScrollReveal>

            {/* Ficha 4: Reimplantación (URGENCIA) */}
            <ScrollReveal delay={150}>
              <div id="reimplantacion" className="bg-dkv-green-dark rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl border border-dkv-green scroll-mt-[120px] text-white mt-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-5 blur-[60px] rounded-full"></div>
                
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 mb-5">
                    <h2 className="text-lg md:text-xl font-bold font-lemon text-white uppercase leading-tight flex items-center gap-2">
                      <ShieldAlert className="w-6 h-6 text-yellow-400" /> Reimplantación de pieza dental
                    </h2>
                    <span className="bg-white/20 px-4 py-1.5 rounded-full text-2xl font-lemon font-bold text-white">
                      Incluido (0 €)
                    </span>
                  </div>

                  <p className="font-fsme text-lg mb-6 leading-relaxed text-white/90">
                    <strong>Protocolo de Urgencia:</strong> Si tu hijo se da un golpe en el parque o haciendo deporte y un diente definitivo sale volando entero (de cuajo con su raíz), <strong>¡no lo des por perdido!</strong>
                  </p>

                  <div className="bg-white/10 p-5 rounded-2xl border border-white/20 backdrop-blur-sm">
                    <h3 className="font-bold text-yellow-400 mb-3 uppercase text-sm tracking-wide">Qué hacer inmediatamente:</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="bg-yellow-400 text-dkv-green-dark font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-sm">1</span>
                        <span className="text-white text-sm">Coge el diente <strong>solo por la corona</strong> (la parte blanca con la que se mastica), nunca toques la raíz amarilla.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="bg-yellow-400 text-dkv-green-dark font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-sm">2</span>
                        <span className="text-white text-sm">Mete el diente en un vaso con <strong>leche fría o suero fisiológico</strong> (nunca en agua ni lo frotes).</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="bg-yellow-400 text-dkv-green-dark font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-sm">3</span>
                        <span className="text-white text-sm">Ven corriendo a la clínica. Lo volveremos a colocar en su sitio y lo ferulizaremos para intentar salvarlo.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <ScrollReveal>
              <div className="grid lg:grid-cols-2 gap-12 items-center text-left">
                <div>
                  <h2 className="text-3xl font-lemon text-dkv-green-dark mb-4 uppercase leading-tight">Salva el diente a tiempo</h2>
                  <div className="bg-dkv-gray-light p-4 rounded-xl border border-dkv-gray-border/50 mb-8 flex items-start gap-3">
                    <Info className="w-5 h-5 text-dkv-green shrink-0 mt-0.5" />
                    <p className="text-lg text-dkv-gray font-fsme leading-relaxed">
                      El dolor espontáneo por la noche, o al beber cosas frías y calientes, es el principal síntoma de que la caries ha llegado al nervio. Actuar rápido es clave para evitar flemones.
                    </p>
                  </div>
                  <p className="text-lg text-dkv-gray mb-6 font-fsme">
                    Si tu hijo se queja de dolor de muelas, no esperes. Nuestros especialistas en odontopediatría le atenderán de urgencia con la máxima delicadeza:
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
