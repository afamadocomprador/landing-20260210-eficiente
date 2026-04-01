// Ruta: components/tratamientos-v2/TreatmentLayout.tsx
import React from 'react';
import { TreatmentDefinition, StructuredPoint, DetailedPriceItem, PriceGroup } from '@/types/treatments';
import { AlarmClock, Coins, Paintbrush, Smile, Zap, Info, Share2, CornerDownRight, ShieldCheck, Sparkles, Layers, ArrowUp } from 'lucide-react';

import Header from "@/components/layout/Header";
import FooterLegal from "@/components/FooterLegal";
import CookieBanner from "@/components/CookieBanner";
import FixedBreadcrumb from "@/components/layout/FixedBreadcrumb";
import StickySubNav from "@/components/layout/StickySubNav";
import TreatmentsHero from "@/components/hero/TreatmentsHero";
import HeroSearch from '@/components/home/HeroSearch';
import ScrollReveal from "@/components/ui/ScrollReveal";
import ShareButton from "@/components/ui/ShareButton";

// --- ICONOS COMPOSITE ---
const CustomTimerIcon = () => <img src="/images/icons/carillas_esteticas_de_composite_-_item_1.png" alt="Icono rápido y económico" className="w-16 h-16 shrink-0 relative z-10 object-contain" />;
const CustomBrushIcon = () => <img src="/images/icons/carillas_esteticas_de_composite_-_item_2.png" alt="Icono modelado directo" className="w-16 h-16 shrink-0 relative z-10 object-contain" />;
const CustomZapIcon = () => <img src="/images/icons/carillas_esteticas_de_composite_-_item_3.png" alt="Icono endurecido con luz" className="w-16 h-16 shrink-0 relative z-10 object-contain" />;

// --- ICONOS PORCELANA ---
const PorcelainIcon1 = () => <img src="/images/icons/carillas_esteticas_de_porcelana_-_item_1.png" alt="Estabilidad cromática" className="w-16 h-16 shrink-0 relative z-10 object-contain" />;
const PorcelainIcon2 = () => <img src="/images/icons/carillas_esteticas_de_porcelana_-_item_2.png" alt="Fabricado individualmente" className="w-16 h-16 shrink-0 relative z-10 object-contain" />;
const PorcelainIcon3 = () => <img src="/images/icons/carillas_esteticas_de_porcelana_-_item_3.png" alt="Superficie impermeable" className="w-16 h-16 shrink-0 relative z-10 object-contain" />;
const PorcelainIcon4 = () => <img src="/images/icons/carillas_esteticas_de_porcelana_-_item_4.png" alt="Carilla Estándar" className="w-12 h-12 md:w-14 md:h-14 shrink-0 relative z-10 object-contain" />;
const PorcelainIcon5 = () => <img src="/images/icons/carillas_esteticas_de_porcelana_-_item_5.png" alt="Suplemento Efectos" className="w-12 h-12 md:w-14 md:h-14 shrink-0 relative z-10 object-contain" />;

// --- ICONOS BLANQUEAMIENTO INTERNO ---
const NoVitalIcon1 = () => <img src="/images/icons/blanqueamiento_de_diente_no_vital_-_item1.png" alt="Diente oscurecido" className="w-16 h-16 shrink-0 relative z-10 object-contain" />;
const NoVitalIcon2 = () => <img src="/images/icons/blanqueamiento_de_diente_no_vital_-_item2.png" alt="Blanqueamiento interno" className="w-16 h-16 shrink-0 relative z-10 object-contain" />;
const NoVitalIcon3 = () => <img src="/images/icons/blanqueamiento_de_diente_no_vital_-_item3.png" alt="Color igualado" className="w-16 h-16 shrink-0 relative z-10 object-contain" />;

