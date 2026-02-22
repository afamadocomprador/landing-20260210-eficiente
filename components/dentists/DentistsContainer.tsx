"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { ChevronUp, ChevronDown, Stethoscope } from "lucide-react";
import { useNavigation, NavigationState } from "@/context/NavigationContext";
import ClinicList from "@/components/dentists/ClinicList";

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

  useEffect(() => {
    updateNavigation(initialData);
  }, [initialData, updateNavigation]);

  const activeMarks = initialData.mapa.marks;
  const activeMapaConfig = initialData.mapa;
  const activeStats = initialData.lista;


  // 1. Detección Inteligente del Nivel de Detalle (LOD)
  const hasComunidades = activeMarks.some((m: any) => m.tipo === 'comunidad');
  const hasProvincias = activeMarks.some((m: any) => m.tipo === 'provincia');

  // TRAZA DE DIAGNÓSTICO: Veremos qué tipos exactos están llegando
  console.log("🕵️‍♂️ [MAPA LOD] Tipos recibidos:", activeMarks.map((m: any) => m.tipo));
  
  // 2. Asignación del GeoJSON correspondiente
  let mapGeoJsonUrl = undefined; // Por defecto no cargamos contornos (ej. para municipios o clínicas sueltas)

  if (hasComunidades) {
    mapGeoJsonUrl = '/maps/autonomous_regions.geojson';
    console.log("🗺️ [MAPA LOD] Cargando archivo de COMUNIDADES");
  } else if (hasProvincias) {
    mapGeoJsonUrl = '/maps/spain-provinces.geojson';
    console.log("🗺️ [MAPA LOD] Cargando archivo de PROVINCIAS");
  }


  // ESTADO ORIGINAL: Controla si la lista está desplegada o colapsada
  const [isListOpen, setIsListOpen] = useState(initialData.lista.estadoInicial !== 'CLOSED');

  // NUEVO ESTADO: Controla qué clínica se ha seleccionado en el mapa
  const [selectedClinicId, setSelectedClinicId] = useState<string | null>(null);

  //se pasa arriba mejor
  //const formatter = new Intl.NumberFormat('es-ES');

  // NUEVO HANDLER: Orquesta la interacción Mapa -> Lista 
  // Si esta función se ejecuta, ES SEGURO que es una clínica gracias a la lógica del mapa.
  // NUEVO HANDLER: Orquesta la interacción y "traduce" el ID
  // NUEVO HANDLER: Recibe directamente el nombre de la clínica (o el slug si es región)
  const handleMarkerClick = (markerIdentifier: string) => {
    
    // Buscamos si el identificador coincide con el NOMBRE de alguna clínica de nuestra lista
    const matchedClinic = activeStats.clinics.find((c: any) => c.name === markerIdentifier);
    
    if (matchedClinic) {
      // ES UNA CLÍNICA: Pasamos el ID real de la base de datos (el hash) a la lista
      setSelectedClinicId(matchedClinic.clinic_id);
      setIsListOpen(true); 
    } else {
      // NO ES CLÍNICA: Es una región, así que navegamos
      router.push(`/dentistas/${markerIdentifier}`);
    }
  };

  return (
    <div className="relative w-full h-[85dvh] min-h-[600px] md:h-[80vh] md:min-h-[750px] bg-white flex flex-col pt-4 pb-12 px-4 md:px-10 font-fsme">
      <div className="relative w-full h-full bg-white rounded-[40px] overflow-hidden border-8 border-white shadow-xl z-20">
        
        <div className="absolute inset-0 z-10">
            <DentalMapClient 
                marks={activeMarks} 
                modo={activeMapaConfig.modo}
                initialCenter={activeMapaConfig.centro} 
                initialZoom={activeMapaConfig.zoom}
                tileStyle={activeMapaConfig.tileStyle}
                // NUEVA PROP: Pasamos el control de click al mapa
                onMarkerClick={handleMarkerClick}
                geoJsonUrl={mapGeoJsonUrl} // El mapa recibirá null si estamos a nivel municipio, o la URL correcta
            /> 
        </div>

        <div className={`absolute bottom-0 left-0 right-0 z-30 bg-white transition-all duration-500 flex flex-col ${isListOpen ? 'h-[70%]' : 'h-[80px]'}`}>
          <button onClick={() => setIsListOpen(!isListOpen)} className="h-[80px] px-6 flex items-center justify-between cursor-pointer border-b shrink-0">
            <div className="flex items-center gap-4">
              <Stethoscope className="w-5 h-5 text-dkv-green" />
              <h3 className="font-lemon text-dkv-green-dark uppercase tracking-tight">
                <span className="text-dkv-green">{formatter.format(activeStats.totalDentistas)}</span> DENTISTAS
              </h3>
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400" aria-hidden="true">
              {isListOpen ? <ChevronDown /> : <ChevronUp />}
            </div>
          </button>
          
          {/* <div className="flex-1 overflow-y-auto bg-gray-50/30"> */}
          <div id="scroll-clinicas" className="flex-1 overflow-y-auto bg-gray-50/30 relative scroll-smooth">
            <div className="max-w-5xl mx-auto py-2">
                {/* 1. Pasamos el ID seleccionado a la lista.
                    2. Modificado para limpiar la selección al cerrarla manualmente.
                */}
                    {/* NUEVA PROP: Pasamos el ID seleccionado a la lista */}
                <ClinicList 
                    clinics={activeStats.clinics} 
                    onSelectClinic={(id) => {
                        setSelectedClinicId(id);
                        setIsListOpen(false);
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