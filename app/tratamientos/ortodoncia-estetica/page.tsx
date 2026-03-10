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
// Nivel 1 forzamos tu orden: Ficha 5, 2, 3, 1, 4
const tocData = [
  {
    level: { id: "nivel-1", number: "Nivel 1", title: "Tratamientos Estrella: Estética y Ortodoncia Invisible" },
    treatments: [
      { id: "autoligables", name: "Ortodoncia Fija Avanzada (Brackets Autoligables)", price: "596 €" },
      { id: "carillas", name: "Carillas Estéticas y Diseño Digital de Sonrisa", price: "Desde 396 €" },
      { id: "zafiro", name: "Ortodoncia Fija Estética (Brackets de Zafiro)", price: "596 €" },
      { id: "invisible", name: "Ortodoncia Invisible (Alineadores Transparentes)", price: "3.210 €" },
      { id: "lingual", name: "Ortodoncia Fija Lingual (100% Invisible)", price: "596 €" }
    ]
  },
  {
    level: { id: "nivel-2", number: "Nivel 2", title: "Ortodoncia Fija: Precisión y Control" },
    treatments: [
      { id: "metalicos", name: "Ortodoncia Fija Convencional (Brackets Metálicos)", price: "298 €" }
    ]
  },
  {
    level: { id: "nivel-3", number: "Nivel 3", title: "Procedimientos Transversales Obligatorios" },
    treatments: [
      { id: "diagnostico", name: "Diagnóstico Preciso y Retención Final" }
    ]
  },
  {
    level: { id: "nivel-4", number: "Nivel 4", title: "Aparatología Auxiliar y Odontopediatría" },
    treatments: [
      { id: "auxiliares", name: "Auxiliares Biomecánicos y Removibles" },
      { id: "odontopediatria", name: "Odontopediatría y Crecimiento" }
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
    let foundTreatment = null;
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
        description: `Consulta el precio y detalles de ${foundTreatment.name}. Precios cerrados para asegurados DKV.`,
        openGraph: {
          title: boldSnippetTitle, 
          description: `Consulta en qué consiste y el precio de este tratamiento.`, 
          url: `/tratamientos/ortodoncia-estetica?share=${shareId}#${shareId}`,
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
    title: "Ortodoncia y Estética Dental en Adultos | DKV Dentisalud",
    description: "Alinea tu sonrisa con la última tecnología: Invisalign, brackets de zafiro, lingual y carillas estéticas con precios cerrados en toda España.",
    openGraph: {
      title: "Ortodoncia y Estética Dental | DKV Dentisalud",
      description: "Tratamientos de ortodoncia invisible y estética dental con precios cerrados.",
      url: `/tratamientos/ortodoncia-estetica`,
      siteName: 'DKV Dentisalud Élite',
      images: [
        {
          url: `/api/og?title=${encodeURIComponent("ORTODONCIA Y ESTÉTICA DENTAL")}&subtitle=${encodeURIComponent("Guía de tratamientos y presupuestos")}&type=categoria&v=1`,
          width: 1200,
          height: 630,
          alt: "Ortodoncia y Estética",
        }
      ],
      locale: 'es_ES',
      type: 'website',
    }
  };
}

// --- Componentes de UI ---
const TreatmentRow = ({ id, name, price, image, imageAlt, titleTag = "h2", children }: { id: string, name: string, price?: string, image?: string, imageAlt?: string, titleTag?: "h2" | "p" | "h3", children: React.ReactNode }) => {
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

export default function OrtodonciaEsteticaPage() {
  const breadcrumbs = [
    { label: "Inicio", href: "/" },
    { label: "Tratamientos", href: "/tratamientos" },
    { label: "Ortodoncia y Estética", href: "#" }
  ];

  return (
    <div className="min-h-screen bg-white font-fsme text-dkv-gray selection:bg-dkv-green selection:text-white pb-32">
      <CookieBanner />
      <Header />

      <main className="pt-[30px] md:pt-[110px] lg:pt-[130px]">
        <FixedBreadcrumb items={breadcrumbs} />

        <TreatmentsHero 
          badgeText="Guía de Tratamientos y Presupuestos"
          title={{ dark: "ORTODONCIA Y", normal: "ESTÉTICA DENTAL" }} 
          description={[
            "Nunca se es demasiado mayor para beneficiarse de un tratamiento de ortodoncia o de estética dental. Hoy en día, los adultos representan una gran parte de nuestros pacientes.",
            "Corregir tus dientes no solo te devuelve la confianza al sonreír, sino que <strong>facilita el cepillado diario, previene el desgaste dental anormal y mejora la salud de tus encías</strong>."
          ]}
        />

        <section className="bg-dkv-gray-border/30">
          <div className="container mx-auto px-4 max-w-4xl flow-root">

            {/* NIVEL 1 */}
            <ScrollReveal>
              <LevelTitle 
                id="nivel-1"
                number="Nivel 1 de demanda" 
                title="Tratamientos Estrella: Estética y Ortodoncia Invisible" 
              />
            </ScrollReveal>
            
            <div className="space-y-6">
              
              {/* Ficha 5 */}
              <ScrollReveal delay={100} direction="left">
                <TreatmentRow id="autoligables" name="Ortodoncia Fija Avanzada (Brackets Autoligables)" price="596 €">
                  <p>Una evolución tecnológica del bracket metálico tradicional que prescinde de ataduras.</p>
                  <p><strong>Por qué elegirlo:</strong> Poseen una pequeña "compuerta" que sujeta el arco, eliminando las gomitas elásticas. Esto reduce la fricción, aplica fuerzas más biológicas y facilita enormemente el cepillado diario.</p>
                  <div className="bg-dkv-gray-light/30 rounded-2xl p-5 border border-dkv-gray-border mt-4">
                    <ul className="space-y-4">
                      <li className="flex flex-col md:flex-row md:justify-between items-start md:items-center pb-3 border-b border-dkv-gray-border/50">
                        <span className="font-bold text-dkv-gray">Aparatología base ambos maxilares</span>
                        <span className="font-lemon text-lg text-dkv-green-dark shrink-0">596 €</span>
                      </li>
                      <li className="flex flex-col md:flex-row md:justify-between items-start md:items-center pb-3 border-b border-dkv-gray-border/50">
                        <span className="font-bold text-dkv-gray">Suplemento autoligable (por maxilar)</span>
                        <span className="font-lemon text-lg text-dkv-green-dark shrink-0">140 €</span>
                      </li>
                      <li className="flex flex-col md:flex-row md:justify-between items-start md:items-center">
                        <span className="font-medium text-dkv-gray/80 italic text-sm">Tratamientos asociados: Visitas de revisión (30€) y reposición de bracket (20€).</span>
                      </li>
                    </ul>
                  </div>
                </TreatmentRow>
              </ScrollReveal>

              {/* Ficha 2 */}
              <ScrollReveal delay={100} direction="left">
                <TreatmentRow 
                    id="carillas" 
                    name="Carillas Estéticas y Diseño Digital de Sonrisa (Dental Smile Design)" 
                    image="/images/tratamientos/estetica-carilla-disilicato.png"
                  >
                  <p>Para aquellos pacientes que, además de oclusión, buscan perfeccionar el tamaño, la forma y el color de sus dientes de manera inmediata. Apoyados en la tecnología tridimensional, planificamos el resultado final antes de tocar un solo diente.</p>
                  
                  <div className="mt-6 mb-4">
                    <h3 className="text-dkv-green-dark font-bold font-lemon text-sm uppercase mb-3">Fase de Estudio y Diseño (Incluido)</h3>
                    <ul className="space-y-2 text-base">
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-dkv-green shrink-0 mt-0.5" /> <span><strong>Modelos y estudio fotográfico:</strong> Registro facial y dental.</span></li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-dkv-green shrink-0 mt-0.5" /> <span><strong>Encerado diagnóstico estético:</strong> Modelado en cera para previsualizar volumen y forma.</span></li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-dkv-green shrink-0 mt-0.5" /> <span><strong>Mock-up / Carilla provisional:</strong> Prueba reversible de resina sobre tus dientes para "probarte" tu nueva sonrisa.</span></li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-dkv-green shrink-0 mt-0.5" /> <span><strong>Informe del estudio:</strong> Registros para analizar en casa.</span></li>
                    </ul>
                  </div>

                  <div className="bg-dkv-gray-light/30 rounded-2xl p-5 border border-dkv-gray-border mt-6">
                    <h3 className="text-dkv-green-dark font-bold font-lemon text-sm uppercase mb-4">Fase de Tratamiento (Opciones por diente)</h3>
                    <ul className="space-y-4">
                      <li className="flex flex-col md:flex-row justify-between items-start pb-4 border-b border-dkv-gray-border/50 gap-4">
                        <div>
                          <span className="font-bold text-dkv-gray block mb-1">Carilla de porcelana (técnica 3D)</span>
                          <span className="text-sm text-dkv-gray/80">Láminas ultrafinas de cerámica elaboradas por ordenador.</span>
                        </div>
                        <span className="font-lemon text-xl text-dkv-green-dark shrink-0">396 €</span>
                      </li>
                      <li className="flex flex-col md:flex-row justify-between items-start gap-4">
                        <div>
                          <span className="font-bold text-dkv-gray block mb-1">Carilla estética de disilicato de litio</span>
                          <span className="text-sm text-dkv-gray/80">Material de última generación con máxima resistencia y translucidez.</span>
                        </div>
                        <span className="font-lemon text-xl text-dkv-green-dark shrink-0">400 €</span>
                      </li>
                    </ul>
                  </div>
                </TreatmentRow>
              </ScrollReveal>

              {/* Ficha 3 */}
              <ScrollReveal delay={100} direction="left">
                <TreatmentRow 
                    id="zafiro" 
                    name="Ortodoncia Fija Estética (Brackets de Zafiro)" 
                    price="596 €"
                    image="/images/tratamientos/ortodoncia-standard-zirconio.png"
                  >
                  <p>La opción ideal para quienes requieren la eficacia del bracket tradicional con un alto nivel de discreción visual.</p>
                  <p><strong>Por qué elegirlo:</strong> Están fabricados con cristal de zafiro. A diferencia de otros plásticos o cerámicas, el zafiro no se mancha ni se tiñe con alimentos (como el café o el vino), manteniendo su total transparencia durante todo el tratamiento.</p>
                  
                  <div className="bg-dkv-gray-light/30 rounded-2xl p-5 border border-dkv-gray-border mt-4">
                    <ul className="space-y-4">
                      <li className="flex flex-col md:flex-row md:justify-between items-start md:items-center pb-3 border-b border-dkv-gray-border/50">
                        <span className="font-bold text-dkv-gray">Aparatología base ambos maxilares</span>
                        <span className="font-lemon text-lg text-dkv-green-dark shrink-0">596 €</span>
                      </li>
                      <li className="flex flex-col md:flex-row md:justify-between items-start md:items-center pb-3 border-b border-dkv-gray-border/50">
                        <span className="font-bold text-dkv-gray">Suplemento estético (por maxilar)</span>
                        <span className="font-lemon text-lg text-dkv-green-dark shrink-0">180 €</span>
                      </li>
                      <li className="flex flex-col md:flex-row md:justify-between items-start md:items-center">
                        <span className="font-medium text-dkv-gray/80 italic text-sm">Tratamientos sencillos asociados: Visitas de revisión periódica (30€) y reposición de bracket (20€).</span>
                      </li>
                    </ul>
                  </div>
                </TreatmentRow>
              </ScrollReveal>

              {/* Ficha 1 */}
              <ScrollReveal delay={100} direction="left">
                <TreatmentRow 
                    id="invisible" 
                    name="Ortodoncia Invisible (Alineadores Transparentes / Invisalign)" 
                    price="3.210 €"
                    image="/images/tratamientos/ortodoncia-invisalign.png"
                  >
                  <p>Es actualmente el sistema más demandado por pacientes adultos debido a su comodidad y altísima estética. Consiste en una secuencia de férulas de plástico transparente y removibles fabricadas a medida mediante tecnología digital tridimensional.</p>
                  <p><strong>Por qué elegirlo:</strong> Son prácticamente invisibles y eliminan el riesgo de rozaduras o llagas. Al ser removibles, permiten comer con total normalidad y mantener una higiene dental óptima sin obstáculos. A través de un software 3D, podrás ver la evolución de tu sonrisa antes de empezar.</p>
                  <p><strong>El factor de adaptación:</strong> Los primeros días de cada férula nueva sentirás una ligera presión (señal de que los dientes se están moviendo) y puede que notes un levísimo cambio en la pronunciación, el cual desaparece en unos días.</p>
                  
                  <div className="bg-dkv-gray-light/30 rounded-2xl p-5 border border-dkv-gray-border mt-6">
                    <h3 className="text-dkv-green-dark font-bold font-lemon text-sm uppercase mb-4">Precios integrales cerrados</h3>
                    <ul className="space-y-4">
                      <li className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-dkv-gray-border/50">
                        <span className="font-bold text-dkv-gray">Tratamiento completo ambos maxilares hasta 12 meses</span>
                        <span className="font-lemon text-xl text-dkv-green-dark shrink-0 mt-1 md:mt-0">3.210 €</span>
                      </li>
                      <li className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-dkv-gray-border/50">
                        <span className="font-bold text-dkv-gray">Tratamiento completo ambos maxilares hasta 24 meses</span>
                        <span className="font-lemon text-xl text-dkv-green-dark shrink-0 mt-1 md:mt-0">4.000 €</span>
                      </li>
                      <li className="flex flex-col md:flex-row justify-between items-start md:items-center pt-2">
                        <span className="font-medium text-dkv-gray/80 italic text-sm">Requiere Diagnóstico inicial (para trazar el mapa de ruta) y Aparatología estabilizadora final (retención).</span>
                      </li>
                    </ul>
                  </div>
                </TreatmentRow>
              </ScrollReveal>

              {/* Ficha 4 */}
              <ScrollReveal delay={100} direction="left">
                <TreatmentRow 
                    id="lingual" 
                    name="Ortodoncia Fija Lingual (100% Invisible)" 
                    price="596 €"
                    image="/images/tratamientos/ortodoncia-lingual.png"
                  >
                  <p>La única técnica verdaderamente imperceptible desde el exterior, indicada para pacientes con las más altas exigencias sociolaborales.</p>
                  <p><strong>Por qué elegirlo:</strong> Los brackets se adhieren en la cara interna (lingual) de los dientes, quedando totalmente ocultos, ofreciendo un control tridimensional idéntico al de los brackets exteriores.</p>
                  
                  <div className="bg-dkv-gray-light/30 rounded-2xl p-5 border border-dkv-gray-border mt-4">
                    <ul className="space-y-4">
                      <li className="flex flex-col md:flex-row md:justify-between items-start md:items-center pb-3 border-b border-dkv-gray-border/50">
                        <span className="font-bold text-dkv-gray">Aparatología base ambos maxilares</span>
                        <span className="font-lemon text-lg text-dkv-green-dark shrink-0">596 €</span>
                      </li>
                      <li className="flex flex-col md:flex-row md:justify-between items-start md:items-center">
                        <span className="font-bold text-dkv-gray">Suplemento técnica lingual</span>
                        <span className="font-lemon text-lg text-dkv-green-dark shrink-0">1.442 €</span>
                      </li>
                    </ul>
                  </div>
                </TreatmentRow>
              </ScrollReveal>

            </div>

            {/* NIVEL 2 */}
            <ScrollReveal>
              <LevelTitle 
                id="nivel-2"
                number="Nivel 2 de demanda" 
                title="Ortodoncia Fija: Precisión y Control" 
              />
            </ScrollReveal>
            
            <div className="space-y-6">
              {/* Ficha 6 */}
              <ScrollReveal delay={100} direction="left">
                <TreatmentRow 
                    id="metalicos" 
                    name="Ortodoncia Fija Convencional (Brackets Metálicos)" 
                    price="298 €"
                    image="/images/tratamientos/ortodoncia-standard.png"
                  >
                  <p>El estándar clínico biomecánico. Sigue siendo la herramienta más predecible y económica para resolver maloclusiones complejas.</p>
                  
                  <div className="bg-dkv-gray-light/30 rounded-2xl p-5 border border-dkv-gray-border mt-4">
                    <ul className="space-y-4">
                      <li className="flex flex-col md:flex-row md:justify-between items-start md:items-center pb-3 border-b border-dkv-gray-border/50">
                        <span className="font-bold text-dkv-gray">Aparatología por un maxilar</span>
                        <span className="font-lemon text-lg text-dkv-green-dark shrink-0">298 €</span>
                      </li>
                      <li className="flex flex-col md:flex-row md:justify-between items-start md:items-center pb-3 border-b border-dkv-gray-border/50">
                        <span className="font-bold text-dkv-gray">Aparatología ambos maxilares en acero</span>
                        <span className="font-lemon text-lg text-dkv-green-dark shrink-0">596 €</span>
                      </li>
                      <li className="flex flex-col md:flex-row md:justify-between items-start md:items-center">
                        <span className="font-medium text-dkv-gray/80 italic text-sm">Tratamientos asociados: Visitas de revisión (30€) y reposición de bracket (20€).</span>
                      </li>
                    </ul>
                  </div>
                </TreatmentRow>
              </ScrollReveal>
            </div>

            {/* NIVEL 3 */}
            <ScrollReveal>
              <LevelTitle 
                id="nivel-3"
                number="Nivel 3" 
                title="Procedimientos Transversales Obligatorios" 
                description="Estos procedimientos son el inicio y el fin clínico necesario para que cualquier tratamiento sea un éxito a largo plazo."
              />
            </ScrollReveal>
            
            <div className="space-y-6">
              {/* Ficha 7 */}
              <ScrollReveal delay={100} direction="left">
                <TreatmentRow id="diagnostico" name="Diagnóstico Preciso y Retención Final">
                  
                  <div className="mb-6">
                    <h3 className="text-dkv-green-dark font-bold font-lemon text-sm uppercase mb-3">Diagnóstico Ortodóntico Inicial</h3>
                    <div className="bg-dkv-gray-light/30 rounded-2xl p-5 border border-dkv-gray-border">
                      <ul className="space-y-4">
                        <li className="flex justify-between items-center pb-3 border-b border-dkv-gray-border/50">
                          <span className="font-bold text-dkv-gray">Estudio cefalométrico <span className="text-sm font-normal block md:inline text-dkv-gray/80">(Radiografía para medir ángulos óseos)</span></span>
                          <span className="font-lemon text-lg text-dkv-green-dark">50 €</span>
                        </li>
                        <li className="flex justify-between items-center pb-3 border-b border-dkv-gray-border/50">
                          <span className="font-bold text-dkv-gray">Estudio fotográfico <span className="text-sm font-normal block md:inline text-dkv-gray/80">(Análisis de proporciones faciales)</span></span>
                          <span className="font-lemon text-lg text-dkv-green-dark">30 €</span>
                        </li>
                        <li className="flex justify-between items-center">
                          <span className="font-bold text-dkv-gray">Modelos de estudio <span className="text-sm font-normal block md:inline text-dkv-gray/80">(Réplicas en yeso de tu mordida)</span></span>
                          <span className="font-lemon text-lg text-dkv-green-dark">Incluido</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-dkv-green-dark font-bold font-lemon text-sm uppercase mb-3">Estabilización y Mantenimiento</h3>
                    <p className="text-sm italic mb-4">Los dientes tienen memoria y tienden a moverse al retirar los aparatos.</p>
                    <div className="bg-dkv-gray-light/30 rounded-2xl p-5 border border-dkv-gray-border">
                      <ul className="space-y-4">
                        <li className="flex justify-between items-center pb-3 border-b border-dkv-gray-border/50">
                          <span className="font-bold text-dkv-gray">Aparatología estabilizadora por aparato</span>
                          <span className="font-lemon text-lg text-dkv-green-dark">108 €</span>
                        </li>
                        <li className="flex justify-between items-center pb-3 border-b border-dkv-gray-border/50">
                          <span className="font-bold text-dkv-gray">Visitas de revisión postratamiento</span>
                          <span className="font-lemon text-lg text-dkv-green-dark">25 €</span>
                        </li>
                        <li className="flex justify-between items-center">
                          <span className="font-bold text-dkv-gray">Control ortodóntico periodontal (mayores de 14 años)</span>
                          <span className="font-lemon text-lg text-dkv-green-dark">25 €</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                </TreatmentRow>
              </ScrollReveal>
            </div>

            {/* NIVEL 4 */}
            <ScrollReveal>
              <LevelTitle 
                id="nivel-4"
                number="Nivel 4" 
                title="Aparatología Auxiliar y Odontopediatría" 
                description="Agrupamos aquí las herramientas para resolver complejidades puntuales en adultos, y la ortopedia exclusiva para niños."
              />
            </ScrollReveal>
            
            <div className="space-y-6">

              {/* Ficha 8 */}
              <ScrollReveal delay={100} direction="left">
                <TreatmentRow id="auxiliares" name="Auxiliares Biomecánicos y Removibles">
                  <p>Dispositivos extra que tu especialista puede requerir para movimientos muy específicos.</p>
                  
                  <div className="bg-dkv-gray-light/30 rounded-2xl p-5 border border-dkv-gray-border mt-4">
                    <ul className="space-y-4">
                      <li className="flex justify-between items-center pb-3 border-b border-dkv-gray-border/50">
                        <span className="font-bold text-dkv-gray">Microimplante ortodóncico <span className="text-sm font-normal block text-dkv-gray/80">Fijación temporal de titanio como "ancla".</span></span>
                        <span className="font-lemon text-lg text-dkv-green-dark shrink-0">90 €</span>
                      </li>
                      <li className="flex justify-between items-center pb-3 border-b border-dkv-gray-border/50">
                        <span className="font-bold text-dkv-gray">Quadhelix <span className="text-sm font-normal block text-dkv-gray/80">Expansor fijo para paladar estrecho.</span></span>
                        <span className="font-lemon text-lg text-dkv-green-dark shrink-0">100 €</span>
                      </li>
                      <li className="flex justify-between items-center pb-3 border-b border-dkv-gray-border/50">
                        <span className="font-bold text-dkv-gray">Ortodoncia Removible Básica <span className="text-sm font-normal block text-dkv-gray/80">Por maxilar 200€ / Ambos maxilares 400€ / Revisiones 25€.</span></span>
                        <span className="font-lemon text-lg text-dkv-green-dark shrink-0">Desde 200 €</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span className="font-bold text-dkv-gray">Aparatos Funcionales <span className="text-sm font-normal block text-dkv-gray/80">Posicionador por aparato (144€) / Placa respiratoria (87€).</span></span>
                        <span className="font-lemon text-lg text-dkv-green-dark shrink-0">Desde 87 €</span>
                      </li>
                    </ul>
                  </div>
                </TreatmentRow>
              </ScrollReveal>

              {/* Ficha 9 */}
              <ScrollReveal delay={100} direction="left">
                <TreatmentRow 
                    id="odontopediatria" 
                    name="Odontopediatría y Crecimiento (Niños y adolescentes)"
                    image="/images/tratamientos/ortodoncia-removible.png"
                  >
                  <p>Aparatología diseñada para guiar el crecimiento óseo o prevenir problemas por pérdida prematura de dientes de leche.</p>
                  
                  <div className="bg-dkv-gray-light/30 rounded-2xl p-5 border border-dkv-gray-border mt-4">
                    <h3 className="text-dkv-green-dark font-bold font-lemon text-sm uppercase mb-3">Ortopedia Extra-oral</h3>
                    <ul className="space-y-3 mb-6">
                      <li className="flex justify-between items-center pb-2 border-b border-dkv-gray-border/50">
                        <span className="text-dkv-gray">Tratamiento tiro y arco facial</span>
                        <span className="font-lemon text-lg text-dkv-green-dark shrink-0">188 €</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span className="text-dkv-gray">Tratamiento máscara de aire facial</span>
                        <span className="font-lemon text-lg text-dkv-green-dark shrink-0">252 €</span>
                      </li>
                    </ul>

                    <h3 className="text-dkv-green-dark font-bold font-lemon text-sm uppercase mb-3">Mantenedores de Espacio</h3>
                    <ul className="space-y-3">
                      <li className="flex justify-between items-center pb-2 border-b border-dkv-gray-border/50">
                        <span className="text-dkv-gray">Fijo unilateral / Fijo bilateral</span>
                        <span className="font-lemon text-lg text-dkv-green-dark shrink-0">58 € / 87 €</span>
                      </li>
                      <li className="flex justify-between items-center pb-2 border-b border-dkv-gray-border/50">
                        <span className="text-dkv-gray">Removible</span>
                        <span className="font-lemon text-lg text-dkv-green-dark shrink-0">72 €</span>
                      </li>
                      <li className="flex justify-between items-center pb-2 border-b border-dkv-gray-border/50">
                        <span className="text-dkv-gray">Recementado</span>
                        <span className="font-lemon text-lg text-dkv-green-dark shrink-0">22 €</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span className="text-dkv-gray">Corona prefabricada metálica de acero</span>
                        <span className="font-lemon text-lg text-dkv-green-dark shrink-0">65 €</span>
                      </li>
                    </ul>
                  </div>
                </TreatmentRow>
              </ScrollReveal>
            </div>

            {/* ADVERTENCIA CLÍNICA Y CIERRE */}
            <ScrollReveal>
              <div className="mt-20 p-8 md:p-12 mb-12 rounded-3xl bg-dkv-green-dark text-white text-center shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-dkv-green opacity-20 blur-3xl rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-dkv-green opacity-20 blur-3xl rounded-full"></div>
                <AlertCircle className="w-12 h-12 mx-auto mb-6 text-dkv-green" />
                <p className="text-xl md:text-2xl font-medium leading-relaxed italic font-fsme max-w-3xl mx-auto relative z-10">
                  "Un correcto diagnóstico y un plan de retención final son tan vitales como los brackets en sí. Invertir en una ortodoncia bien planificada es garantizar la funcionalidad y estética de tu sonrisa para toda la vida."
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
                    Te invitamos a solicitar una cita de valoración en uno de nuestros centros dentales para estudiar tu caso, y ofrecerte el plan exacto que se requiere para alinear tu sonrisa. Encuentra tu centro:
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