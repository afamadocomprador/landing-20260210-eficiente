// components/dentists/ClinicList.tsx
"use client";

import { Clinic } from "@/types/database";
import ClinicCard from "./ClinicCard";

interface ClinicListProps {
  clinics: Clinic[];
  onSelectClinic: (clinicId: string) => void;
}

export default function ClinicList({ clinics, onSelectClinic }: ClinicListProps) {
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
    <div 
      className="flex flex-col gap-6 px-4 md:px-8 pb-10"
      aria-label="Resultados de clínicas dentales"
    >
      {/* 3. Limitación de renderizado inicial (Opcional pero recomendado para móviles) */}
      {clinics.map((clinic) => (
        <ClinicCard 
          key={clinic.clinic_id} 
          clinic={clinic} 
          onSelectClinic={onSelectClinic} 
        />
      ))}
    </div>
  );
}