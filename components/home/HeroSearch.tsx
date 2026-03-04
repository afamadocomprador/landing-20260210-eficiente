// components/home/HeroSearch.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Navigation, Loader2 } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface SearchItem {
  n: string;
  t: string;
  s: string;
}

// 🌟 CIUDADES EN MINÚSCULAS
const PLACEHOLDER_CITIES = ["calatayud", "huesca", "almendralejo", "sitges", "eibar"];

export default function HeroSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [dictionary, setDictionary] = useState<SearchItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  
  const [isNavigating, setIsNavigating] = useState(false);
  
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  // 🌟 ESTADOS PARA EL PLACEHOLDER ANIMADO
  const [typedPlaceholder, setTypedPlaceholder] = useState("");
  const [isAnimatingUp, setIsAnimatingUp] = useState(false);

  // 🌟 LÓGICA MAESTRA: TECLEO Y ANIMACIÓN HACIA ARRIBA
  useEffect(() => {
    // Si el usuario hace clic o escribe, vaciamos todo para dejar el campo en blanco
    if (isOpen || query.length > 0 || isNavigating) {
      setTypedPlaceholder("");
      setIsAnimatingUp(false);
      return;
    }

    let isMounted = true;
    let cityIdx = 0;
    let text = '';
    let timerId: NodeJS.Timeout;
    
    // Máquina de estados: TYPING -> PAUSED -> ANIMATING_UP -> WAITING_NEXT
    let state = 'TYPING'; 

    const loop = () => {
      if (!isMounted) return;
      const fullText = PLACEHOLDER_CITIES[cityIdx];

      if (state === 'TYPING') {
        text = fullText.substring(0, text.length + 1);
        setTypedPlaceholder(text);

        if (text === fullText) {
          state = 'PAUSED';
          timerId = setTimeout(loop, 2500); // Pausa de 2.5s con la palabra completa
        } else {
          timerId = setTimeout(loop, 120); // Velocidad de tecleo
        }
      } 
      else if (state === 'PAUSED') {
        // Disparamos la animación CSS hacia arriba
        setIsAnimatingUp(true);
        state = 'ANIMATING_UP';
        timerId = setTimeout(loop, 300); // Esperamos a que acabe la transición CSS
      } 
      else if (state === 'ANIMATING_UP') {
        // Limpiamos el texto invisible y reseteamos la posición
        text = '';
        setTypedPlaceholder('');
        setIsAnimatingUp(false);
        cityIdx = (cityIdx + 1) % PLACEHOLDER_CITIES.length; // Pasamos a la siguiente ciudad
        state = 'WAITING_NEXT';
        timerId = setTimeout(loop, 300); // Pausa con el campo vacío antes de empezar
      } 
      else if (state === 'WAITING_NEXT') {
        state = 'TYPING';
        loop();
      }
    };

    timerId = setTimeout(loop, 500);

    return () => {
      isMounted = false;
      clearTimeout(timerId);
    };
  }, [isOpen, query, isNavigating]);
  
  const loadDictionary = async () => {
    if (dictionary || isLoading || isNavigating) return; 
    
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

  const handleSelect = (slug: string, name: string) => {
    setQuery(name);
    setIsOpen(false);
    setIsNavigating(true); 
    router.push(`/dentistas/${slug}`);
  };

  const handleSearch = () => {
    if (!query || isNavigating) return;

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

    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        setIsOpen(false);
        setIsNavigating(true); 
        
        const { latitude, longitude } = position.coords;
        
        document.cookie = `user_lat=${latitude}; path=/; max-age=3600; SameSite=Strict`;
        document.cookie = `user_lng=${longitude}; path=/; max-age=3600; SameSite=Strict`;
        
        router.push(`/dentistas/cerca-de-mi`);
      },
      (error) => {
        setIsLocating(false);
        console.warn("Error de geolocalización:", error);
        switch(error.code) {
          case error.PERMISSION_DENIED:
            alert("📍 No tenemos permiso para ver tu ubicación. Por favor, actívala en los Ajustes de tu móvil.");
            break;
          case error.POSITION_UNAVAILABLE:
            alert("📍 La señal del GPS no está disponible en este momento. Inténtalo de nuevo en unos segundos.");
            break;
          case error.TIMEOUT:
            alert("📍 Hemos tardado demasiado en encontrarte. Asegúrate de tener buena cobertura.");
            break;
          default:
            alert("📍 Ha ocurrido un error al intentar localizarte. Usa la búsqueda por texto.");
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
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
            const breathingRoom = 24; 
            const yOffset = -(headerHeight + breathingRoom); 
            
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

        {/* 🌟 CONTENEDOR RELATIVO PARA EL INPUT Y EL PLACEHOLDER FALSO */}
        <div className="relative flex-1 flex items-center h-full overflow-hidden">
          
          {/* PLACEHOLDER FALSO ANIMADO */}
          {!isOpen && query.length === 0 && !isNavigating && (
            <span 
              className={`absolute left-2 text-gray-400 italic text-lg pointer-events-none transition-all duration-300 ${
                isAnimatingUp ? '-translate-y-4 opacity-0' : 'translate-y-0 opacity-100'
              }`}
            >
              {typedPlaceholder}
            </span>
          )}

          <input
            type="text"
            placeholder="" // Siempre vacío. Si hacen clic, queda inmaculado.
            className={`w-full bg-transparent border-none focus:ring-0 px-2 py-3 text-lg outline-none transition-colors
              ${isNavigating ? 'text-gray-400 cursor-wait' : 'text-gray-700'}
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
      </div>

      {/* MENÚ DESPLEGABLE */}
      {isOpen && !isNavigating && (
        <div className="absolute top-full left-0 right-0 mt-4 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden divide-y divide-gray-50 py-2">
          
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