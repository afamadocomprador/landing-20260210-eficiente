import React from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import FooterLegal from '@/components/FooterLegal';
import LeadForm from '@/components/LeadForm';
import PricingCards from '@/components/PricingCards';
import { ArrowRight, Sparkles, Activity, Smile, Shield } from 'lucide-react';

// --- NUEVOS IMPORTS PARA SEO SEMÁNTICO ---
import { SITE_CONFIG } from '@/constants/config';
import { createClient } from '@supabase/supabase-js';
import { getDentalCatalog } from '@/services/getDentalCatalog';


// Datos estáticos
const treatments = [
  {
    slug: 'implantes-dentales',
    title: 'Implantes Dentales',
    desc: 'Recupera tu sonrisa completa. Soluciones fijas, unitarias o arcada completa con titanio de alta gama.',
    icon: Shield
  },
  {
    slug: 'ortodoncia',
    title: 'Ortodoncia',
    desc: 'Alineación perfecta para niños y adultos. Brackets estéticos, metálicos y ortodoncia invisible.',
    icon: Smile
  },
  {
    slug: 'estetica-dental',
    title: 'Estética Dental',
    desc: 'Blanqueamientos, carillas y diseño de sonrisa. Mejora el color y forma de tus dientes.',
    icon: Sparkles
  },
  {
    slug: 'endodoncia',
    title: 'Endodoncia',
    desc: 'Salva tus dientes dañados. Tratamiento de conductos sin dolor para evitar la extracción.',
    icon: Activity
  },
  {
    slug: 'odontopediatria',
    title: 'Odontopediatría',
    desc: 'Cuidado especial para los más pequeños. Revisiones, flúor y selladores gratuitos en póliza.',
    icon: Smile
  },
  {
    slug: 'periodoncia',
    title: 'Periodoncia',
    desc: 'Salud de tus encías. Tratamiento de gingivitis y periodontitis para mantener tus dientes firmes.',
    icon: Activity
  }
];

export const metadata = {
  title: 'Tratamientos Dentales DKV DENTISALUD ELITE | Precios y Coberturas',
  description: 'Descubre todos los tratamientos dentales cubiertos por DKV Dentisalud Élite. Implantes, ortodoncia y más a precios pactados.',
};

// Transformamos a async para obtener los datos del catálogo
export default async function TreatmentsPage() {

  // 1. INICIALIZACIÓN SEGURA (Imitando variables de entorno)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { maestro, especial } = await getDentalCatalog(supabase);

  // Usamos la configuración global
  const currentUrl = `${SITE_CONFIG.domain}/tratamientos`;


  // 1. Nodo de la Agencia (Bernardo / DKV)
  // 1. Nodo de la Agencia (REFERENCIA AL NODO MAESTRO)
  // Aquí no repetimos todo el bloque legal, solo el ID y el enlace a los catálogos
  /* **** esto pasa a la landing principal
  const agencyNode = {
    "@type": ["InsuranceAgency"],
    "@id": SITE_CONFIG.ids.agent, // <--- ID CENTRALIZADO
    "name": "Bernardo Sobrecasas - Agente Exclusivo DKV",
    "url": SITE_CONFIG.domain,
    "mainEntityOfPage": currentUrl,
    "hasOfferCatalog": [
        { "@id": SITE_CONFIG.ids.masterCatalog },
        { "@id": SITE_CONFIG.ids.packsCatalog }
    ]
  };
  ******* */


  // 2. EL "LIBRO" MAESTRO: Catálogo con todos los servicios básicos
  // 2. EL "LIBRO" MAESTRO: Catálogo con ListItem para validación estricta
  const masterCatalogNode = {
    "@type": "OfferCatalog",
    "@id": SITE_CONFIG.ids.masterCatalog, // <--- ID CENTRALIZADO
    "name": "Baremo Odontológico Completo DKV Dentisalud Elite",
    "description": "Listado oficial de más de 200 tratamientos con tarifas protegidas.",
    "itemListElement": maestro.map((t, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Offer",
        /* CONEXIÓN SEMÁNTICA INDIVIDUAL */
        "offeredBy": { "@id": SITE_CONFIG.ids.agent },
        "price": t.price_value.toFixed(2),
        "priceCurrency": "EUR",
        "itemOffered": {
          "@type": "Service",
          "@id": `${currentUrl}#treatment-${t.id}`, // ID crucial para referencias
          "name": t.treatment_name,
          "description": t.description_notes
        },
      }
    }))
  };

  // 3. EL ESCAPARATE: Catálogo de Packs Destacados (También con ListItem)
