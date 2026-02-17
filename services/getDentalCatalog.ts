import { SupabaseClient } from '@supabase/supabase-js';

export interface DentalTreatment {
  id: string;
  treatment_name: string;
  price_value: number;
  is_basic: boolean;
  description_notes: string | null;
  parts?: any[];
}

export const getDentalCatalog = async (supabase: SupabaseClient) => {
  // 1. PETICIÓN A BASE DE DATOS
  const { data: allTreatments, error: tError } = await supabase
    .from('dental_treatments')
    .select('*')
    .order('sort_order', { ascending: true });

  const { data: allCompositions, error: cError } = await supabase
    .from('treatment_composition')
    .select('*');

  if (tError || cError) {
    console.error("Error en DB Dental:", tError || cError);
    return { maestro: [], especial: [] };
  }

  const treatments = allTreatments as DentalTreatment[];

  // 2. FILTRADO: MAESTRO (Simples)
  const maestro = treatments.filter(t => t.is_basic);

  // 3. FILTRADO: ESPECIAL (Compuestos/Packs)
  const especial = treatments
    .filter(t => !t.is_basic)
    .map(compound => {
      const componentsIds = allCompositions
        .filter(c => c.compound_treatment_id === compound.id)
        .map(c => c.basic_treatment_id);

      const parts = maestro.filter(m => componentsIds.includes(m.id));
      
      return {
        ...compound,
        // Si el precio es 0, sumamos sus partes para el SEO
        price_value: compound.price_value > 0 
          ? compound.price_value 
          : parts.reduce((acc, curr) => acc + curr.price_value, 0),
        parts
      };
    });

  return { maestro, especial };
};