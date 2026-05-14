// components/tratamientos-v2/TrackedTreatmentCTA.tsx

"use client";

import React from 'react';
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { usePostHog } from 'posthog-js/react';
import { usePathname } from 'next/navigation';

export default function TrackedTreatmentCTA() {
  const posthog = usePostHog();
  const pathname = usePathname();

  const handleContactClick = () => {
    if (posthog) {
      posthog.capture('consulta_clicada', {
        origen: pathname,
        nombre_seccion: 'Tratamientos Footer', // 🌟 LA MAGIA DE LA ATRIBUCIÓN
        texto_boton: 'Contactar con tu agente'
      });
    }
  };

  return (
    <Link 
      href="/contacto" 
      onClick={handleContactClick}
      className="inline-flex items-center justify-center gap-3 bg-transparent border-2 border-dkv-green-dark text-dkv-green-dark font-extrabold font-fsme text-lg px-8 py-4 rounded-xl hover:bg-dkv-green-dark hover:text-white hover:shadow-xl hover:scale-105 transition-all duration-300 w-full sm:w-auto"
    >
      <MessageCircle className="w-6 h-6" />
      <span>Contactar con tu agente</span>
    </Link>
  );
}