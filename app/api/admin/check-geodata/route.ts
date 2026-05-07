// app/api/admin/check-geodata/route.ts

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import * as turf from '@turf/turf';
import * as topojson from "topojson-client";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! 
);

const GOOGLE_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const MARGEN_TOLERANCIA_KM = 0.5;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get('limit')) || 50;
    const offset = Number(searchParams.get('offset')) || 0;

    // 1. Obtener clínicas (Añadimos zip_code y address)
    const { data: clinics, error: clinicsError } = await supabase
      .from('view_clinics')
      .select('clinic_id, name, latitude, longitude, city, ine_city_code, address, zip_code')
      .range(offset, offset + limit - 1);

    if (clinicsError) throw clinicsError;

    // 2. Cargar el GeoJSON (Para la validación de GPS)
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
    const host = process.env.VERCEL_URL || 'localhost:3000';
    const geoResponse = await fetch(`${protocol}://${host}/maps/municipalities.json`, { cache: 'no-store' });
    
    if (!geoResponse.ok) throw new Error(`Error mapa: ${geoResponse.statusText}`);
    
    const mapData = await geoResponse.json();
    let features: any[] = [];

    if (mapData.type === "Topology") {
      const key = Object.keys(mapData.objects)[0];
      const geojson: any = topojson.feature(mapData, mapData.objects[key] as any);
      features = geojson.features;
    } else if (mapData.features) {
      features = mapData.features;
    }

    const report = [];

    // Función auxiliar para normalizar textos (evitar falsos positivos por tildes/mayúsculas)
    const normalize = (str: string) => str?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim() || "";

    // 3. Procesar clínicas una a una con el DOBLE CHECK
    for (const clinic of clinics) {
      let geoStatus = "OK";
      let geoDetectedName = "Coincide";
      
      let addressStatus = "OK";
      let addressDetectedName = "Coincide";
      let googleFullAddress = "";

      const dbCityNorm = normalize(clinic.city);
      const dbIne = String(clinic.ine_city_code || '').padStart(5, '0');

      // --- TEST 1: VALIDACIÓN GEOGRÁFICA (GPS vs Polígono) ---
      const latClean = String(clinic.latitude || '').replace(',', '.').trim();
      const lngClean = String(clinic.longitude || '').replace(',', '.').trim();
      const lat = Number(latClean);
      const lng = Number(lngClean);

      if (!isNaN(lat) && !isNaN(lng)) {
        const pt = turf.point([lng, lat]);
        let strictMuni = null;

        for (const feature of features) {
          try {
            if (turf.booleanPointInPolygon(pt, feature)) {
              strictMuni = {
                name: feature.properties?.name || feature.properties?.NMUN || feature.properties?.municipio || "Desconocido",
                ine: String(feature.id || feature.properties?.id || feature.properties?.cod_ine || feature.properties?.COD_INE).padStart(5, '0')
              };
              break;
            }
          } catch (e) { continue; }
        }

        if (strictMuni && strictMuni.ine !== dbIne) {
          // Chequeo de tolerancia (500m)
          let withinTolerance = false;
          const expectedFeature = features.find(f => String(f.id || f.properties?.id || f.properties?.cod_ine || f.properties?.COD_INE).padStart(5, '0') === dbIne);
          
          if (expectedFeature) {
            const bufferedPoint = turf.buffer(pt, MARGEN_TOLERANCIA_KM, { units: 'kilometers' });
            if (turf.booleanIntersects(bufferedPoint, expectedFeature)) withinTolerance = true;
          }

          if (!withinTolerance) {
            geoStatus = "ERROR";
            geoDetectedName = strictMuni.name;
          }
        } else if (!strictMuni) {
          geoStatus = "FUERA_DE_MAPA";
          geoDetectedName = "N/A";
        }
      } else {
        geoStatus = "COORDENADAS_INVALIDAS";
        geoDetectedName = "N/A";
      }

      // --- TEST 2: VALIDACIÓN POSTAL (Dirección vs Google Geocoding) ---
      if (GOOGLE_API_KEY) {
        // Usamos zip_code en lugar de postal_code
        const fullAddress = `${clinic.address || ''}, ${clinic.zip_code || ''} ${clinic.city || ''}, España`.trim();
        
        if (fullAddress.length > 10) {
          const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(fullAddress)}&key=${GOOGLE_API_KEY}`;
          const res = await fetch(url);
          const data = await res.json();

          if (data.status === 'OK' && data.results.length > 0) {
            googleFullAddress = data.results[0].formatted_address;
            const addressComponents = data.results[0].address_components;
            const localityObj = addressComponents.find((c: any) => c.types.includes('locality') || c.types.includes('administrative_area_level_4'));
            
            const googleCity = localityObj ? localityObj.long_name : null;
            const googleCityNorm = normalize(googleCity);

            if (googleCityNorm && dbCityNorm !== googleCityNorm && !googleCityNorm.includes(dbCityNorm) && !dbCityNorm.includes(googleCityNorm)) {
              addressStatus = "ERROR";
              addressDetectedName = googleCity || "Desconocido";
            }
          } else {
            addressStatus = "NO_RECONOCIDA";
            addressDetectedName = "Google no encuentra la dirección";
          }
        } else {
          addressStatus = "DIRECCION_INCOMPLETA";
          addressDetectedName = "Faltan datos de calle/cp";
        }
      } else {
        addressStatus = "API_KEY_FALTANTE";
        addressDetectedName = "Sin clave de Google";
      }

      // 4. Agregamos al reporte SOLO si hay algún tipo de error
      if (geoStatus !== "OK" || addressStatus !== "OK") {
        report.push({
          clinic_id: clinic.clinic_id,
          clinica: clinic.name,
          db_muni: clinic.city,
          db_ine: dbIne,
          direccion_db: `${clinic.address}, ${clinic.zip_code}`,
          geoStatus,
          geoDetectedName,
          addressStatus,
          addressDetectedName,
          googleFullAddress,
          google_maps_link: `https://www.google.com/maps/search/?api=1&query=$${lat},${lng}`
        });
      }
    }

    // 5. Renderizado HTML
    const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Auditoría 360º - Clínicas</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');
            body { font-family: 'Inter', sans-serif; background-color: #f8fafc; }
        </style>
    </head>
    <body class="p-8">
        <div class="max-w-screen-2xl mx-auto">
            <div class="flex justify-between items-end mb-8">
                <div>
                    <h1 class="text-3xl font-extrabold text-gray-900 mb-2">Auditoría 360º de Geodatos</h1>
                    <p class="text-gray-600">Revisando Lote de Clínicas <strong>${offset} a ${offset + limit}</strong>.</p>
                    <p class="text-sm font-semibold text-green-600 mt-1">✓ Test GPS (Turf) + ✓ Test Postal (Google Geocoding)</p>
                </div>
                <div class="flex gap-4">
                    <a href="?limit=${limit}&offset=${Math.max(0, offset - limit)}" class="px-5 py-2.5 bg-white font-semibold border rounded-lg shadow-sm hover:bg-gray-50 transition-colors">← Lote Anterior</a>
                    <a href="?limit=${limit}&offset=${offset + limit}" class="px-5 py-2.5 bg-blue-600 text-white font-semibold border border-blue-700 rounded-lg shadow-sm hover:bg-blue-700 transition-colors">Siguiente Lote →</a>
                </div>
            </div>

            <div class="bg-white border rounded-2xl shadow-sm overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse min-w-[1200px]">
                        <thead>
                            <tr class="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500">
                                <th class="p-4 font-semibold w-64">Clínica (ID)</th>
                                <th class="p-4 font-semibold bg-gray-100 border-x w-48 text-center">Datos Oficiales DB</th>
                                <th class="p-4 font-semibold bg-blue-50 text-blue-800 border-r w-64">1. Test GPS (Coordenadas)</th>
                                <th class="p-4 font-semibold bg-purple-50 text-purple-800 border-r w-64">2. Test Postal (Dirección)</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100 text-sm">
                            ${report.map(d => `
                            <tr class="hover:bg-gray-50 transition-colors">
                                <td class="p-4">
                                    <span class="block font-bold text-gray-900">${d.clinica}</span>
                                    <span class="font-mono text-gray-400 text-xs mt-1 block">ID: ${d.clinic_id}</span>
                                </td>
                                
                                <td class="p-4 border-x bg-gray-50/50 text-center">
                                    <span class="block font-bold text-gray-700">${d.db_muni}</span>
                                    <span class="text-xs text-gray-500 mt-1 block">${d.direccion_db}</span>
                                </td>
                                
                                <td class="p-4 border-r ${d.geoStatus === 'OK' ? 'bg-green-50/30' : 'bg-red-50/50'}">
                                    ${d.geoStatus === 'OK' 
                                        ? `<span class="text-green-600 font-semibold text-xs flex items-center gap-1">✓ Coordenadas Correctas</span>`
                                        : `
                                        <span class="inline-block px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded mb-2">${d.geoStatus}</span>
                                        <span class="block text-gray-900 font-medium">Cae en: <strong>${d.geoDetectedName}</strong></span>
                                        <a href="${d.google_maps_link}" target="_blank" class="text-xs text-blue-600 hover:underline mt-2 inline-block">Ver Pin GPS ↗</a>
                                        `
                                    }
                                </td>

                                <td class="p-4 border-r ${d.addressStatus === 'OK' ? 'bg-green-50/30' : 'bg-orange-50/50'}">
                                    ${d.addressStatus === 'OK' 
                                        ? `<span class="text-green-600 font-semibold text-xs flex items-center gap-1">✓ Dirección Correcta</span>`
                                        : `
                                        <span class="inline-block px-2 py-1 bg-orange-100 text-orange-800 text-xs font-bold rounded mb-2">${d.addressStatus}</span>
                                        <span class="block text-gray-900 font-medium">Google lee: <strong>${d.addressDetectedName}</strong></span>
                                        <span class="block text-xs text-gray-500 mt-1 truncate" title="${d.googleFullAddress}">${d.googleFullAddress}</span>
                                        `
                                    }
                                </td>
                            </tr>
                            `).join('')}

                            ${report.length === 0 ? `
                                <tr>
                                    <td colspan="4" class="p-12 text-center text-gray-500">
                                        <svg class="w-12 h-12 mx-auto text-green-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        <p class="text-lg font-semibold text-gray-900">Lote Perfecto</p>
                                        <p>Todas las clínicas de este lote tienen coordenadas y direcciones coherentes con su municipio.</p>
                                    </td>
                                </tr>
                            ` : ''}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </body>
    </html>
    `;

    return new NextResponse(html, { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' }});

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
