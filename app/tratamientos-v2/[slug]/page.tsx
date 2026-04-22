// Ruta: app/tratamientos-v2/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';
import { getTreatmentDefinition, treatmentsRegistry } from '@/data/treatments';
import { TreatmentLayout } from '@/components/tratamientos-v2/TreatmentLayout';
import { DetailedPriceItem, TrozoTexto } from '@/types/treatments';

interface Props {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

// 1. GENERACIÓN ESTÁTICA (SSG)
export function generateStaticParams() {
  return Object.keys(treatmentsRegistry).map((slug) => ({
    slug: slug,
  }));
}

// 2. SEO DINÁMICO Y METADATOS (OpenGraph)
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const shareId = searchParams?.share as string;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dkvdentisalud.es';
  
  const parentTreatment = getTreatmentDefinition(params.slug);

  if (!parentTreatment) {
    return { title: 'Tratamiento no encontrado | DKV Dentisalud' };
  }

  // CASO A: Alguien ha pulsado "Compartir" en una tarjeta de tratamiento ESPECÍFICA
  if (shareId && parentTreatment.rows) {
    const foundTreatment = parentTreatment.rows.find(row => row.id === shareId);

    if (foundTreatment) {
      const boldSnippetTitle = foundTreatment.price
        ? `${foundTreatment.name} por solo ${foundTreatment.price} - Precio cerrado DKV DENTISALUD ELITE`
        : `${foundTreatment.name} - Con DKV DENTISALUD ELITE`;

      const ogTitleToRender = foundTreatment.name.toUpperCase();
      const priceText = typeof foundTreatment.price === 'string' ? foundTreatment.price : '';
      const subtitleQuery = priceText ? `&subtitle=${encodeURIComponent(priceText)}` : '';

      return {
        metadataBase: new URL(baseUrl), 
        title: boldSnippetTitle,
        description: `Consulta el precio y detalles de ${foundTreatment.name}. Precios cerrados para DKV DENTISALUD ELITE.`,
        openGraph: {
          title: boldSnippetTitle,
          description: `Consulta en qué consiste y donde puedes realizarte este tratamiento.`,
          url: `/tratamientos-v2/${params.slug}?share=${shareId}#${shareId}`,
          siteName: 'DKV Dentisalud Élite',
          images: [{
              url: `/api/og?title=${encodeURIComponent(ogTitleToRender)}${subtitleQuery}&type=tratamiento&v=1`,
              width: 1200, height: 630, alt: foundTreatment.name,
          }],
          locale: 'es_ES', type: 'website',
        }
      };
    }
  }

  // CASO B: SEO por defecto (La página completa)
  const defaultTitle = parentTreatment.seoTitle || parentTreatment.hero?.title?.normal || 'Tratamiento DKV Dentisalud';
  const defaultDesc = parentTreatment.seoDescription || `Descubre toda la información sobre ${defaultTitle} en DKV Dentisalud.`;

  return {
    metadataBase: new URL(baseUrl), 
    title: defaultTitle.includes('|') ? defaultTitle : `${defaultTitle} | DKV Dentisalud`,
    description: defaultDesc,
    openGraph: {
      title: `${defaultTitle} | DKV`,
      description: defaultDesc,
      url: `/tratamientos-v2/${params.slug}`,
      siteName: 'DKV Dentisalud Élite',
      images: [{
          url: `/api/og?title=${encodeURIComponent(defaultTitle.toUpperCase())}&subtitle=${encodeURIComponent("Guía de tratamientos")}&type=categoria&v=1`,
          width: 1200, height: 630, alt: defaultTitle,
      }],
      locale: 'es_ES', type: 'website',
    }
  };
}

// --- HELPER PARA EXTRAER DATOS LIMPIOS PARA SCHEMA.ORG ---
const extractCleanText = (trozos: TrozoTexto[]): string => {
  return trozos
    .map(t => typeof t.texto === 'string' ? t.texto : '')
    .join('')
    .replace(/\. Precio:.*$/, '') // Limpiamos la muletilla del precio oculto
    .trim();
};

