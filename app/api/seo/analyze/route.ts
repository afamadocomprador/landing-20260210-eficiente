// app/api/seo/analyze/route.ts

// app/api/seo/analyze/route.ts
import { NextResponse } from 'next/server';
import { runSeoEngine } from '@/lib/seoEngine';

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    console.log("Iniciando análisis para:", url);

    // Llamamos al motor central
    const data = await runSeoEngine(url);

    // Formateamos para que la interfaz del Doctor SEO lo entienda
    return NextResponse.json({
      critical: data.errors || [],
      warnings: data.warnings || [],
      good: data.good || [],
      entities: data.entities || [], // ⚡️ LÍNEA AÑADIDA
      stats: data.stats || { h1: 0, words: 0, links: 0, entities: 0 }
    });
    
  } catch (error: any) {
    console.error("ERROR CRÍTICO EN DOCTOR SEO:", error);
    // 🌟 RED DE SEGURIDAD: Si el servidor falla, forzamos a que la interfaz dibuje el error en rojo
    return NextResponse.json({
      critical: [`Error interno del servidor al analizar la URL: ${error.message}`],
      warnings: [],
      good: [],
      entities: [], // ⚡️ LÍNEA AÑADIDA
      stats: { h1: 0, words: 0, links: 0, entities: 0 }
    });
  }
}
