// components/posthog/TrackedPhoneLink.tsx

"use client";

import React from 'react';
import { usePostHog } from 'posthog-js/react';
import { usePathname } from 'next/navigation';

interface Props {
  phone: string;
  seccion: string;
  className?: string;
  children?: React.ReactNode;
}

export default function TrackedPhoneLink({ phone, seccion, className, children }: Props) {
  const posthog = usePostHog();
  const pathname = usePathname();

  const handleClick = () => {
    if (posthog) {
      posthog.capture('llamada_backoffice_iniciada', {
        origen: pathname === '/' ? 'landing_principal' : pathname,
        nombre_seccion: seccion, // 🚀 AHORA SÍ: Normalizado según la Biblia
        telefono_marcado: phone
      });
    }
  };

  // Limpiamos el teléfono (quitamos espacios) para que el href="tel:..." sea válido
  const cleanPhone = phone.replace(/\s+/g, '');

  return (
    <a href={`tel:${cleanPhone}`} onClick={handleClick} className={className}>
      {children || phone}
    </a>
  );
}