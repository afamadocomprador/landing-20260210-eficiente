// components/tratamientos-v2/ScrollToTop.tsx

"use client";

import { useEffect } from "react";

export function ScrollToTop() {
  useEffect(() => {
    // Usamos un pequeñísimo retardo (100ms) para darle tiempo a Next.js 
    // a renderizar la nueva página antes de forzar el movimiento.
    const timeoutId = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  return null; // Este componente es invisible, solo ejecuta código
}