"use client";

import { MapContainer, TileLayer, Marker, useMap, ZoomControl, GeoJSON } from "react-leaflet"; // <--- 1. Importar GeoJSON
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import * as topojson from "topojson-client";

export interface MapMarkerData {
  name: string; 
  lat: number; 
  lng: number; 
  count: number; 
  slug: string;
  tipo?: 'centro' | 'comunidad' | 'provincia' | 'municipio' | 'comarca' | 'hub';
  codigo_ine?: string; // <--- NUEVA PROPIEDAD
}

interface MapProps {
  marks?: MapMarkerData[];
  initialCenter?: [number, number];
  initialZoom?: number;
  modo?: 'FIT_BOUNDS' | 'CENTER_ZOOM';
  tileStyle?: string; 
  geoJsonUrl?: string; // <--- SOLO EL TIPO (sin el valor)
  // 1. NUEVA PROP: Callback para delegar el click al padre
  onMarkerClick?: (id: string) => void;
  activeBoundaryId?: string; // <--- AÑADIMOS ESTO
  activeCenterExternal?: string | null; // <--- AÑADIR ESTA LÍNEA para detectar click en ficha de centro 
}


// 2. TYPESCRIPT ESTRICTO: Interfaz para el controlador en lugar de usar 'any'
interface MapControllerProps {
  marks?: MapMarkerData[];
  modo?: 'FIT_BOUNDS' | 'CENTER_ZOOM';
  initialCenter?: [number, number];
  initialZoom?: number;
  //setReady: (ready: boolean) => void;
  // Cambiamos setReady por setMapInstance
  setMapInstance: (map: L.Map) => void;
}


const createCustomIcon = (count: number, name: string, isActive: boolean = false) => {
  const displayName = name.length > 25 ? name.substring(0, 22) + "..." : name;

  // 🎨 NUEVOS COLORES: Invertimos el cartelito al estar activo
  const pinColor = "#849700"; // El globo siempre verde
  const labelBgColor = isActive ? "#033B37" : "white";    // Fondo verde oscuro si activo
  const labelTextColor = isActive ? "white" : "#033B37"; // Letra blanca si activo
  
  const scale = isActive 
    ? "transform: scale(1.15) translateY(-5px); transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); z-index: 1000;" 
    : "transition: all 0.3s ease;";

  const htmlContent = `
    <div style="display: flex; flex-direction: column; align-items: center; width: 80px; cursor: pointer; ${scale}">
      <div style="position: relative; width: 38px; height: 46px;">
        <svg width="38" height="46" viewBox="0 0 38 46" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 0.5C8.78273 0.5 0.5 8.78273 0.5 19C0.5 30.5 19 45.5 19 45.5C19 45.5 37.5 30.5 37.5 19C37.5 8.78273 29.2173 0.5 19 0.5Z" fill="${pinColor}" stroke="white" stroke-width="1"/>
          <circle cx="19" cy="19" r="14" fill="white"/>
        </svg>
        <div style="position: absolute; top: 6px; left: 0; width: 38px; height: 26px; display: flex; align-items: center; justify-content: center; color: #033B37; font-weight: 700; font-size: 14px; font-family: sans-serif; pointer-events: none;">${count}</div>
      </div>
      <div style="margin-top: 4px; background-color: ${labelBgColor}; border: 1px solid #849700; color: ${labelTextColor}; padding: 2px 8px; border-radius: 4px; font-weight: 700; font-size: 11px; text-transform: uppercase; white-space: nowrap; box-shadow: 0 2px 4px rgba(0,0,0,0.1); line-height: 1.1;">${displayName}</div>
    </div>`.replace(/\s+/g, ' ').trim();
    
  return L.divIcon({ className: 'custom-pin', html: htmlContent, iconSize: [80, 75], iconAnchor: [40, 46] });
};





