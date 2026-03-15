"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface StickySubNavProps {
  // ⚡️ Tipado genérico: Ahora acepta cualquier string, haciendo el componente infinitamente escalable.
  activeId: string; 
}

// ⚡️ DICCIONARIO CENTRALIZADO DE NAVEGACIÓN TRANSVERSAL
// Aquí agrupamos los tratamientos por "clusters" lógicos.
const NAVIGATION_CLUSTERS = {
  ortodoncia: [
    { id: 'metalica', label: 'Metálica', href: '/tratamientos/ortodoncia/metalica' },
    { id: 'zafiro', label: 'Zafiro', href: '/tratamientos/ortodoncia/zafiro' },
    { id: 'invisalign', label: 'Invisalign', href: '/tratamientos/ortodoncia/invisalign' },
    { id: 'lingual', label: 'Lingual', href: '/tratamientos/ortodoncia/lingual' },
  ],
  implantologia: [
    { id: 'individual', label: 'Implante Individual', href: '/tratamientos/implantologia/implante-individual' },
    { id: 'arcada', label: 'Arcada Fija', href: '/tratamientos/implantologia/arcada-completa-fija' },
    { id: 'sobredentadura', label: 'Sobredentadura', href: '/tratamientos/implantologia/sobredentadura' },
  ],
  estetica: [
    { id: 'blanqueamiento', label: 'Blanqueamiento', href: '/tratamientos/estetica/blanqueamiento' },
    { id: 'carillas', label: 'Carillas', href: '/tratamientos/estetica/carillas' },
    { id: 'incrustaciones', label: 'Incrustaciones', href: '/tratamientos/estetica/incrustaciones' },
  ]
};

export default function StickySubNav({ activeId }: StickySubNavProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Aparece al pasar la primera visualización (hero)
      setIsVisible(window.scrollY > 350); 
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); 
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ⚡️ LÓGICA DE RUTEO INTELIGENTE (Context-Aware)
  // Averiguamos a qué cluster pertenece el activeId que nos ha pasado la página
  let activeCluster = null;

  if (NAVIGATION_CLUSTERS.ortodoncia.some(item => item.id === activeId)) {
    activeCluster = NAVIGATION_CLUSTERS.ortodoncia;
  } else if (NAVIGATION_CLUSTERS.implantologia.some(item => item.id === activeId)) {
    activeCluster = NAVIGATION_CLUSTERS.implantologia;
  } else if (NAVIGATION_CLUSTERS.estetica.some(item => item.id === activeId)) {
    activeCluster = NAVIGATION_CLUSTERS.estetica;
  }

  // Si pasamos un ID que no está mapeado, no renderizamos el menú para no confundir al usuario
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
      <div className="bg-white/90 backdrop-blur-xl border border-dkv-gray-border shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] rounded-full p-1.5 flex items-center justify-center gap-1 overflow-x-auto hide-scrollbar max-w-full pointer-events-auto">
        
        {activeCluster.map((item) => {
          const isActive = item.id === activeId;

          return (
            <Link 
              key={item.id} 
              href={item.href}
              className={`snap-start shrink-0 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 text-center ${
                isActive 
                  ? 'bg-dkv-green text-white shadow-md' 
                  : 'text-dkv-gray hover:bg-dkv-gray-light/50 hover:text-dkv-green-dark'
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
