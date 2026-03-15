import { Metadata, ResolvingMetadata } from "next";
import React from "react";

// Componentes reales extraídos de tu proyecto
import Header from "@/components/layout/Header";
import FooterLegal from "@/components/FooterLegal";
import CookieBanner from "@/components/CookieBanner";
import FixedBreadcrumb from "@/components/layout/FixedBreadcrumb";
import { CheckCircle2, AlertCircle, Info, Stethoscope, ArrowRight } from "lucide-react"; 

// Importamos nuestro Índice Nivel Dios
import { GodLevelTOC } from "@/components/ui/GodLevelTOC"; 

import TreatmentsHero from "@/components/hero/TreatmentsHero";
import HeroSearch from '@/components/home/HeroSearch';
// Componentes de animación y compartición
import ScrollReveal from "@/components/ui/ScrollReveal";
import ShareButton from "@/components/ui/ShareButton";

import { SITE_CONFIG } from '@/constants/config';
export const dynamic = "force-dynamic";

// --- DATA ESTRUCTURADA PARA EL ÍNDICE ---
const tocData = [
  {
    level: { id: "fase-1", number: "Fase 1", title: "Diagnóstico y Planificación Técnica" },
    treatments: [
      { id: "estudio", name: "Estudio implantológico", price: "Incluido" },
      { id: "ferula-rx", name: "Férula para rayos X", price: "Incluido" },
      { id: "ferula-quirurgica", name: "Férula quirúrgica", price: "Incluido" }
    ]
  },
  {
    level: { id: "fase-2", number: "Fase 2", title: "Preparación y Regeneración (Previas)" },
    treatments: [
      { id: "preprotesica", name: "Cirugía preprotésica", price: "Incluido" },
      { id: "remodelacion", name: "Remodelación maxilar / Alveoloplastia", price: "99 €" },
      { id: "vestibuloplastia", name: "Vestibuloplastia (por cuadrante)", price: "75 €" },
      { id: "elevacion-seno", name: "Elevación de seno cerrado", price: "130 €" },
      { id: "regenerativo", name: "Relleno regenerativo y Membrana", price: "Desde 175 €" },
      { id: "prgf", name: "Plasma Rico en Plaquetas (P.R.G.F)", price: "150 €" }
    ]
  },
  {
    level: { id: "fase-3", number: "Fase 3", title: "La Cirugía (Raíz artificial)" },
    treatments: [
      { id: "implante", name: "Implante de titanio", price: "550 €" },
      { id: "cicatrizacion", name: "Tornillo de cicatrización", price: "Incluido" }
    ]
  },
  {
    level: { id: "fase-4", number: "Fase 4", title: "Conexión y Estructura Intermedia" },
    treatments: [
      { id: "aditamentos", name: "Aditamentos protésicos", price: "247 €" },
      { id: "supraestructuras", name: "Supraestructuras / Falso muñón", price: "Desde 87 €" },
      { id: "cementacion", name: "Tornillo de cementación", price: "Incluido" }
    ]
  },
  {
    level: { id: "fase-5", number: "Fase 5", title: "Corona o Prótesis Definitiva" },
    treatments: [
      { id: "corona-metal", name: "Corona metal-cerámica", price: "303 €" },
      { id: "corona-zirconio", name: "Corona Zirconio", price: "325 €" },
      { id: "corona-resina", name: "Corona resina", price: "274 €" },
      { id: "arcada-fija", name: "Arcada fija metal-resina", price: "2.830 €" },
      { id: "sobredentadura", name: "Sobredentaduras y Anclajes", price: "Desde 230 €" }
    ]
  },
  {
    level: { id: "fase-6", number: "Fase 6", title: "Mantenimiento a Largo Plazo" },
    treatments: [
      { id: "mantenimiento", name: "Limpieza y revisión anual", price: "50 €" }
    ]
  }
];

