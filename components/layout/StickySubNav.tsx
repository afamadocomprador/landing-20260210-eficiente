// components/layout/StickySubNav.tsx

"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface StickySubNavProps {
  activeId: string; 
}

// ⚡️ DICCIONARIO CENTRALIZADO DE NAVEGACIÓN TRANSVERSAL (CORREGIDO)
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

  // Lógica de visibilidad al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      // Aparece al pasar la primera visualización (hero)
      setIsVisible(window.scrollY > 350); 
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); 
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ⚡️ LÓGICA DE AUTO-SCROLL A LA PÍLDORA ACTIVA
  useEffect(() => {
    if (isVisible && scrollContainerRef.current) {
      const activeElement = document.getElementById(`pill-${activeId}`);
      const container = scrollContainerRef.current;

      if (activeElement && container) {
        // Calculamos la posición para dejar el botón en el centro de la pantalla
        const scrollLeft = activeElement.offsetLeft - (container.offsetWidth / 2) + (activeElement.offsetWidth / 2);
        
        // Ejecutamos el scroll de forma suave
        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }
  }, [isVisible, activeId]);

  // ⚡️ LÓGICA DE RUTEO INTELIGENTE AUTOMÁTICO
  const activeCluster = Object.values(NAVIGATION_CLUSTERS).find(cluster => 
    cluster.some(item => item.id === activeId)
  );

  if (!activeCluster) return null;

  return (
    <div 
      className={`
        fixed bottom-6 left-0 right-0 z-[60] w-full px-4
        transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) pointer-events-none
        flex justify-center
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-[150%] opacity-0'}
      `}
    >

      <div 
        ref={scrollContainerRef}
        className="bg-[#022A27]/95 backdrop-blur-xl border border-white/10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] rounded-full p-1.5 flex items-center justify-start gap-2 overflow-x-auto hide-scrollbar max-w-full pointer-events-auto"
      >
        
        {activeCluster.map((item) => {
          const isActive = item.id === activeId;

          return (
            <Link 
              key={item.id}
              id={`pill-${item.id}`} 
              href={item.href}
              className={`snap-start shrink-0 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 text-center ${
                isActive 
                  ? 'bg-dkv-green text-white shadow-lg' 
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          );
        })}

      </div>
    </div>
  );
}