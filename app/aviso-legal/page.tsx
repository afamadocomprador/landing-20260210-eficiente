import React from 'react';
import type { Metadata } from 'next';
import FooterLegal from '@/components/FooterLegal';

/**
 * PROTECCIÓN DE PRIVACIDAD:
 * Se configura 'robots' con index: false para evitar que los datos personales
 * y profesionales del mediador aparezcan en los resultados de Google.
 */
export const metadata: Metadata = {
  title: 'Aviso Legal e Información del Mediador | Red Dental Élite',
  description: 'Información legal obligatoria, titularidad del sitio web y condiciones de mediación de seguros DKV.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function AvisoLegalPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8 font-fsme selection:bg-dkv-green selection:text-white">
        <article className="max-w-4xl mx-auto">
          
          {/* Etiqueta técnica de privacidad */}
          <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-100 text-dkv-gray/50 text-[10px] font-bold uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            Documento Profesional - No Indexable
          </div>

          {/* Cabecera */}
          <header className="mb-12 border-b border-dkv-gray/10 pb-8">
            <h1 className="text-3xl md:text-4xl font-lemon text-dkv-green-dark leading-tight uppercase">
              Aviso Legal e Información del Mediador
            </h1>
            <p className="mt-4 text-dkv-gray/70 text-sm">
              Última actualización: 14 de febrero de 2026
            </p>
          </header>

          <div className="space-y-10 text-dkv-gray leading-relaxed text-justify">
            
            <section>
              <p>
                En cumplimiento de lo previsto en la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI), así como en el Real Decreto-ley 3/2020 (Ley de Distribución de Seguros), se exponen a continuación los datos identificativos y la información legal obligatoria del titular de este sitio web.
              </p>
            </section>

            {/* 1. Titularidad */}
            <section>
              <h2 className="text-xl font-lemon text-dkv-green-dark mb-4 uppercase">1. Titularidad del Sitio Web</h2>
              <p>El presente portal, bajo el nombre comercial <strong>Red Dental Élite</strong>, es propiedad de:</p>
              <ul className="mt-4 space-y-2 border-l-4 border-dkv-green pl-6 py-4 bg-gray-50 rounded-r-xl">
                <li><strong>Titular:</strong> Bernardo Sobrecasas Gallizo.</li>
                <li><strong>NIF:</strong> 25451380V</li>
                <li><strong>Domicilio:</strong> Av. César Augusto, 33, 50004 Zaragoza (España).</li>
                <li><strong>Email:</strong> bernardo.sobrecasas@segurosdkv.es</li>
                <li><strong>Teléfono:</strong> +34 976 217 463.</li>
              </ul>
            </section>

            {/* 2. Mediación */}
            <section>
              <h2 className="text-xl font-lemon text-dkv-green-dark mb-4 uppercase">2. Información sobre la Mediación</h2>
              <p>
                Bernardo Sobrecasas Gallizo desarrolla su actividad profesional como <strong>Agente de Seguros Exclusivo de DKV Seguros y Reaseguros SAE</strong>.
              </p>
              <div className="mt-4 p-4 border border-dkv-gray/10 rounded-lg bg-white">
                <p><strong>Registro DGSFP:</strong> Inscrito con la clave <span className="font-bold">C016125451380V</span>.</p>
                <p className="mt-2 text-sm text-dkv-gray/70 italic">
                  Información verificable en la sede electrónica de la Dirección General de Seguros y Fondos de Pensiones.
                </p>
              </div>
            </section>

            {/* 3. Condiciones de Uso */}
            <section>
              <h2 className="text-xl font-lemon text-dkv-green-dark mb-4 uppercase">3. Objeto</h2>
              <p>
                Este sitio web facilita información sobre el seguro <strong>DKV Dentisalud Élite</strong>. El acceso implica la aceptación de las presentes condiciones de uso y la política de privacidad del portal.
              </p>
            </section>

            {/* 4. Responsabilidad Médica */}
            <section className="bg-amber-50 p-6 rounded-xl border border-amber-100">
              <h2 className="text-xl font-lemon text-dkv-green-dark mb-4 uppercase">4. Responsabilidad sobre Servicios Médicos</h2>
              <p className="text-amber-900 italic text-sm md:text-base">
                "El Titular actúa exclusivamente como mediador de seguros. La prestación de los servicios odontológicos corre a cargo de los profesionales y clínicas de la Red Dental de DKV. El mediador no es responsable de los actos médicos ni de la praxis de los facultativos vinculados a la aseguradora."
              </p>
            </section>

            {/* 5. Atención al Cliente */}
            <section className="pb-12">
              <h2 className="text-xl font-lemon text-dkv-green-dark mb-4 uppercase">5. Atención al Cliente</h2>
              <p>
                Para quejas o reclamaciones relacionadas con el contrato de seguro, el usuario dispone del Servicio de Atención al Cliente de DKV Seguros:
              </p>
              <ul className="mt-4 space-y-2 list-disc pl-5">
                <li>Torre DKV, Avda. María Zambrano 31, 50018 Zaragoza.</li>
                <li>Email: atencioncliente@dkvseguros.es</li>
              </ul>
            </section>
          </div>
        </article>
      </main>

      {/* Footer corporativo */}
      <FooterLegal />
    </div>
  );
}
