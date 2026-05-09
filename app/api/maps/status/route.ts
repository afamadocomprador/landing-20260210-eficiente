// app/api/maps/status/route.ts

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const dirPath = path.join(process.cwd(), 'public/images/maps');
    if (!fs.existsSync(dirPath)) return NextResponse.json({});

    const files = fs.readdirSync(dirPath);
    const statusMap: Record<string, string> = {};

    files.forEach(file => {
      if (file.endsWith('-mobile.webp')) {
        const slug = file.replace('-mobile.webp', '');
        const stats = fs.statSync(path.join(dirPath, file));
        // Guardamos la fecha de modificación formateada
        statusMap[slug] = stats.mtime.toLocaleDateString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      }
    });

    return NextResponse.json(statusMap);
  } catch (error) {
    return NextResponse.json({ error: "Error al leer archivos" }, { status: 500 });
  }
}
