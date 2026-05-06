// app/api/procesar-seo/route.ts


import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);




const SYSTEM_PROMPT = `You are an expert local SEO copywriter and creative director for a dental health company in Spain. 
Analyze the provided geographic and clinical data for a specific Spanish municipality. You must use your internal knowledge about Spain to add subtle, practical local context (specific roads, familiar districts, or geographic traits). Write directly for residents who already live there: demonstrate local expertise, but STRICTLY AVOID touristy welcomes, generic descriptions, or excessive praise about the town.

CRITICAL RULES FOR DATA HANDLING & FORMATTING:
1. POPULATION: Never output the exact population number. Always round it down to make it sound natural: if in thousands, to the nearest hundred (e.g., 1250 -> "más de 1.200 habitantes"); if in hundreds, to the nearest ten (e.g., 125 -> "más de 120 habitantes").
2. CLINICS AND STAFF: You MUST mention the number of available dental clinics and the specific municipalities where they are located. You MUST NOT, under any circumstances, mention the number of dentists or professionals (ignore any staff_count data). 
3. HTML FORMATTING & STRUCTURE: The output text MUST be formatted using HTML tags. Avoid long, dense blocks of text. You MUST break your content into multiple short, logical paragraphs to make it easy to read on mobile devices. To ensure proper visual spacing and mobile readability, you MUST wrap each paragraph using <p class="text-lg mb-4">. Never use a plain <p> tag.
4. DISTANCES: Never output exact decimal distances (e.g., 7.8 km or 10.2 km). You MUST always use natural, approximate language (e.g., "aproximadamente a 8 kilómetros", "a poco más de diez kilómetros", "a escasos 5 kilómetros", "a menos de media hora").
5. HIGHLIGHTING RULES: 
   - Whenever you mention a municipality, a local road/highway, or a "comarca", you MUST wrap it in a bold tag with the DKV green class like this: <strong class="text-dkv-green">Municipality/Road Name</strong>
   - Whenever you mention a dental clinic, an 'Espacio de Salud', or a dentist's name, you MUST wrap it in standard bold: <strong>Clinic/Dentist Name</strong>
6. TONE & PERSPECTIVE: Maintain an expert, professional, and empathetic tone. You MUST NOT write in the first-person plural from the perspective of a local resident. STRICTLY AVOID using words like "nuestro", "nuestra", or "nosotros" when referring to the municipality or the local lifestyle. You are a nearby healthcare provider, not a neighbor.
7. SERVICES & TREATMENTS: DO NOT list specific dental treatments or specialties (e.g., orthodontics, implants, radiology) as we cannot guarantee their availability at every clinic. Use only generic terms like "servicios dentales", "atención bucodental", or "tratamientos odontológicos".

You MUST return a valid JSON object with EXACTLY these two keys:
1. "seo_text_top": A short, direct intro (approx 40-50 words) formatted as HTML, to place above a map. Acknowledge the municipality and its approximate population (using the rounding rules). Include a brief, practical local touch (e.g., referencing a main traffic artery, a familiar district, or a daily landmark) to show true local knowledge without sounding like a tourist brochure. Focus on being a nearby, accessible healthcare solution for the locals. Split into short paragraphs if logically appropriate using the spaced <p> tags defined in Rule 3. Apply the highlighting rules.
2. "seo_text_bottom": A longer, detailed SEO text formatted as HTML, to place below the map. Follow this exact paragraph structure to maximize mobile user engagement:
   - Paragraph(s) 1-2 (Details): Detail the closest dental clinics, their municipalities, and their approximate distances (using Rule 4). If any of these nearby clinics is a DKV 'Espacio de Salud', you MUST highlight this as a premium advantage; however, if none of them are, DO NOT mention the 'Espacio de Salud' concept at all. Explain the best way to get to these clinics using real local roads or transport.
   - Paragraph 3 (Booking CTA): You MUST create a separate, standalone paragraph strictly for the call to action. Encourage the user to book an appointment and elegantly suggest they contact the clinic to coordinate and confirm their specific treatment needs beforehand to ensure a seamless visit and avoid unnecessary travel.
   - Paragraph 4 (Map CTA): You MUST create another separate, standalone paragraph at the very end inviting them to explore the map to find other clinic alternatives. 
   Ensure every single paragraph uses the spaced <p> tags defined in Rule 3. Apply the highlighting rules throughout.

Output exclusively the raw JSON object. Do not include markdown blocks like \`\`\`json.`;



