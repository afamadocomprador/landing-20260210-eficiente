import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check, ChevronRight, Info } from 'lucide-react';
import FooterLegal from '@/components/FooterLegal';
import ScrollReveal from '@/components/ui/ScrollReveal';

// Array de datos. Iremos añadiendo aquí las extracciones y curas más adelante.
const tratamientos = [
  {
    id: 'endodoncia',
    titulo: 'Endodoncia (Tratamiento de conductos)',
    subtitulo: 'Salva tu diente y elimina el dolor de raíz',
    imagen: '/images/tratamientos/endodoncias-1C-2C-3C.png', 
    descripcion: "Conocido popularmente como 'matar el nervio'. Es un procedimiento indoloro para eliminar el tejido infectado del interior del diente, limpiarlo y sellarlo. Evita la extracción de la pieza y fulmina el dolor agudo al instante. Precios fijos y cerrados según la anatomía de tu diente.",
    ventajas: [
      '1 Conducto (Incisivos/Caninos) - DKV: 85€ (Mercado: ~160€)', 
      '2 Conductos (Premolares) - DKV: 105€ (Mercado: ~210€)', 
      '3 Conductos (Molares) - DKV: 145€ (Mercado: ~260€)'
    ],
    // Mostramos el precio "Desde" (1 conducto) en el bloque grande
    precioMercado: '160€',
    precioDKV: '85€',
    badge: 'Alivio Inmediato',
    // Usamos el tono naranja corporativo de DKV para "Urgencia / Dolor"
    badgeColor: 'bg-[#FFF8F0] text-[#EA580C] border border-orange-200'
  }
];

export default function EndodonciasCurasPage() {
  return (
    <div className="min-h-screen bg-white text-dkv-gray font-fsme selection:bg-dkv-green selection:text-white">
      
      {/* HEADER / HERO SECTION */}
      <section className="pt-16 pb-12 bg-white relative z-10">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          
          <ScrollReveal delay={0}>
            <Link href="/" className="inline-flex items-center justify-center text-sm font-bold text-dkv-gray hover:text-dkv-green transition-colors mb-8">
              <ChevronRight className="w-4 h-4 rotate-180 mr-1" />
              Volver al inicio
            </Link>
            
            <div className="flex justify-center mb-4">
              <div className="inline-block bg-[#FFF8F0] text-[#EA580C] px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-orange-200 shadow-sm">
                Tengo dolor agudo
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-lemon text-dkv-green-dark mb-6">
              Endodoncias, Extracciones y <span className="text-dkv-green">Curas</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <p className="text-xl text-dkv-gray font-fsme leading-relaxed text-balance max-w-3xl mx-auto">
              Tratamientos diseñados para aliviar el dolor, curar infecciones y salvar tus piezas dentales con la máxima urgencia y cuidado. Ahorra hasta un <strong className="text-dkv-green-dark font-black">40% de descuento</strong> con DKV Dentisalud Élite.
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

                    {/* Lista de ventajas (Aquí listamos los precios fijos de 1, 2 y 3 conductos) */}
                    <ul className="space-y-3 mb-8">
                      {trat.ventajas.map((vent, i) => (
                        <li key={i} className="flex items-start text-sm font-medium text-dkv-gray">
                          <Check className="w-4 h-4 text-dkv-green mr-3 mt-0.5 flex-shrink-0" />
                          <span className="leading-tight">{vent}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* BLOQUE DE PRECIO Y CTA */}
                  <div className="pt-6 border-t border-dkv-gray-border flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                    <div>
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                        Tratamiento base desde:
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
                            Con DKV Élite (1 Conducto)
                          </span>
                        </div>
                      </div>
                    </div>
                    
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

      {/* NOTA ACLARATORIA */}
      <section className="py-12 bg-white relative z-20">
        <ScrollReveal>
          <div className="container mx-auto px-4 max-w-4xl border-t border-dkv-gray-border pt-12">
            <div className="flex gap-4 text-dkv-gray text-sm leading-relaxed">
              <Info className="w-6 h-6 flex-shrink-0 text-dkv-green" />
              <p>
                <strong className="text-dkv-green-dark">Aviso Legal y Médico:</strong> Los precios mostrados son estimaciones del tratamiento e incluyen la instrumentación y sellado de los conductos radiculares. En función del nivel de infección, el odontólogo podría requerir pruebas diagnósticas adicionales (como radiografías periapicales, habitualmente gratuitas con DKV Dentisalud) o reconstrucciones posteriores de la corona dental que se presupuestarán por separado en tu primera visita.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <FooterLegal />
    </div>
  );
}