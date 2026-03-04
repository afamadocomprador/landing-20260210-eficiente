"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2, ArrowRight, X } from "lucide-react";
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
  const [isExpanded, setIsExpanded] = useState(false);
  const [dictionary, setDictionary] = useState<TreatmentItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [phIndex, setPhIndex] = useState(0); 
  
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const handleExpand = () => {
    if (isExpanded) return;
    setIsExpanded(true);
    loadDictionary();
    
    // Le damos tiempo a la animación fluida antes de hacer focus
    setTimeout(() => {
      inputRef.current?.focus();
      wrapperRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 400); 
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(false);
    setQuery(""); 
    setTimeout(() => {
      const parentSection = wrapperRef.current?.closest('section');
      if (parentSection) {
        parentSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 50);
  };

  const handleSelect = (url: string) => {
    setIsExpanded(false);
    router.push(url);
  };

  // ⚡️ Sombra Neomórfica para la pastilla cerrada (Calculada para bg-gray-50)
  const neumorphicShadow = "4px 4px 10px #d4d5d6, -4px -4px 10px #ffffff";

  return (
    <div ref={wrapperRef} className="w-full relative z-50 flex flex-col items-center">
      
      {/* ⚡️ LA FICHA BASE (El "Riel"): Siempre tiene el 100% del ancho, incluso en móvil */}
      <div 
        className={`relative w-full h-[60px] md:h-[72px] bg-white rounded-full border border-gray-100 shadow-sm flex items-center p-1.5 md:p-2 cursor-pointer transition-colors duration-500`}
        onClick={!isExpanded ? handleExpand : undefined}
      >
        
        {/* TEXTO DE FONDO (Permanece quieto, la lupa lo "pisa" al crecer) */}
        <AnimatePresence>
          {!isExpanded && (
            <motion.div 
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute left-[70px] md:left-[80px] right-6 h-full flex items-center pointer-events-none"
            >
              <span className="text-base md:text-lg font-lemon text-dkv-green-dark truncate">
                Consultar precios
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ⚡️ LA PASTILLA MÁGICA (La Lupa que crece) */}
        <motion.div
          initial={false}
          animate={{
            // En móvil el botón cerrado mide unos 48px, en desktop 56px.
            // Al expandir, ocupa el 100% del riel interno.
            width: isExpanded ? "100%" : "3.5rem", 
            backgroundColor: isExpanded ? "#ffffff" : "#f9fafb", // bg-white vs bg-gray-50
            boxShadow: isExpanded 
              ? "0px 10px 25px -5px rgba(0,0,0,0.1)" // Sombra moderna al abrir
              : neumorphicShadow // Sombra neomórfica al cerrar
          }}
          // ⚡️ EL SECRETO DE LA SUAVIDAD: Un spring lento y sin rebote (bounce: 0)
          transition={{ type: "spring", bounce: 0, duration: 0.65 }}
          className="h-full rounded-full relative flex items-center overflow-hidden z-10 origin-left"
        >
          
          {/* ICONO DE LUPA (Siempre anclado a la izquierda de la pastilla) */}
          <div className="w-[3.5rem] flex-shrink-0 h-full flex items-center justify-center text-dkv-green">
            {isLoading && isExpanded ? <Loader2 className="w-5 h-5 md:w-6 md:h-6 animate-spin" /> : <Search className="w-5 h-5 md:w-6 md:h-6" />}
          </div>

          {/* ÁREA DE CAPTURA Y CARRUSEL (Aparece suavemente una vez que la pastilla empieza a crecer) */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                // Delay para que el texto aparezca cuando la barra ya tiene espacio
                transition={{ delay: 0.2, duration: 0.4 }}
                className="flex-grow h-full flex items-center relative"
              >
                
                {/* Carrusel de Placeholders Fantasma */}
                {query === "" && (
                  <div className="absolute inset-y-0 left-0 right-14 pointer-events-none flex items-center overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={phIndex}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="text-gray-400/80 text-base md:text-xl font-fsme italic truncate block"
                      >
                        {PLACEHOLDERS[phIndex]}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                )}
                
                {/* Input Editable */}
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full h-full bg-transparent text-base md:text-xl font-fsme text-dkv-green-dark focus:outline-none relative z-10 pr-14"
                />

                {/* Botón Cerrar */}
                <button 
                  onClick={handleClose}
                  className="absolute right-2 text-gray-400 hover:text-dkv-green transition-colors p-2 rounded-full hover:bg-gray-100 z-20"
                >
                  <X className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </div>

      {/* ⚡️ RESULTADOS DESPLEGABLES (Flotando libremente por debajo del riel) */}
      <AnimatePresence>
        {isExpanded && query.length >= 2 && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }} 
            // Absolute positioning referenciado al contenedor padre
            className="w-full bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(132,151,0,0.15)] border border-dkv-green absolute top-full mt-3 left-0 z-40 overflow-hidden"
          >
            <div className="p-4 md:p-6">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2 mb-3">
                Resultados para "{query}"
              </p>
              <div className="space-y-2">
                {results.length > 0 ? (
                  results.map((item, idx) => (
                    <button 
                      key={`${item.s}-${idx}`}
                      onClick={() => handleSelect(`/tratamientos/${item.s}`)}
                      className="w-full flex items-center justify-between p-3 md:p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:border-dkv-green hover:shadow-md transition-all group active:scale-[0.98]"
                    >
                      <div className="flex flex-col text-left pr-4 overflow-hidden">
                        <span className="font-bold text-dkv-green-dark text-sm md:text-lg group-hover:text-dkv-green transition-colors truncate">{item.n}</span>
                        <span className="text-[10px] md:text-[11px] font-bold text-gray-400 uppercase mt-1">{item.t}</span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0 bg-dkv-green/5 text-dkv-green px-3 py-1.5 rounded-full group-hover:bg-dkv-green group-hover:text-white transition-colors">
                        <span className="font-bold text-xs hidden md:inline">Ver precio</span>
                        <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="py-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                    <p className="text-gray-500 font-fsme text-base md:text-lg">No encontramos "{query}".</p>
                    <p className="text-dkv-green font-bold mt-2 text-xs md:text-sm">Prueba con "Implante" o "Limpieza"</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}