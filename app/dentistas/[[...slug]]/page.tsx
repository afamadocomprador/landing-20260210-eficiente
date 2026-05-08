// app/dentistas/[[...slug]]/page.tsx

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { Metadata, Viewport, ResolvingMetadata } from "next";
import { SITE_CONFIG } from '@/constants/config'; 

// Motor de datos
import { getLevelData } from "@/lib/level-engine";

// Loader inteligente
import MapLazyLoader from '@/components/dentists/MapLazyLoader';

// Componentes UI
import DentistHero from "@/components/hero/DentistHero";
import FixedBreadcrumb from "@/components/layout/FixedBreadcrumb";
import ScrollToMapButton from "@/components/dentists/ScrollToMapButton";
import RelatedLinks from "@/components/dentists/links/RelatedLinks"; 
import FooterLegal from "@/components/FooterLegal"; 

export const dynamic = "force-dynamic";

const baseUrl = SITE_CONFIG.domain;

interface PageProps {
  params: { slug?: string[] };
  searchParams?: { [key: string]: string | string[] | undefined }; 
}

// Helper de datos
async function getPageData(slugArray: string[] | undefined, sharedClinicId: string | null = null) {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get: (name: string) => cookieStore.get(name)?.value } }
  );

  const currentSlug = slugArray && slugArray.length > 0 ? slugArray[0] : "";
  const level = currentSlug === "" ? "01" : "02"; 

  return await getLevelData(supabase, "sin informar", level, currentSlug, sharedClinicId);
}

// --- 2. METADATA DINÁMICA (CON TRATAMIENTO OG ESPECÍFICO) ---
export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  
  // 🌟 PASO 1: EXTRAER EL SHARE-ID ANTES DE CUALQUIER OTRA COSA
  let cleanSlug = params?.slug ? [...params.slug] : [];
  let sharedClinicId: string | null = null;

  if (cleanSlug.length > 0 && cleanSlug[cleanSlug.length - 1].startsWith('share-')) {
    sharedClinicId = cleanSlug[cleanSlug.length - 1].replace('share-', '');
    cleanSlug = cleanSlug.slice(0, -1);
  }

  const currentPath = cleanSlug.join('/');
  const canonicalUrl = `${baseUrl}/dentistas/${currentPath}`.replace(/\/$/, "");

  // 🌟 PASO 2: SI ES SHARE, GENERAMOS EL OG ESPECÍFICO DE LA CLÍNICA
  if (sharedClinicId) {
    try {
      const cookieStore = cookies();
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        { cookies: { get: (name: string) => cookieStore.get(name)?.value } }
      );

      const { data: clinicData } = await supabase
        .from('view_clinics') 
        .select('name, city, address, zip_code')
        .eq('clinic_id', sharedClinicId) 
        .single();

      if (clinicData) {
        const formattedZip = clinicData.zip_code 
          ? String(clinicData.zip_code).padStart(5, '0').replace(/(\d{2})(\d{3})/, '$1.$2') 
          : '';

        const clinicTitle = `🦷 ${clinicData.name} | Dentista DKV`;
        const clinicDesc = `📍 ${clinicData.address || ''}, ${formattedZip} ${clinicData.city || ''}. Pide cita en este centro DKV Dentisalud Élite.`;
        const ogTitleToRender = `TU CENTRO DENTAL ${clinicData.name}`;

        return {
          metadataBase: new URL(baseUrl),
          title: clinicTitle,
          description: clinicDesc,
          alternates: { canonical: canonicalUrl },
          openGraph: {
            title: clinicTitle,
            description: clinicDesc,
            url: `${canonicalUrl}/share-${sharedClinicId}`,
            siteName: 'DKV Dentisalud Élite',
            locale: 'es_ES',
            type: 'website',
            images: [{
              url: `/api/og?title=${encodeURIComponent(ogTitleToRender)}&v=2`,
              width: 1200, height: 630,
              alt: clinicData.name,
            }],
          },
          twitter: {
            card: 'summary_large_image',
            title: clinicTitle,
            description: clinicDesc,
            images: [`/api/og?title=${encodeURIComponent(ogTitleToRender)}&v=2`],
          }
        };
      }
    } catch (err) {
      console.error("Error OG compartida:", err);
    }
  }

  // 🌟 PASO 3: SI NO ES SHARE, SEGUIMOS CON LA LÓGICA NORMAL
  try {
    const navigationData = await getPageData(cleanSlug);
    const { seo } = navigationData;
    
    // Metadatos para "Cerca de ti"
    if (currentPath.includes('cerca-de-ti') || currentPath.includes('cerca-de-mi')) {
      return {
        metadataBase: new URL(baseUrl),
        title: '📍 Dentistas DKV Cerca de Ti',
        description: 'Encuentra las clínicas del cuadro médico oficial DKV más cercanas.',
        openGraph: {
          title: '📍 Dentistas DKV Cerca de Ti',
          url: `${baseUrl}/dentistas/${currentPath}`,
          images: [{ url: `/api/og?title=Dentistas%20cerca%20de%20ti&v=3`, width: 1200, height: 630 }],
        }
      };
    }

    const title = seo.title || `Dentistas en ${seo.h1.normal} | DKV Dentisalud Elite`;
    const description = seo.description || `Cuadro médico DKV en ${seo.h1.normal}.`;

    return {
      metadataBase: new URL(baseUrl),
      title: title,
      description: description,
      openGraph: {
        title: title,
        description: description,
        images: [{ url: `/api/og?title=${encodeURIComponent(seo.h1.normal)}&subtitle=Cuadro Médico`, width: 1200, height: 630 }],
      }
    };
  } catch (e) {
    return { title: 'DKV Dentisalud Élite' };
  }
}

