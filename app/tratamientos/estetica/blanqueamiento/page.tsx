// app/tratamientos/estetica/blanqueamiento/page.tsx

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

import { Info, Sparkles, Smile, ShieldCheck, Zap } from "lucide-react"; 

export const metadata: Metadata = {
  title: "Blanqueamiento Dental | Precios Cerrados DKV Dentisalud",
  description: "Rejuvenece tu sonrisa eliminando manchas sin dañar el esmalte. Descubre nuestras opciones de blanqueamiento dental láser y combinado con tarifas DKV.",
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

export default function BlanqueamientoPage() {
  const breadcrumbs = [
    { label: "Inicio", href: "/" },
    { label: "Tratamientos", href: "/tratamientos" },
    { label: "Estética Dental", href: "/tratamientos/estetica" },
    { label: "Blanqueamiento", href: "#" }
  ];

  return (
    <div className="min-h-screen bg-white font-fsme text-dkv-gray selection:bg-dkv-green selection:text-white pb-32">
      <CookieBanner />
      <Header />

      <main className="pt-[30px] md:pt-[110px] lg:pt-[130px]">
        <FixedBreadcrumb items={breadcrumbs} behavior="smart" />

        <TreatmentsHero 
          badgeText="Recupera la luz de tu sonrisa"
          title={{ dark: "BLANQUEAMIENTO", normal: "DENTAL" }} 
          description={[
            "El objetivo: Rejuvenecer tu sonrisa eliminando pigmentaciones (café, tabaco, edad) sin alterar la forma ni la estructura de tus dientes.",
            "Utilizamos geles liberadores de oxígeno que penetran en el esmalte para limpiar las manchas internas de forma segura y eficaz."
          ]}
        />

        {/* Asegúrate de que tu StickySubNav acepte "blanqueamiento" como ID */}
        <StickySubNav activeId="blanqueamiento" />

        <section className="bg-dkv-gray-border/30 pt-12 pb-20">
          <div className="container mx-auto px-4 max-w-4xl flow-root">

            <div className="space-y-8">
              
              {/* INTRODUCCIÓN CLÍNICA */}
              <ScrollReveal delay={100} direction="up">
                <div className="mb-8 text-center md:text-left">
                  <span className="text-dkv-green font-bold text-lg uppercase tracking-[0.2em] font-fsme">¿Cuándo es necesario?</span>
                  <h3 className="text-2xl font-bold font-lemon text-dkv-green-dark border-b-2 border-dkv-green pb-3 inline-block w-full mt-2 uppercase tracking-wide">
                    Devuelve el Blanco Natural a tus Dientes
                  </h3>
                  <p className="text-dkv-gray mt-4 font-fsme text-lg">
                    Cuando sientes que tus dientes han perdido su blanco natural o están amarillentos, pero estás contento con su forma y posición. También es la solución ideal cuando un diente se ha oscurecido tras matar el nervio (endodoncia). El tratamiento se puede activar con luz en la clínica o aplicar gradualmente en casa.
                  </p>
                </div>
              </ScrollReveal>

              {/* Ficha 1: El Tratamiento Estrella (Combinado) */}
              <ScrollReveal delay={200} direction="up">
                <TreatmentRow 
                    id="blanqueamiento-combinado" 
                    name="Blanqueamiento Combinado (Consultorio + Kit Domicilio)" 
                    price="300 €"
                  >
                  <p><strong>El Tratamiento Estrella:</strong> Es la opción que más recomendamos a nuestros pacientes. Combina el choque rápido y potente de la clínica con el mantenimiento profundo y progresivo en casa. Es la técnica que consigue un blanco más duradero, estable y espectacular.</p>
                  
                  <div className="bg-dkv-gray-light/30 rounded-2xl p-5 border border-dkv-gray-border mt-4">
                    <ul className="space-y-4">
                      <li className="flex items-center gap-3">
                        <Sparkles className="w-5 h-5 text-dkv-green shrink-0" />
                        <span className="text-dkv-gray font-medium">1 sesión intensiva en clínica con luz activadora.</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Smile className="w-5 h-5 text-dkv-green shrink-0" />
                        <span className="text-dkv-gray font-medium">Férulas a medida y gel profesional para usar en casa.</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <ShieldCheck className="w-5 h-5 text-dkv-green shrink-0" />
                        <span className="text-dkv-gray font-medium">Máxima duración del tono blanco a lo largo de los años.</span>
                      </li>
                    </ul>
                  </div>
                </TreatmentRow>
              </ScrollReveal>

              {/* Ficha 2: Blanqueamiento en Consultorio */}
              <ScrollReveal delay={150} direction="up">
                <TreatmentRow 
                    id="blanqueamiento-consultorio" 
                    name="Blanqueamiento Dental en Consultorio (Plasma o Láser)" 
                    price="250 €"
                  >
                  <p><strong>Ideal si buscas un resultado rápido.</strong> En una sesión de aproximadamente una hora en la clínica, aislamos cuidadosamente tus encías y aplicamos un gel de alta concentración que se activa mediante luz de plasma o láser.</p>
                  <p className="text-sm font-medium text-dkv-gray/80 italic mt-2">
                    Sales de la consulta el mismo día con una sonrisa notablemente más blanca.
                  </p>
                </TreatmentRow>
              </ScrollReveal>

              {/* Ficha 3: Blanqueamiento con Férulas en Domicilio */}
              <ScrollReveal delay={250} direction="up">
                <TreatmentRow 
                    id="blanqueamiento-domicilio" 
                    name="Blanqueamiento con Férulas en Domicilio" 
                    price="216 €"
                  >
                  <p><strong>El método más suave y gradual.</strong> Tomamos moldes de tu boca para fabricarte unas fundas transparentes a medida (férulas). Te entregamos un kit con gel blanqueador que aplicarás en las férulas cada noche en tu casa durante un par de semanas.</p>
                  <p className="text-sm font-medium text-dkv-gray/80 italic mt-2">
                    Tratamiento completo incluido. Excelente para pacientes con sensibilidad dental que prefieren un proceso más lento.
                  </p>
                </TreatmentRow>
              </ScrollReveal>

              {/* Ficha 4: Blanqueamiento Diente No Vital */}
              <ScrollReveal delay={350} direction="up">
                <TreatmentRow 
                    id="blanqueamiento-interno" 
                    name="Blanqueamiento de Diente No Vital" 
                    price="50 €"
                  >
                  <p><strong>¿Por qué hace falta?</strong> A veces, tras un fuerte golpe o una endodoncia (matar el nervio), un solo diente se vuelve gris o negro, desentonando con el resto de la sonrisa.</p>
                  <p>Este blanqueamiento específico se realiza desde el interior del propio diente afectado, depositando el agente blanqueador dentro de la cámara pulpar para igualar su color con los dientes vecinos sanos.</p>
                  <p className="text-sm font-medium text-dkv-gray/80 italic mt-2">
                    * Precio por pieza tratada.
                  </p>
                </TreatmentRow>
              </ScrollReveal>

              {/* EL VEREDICTO DEL ODONTÓLOGO (QUOTE) */}
              <ScrollReveal delay={200} direction="up">
                <div className="mt-16 p-8 md:p-12 mb-12 rounded-3xl bg-dkv-green-dark text-white text-center shadow-2xl relative overflow-hidden">
                  {/* Elementos decorativos */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-dkv-green opacity-20 blur-3xl rounded-full"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-dkv-green opacity-20 blur-3xl rounded-full"></div>
                  
                  <Sparkles className="w-12 h-12 mx-auto mb-6 text-dkv-green" />
                  <h4 className="text-dkv-green font-lemon uppercase tracking-widest text-sm mb-4">El Veredicto de tu Odontólogo</h4>
                  <p className="text-xl md:text-2xl font-medium leading-relaxed italic font-fsme max-w-3xl mx-auto relative z-10">
                    "La mejor estética dental es aquella que no se nota. Cuando alguien te diga '¡Qué carillas más bonitas llevas!', habremos fracasado. Nuestro objetivo es que te digan: <strong>'¡Qué buena cara tienes, qué sonrisa más luminosa!'</strong>. Invertir en un blanqueamiento combinado es invertir en que nadie sepa qué te has hecho, pero todos noten que estás mejor que nunca."
                  </p>
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
                      La información reflejada en esta página tiene mero carácter orientativo. Para asegurar que tus dientes y encías están sanos y son aptos para recibir un blanqueamiento dental, es imprescindible la valoración previa de un dentista.
                    </p>
                  </div>
                  <p className="text-lg text-dkv-gray mb-6">
                    Solicita tu cita de valoración en tu clínica más cercana. Revisaremos tu esmalte y te aconsejaremos el tipo de blanqueamiento más efectivo para tu caso.
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