// 🕒 Función auxiliar para crear tiempos de espera
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function POST(request: Request) {
  console.log("🚀 === INICIANDO BATCH PROCESAR-SEO ===");
  try {
    let batchSize = 10;
    try {
      const body = await request.json();
      if (body.batchSize) batchSize = body.batchSize;
      console.log(`📦 Batch size recibido/asignado: ${batchSize}`);
    } catch (e) {
      console.log("📦 No se recibió body o batchSize, usando default:", batchSize);
    }
    
    const limit = Math.min(Math.max(batchSize, 1), 1000);
    
    console.log(`🔍 Buscando hasta ${limit} municipios de nivel '07' con seo_txt_contextual nulo...`);
    
    const { data: candidatos, error: errCandidatos } = await supabase
      .from('landings_search_dentistry')
      .select('codigo_ine, subcodigo_ine, nombre_ine')
      .eq('nivel', '07') 
      .is('seo_txt_contextual', null)
      .limit(limit);

    if (errCandidatos) {
      console.error("❌ ERROR CRÍTICO al buscar candidatos:", errCandidatos);
      throw errCandidatos;
    }

    if (!candidatos || candidatos.length === 0) {
      console.log("⚠️ ATENCIÓN: No se encontraron candidatos. ¿Están los campos a NULL o a texto vacío (\"\")?");
      return NextResponse.json({ success: true, procesados: 0, message: "No hay municipios pendientes." });
    }

    console.log(`✅ Se encontraron ${candidatos.length} municipios para procesar.`);

    let procesados = 0;
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

    const model = genAI.getGenerativeModel({ 
      //model: "gemini-3-flash-preview", 
      model: "gemini-3.1-flash-lite-preview", 
      //model: "gemma-3-1b", 
      generationConfig: { 
        responseMimeType: "application/json" 
      } 
    });

    for (const muni of candidatos) {
      console.log(`\n----------------------------------------`);
      console.log(`📍 Procesando municipio: ${muni.nombre_ine} (INE: ${muni.codigo_ine})`);
      
      console.log(`📞 Llamando a RPC 'get_contexto_clinicas'...`);
      const { data: contexto, error: errContext } = await supabase.rpc('get_contexto_clinicas', {
        p_codigo_ine: muni.codigo_ine
      });

      if (errContext) {
        console.error(`❌ ERROR en RPC 'get_contexto_clinicas' para ${muni.nombre_ine}:`, errContext.message || errContext);
        continue;
      }
      if (!contexto) {
        console.log(`⚠️ ATENCIÓN: El RPC no devolvió datos para ${muni.nombre_ine}. Saltando...`);
        continue;
      }

      console.log(`✅ Contexto obtenido correctamente. Preparando llamada a Gemini...`);
      const userPrompt = `Generate the JSON payload for this location data:\n${JSON.stringify(contexto)}`;
      
      // ⏳ TIEMPO DE ESPERA ARTIFICIAL ⏳
      // Esperamos 4.5 segundos para no sobrepasar el límite de 15 requests por minuto (1 cada 4s)
      console.log(`⏱️ Esperando 4.5 segundos para respetar el límite de la API gratuita...`);
      await delay(4500);

      let aiData;
      try {
        console.log(`🤖 Ejecutando prompt en Gemini...`);
        const result = await model.generateContent(`${SYSTEM_PROMPT}\n\n${userPrompt}`);
        const responseText = result.response.text();
        aiData = JSON.parse(responseText);
        console.log(`🤖 Gemini respondió correctamente. Keys encontradas:`, Object.keys(aiData));
      } catch (aiError: any) {
        console.error(`❌ ERROR de Gemini/Parseo JSON para ${muni.nombre_ine}:`, aiError.message);
        continue;
      }

      console.log(`💾 Guardando textos en la base de datos...`);
      const { error: errUpdate } = await supabase
        .from('landings_search_dentistry')
        .update({ 
            seo_txt_contextual: aiData.seo_text_top,          
            seo_txt_contextual_bottom: aiData.seo_text_bottom
        })
        .match({ codigo_ine: muni.codigo_ine, subcodigo_ine: muni.subcodigo_ine });

      if (errUpdate) {
        console.error(`❌ ERROR ACTUALIZANDO BD para ${muni.nombre_ine}:`, errUpdate.message || errUpdate);
      } else {
        console.log(`✅ UPDATE exitoso para ${muni.nombre_ine}`);
        procesados++;
      }
    }

    console.log(`\n🎉 === BATCH FINALIZADO. Procesados con éxito: ${procesados} ===`);
    return NextResponse.json({ success: true, procesados });

  } catch (error: any) {
    console.error("🔥 ERROR FATAL en la ruta de procesamiento:", error.message || error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}