// --- ICONOS BLANQUEAMIENTO FÉRULAS ---
const FerulasIcon1 = () => <img src="/images/icons/blanqueamiento_con_ferulas_en_domicilio_-_item1.png" alt="Suave y progresivo" className="w-16 h-16 shrink-0 relative z-10 object-contain" />;
const FerulasIcon2 = () => <img src="/images/icons/blanqueamiento_con_ferulas_en_domicilio_-_item2.png" alt="Férulas a medida" className="w-16 h-16 shrink-0 relative z-10 object-contain" />;
const FerulasIcon3 = () => <img src="/images/icons/blanqueamiento_con_ferulas_en_domicilio_-_item3.png" alt="Kit profesional" className="w-16 h-16 shrink-0 relative z-10 object-contain" />;
const FerulasIcon4 = () => <img src="/images/icons/blanqueamiento_con_ferulas_en_domicilio_-_item4.png" alt="Uso nocturno" className="w-16 h-16 shrink-0 relative z-10 object-contain" />;

// --- ICONOS BLANQUEAMIENTO CONSULTORIO ---
const ConsultorioIcon1 = () => <img src="/images/icons/blanqueamiento_dental_en_consultorio_-_item1.png" alt="Sesión rápida" className="w-16 h-16 shrink-0 relative z-10 object-contain" />;
const ConsultorioIcon2 = () => <img src="/images/icons/blanqueamiento_dental_en_consultorio_-_item2.png" alt="Protección avanzada" className="w-16 h-16 shrink-0 relative z-10 object-contain" />;
const ConsultorioIcon3 = () => <img src="/images/icons/blanqueamiento_dental_en_consultorio_-_item3.png" alt="Gel y láser" className="w-16 h-16 shrink-0 relative z-10 object-contain" />;
const ConsultorioIcon4 = () => <img src="/images/icons/blanqueamiento_dental_en_consultorio_-_item4.png" alt="Resultado inmediato" className="w-16 h-16 shrink-0 relative z-10 object-contain" />;

// --- ICONOS BLANQUEAMIENTO COMBINADO ---
const CombinadoIcon1 = () => <img src="/images/icons/blanqueamiento_combinado_-_item1.png" alt="Sesión intensiva" className="w-16 h-16 shrink-0 relative z-10 object-contain" />;
const CombinadoIcon2 = () => <img src="/images/icons/blanqueamiento_combinado_-_item2.png" alt="Moldes a medida" className="w-16 h-16 shrink-0 relative z-10 object-contain" />;
const CombinadoIcon3 = () => <img src="/images/icons/blanqueamiento_combinado_-_item3.png" alt="Kit profesional y resultados" className="w-16 h-16 shrink-0 relative z-10 object-contain" />;

// --- ICONOS INCRUSTACIÓN PORCELANA ---
const IncrustacionIcon1 = () => <img src="/images/icons/incrustacion_estetica_de_porcelana_-_item1.png" alt="Reconstrucción estética" className="w-16 h-16 shrink-0 relative z-10 object-contain" />;
const IncrustacionIcon2 = () => <img src="/images/icons/incrustacion_estetica_de_porcelana_-_item2.png" alt="Indicación clínica" className="w-16 h-16 shrink-0 relative z-10 object-contain" />;
const IncrustacionIcon3 = () => <img src="/images/icons/incrustacion_estetica_de_porcelana_-_item3.png" alt="Alternativa conservadora" className="w-16 h-16 shrink-0 relative z-10 object-contain" />;

// --- ICONOS PRÓTESIS COMPLETA TRADICIONAL ---
const ProtesisCompleta1 = () => <img src="/images/icons/protesis_completa_-_item1.png" alt="Rehabilitación Tradicional" className="w-16 h-16 shrink-0 relative z-10 object-contain" />;
const ProtesisCompleta2 = () => <img src="/images/icons/protesis_completa_-_item2.png" alt="Ajuste por Succión" className="w-16 h-16 shrink-0 relative z-10 object-contain" />;
const ProtesisCompleta3 = () => <img src="/images/icons/protesis_completa_-_item3.png" alt="Fácil Mantenimiento" className="w-16 h-16 shrink-0 relative z-10 object-contain" />;
const ProtesisCompleta4 = () => <img src="/images/icons/protesis_completa_-_item4.png" alt="Consejo de Estabilidad" className="w-16 h-16 shrink-0 relative z-10 object-contain" />;
const ProtesisCompleta5 = () => <img src="/images/icons/protesis_completa_-_item_5.png" alt="Soporte labial natural" className="w-16 h-16 shrink-0 relative z-10 object-contain" />;
const ProtesisCompleta6 = () => <img src="/images/icons/protesis_completa_-_item_6.png" alt="Restauración funcional de masticación" className="w-16 h-16 shrink-0 relative z-10 object-contain" />;

