// components\dentists\DentistsContainer.tsx

"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { ChevronUp, ChevronDown, Stethoscope, Loader2, X } from "lucide-react";
import { useNavigation, NavigationState } from "@/context/NavigationContext";
import ClinicList from "@/components/dentists/ClinicList";
import { motion, AnimatePresence } from "framer-motion";

// 🌟 IMPORTACIÓN DEL SINGLETON PARA EVITAR MÚLTIPLES INSTANCIAS
import { getSupabaseClient } from "@/lib/supabase-client";

const DentalMapClient = dynamic<any>(() => import("@/components/map/DentalMapClient"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-100 animate-pulse flex items-center justify-center font-fsme text-gray-400 uppercase text-xs font-bold tracking-widest">Cargando mapa interactivo...</div>
});

const formatter = new Intl.NumberFormat('es-ES');

export default function DentistsContainer({ initialData }: { initialData: NavigationState }) {
  const { updateNavigation } = useNavigation();
  const router = useRouter();

  // 🌟 Referencia local para el cliente Singleton
  const supabase = getSupabaseClient();

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

  const currentLevel = initialData.nivelFinal;
  const ine = initialData.codigo_ine || "";
  const isNational = ine === "00";

  let mapGeoJsonUrl = undefined; 
  if (isNational) {
    mapGeoJsonUrl = '/maps/autonomous_regions.geojson';
  } else if (ine.startsWith('CA-')) {
    mapGeoJsonUrl = '/maps/spain-provinces.geojson';
  } else {
    mapGeoJsonUrl = '/maps/municipalities.json'; 
  }

  const effectiveBoundaryId = (ine && ine !== "sin informar" && !isNational) ? ine : undefined;

  const handleMarkerClick = (markerIdentifier: string) => {
    const matchedClinic = localClinics.find((c: any) => c.name === markerIdentifier);
    if (matchedClinic) {
      setSelectedClinicId(matchedClinic.clinic_id);
      setIsListOpen(false);
    } else {
      router.push(`/dentistas/${markerIdentifier}`);
    }
  };

  const [isListOpen, setIsListOpen] = useState(initialData.lista.estadoInicial !== 'CLOSED');
  const [selectedClinicId, setSelectedClinicId] = useState<string | null>(null);
  const [selectedFromList, setSelectedFromList] = useState<string | null>(null);

  const handleMapMove = useCallback(async (newCenter: { lat: number, lng: number }, zoom: number, bounds: any) => {
    if (currentLevel !== "00") return;
    setDynamicMapMode('FREE');
    setIsUpdatingMap(true);
    try {
      // 🌟 Llamada RPC a la base de datos utilizando el cliente único
      const { data, error } = await supabase.rpc('get_centros_en_bounds', {
          sw_lat: bounds.getSouthWest().lat, sw_lng: bounds.getSouthWest().lng,
          ne_lat: bounds.getNorthEast().lat, ne_lng: bounds.getNorthEast().lng,
          center_lat: newCenter.lat, center_lng: newCenter.lng          
      });
      if (error) throw error;
      setLocalClinics(data || []);
      setLocalMarks((data || []).map((c: any) => ({
        name: c.name, lat: c.latitude, lng: c.longitude, slug: c.clinic_id, count: c.staff_count, tipo: 'centro'
      })));
    } catch (e) { console.error(e); } finally { setIsUpdatingMap(false); }
  }, [currentLevel, supabase]);

  return (
    <div className="relative w-full h-[85dvh] min-h-[600px] md:h-[80vh] md:min-h-[750px] bg-white flex flex-col pt-4 pb-12 px-4 md:px-10 font-fsme">
      <div className="relative w-full h-full bg-white rounded-[40px] overflow-hidden border-8 border-white shadow-xl z-20">
        <div className="absolute inset-0 z-10">
            <DentalMapClient 
                marks={localMarks}
                modo={dynamicMapMode}
                initialCenter={initialData.mapa.centro} 
                initialZoom={initialData.mapa.zoom}
                tileStyle={initialData.mapa.tileStyle}
                onMarkerClick={handleMarkerClick}
                activeBoundaryId={effectiveBoundaryId} 
                activeCenterExternal={selectedFromList} 
                geoJsonUrl={mapGeoJsonUrl} 
                onMapMove={handleMapMove}
                enableClustering={isNational}
                onMapClick={() => { setSelectedClinicId(null); setSelectedFromList(null); }}
            /> 
        </div>

        <div className={`absolute bottom-0 left-0 right-0 z-30 bg-white transition-all duration-500 flex flex-col ${isListOpen ? 'h-[70%]' : 'h-[80px]'} ${isNational ? 'translate-y-full' : 'translate-y-0'}`}>
          <button onClick={() => setIsListOpen(!isListOpen)} className="h-[80px] px-6 flex items-center justify-between border-b cursor-pointer">
            <div className="flex items-center gap-4">
              <Stethoscope className="w-5 h-5 text-dkv-green" />

              <span className="block font-fsme font-bold text-2xl text-dkv-green-dark uppercase leading-tight">
                <span className="text-dkv-green">{formatter.format(localClinics.reduce((acc, c) => acc + (Number(c.staff_count) || 0), 0))}</span> DENTISTAS
              </span>

            </div>
            {isListOpen ? <ChevronDown /> : <ChevronUp />}
          </button>
          <div className="flex-1 overflow-y-auto bg-gray-50/30">
            <ClinicList 
              clinics={localClinics} 
              onSelectClinic={(id) => { 
                setSelectedClinicId(id); 
                const c = localClinics.find((x:any) => x.clinic_id === id); 
                if(c) setSelectedFromList(c.name); 
              }} 
              selectedClinicId={selectedClinicId} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}