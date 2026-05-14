// components/ui/SmartStickyCTA.tsx

"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

import { usePostHog } from 'posthog-js/react';
import { usePathname } from 'next/navigation';

export default function SmartStickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  const posthog = usePostHog();
  const pathname = usePathname();


  useEffect(() => {
    const handleScroll = () => {
      // El botón aparece cuando el usuario ha bajado 350px (aprox. al pasar el Hero)
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };




    // Usamos passive: true para que el evento de scroll no ralentice la página en móviles
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Disparamos la comprobación inicial por si el usuario recarga la página a mitad de scroll
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleStickyClick = () => {
    if (posthog) {
      posthog.capture('sticky_cta_clicado', {
        origen: pathname
      });
    }
  };


  // -------------------------------------------------------------------
  // 🚨 2. EL CORTAFUEGOS (DESPUÉS DE LOS HOOKS) 🚨
  // -------------------------------------------------------------------
  // Si detecta la ruta de tratamientos, aborta el renderizado para no pisar el Dock Unificado
  //if (pathname?.includes("/tratamientos-v2/")) {
  if (pathname?.includes("/tratamientos-v2/") || pathname?.includes("/contacto")) {
    return null;
  }

  return (
    <div 
      // z-[90] para que esté por encima del contenido, pero por debajo de modales (z-[9999]) y menú (z-[1010])
      // md:hidden oculta este botón flotante en escritorio (donde ya tenemos el header sticky)
      className={`fixed bottom-6 right-6 z-[90] md:hidden transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
        isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-90 pointer-events-none'
      }`}
    >
      <Link 
        href="/contacto"
        onClick={handleStickyClick}
        className="flex items-center justify-center gap-2.5 bg-dkv-green-dark text-white font-bold font-fsme px-5 py-3.5 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.25)] active:scale-95 transition-all border border-white/20"
      >
        <MessageCircle className="w-5 h-5 fill-white/20" />
        <span className="tracking-wide uppercase text-sm">Consultas</span>
      </Link>
    </div>
  );
}