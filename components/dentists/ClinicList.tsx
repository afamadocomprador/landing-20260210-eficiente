// components/dentists/ClinicList.tsx
"use client";

import { useEffect } from "react";
import { Clinic } from "@/types/database";
import ClinicCard from "./ClinicCard";

interface ClinicListProps {
  clinics: Clinic[];
  onSelectClinic: (clinicId: string) => void;
  // 1. NUEVA PROP: Recibimos el ID de la clínica seleccionada desde el contenedor
  selectedClinicId?: string | null;
}

// Se añade 
//export default function ClinicList({ clinics, onSelectClinic }: ClinicListProps) {
export default function ClinicList({ clinics, onSelectClinic, selectedClinicId }: ClinicListProps) {

  // 2. NUEVO EFECTO: Interceptamos el ID seleccionado y hacemos el scroll
  useEffect(() => {
    if (selectedClinicId) {
      // Damos 550ms para que la animación CSS del panel termine de subir y las medidas sean reales
      const timer = setTimeout(() => {
        const element = document.getElementById(`clinic-${selectedClinicId}`);
        const container = document.getElementById('scroll-clinicas');
        
        if (element && container) {
          // 1. Tomamos las coordenadas exactas de la tarjeta y de la lista en la pantalla
          const elementRect = element.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          
          // 2. Calculamos cuántos píxeles hay que mover la barra:
          // Posición de scroll actual + (Diferencia de altura entre la tarjeta y el techo de la lista) - 20px de margen visual
          const targetScrollPos = container.scrollTop + (elementRect.top - containerRect.top) - 20;
          
          // 3. Ordenamos EXCLUSIVAMENTE a la lista que mueva su scroll interno
          container.scrollTo({
            top: targetScrollPos,
            behavior: 'smooth'
          });
        }
      }, 550);

      return () => clearTimeout(timer);
    }
  }, [selectedClinicId]);


  // 1. Manejo de estados vacíos (Mejorado para Accesibilidad)
  if (!clinics || clinics.length === 0) {
    return (
      <div 
        className="flex flex-col items-center justify-center py-16 px-6 text-center text-gray-500 font-fsme text-base"
        role="status"
      >
        <p>No se han encontrado centros en esta zona.</p>
      </div>
    );
  }

  return (
    // 2. Uso de 'aria-label' para que Lighthouse sepa qué es esta lista
    <div className="flex flex-col gap-6 px-4 md:px-8 pb-10" aria-label="Resultados de clínicas dentales">
      {clinics.map((clinic) => (
        <ClinicCard 
          key={clinic.clinic_id} 
          clinic={clinic} 
          onSelectClinic={onSelectClinic}
          isSelected={selectedClinicId === clinic.clinic_id}
        />
      ))}
    </div>  );
}