"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface StickySubNavProps {
  //activeId: 'metalica' | 'zafiro' | 'invisalign' | 'lingual';
    activeId: "invisalign" | "lingual" | "metalica" | "zafiro" | "individual" | "arcada" | "sobredentadura";
}

export default function StickySubNav({ activeId }: StickySubNavProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Aparece al pasar la primera visualización
      setIsVisible(window.scrollY > 350); 
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); 
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ⚡️ Array limpio, sin iconos. Directo al grano.
  const navItems = [
    { id: 'metalica', label: 'Metálica', href: '/tratamientos/ortodoncia/metalica', active: activeId === 'metalica' },
    { id: 'zafiro', label: 'Zafiro', href: '/tratamientos/ortodoncia/zafiro', active: activeId === 'zafiro' },
    { id: 'invisalign', label: 'Invisalign', href: '/tratamientos/ortodoncia/invisalign', active: activeId === 'invisalign' },
    { id: 'lingual', label: 'Lingual', href: '/tratamientos/ortodoncia/lingual', active: activeId === 'lingual' },
  ];

  return (
    <div 
      className={`
        fixed bottom-6 left-0 right-0 z-[60] w-full px-4
        transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) pointer-events-none
        flex justify-center
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-[150%] opacity-0'}
      `}
    >
      <div className="bg-white/90 backdrop-blur-xl border border-dkv-gray-border shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] rounded-full p-1.5 flex items-center justify-center gap-1 overflow-x-auto hide-scrollbar max-w-full pointer-events-auto">
        
        {navItems.map((item) => (
          <Link 
            key={item.id} 
            href={item.href}
            // ⚡️ Ajuste de padding (px-5) para compensar la falta de icono y mantener el área táctil perfecta
            className={`snap-start shrink-0 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 text-center ${
              item.active 
                ? 'bg-dkv-green text-white shadow-md' 
                : 'text-dkv-gray hover:bg-dkv-gray-light/50 hover:text-dkv-green-dark'
            }`}
          >
            {item.label}
          </Link>
        ))}

      </div>
    </div>
  );
}
