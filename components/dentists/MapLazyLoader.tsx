// components/dentists/MapLazyLoader.tsx

"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const DentistsContainer = dynamic(() => import('@/components/dentists/DentistsContainer'), {
  ssr: false,
});

export default function MapLazyLoader({ initialData, slug }: { initialData: any, slug?: string }) {
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [imageError, setImageError] = useState(false);

  const locationName = initialData?.seo?.h1?.normal || "tu zona";
  const currentSlug = slug || initialData?.slug || "default";

  useEffect(() => {
    setShowPlaceholder(true);

    const timer = setTimeout(() => {
      setShowPlaceholder(false);
    }, 5500);

    return () => clearTimeout(timer);
  }, [currentSlug]);

  return (
    <div className="w-full relative rounded-[28px] overflow-hidden bg-gray-100 h-[80vh] md:h-[600px] lg:h-[700px] shadow-inner flex flex-col z-0">
      
      {/* CAPA 1 (Deepest): EL MAPA INTERACTIVO REAL */}
      <div className="absolute inset-0 w-full h-full">
        <DentistsContainer initialData={initialData} />
      </div>

      {/* ⚡️ CAPA 2 (Z-1000): EL ENVOLTORIO DE FACHADA */}
      {/* Añadido 'md:hidden' -> Esta capa y el mensaje SOLO existirán en móviles */}
      <div 
        className={`absolute inset-0 z-[1000] bg-white transition-opacity duration-1000 ease-in-out md:hidden ${
          showPlaceholder ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <picture className="absolute inset-0 w-full h-full z-10">
          <source 
            media="(min-width: 1024px)" 
            srcSet={imageError ? '/images/map-placeholder.webp' : `/images/maps/${currentSlug}-desktop.webp`} 
          />
          <source 
            media="(min-width: 768px)" 
            srcSet={imageError ? '/images/map-placeholder.webp' : `/images/maps/${currentSlug}-tablet.webp`} 
          />
          <img 
            src={imageError ? '/images/map-placeholder.webp' : `/images/maps/${currentSlug}-mobile.webp`} 
            alt={`Mapa de clínicas en ${locationName}`}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
            fetchPriority="high" 
          />
        </picture>
        
        {/* EL MENSAJE "CONECTANDO..." */}
        {showPlaceholder && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-gray-100 w-max max-w-[90%] z-20 animate-in fade-in zoom-in-50 duration-500">
            <div className="w-3 h-3 flex-shrink-0 bg-dkv-green rounded-full animate-pulse" />
            <span className="text-xs font-bold text-dkv-green-dark uppercase tracking-widest truncate">
              Conectando con el mapa interactivo...
            </span>
          </div>
        )}
      </div>

    </div>
  );
}