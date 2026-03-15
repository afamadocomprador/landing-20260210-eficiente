// app/tratamientos/ortodoncia/removible/page.tsx

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

import { Info, Settings, Wind, CheckCircle2, Activity, AlertCircle, Smile } from "lucide-react"; 

export const metadata: Metadata = {
  title: "Ortodoncia Removible Infantil | Precios DKV Dentisalud",
  description: "Aparatos de quita y pon para ensanchar el paladar y corregir hábitos en niños. Guiamos el crecimiento de su sonrisa con tarifas DKV.",
};

// --- Componente Ficha de Tratamiento Estándar ---
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

export default function OrtodonciaRemoviblePage() {
  const breadcrumbs = [
    { label: "Inicio", href: "/" },
    { label: "Tratamientos", href: "/tratamientos" },
    { label: "Ortodoncia", href: "/tratamientos/ortodoncia" },
    { label: "Ortodoncia Removible", href: "#" }
  ];

  return (
    <div className="min-h-screen bg-white font-fsme text-dkv-gray selection:bg-dkv-green selection:text-white pb-32">
      <CookieBanner />
      <Header />

      <main className="pt-[30px] md:pt-[110px] lg:pt-[130px]">
        <FixedBreadcrumb items={breadcrumbs} behavior="smart" />

        <TreatmentsHero 
          badgeText="Aparatos de Quita y Pon"
          title={{ dark: "ORTODONCIA", normal: "INFANTIL" }} 
          description={[
            "Muchos padres nos preguntan: '¿Por qué ponerle aparato ahora si aún tiene dientes de leche?'",
            "La respuesta es sencilla: no estamos alineando dientes definitivos, estamos creando el espacio necesario en el hueso para que, cuando salgan los definitivos, quepan perfectamente."
          ]}
        />

        {/* Asegúrate de que el id sea el correcto para que lo reconozca tu StickySubNav en el futuro */}
        <StickySubNav activeId="ortodoncia-removible" />

        <section className="bg-dkv-gray-border/20 py-16">
          <div className="container mx-auto px-4 max-w-4xl space-y-8">

            {/* INTRODUCCIÓN CLÍNICA */}
            <ScrollReveal>
              <div className="mb-4 text-center md:text-left">
                <span className="text-dkv-green font-bold text-lg uppercase tracking-[0.2em] font-fsme">Guiando el Crecimiento</span>
                <h3 className="text-2xl font-bold font-lemon text-dkv-green-dark border-b-2 border-dkv-green pb-3 inline-block w-full mt-2 uppercase tracking-wide">
                  Ortodoncia Funcional e Interceptiva
                </h3>
                <p className="text-dkv-gray mt-4 font-fsme text-lg">
                  Usamos aparatos removibles porque son la herramienta ideal para corregir el crecimiento del hueso y eliminar malos hábitos mientras el niño aún está en desarrollo. Aquí te desglosamos las opciones y su inversión con tu tarifa DKV Dentisalud Élite.
                </p>
              </div>
            </ScrollReveal>

            {/* Ficha 1: Aparatos Activos */}
            <ScrollReveal delay={100}>
              <TreatmentRow 
                id="aparatos-activos" 
                name="Aparatos Activos (Expansores y Correctores)" 
                price="Desde 200 €"
                image="/images/tratamientos/ortodoncia-removible.png"
              >
                <p><strong>Los motores del cambio:</strong> El objetivo es ensanchar un paladar que se ha quedado estrecho, frenar una mandíbula que crece demasiado o estimular una que se ha quedado atrás.</p>
                <div className="bg-white p-5 rounded-2xl border border-dkv-gray-border/50 mt-4 mb-4">
                  <p className="text-sm text-dkv-gray leading-relaxed">
                    <strong>¿Cómo se aplican?</strong> Son placas de resina de colores (¡los niños pueden elegir el diseño!) que llevan unos pequeños tornillos o resortes metálicos en su interior. Los padres, con una llavecita especial, giran el tornillo en casa una o dos veces por semana para ir ensanchando el hueso milímetro a milímetro.
                  </p>
                </div>
                <p><strong>El beneficio:</strong> Evitan que los dientes definitivos salgan amontonados y corrigen "mordidas cruzadas" que, de no tratarse ahora, desgastarían los dientes de forma asimétrica y requerirían cirugía maxilofacial en la edad adulta.</p>
                
                <div className="bg-dkv-gray-light/30 rounded-2xl p-5 border border-dkv-gray-border mt-6">
                  <ul className="space-y-4">
                    <li className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-dkv-gray-border/50">
                      <div>
                        <span className="font-bold text-dkv-gray flex items-center gap-2"><Settings className="w-4 h-4 text-dkv-green"/> Aparatología por maxilar (arriba o abajo)</span>
                        <span className="font-normal text-sm text-dkv-gray/80 block mt-1">¿Cuándo se usa? Cuando el problema está localizado en un solo hueso (generalmente el paladar superior, que necesita expansión).</span>
                      </div>
                      <span className="font-lemon text-xl text-dkv-green-dark shrink-0 mt-2 md:mt-0">200 €</span>
                    </li>
                    <li className="flex flex-col md:flex-row justify-between items-start md:items-center">
                      <div>
                        <span className="font-bold text-dkv-gray flex items-center gap-2"><Activity className="w-4 h-4 text-dkv-green"/> Aparatología ambos maxilares</span>
                        <span className="font-normal text-sm text-dkv-gray/80 block mt-1">¿Cuándo se usa? Cuando necesitamos coordinar el crecimiento de la parte de arriba con la de abajo simultáneamente para que encajen como una caja y su tapa.</span>
                      </div>
                      <span className="font-lemon text-xl text-dkv-green-dark shrink-0 mt-2 md:mt-0">400 €</span>
                    </li>
                  </ul>
                </div>
              </TreatmentRow>
            </ScrollReveal>

            {/* Ficha 2: Correctores de Hábitos */}
            <ScrollReveal delay={200}>
              <TreatmentRow id="correctores-habitos" name="Correctores de Hábitos: Función y Respiración" price="Desde 87 €">
                <p>La forma en que un niño respira o traga saliva define la forma de su cara. Estos aparatos no "empujan" huesos directamente, sino que <strong>reeducan los músculos de la boca</strong>.</p>
                
                <div className="bg-dkv-gray-light/30 rounded-2xl p-5 border border-dkv-gray-border mt-6">
                  <ul className="space-y-4">
                    <li className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-dkv-gray-border/50">
                      <div>
                        <span className="font-bold text-dkv-gray flex items-center gap-2"><Wind className="w-4 h-4 text-dkv-green"/> Placa respiratoria (por aparato)</span>
                        <span className="font-normal text-sm text-dkv-gray/80 block mt-2 mb-2"><strong>¿Por qué hace falta?</strong> Muchos niños respiran por la boca (por alergias, vegetaciones o simple hábito). Al tener la boca abierta siempre, la lengua no empuja el paladar y este se queda estrecho (cara alargada y ojeras).</span>
                        <span className="font-normal text-sm text-dkv-gray/80 block"><strong>El beneficio:</strong> Esta placa se coloca en la boca y obliga físicamente al niño a respirar por la nariz, reeducando su sistema respiratorio y permitiendo que su cara crezca con las proporciones correctas.</span>
                      </div>
                      <span className="font-lemon text-xl text-dkv-green-dark shrink-0 mt-2 md:mt-0">87 €</span>
                    </li>
                    <li className="flex flex-col md:flex-row justify-between items-start md:items-center">
                      <div>
                        <span className="font-bold text-dkv-gray flex items-center gap-2"><Smile className="w-4 h-4 text-dkv-green"/> Posicionador (por aparato)</span>
                        <span className="font-normal text-sm text-dkv-gray/80 block mt-2 mb-2"><strong>¿En qué consiste?</strong> Es un aparato elástico (parecido a los protectores de los boxeadores) que abraza los dientes de arriba y abajo a la vez.</span>
                        <span className="font-normal text-sm text-dkv-gray/80 block"><strong>¿Cuándo se usa?</strong> Suele emplearse en fases finales para asentar la mordida como si fuera un molde perfecto, o para guiar los dientes a su posición final aprovechando la propia fuerza de los músculos del niño al morderlo.</span>
                      </div>
                      <span className="font-lemon text-xl text-dkv-green-dark shrink-0 mt-2 md:mt-0">144 €</span>
                    </li>
                  </ul>
                </div>
              </TreatmentRow>
            </ScrollReveal>

            {/* Ficha 3: Visitas de Revisión */}
            <ScrollReveal delay={150}>
              <TreatmentRow id="seguimiento" name="El Seguimiento: La clave del éxito" price="25 €">
                <p>Un aparato en un cajón no hace nada, y un aparato mal ajustado puede hacer daño. <strong>El tratamiento real ocurre en la silla de la clínica.</strong></p>
                
                <div className="bg-dkv-gray-light/30 rounded-2xl p-5 border border-dkv-gray-border mt-4">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div>
                      <span className="font-bold text-dkv-gray flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-dkv-green"/> Visitas de revisión y tratamiento</span>
                      <span className="font-normal text-sm text-dkv-gray/80 block mt-2"><strong>¿Por qué es necesario y qué supone?</strong> Este es el acto médico más importante. Aproximadamente una vez al mes, el ortodoncista debe ver al niño para revisar que el aparato encaja bien, activar los resortes, limar la resina para permitir que salgan dientes nuevos y, sobre todo, motivar al pequeño para que lo siga usando.</span>
                    </div>
                    <span className="font-lemon text-xl text-dkv-green-dark shrink-0 mt-2 md:mt-0">25 € <span className="text-sm font-fsme text-dkv-gray/70 block md:inline">/visita</span></span>
                  </div>
                </div>

                <div className="bg-dkv-green/5 p-4 rounded-xl border border-dkv-green/20 mt-6 flex items-start gap-3">
                  <Info className="w-5 h-5 text-dkv-green shrink-0 mt-0.5" />
                  <p className="text-sm text-dkv-gray">
                    <strong>La transparencia de tu presupuesto:</strong> Ten en cuenta que el coste real de la ortodoncia infantil no es solo el aparato (200 €), sino la suma del aparato más las mensualidades (25 €/mes) durante el año o año y medio que suele durar el tratamiento.
                  </p>
                </div>
              </TreatmentRow>
            </ScrollReveal>

            {/* EL CONSEJO CLÍNICO (Transparencia Total) */}
            <ScrollReveal delay={250}>
              <div className="mt-16 p-8 md:p-12 mb-12 rounded-3xl bg-dkv-green-dark text-white text-center shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-dkv-green opacity-20 blur-3xl rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-dkv-green opacity-20 blur-3xl rounded-full"></div>
                <AlertCircle className="w-12 h-12 mx-auto mb-6 text-dkv-green-light" />
                <h3 className="font-lemon text-xl mb-4 text-dkv-green-light uppercase tracking-wide">El Consejo Clínico para Padres</h3>
                <p className="text-xl font-medium leading-relaxed italic font-fsme max-w-3xl mx-auto relative z-10 text-white/90">
                  "La aparatología removible hace verdadera magia en las caras de los niños, pero tiene un 'talón de Aquiles' que debemos contarte: <strong>depende al 100% de la colaboración de tu hijo.</strong> El aparato debe llevarse un mínimo de 14 a 16 horas diarias (toda la noche y parte de la tarde en casa). Si el niño no se lo pone, el hueso no cambia. Como profesionales, nuestro trabajo es fabricar el aparato perfecto y ajustar los tornillos; el vuestro en casa es ser 'policías del aparato' durante unos meses. ¡El esfuerzo valdrá la pena para toda su vida!"
                </p>
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
                  <h2 className="text-3xl font-lemon text-dkv-green-dark mb-4 uppercase leading-tight">Anticípate al problema</h2>
                  <div className="bg-dkv-gray-light p-4 rounded-xl border border-dkv-gray-border/50 mb-8 flex items-start gap-3">
                    <Info className="w-5 h-5 text-dkv-green shrink-0 mt-0.5" />
                    <p className="text-lg text-dkv-gray font-fsme leading-relaxed">
                      Recomendamos una primera visita con el ortodoncista a los <strong>6 o 7 años de edad</strong>. Es el momento perfecto para evaluar el crecimiento de sus maxilares y detectar de forma temprana paladares estrechos o mordidas cruzadas.
                    </p>
                  </div>
                  <p className="text-lg text-dkv-gray mb-6 font-fsme">
                    Encuentra tu clínica DKV más cercana y pide una cita de valoración ortodóntica infantil:
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
