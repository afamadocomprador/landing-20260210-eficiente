"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right"; // ⚡️ NUEVO: Capacidad de elegir la dirección
}

export default function ScrollReveal({ children, delay = 0, direction = "up" }: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) observer.unobserve(ref.current); 
        }
      },
      {
        threshold: 0.1, 
        rootMargin: "0px 0px -50px 0px" 
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  // ⚡️ LÓGICA DE DIRECCIÓN TAILWIND
  const getTransformClass = () => {
    if (isVisible) return "translate-y-0 translate-x-0"; // Posición final
    if (direction === "up") return "translate-y-16";     // Viene desde abajo
    if (direction === "left") return "-translate-x-16";  // Viene desde la izquierda
    if (direction === "right") return "translate-x-16";  // Viene desde la derecha
    return "";
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out w-full
        ${isVisible ? "opacity-100" : "opacity-0"} ${getTransformClass()}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}