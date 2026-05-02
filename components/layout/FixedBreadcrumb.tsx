// components/layout/FixedBreadcrumb.tsx

"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface FixedBreadcrumbProps {
  items: BreadcrumbItem[]; 
  // ⚡️ NUEVO: Añadimos el parámetro de comportamiento (por defecto "fixed")
  behavior?: "fixed" | "smart"; 
}

export default function FixedBreadcrumb({ items, behavior = "fixed" }: FixedBreadcrumbProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // ⚡️ Estado para el modo 'smart'
  const lastScrollY = useRef(0); // ⚡️ Rastreador de scroll de alto rendimiento
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Lógica original (para el ajuste del top)
      setIsScrolled(currentScrollY > 50);

      // ⚡️ LÓGICA SMART: Detectar la dirección del scroll
      if (behavior === "smart") {
        if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
          // Bajando: escondemos el breadcrumb
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY.current) {
          // Subiendo: mostramos el breadcrumb
          setIsVisible(true);
        }
      }
      
      lastScrollY.current = currentScrollY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [behavior]);

  // Efecto Auto-scroll al final (Original)
  useEffect(() => {
    if (navRef.current && items && items.length > 0) {
      requestAnimationFrame(() => {
        if (navRef.current) {
          navRef.current.scrollLeft = navRef.current.scrollWidth;
        }
      });
    }
  }, [items]);

  if (!items) return null;

  return (
    <div
      role="navigation"
      aria-label="Breadcrumb"
      className={`
        fixed left-0 w-full 
        transition-all duration-300 ease-in-out
        bg-white/95 backdrop-blur-sm border-b border-gray-100
        px-safe-x md:px-6 py-2
        shadow-sm
        ${isScrolled ? "top-[70px]" : "top-[110px]"} 
        
        /* ⚡️ MAGIA UX: Z-index dinámico y ocultación suave */
        ${behavior === "fixed" ? "z-[1015]" : "z-[40]"} 
        ${behavior === "smart" && !isVisible ? "-translate-y-[150%] opacity-0 pointer-events-none" : "translate-y-0 opacity-100"}
      `}
    >
      <div className="container mx-auto">
        <nav 
          ref={navRef}
          aria-label="Breadcrumb"
          className="
            flex items-center justify-start gap-2 
            text-sm text-gray-500 font-fsme uppercase tracking-wider 
            whitespace-nowrap
            overflow-x-auto   
            scrollbar-hide     
            mask-linear-fade   
            pr-8                
          "
        >
          <Link 
            href="/" 
            className="hover:text-dkv-green flex items-center justify-center transition-colors shrink-0"
            title="Inicio"
          >
            <Home className="w-4 h-4" strokeWidth={2.5} /> 
            <span className="sr-only">Inicio</span> 
          </Link>

          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            // ⚡️ Detectamos si el enlace apunta a una sección específica (ancla)
            const isAnchorLink = item.href.includes('#');

            return (
              <div 
                //key={item.href} 
                // 👇 AÑADE EL ÍNDICE AQUÍ PARA QUE SEA 100% ÚNICO 👇
                key={`${item.href}-${index}`}
                className="flex items-center gap-2 shrink-0"
              >
                <ChevronRight className="w-3 h-3 text-gray-600" />
                
                <Link
                  href={item.href}
                  // Si es un enlace con #, dejamos que haga scroll. Si no, mantenemos tu lógica original
                  scroll={isAnchorLink ? true : false} 
                  aria-current={isLast ? "page" : undefined}
                  className={`
                    transition-colors
                    ${isLast 
                      ? "text-dkv-green-dark font-bold pointer-events-none cursor-default" 
                      : "hover:text-dkv-green"
                    }
                  `}
                  onClick={(e) => {
                    // Magia extra: Si estamos yendo a un ancla en la misma página principal, forzamos scroll suave
                    if (isAnchorLink && item.href.startsWith('/#') && window.location.pathname === '/') {
                      const targetId = item.href.split('#')[1];
                      const element = document.getElementById(targetId);
                      if (element) {
                        e.preventDefault(); // Evitamos el salto brusco estándar
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  }}
                >
                  {item.label}
                </Link>
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
}