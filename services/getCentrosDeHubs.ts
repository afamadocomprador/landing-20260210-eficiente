import { SupabaseClient } from '@supabase/supabase-js';

// ---------------------------------------------------------
// 1. DEFINICIÓN DE TIPOS (Interfaces)
// ---------------------------------------------------------
export interface CentroDeHubConDatos {
  codigo_ine_municipio: string;
  codigo_hub: string;
  nombre_centro_de_hub: string;
  slug_centro_de_hub: string;
  lat_centro_de_hub: number | null;
  lng_centro_de_hub: number | null;
  num_centros_centro_de_hub: number;
  num_dentistas_centro_de_hub: number;
}

export interface DashboardDataCentroDeHub {
  stats: {
    //total_centro_centros: number;
    //total_centro_dentistas: number;
    total_hub_centros: number;
    total_hub_dentistas: number;
  };
  listado: CentroDeHubConDatos[];
}

// ---------------------------------------------------------
// 2. LÓGICA DE NEGOCIO
// ---------------------------------------------------------

// Aceptamos el cliente "supabase" como parámetro
export const getDatosCentrosDeHub = async (
  supabase: SupabaseClient, 
  codigo_ine_municipio: string, 
  codigo_hub: string, 
): Promise<DashboardDataCentroDeHub> => {


  
  // 1. PETICIÓN A BASE DE DATOS
  const { data, error } = await supabase
    .from('view_centros_hubs')
    .select('*')
    .eq('codigo_ine_municipio', codigo_ine_municipio)
    .eq('codigo_hub', codigo_hub);


  if (error) {
    console.error("Error fetching centros:", error);
    return { 
      //stats: { total_centro_centros: 0, total_centro_dentistas: 0 }, 
      stats: { total_hub_centros: 0, total_hub_dentistas: 0 }, 
      listado: [] 
    };
  }

  // Conversión segura de tipos
  const centros = data as CentroDeHubConDatos[];

  // 2. CÁLCULO DE TOTALES (En memoria)
  // Sumamos los valores individuales para obtener el total de la provincia
  const totalCentros = centros.reduce((acc, curr) => acc + curr.num_centros_centro_de_hub, 0);
  const totalDentistas = centros.reduce((acc, curr) => acc + curr.num_dentistas_centro_de_hub, 0);

  //console.log('totalCentros:',totalCentros);
  //console.log('totalDentistas:',totalDentistas);


  // 3. RETORNO DE DATOS
  return {
    stats: {
      total_hub_centros: totalCentros,
      total_hub_dentistas: totalDentistas,
    },
    listado: centros,
  };
};