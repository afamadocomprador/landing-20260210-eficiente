// app/api/seo/scan/route.ts

import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { url, category = 'general' } = await req.json();

    if (!url) return NextResponse.json({ success: false, error: 'Falta la URL' }, { status: 400 });

    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    const html = await response.text();
    
    const $ = cheerio.load(html);

    const title = $('title').text() || '';
    const metaDescription = $('meta[name="description"]').attr('content') || '';
    
    const headers: { tag: string, text: string }[] = [];
    const seoErrors: string[] = [];
    const allHeaders = $('h1, h2, h3, h4, h5, h6');

    let lastLevel = 0;
    let h1Count = 0;

    allHeaders.each((_, el) => {
      const tag = el.tagName.toLowerCase();
      const level = parseInt(tag.substring(1));
      const text = $(el).text().trim();

      headers.push({ tag, text });
      if (tag === 'h1') h1Count++;

      if (lastLevel > 0 && level > lastLevel + 1) {
        seoErrors.push(`Salto de jerarquía: de H${lastLevel} a H${level} ("${text.substring(0, 20)}...")`);
      }
      lastLevel = level;
    });

    if (h1Count === 0) seoErrors.push('CRÍTICO: Falta etiqueta H1');
    if (h1Count > 1) seoErrors.push(`CRÍTICO: Múltiples H1 detectados (${h1Count})`);
    if (!metaDescription) seoErrors.push('Falta meta-description');
    else if (metaDescription.length < 120) seoErrors.push(`Meta-description corta (${metaDescription.length} chars)`);

    if (category === 'tratamientos') {
      const h2Indices = headers.map((h, i) => (h.tag === 'h2' ? i : -1)).filter((i) => i !== -1);
      for (let j = 0; j < h2Indices.length - 1; j++) {
        const currentIndex = h2Indices[j];
        const nextIndex = h2Indices[j + 1];
        const etiquetasIntermedias = headers.slice(currentIndex + 1, nextIndex);
        const tienePrecioH3 = etiquetasIntermedias.some((h) => h.tag === 'h3');

        if (!tienePrecioH3) {
          const h2Text = headers[currentIndex].text;
          seoErrors.push(`REGLA TRATAMIENTOS: Falta precio (H3) bajo "${h2Text.substring(0, 35)}..."`);
        }
      }
    }

    // --- CORRECCIÓN: EXTRACCIÓN ROBUSTA DE ENTIDADES ---
    const entities: any[] = [];
    $('script[type="application/ld+json"]').each((_, el) => {
      try {
        // Usamos .text() para evitar la conversión de comillas a &quot;
        const jsonText = $(el).text();
        
        if (jsonText && jsonText.trim() !== '') {
          // Parseamos el texto limpio
          const parsed = JSON.parse(jsonText.trim());
          
          if (Array.isArray(parsed)) {
            entities.push(...parsed);
          } else {
            entities.push(parsed);
          }
        }
      } catch (e: any) {
        // Ahora, si hay un error en el código de tu Schema, el crawler te lo chivará en el panel
        seoErrors.push(`ADVERTENCIA SCHEMA: Hay un error de sintaxis en el JSON-LD de esta página. Detalle: ${e.message}`);
      }
    });

    // Guardar en Supabase
    const { error: dbError } = await supabaseAdmin
      .from('seo_audits')
      .upsert({
        url,
        title,
        meta_description: metaDescription,
        h1_count: h1Count,
        headers_structure: headers,
        seo_errors: seoErrors,
        category,
        entities, 
        last_scan: new Date().toISOString()
      }, { onConflict: 'url' });

    if (dbError) throw dbError;

    return NextResponse.json({ 
      success: true, 
      data: { url, h1Count, errorsFound: seoErrors.length } 
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}