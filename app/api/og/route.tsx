import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const url = new URL(request.url);
    const baseUrl = `${url.protocol}//${url.host}`;

    // 1. Recogemos la variable del título
    let rawTitle = searchParams.get('title') || 'Dentistas cerca de ti';
    rawTitle = rawTitle.toUpperCase();

    // 2. LÓGICA INTELIGENTE: Extraemos SOLO el nombre de la ciudad
    let cityName = 'CERCA DE TI';
    if (rawTitle.startsWith('DENTISTAS EN ')) {
      cityName = rawTitle.replace('DENTISTAS EN ', '');
    } else if (rawTitle.startsWith('DENTISTAS ')) {
      cityName = rawTitle.replace('DENTISTAS ', '');
    } else if (rawTitle !== 'DENTISTAS') {
      cityName = rawTitle; // Por si nos mandan la ciudad suelta
    }

    // 3. Misma foto y fuentes
    const imageUrl = `${baseUrl}/images/hero-dkv.jpg`; 
    const lemonFontPromise = fetch(new URL('../../fonts/LemonMilkPro-Bold.ttf', import.meta.url)).then((res) => res.arrayBuffer());
    const fsmeFontPromise = fetch(new URL('../../fonts/FSMe-Regular.ttf', import.meta.url)).then((res) => res.arrayBuffer());

    const [lemonFont, fsmeFont] = await Promise.all([lemonFontPromise, fsmeFontPromise]);

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'row', 
            backgroundColor: '#ffffff',
            padding: '60px 80px',
          }}
        >
          {/* ========================================== */}
          {/* COLUMNA IZQUIERDA: Texto y Decoración (60%) */}
          {/* ========================================== */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '60%',
              justifyContent: 'center', 
              alignItems: 'flex-start',
              paddingLeft: '65px', 
            }}
          >
            {/* CONTENEDOR RELATIVO DEL TEXTO */}
            <div style={{ display: 'flex', position: 'relative', flexDirection: 'column' }}>
              
              {/* LA LÍNEA DECORATIVA CON MÁRGENES MATEMÁTICAMENTE EXACTOS */}
              <div
                style={{
                  position: 'absolute',
                  top: '-45px',         
                  left: '-45px',     
                  bottom: '-45px',   
                  right: '-15px',      
                  borderLeft: '4px solid #033B37', 
                  borderBottom: '4px solid #033B37',
                  borderBottomLeftRadius: '40px', 
                  display: 'flex',
                }}
              >
                {/* Círculo Superior Izquierdo */}
                <div style={{ position: 'absolute', top: '-10px', left: '-12px', width: '20px', height: '20px', borderRadius: '50%', border: '4px solid #033B37', backgroundColor: '#ffffff', display: 'flex' }} />
                {/* Círculo Inferior Derecho */}
                <div style={{ position: 'absolute', bottom: '-12px', right: '-10px', width: '20px', height: '20px', borderRadius: '50%', border: '4px solid #033B37', backgroundColor: '#ffffff', display: 'flex' }} />
              </div>

              {/* 🌟 TITULAR DINÁMICO CONTROLADO 🌟 */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  fontSize: 65, 
                  lineHeight: 1.1,
                  fontFamily: '"LemonMILK"',
                  textTransform: 'uppercase',
                  maxWidth: '520px', 
                }}
              >
                {/* LÍNEAS ESTATICAS: Verde oscuro */}
                <span style={{ display: 'flex', color: '#033B37' }}>ENCUENTRA</span>
                <span style={{ display: 'flex', color: '#033B37' }}>TU DENTISTA</span>
                
                {/* 🌟 LÓGICA AÑADIDA: Oculta "EN" si es "CERCA DE TI" 🌟 */}
                {cityName !== 'CERCA DE TI' && (
                  <span style={{ display: 'flex', color: '#033B37' }}>EN</span>
                )}
                
                {/* CIUDAD: Verde claro pistacho */}
                <div style={{ display: 'flex', flexWrap: 'wrap', color: '#849700', marginTop: '0px' }}>
                  {cityName.split(' ').map((word, index) => (
                    <span key={index} style={{ display: 'flex', marginRight: '16px' }}>
                      {word}
                    </span>
                  ))}
                </div>
              </div>

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
                borderRadius: '50%', 
                overflow: 'hidden',
                boxShadow: '0 25px 50px rgba(0,0,0,0.15)', 
                border: '12px solid white', 
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageUrl} width="100%" height="100%" style={{ objectFit: 'cover' }} alt="Dentista DKV" />
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          { name: 'LemonMILK', data: lemonFont, style: 'normal' },
          { name: 'FSME', data: fsmeFont, style: 'normal' },
        ],
      }
    );
  } catch (e: any) {
    console.error('Error generando OG:', e);
    return new Response(`Failed to generate image`, { status: 500 });
  }
}