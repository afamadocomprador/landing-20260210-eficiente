// Ruta: components/tratamientos-v2/TreatmentLayout.tsx
import React from 'react';
import { TreatmentDefinition, StructuredPoint } from '@/types/treatments';
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

const CustomTimerIcon = () => (
  <img 
    src="/images/icons/carillas_esteticas_de_composite_-_item_1.png" 
    alt="Icono rápido y económico" 
    className="w-16 h-16 shrink-0 relative z-10 object-contain" 
  />
);

const CustomBrushIcon = () => (
  <img 
    src="/images/icons/carillas_esteticas_de_composite_-_item_2.png" 
    alt="Icono modelado directo" 
    className="w-16 h-16 shrink-0 relative z-10 object-contain" 
  />
);

const CustomZapIcon = () => (
  <img 
    src="/images/icons/carillas_esteticas_de_composite_-_item_3.png" 
    alt="Icono endurecido con luz" 
    className="w-16 h-16 shrink-0 relative z-10 object-contain" 
  />
);

const IconMapRefined: Record<string, React.ElementType> = {
  Timer: CustomTimerIcon,
  Paintbrush: CustomBrushIcon,
  Zap: CustomZapIcon,
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
            <div key={idx} className={`flex flex-row items-center gap-6 text-left relative pt-3 ${idx < points.length - 1 ? 'border-b border-gray-300 pb-3' : ''}`}>
              <div className="relative flex items-center justify-center shrink-0 mt-1">
                <IconComponent />
              </div>
              
              <div className="flex flex-col flex-grow pt-1">
                <p className="text-dkv-gray font-fsme text-xl md:text-2xl leading-relaxed normal-case tracking-wide">
                  {point.text}
                </p>
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
                          <ShareButton className="w-8 h-8" />
                        </span>
                      </span>
                    </h2>

                    <div className="text-dkv-gray font-fsme text-lg leading-relaxed space-y-4 relative z-10 flex-grow">
                      {row.points ? renderIconographicPoints(row.points) : row.content}
                    </div>

                    {!row.points && row.list && row.list.length > 0 && (
                      <ul className="mt-5 space-y-4 relative z-10">
                        {row.list.map((item, idx) => {
                          const IconComponent = IconMapRefined[item.icon] || Info;
                          return (
                            <li key={idx} className="flex items-start gap-4">
                              <div className="relative mt-1">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-dkv-green/20"></div>
                                <IconComponent className="w-6 h-6 text-dkv-green shrink-0 relative z-10" />
                              </div>
                              <span className="text-dkv-gray font-fsme text-lg leading-relaxed normal-case tracking-wide">
                                {item.text}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    )}

                    {row.footerNote && (
                      <div className="pt-6 text-lg font-fsme text-dkv-gray/90 relative z-10">
                        <p className="leading-relaxed normal-case tracking-wide relative flex items-start gap-1">
                          <span className="shrink-0 font-bold text-xl text-dkv-green/80 mt-1">&#8226;</span>
                          <span>{row.footerNote}</span>
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