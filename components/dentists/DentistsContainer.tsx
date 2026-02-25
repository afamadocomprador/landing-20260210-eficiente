"use client";

// 🟠 MODIFICADO: Añadimos 'useCallback' para memorizar la función del mapa y evitar renders infinitos.
//import { useEffect, useState, useCallback } from "react";
// 🟠 MODIFICADO: Añadimos 'useRef' para poder memorizar coordenadas pasadas sin forzar renderizados
import { useEffect, useState, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
// 🟢 AÑADIDO: Importamos 'Loader2' para el icono de "Buscando..." que gira.
//import { ChevronUp, ChevronDown, Stethoscope } from "lucide-react";
//import { ChevronUp, ChevronDown, Stethoscope, Loader2 } from "lucide-react";
//import { ChevronUp, ChevronDown, Stethoscope, Loader2, X, Phone } from "lucide-react";
import { ChevronUp, ChevronDown, Stethoscope, Loader2, X, Phone, Users, Plus, Minus } from "lucide-react";
import { useNavigation, NavigationState } from "@/context/NavigationContext";
import ClinicList from "@/components/dentists/ClinicList";

// 🟢 AÑADIDO: Importamos Supabase para que este componente pueda hablar con la base de datos directamente.
import { createClient } from "@supabase/supabase-js";
// 🟢 AÑADIDO: Importamos la librería de animaciones fluidas
import { motion, AnimatePresence } from "framer-motion";

// 🟢 AÑADIDO: Instanciamos Supabase FUERA del componente. 
// ¿Por qué fuera? Porque si lo ponemos dentro de la función DentistsContainer, 
// cada vez que el usuario mueva el mapa, React volvería a crear una conexión nueva a la base de datos, colapsando el navegador.
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const DentalMapClient = dynamic(() => import("@/components/map/DentalMapClient"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-100 animate-pulse flex items-center justify-center">Cargando mapa...</div>
});

// EXTRAÍDO: Para evitar Hydration Mismatch y re-instanciación en cada render.
const formatter = new Intl.NumberFormat('es-ES');

export default function DentistsContainer({ initialData }: { initialData: NavigationState }) {
  const { updateNavigation } = useNavigation();

  // 2. INSTANCIAR EL ROUTER AQUÍ (Al principio del componente)
  const router = useRouter();

  // 🔴 ELIMINADO: Antes leíamos los datos directamente de `initialData`:
  // const activeMarks = initialData.mapa.marks;
  // const activeStats = initialData.lista;
  // ¿Por qué lo quitamos? Porque `initialData` es lo que nos manda el servidor cuando carga la página. 
  // Si el usuario mueve el mapa, esos datos no nos sirven, necesitamos datos "frescos".


  // 🟢 AÑADIDO: Creamos "Estados Locales". 
  // Copiamos los datos del servidor aquí dentro al arrancar. Así, si el usuario mueve el mapa, 
  // podemos sobrescribir estos estados con las nuevas clínicas de Supabase sin tener que recargar la página.
  const [localMarks, setLocalMarks] = useState(initialData.mapa.marks);
  const [localClinics, setLocalClinics] = useState(initialData.lista.clinics);
  const [isUpdatingMap, setIsUpdatingMap] = useState(false); // Controla si mostramos el cartelito de "Buscando..."


  // 🟢 AÑADIDO: Creamos un estado para el "Embrague" del mapa.
  // Empieza con el modo que manda el servidor (ej: 'FIT_BOUNDS').
  const [dynamicMapMode, setDynamicMapMode] = useState<any>(initialData.mapa.modo);


  // 🟠 MODIFICADO: Tu useEffect original que actualizaba el contexto de navegación.
  // Ahora, además de actualizar el contexto, le decimos que si el usuario cambia de URL (ej: va de Zaragoza a Madrid),
  // resetee nuestros estados locales con los nuevos datos que llegan del servidor.
  //useEffect(() => {
  //  updateNavigation(initialData);
  //}, [initialData, updateNavigation]);
  // 🟠 MODIFICADO: Actualizamos el embrague si el usuario cambia de página completamente
  useEffect(() => {
    updateNavigation(initialData);
    setLocalMarks(initialData.mapa.marks);
    setLocalClinics(initialData.lista.clinics);
    // 🟢 AÑADIDO: Restauramos el modo automático al cambiar de URL
    setDynamicMapMode(initialData.mapa.modo);
  }, [initialData, updateNavigation]);

  const activeMapaConfig = initialData.mapa;

  // 🟢 AÑADIDO: Extraemos el nivel actual para poder hacer los "if" fácilmente
  const currentLevel = initialData.nivelFinal;


  // 1. Detección Inteligente del Nivel de Detalle (LOD)


  // 🟠 MODIFICADO: Detección Inteligente del Nivel de Detalle (LOD)
  // Antes usaba 'activeMarks' (fijo). Ahora usa 'localMarks' (dinámico).
  //const hasComunidades = activeMarks.some((m: any) => m.tipo === 'comunidad');
  //const hasProvincias = activeMarks.some((m: any) => m.tipo === 'provincia');
  //const hasMunicipios = activeMarks.some((m: any) => m.tipo === 'municipio'); // O como llames a este nivel
  // NUEVO: Detectamos si estamos DENTRO de un municipio (Nivel 4)
  //const isInsideMunicipio = activeMarks.some((m: any) => m.tipo === 'centro' || m.tipo === 'hub');
  const hasComunidades = localMarks.some((m: any) => m.tipo === 'comunidad');
  const hasProvincias = localMarks.some((m: any) => m.tipo === 'provincia');
  const hasMunicipios = localMarks.some((m: any) => m.tipo === 'municipio'); 
  const isInsideMunicipio = localMarks.some((m: any) => m.tipo === 'centro' || m.tipo === 'hub');


 
  // 2. Asignación del GeoJSON correspondiente
  let mapGeoJsonUrl = undefined; // Por defecto no cargamos contornos (ej. para municipios o clínicas sueltas)

  // 🌟 LA REGLA DE ORO: Si estamos en "Cerca de mí", forzamos que no haya GeoJSON ni fronteras
  if (currentLevel === "00") {
    mapGeoJsonUrl = undefined;
  } else
  if (hasComunidades) {
    mapGeoJsonUrl = '/maps/autonomous_regions.geojson';
  } else if (hasProvincias) {
    mapGeoJsonUrl = '/maps/spain-provinces.geojson'; 
  } else if (hasMunicipios || isInsideMunicipio) {
    // Tanto en Nivel 3 como en Nivel 4, usamos el TopoJSON de municipios
    mapGeoJsonUrl = '/maps/municipalities.json'; // <--- EL NUEVO ARCHIVO // es un topojson
  }

  // 3. Obtenemos el INE del municipio actual. 
  // (Asumo que lo tienes en initialData.zona.codigo_ine o similar. 
  // Si no, sácalo del primer marcador si en level-engine le pusiste codigo_ine a los centros).
  //const currentMunicipioId = isInsideMunicipio ? initialData.zona?.codigo_ine : undefined;


  // 🕵️‍♂️ CHIVATO PARA EL CONTENEDOR:
  console.log("🧠 [CEREBRO] Buscando el ID del municipio en initialData:", initialData);

  // Intenta cogerlo de la zona, del landing, o del primer marcador si es que lo tienen
  //const currentMunicipioId = isInsideMunicipio 
  //  ? (initialData.zona?.codigo_ine || initialData.landing?.cod_municipio || activeMarks[0]?.codigo_ine) 
  //  : undefined;
  // Buscamos el ID del municipio directamente en la raíz de los datos
  //const currentMunicipioId = isInsideMunicipio ? initialData.codigo_ine : undefined;
  // 3. Obtenemos el INE del municipio actual. 
  // 🌟 OTRA REGLA: Si es Nivel 00, no hay ID de municipio que buscar
  // 🟠 MODIFICADO: Obtención del ID del municipio.
  // Tu lógica era: const currentMunicipioId = isInsideMunicipio ? initialData.codigo_ine : undefined;
  // Le añadimos la condición "&& currentLevel !== '00'" para que si buscamos por GPS, no intente buscar un municipio concreto.
  const currentMunicipioId = (isInsideMunicipio && currentLevel !== "00") ? initialData.codigo_ine : undefined;



  console.log("🧠 [CEREBRO] ID que le mando al mapa:", currentMunicipioId);



  // ESTADO ORIGINAL: Controla si la lista está desplegada o colapsada
  const [isListOpen, setIsListOpen] = useState(initialData.lista.estadoInicial !== 'CLOSED');

  // NUEVO ESTADO: Controla qué clínica se ha seleccionado en el mapa
  const [selectedClinicId, setSelectedClinicId] = useState<string | null>(null);

  // NUEVO ESTADO: Controla qué clínica se ha seleccionado en la lista
  const [selectedFromList, setSelectedFromList] = useState<string | null>(null);


  // 🟢 AÑADIDO: Controla si la lista de dentistas de la tarjeta flotante está abierta
  const [isFloatingDentistsOpen, setIsFloatingDentistsOpen] = useState(false);

  // 🟢 AÑADIDO: Si cambiamos de clínica, cerramos el desplegable por defecto
  useEffect(() => {
    setIsFloatingDentistsOpen(false);
  }, [selectedClinicId]);



  //se pasa arriba mejor
  //const formatter = new Intl.NumberFormat('es-ES');

  // NUEVO HANDLER: Orquesta la interacción Mapa -> Lista 
  // Si esta función se ejecuta, ES SEGURO que es una clínica gracias a la lógica del mapa.
  // NUEVO HANDLER: Orquesta la interacción y "traduce" el ID
  // NUEVO HANDLER: Recibe directamente el nombre de la clínica (o el slug si es región)
  // 🟠 MODIFICADO: Tu handler de clics en marcadores.
  // Antes buscaba en `activeStats.clinics` (fijo del servidor). Ahora busca en `localClinics` (que se actualiza al mover el mapa).
  // 🟠 MODIFICADO: Comportamiento Airbnb al pinchar un pin
  const handleMarkerClick = (markerIdentifier: string) => {
    
    // Buscamos si el identificador coincide con el NOMBRE de alguna clínica de nuestra lista
    //const matchedClinic = activeStats.clinics.find((c: any) => c.name === markerIdentifier);
    const matchedClinic = localClinics.find((c: any) => c.name === markerIdentifier);
    
    if (matchedClinic) {
      // ES UNA CLÍNICA: Pasamos el ID real de la base de datos (el hash) a la lista
      setSelectedClinicId(matchedClinic.clinic_id);

      // 🌟 MAGIA: Si la lista grande estaba abierta, la cerramos para que se vea el mapa y la nueva tarjeta flotante
      //setIsListOpen(true); 
      setIsListOpen(false);

      // Limpiamos el origen de la lista para no interferir con el mapa
      setSelectedFromList(null);

    } else {
      // NO ES CLÍNICA: Es una región, así que navegamos
      router.push(`/dentistas/${markerIdentifier}`);
    }
  };

  // 🟢 AÑADIDO: Si el usuario pincha en una zona vacía del mapa, ocultamos la tarjeta flotante
  const handleMapClick = useCallback(() => {
    setSelectedClinicId(null);
    setSelectedFromList(null);
  }, []);



  // 🟢 AÑADIDO: Creamos una "memoria" para guardar el último sitio donde buscamos.
  // Empieza vacía. Al no ser un 'State', cambiarla no provoca que la web parpadee.
  //const lastSearchCenter = useRef<{lat: number, lng: number} | null>(null);
  // 🟠 MODIFICADO: Ahora nuestra memoria guarda el centro Y TAMBIÉN el nivel de zoom
  const lastSearchState = useRef<{lat: number, lng: number, zoom: number} | null>(null);


  // ====================================================================
  // 🟢 AÑADIDO: EL CEREBRO DE RECARGA DINÁMICA (Efecto Airbnb)
  // Esta es la función que el mapa llama automáticamente cada vez que el usuario suelta el ratón tras arrastrarlo.
  // ====================================================================
// 🟠 MODIFICADO: Recibimos los 'bounds' como tercer parámetro
//const handleMapMove = useCallback(async (newCenter: { lat: number, lng: number }, zoom: number) => {
const handleMapMove = useCallback(async (newCenter: { lat: number, lng: number }, zoom: number, bounds: any) => {
    if (currentLevel !== "00") return;

    // ====================================================================
    // 🟢 AÑADIDO: EL ESCUDO ANTI-BUCLES INFINITOS
    // ====================================================================
    //if (lastSearchCenter.current) {
    // ====================================================================
    // 🟠 MODIFICADO: EL ESCUDO AHORA RESPETA EL ZOOM
    // ====================================================================
    if (lastSearchState.current) {
      // Calculamos cuántos grados de GPS se ha movido el mapa desde la última búsqueda
      //const latDiff = Math.abs(lastSearchCenter.current.lat - newCenter.lat);
      //const lngDiff = Math.abs(lastSearchCenter.current.lng - newCenter.lng);
      const latDiff = Math.abs(lastSearchState.current.lat - newCenter.lat);
      const lngDiff = Math.abs(lastSearchState.current.lng - newCenter.lng);


      // 🌟 Comparamos si el zoom ha cambiado    
      const zoomChanged = lastSearchState.current.zoom !== zoom;

      // 0.005 grados de latitud/longitud equivalen a unos 500 metros en la vida real.
      // Si el movimiento es menor a 500 metros, es un re-ajuste del sistema. ¡Lo bloqueamos!
      //if (latDiff < 0.005 && lngDiff < 0.005) {
      // Si se mueve menos de 500m Y el zoom NO ha cambiado, lo bloqueamos (era un auto-ajuste).
      // Pero si el zoom SÍ ha cambiado, dejamos que pase de largo y busque.
      if (latDiff < 0.005 && lngDiff < 0.005 && !zoomChanged) {
        return; 
      }
    }

    // Si ha pasado el escudo (se movió más de 500m), guardamos la nueva coordenada para la próxima vez
    //lastSearchCenter.current = newCenter;
    // Guardamos el nuevo centro y el nuevo zoom para la próxima vez
    lastSearchState.current = { lat: newCenter.lat, lng: newCenter.lng, zoom: zoom };

    // Pisamos el embrague para quitar el auto-zoom
    // ====================================================================
    // 🟢 LA CORRECCIÓN MÁGICA: Pasamos 'FREE' en lugar de undefined
    // ====================================================================
    setDynamicMapMode('FREE');

    setIsUpdatingMap(true);

    try {
      // ====================================================================
      // 🌟 LLAMADA TIPO AIRBNB: Le pasamos las 4 esquinas del monitor del usuario
      // ====================================================================
      //const { data, error } = await supabase.rpc('get_centros_cercanos', {
      const { data, error } = await supabase.rpc('get_centros_en_bounds', {
         //user_lat: newCenter.lat,
         //user_lng: newCenter.lng,
         //radio_km: 25 
          sw_lat: bounds.getSouthWest().lat, // Abajo Izquierda (Lat)
          sw_lng: bounds.getSouthWest().lng, // Abajo Izquierda (Lng)
          ne_lat: bounds.getNorthEast().lat, // Arriba Derecha (Lat)
          ne_lng: bounds.getNorthEast().lng, // Arriba Derecha (Lng)
          center_lat: newCenter.lat,         // Centro (Lat)
          center_lng: newCenter.lng          // Centro (Lng)
      });

      if (error) throw error;

      setLocalClinics(data || []);

      const newMarkers = (data || []).map((c: any) => ({
        name: c.name,
        lat: c.latitude,
        lng: c.longitude,
        slug: c.clinic_id,
        count: c.staff_count,
        tipo: 'centro',
        distancia_km: c.distancia_km
      }));

      setLocalMarks(newMarkers);
    } catch (error) {
      console.error("Error buscando en la nueva zona:", error);
    } finally {
      setIsUpdatingMap(false);
    }
  }, [currentLevel]);









  // 🌟 AÑADIDO: Calculamos los dentistas reales sumando el staff_count de la lista viva
  const totalLiveDentists = localClinics.reduce((acc: number, clinic: any) => acc + (Number(clinic.staff_count) || 0), 0);


  // 🟢 AÑADIDO: Lógica para saber si debemos mostrar la tarjeta flotante
  // Se muestra SI hay una clínica seleccionada Y la lista grande está cerrada
  const selectedClinicData = localClinics.find((c: any) => c.clinic_id === selectedClinicId);
  const showFloatingCard = selectedClinicData && !isListOpen;

  // 🌟 MAGIA UX: ¿Ocultamos la lista por completo sacándola de la pantalla?
  // Solo lo hacemos en "Cerca de mí" (Nivel 00) cuando la tarjeta flotante está visible.
  //const hideListCompletely = currentLevel === "00" && showFloatingCard;
  // 🌟 MAGIA UX: ¿Ocultamos la lista por completo sacándola de la pantalla?
  // Ahora la ocultamos SIEMPRE que estemos en "Cerca de mí" (Nivel 00), 
  // dejando todo el espacio para el mapa y la ficha flotante.
  const hideListCompletely = currentLevel === "00";


return (
    <div className="relative w-full h-[85dvh] min-h-[600px] md:h-[80vh] md:min-h-[750px] bg-white flex flex-col pt-4 pb-12 px-4 md:px-10 font-fsme">
      <div className="relative w-full h-full bg-white rounded-[40px] overflow-hidden border-8 border-white shadow-xl z-20">

        {/* CARTELITO DE BUSCANDO */}
        {isUpdatingMap && (
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-[2000] bg-white text-dkv-green-dark px-5 py-2.5 rounded-full shadow-lg font-bold text-sm flex items-center gap-2 border border-dkv-green-light transition-all duration-300">
            <Loader2 className="w-4 h-4 animate-spin text-dkv-green" />
            Buscando en esta zona...
          </div>
        )}
        
        {/* EL MAPA */}
        <div className="absolute inset-0 z-10">
            <DentalMapClient 
                marks={localMarks}
                modo={dynamicMapMode}
                initialCenter={activeMapaConfig.centro} 
                initialZoom={activeMapaConfig.zoom}
                tileStyle={activeMapaConfig.tileStyle}
                onMarkerClick={handleMarkerClick}
                activeBoundaryId={currentMunicipioId} 
                activeCenterExternal={selectedFromList} 
                geoJsonUrl={mapGeoJsonUrl} 
                onMapMove={handleMapMove}
                enableClustering={currentLevel === "00"}
                onMapClick={handleMapClick}
            /> 
        </div>




        {/* ==================================================================== */}
        {/* 🟢 LA TARJETA FLOTANTE TIPO AIRBNB / IDEALISTA                       */}
        {/* ==================================================================== */}
        <AnimatePresence>
          {showFloatingCard && (
            <motion.div
              key="floating-card" 
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98, transition: { duration: 0.2 } }}
              transition={{
                type: "spring",
                stiffness: 300, 
                damping: 25,    
              }}
              className={`absolute left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-[420px] z-40 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 p-5 ${hideListCompletely ? 'bottom-6 md:bottom-8' : 'bottom-[96px]'}`}
            >
              <div className="flex justify-between items-start gap-4">
                <h4 className="font-lemon text-dkv-green-dark text-xl leading-tight">
                  {selectedClinicData.name}
                </h4>
                <button 
                  onClick={() => setSelectedClinicId(null)} 
                  className="text-gray-400 hover:text-dkv-gray bg-gray-50 hover:bg-gray-100 rounded-full p-1.5 transition-colors shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <p className="text-sm text-dkv-gray mt-2 line-clamp-2">
                {selectedClinicData.address}, {selectedClinicData.city}
              </p>
              
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center gap-2">
                  
                  {(selectedClinicData.staff_count ?? 0) > 0 && (
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation(); 
                        setIsFloatingDentistsOpen(!isFloatingDentistsOpen);
                      }}
                      aria-expanded={isFloatingDentistsOpen}
                      className={`
                        inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all duration-300
                        ${isFloatingDentistsOpen 
                          ? 'bg-dkv-green text-white shadow-md' 
                          : 'bg-dkv-green/10 text-dkv-green-dark hover:bg-dkv-green/20 border border-dkv-green/20'
                        }
                      `}
                    >
                      <Users className={`w-4 h-4 ${isFloatingDentistsOpen ? 'text-white' : 'text-dkv-green'}`} aria-hidden="true" />
                      <span>{selectedClinicData.staff_count} Especialistas</span>
                      {isFloatingDentistsOpen ? <Minus className="w-3.5 h-3.5 ml-1" aria-hidden="true" /> : <Plus className="w-3.5 h-3.5 ml-1" aria-hidden="true" />}
                    </button>
                  )}

                  {/* BORRAR O COMENTAR ESTE BLOQUE
                  {selectedClinicData.distancia_km && (
                    <span className="text-xs font-medium text-gray-500">
                      A {selectedClinicData.distancia_km} km
                    </span>
                  )}
                  */}
                </div>
              </div>

              <div className={`
                overflow-hidden transition-all duration-500 ease-in-out w-full
                ${isFloatingDentistsOpen ? 'max-h-[250px] opacity-100 mt-4 mb-1' : 'max-h-0 opacity-0'}
              `}>
                {(selectedClinicData.staff_names?.length || 0) > 0 && (
                  <div className="bg-gray-50/80 rounded-xl p-4 border border-dashed border-gray-200 overflow-y-auto max-h-[180px]">
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-3">Equipo Médico disponible:</p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4">
                      {selectedClinicData.staff_names?.map((doctor: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700 font-fsme">
                          <div className="w-1.5 h-1.5 rounded-full bg-dkv-green mt-1.5 shrink-0" aria-hidden="true"></div>
                          <span className="line-clamp-1" title={doctor}>{doctor}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <a 
                href={`tel:${selectedClinicData.phone}`} 
                className={`${isFloatingDentistsOpen ? 'mt-2' : 'mt-4'} w-full flex items-center justify-center gap-2 bg-dkv-green text-white py-3 rounded-xl font-bold hover:bg-dkv-green-hover transition-colors shadow-md`}
              >
                <Phone className="w-4 h-4" />
                Llamar al centro
              </a>
            </motion.div>
          )}
        </AnimatePresence>
        {/* ==================================================================== */}






        {/* 🟢 LA LISTA INFERIOR DESLIZANTE */}
        <div className={`absolute bottom-0 left-0 right-0 z-30 bg-white transition-all duration-500 flex flex-col ${isListOpen ? 'h-[70%]' : 'h-[80px]'} ${hideListCompletely ? 'translate-y-full' : 'translate-y-0'}`}>
          <button onClick={() => setIsListOpen(!isListOpen)} className="h-[80px] px-6 flex items-center justify-between cursor-pointer border-b shrink-0">
            <div className="flex items-center gap-4">
              <Stethoscope className="w-5 h-5 text-dkv-green" />
              <h3 className="font-lemon text-dkv-green-dark uppercase tracking-tight">
                <span className="text-dkv-green">{formatter.format(totalLiveDentists)}</span> DENTISTAS
              </h3>
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400" aria-hidden="true">
              {isListOpen ? <ChevronDown /> : <ChevronUp />}
            </div>
          </button>
          
          <div id="scroll-clinicas" className="flex-1 overflow-y-auto bg-gray-50/30 relative scroll-smooth">
            <div className="max-w-5xl mx-auto py-2">
                <ClinicList 
                    clinics={localClinics}
                    onSelectClinic={(id) => {
                        setSelectedClinicId(id);
                        const clinic = localClinics.find((c: any) => c.clinic_id === id);
                        if (clinic) {
                            setSelectedFromList(clinic.name);
                        }
                    }} 
                    selectedClinicId={selectedClinicId}
                />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}