const packsCatalogNode = {
    "@type": "OfferCatalog",
    "@id": SITE_CONFIG.ids.packsCatalog, // <--- ID CENTRALIZADO
    "name": "Packs Solución Completa",
    "itemListElement": especial.map((p, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Offer",
        /* CONEXIÓN SEMÁNTICA INDIVIDUAL */
        "offeredBy": { "@id": SITE_CONFIG.ids.agent },
        "price": p.price_value.toFixed(2),
        "priceCurrency": "EUR",
        "itemOffered": {
          "@type": "Service",
          "@id": `${currentUrl}#treatment-${p.id}`,
          "name": p.treatment_name,
          "description": p.description_notes || `Tratamiento completo de ${p.treatment_name}`
        },
        /* LA LLAVE MAESTRA: includesObject */
        "includesObject": p.parts?.map(part => ({
          "@type": "TypeAndQuantityNode",
          "amountOfThisGood": 1,
          "typeofGood": { 
            /* Apuntamos al @id del tratamiento básico definido en el catálogo maestro */
            "@id": `${currentUrl}#treatment-${part.id}` 
          }
        }))
      }
    }))
  };


  // 4. Nodo de la Caries (Tu Caballo de Troya)
  const cariesNode = {
    "@type": "MedicalCondition",
    "@id": `${currentUrl}#caries-profunda`,
    "name": "Caries profunda y dolor de muelas",
    "relevantSpecialty": { "@type": "MedicalSpecialty", "name": "Dentistry" },
    "possibleTreatment": {
      "@type": ["MedicalTherapy"],
      // REFERENCIA DIRECTA AL ID DEL TRATAMIENTO EN EL CATÁLOGO MAESTRO
      // Usamos el UUID de "Obturación" de tu tabla
      "@id": `${currentUrl}#treatment-cba6fdd8-d6ce-4a74-9b4c-6ed01363b1eb`
    }
  };

  // CONSTRUCCIÓN DEL GRAFO UNIFICADO
  const schemaGraph = [
    //agencyNode,
    masterCatalogNode, 
    packsCatalogNode,
    cariesNode
  ];

  return (
   <div className="min-h-screen bg-white font-fsme text-dkv-gray">
      {/* INYECCIÓN SEMÁNTICA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": schemaGraph
        }) }}
      />

      <Header />
      
      <main className="pt-[110px]">
        {/* HERO SIMPLE */}
        <section className="bg-dkv-gray-border/30 py-20 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-lemon text-dkv-green-dark mb-6">
              TRATAMIENTOS DENTALES
            </h1>
            <p className="text-xl text-dkv-gray max-w-2xl mx-auto font-fsme">
              Calidad asistencial máxima con precios franquiciados. <br/>
              Ahorra hasta un 40% respecto al mercado privado.
            </p>
          </div>
        </section>

        {/* GRID DE TRATAMIENTOS */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {treatments.map((item) => (
                <Link 
                  key={item.slug} 
                  href={`/tratamientos/${item.slug}`}
                  className="group border border-dkv-gray-border rounded-xl p-8 hover:shadow-dkv-card transition-all hover:-translate-y-1 bg-white block"
                >
                  <div className="w-14 h-14 bg-dkv-green/10 rounded-full flex items-center justify-center text-dkv-green mb-6 group-hover:bg-dkv-green group-hover:text-white transition-colors">
                    <item.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-lemon text-dkv-green-dark mb-3 group-hover:text-dkv-green transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-dkv-gray mb-6 leading-relaxed">
                    {item.desc}
                  </p>
                  <div className="flex items-center text-dkv-green font-bold text-sm uppercase tracking-wider group-hover:underline">
                    Ver Precios y Detalles <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* --- NUEVO: PRICING CARDS (MUDANZA DESDE LOCALIDADES) --- */}
        <div id="precios-trasladados">
          <PricingCards />
        </div>

        {/* CTA FORMULARIO */}
        <section className="py-20 bg-dkv-gray-border border-y border-dkv-gray/10">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-lemon text-dkv-green-dark mb-4">¿Dudas sobre tu tratamiento?</h2>
                <p className="text-lg text-dkv-gray mb-6">
                  Solicita un presupuesto personalizado. Te informamos sobre coberturas, precios y clínicas disponibles para tu caso concreto.
                </p>
              </div>
              <div className="relative">
                 <div className="absolute -inset-4 bg-dkv-green/5 rounded-xl blur-lg -z-10"></div>
                 <LeadForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <FooterLegal />
    </div>
  );
}