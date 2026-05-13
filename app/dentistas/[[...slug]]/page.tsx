// app/dentistas/[[...slug]]/page.tsx

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { Metadata, Viewport, ResolvingMetadata } from "next";
import { SITE_CONFIG } from '@/constants/config'; 

// Motor de datos
import { getLevelData } from "@/lib/level-engine";

// ⚡️ IMPORTACIÓN CLAVE: Nuestro loader inteligente que gestiona la carga diferida
import MapLazyLoader from '@/components/dentists/MapLazyLoader';

// Componentes UI
import DentistHero from "@/components/hero/DentistHero";
import FixedBreadcrumb from "@/components/layout/FixedBreadcrumb";
import ScrollToMapButton from "@/components/dentists/ScrollToMapButton";
import RelatedLinks from "@/components/dentists/links/RelatedLinks"; 
import FooterLegal from "@/components/FooterLegal"; 

// ⚡️ NUEVAS IMPORTACIONES PARA EL CTA FINAL
import Link from "next/link";
import { MessageCircle } from "lucide-react";

export const dynamic = "force-dynamic";

const baseUrl = SITE_CONFIG.domain;

interface PageProps {
  params: { slug?: string[] };
  searchParams?: { [key: string]: string | string[] | undefined }; 
}

 // --- 1. HELPER: Obtención de datos centralizada ---
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

   // 🌟 PASO 2: SI ES UNA URL COMPARTIDA, PRIORIZAMOS EL OG DEL DENTISTA
   if (sharedClinicId) {
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
           alternates: {
             canonical: canonicalUrl,
           },
           openGraph: {
             title: clinicTitle,
             description: clinicDesc,
             url: `${canonicalUrl}/share-${sharedClinicId}`,
             siteName: 'DKV Dentisalud Élite',
             images: [
               {
                 url: `/api/og?title=${encodeURIComponent(ogTitleToRender)}&v=2`,
                 width: 1200,
                 height: 630,
                 alt: clinicData.name,
               }
             ],
             locale: 'es_ES',
             type: 'website',
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
       console.error("Error al generar OG de la clínica compartida:", err);
     }
   }

   // 🌟 PASO 3: SI NO ES SHARE (O FALLÓ LA DB), SEGUIMOS CON LA CIUDAD NORMAL
   try {
     const navigationData = await getPageData(cleanSlug);
     const { seo } = navigationData;
     
     if (currentPath.includes('cerca-de-ti') || currentPath.includes('cerca-de-mi')) {
       return {
         metadataBase: new URL(baseUrl),
         title: '📍 Dentistas DKV Cerca de Ti | ⭐ Valoración Excelente',
         description: 'Encuentra las clínicas del cuadro médico oficial DKV más cercanas a tu ubicación. Ahorro garantizado.',
         openGraph: {
           title: '📍 Dentistas DKV Cerca de Ti | ⭐ Valoración Excelente',
           description: 'Cuadro médico oficial DKV. Implantes y tratamientos con hasta un 40% de ahorro garantizado. Pide tu cita.',
           url: `${baseUrl}/dentistas/${currentPath}`,
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

     const title = seo.title || `Dentistas en ${seo.h1.normal} | DKV Dentisalud Elite`;
     
     // 🧹 LIMPIEZA DE ETIQUETAS HTML PARA LA DESCRIPCIÓN SEO GENERAL
     const rawDesc = seo.description || `Cuadro médico DKV en ${seo.h1.normal}.`;
     const cleanDescription = rawDesc.replace(/<[^>]*>?/gm, '').replace(/\s+/g, ' ').trim();

     // 🌟 RECUPERAMOS TUS VARIABLES PARA EL OPEN GRAPH (WHATSAPP)
     const formatter = new Intl.NumberFormat('es-ES');
     const numDentistas = seo.totalDentistasHero || 0;
     const numCentros = seo.totalCentrosHero || 0;
     
     const palabraDentistas = numDentistas === 1 ? "dentista" : "dentistas";
     const palabraCentros = numCentros === 1 ? "centro" : "centros";
     
     const ogTitle = `${formatter.format(numDentistas)} ${palabraDentistas} en ${formatter.format(numCentros)} ${palabraCentros} a tu disposición`;
     const ogDesc = "Lo fácil es elegir el dentista que te va a atender como DKV DENTISALUD ELITE";

     return {
       metadataBase: new URL(baseUrl),
       title: title,
       description: cleanDescription,
       alternates: {
         canonical: canonicalUrl,
       },
       openGraph: {
         title: ogTitle,
         description: ogDesc,
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
     return {
       metadataBase: new URL(baseUrl),
       title: 'DKV Dentisalud Élite | Seguro Dental con Precios Pactados',
       description: 'Contrata tu seguro dental DKV con hasta 40% de descuento. Niños gratis en póliza familiar.',
       openGraph: {
         title: 'DKV Dentisalud Élite | Seguro Dental',
         description: 'Contrata tu seguro dental DKV con hasta 40% de descuento. Niños gratis en póliza familiar.',
         url: baseUrl, 
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

  if (cleanSlug.length > 0 && cleanSlug[cleanSlug.length - 1].startsWith('share-')) {
    sharedClinicId = cleanSlug[cleanSlug.length - 1].replace('share-', '');
    cleanSlug = cleanSlug.slice(0, -1);
  }

  try {
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

    // 🌟 FORMATEO DE NÚMEROS
    const totalDentistas = navigationData.seo.totalDentistasHero || 0;
    const totalCentros = navigationData.seo.totalCentrosHero || 0;
    const formatter = new Intl.NumberFormat('de-DE');
    const formattedProfessionals = formatter.format(totalDentistas);
    const formattedClinics = formatter.format(totalCentros);
    const isSpain = locationName.toLowerCase() === 'españa';
    const showPlusPrefix = totalDentistas > 300;

    // 🌟 LÓGICA POR LONGITUD DE TEXTO Y NIVELES
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
 
        <FixedBreadcrumb items={visualBreadcrumbs} />

        <DentistHero 
          h1={navigationData.seo.h1}
          description={isLongDescription ? undefined : rawDescription}
        />

        {isLongDescription ? (
          htmlContentZone1 && (
            <section className="container mx-auto px-safe-x md:px-6 pt-4 pb-6 text-left">
              <div className="max-w-4xl relative">
                <div className="pl-8 md:pl-10 pr-4">
                  <div dangerouslySetInnerHTML={{ __html: htmlContentZone1 }} />
                </div>
              </div>
            </section>
          )
        ) : (
          (totalDentistas > 0 || totalCentros > 0) && (
            <section className="container mx-auto px-safe-x md:px-6 pt-2 pb-6 text-left">
              <div className="max-w-4xl relative">
                <div className="pl-8 md:pl-10 pr-4">
                  <p className="text-lg md:text-xl text-gray-700 font-fsme leading-relaxed">
                    Accede al Cuadro Médico Dental DKV. {showPlusPrefix && "Más de "} 
                    <strong className="text-dkv-green"> {formattedProfessionals} </strong> dentistas disponibles en 
                    <strong className="text-dkv-green"> {formattedClinics} </strong> centros dentales y precios pactados en 
                    {isSpain ? " todo el territorio nacional" : ` ${locationName}`}.
                  </p>
                </div>
              </div>
            </section>
          )
        )}

        <div className="pt-10">
          <ScrollToMapButton />
        </div>

        <section id="mapa-buscador" className="relative flex-1 flex flex-col pt-4">
          {/* ⚡️ PASAMOS EL SLUG PARA QUE ENCUENTRE LAS 3 FOTOS */}
          <MapLazyLoader 
            initialData={navigationData} 
            slug={cleanSlug.join('/')} 
          />
        </section>


        {isLongDescription && htmlContentZone2 && (
            <section className="container mx-auto px-safe-x md:px-6 pt-8 pb-6 text-left">
              <div className="max-w-4xl relative">
                <div className="pl-8 md:pl-10 pr-4">
                  <div dangerouslySetInnerHTML={{ __html: htmlContentZone2 }} />
                </div>
              </div>
            </section>
        )}


        {/* ⚡️ CTA: EL ATRAPA-FUGAS (Siempre visible antes del footer y relacionados) */}
        {(() => {
          const preposicion = navigationData.seo.h1?.preposicion || (pageLevel === '07' ? 'cerca de' : 'en');
          const locationContextText = isSpain 
            ? 'en todo el territorio nacional' 
            : `${preposicion} ${locationName}`;
          
          return (
            <section className="container mx-auto px-safe-x md:px-6 py-12 md:py-16 text-left md:text-center">
              <div className="max-w-3xl mx-auto bg-gray-50 border border-gray-100 rounded-3xl p-8 md:p-12 shadow-sm">
                <h3 className="text-2xl md:text-3xl font-lemon text-dkv-green-dark mb-4 uppercase">

                  {totalCentros > 1 ? (
                    <div className="bloque-duda">
                      ¿No sabes qué centro dental elegir {locationContextText}?
                    </div>
                  ) : (
                    <div className="bloque-alternativas">
                      ¿Otros centros cercanos a {locationName}?
                    </div>
                  )}

                </h3>
                <p className="text-lg text-gray-600 font-fsme mb-8">
                  Nuestro agente exclusivo te ayudará a encontrar el centro ideal más cercano y resolverá cualquier duda que tengas sobre los tratamientos y nuestros precios pactados.
                </p>
                {/* ⚡️ BOTÓN GHOST: No compite con el header, pero está ahí cuando se necesita */}
                <Link 
                  href="/contacto" 
                  className="inline-flex items-center justify-center gap-3 bg-transparent border-2 border-dkv-green-dark text-dkv-green-dark font-extrabold font-fsme text-lg px-8 py-4 rounded-xl hover:bg-dkv-green-dark hover:text-white hover:shadow-xl hover:scale-105 transition-all duration-300 w-full sm:w-auto"
                >
                  <MessageCircle className="w-6 h-6" />
                  <span>Contactar con tu agente</span>
                </Link>
              </div>
            </section>
          );
        })()}



        <RelatedLinks 
          data={navigationData.relatedLinks} 
          locationName={locationName} 
        />

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
