// components/map/DentalMapClient.tsx

"use client";

import { MapContainer, TileLayer, Marker, useMap, ZoomControl, GeoJSON, useMapEvents, Polygon } from "react-leaflet";
import MarkerClusterGroup from 'react-leaflet-cluster'; 

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import * as topojson from "topojson-client";

export interface MapMarkerData {
  name: string; lat: number; lng: number; count: number; slug: string;
  tipo?: 'centro' | 'comunidad' | 'provincia' | 'municipio' | 'comarca' | 'hub';
  codigo_ine?: string;
}

interface MapProps {
  marks?: MapMarkerData[]; initialCenter?: [number, number]; initialZoom?: number;
  modo?: 'FIT_BOUNDS' | 'CENTER_ZOOM' | 'FREE'; tileStyle?: string; geoJsonUrl?: string; 
  onMarkerClick?: (id: string) => void; activeBoundaryId?: string; 
  activeCenterExternal?: string | null; 
  onMapMove?: (center: { lat: number, lng: number }, zoom: number, bounds: L.LatLngBounds) => void;
  enableClustering?: boolean; onMapClick?: () => void;
  landingLevel?: string;
  isNearMeMode?: boolean;
}

function MapEvents({ onMapMove, onMapClick }: any) {
  useMapEvents({
    moveend: (e) => onMapMove && onMapMove({ lat: e.target.getCenter().lat, lng: e.target.getCenter().lng }, e.target.getZoom(), e.target.getBounds()),
    click: () => onMapClick && onMapClick()
  });
  return null;
}

const createInvertedMask = (features: any[]) => {
  const worldBounds: [number, number][] = [[90, -180], [90, 180], [-90, 180], [-90, -180], [90, -180]];
  const holes = features.flatMap((feature) => {
    const geometry = feature.geometry;
    if (!geometry) return [];
    const rings = geometry.type === "Polygon" ? [geometry.coordinates[0]] : geometry.coordinates.map((c: any) => c[0]);
    return rings.map((ring: any) => {
      const coords = ring.map((c: any) => [c[1], c[0]] as [number, number]);
      if (coords.length > 0) {
        const first = coords[0];
        const last = coords[coords.length - 1];
        if (first[0] !== last[0] || first[1] !== last[1]) coords.push([first[0], first[1]]);
      }
      return coords;
    });
  }).filter(h => h.length > 2);
  return [worldBounds, ...holes];
};

const createCustomIcon = (count: number, name: string, isActive: boolean = false) => {
  const pinColor = "#849700"; const labelBgColor = isActive ? "#033B37" : "white"; const labelTextColor = isActive ? "white" : "#033B37"; 
  const html = `<div style="display: flex; flex-direction: column; align-items: center; width: 80px;"><div style="position: relative; width: 38px; height: 46px;"><svg width="38" height="46" viewBox="0 0 38 46" fill="none"><path d="M19 0.5C8.78273 0.5 0.5 8.78273 0.5 19C0.5 30.5 19 45.5 19 45.5C19 45.5 37.5 30.5 37.5 19C37.5 8.78273 29.2173 0.5 19 0.5Z" fill="${pinColor}" stroke="white" stroke-width="1"/><circle cx="19" cy="19" r="14" fill="white"/></svg><div style="position: absolute; top: 6px; left: 0; width: 38px; height: 26px; display: flex; align-items: center; justify-content: center; color: #033B37; font-weight: 700; font-size: 14px;">${count}</div></div><div style="margin-top: 4px; background-color: ${labelBgColor}; border: 1px solid #849700; color: ${labelTextColor}; padding: 2px 8px; border-radius: 4px; font-weight: 700; font-size: 11px; text-transform: uppercase; white-space: nowrap;">${name.substring(0, 20)}</div></div>`.replace(/\s+/g, ' ').trim();
  return L.divIcon({ className: 'custom-pin', html, iconSize: [80, 75], iconAnchor: [40, 46] });
};

