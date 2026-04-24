// components\map\DentalMapClient.tsx

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
  modo?: 'FIT_BOUNDS' | 'CENTER_ZOOM'; tileStyle?: string; geoJsonUrl?: string; 
  onMarkerClick?: (id: string) => void; activeBoundaryId?: string; 
  activeCenterExternal?: string | null; 
  onMapMove?: (center: { lat: number, lng: number }, zoom: number, bounds: L.LatLngBounds) => void;
  enableClustering?: boolean; onMapClick?: () => void;
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
  const displayName = name.length > 25 ? name.substring(0, 22) + "..." : name;
  const pinColor = "#849700"; const labelBgColor = isActive ? "#033B37" : "white"; const labelTextColor = isActive ? "white" : "#033B37"; 
  const scale = isActive ? "transform: scale(1.15) translateY(-5px);" : "";
  const html = `<div style="display: flex; flex-direction: column; align-items: center; width: 80px; cursor: pointer; ${scale}"><div style="position: relative; width: 38px; height: 46px;"><svg width="38" height="46" viewBox="0 0 38 46" fill="none"><path d="M19 0.5C8.78273 0.5 0.5 8.78273 0.5 19C0.5 30.5 19 45.5 19 45.5C19 45.5 37.5 30.5 37.5 19C37.5 8.78273 29.2173 0.5 19 0.5Z" fill="${pinColor}" stroke="white" stroke-width="1"/><circle cx="19" cy="19" r="14" fill="white"/></svg><div style="position: absolute; top: 6px; left: 0; width: 38px; height: 26px; display: flex; align-items: center; justify-content: center; color: #033B37; font-weight: 700; font-size: 14px; font-family: sans-serif;">${count}</div></div><div style="margin-top: 4px; background-color: ${labelBgColor}; border: 1px solid #849700; color: ${labelTextColor}; padding: 2px 8px; border-radius: 4px; font-weight: 700; font-size: 11px; text-transform: uppercase; white-space: nowrap; line-height: 1.1;">${displayName}</div></div>`.replace(/\s+/g, ' ').trim();
  return L.divIcon({ className: 'custom-pin', html, iconSize: [80, 75], iconAnchor: [40, 46] });
};

const createClusterCustomIcon = (cluster: any) => {
  const count = cluster.getChildCount(); const size = count > 50 ? 55 : 40; 
  const html = `<div style="background-color: #033B37; color: white; width: ${size}px; height: ${size}px; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-weight: bold; border: 3px solid #849700;">${count}</div>`;
  return L.divIcon({ html, className: 'custom-marker-cluster', iconSize: L.point(size, size, true) });
};

function MapController({ marks, modo, initialCenter, initialZoom, setMapInstance }: any) {
  const map = useMap();
  useEffect(() => {
    if (!map) return; setMapInstance(map); map.invalidateSize();
    if (modo === 'CENTER_ZOOM' && initialCenter) { map.flyTo(initialCenter, initialZoom || 6, { animate: true, duration: 1.5 });
    } else if (modo === 'FIT_BOUNDS' && marks && marks.length > 0) {
      const pts = marks.filter((m: any) => m.lat != null).map((m: any) => [m.lat, m.lng] as [number, number]);
      if (pts.length > 0) {
        if (marks[0]?.tipo === 'provincia' || pts.length <= 6) { map.flyToBounds(L.latLngBounds(pts), { paddingTopLeft: [15, 60], paddingBottomRight: [15, 120], maxZoom: 12, animate: true, duration: 1.5 });
        } else { const main = marks.reduce((p, c) => ((p.count || 0) > (c.count || 0)) ? p : c); map.flyTo([main.lat, main.lng], 11, { animate: true, duration: 1.5 }); }
      }
    }
  }, [marks, modo, initialCenter, initialZoom, map, setMapInstance]);
  return null;
}

function MapMoveListener({ onMapMove, onMapClick }: any) {
  const map = useMapEvents({
    moveend: () => { if (onMapMove) onMapMove({ lat: map.getCenter().lat, lng: map.getCenter().lng }, map.getZoom(), map.getBounds()); },
    click: () => { if (onMapClick) onMapClick(); },
    dragstart: () => { if (onMapClick) onMapClick(); }
  });
  return null;
}

