// app/api/maps/generate/route.ts

import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const { slugs } = await req.json();

    if (!slugs || slugs.length === 0) {
      return NextResponse.json({ error: 'No se recibieron slugs' }, { status: 400 });
    }

    const browser = await puppeteer.launch({ 
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-web-security',
        '--ignore-gpu-blocklist'
      ]
    });
    const page = await browser.newPage();
    
    // Disfraz de usuario real
    await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1');
    
    // ⚡️ Ajustamos el tamaño fijo de móvil (iPhone estándar)
    await page.setViewport({ width: 375, height: 812 });

    const dirPath = path.join(process.cwd(), 'public/images/maps');
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    for (const slug of slugs) {
      const realUrl = `http://localhost:3000/dentistas/${slug}`;
      console.log(`📸 Capturando móvil para: ${slug}...`);
      
      try {
        await page.goto(realUrl, { waitUntil: 'networkidle0', timeout: 30000 });

        // Limpieza del DOM
        await page.evaluate(() => {
          document.querySelectorAll('header, nav').forEach(el => {
            (el as HTMLElement).style.setProperty('display', 'none', 'important');
          });

          document.querySelectorAll('*').forEach(el => {
            const style = window.getComputedStyle(el);
            if ((style.position === 'fixed' || style.position === 'sticky') && !el.closest('#mapa-buscador')) {
              (el as HTMLElement).style.setProperty('display', 'none', 'important');
            }
          });

          const mapaSection = document.querySelector('#mapa-buscador');
          if (mapaSection) {
            mapaSection.scrollIntoView({ behavior: 'instant', block: 'center' });
          }
        });

        // Espera para carga de tiles del mapa
        await new Promise(resolve => setTimeout(resolve, 4500));

        const filePath = path.join(dirPath, `${slug}-mobile.webp`);
        const mapElement = await page.$('#mapa-buscador');
        
        if (mapElement) {
          await mapElement.screenshot({ 
            path: filePath, 
            type: 'webp', 
            quality: 80 // Bajamos un poco el peso para móvil
          });
          console.log(`   ✅ Guardado: ${slug}-mobile.webp`);
        }
      } catch (err) {
        console.error(`   ❌ Error en ${slug}:`, err);
      }
    }

    await browser.close();
    return NextResponse.json({ success: true });

  } catch (globalError) {
    console.error("Error crítico:", globalError);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
