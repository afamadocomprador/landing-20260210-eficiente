"use client";

import React, { useState, useEffect } from 'react';

// Actualizamos la interfaz para permitir anidación (3er nivel)
interface Treatment {
  id: string;
  name: string;
  price?: string;
  subTreatments?: { name: string; price?: string }[]; // El tercer nivel
}

interface TocData {
  level: { id: string; number: string; title: string };
  treatments?: Treatment[];
}

export const GodLevelTOC = ({ tocData }: { tocData: TocData[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mounted, setMounted] = useState(false); 

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight <= 0) return; 
      const scroll = totalScroll / windowHeight;
      setScrollProgress(scroll);
    };
    
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault(); 
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpen(false);
      window.history.pushState(null, '', `#${id}`);
    }
  };

  if (!mounted) return null;

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-black text-dkv-green rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
        style={{
          background: `conic-gradient(from 0deg, currentColor ${scrollProgress * 360}deg, #000 ${scrollProgress * 360}deg)`
        }}
      >
        <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white">
          <svg className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            )}
          </svg>
        </div>
      </button>

      <div className={`fixed inset-0 z-40 flex items-end sm:items-center justify-center pointer-events-none transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
        <div 
          className={`absolute inset-0 bg-black/20 backdrop-blur-md pointer-events-auto transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsOpen(false)}
        />

        <div className={`relative w-full sm:w-[450px] max-h-[85vh] bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl sm:rounded-3xl rounded-t-3xl p-6 pointer-events-auto overflow-y-auto transform transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
          <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-6 sm:hidden" />
          <p className="text-2xl font-bold tracking-tight text-gray-900 mb-6 font-lemon uppercase">
            Índice de Tratamientos
          </p>
          
          <nav className="space-y-6">
            {tocData?.map((section, index) => (
              <div key={index} className="animate-fade-in-up">
                {/* NIVEL 1 */}
                <a 
                  href={`#${section.level.id}`} 
                  onClick={(e) => handleScrollToSection(e, section.level.id)} 
                  className="group flex items-baseline space-x-3 text-gray-900 hover:text-dkv-green transition-colors cursor-pointer"
                >
                  <span className="text-sm font-bold opacity-40 group-hover:opacity-100 transition-opacity">{section.level.number}</span>
                  <span className="text-lg font-bold tracking-tight">{section.level.title}</span>
                </a>
                
                {/* NIVEL 2 */}
                {section.treatments && section.treatments.length > 0 && (
                  <ul className="mt-3 ml-7 space-y-2 border-l-2 border-gray-100 pl-4">
                    {section.treatments.map((treatment, tIdx) => (
                      <li key={tIdx} className="space-y-1">
                        <a 
                          href={`#${treatment.id}`} 
                          onClick={(e) => handleScrollToSection(e, treatment.id)} 
                          className="group/item flex items-baseline justify-between py-1.5 cursor-pointer"
                        >
                          <span className="text-base font-medium text-gray-500 group-hover/item:text-gray-900 transition-colors pr-4">
                            {treatment.name}
                          </span>
                          {treatment.price && (
                            <span className="text-sm font-bold text-dkv-green font-lemon shrink-0 opacity-80 group-hover/item:opacity-100 transition-opacity">
                              {treatment.price}
                            </span>
                          )}
                        </a>

                        {/* NIVEL 3 (Sub-tratamientos anidados con mismo tamaño que Nivel 2) */}
                        {treatment.subTreatments && treatment.subTreatments.length > 0 && (
                          <ul className="ml-4 mt-2 space-y-2 border-l border-gray-100 pl-4 pb-2">
                            {treatment.subTreatments.map((sub, sIdx) => (


                                <li key={sIdx}>
                                        <a 
                                          href={`#${sub.id}`} 
                                          onClick={(e) => handleScrollToSection(e, sub.id)} 
                                          className="group/sub flex items-baseline justify-between py-1 cursor-pointer"
                                                                        >
                                          <span className="text-base font-medium text-gray-500 group-hover/sub:text-dkv-green transition-colors pr-4">
                                            {sub.name}
                                          </span>
                                          {sub.price && (
                                            <span className="text-sm font-bold text-dkv-green font-lemon shrink-0 opacity-80 group-hover/sub:opacity-100 transition-opacity">
                                              {sub.price}
                                            </span>
                                          )}
                                        </a>
                                      </li>



                            ))}
                          </ul>
                        )}

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