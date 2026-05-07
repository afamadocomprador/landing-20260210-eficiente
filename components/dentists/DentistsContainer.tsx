// components/dentists/DentistsContainer.tsx

// components/dentists/DentistsContainer.tsx

"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { ChevronUp, ChevronDown, Stethoscope } from "lucide-react";
import { useNavigation, NavigationState } from "@/context/NavigationContext";
import ClinicList from "@/components/dentists/ClinicList";

const DentalMapClient = dynamic<any>(() => import("@/components/map/DentalMapClient"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-100 animate-pulse flex items-center justify-center font-fsme text-gray-400 uppercase text-xs font-bold tracking-widest">Cargando mapa interactivo...</div>
});

const formatter = new Intl.NumberFormat('es-ES');

export default function DentistsContainer({ initialData }: { initialData: NavigationState }) {
  const { updateNavigation } = useNavigation();
  const router = useRouter();

  const [localMarks, setLocalMarks] = useState(initialData.mapa.marks);
  const [localClinics, setLocalClinics] = useState(initialData.lista.clinics);
  const [dynamicMapMode, setDynamicMapMode] = useState<any>(initialData.mapa.modo);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  
  const [isListOpen, setIsListOpen] = useState(initialData.lista.estadoInicial !== 'CLOSED');
  const [selectedClinicId, setSelectedClinicId] = useState<string | null>(null);
  const [selectedFromList, setSelectedFromList] = useState<string | null>(null);

  const isInitialLoad = useRef(true);

  useEffect(() => {
    updateNavigation(initialData);
    setLocalMarks(initialData.mapa.marks);
    setLocalClinics(initialData.lista.clinics);
    setDynamicMapMode(initialData.mapa.modo);
    setExpandedGroup(null);
    isInitialLoad.current = true;
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

  // 🌟 MEJORA: Al cerrar la lista, liberamos el mapa de cualquier selección
  const toggleList = () => {
    const newState = !isListOpen;
    setIsListOpen(newState);
    if (!newState) {
      setSelectedFromList(null);
      setSelectedClinicId(null);
      setDynamicMapMode('FREE');
    }
  };

  const handleMarkerClick = (name: string) => {
    const c = localClinics.find((x:any) => x.name === name);
    if(c) { 
      setSelectedClinicId(c.clinic_id); 
      setSelectedFromList(c.name); 
      setIsListOpen(true);         
    }
  };

  const handleExpandGroup = (municipioName: string) => {
    isInitialLoad.current = true; 
    setExpandedGroup(municipioName);
    const normalize = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
    const target = normalize(municipioName);

    const clinicsInGroup = localClinics.filter((c: any) => normalize(c.city || c.municipio || "") === target);
    const individualMarks = clinicsInGroup.map((c: any) => ({
        name: c.name, lat: c.latitude, lng: c.longitude, slug: c.clinic_id, count: c.staff_count, tipo: 'centro'
    }));
    
    const otherMunis = localMarks.filter((m: any) => m.tipo === 'municipio' && normalize(m.name) !== target);
    setLocalMarks([...otherMunis, ...individualMarks]);
    setDynamicMapMode('FIT_BOUNDS_STRICT'); 
  };

  const handleMapMove = useCallback(async (newCenter: { lat: number, lng: number }, zoom: number, bounds: any) => {
    if (currentLevel !== "00" && currentLevel !== "07") return;
    if (isInitialLoad.current) { isInitialLoad.current = false; return; }

    setDynamicMapMode('FREE');
    try {
      const response = await fetch('/api/clinics/bounds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sw_lat: bounds.getSouthWest().lat, sw_lng: bounds.getSouthWest().lng,
          ne_lat: bounds.getNorthEast().lat, ne_lng: bounds.getNorthEast().lng,
          center_lat: newCenter.lat, center_lng: newCenter.lng
        }),
      });
      const data = await response.json();
      setLocalClinics(data || []);

      if (currentLevel === "07") {
          const isDeepZoom = zoom >= 14; 
          const groupedMap = new Map();
          const individualMarks: any[] = [];
          const normalize = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
          const targetExpanded = expandedGroup ? normalize(expandedGroup) : null;

          (data || []).forEach((c: any) => {
            const muniName = c.city || c.municipio || "Otros";
            const cMuniNormalized = normalize(muniName);
            if (isDeepZoom || cMuniNormalized === targetExpanded) {
               individualMarks.push({ name: c.name, lat: c.latitude, lng: c.longitude, slug: c.clinic_id, count: c.staff_count, tipo: 'centro' });
            } else {
               if (!groupedMap.has(muniName)) groupedMap.set(muniName, { name: muniName, lat: c.latitude, lng: c.longitude, count: 0, tipo: 'municipio' });
               groupedMap.get(muniName).count += (Number(c.staff_count) || 0);
            }
          });
          setLocalMarks([...Array.from(groupedMap.values()), ...individualMarks]);
      } else {
          setLocalMarks((data || []).map((c: any) => ({ name: c.name, lat: c.latitude, lng: c.longitude, count: c.staff_count, tipo: 'centro' })));
      }
    } catch (e) { console.error(e); }
  }, [currentLevel, expandedGroup]);

  return (
    <div className="relative w-full h-[85dvh] min-h-[600px] md:h-[80vh] md:min-h-[750px] bg-white flex flex-col pt-4 pb-12 px-4 md:px-10">
      <div className="relative w-full h-full bg-white rounded-[40px] overflow-hidden border-8 border-white shadow-xl z-20">
        <div className="absolute inset-0 z-10">
            <DentalMapClient 
                marks={localMarks}
                modo={dynamicMapMode}
                initialCenter={initialData.mapa.centro} 
                initialZoom={initialData.mapa.zoom}
                onMarkerClick={handleMarkerClick}
                onExpandGroup={handleExpandGroup}
                activeBoundaryId={effectiveBoundaryId} 
                activeCenterExternal={selectedFromList} 
                geoJsonUrl={mapGeoJsonUrl} 
                onMapMove={handleMapMove}
                // 🌟 MEJORA: Al hacer click en el mapa vacío, limpiamos la selección para "liberar" el zoom
                onMapClick={() => {
                  setSelectedClinicId(null);
                  setSelectedFromList(null);
                  setDynamicMapMode('FREE');
                }}
                landingLevel={currentLevel}
                isNearMeMode={currentLevel === "00"}
            /> 
        </div>

        {expandedGroup && currentLevel === '07' && (
          <button 
            onClick={() => { isInitialLoad.current = true; setExpandedGroup(null); setLocalMarks(initialData.mapa.marks); setDynamicMapMode('FIT_BOUNDS'); }}
            className="absolute top-4 left-4 z-[1000] bg-white shadow-md rounded-full px-4 py-2 text-sm font-bold text-dkv-green flex items-center gap-2"
          > ← Volver </button>
        )}

        <div className={`absolute bottom-0 left-0 right-0 z-30 bg-white transition-all duration-500 flex flex-col ${isListOpen ? 'h-[70%]' : 'h-[80px]'}`}>
          <button onClick={toggleList} className="h-[80px] px-6 flex items-center justify-between border-b cursor-pointer">
            <div className="flex items-center gap-4">
              <Stethoscope className="w-5 h-5 text-dkv-green" />
              <span className="block font-fsme font-bold text-2xl text-dkv-green-dark uppercase leading-tight">
                <span className="text-dkv-green">{formatter.format(localClinics.reduce((acc, c) => acc + (Number(c.staff_count) || 0), 0))}</span> DENTISTAS
              </span>
            </div>
            {isListOpen ? <ChevronDown /> : <ChevronUp />}
          </button>
          
          <div id="scroll-clinicas" className="flex-1 overflow-y-auto">
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