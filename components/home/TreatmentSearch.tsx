"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2, Smile, Zap, ArrowRight, ShieldCheck, Stethoscope } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { motion, AnimatePresence } from "framer-motion";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface TreatmentItem {
  n: string;
  t: string;
  s: string;
}

const PLACEHOLDERS = [
  "empaste",
  "funda",
  "matar un nervio",
  "dentadura postiza",
  "invisalign",
  "bruxismo"
];

export default function TreatmentSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<TreatmentItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [dictionary, setDictionary] = useState<TreatmentItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [phIndex, setPhIndex] = useState(0); 
  
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (query === "") { 
        setPhIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
      }
    }, 2000); 
    return () => clearInterval(interval);
  }, [query]); 

  const loadDictionary = async () => {
    if (dictionary || isLoading) return; 
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from('vw_search_treatments').select('n, t, s');
      if (error) throw error;
      setDictionary(data as TreatmentItem[]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (query.length >= 2 && dictionary) {
      const searchWord = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const filtered = dictionary.filter(item => 
        item.n.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchWord)
      ).slice(0, 6); 
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query, dictionary]);

  const handleFocus = () => {
    setIsOpen(true);
    loadDictionary();
    
    setTimeout(() => {
      wrapperRef.current?.scrollIntoView({ 
        behavior: "smooth", 
        block: "start" 
      });
    }, 150);
  };

  // ⚡️ NUEVA FUNCIÓN: Restauración de contexto Nivel Dios
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
    
    // Le damos un respiro al DOM para que empiece a colapsar y luego subimos
    setTimeout(() => {
      // Busca la sección padre automáticamente
      const parentSection = wrapperRef.current?.closest('section');
      if (parentSection) {
        parentSection.scrollIntoView({ 
          behavior: "smooth", 
          block: "start" 
        });
      }
    }, 50);
  };

  const categories = [
    { 
      name: "Tengo dolor", 
      desc: <>Caries, endodoncia...</>, 
      icon: <Zap className="w-6 h-6" />, 
      slug: "odontologia-general" 
    },
    { 
      name: "Me faltan piezas", 
      desc: <><span className="font-bold text-dkv-green bg-dkv-green/10 px-1.5 py-0.5 rounded">Implantes</span>, puentes...</>, 
      icon: <Stethoscope className="w-6 h-6" />, 
      slug: "implantes" 
    },
    { 
      name: "Quiero mejorar mi sonrisa", 
      desc: <><span className="font-bold text-dkv-green bg-dkv-green/10 px-1.5 py-0.5 rounded">Ortodoncia</span>, estética...</>, 
      icon: <Smile className="w-6 h-6" />, 
      slug: "ortodoncia" 
    }
  ];

  const handleSelect = (url: string) => {
    setIsOpen(false);
    router.push(url);
  };

  return (
    <div ref={wrapperRef} className="w-full relative z-50 scroll-mt-28">
      
      <div 
        className={`bg-white rounded-3xl transition-all duration-300 ease-out border overflow-hidden ${
          isOpen ? 'shadow-[0_20px_60px_-15px_rgba(132,151,0,0.15)] border-dkv-green' : 'shadow-xl border-gray-100'
        }`}
      >
        {/* CAJA DE BÚSQUEDA */}
        <div className="relative flex items-center p-2 bg-white z-20">
          <div className="absolute left-4 text-dkv-green z-20">
            {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Search className="w-5 h-5 md:w-6 md:h-6" />}
          </div>
          
          <div className="relative w-full flex items-center h-[56px] md:h-[64px]">
            {query === "" && (
              <div className="absolute left-11 right-28 pointer-events-none flex items-center h-full overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={phIndex}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="text-gray-400/80 text-lg md:text-2xl font-fsme italic truncate block"
                  >
                    {PLACEHOLDERS[phIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            )}
            
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={handleFocus}
              className="w-full pl-11 pr-24 py-4 md:py-5 bg-transparent text-lg md:text-2xl font-fsme text-dkv-green-dark focus:outline-none relative z-10"
            />
          </div>
          
          {!isOpen && (
            <div className="absolute right-4 hidden md:flex items-center gap-1.5 text-xs font-bold text-dkv-green bg-dkv-green/10 px-3 py-1.5 rounded-full z-20">
              <ShieldCheck className="w-4 h-4" />
              <span>Precios al instante</span>
            </div>
          )}

          {isOpen && (
            // ⚡️ Aplicamos el handleClose aquí
            <button 
              onClick={handleClose}
              className="absolute right-3 text-xs font-bold text-dkv-green bg-dkv-green/10 border border-dkv-green/20 hover:bg-dkv-green hover:text-white transition-colors px-4 py-2 rounded-full uppercase tracking-wider z-20"
            >
              Cerrar
            </button>
          )}
        </div>

        {/* ÁREA DE EXPANSIÓN INFERIOR */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }} 
              className="border-t-2 border-gray-100 bg-gray-50/80 pt-4 relative z-10"
            >
              <div className="p-4 md:p-6 pt-0 md:pt-2 rounded-b-3xl">
                
                {query.length < 2 ? (
                  <div className="space-y-4">
                    <div className="px-1 md:px-2 mb-4">
                      <h3 className="text-lg md:text-xl font-lemon text-dkv-green-dark text-left">
                        Si dudas ... ¡selecciona tu problema dental!
                      </h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {categories.map((cat, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSelect(`/categorias/${cat.slug}`)}
                          className="flex items-center p-4 rounded-2xl border border-gray-200 shadow-sm transition-all hover:border-dkv-green hover:shadow-md text-left bg-white group"
                        >
                          <div className="mr-4 text-dkv-green transition-transform group-hover:scale-110 shrink-0">
                            {cat.icon}
                          </div>
                          <div className="flex flex-col justify-center h-full overflow-hidden">
                            <span className="block font-bold text-dkv-green-dark text-lg leading-tight mb-1 truncate">{cat.name}</span>
                            <span className="text-base text-gray-500 leading-snug truncate w-full">{cat.desc}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2 mb-3">
                      Resultados para "{query}"
                    </p>
                    {results.length > 0 ? (
                      results.map((item, idx) => (
                        <button 
                          key={`${item.s}-${idx}`}
                          onClick={() => handleSelect(`/tratamientos/${item.s}`)}
                          className="w-full flex items-center justify-between p-4 rounded-xl bg-white border border-gray-200 shadow-sm hover:border-dkv-green hover:shadow-md transition-all group active:scale-[0.98]"
                        >
                          <div className="flex flex-col text-left pr-4">
                            <span className="font-bold text-dkv-green-dark text-base md:text-lg group-hover:text-dkv-green transition-colors line-clamp-1">
                              {item.n}
                            </span>
                            <span className="text-[11px] font-bold text-gray-400 uppercase mt-1">
                              {item.t}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-1.5 shrink-0 bg-dkv-green/5 text-dkv-green px-3 py-1.5 rounded-full group-hover:bg-dkv-green group-hover:text-white transition-colors">
                            <span className="font-bold text-xs">Ver precio</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="py-8 text-center bg-white rounded-2xl border border-dashed border-gray-300">
                        <p className="text-gray-500 font-fsme text-lg">No encontramos "{query}".</p>
                        <p className="text-dkv-green font-bold mt-2 text-sm">Prueba con "Implante", "Funda" o "Limpieza"</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}