// components/dentists/ClinicList.tsx

// components/dentists/ClinicList.tsx

"use client";

import { useEffect } from "react";
import { Clinic } from "@/types/database";
import ClinicCard from "./ClinicCard";

interface ClinicListProps {
  clinics: Clinic[];
  onSelectClinic: (clinicId: string) => void;
  selectedClinicId?: string | null;
}

export default function ClinicList({ clinics, onSelectClinic, selectedClinicId }: ClinicListProps) {

  // 🌟 EFECTO DE SCROLL AISLADO (Matemático)
  useEffect(() => {
    if (selectedClinicId) {
      // Damos 550ms para que la animación CSS del cajón termine de subir
      const timer = setTimeout(() => {
        const element = document.getElementById(`clinic-${selectedClinicId}`);
        const container = document.getElementById('scroll-clinicas');
        
        if (element && container) {
          // Tomamos las coordenadas de la tarjeta y del contenedor
          const elementRect = element.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          
          // Calculamos los píxeles exactos:
          // Scroll actual + (Diferencia de alturas) - 20px de margen visual para que respire por arriba
          const targetScrollPos = container.scrollTop + (elementRect.top - containerRect.top) - 20;
          
          // Obligamos SOLO al contenedor interno a hacer scroll. La página no se moverá.
          container.scrollTo({
            top: targetScrollPos,
            behavior: 'smooth'
          });
        }
      }, 550);

      return () => clearTimeout(timer);
    }
  }, [selectedClinicId]);

  // Manejo de estados vacíos (Mejorado para Accesibilidad)
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
    <div className="flex flex-col gap-6 px-4 md:px-8 pb-10" aria-label="Resultados de clínicas dentales">
      {clinics.map((clinic) => (
        // El ID clave que usa el efecto de arriba para encontrar la tarjeta
        <div key={clinic.clinic_id} id={`clinic-${clinic.clinic_id}`}>
          <ClinicCard 
            clinic={clinic} 
            onSelectClinic={onSelectClinic}
            isSelected={selectedClinicId === clinic.clinic_id}
          />
        </div>
      ))}
    </div>
  );
}