function MapController({ marks, modo, initialCenter, initialZoom, setMapInstance, landingLevel }: any) {
  const map = useMap();
  
  useEffect(() => {
    if (!map) return; 
    setMapInstance(map); 
    map.invalidateSize();

    if (modo === 'FREE') return;
    
    // 🌟 LÓGICA PARA NIVEL 07: Centrado estricto en el municipio pero ajustando zoom a las clínicas
    if (landingLevel === '07' && initialCenter) {
      const pts = marks.filter((m: any) => m.lat != null).map((m: any) => [m.lat, m.lng] as [number, number]);
      
      if (pts.length > 0) {
        let maxDeltaLat = 0;
        let maxDeltaLng = 0;

        // Buscamos la clínica más lejana respecto al centroide del municipio
        pts.forEach(([lat, lng]: [number, number]) => {
          const dLat = Math.abs(lat - initialCenter[0]);
          const dLng = Math.abs(lng - initialCenter[1]);
          if (dLat > maxDeltaLat) maxDeltaLat = dLat;
          if (dLng > maxDeltaLng) maxDeltaLng = dLng;
        });

        // Aplicamos un 10% extra de margen para que los iconos no se corten en los bordes
        maxDeltaLat = maxDeltaLat === 0 ? 0.01 : maxDeltaLat * 1.1;
        maxDeltaLng = maxDeltaLng === 0 ? 0.01 : maxDeltaLng * 1.1;

        // Creamos una caja perfecta y simétrica para no perder el eje central
        const symmetricBounds = L.latLngBounds(
          [initialCenter[0] - maxDeltaLat, initialCenter[1] - maxDeltaLng],
          [initialCenter[0] + maxDeltaLat, initialCenter[1] + maxDeltaLng]
        );

        map.flyToBounds(symmetricBounds, { 
          paddingTopLeft: [15, 60], 
          paddingBottomRight: [15, 120], 
          maxZoom: 16, 
          animate: true, 
          duration: 1.5 
        });
      } else {
        // Si no hay clínicas, zoom por defecto
        map.flyTo(initialCenter, initialZoom || 13, { animate: true, duration: 1.5 });
      }

    } else if (modo === 'CENTER_ZOOM' && initialCenter) { 
      map.flyTo(initialCenter, initialZoom || 6, { animate: true, duration: 1.5 });
    } else if (modo === 'FIT_BOUNDS' && marks && marks.length > 0) {
      const pts = marks.filter((m: any) => m.lat != null).map((m: any) => [m.lat, m.lng] as [number, number]);
      if (pts.length > 0) {
        map.flyToBounds(L.latLngBounds(pts), { 
          paddingTopLeft: [15, 60], 
          paddingBottomRight: [15, 120], 
          maxZoom: 16, 
          animate: true, 
          duration: 1.5 
        });
      }
    }
  }, [marks, modo, initialCenter, initialZoom, map, setMapInstance, landingLevel]);
  
  return null;
}

