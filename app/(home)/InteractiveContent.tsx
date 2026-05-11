// app/(home)/InteractiveContent.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, X, ArrowRight, Stethoscope, HeartPulse, Sparkles, Activity, Smile, Baby, Zap, ShieldCheck, Moon, Scissors } from "lucide-react";

import ScrollReveal from '@/components/ui/ScrollReveal';
import { useInteractiveHome } from '@/hooks/useInteractiveHome';

// --- IMPORTACIÓN DE POSTHOG ---
import ScrollTracker from '@/components/posthog/ScrollTracker';
import { usePostHog } from 'posthog-js/react';

// ⚡️ TUS DATOS ORIGINALES EXACTOS
/* *************************************************
const tratamientosList = [
  { id: 1, hasSub: true, icon: Baby, image: "/images/tratamientos/estetica.png", title: "Precio de Estética" },
  { id: 2, hasSub: true, icon: Sparkles, image: "/images/tratamientos/ortodoncia-brackets-cristal-zafiro-standard-un-diente.png", title: "Precio de Ortodoncia" },
  { id: 3, hasSub: true, icon: Stethoscope, image: "/images/tratamientos/implantes.png", title: "Precio de Implantes" },
  { id: 4, hasSub: true, icon: Zap, image: "/images/tratamientos/endodoncia.png", title: "Precio de Empastes y Endodoncias" },
  { id: 5, hasSub: true, icon: Activity, title: "Precios de Prótesis", image: "/images/tratamientos/protesis.png" },
  { id: 9, href: "/tratamientos-v2/apnea", icon: Moon, title: "Precio para Apnea", image: "/images/tratamientos/ferula.png" },
  { id: 6, hasSub: true, icon: Smile, image: "/images/tratamientos/odontopediatria.png", title: "Niñ@s" },
  { id: 7, hasSub: true, icon: ShieldCheck, image: "/images/tratamientos/general.png", title: "Prevención" },
  { id: 10, hasSub: true, icon: HeartPulse, image: "/images/tratamientos/encias-y-periodoncia.png", title: "Precio de Periodoncia" },
  { id: 11, href: "/tratamientos-v2/cirugia-extracciones", icon: Scissors, title: "Precio de Extracciones", image: "/images/tratamientos/cirugia.png" },
];
**************************************** */

const tratamientosList = [
  { id: 1, hasSub: true, icon: Baby, image: "/images/tratamientos/estetica.png", title: "Precio de Estética", altimg: "Dientes blancos y tabla de coloración" },
  { id: 2, hasSub: true, icon: Sparkles, image: "/images/tratamientos/ortodoncia-brackets-cristal-zafiro-standard-un-diente.png", title: "Precio de Ortodoncia", altimg: "Detalle de bracket" },
  { id: 3, hasSub: true, icon: Stethoscope, image: "/images/tratamientos/implantes.png", title: "Precio de Implantes", altimg: "Tornillo de implante" },
  { id: 4, hasSub: true, icon: Zap, image: "/images/tratamientos/endodoncia.png", title: "Precio de Empastes y Endodoncias", altimg: "Sección lateral de muela con endodoncia" },
  { id: 5, hasSub: true, icon: Activity, title: "Precios de Prótesis", image: "/images/tratamientos/protesis.png", altimg: "Prótesis de tres piezas en laboratorio" },
  { id: 9, href: "/tratamientos-v2/apnea", icon: Moon, title: "Precio para Apnea", image: "/images/tratamientos/ferula.png", altimg: "Férula dental para apnea" },
  { id: 6, hasSub: true, icon: Smile, image: "/images/tratamientos/odontopediatria.png", title: "Niñ@s", altimg: "Instrumental odontológico con colores infantiles" },
  { id: 7, hasSub: true, icon: ShieldCheck, image: "/images/tratamientos/general.png", title: "Prevención", altimg: "Instrumental odontológico" },
  { id: 10, hasSub: true, icon: HeartPulse, image: "/images/tratamientos/encias-y-periodoncia.png", title: "Precio de Periodoncia", altimg: "Medida de encía para periodoncia" },
  { id: 11, href: "/tratamientos-v2/cirugia-extracciones", icon: Scissors, title: "Precio de Extracciones", image: "/images/tratamientos/cirugia.png", altimg: "Intervención en hueco en encía" },
];