// 3. TYPESCRIPT: Aplicamos la interfaz MapControllerProps
//function MapController({ marks, modo, initialCenter, initialZoom, setReady }: any) {
//function MapController({ marks, modo, initialCenter, initialZoom, setReady }: MapControllerProps) {
function MapController({ marks, modo, initialCenter, initialZoom, setMapInstance }: MapControllerProps) {
  const map = useMap();
  useEffect(() => {
    if (!map) return;
    //setReady(true);
    setMapInstance(map); // <--- GUARDAMOS LA INSTANCIA COMPLETA
    map.invalidateSize();

    if (modo === 'CENTER_ZOOM' && initialCenter) {
      //map.setView(initialCenter, initialZoom || 6);
      map.flyTo(initialCenter,
                initialZoom || 6, {
                     animate: true,
                     duration: 1.5 // Duración en segundos
      });
    } else if (modo === 'FIT_BOUNDS' && marks && marks.length > 0) {
      //const pts = marks.filter((m: any) => m.lat != null).map((m: any) => [m.lat, m.lng]);
      const pts = marks.filter((m: any) => m.lat != null).map((m: any) => [m.lat, m.lng] as [number, number]);
      //if (pts.length > 0) map.fitBounds(L.latLngBounds(pts), { padding: [70, 70], maxZoom: 12 });
      if (pts.length > 0) {
          map.flyToBounds(L.latLngBounds(pts), {

                                 // Formato de Leaflet: [MargenHorizontal, MargenVertical]

                                 //padding: [70, 70],          
                                 // Izquierda: 15px (aprovecha el ancho) | Arriba: 40px (respira por el top)
                                 paddingTopLeft: [15, 40],

                                 // Derecha: 15px (aprovecha el ancho)  | Abajo: 120px (salva tu lista desplegable)
                                 paddingBottomRight: [15, 120],

                                 maxZoom: 12, 
                                 animate: true,
                                 duration: 1.5
          });
      }
    }
  //}, [marks, modo, initialCenter, initialZoom, map, setReady]);
  }, [marks, modo, initialCenter, initialZoom, map, setMapInstance]);
  return null;
}

export default function DentalMapClient({ 
  marks = [], 
  initialCenter = [40.41, -3.70],
  initialZoom = 6,
  modo = 'CENTER_ZOOM',
  tileStyle = 'light_all',
  geoJsonUrl = "/maps/autonomous_regions.geojson", // <--- AQUÍ VA EL VALOR POR DEFECTO
  onMarkerClick, // Recibimos la nueva prop
  activeBoundaryId, // <--- LO RECIBIMOS AQUÍ
  activeCenterExternal // <--- Recibimos la prop aquí
}: MapProps) {
  //const [mapIsReady, setMapIsReady] = useState(false);
  //Para poder manejar el mapa
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);
  // 👉 NUEVO ESTADO: Para saber qué clínica hemos pulsado
  const [activeCenter, setActiveCenter] = useState<string | null>(null);
  // 4. TYPESCRIPT: Evitamos el 'any' implícito al inicializar con null
  //const [geoJsonData, setGeoJsonData] = useState(null); // <--- 4. Estado para los datos
  const [geoJsonData, setGeoJsonData] = useState<any | null>(null);
  // Estado para saber qué región debe iluminarse en rojo
  const [highlightedRegion, setHighlightedRegion] = useState<string | null>(null);




  const router = useRouter();

  //const tileUrl = `https://{s}.basemaps.cartocdn.com/${tileStyle}/{z}/{x}/{y}{r}.png`;
  // --- CONFIGURACIÓN DE TILES DINÁMICA ---
  const isOSM = tileStyle === 'osm';
  
  const tileUrl = isOSM 
    ? `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png` // Nivel 4+: Callejero a todo color y detallado
    : `https://{s}.basemaps.cartocdn.com/${tileStyle}/{z}/{x}/{y}{r}.png`; // Niveles 1-3: Mapa limpio de CARTO
    
  // Por temas legales, hay que cambiar la atribución (el textito de la esquina) según el mapa que usemos
  const tileAttribution = isOSM 
    ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' 
    : '&copy; CARTO';





  // --- 5. Efecto para cargar el fichero externo ---
  useEffect(() => {
    if (!geoJsonUrl) {
        setGeoJsonData(null);
        return;
    }
    
    fetch(geoJsonUrl)
        .then(response => {
            if (!response.ok) throw new Error("Error al cargar GeoJSON");
            return response.json();
        })
        .then(data => {
            // MAGIA: Si el fichero es TopoJSON (municipios), lo pasamos a GeoJSON al vuelo
            if (data.type === "Topology") {
                // Extrae la primera capa que encuentre en el archivo (municipalities)
                const objectKey = Object.keys(data.objects)[0];
                const geoData = topojson.feature(data, data.objects[objectKey] as any);
                setGeoJsonData(geoData);
            } else {
                // Si ya es GeoJSON (comunidades o provincias), lo deja tal cual
                setGeoJsonData(data);
            }
        })
        .catch(err => console.error("Error cargando contorno:", err));
  }, [geoJsonUrl]);






