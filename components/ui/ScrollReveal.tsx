"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number; // Por si queremos retrasar un poco alguna animación
}

export default function ScrollReveal({ children, delay = 0 }: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // El "Radar" del navegador que vigila cuándo el elemento entra en pantalla
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Si el elemento asoma por la pantalla...
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Dejamos de vigilarlo para que la animación solo ocurra una vez (al bajar)
          if (ref.current) observer.unobserve(ref.current); 
        }
      },
      {
        threshold: 0.1, // Se dispara cuando al menos el 10% del bloque es visible
        rootMargin: "0px 0px -50px 0px" // Dispara un pelín antes de llegar al borde inferior
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      // 🌟 MAGIA TAILWIND: 
      // Si no es visible: Transparente y desplazado 40px hacia abajo (translate-y-10)
      // Si es visible: Opacidad 100% y en su posición original (translate-y-0)
      className={`transition-all duration-1000 ease-out w-full
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}