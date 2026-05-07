// components/map/DentalMapClient.tsx

// components/map/DentalMapClient.tsx

"use client";

import { MapContainer, TileLayer, Marker, useMap, GeoJSON, useMapEvents, Polygon } from "react-leaflet";
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
  marks?: MapMarkerData[]; 
  initialCenter?: [number, number]; 
  initialZoom?: number;
  modo?: 'FIT_BOUNDS' | 'CENTER_ZOOM' | 'FREE' | 'FIT_BOUNDS_STRICT'; 
  geoJsonUrl?: string; 
  onMarkerClick?: (id: string) => void; 
  activeBoundaryId?: string; 
  activeCenterExternal?: string | null;
  onMapMove?: (center: { lat: number, lng: number }, zoom: number, bounds: L.LatLngBounds) => void;
  onMapClick?: () => void;
  landingLevel?: string;
  isNearMeMode?: boolean;
  onExpandGroup?: (groupName: string) => void;
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

const createMunicipalityLabel = (name: string) => {
  const html = `
    <div style="display: flex; flex-direction: column; align-items: center; transform: translateY(-6px);">
      <div style="background-color: #033B37; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 6px rgba(0,0,0,0.4);"></div>
      <div style="margin-top: 6px; color: #033B37; font-family: 'FS Me', sans-serif; font-weight: 900; font-size: 14px; text-transform: uppercase; white-space: nowrap; text-shadow: 2px 2px 0px white, -2px -2px 0px white, 2px -2px 0px white, -2px 2px 0px white; letter-spacing: 0.8px;">
        ${name}
      </div>
    </div>
  `.replace(/\s+/g, ' ').trim();
  return L.divIcon({ className: 'muni-label', html, iconSize: [200, 50], iconAnchor: [100, 6] });
};

function MapController({ marks, modo, initialCenter, initialZoom, setMapInstance }: any) {
  const map = useMap();
  useEffect(() => {
    if (!map) return; 
    setMapInstance(map); 
    map.invalidateSize();
    if (modo === 'FREE') return;
    
    if (modo === 'CENTER_ZOOM' && initialCenter) { 
      map.flyTo(initialCenter, initialZoom || 6, { animate: true, duration: 1.5 });
    } else if (modo === 'FIT_BOUNDS' || modo === 'FIT_BOUNDS_STRICT') {
      let targetMarks = marks || [];
      if (modo === 'FIT_BOUNDS_STRICT') { targetMarks = targetMarks.filter((m: any) => m.tipo === 'centro'); }
      const pts = targetMarks.filter((m: any) => m.lat != null).map((m: any) => [m.lat, m.lng] as [number, number]);
      if (initialCenter && modo !== 'FIT_BOUNDS_STRICT') { pts.push([initialCenter[0], initialCenter[1]] as [number, number]); }
      if (pts.length > 0) {
        if (pts.length === 1 && modo === 'FIT_BOUNDS_STRICT') { map.flyTo(pts[0], 16, { animate: true, duration: 1.5 }); }
        else { map.flyToBounds(L.latLngBounds(pts), { padding: [40, 40], maxZoom: 16, animate: true, duration: 1.5 }); }
      }
    }
  }, [marks, modo, initialCenter, initialZoom, map, setMapInstance]);
  return null;
}

