import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getTreatmentDefinition, treatmentsRegistry } from '@/data/treatments';
import { TreatmentLayout } from '@/components/tratamientos-v2/TreatmentLayout';

interface Props {
  params: { slug: string };
}

// 1. GENERACIÓN ESTÁTICA (SSG) - El secreto del rendimiento (Core Web Vitals)
// Next.js ejecutará esto en el build y creará un archivo HTML estático por cada tratamiento.
export function generateStaticParams() {
  return Object.keys(treatmentsRegistry).map((slug) => ({
    slug: slug,
  }));
}

// 2. SEO DINÁMICO Y ESTRICTAMENTE TIPADO
export function generateMetadata({ params }: Props): Metadata {
  const treatment = getTreatmentDefinition(params.slug);
  
  if (!treatment) {
    return { title: 'Tratamiento no encontrado | DKV Dentisalud' };
  }

  return {
    title: treatment.seoTitle,
    description: treatment.seoDescription,
    // Aquí podrías añadir openGraph, canonical URLs, etc.
  };
}

// 3. REACT SERVER COMPONENT (RSC)
// No usamos "use client" aquí. Todo se renderiza en el servidor a velocidad luz.
export default function TreatmentPage({ params }: Props) {
  const treatment = getTreatmentDefinition(params.slug);

  // Si alguien intenta acceder a /tratamientos-v2/inventado, lanzamos un 404
  if (!treatment) {
    notFound();
  }

  // Pasamos el contrato estricto de datos al componente visual
  return <TreatmentLayout treatment={treatment} />;
}