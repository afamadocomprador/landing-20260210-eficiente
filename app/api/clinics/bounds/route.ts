// app/api/clinics/bounds/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sw_lat, sw_lng, ne_lat, ne_lng, center_lat, center_lng } = body;

    // Validación básica de seguridad
    if (!sw_lat || !sw_lng || !ne_lat || !ne_lng || !center_lat || !center_lng) {
      return NextResponse.json({ error: 'Faltan parámetros de coordenadas' }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // El servidor hace la consulta, el cliente no sabe nada de esto
    const { data, error } = await supabase.rpc('get_centros_en_bounds', {
      sw_lat, sw_lng, ne_lat, ne_lng, center_lat, center_lng
    });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching clinics by bounds:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
