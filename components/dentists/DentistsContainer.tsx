// components\dentists\DentistsContainer.tsx


"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { ChevronUp, ChevronDown, Stethoscope, Loader2, X, Phone } from "lucide-react";
import { useNavigation, NavigationState } from "@/context/NavigationContext";
import ClinicList from "@/components/dentists/ClinicList";
import { createClient } from "@supabase/supabase-js";
import { motion, AnimatePresence } from "framer-motion";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const DentalMapClient = dynamic<any>(() => import("@/components/map/DentalMapClient"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-100 animate-pulse flex items-center justify-center font-fsme text-gray-400 uppercase text-xs font-bold tracking-widest">
      Cargando mapa interactivo...
    </div>
  )
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
  const isInsideMunicipio = localMarks.some((m: any) => m.tipo === 'centro' || m.tipo === 'hub');

  let mapGeoJsonUrl = undefined; 
  if (currentLevel !== "00") {
    if (localMarks.some((m: any) => m.tipo === 'comunidad')) {
      mapGeoJsonUrl = '/maps/autonomous_regions.geojson';
    } else if (localMarks.some((m: any) => m.tipo === 'provincia')) {
      mapGeoJsonUrl = '/maps/spain-provinces.geojson'; 
    } else {
      mapGeoJsonUrl = '/maps/municipalities.json'; 
    }
  }

  const effectiveBoundaryId = (initialData.codigo_ine && initialData.codigo_ine !== "sin informar") 
    ? initialData.codigo_ine 
    : undefined;

  const [isListOpen, setIsListOpen] = useState(initialData.lista.estadoInicial !== 'CLOSED');
  const [selectedClinicId, setSelectedClinicId] = useState<string | null>(null);
  const [selectedFromList, setSelectedFromList] = useState<string | null>(null);

  const hasAutoOpened = useRef(false);

  useEffect(() => {
    if (hasAutoOpened.current || localClinics.length === 0) return;
    const currentPath = window.location.pathname;
    if (currentPath.includes('/share-')) {
      const parts = currentPath.split('/share-');
      const realClinicId = parts[1];
      const sharedClinic = localClinics.find((c: any) => c.clinic_id === realClinicId);
      if (sharedClinic) {
        setSelectedClinicId(sharedClinic.clinic_id);
        setSelectedFromList(sharedClinic.name); 
        setIsListOpen(false); 
      }
      hasAutoOpened.current = true; 
      window.history.replaceState(null, '', parts[0]);
    }
  }, [localClinics]);

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

  const handleMapMove = useCallback(async (newCenter: { lat: number, lng: number }, zoom: number, bounds: any) => {
    if (currentLevel !== "00") return;
    setDynamicMapMode('FREE');
    setIsUpdatingMap(true);
    try {
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
  }, [currentLevel]);

  const totalLiveDentists = localClinics.reduce((acc: number, clinic: any) => acc + (Number(clinic.staff_count) || 0), 0);
  const selectedClinicData = localClinics.find((c: any) => c.clinic_id === selectedClinicId);

  return (
    <div className="relative w-full h-[85dvh] min-h-[600px] md:h-[80vh] md:min-h-[750px] bg-white flex flex-col pt-4 pb-12 px-4 md:px-10 font-fsme">
      <div className="relative w-full h-full bg-white rounded-[40px] overflow-hidden border-8 border-white shadow-xl z-20">
        {isUpdatingMap && (
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-[2000] bg-white px-5 py-2.5 rounded-full shadow-lg font-bold text-sm flex items-center gap-2 border border-dkv-green-light">
            <Loader2 className="w-4 h-4 animate-spin text-dkv-green" /> Buscando...
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
                activeBoundaryId={effectiveBoundaryId} 
                activeCenterExternal={selectedFromList} 
                geoJsonUrl={mapGeoJsonUrl} 
                onMapMove={handleMapMove}
                enableClustering={currentLevel === "00"}
                onMapClick={() => { setSelectedClinicId(null); setSelectedFromList(null); }}
            /> 
        </div>

        <AnimatePresence>
          {selectedClinicData && !isListOpen && (
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="absolute left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-[420px] z-40 bg-white rounded-2xl shadow-2xl p-5 bottom-8">
               <div className="flex justify-between items-start mb-3">
                  <h4 className="font-lemon text-dkv-green-dark text-xl">{selectedClinicData.name}</h4>
                  <button onClick={() => setSelectedClinicId(null)} className="text-gray-400"><X /></button>
               </div>
               <p className="text-sm text-gray-600 mb-4 font-fsme">{selectedClinicData.address}</p>
               <a href="tel:+34900000000" className="w-full flex items-center justify-center gap-2 bg-dkv-green text-white py-3.5 rounded-xl font-bold font-fsme">Activar y pedir cita</a>
            </motion.div>
          )}
        </AnimatePresence>

        <div className={`absolute bottom-0 left-0 right-0 z-30 bg-white transition-all duration-500 flex flex-col ${isListOpen ? 'h-[70%]' : 'h-[80px]'} ${currentLevel === "00" ? 'translate-y-full' : 'translate-y-0'}`}>
          <button onClick={() => setIsListOpen(!isListOpen)} className="h-[80px] px-6 flex items-center justify-between border-b cursor-pointer">
            <div className="flex items-center gap-4">
              <Stethoscope className="w-5 h-5 text-dkv-green" />
              <h3 className="font-lemon text-dkv-green-dark uppercase tracking-tight">
                <span className="text-dkv-green">{formatter.format(totalLiveDentists)}</span> DENTISTAS
              </h3>
            </div>
            {isListOpen ? <ChevronDown /> : <ChevronUp />}
          </button>
          <div className="flex-1 overflow-y-auto bg-gray-50/30">
            <ClinicList clinics={localClinics} onSelectClinic={(id) => { setSelectedClinicId(id); const c = localClinics.find((x:any) => x.clinic_id === id); if(c) setSelectedFromList(c.name); }} selectedClinicId={selectedClinicId} />
          </div>
        </div>
      </div>
    </div>
  );
}