// Viewport
export const generateViewport = (): Viewport => ({
  themeColor: '#849700', width: 'device-width', initialScale: 1,
});

export default async function DentistasPage({ params }: PageProps) {
  let cleanSlug = params?.slug ? [...params.slug] : [];
  let sharedClinicId = null;

  if (cleanSlug.length > 0 && cleanSlug[cleanSlug.length - 1].startsWith('share-')) {
    sharedClinicId = cleanSlug[cleanSlug.length - 1].replace('share-', '');
    cleanSlug = cleanSlug.slice(0, -1);
  }

  try {
    const navigationData = await getPageData(cleanSlug, sharedClinicId);
    const locationName = navigationData.seo.h1.normal || "España";
    
    // Lógica de textos y formateo (Se mantiene igual a la tuya)
    const totalDentistas = navigationData.seo.totalDentistasHero || 0;
    const totalCentros = navigationData.seo.totalCentrosHero || 0;
    const formatter = new Intl.NumberFormat('de-DE');
    const formattedProfessionals = formatter.format(totalDentistas);
    const formattedClinics = formatter.format(totalCentros);
    const isSpain = locationName.toLowerCase() === 'españa';

    const rawDescription = navigationData.seo.description || "";
    const rawDescriptionBottom = navigationData.seo.descriptionBottom || ""; 
    const pageLevel = navigationData.seo.nivel || navigationData.nivelFinal || ""; 
    const isLongDescription = rawDescription.length >= 100 || rawDescriptionBottom.length > 0;

    let htmlContentZone1 = null;
    let htmlContentZone2 = null;

    if (isLongDescription) {
      const processedHtmlTop = rawDescription
        .replace(/{totalCentros}/g, formattedClinics)
        .replace(/{totalDentistas}/g, formattedProfessionals)
        .replace(/{locationName}/g, locationName);

      if (pageLevel === '07' || rawDescriptionBottom) {
        htmlContentZone1 = processedHtmlTop;
        htmlContentZone2 = rawDescriptionBottom
          .replace(/{totalCentros}/g, formattedClinics)
          .replace(/{totalDentistas}/g, formattedProfessionals)
          .replace(/{locationName}/g, locationName);
      } else {
        const parts = processedHtmlTop.split('---SPLIT---');
        htmlContentZone1 = parts[0] || null;
        htmlContentZone2 = parts.length > 1 ? parts[1] : null;
      }
    }

    const visualBreadcrumbs = (navigationData.seo.breadcrumbs || []).map((item: any) => {
      if ((item.href === '/dentistas' || item.href === '/dentistas/') && item.label !== "España") {
        return { ...item, href: '/#dentistas' };
      }
      return item;
    });
 
    return (
      <div className="flex flex-col min-h-screen bg-white font-fsme">
        <FixedBreadcrumb items={visualBreadcrumbs} />
        <DentistHero h1={navigationData.seo.h1} description={isLongDescription ? undefined : rawDescription} />
        
        {isLongDescription ? (
          htmlContentZone1 && (
            <section className="container mx-auto px-6 pt-4 pb-6">
              <div dangerouslySetInnerHTML={{ __html: htmlContentZone1 }} />
            </section>
          )
        ) : (
          <section className="container mx-auto px-6 pt-2 pb-6">
            <p className="text-lg text-gray-700 leading-relaxed">
               Accede al Cuadro Médico Dental DKV. <strong className="text-dkv-green">{formattedProfessionals}</strong> dentistas en <strong className="text-dkv-green">{formattedClinics}</strong> centros en {isSpain ? "toda España" : locationName}.
            </p>
          </section>
        )}

        <section id="mapa-buscador" className="relative flex-1 flex flex-col pt-4">
          <MapLazyLoader initialData={navigationData} />
        </section>

        {isLongDescription && htmlContentZone2 && (
            <section className="container mx-auto px-6 pt-8 pb-6">
              <div dangerouslySetInnerHTML={{ __html: htmlContentZone2 }} />
            </section>
        )}

        <RelatedLinks data={navigationData.relatedLinks} locationName={locationName} />
        <FooterLegal />
      </div>
    );

  } catch (e: any) {
    console.error("❌ PAGE ERROR:", e);
    return notFound();
  }
}
