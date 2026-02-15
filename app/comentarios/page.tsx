// app/comentario/page.tsx
// AÑADIDO: Nueva página para gestionar las consultas de forma independiente
import React from 'react';
import dynamic from 'next/dynamic';
import MainHero from '@/components/hero/MainHero'; // Opcional: Para mantener coherencia visual
import FooterLegal from '@/components/FooterLegal';

// AÑADIDO: Importamos el formulario con carga dinámica para optimizar la página
const LeadForm = dynamic(() => import('@/components/LeadForm'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-xl"></div>,
});

export const metadata = {
  title: 'Consultas | DKV Dentisalud',
  description: 'Envíanos tus dudas sobre el seguro dental DKV.',
};

export default function ComentarioPage() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* Sección de cabecera rápida para dar contexto al usuario */}
        <section className="pt-32 pb-12 bg-dkv-green text-white text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-5xl font-lemon mb-4 uppercase">Tu consulta personal</h1>
            <p className="text-lg opacity-90 font-fsme">Déjanos tu duda y un asesor experto te responderá en breve.</p>
          </div>
        </section>

        {/* MODIFICADO/TRASLADADO: El formulario ahora vive aquí solo */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-dkv-gray-border p-8 md:p-12 rounded-3xl shadow-inner relative">
              <div className="absolute -inset-2 bg-dkv-green/5 rounded-[2rem] blur-lg -z-10"></div>
              {/* FINAL EN VERDE: El componente LeadForm con toda su lógica de envío intacta */}
              <LeadForm />
            </div>
            
            <div className="mt-12 text-center text-dkv-gray font-fsme">
              <p>También puedes contactarnos directamente por teléfono si lo prefieres.</p>
              <p className="font-bold text-dkv-green-dark mt-2">+34 976 217 463</p>
            </div>
          </div>
        </section>

        <FooterLegal />
      </main>
    </div>
  );
}
