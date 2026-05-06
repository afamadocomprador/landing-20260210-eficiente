// components/SeoBatchProcessor.tsx

"use client";

import { useState } from "react";
import { Play, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export default function SeoBatchProcessor() {
  const [batchSize, setBatchSize] = useState<number>(10);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<{ type: "idle" | "success" | "error"; message: string }>({
    type: "idle",
    message: "",
  });

  const handleProcess = async () => {
    setIsLoading(true);
    setStatus({ type: "idle", message: "Iniciando procesamiento..." });

    try {
      const response = await fetch("/api/procesar-seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ batchSize }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Error en el servidor");

      setStatus({
        type: "success",
        message: `¡Completado! Se han procesado y actualizado ${data.procesados} registros correctamente.`,
      });
    } catch (error: any) {
      setStatus({
        type: "error",
        message: error.message || "Ocurrió un error inesperado al procesar el lote.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Motor de Enriquecimiento SEO</h2>
        <p className="text-sm text-gray-500 mt-1">
          Genera textos contextuales e ideas de ilustración para municipios sin contenido.
        </p>
      </div>

      <div className="flex items-end gap-4 mb-6">
        <div className="flex-1">
          <label htmlFor="batchSize" className="block text-sm font-medium text-gray-700 mb-1">
            Registros a procesar (Batch)
          </label>
          <input
            type="number"
            id="batchSize"
            min="1"
            max="50"
            value={batchSize}
            onChange={(e) => setBatchSize(Number(e.target.value))}
            disabled={isLoading}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
          />
        </div>
        <button
          onClick={handleProcess}
          disabled={isLoading || batchSize < 1}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5" />}
          {isLoading ? "Procesando..." : "Ejecutar Lote"}
        </button>
      </div>

      {status.type !== "idle" && (
        <div
          className={`p-4 rounded-lg flex items-start gap-3 ${
            status.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
          }`}
        >
          {status.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
          )}
          <p className="text-sm">{status.message}</p>
        </div>
      )}
    </div>
  );
}