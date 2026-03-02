"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2 } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface TreatmentItem {
  n: string;
  t: string;
  s: string;
}

export default function TreatmentSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<TreatmentItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [dictionary, setDictionary] = useState<TreatmentItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  const loadDictionary = async () => {
    if (dictionary || isLoading || isNavigating) return; 
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('vw_search_treatments') 
        .select('n, t, s');

      if (error) throw error;
      setDictionary(data as TreatmentItem[]);
    } catch (error) {
      console.error("Error cargando el diccionario de tratamientos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNavigating) return;
    const value = e.target.value;
    setQuery(value);

    if (value.length >= 2 && dictionary) {
      const searchWord = value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      
      const filtered = dictionary.filter(item => {
        const itemName = item.n.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return itemName.includes(searchWord);
      }).slice(0, 6);

      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  const handleSelect = (urlDestino: string, displayName: string) => {
    setQuery(displayName);
    setIsOpen(false);
    setIsNavigating(true); 
    router.push(urlDestino);
  };

  const handleSearch = () => {
    if (!query || isNavigating) return;

    if (results.length > 0) {
      handleSelect(`/tratamientos/${results[0].s}`, results[0].n); 
    } else if (dictionary) {
      const searchWord = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const match = dictionary.find(item => 
        item.n.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchWord)
      );
      
      if (match) {
        handleSelect(`/tratamientos/${match.s}`, match.n);
      }
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-4xl mx-auto z-50 text-left font-fsme">
      
      {/* PASTILLA BUSCADOR */}
      <div 
        className={`bg-white rounded-full border p-2 flex items-center relative transition-all duration-300 
          ${isNavigating 
            ? 'border-dkv-green/50 ring-2 ring-dkv-green/20 bg-gray-50/50 cursor-wait shadow-inner' 
            : isOpen 
              ? 'border-gray-200 ring-2 ring-dkv-green/30 shadow-xl' 
              : 'border-gray-200 shadow-lg hover:shadow-xl'
          }`}
        onClick={() => {
          if (isNavigating) return;
          setIsOpen(true);
          loadDictionary();
          
          if (wrapperRef.current) {
            const headerElement = document.querySelector('header'); 
            const headerHeight = headerElement ? headerElement.offsetHeight : 90;
            const yOffset = -(headerHeight + 24); 
            const element = wrapperRef.current;
            const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }}
      >
        <div className="pl-4 pr-2 text-dkv-green">
          {isNavigating ? (
            <Loader2 className="w-6 h-6 animate-spin text-dkv-green" />
          ) : isLoading ? (
            <Search className="w-6 h-6 animate-pulse opacity-50" />
          ) : (
            <Search className="w-6 h-6" />
          )}
        </div>

        <input
          type="text"
          placeholder="¿Qué tratamiento necesitas? (Ej: Implantes, Endodoncia...)"
          className={`flex-1 w-full bg-transparent border-none focus:ring-0 px-2 py-4 text-lg outline-none transition-colors
            ${isNavigating ? 'text-gray-400 placeholder-gray-300 cursor-wait' : 'text-gray-700 placeholder-gray-400'}
          `}
          value={query}
          readOnly={isNavigating}
          onChange={handleInputChange}
          onFocus={() => {
            if(!isNavigating) setIsOpen(true);
          }}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()} 
        />
      </div>

      {/* MENÚ DESPLEGABLE */}
      {isOpen && !isNavigating && (
        <div className="absolute top-full left-0 right-0 mt-4 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden divide-y divide-gray-50 py-2">
          
          {/* ESTADO 1: INTENCIONES (Reposo) */}
          {query.length === 0 && (
            <div className="flex flex-col">
                <div 
                  onClick={() => handleSelect('/tratamientos/endodoncias-extracciones-curas', 'Tengo dolor agudo')}
                  className="px-6 py-4 hover:bg-orange-50/50 cursor-pointer flex items-center gap-5 group transition-colors"
                >
                  <div className="w-12 h-12 flex-shrink-0 transition-transform group-hover:scale-110 group-hover:rotate-3">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
                      <defs>
                        <linearGradient id="iconDolor" x1="50%" y1="0%" x2="50%" y2="100%">
                          <stop offset="0%" stopColor="#FFD231" />
                          <stop offset="100%" stopColor="#EA580C" />
                        </linearGradient>
                      </defs>
                      <path d="M13 2.5L6 13H11.5L10.5 21.5L18 11H12.5L13 2.5Z" fill="url(#iconDolor)" stroke="#B45309" strokeWidth="0.5" strokeLinejoin="round"/>
                      <path d="M13 3.5L7.2 12.5H12L11 19.5L16.8 11H12L13 3.5Z" fill="white" fillOpacity="0.35"/>
                    </svg>
                  </div>
                  <div>
                    <span className="text-gray-900 font-bold text-lg block leading-tight">Tengo dolor agudo</span>
                    <span className="text-gray-500 text-sm block mt-0.5">Endodoncias, Extracciones y Curas</span>
                  </div>
                </div>

                <div 
                  onClick={() => handleSelect('/tratamientos/implantes-protesis-reconstrucciones', 'Me faltan piezas')}
                  className="px-6 py-4 hover:bg-blue-50/50 cursor-pointer flex items-center gap-5 group transition-colors"
                >
                  <div className="w-12 h-12 flex-shrink-0 transition-transform group-hover:scale-110 group-hover:-rotate-6">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
                      <defs>
                        <linearGradient id="iconDiente" x1="50%" y1="0%" x2="50%" y2="100%">
                          <stop offset="0%" stopColor="#FFFFFF" />
                          <stop offset="100%" stopColor="#BFDBFE" />
                        </linearGradient>
                      </defs>
                      <path d="M16 3C14 3 13 4 12 5C11 4 10 3 8 3C5.5 3 4 5 4 8C4 11 6 15 8 18C9 19.5 10 21 12 21C14 21 15 19.5 16 18C18 15 20 11 20 8C20 5 18.5 3 16 3Z" fill="url(#iconDiente)" stroke="#1E3A8A" strokeWidth="0.5" strokeLinejoin="round"/>
                      <path d="M12 21V23 M10 23H14 M11 22H13" stroke="#94A3B8" strokeWidth="1" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div>
                    <span className="text-gray-900 font-bold text-lg block leading-tight">Me faltan piezas</span>
                    <span className="text-gray-500 text-sm block mt-0.5">Implantes, prótesis, postizos y fundas</span>
                  </div>
                </div>

                <div 
                  onClick={() => handleSelect('/tratamientos/ortodoncia-estetica', 'Mejorar mi sonrisa')}
                  className="px-6 py-4 hover:bg-purple-50/50 cursor-pointer flex items-center gap-5 group transition-colors"
                >
                  <div className="w-12 h-12 flex-shrink-0 transition-transform group-hover:scale-110">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
                      <defs>
                        <linearGradient id="iconEstetica" x1="50%" y1="0%" x2="50%" y2="100%">
                          <stop offset="0%" stopColor="#E9D5FF" />
                          <stop offset="100%" stopColor="#A855F7" />
                        </linearGradient>
                      </defs>
                      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="url(#iconEstetica)" stroke="#581C87" strokeWidth="0.5" strokeLinejoin="round"/>
                      <circle cx="18" cy="5" r="2" fill="#D8B4FE" />
                      <circle cx="5" cy="18" r="1.5" fill="#D8B4FE" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-gray-900 font-bold text-lg block leading-tight">Mejorar mi sonrisa</span>
                    <span className="text-gray-500 text-sm block mt-0.5">Ortodoncia y Estética</span>
                  </div>
                </div>

                <div 
                  onClick={() => handleSelect('/tratamientos/prevencion', 'Quiero prevenir')}
                  className="px-6 py-4 hover:bg-[#F4F8F1] cursor-pointer flex items-center gap-5 group transition-colors"
                >
                  <div className="w-12 h-12 flex-shrink-0 transition-transform group-hover:scale-110 group-hover:translate-y-1">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
                      <defs>
                        <linearGradient id="iconEscudo" x1="50%" y1="0%" x2="50%" y2="100%">
                          <stop offset="0%" stopColor="#C6FF00" />
                          <stop offset="100%" stopColor="#849700" />
                        </linearGradient>
                      </defs>
                      <path d="M12 2L3 6V11C3 16.5 7 21.5 12 23C17 21.5 21 16.5 21 11V6L12 2Z" fill="url(#iconEscudo)" stroke="#3D4500" strokeWidth="0.5" strokeLinejoin="round"/>
                      <path d="M12 3.5L4.5 7V11C4.5 15.5 8 19.5 12 21C16 19.5 19.5 15.5 19.5 11V7L12 3.5Z" fill="white" fillOpacity="0.25"/>
                    </svg>
                  </div>
                  <div>
                    <span className="text-gray-900 font-bold text-lg block leading-tight">Quiero prevenir</span>
                    <span className="text-gray-500 text-sm block mt-0.5">Limpiezas, Radiografías y Diagnóstico</span>
                  </div>
                </div>

                <div 
                  onClick={() => handleSelect('/tratamientos/odontopediatria', 'Odontopediatría')}
                  className="px-6 py-4 hover:bg-yellow-50/50 cursor-pointer flex items-center gap-5 group transition-colors"
                >
                  <div className="w-12 h-12 flex-shrink-0 transition-transform group-hover:scale-110 group-hover:-rotate-6">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
                      <defs>
                        <linearGradient id="iconOso" x1="50%" y1="0%" x2="50%" y2="100%">
                          <stop offset="0%" stopColor="#FEF08A" />
                          <stop offset="100%" stopColor="#EAB308" />
                        </linearGradient>
                      </defs>
                      <circle cx="12" cy="12" r="7" fill="url(#iconOso)" stroke="#854D0E" strokeWidth="0.5"/>
                      <circle cx="6" cy="7" r="3" fill="url(#iconOso)" stroke="#854D0E" strokeWidth="0.5"/>
                      <circle cx="18" cy="7" r="3" fill="url(#iconOso)" stroke="#854D0E" strokeWidth="0.5"/>
                      <circle cx="10" cy="11" r="1" fill="#854D0E" />
                      <circle cx="14" cy="11" r="1" fill="#854D0E" />
                      <ellipse cx="12" cy="14" rx="2" ry="1.5" fill="#FEF9C3" stroke="#854D0E" strokeWidth="0.5"/>
                      <path d="M12 13.5V14.5" stroke="#854D0E" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div>
                    <span className="text-gray-900 font-bold text-lg block leading-tight">Odontopediatría</span>
                    <span className="text-gray-500 text-sm block mt-0.5">Cobertura total para menores de 15 años</span>
                  </div>
                </div>

            </div>
          )}


          {/* ESTADO 2: RESULTADOS PREDICTIVOS (Corregido para móvil y textos largos) */}
          {query.length > 0 && results.length > 0 && results.map((item, idx) => (
            <div 
              key={`${item.s}-${idx}`}
              onClick={() => handleSelect(`/tratamientos/${item.s}`, item.n)}
              className="px-6 py-4 hover:bg-gray-50 cursor-pointer flex items-center justify-between group transition-colors gap-4"
            >
              {/* Texto a la izquierda: Permitimos que ocupe varias líneas si es muy largo */}
              <span className="text-gray-800 font-medium text-base sm:text-lg leading-tight pl-2">
                {item.n}
              </span>
              
              {/* Etiqueta a la derecha: 
                  1. Quitamos 'hidden sm:block' para que se vea en móviles.
                  2. Añadimos 'shrink-0' para que el texto largo no la aplaste.
                  3. Copiamos los colores exactos de HeroSearch (gris -> verde al hacer hover).
              */}
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-500 bg-gray-100 px-3 py-1 rounded-full group-hover:bg-green-50 group-hover:text-dkv-green transition-colors whitespace-nowrap shrink-0">
                {item.t}
              </span>
            </div>
          ))}


          {/* ESTADO 3: SIN RESULTADOS */}
          {query.length > 1 && results.length === 0 && dictionary && (
            <div className="px-6 py-8 text-center text-gray-500">
              <span className="block font-medium text-lg mb-1">No hemos encontrado "{query}"</span>
              <span className="text-sm">Prueba a buscar por especialidad (ej. Ortodoncia).</span>
            </div>
          )}
          
        </div>
      )}
    </div>
  );
}