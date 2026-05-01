// app/api/seo/scan/route.ts

// app/api/seo/scan/route.ts

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { runSeoEngine } from '@/lib/seoEngine';

// 1. AÑADE ESTO: Bloquea la pre-renderización en el build
export const dynamic = 'force-dynamic';


export async function POST(req: Request) {

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  try {
    const { url, category = 'general' } = await req.json();
    if (!url) return NextResponse.json({ success: false, error: 'Falta URL' }, { status: 400 });

    // Llamamos al mismo motor central
    const data = await runSeoEngine(url, category);

    // Unimos errores y warnings para guardarlos en la base de datos en una sola columna de alertas
    const allErrors = [...data.errors, ...data.warnings];

    // Guardamos los resultados en Supabase
    const { error: dbError } = await supabaseAdmin.from('seo_audits').upsert({
      url: data.url,
      title: data.title,
      meta_description: data.metaDescription,
      h1_count: data.h1Count,
      headers_structure: data.headers,
      seo_errors: allErrors,
      category,
      entities: data.entities,
      // --- AQUÍ AÑADIMOS LOS CAMPOS DE AUDITORÍA DE TEXTO ---
      word_count: data.stats.words,
      visible_text: data.visibleText,
      // -----------------------------------------------------
      last_scan: new Date().toISOString()
    }, { onConflict: 'url' });

    if (dbError) throw dbError;

    // Devolvemos el resultado al frontend (al Global Scanner)
    return NextResponse.json({ 
      success: true, 
      data: { errorsFound: allErrors.length } 
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}