const extractNumericPrice = (priceNode: any): string | null => {
  if (typeof priceNode !== 'string') {
    // Si es un nodo React (ej. <span>+ 50 €</span>), intentamos extraer los números si pasaron como string dentro de un objeto, 
    // pero por seguridad en Server Components, devolvemos null para evitar crasheos si es muy complejo.
    try {
      const stringified = JSON.stringify(priceNode);
      const match = stringified.match(/\d+([.,]\d+)?/);
      if (match) return match[0].replace(',', '.');
    } catch(e) {}
    return null;
  }
  
  if (priceNode.toLowerCase().includes('incluido') || priceNode.toLowerCase().includes('gratis')) {
    return "0.00";
  }
  const match = priceNode.match(/\d+([.,]\d+)?/);
  return match ? match[0].replace(',', '.') : null;
};

// 3. REACT SERVER COMPONENT (RSC)
export default function TreatmentPage({ params }: Props) {
  const treatment = getTreatmentDefinition(params.slug);

  if (!treatment) {
    notFound();
  }

  // --- GENERACIÓN DEL GRAFO DE CONOCIMIENTO (JSON-LD) ---
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dkvdentisalud.es';
  const pageUrl = `${baseUrl}/tratamientos-v2/${params.slug}`;

  const schemaOffers: any[] = [];
  let minPrice = Infinity;
  let maxPrice = 0;

  // Recorremos la estructura de tu data para extraer todas las variantes de precios
  treatment.rows.forEach(row => {
    const processItems = (items: DetailedPriceItem[]) => {
      items.forEach(item => {
        const name = extractCleanText(item.title);
        const numericPrice = extractNumericPrice(item.price);
        
        if (name && numericPrice !== null) {
          const priceVal = parseFloat(numericPrice);
          if (priceVal < minPrice) minPrice = priceVal;
          if (priceVal > maxPrice) maxPrice = priceVal;

          schemaOffers.push({
            "@type": "Offer",
            "name": name,
            "description": typeof item.description === 'string' ? item.description : undefined,
            "price": numericPrice,
            "priceCurrency": "EUR",
            "url": `${pageUrl}#${row.id}`,
            "offeredBy": {
              "@type": "InsuranceAgency",
              "name": "Red Dental Élite DKV"
            }
          });
        }
      });
    };

    if (row.detailedPrices) processItems(row.detailedPrices);
    if (row.priceGroups) row.priceGroups.forEach(group => processItems(group.items));
  });

  const schemaGraph: any = [
    {
      "@type": "MedicalWebPage",
      "@id": pageUrl,
      "name": treatment.seoTitle,
      "description": treatment.seoDescription,
      "about": { "@id": `${pageUrl}#procedure` }
    },
    {
      "@type": ["MedicalProcedure", "MedicalTherapy"],
      "@id": `${pageUrl}#procedure`,
      "name": `${treatment.hero.title.dark} ${treatment.hero.title.normal}`.trim(),
      "description": treatment.hero.description.join(' '),
      "bodyLocation": {
        "@type": "AnatomicalStructure",
        "name": "Boca y piezas dentales"
      }
    }
  ];

  // Si hemos logrado extraer precios válidos, los adjuntamos como un AggregateOffer al procedimiento
  if (schemaOffers.length > 0) {
    schemaGraph[1].offers = {
      "@type": "AggregateOffer",
      "priceCurrency": "EUR",
      "lowPrice": minPrice === Infinity ? "0.00" : minPrice.toFixed(2),
      "highPrice": maxPrice.toFixed(2),
      "offerCount": schemaOffers.length,
      "offers": schemaOffers
    };
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": schemaGraph
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TreatmentLayout treatment={treatment} />
    </>
  );
}