import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { Metadata, Viewport, ResolvingMetadata } from "next";
import { SITE_CONFIG } from '@/constants/config'; 

// Motor de datos
import { getLevelData } from "@/lib/level-engine";

// Componentes UI
import DentistsContainer from "@/components/dentists/DentistsContainer";
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

 // --- 1. HELPER: Obtención de datos centralizada ---
 // Extraemos esto para usarlo tanto en el SEO (Metadata) como en la UI (Page)
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

// --- 2. METADATA DINÁMICA (SEO) ---

// --- 2. METADATA DINÁMICA (SEO) ---
 export async function generateMetadata(
   { params }: PageProps,
   parent: ResolvingMetadata
 ): Promise<Metadata> {
   try {
     const navigationData = await getPageData(params.slug);
     const { seo } = navigationData;
     const currentPath = params.slug ? params.slug.join('/') : '';
     const canonicalUrl = `/dentistas/${currentPath}`.replace(/\/$/, "");
     
     // 1. SEO PARA GOOGLE (Mantenemos el clásico para no perder posicionamiento)
     const title = seo.title || `Dentistas en ${seo.h1.normal} | DKV Dentisalud Elite`;
     const description = seo.description || `Cuadro médico DKV en ${seo.h1.normal}.`;

     // 2. 🌟 SEO PARA WHATSAPP / REDES SOCIALES (Textos dinámicos con singular/plural)
     const formatter = new Intl.NumberFormat('es-ES');
     const numDentistas = seo.totalDentistasHero || 0;
     const numCentros = seo.totalCentrosHero || 0;
     
     // Evaluamos singular y plural
     const palabraDentistas = numDentistas === 1 ? "dentista" : "dentistas";
     const palabraCentros = numCentros === 1 ? "centro" : "centros";
     
     const ogTitle = `${formatter.format(numDentistas)} ${palabraDentistas} en ${formatter.format(numCentros)} ${palabraCentros} a tu disposición`;
     const ogDesc = "Lo fácil es elegir el dentista que te va a atender como DKV DENTISALUD ELITE";

     return {
       metadataBase: new URL(baseUrl),
       title: title,
       description: description,
       alternates: {
         canonical: canonicalUrl,
       },
       openGraph: {
         title: ogTitle,        // 🌟 Aquí inyectamos la negrita dinámica para WhatsApp
         description: ogDesc,   // 🌟 Aquí inyectamos el texto gris para WhatsApp
         url: canonicalUrl,
         siteName: 'DKV Dentisalud Élite',
         locale: 'es_ES',
         type: 'website',
         images: [
           {
             url: `/api/og?title=${encodeURIComponent(seo.h1.normal)}&subtitle=Cuadro Médico`,
             width: 1200,
             height: 630,
             alt: `Dentistas DKV en ${seo.h1.normal}`,
           },
         ],
       },
       robots: {
         index: true,
         follow: true,
       }
     };

   } catch (e: any) {
     const currentPath = params?.slug ? params.slug.join('/') : '';
     const lastSegment = params?.slug ? params.slug[params.slug.length - 1] : '';
     
     // =======================================================================
     // 🌟 CAMINO ESTRELLA: Si comparten una clínica con "share-" (EN CUALQUIER RUTA)
     // =======================================================================
     if (lastSegment && lastSegment.startsWith('share-')) {
       
       const clinicId = lastSegment.replace('share-', ''); 

       try {
         const { createServerClient } = require('@supabase/ssr');
         const { cookies } = require('next/headers');
         const cookieStore = cookies();
         const supabase = createServerClient(
           process.env.NEXT_PUBLIC_SUPABASE_URL!,
           process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
           { cookies: { get: (name: string) => cookieStore.get(name)?.value } }
         );

         const { data: clinicData } = await supabase
           .from('view_clinics') 
           .select('name, staff_count, city, address, zip_code')
           .eq('clinic_id', clinicId) 
           .single();

         if (clinicData) {
           const formattedZip = clinicData.zip_code 
             ? String(clinicData.zip_code).padStart(5, '0').replace(/(\d{2})(\d{3})/, '$1.$2') 
             : '';

           const clinicTitle = `📍 ${clinicData.address || ''}, ${formattedZip ? formattedZip + ' - ' : ''}${clinicData.city || ''}`;
           const clinicDesc = `Consulta ubicación, dentistas y precios de tratamientos en este centro dental DKV DENTISALUD ÉLITE. Pide cita directa.`;
           const ogTitleToRender = `TU CENTRO DENTAL ${clinicData.name}`;

           return {
             metadataBase: new URL(baseUrl),
             title: clinicTitle,
             description: clinicDesc,
             openGraph: {
               title: clinicTitle,
               description: clinicDesc,
               url: `/dentistas/${currentPath}`,
               siteName: 'DKV Dentisalud Élite',
               images: [
                 {
                   url: `/api/og?title=${encodeURIComponent(ogTitleToRender)}&v=1`,
                   width: 1200,
                   height: 630,
                   alt: clinicData.name,
                 }
               ],
               locale: 'es_ES',
               type: 'website',
             }
           };
         }
       } catch (dbError) {
         console.error("No se pudo cargar info", dbError);
       }
     }

     // =======================================================================
     // 📍 CAMINO A: "Cerca de ti" genérico (Sin clínica específica)
     // =======================================================================
     if (currentPath.includes('cerca-de-ti') || currentPath.includes('cerca-de-mi')) {
       return {
         metadataBase: new URL(baseUrl),
         title: '📍 Dentistas DKV Cerca de Ti | ⭐ Valoración Excelente',
         description: 'Encuentra las clínicas del cuadro médico oficial DKV más cercanas a tu ubicación. Ahorro garantizado.',
         openGraph: {
           title: '📍 Dentistas DKV Cerca de Ti | ⭐ Valoración Excelente',
           description: 'Cuadro médico oficial DKV. Implantes y tratamientos con hasta un 40% de ahorro garantizado. Pide tu cita.',
           url: `/dentistas/${currentPath}`,
           siteName: 'DKV Dentisalud Élite',
           images: [
             {
               url: `/api/og?title=Dentistas%20cerca%20de%20ti&v=3`,
               width: 1200,
               height: 630,
               alt: 'Dentistas cerca de ti',
             }
           ],
           locale: 'es_ES',
           type: 'website',
         }
       };
     }

     // =======================================================================
     // 🏠 CAMINO B: Cualquier otro error -> Fallback a la HOME
     // =======================================================================
     return {
       metadataBase: new URL(baseUrl),
       title: 'DKV Dentisalud Élite | Seguro Dental con Precios Pactados',
       description: 'Contrata tu seguro dental DKV con hasta 40% de descuento. Niños gratis en póliza familiar.',
       openGraph: {
         title: 'DKV Dentisalud Élite | Seguro Dental',
         description: 'Contrata tu seguro dental DKV con hasta 40% de descuento. Niños gratis en póliza familiar.',
         url: '/', 
         siteName: 'DKV Dentisalud Élite',
         images: [
           {
             url: `/api/og-home?v=3`, 
             width: 1200, 
             height: 630,
             alt: 'Lo fácil es cuidar tu sonrisa', 
           }
         ],
         locale: 'es_ES',
         type: 'website',
       }
     };
   }
 }






 // --- 3. VIEWPORT (Móvil) ---
 export const generateViewport = (): Viewport => {
   return {
     themeColor: '#849700', 
     width: 'device-width',
     initialScale: 1,
   };
 };

