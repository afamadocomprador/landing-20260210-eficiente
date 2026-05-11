// app/providers.tsx

"use client"

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect } from 'react'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
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
        capture_pageview: false, 
        capture_pageleave: true, 
        
        // Magia RGPD: Si ya aceptó, arranca normal. Si es nuevo, arranca bloqueado.
        opt_out_capturing_by_default: !hasConsent, 
        persistence: hasConsent ? 'localStorage+cookie' : 'memory', 
        
        loaded: (ph) => {
          if (process.env.NODE_ENV === 'development') {
            ph.debug() 
          }
        }
      })
    }
  }, [])

  return <PHProvider client={posthog}>{children}</PHProvider>
}