import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const hasTitle = searchParams.has('title');
    const title = hasTitle 
      ? searchParams.get('title')?.slice(0, 100) 
      : 'Cuadro Médico Dental';
      
    const subtitle = searchParams.get('subtitle') || 'DKV Dentisalud Élite';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex', // 🌟 El contenedor principal YA es flex
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundColor: '#ffffff',
            backgroundImage: 'radial-gradient(circle at 25px 25px, #e5e7eb 2%, transparent 0%), radial-gradient(circle at 75px 75px, #e5e7eb 2%, transparent 0%)',
            backgroundSize: '100px 100px',
            padding: '80px',
            fontFamily: 'sans-serif',
          }}
        >
          {/* Adorno superior (Línea verde DKV) */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '16px',
              display: 'flex', // 🌟 Se lo añadimos por si acaso
              backgroundColor: '#00725e',
            }}
          />

          {/* Subtítulo (Ej: Cuadro Médico) */}
          <div
            style={{
              fontSize: 32,
              fontWeight: 600,
              letterSpacing: '0.05em',
              color: '#00725e',
              textTransform: 'uppercase',
              marginBottom: 24,
              display: 'flex', // 🌟 Este tiene un icono (span) y texto, DEBE ser flex
              alignItems: 'center',
            }}
          >
            <span style={{ marginRight: '16px', fontSize: '40px' }}>🏥</span>
            <span style={{ display: 'flex' }}>{subtitle}</span> {/* Envolvemos el texto */}
          </div>

          {/* Título Principal (Ej: Dentistas en Zaragoza) */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: '#111827',
              lineHeight: 1.1,
              marginBottom: 60,
              display: 'flex', // 🌟
              maxWidth: '900px',
            }}
          >
            {title}
          </div>

          {/* Footer de la tarjeta con la marca */}
          <div
            style={{
              display: 'flex', // 🌟 Este tiene dos hijos (marca y estado), DEBE ser flex
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              marginTop: 'auto',
              borderTop: '2px solid #e5e7eb',
              paddingTop: '40px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  fontSize: 40,
                  fontWeight: 900,
                  color: '#00725e',
                  letterSpacing: '-0.05em',
                  display: 'flex', // 🌟 Tiene el "DKV" y el "Dentisalud Élite", DEBE ser flex
                }}
              >
                DKV <span style={{ fontWeight: 400, color: '#4b5563', marginLeft: '8px', display: 'flex' }}>Dentisalud Élite</span>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', fontSize: 24, color: '#6b7280', fontWeight: 600 }}>
              Tarifas reducidas activas
              {/* 🌟 He cambiado el check ✓ por un emoji ✅ para que no falle la fuente */}
              <span style={{ marginLeft: '12px', fontSize: '32px', display: 'flex' }}>✅</span>
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
    console.error('Error generando la imagen OG:', e);
    return new Response(`Failed to generate image`, {
      status: 500,
    });
  }
}
