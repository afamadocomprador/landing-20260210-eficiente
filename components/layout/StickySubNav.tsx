// components/layout/StickySubNav.tsx

"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

// 🆕 NUEVAS IMPORTACIONES PARA EL BOTÓN Y LA ANALÍTICA
import { MessageCircle } from 'lucide-react';
import { usePostHog } from 'posthog-js/react';
import { usePathname } from 'next/navigation';

interface StickySubNavProps {
  activeId: string; 
}

const NAVIGATION_CLUSTERS = {
  estetica: [
    { id: 'blanqueamiento', label: 'BLANQUEAMIENTO', href: '/tratamientos-v2/estetica-blanqueamiento' },
    { id: 'carillas', label: 'CARILLAS', href: '/tratamientos-v2/estetica-carillas' },
    { id: 'incrustaciones', label: 'INCRUSTACIONES', href: '/tratamientos-v2/estetica-incrustaciones' },
  ],
  ortodoncia: [
    { id: 'invisalign', label: 'INVISALIGN', href: '/tratamientos-v2/ortodoncia-invisalign' },
    { id: 'lingual', label: 'LINGUAL', href: '/tratamientos-v2/ortodoncia-lingual' },
    { id: 'zafiro', label: 'ZAFIRO', href: '/tratamientos-v2/ortodoncia-zafiro' },
    { id: 'metalica', label: 'METÁLICA', href: '/tratamientos-v2/ortodoncia-metalica' },
    { id: 'ortodoncia-removible', label: 'REMOVIBLE', href: '/tratamientos-v2/ortodoncia-removible' },
  ],
  implantologia: [
    { id: 'individual', label: 'IMPLANTE INDIVIDUAL', href: '/tratamientos-v2/implante-individual' },
    { id: 'arcada', label: 'ARCADA FIJA', href: '/tratamientos-v2/implante-arcada' },
    { id: 'sobredentadura', label: 'SOBREDENTADURA', href: '/tratamientos-v2/implante-sobredentadura' },
    { id: 'hueso', label: 'RECONSTRUCCIÓN HUESO', href: '/tratamientos-v2/regeneracion-hueso' },
  ],
  conservadora: [
    { id: 'reconstruccion', label: 'RECONSTRUCCIÓN', href: '/tratamientos-v2/conservadora-reconstruccion' },
    { id: 'endodoncias', label: 'ENDODONCIAS', href: '/tratamientos-v2/conservadora-endodoncia' },
    { id: 'casos-complejos', label: 'CIRUGÍA Y COMPLEJOS', href: '/tratamientos-v2/conservadora-cirugia' },
  ],
  protesis: [
    { id: 'fija', label: 'FIJAS', href: '/tratamientos-v2/protesis-fijas' },
    { id: 'removible', label: 'REMOVIBLES', href: '/tratamientos-v2/protesis-removibles' },
    { id: 'bruxismo', label: 'BRUXISMO', href: '/tratamientos-v2/protesis-bruxismo' },
  ],
  medicina_sueno: [
    { id: 'apnea', label: 'APNEA', href: '/tratamientos-v2/apnea' }
  ],
  odontopediatria: [
    { id: 'prevencion', label: 'PREVENCIÓN', href: '/tratamientos-v2/pediatria-prevencion' },
    { id: 'conservadora-pediatria', label: 'CONSERVADORA', href: '/tratamientos-v2/pediatria-conservadora' },
    { id: 'endodoncia-pediatria', label: 'ENDODONCIA', href: '/tratamientos-v2/pediatria-endodoncia' },
    { id: 'cirugia-pediatria', label: 'CIRUGÍA Y ESPACIO', href: '/tratamientos-v2/pediatria-extracciones-y-espacio' },
  ],
  prevencion: [
    { id: 'primera-visita', label: 'PRIMERA VISITA', href: '/tratamientos-v2/prevencion-primera-visita' },
    { id: 'higiene', label: 'HIGIENE', href: '/tratamientos-v2/prevencion-higiene' },
  ],
  periodoncia: [
    { id: 'diagnostico-basico', label: 'DIAGNÓSTICO', href: '/tratamientos-v2/periodoncia-basica' },
    { id: 'estabilizacion', label: 'ESTABILIZACIÓN', href: '/tratamientos-v2/periodoncia-estabilizacion' },
    { id: 'micro-cirugia', label: 'MICRO-CIRUGÍA', href: '/tratamientos-v2/periodoncia-micro-cirugia' },
  ],
  cirugia_avanzada: [
    { id: 'extracciones', label: 'EXTRACCIONES', href: '/tratamientos-v2/cirugia-extracciones' },
  ]
};

