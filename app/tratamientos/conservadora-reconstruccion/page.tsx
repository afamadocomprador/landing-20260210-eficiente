// app/tratamientos/odontologia-conservadora/reconstruccion/page.tsx

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

import { Info, Bug, Layers, ShieldCheck, Activity, CheckCircle2, AlertCircle } from "lucide-react"; 

export const metadata: Metadata = {
  title: "Empastes y Reconstrucciones Dentales | DKV Dentisalud",
  description: "Frena la caries a tiempo con nuestros empastes, grandes reconstrucciones y tratamientos bioactivos. Salvar tu diente es nuestra prioridad.",
};

// --- Componente Ficha de Tratamiento Estándar ---
const TreatmentRow = ({ id, name, price, image, imageAlt, children }: any) => (
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

    {image && (
      <div className="mb-6 w-full overflow-hidden rounded-xl border border-gray-100 bg-gray-50/50 flex justify-center">
        <img 
          src={image} 
          alt={imageAlt || name} 
          className="w-full h-auto object-cover max-h-[250px] md:max-h-[350px] transition-transform duration-700 hover:scale-105"
          loading="lazy"
        />
      </div>
    )}

    <div className="text-dkv-gray font-fsme leading-relaxed text-lg space-y-4">
      {children}
    </div>
  </div>
);

