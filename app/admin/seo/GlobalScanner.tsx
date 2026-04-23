// app/admin/seo/GlobalScanner.tsx


"use client";

import { useState } from 'react';
import { Play, Search, AlertCircle, CheckCircle2, Loader2, ServerCrash } from 'lucide-react';

export default function GlobalScanner() {
  const [sitemapUrl, setSitemapUrl] = useState('https://www.dkvdentisalud.es/sitemap.xml'); // Ajusta a tu dominio
  const [urls, setUrls] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'fetching' | 'ready' | 'scanning' | 'done'>('idle');
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [logs, setLogs] = useState<{ url: string; success: boolean; errors: number }[]>([]);
  const [errorMsg, setErrorMsg] = useState('');

  // 1. Extraer URLs del Sitemap
  const handleFetchSitemap = async () => {
    try {
      setStatus('fetching');
      setErrorMsg('');
      setLogs([]);
      
      const res = await fetch('/api/seo/sitemap-parser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sitemapUrl })
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error);

      setUrls(data.urls);
      setProgress({ current: 0, total: data.urls.length });
      setStatus('ready');

    } catch (error: any) {
      setErrorMsg(error.message || 'Error al leer el sitemap');
      setStatus('idle');
    }
  };

  // 2. Escanear en Lotes (El motor anti-colapso)
  const handleStartScan = async () => {
    setStatus('scanning');
    setErrorMsg('');
    const BATCH_SIZE = 5; // Analizamos de 5 en 5 para no saturar Vercel ni Supabase
    let scannedCount = 0;

    for (let i = 0; i < urls.length; i += BATCH_SIZE) {
      const batch = urls.slice(i, i + BATCH_SIZE);
      
      // Lanzamos las 5 peticiones en paralelo y esperamos a que terminen
      const batchPromises = batch.map(async (url) => {
        try {
          // Categorizamos de forma básica según la URL para la BBDD
          let category = 'general';
          if (url.includes('/dentistas/')) category = 'local';
          if (url.includes('/tratamientos-v2/')) category = 'tratamientos';

          const res = await fetch('/api/seo/scan', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url, category })
          });
          
          const result = await res.json();
          return { url, success: result.success, errors: result.data?.errorsFound || 0 };
        } catch (e) {
          return { url, success: false, errors: -1 };
        }
      });

      const batchResults = await Promise.all(batchPromises);
      
      setLogs(prev => [...prev, ...batchResults]);
      scannedCount += batch.length;
      setProgress(prev => ({ ...prev, current: scannedCount }));

      // Pequeño respiro de 1 segundo entre lotes para que la base de datos respire
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    setStatus('done');
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
        <ServerCrash className="w-6 h-6 text-indigo-600" />
        Auditoría Global de Sitio
      </h2>
      <p className="text-slate-500 mb-6 text-sm">
        Introduce la URL de tu Sitemap (o Sitemap Index). El sistema extraerá todas las páginas y las analizará en lotes guardando los resultados en Supabase.
      </p>

      {/* CONTROLES */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input 
          type="url" 
          value={sitemapUrl}
          onChange={(e) => setSitemapUrl(e.target.value)}
          disabled={status === 'fetching' || status === 'scanning'}
          className="flex-grow px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          placeholder="https://tusitio.com/sitemap.xml"
        />
        
        {status === 'idle' || status === 'done' || status === 'fetching' ? (
          <button 
            onClick={handleFetchSitemap}
            disabled={status === 'fetching'}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {status === 'fetching' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            Extraer URLs
          </button>
        ) : (
          <button 
            onClick={handleStartScan}
            disabled={status === 'scanning'}
            className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition flex items-center justify-center gap-2 disabled:opacity-50 shadow-emerald-600/30 shadow-lg"
          >
            {status === 'scanning' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
            {status === 'scanning' ? 'Analizando...' : 'Iniciar Auditoría Masiva'}
          </button>
        )}
      </div>

      {errorMsg && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" /> {errorMsg}
        </div>
      )}

      {/* BARRA DE PROGRESO */}
      {(status === 'ready' || status === 'scanning' || status === 'done') && (
        <div className="mb-6">
          <div className="flex justify-between text-sm font-medium text-slate-700 mb-2">
            <span>Progreso del escaneo</span>
            <span>{progress.current} / {progress.total} URLs</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-indigo-600 h-3 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${(progress.current / (progress.total || 1)) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* CONSOLA DE LOGS */}
      {logs.length > 0 && (
        <div className="bg-slate-900 rounded-lg p-4 h-64 overflow-y-auto font-mono text-xs">
          {logs.map((log, i) => (
            <div key={i} className="flex items-start gap-2 mb-2 pb-2 border-b border-slate-800/50">
              {log.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              )}
              <div className="flex flex-col min-w-0">
                <span className="text-slate-300 truncate">{log.url.replace('https://www.dkvdentisalud.es', '')}</span>
                <span className={`${log.errors > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {log.success ? `${log.errors} errores críticos encontrados` : 'Fallo de conexión o timeout'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}