// 🌟 ESCUCHADOR EXTERNO: Cuando la lista nos manda un centro
  useEffect(() => {
    if (activeCenterExternal && mapInstance) {
      const targetMark = marks.find(m => m.name === activeCenterExternal);
      
      if (targetMark && targetMark.lat != null) {
        setActiveCenter(targetMark.name); 
        
        const targetZoom = 16; // <--- ZOOM OBJETIVO
        const mapHeight = mapInstance.getSize().y;
        
        // 👉 CLAVE: Proyectamos y des-proyectamos usando el zoom 16
        const targetPoint = mapInstance.project([targetMark.lat, targetMark.lng], targetZoom);
        targetPoint.y += (mapHeight / 3); 
        const targetLatLng = mapInstance.unproject(targetPoint, targetZoom);
        
        mapInstance.flyTo(targetLatLng, targetZoom, {
          animate: true,
          duration: 0.8 
        });
      }
    }
  }, [activeCenterExternal, mapInstance, marks]);










  const renderedMarkers = useMemo(() => {
    if (!mapInstance) return null; 

    return marks.filter(m => m.lat != null).map((m, idx) => {
      // 🌟 SABER SI ES EL ACTIVO: ¿Es un centro y su nombre coincide con el estado?
      const isActive = m.tipo === 'centro' && activeCenter === m.name;

      return (
       <Marker 
        // Al añadir isActive a la key, forzamos a React a redibujar el pin instantáneamente
        key={`m-${idx}-${m.slug}-${isActive}`}
        position={[m.lat, m.lng]} 
        icon={createCustomIcon(m.count, m.name, isActive)}
        zIndexOffset={isActive ? 1000 : 0}
        eventHandlers={{
          click: () => {
            // Si es un centro, ignoramos su slug roto y enviamos SU NOMBRE EXACTO
            if (m.tipo === 'centro' && onMarkerClick) {

              // 🌟 ILUMINAR PIN: Guardamos el nombre para que React lo repinte activo
              setActiveCenter(m.name);

              // ES UNA CLÍNICA: Avisamos al contenedor para que haga scroll en la lista
              onMarkerClick(m.name);

              // 2. MAGIA UX: Calculamos el offset para centrar en el 1/3 superior usando zoom 16
              const targetZoom = 16;
              const mapHeight = mapInstance.getSize().y;
              
              // Proyectamos el marcador a píxeles absolutos usando el zoom destino
              const targetPoint = mapInstance.project([m.lat, m.lng], targetZoom);
              
              // Desplazamos el "centro matemático" del mapa hacia ABAJO un tercio de la pantalla.
              // Efecto visual: el marcador SUBE hasta el centro del 1/3 superior.
              targetPoint.y += (mapHeight / 3); 
              
              // Volvemos a convertir esos píxeles a coordenadas GPS
              const targetLatLng = mapInstance.unproject(targetPoint, targetZoom);
              
              // Volamos suavemente a la nueva coordenada
              mapInstance.flyTo(targetLatLng, targetZoom, {
                animate: true,
                duration: 0.8 
              });

            } else if (m.slug) {
              // ES NAVEGABLE (comunidad, provincia, municipio, hub...):
              setHighlightedRegion(m.codigo_ine || m.name);

              // Pausa dramática para ver el efecto
              setTimeout(() => {
                router.push(`/dentistas/${m.slug}`, {scroll: false});
              }, 400);
            }
          },
        }}
      />
     ); // Cerramos el return del marcador
  }); // Cerramos la llave del map
  // 👇 CRUCIAL: Añadimos activeCenter a las dependencias para que recalcule si cambia
  }, [marks, mapInstance, router, onMarkerClick, activeCenter]);


  // Estilo del contorno (puedes parametrizarlo también si quieres)
  /* ********
  const geoJsonStyle = {
    color: "#033B37", // Color del borde (Naranja/Rojo)
    weight: 1,        // Grosor
    opacity: 0.2,        // Grosor
    fillColor: "#FFFFFF",
    fillOpacity: 0.5  // Transparencia del relleno (muy sutil)
  };
  ********** */


  // =====================================================================
  // ---> PASO 1: EXTRAER LOS IDs DE LAS PROVINCIAS/COMUNIDADES VÁLIDAS
  // Lo ponemos justo antes del return.
  // =====================================================================
  // 1. Extraemos los IDs
  /* *********************************
  const validIds = marks
    .map(m => m.codigo_ine ? String(m.codigo_ine).replace('CA-', '').replace('PR-', '') : null)
    .filter(Boolean);

  if (geoJsonData && geoJsonData.features && geoJsonData.features.length > 0) {
     const sampleFeature = geoJsonData.features[0];
     const sampleId = sampleFeature.properties?.cod_prov || sampleFeature.id || sampleFeature.properties?.id;
  }
  ********************************** */
  // --- 1. LÓGICA PARA COMUNIDADES Y PROVINCIAS ---
  const validIds = marks
    .map(m => m.codigo_ine ? String(m.codigo_ine).replace(/\D/g, '') : null) // \D quita letras como CA- o PR-
    .filter(Boolean);

  // --- 2. LÓGICA PARA MUNICIPIOS (El truco del prefijo INE) ---
  const currentProvincePrefix = useMemo(() => {
    if (validIds.length > 0) {
      // Pillamos cualquier código que haya en pantalla y sacamos sus 2 primeros dígitos (la provincia)
      return validIds[0]?.substring(0, 2); 
    }
    return null;
  }, [validIds]);


