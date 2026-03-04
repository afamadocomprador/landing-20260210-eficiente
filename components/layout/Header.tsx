// components/Header.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
// 🌟 1. Se añade el icono 'Home' a las importaciones
import { Menu, X, Stethoscope, MapPin, MessageCircle, Calculator, Home } from "lucide-react";

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

// 🌟 2. Se añade "Inicio" como primer elemento del menú
const NAV_ITEMS: NavItem[] = [
  { 
    label: "Inicio", 
    subLabel: "Página principal",
    href: "/", 
    ariaLabel: "Ir al inicio de la página",
    icon: Home
  },
  { 
    label: "Tratamientos", 
    subLabel: "Ver precios y coberturas",
    href: "/#tratamientos", 
    ariaLabel: "Ver precios de tratamientos cubiertos",
    icon: Stethoscope
  },
  { 
    label: "Dentistas", 
    subLabel: "Encuentra tu clínica cercana",
    href: "/#dentistas", 
    ariaLabel: "Buscar dentistas en toda España o cerca de mí",
    icon: MapPin
  },
  { 
    label: "Consultas", 
    subLabel: "Plantéanos tus dudas",
    href: "/#información", 
    ariaLabel: "Plantéanos cualquier duda o comentario que necesites",
    icon: MessageCircle
  },
];

export default function Header({ onOpenCalculator }: HeaderProps) {
  const pathname = usePathname();  
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCta, setShowCta] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
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
          isScrolled ? "h-[70px] bg-dkv-green/95 backdrop-blur-sm shadow-dkv-card" : "h-[110px] bg-dkv-green" 
        }`}
      >
        <div className="container mx-auto h-full px-4 md:px-6 flex items-center justify-between">
          <div className="relative flex items-center h-full shrink-0 z-50">
             <Link href="/" className="relative flex items-center transition-all duration-300" onClick={() => setIsMobileMenuOpen(false)}>
               <div className={`relative transition-all duration-300 overflow-hidden flex items-center ${isScrolled ? 'w-[140px]' : 'w-[180px] md:w-[220px]'}`}>
                  <Image 
                    src="/images/dkv-logo.png"
                    alt="DKV Seguros Médicos" 
                    width={220} height={90}
                    className="w-full h-auto object-contain object-left"
                    priority 
                  />
               </div>
             </Link>
          </div>

          <div className="flex items-center gap-6 lg:gap-10 z-50">
            <nav className="hidden md:flex gap-6 lg:gap-8">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-white/90 font-fsme text-sm lg:text-base font-bold hover:text-white transition-colors uppercase tracking-widest relative group py-2"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>
            
            <div className={`transition-all duration-500 transform hidden md:block ${showCta ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
              <Link href="/presupuesto" className="bg-white text-dkv-green hover:bg-gray-100 font-lemon tracking-widest text-xs md:text-sm h-10 px-6 rounded-btn shadow-lg transition-all uppercase font-bold flex items-center">
                Calcula tu precio
              </Link>
            </div>

            <button className="md:hidden text-white p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <div className={`transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : 'rotate-0'}`}>
                {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* 🌟 MENÚ MÓVIL CON ILUSTRACIÓN Y TEXTOS CORREGIDOS */}
      <div className={`md:hidden fixed inset-0 z-[1010] bg-dkv-green/98 backdrop-blur-xl transition-all duration-400 flex flex-col justify-center px-6 pb-20 pt-28 overflow-hidden ${isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}>
        
        <div className={`w-full max-w-sm mx-auto bg-white/95 rounded-[2rem] shadow-2xl overflow-hidden flex flex-row relative z-10 transition-all duration-500 ${isMobileMenuOpen ? 'scale-100' : 'scale-95'}`}>
          
          {/* ILUSTRACIÓN IZQUIERDA */}
          <div className="w-[28%] border-r border-dkv-green/5 relative bg-dkv-green/5 flex flex-col justify-end">
            <div className="absolute inset-0 opacity-60">
                <Image src="/images/utensilios-dental.png" alt="Decoración" fill className="object-cover object-bottom pt-8 pb-4" />
            </div>
          </div>

          {/* NAVEGACIÓN DERECHA */}
          <nav className="flex-1 flex flex-col p-2 pl-1">
            {NAV_ITEMS.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`group p-4 pr-3 flex items-center gap-4 rounded-2xl hover:bg-gray-50 transition-all ${index !== NAV_ITEMS.length - 1 ? 'border-b border-gray-100 rounded-b-none' : ''}`}
                >
                  <div className="w-10 h-10 rounded-full bg-dkv-green/5 text-dkv-green flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-dkv-green-dark font-lemon text-base font-bold tracking-wider uppercase mb-0.5 leading-tight">
                      {item.label}
                    </span>
                    <span className="block text-gray-600 text-sm font-fsme leading-tight">
                      {item.subLabel}
                    </span>
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className={`w-full max-w-sm mx-auto mt-6 transition-all duration-500 delay-150 ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Link href="/presupuesto" onClick={() => setIsMobileMenuOpen(false)} className="w-full bg-white text-dkv-green py-4 rounded-[1.5rem] font-lemon text-base font-bold uppercase tracking-widest shadow-xl flex items-center justify-center gap-3">
            <Calculator className="w-5 h-5" />
            Calcula tu precio
          </Link>
        </div>
      </div>
    </>
  );
}