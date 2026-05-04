// services/getCentrosByLanding.ts

import { SupabaseClient } from '@supabase/supabase-js';

// ---------------------------------------------------------
// 1. DEFINICIÓN DE TIPOS (Interfaces)
// ---------------------------------------------------------

// Representa el output exacto de la función RPC get_centros_cercanos en la BBDD
export interface ClinicaCercana {
  clinic_id: string;
  name: string;
  latitude: number;
  longitude: number;
  // location_gis: any; // Se omite si no se consume directamente el objeto geo en el frontend
  address: string;
  city: string;
  ine_city_code: string;
  ine_comarca_code: string;
  codigo_hub: string;
  province: string;
  ine_province_code: string;
  zip_code: string;
  is_propio: boolean;
  phone: string;
  staff_count: number;
  specialties: string[];
  staff_names: string[];
  distancia_km: number;
}

export interface DashboardDataClinicasCercanas {
  stats: {
    total_clinicas: number;
    total_dentistas: number;
  };
  listado: ClinicaCercana[];
}

// ---------------------------------------------------------
// 2. LÓGICA DE NEGOCIO
// ---------------------------------------------------------

export const getCentrosCercanosBySlug = async (
  supabase: SupabaseClient,
  slug: string,
  radioKm: number = 25
): Promise<DashboardDataClinicasCercanas> => {

  // Definimos la respuesta por defecto en caso de error o de no encontrar datos
  const defaultReturn: DashboardDataClinicasCercanas = {
    stats: { total_clinicas: 0, total_dentistas: 0 },
    listado: [],
  };

  // PASO 1: PETICIÓN DE COORDENADAS A LA LANDING
  const { data: landingData, error: landingError } = await supabase
    .from('landings_search_dentistry')
    .select('latitud_gps, longitud_gps')
    .eq('slug', slug)
    .single();

  if (landingError || !landingData || !landingData.latitud_gps || !landingData.longitud_gps) {
    console.error(`Error o falta de coordenadas al consultar la landing con slug '${slug}':`, landingError);
    return defaultReturn;
  }

  // PASO 2: LLAMADA A LA FUNCIÓN ESPACIAL (RPC)
  const { data: clinicasData, error: clinicasError } = await supabase
    .rpc('get_centros_cercanos', {
      user_lat: landingData.latitud_gps,
      user_lng: landingData.longitud_gps,
      radio_km: radioKm
    });

  if (clinicasError) {
    console.error("Error ejecutando la función get_centros_cercanos:", clinicasError);
    return defaultReturn;
  }

  // Conversión segura de tipos
  const clinicas = (clinicasData || []) as ClinicaCercana[];

  // PASO 3: CÁLCULO DE TOTALES (En memoria)
  const totalClinicas = clinicas.length;
  // Aseguramos que staff_count se trate como número en la suma (a veces el BIGINT de Postgres llega como string dependiendo del driver)
  const totalDentistas = clinicas.reduce((acc, curr) => acc + Number(curr.staff_count || 0), 0);

  // PASO 4: RETORNO DE DATOS
  return {
    stats: {
      total_clinicas: totalClinicas,
      total_dentistas: totalDentistas,
    },
    listado: clinicas,
  };
};