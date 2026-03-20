// Ruta: components/tratamientos-v2/TreatmentLayout.tsx
import React from 'react';
import { TreatmentDefinition, StructuredPoint, DetailedPriceItem } from '@/types/treatments';
import { AlarmClock, Coins, Paintbrush, Smile, Zap, Info, Share2, CornerDownRight } from 'lucide-react';

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
  Incrustacion1: IncrustacionIcon1, // <-- Añadido
  Incrustacion2: IncrustacionIcon2, // <-- Añadido
  Incrustacion3: IncrustacionIcon3, // <-- Añadido
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
            <div key={idx} className={`flex flex-row items-center gap-5 text-left relative pt-3 ${idx < points.length - 1 ? 'border-b border-gray-300 pb-3' : ''}`}>
              <div className="relative flex items-center justify-center shrink-0 mt-1">
                <IconComponent />
              </div>
              <div className="flex flex-col flex-grow pt-1">
                <p className="text-dkv-gray font-fsme text-xl md:text-2xl leading-snug normal-case tracking-wide">
                  {point.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderDetailedPrices = (prices: DetailedPriceItem[]) => {
    return (
      <div className="mt-6 border border-gray-300 rounded-[1.5rem] p-4 md:p-5 bg-white relative z-10 shadow-sm">
        {prices.map((item, idx) => {
          const IconComponent = IconMapRefined[item.icon] || Info;
          return (
            <div key={idx} className={`flex flex-row items-center justify-between gap-2 py-3 ${idx < prices.length - 1 ? 'border-b border-gray-200' : ''}`}>
              
              <div className="flex flex-row items-center gap-3 md:gap-4 pr-1">
                <div className="shrink-0 flex items-center justify-center">
                  <IconComponent />
                </div>
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
          );
        })}
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

          <div className="space-y-16">
            {treatment.rows.map((row) => (
              <section key={row.id} id={row.id} className="scroll-mt-32">
                <ScrollReveal>
                  <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-md border-[1.5px] border-dkv-green transition-all duration-300 group flex flex-col h-full overflow-hidden relative">
                    
                    <h2 className="text-center mb-5 relative z-10 flex flex-col items-center gap-6">
                      <span className="text-dkv-green-dark font-fsme font-light text-2xl md:text-4xl leading-[1.3] uppercase tracking-[0.2em] block">
                        {row.name}
                      </span>

                      <span className="flex flex-row items-center justify-center gap-6">
                        {row.price && (
                          <span className="inline-flex items-center justify-center bg-dkv-green text-white font-fsme text-2xl md:text-3xl font-bold px-6 py-2 rounded-full whitespace-nowrap normal-case shrink-0 shadow-sm tracking-wide">
                            {row.price}
                          </span>
                        )}
                        <span className="scale-[1.3] transform origin-center text-dkv-green flex items-center justify-center cursor-pointer">
                          <ShareButton id={row.id} title={row.name} />
                        </span>
                      </span>
                    </h2>

                    {row.subTitle && (
                      <div className="text-center text-dkv-gray font-fsme text-lg md:text-xl mb-6 pb-6 border-b border-gray-200 relative z-10">
                        {row.subTitle}
                      </div>
                    )}

                    <div className="text-dkv-gray font-fsme text-lg leading-relaxed space-y-4 relative z-10 flex-grow">
                      {row.points ? renderIconographicPoints(row.points) : row.content}
                    </div>

                    {row.detailedPrices && row.detailedPrices.length > 0 && renderDetailedPrices(row.detailedPrices)}

                    {!row.points && !row.detailedPrices && row.list && row.list.length > 0 && (
                      <ul className="mt-5 space-y-4 relative z-10">
                        {row.list.map((item, idx) => {
                          const IconComponent = IconMapRefined[item.icon] || Info;
                          return (
                            <li key={idx} className="flex items-start gap-4">
                              <div className="relative mt-1">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-dkv-green/20"></div>
                                <IconComponent className="w-6 h-6 text-dkv-green shrink-0 relative z-10" />
                              </div>
                              <span className="text-dkv-gray font-fsme text-lg leading-snug normal-case tracking-wide">
                                {item.text}
                              </span>
                            </li>
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