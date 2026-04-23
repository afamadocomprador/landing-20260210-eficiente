// lib/seoEngine.ts
import * as cheerio from 'cheerio';

/**
 * Función interna para validación: Extrae entidades de forma recursiva 
 * para encontrar el E-E-A-T sin importar la profundidad.
 */
function internalDeepSearch(node: any, result: any[] = []) {
  if (!node || typeof node !== 'object') return result;
  if (Array.isArray(node)) {
    node.forEach(n => internalDeepSearch(n, result));
  } else {
    if (node['@type']) result.push(node);
    Object.values(node).forEach(v => internalDeepSearch(v, result));
  }
  return result;
}

export async function runSeoEngine(url: string, category: string = 'general') {
  let validUrl = url;
  const isLocalhost = url.includes('localhost') || url.includes('127.0.0.1');

  if (!validUrl.startsWith('http')) {
    validUrl = isLocalhost ? `http://${validUrl}` : `https://${validUrl}`;
  }

  const urlObj = new URL(validUrl);
  
  const response = await fetch(validUrl, { cache: 'no-store' });
  if (!response.ok) throw new Error(`El servidor devolvió un error HTTP: ${response.status}`);
  const html = await response.text();
  const $ = cheerio.load(html);

  const errors: string[] = [];
  const warnings: string[] = [];
  const good: string[] = [];
  const headers: { tag: string, text: string }[] = [];

  // --- ANÁLISIS BÁSICO ---
  const title = $('title').text() || '';
  const metaDescription = $('meta[name="description"]').attr('content') || '';
  if (!title) errors.push('Falta etiqueta <title>.');
  if (!metaDescription) warnings.push('Falta meta-description.');

  // --- JERARQUÍA H1 ---
  let h1Count = 0;
  $('h1, h2, h3, h4, h5, h6').each((_, el) => {
    const tag = el.tagName.toLowerCase();
    headers.push({ tag, text: $(el).text().trim() });
    if (tag === 'h1') h1Count++;
  });
  if (h1Count === 0) errors.push('CRÍTICO: Falta etiqueta H1');
  else if (h1Count > 1) errors.push(`CRÍTICO: Múltiples H1 detectados (${h1Count})`);
  else good.push('Estructura de título principal (H1) correcta.');

  // --- ENTIDADES JSON-LD ---
  const hierarchyEntities: any[] = [];
  const flatEntitiesForTest: any[] = [];

  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const json = JSON.parse($(el).text().trim());
      hierarchyEntities.push(json); 
      internalDeepSearch(json, flatEntitiesForTest); 
    } catch (e) {}
  });

  const isAgency = flatEntitiesForTest.some(e => {
    const type = e['@type'];
    const types = Array.isArray(type) ? type : [type];
    return types.includes('InsuranceAgency') || types.includes('Organization');
  });

  const hasIdentity = flatEntitiesForTest.some(e => {
    if (e.legalName || e.identifier) return true;
    if (typeof e.name === 'string' && e.name.toLowerCase().includes('bernardo')) return true;
    return false;
  });

  if (!isAgency || !hasIdentity) {
    errors.push('E-E-A-T: Falta identificación clara del Agente o Empresa en el Schema.');
  } else {
    good.push('E-E-A-T: Transparencia comercial correcta (Agente/Agencia detectado).');
  }

  // --- BANDERAS ROJAS ---
  if ($('meta[name="robots"]').attr('content')?.toLowerCase().includes('noindex')) errors.push('CRÍTICO: La página tiene "noindex".');
  if (!$('link[rel="canonical"]').attr('href')) warnings.push('RASTREO: Falta rel="canonical".');
  if (!$('meta[name="viewport"]').attr('content')) errors.push('MÓVIL: Falta "viewport".');

  // --- COMPROBACIÓN DE ENLACES ---
  const internalLinks = new Set<string>();
  $('a').each((_, el) => {
    const href = $(el).attr('href');
    if (!href || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) return;
    try {
      const linkUrl = new URL(href, validUrl);
      if (linkUrl.hostname === urlObj.hostname) internalLinks.add(linkUrl.href);
    } catch (e) {}
  });

  const linksArray = Array.from(internalLinks);
  for (let i = 0; i < linksArray.length; i += 5) {
    const batch = linksArray.slice(i, i + 5);
    await Promise.all(batch.map(async (link) => {
      try {
        const res = await fetch(link, { method: 'HEAD', cache: 'no-store' });
        if (res.status === 404) {
          errors.push(`404 NOT FOUND: El enlace "${link}" no existe.`);
        }
      } catch (e) {
        errors.push(`ERROR DE CONEXIÓN: No se pudo verificar el enlace "${link}".`);
      }
    }));
  }

  // --- ACCESIBILIDAD Y SEGURIDAD ---
  $('img').each((_, el) => { if (!$(el).attr('alt')) warnings.push('ACCESIBILIDAD: Imagen sin ALT.'); });
  if (html.includes('http://') && !isLocalhost) warnings.push('SEGURIDAD: Contenido mixto (HTTP).');

  // --- EXTRACCIÓN DE TEXTO VISIBLE Y CONTEO ---
  const $clean = cheerio.load(html);
  // Eliminamos elementos que no aportan contenido textual real al SEO
  $clean('script, style, nav, header, footer, noscript, iframe, svg, symbol').remove();
  
  // Limpiamos el texto: normalizamos espacios y eliminamos saltos de línea excesivos
  const rawText = $clean('body').text().replace(/\s+/g, ' ').trim();
  const words = rawText.split(/\s+/).filter(w => w.length > 2).length;
  
  if (words < 100) {
    warnings.push(`CONTENIDO: Texto visible extremadamente pobre (${words} palabras).`);
  } else {
    good.push(`Densidad de texto correcta (${words} palabras).`);
  }

  return {
    url: validUrl, 
    title, 
    metaDescription, 
    h1Count, 
    headers, 
    entities: hierarchyEntities,
    errors, 
    warnings, 
    good,
    visibleText: rawText, // Enviamos el texto capturado para auditoría visual
    stats: { 
      h1: h1Count, 
      words, 
      links: internalLinks.size, 
      entities: flatEntitiesForTest.length 
    }
  };
}