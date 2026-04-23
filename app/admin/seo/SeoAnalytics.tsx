// app/admin/seo/SeoAnalytics.tsx

"use client";

import { useMemo } from 'react';
import { AlertTriangle, Crosshair, BarChart3, AlertOctagon } from 'lucide-react';

interface AuditRecord {
  url: string;
  title: string;
  h1_count: number;
  headers_structure: { tag: string; text: string }[];
  seo_errors: string[];
  entities: any[];
}

export default function SeoAnalytics({ audits }: { audits: AuditRecord[] }) {
  
  // Procesamiento de datos en el cliente para no saturar la base de datos con consultas SQL complejas
  const analytics = useMemo(() => {
    const data = {
      cannibalizedTitles: {} as Record<string, string[]>,
      cannibalizedH1: {} as Record<string, string[]>,
      missingSchema: [] as string[],
      criticalErrors: 0,
      perfectPages: 0
    };

    if (!audits || audits.length === 0) return data;

    audits.forEach(audit => {
      // 1. Salud General
      if (audit.seo_errors && audit.seo_errors.length > 0) {
        data.criticalErrors++;
      } else {
        data.perfectPages++;
      }

      // 2. Búsqueda de Schema Vacío
      if (!audit.entities || audit.entities.length === 0) {
        data.missingSchema.push(audit.url);
      }

      // 3. Agrupación por Títulos (Canibalización de Title)
      const title = audit.title ? audit.title.trim().toLowerCase() : 'Sin Título';
      if (!data.cannibalizedTitles[title]) data.cannibalizedTitles[title] = [];
      data.cannibalizedTitles[title].push(audit.url);

      // 4. Agrupación por H1 (Canibalización Semántica)
      const h1 = audit.headers_structure?.find(h => h.tag === 'h1')?.text?.trim().toLowerCase() || 'Sin H1';
      if (!data.cannibalizedH1[h1]) data.cannibalizedH1[h1] = [];
      data.cannibalizedH1[h1].push(audit.url);
    });

    // Filtramos para quedarnos SOLO con los que se repiten en 2 o más URLs distintas
    data.cannibalizedTitles = Object.fromEntries(
      Object.entries(data.cannibalizedTitles).filter(([_, urls]) => urls.length > 1)
    );
    data.cannibalizedH1 = Object.fromEntries(
      Object.entries(data.cannibalizedH1).filter(([_, urls]) => urls.length > 1)
    );

    return data;
  }, [audits]);

  if (!audits || audits.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-emerald-100 flex items-center gap-4">
          <div className="bg-emerald-100 p-3 rounded-full"><BarChart3 className="w-6 h-6 text-emerald-600" /></div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Páginas Perfectas</p>
            <p className="text-2xl font-bold text-slate-800">{analytics.perfectPages}</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-rose-100 flex items-center gap-4">
          <div className="bg-rose-100 p-3 rounded-full"><AlertOctagon className="w-6 h-6 text-rose-600" /></div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Páginas con Errores</p>
            <p className="text-2xl font-bold text-slate-800">{analytics.criticalErrors}</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-amber-100 flex items-center gap-4">
          <div className="bg-amber-100 p-3 rounded-full"><AlertTriangle className="w-6 h-6 text-amber-600" /></div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Conflictos Semánticos</p>
            <p className="text-2xl font-bold text-slate-800">
              {Object.keys(analytics.cannibalizedH1).length + Object.keys(analytics.cannibalizedTitles).length}
            </p>
          </div>
        </div>
      </div>

      {Object.keys(analytics.cannibalizedH1).length > 0 && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-amber-200">
          <h3 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
            <Crosshair className="w-5 h-5 text-amber-600" />
            Alerta de Canibalización (H1 Duplicados)
          </h3>
          <p className="text-sm text-slate-500 mb-4">
            Las siguientes URLs compiten entre sí porque tienen exactamente el mismo titular (H1). Google no sabrá a cuál darle prioridad. Deberías diferenciarlas.
          </p>
          <div className="space-y-4">
            {Object.entries(analytics.cannibalizedH1).map(([h1, urls], idx) => (
              <div key={idx} className="bg-amber-50/50 p-4 rounded-lg border border-amber-100">
                <span className="font-bold text-amber-800 uppercase text-sm block mb-2">H1: "{h1}"</span>
                <ul className="list-disc pl-5 space-y-1">
                  {urls.map((url, i) => (
                    <li key={i} className="text-sm text-slate-600 font-mono truncate">
                      <a href={url} target="_blank" rel="noreferrer" className="hover:text-indigo-600 hover:underline">{url.replace('https://www.dkvdentisalud.es', '')}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}