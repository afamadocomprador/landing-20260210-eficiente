import React from 'react';
import type { Metadata } from 'next';
import FooterLegal from '@/components/FooterLegal';

/**
 * PROTECCIÓN DE DATOS Y SEO: 
 * Configuramos 'robots' para impedir que los buscadores indexen esta página.
 * Esto protege tu NIF, email y nombre de aparecer en búsquedas públicas de Google.
 */
export const metadata: Metadata = {
  title: 'Política de Privacidad | Red Dental Élite',
  description: 'Información detallada sobre el tratamiento de datos personales conforme al RGPD.',
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

export default function PoliticaPrivacidadPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8 font-fsme selection:bg-dkv-green selection:text-white">
        <article className="max-w-4xl mx-auto">
          
          {/* Cabecera con advertencia de privacidad */}
          <header className="mb-12 border-b border-dkv-gray/10 pb-8">
            <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-100 text-dkv-gray/50 text-[10px] font-bold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              Documento Privado - No Indexable
            </div>
            <h1 className="text-3xl md:text-4xl font-lemon text-dkv-green-dark leading-tight uppercase text-balance">
              Política de Privacidad y Protección de Datos
            </h1>
            <p className="mt-4 text-dkv-gray/70 text-sm">
              Última actualización: 14 de febrero de 2026
            </p>
          </header>

          <div className="space-y-10 text-dkv-gray leading-relaxed text-justify">
            
            <section>
              <p>
                La presente Política de Privacidad tiene por objeto informar a los usuarios sobre cómo <strong>Bernardo Sobrecasas Gallizo</strong> trata los datos personales que se recogen a través de este sitio web, cumpliendo estrictamente con el Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD).
              </p>
            </section>

            {/* 1. Responsable */}
            <section>
              <h2 className="text-xl font-lemon text-dkv-green-dark mb-4 uppercase">1. Responsable del Tratamiento</h2>
              <div className="mt-4 space-y-2 border-l-4 border-dkv-green pl-6 py-4 bg-gray-50 rounded-r-xl">
                <p><strong>Identidad:</strong> Bernardo Sobrecasas Gallizo (Agente de Seguros Exclusivo DKV).</p>
                <p><strong>NIF:</strong> 25451380V </p>
                <p><strong>Dirección:</strong> Av. César Augusto, 33, 50004 Zaragoza.</p>
                <p><strong>Email de contacto:</strong> bernardo.sobrecasas@segurosdkv.es</p>
              </div>
            </section>

            {/* 2. Finalidad */}
            <section>
              <h2 className="text-xl font-lemon text-dkv-green-dark mb-4 uppercase">2. Finalidad del Tratamiento</h2>
              <p>Los datos proporcionados por el usuario serán tratados para las siguientes finalidades:</p>
              <ol className="mt-4 space-y-3 list-decimal pl-5">
                <li><strong>Gestión de Solicitudes:</strong> Atender consultas y proporcionar presupuestos personalizados sobre el seguro dental DKV Dentisalud.</li>
                <li><strong>Ejecución Precontractual:</strong> Tramitar el alta de la póliza en caso de que el usuario decida contratar.</li>
                <li><strong>Comunicaciones Comerciales:</strong> Solo si el usuario otorga su consentimiento expreso, para enviar información sobre promociones o mejoras en su cobertura dental.</li>
              </ol>
            </section>

            {/* 3. Legitimación */}
            <section>
              <h2 className="text-xl font-lemon text-dkv-green-dark mb-4 uppercase">3. Legitimación</h2>
              <p>La base legal para el tratamiento de sus datos es:</p>
              <ul className="mt-4 space-y-2 list-disc pl-5">
                <li><strong>Aplicación de medidas precontractuales:</strong> Para la elaboración del presupuesto y gestión de la solicitud de seguro.</li>
                <li><strong>Consentimiento expreso:</strong> Para el envío de comunicaciones comerciales y el tratamiento de datos de contacto a través de formularios.</li>
                <li><strong>Obligación Legal:</strong> Derivada de la Ley de Distribución de Seguros.</li>
              </ul>
            </section>

            {/* 4. Destinatarios */}
            <section>
              <h2 className="text-xl font-lemon text-dkv-green-dark mb-4 uppercase">4. Destinatarios</h2>
              <p>
                Sus datos podrán ser comunicados a <strong>DKV Seguros y Reaseguros SAE</strong> para la formalización del contrato. No se cederán datos a otros terceros, salvo obligación legal. No se realizarán transferencias internacionales de datos fuera del Espacio Económico Europeo sin su consentimiento previo.
              </p>
            </section>

            {/* 5. Plazo de Conservación */}
            <section>
              <h2 className="text-xl font-lemon text-dkv-green-dark mb-4 uppercase">5. Plazo de Conservación</h2>
              <p>
                Los datos se conservarán durante el tiempo necesario para cumplir con la finalidad para la que se recogieron. En caso de no formalizarse la contratación, se eliminarán tras el periodo legal establecido, salvo que el usuario haya aceptado recibir comunicaciones comerciales.
              </p>
            </section>

            {/* 6. Derechos del Interesado */}
            <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h2 className="text-xl font-lemon text-dkv-green-dark mb-4 uppercase text-center md:text-left">6. Derechos del Interesado</h2>
              <p className="mb-4">El usuario puede ejercer sus derechos enviando un email a <strong>[INTRODUCIR EMAIL AQUÍ]</strong> adjuntando copia de su DNI:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-bold">
                <div className="bg-white p-3 rounded shadow-sm border-t-2 border-dkv-green flex items-center gap-2">
                  <span className="text-dkv-green text-lg">✓</span> Acceso y Rectificación
                </div>
                <div className="bg-white p-3 rounded shadow-sm border-t-2 border-dkv-green flex items-center gap-2">
                  <span className="text-dkv-green text-lg">✓</span> Supresión (Olvido)
                </div>
                <div className="bg-white p-3 rounded shadow-sm border-t-2 border-dkv-green flex items-center gap-2">
                  <span className="text-dkv-green text-lg">✓</span> Oposición y Limitación
                </div>
                <div className="bg-white p-3 rounded shadow-sm border-t-2 border-dkv-green flex items-center gap-2">
                  <span className="text-dkv-green text-lg">✓</span> Portabilidad de Datos
                </div>
              </div>
              <p className="mt-6 text-xs text-dkv-gray/60 italic leading-relaxed">
                Tiene derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es) si considera que sus derechos no han sido debidamente atendidos.
              </p>
            </section>

            {/* 7. Seguridad */}
            <section className="pb-16">
              <h2 className="text-xl font-lemon text-dkv-green-dark mb-4 uppercase">7. Medidas de Seguridad</h2>
              <p>
                Bernardo Sobrecasas Gallizo ha adoptado las medidas técnicas y organizativas necesarias para garantizar la seguridad de los datos de carácter personal y evitar su alteración, pérdida o acceso no autorizado, habida cuenta del estado de la tecnología y la naturaleza de los datos almacenados.
              </p>
            </section>
          </div>
        </article>
      </main>

      {/* Footer corporativo */}
      <FooterLegal />
    </div>
  );
}
