// app/admin/seo/TextoVisorModal.tsx
'use client';
import { X, FileText, AlertTriangle } from 'lucide-react';

export default function TextoVisorModal({ text, url, onClose }: { text: string, url: string, onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-orange-200">
        <div className="bg-orange-50 px-6 py-4 border-b border-orange-100 flex justify-between items-center">
          <h4 className="text-xs font-bold text-orange-900 uppercase flex items-center gap-2">
            <FileText size={16}/> Auditoría de Texto: {url.split('/').pop() || 'Home'}
          </h4>
          <button onClick={onClose} className="text-orange-900 hover:rotate-90 transition-transform p-1">
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          <div className="bg-slate-50 p-5 rounded-xl border border-orange-100 max-h-[400px] overflow-y-auto italic text-slate-700 text-[13px] leading-relaxed font-serif shadow-inner">
            "{text || 'No hay contenido de texto capturado para esta URL.'}"
          </div>
          <p className="mt-4 text-[10px] text-orange-600 font-medium italic bg-orange-50 p-2 rounded">
            * Este es el bloque de texto que el motor utilizó para el conteo de palabras.
          </p>
        </div>
      </div>
    </div>
  );
}