/ app/admin/seo/SeoTable.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { 
  AlertCircle, CheckCircle2, ChevronDown, ChevronUp, Hash, 
  FolderTree, CheckSquare, Square, RefreshCcw, Loader2, Code, 
  ChevronRight, Eye, Sparkles, BrainCircuit
} from 'lucide-react';
import TextoVisorModal from './TextoVisorModal';

// --- COMPONENTE INTERACTIVO JSON (Oculto por brevedad, usa el mismo que ya tienes) ---
const JsonNode = ({ data, name, initiallyExpanded = false }: { data: any, name?: string, initiallyExpanded?: boolean }) => {
  /* ... (Mantén tu función JsonNode intacta aquí) ... */
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded);
  const isObject = data !== null && typeof data === 'object' && !Array.isArray(data);
  const isArray = Array.isArray(data);

  if (isObject || isArray) {
    const entries = isObject ? Object.entries(data) : data.map((item: any, i: number) => [i.toString(), item]);
    const isEmpty = entries.length === 0;

    if (isEmpty) return <div className="text-[11px] font-mono leading-relaxed"><span className="text-slate-400">{isObject ? '{}' : '[]'}</span></div>;

    return (
      <div className="text-[11px] font-mono leading-relaxed">
        <div className="flex items-center cursor-pointer hover:bg-indigo-50/50 w-max pr-2 rounded transition-colors" onClick={() => setIsExpanded(!isExpanded)}>
          <span className="text-slate-400 mr-1 flex items-center justify-center w-3 h-3 bg-white border border-slate-200 rounded-[3px]">{isExpanded ? '-' : '+'}</span>
          {name && <span className="text-indigo-600 font-semibold mr-1">"{name}":</span>}
          <span className="text-slate-400">{isObject ? '{' : '['}</span>
          {!isExpanded && <span className="text-slate-400">...{isObject ? '}' : ']'}</span>}
        </div>
        {isExpanded && (
          <div className="flex flex-col">
            <div className="pl-4 ml-1.5 border-l border-dashed border-indigo-200 my-0.5">
              {entries.map(([key, val]: [string, any], idx: number) => (
                <div key={key} className="flex"><JsonNode data={val} name={isObject ? key : undefined} />{idx < entries.length - 1 && <span className="text-slate-400">,</span>}</div>
              ))}
            </div>
            <div className="pl-1.5 flex items-center"><span className="text-slate-400">{isObject ? '}' : ']'}</span></div>
          </div>
        )}
      </div>
    );
  }
  let valueColor = 'text-emerald-600';
  if (typeof data === 'number') valueColor = 'text-amber-600';
  if (typeof data === 'boolean') valueColor = 'text-rose-500';
  return <div className="text-[11px] font-mono leading-relaxed">{name && <span className="text-indigo-600 font-semibold mr-1">"{name}":</span>}<span className={valueColor}>{typeof data === 'string' ? `"${data}"` : String(data)}</span></div>;
};

const getTagStyles = (tag: string) => {
  const styles: Record<string, { badge: string; indent: string; text: string }> = {
    h1: { badge: 'bg-purple-600 text-white', indent: 'ml-0', text: 'font-bold text-slate-900 text-base' },
    h2: { badge: 'bg-blue-500 text-white', indent: 'ml-6', text: 'font-semibold text-slate-800' },
    h3: { badge: 'bg-emerald-500 text-white', indent: 'ml-12', text: 'font-medium text-slate-700' },
  };
  return styles[tag.toLowerCase()] || { badge: 'bg-slate-200 text-slate-600', indent: 'ml-16', text: 'text-slate-600' };
};

