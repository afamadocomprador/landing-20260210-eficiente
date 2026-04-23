// app/api/seo/ai-audit/route.ts

import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Inicializamos la API de Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const { url, text } = await req.json();

    if (!text || text.trim() === '') {
      return NextResponse.json({ 
        success: false, 
        error: 'No hay texto visible para analizar. La página está vacía.' 
      }, { status: 400 });
    }

    // Usamos el modelo rápido y económico
    const model = genAI.getGenerativeModel({ model: 'gemini-3-flash-preview' });

    // 🌟 CORRECCIÓN: Hemos eliminado las comillas invertidas triples dentro del prompt
    const prompt = `
      Eres un Consultor SEO Senior experto en el sector médico y dental.
      Analiza el siguiente texto visible extraído de la URL: ${url}
      
      TEXTO EXTRAÍDO:
      "${text}"

      EVALUACIÓN REQUERIDA:
      1. ¿Es "Thin Content" (contenido pobre o insuficiente)?
      2. ¿Es una "Doorway Page" (página puerta local llena de nombres de pueblos sin valor real)?
      3. ¿Tiene señales E-E-A-T (Experiencia, Autoridad, Confianza como nombre del doctor, nº colegiado, tratamientos, horarios)?

      Devuelve ÚNICAMENTE un objeto JSON válido con esta estructura exacta (sin markdown, sin bloques de código ni comillas invertidas):
      {
        "score": 0,
        "isThinContent": true,
        "verdict": "[Un párrafo conciso de 3 líneas con tu diagnóstico técnico y brutalmente honesto]",
        "improvements": [
          "[Mejora accionable 1]",
          "[Mejora accionable 2]"
        ]
      }
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Limpiamos la respuesta por si la IA añade formato Markdown por costumbre
    const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const analysis = JSON.parse(cleanJson);

    return NextResponse.json({ success: true, data: analysis });

  } catch (error: any) {
    console.error('Error en AI Audit:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
