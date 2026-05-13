// components/FooterLegal.tsx

import React from 'react';
import Link from 'next/link';

// --- IMPORTACIONES DE SERVICIOS Y POSTHOG ---
import ScrollTracker from '@/components/posthog/ScrollTracker';
import { getCustomerServicePhone } from '@/lib/services/config';
import TrackedPhoneLink from '@/components/posthog/TrackedPhoneLink';

/**
 * FooterLegal - Estructura de dos zonas
 * Zona Oscura: Navegación de contenido y contacto.
 * Zona Clara: Enlaces legales y cumplimiento.
 */
// 🚀 Convertimos a función async (Server Component) para poder leer el teléfono
export default async function FooterLegal() {
  const currentYear = new Date().getFullYear();
  
  // 🚀 Llamamos a tu servicio en el servidor
  const customerPhone = await getCustomerServicePhone();
  
  // Formateo visual para mantener tu diseño original (ej. "+34  976  217  463")
  const displayPhone = customerPhone.replace('+34', '+34  ').replace(/(\d{3})(\d{3})(\d{3})/, '$1  $2  $3');

  return (
    <footer className="w-full">

      {/* VIGILANTE AQUÍ: Encapsulado dentro del footer */}
      <ScrollTracker sectionName="Footer" />

      {/* --- ZONA 1: GRIS OSCURA (Contenido y Navegación) --- */}
      <div className="bg-dkv-gray text-white py-14 font-fsme">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 text-sm font-light">
  
             {/* Columna Izquierda: Opciones de la página */}
             <div>
               <p className="font-bold mb-6 text-lg uppercase tracking-wide font-lemon text-white">DKV DENTISALUD ELITE</p>
               <ul className="space-y-4 opacity-90">
                 <li>
                   <Link href="/dentistas" className="hover:underline hover:text-white/80 transition-colors">
                     Dentistas y Centros Dentales en España
                   </Link>
                 </li>
                 <li>
                   <Link href="/#tratamientos" className="hover:underline hover:text-white/80 transition-colors">
                     Tratamientos Dentales y sus Precios
                   </Link>
                 </li>
               </ul>
             </div>

             {/* Columna Central: Espacio libre */}
             <div className="hidden md:block"></div>

             {/* Columna Derecha: Contacto Urgente */}
             <div className="md:text-right">
               <p className="font-bold mb-6 text-lg uppercase tracking-wide font-lemon text-white">CONTACTO NACIONAL</p>
               <ul className="space-y-4 opacity-90">
                 <li>
                   {/* 🚀 Usamos el nuevo componente interactivo con PostHog */}
                   <TrackedPhoneLink 
                     phone={customerPhone} 
                     seccion="Footer" 
                     className="hover:underline text-xl font-bold flex md:justify-end items-center gap-2 font-fsme"
                   >
                     {displayPhone}
                   </TrackedPhoneLink>
                 </li>
                 <li>
                   {/* Ajustado para apuntar a la sección de "plantear cuestiones" (#informacion) */}
                   <Link href="/#informacion" className="hover:underline md:justify-end block">
                     Solicitar información
                   </Link>
                 </li>
               </ul>
             </div>
          </div>
        </div>
      </div>

      {/* --- ZONA 2: GRIS CLARA (Legal y Copyright) --- */}
      <div className="bg-gray-100 py-10 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            
            <div className="text-[11px] font-bold text-dkv-gray uppercase tracking-wider font-fsme text-center md:text-left">
              <p>&copy; {currentYear} RED DENTAL ÉLITE.</p>
              <p className="mt-1 text-dkv-gray/90">Bernardo Sobrecasas Gallizo - Agente Exclusivo DKV</p>
            </div>

            <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-[11px] font-bold text-dkv-gray font-fsme uppercase tracking-widest">
               <Link href="/aviso-legal" className="hover:text-dkv-green transition-colors border-b border-dkv-gray/20">
                 Aviso Legal
               </Link>
               <Link href="/politica-privacidad" className="hover:text-dkv-green transition-colors">
                 Privacidad
               </Link>
               <Link href="/politica-cookies" className="hover:text-dkv-green transition-colors">
                 Cookies
               </Link>
            </nav>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200/50">
            <p className="text-[10px] leading-relaxed text-dkv-gray/90 text-center font-fsme max-w-3xl mx-auto">
              La actividad de mediación de seguros está sujeta a la supervisión de la DGSFP. 
              Los datos identificativos completos del mediador y las condiciones de uso del portal 
              se encuentran detallados en el Aviso Legal.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}