// --- ICONOS PRÓTESIS FLEXIBLES ---
const ProtesisFlexible1 = () => <img src="/images/icons/protesis_flexible_-_item1.png" alt="Prótesis flexible de 1 a 4 piezas dentales" className="w-16 h-16 shrink-0 relative z-10 object-contain" />;
const ProtesisFlexible2 = () => <img src="/images/icons/protesis_flexible_-_item2.png" alt="Prótesis flesible de 5 a 6 piezas dentales" className="w-16 h-16 shrink-0 relative z-10 object-contain" />;
const ProtesisFlexible3 = () => <img src="/images/icons/protesis_flexible_-_item3.png" alt="Prótesis flexible de más de 7 piezas dentales" className="w-16 h-16 shrink-0 relative z-10 object-contain" />;
const ProtesisFlexible4 = () => <img src="/images/icons/protesis_flexibles_-_item4.png" alt="Prótesis flexible de más de 7 piezas dentales" className="w-16 h-16 shrink-0 relative z-10 object-contain" />;
const ProtesisFlexible5 = () => <img src="/images/icons/protesis_flexibles_-_item5.png" alt="Prótesis flexible de más de 7 piezas dentales" className="w-16 h-16 shrink-0 relative z-10 object-contain" />;

// --- ICONOS PRÓTESIS ESQUELETICAS ---
const ProtesisEsqueletica1 = () => <img src="/images/icons/protesis_flexible_-_item1.png" alt="Prótesis esqueletica de 1 a 44 piezas dentales" className="w-16 h-16 shrink-0 relative z-10 object-contain" />;
const ProtesisEsqueletica2 = () => <img src="/images/icons/protesis_flexible_-_item2.png" alt="Prótesis esquelética de 5 a 6 piezas dentales" className="w-16 h-16 shrink-0 relative z-10 object-contain" />;
const ProtesisEsqueletica3 = () => <img src="/images/icons/protesis_flexible_-_item3.png" alt="Prótesis esquelética de 7 a 8 piezas dentales" className="w-16 h-16 shrink-0 relative z-10 object-contain" />;
const ProtesisEsqueletica4 = () => <img src="/images/icons/protesis_flexible_-_item4.png" alt="Prótesis esquelética de 9 piezas en adelante" className="w-16 h-16 shrink-0 relative z-10 object-contain" />;

// --- ICONOS PRÓTESIS ACRILICAS ---
const ProtesisAcrilica1 = () => <img src="/images/icons/protesis_flexible_-_item1.png" alt="Prótesis acrílica de 1 a 4 piezas dentales" className="w-16 h-16 shrink-0 relative z-10 object-contain" />;
const ProtesisAcrilica2 = () => <img src="/images/icons/protesis_flexible_-_item2.png" alt="Prótesis acrílica de 5 a 6 piezas dentales" className="w-16 h-16 shrink-0 relative z-10 object-contain" />;
const ProtesisAcrilica3 = () => <img src="/images/icons/protesis_flexible_-_item3.png" alt="Prótesis acrílica de más de 7 piezas dentales" className="w-16 h-16 shrink-0 relative z-10 object-contain" />;

// --- ICONOS MUÑON COLADO ---
const MunonColado = () => <img src="/images/icons/munon colado - hero.png" alt="Muñon colado de metal" className="w-16 h-16 shrink-0 relative z-10 object-contain" />;