export default function ReconstruccionDentalPage() {
  const breadcrumbs = [
    { label: "Inicio", href: "/" },
    { label: "Tratamientos", href: "/tratamientos" },
    { label: "Odontología Conservadora", href: "/tratamientos/odontologia-conservadora" },
    { label: "Reconstrucción", href: "#" }
  ];

  return (
    <div className="min-h-screen bg-white font-fsme text-dkv-gray pb-32">
      <CookieBanner />
      <Header />

      <main className="pt-[30px] md:pt-[110px]">
        <FixedBreadcrumb items={breadcrumbs} behavior="smart" />

        <TreatmentsHero 
          badgeText="Frenando la caries a tiempo"
          title={{ dark: "RECONSTRUCCIÓN", normal: "DENTAL" }} 
          description={[
            "Salvar tu diente natural es nuestra prioridad. No hay implante ni prótesis en el mundo que supere la obra de la naturaleza.",
            "Cuando las bacterias de la caries atacan, el tiempo es vital. Limpiamos el tejido infectado y rellenamos el hueco para devolverle al diente su forma, fuerza y color natural."
          ]}
        />

        <StickySubNav activeId="reconstruccion" />

        <section className="bg-dkv-gray-border/20 py-16">
          <div className="container mx-auto px-4 max-w-4xl space-y-8">

            {/* Ficha 1: Empaste Simple */}
            <ScrollReveal>
              <TreatmentRow 
                id="empaste" 
                name="Obturación con o sin recubrimiento pulpar" 
                price="29 €"
                image="/images/empaste.png" 
                imageAlt="Esquema visual de un empaste dental o obturación"
              >
                <div className="flex items-center gap-2 mb-2 text-dkv-green">
                   <Bug className="w-5 h-5" />
                   <span className="font-bold tracking-widest text-xs uppercase">El clásico "empaste"</span>
                </div>
                <p><strong>¿Qué es y cuándo se usa?</strong> Lo usamos cuando la caries es de tamaño pequeño o mediano.</p>
                <p><strong>El beneficio:</strong> Limpiamos la zona oscura, aplicamos una resina del color exacto de tu diente y la endurecemos con luz. Tu diente vuelve a estar sano y funcional en 20 minutos.</p>
              </TreatmentRow>
            </ScrollReveal>

            {/* Ficha 2: Gran Reconstrucción */}
            <ScrollReveal delay={100}>
              <TreatmentRow id="gran-reconstruccion" name="Gran reconstrucción (con o sin recubrimiento pulpar)" price="40 €">
                <div className="flex items-center gap-2 mb-2 text-dkv-gray">
                   <Layers className="w-5 h-5 text-dkv-green" />
                   <span className="font-bold tracking-widest text-xs uppercase text-dkv-green">Daños extensos</span>
                </div>
                <p><strong>¿Por qué hace falta?</strong> A veces, la caries ha destruido más de la mitad del diente o se te ha roto un trozo grande al morder algo duro. Un empaste normal no aguantaría la presión.</p>
                <p><strong>La técnica:</strong> Reconstruimos la anatomía completa de la muela, a menudo usando pequeños encofrados para darle su forma original.</p>
              </TreatmentRow>
            </ScrollReveal>

            {/* Ficha 3: Poste o Pin */}
            <ScrollReveal delay={200}>
              <TreatmentRow id="poste" name="Poste o Pin (por unidad)" price="8 €">
                <p><strong>¿Qué supone?</strong> Si el diente está tan destruido que la gran reconstrucción (el empaste de 40€) no tiene dónde agarrarse, introducimos un pequeño "poste" o pilar de fibra de vidrio en la raíz para que actúe como los cimientos de un edificio y sujete la resina.</p>
              </TreatmentRow>
            </ScrollReveal>

            {/* Ficha 4: Empaste provisional */}
            <ScrollReveal delay={150}>
              <TreatmentRow id="empaste-provisional" name="Empaste provisional" price="Incluido (0 €)">
                <div className="flex items-center gap-2 mb-2 text-dkv-gray">
                   <ShieldCheck className="w-5 h-5 text-dkv-green" />
                   <span className="font-bold tracking-widest text-xs uppercase text-dkv-green">Protección temporal</span>
                </div>
                <p><strong>El beneficio:</strong> Si acudes con una urgencia y no hay tiempo para hacer la reconstrucción definitiva, o si estamos esperando a ver cómo reacciona el nervio, te ponemos una pasta temporal para que te vayas a casa sin agujeros y sin dolor.</p>
              </TreatmentRow>
            </ScrollReveal>

            {/* Ficha 5: Bioactivo */}
            <ScrollReveal delay={250}>
              <TreatmentRow id="bioactivo" name="Sustitutivo dentinario bioactivo" price="70 €">
                <div className="flex items-center gap-2 mb-2 text-dkv-gray">
                   <Activity className="w-5 h-5 text-dkv-green" />
                   <span className="font-bold tracking-widest text-xs uppercase text-dkv-green">¡La última oportunidad del nervio!</span>
                </div>
                <p>Si la caries es tan profunda que casi toca el nervio, poner un empaste normal podría irritarlo y acabar en endodoncia.</p>
                <div className="bg-white p-5 rounded-2xl border border-dkv-gray-border/50 mt-4">
                  <p className="text-sm text-dkv-gray leading-relaxed">
                    En su lugar, aplicamos este material "inteligente" (base cavitaria) que <strong>libera minerales, calma el nervio y ayuda a que el diente se cure a sí mismo por dentro</strong> antes de sellarlo definitivamente.
                  </p>
                </div>
              </TreatmentRow>
            </ScrollReveal>

            {/* Ficha 6: Reimplante */}
            <ScrollReveal delay={100}>
              <TreatmentRow id="reimplante" name="Reimplante de pieza dental" price="Incluido (0 €)">
                <p><strong>Para accidentes:</strong> Si te das un golpe y se te sale un diente entero, ven corriendo a la clínica. Volvemos a colocarlo en su sitio y lo inmovilizamos para intentar que vuelva a agarrarse al hueso de forma natural.</p>
              </TreatmentRow>
            </ScrollReveal>

            {/* EL VEREDICTO (Destacado Especial) */}
            <ScrollReveal delay={200}>
              <div className="mt-16 bg-dkv-green-dark text-white p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <AlertCircle className="w-32 h-32 text-white" />
                </div>
                <div className="relative z-10">
                  <h3 className="font-lemon text-xl mb-4 text-dkv-green-light uppercase tracking-wide">El Veredicto de tu Consultor</h3>
                  <p className="font-fsme text-lg leading-relaxed italic text-white/90">
                    "No retrases el tratamiento de una caries por miedo al dentista. Un empaste de 29 € se hace en media hora y apenas molesta. Si lo dejas pasar, el 'bichito' llegará al nervio, el dolor será insoportable y el tratamiento (Endodoncia + Gran reconstrucción) pasará a costar más de 160 €, requiriendo varias citas. <strong>En la odontología conservadora, el tiempo es literalmente salud (y dinero).</strong>"
                  </p>
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
                  <h2 className="text-3xl font-lemon text-dkv-green-dark mb-4 uppercase leading-tight">Actúa antes de que duela</h2>
                  <div className="bg-dkv-gray-light p-4 rounded-xl border border-dkv-gray-border/50 mb-8 flex items-start gap-3">
                    <Info className="w-5 h-5 text-dkv-green shrink-0 mt-0.5" />
                    <p className="text-lg text-dkv-gray font-fsme leading-relaxed">
                      La caries en sus etapas iniciales es silenciosa. Cuando empieza a doler al beber cosas frías o dulces, significa que está profundizando hacia el nervio.
                    </p>
                  </div>
                  <p className="text-lg text-dkv-gray mb-6 font-fsme">
                    Solicita una cita en tu clínica más cercana. Un diagnóstico a tiempo con una radiografía (incluida en tu póliza) salvará tu diente de forma rápida y económica:
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
