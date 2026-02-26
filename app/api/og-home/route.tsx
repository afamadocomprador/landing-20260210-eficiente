import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const baseUrl = `${url.protocol}//${url.host}`;

    // Asegúrate de tener la imagen hero-dkv.jpg en public/images/
    const imageUrl = `${baseUrl}/images/hero-dkv.jpg`; 

    // CARGAMOS TUS ARCHIVOS DE FUENTES REALES
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
              // 🌟 CLAVE: Esto hace que el contenedor abrace el texto exactamente
              alignItems: 'flex-start',
              // Movido un pelín más a la izquierda (antes estaba en 80/50, lo dejamos en 65)
              paddingLeft: '65px', 
            }}
          >
            {/* CONTENEDOR RELATIVO DEL TEXTO */}
            <div style={{ display: 'flex', position: 'relative' }}>
              
              {/* 🌟 LA LÍNEA DECORATIVA CON MÁRGENES MATEMÁTICAMENTE EXACTOS 🌟 */}
              <div
                style={{
                  position: 'absolute',
                  // Distancia superior, izquierda e inferior EXACTAMENTE IGUALES (45px)
                  top: '-45px',         
                  left: '-45px',     
                  bottom: '-45px',   
                  // Se estira hacia la derecha para recoger el punto final
                  right: '-15px',      
                  borderLeft: '4px solid #033B37', 
                  borderBottom: '4px solid #033B37',
                  borderBottomLeftRadius: '40px', 
                  display: 'flex',
                }}
              >
                {/* Círculo Superior Izquierdo */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-10px',      
                    left: '-12px',     
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    border: '4px solid #033B37',
                    backgroundColor: '#ffffff',
                    display: 'flex',
                  }}
                />
                {/* Círculo Inferior Derecho (abrazando el punto) */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-12px',   
                    right: '-10px',    
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    border: '4px solid #033B37',
                    backgroundColor: '#ffffff',
                    display: 'flex',
                  }}
                />
              </div>

              {/* TITULAR GIGANTE */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  fontSize: 70, 
                  color: '#033B37', 
                  lineHeight: 1.2,
                  fontFamily: '"LemonMILK"',
                }}
              >
                <span style={{ display: 'flex' }}>LO FÁCIL ES</span>
                <span style={{ display: 'flex' }}>CUIDAR</span>
                <span style={{ display: 'flex', color: '#849700' }}>TU SONRISA.</span>
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
              <img src={imageUrl} width="100%" height="100%" style={{ objectFit: 'cover' }} alt="Chica sonriendo" />
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'LemonMILK', 
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