export default function DentalMapClient({ 
  marks = [], initialCenter = [40.41, -3.70], initialZoom = 6, modo = 'CENTER_ZOOM', tileStyle = 'light_all', geoJsonUrl = "/maps/autonomous_regions.geojson", onMarkerClick, activeBoundaryId, activeCenterExternal, onMapMove, enableClustering = false, onMapClick,
  landingLevel,
  isNearMeMode = false
}: MapProps) {
  
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);
  const [activeCenter, setActiveCenter] = useState<string | null>(null);
  const [geoJsonData, setGeoJsonData] = useState<any | null>(null);
  const router = useRouter();

  const cleanId = String(activeBoundaryId).replace(/\D/g, '');
  const isNational = !activeBoundaryId && geoJsonUrl?.includes('autonomous_regions');
  const isCCAA = String(activeBoundaryId).startsWith('CA-');
  const isProvince = cleanId.length === 2;

  const isMudo = isNational || isCCAA || isProvince;
  const stylePath = isMudo ? "voyager_nolabels" : "voyager";
  const tileUrl = `https://{s}.basemaps.cartocdn.com/rastertiles/${stylePath}/{z}/{x}/{y}{r}.png`;

  useEffect(() => {
    if (!geoJsonUrl) return;
    fetch(geoJsonUrl).then(res => res.json()).then(data => {
      if (data.type === "Topology") {
        const key = Object.keys(data.objects)[0];
        setGeoJsonData(topojson.feature(data, data.objects[key] as any));
      } else { setGeoJsonData(data); }
    });
  }, [geoJsonUrl]);

  useEffect(() => {
    if (activeCenterExternal && mapInstance) {
      const target = marks.find(m => m.name === activeCenterExternal);
      if (target && target.lat != null) {
        setActiveCenter(target.name); const z = 18; const p = mapInstance.project([target.lat, target.lng], z);
        p.y += (mapInstance.getSize().y / 3); mapInstance.flyTo(mapInstance.unproject(p, z), z, { animate: true, duration: 0.8 });
      }
    } else if (activeCenterExternal === null) { setActiveCenter(null); }
  }, [activeCenterExternal, mapInstance, marks]);

  const activeFeatures = useMemo(() => {
    if (!activeBoundaryId || !geoJsonData?.features) return [];
    const prefixes = marks.map(m => m.codigo_ine ? String(m.codigo_ine).replace(/\D/g, '').substring(0, 2) : null).filter(Boolean);

    return geoJsonData.features.filter((f: any) => {
      const fid = String(f.properties?.cod_prov || f.id || f.properties?.id || "");
      if (isCCAA) return prefixes.includes(fid.substring(0, 2));
      return cleanId.length <= 2 ? fid.startsWith(cleanId) : fid === cleanId;
    });
  }, [activeBoundaryId, geoJsonData, marks, isCCAA, cleanId]);

  const isLevel07 = landingLevel === '07';
  const shouldDrawMask = activeFeatures.length > 0 && !isLevel07 && !isNearMeMode;

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MapContainer center={initialCenter} zoom={initialZoom} style={{ height: "100%", width: "100%" }} zoomControl={false}>
        <MapEvents onMapMove={onMapMove} onMapClick={onMapClick} />
        
        <MapController marks={marks} modo={modo} initialCenter={initialCenter} initialZoom={initialZoom} setMapInstance={setMapInstance} landingLevel={landingLevel} />
        
        <ZoomControl position="topright" />
        <TileLayer url={tileUrl} attribution='&copy; CARTO' />
        
        {shouldDrawMask && (
          <Polygon 
            key={`mask-${activeBoundaryId}-${activeFeatures.length}`} 
            positions={createInvertedMask(activeFeatures)}
            pathOptions={{ fillColor: 'white', fillOpacity: 0.85, stroke: false, interactive: false, fillRule: 'evenodd' }}
          />
        )}
        
        {activeFeatures.length > 0 && (
          <GeoJSON 
            key={`borders-${activeBoundaryId}-lvl${landingLevel}`}
            data={{ type: "FeatureCollection", features: activeFeatures } as any}
            style={{ 
              color: isLevel07 ? '#849700' : '#033B37', // Verde DKV si es Nivel 07, si no azul oscuro DKV
              weight: isLevel07 ? 2 : 1.2, 
              opacity: isLevel07 ? 0.9 : 0.3, 
              fillColor: isLevel07 ? '#849700' : 'transparent', // Relleno verde DKV claro
              fillOpacity: isLevel07 ? 0.15 : 0, // 15% de transparencia en Nivel 07
              className: 'pointer-events-none' 
            }}
          />
        )}

        {!activeBoundaryId && geoJsonData && (
          <GeoJSON 
            key={`national-${geoJsonUrl}`}
            data={geoJsonData} 
            style={{ color: '#033B37', weight: 1, opacity: 0.3, fillColor: 'transparent' }}
          />
        )}

        {marks.filter(m => m.lat != null).map((m, idx) => (
          <Marker key={`m-${idx}-${m.name === activeCenter}`} position={[m.lat, m.lng]} icon={createCustomIcon(m.count, m.name, m.name === activeCenter)}
            eventHandlers={{ click: () => {
              if (m.tipo === 'centro') { setActiveCenter(m.name); onMarkerClick && onMarkerClick(m.name); }
              else { router.push(`/dentistas/${m.slug}`, {scroll: false}); }
            }}} />
        ))}
      </MapContainer>
    </div>
  );
}