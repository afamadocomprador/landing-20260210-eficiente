// app/admin/maps/page.tsx

"use client";

import { useState, useEffect } from 'react';
import { createBrowserClient } from "@supabase/ssr";

export default function MapsDashboard() {
  const [landings, setLandings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [imagesStatus, setImagesStatus] = useState<Record<string, string>>({});
  
  // Estados para los filtros y límites
  const [filters, setFilters] = useState({ texto: '', nivel: '' });
  const [limit, setLimit] = useState<number | ''>(''); 
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);
  const [status, setStatus] = useState<{ type: 'info' | 'error' | 'success', msg: string } | null>(null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Escanea el servidor para ver qué imágenes existen y cuándo se crearon
  const checkFilesStatus = async () => {
    try {
      const res = await fetch('/api/maps/status');
      if (res.ok) {
        const data = await res.json();
        setImagesStatus(data);
      }
    } catch (error) {
      console.error("Error al comprobar el estado de los archivos", error);
    }
  };

  // Carga de datos con los filtros aplicados
  const fetchLandings = async () => {
    setLoading(true);
    await checkFilesStatus(); // Actualizamos el estado de las fotos
    
    let query = supabase
      .from('landings_search_dentistry')
      .select('nombre_ine, slug, nivel, codigo_ine, subcodigo_ine')
      .order('nombre_ine', { ascending: true });

    // ⚡️ Filtro de texto: busca en nombre_ine O en slug
    if (filters.texto) {
      query = query.or(`nombre_ine.ilike.%${filters.texto}%,slug.ilike.%${filters.texto}%`);
    }
    // ⚡️ Filtro geográfico / nivel
    if (filters.nivel) {
      query = query.eq('nivel', filters.nivel);
    }

    const { data, error } = await query;
    if (error) {
      setStatus({ type: 'error', msg: `Error en base de datos: ${error.message}` });
    } else {
      setLandings(data || []);
    }
    setLoading(false);
  };

  useEffect(() => { 
    fetchLandings(); 
  }, []);

  // Función combinada: Manuales + Huecos
  const handleGenerate = async () => {
    // 1. De la tabla ACTUAL, miramos cuáles no tienen imagen
    const withoutImage = landings.filter(l => !imagesStatus[l.slug]);
    
    // 2. Tomamos los primeros "limit" huecos
    const autoSelected = limit ? withoutImage.slice(0, Number(limit)).map(l => l.slug) : [];
    
    // 3. Juntamos los que has marcado a mano + los huecos automáticos (Set elimina repetidos)
    const finalBatch = Array.from(new Set([...selectedSlugs, ...autoSelected]));

    if (finalBatch.length === 0) {
      setStatus({ type: 'error', msg: 'No hay filas seleccionadas a mano ni "huecos" que rellenar en esta vista.' });
      return;
    }

    setStatus({ type: 'info', msg: `🤖 Robot iniciado: Procesando ${finalBatch.length} mapas...` });
    
    try {
      const response = await fetch('/api/maps/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slugs: finalBatch }),
      });

      if (response.ok) {
        setStatus({ type: 'success', msg: `✅ ¡Proceso completado! Se generaron ${finalBatch.length} mapas.` });
        setSelectedSlugs([]);
        setLimit('');
        fetchLandings(); // Refrescamos la tabla para ver los ticks verdes
      } else {
        throw new Error('El robot devolvió un error de servidor.');
      }
    } catch (err) {
      setStatus({ type: 'error', msg: '❌ Error de conexión con el robot.' });
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-fsme text-gray-800">
      <div className="max-w-6xl mx-auto">
        
        {/* CABECERA */}
        <header className="mb-8">
          <h1 className="text-4xl font-lemon text-dkv-green-dark mb-2">Generador Automático</h1>
          <p className="text-gray-500 font-medium tracking-tight">Control de stock de fachadas para versión móvil</p>
        </header>

        {/* PANEL DE CONTROL DIVIDIDO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          
          {/* SECCIÓN 1: FILTROS DE BÚSQUEDA */}
          <div className="lg:col-span-8 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Nombre o Slug</label>
              <input 
                type="text"
                placeholder="Ej: madrid..." 
                className="border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-dkv-green outline-none transition-all w-full"
                value={filters.texto}
                onChange={(e) => setFilters({...filters, texto: e.target.value})}
              />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Nivel (Provincia)</label>
              <input 
                type="text"
                placeholder="Ej: 02" 
                className="border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-dkv-green outline-none transition-all w-full"
                value={filters.nivel}
                onChange={(e) => setFilters({...filters, nivel: e.target.value})}
              />
            </div>
            <div className="flex items-end">
              <button 
                onClick={fetchLandings}
                className="bg-dkv-green-dark text-white px-6 py-3 rounded-xl font-bold hover:bg-dkv-green transition-all shadow-md whitespace-nowrap h-[50px]"
              >
                🔍 Filtrar
              </button>
            </div>
          </div>

          {/* SECCIÓN 2: ACCIONES DE GENERACIÓN */}
          <div className="lg:col-span-4 bg-orange-50 p-6 rounded-3xl shadow-sm border border-orange-100 flex flex-col justify-end gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-orange-800 uppercase tracking-widest ml-1">Rellenar huecos</label>
              <div className="flex gap-2">
                <input 
                  type="number" 
                  placeholder="Ej: 50"
                  className="w-24 p-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                  value={limit}
                  onChange={(e) => setLimit(e.target.value === '' ? '' : Number(e.target.value))}
                />
                <button 
                  onClick={handleGenerate}
                  disabled={status?.type === 'info'}
                  className={`flex-1 text-white rounded-xl font-extrabold shadow-md transition-all ${
                    status?.type === 'info' ? 'bg-orange-300 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 hover:-translate-y-0.5'
                  }`}
                >
                  {status?.type === 'info' ? '⏳' : 'Generar ▶'}
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* ALERTAS */}
        {status && (
          <div className={`mb-8 p-5 rounded-2xl border flex items-center gap-4 animate-in fade-in slide-in-from-top-4 ${
            status.type === 'error' ? 'bg-red-50 border-red-100 text-red-700' : 
            status.type === 'success' ? 'bg-green-50 border-green-100 text-green-700' : 
            'bg-blue-50 border-blue-100 text-blue-700'
          }`}>
            <span className="text-2xl">{status.type === 'error' ? '❌' : status.type === 'success' ? '✅' : '🤖'}</span>
            <p className="font-bold">{status.msg}</p>
          </div>
        )}

        {/* TABLA DE RESULTADOS */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="p-5 w-12 text-center">Sel.</th>
                <th className="p-5 text-xs font-bold text-gray-400 uppercase">Municipio</th>
                <th className="p-5 text-xs font-bold text-gray-400 uppercase">Estado y Fecha</th>
                <th className="p-5 text-xs font-bold text-gray-400 uppercase">Slug / Identificador</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={4} className="p-20 text-center text-gray-400 animate-pulse font-medium">Buscando datos e imágenes...</td></tr>
              ) : landings.length === 0 ? (
                <tr><td colSpan={4} className="p-20 text-center text-gray-400 font-fsme">No se encontraron resultados</td></tr>
              ) : (
                landings.map((row) => (
                  <tr key={row.slug} className="hover:bg-dkv-green/5 group transition-colors">
                    <td className="p-5 text-center">
                      <input 
                        type="checkbox" 
                        className="w-5 h-5 accent-dkv-green cursor-pointer"
                        checked={selectedSlugs.includes(row.slug)}
                        onChange={() => setSelectedSlugs(prev => 
                          prev.includes(row.slug) ? prev.filter(s => s !== row.slug) : [...prev, row.slug]
                        )} 
                      />
                    </td>
                    <td className="p-5 font-bold text-dkv-green-dark text-lg">{row.nombre_ine}</td>
                    <td className="p-5">
                      {imagesStatus[row.slug] ? (
                        <div className="flex flex-col">
                          <span className="text-sm text-green-600 font-bold flex items-center gap-1">
                            ✅ Imagen Lista
                          </span>
                          <span className="text-xs text-gray-400 font-mono mt-1 bg-gray-100 px-2 py-0.5 rounded w-max">
                            {imagesStatus[row.slug]}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-red-500 font-bold bg-red-50 px-3 py-1 rounded-full">❌ Faltante</span>
                      )}
                    </td>
                    <td className="p-5">
                      <code className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-md font-mono">
                        {row.slug}
                      </code>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
