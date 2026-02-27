"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { ChevronUp, ChevronDown, Stethoscope, Loader2, X, Phone, Users, Plus, Minus, MapPin, Navigation, Share2 } from "lucide-react";
import { formatPhoneNumber } from "@/lib/text-formatter";
import { useNavigation, NavigationState } from "@/context/NavigationContext";
import ClinicList from "@/components/dentists/ClinicList";
import { createClient } from "@supabase/supabase-js";
import { motion, AnimatePresence } from "framer-motion";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const DentalMapClient = dynamic(() => import("@/components/map/DentalMapClient"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-100 animate-pulse flex items-center justify-center">Cargando mapa...</div>
});

const formatter = new Intl.NumberFormat('es-ES');

export default function DentistsContainer({ initialData }: { initialData: NavigationState }) {
  const { updateNavigation } = useNavigation();
  const router = useRouter();

  const [localMarks, setLocalMarks] = useState(initialData.mapa.marks);
  const [localClinics, setLocalClinics] = useState(initialData.lista.clinics);
  const [isUpdatingMap, setIsUpdatingMap] = useState(false); 
  const [dynamicMapMode, setDynamicMapMode] = useState<any>(initialData.mapa.modo);

  useEffect(() => {
    updateNavigation(initialData);
    setLocalMarks(initialData.mapa.marks);
    setLocalClinics(initialData.lista.clinics);
    setDynamicMapMode(initialData.mapa.modo);
  }, [initialData, updateNavigation]);

  const activeMapaConfig = initialData.mapa;
  const currentLevel = initialData.nivelFinal;

  const hasComunidades = localMarks.some((m: any) => m.tipo === 'comunidad');
  const hasProvincias = localMarks.some((m: any) => m.tipo === 'provincia');
  const hasMunicipios = localMarks.some((m: any) => m.tipo === 'municipio'); 
  const isInsideMunicipio = localMarks.some((m: any) => m.tipo === 'centro' || m.tipo === 'hub');

  let mapGeoJsonUrl = undefined; 
  if (currentLevel === "00") {
    mapGeoJsonUrl = undefined;
  } else if (hasComunidades) {
    mapGeoJsonUrl = '/maps/autonomous_regions.geojson';
  } else if (hasProvincias) {
    mapGeoJsonUrl = '/maps/spain-provinces.geojson'; 
  } else if (hasMunicipios || isInsideMunicipio) {
    mapGeoJsonUrl = '/maps/municipalities.json'; 
  }

  const currentMunicipioId = (isInsideMunicipio && currentLevel !== "00") ? initialData.codigo_ine : undefined;

  const [isListOpen, setIsListOpen] = useState(initialData.lista.estadoInicial !== 'CLOSED');
  const [selectedClinicId, setSelectedClinicId] = useState<string | null>(null);
  const [selectedFromList, setSelectedFromList] = useState<string | null>(null);
  const [isFloatingDentistsOpen, setIsFloatingDentistsOpen] = useState(false);

  useEffect(() => {
    setIsFloatingDentistsOpen(false);
  }, [selectedClinicId]);

  // ====================================================================
  // 🌟 AÑADIDO: EL "AUTO-LECTOR" DE ENLACES COMPARTIDOS
  // Si la URL termina en un ID de clínica al cargar la página, se abre sola
  // ====================================================================
  const hasAutoOpened = useRef(false);

  useEffect(() => {
    if (hasAutoOpened.current || localClinics.length === 0) return;

    // Miramos el último fragmento de la URL
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    const lastSegment = pathSegments[pathSegments.length - 1];

    // 🌟 AÑADIDO: Si la URL termina en "share-...", lo limpiamos para buscar el ID real
    if (lastSegment && lastSegment.startsWith('share-')) {
      const realClinicId = lastSegment.replace('share-', '');
      const sharedClinic = localClinics.find((c: any) => c.clinic_id === realClinicId);

      if (sharedClinic) {
        setSelectedClinicId(sharedClinic.clinic_id);
        setSelectedFromList(sharedClinic.name); 
        setIsListOpen(false); 
        hasAutoOpened.current = true; 
      }
    }
  }, [localClinics]);
  // ====================================================================



// ====================================================================
  // 🌟 EL SINCRONIZADOR DE URL EN TIEMPO REAL (Con limpieza SEO para móviles)
  // ====================================================================
  useEffect(() => {
    const currentPath = window.location.pathname;
    const origin = window.location.origin;

    // Función auxiliar para engañar al botón de compartir nativo del móvil
    const updateMobileShareTags = (newPath: string) => {
      const fullUrl = `${origin}${newPath}`;
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) canonical.setAttribute('href', fullUrl);

      const ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) ogUrl.setAttribute('content', fullUrl);
    };

    if (selectedClinicId) {
      // 1. Si ABRIMOS una ficha
      if (!currentPath.includes(`/share-${selectedClinicId}`)) {
        const cleanPath = currentPath.split('/share-')[0].replace(/\/$/, "");
        const newPath = `${cleanPath}/share-${selectedClinicId}`;
        
        window.history.replaceState(window.history.state, '', newPath); 
        updateMobileShareTags(newPath); // Actualizamos etiquetas ocultas
      }
    } else {
      // 2. Si CERRAMOS la ficha
      if (currentPath.includes('/share-')) {
        const cleanPath = currentPath.split('/share-')[0].replace(/\/$/, "");
        
        window.history.replaceState(window.history.state, '', cleanPath);
        updateMobileShareTags(cleanPath); // Limpiamos etiquetas ocultas
      }
    }
  }, [selectedClinicId]);
  // ====================================================================







  const handleMarkerClick = (markerIdentifier: string) => {
    const matchedClinic = localClinics.find((c: any) => c.name === markerIdentifier);
    if (matchedClinic) {
      setSelectedClinicId(matchedClinic.clinic_id);
      setIsListOpen(false);
      setSelectedFromList(null);
    } else {
      router.push(`/dentistas/${markerIdentifier}`);
    }
  };

  const handleMapClick = useCallback(() => {
    setSelectedClinicId(null);
    setSelectedFromList(null);
  }, []);

  const lastSearchState = useRef<{lat: number, lng: number, zoom: number} | null>(null);

  const handleMapMove = useCallback(async (newCenter: { lat: number, lng: number }, zoom: number, bounds: any) => {
    if (currentLevel !== "00") return;

    if (lastSearchState.current) {
      const latDiff = Math.abs(lastSearchState.current.lat - newCenter.lat);
      const lngDiff = Math.abs(lastSearchState.current.lng - newCenter.lng);
      const zoomChanged = lastSearchState.current.zoom !== zoom;

      if (latDiff < 0.005 && lngDiff < 0.005 && !zoomChanged) {
        return; 
      }
    }

    lastSearchState.current = { lat: newCenter.lat, lng: newCenter.lng, zoom: zoom };
    setDynamicMapMode('FREE');
    setIsUpdatingMap(true);

    try {
      const { data, error } = await supabase.rpc('get_centros_en_bounds', {
          sw_lat: bounds.getSouthWest().lat,
          sw_lng: bounds.getSouthWest().lng,
          ne_lat: bounds.getNorthEast().lat,
          ne_lng: bounds.getNorthEast().lng,
          center_lat: newCenter.lat,         
          center_lng: newCenter.lng          
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

  const totalLiveDentists = localClinics.reduce((acc: number, clinic: any) => acc + (Number(clinic.staff_count) || 0), 0);

  const selectedClinicData = localClinics.find((c: any) => c.clinic_id === selectedClinicId);
  const showFloatingCard = selectedClinicData && !isListOpen;
  const hideListCompletely = currentLevel === "00";

  return (
    <div className="relative w-full h-[85dvh] min-h-[600px] md:h-[80vh] md:min-h-[750px] bg-white flex flex-col pt-4 pb-12 px-4 md:px-10 font-fsme">
      <div className="relative w-full h-full bg-white rounded-[40px] overflow-hidden border-8 border-white shadow-xl z-20">

        {isUpdatingMap && (
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-[2000] bg-white text-dkv-green-dark px-5 py-2.5 rounded-full shadow-lg font-bold text-sm flex items-center gap-2 border border-dkv-green-light transition-all duration-300">
            <Loader2 className="w-4 h-4 animate-spin text-dkv-green" />
            Buscando en esta zona...
          </div>
        )}
        
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

        <AnimatePresence>
          {showFloatingCard && (
            <motion.div
              key="floating-card" 
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98, transition: { duration: 0.2 } }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={`absolute left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-[420px] z-40 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 p-5 ${hideListCompletely ? 'bottom-6 md:bottom-8' : 'bottom-[96px]'}`}
            >

              <div className="flex justify-between items-start gap-4 mb-3">
                <div className="flex flex-col items-start gap-2">
                  {selectedClinicData.is_propio && (
                    <span className="bg-dkv-green text-white text-[10px] font-bold px-3 py-1 rounded-lg uppercase tracking-wide shadow-sm">
                      Centro Élite DKV
                    </span>
                  )}
                  <h4 className="font-lemon text-dkv-green-dark text-xl leading-tight">
                    {selectedClinicData.name}
                  </h4>
                </div>
                
                <div className="flex items-center gap-1.5 shrink-0 mt-1">
                  
                  {/* ========================================================= */}
                  {/* 🌟 BOTÓN DE COMPARTIR CON CONSTRUCCIÓN DE URL INTELIGENTE */}
                  {/* ========================================================= */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();

                      //const shareUrl = `${window.location.origin}/dentistas/cerca-de-mi/share-${selectedClinicData.clinic_id}`;
                      const shareUrl = window.location.href;

                      // Si el móvil/navegador soporta compartir nativo...
                      if (navigator.share) {
                        navigator.share({
                          title: `Centro dental DKV en ${selectedClinicData.city}`,
                          //text: shareText, // eliminamos el text por completo
                          url: shareUrl,
                        }).catch(console.error);
                      } else {
                        // Plan B (para ordenadores): Copiar al portapapeles
                        navigator.clipboard.writeText(shareUrl);
                        alert("¡Enlace copiado al portapapeles!");
                      }
                    }}
                    className="text-gray-400 hover:text-dkv-green bg-gray-50 hover:bg-green-50 rounded-full p-1.5 transition-colors"
                    aria-label="Compartir clínica"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>

                  <button 
                    onClick={() => {
                      setSelectedClinicId(null);
                      setSelectedFromList(null); // 🌟 ESTO APAGA EL PIN DEL MAPA
                    }}


                    className="text-gray-400 hover:text-dkv-gray bg-gray-50 hover:bg-gray-100 rounded-full p-1.5 transition-colors"
                    aria-label="Cerrar tarjeta"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              {(selectedClinicData.staff_count ?? 0) > 0 && (
                <div className="mb-4">
                  <motion.button 
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation(); 
                      setIsFloatingDentistsOpen(!isFloatingDentistsOpen);
                    }}
                    aria-expanded={isFloatingDentistsOpen}
                    animate={!isFloatingDentistsOpen ? { scale: [1, 1.03, 1] } : { scale: 1 }}
                    transition={!isFloatingDentistsOpen ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : { duration: 0.2 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-colors duration-300 cursor-pointer origin-left
                      ${isFloatingDentistsOpen 
                        ? 'bg-dkv-green text-white shadow-md' 
                        : 'bg-dkv-green/10 text-dkv-green-dark hover:bg-dkv-green/20 border border-dkv-green/20'
                      }
                    `}
                  >
                    <Users className={`w-4 h-4 ${isFloatingDentistsOpen ? 'text-white' : 'text-dkv-green'}`} aria-hidden="true" />
                    <span>
                       {selectedClinicData.staff_count} {selectedClinicData.staff_count === 1 ? 'Especialista' : 'Especialistas'}
                    </span>
                    {isFloatingDentistsOpen ? <Minus className="w-3.5 h-3.5 ml-1" aria-hidden="true" /> : <Plus className="w-3.5 h-3.5 ml-1" aria-hidden="true" />}
                  </motion.button>
                </div>
              )}

              <div className={`
                overflow-hidden transition-all duration-500 ease-in-out w-full
                ${isFloatingDentistsOpen ? 'max-h-[250px] opacity-100 mb-4' : 'max-h-0 opacity-0'}
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
                href={`https://www.google.com/maps/dir/?api=1&destination=${selectedClinicData.latitude},${selectedClinicData.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 mb-5 p-2 -mx-2 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-all cursor-pointer group"
                aria-label={`Cómo llegar a ${selectedClinicData.name}`}
              >
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-10 h-10 rounded-full bg-dkv-green text-white flex items-center justify-center shadow-md group-active:scale-90 transition-transform mb-1">
                    <Navigation className="w-5 h-5 ml-[-2px] mt-[2px]" />
                  </div>
                  <span className="text-[9px] font-bold text-dkv-green uppercase tracking-wider">Ruta</span>
                </div>

                <div className="flex flex-col font-fsme leading-tight overflow-hidden">
                  <span className="text-gray-800 font-bold text-base mb-0.5 group-hover:text-dkv-green transition-colors line-clamp-1">
                    {selectedClinicData.address}
                  </span>
                  <span className="text-gray-600 font-medium text-sm truncate">
                    {selectedClinicData.zip_code || ""} {selectedClinicData.city}
                  </span>
                </div>
              </a>

              <div className="border-t border-gray-100 pt-4 mt-2 flex flex-col gap-3">
                <div className="bg-orange-50/80 text-orange-800 text-xs px-3 py-2.5 rounded-lg flex items-start gap-2 border border-orange-100">
                  <span className="text-orange-500 mt-0.5">ⓘ</span>
                  <p className="font-medium leading-tight">
                    Activa <strong className="font-bold">DKV Dentisalud Élite</strong> para pedir cita en este centro con tarifas reducidas.
                  </p>
                </div>

                <a 
                  href="tel:+34900000000"
                  className="w-full flex items-center justify-center gap-2 bg-dkv-green text-white py-3.5 rounded-xl font-bold shadow-md hover:bg-dkv-green-hover transition-all active:scale-95 text-sm"
                >
                  <Phone className="w-4 h-4" />
                  Activar y pedir cita
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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