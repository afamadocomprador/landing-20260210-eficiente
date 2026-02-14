import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aviso Legal e Información del Mediador | Red Dental Élite',
  description: 'Información legal obligatoria, titularidad del sitio web y condiciones de mediación de seguros DKV.',
  robots: { index: true, follow: true },
};

export default function AvisoLegalPage() {
  return (
    <main className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8 font-fsme selection:bg-dkv-green selection:text-white">
      <article className="max-w-4xl mx-auto">
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
            <p>El presente portal, accesible bajo el nombre comercial <strong>Red Dental Élite</strong>, es propiedad de:</p>
            <ul className="mt-4 space-y-2 border-l-4 border-dkv-green pl-6 py-2 bg-gray-50">
              <li><strong>Titular:</strong> Bernardo Sobrecasas Gallizo.</li>
              <li><strong>NIF:</strong> 25451380V</li>
              <li><strong>Domicilio Administrativo:</strong> Av. César Augusto, 33, 50004 Zaragoza (España).</li>
              <li><strong>Email de contacto:</strong> bernardo.sobrecasas@segurosdkv.es</li>
              <li><strong>Teléfono:</strong> +34 976 217 463.</li>
            </ul>
          </section>

          {/* 2. Mediación */}
          <section>
            <h2 className="text-xl font-lemon text-dkv-green-dark mb-4 uppercase">2. Información sobre la Mediación de Seguros</h2>
            <p>
              Bernardo Sobrecasas Gallizo desarrolla su actividad profesional como <strong>Agente de Seguros Exclusivo de DKV Seguros y Reaseguros SAE</strong>, cumpliendo con los requisitos de idoneidad y cualificación profesional exigidos por la normativa vigente.
            </p>
            <div className="mt-4 p-4 border border-dkv-gray/10 rounded-lg">
              <p><strong>Registro DGSFP:</strong> Inscrito en el Registro Administrativo especial de mediadores de seguros, corredores de reaseguros y de sus altos cargos de la Dirección General de Seguros y Fondos de Pensiones (DGSFP) con la clave <span className="font-bold">C016125451380V</span>.</p>
              <p className="mt-2 text-sm">
                <strong>Comprobación de Registro:</strong> El cliente puede verificar dicha inscripción en la sede electrónica de la DGSFP (www.dgsfp.mineco.es) o contactando directamente con el organismo regulador.
              </p>
            </div>
            <p className="mt-4">
              El mediador cuenta con la capacidad financiera exigida y dispone de un seguro de Responsabilidad Civil Profesional contratado por la entidad aseguradora para la que presta servicios, cubriendo cualquier responsabilidad que pudiera derivarse de su actividad de mediación.
            </p>
          </section>

          {/* 3. Condiciones de Uso */}
          <section>
            <h2 className="text-xl font-lemon text-dkv-green-dark mb-4 uppercase">3. Objeto y Condiciones de Uso</h2>
            <p>
              Este sitio web tiene como objeto facilitar información sobre el seguro dental <strong>DKV Dentisalud Élite</strong> y permitir la solicitud de asesoramiento personalizado. El acceso a la web atribuye la condición de Usuario, lo que implica la aceptación de estas condiciones.
            </p>
          </section>

          {/* 4. Propiedad Intelectual */}
          <section>
            <h2 className="text-xl font-lemon text-dkv-green-dark mb-4 uppercase">4. Propiedad Intelectual e Industrial</h2>
            <p>
              Los contenidos, logotipos (incluido el de DKV bajo licencia de agente), diseños y códigos fuente son propiedad del Titular o de sus licenciantes. Queda prohibida la reproducción total o parcial sin autorización expresa.
            </p>
          </section>

          {/* 5. Responsabilidad Médica */}
          <section className="bg-amber-50 p-6 rounded-xl border border-amber-100">
            <h2 className="text-xl font-lemon text-dkv-green-dark mb-4 uppercase text-center md:text-left text-balance">5. Responsabilidad sobre los Servicios Médicos</h2>
            <p className="text-amber-900 italic text-sm md:text-base">
              "El Titular actúa exclusivamente como mediador de seguros. La prestación de los servicios odontológicos corre a cargo de los profesionales y clínicas concertadas en la Red Dental de DKV. Bernardo Sobrecasas Gallizo no es responsable de los actos médicos ni de la praxis de los facultativos de la red."
            </p>
          </section>

          {/* 6. Atención al Cliente */}
          <section>
            <h2 className="text-xl font-lemon text-dkv-green-dark mb-4 uppercase">6. Servicio de Atención al Cliente y Reclamaciones</h2>
            <p>
              Conforme a la normativa de protección del cliente de servicios financieros, para cualquier queja o reclamación relacionada con la mediación o el contrato de seguro, el usuario dispone del Servicio de Atención al Cliente de DKV Seguros:
            </p>
            <ul className="mt-4 space-y-3 list-disc pl-5">
              <li><strong>Dirección:</strong> Torre DKV, Avda. María Zambrano 31, 50018 Zaragoza.</li>
              <li><strong>Email:</strong> atencioncliente@dkvseguros.es</li>
            </ul>
            <p className="mt-4 text-sm">
              En caso de disconformidad con la resolución, el usuario podrá dirigirse al Servicio de Reclamaciones de la Dirección General de Seguros y Fondos de Pensiones.
            </p>
          </section>

          {/* 7. Legislación */}
          <section className="pb-20">
            <h2 className="text-xl font-lemon text-dkv-green-dark mb-4 uppercase">7. Legislación y Jurisdicción</h2>
            <p>
              Para la resolución de cualquier controversia judicial, las partes se someterán a la legislación española y a los Juzgados y Tribunales del domicilio del consumidor.
            </p>
          </section>

        </div>
      </article>
    </main>
  );
}