// --- ICONOS FERULAS PARA BRUXISMO ---
const BruxismoFerula1 = () => <img src="/images/icons/bruxismoferulas_-_item1.png" alt="Ferula para bruxismo. Frenar desgaste dental" className="w-16 h-16 shrink-0 relative z-10 object-contain" />;
const BruxismoFerula2 = () => <img src="/images/icons/bruxismoferulas_-_item2.png" alt="Ferula para bruxismo. Relajación muscular" className="w-16 h-16 shrink-0 relative z-10 object-contain" />;
const BruxismoFerula3 = () => <img src="/images/icons/bruxismoferulas_-_item3.png" alt="Ferula para bruxismo. Tratamiento articular atm" className="w-16 h-16 shrink-0 relative z-10 object-contain" />;
const BruxismoFerula4 = () => <img src="/images/icons/bruxismoferulas_-_item4.png" alt="Ferula para bruxismo. Alivio de sintomatología" className="w-16 h-16 shrink-0 relative z-10 object-contain" />;


// --- ICONOS INVISALIGN ---
const Invisalign1 = () => <img src="/images/icons/invisalign_-_item1.png" alt="Invisalign. Comodidad Absoluta. Invisible y sin rozaduras." className="w-16 h-16 shrink-0 relative z-10 object-contain" />;
const Invisalign2 = () => <img src="/images/icons/invisalign_-_item2.png" alt="Invisalign. Libertad Total. Removibles para comer con total normalidad" className="w-16 h-16 shrink-0 relative z-10 object-contain" />;
const Invisalign3 = () => <img src="/images/icons/invisalign_-_item3.png" alt="Invisalign. Higiene Perfecta. Cepillado sin obstáculos metálicos." className="w-16 h-16 shrink-0 relative z-10 object-contain" />;
const Invisalign4 = () => <img src="/images/icons/invisalign_-_item4.png" alt="Invisalign. Previsibilidad. Podrás ver tu sonrisa antes del tratamiento con software 3D." className="w-16 h-16 shrink-0 relative z-10 object-contain" />;
const Invisalign5 = () => <img src="/images/icons/invisalign_-_item5.png" alt="Invisalign. Consejo de Adaptación. Ligera presión inicial-" className="w-16 h-16 shrink-0 relative z-10 object-contain" />;

const InvisalignPrecio1 = () => <img src="/images/icons/invisalign_-_precio1.png" alt="Invisalign. Tratamiento completo ambos maxilares hasta 12 meses. 3.210 €" className="w-16 h-16 shrink-0 relative z-10 object-contain" />;
const InvisalignPrecio2 = () => <img src="/images/icons/invisalign_-_precio2.png" alt="Invisalign. Tratamiento completo ambos maxilares hasta 24 meses. 4.000 €" className="w-16 h-16 shrink-0 relative z-10 object-contain" />;


// --- ICONOS ORTODONCIA INICIO Y FINAL ---
const OrtoIniFin1 = () => <img src="/images/icons/ortodoncia-inicial-final_-_item1.png" alt="Ortodoncia. Previo. Estudio fotográfico." className="w-16 h-16 shrink-0 relative z-10 object-contain" />;
const OrtoIniFin2 = () => <img src="/images/icons/ortodoncia-inicial-final_-_item2.png" alt="Ortodoncia. Previo. Estudio cefalométrico." className="w-16 h-16 shrink-0 relative z-10 object-contain" />;
const OrtoIniFin3 = () => <img src="/images/icons/ortodoncia-inicial-final_-_item3.png" alt="Ortodoncia. Previo. Modelos de Estudio ." className="w-16 h-16 shrink-0 relative z-10 object-contain" />;
const OrtoIniFin4 = () => <img src="/images/icons/ortodoncia-inicial-final_-_item4.png" alt="Ortodoncia. Posterior. Aparatología estabilizadora." className="w-16 h-16 shrink-0 relative z-10 object-contain" />;
const OrtoIniFin5 = () => <img src="/images/icons/ortodoncia-inicial-final_-_item5.png" alt="Ortodoncia. Visitas de revisión." className="w-16 h-16 shrink-0 relative z-10 object-contain" />;







