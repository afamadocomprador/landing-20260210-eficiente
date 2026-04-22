// app/api/seo/pagespeed/route.ts


import { NextResponse } from 'next/server';

// Limpiamos el Markdown de las descripciones de Google [texto](url)
const cleanDescription = (desc: string) => {
  if (!desc) return '';
  return desc.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1'); 
};

export async function POST(req: Request) {
  try {
    const { url, strategy = 'mobile' } = await req.json();

    if (!url) {
      return NextResponse.json({ success: false, error: 'Falta la URL' }, { status: 400 });
    }

    const encodedUrl = encodeURIComponent(url);
    const categories = '&category=performance&category=accessibility&category=best-practices&category=seo';
    
    const apiKey = process.env.GOOGLE_PAGESPEED_API_KEY;
    const keyParam = apiKey ? `&key=${apiKey}` : ''; 
    
    // MAGIA AQUÍ: Añadimos &hl=es para que Google nos devuelva descripciones y soluciones en castellano
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodedUrl}&strategy=${strategy}${categories}${keyParam}&hl=es`;

    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('Google está saturado (Status 429: Demasiadas peticiones). Espera 1 minuto o configura tu API Key en .env.');
      }
      throw new Error(`Error de Google PSI. Status: ${response.status}`);
    }
    
    const data = await response.json();
    const lighthouse = data.lighthouseResult;

    if (!lighthouse) throw new Error('No se recibió el reporte de Lighthouse de Google');

    const scores = {
      performance: Math.round(lighthouse.categories.performance?.score * 100) || 0,
      accessibility: Math.round(lighthouse.categories.accessibility?.score * 100) || 0,
      bestPractices: Math.round(lighthouse.categories['best-practices']?.score * 100) || 0,
      seo: Math.round(lighthouse.categories.seo?.score * 100) || 0,
    };

    const metrics = {
      lcp: lighthouse.audits['largest-contentful-paint']?.displayValue || 'N/A',
      cls: lighthouse.audits['cumulative-layout-shift']?.displayValue || 'N/A',
      speedIndex: lighthouse.audits['speed-index']?.displayValue || 'N/A',
    };

    // Extraemos TODAS las auditorías que tengan puntuación numérica (0 a 1)
    const getDetailedIssues = (categoryKey: string) => {
      const refs = lighthouse.categories[categoryKey]?.auditRefs || [];
      return refs
        .map((ref: any) => lighthouse.audits[ref.id])
        .filter((audit: any) => audit && typeof audit.score === 'number') // Sin límite de nota, las cogemos TODAS
        .map((audit: any) => ({
           id: audit.id,
           title: audit.title,
           description: cleanDescription(audit.description),
           displayValue: audit.displayValue || null,
           score: audit.score // De 0 (Crítico) a 1 (Perfecto)
        }))
        .sort((a: any, b: any) => a.score - b.score); // Los peores arriba, los perfectos abajo
    };

    const detailedIssues = {
      performance: getDetailedIssues('performance'),
      accessibility: getDetailedIssues('accessibility'),
      bestPractices: getDetailedIssues('best-practices'),
      seo: getDetailedIssues('seo')
    };

    return NextResponse.json({ success: true, scores, metrics, strategy, detailedIssues });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
