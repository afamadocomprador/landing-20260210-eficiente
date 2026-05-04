// app/api/dictionary/route.ts

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// 🌟 REVALIDACIÓN (La clave del rendimiento)
// Le decimos a Next.js: "Guarda esta respuesta en caché durante 24 horas (86400 segundos)".
// Durante ese tiempo, Supabase no recibirá ni una sola petición por esto.
export const revalidate = 86400; 

export async function GET() {
  try {
    // Creamos el cliente de Supabase (aquí podrías usar el service_role key si la tabla fuera privada, 
    // pero anon key está bien para lectura pública)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // Hacemos la consulta a la vista predictiva
    const { data, error } = await supabase
      .from('vw_search_predictive')
      .select('*')
      .limit(9000); // Mismo límite que tenías

    if (error) {
      console.error('Error fetching dictionary:', error);
      return NextResponse.json({ error: 'Failed to fetch dictionary' }, { status: 500 });
    }

    // Devolvemos los datos con cabeceras de caché estrictas para el navegador
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
      },
    });

  } catch (error) {
    console.error('Unexpected error in dictionary route:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}