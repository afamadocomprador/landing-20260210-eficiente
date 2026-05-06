// app/admin/seo/SeoBatchProcessor.tsx


'use client';

import { useState } from 'react';

export default function SeoBatchProcessor() {
  // 1. Añadimos '' al tipado para permitir que el input se quede vacío al borrar
  const [batchSize, setBatchSize] = useState<number | ''>(10);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [resultMessage, setResultMessage] = useState<string | null>(null);

  const handleProcess = async () => {
    setIsProcessing(true);
    setResultMessage(null);

    // Por seguridad, si el usuario le da a lanzar con el input vacío, enviamos 1 por defecto
    const finalBatchSize = batchSize === '' ? 1 : batchSize;

    try {
      const res = await fetch('/api/procesar-seo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ batchSize: finalBatchSize }),
      });

      const data = await res.json();

      if (data.success) {
        setResultMessage(`✅ ¡Éxito! Se han procesado ${data.procesados} localizaciones.`);
      } else {
        setResultMessage(`❌ Error: ${data.error || 'Algo falló en el servidor.'}`);
      }
    } catch (error) {
      setResultMessage('❌ Error de red al intentar contactar con la API.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h2 className="text-xl font-semibold text-slate-800 mb-2">Inyección de Contenido SEO</h2>
      <p className="text-slate-500 mb-4 text-sm">
        Lanza el proceso iterativo que inyecta textos enriquecidos en las landings de los municipios.
      </p>

      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <label htmlFor="batchSize" className="text-xs font-medium text-slate-600 mb-1">
            Nº de filas a procesar
          </label>
          <input
            id="batchSize"
            type="number"
            min="1"
            max="999" // 2. Actualizamos el máximo en el HTML
            value={batchSize}
            onChange={(e) => {
              const val = e.target.value;
              
              // Si el usuario borra todo, seteamos el string vacío (evita el 0 inicial)
              if (val === '') {
                setBatchSize('');
                return;
              }

              // Usamos parseInt en base 10 para limpiar ceros a la izquierda automáticamente
              const num = parseInt(val, 10);
              
              if (!isNaN(num)) {
                // 3. Imponemos el límite máximo de 999 bloqueando lo que escriba de más
                setBatchSize(num > 999 ? 999 : num);
              }
            }}
            disabled={isProcessing}
            className="border border-slate-300 rounded px-3 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100 disabled:text-slate-400"
          />
        </div>

        <div className="flex items-end mt-5">
          <button
            onClick={handleProcess}
            disabled={isProcessing}
            className={`flex items-center justify-center gap-2 px-6 py-2 rounded font-medium text-white transition-colors
              ${isProcessing 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
              }`}
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Procesando...
              </>
            ) : (
              'Lanzar Proceso'
            )}
          </button>
        </div>
      </div>

      {resultMessage && (
        <div className={`mt-4 p-3 rounded text-sm ${resultMessage.includes('✅') ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
          {resultMessage}
        </div>
      )}
    </div>
  );
}