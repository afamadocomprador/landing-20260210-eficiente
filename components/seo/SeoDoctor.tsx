// components/seo/SeoDoctor.tsx

'use client';

import React, { useState } from 'react';
import { 
  Search, AlertOctagon, AlertTriangle, CheckCircle, Activity, 
  Image as ImageIcon, Link as LinkIcon, FileText, Gauge, 
  Zap, Accessibility, Wrench, ChevronDown, ChevronUp, CheckCircle2
} from 'lucide-react';

const ScoreCircle = ({ label, score }: { label: string, score: number }) => {
  let colorClass = 'text-red-500';
  let strokeClass = 'stroke-red-500';
  let bgStrokeClass = 'stroke-red-100';

  if (score >= 90) {
    colorClass = 'text-emerald-500';
    strokeClass = 'stroke-emerald-500';
    bgStrokeClass = 'stroke-emerald-100';
  } else if (score >= 50) {
    colorClass = 'text-amber-500';
    strokeClass = 'stroke-amber-500';
    bgStrokeClass = 'stroke-amber-100';
  }

  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-24 h-24 flex items-center justify-center">
        <svg className="transform -rotate-90 w-24 h-24">
          <circle cx="48" cy="48" r={radius} strokeWidth="8" fill="transparent" className={bgStrokeClass} />
          <circle 
            cx="48" cy="48" r={radius} strokeWidth="8" fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={`${strokeClass} transition-all duration-1000 ease-out`}
          />
        </svg>
        <span className={`absolute text-2xl font-black ${colorClass}`}>{score}</span>
      </div>
      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">{label}</span>
    </div>
  );
};

