import { SupabaseClient } from "@supabase/supabase-js";
import { NavigationState } from "@/context/NavigationContext";
import { getDatosComunidades } from '@/services/getComunidades';
import { getDatosProvincias } from '@/services/getProvincias';
import { getDatosMunicipios } from '@/services/getMunicipios';
import { getDatosMunicipiosDeComarca } from '@/services/getMunicipiosDeComarcas';
import { getDatosCentros } from '@/services/getCentros';
import { getDatosHubs } from '@/services/getHubs';
import { getDatosCentrosDeHub } from '@/services/getCentrosDeHubs';
import { getBreadcrumbTrail } from '@/services/getBreadcrumb';
import { SITE_CONFIG } from '@/constants/config'; 

import { cookies } from "next/headers";
import { getRelatedLinks, RelatedLinksData } from '@/services/getEnlaces';

export interface ExtendedNavigationState extends NavigationState {
    relatedLinks: RelatedLinksData;
}

export async function getLevelData(
  supabase: SupabaseClient,
  nivelInicial: string,
  nivelFinal: string,
  slug: string | "",
  sharedClinicId: string | null = null // 🌟 NUEVO PARÁMETRO
): Promise<ExtendedNavigationState> {

  // ====================================================================
  // 🌟 2. CORTOCIRCUITO MÁGICO PARA "CERCA DE MÍ" (NIVEL 00 / GEO)
  // ====================================================================
  if (slug === "cerca-de-mi") {
    console.log(`\n[DEBUG ENGINE] Activando motor espacial (Nivel 00)`);
    
    let lat: number;
    let lng: number;

    // Si nos pasan un ID de clínica compartida, usamos SUS coordenadas como centro del mundo
    if (sharedClinicId) {
       const { data: clinicData, error: clinicError } = await supabase
         .from('view_clinics')
         .select('latitude, longitude')
         .eq('clinic_id', sharedClinicId)
         .single();

       if (clinicError || !clinicData) {
         throw new Error("NO_COORDS"); // Fallback si la clínica no existe
       }
       lat = clinicData.latitude;
       lng = clinicData.longitude;
       console.log(`[DEBUG ENGINE] Usando coordenadas de clínica compartida: ${lat}, ${lng}`);
    } else {
       // Si no, usamos las coordenadas del usuario
       const cookieStore = cookies();
       const latStr = cookieStore.get("user_lat")?.value;
       const lngStr = cookieStore.get("user_lng")?.value;

       if (!latStr || !lngStr) {
         throw new Error("NO_COORDS"); 
       }

       lat = parseFloat(latStr);
       lng = parseFloat(lngStr);
    }

    // Llamamos a tu nueva función PostGIS con las coordenadas seleccionadas
    const { data: listClinics, error } = await supabase.rpc('get_centros_cercanos', {
      user_lat: lat,
      user_lng: lng,
      radio_km: 25 // 25 kilómetros a la redonda
    });

    if (error) throw error;

    // Convertimos las clínicas devueltas en marcadores de mapa
    const markers = (listClinics || []).map((c: any) => ({
      name: c.name,
      lat: c.latitude,
      lng: c.longitude,
      slug: c.clinic_id, 
      count: c.staff_count,
      tipo: 'centro',
      distancia_km: c.distancia_km 
    }));

    // Calculamos totales para el Hero
    const totalCentros = listClinics?.length || 0;
    const totalDentistas = listClinics?.reduce((acc: number, curr: any) => acc + (Number(curr.staff_count) || 0), 0) || 0;

    return {
      nivelInicial: "sin informar",
      nivelFinal: "00", 
      entidadId: "cerca-de-mi",
      codigo_ine: "GPS",
      mapa: {
        marks: markers,
        modo: 'CENTER_ZOOM', 
        centro: [lat, lng],
        zoom: 14,
        tileStyle: "osm" 
      },
      lista: {
        totalDentistas,
        totalCentros,
        clinics: listClinics || [],
        estadoInicial: 'CLOSED' 
      },
      seo: {
        totalDentistasHero: totalDentistas,
        totalCentrosHero: totalCentros,
        h1: { dark: "Encuentra tu dentista", normal: "cerca de ti" },
        breadcrumbs: [{ label: "Cerca de mí", href: "/cerca-de-mi" }],
        enlacesSugeridos: [],
        title: "Dentistas cerca de mí | DKV Dentisalud Élite",
        description: "Encuentra las clínicas dentales DKV más cercanas a tu ubicación actual.",
        schemaData: null 
      },
      relatedLinks: { madre: null, hijas: null, hermanas: null, cercanas: null, comarcas: null, comarcas_sin_dentistas: null }
    };
  }
  // ====================================================================
  // FIN DEL CORTOCIRCUITO
  // ====================================================================

  // 1. NORMALIZACIÓN
  const isProvinciaSlug = slug.endsWith("-provincia");
  const baseSlug = isProvinciaSlug ? slug.replace("-provincia", "") : slug;
  const searchLevel = isProvinciaSlug ? "03" : nivelFinal;

  let { data: landing } = await supabase
    .from("landings_search_dentistry")
    .select("*, subnivel") 
    .eq("nivel", searchLevel)
    .eq("slug", baseSlug)
    .maybeSingle();

  if (!landing) {
    const { data: retry } = await supabase.from("landings_search_dentistry").select("*, subnivel").eq("slug", slug).maybeSingle();
    landing = retry;
  }

  if (!landing) {
    throw new Error("Página no encontrada");
  }

  console.log(`\n[DEBUG ENGINE] Landing: ${landing.nombre_ine} | Nivel: ${landing.nivel} | Subnivel: ${landing.subnivel}`);

  // 2. ESTADÍSTICAS Y LISTADO
  let stats: any = {};
  let listado: any[] = [];
  let totalHeroDentistas = 0;
  let totalHeroCentros = 0;

  if (landing.nivel === "01") {
     const datos = await getDatosComunidades(supabase);
     stats = datos.stats;
     listado = datos.listado;
     let auxTotal = stats.total_espana_dentistas || 0;
     if (auxTotal > 300) auxTotal = Math.floor(auxTotal / 100) * 100;    
     totalHeroDentistas = auxTotal;
     totalHeroCentros = stats.total_espana_centros;
  } 
  else if (landing.nivel === "02") {
     const datos = await getDatosProvincias(supabase, landing.codigo_ine.replace('CA-', ''));
     stats = datos.stats;
     listado = datos.listado;
     totalHeroDentistas = stats.total_comunidad_dentistas;
     totalHeroCentros = stats.total_comunidad_centros;
  } 
  else if (landing.nivel === "03") {
     const datos = await getDatosMunicipios(supabase, landing.codigo_ine);
     stats = datos.stats;
     listado = datos.listado;
     totalHeroDentistas = stats.total_provincia_dentistas;
     totalHeroCentros = stats.total_provincia_centros;
  } 
  else if (landing.nivel === "04") {
     if (landing.subnivel === "a") {
        const datos = await getDatosHubs(supabase, landing.codigo_ine);
        stats = datos.stats;
        listado = datos.listado;
        totalHeroDentistas = stats.total_municipio_dentistas;
        totalHeroCentros = stats.total_municipio_centros;
     } 
     else if (["b", "c"].includes(landing.subnivel)) {
        const datos = await getDatosCentros(supabase, landing.codigo_ine);
        stats = datos.stats;
        listado = datos.listado;
        totalHeroDentistas = stats.total_municipio_dentistas;
        totalHeroCentros = stats.total_municipio_centros;
     } else {
        console.warn("[DEBUG] Nivel 04 con subnivel desconocido o nulo:", landing.subnivel);
     }
  } 
  else if (landing.nivel === "05") {
     const datos = await getDatosCentrosDeHub(supabase, landing.codigo_ine, landing.subcodigo_ine);
     stats = datos.stats;
     listado = datos.listado;
     totalHeroDentistas = stats.total_hub_dentistas;
     totalHeroCentros = stats.total_hub_centros;
  } 
  else if (landing.nivel === "06") {
     const datos = await getDatosMunicipiosDeComarca(supabase, landing.codigo_ine);
     stats = datos.stats;
     listado = datos.listado;
     totalHeroDentistas = stats.total_comarca_dentistas;
     totalHeroCentros = stats.total_comarca_centros;
  } 

  // 3. MARCADORES MAPA
  let markers: any[] = [];
  
  if (landing.nivel === "01") {
    const SLUG_OVERRIDES: Record<string, string> = {
      '06': 'cantabria-provincia',
      '03': 'asturias',
      '13': 'madrid-provincia',
      '18': 'ceuta-municipio',
      '19': 'melilla-municipio',
      '17': 'la-rioja-provincia',
      '15': 'navarra',
      '14': 'murcia-provincia',
      '04': 'illes-balears-provincia'
    };
    const NAME_OVERRIDES: Record<string, string> = {
      '03': 'Asturias',
      '13': 'Madrid',
      '15': 'Navarra',
      '14': 'Murcia',
      '10': 'Valencia'
    };

    markers = (listado || []).filter(m => m.lat_comunidad).map(m => ({
        name: NAME_OVERRIDES[m.cod_comunidad] || m.nombre_comunidad,
        lat: m.lat_comunidad,
        lng: m.lng_comunidad,
        slug: SLUG_OVERRIDES[m.cod_comunidad] || m.slug_comunidad,
        count: m.num_dentistas_comunidad,
        tipo: 'comunidad', 
        codigo_ine: `CA-${m.cod_comunidad}` 
    }));
  } 
  else if (landing.nivel === "02") {
    markers = (listado || []).filter(m => m.lat_provincia).map(m => ({
        name: m.nombre_provincia.replace("Provincia de ", ""),
        lat: m.lat_provincia,
        lng: m.lng_provincia,
        slug: m.slug_provincia,
        count: m.num_dentistas_provincia,
        tipo: 'provincia', 
        codigo_ine: m.cod_provincia
    }));
  }
  else if (landing.nivel === "03") {
    markers = (listado || []).filter(m => m.lat_municipio).map(m => ({
        name: m.nombre_municipio,
        lat: m.lat_municipio,
        lng: m.lng_municipio,
        slug: m.slug_municipio,
        count: m.num_dentistas_municipio,
        tipo: 'municipio', 
        codigo_ine: m.cod_municipio
    }));
  }
  else if (landing.nivel === "04") {
     if (landing.subnivel === "a") {
        markers = (listado || []).filter(m => m.lat_hub).map(m => ({
             name: m.nombre_hub,
             lat: m.lat_hub,
             lng: m.lng_hub,
             slug: m.slug_hub,
             count: m.num_dentistas_hub,
             tipo: 'hub' 
        }));
     } 
     else {
        markers = (listado || []).filter(m => m.lat_centro).map(m => ({
             name: m.nombre_centro,
             lat: m.lat_centro,
             lng: m.lng_centro,
             slug: m.slug_centro,
             count: m.num_dentistas_centro,
             tipo: 'centro' 
        }));
     } 
  }
  else if (landing.nivel === "05") {
       markers = (listado || [])
         .filter(m => m.lat_centro_de_hub != null)
         .map(m => ({
            name: m.nombre_centro_de_hub, 
            lat: m.lat_centro_de_hub, 
            lng: m.lng_centro_de_hub, 
            slug: m.slug_centro_de_hub, 
            count: m.num_dentistas_centro_de_hub,
            tipo: 'centro' 
       }));
  }
  else if (landing.nivel === "06") {
       markers = (listado || [])
         .filter(m => m.lat_municipio_de_comarca != null)
         .map(m => ({
            name: m.nombre_municipio_de_comarca, 
            lat: m.lat_municipio_de_comarca, 
            lng: m.lng_municipio_de_comarca, 
            slug: m.slug_municipio_de_comarca, 
            count: m.num_dentistas_municipio_de_comarca, 
             tipo: 'comarca' 
       }));
  }

  // 4. BREADCRUMBS
  const breadcrumbItems = await getBreadcrumbTrail(supabase, landing.nivel, landing.codigo_ine, landing.subcodigo_ine);

  // 5. CLÍNICAS (Listado inferior)
  let queryClinicsBuilder = supabase.from("view_clinics_con_dentistas").select("*");
  switch (landing.nivel) {
    case "01": case "02": queryClinicsBuilder = queryClinicsBuilder.eq('is_propio', true); break;
    case "03": queryClinicsBuilder = queryClinicsBuilder.eq('ine_province_code', landing.codigo_ine); break;
    case "04": queryClinicsBuilder = queryClinicsBuilder.eq('ine_city_code', landing.codigo_ine); break;
    case "05": queryClinicsBuilder = queryClinicsBuilder.eq('codigo_hub', landing.subcodigo_ine); break;
    case "06": queryClinicsBuilder = queryClinicsBuilder.eq('ine_comarca_code', landing.codigo_ine); break;
  }
  
  const { data: listClinics } = await queryClinicsBuilder;
  
  // 6. ENLACES RELACIONADOS
  const relatedLinks = await getRelatedLinks(supabase, {
    nivel: landing.nivel,
    subnivel: landing.subnivel, 
    codigo_ine: landing.codigo_ine,
    latitude: landing.latitud_gps,
    longitude: landing.longitud_gps,
    nombre: landing.nombre_ine 
  });

  // 7. GENERACIÓN DE JSON-LD
  const baseUrl = SITE_CONFIG.domain;
  const currentPath = slug? `/dentistas/${slug}` : `/dentistas`;
  const currentUrl = `${baseUrl}${currentPath}`;
  const locationName = landing.nombre_ine || "España";

  let areaServedType = "AdministrativeArea"; 
  if (landing.nivel === "01") areaServedType = "Country";
  else if (landing.nivel === "03") areaServedType = "State"; 
  else if (landing.nivel === "04" && ["b", "c"].includes(landing.subnivel)) areaServedType = "City";

  const insuranceAgencyNode: any = {
    "@type": ["InsuranceAgency", "Organization"],
    "@id": `${currentUrl}#local-agency`,
    "mainEntityOfPage": currentUrl,
    "name": `Clínicas Dentales DKV ${locationName} - Precios Pactados`,
    "legalName": "Bernardo Sobrecasas Gallizo - Agente de Seguros Exclusivo DKV",
    "identifier": "C016125451380V",
    "description": `Cuadro médico oficial DKV en ${locationName}. Acceso a la Red Dental Élite con precios máximos garantizados en implantes, ortodoncia e Invisalign para asegurados.`,
    "url": currentUrl,
    "telephone": "+34976217463",
    "priceRange": "124€ (Cuota Anual del Plan)",
    "logo": `${baseUrl}/images/logo-dkv.png`,
    "image": `${baseUrl}/api/og?title=${encodeURIComponent(locationName)}&subtitle=Cuadro%20Médico`,
    "brand": {
      "@type": "Brand",
      "name": "DKV Dentisalud",
      "description": "Seguro dental oficial con baremos franquiciados"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. César Augusto, 33",
      "addressLocality": "Zaragoza",
      "postalCode": "50004",
      "addressCountry": "ES"
    },
    "publishingPrinciples": [
      `${baseUrl}/condiciones-generales.pdf`,
      `${baseUrl}/ipid.pdf`
    ],
    "areaServed": {
      "@type": areaServedType,
      "name": locationName,
      "containedIn": { "@type": "Country", "name": "ES" }
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `Baremos Dentales en ${locationName}`,
      "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": `Implante Dental en ${locationName}`,
          "description": `Precio baremado oficial en clínicas de ${locationName}. Incluye cirugía y corona.`,
          "areaServed": { "@type": "AdministrativeArea", "name": locationName }
        },
        "price": "1100.00",
        "priceCurrency": "EUR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": `Ortodoncia Invisible (Invisalign) en ${locationName}`,
          "description": "Tratamiento completo con alineadores transparentes y estudio digital incluido.",
          "areaServed": { "@type": "AdministrativeArea", "name": locationName }
        },
        "price": "2950.00",
        "priceCurrency": "EUR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Limpieza Dental y Fluoración",
          "description": "Servicio incluido sin coste adicional para asegurados en la red local.",
          "areaServed": { "@type": "AdministrativeArea", "name": locationName }
        },
        "price": "0.00",
        "priceCurrency": "EUR"
      }
      ]
    },
    "makesOffer": {
      "@type": "Offer",
      "name": "Seguro médico dental DKV Dentisalud Élite",
      "price": "124",
      "priceCurrency": "EUR",
    }
  };

  const schemaGraph: any = [insuranceAgencyNode];

  const medicalConditionNode = {
    "@type": "MedicalCondition",
    "@id": `${currentUrl}#caries-profunda`,
    "name": "Caries profunda y dolor de muelas",
    "possibleTreatment": {
      "@type": ["MedicalTherapy", "Service"],
      "name": "Tratamiento de Empaste Dental",
      "provider": {
        "@id": `${currentUrl}#local-agency`
      },
      "offers": {
        "@type": "Offer",
        "price": "29.00",
        "priceCurrency": "EUR",
        "name": "Precio Franquiciado DKV Élite"
      }
    }
  };
  schemaGraph.push(medicalConditionNode);

  const clinicsToMap = (listClinics || []).slice(0, 20);

  clinicsToMap.forEach((clinic: any) => {
    const safeClinicId = clinic.clinic_id || Math.random().toString(36).substring(2, 9);
    
    const clinicNode: any = {
      "@type": "MedicalClinic",
      "@id": `${currentUrl}#clinica-${safeClinicId}`,
      "name": clinic.name || clinic.nombre_centro,
      "telephone": clinic.phone || clinic.telefono,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": clinic.address || clinic.direccion,
        "addressLocality": clinic.city || clinic.municipio,
        "postalCode": clinic.zip_code || clinic.cp,
        "addressCountry": "ES"
      }
    };

    if (clinic.specialties && Array.isArray(clinic.specialties) && clinic.specialties.length > 0) {
      clinicNode.medicalSpecialty = clinic.specialties;
    }

    if (clinic.specialties && Array.isArray(clinic.specialties) && clinic.specialties.length > 0) {
      const validSchemaSpecialties = new Set<string>();
      
      clinic.specialties.forEach((spec: string) => {
        const lowerSpec = spec.toLowerCase();
        if (lowerSpec.includes("odontología") || lowerSpec.includes("ortodoncia") || lowerSpec.includes("implantes") || lowerSpec.includes("bucodental")) {
          validSchemaSpecialties.add("Dentistry");
        }
        if (lowerSpec.includes("radiología") || lowerSpec.includes("radiografía")) {
          validSchemaSpecialties.add("Radiography");
        }
        if (lowerSpec.includes("urgencias")) {
          validSchemaSpecialties.add("Emergency");
        }
        if (lowerSpec.includes("cirugía") || lowerSpec.includes("maxilofacial")) {
          validSchemaSpecialties.add("Surgical");
        }
        if (lowerSpec.includes("odontopediatría") || lowerSpec.includes("infantil")) {
          validSchemaSpecialties.add("Pediatric");
        }
      });

      if (validSchemaSpecialties.size > 0) {
        clinicNode.medicalSpecialty = Array.from(validSchemaSpecialties);
      }
      clinicNode.knowsAbout = clinic.specialties;
    }

    if (clinic.staff_names && Array.isArray(clinic.staff_names) && clinic.staff_names.length > 0) {
      clinicNode.employee = clinic.staff_names.map((docName: string) => ({
        "@type": "Person",
        "name": docName
      }));
    }

    schemaGraph.push(clinicNode);
  });

  const schemaJsonLd = {
    "@context": "https://schema.org",
    "@graph": schemaGraph
  };

  // 8. RETORNO FINAL
  return {
    nivelInicial, 
    nivelFinal: landing.nivel, 
    entidadId: slug,
    codigo_ine: landing.codigo_ine,
    mapa: {
      marks: markers,
      modo: landing.nivel === "01" ? 'CENTER_ZOOM' : 'FIT_BOUNDS',
      centro: [landing.latitud_gps || 40.41, landing.longitud_gps || -3.70],
      zoom: landing.nivel === "01" ? 6 : 10,
      tileStyle: ["01", "02", "03"].includes(landing.nivel) ? "light_nolabels" : 
                 (["04", "05", "06"].includes(landing.nivel) ? "osm" : "light_all")
    },
    lista: {
      totalDentistas: totalHeroDentistas || 0,
      totalCentros: totalHeroCentros || 0,
      clinics: listClinics || [],
      estadoInicial: 'CLOSED' 
    },
    seo: {
      totalDentistasHero: totalHeroDentistas || 0, 
      totalCentrosHero: totalHeroCentros || 0,
      h1: { dark: "Encuentra tu dentista en", normal: landing.breadcrumb },
      breadcrumbs: breadcrumbItems,
      enlacesSugeridos: [], 
      title: `${landing.nombre_ine} | DKV Dentisalud`,
      description: "",
      schemaData: schemaJsonLd 
    },
    relatedLinks: relatedLinks 
  };
}