export default async function DentistasPage({ params }: PageProps) {
  let cleanSlug = params?.slug ? [...params.slug] : [];
  let sharedClinicId = null;

  // Si la URL trae un share, lo guardamos y limpiamos el slug virtualmente
  if (cleanSlug.length > 0 && cleanSlug[cleanSlug.length - 1].startsWith('share-')) {
    sharedClinicId = cleanSlug[cleanSlug.length - 1].replace('share-', '');
    cleanSlug = cleanSlug.slice(0, -1);
  }

  try {
    // Pasamos el slug limpio y el ID de la clínica compartida (si existe)
    const navigationData = await getPageData(cleanSlug, sharedClinicId);

     // --- 4. GENERACIÓN DE JSON-LD DINÁMICO ---
     const locationName = navigationData.seo.h1.normal || "España";
     
    const breadcrumbItems = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": {
          "@type": "WebPage", 
          "@id": baseUrl, 
          "name": "Inicio"
        }
      },
      ...navigationData.seo.breadcrumbs.map((item: any, index: number) => {
        const optimizedName = item.label ? `Dentistas en ${item.label}` : "Nivel";
        return {
          "@type": "ListItem",
          "position": index + 2, 
          "name": optimizedName,
          "item": {
            "@type": "WebPage", 
            "@id": `${baseUrl}${item.href}`, 
            "name": optimizedName
          }
        };
      })
    ];

    const breadcrumbJsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "name": "Ruta de navegación",
      "description": "Jerarquía de navegación de la página",
      "numberOfItems": breadcrumbItems.length,
      "itemListElement": breadcrumbItems
    };

    const rel = navigationData.relatedLinks || {};
    const categories = [
      { data: rel.madre, role: "ParentHierarchy" },
      { data: rel.hijas, role: "SubHierarchy" },
      { data: rel.hermanas, role: "SiblingHierarchy" },
      { data: rel.cercanas, role: "AdjacentHierarchy" },
      { data: rel.comarcas, role: "RegionalHierarchy" }
    ];

    const activeCategories = categories.filter(
      cat => cat.data && cat.data.items && cat.data.items.length > 0
    );

    const navigationSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList", 
      "name": `Red de navegación para ${locationName}`,
      "description": `Enlaces jerárquicos y geográficos para la búsqueda de dentistas en ${locationName}`,
      "numberOfItems": activeCategories.length, 
      "itemListElement": activeCategories
        .map((cat: any, blockIndex: number) => ({
           "@type": "ListItem",
           "position": blockIndex + 1,
           "item": {
              "@type": "ItemList",
              "name": cat.data?.title || "Relacionados",
              "numberOfItems": cat.data.items.length, 
              "mainEntityOfPage": {
                "@type": "SiteNavigationElement",
                "name": cat.data?.title || "Relacionados",
                "alternateName": cat.role
              },
             "itemListElement": (cat.data?.items || []).map((item: any, index: number) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "WebPage",
                  "@id": `${baseUrl}${item.href}`,
                  "name": item.label,
                  "description": `Consulta de cuadro médico dental en ${item.label}`
                }
              }))
            }
          }))
    };
 
    return (
      <div className="flex flex-col min-h-screen bg-white font-fsme">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        
        {navigationData.seo.schemaData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(navigationData.seo.schemaData) }}
          />
        )}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(navigationSchema) }}
        />
 
        <FixedBreadcrumb items={navigationData.seo.breadcrumbs} />

        <DentistHero 
          h1={navigationData.seo.h1}
          totalDentistas={navigationData.seo.totalDentistasHero}
          totalCentros={navigationData.seo.totalCentrosHero}
        />

        <div className="pt-10">
          <ScrollToMapButton />
        </div>

        <section id="mapa-buscador" className="relative flex-1 flex flex-col pt-4">
          <DentistsContainer initialData={navigationData} />
        </section>

        <RelatedLinks data={navigationData.relatedLinks} />

        <FooterLegal />
      </div>
    );

  } catch (e: any) {
    if (e.message === "NO_COORDS") {
       return (
         <div className="min-h-screen flex items-center justify-center bg-white">
           <p className="text-dkv-gray font-fsme">Comprobando ubicación...</p>
           <script dangerouslySetInnerHTML={{ __html: `window.location.replace("/");` }} />
         </div>
       );
    }
    console.error("❌ PAGE ERROR:", e);
    return notFound();
  }
}
