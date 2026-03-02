import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check, ChevronRight, Info } from 'lucide-react';
import FooterLegal from '@/components/FooterLegal';
import ScrollReveal from '@/components/ui/ScrollReveal'; // Importamos tu animador

// Array de datos adaptado (Imágenes .png y badges corporativos)
const tratamientos = [
  {
    id: 'metalica',
    titulo: 'Brackets Metálicos',
    subtitulo: 'El estándar de resistencia y eficacia',
    imagen: '/images/tratamientos/ortodoncia-standard.png', 
    descripcion: "El sistema tradicional más robusto y económico. Perfecto para corregir cualquier tipo de maloclusión, muy utilizado en adolescentes por su durabilidad.",
    ventajas: ['Máxima resistencia', 'Tratamiento rápido', 'La opción más económica'],
    precioMercado: '2.200€',
    precioDKV: '1.450€',
    badge: 'Mejor Precio',
    badgeColor: 'bg-gray-100 text-dkv-gray' 
  },
  {
    id: 'estetica',
    titulo: 'Brackets Estéticos',
    subtitulo: 'Eficacia tradicional, estética superior',
    imagen: '/images/tratamientos/ortodoncia-standard-zirconio.png', 
    descripcion: "Soportes transparentes o del color del diente que se mimetizan con tu esmalte. Ofrecen la misma precisión que el metal pero pasando desapercibidos.",
    ventajas: ['Altamente discretos', 'No se tiñen', 'Eficacia probada'],
    precioMercado: '2.800€',
    precioDKV: '1.850€',
    badge: 'Recomendado',
    badgeColor: 'bg-white text-dkv-green-dark border border-dkv-gray-border shadow-sm' 
  },
  {
    id: 'lingual',
    titulo: 'Ortodoncia Lingual',
    subtitulo: 'El secreto de tu nueva sonrisa',
    imagen: '/images/tratamientos/ortodoncia-lingual.png', 
    descripcion: "Los brackets se colocan en la cara interna de los dientes. Es el único sistema 100% invisible desde el exterior, diseñado a medida para cada pieza dental.",
    ventajas: ['Totalmente invisible', 'Precisión milimétrica', 'Ideal para adultos'],
    precioMercado: '4.500€',
    precioDKV: '3.150€',
    badge: 'Premium',
    badgeColor: 'bg-dkv-green-dark text-white' 
  },
  {
    id: 'invisible',
    titulo: 'Ortodoncia Invisible',
    subtitulo: 'La opción más estética y cómoda',
    imagen: '/images/tratamientos/ortodoncia-invisalign.png',
    descripcion: "Alineadores transparentes hechos a medida que se cambian cada pocas semanas. Prácticamente invisibles, removibles para comer y cepillarse los dientes.",
    ventajas: ['100% Estético', 'Removible', 'Menos visitas a la clínica'],
    precioMercado: '3.500€',
    precioDKV: '2.450€',
    badge: 'Más Popular',
    badgeColor: 'bg-dkv-green text-white' 
  },
  {
    id: 'removible',
    titulo: 'Ortodoncia Removible',
    subtitulo: 'Prevención y corrección temprana',
    imagen: '/images/tratamientos/ortodoncia-removible.png', 
    descripcion: "Aparatos de 'quita y pon' diseñados principalmente para niños en edad de crecimiento. Ayudan a expandir el paladar y guiar la erupción dental.",
    ventajas: ['Ortodoncia interceptiva', 'Fácil higiene', 'Gratis para < 15 años*'],
    precioMercado: '600€',
    precioDKV: '350€',
    badge: 'Infantil',
    badgeColor: 'bg-[#FFF8F0] text-[#EA580C] border border-orange-200' // Naranja sutil corporativo para infantil
  }
];

