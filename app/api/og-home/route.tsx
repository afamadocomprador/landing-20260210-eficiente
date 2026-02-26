import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    // Necesitamos saber la URL base para cargar la foto de la chica redonda
    const url = new URL(request.url);
    const baseUrl = `${url.protocol}//${url.host}`;

    // 🔴 IMPORTANTE: Necesitas tener la foto de la chica guardada en tu carpeta public
    // Por ejemplo en: public/images/chica-sonrisa.jpg
    const imageUrl = `${baseUrl}/images/hero-dkv.webp`; // Cambia el nombre si es otro

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'row', // Layout en 2 columnas (Izquierda texto, Derecha foto)
            backgroundColor: '#ffffff',
            padding: '80px',
            fontFamily: 'sans-serif',
          }}
        >
          {/* COLUMNA IZQUIERDA: Textos (60% del ancho) */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '60%',
              justifyContent: 'center',
              paddingRight: '40px',
            }}
          >
            {/* Etiqueta pequeñita */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: 20,
                fontWeight: 700,
                color: '#033B37', // Verde DKV oscuro
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: 24,
              }}
            >
              <div style={{ width: 12, height: 12, borderRadius: '50%', border: '2px solid #849700', marginRight: 12, display: 'flex' }} />
              DKV Dentisalud Élite
            </div>

            {/* Titular Gigante */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                fontSize: 85,
                fontWeight: 900,
                color: '#033B37',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                marginBottom: 32,
              }}
            >
              <span style={{ display: 'flex' }}>LO FÁCIL ES</span>
              <span style={{ display: 'flex' }}>CUIDAR</span>
              {/* Resalte en Verde Pistacho */}
              <span style={{ display: 'flex', color: '#849700' }}>TU SONRISA.</span>
            </div>

            {/* Párrafo descriptivo */}
            <div
              style={{
                display: 'flex',
                fontSize: 28,
                color: '#6b7280', // Gris
                lineHeight: 1.4,
                fontWeight: 500,
                maxWidth: '90%',
              }}
            >
              Acceso sin rodeos. Atención dental de Calidad. Y Precios Claros que entiendes desde el principio.
            </div>
          </div>

          {/* COLUMNA DERECHA: La foto circular (40% del ancho) */}
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
                borderRadius: '50%', // Magia: Círculo perfecto
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.15)', // Sombra suave
                border: '8px solid white', // Borde blanco por si hay fondo
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={imageUrl} 
                width="100%" 
                height="100%" 
                style={{ objectFit: 'cover' }} 
                alt="Chica sonriendo"
              />
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.error('Error generando la imagen OG de la Home:', e);
    return new Response(`Failed to generate image`, { status: 500 });
  }
}