const esteticaSubOptions = [
  { id: 'blanqueamiento', title: 'Blanqueamiento', href: '/tratamientos-v2/estetica-blanqueamiento', tag: 'Luz y armonía' },
  { id: 'carillas', title: 'Carillas y Diseño', href: '/tratamientos-v2/estetica-carillas', tag: 'Hollywood Smile' },
  { id: 'incrustaciones', title: 'Incrustaciones', href: '/tratamientos-v2/estetica-incrustaciones', tag: 'Reconstrucción' },
  { id: 'sep-orto-estetica', isSeparator: true, title: 'Alineación Estética' },
  { id: 'invisalign-est', title: 'Invisalign', href: '/tratamientos-v2/ortodoncia-invisalign', tag: 'Ortodoncia Invisible' },
  { id: 'lingual-est', title: 'Ortodoncia Lingual', href: '/tratamientos-v2/ortodoncia-lingual', tag: 'Aparato Interior' },
  { id: 'zafiro-est', title: 'Brackets de Zafiro', href: '/tratamientos-v2/ortodoncia-zafiro', tag: 'Estética Fija' },
];

const ortodonciaSubOptions = [
  { id: 'invisalign', title: 'Invisalign', href: '/tratamientos-v2/ortodoncia-invisalign', tag: 'Invisible' },
  { id: 'lingual', title: 'Lingual', href: '/tratamientos-v2/ortodoncia-lingual', tag: 'Interior' },
  { id: 'zafiro', title: 'Zafiro', href: '/tratamientos-v2/ortodoncia-zafiro', tag: 'Estética Fija' },
  { id: 'metalica', title: 'Metálica', href: '/tratamientos-v2/ortodoncia-metalica', tag: 'Tradicional' },
  { id: 'sep-orto-infantil', isSeparator: true, title: 'Ortodoncia Infantil' },
  { id: 'ortodoncia-removible', title: 'Ortodoncia Removible', href: '/tratamientos-v2/ortodoncia-removible', tag: 'Aparatos de quita y pon' }
];

const implantesSubOptions = [
  { id: 'individual', title: 'Implante Individual', href: '/tratamientos-v2/implante-individual', tag: 'Sustitución de 1 pieza' },
  { id: 'arcada', title: 'Arcada Completa Fija', href: '/tratamientos-v2/implante-arcada', tag: 'Todos los dientes fijos' },
  { id: 'sobredentadura', title: 'Sobredentadura', href: '/tratamientos-v2/implante-sobredentadura', tag: 'Económica y segura' },
  { id: 'hueso', title: 'Regeneración de Hueso', href: '/tratamientos-v2/regeneracion-hueso', tag: 'Según el estado de tu hueso' }
];

const protesisSubOptions = [
  { id: 'fijas', title: 'Prótesis Fijas', href: '/tratamientos-v2/protesis-fijas', tag: 'Dientes que no se quitan' },
  { id: 'removibles', title: 'Prótesis Removibles', href: '/tratamientos-v2/protesis-removibles', tag: 'De quita y pon' },
  { id: 'bruxismo', title: 'Oclusión y Bruxismo', href: '/tratamientos-v2/protesis-bruxismo', tag: 'Protección' }
];