export default function StickySubNav({ activeId }: StickySubNavProps) {
  const [isVisible, setIsVisible] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 📊 INICIALIZAMOS HOOKS DE ANALÍTICA (Misma lógica que el botón flotante anterior)
  const posthog = usePostHog();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 350); 
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); 
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isVisible && scrollContainerRef.current) {
      const activeElement = document.getElementById(`pill-${activeId}`);
      const container = scrollContainerRef.current;

      if (activeElement && container) {
        const scrollLeft = activeElement.offsetLeft - (container.offsetWidth / 2) + (activeElement.offsetWidth / 2);
        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }
  }, [isVisible, activeId]);

  // 📊 FUNCIÓN DE TRACKING (Enviará el evento a tu panel de conversión)
  const handleContactClick = () => {
    if (posthog) {
      posthog.capture('sticky_cta_clicado', {
        origen: pathname
      });
    }
  };


  // 🟢 --- AÑADIDO: FUNCIÓN DE TRACKING DE NAVEGACIÓN LATERAL --- 🟢
  const handleSubTreatmentClick = (label: string, href: string) => {
    if (posthog) {
      posthog.capture('subtratamiento_clicado', {
        origen: pathname,                   // Para saber que viene del submenú
        categoria_padre: pathname,          // Mantenemos este campo para que coincida con la Home
        nombre_sub_opcion: label,           // Qué ha pulsado (ej. 'METÁLICA')
        url_destino: href                   // A dónde va
      });
    }
  };
  // 🟢 ----------------------------------------------------------- 🟢


  const activeCluster = Object.values(NAVIGATION_CLUSTERS).find(cluster => 
    cluster.some(item => item.id === activeId)
  );

  if (!activeCluster) return null;

  return (
    <div 
      // 🎨 REDISEÑO ESTRUCTURAL: Ahora se ancla a bottom-0, ocupa el 100% (w-full) y solo se ve en móvil (md:hidden)
      className={`
        fixed bottom-0 left-0 right-0 z-[90] w-full md:hidden
        transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) pointer-events-none
        ${isVisible ? 'translate-y-0' : 'translate-y-full'}
      `}
    >

      {/* 🎨 CONTENEDOR DOCK UNIFICADO: Fondo oscuro corporativo con desenfoque */}
      <div className="bg-[#022A27]/95 backdrop-blur-xl border-t border-white/10 shadow-[0_-15px_40px_-10px_rgba(0,0,0,0.5)] flex flex-col pointer-events-auto pb-[env(safe-area-inset-bottom)]">
        
        {/* ⚡️ FILA 1: PÍLDORAS DE NAVEGACIÓN (SCROLL HORIZONTAL) */}
        <div 
          ref={scrollContainerRef}
          className="flex items-center gap-2 overflow-x-auto hide-scrollbar px-4 py-3 border-b border-white/5"
        >
          {activeCluster.map((item) => {
            const isActive = item.id === activeId;

            return (
              <Link 
                key={item.id}
                id={`pill-${item.id}`} 
                href={item.href}
                onClick={() => handleSubTreatmentClick(item.label, item.href)}
                className={`snap-start shrink-0 px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 text-center uppercase tracking-wide border border-transparent ${
                  isActive 
                    ? 'bg-dkv-green text-white shadow-lg' 
                    : 'text-white/70 bg-white/5 hover:bg-white/10 hover:text-white border-white/10'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* ⚡️ FILA 2: BOTÓN DE CONTACTO INTEGRADO (CON TRACKING CRO) */}
        <div className="px-4 py-3">
          <Link 
            href="/contacto"
            onClick={handleContactClick}
            className="flex items-center justify-center gap-2.5 w-full bg-dkv-green-dark text-white font-bold font-fsme px-5 py-3.5 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.25)] active:scale-[0.98] transition-all border border-white/20"
          >
            <MessageCircle className="w-5 h-5 fill-white/20" />
            <span className="tracking-wide uppercase text-sm">Consultas</span>
          </Link>
        </div>

      </div>
    </div>
  );
}