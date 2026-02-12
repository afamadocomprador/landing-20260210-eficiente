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
     const breadcrumbJsonLd = {
       "@context": "https://schema.org",
       "@type": "BreadcrumbList",
       "itemListElement": navigationData.seo.breadcrumbs.map((item: any, index: number) => ({
         "@type": "ListItem",
         "position": index + 1,
         "name": item.label,
         "item": `https://landing-20260210-eficiente.vercel.app/${item.href}` // Asegúrate de usar dominio absoluto
       }))
     };

     // 4.2. JSON-LD para Servicio Local (Service / InsuranceAgency) en esa zona
     const localServiceJsonLd = {
       "@context": "https://schema.org",
       "@type": "Service", // Usamos Service porque es una página de listado, no UNA oficina física concreta
       "serviceType": "Seguro Dental DKV",
       "provider": {
         "@type": "Organization",
         "name": "DKV Dentisalud Élite",
         "image": "https://landing-20260210-eficiente.vercel.app/images/logo-dkv.png",
         "telephone": "+34976217463",
         "url": "https://landing-20260210-eficiente.vercel.app" // Es bueno reforzar la URL oficial
       },       
       "areaServed": {
         "@type": "Place",
         "name": locationName // Ej: "Zaragoza"
       },
       "description": `Cuadro médico de dentistas DKV en ${locationName} con precios pactados.`
     };





    return (
      <div className="flex flex-col min-h-screen bg-white font-fsme">


         {/* Inyección de JSON-LD Dinámico */}
         <script
           type="application/ld+json"
           dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
         />
         <script
           type="application/ld+json"
           dangerouslySetInnerHTML={{ __html: JSON.stringify(localServiceJsonLd) }}
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