export default function OrtodonciaEsteticaPage() {
  return (
    <div className="min-h-screen bg-white text-dkv-gray font-fsme selection:bg-dkv-green selection:text-white">
      
      {/* HEADER / HERO SECTION (Alineado con la Home) */}
      <section className="pt-16 pb-12 bg-white relative z-10">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          
          <ScrollReveal delay={0}>
            <Link href="/" className="inline-flex items-center justify-center text-sm font-bold text-dkv-gray hover:text-dkv-green transition-colors mb-8">
              <ChevronRight className="w-4 h-4 rotate-180 mr-1" />
              Volver al inicio
            </Link>
            
            <h1 className="text-4xl md:text-5xl font-lemon text-dkv-green-dark mb-6">
              Ortodoncia y <span className="text-dkv-green">Estética Dental</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <p className="text-xl text-dkv-gray font-fsme leading-relaxed text-balance max-w-3xl mx-auto">
              Alinea tu sonrisa con la última tecnología. Compara los tratamientos, descubre cuál se adapta a ti y ahorra hasta un <strong className="text-dkv-green-dark font-black">40% de descuento</strong> con DKV Dentisalud Élite.
            </p>
          </ScrollReveal>

        </div>
      </section>

      {/* LISTA DE TRATAMIENTOS */}
      <section className="py-12 bg-white relative z-20">
        <div className="container mx-auto px-4 max-w-4xl flex flex-col gap-10">
          
          {tratamientos.map((trat, index) => (
            <ScrollReveal key={trat.id} delay={index * 100}>
              <article className="bg-white border border-dkv-gray-border rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 hover:shadow-xl transition-shadow duration-300">
                
                {/* IMAGEN DEL TRATAMIENTO */}
                <div className="relative w-full md:w-2/5 h-64 bg-white rounded-2xl overflow-hidden flex-shrink-0 flex items-center justify-center">
                  <div className="absolute top-2 left-2 z-10">
                    <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${trat.badgeColor}`}>
                      {trat.badge}
                    </span>
                  </div>
                  {/* Como son PNGs, usamos contain simple para que luzcan perfectos */}
                  <Image 
                    src={trat.imagen} 
                    alt={trat.titulo}
                    fill
                    className="object-contain p-2 transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>

                {/* CONTENIDO Y PRECIOS */}
                <div className="w-full md:w-3/5 flex flex-col h-full justify-between">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-lemon text-dkv-green-dark mb-2">
                      {trat.titulo}
                    </h2>
                    <p className="text-sm font-bold text-dkv-green mb-4">
                      {trat.subtitulo}
                    </p>
                    <p className="text-base text-dkv-gray leading-relaxed mb-6">
                      {trat.descripcion}
                    </p>

                    <ul className="space-y-2 mb-8">
                      {trat.ventajas.map((vent, i) => (
                        <li key={i} className="flex items-center text-sm font-medium text-dkv-gray">
                          <Check className="w-4 h-4 text-dkv-green mr-3 flex-shrink-0" />
                          {vent}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* BLOQUE DE PRECIO Y CTA */}
                  <div className="pt-6 border-t border-dkv-gray-border flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                    <div>
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                        Tratamiento completo desde:
                      </span>
                      <div className="flex items-end gap-3">
                        <span className="text-xl text-gray-400 line-through font-medium mb-1 decoration-gray-300">
                          {trat.precioMercado}
                        </span>
                        <div className="flex flex-col">
                          <span className="text-3xl md:text-4xl font-lemon text-dkv-green-dark leading-none">
                            {trat.precioDKV}
                          </span>
                          <span className="text-[10px] font-bold text-dkv-green uppercase tracking-widest mt-1">
                            Con DKV Élite
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* BOTÓN ESTILO HOME */}
                    <Link 
                      href="/dentistas/cerca-de-mi"
                      className="inline-flex items-center justify-center rounded-dkv font-fsme font-bold duration-300 focus:outline-none bg-dkv-green text-white hover:bg-dkv-green-hover shadow-xl hover:scale-105 transition-transform px-8 py-4 text-base w-full sm:w-auto text-center"
                    >
                      Buscar clínicas
                    </Link>
                  </div>
                </div>
                
              </article>
            </ScrollReveal>
          ))}

        </div>
      </section>

      {/* NOTA ACLARATORIA (Integrada orgánicamente) */}
      <section className="py-12 bg-white relative z-20">
        <ScrollReveal>
          <div className="container mx-auto px-4 max-w-4xl border-t border-dkv-gray-border pt-12">
            <div className="flex gap-4 text-dkv-gray text-sm leading-relaxed">
              <Info className="w-6 h-6 flex-shrink-0 text-dkv-green" />
              <p>
                <strong className="text-dkv-green-dark">Aviso Legal y Médico:</strong> Los precios mostrados son estimaciones base del tratamiento completo y pueden variar según la complejidad del caso clínico, la duración del mismo y la zona geográfica. Tu odontólogo colegiado realizará un diagnóstico y presupuesto exacto (totalmente gratuito) en tu primera visita en clínica.
                <br/><br/>
                * La ortodoncia interceptiva removible está cubierta al 100% para menores de 15 años incluidos en pólizas familiares de DKV Dentisalud Élite.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <FooterLegal />
    </div>
  );
}