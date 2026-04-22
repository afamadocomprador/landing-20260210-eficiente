// app/api/seo/analyze/route.ts


import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    if (!url) return NextResponse.json({ success: false, error: 'Falta la URL' }, { status: 400 });

    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    const html = await response.text();
    const $ = cheerio.load(html);

    const report = {
      critical: [] as string[],
      warnings: [] as string[],
      good: [] as string[],
      stats: { words: 0, links: 0, images: 0, entities: 0, headersTotal: 0 }
    };

    // --- 1. AUDITORÍA DE URL (Calidad y Estructura) ---
    const urlObj = new URL(url);
    if (url.length > 75) report.warnings.push(`URL excesivamente larga (${url.length} carac.). Google prefiere URLs cortas.`);
    if (/[A-Z]/.test(url)) report.warnings.push('URL contiene mayúsculas. Esto puede causar contenido duplicado en algunos servidores.');
    if (urlObj.searchParams.toString()) report.warnings.push('URL con parámetros dinámicos detectada. Considera usar URLs amigables (slugs).');
    if (urlObj.protocol !== 'https:') report.critical.push('SEGURIDAD: La página no utiliza HTTPS. Google penaliza drásticamente sitios no seguros.');

    // --- 2. SEGURIDAD: CONTENIDO MIXTO ---
    let mixedContent = 0;
    $('img, script, link').each((_, el) => {
      const src = $(el).attr('src') || $(el).attr('href');
      if (src && src.startsWith('http:')) mixedContent++;
    });
    if (mixedContent > 0) report.critical.push(`CONTENIDO MIXTO: ${mixedContent} recursos cargan por HTTP. Google marcará el sitio como "No Seguro".`);

// --- 3. SEÑALES E-E-A-T (Transparencia y Autoridad Comercial) ---
    // Al comercializar seguros de salud, Google evalúa la claridad del vendedor, no la autoría clínica.
    let hasAgencySchema = false;
    let hasAgentInfo = false;

    $('script[type="application/ld+json"]').each((_, el) => {
      const text = $(el).text();
      if (text.includes('InsuranceAgency')) hasAgencySchema = true;
      if (text.includes('Bernardo') || text.includes('Agente')) hasAgentInfo = true;
    });

    const date = $('meta[property="article:modified_time"]').attr('content') || $('time').attr('datetime') || $('body').text().match(/actualizado el \d{2}\/\d{2}\/\d{4}/i);
    
    if (!hasAgencySchema || !hasAgentInfo) {
      report.warnings.push('E-E-A-T: No se detecta claramente la entidad comercial (Agencia de Seguros) en el Schema JSON-LD.');
    } else {
      report.good.push('E-E-A-T: Transparencia comercial correcta. Agente y Aseguradora identificados en el código.');
    }

    if (!date) {
      report.warnings.push('E-E-A-T: Sugerencia: Añadir fecha de actualización. El contenido de salud/tarifas debe percibirse como fresco.');
    } else {
      report.good.push('Señales de frescura detectadas (Fecha de actualización).');
    }
    // --- 4. OPTIMIZACIÓN SOCIAL (Open Graph) ---
    const ogTitle = $('meta[property="og:title"]').attr('content');
    const ogImg = $('meta[property="og:image"]').attr('content');
    if (!ogTitle || !ogImg) report.warnings.push('RRSS: Faltan etiquetas Open Graph. La landing no se verá bien al compartirla en WhatsApp o Facebook.');
    else report.good.push('Etiquetas Open Graph configuradas correctamente.');

    // --- 5. ANÁLISIS SEMÁNTICO DE CABECERAS (ANTI-SPAM) ---
    const headers: { tag: string, text: string }[] = [];
    $('h1, h2, h3, h4, h5, h6').each((_, el) => {
      headers.push({ tag: el.tagName.toLowerCase(), text: $(el).text().trim() });
    });
    report.stats.headersTotal = headers.length;
    const h1Text = headers.find(h => h.tag === 'h1')?.text.toLowerCase() || '';
    const subHeaders = headers.filter(h => h.tag !== 'h1');

    if (h1Text && subHeaders.length > 0) {
      let repetitions = subHeaders.filter(h => h.text.toLowerCase().includes(h1Text)).length;
      if (repetitions / subHeaders.length > 0.4) {
        report.critical.push('KEYWORD STUFFING: El título H1 se repite demasiado en las subcabeceras.');
      }
      // Patrón robótico
      const prefixes = subHeaders.map(h => h.text.toLowerCase().split(' ').slice(0, 2).join(' '));
      const isRobotic = prefixes.some((p, i) => prefixes.indexOf(p) !== i && p.length > 5);
      if (isRobotic) report.warnings.push('PATRÓN ROBÓTICO: Varias cabeceras empiezan con las mismas palabras.');
    }

    // --- 6. ENTIDADES JSON-LD ---
    const jsonLd = $('script[type="application/ld+json"]');
    report.stats.entities = jsonLd.length;
    if (jsonLd.length === 0) {
      report.critical.push('FALTAN ENTIDADES: No hay marcado Schema. Imprescindible para el SEO Semántico moderno.');
    }

    // --- 7. CONTENIDO MÓVIL ---
    $('script, style, nav, header, footer').remove();
    const words = $('body').text().split(/\s+/).filter(w => w.length > 2).length;
    report.stats.words = words;
    if (words < 100) report.warnings.push('Contenido muy breve para ser indexado con fuerza.');
    else if (words < 350) report.good.push('Landing directa y clara: Excelente para conversión móvil.');

    return NextResponse.json({ success: true, report });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
