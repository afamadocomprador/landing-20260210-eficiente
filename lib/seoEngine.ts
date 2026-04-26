// lib/seoEngine.ts

// lib/seoEngine.ts
import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';

/**
 * Función robusta para limpiar y parsear JSON-LD
 * Evita fallos de parseo por etiquetas HTML o espacios inyectados
 */
function parseJsonLd(content: string) {
  try {
    const cleanJson = content.replace(/<\/?[^>]+(>|$)/g, "").trim();
    return JSON.parse(cleanJson);
  } catch (e) {
    return null;
  }
}

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

  // ⚡️ NUEVO MOTOR: Usamos Puppeteer para ejecutar JavaScript
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'] 
  });

  const page = await browser.newPage();

  // ⚡️ MEJORA 1: Viewport de escritorio para capturar más componentes de un vistazo
  await page.setViewport({ width: 1920, height: 1080 });
  
  // Le decimos que espere hasta que no haya conexiones de red (JS ejecutado)
  await page.goto(validUrl, { waitUntil: 'networkidle2', timeout: 30000 });
  

  // ⚡️ MEJORA 2: Auto-scroll hacia abajo para disparar los componentes "ScrollReveal" y "next/dynamic"
  await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
      let totalHeight = 0;
      const distance = 300;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100); // Baja cada 100ms
    });
  });
  // Damos 1 segundo extra de gracia para que React termine de hidratar e inyectar el texto
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Extraemos el HTML FINAL, con todo el JS ya cargado
  const html = await page.content();
  await browser.close();

  // Le pasamos el HTML completo a Cheerio
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

  // ⚡️ MEJORA APLICADA: Extracción robusta de JSON-LD usando .html() y parseJsonLd
  $('script[type="application/ld+json"]').each((_, el) => {
    const content = $(el).html() || $(el).text(); // Priorizamos html() para evitar codificaciones de texto

    // ⚡️ CHIVATO AÑADIDO: Veremos en la terminal de Vercel/Local si detecta el script
    console.log("\n--- DETECTADO SCRIPT JSON-LD ---");
    console.log("Contenido crudo (primeros 150 chars):", content.substring(0, 150));

    const json = parseJsonLd(content);
    if (json) {
      hierarchyEntities.push(json); 
      internalDeepSearch(json, flatEntitiesForTest); 
    }
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
  $('img')
    .not('.leaflet-tile, .leaflet-marker-icon, .maplibregl-canvas, [src*="cartocdn.com"], [role="presentation"]')
    .each((_, el) => {
      if (!$(el).attr('alt')) warnings.push('ACCESIBILIDAD: Imagen sin ALT.');
    });

  if (!isLocalhost) {
    let hasMixedContent = false;
    $('img, script, iframe, link[rel="stylesheet"]').each((_, el) => {
      const src = $(el).attr('src') || '';
      const href = $(el).attr('href') || '';
      if (src.startsWith('http://') || href.startsWith('http://')) {
        hasMixedContent = true;
      }
    });

    if (hasMixedContent) {
      warnings.push('SEGURIDAD: Contenido mixto. Se están cargando imágenes, scripts o estilos a través de HTTP.');
    }
  }

  // --- EXTRACCIÓN DE TEXTO VISIBLE Y CONTEO ---
  const $clean = cheerio.load(html);
  $clean('script, style, nav, header, footer, noscript, iframe, svg, symbol').remove();
  
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
    visibleText: rawText,
    stats: { 
      h1: h1Count, 
      words, 
      links: internalLinks.size, 
      entities: flatEntitiesForTest.length 
    }
  };
}
