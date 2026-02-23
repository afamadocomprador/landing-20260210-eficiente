"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Navigation } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

interface SearchItem {
  n: string; // Nombre
  t: string; // Tipo
  s: string; // Slug
}

export default function HeroSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [dictionary, setDictionary] = useState<SearchItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLocating, setIsLocating] = useState(false); // 🌟 Nuevo estado
  
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const loadDictionary = async () => {
    if (dictionary || isLoading) return; 
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('vw_search_predictive')
        .select('*');

      if (error) throw error;
      setDictionary(data as SearchItem[]);
    } catch (error) {
      console.error("Error cargando el diccionario predictivo:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSelect = (slug: string, name: string) => {
    setQuery(name);
    setIsOpen(false);
    router.push(`/dentistas/${slug}`);
  };

  const handleSearch = () => {
    if (!query) return;

    if (results.length > 0) {
      handleSelect(results[0].s, results[0].n);
    } else if (dictionary) {
      const searchWord = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const match = dictionary.find(item => 
        item.n.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchWord)
      );
      
      if (match) {
        handleSelect(match.s, match.n);
      }
    }
  };

  const handleGeolocate = () => {
    if (!("geolocation" in navigator)) {
      alert("Tu navegador no soporta la geolocalización.");
      return;
    }

    setIsLocating(true); // Mostramos feedback visual al instante

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        setIsOpen(false);
        const { latitude, longitude } = position.coords;
        router.push(`/dentistas/cerca-de-mi?lat=${latitude}&lng=${longitude}`);
      },
      (error) => {
        setIsLocating(false);
        console.warn("Error de geolocalización:", error);
        
        // 🌟 Manejo de errores específico para móviles
        switch(error.code) {
          case error.PERMISSION_DENIED:
            alert("📍 No tenemos permiso para ver tu ubicación. Por favor, actívala en los Ajustes de tu iPhone/Móvil para usar esta función.");
            break;
          case error.POSITION_UNAVAILABLE:
            alert("📍 La señal del GPS no está disponible en este momento. Inténtalo de nuevo en unos segundos.");
            break;
          case error.TIMEOUT:
            alert("📍 Hemos tardado demasiado en encontrarte. Por favor, asegúrate de tener buena cobertura.");
            break;
          default:
            alert("📍 Ha ocurrido un error al intentar localizarte. Usa la búsqueda por texto, por favor.");
        }
      },
      // 🌟 Opciones extra para forzar precisión en móviles
      {
        enableHighAccuracy: true, // Fuerza a usar el GPS real, no solo la IP
        timeout: 10000,           // Espera hasta 10 segundos antes de dar error
        maximumAge: 0             // No usa caché antigua, busca la posición actual
      }
    );
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
    <div ref={wrapperRef} className="relative w-full max-w-3xl mx-auto z-50 text-left">
      
      {/* 1. PASTILLA RESPONSIVE (Apilada en móvil, horizontal en PC) */}
      {/* 1. PASTILLA RESPONSIVE (Apilada en móvil, horizontal en PC) */}
{/* 1. PASTILLA RESPONSIVE (Apilada en móvil, horizontal en PC) */}
      <div 
        className={`bg-white rounded-3xl sm:rounded-full shadow-lg border border-gray-200 p-3 sm:p-2 flex flex-col sm:flex-row items-center relative transition-all duration-300 ${isOpen ? 'ring-2 ring-dkv-green/30 shadow-xl' : 'hover:shadow-xl'}`}
        onClick={() => {
          setIsOpen(true);
          loadDictionary();
          
          if (wrapperRef.current) {
            const headerElement = document.querySelector('header'); 
            const headerHeight = headerElement ? headerElement.offsetHeight : 90;
            const breathingRoom = 24; 
            const yOffset = -(headerHeight + breathingRoom); 
            
            const element = wrapperRef.current;
            const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
            
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }}
      >
        {/* Fila 1 en móvil / Izquierda en PC: Icono + Input */}
        <div className="flex items-center w-full">
          <div className="pl-2 sm:pl-4 pr-2 text-dkv-green">
            <Search className="w-6 h-6" />
          </div>

          <input
            type="text"
            placeholder="Busca por provincia, municipio, barrio..."
            className="flex-1 w-full bg-transparent border-none focus:ring-0 px-2 py-2 sm:py-3 text-gray-700 text-base sm:text-lg placeholder-gray-400 outline-none"
            value={query}
            onChange={handleInputChange}
            onFocus={() => setIsOpen(true)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>

        {/* 🌟 EL BOTÓN MÁGICO OCULTO 🌟 
            Usamos max-height para el móvil y max-width para el PC para animar su aparición */}
        <div 
          className={`overflow-hidden transition-all duration-500 ease-in-out flex w-full sm:w-auto justify-end
            ${query.trim().length > 0 
              ? 'max-h-20 opacity-100 sm:max-w-[200px] mt-2 sm:mt-0 sm:ml-2' 
              : 'max-h-0 opacity-0 sm:max-w-0'
            }`}
        >
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleSearch();
            }} 
            className="w-full sm:w-auto bg-dkv-green hover:bg-dkv-green-dark text-white font-bold py-3 px-8 rounded-full transition-all text-base sm:text-lg shadow-md flex-shrink-0 whitespace-nowrap"
          >
            {isLoading ? "..." : "Buscar"}
          </button>
        </div>
      </div>


      {/* 2. MENÚ DESPLEGABLE (Aparece al hacer Focus) */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-4 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden divide-y divide-gray-50 py-2">
          
          {/* ESTADO A: Caja Vacía -> Mostramos "Búsqueda Cercana" */}
          {query.length === 0 && (
            <div 
              onClick={handleGeolocate}
              className="px-6 py-4 hover:bg-gray-50 cursor-pointer flex items-center gap-4 group transition-colors"
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-colors
                ${isLocating ? 'bg-dkv-green text-white animate-pulse' : 'bg-green-50 text-dkv-green group-hover:bg-dkv-green group-hover:text-white'}`}
              >
                <Navigation className={`w-6 h-6 transition-colors ${isLocating ? 'animate-spin' : ''}`} />
              </div>
              <div>
                <span className="text-gray-800 font-bold text-lg block">
                  {isLocating ? "Buscando tu ubicación..." : "Búsqueda cercana"}
                </span>
                <span className="text-gray-500 text-sm block">
                  {isLocating ? "Espera un momento, por favor" : "Encuentra dentistas cerca de tu ubicación actual"}
                </span>
              </div>
            </div>
          )}


          {/* ESTADO B: Escribiendo -> Mostramos Resultados Predictivos */}
          {query.length > 0 && results.length > 0 && results.map((item, idx) => (
            <div 
              key={`${item.s}-${idx}`}
              onClick={() => handleSelect(item.s, item.n)}
              className="px-6 py-4 hover:bg-gray-50 cursor-pointer flex items-center justify-between group transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-green-50 transition-colors flex-shrink-0">
                  <MapPin className="w-5 h-5 text-gray-400 group-hover:text-dkv-green transition-colors" />
                </div>
                <span className="text-gray-800 font-medium text-base sm:text-lg">{item.n}</span>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 bg-gray-100 px-3 py-1 rounded-full group-hover:bg-green-50 group-hover:text-dkv-green transition-colors whitespace-nowrap ml-2">
                {item.t}
              </span>
            </div>
          ))}

          {/* ESTADO C: Escribiendo -> No hay resultados */}
          {query.length > 1 && results.length === 0 && dictionary && (
            <div className="px-6 py-8 text-center text-gray-500">
              <span className="block font-medium text-lg mb-1">No hay resultados para "{query}"</span>
              <span className="text-sm">Prueba con el nombre de otra localidad cercana.</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}