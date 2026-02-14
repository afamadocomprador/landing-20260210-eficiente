import React from 'react';
import Link from 'next/link';

/**
 * FooterLegal - Estructura de dos zonas
 * Zona Oscura: Navegación de contenido y contacto.
 * Zona Clara: Enlaces legales y cumplimiento.
 */
const FooterLegal: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full">
      {/* --- ZONA 1: GRIS OSCURA (Contenido y Navegación) --- */}
      <div className="bg-dkv-gray text-white py-14 font-fsme">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 text-sm font-light">
  
             {/* Columna Izquierda: Opciones de la página */}
             <div>
               <h4 className="font-bold mb-6 text-lg uppercase tracking-wide font-lemon">DKV SEGUROS</h4>
               <ul className="space-y-4 opacity-90">
                 <li>
                   <Link href="/seguros-dentales" className="hover:underline hover:text-white/80 transition-colors">
                     Dentisalud Élite
                   </Link>
                 </li>
                 <li>
                   <Link href="/cuadro-medico" className="hover:underline hover:text-white/80 transition-colors">
                     Cuadro Médico
                   </Link>
                 </li>
                 <li>
                   <Link href="/tratamientos" className="hover:underline hover:text-white/80 transition-colors">
                     Tratamientos y Precios
                   </Link>
                 </li>
               </ul>
             </div>

             {/* Columna Central: Suprimida (Espacio libre) */}
             <div className="hidden md:block"></div>

             {/* Columna Derecha: Contacto Urgente */}
             <div className="md:text-right">
               <h4 className="font-bold mb-6 text-lg uppercase tracking-wide font-lemon">Contacto</h4>
               <ul className="space-y-4 opacity-90">
                 <li>
                   <a href="tel:+34976217463" className="hover:underline text-xl font-bold flex md:justify-end items-center gap-2">
                     976 217 463
                   </a>
                 </li>
                 <li>
                   <Link href="/#información" className="hover:underline md:justify-end">
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
            
            {/* Copyright e Identificación breve */}
            <div className="text-[11px] font-bold text-dkv-gray uppercase tracking-wider font-fsme text-center md:text-left">
              <p>&copy; {currentYear} RED DENTAL ÉLITE.</p>
              <p className="mt-1 opacity-70">Bernardo Sobrecasas Gallizo - Agente Exclusivo DKV</p>
            </div>
            
            {/* Navegación Legal Crítica */}
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

          {/* Nota legal mínima obligatoria en la zona clara */}
          <div className="mt-8 pt-8 border-t border-gray-200/50">
            <p className="text-[10px] leading-relaxed text-dkv-gray/60 text-center font-fsme max-w-3xl mx-auto">
              La actividad de mediación de seguros está sujeta a la supervisión de la DGSFP. 
              Los datos identificativos completos del mediador y las condiciones de uso del portal 
              se encuentran detallados en el Aviso Legal.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterLegal;
