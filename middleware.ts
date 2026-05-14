// middleware.ts en el dir raíz


import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/request';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// 1. Conexión a tu instancia de Frankfurt
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// 2. Definición del límite: 30 peticiones cada 10 segundos
const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(30, '10 s'),
  analytics: true, // Esto te permitirá ver gráficos en el panel de Upstash
});

export async function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';

  // 3. Salvoconducto para Bots Oficiales (Vital para SEO)
  const isSearchBot = /googlebot|bingbot|yandex|baiduspider/i.test(userAgent);
  if (isSearchBot) {
    return NextResponse.next();
  }

  // 4. Identificador único por IP
  const ip = request.ip || '127.0.0.1';
  const { success, limit, reset, remaining } = await ratelimit.limit(ip);

  // 5. Si la IP se pasa del límite, cortamos la ejecución
  if (!success) {
    return new NextResponse(
      JSON.stringify({ 
        error: 'Demasiadas peticiones.', 
        message: 'Acceso bloqueado temporalmente por seguridad.' 
      }),
      { 
        status: 429, 
        headers: { 
          'Content-Type': 'application/json',
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString(),
        } 
      }
    );
  }

  return NextResponse.next();
}

// 6. Configuración del Matcher: ¿Qué rutas protegemos?
export const config = {
  matcher: [
    '/dentistas/:path*',    // Protege todas las landings de municipios
    '/tratamientos/:path*', // Protege las landings de servicios
    '/api/:path*'           // Protege tus endpoints de Supabase/Nodemailer
  ],
};