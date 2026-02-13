import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { Metadata, Viewport, ResolvingMetadata } from "next";

// Motor de datos
import { getLevelData } from "@/lib/level-engine";

// Componentes UI
import DentistsContainer from "@/components/dentists/DentistsContainer";
import DentistHero from "@/components/hero/DentistHero";
import FixedBreadcrumb from "@/components/layout/FixedBreadcrumb";
import ScrollToMapButton from "@/components/dentists/ScrollToMapButton";
import RelatedLinks from "@/components/dentists/links/RelatedLinks"; // <--- Componente Nuevo

export const dynamic = "force-dynamic";

// --- CONFIGURACIÓN GLOBAL ---
// Declaramos baseUrl aquí para que sea accesible en todo el archivo
const baseUrl = "https://landing-20260210-eficiente.vercel.app";

interface PageProps {
  params: { slug?: string[] };
  searchParams?: { [key: string]: string | string[] | undefined }; // Tipado estricto recomendado
}


 // --- 1. HELPER: Obtención de datos centralizada ---
 // Extraemos esto para usarlo tanto en el SEO (Metadata) como en la UI (Page)
 async function getPageData(slugArray: string[] | undefined) {
   const cookieStore = cookies();
   const supabase = createServerClient(
     process.env.NEXT_PUBLIC_SUPABASE_URL!,
     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
     { cookies: { get: (name: string) => cookieStore.get(name)?.value } }
   );

   const currentSlug = slugArray && slugArray.length > 0 ? slugArray[0] : "";
   const level = currentSlug === "" ? "01" : "02"; 

   return await getLevelData(supabase, "sin informar", level, currentSlug);
 }


// --- 2. METADATA DINÁMICA (SEO) ---
 export async function generateMetadata(
   { params }: PageProps,
   parent: ResolvingMetadata
 ): Promise<Metadata> {
   try {
     const navigationData = await getPageData(params.slug);
     const { seo } = navigationData;
     const currentPath = params.slug ? params.slug.join('/') : '';
     
     // Construcción de URL Canónica y Título fallback
     const canonicalUrl = `/dentistas/${currentPath}`;
     const title = seo.title || `Dentistas en ${seo.h1.normal} | DKV Dentisalud Elite`;
     const description = seo.description || `Cuadro médico DKV en ${seo.h1.normal}.`;

     return {
       metadataBase: new URL(baseUrl),
       title: title,
       description: description,
       alternates: {
         canonical: canonicalUrl,
       },
       openGraph: {
         title: title,
         description: description,
         url: canonicalUrl,
         type: 'website',
         images: [
           {
             // Genera imagen dinámica: "Dentistas en Zaragoza"
             url: `/api/og?title=${encodeURIComponent(seo.h1.normal)}&subtitle=Cuadro Médico`,
             width: 1200,
             height: 630,
             alt: `Dentistas DKV en ${seo.h1.normal}`,
           },
         ],
       },
     };
   } catch (e) {
     return { title: 'Buscador de Dentistas | DKV Dentisalud' };
   }
 }


 // --- 3. VIEWPORT (Móvil) ---
 export const generateViewport = (): Viewport => {
   return {
     themeColor: '#849700', // Verde DKV
     width: 'device-width',
     initialScale: 1,
   };
 };




