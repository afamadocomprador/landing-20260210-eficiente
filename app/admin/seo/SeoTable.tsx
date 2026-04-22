//app/admin/seo/SeoTable.tsx

'use client';

import React, { useState, useMemo } from 'react';
import { 
  AlertCircle, CheckCircle2, ChevronDown, ChevronUp, Hash, 
  FolderTree, CheckSquare, Square, RefreshCcw, Loader2, Code, 
  ChevronRight 
} from 'lucide-react';

// --- COMPONENTE MEJORADO: Visor JSON interactivo y plegable ---
const JsonNode = ({ data, name, initiallyExpanded = false }: { data: any, name?: string, initiallyExpanded?: boolean }) => {
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded);
  const isObject = data !== null && typeof data === 'object' && !Array.isArray(data);
  const isArray = Array.isArray(data);

  if (isObject || isArray) {
    const entries = isObject ? Object.entries(data) : data.map((item: any, i: number) => [i.toString(), item]);
    const isEmpty = entries.length === 0;

    if (isEmpty) {
      return (
        <div className="text-[11px] font-mono leading-relaxed flex items-center">
          {name && <span className="text-indigo-600 font-semibold mr-1">"{name}":</span>}
          <span className="text-slate-400">{isObject ? '{}' : '[]'}</span>
        </div>
      );
    }

    return (
      <div className="text-[11px] font-mono leading-relaxed">
        {/* Cabecera pulsable de la rama */}
        <div 
          className="flex items-center cursor-pointer hover:bg-indigo-50/50 w-max pr-2 rounded transition-colors select-none group"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className="text-slate-400 mr-1 flex items-center justify-center w-3 h-3 bg-white border border-slate-200 rounded-[3px] group-hover:border-indigo-300">
            {isExpanded ? <span className="text-[9px] font-bold text-slate-600">-</span> : <span className="text-[9px] font-bold text-slate-600">+</span>}
          </span>
          {name && <span className="text-indigo-600 font-semibold mr-1">"{name}":</span>}
          <span className="text-slate-400">{isObject ? '{' : '['}</span>
          
          {/* Si está cerrado, mostramos un resumen */}
          {!isExpanded && (
            <>
              <span className="text-slate-400 tracking-widest mx-1">...</span>
              <span className="text-slate-400">{isObject ? '}' : ']'}</span>
              <span className="text-slate-400 text-[9px] ml-2 italic">({entries.length} items)</span>
            </>
          )}
        </div>
        
        {/* Contenido desplegado */}
        {isExpanded && (
          <div className="flex flex-col">
            <div className="pl-4 ml-1.5 border-l border-dashed border-indigo-200 flex flex-col my-0.5">
              {entries.map(([key, val]: [string, any], idx: number) => (
                <div key={key} className="flex">
                  <JsonNode data={val} name={isObject ? key : undefined} initiallyExpanded={false} />
                  {idx < entries.length - 1 && <span className="text-slate-400">,</span>}
                </div>
              ))}
            </div>
            <div className="pl-1.5 flex items-center">
              <span className="text-slate-400">{isObject ? '}' : ']'}</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Coloreado de valores primitivos (textos, números, booleanos)
  let valueColor = 'text-emerald-600'; // Strings
  if (typeof data === 'number') valueColor = 'text-amber-600';
  if (typeof data === 'boolean') valueColor = 'text-rose-500';
  if (data === null) valueColor = 'text-slate-400 italic';

  return (
    <div className="text-[11px] font-mono leading-relaxed break-all">
      {name && <span className="text-indigo-600 font-semibold mr-1">"{name}":</span>}
      <span className={valueColor}>
        {typeof data === 'string' ? `"${data}"` : String(data)}
      </span>
    </div>
  );
};

// --- DICCIONARIO DE CABECERAS HTML ---
const getTagStyles = (tag: string) => {
  const styles: Record<string, { badge: string; indent: string; text: string }> = {
    h1: { badge: 'bg-purple-600 text-white', indent: 'ml-0', text: 'font-bold text-slate-900 text-base' },
    h2: { badge: 'bg-blue-500 text-white', indent: 'ml-6', text: 'font-semibold text-slate-800' },
    h3: { badge: 'bg-emerald-500 text-white', indent: 'ml-12', text: 'font-medium text-slate-700' },
    h4: { badge: 'bg-amber-500 text-white', indent: 'ml-20', text: 'text-slate-600' },
    h5: { badge: 'bg-orange-500 text-white', indent: 'ml-28', text: 'text-slate-500 italic' },
    h6: { badge: 'bg-rose-500 text-white', indent: 'ml-36', text: 'text-slate-400 italic text-sm' },
  };
  return styles[tag.toLowerCase()] || { badge: 'bg-slate-200 text-slate-600', indent: 'ml-0', text: 'text-slate-600' };
};

export default function SeoTable({ initialData }: { initialData: any[] }) {
  const [data, setData] = useState(initialData);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [processingIds, setProcessingIds] = useState<string[]>([]);

  const tabs = useMemo(() => Array.from(new Set(data.map((audit) => audit.category || 'General'))), [data]);
  const [activeTab, setActiveTab] = useState<string>(tabs[0] || 'General');

  const filteredData = useMemo(() => 
    data.filter((audit) => (audit.category || 'General') === activeTab),
  [data, activeTab]);

  const handleSelectAll = () => setSelectedIds(filteredData.map(d => d.id));
  const handleClearAll = () => setSelectedIds([]);
  const toggleSelect = (id: string) => setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  const handleReevaluate = async () => {
    const toProcess = selectedIds.filter(id => filteredData.some(d => d.id === id));
    
    for (const id of toProcess) {
      const audit = data.find(d => d.id === id);
      if (!audit) continue;

      setProcessingIds(prev => [...prev, id]);

      try {
        const res = await fetch('/api/seo/scan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: audit.url, category: audit.category })
        });
        await res.json();
      } catch (err) {
        console.error("Error re-evaluando:", id, err);
      } finally {
        setProcessingIds(prev => prev.filter(i => i !== id));
      }
    }
    setSelectedIds([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200 gap-4">
        <nav className="-mb-px flex space-x-6 overflow-x-auto">
          {tabs.map((tab) => {
            const count = data.filter(d => (d.category || 'General') === tab).length;
            const hasErrors = data.some(d => (d.category || 'General') === tab && d.seo_errors?.length > 0);
            
            return (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setExpandedId(null); setSelectedIds([]); }}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors outline-none
                  ${activeTab === tab ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}
                `}
              >
                <FolderTree className={`w-4 h-4 ${activeTab === tab ? 'text-blue-500' : 'text-slate-400'}`} />
                <span className="capitalize">{tab.replace(/-/g, ' ')}</span>
                <span className={`ml-1 py-0.5 px-2.5 rounded-full text-[10px] font-bold ${activeTab === tab ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'}`}>
                  {count}
                </span>
                {hasErrors && <span className="w-2 h-2 rounded-full bg-red-500 ml-1"></span>}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 pb-2 md:pb-0">
          <button onClick={handleSelectAll} className="text-xs font-semibold px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors">Seleccionar Todo</button>
          <button onClick={handleClearAll} className="text-xs font-semibold px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors">Limpiar</button>
          <button 
            disabled={selectedIds.length === 0 || processingIds.length > 0}
            onClick={handleReevaluate}
            className={`flex items-center gap-2 text-xs font-bold px-4 py-1.5 rounded-lg transition-all shadow-sm ${
              selectedIds.length > 0 && processingIds.length === 0 ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            {processingIds.length > 0 ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCcw className="w-3 h-3" />}
            Re-evaluar seleccionadas ({selectedIds.length})
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse table-fixed">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase text-slate-400 tracking-widest font-bold">
              <th className="p-4 w-12"></th>
              <th className="p-4 w-1/2">Página / URL</th>
              <th className="p-4 w-20 text-center">H1</th>
              <th className="p-4 w-48">Estado SEO</th>
              <th className="p-4 w-20 text-right">Detalles</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((audit) => {
              const isExpanded = expandedId === audit.id;
              const isSelected = selectedIds.includes(audit.id);
              const isProcessing = processingIds.includes(audit.id);
              const hasErrors = audit.seo_errors?.length > 0;
              
              return (
                <React.Fragment key={audit.id}>
                  <tr className={`border-b border-slate-100 transition-all duration-300 ${isExpanded ? 'bg-blue-50/40' : ''} ${isProcessing ? 'bg-amber-50 animate-pulse' : 'hover:bg-slate-50'}`}>
                    <td className="p-4 align-top">
                      <button onClick={() => toggleSelect(audit.id)} className="text-slate-300 hover:text-blue-500 transition-colors mt-0.5">
                        {isSelected ? <CheckSquare className="w-5 h-5 text-blue-600" /> : <Square className="w-5 h-5" />}
                      </button>
                    </td>
                    <td className="p-4">
                      <div className="flex items-start gap-2">
                        {isProcessing && <Loader2 className="w-3 h-3 animate-spin text-amber-500 mt-1 shrink-0" />}
                        <div className="font-semibold text-slate-900 break-words leading-tight">{audit.title || 'Sin título'}</div>
                      </div>
                      
                      {audit.meta_description ? (
                        <div className="text-[11px] text-slate-500 italic mt-1.5 mb-1.5 line-clamp-2">
                          {audit.meta_description}
                        </div>
                      ) : (
                        <div className="text-[11px] text-slate-400 italic mt-1.5 mb-1.5">Sin meta descripción</div>
                      )}

                      <div className="text-[10px] text-slate-400 break-all">
                        <a href={audit.url} target="_blank" rel="noreferrer" className="hover:text-blue-500 hover:underline">{audit.url}</a>
                      </div>
                    </td>
                    <td className="p-4 align-top text-center">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-black ${audit.h1_count === 1 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {audit.h1_count}
                      </span>
                    </td>
                    <td className="p-4 align-top">
                      <button onClick={() => setExpandedId(isExpanded ? null : audit.id)} className="text-left outline-none flex flex-col">
                        {hasErrors ? (
                          <>
                            <div className="flex items-center text-xs font-bold text-orange-600 underline decoration-dotted">
                              <AlertCircle className="w-3.5 h-3.5 mr-1 shrink-0" />
                              {audit.seo_errors.length} problemas
                            </div>
                            <div className="text-[10px] text-red-500 mt-1 line-clamp-2 italic">
                              {audit.seo_errors[0]}
                            </div>
                          </>
                        ) : (
                          <div className="flex items-center text-green-600 text-xs font-bold">
                            <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                            Correcto
                          </div>
                        )}
                      </button>
                    </td>
                    <td className="p-4 align-top text-right">
                      <button onClick={() => setExpandedId(isExpanded ? null : audit.id)} className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
                        {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                      </button>
                    </td>
                  </tr>
                  
                  {isExpanded && (
                    <tr className="bg-slate-50/50">
                      <td colSpan={5} className="p-6 border-b border-slate-200">
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8">
                          
                          {/* COLUMNA IZQUIERDA: Errores y Cabeceras */}
                          <div>
                            {hasErrors && (
                              <div className="mb-6 bg-red-50/50 border border-red-100 rounded-lg p-4">
                                <h4 className="text-[11px] font-bold text-red-600 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                                  <AlertCircle className="w-4 h-4" /> Alertas Detectadas
                                </h4>
                                <ul className="list-disc list-inside space-y-1.5 ml-1">
                                  {audit.seo_errors.map((err: string, i: number) => (
                                    <li key={i} className="text-sm text-red-700 font-medium">{err}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                              <Hash className="w-4 h-4" /> Jerarquía HTML
                            </h3>
                            <div className="space-y-2.5">
                              {audit.headers_structure?.map((h: any, i: number) => {
                                const styles = getTagStyles(h.tag);
                                return (
                                  <div key={i} className={`flex items-baseline ${styles.indent}`}>
                                    <span className={`text-[9px] font-black px-1.5 py-0.5 rounded w-8 text-center shrink-0 mr-3 shadow-sm ${styles.badge}`}>
                                      {h.tag.toUpperCase()}
                                    </span>
                                    <span className={`text-sm ${styles.text}`}>{h.text}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* COLUMNA DERECHA: Visor de Entidades JSON-LD */}
                          <div className="border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-8 flex flex-col h-full">
                            <h3 className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-4 flex items-center gap-2 shrink-0">
                              <Code className="w-4 h-4" /> Entidades Schema (JSON-LD)
                            </h3>
                            
                            <div className="flex-1 overflow-y-auto max-h-[600px] pr-2 custom-scrollbar">
                              {audit.entities && audit.entities.length > 0 ? (
                                <div className="space-y-4">
                                  {audit.entities.map((ent: any, i: number) => {
                                    const type = ent['@type'] || (ent['@graph'] ? 'Graph Multiple' : 'Objeto');
                                    const typeName = Array.isArray(type) ? type.join(' / ') : type;
                                    
                                    return (
                                      <div key={i} className="bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
                                        <div className="bg-indigo-50/50 border-b border-slate-200 px-4 py-2 flex items-center justify-between">
                                          <span className="text-xs font-bold text-indigo-700 flex items-center gap-1.5">
                                            <ChevronRight className="w-3.5 h-3.5" /> {typeName}
                                          </span>
                                          <span className="text-[10px] text-slate-400 font-mono">Entidad {i + 1}</span>
                                        </div>
                                        {/* Aquí llamamos al JsonNode con initiallyExpanded=false para que salgan colapsadas */}
                                        <div className="p-4 overflow-x-auto">
                                          <JsonNode data={ent} initiallyExpanded={false} />
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              ) : (
                                <div className="h-full flex items-center justify-center border-2 border-dashed border-slate-200 rounded-lg p-8">
                                  <p className="text-sm text-slate-400 italic text-center">
                                    No se encontraron datos estructurados<br/>en el código fuente.
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>

                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}