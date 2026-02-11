// components/Archetypes.tsx
import React from 'react';
import Image from 'next/image'; 
import { CheckCircle2 } from 'lucide-react';

const Archetypes = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
           {/* AQUÍ ESTÁ EL CAMBIO: h2 para accesibilidad */}
           <h2 className="text-2xl font-lemon font-bold text-dkv-green-dark tracking-widest uppercase">
             Diseñado para ti
           </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          
          {/* --- CARD FAMILIAS --- */}
          <div className="group border border-dkv-gray-border rounded-xl overflow-hidden hover:shadow-dkv-card transition-all bg-white hover:-translate-y-1">
            <div className="h-48 bg-dkv-gray-border relative overflow-hidden">
                <Image 
                  src="/images/card-familia.webp" 
                  alt="Familia DKV" 
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
            </div>
            <div className="p-8">
              <h3 className="text-xl font-lemon font-bold text-dkv-green-dark mb-2">FAMILIAS</h3>
              <p className="text-dkv-green font-bold text-sm mb-4 uppercase tracking-wide font-fsme">"Eficiencia Doméstica"</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-dkv-gray font-fsme">
                  <CheckCircle2 className="w-4 h-4 text-dkv-green shrink-0 mt-0.5" />
                  <span>Menores incluidos gratis</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-dkv-gray font-fsme">
                  <CheckCircle2 className="w-4 h-4 text-dkv-green shrink-0 mt-0.5" />
                  <span>Fluorizaciones sin coste</span>
                </li>
              </ul>
            </div>
          </div>

          {/* --- CARD SENIORS --- */}
          <div className="group border border-dkv-gray-border rounded-xl overflow-hidden hover:shadow-dkv-card transition-all bg-white hover:-translate-y-1">
            <div className="h-48 bg-dkv-gray-border relative overflow-hidden">
                <Image 
                  src="/images/card-senior.webp" 
                  alt="Seniors DKV" 
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
            </div>
            <div className="p-8">
              <h3 className="text-xl font-lemon font-bold text-dkv-green-dark mb-2">SENIORS</h3>
              <p className="text-dkv-green font-bold text-sm mb-4 uppercase tracking-wide font-fsme">"Seguridad Total"</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-dkv-gray font-fsme">
                  <CheckCircle2 className="w-4 h-4 text-dkv-green shrink-0 mt-0.5" />
                  <span>Póliza Vitalicia (3º año)</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-dkv-gray font-fsme">
                  <CheckCircle2 className="w-4 h-4 text-dkv-green shrink-0 mt-0.5" />
                  <span>Prótesis a precio pactado</span>
                </li>
              </ul>
            </div>
          </div>

          {/* --- CARD JÓVENES --- */}
          <div className="group border border-dkv-gray-border rounded-xl overflow-hidden hover:shadow-dkv-card transition-all bg-white hover:-translate-y-1">
            <div className="h-48 bg-dkv-gray-border relative overflow-hidden">
                <Image 
                  src="/images/card-joven.webp" 
                  alt="Jóvenes DKV" 
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
            </div>
            <div className="p-8">
              <h3 className="text-xl font-lemon font-bold text-dkv-green-dark mb-2">JÓVENES</h3>
              <p className="text-dkv-green font-bold text-sm mb-4 uppercase tracking-wide font-fsme">"Estética Inteligente"</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-dkv-gray font-fsme">
                  <CheckCircle2 className="w-4 h-4 text-dkv-green shrink-0 mt-0.5" />
                  <span>Limpieza anual incluida</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-dkv-gray font-fsme">
                  <CheckCircle2 className="w-4 h-4 text-dkv-green shrink-0 mt-0.5" />
                  <span>Blanqueamiento descuento</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Archetypes;