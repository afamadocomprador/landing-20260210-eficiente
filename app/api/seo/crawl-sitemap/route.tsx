//app/api/seo/crawl-sitemap/route.ts


import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { sitemapUrl } = await req.json();

    if (!sitemapUrl) {
      return NextResponse.json({ success: false, error: 'Falta la URL del sitemap' }, { status: 400 });
    }

    const response = await fetch(sitemapUrl);
    if (!response.ok) throw new Error(`No se pudo leer el sitemap: ${response.status}`);
    const mainXml = await response.text();

    const pagesToScan: { url: string, category: string }[] = [];
    const debugLogs: string[] = []; // <-- Guardaremos aquí qué pasa internamente
    
    if (mainXml.includes('<sitemapindex')) {
      debugLogs.push('Detectado Sitemap Index (Multi-fichero).');
      
      // Usamos [\s\S]*? para capturar aunque haya saltos de línea y .trim() para limpiar
      const sitemapRegex = /<loc>([\s\S]*?)<\/loc>/g;
      let match;
      
      while ((match = sitemapRegex.exec(mainXml)) !== null) {
        const subSitemapUrl = match[1].trim();
        let category = 'general';
        
        const nameMatch = subSitemapUrl.match(/sitemap-(.*?)\.xml/);
        if (nameMatch) {
          category = nameMatch[1];
        }

        const fetchUrl = subSitemapUrl.replace('localhost', '127.0.0.1');
        
        try {
          const subRes = await fetch(fetchUrl);
          if (!subRes.ok) {
            debugLogs.push(`❌ Error HTTP ${subRes.status} al descargar: ${subSitemapUrl}`);
            continue;
          }
          
          const subXml = await subRes.text();
          const pageRegex = /<loc>([\s\S]*?)<\/loc>/g;
          let pageMatch;
          let foundCount = 0;
          
          while ((pageMatch = pageRegex.exec(subXml)) !== null) {
            pagesToScan.push({ url: pageMatch[1].trim(), category });
            foundCount++;
          }
          
          debugLogs.push(`✅ Leído ${subSitemapUrl} -> Categoría: ${category} -> ${foundCount} páginas.`);
          
        } catch (e: any) {
          debugLogs.push(`❌ Fallo de red al intentar conectar con: ${subSitemapUrl} (${e.message})`);
        }
      }
    } else {
      debugLogs.push('Detectado Sitemap Simple (Páginas directas).');
      const regex = /<loc>([\s\S]*?)<\/loc>/g;
      let match;
      while ((match = regex.exec(mainXml)) !== null) {
        const url = match[1].trim();
        pagesToScan.push({ 
          url, 
          category: url.includes('/tratamientos') ? 'tratamientos' : url.includes('/centros') ? 'centros' : 'general' 
        });
      }
    }

    // Si sigue habiendo 0, ahora veremos por qué
    if (pagesToScan.length === 0) {
      return NextResponse.json({ 
        success: false, 
        error: 'No se encontraron URLs en los sitemaps',
        logs: debugLogs 
      });
    }

    const baseUrl = 'http://localhost:3000';
    const resultados = [];

    for (const item of pagesToScan) {
      const targetUrl = item.url.replace('localhost', '127.0.0.1');

      try {
        const scanRes = await fetch(`${baseUrl}/api/seo/scan`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: targetUrl, category: item.category })
        });
        
        const textRes = await scanRes.text();
        
        try {
          const scanData = JSON.parse(textRes);
          resultados.push({ url: item.url, success: scanData.success, category: item.category });
        } catch (parseError) {
          resultados.push({ url: item.url, success: false, error: 'Status ' + scanRes.status });
        }
      } catch (err: any) {
        resultados.push({ url: item.url, success: false, error: err.message });
      }
    }

    return NextResponse.json({ 
      success: true, 
      total_encontradas: pagesToScan.length,
      logs: debugLogs,
      resultados
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}