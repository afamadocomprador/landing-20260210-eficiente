"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  onOpenCalculator?: () => void;
}

interface NavItem {
  label: string;
  href: string;
  ariaLabel: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Precios de tratamientos", href: "#tratamientos", ariaLabel: "Ver precios de tratamientos cubiertos" },
  { label: "Encontrar dentista", href: "#dentistas", ariaLabel: "Buscar dentistas en toda España o cerca de mí" },
  { label: "Solicita información", href: "#información", ariaLabel: "Planteanos cualquier duda o comentario que necesites" },
];

export default function Header({ onOpenCalculator }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCta, setShowCta] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        <div className="relative flex items-center h-full shrink-0">
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
                  style={{ objectFit: 'contain' }}
                />
             </div>
           </Link>
        </div>

        {/* --- NAVEGACIÓN DESKTOP --- */}
        <div className="flex items-center gap-6 lg:gap-10">
          <nav className="hidden md:flex gap-6 lg:gap-8" role="navigation">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                aria-label={item.ariaLabel}
                className="text-white font-fsme text-sm lg:text-base font-bold hover:text-white/80 transition-colors uppercase tracking-widest relative group py-2"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>
          
          {/* --- BOTÓN CTA (STICKY) --- */}
          <div 
            className={`transition-all duration-500 ease-out transform ${
              showCta 
                ? "opacity-100 translate-y-0 pointer-events-auto" 
                : "opacity-0 translate-y-4 pointer-events-none hidden md:block"
            }`}
            aria-hidden={!showCta}
          >
            <button
              onClick={onOpenCalculator}
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
              aria-label="Abrir calculadora de precios"
            >
              Calcula tu precio
            </button>
          </div>

          {/* --- BOTÓN MENÚ MÓVIL --- */}
          <button
            className="md:hidden text-white p-2 -mr-2 flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú de navegación"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* --- MENÚ MÓVIL DESPLEGABLE (CORREGIDO) --- */}
      <div 
        className={`
          md:hidden fixed left-0 w-full bg-dkv-green border-t border-white/10 shadow-xl 
          overflow-hidden transition-all duration-300 ease-in-out
          
          /* 🔥 SOLUCIÓN AQUÍ: La posición 'top' cambia según el estado del scroll */
          ${isScrolled ? "top-[70px]" : "top-[110px]"}
          
          ${isMobileMenuOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <nav className="flex flex-col p-6 gap-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white font-lemon text-lg font-bold tracking-widest hover:text-white/80 transition-colors border-b border-white/5 pb-2"
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={() => {
              onOpenCalculator?.();
              setIsMobileMenuOpen(false);
            }}
            className="mt-4 w-full bg-white text-dkv-green font-lemon py-3 rounded-xl font-bold uppercase tracking-widest shadow-md active:scale-95 transition-transform"
          >
            Calcula tu precio
          </button>
        </nav>
      </div>
    </header>
  );
}