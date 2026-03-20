// Ruta: types/treatments.ts (o el nombre que tenga tu archivo de tipos)
import { ReactNode } from 'react';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface HeroData {
  badgeText: string;
  title: {
    dark: string;
    normal: string;
  };
  description: string[];
}

export interface IntroData {
  badgeText: string;
  title: string;
  description: ReactNode | string;
}

export interface TreatmentListItem {
  icon: 'Sparkles' | 'Smile' | 'ShieldCheck' | string;
  text: ReactNode | string;
}

// NUEVA INTERFAZ: Para los puntos iconográficos del diseño Nano Banana
export interface StructuredPoint {
  icon: string;
  text: ReactNode | string;
}

export interface TreatmentRowData {
  id: string;
  name: string;
  price?: string;
  image?: string;
  imageAlt?: string;
  secondaryImage?: string;
  secondaryImageAlt?: string;
  content?: ReactNode | string; // <-- MODIFICADO: Ahora es opcional (?)
  points?: StructuredPoint[];   // <-- NUEVA LÍNEA: Añadimos la opción de usar los puntos
  list?: TreatmentListItem[];
  footerNote?: ReactNode | string;
}

export interface VeredictoData {
  title: string;
  quote: ReactNode | string;
}

export interface CTAData {
  title: string;
  infoNote: ReactNode | string;
  description: ReactNode | string;
}

export interface TreatmentDefinition {
  slug: string;
  activeSubNavId: string;
  
  // SEO
  seoTitle: string;
  seoDescription: string;
  
  // UI Data
  breadcrumbs: BreadcrumbItem[];
  hero: HeroData;
  intro?: IntroData;
  rows: TreatmentRowData[];
  premiumBlock?: ReactNode; // <-- NUEVA LÍNEA: Permite inyectar bloques UI exclusivos
  veredicto?: VeredictoData;
  cta: CTAData;
}