// ⚡️ METADATA DINÁMICA
export async function generateMetadata(
  { searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const shareId = searchParams?.share as string;
  const baseUrl = SITE_CONFIG?.domain || process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dkvdentisalud.es'; 

  if (shareId) {
    let foundTreatment: any = null;

    for (const section of tocData) {
      const match = section.treatments?.find(t => t.id === shareId);
      if (match) { foundTreatment = match; break; }
    }

    if (foundTreatment) {
      const ogTitleToRender = foundTreatment.price 
        ? `${foundTreatment.name} ${foundTreatment.price}`.toUpperCase() 
        : foundTreatment.name.toUpperCase();

      const boldSnippetTitle = foundTreatment.price
        ? `${foundTreatment.name} por solo ${foundTreatment.price} - Precio cerrado DKV`
        : `${foundTreatment.name} - Exclusivo en Clínicas DKV`;

      return {
        metadataBase: new URL(baseUrl), 
        title: boldSnippetTitle,
        description: `Consulta el precio y detalles de ${foundTreatment.name}. Precios cerrados para asegurados DKV Dentisalud.`,
        openGraph: {
          title: boldSnippetTitle, 
          description: `Consulta en qué consiste y el precio de este tratamiento.`, 
          url: `/tratamientos/implantologia?share=${shareId}#${shareId}`,
          siteName: 'DKV Dentisalud Élite',
          images: [
            {
              url: `/api/og?title=${encodeURIComponent(ogTitleToRender)}&type=tratamiento&v=1`,
              width: 1200,
              height: 630,
              alt: foundTreatment.name,
            }
          ],
          locale: 'es_ES',
          type: 'website',
        }
      };
    }
  }

  return {
    metadataBase: new URL(baseUrl), 
    title: "Implantología y Prótesis Dental | DKV Dentisalud",
    description: "El viaje de tu nuevo diente. Conoce el diccionario clínico de implantología avanzada y todos los precios cerrados de DKV Dentisalud.",
    openGraph: {
      title: "Implantología Avanzada | DKV Dentisalud",
      description: "Descubre el proceso completo de implantología con precios transparentes y cerrados.",
      url: `/tratamientos/implantologia`,
      siteName: 'DKV Dentisalud Élite',
      images: [
        {
          url: `/api/og?title=${encodeURIComponent("IMPLANTOLOGÍA AVANZADA")}&subtitle=${encodeURIComponent("Guía clínica y presupuestos")}&type=categoria&v=1`,
          width: 1200,
          height: 630,
          alt: "Implantología Avanzada",
        }
      ],
      locale: 'es_ES',
      type: 'website',
    }
  };
}

// --- Componentes de UI ---
const TreatmentRow = ({ id, name, price, image, imageAlt, secondaryImage, secondaryImageAlt, titleTag = "h2", children }: { id: string, name: string, price?: string, image?: string, imageAlt?: string, secondaryImage?: string, secondaryImageAlt?: string, titleTag?: "h2" | "p" | "h3", children: React.ReactNode }) => {
  const Tag = titleTag; 

  return (
    <div id={id} className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-md border border-dkv-gray-border/80 hover:shadow-xl hover:border-dkv-green/40 hover:-translate-y-1 transition-all duration-300 group scroll-mt-[130px] md:scroll-mt-[150px]">
      
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
          <img 
            src={image} 
            alt={imageAlt || name} 
            className="w-full h-auto object-contain max-h-[200px] md:max-h-[250px] transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      )}
      
      <div className="text-dkv-gray font-fsme leading-relaxed text-lg md:text-lg space-y-4">
        {children}
      </div>

      {secondaryImage && (
        <div className="mt-8 w-full overflow-hidden rounded-xl border border-gray-100 flex items-center justify-center bg-gray-50/30 py-4">
          <img 
            src={secondaryImage} 
            alt={secondaryImageAlt || `${name} - detalle`} 
            className="w-full h-auto object-contain max-h-[140px] md:max-h-[180px] transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
};

const LevelTitle = ({ id, number, title, description }: { id: string, number: string, title: string, description?: string }) => (
  <div id={id} className="mt-16 mb-8 scroll-mt-[130px] md:scroll-mt-[150px]">
    <span className="text-dkv-green font-bold text-lg uppercase tracking-[0.2em] font-fsme">{number}</span>
    <p className="text-2xl md:text-3xl font-bold font-lemon text-dkv-green-dark border-b-2 border-dkv-green pb-3 inline-block w-full mt-2 uppercase tracking-wide">
      {title}
    </p>
    {description && <p className="text-dkv-gray mt-4 font-fsme text-lg">{description}</p>}
  </div>
);

export default function ImplantologiaPage() {
  const breadcrumbs = [
    { label: "Inicio", href: "/" },
    { label: "Tratamientos", href: "/tratamientos" },
    { label: "Implantología Avanzada", href: "#" }
  ];

  return (
    <div className="min-h-screen bg-white font-fsme text-dkv-gray selection:bg-dkv-green selection:text-white pb-32">
      <CookieBanner />
      <Header />

      <main className="pt-[30px] md:pt-[110px] lg:pt-[130px]">
        <FixedBreadcrumb items={breadcrumbs} />

        {/* ⚡️ USAMOS LA MISMA FIRMA EXACTA DE PROPS QUE EN ORTODONCIA */}
        <TreatmentsHero 
          badgeText="Diccionario Clínico Avanzado"
          title={{ dark: "IMPLANTOLOGÍA Y", normal: "CIRUGÍA ORAL" }} 
          description={[
            "Un implante no es un 'producto' que se compra y se pone en una hora; es una secuencia de actos médicos interdependientes.",
            "Conoce la anatomía completa de tu tratamiento fase a fase, sin sorpresas."
          ]}
        />

        <section className="bg-dkv-gray-border/30">
          <div className="container mx-auto px-4 max-w-4xl flow-root">

            {/* NIVEL 1 */}
            <ScrollReveal>
              <LevelTitle 
                id="fase-1"
                number="Fase 1" 
                title="Diagnóstico y Planificación Técnica" 
                description="Antes de operar, debemos tener un mapa exacto de tu anatomía."
              />
            </ScrollReveal>
            
            <div className="space-y-6">
              <ScrollReveal delay={100} direction="left">
                <TreatmentRow id="estudio" name="Estudio implantológico" price="Incluido">
                  <p><strong>¿Qué es?</strong> Es el análisis clínico integral de tu boca. Consiste en revisar tu historial médico, explorar tus encías, analizar tu mordida (oclusión) y evaluar radiografías o escáneres 3D.</p>
                  <p><strong>¿Por qué hace falta?</strong> Porque cada paciente es único. Necesitamos saber si tienes hueso suficiente, infecciones previas o tomas medicación.</p>
                  <p className="text-sm italic"><strong>Secuencia:</strong> Paso 0. Empieza y acaba en la primera visita (1 hora aprox). Determina si necesitarás cirugías regenerativas previas.</p>
                </TreatmentRow>
              </ScrollReveal>

              <ScrollReveal delay={100} direction="left">
                <TreatmentRow id="ferula-rx" name="Férula para rayos X" price="Incluido">
                  <p><strong>¿Qué es?</strong> Es un molde de plástico (resina) con marcas radiopacas que el paciente se pone durante el escáner (TAC).</p>
                  <p><strong>¿Por qué hace falta?</strong> Permite al odontólogo ver en el escáner 3D exactamente dónde irán los futuros dientes en relación con el hueso disponible.</p>
                  <p className="text-sm italic"><strong>Secuencia:</strong> Es la "madre" de la férula quirúrgica.</p>
                </TreatmentRow>
              </ScrollReveal>

              <ScrollReveal delay={100} direction="left">
                <TreatmentRow id="ferula-quirurgica" name="Férula quirúrgica" price="Incluido">
                  <p><strong>¿Qué es?</strong> Una guía de acrílico impresa en 3D con unos pequeños "túneles" o anillos metálicos que se encaja sobre tus dientes durante la operación.</p>
                  <p><strong>¿Por qué hace falta?</strong> Actúa como un "GPS". Garantiza que el cirujano perfore el hueso en el ángulo y profundidad exactos planificados por ordenador, evitando nervios y vasos sanguíneos.</p>
                </TreatmentRow>
              </ScrollReveal>
            </div>

            {/* NIVEL 2 */}
            <ScrollReveal>
              <LevelTitle 
                id="fase-2"
                number="Fase 2" 
                title="Preparación del Terreno y Regeneración" 
                description="Solo necesarias si tu hueso o encía se han encogido o atrofiado por la pérdida del diente antiguo."
              />
            </ScrollReveal>
            
            <div className="space-y-6">
              <ScrollReveal delay={100} direction="left">
                <TreatmentRow id="preprotesica" name="Cirugía preprotésica" price="Incluido">
                  <p>Término general para pequeñas cirugías que acondicionan la boca antes de recibir una prótesis o implante (ej. quitar un frenillo, suavizar un bulto de hueso).</p>
                </TreatmentRow>
              </ScrollReveal>

              <ScrollReveal delay={100} direction="left">
                <TreatmentRow id="remodelacion" name="Remodelación maxilar / Alveoloplastia" price="99 €">
                  <p><strong>¿Qué es?</strong> Alisar y nivelar el hueso de la mandíbula después de una extracción para eliminar "picos" que pincharían la futura prótesis o dificultarían el implante.</p>
                  <p className="text-sm italic">Dura unos 30 minutos y suele hacerse simultáneamente a la extracción del diente en mal estado.</p>
                </TreatmentRow>
              </ScrollReveal>

              <ScrollReveal delay={100} direction="left">
                <TreatmentRow id="elevacion-seno" name="Elevación de seno cerrado" price="130 €">
                  <p><strong>¿Qué es?</strong> Procedimiento para elevar el piso de los senos paranasales en el maxilar superior cuando se han perdido las muelas y falta altura de hueso.</p>
                  <p>A través de la incisión del futuro implante, se empuja suavemente la membrana hacia arriba para crear espacio para el relleno óseo.</p>
                </TreatmentRow>
              </ScrollReveal>

              <ScrollReveal delay={100} direction="left">
                <TreatmentRow id="regenerativo" name="Material de relleno y Membrana" price="Desde 175 €">
                  <p><strong>¿Qué son?</strong> El relleno es "hueso en polvo" que hace de andamio para que tu cuerpo cree hueso nuevo. La membrana es un parche protector que evita que la encía invada el injerto.</p>
                  <div className="bg-dkv-gray-light/30 rounded-2xl p-5 border border-dkv-gray-border mt-4">
                    <ul className="space-y-3">
                      <li className="flex justify-between items-center pb-2 border-b border-dkv-gray-border/50">
                        <span className="text-dkv-gray font-bold">Material de relleno regenerativo</span>
                        <span className="font-lemon text-lg text-dkv-green-dark shrink-0">175 €</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span className="text-dkv-gray font-bold">Membrana reabsorbible o malla de titanio</span>
                        <span className="font-lemon text-lg text-dkv-green-dark shrink-0">200 €</span>
                      </li>
                    </ul>
                  </div>
                </TreatmentRow>
              </ScrollReveal>

              <ScrollReveal delay={100} direction="left">
                <TreatmentRow id="prgf" name="Plasma Rico en Plaquetas (P.R.G.F)" price="150 €">
                  <p><strong>El Turbo Biológico:</strong> Material biológico de "cero rechazo" extraído de tu propia sangre en la clínica. Acelera la cicatrización, compacta el injerto óseo y disminuye drásticamente el dolor e inflamación postoperatoria.</p>
                </TreatmentRow>
              </ScrollReveal>
            </div>

            {/* NIVEL 3 */}
            <ScrollReveal>
              <LevelTitle 
                id="fase-3"
                number="Fase 3" 
                title="La Cirugía Propiamente Dicha" 
                description="Colocación de la raíz artificial."
              />
            </ScrollReveal>
            
            <div className="space-y-6">
              <ScrollReveal delay={100} direction="left">
                <TreatmentRow id="implante" name="Implante de titanio" price="550 €">
                  <p><strong>¿Qué es?</strong> Es un cilindro de titanio biocompatible con forma de tornillo que hace las veces de raíz del diente perdido.</p>
                  <p><strong>¿Por qué hace falta?</strong> Para anclar firmemente un diente artificial al hueso, evitar la reabsorción ósea por desuso y devolver la capacidad masticatoria.</p>
                  <p className="text-sm italic"><strong>Integración:</strong> Necesita un periodo de osteointegración (fusión con el hueso) de entre 2 y 4 meses.</p>
                </TreatmentRow>
              </ScrollReveal>

              <ScrollReveal delay={100} direction="left">
                <TreatmentRow id="cicatrizacion" name="Tornillo de cicatrización" price="Incluido">
                  <p>Un pequeño tapón metálico (como un botón) que se enrosca en el implante. Su misión es "guiar" a la encía mientras cicatriza, formando un túnel perfecto por donde asomará el futuro diente natural.</p>
                </TreatmentRow>
              </ScrollReveal>
            </div>

            {/* NIVEL 4 */}
            <ScrollReveal>
              <LevelTitle 
                id="fase-4"
                number="Fase 4" 
                title="Conexión y Estructura" 
                description="El puente protésico intermedio entre la raíz hundida en el hueso y el diente que tú ves."
              />
            </ScrollReveal>
            
            <div className="space-y-6">
              <ScrollReveal delay={100} direction="left">
                <TreatmentRow id="aditamentos" name="Aditamentos protésicos / Piezas intermedias" price="247 €">
                  <p><strong>¿Qué son?</strong> Componentes de micro-ingeniería (pilares, análogos) que conectan el interior del implante con la corona. Hacen de "amortiguador" de las fuerzas de masticación y permiten atornillar la corona.</p>
                </TreatmentRow>
              </ScrollReveal>

              <ScrollReveal delay={100} direction="left">
                <TreatmentRow id="supraestructuras" name="Supraestructuras y Falsos Muñones">
                  <p>Versiones personalizadas de los aditamentos. Se tallan en laboratorio para pacientes que necesitan corregir ángulos muy pronunciados (ej. implante inclinado pero corona recta).</p>
                  <div className="bg-dkv-gray-light/30 rounded-2xl p-5 border border-dkv-gray-border mt-4">
                    <ul className="space-y-3">
                      <li className="flex justify-between items-center pb-2 border-b border-dkv-gray-border/50">
                        <span className="text-dkv-gray font-bold">Supra o mesoestructuras</span>
                        <span className="font-lemon text-lg text-dkv-green-dark shrink-0">87 €</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span className="text-dkv-gray font-bold">Falso muñón de titanio</span>
                        <span className="font-lemon text-lg text-dkv-green-dark shrink-0">216 €</span>
                      </li>
                    </ul>
                  </div>
                </TreatmentRow>
              </ScrollReveal>
            </div>

            {/* NIVEL 5 */}
            <ScrollReveal>
              <LevelTitle 
                id="fase-5"
                number="Fase 5" 
                title="La Corona o Prótesis Definitiva" 
                description="La parte estética y funcional con la que vas a sonreír y comer."
              />
            </ScrollReveal>
            
            <div className="space-y-6">
              <ScrollReveal delay={100} direction="left">
                <TreatmentRow id="corona-zirconio" name="Corona Zirconio sobre implante" price="325 €">
                  <p><strong>Estética Perfecta:</strong> Diente artificial sin metal en su interior. Fabricado en Zirconio (mineral blanco ultra-resistente). La luz la atraviesa como a un diente natural y evita que la encía se oscurezca con los años. Ideal para zonas frontales.</p>
                </TreatmentRow>
              </ScrollReveal>

              <ScrollReveal delay={100} direction="left">
                <TreatmentRow id="corona-metal" name="Corona metal-cerámica" price="303 €">
                  <p><strong>Máxima Resistencia:</strong> Diente artificial con esqueleto interno de metal recubierto de porcelana. Es el estándar de oro en molares posteriores por su fuerza para triturar.</p>
                </TreatmentRow>
              </ScrollReveal>

              {/* ARCADA COMPLETA */}
              <div className="mt-12 mb-6">
                <h3 className="text-2xl font-lemon text-dkv-green-dark uppercase">Soluciones para pérdida total (Arcadas)</h3>
              </div>

              <ScrollReveal delay={100} direction="left">
                <TreatmentRow id="arcada-fija" name="Arcada fija metal-resina" price="2.830 €">
                  <p>Puente completo de una mandíbula entera (10-12 dientes) que va atornillado firmemente sobre 4, 6 u 8 implantes. Para pacientes que quieren recuperar una dentadura 100% fija que no se quita jamás para dormir.</p>
                </TreatmentRow>
              </ScrollReveal>

              <ScrollReveal delay={100} direction="left">
                <TreatmentRow id="sobredentadura" name="Sobredentaduras y Sistemas de Anclaje">
                  <p>Una "dentadura postiza" pero que lleva unos broches internos (Locator) que hacen "clic" sobre los implantes. El paciente se la quita para lavarla, pero queda totalmente fija al comer o hablar. Ideal para gran pérdida ósea o presupuestos ajustados.</p>
                  <div className="bg-dkv-gray-light/30 rounded-2xl p-5 border border-dkv-gray-border mt-4">
                    <ul className="space-y-3">
                      <li className="flex justify-between items-center pb-2 border-b border-dkv-gray-border/50">
                        <span className="text-dkv-gray font-bold">Sobredentadura completa</span>
                        <span className="font-lemon text-lg text-dkv-green-dark shrink-0">890 €</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span className="text-dkv-gray font-bold">Sistema de anclaje (Bolas/Locator) por unidad</span>
                        <span className="font-lemon text-lg text-dkv-green-dark shrink-0">230 €</span>
                      </li>
                    </ul>
                  </div>
                </TreatmentRow>
              </ScrollReveal>
            </div>

            {/* NIVEL 6 */}
            <ScrollReveal>
              <LevelTitle 
                id="fase-6"
                number="Fase 6" 
                title="Mantenimiento a Largo Plazo" 
                description="Tu seguro de vida para la inversión realizada."
              />
            </ScrollReveal>
            
            <div className="space-y-6">
              <ScrollReveal delay={100} direction="left">
                <TreatmentRow id="mantenimiento" name="Limpieza y revisión anual de implantes" price="50 €">
                  <p><strong>¿Por qué hace falta?</strong> El titanio no coge caries, pero la placa bacteriana puede inflamar la encía y causar Periimplantitis (rechazo tardío por infección). Usamos curetas de teflón para no rayar el implante y limpiar bajo las encías.</p>
                  <p className="text-sm italic">Debe repetirse cada 6-12 meses de por vida para garantizar la supervivencia del implante.</p>
                </TreatmentRow>
              </ScrollReveal>
            </div>

            {/* ADVERTENCIA CLÍNICA */}
            <ScrollReveal>
              <div className="mt-20 p-8 md:p-12 mb-12 rounded-3xl bg-dkv-green-dark text-white text-center shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-dkv-green opacity-20 blur-3xl rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-dkv-green opacity-20 blur-3xl rounded-full"></div>
                <AlertCircle className="w-12 h-12 mx-auto mb-6 text-dkv-green" />
                <p className="text-xl md:text-2xl font-medium leading-relaxed italic font-fsme max-w-3xl mx-auto relative z-10">
                  "Saber exactamente qué hacemos en cada fase es tu mayor ventaja. Comprender este desglose clínico te asegura entender el valor real de tu tratamiento y por qué cada paso es vital para que tu sonrisa dure toda la vida."
                </p>
              </div>
            </ScrollReveal>

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
                      La información reflejada en esta página tiene mero carácter orientativo. El diagnóstico profesional que necesitas únicamente te lo podrá proporcionar un dentista en su consulta. Los precios serán fieles a los indicados.
                    </p>
                  </div>
                  <p className="text-lg text-dkv-gray mb-6">
                    Te invitamos a solicitar una cita de valoración en uno de nuestros centros dentales para estudiar tu caso, y ofrecerte el plan exacto que se requiere para restaurar tu sonrisa. Encuentra tu centro:
                  </p>
                  <div className="max-w-4xl mx-auto mb-24">
                      <HeroSearch />
                  </div>
                </div>

              </div>
            </ScrollReveal>
          </div>
        </section>

      </main>

      <GodLevelTOC tocData={tocData} />

      <FooterLegal />
    </div>
  );
}