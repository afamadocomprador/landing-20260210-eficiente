// components/Header.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Stethoscope, MapPin, MessageCircle, Calculator } from "lucide-react";

interface HeaderProps {
  onOpenCalculator?: () => void;
}

interface NavItem {
  label: string;
  subLabel: string;
  href: string;
  ariaLabel: string;
  icon: React.ElementType;
}

const NAV_ITEMS: NavItem[] = [
  { 
    label: "Tratamientos", 
    subLabel: "Ver precios y coberturas",
    href: "#tratamientos", 
    ariaLabel: "Ver precios de tratamientos cubiertos",
    icon: Stethoscope
  },
  { 
    label: "Dentistas", 
    subLabel: "Encuentra tu clínica cercana",
    href: "#dentistas", 
    ariaLabel: "Buscar dentistas en toda España o cerca de mí",
    icon: MapPin
  },
  { 
    label: "Consultas", 
    subLabel: "Plantéanos tus dudas",
    href: "#información", 
    ariaLabel: "Planteanos cualquier duda o comentario que necesites",
    icon: MessageCircle
  },
];

export default function Header({ onOpenCalculator }: HeaderProps) {
  const pathname = usePathname();  
  const isHome = pathname === "/";

  const [isScrolled, setIsScrolled] = useState(false);
  const [showCta, setShowCta] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleScroll = useCallback(() => {
    window.requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
      setShowCta(scrollY > 350);
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 left-0 w-full z-[1020] transition-all duration-300 ease-in-out border-b border-white/10 ${
          isScrolled
            ? "h-[70px] bg-dkv-green/95 backdrop-blur-sm shadow-dkv-card" 
            : "h-[110px] bg-dkv-green" 
        }`}
      >
        <div className="container mx-auto h-full px-4 md:px-6 flex items-center justify-between">
          
          {/* --- LOGOTIPO --- */}
          <div className="relative flex items-center h-full shrink-0 z-50">
             <Link 
               href="/" 
               aria-label="Volver al inicio - DKV Dentisalud"
               className="relative flex items-center transition-all duration-300"
               onClick={() => setIsMobileMenuOpen(false)}
             >
               <div 
                 className={`relative transition-all duration-300 overflow-hidden flex items-center ${
                   isScrolled ? 'w-[140px]' : 'w-[180px] md:w-[220px]'
                 }`}
               >
                  <Image 
                    src="/images/dkv-logo.png"
                    alt="DKV Seguros Médicos" 
                    width={220}
                    height={90}
                    className="w-full h-auto object-contain object-left"
                    priority 
                    sizes="(max-width: 768px) 140px, 220px"
                    style={{ objectFit: 'contain', height: 'auto', width: '100%' }}
                  />
               </div>
             </Link>
          </div>

          {/* --- NAVEGACIÓN DESKTOP --- */}
          <div className="flex items-center gap-6 lg:gap-10 z-50">
            <nav className="hidden md:flex gap-6 lg:gap-8" role="navigation">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={isHome ? item.href : `/${item.href}`}
                  aria-label={item.ariaLabel}
                  className="text-white/90 font-fsme text-sm lg:text-base font-bold hover:text-white transition-colors uppercase tracking-widest relative group py-2"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>
            
            {/* --- BOTÓN CTA DESKTOP (STICKY) --- */}
            <div 
              className={`transition-all duration-500 ease-out transform hidden md:block ${
                showCta 
                  ? "opacity-100 translate-y-0 pointer-events-auto" 
                  : "opacity-0 translate-y-4 pointer-none"
              }`}
              aria-hidden={!showCta}
            >
              <Link
                href="/presupuesto"
                className="
                  bg-white text-dkv-green hover:bg-gray-100 
                  font-lemon tracking-widest text-xs md:text-sm 
                  h-10 px-6 
                  rounded-btn 
                  shadow-lg hover:shadow-xl hover:scale-105 active:scale-95
                  transition-all duration-300
                  flex items-center justify-center
                  uppercase font-bold
                "
                aria-label="Ir a calculadora de precios"
              >
                Calcula tu precio
              </Link>
            </div>

            {/* --- BOTÓN MENÚ MÓVIL (Hamburguesa / Cerrar) --- */}
            <button
              className="md:hidden text-white p-2 -mr-2 flex items-center justify-center transition-transform duration-300 active:scale-90"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú de navegación"}
              aria-expanded={isMobileMenuOpen}
            >
              <div className={`transition-all duration-300 transform ${isMobileMenuOpen ? 'rotate-90' : 'rotate-0'}`}>
                {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* 🌟 MENÚ MÓVIL FULL-SCREEN */}
      <div 
        className={`
          md:hidden fixed inset-0 z-[1010] bg-dkv-green/98 backdrop-blur-xl 
          transition-all duration-400 ease-out flex flex-col justify-center px-6 pb-20 pt-28 overflow-hidden
          ${isMobileMenuOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-none -translate-y-4"}
        `}
      >
        {/* 🌟 PANEL UNIFICADO DE NAVEGACIÓN (INTEGRANDO LA ILUSTRACIÓN DENTAL) */}
        <div 
          style={{ transitionDelay: '100ms' }}
          className={`
            w-full max-w-sm mx-auto bg-white/95 rounded-[2rem] shadow-2xl overflow-hidden flex flex-row relative z-10
            transition-all duration-500 transform
            ${isMobileMenuOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}
          `}
        >
          {/* 🌟 COLUMNA IZQUIERDA: La franja de utensilios dentales */}
          <div className="w-[28%] border-r border-dkv-green/5 relative overflow-hidden bg-dkv-green/5 p-3 flex flex-col justify-end">
            <div className={`absolute inset-0 transition-all duration-1000 ${isMobileMenuOpen ? 'scale-100 opacity-60' : 'scale-110 opacity-0'}`}>
                <Image 
                    src="/images/utensilios-dental.png" // Asegúrate de tener la imagen en esta ruta
                    alt="Utensilios dentales de línea"
                    fill
                    className="object-cover object-bottom pt-8 pb-4" // Se ajusta al fondo y se recorta por arriba si es necesario
                    priority
                />
            </div>
          </div>

          {/* 🌟 COLUMNA DERECHA: El menú de navegación */}
          <nav className="flex-1 flex flex-col p-2 pl-1">
            {NAV_ITEMS.map((item, index) => {
              const Icon = item.icon;
              const isLast = index === NAV_ITEMS.length - 1;
              return (
                <Link
                  key={item.label}
                  href={isHome ? item.href : `/${item.href}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    group p-4 pr-3 flex items-center gap-3.5 rounded-2xl hover:bg-gray-50 active:scale-[0.98] transition-all duration-200
                    ${!isLast ? 'border-b border-gray-100 rounded-b-none' : ''} 
                    ${index === 0 ? 'rounded-t-2xl' : ''}
                  `}
                >
                  <div className="w-9 h-9 rounded-full bg-dkv-green/5 text-dkv-green flex items-center justify-center shrink-0">
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="block text-dkv-green-dark font-lemon text-base font-bold tracking-wider uppercase mb-0.5">
                      {item.label}
                    </span>
                    <span className="block text-gray-500 text-xs font-fsme leading-tight">
                      {item.subLabel}
                    </span>
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* --- CTA BOTTOM FIJO --- */}
        <div 
          style={{ transitionDelay: '250ms' }}
          className={`
            w-full max-w-sm mx-auto mt-6 transition-all duration-500 transform relative z-10
            ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          `}
        >
          <Link
            href="/presupuesto"
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full bg-white text-dkv-green py-4 rounded-[1.5rem] font-lemon text-base font-bold uppercase tracking-widest shadow-[0_8px_30px_rgba(0,0,0,0.2)] active:scale-95 transition-transform flex items-center justify-center gap-3"
          >
            <Calculator className="w-5 h-5" />
            Calcula tu precio
          </Link>
        </div>
      </div>
    </>
  );
}