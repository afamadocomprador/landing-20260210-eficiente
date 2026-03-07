"use client";

import React, { useState, useEffect } from 'react';

// Tipado básico para asegurar que TypeScript no se queje
interface TocData {
  level: { id: string; number: string; title: string };
  treatments?: { id: string; name: string }[];
}

export const GodLevelTOC = ({ tocData }: { tocData: TocData[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // ⚡️ Solución Anti-Error 500 (Hydration Mismatch)
  const [mounted, setMounted] = useState(false); 

  // Microinteracción 1: Anillo de progreso de lectura magnético
  useEffect(() => {
    setMounted(true); // Confirmamos que ya estamos 100% en el navegador del cliente

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight <= 0) return; 
      const scroll = totalScroll / windowHeight;
      setScrollProgress(scroll);
    };
    
    // Ejecutamos una vez al montar por si el usuario recargó la página a mitad del artículo
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Microinteracción 2: Control absoluto del Flow de navegación (Smooth Scroll)
  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault(); 
    
    const element = document.getElementById(id);
    if (element) {
      // Navegación suave como la seda
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start' 
      });
      
      // Cerramos el panel de cristal instantáneamente para no bloquear la vista
      setIsOpen(false);
      
      // Actualizamos la URL sigilosamente por si el usuario quiere compartir el link
      window.history.pushState(null, '', `#${id}`);
    }
  };

  // ⚡️ Prevención Nivel Dios: Si el componente no se ha montado en el cliente, 
  // devolvemos null para que el servidor no intente renderizar estilos dinámicos.
  if (!mounted) return null;

  return (
    <>
      {/* FAB (Floating Action Button) - Zona táctil óptima en Mobile (Ley de Fitts) */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-black text-white rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
        style={{
          background: `conic-gradient(from 0deg, #10b981 ${scrollProgress * 360}deg, #000 ${scrollProgress * 360}deg)`
        }}
      >
        {/* Centro del botón (Cubre el gradiente para hacer el anillo) */}
        <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
          <svg className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            )}
          </svg>
        </div>
      </button>

      {/* Menú Overlay con Glassmorphism (Bottom Sheet en Mobile) */}
      <div 
        className={`fixed inset-0 z-40 flex items-end sm:items-center justify-center pointer-events-none transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Backdrop blur (Desenfoca la página de fondo sin ocultarla) */}
        <div 
          className={`absolute inset-0 bg-black/20 backdrop-blur-md pointer-events-auto transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsOpen(false)}
        />

        {/* Panel del Índice */}
        <div 
          className={`relative w-full sm:w-[400px] max-h-[80vh] bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl sm:rounded-3xl rounded-t-3xl p-6 pointer-events-auto overflow-y-auto transform transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
        >
          <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-6 sm:hidden" /> {/* Pull indicator visual */}
          <h3 className="text-2xl font-bold tracking-tight text-gray-900 mb-6 font-lemon uppercase">Índice del Plan</h3>
          
          <nav className="space-y-6">
            {tocData?.map((section, index) => (
              <div key={index} className="animate-fade-in-up">
                {/* NIVEL 1: LevelTitle */}
                <a 
                  href={`#${section.level.id}`} 
                  onClick={(e) => handleScrollToSection(e, section.level.id)} 
                  className="group flex items-baseline space-x-3 text-gray-900 hover:text-[#008f39] transition-colors cursor-pointer"
                >
                  <span className="text-sm font-bold opacity-40 group-hover:opacity-100 transition-opacity">{section.level.number}</span>
                  <span className="text-lg font-bold tracking-tight">{section.level.title}</span>
                </a>
                
                {/* NIVEL 2: TreatmentRow */}
                {section.treatments && section.treatments.length > 0 && (
                  <ul className="mt-3 ml-7 space-y-2 border-l-2 border-gray-100 pl-4">
                    {section.treatments.map((treatment, tIdx) => (
                      <li key={tIdx}>
                        <a 
                          href={`#${treatment.id}`} 
                          onClick={(e) => handleScrollToSection(e, treatment.id)} 
                          className="text-base text-gray-500 hover:text-gray-900 transition-colors block py-1 cursor-pointer font-medium"
                        >
                          {treatment.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};