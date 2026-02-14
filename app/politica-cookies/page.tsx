import React from 'react';
import type { Metadata } from 'next';
import FooterLegal from '@/components/FooterLegal';

/**
 * PROTECCIÓN DE PRIVACIDAD:
 * Impedimos que Google indexe esta página técnica para evitar rastreos
 * innecesarios de la estructura legal del sitio.
 */
export const metadata: Metadata = {
  title: 'Política de Cookies | Red Dental Élite',
  description: 'Información sobre el uso de cookies técnicas, analíticas y de marketing en el portal.',
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

export default function PoliticaCookiesPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8 font-fsme selection:bg-dkv-green selection:text-white">
        <article className="max-w-4xl mx-auto">
          
          {/* Tag de seguridad visual */}
          <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-100 text-dkv-gray/50 text-[10px] font-bold uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
            Configuración Técnica - No Indexable
          </div>

          <header className="mb-12 border-b border-dkv-gray/10 pb-8">
            <h1 className="text-3xl md:text-4xl font-lemon text-dkv-green-dark leading-tight uppercase">
              Política de Cookies
            </h1>
            <p className="mt-4 text-dkv-gray/70 text-sm">
              En cumplimiento con el artículo 22.2 de la LSSI. Última actualización: 14 de febrero de 2026.
            </p>
          </header>

          <div className="space-y-10 text-dkv-gray leading-relaxed text-justify">
            
            <section>
              <h2 className="text-xl font-lemon text-dkv-green-dark mb-4 uppercase">1. ¿Qué son las Cookies?</h2>
              <p>
                Las cookies son pequeños archivos de texto que se descargan en su equipo al acceder a determinadas páginas web. Permiten a una web, entre otras cosas, almacenar y recuperar información sobre los hábitos de navegación de un usuario o de su equipo.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-lemon text-dkv-green-dark mb-4 uppercase">2. Tipos de Cookies utilizadas</h2>
              <div className="grid gap-4 mt-4">
                <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-dkv-green">
                  <h3 className="font-bold text-dkv-green-dark">Cookies Técnicas (Necesarias)</h3>
                  <p className="text-sm">Imprescindibles para el funcionamiento del sitio. Permiten la navegación y el uso de servicios como el formulario de contacto.</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-blue-400">
                  <h3 className="font-bold text-blue-600">Cookies de Análisis (Estadísticas)</h3>
                  <p className="text-sm">Permiten cuantificar el número de usuarios y realizar la medición estadística de cómo los usuarios utilizan nuestra web para mejorar la oferta de servicios.</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-amber-400">
                  <h3 className="font-bold text-amber-600">Cookies de Marketing</h3>
                  <p className="text-sm">Almacenan información del comportamiento de los usuarios para desarrollar un perfil específico y mostrar publicidad en función del mismo.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-lemon text-dkv-green-dark mb-4 uppercase">3. Detalle de Cookies Propias</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-dkv-gray text-white">
                      <th className="p-3 font-lemon text-xs">Nombre</th>
                      <th className="p-3 font-lemon text-xs">Origen</th>
                      <th className="p-3 font-lemon text-xs">Finalidad</th>
                      <th className="p-3 font-lemon text-xs">Duración</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="p-3 font-mono text-xs">dkv_lead_ref</td>
                      <td className="p-3 text-xs">Propia</td>
                      <td className="p-3 text-xs">Atribución de campaña para el mediador (Bernardo Sobrecasas).</td>
                      <td className="p-3 text-xs">Sesión</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono text-xs">cookie_consent</td>
                      <td className="p-3 text-xs">Propia</td>
                      <td className="p-3 text-xs">Almacena el estado de consentimiento del usuario.</td>
                      <td className="p-3 text-xs">1 año</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-lemon text-dkv-green-dark mb-4 uppercase">4. Gestión de Cookies</h2>
              <p>
                El usuario puede permitir, bloquear o eliminar las cookies instaladas en su equipo mediante la configuración de las opciones del navegador:
              </p>
              <ul className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-bold text-center">
                <li className="p-2 border rounded hover:bg-gray-50">Google Chrome</li>
                <li className="p-2 border rounded hover:bg-gray-50">Mozilla Firefox</li>
                <li className="p-2 border rounded hover:bg-gray-50">Safari</li>
                <li className="p-2 border rounded hover:bg-gray-50">Microsoft Edge</li>
              </ul>
            </section>

            <section className="pb-16 text-sm text-dkv-gray/60 italic">
              <p>
                El uso de cookies de terceros puede implicar transferencias internacionales de datos a EE.UU., amparadas bajo el Marco de Privacidad de Datos (Data Privacy Framework).
              </p>
            </section>

          </div>
        </article>
      </main>

      <FooterLegal />
    </div>
  );
}