export default function DentalMapClient({ 
  marks = [], initialCenter = [40.41, -3.70], initialZoom = 6, modo = 'CENTER_ZOOM', geoJsonUrl = "/maps/autonomous_regions.geojson", onMarkerClick, activeBoundaryId, activeCenterExternal, onMapMove, onMapClick,
  landingLevel, isNearMeMode = false, onExpandGroup
}: MapProps) {
  
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);
  const [activeCenter, setActiveCenter] = useState<string | null>(null);
  const [geoJsonData, setGeoJsonData] = useState<any | null>(null);
  const router = useRouter();

  // 🌟 LÓGICA RESTAURADA: ¿Debe ser mudo el mapa?
  const isMudo = ['00', '01', '02', '03'].includes(String(landingLevel));
  const stylePath = isMudo ? "voyager_nolabels" : "voyager";
  const tileUrl = `https://{s}.basemaps.cartocdn.com/rastertiles/${stylePath}/{z}/{x}/{y}{r}.png`;

  useEffect(() => {
    if (activeCenterExternal && mapInstance) {
      const target = marks.find(m => m.name === activeCenterExternal);
      if (target && target.lat != null) {
        setActiveCenter(target.name); 
        const z = 18; 
        const p = mapInstance.project([target.lat, target.lng], z);
        p.y += (mapInstance.getSize().y / 3); 
        mapInstance.flyTo(mapInstance.unproject(p, z), z, { animate: true, duration: 0.8 });
      }
    } else if (activeCenterExternal === null) { setActiveCenter(null); }
  }, [activeCenterExternal, mapInstance, marks]);

  useEffect(() => {
    if (!geoJsonUrl) return;
    fetch(geoJsonUrl).then(res => res.json()).then(data => {
      if (data.type === "Topology") {
        const key = Object.keys(data.objects)[0];
        setGeoJsonData(topojson.feature(data, data.objects[key] as any));
      } else { setGeoJsonData(data); }
    });
  }, [geoJsonUrl]);

  const activeFeatures = useMemo(() => {
    if (!activeBoundaryId || !geoJsonData?.features) return [];
    
    const isCCAA = landingLevel === '02' || String(activeBoundaryId).startsWith('CA-');
    const cleanId = String(activeBoundaryId).replace(/CA-/g, '').replace(/\D/g, '');

    if (isCCAA) {
      const prefixes = marks
        .map(m => m.codigo_ine ? String(m.codigo_ine).replace(/CA-/g, '').replace(/\D/g, '').substring(0, 2) : null)
        .filter(Boolean);
        
      if (prefixes.length > 0) {
        return geoJsonData.features.filter((f: any) => {
          const fid = String(f.properties?.cod_prov || f.properties?.cpro || f.id || f.properties?.id || "");
          return prefixes.includes(fid.substring(0, 2));
        });
      }
    }

    return geoJsonData.features.filter((f: any) => {
      const fid = String(f.properties?.cod_prov || f.properties?.cpro || f.id || f.properties?.id || "");
      return cleanId.length <= 2 ? fid.startsWith(cleanId) : fid === cleanId;
    });
  }, [activeBoundaryId, geoJsonData, marks, landingLevel]);

  const isLevel07 = landingLevel === '07';

  const muniLabelConfig = useMemo(() => {
    if (isLevel07 && activeFeatures.length > 0 && initialCenter) {
      const feature = activeFeatures[0];
      const name = feature.properties?.name || feature.properties?.NMUN || "Municipio";
      return { position: initialCenter, name: name };
    }
    return null;
  }, [isLevel07, activeFeatures, initialCenter]);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MapContainer center={initialCenter} zoom={initialZoom} style={{ height: "100%", width: "100%" }} zoomControl={false} scrollWheelZoom={true}>
        <MapEvents onMapMove={onMapMove} onMapClick={onMapClick} />
        <MapController marks={marks} modo={modo} initialCenter={initialCenter} initialZoom={initialZoom} setMapInstance={setMapInstance} />
        
        {/* 🌟 AQUÍ APLICAMOS LA URL DINÁMICA DEL ESTILO */}
        <TileLayer url={tileUrl} attribution='&copy; CARTO' />
        
        {activeFeatures.length > 0 && !isNearMeMode && !isLevel07 && (
          <Polygon positions={createInvertedMask(activeFeatures)} pathOptions={{ fillColor: 'white', fillOpacity: 0.85, stroke: false, interactive: false }} />
        )}
        
        {activeFeatures.length > 0 && (
          <GeoJSON 
            key={`borders-${activeBoundaryId}`}
            data={{ type: "FeatureCollection", features: activeFeatures } as any}
            style={{ 
              color: isLevel07 ? '#849700' : '#033B37', 
              weight: isLevel07 ? 3 : 2, 
              opacity: 0.9, 
              fillColor: isLevel07 ? '#849700' : 'transparent', 
              fillOpacity: isLevel07 ? 0.1 : 0 
            }}
          />
        )}

        {muniLabelConfig && (
          <Marker 
            position={muniLabelConfig.position} 
            icon={createMunicipalityLabel(muniLabelConfig.name)}
            zIndexOffset={-500} 
            interactive={false}
          />
        )}

        {marks.filter(m => m.lat != null).map((m, idx) => (
          <Marker 
            key={`m-${idx}-${m.name === activeCenter}`} 
            position={[m.lat, m.lng]} 
            icon={createCustomIcon(m.count, m.name, m.name === activeCenter)}
            eventHandlers={{ 
              click: () => {
                if (m.tipo === 'centro') { 
                  setActiveCenter(m.name); 
                  onMarkerClick && onMarkerClick(m.name); 
                }
                else if (isLevel07 && m.tipo === 'municipio') { 
                  onExpandGroup && onExpandGroup(m.name); 
                }
                else { 
                  router.push(`/dentistas/${m.slug}`, { scroll: false }); 
                }
              }
            }} 
          />
        ))}
      </MapContainer>
    </div>
  );
}