const IconMapRefined: Record<string, React.ElementType> = {
  Timer: CustomTimerIcon,
  Paintbrush: CustomBrushIcon,
  Zap: CustomZapIcon,
  Porcelain1: PorcelainIcon1,
  Porcelain2: PorcelainIcon2,
  Porcelain3: PorcelainIcon3,
  Porcelain4: PorcelainIcon4,
  Porcelain5: PorcelainIcon5,
  DienteOscuro: NoVitalIcon1,     
  BlanqueamientoInt: NoVitalIcon2,  
  ColorIgualado: NoVitalIcon3,    
  Ferulas1: FerulasIcon1,         
  Ferulas2: FerulasIcon2,         
  Ferulas3: FerulasIcon3,         
  Ferulas4: FerulasIcon4, 
  Consultorio1: ConsultorioIcon1, 
  Consultorio2: ConsultorioIcon2, 
  Consultorio3: ConsultorioIcon3, 
  Consultorio4: ConsultorioIcon4,
  Combinado1: CombinadoIcon1,   
  Combinado2: CombinadoIcon2,   
  Combinado3: CombinadoIcon3,
  Incrustacion1: IncrustacionIcon1, 
  Incrustacion2: IncrustacionIcon2, 
  Incrustacion3: IncrustacionIcon3,
  ProtesisCompleta1, 
  ProtesisCompleta2, 
  ProtesisCompleta3, 
  ProtesisCompleta4, 
  ProtesisCompleta5, 
  ProtesisCompleta6, 
  ProtesisFlexible1, 
  ProtesisFlexible2, 
  ProtesisFlexible3, 
  ProtesisFlexible4, 
  ProtesisFlexible5, 
  ProtesisEsqueletica1, 
  ProtesisEsqueletica2, 
  ProtesisEsqueletica3, 
  ProtesisEsqueletica4, 
  ProtesisAcrilica1, 
  ProtesisAcrilica2, 
  ProtesisAcrilica3, 
  MunonColado, 
  BruxismoFerula1, 
  BruxismoFerula2, 
  BruxismoFerula3, 
  BruxismoFerula4, 
  Invisalign1,
  Invisalign2,
  Invisalign3,
  Invisalign4,
  Invisalign5,
  InvisalignPrecio1,
  InvisalignPrecio2,
  OrtoIniFin1,
  OrtoIniFin2,
  OrtoIniFin3,
  OrtoIniFin4,
  OrtoIniFin5,
  AlarmClock,
  Coins,
  Smile,
  Info,
  Share2,
  CornerDownRight
};

interface Props {
  treatment: TreatmentDefinition;
}

