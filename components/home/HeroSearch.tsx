// components/home/HeroSearch.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Navigation, Loader2 } from "lucide-react";

interface SearchItem {
  n: string;
  t: string;
  s: string;
}

const PLACEHOLDER_CITIES = ["calatayud", "huesca", "almendralejo", "sitges", "eibar"];

// 🌟 SINGLETONS GLOBALES
// 1. Promesa de la petición de datos (evita peticiones duplicadas si se dispara Hover y Click a la vez)
let dictionaryPromise: Promise<SearchItem[]> | null = null;
// 2. Caché de los datos ya procesados (instantáneo al volver a la página)
let cachedDictionary: SearchItem[] | null = null;

export default function HeroSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [dictionary, setDictionary] = useState<SearchItem[] | null>(cachedDictionary); // Inicializa con caché si existe
  const [isLoading, setIsLoading] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  // 🚀 CORE WEB VITALS: Precarga del diccionario (Lazy + Idle + Hover) vía API Route
  const prefetchDictionary = async () => {
    // Si ya lo tenemos en memoria, no hacemos nada
    if (cachedDictionary) {
      if (!dictionary) setDictionary(cachedDictionary);
      return;
    }

    // Si ya hay una petición en curso, no lanzamos otra
    if (dictionaryPromise) {
      const data = await dictionaryPromise;
      if (!dictionary) setDictionary(data);
      return;
    }

    setIsLoading(true);

    // Creamos la promesa global de búsqueda apuntando al Route Handler
    dictionaryPromise = new Promise(async (resolve) => {
      try {
        const response = await fetch('/api/dictionary');
        
        if (!response.ok) {
          throw new Error('Error al cargar el diccionario predictivo');
        }

        const data = await response.json();

        cachedDictionary = data as SearchItem[];
        setDictionary(cachedDictionary);
        console.log("🔥 Diccionario precargado desde API con: ", cachedDictionary.length, " registros");
        resolve(cachedDictionary);
      } catch (error) {
        console.error("Error precargando el diccionario:", error);
        resolve([]);
      } finally {
        setIsLoading(false);
      }
    });

    await dictionaryPromise;
  };

  // 🚀 ESTRATEGIA IDLE: Cargar cuando el navegador no tiene nada mejor que hacer
  useEffect(() => {
    // Evitamos ejecutarlo si ya tenemos los datos
    if (cachedDictionary) return;

    // Retrasamos la ejecución 2 segundos tras montar el componente para asegurar
    // que Next.js ha terminado de hidratar y cargar imágenes críticas (LCP)
    const idleTimeout = setTimeout(() => {
      const requestIdle = (window as any).requestIdleCallback || ((cb: any) => setTimeout(cb, 1));
      requestIdle(() => {
        prefetchDictionary();
      });
    }, 2000);

    return () => clearTimeout(idleTimeout);
  }, []);

  // 🌟 ANIMACIÓN DEL PLACEHOLDER (Se mantiene intacta)
  const [typedPlaceholder, setTypedPlaceholder] = useState("");
  const [isAnimatingUp, setIsAnimatingUp] = useState(false);

  useEffect(() => {
    if (isOpen || query.length > 0 || isNavigating) {
      setTypedPlaceholder("");
      setIsAnimatingUp(false);
      return;
    }

    let isMounted = true;
    let cityIdx = 0;
    let text = '';
    let timerId: NodeJS.Timeout;
    let state = 'TYPING'; 

    const loop = () => {
      if (!isMounted) return;
      const fullText = PLACEHOLDER_CITIES[cityIdx];

      if (state === 'TYPING') {
        text = fullText.substring(0, text.length + 1);
        setTypedPlaceholder(text);

        if (text === fullText) {
          state = 'PAUSED';
          timerId = setTimeout(loop, 2500);
        } else {
          timerId = setTimeout(loop, 120);
        }
      } 
      else if (state === 'PAUSED') {
        setIsAnimatingUp(true);
        state = 'ANIMATING_UP';
        timerId = setTimeout(loop, 300);
      } 
      else if (state === 'ANIMATING_UP') {
        text = '';
        setTypedPlaceholder('');
        setIsAnimatingUp(false);
        cityIdx = (cityIdx + 1) % PLACEHOLDER_CITIES.length;
        state = 'WAITING_NEXT';
        timerId = setTimeout(loop, 300);
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
  


/* **********************************
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNavigating) return; 
    const value = e.target.value;
    setQuery(value);

    // Usamos el estado local 'dictionary' que ya estará hidratado
    if (value.length >= 2 && dictionary) {
      const searchWord = value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      
      const filtered = dictionary.filter(item => {
        const itemName = (item.n || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return itemName.includes(searchWord);
      }).slice(0, 6);

      setResults(filtered);
    } else {
      setResults([]);
    }
  };
********************************************************  */


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNavigating) return; 
    const value = e.target.value;
    setQuery(value);

    if (value.length >= 2 && dictionary) {
      const searchWord = value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      
      const filtered = dictionary
        .filter(item => {
          const itemName = (item.n || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          return itemName.includes(searchWord);
        })
        .sort((a, b) => {
          const nameA = (a.n || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          const nameB = (b.n || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

          // 1. Prioridad Máxima: Coincidencia exacta (ej. "Aragón" vs "Aragón")
          if (nameA === searchWord) return -1;
          if (nameB === searchWord) return 1;

          // 2. Prioridad Alta: Empieza por la palabra (ej. "Zaragoza" antes que "Villarreal de Zaragoza")
          const startsWithA = nameA.startsWith(searchWord);
          const startsWithB = nameB.startsWith(searchWord);
          if (startsWithA && !startsWithB) return -1;
          if (!startsWithA && startsWithB) return 1;

          // 3. Prioridad Normal: Si ambos coinciden igual, ordenar por longitud 
          // (Las Comunidades y Provincias tienen nombres más cortos que los municipios compuestos)
          return nameA.length - nameB.length;
        })
        .slice(0, 6); // ¡Ahora sí cortamos, teniendo a los mejores candidatos arriba!

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
        (item.n || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchWord)
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
            alert("📍 No tenemos permiso para ver tu ubicación.");
            break;
          case error.POSITION_UNAVAILABLE:
            alert("📍 La señal del GPS no está disponible.");
            break;
          case error.TIMEOUT:
            alert("📍 Tiempo de espera agotado.");
            break;
          default:
            alert("📍 Error al localizarte.");
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
    // 🌟 1. AÑADIMOS onMouseEnter al wrapper principal para adelantarnos al clic
    <div 
      ref={wrapperRef} 
      className="relative w-full max-w-3xl mx-auto z-40 text-left"
      onMouseEnter={prefetchDictionary}
    >
      
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
          prefetchDictionary(); // En caso de que no haya saltado el hover (ej. móviles)
          
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

        <div className="relative flex-1 flex items-center h-full overflow-hidden">
          {!isOpen && query.length === 0 && !isNavigating && (
            <span 
              className={`absolute left-2 text-gray-600 italic text-lg pointer-events-none transition-all duration-300 ${
                isAnimatingUp ? '-translate-y-4 opacity-0' : 'translate-y-0 opacity-100'
              }`}
            >
              {typedPlaceholder}
            </span>
          )}

          <input
            type="text"
            placeholder=""
            aria-label="Buscador de dentistas y centros dentales"
            className={`w-full bg-transparent border-none focus:ring-0 px-2 py-3 text-lg outline-none transition-colors
              ${isNavigating ? 'text-gray-400 cursor-wait' : 'text-gray-700'}
            `}
            value={query}
            readOnly={isNavigating} 
            onChange={handleInputChange}
            // 🌟 2. AÑADIMOS la carga al focus como medida redundante de seguridad
            onFocus={() => { 
              if(!isNavigating) {
                setIsOpen(true);
                prefetchDictionary(); 
              }
            }}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()} 
          />
        </div>
      </div>

      {isOpen && !isNavigating && (
        <div className="absolute z-40 top-full left-0 right-0 mt-4 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden divide-y divide-gray-50 py-2">
          
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
                <span className="text-gray-500 text-sm block">Encuentra dentistas cerca de ti</span>
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
              <span className="text-xs font-bold uppercase tracking-wider text-gray-600 bg-gray-100 px-3 py-1 rounded-full group-hover:bg-green-50 group-hover:text-dkv-green transition-colors whitespace-nowrap ml-2">
                {item.t}
              </span>
            </div>
          ))}

          {query.length > 1 && results.length === 0 && dictionary && (
            <div className="px-6 py-8 text-center text-gray-500">
              <span className="block font-medium text-lg mb-1">No hay resultados para "{query}"</span>
              <span className="text-sm">Prueba con otra localidad.</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}