// --- COMPONENTE MEJORADO: Lista de TODAS las auditorías con colores ---
const IssueList = ({ title, icon: Icon, issues }: { title: string, icon: any, issues: any[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!issues || issues.length === 0) return null;

  // Calculamos cuántos hay de cada para el resumen del botón
  const criticalCount = issues.filter(i => i.score < 0.5).length;
  const warningCount = issues.filter(i => i.score >= 0.5 && i.score < 0.9).length;
  const passedCount = issues.filter(i => i.score >= 0.9).length;

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-slate-50 px-6 py-4 flex items-center justify-between border-b border-slate-100 hover:bg-slate-100 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5 text-slate-600" />
          <h4 className="font-bold text-slate-800">{title}</h4>
          
          {/* Etiquetas de resumen */}
          <div className="hidden sm:flex gap-1.5 ml-2">
            {criticalCount > 0 && <span className="bg-red-100 text-red-700 text-[10px] font-black px-2 py-0.5 rounded-md">{criticalCount} Errores</span>}
            {warningCount > 0 && <span className="bg-amber-100 text-amber-700 text-[10px] font-black px-2 py-0.5 rounded-md">{warningCount} Mejoras</span>}
            {passedCount > 0 && <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black px-2 py-0.5 rounded-md">{passedCount} Superados</span>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium sm:hidden">{issues.length} parámetros</span>
          {isOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
        </div>
      </button>
      
      {isOpen && (
        <div className="divide-y divide-slate-100">
          {issues.map((issue: any, idx: number) => {
            const isCritical = issue.score < 0.5;
            const isWarning = issue.score >= 0.5 && issue.score < 0.9;
            const isPassed = issue.score >= 0.9;

            let IconStatus = CheckCircle2;
            let iconColor = "text-emerald-500";
            let bgHover = "hover:bg-emerald-50/30";

            if (isCritical) {
              IconStatus = AlertOctagon;
              iconColor = "text-red-500";
              bgHover = "hover:bg-red-50/30";
            } else if (isWarning) {
              IconStatus = AlertTriangle;
              iconColor = "text-amber-500";
              bgHover = "hover:bg-amber-50/30";
            }

            return (
              <div key={idx} className={`p-6 flex gap-4 transition-colors ${bgHover}`}>
                <div className="shrink-0 mt-0.5">
                  <IconStatus className={`w-5 h-5 ${iconColor}`} />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                    <h5 className={`font-bold text-sm ${isPassed ? 'text-slate-700' : 'text-slate-900'}`}>
                      {issue.title}
                    </h5>
                    {issue.displayValue && (
                      <span className="shrink-0 bg-slate-100 text-slate-600 text-[11px] font-mono font-bold px-2.5 py-1 rounded-md border border-slate-200">
                        {issue.displayValue}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-4xl">
                    {issue.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default function SeoDoctor() {
  const [url, setUrl] = useState('');
  const [loadingStatic, setLoadingStatic] = useState(false);
  const [staticReport, setStaticReport] = useState<any>(null);
  const [loadingSpeed, setLoadingSpeed] = useState(false);
  const [speedReport, setSpeedReport] = useState<any>(null);
  const [error, setError] = useState('');

  const handleStaticAnalyze = async () => {
    if (!url) return;
    setLoadingStatic(true); setError(''); setStaticReport(null);

    try {
      const validUrl = url.startsWith('http') ? url : `https://${url}`;
      const res = await fetch('/api/seo/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: validUrl })
      });
      const data = await res.json();
      if (data.success) setStaticReport(data.report);
      else setError(data.error);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoadingStatic(false);
    }
  };

  const handleSpeedAnalyze = async () => {
    if (!url) return;
    if (url.includes('localhost')) {
      setError('Google PageSpeed no puede analizar "localhost". Introduce la URL pública.');
      return;
    }

    setLoadingSpeed(true); setError(''); setSpeedReport(null);

    try {
      const validUrl = url.startsWith('http') ? url : `https://${url}`;
      const res = await fetch('/api/seo/pagespeed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: validUrl, strategy: 'mobile' }) 
      });
      const data = await res.json();
      if (data.success) setSpeedReport(data);
      else setError(data.error);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoadingSpeed(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden font-sans w-full">
      <div className="bg-slate-900 p-6 md:p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold flex items-center gap-3 mb-2">
            <Activity className="w-7 h-7 text-indigo-400" />
            Doctor SEO & Rendimiento
          </h2>
          <p className="text-slate-400 text-sm">Audita el código fuente al instante o conecta con Google para medir Core Web Vitals.</p>
          
          <div className="mt-8">
            <input 
              type="text" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://tu-proyecto.vercel.app/dentistas/tauste" 
              className="w-full px-5 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
            />
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={handleStaticAnalyze}
                disabled={loadingStatic || loadingSpeed || !url}
                className="flex-1 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                {loadingStatic ? <Activity className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                1. Análisis Estructural (Rápido)
              </button>
              
              <button 
                onClick={handleSpeedAnalyze}
                disabled={loadingStatic || loadingSpeed || !url}
                className="flex-1 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                {loadingSpeed ? <Gauge className="w-5 h-5 animate-spin" /> : <Gauge className="w-5 h-5" />}
                2. Core Web Vitals (Google PSI)
              </button>
            </div>
            {loadingSpeed && <p className="text-emerald-400 text-xs mt-3 text-center animate-pulse">Descargando reporte oficial en español (puede tardar 15s)...</p>}
          </div>
        </div>
      </div>

      {error && (
        <div className="p-6 bg-red-50 text-red-600 border-b border-red-100 flex items-center gap-2 font-medium">
          <AlertOctagon className="w-5 h-5 shrink-0" /> {error}
        </div>
      )}

      {speedReport && (
        <div className="bg-slate-50/50">
          <div className="p-8 border-b border-slate-200">
            <div className="flex items-center gap-2 mb-8">
              <Gauge className="w-5 h-5 text-slate-700" />
              <h3 className="font-bold text-slate-800 text-lg">Puntuación Oficial de Google (Móvil)</h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
              <ScoreCircle label="Rendimiento" score={speedReport.scores.performance} />
              <ScoreCircle label="Accesibilidad" score={speedReport.scores.accessibility} />
              <ScoreCircle label="Prácticas" score={speedReport.scores.bestPractices} />
              <ScoreCircle label="SEO" score={speedReport.scores.seo} />
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col md:flex-row gap-8 justify-around">
              <div className="text-center">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Carga Principal (LCP)</p>
                <p className={`text-xl font-black ${parseFloat(speedReport.metrics.lcp) <= 2.5 ? 'text-emerald-600' : 'text-red-500'}`}>
                  {speedReport.metrics.lcp}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Estabilidad Visual (CLS)</p>
                <p className={`text-xl font-black ${parseFloat(speedReport.metrics.cls) <= 0.1 ? 'text-emerald-600' : 'text-red-500'}`}>
                  {speedReport.metrics.cls}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Índice de Velocidad</p>
                <p className="text-xl font-black text-slate-700">{speedReport.metrics.speedIndex}</p>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-4">
            <div className="flex items-center gap-2 mb-6">
              <Activity className="w-5 h-5 text-slate-700" />
              <h3 className="font-bold text-slate-800 text-lg">Todos los Parámetros Evaluados</h3>
            </div>
            
            <IssueList title="Rendimiento y Carga" icon={Zap} issues={speedReport.detailedIssues?.performance} />
            <IssueList title="Accesibilidad Web" icon={Accessibility} issues={speedReport.detailedIssues?.accessibility} />
            <IssueList title="Mejores Prácticas" icon={Wrench} issues={speedReport.detailedIssues?.bestPractices} />
            <IssueList title="SEO Técnico" icon={Search} issues={speedReport.detailedIssues?.seo} />
          </div>
        </div>
      )}

      {staticReport && (
        <div className="p-8 bg-white">
           <div className="flex items-center gap-2 mb-6">
            <Search className="w-5 h-5 text-slate-700" />
            <h3 className="font-bold text-slate-800 text-lg">Análisis de Calidad SEO y Semántica</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center gap-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><FileText className="w-5 h-5" /></div>
              <div>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Palabras (Texto)</p>
                <p className="text-xl font-black text-slate-700">{staticReport.stats.words}</p>
              </div>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center gap-4">
              <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg"><Activity className="w-5 h-5" /></div>
              <div>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Etiquetas HTML (H)</p>
                <p className="text-xl font-black text-slate-700">{staticReport.stats.headersTotal || 0}</p>
              </div>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center gap-4">
              <div className="p-3 bg-purple-100 text-purple-600 rounded-lg"><ImageIcon className="w-5 h-5" /></div>
              <div>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Imágenes</p>
                <p className="text-xl font-black text-slate-700">{staticReport.stats.images || 0}</p>
              </div>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center gap-4">
              <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg"><LinkIcon className="w-5 h-5" /></div>
              <div>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Entidades (Schema)</p>
                <p className="text-xl font-black text-slate-700">{staticReport.stats.entities || 0}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {staticReport.critical.length > 0 && (
              <div className="bg-white border border-red-200 rounded-xl shadow-sm overflow-hidden">
                <div className="bg-red-50 px-4 py-3 border-b border-red-100 flex items-center gap-2">
                  <AlertOctagon className="w-4 h-4 text-red-600" />
                  <h3 className="font-bold text-red-800 uppercase tracking-widest text-[11px]">Riesgos Críticos (Penalizaciones)</h3>
                </div>
                <ul className="p-4 space-y-3">
                  {staticReport.critical.map((msg: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700 font-medium leading-snug">
                      <span className="text-red-500 font-black mt-0.5">•</span> {msg}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {staticReport.warnings.length > 0 && (
              <div className="bg-white border border-amber-200 rounded-xl shadow-sm overflow-hidden">
                <div className="bg-amber-50 px-4 py-3 border-b border-amber-100 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <h3 className="font-bold text-amber-800 uppercase tracking-widest text-[11px]">Sugerencias de Mejora</h3>
                </div>
                <ul className="p-4 bg-amber-50/20 space-y-3">
                  {staticReport.warnings.map((msg: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700 leading-snug">
                      <span className="text-amber-500 font-black mt-0.5 text-[10px] uppercase tracking-widest">TIP:</span> 
                      <span>{msg}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {staticReport.good.length > 0 && (
              <div className="bg-white border border-emerald-200 rounded-xl shadow-sm overflow-hidden">
                <div className="bg-emerald-50 px-4 py-3 border-b border-emerald-100 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <h3 className="font-bold text-emerald-800 uppercase tracking-widest text-[11px]">Buenas Prácticas Cumplidas</h3>
                </div>
                <ul className="p-4 space-y-2">
                  {staticReport.good.map((msg: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="text-emerald-500 font-black mt-0.5">✓</span> {msg}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
