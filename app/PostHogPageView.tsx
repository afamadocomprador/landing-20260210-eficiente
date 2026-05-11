// app/PostHogPageView.tsx


"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { usePostHog } from "posthog-js/react";


function PostHogPageViewImpl() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog();

  useEffect(() => {
    // Solo enviamos el pageview si PostHog está inicializado y tenemos ruta
    if (pathname && posthog) {
      let url = window.origin + pathname;
      if (searchParams.toString()) {
        url = url + `?${searchParams.toString()}`;
      }
      
      // Enviamos el evento a PostHog (si el RGPD en el banner lo permite, lo guardará)
      posthog.capture("$pageview", {
        $current_url: url,
      });
    }
  }, [pathname, searchParams, posthog]);

  return null;
}

export default function PostHogPageView() {
  // El Suspense es obligatorio en Next.js al usar useSearchParams 
  // para evitar que la página entera pierda el Server-Side Rendering (SSR)
  return (
    <Suspense fallback={null}>
      <PostHogPageViewImpl />
    </Suspense>
  );
}