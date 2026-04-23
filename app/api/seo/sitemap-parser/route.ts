// app/api/seo/sitemap-parser/route.ts

import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

// Función recursiva para navegar por Sitemaps e Índices de Sitemaps
async function extractUrlsFromSitemap(url: string): Promise<string[]> {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Fallo al descargar: ${url}`);
    
    const xml = await res.text();
    // Usamos cheerio en modo XML para que lea correctamente las etiquetas
    const $ = cheerio.load(xml, { xmlMode: true });

    let urls: string[] = [];

    // 1. ¿Es un ÍNDICE de sitemaps? (Contiene <sitemapindex>)
    if ($('sitemapindex').length > 0) {
      // Extraemos las URLs de los sub-sitemaps
      const subSitemaps = $('sitemap > loc').map((_, el) => $(el).text().trim()).get();
      
      // Hacemos la llamada recursiva para cada sub-sitemap
      for (const subSitemapUrl of subSitemaps) {
        const subUrls = await extractUrlsFromSitemap(subSitemapUrl);
        urls = urls.concat(subUrls);
      }
    } 
    // 2. Es un SITEMAP normal (Contiene <urlset>)
    else {
      urls = $('url > loc').map((_, el) => $(el).text().trim()).get();
    }

    return urls;
  } catch (error) {
    console.error(`Error procesando sitemap ${url}:`, error);
    return []; // Si falla un sub-sitemap, devolvemos array vacío para no tumbar todo el proceso
  }
}

export async function POST(req: Request) {
  try {
    const { sitemapUrl } = await req.json();

    if (!sitemapUrl) {
      return NextResponse.json({ success: false, error: 'Falta la URL del sitemap' }, { status: 400 });
    }

    // Arrancamos la extracción recursiva
    const rawUrls = await extractUrlsFromSitemap(sitemapUrl);

    // Limpiamos la lista: 
    // 1. Quitamos duplicados (por si acaso)
    // 2. Filtramos posibles PDFs o imágenes que se hayan colado en el sitemap
    const cleanUrls = [...new Set(rawUrls)].filter(url => {
      const lowerUrl = url.toLowerCase();
      return !lowerUrl.endsWith('.pdf') && !lowerUrl.endsWith('.jpg') && !lowerUrl.endsWith('.png');
    });

    return NextResponse.json({ 
      success: true, 
      count: cleanUrls.length,
      urls: cleanUrls 
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