const pediatriaSubOptions = [
  { id: 'prevencion', title: 'Prevención y Educación', href: '/tratamientos-v2/pediatria-prevencion', tag: 'Escudo protector' },
  { id: 'conservadora', title: 'Curando la Caries', href: '/tratamientos-v2/pediatria-conservadora', tag: 'Odontología conservadora' },
  { id: 'endodoncia', title: 'Endodoncia Infantil', href: '/tratamientos-v2/pediatria-endodoncia', tag: 'Salvar el diente' },
  { id: 'espacios', title: 'Salvando los Espacios', href: '/tratamientos-v2/pediatria-extracciones-y-espacio', tag: 'Para los dientes que vienen' },
  { id: 'sep-orto-infantil-ped', isSeparator: true, title: 'Ortodoncia Infantil' },
  { id: 'ortodoncia-removible-ped', title: 'Ortodoncia Removible', href: '/tratamientos-v2/ortodoncia-removible', tag: 'Aparatos de quita y pon' }
];

const conservadoraSubOptions = [
  { id: 'reconstruccion', title: 'Reconstrucción', href: '/tratamientos-v2/conservadora-reconstruccion', tag: 'Frenar la caries a tiempo' },
  { id: 'endodoncias', title: 'Endodoncias', href: '/tratamientos-v2/conservadora-endodoncia', tag: 'Cuando no te deja dormir' },
  { id: 'cirugia-complejos', title: 'Cirugía y Casos Complejos', href: '/tratamientos-v2/conservadora-cirugia', tag: 'Segundas oportunidades' }
];

const prevencionSubOptions = [
  { id: 'primera-visita', title: 'Primera visita', href: '/tratamientos-v2/prevencion-primera-visita', tag: 'Diagnóstico inicial' },
  { id: 'higiene', title: 'Higiene y prevención', href: '/tratamientos-v2/prevencion-higiene', tag: 'Mantenimiento' }
];

const periodonciaSubOptions = [
  { id: 'diagnostico-basico', title: 'Gingivitis y Piorrea', href: '/tratamientos-v2/periodoncia-basica', tag: 'Fase inicial' },
  { id: 'estabilizacion', title: 'Estabilización', href: '/tratamientos-v2/periodoncia-estabilizacion', tag: 'Control de la enfermedad' },
  { id: 'micro-cirugia', title: 'Micro cirugía', href: '/tratamientos-v2/periodoncia-micro-cirugia', tag: 'Regeneración' }
];

const cirugiaSubOptions = [
  { id: 'extracciones', title: 'Extracciones', href: '/tratamientos-v2/cirugia-extracciones', tag: 'Muelas del juicio y más' }
];




// ⚡️ NUEVA INTERFAZ PARA RECIBIR LOS SERVER COMPONENTS
interface InteractiveContentProps {
  dentistasSection: React.ReactNode;
  archetypesSection: React.ReactNode;
  pricingCardsSection: React.ReactNode;
}