export default async function DentistasPage({ params }: PageProps) {
  //const cookieStore = cookies();
  //const supabase = createServerClient(
  //  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  //  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  //  { cookies: { get: (name: string) => cookieStore.get(name)?.value } }
  //);
  //
  //const currentSlug = params.slug && params.slug.length > 0 ? params.slug[0] : "";
  //const level = currentSlug === "" ? "01" : "02"; 

  try {
    // 1. Obtener datos (Incluye ahora relatedLinks en la respuesta)
    //const navigationData = await getLevelData(
    //  supabase,
    //  "sin informar",
    //  level,
    //  currentSlug
    //);

    // Usamos el helper centralizado
    const navigationData = await getPageData(params.slug);



     // --- 4. GENERACIÓN DE JSON-LD DINÁMICO (Nuevo) ---
     // Esto crea la estructura de datos que Google busca para validar la entidad
     const locationName = navigationData.seo.h1.normal || "España";
     
     // 4.1. JSON-LD para Breadcrumbs (Rutas de exploración)
     //const breadcrumbJsonLd = {
     //  "@context": "https://schema.org",
     //  "@type": "BreadcrumbList",
     //  "itemListElement": navigationData.seo.breadcrumbs.map((item: any, index: number) => ({
     //    "@type": "ListItem",
     //    "position": index + 1,
     //    "name": item.label,
     //    "item": `https://landing-20260210-eficiente.vercel.app/${item.href}` // Asegúrate de usar dominio absoluto
     //  }))
     //};

    // 4.1. BREADCRUMBS OPTIMIZADOS (Soluciona "Elemento sin nombre" y "Thing")
    const breadcrumbItems = [
      // --- PASO 1: Inyectamos manualmente la HOME ---
      // Esto asegura que el primer nivel siempre tenga nombre y evita el error de Google.
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": {
          "@type": "WebPage", // <--- Soluciona el tipo "Thing"
          "@id": baseUrl, // Usa tu dominio final
          "name": "Inicio"
        }
      },
      // --- PASO 2: Mapeamos los niveles dinámicos ---
      ...navigationData.seo.breadcrumbs.map((item: any, index: number) => ({
        "@type": "ListItem",
        "position": index + 2, // Empezamos en 2 porque el 1 es Inicio
        "name": item.label || "Nivel", // Fallback por seguridad
        "item": {
          "@type": "WebPage", // <--- Soluciona el tipo "Thing"
          "@id": `${baseUrl}${item.href}`, // Dominio absoluto
          "name": item.label
        }
      }))
    ];

    const breadcrumbJsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "name": "Ruta de navegación",
      "description": "Jerarquía de navegación de la página",
      "numberOfItems": breadcrumbItems.length,
      "itemListElement": breadcrumbItems
    };






     // 4.2. Organización (Marca en Zona) - REEMPLAZA AL "SERVICE"
     // Al usar directamente "Organization" como entidad principal, Google no pide dirección física.
     const organizationJsonLd = {
       "@context": "https://schema.org",
       "@type": "Organization", 
       "name": "DKV Dentisalud Élite",
       "url": baseUrl,
       "logo": `${baseUrl}/images/logo-dkv.png`,
       "description": `Cuadro médico de dentistas DKV en ${locationName} con precios pactados.`,
       "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+34976217463",
          "contactType": "customer service"
       },
       "address": {
        "@type": "PostalAddress",
        "addressCountry": "ES"
      },
       "areaServed": {
         "@type": "AdministrativeArea",
         "name": locationName,
         "containedIn": { "@type": "Country", "name": "España" }
       },
       "serviceType": "Seguro Dental / Cuadro Médico",
       "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Servicios Odontológicos",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Cuadro Médico Dental",
                  "areaServed": {
                    "@type": "AdministrativeArea",
                    "name": locationName
                  }
                }
              }
            ]
       }
     };

    // 4.3. RED DE NAVEGACIÓN SEMÁNTICA CATEGORIZADA
    const rel = navigationData.relatedLinks || {};
    
    // Definimos las categorías que queremos procesar
    const categories = [
      { data: rel.madre, role: "ParentHierarchy" },
      { data: rel.hijas, role: "SubHierarchy" },
      { data: rel.hermanas, role: "SiblingHierarchy" },
      { data: rel.cercanas, role: "AdjacentHierarchy" },
      { data: rel.comarcas, role: "RegionalHierarchy" }
    ];

    console.log('navigationData.relatedLinks:',navigationData.relatedLinks);

    // Filtramos primero para tener el conteo real de bloques activos
    const activeCategories = categories.filter(
      cat => cat.data && cat.data.items && cat.data.items.length > 0
    );

    // Usamos @graph para definir múltiples intenciones de navegación en un solo bloque
    const navigationSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList", // Lista maestra de bloques
      "name": `Red de navegación para ${locationName}`,
      "description": `Enlaces jerárquicos y geográficos para la búsqueda de dentistas en ${locationName}`,
      "numberOfItems": activeCategories.length, // Conteo total de bloques (Madre, Hijas, etc.)
      "itemListElement": activeCategories
        .map((cat: any, blockIndex: number) => ({
           "@type": "ListItem",
           "position": blockIndex + 1,
           "item": {
              "@type": "ItemList",
              "name": cat.data?.title || "Relacionados",
              "numberOfItems": cat.data.items.length, // Conteo de enlaces dentro de este bloque
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


{/* 1. Breadcrumbs (La ruta jerárquica lineal) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        
        {/* 2. Organización (La entidad que presta el servicio) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />

        {/* 3. Red de Enlaces (La telaraña semántica: Madres, Hermanos e Hijos) */}
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

        {/* 2. NUEVO: Componente de Enlaces Relacionados (datos vienen del engine) */}
        <RelatedLinks data={navigationData.relatedLinks} />

      </div>
    );
  } catch (e) {
    console.error("❌ PAGE ERROR:", e);
    return notFound();
  }
}
