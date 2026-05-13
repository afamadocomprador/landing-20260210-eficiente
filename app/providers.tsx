// app/providers.tsx

"use client"

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'

// 🚀 LO SACAMOS FUERA DEL COMPONENTE Y DEL useEffect
// En Next.js (App Router), esto asegura que se ejecute una única vez 
// al evaluar el JS en el cliente, evitando las ejecuciones dobles del Strict Mode de React.
if (typeof window !== 'undefined' && !posthog.__loaded) {
  // 1. Comprobamos si el usuario YA había aceptado las cookies antes
  let hasConsent = false;
  try {
    const prefs = JSON.parse(localStorage.getItem('dkv_cookie_prefs') || '{}');
    hasConsent = prefs.marketing === true;
  } catch (e) {
    console.error("Error leyendo cookies", e);
  }

  // 2. Inicializamos PostHog de forma dinámica
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    capture_pageview: false, // 🚀 Perfecto: Apagado para usar tu componente personalizado
    capture_pageleave: true, 
    
    // Magia RGPD: Si ya aceptó, arranca normal. Si es nuevo, arranca bloqueado.
    opt_out_capturing_by_default: !hasConsent, 
    persistence: hasConsent ? 'localStorage+cookie' : 'memory', 
    
    loaded: (ph) => {
      if (process.env.NODE_ENV === 'development') {
        ph.debug(); 
      }
    }
  });
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  // El componente ahora simplemente envuelve a los children, sin lógica pesada
  return <PHProvider client={posthog}>{children}</PHProvider>
}