export default function DentalMapClient({ 
  marks = [], initialCenter = [40.41, -3.70], initialZoom = 6, modo = 'CENTER_ZOOM', tileStyle = 'light_all', geoJsonUrl = "/maps/autonomous_regions.geojson", onMarkerClick, activeBoundaryId, activeCenterExternal, onMapMove, enableClustering = false, onMapClick
}: MapProps) {
  
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);
  const [activeCenter, setActiveCenter] = useState<string | null>(null);
  const [geoJsonData, setGeoJsonData] = useState<any | null>(null);
  const [highlightedRegion, setHighlightedRegion] = useState<string | null>(null);
  const router = useRouter();

  const tileUrl = tileStyle === 'osm' ? `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png` : `https://{s}.basemaps.cartocdn.com/${tileStyle}/{z}/{x}/{y}{r}.png`; 
  
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
    const cleanId = String(activeBoundaryId).replace(/\D/g, '');
    return geoJsonData.features.filter((f: any) => {
      const fid = String(f.properties?.cod_prov || f.id || f.properties?.id || "");
      return cleanId.length <= 2 ? fid.startsWith(cleanId) : fid === cleanId;
    });
  }, [activeBoundaryId, geoJsonData]);

  const renderedMarkers = useMemo(() => {
    if (!mapInstance) return null; 
    return marks.filter(m => m.lat != null).map((m, idx) => {
      const isActive = m.tipo === 'centro' && activeCenter === m.name;
      return (
       <Marker key={`m-${idx}-${isActive}`} position={[m.lat, m.lng]} icon={createCustomIcon(m.count, m.name, isActive)} zIndexOffset={isActive ? 1000 : 0}
        eventHandlers={{ click: () => {
            if (m.tipo === 'centro' && onMarkerClick) {
              setActiveCenter(m.name); onMarkerClick(m.name); const z = 18; const p = mapInstance.project([m.lat, m.lng], z);
              p.y += (mapInstance.getSize().y / 3); mapInstance.flyTo(mapInstance.unproject(p, z), z, { animate: true, duration: 0.8 });
            } else if (m.slug) { setHighlightedRegion(m.codigo_ine || m.name); setTimeout(() => { router.push(`/dentistas/${m.slug}`, {scroll: false}); }, 400); }
        }}} />
      );
    });
  }, [marks, mapInstance, router, onMarkerClick, activeCenter]);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MapContainer center={initialCenter} zoom={initialZoom} style={{ height: "100%", width: "100%" }} zoomControl={false}>
        <MapController marks={marks} modo={modo} initialCenter={initialCenter} initialZoom={initialZoom} setMapInstance={setMapInstance} />
        <MapMoveListener onMapMove={onMapMove} onMapClick={onMapClick} />
        <ZoomControl position="topright" />
        <TileLayer url={tileUrl} attribution='&copy; CARTO' />
        
        {activeFeatures.length > 0 && (
          <>
            <Polygon 
              key={`mask-${activeBoundaryId}-${activeFeatures.length}`} 
              positions={createInvertedMask(activeFeatures)}
              pathOptions={{ fillColor: 'white', fillOpacity: 0.85, stroke: false, interactive: false, fillRule: 'evenodd' }}
            />
            <GeoJSON 
              key={`borders-${activeBoundaryId}-${activeFeatures.length}`}
              data={{ type: "FeatureCollection", features: activeFeatures }}
              style={{ color: '#033B37', weight: 1, opacity: 0.3, fillColor: 'transparent', className: 'pointer-events-none' }}
            />
          </>
        )}

        {!activeBoundaryId && geoJsonData && (
          <GeoJSON key={geoJsonUrl} data={geoJsonData} 
            filter={(f: any) => {
              const id = String(f.properties?.cod_prov || f.id || f.properties?.id);
              const vIds = marks.map(m => m.codigo_ine ? String(m.codigo_ine).replace(/\D/g, '') : null).filter(Boolean);
              if (geoJsonUrl.includes('municipalities')) {
                const prefix = vIds[0]?.substring(0, 2);
                return prefix ? id.startsWith(prefix) : false;
              }
              return vIds.includes(id);
            }}
            style={(f: any) => {
              const id = f.properties?.cod_prov || f.id || f.properties?.id;
              const isH = id === highlightedRegion?.replace(/\D/g, '');
              return { color: isH ? '#e60000' : '#FFFFFF', weight: 1, opacity: isH ? 1 : 0.2, fillColor: isH ? '#e60000' : '#FFFFFF', fillOpacity: isH ? 0.02 : 0.1, className: 'transition-all duration-300' };
            }}
          />
        )}

        {enableClustering ? (
          <MarkerClusterGroup chunkedLoading iconCreateFunction={createClusterCustomIcon} maxClusterRadius={50}>
            {renderedMarkers}
          </MarkerClusterGroup>
        ) : <>{renderedMarkers}</>}
      </MapContainer>
    </div>
  );
}