export default function SeoTable({ initialData }: { initialData: any[] }) {
  const [data, setData] = useState(initialData);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [processingIds, setProcessingIds] = useState<string[]>([]);
  const [modalData, setModalData] = useState<{ text: string, url: string } | null>(null);

  // --- NUEVOS ESTADOS PARA LA IA ---
  const [aiResults, setAiResults] = useState<Record<string, any>>({});
  const [aiLoading, setAiLoading] = useState<string | null>(null);

  const tabs = useMemo(() => Array.from(new Set(data.map((a) => a.category || 'General'))), [data]);
  const [activeTab, setActiveTab] = useState<string>(tabs[0] || 'General');

  const filteredData = useMemo(() => data.filter((a) => (a.category || 'General') === activeTab), [data, activeTab]);

  const toggleSelect = (id: string) => setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  const handleSelectAll = () => setSelectedIds(filteredData.map(d => d.id));
  const handleClearAll = () => setSelectedIds([]);

  // Llamada al endpoint de la IA
  const handleAiAudit = async (id: string, url: string, text: string) => {
    setAiLoading(id);
    try {
      const res = await fetch('/api/seo/ai-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, text })
      });
      const json = await res.json();
      if (json.success) {
        setAiResults(prev => ({ ...prev, [id]: json.data }));
      } else {
        alert("Error de IA: " + json.error);
      }
    } catch (e) {
      alert("Fallo de conexión con la IA.");
    } finally {
      setAiLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      {modalData && <TextoVisorModal text={modalData.text} url={modalData.url} onClose={() => setModalData(null)} />}

      <div className="flex flex-col md:flex-row justify-between border-b border-slate-200 pb-2">
        {/* Pestañas (Omitidas por brevedad, mantén las tuyas) */}
        <div className="flex gap-2">
           <span className="font-bold text-slate-700">URLs Filtradas: {filteredData.length}</span>
        </div>
        <div className="flex gap-2">
          <button onClick={handleSelectAll} className="text-xs px-3 py-1.5 bg-slate-100 rounded-lg">Seleccionar Todo</button>
          <button onClick={handleClearAll} className="text-xs px-3 py-1.5 bg-slate-100 rounded-lg">Limpiar</button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left table-fixed">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr className="text-[10px] uppercase text-slate-400 font-bold">
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
              const wordCount = audit.word_count ?? audit.stats?.words ?? audit.wordCount ?? 0;
              const visibleText = audit.visible_text ?? audit.visibleText ?? "";
              const hasErrors = (audit.seo_errors || []).length > 0;
              
              return (
                <React.Fragment key={audit.id}>
                  <tr className={`border-b border-slate-100 ${isExpanded ? 'bg-blue-50/40' : 'hover:bg-slate-50'}`}>
                    <td className="p-4"><button onClick={() => toggleSelect(audit.id)}>{selectedIds.includes(audit.id) ? <CheckSquare className="text-blue-600 w-5 h-5"/> : <Square className="w-5 h-5 text-slate-300"/>}</button></td>
                    <td className="p-4">
                      <div className="font-semibold text-slate-900 truncate">{audit.title || 'Sin título'}</div>
                      <a href={audit.url} target="_blank" className="text-[10px] text-blue-500 hover:underline truncate block">{audit.url}</a>
                    </td>
                    <td className="p-4 text-center"><span className="px-2 py-0.5 bg-slate-100 rounded-full text-[10px] font-black">{audit.h1_count || 0}</span></td>
                    <td className="p-4">
                      <div className="flex flex-col gap-2">
                        <div className={`text-xs font-bold ${hasErrors ? 'text-orange-600' : 'text-green-600'}`}>
                          {hasErrors ? `${audit.seo_errors.length} problemas` : 'Correcto'}
                        </div>
                        <div className="flex items-center gap-1.5">
                           <span className={`text-[10px] font-bold ${wordCount < 100 ? 'text-orange-600' : 'text-slate-400'}`}>{wordCount} palabras</span>
                           <button onClick={(e) => { e.stopPropagation(); setModalData({ text: visibleText, url: audit.url }); }} className="p-1 rounded-md bg-slate-100 hover:bg-slate-200"><Eye size={12} /></button>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-right"><button onClick={() => setExpandedId(isExpanded ? null : audit.id)} className="p-2 hover:bg-slate-200 rounded-lg">{isExpanded ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}</button></td>
                  </tr>
                  
                  {isExpanded && (
                    <tr className="bg-slate-50/50">
                      <td colSpan={5} className="p-6 border-b border-slate-200">
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8">
                          
                          {/* Columna Izquierda: Errores Clásicos e IA */}
                          <div className="space-y-6">
                            
                            {/* --- CAJA DE AUDITORÍA IA --- */}
                            <div className="border border-indigo-100 rounded-xl overflow-hidden shadow-sm">
                              <div className="bg-indigo-50/50 px-4 py-3 border-b border-indigo-100 flex items-center justify-between">
                                <h4 className="text-xs font-black text-indigo-900 uppercase flex items-center gap-2">
                                  <BrainCircuit size={16} className="text-indigo-600"/> Analista Semántico IA
                                </h4>
                                {!aiResults[audit.id] && (
                                  <button 
                                    onClick={() => handleAiAudit(audit.id, audit.url, visibleText)}
                                    disabled={aiLoading === audit.id || !visibleText}
                                    className="flex items-center gap-1.5 bg-indigo-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                                  >
                                    {aiLoading === audit.id ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                                    Auditar Calidad
                                  </button>
                                )}
                              </div>
                              
                              <div className="p-4 bg-white">
                                {!aiResults[audit.id] ? (
                                  <p className="text-xs text-slate-500 italic">Pide a la IA que lea y evalúe la calidad real del texto, detecte Thin Content o falta de E-E-A-T.</p>
                                ) : (
                                  <div className="space-y-4 animate-in fade-in">
                                    <div className="flex items-center gap-4">
                                      <div className={`text-2xl font-black ${aiResults[audit.id].score < 50 ? 'text-red-500' : aiResults[audit.id].score < 80 ? 'text-amber-500' : 'text-emerald-500'}`}>
                                        {aiResults[audit.id].score}/100
                                      </div>
                                      {aiResults[audit.id].isThinContent && (
                                        <span className="bg-red-100 text-red-700 text-[10px] font-black px-2 py-1 rounded uppercase">Thin Content Detectado</span>
                                      )}
                                    </div>
                                    <p className="text-sm text-slate-700 font-medium leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                                      {aiResults[audit.id].verdict}
                                    </p>
                                    <div>
                                      <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Mejoras Sugeridas:</h5>
                                      <ul className="space-y-1">
                                        {aiResults[audit.id].improvements.map((imp: string, i: number) => (
                                          <li key={i} className="text-xs text-slate-600 flex gap-2"><span className="text-indigo-500">•</span> {imp}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Errores clásicos */}
                            {hasErrors && (
                              <div className="bg-red-50/50 border border-red-100 rounded-lg p-4">
                                <h4 className="text-[11px] font-bold text-red-600 uppercase mb-3 flex items-center gap-1.5"><AlertCircle className="w-4 h-4" /> Alertas Estructurales</h4>
                                <ul className="space-y-1.5 ml-1">
                                  {audit.seo_errors.map((err: string, i: number) => <li key={i} className="text-sm text-red-700">• {err}</li>)}
                                </ul>
                              </div>
                            )}
                          </div>

                          {/* Columna Derecha: JSON-LD y H1 (Tu código actual) */}
                          <div className="border-l border-slate-100 pl-8">
                             <h3 className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Code className="w-4 h-4" /> Entidades Schema (JSON-LD)
                             </h3>
                             <div className="max-h-[500px] overflow-y-auto pr-2 custom-scrollbar space-y-4">
                               {audit.entities?.map((ent: any, i: number) => (
                                 <div key={i} className="bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
                                   <div className="p-4 overflow-x-auto"><JsonNode data={ent} /></div>
                                 </div>
                               ))}
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
