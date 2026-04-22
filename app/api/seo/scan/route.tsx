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
    const seoErrors: string[] = [];
    const headers: { tag: string, text: string }[] = [];
    
    let lastLevel = 0;
    let h1Count = 0;

    // --- 1. EXTRACCIÓN Y SALTOS DE JERARQUÍA ---
    $('h1, h2, h3, h4, h5, h6').each((_, el) => {
      const tag = el.tagName.toLowerCase();
      const level = parseInt(tag.substring(1));
      const text = $(el).text().trim();

      headers.push({ tag, text });
      if (tag === 'h1') h1Count++;

      // Detección de saltos (ej: H2 a H4)
      if (lastLevel > 0 && level > lastLevel + 1) {
        seoErrors.push(`ESTRUCTURA ROTA: Salto de jerarquía de H${lastLevel} a H${level} ("${text.substring(0, 20)}...")`);
      }
      lastLevel = level;
    });

    if (h1Count === 0) seoErrors.push('CRÍTICO: Falta etiqueta H1');
    if (h1Count > 1) seoErrors.push(`CRÍTICO: Múltiples H1 detectados (${h1Count})`);
    if (h1Count === 1 && headers.find(h => h.tag === 'h1')?.text.length! < 15) {
      seoErrors.push('CALIDAD: H1 demasiado pobre o corto.');
    }

    // --- 2. ANÁLISIS SEMÁNTICO AVANZADO (ANTI-SPAM) ---
    const h1s = headers.filter(h => h.tag === 'h1');
    const subHeaders = headers.filter(h => h.tag !== 'h1');
    const h1TextLower = h1s.length > 0 ? h1s[0].text.toLowerCase() : '';

    if (subHeaders.length > 0 && h1TextLower.length > 5) {
      // A. Keyword Stuffing
      let repetitionCount = 0;
      subHeaders.forEach(h => {
        if (h.text.toLowerCase().includes(h1TextLower)) repetitionCount++;
      });
      const repetitionRatio = repetitionCount / subHeaders.length;
      if (repetitionRatio > 0.4) {
        seoErrors.push(`SOBRE-OPTIMIZACIÓN: El texto del H1 se repite en el ${Math.round(repetitionRatio * 100)}% de las cabeceras.`);
      }

      // B. Redundancia Padre-Hijo
      for (let i = 0; i < headers.length - 1; i++) {
        const curr = headers[i];
        const next = headers[i + 1];
        if (parseInt(next.tag.substring(1)) > parseInt(curr.tag.substring(1))) {
          const currClean = curr.text.toLowerCase().replace(/[^\w\sáéíóú]/g, '').trim();
          const nextClean = next.text.toLowerCase().replace(/[^\w\sáéíóú]/g, '').trim();
          if (currClean.length > 10 && nextClean.includes(currClean)) {
            seoErrors.push(`REDUNDANCIA: El ${next.tag.toUpperCase()} repite el texto de su cabecera superior ("${currClean.substring(0, 15)}...").`);
          }
        }
      }

      // C. Patrones Robóticos
      const prefixes: Record<string, number> = {};
      subHeaders.forEach(h => {
        const words = h.text.toLowerCase().split(' ');
        if (words.length >= 2) {
          const prefix = `${words[0]} ${words[1]}`;
          prefixes[prefix] = (prefixes[prefix] || 0) + 1;
        }
      });
      const roboticPrefix = Object.entries(prefixes).find(([_, count]) => count >= 3);
      if (roboticPrefix) {
        seoErrors.push(`PATRÓN ROBÓTICO: ${roboticPrefix[1]} cabeceras empiezan igual ("${roboticPrefix[0]}...").`);
      }
    }

    // --- 3. REGLAS DE NEGOCIO (PRECIOS EN TRATAMIENTOS) ---
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

    // --- 4. EXTRACCIÓN Y VALIDACIÓN DE ENTIDADES JSON-LD ---
    const entities: any[] = [];
    $('script[type="application/ld+json"]').each((_, el) => {
      try {
        const jsonText = $(el).text().trim();
        if (jsonText) {
          const json = JSON.parse(jsonText);
          if (Array.isArray(json)) entities.push(...json); else entities.push(json);
        }
      } catch (e: any) {
        seoErrors.push(`ERROR SCHEMA: JSON-LD mal formado. Detalle: ${e.message}`);
      }
    });

    if (entities.length === 0) {
      seoErrors.push('CRÍTICO: No se han detectado entidades JSON-LD. Invisible semánticamente.');
    }


// --- 5. E-E-A-T, SEGURIDAD Y METADATOS ---
    
    // Adaptado para Agencias de Seguros: Buscamos transparencia comercial
    const isAgencyInSchema = entities.some(e => 
      Array.isArray(e['@type']) ? e['@type'].includes('InsuranceAgency') : e['@type'] === 'InsuranceAgency'
    );
    const hasLegalName = entities.some(e => e.legalName || e.identifier);

    if (!isAgencyInSchema || !hasLegalName) {
      seoErrors.push('E-E-A-T: Falta identificación clara del Agente o Empresa en el Schema.');
    }

    let mixed = false;
    $('img, script, link').each((_, el) => {
      const src = $(el).attr('src') || $(el).attr('href');
      if (src && src.startsWith('http:')) mixed = true;
    });
    if (mixed) seoErrors.push('SEGURIDAD: Recursos cargando por HTTP (Contenido mixto).');

    if (!metaDescription) seoErrors.push('Falta meta-description.');
    
    let noAlt = 0;
    $('img').each((_, el) => { if (!$(el).attr('alt')) noAlt++; });
    if (noAlt > 0) seoErrors.push(`ACCESIBILIDAD: ${noAlt} imágenes sin atributo "alt".`);

    $('script, style, nav, header, footer').remove();
    const words = $('body').text().split(/\s+/).filter(w => w.length > 2).length;
    if (words < 100) seoErrors.push('CONTENIDO: Texto visible extremadamente pobre.');



    // --- 6. GUARDADO EN BASE DE DATOS ---
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