export default function InteractiveContent({
  dentistasSection,
  archetypesSection,
  pricingCardsSection
}: InteractiveContentProps) {
  // ⚡️ ESTADO AISLADO EN EL HOOK
  const { activeFloatingId, setActiveFloatingId } = useInteractiveHome(); 

  // ****************************************************************************
  // ********************* CONTROL DE OPCIONES PULSADAS POSTHOG *****************
  // ****************************************************************************
  // 1. Iniciamos PostHog
  const posthog = usePostHog();

  // 2. Creamos el interceptor de clics de las opciones del bento-grid
  const handleTreatmentClick = (e: React.MouseEvent, item: any) => {
    // A. Enviamos el dato a PostHog
    if (posthog) {
      posthog.capture('tratamiento_clicado', {
        nombre_tratamiento: item.title,
        abre_modal: item.hasSub
      });
    }

    // B. Mantenemos el comportamiento original de tu web
    if (item.hasSub) {
      e.preventDefault();
      setActiveFloatingId(item.id);
    }
  };


  // 3. Creamos el Interceptor de clics de las opciones en el sheet modal
  const handleSubOptionClick = (sub: any) => {
    if (posthog) {
      posthog.capture('subtratamiento_clicado', {
        categoria_padre: activeCategory?.title, // Ejemplo: "Precio de Implantes"
        nombre_sub_opcion: sub.title,          // Ejemplo: "Implante Individual"
        url_destino: sub.href
      });
    }
    // Cerramos el modal como siempre
    setActiveFloatingId(null);
  };

  // 4. Creamos el Interceptor de clics de la opcióon de Plantear Consulta
  const handleConsultaClick = () => {
    if (posthog) {
      posthog.capture('consulta_clicada', {
        section_name: 'Información',
        origen: 'landing_principal',
        texto_boton: 'Plantear Consulta' // O el texto que tenga tu botón
      });
    }
  
    // La lógica que ya tenía en el botón
    setActiveFloatingId('contacto');
  }


  // ****************************************************************************
  // ********************* FINAL DE CONTROL DE OPCIONES PULSADAS POSTHOG
  // ****************************************************************************

  
  const neumorphicBase = "shadow-[8px_8px_12px_#033b3720,-5px_-5px_10px_#ffffff]";
  const neumorphicActive = "active:shadow-[inset_4px_4px_8px_#033b3730,inset_-4px_-4px_8px_#ffffff]";

  const activeCategory = tratamientosList.find(t => t.id === activeFloatingId);
  const isEstetica = activeFloatingId === 1;
  const isOrtodoncia = activeFloatingId === 2;
  const isImplantes = activeFloatingId === 3;
  const isConservadora = activeFloatingId === 4;
  const isProtesis = activeFloatingId === 5;
  const isPediatria = activeFloatingId === 6; 
  const isPrevencion = activeFloatingId === 7;
  const isPeriodoncia = activeFloatingId === 10;
  const isCirugia = activeFloatingId === 11;
  const isContacto = activeFloatingId === 'contacto';
  
  const subOptions = isEstetica ? esteticaSubOptions : 
                     isOrtodoncia ? ortodonciaSubOptions : 
                     isImplantes ? implantesSubOptions : 
                     isProtesis ? protesisSubOptions : 
                     isPediatria ? pediatriaSubOptions : 
                     isConservadora ? conservadoraSubOptions : 
                     isPrevencion ? prevencionSubOptions : 
                     isPeriodoncia ? periodonciaSubOptions : 
                     isCirugia ? cirugiaSubOptions : [];
  
  const modalTitle = isContacto ? "CONTACTO" :
                     isEstetica ? "ESTÉTICA DENTAL" : 
                     isOrtodoncia ? "ORTODONCIA" : 
                     isImplantes ? "IMPLANTES" : 
                     isProtesis ? "PRÓTESIS Y REHABILITACIÓN" : 
                     isPediatria ? "ODONTOPEDIATRÍA" : 
                     isConservadora ? "ODONTOLOGÍA CONSERVADORA" : 
                     isPrevencion ? "PREVENCIÓN" : 
                     isPeriodoncia ? "PERIODONCIA" : 
                     isCirugia ? "EXTRACCIONES" : "";
  
  const modalSubtitle = isContacto ? "Envíanos tu duda o consulta:" :
                        isEstetica ? "Elige el tratamiento que deseas:" : 
                        isOrtodoncia ? "Elige el tipo de aparato:" : 
                        isImplantes ? "Elige la solución que necesitas:" : 
                        isProtesis ? "Elige el tipo de tratamiento:" : 
                        isPediatria ? "Cuidando la sonrisa de los más pequeños:" : 
                        isConservadora ? "Salvar tu diente es nuestra prioridad:" : 
                        isPrevencion ? "La base de una boca sana:" : 
                        isPeriodoncia ? "Cuida el soporte de tus dientes:" : 
                        isCirugia ? "Extracciones y regeneración:" : "";

  return (
    <>
      <section id="tratamientos" className="py-20 bg-[#F0F0F0] border-t border-dkv-gray-border scroll-mt-28 relative z-40">

        {/* VIGILANTE AQUÍ: Por dentro del contenedor principal */}
        <ScrollTracker sectionName="Tratamientos" />

        <div className="container mx-auto max-w-5xl px-6 md:px-8">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-lemon text-dkv-green-dark mb-6 text-left md:text-center uppercase tracking-wide">
              Tratamientos.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <p className="text-xl md:text-xl text-dkv-gray font-fsme max-w-3xl mb-12 md:mb-16 leading-relaxed text-left md:text-center mx-auto">
              Servicios básicos sin coste en consulta, y el resto, a <strong>precios inferiores a mercado</strong>.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 xs:gap-5 md:gap-8 relative z-40">
            {tratamientosList.map((item, index) => {
              const Icon = item.icon;
              const Wrapper = item.hasSub ? 'button' : Link; 

              const columnDelay = (index % 2) * 150; 
              const rowDelay = Math.floor(index / 2) * 100;
              const finalDelay = columnDelay + rowDelay;

              return (
                <ScrollReveal key={item.id} delay={finalDelay}>
                  <Wrapper 
                    href={(item.hasSub ? undefined : item.href) as any}
                    onClick={(e) => handleTreatmentClick(e, item)}
                    className={`w-full relative flex flex-col overflow-hidden rounded-3xl bg-[#F0F0F0] group transition-all duration-300 ease-out aspect-square hover:scale-[1.02] active:scale-[0.98] ${neumorphicBase} ${neumorphicActive}`}
                  >
                    {item.hasSub && <div className="absolute inset-0 z-50 cursor-pointer" />}

                    <div className="w-full bg-white flex flex-col justify-start text-left px-3.5 pt-3.5 pb-3 md:px-5 md:pt-5 md:pb-4 relative z-10 pointer-events-none">
                      <div className="flex justify-between items-start w-full gap-1.5">
                        <h3 className="block font-fsme normal-case m-0 font-bold text-dkv-green-dark group-hover:text-dkv-green transition-colors text-[17px] md:text-xl leading-tight tracking-tight line-clamp-2">
                          {item.title}
                        </h3>
                        <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-dkv-green/10 group-hover:scale-110 transition-all duration-300 shrink-0">
                          <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-dkv-green-dark group-hover:text-dkv-green group-hover:translate-x-0.5 transition-all duration-300" strokeWidth={2.5} />
                        </div>
                      </div>
                    </div>

                    <div className={`w-full flex-1 flex items-center justify-center transition-all duration-500 relative overflow-hidden group-hover:bg-dkv-green/5 pointer-events-none`}>
                      {item.image ? (
                        <Image 
                          src={item.image} 
                          alt={item.altimg}
                          fill
                          sizes="(max-width: 768px) 50vw, 25vw"
                          className="object-cover transition-transform group-hover:scale-110 duration-500" 
                        />
                      ) : (
                        <div className="text-dkv-green transition-transform group-hover:scale-110 duration-300">
                          <Icon className="w-10 h-10 md:w-14 md:h-14" strokeWidth={1.5} />
                        </div>
                      )}
                    </div>
                  </Wrapper>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ⚡️ SECCIÓN DENTISTAS RENDERIZADA EN EL SERVIDOR */}
      {dentistasSection}

      <section id="informacion" className="py-20 bg-white border-t border-dkv-gray-border scroll-mt-28 relative z-30">

         {/* VIGILANTE AQUÍ: Por dentro del contenedor principal */}
         <ScrollTracker sectionName="Información" />

         <ScrollReveal>
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-lemon text-dkv-green-dark mb-6 uppercase tracking-wide">¿Algo que comentar?</h2>
            <p className="text-xl text-dkv-gray font-fsme max-w-3xl mx-auto mb-10 leading-relaxed text-balance">
                Plantéanos cualquier duda sobre tus circunstancias y cómo te puedes beneficiar de nuestros tratamientos.
            </p>
            <button 
              type="button"
              onClick={handleConsultaClick}
              className="inline-flex items-center justify-center rounded-dkv font-fsme font-extrabold bg-dkv-green-dark text-white shadow-xl hover:scale-105 hover:shadow-2xl active:scale-95 transition-all duration-300 text-xl px-8 py-6 h-auto z-50 relative"
            >
              Plantear Consulta
            </button>
          </div>
         </ScrollReveal>
      </section>

      {/* ⚡️ COMPONENTES DINÁMICOS PESADOS RENDERIZADOS EN EL SERVIDOR */}
      {archetypesSection}

      <div className="scroll-mt-28 relative z-30">
        {pricingCardsSection}
      </div>

      <div 
        className={`fixed inset-0 z-[100] flex flex-col justify-end md:justify-center items-center px-4 pb-0 md:p-4 transition-all duration-500 ease-out ${
          activeFloatingId !== null ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div 
          className={`absolute inset-0 bg-white/60 backdrop-blur-md transition-opacity duration-500 ${
            activeFloatingId !== null ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setActiveFloatingId(null)}
        />

        <div 
          className={`relative w-full md:max-w-[400px] bg-white shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.2)] rounded-t-[28px] md:rounded-[28px] overflow-hidden transition-transform duration-500 flex flex-col max-h-[85vh] ${
            activeFloatingId !== null 
              ? 'translate-y-0 scale-100 opacity-100' 
              : 'translate-y-[100%] md:translate-y-10 md:scale-95 opacity-0'
          }`}
        >
          <div className="bg-[#F5F5F5] px-5 py-4 flex items-center justify-between border-b border-gray-300 shrink-0">
            <div className="flex items-center gap-1.5 text-[15px] font-medium text-gray-500 font-fsme">
              <span>{isContacto ? 'Contacto' : 'Tratamientos'}</span>
              {!isContacto && <ChevronRight className="w-4 h-4" />}
              {!isContacto && <span className="text-gray-900">{activeCategory?.title || 'Opciones'}</span>}
            </div>
            
            <button 
              onClick={() => setActiveFloatingId(null)}
              aria-label="Cerrar modal"
              className="p-1.5 rounded-full bg-[#E5E5E5] text-dkv-green-dark hover:bg-[#D5D5D5] transition-colors"
            >
              <X className="w-5 h-5" strokeWidth={2.5} />
            </button>
          </div>

          <div className="px-5 pt-6 pb-10 md:pb-6 overflow-y-auto overscroll-contain">
            <h3 className="text-[26px] font-lemon text-dkv-green-dark uppercase tracking-tight mb-1 leading-none">
              {modalTitle}
            </h3>
            <p className="text-gray-500 text-[17px] font-fsme mb-4">
              {modalSubtitle}
            </p>

            {isContacto ? (
              <div className="border-t border-gray-300 pt-6">
                <p className="text-sm text-gray-500 italic">Formulario de contacto en desarrollo (Supabase / Telegram)...</p>
              </div>
            ) : (
              <div className="flex flex-col border-t border-gray-300 pt-2">
                {subOptions.map((sub: any) => {
                  if (sub.isSeparator) {
                    return (
                      <div key={sub.id} className="pt-6 pb-2">
                        <span className="text-[11px] font-bold text-dkv-green uppercase tracking-widest bg-dkv-green/10 px-3 py-1 rounded-full">
                          {sub.title}
                        </span>
                      </div>
                    );
                  }

                  return (
                    <Link 
                      key={sub.id} 
                      href={sub.href}
                      onClick={() => handleSubOptionClick(sub)}
                      className="group flex items-center justify-between py-4 border-b border-gray-200/60 hover:bg-gray-50 transition-colors active:bg-gray-100"
                    >
                      <div className="flex items-center flex-wrap gap-2">
                        <span className="font-bold text-[17px] text-dkv-green-dark group-hover:text-dkv-green transition-colors">
                          {sub.title}
                        </span>
                        <span className="text-[16px] text-gray-500">
                          ({sub.tag})
                        </span>
                        {sub.id === 'invisalign' && (
                          <span className="text-[10px] font-bold bg-[#718E32] text-white px-2 py-0.5 rounded-full ml-1 uppercase tracking-wide">
                            Recomendado
                          </span>
                        )}
                      </div>
                      <ChevronRight className="w-6 h-6 text-dkv-green-dark group-hover:text-dkv-green transition-colors shrink-0" strokeWidth={2.5} />
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}