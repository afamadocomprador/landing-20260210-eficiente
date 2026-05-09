// components/dentists/MapLazyLoader.tsx

"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const DentistsContainer = dynamic(() => import('@/components/dentists/DentistsContainer'), {
  ssr: false,
});

export default function MapLazyLoader({ initialData, slug }: { initialData: any, slug?: string }) {
  // ⚡️ Identificamos el nivel de la landing (asumiendo que viene en initialData.nivel)
  const nivel = initialData?.seo.nivel; 
  // Solo aplicamos el truco a municipios (con dentistas 04 o sin dentistas 07)
  const isEligibleLevel = nivel === '04' || nivel === '07';

  // Si es elegible, empezamos en true. Si no, en false desde el principio.
  const [showPlaceholder, setShowPlaceholder] = useState(isEligibleLevel);
  const [imageError, setImageError] = useState(false);

  const locationName = initialData?.seo?.h1?.normal || "tu zona";
  const currentSlug = slug || initialData?.slug || "default";

  useEffect(() => {
    // Si no es un nivel 04 o 07, apagamos el placeholder y salimos
    if (!isEligibleLevel) {
      setShowPlaceholder(false);
      return;
    }

    // Comportamiento normal para 04 y 07
    setShowPlaceholder(true);
    const timer = setTimeout(() => {
      setShowPlaceholder(false);
    }, 5500);

    return () => clearTimeout(timer);
  }, [currentSlug, isEligibleLevel]);

  return (
    <div className="w-full relative rounded-[28px] overflow-hidden bg-gray-100 h-[80vh] md:h-[600px] lg:h-[700px] shadow-inner flex flex-col z-0">
      
      {/* CAPA 1: EL MAPA INTERACTIVO REAL */}
      <div className="absolute inset-0 w-full h-full">
        <DentistsContainer initialData={initialData} />
      </div>

      {/* ⚡️ CAPA 2: FACHADA (Solo se renderiza si es nivel 04 o 07) */}
      {isEligibleLevel && (
        <div 
          className={`absolute inset-0 z-[1000] bg-white transition-opacity duration-1000 ease-in-out md:hidden ${
            showPlaceholder ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Hemos simplificado a un solo <img> porque el robot ya solo saca versión móvil */}
          <picture className="absolute inset-0 w-full h-full z-10">
            <img 
              src={imageError ? '/images/map-placeholder.webp' : `/images/maps/${currentSlug}-mobile.webp`} 
              alt={`Mapa de clínicas en ${locationName}`}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
              fetchPriority="high" 
            />
          </picture>
          
          {showPlaceholder && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-gray-100 w-max max-w-[90%] z-20 animate-in fade-in zoom-in-50 duration-500">
              <div className="w-3 h-3 flex-shrink-0 bg-dkv-green rounded-full animate-pulse" />
              <span className="text-xs font-bold text-dkv-green-dark uppercase tracking-widest truncate">
                Conectando con el mapa interactivo...
              </span>
            </div>
          )}
        </div>
      )}

    </div>
  );
}