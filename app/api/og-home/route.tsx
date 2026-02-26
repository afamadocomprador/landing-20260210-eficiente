import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const baseUrl = `${url.protocol}//${url.host}`;

    // ⚠️ ATENCIÓN: Satori NO soporta .webp. 
    // Asegúrate de tener la imagen hero-dkv.jpg en public/images/
    const imageUrl = `${baseUrl}/images/hero-dkv.jpg`; 

    // 🌟 CARGAMOS TUS ARCHIVOS DE FUENTES REALES DESDE app/fonts/ 🌟
    // Actualizado con los nombres exactos de tus archivos .ttf
    const lemonFontPromise = fetch(new URL('../../fonts/LemonMilkPro-Bold.ttf', import.meta.url)).then((res) => res.arrayBuffer());
    const fsmeFontPromise = fetch(new URL('../../fonts/FSMe-Regular.ttf', import.meta.url)).then((res) => res.arrayBuffer());

    // Esperamos a que se descarguen ambas fuentes en milisegundos
    const [lemonFont, fsmeFont] = await Promise.all([lemonFontPromise, fsmeFontPromise]);

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'row', // Layout en 2 columnas
            backgroundColor: '#ffffff',
            padding: '60px 80px',
          }}
        >
          {/* ========================================== */}
          {/* COLUMNA IZQUIERDA: Textos y Decoración (60%) */}
          {/* ========================================== */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '60%',
              justifyContent: 'center',
              position: 'relative',
              paddingLeft: '40px',
              paddingBottom: '30px',
              paddingTop: '20px',
            }}
          >
            {/* LA LÍNEA DECORATIVA DKV (Calcada de tu MainHero) */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                width: '90%',
                borderLeft: '4px solid #033B37',
                borderBottom: '4px solid #033B37',
                borderBottomLeftRadius: '40px', // La curva inferior
                display: 'flex',
              }}
            >
              {/* Círculo superior */}
              <div style={{ position: 'absolute', top: '-8px', left: '-12px', width: '20px', height: '20px', borderRadius: '50%', border: '4px solid #033B37', backgroundColor: '#ffffff', display: 'flex' }} />
              {/* Círculo inferior derecho */}
              <div style={{ position: 'absolute', bottom: '-12px', right: '-10px', width: '20px', height: '20px', borderRadius: '50%', border: '4px solid #033B37', backgroundColor: '#ffffff', display: 'flex' }} />
            </div>

            {/* ETIQUETA / PÍLDORA */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: 18,
                fontWeight: 700,
                color: '#033B37',
                backgroundColor: '#eaf0e6', // Simula el bg-dkv-green/10
                padding: '8px 24px',
                borderRadius: '9999px',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                marginBottom: 32,
                alignSelf: 'flex-start',
                fontFamily: '"FSME"', // Usa tu fuente corporativa
              }}
            >
              DKV Dentisalud Élite
            </div>

            {/* 🌟 TITULAR GIGANTE (AJUSTADO A 70px) 🌟 */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                fontSize: 70, 
                color: '#033B37', // dkv-green-dark
                lineHeight: 1.2, // Aire suficiente para que no se pisen las letras
                marginBottom: 32,
                fontFamily: '"Lemon"', // 🌟 AQUÍ ACTÚA TU FUENTE LEMONMILK
              }}
            >
              <span style={{ display: 'flex' }}>LO FÁCIL ES</span>
              <span style={{ display: 'flex' }}>CUIDAR</span>
              <span style={{ display: 'flex', color: '#849700' }}>TU SONRISA.</span> {/* dkv-green */}
            </div>

            {/* PÁRRAFO DESCRIPTIVO */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap', // Permite que el texto salte de línea
                fontSize: 28,
                color: '#4b5563', // dkv-gray
                lineHeight: 1.5,
                maxWidth: '95%',
                fontFamily: '"FSME"', // 🌟 AQUÍ ACTÚA TU FUENTE FSME
              }}
            >
              {/* Aplicamos las negritas (fontWeight) que pusiste con los <strong> en tu componente */}
              <span style={{ fontWeight: 700, marginRight: '8px' }}>Acceso</span> 
              <span style={{ marginRight: '8px' }}>sin rodeos. Atención dental de</span> 
              <span style={{ fontWeight: 700, marginRight: '8px' }}>Calidad.</span> 
              <span style={{ marginRight: '8px' }}>Y</span>
              <span style={{ fontWeight: 700, marginRight: '8px' }}>Precios Claros</span> 
              <span>que entiendes desde el principio.</span>
            </div>
          </div>

          {/* ========================================== */}
          {/* COLUMNA DERECHA: La foto circular (40%)      */}
          {/* ========================================== */}
          <div
            style={{
              display: 'flex',
              width: '40%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                width: '450px',
                height: '450px',
                borderRadius: '50%', // Círculo perfecto
                overflow: 'hidden',
                boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
                border: '12px solid white',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageUrl} width="100%" height="100%" style={{ objectFit: 'cover' }} alt="Chica sonriendo" />
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        // 🌟 REGISTRAMOS LAS FUENTES CON SUS NOMBRES CORTOS PARA USARLOS ARRIBA 🌟
        fonts: [
          {
            name: 'Lemon',
            data: lemonFont,
            style: 'normal',
          },
          {
            name: 'FSME',
            data: fsmeFont,
            style: 'normal',
          },
        ],
      }
    );
  } catch (e: any) {
    console.error('Error generando OG Home:', e);
    return new Response(`Failed to generate image`, { status: 500 });
  }
}