// =====================================================================
  // 🕵️‍♂️ TRAZAS DE DIAGNÓSTICO PARA EL NIVEL 4 (MUNICIPIOS)
  // =====================================================================
  console.log("📍 [MAPA] Nivel Actual - geoJsonUrl:", geoJsonUrl);
  console.log("📍 [MAPA] ID de límite activo (activeBoundaryId):", activeBoundaryId);

  if (activeBoundaryId && geoJsonData?.features) {
    const cleanBoundaryId = activeBoundaryId.replace(/\D/g, '');
    console.log("📍 [MAPA] ID limpio que vamos a buscar en el fichero:", cleanBoundaryId);

    // Vamos a buscar manualmente si el polígono existe en los datos descargados
    const municipioEncontrado = geoJsonData.features.find((f: any) => {
      const featureId = String(f.properties?.cod_prov || f.id || f.properties?.id);
      return featureId === cleanBoundaryId;
    });

    if (municipioEncontrado) {
      console.log("✅ [MAPA] ¡Polígono ENCONTRADO en el fichero! Datos:", municipioEncontrado.id, municipioEncontrado.properties);
    } else {
      console.log("❌ [MAPA] Polígono NO ENCONTRADO. El ID no coincide con ninguno de los 8.131 municipios.");
      // Si no lo encuentra, sacamos el primero del fichero para ver qué formato de ID usan
      console.log("💡 [MAPA] Ejemplo de un municipio del fichero para comparar:", geoJsonData.features[0].id, geoJsonData.features[0].properties);
    }
  }
  // =====================================================================


  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MapContainer center={initialCenter} zoom={initialZoom} style={{ height: "100%", width: "100%" }} zoomControl={false}>
        {/*  <MapController marks={marks} modo={modo} initialCenter={initialCenter} initialZoom={initialZoom} setReady={setMapIsReady} /> */}
        <MapController marks={marks} modo={modo} initialCenter={initialCenter} initialZoom={initialZoom} setMapInstance={setMapInstance} />
        <ZoomControl position="topright" />

        {/* <TileLayer url={tileUrl} attribution='&copy; CARTO' /> */}
        <TileLayer url={tileUrl} attribution={tileAttribution} />
        
        {/* --- 6. Renderizado del Contorno --- */}
        {/* 
        {geoJsonData && <GeoJSON data={geoJsonData} style={geoJsonStyle} filter={(feature) => {
            // A veces la propiedad es "name", "nombre" o "NAME_1". Revisa tu archivo.
            return feature.properties.name === "Aragón" || feature.properties.nombre === "Aragón";
         }}/>}
         */}


         {/* --- Renderizado del Contorno --- */}
         {/*
         {geoJsonData && (
             <GeoJSON 
                 data={geoJsonData} 
                 style={geoJsonStyle} 
             />
         )}
         */}
 



        {/* --- Renderizado del Contorno Dinámico --- */}
        {geoJsonData && (
          <GeoJSON 
            // TRUCO PRO: Forzamos el redibujado completo si cambia el archivo
            key={geoJsonUrl}
            data={geoJsonData} 

            // =====================================================================
            // ---> PASO 2: EL NUEVO FILTRO
            // Comprobamos si el polígono pertenece a los marcadores que estamos viendo
            // =====================================================================
            filter={(feature: any) => {
              const featureId = String(feature.properties?.cod_prov || feature.id || feature.properties?.id);
              // Si el ID de este polígono está en nuestra lista de validIds, lo dibuja


              // 🌟 A) NIVEL 4 (Dentro de un Municipio): Nos pasan un ID explícito a dibujar
              if (activeBoundaryId) {
                // cuando solo pintábamos las fronteras del municipio en cuestión
                //const cleanBoundaryId = activeBoundaryId.replace(/\D/g, '');
                //return featureId === cleanBoundaryId;
                // ¡CAMBIO CLAVE! Devolvemos 'true' para TODOS. 
                // Necesitamos que existan todos los polígonos para poder pintarlos de blanco y tapar el mapa.
                return true;
              }



              // 🌟 B) NIVEL 3 (Provincia): Dibujamos todos los municipios que empiecen por nuestro prefijo
              if (geoJsonUrl.includes('municipalities')) {
                // Solo pintamos el municipio si empieza por los 2 dígitos de nuestra provincia (ej: "50...")
                return currentProvincePrefix ? featureId.startsWith(currentProvincePrefix) : false;
              }
              
              // 🌟 C) NIVELES 1 y 2 (España o Comunidad): Usamos los validIds de los marks
              return validIds.includes(featureId);
            }}


            // =====================================================================
            // ---> ESTILO MULTINIVEL
            // =====================================================================
            style={(feature: any) => {


              // 3. Obtenemos el ID del GeoJSON (puede venir en la raíz o en properties)
              //const featureId = feature.id || feature.properties?.id;
              // SÚPER-BÚSQUEDA: 
              // - feature.properties.cod_prov (para el archivo de provincias de GitHub)
              // - feature.id / feature.properties.id (para el de comunidades)
              //const featureId = String(feature.properties?.cod_prov || feature.id || feature.properties?.id);
              const featureId = feature.properties?.cod_prov || feature.id || feature.properties?.id;


              // --- ESTILO FIJO PARA NIVEL 4 (El borde del municipio en el que estamos) ---
              /* ***********************************************
              if (activeBoundaryId && featureId === activeBoundaryId.replace(/\D/g, '')) {
                return {
                  color: '#033B37', // Verde DKV o el color corporativo para el borde
                  weight: 1,        // Borde un poco más grueso para delimitar bien la zona
                  opacity: 0.8,  //opacity: 0.8,
                  fillColor: 'transparent', // Sin relleno para ver las calles perfectas
                  fillOpacity: 0,
                  dashArray: '5, 5', // Opcional: Borde punteado queda muy elegante para límites municipales
                  className: 'pointer-events-none' // CRUCIAL: Para que el polígono no bloquee los clics en el mapa
                };
                **************************************************** */

              if (activeBoundaryId) {

                const cleanBoundaryId = activeBoundaryId.replace(/\D/g, '');
                
                // 1. EL MUNICIPIO ACTIVO (Foco)
                if (featureId === cleanBoundaryId) {
                  return {
                    color: '#033B37', // Borde corporativo
                    weight: 3,        
                    opacity: 0.8,
                    fillColor: 'transparent', // Cristalino para ver las calles perfectas
                    fillOpacity: 0,
                    dashArray: '5, 5', 
                    className: 'pointer-events-none'
                  };
                } 
                // 2. EL RESTO DE MUNICIPIOS (La Máscara Blanca)
                else {
                  return {
                    stroke: false, // SIN bordes, para que no se vea una "malla" negra de fondo
                    weight: 0,
                    fillColor: '#FFFFFF', // Blanco total
                    fillOpacity: 0.85, // 0.85 deja intuir un 15% del mundo real. Si quieres bloqueo total, pon 1.
                    interactive: false, // CRUCIAL para rendimiento: evita que reaccionen al ratón
                    className: 'pointer-events-none'
                  };
                }
              }


              // 1. Si no hay nada seleccionado, devolvemos el estilo base inmediatamente (optimización de rendimiento)
              if (!highlightedRegion) {
                // Estilo por defecto (inactivo)
                return { color: '#849700', weight: 1, fillColor: '#849700', fillOpacity: 0.05 };
              }

              // 2. Limpiamos nuestro código (ej: "CA-02" pasa a ser "02")
              //const targetId = highlightedRegion.replace('CA-', '');
              // Limpiamos el ID que el usuario pinchó dejando solo números
              const targetId = highlightedRegion.replace(/\D/g, '');


              // 4. Comparación directa (ya que nos confirmas que trae el 0)
              //const isHighlighted = String(featureId) === targetId;
              const isHighlighted = featureId === targetId;

              // 5. Devolvemos el estilo resaltado en rojo si hay coincidencia
              return {
                //color: isHighlighted ? '#e60000' : '#849700',
                color: isHighlighted ? '#e60000' : '#FFFFFFF',
                weight: isHighlighted ? 1 : 1,
                opacity: isHighlighted ? 1 : 0.2,
                //fillColor: isHighlighted ? '#e60000' : '#849700',
                fillColor: isHighlighted ? '#e60000' : '#FFFFFF',
                //fillOpacity: isHighlighted ? 0.02 : 0.05,
                fillOpacity: isHighlighted ? 0.02 : 0.1,
                // Nota: Leaflet a veces requiere que las transiciones se manejen vía clases CSS, 
                // pero si el motor de renderizado lo soporta, hará un fundido suave.
                className: 'transition-all duration-300' 
              };
            }}
          />
        )}








        {renderedMarkers}
      </MapContainer>
    </div>
  );
}