export function TreatmentLayout({ treatment }: Props) {
  
  const renderIconographicPoints = (points: StructuredPoint[]) => {
    return (
      <div className="space-y-0 my-0 border-none pt-0">
        {points.map((point, idx) => {
          const IconComponent = IconMapRefined[point.icon] || Info;
          return (
            <ScrollReveal key={idx} delay={100 + (idx * 150)} direction="up">
              <div className={`flex flex-row items-center gap-5 text-left relative pt-3 ${idx < points.length - 1 ? 'border-b border-gray-300 pb-3' : ''}`}>
                <div className="relative flex items-center justify-center shrink-0 mt-1">
                  <IconComponent />
                </div>
                <div className="flex flex-col flex-grow pt-1">
                  <p className="text-dkv-gray font-fsme text-xl md:text-2xl leading-snug normal-case tracking-wide">
                    {point.text}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    );
  };

  const renderDetailedPrices = (prices: DetailedPriceItem[]) => {
    return (
      <div className="mt-6 border border-gray-300 rounded-[1.5rem] p-4 md:p-5 bg-white relative z-10 shadow-sm">
        {prices.map((item, idx) => {
          const IconComponent = item.icon ? (IconMapRefined[item.icon] || Info) : null;
          
          return (
            <ScrollReveal key={idx} delay={100 + (idx * 120)} direction="up">
              <div className={`flex flex-row items-center justify-between gap-2 py-3 ${idx < prices.length - 1 ? 'border-b border-gray-200' : ''}`}>
                
                <div className="flex flex-row items-center gap-3 md:gap-4 pr-1">
                  {IconComponent && (
                    <div className="shrink-0 flex items-center justify-center">
                      <IconComponent />
                    </div>
                  )}
                  <div className="flex flex-col min-w-0">
                    <span className="font-bold text-dkv-green-dark text-base md:text-lg font-fsme tracking-wide leading-tight block">{item.title}</span>
                    {item.description && (
                      <span className="text-dkv-gray/80 text-sm md:text-base font-fsme tracking-wide leading-tight block mt-0.5">{item.description}</span>
                    )}
                  </div>
                </div>

                <div className="flex justify-end shrink-0 pl-1">
                  <span className="font-lemon text-lg md:text-xl text-dkv-green-dark font-bold">
                    {item.price}
                  </span>
                </div>

              </div>
            </ScrollReveal>
          );
        })}
      </div>
    );
  };


  // 💡 NOVA FUNCIÓN: Renderiza os grupos de prezos cos seus títulos
// 💡 FUNCIÓN ACTUALIZADA: Los items ahora tienen EXACTAMENTE el mismo estilo que renderDetailedPrices
  const renderPriceGroups = (groups: PriceGroup[]) => {
    return (
      <div className="mt-8 space-y-8">
        {groups.map((group, groupIdx) => (
          <div key={groupIdx} className="relative z-10">
            
            <h3 className={`text-dkv-green-dark font-bold font-lemon text-sm md:text-base uppercase ${group.description ? 'mb-2' : 'mb-4'}`}>
              {group.title}
            </h3>
            
            {group.description && (
              <p className="text-sm italic mb-4 text-dkv-gray/80">
                {group.description}
              </p>
            )}

            <div className="mt-6 border border-gray-300 rounded-[1.5rem] p-4 md:p-5 bg-white relative z-10 shadow-sm">

              {group.items.map((item, idx) => {
                const IconComponent = item.icon ? (IconMapRefined[item.icon] || Info) : null;
                return (
                  <ScrollReveal key={idx} delay={100 + (idx * 120)} direction="up">
                    <div className={`flex flex-row items-center justify-between gap-2 py-3 ${idx < group.items.length - 1 ? 'border-b border-gray-200/60' : ''}`}>
                      
                      <div className="flex flex-row items-center gap-3 md:gap-4 pr-1">
                        {IconComponent && (
                          <div className="shrink-0 flex items-center justify-center">
                            <IconComponent />
                          </div>
                        )}
                        <div className="flex flex-col min-w-0">
                          {/* 💡 ESTILOS CLONADOS: Color verde oscuro, font-fsme y tracking-wide */}
                          <span className="font-bold text-dkv-green-dark text-base md:text-lg font-fsme tracking-wide leading-tight block">{item.title}</span>
                          {item.description && (
                            <span className="text-dkv-gray/80 text-sm md:text-base font-fsme tracking-wide leading-tight block mt-0.5">{item.description}</span>
                          )}
                        </div>
                      </div>

                      {/* 💡 PADDING CLONADO: Cambiado de pl-4 a pl-1 para que el precio alinee igual */}
                      <div className="flex justify-end shrink-0 pl-1">
                        <span className="font-lemon text-lg md:text-xl text-dkv-green-dark font-bold">
                          {item.price}
                        </span>
                      </div>

                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  };





  return (
    <>
      <CookieBanner />
      <Header />
      
      <FixedBreadcrumb items={treatment.breadcrumbs} />

      <div className="pt-10 md:pt-12">
        
        {treatment.hero && (
          <TreatmentsHero 
            badgeText={treatment.hero.badgeText}
            title={treatment.hero.title}
            description={treatment.hero.description}
          />
        )}

        {treatment.activeSubNavId && (
          <StickySubNav activeId={treatment.activeSubNavId} />
        )}

        <main className="container mx-auto px-4 py-12 md:py-20 max-w-5xl flex-grow">
          
          {treatment.intro && (
            <div className="mb-12 text-center md:text-left">
              <span className="text-dkv-green font-bold text-base uppercase tracking-[0.2em] font-fsme">
                {treatment.intro.badgeText}
              </span>
              <h3 className="text-2xl md:text-3xl font-lemon text-dkv-green-dark inline-block mt-2 normal-case tracking-wide leading-tight">
                {treatment.intro.title}
              </h3>
              <div className="text-dkv-gray mt-6 font-fsme text-lg leading-relaxed max-w-3xl mx-auto md:mx-0">
                {treatment.intro.description}
              </div>
            </div>
          )}

          {/* 💡 APLICADO: ID para el ancla y margen de scroll */}
          {treatment.rows.length > 1 && (
            <ScrollReveal delay={100}>
              <div id="opciones-tratamiento" className="mb-16 scroll-mt-32">
                <h3 className="text-sm font-bold text-dkv-gray/60 uppercase tracking-widest mb-4 font-fsme text-center md:text-left">
                  Opciones de Tratamiento
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                  {treatment.rows.map((row) => (
                    <a 
                      key={`index-${row.id}`} 
                      href={`#${row.id}`}
                      className="bg-white p-4 md:p-5 rounded-2xl border border-gray-300 shadow-sm hover:border-dkv-green hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full group"
                    >
                      <span className="font-bold text-dkv-gray text-sm md:text-base leading-tight group-hover:text-dkv-green-dark transition-colors line-clamp-3">
                        {row.name}
                      </span>
                      {row.price && (
                        <span className="font-lemon text-lg md:text-xl text-dkv-green-dark mt-3 block">
                          {row.price}
                        </span>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}

          <div className="space-y-16">
            {treatment.rows.map((row) => (
              <section key={row.id} id={row.id} className="scroll-mt-32">
                <ScrollReveal>
                  <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-md border-[1.5px] border-dkv-green transition-all duration-300 group flex flex-col h-full overflow-hidden relative">
                    
                    {/* TÍTULO PRINCIPAL */}
                    <h2 className="text-center mb-6 relative z-10">
                      <span className="text-dkv-green-dark font-fsme font-light text-2xl md:text-4xl leading-[1.3] uppercase tracking-[0.2em] block">
                        {row.name}
                      </span>
                    </h2>

                    {/* IMAGEN HERO DE LA FICHA */}
                    {row.image && (
                      <div className="mb-8 w-full overflow-hidden rounded-2xl border border-gray-100 flex items-center justify-center bg-gray-50/50 py-4 relative z-10">
                        <img 
                          src={row.image} 
                          alt={row.imageAlt || row.name}
                          className="w-full h-auto object-contain max-h-[200px] md:max-h-[250px] transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    )}

                    {/* PRECIO Y COMPARTIR */}
                    <div className="flex flex-row items-center justify-center gap-6 mb-8 relative z-10">
                      {row.price && (
                        <span className="inline-flex items-center justify-center bg-dkv-green text-white font-fsme text-2xl md:text-3xl font-bold px-6 py-2 rounded-full whitespace-nowrap normal-case shrink-0 shadow-sm tracking-wide">
                          {row.price}
                        </span>
                      )}
                      <span className="scale-[1.3] transform origin-center text-dkv-green flex items-center justify-center cursor-pointer">
                        <ShareButton id={row.id} title={row.name} />
                      </span>
                    </div>

                    {row.subTitle && (
                      <div className="text-center text-dkv-gray font-fsme text-lg md:text-xl mb-6 pb-6 border-b border-gray-200 relative z-10">
                        {row.subTitle}
                      </div>
                    )}

                    <div className="text-dkv-gray font-fsme text-lg leading-relaxed space-y-4 relative z-10 flex-grow">
                      {row.points && renderIconographicPoints(row.points)}
                      
                      {row.content && (
                        <div className={row.points ? "mt-8" : ""}>
                          {row.content}
                        </div>
                      )}
                    </div>

                    {/* Precios detallados normales */}
                    {row.detailedPrices && row.detailedPrices.length > 0 && renderDetailedPrices(row.detailedPrices)}
                    
                    {/* Grupos de precios -precios con título- */}
                    {row.priceGroups && row.priceGroups.length > 0 && renderPriceGroups(row.priceGroups)}

                    {/* Efecto cascada usando ScrollReveal para 'list' genérico */}
                    {!row.points && !row.detailedPrices && !row.priceGroups && row.list && row.list.length > 0 && (
                      <ul className="mt-5 space-y-4 relative z-10">
                        {row.list.map((item, idx) => {
                          const IconComponent = item.icon ? (IconMapRefined[item.icon] || Info) : Info;
                          return (
                            <ScrollReveal key={idx} delay={100 + (idx * 150)} direction="up">
                              <li className="flex items-start gap-4">
                                <div className="relative mt-1">
                                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-dkv-green/20"></div>
                                  <IconComponent className="w-6 h-6 text-dkv-green shrink-0 relative z-10" />
                                </div>
                                <span className="text-dkv-gray font-fsme text-lg leading-snug normal-case tracking-wide">
                                  {item.text}
                                </span>
                              </li>
                            </ScrollReveal>
                          );
                        })}
                      </ul>
                    )}

                    {row.footerNote && (
                      <div className="pt-6 text-lg font-fsme text-dkv-gray/90 relative z-10">
                        <p className="leading-snug normal-case tracking-wide relative">
                          {row.footerNote}
                        </p>
                      </div>
                    )}

                    {/* IMAGEN SECUNDARIA DE LA FICHA */}
                    {row.secondaryImage && (
                      <div className="mt-8 w-full overflow-hidden rounded-xl border border-gray-100 flex items-center justify-center bg-gray-50/30 py-4 relative z-10">
                        <img 
                          src={row.secondaryImage} 
                          alt={row.secondaryImageAlt || `${row.name} - detalle`} 
                          className="w-full h-auto object-contain max-h-[140px] md:max-h-[180px] transition-transform duration-700 group-hover:scale-105" 
                          loading="lazy" 
                        />
                      </div>
                    )}

                    {/* 💡 APLICADO: BOTÓN VOLVER ARRIBA (Solo si hay >1 opción) */}
                    {treatment.rows.length > 1 && (
                      <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center relative z-10">
                        <a 
                          href="#opciones-tratamiento" 
                          className="inline-flex items-center gap-2 text-dkv-gray/60 hover:text-dkv-green transition-colors font-fsme font-medium text-base px-4 py-2 rounded-full hover:bg-dkv-green/5 group"
                        >
                          <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                          <span>Volver a opciones</span>
                        </a>
                      </div>
                    )}

                  </div>
                </ScrollReveal>
              </section>
            ))}
          </div>

          {treatment.premiumBlock && (
            <ScrollReveal delay={150} direction="up">
              {treatment.premiumBlock}
            </ScrollReveal>
          )}

          {treatment.veredicto && (
            <ScrollReveal>
              <div className="mt-20 text-center">
                <h4 className="text-dkv-green font-lemon uppercase tracking-widest text-sm mb-4">
                  {treatment.veredicto.title}
                </h4>
                <p className="text-xl md:text-2xl font-medium leading-relaxed italic font-fsme max-w-3xl mx-auto relative z-10 text-dkv-green-dark">
                  {treatment.veredicto.quote}
                </p>
              </div>
            </ScrollReveal>
          )}

          {treatment.cta && (
            <section className="mt-20">
              <ScrollReveal>
                <h2 className="text-3xl font-lemon text-dkv-green-dark mb-4">
                  {treatment.cta.title}
                </h2>
                <p className="text-lg text-dkv-gray font-fsme leading-relaxed mb-4">
                  <strong>Nota clínica:</strong> {treatment.cta.infoNote}
                </p>
                <p className="text-lg text-dkv-gray mb-8">
                  {treatment.cta.description}
                </p>
                <HeroSearch />
              </ScrollReveal>
            </section>
          )}

        </main>
      </div>
      
      <FooterLegal />
    </>
  );
}