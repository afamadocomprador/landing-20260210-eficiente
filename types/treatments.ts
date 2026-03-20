// Ruta: types/treatments.ts
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

// Para los puntos iconográficos del diseño Nano Banana
export interface StructuredPoint {
  icon: string;
  text: ReactNode | string;
}

// NUEVA INTERFAZ: Para la caja de desglose de precios inferior
export interface DetailedPriceItem {
  icon: string;
  title: string;
  description?: ReactNode | string;
  price: string;
}

export interface TreatmentRowData {
  id: string;
  name: string;
  price?: string;
  image?: string;
  imageAlt?: string;
  secondaryImage?: string;
  secondaryImageAlt?: string;
  content?: ReactNode | string; 
  points?: StructuredPoint[];   
  detailedPrices?: DetailedPriceItem[]; // <-- NUEVA LÍNEA: Array para la sub-caja de precios
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
  premiumBlock?: ReactNode; 
  veredicto?: VeredictoData;
  cta: CTAData;
  // Bloque para SEO y Metadatos
  seo?: {
    title: string;
    description: string;
  };
}