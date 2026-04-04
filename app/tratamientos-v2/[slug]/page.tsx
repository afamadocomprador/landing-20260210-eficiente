// Ruta: app/tratamientos-v2/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';
import { getTreatmentDefinition, treatmentsRegistry } from '@/data/treatments';
import { TreatmentLayout } from '@/components/tratamientos-v2/TreatmentLayout';

interface Props {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

// 1. GENERACIÓN ESTÁTICA (SSG) - El secreto del rendimiento (Core Web Vitals)
export function generateStaticParams() {
  return Object.keys(treatmentsRegistry).map((slug) => ({
    slug: slug,
  }));
}

// 2. SEO DINÁMICO Y ESTRICTAMENTE TIPADO (VERSIÓN AVANZADA OPENGRAPH/WHATSAPP)
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const shareId = searchParams?.share as string;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dkvdentisalud.es';
  
  const parentTreatment = getTreatmentDefinition(params.slug);

  if (!parentTreatment) {
    return {
      title: 'Tratamiento no encontrado | DKV Dentisalud',
    };
  }

  // CASO A: Alguien ha pulsado "Compartir" en una tarjeta de tratamiento ESPECÍFICA (?share=id-de-la-tarjeta)
  if (shareId && parentTreatment.rows) {
    const foundTreatment = parentTreatment.rows.find(row => row.id === shareId);

    if (foundTreatment) {
      // TÍTULO EN NEGRITA que leerá WhatsApp debajo de la imagen
      const boldSnippetTitle = foundTreatment.price
        ? `${foundTreatment.name} por solo ${foundTreatment.price} - Precio cerrado DKV DENTISALUD ELITE`
        : `${foundTreatment.name} - Con DKV DENTISALUD ELITE`;

      // ⚡️ NUEVO: Pasamos el nombre por un lado (title) y el precio por otro (subtitle)
      const ogTitleToRender = foundTreatment.name.toUpperCase();
      // ⚡️ NUEVO: Comprobamos si el precio es un texto antes de pasarlo a la URL de la imagen
      const priceText = typeof foundTreatment.price === 'string' ? foundTreatment.price : '';
      const subtitleQuery = priceText ? `&subtitle=${encodeURIComponent(priceText)}` : '';

      return {
        metadataBase: new URL(baseUrl), // ⚡️ CRUCIAL PARA WHATSAPP
        title: boldSnippetTitle,
        description: `Consulta el precio y detalles de ${foundTreatment.name}. Precios cerrados para DKV DENTISALUD ELITE.`,
        openGraph: {
          title: boldSnippetTitle,
          description: `Consulta en qué consiste y donde puedes realizarte este tratamiento.`,
          url: `/tratamientos-v2/${params.slug}?share=${shareId}#${shareId}`,
          siteName: 'DKV Dentisalud Élite',
          images: [
            {
              // Añadimos el subtitleQuery a la URL de la imagen
              url: `/api/og?title=${encodeURIComponent(ogTitleToRender)}${subtitleQuery}&type=tratamiento&v=1`,
              width: 1200,
              height: 630,
              alt: foundTreatment.name,
            }
          ],
          locale: 'es_ES',
          type: 'website',
        }
      };
    }
  }

  // CASO B: SEO por defecto (La página completa)
  // const defaultTitle = parentTreatment.seo?.title || parentTreatment.hero?.title?.normal || 'Tratamiento DKV Dentisalud';
  // const defaultDesc = parentTreatment.seo?.description || `Descubre toda la información sobre ${defaultTitle} en DKV Dentisalud.`;

  // CASO B: SEO por defecto (La página completa)
  const defaultTitle = parentTreatment.seoTitle || parentTreatment.hero?.title?.normal || 'Tratamiento DKV Dentisalud';
  const defaultDesc = parentTreatment.seoDescription || `Descubre toda la información sobre ${defaultTitle} en DKV Dentisalud.`;

  return {
    metadataBase: new URL(baseUrl), // ⚡️ CRUCIAL PARA WHATSAPP
    title: defaultTitle.includes('|') ? defaultTitle : `${defaultTitle} | DKV Dentisalud`,
    description: defaultDesc,
    openGraph: {
      title: `${defaultTitle} | DKV`,
      description: defaultDesc,
      url: `/tratamientos-v2/${params.slug}`,
      siteName: 'DKV Dentisalud Élite',
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(defaultTitle.toUpperCase())}&subtitle=${encodeURIComponent("Guía de tratamientos")}&type=categoria&v=1`,
          width: 1200,
          height: 630,
          alt: defaultTitle,
        }
      ],
      locale: 'es_ES',
      type: 'website',
    }
  };
}

// 3. REACT SERVER COMPONENT (RSC)
export default function TreatmentPage({ params }: Props) {
  const treatment = getTreatmentDefinition(params.slug);

  if (!treatment) {
    notFound();
  }

  return <TreatmentLayout treatment={treatment} />;
}