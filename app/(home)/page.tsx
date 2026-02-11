import React from 'react';
import Link from 'next/link';   // OPTIMIZACIÓN: Navegación SPA
import Image from 'next/image'; // OPTIMIZACIÓN: Gestión de imágenes/iconos
import type { Metadata } from 'next';

// --- IMPORTACIÓN DE COMPONENTES ---
// Next.js maneja automáticamente si son Server o Client Components según su directiva interna.
import Header from '@/components/layout/Header'; 
import MainHero from '@/components/hero/MainHero'; // Ahora es Server Component (RSC)
import PricingCards from '@/components/PricingCards'; // Probablemente Client Component
import LeadForm from '@/components/LeadForm'; // Client Component (Manejo de estados del form)
import FooterLegal from '@/components/FooterLegal'; // Ahora es Server Component (RSC)
import Archetypes from '@/components/Archetypes'; // Client Component (según tu código previo)
import CookieBanner from '@/components/CookieBanner'; // Client Component (interacción de usuario)

// --- 1. CONFIGURACIÓN SEO (Server Side) ---
// Esto genera las etiquetas <meta> y <title> en el HTML inicial.
export const metadata: Metadata = {
  title: 'DKV Dentisalud Élite | Seguro Dental con Precios Pactados',
  description: 'Contrata tu seguro dental DKV con hasta 40% de descuento. Implantes, ortodoncia y limpiezas gratuitas. Agente exclusivo Bernardo Sobrecasas.',
  alternates: {
    canonical: 'https://midominio.com', // ⚠️ CAMBIAR por tu dominio real en producción
  },
  openGraph: {
    title: 'Ahorra en tu dentista con DKV Dentisalud Élite',
    description: 'Accede al cuadro médico dental de DKV. Precios claros y sin sorpresas.',
    url: 'https://midominio.com',
    siteName: 'DKV Dentisalud Élite',
    locale: 'es_ES',
    type: 'website',
  },
};

// --- 2. DATOS ESTRUCTURADOS (JSON-LD) ---
// Schema.org para negocios locales/seguros.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'InsuranceAgency',
  'name': 'DKV Dentisalud Élite - Bernardo Sobrecasas',
  'description': 'Agencia exclusiva de seguros dentales DKV en Zaragoza.',
  'url': 'https://midominio.com',
  'telephone': '900 000 000', // ⚠️ Poner teléfono real
  'address': {
    '@type': 'PostalAddress',
    'addressLocality': 'Zaragoza',
    'addressCountry': 'ES'
  },
  'priceRange': '$$',
  'image': 'https://midominio.com/images/hero-dkv.png'
};

export default function LandingPage() {
  return (
    // Definimos la estructura base. 'selection' personaliza el color al seleccionar texto.
    <div className="min-h-screen bg-white text-dkv-gray selection:bg-dkv-green selection:text-white">
      
      {/* Inyección de JSON-LD para Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <CookieBanner />
      <Header />
      
      <main>
        {/* HERO SECTION: Renderizado en servidor, carga inmediata (LCP optimizado) */}
        <MainHero /> 

        {/* --- SECCIÓN TRATAMIENTOS --- */}
        <section className="py-20 bg-white border-t border-dkv-gray-border">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-lemon text-dkv-green-dark mb-6">
              Tratamientos.
            </h2>
            <p className="text-xl text-dkv-gray font-fsme max-w-3xl mx-auto mb-10 leading-relaxed text-balance">
              Numerosos servicios dentales gratuitos y resto a precios muy inferiores a mercado.
            </p>
            
            {/* OPTIMIZACIÓN: Usamos Link para navegación interna rápida */}
            <Link 
              href="/tratamientos"
              className="inline-flex items-center justify-center rounded-dkv font-fsme font-bold duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-dkv-green text-white hover:bg-dkv-green-hover focus:ring-dkv-green shadow-xl hover:scale-105 transition-transform text-lg px-8 py-6 h-auto cursor-pointer"
            >
              Ver Tratamientos y Precios
            </Link>
            
            <p className="text-sm font-medium text-dkv-green-dark mt-6">
              Aquí puedes ver los tratamientos y sus precios. <br /> Directamente y sin formularios.
            </p>
          </div>
        </section>

        {/* --- SECCIÓN DENTISTAS --- */}
        <section className="py-20 bg-white border-t border-dkv-gray-border">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-lemon text-dkv-green-dark mb-6">
              Dentistas.
            </h2>
            <p className="text-xl text-dkv-gray font-fsme max-w-3xl mx-auto mb-10 leading-relaxed text-balance">
              Tan fácil como elegir tu dentista y pedir cita en su consulta.
              Seguro que tienes uno cerca de ti.
            </p>
            
            {/* OPTIMIZACIÓN: Link + Image para el icono */}
            <Link 
              href="/dentistas"
              className="inline-flex items-center justify-center rounded-dkv font-fsme font-bold duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-dkv-green text-white hover:bg-dkv-green-hover focus:ring-dkv-green disabled:bg-dkv-gray-disabled shadow-xl hover:scale-105 transition-transform gap-3 text-lg px-8 py-6 h-auto"
            >
              {/* Icono optimizado: carga lazy, tamaño definido */}
              <Image 
                alt="Ubicación" 
                width={28} 
                height={28} 
                className="w-7 h-7 object-contain brightness-0 invert" 
                src="/icons/location-pin.svg" 
              />
              Ver Centros Dentales
            </Link>
            
            <p className="text-sm font-medium text-dkv-green-dark mt-6">
              Busca centros dentales en toda España. <br /> Sin registros previos.
            </p>
          </div>
        </section>

        {/* --- COMPONENTES INTERACTIVOS (ISLAS) --- */}
        {/* Estos componentes se hidratarán en el cliente independientemente */}
        <div id="ventajas">
          <PricingCards />
        </div>
        
        <section 
          id="presupuesto" 
          className="py-20 bg-dkv-gray-border border-y border-dkv-gray/10 scroll-mt-20"
        >
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                 <h2 className="text-3xl lg:text-4xl font-lemon font-bold text-dkv-green-dark uppercase leading-tight">
                   ¿Listo para empezar <br/> a ahorrar?
                 </h2>
                 <p className="text-lg text-dkv-gray">
                   Déjanos tus datos y calculamos tu cuota personalizada en menos de 24h.
                 </p>
              </div>
              
              <div className="relative">
                 {/* Efecto visual de fondo (CSS puro) */}
                 <div className="absolute -inset-4 bg-dkv-green/5 rounded-xl blur-lg -z-10"></div>
                 
                 {/* El formulario es interactivo ('use client'), pero vive feliz aquí */}
                 <LeadForm />
              </div>
            </div>
           </div>
        </section>

        <section className="py-16 bg-white">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             {/* Espacio reservado para logos o sellos de calidad */}
           </div>
        </section>

        <Archetypes />
      </main>

      <FooterLegal />
    </div>
  );
}