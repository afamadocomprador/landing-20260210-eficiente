// components/dentists/MapLazyLoader.tsx
"use client";

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

// 1. Importación diferida del mapa real
const DentistsContainer = dynamic(() => import('@/components/dentists/DentistsContainer'), {
  ssr: false,
  loading: () => <MapSkeleton />
});

// 2. Tu Skeleton exacto
const MapSkeleton = () => (
  <div className="w-full h-[600px] bg-gray-100 animate-pulse rounded-dkv flex items-center justify-center">
    <div className="flex flex-col items-center text-gray-400">
      <svg className="w-10 h-10 mb-2 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      <span className="font-fsme text-sm">Cargando mapa de clínicas...</span>
    </div>
  </div>
);

// 3. El Wrapper "Idle-Until-Urgent"
export default function MapLazyLoader({ initialData }: { initialData: any }) {
  const [shouldLoadMap, setShouldLoadMap] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldLoadMap) return;

    let timeoutId: NodeJS.Timeout;

    // CONDICIÓN 1: Tiempo de inactividad (2.5 segundos tras cargar la página)
    timeoutId = setTimeout(() => {
      setShouldLoadMap(true);
    }, 2500);

    // CONDICIÓN 2: El usuario hace scroll hacia el mapa
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoadMap(true);
          observer.disconnect();
          clearTimeout(timeoutId);
        }
      },
      { rootMargin: '300px' } // Empieza a cargar 300px antes de que entre en pantalla
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [shouldLoadMap]);

  return (
    <div ref={containerRef} className="w-full relative">
      {shouldLoadMap ? <DentistsContainer initialData={initialData} /> : <MapSkeleton />}
    </div>
  );
}