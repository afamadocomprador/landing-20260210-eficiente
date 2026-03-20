// Ruta: data/treatments.tsx
import { TreatmentDefinition } from '@/types/treatments';
import { Diamond } from 'lucide-react'; 
import ShareButton from "@/components/ui/ShareButton"; // <-- Importamos para el bloque Premium

export const treatmentsRegistry: Record<string, TreatmentDefinition> = {
  
  // 1. BLANQUEAMIENTO DENTAL (Mantenido intacto)
  'estetica-blanqueamiento': {
    slug: 'estetica-blanqueamiento',
    activeSubNavId: 'blanqueamiento',
    seoTitle: "Blanqueamiento Dental | Precios Cerrados DKV Dentisalud",
    seoDescription: "Rejuvenece tu sonrisa eliminando manchas sin dañar el esmalte. Descubre nuestras opciones de blanqueamiento dental láser y combinado con tarifas DKV.",
    breadcrumbs: [
      { label: "Inicio", href: "/" },
      { label: "Tratamientos", href: "/tratamientos" },
      { label: "Estética Dental", href: "/tratamientos/estetica" },
      { label: "Blanqueamiento", href: "#" }
    ],
    hero: {
      badgeText: "Recupera la luz de tu sonrisa",
      title: { dark: "BLANQUEAMIENTO", normal: "DENTAL" },
      description: [
        "El objetivo: Rejuvenecer tu sonrisa eliminando pigmentaciones (café, tabaco, edad) sin alterar la forma ni la estructura de tus dientes.",
        "Utilizamos geles liberadores de oxígeno que penetran en el esmalte para limpiar las manchas internas de forma segura y eficaz."
      ]
    },
    intro: {
      badgeText: "¿Cuándo es necesario?",
      title: "Devuelve el Blanco Natural a tus Dientes",
      description: "Cuando sientes que tus dientes han perdido su blanco natural o están amarillentos, pero estás contento con su forma y posición. También es la solución ideal cuando un diente se ha oscurecido tras matar el nervio (endodoncia). El tratamiento se puede activar con luz en la clínica o aplicar gradualmente en casa."
    },
    rows: [
      {
        id: "blanqueamiento-combinado",
        name: "Blanqueamiento Combinado (Consultorio + Kit Domicilio)",
        price: "300 €",
        content: <p><strong>El Tratamiento Estrella:</strong> Es la opción que más recomendamos a nuestros pacientes. Combina el choque rápido y potente de la clínica con el mantenimiento profundo y progresivo en casa. Es la técnica que consigue un blanco más duradero, estable y espectacular.</p>,
        list: [
          { icon: 'Sparkles', text: '1 sesión intensiva en clínica con luz activadora.' },
          { icon: 'Smile', text: 'Férulas a medida y gel profesional para usar en casa.' },
          { icon: 'ShieldCheck', text: 'Máxima duración del tono blanco a lo largo de los años.' }
        ]
      },
      {
        id: "blanqueamiento-consultorio",
        name: "Blanqueamiento Dental en Consultorio (Plasma o Láser)",
        price: "250 €",
        content: <p><strong>Ideal si buscas un resultado rápido.</strong> En una sesión de aproximadamente una hora en la clínica, aislamos cuidadosamente tus encías y aplicamos un gel de alta concentración que se activa mediante luz de plasma o láser.</p>,
        footerNote: "Sales de la consulta el mismo día con una sonrisa notablemente más blanca."
      },
      {
        id: "blanqueamiento-domicilio",
        name: "Blanqueamiento con Férulas en Domicilio",
        price: "216 €",
        content: <p><strong>El método más suave y gradual.</strong> Tomamos moldes de tu boca para fabricarte unas fundas transparentes a medida (férulas). Te entregamos un kit con gel blanqueador que aplicarás en las férulas cada noche en tu casa durante un par de semanas.</p>,
        footerNote: "Tratamiento completo incluido. Excelente para pacientes con sensibilidad dental que prefieren un proceso más lento."
      },
      {
        id: "blanqueamiento-interno",
        name: "Blanqueamiento de Diente No Vital",
        price: "50 €",
        content: (
          <>
            <p><strong>¿Por qué hace falta?</strong> A veces, tras un fuerte golpe o una endodoncia (matar el nervio), un solo diente se vuelve gris o negro, desentonando con el resto de la sonrisa.</p>
            <p>Este blanqueamiento específico se realiza desde el interior del propio diente afectado, depositando el agente blanqueador dentro de la cámara pulpar para igualar su color con los dientes vecinos sanos.</p>
          </>
        ),
        footerNote: "* Precio por pieza tratada."
      }
    ],
    veredicto: {
      title: "El Veredicto de tu Odontólogo",
      quote: <>"La mejor estética dental es aquella que no se nota. Cuando alguien te diga '¡Qué carillas más bonitas llevas!', habremos fracasado. Nuestro objetivo es que te digan: <strong>'¡Qué buena cara tienes, qué sonrisa más luminosa!'</strong>. Invertir en un blanqueamiento combinado es invertir en que nadie sepa qué te has hecho, pero todos noten que estás mejor que nunca."</>
    },
    cta: {
      title: "Planifica tu tratamiento",
      infoNote: "La información reflejada en esta página tiene mero carácter orientativo. Para asegurar que tus dientes y encías están sanos y son aptos para recibir un blanqueamiento dental, es imprescindible la valoración previa de un dentista.",
      description: "Solicita tu cita de valoración en tu clínica más cercana. Revisaremos tu esmalte y te aconsejaremos el tipo de blanqueamiento más efectivo para tu caso."
    }
  },

  // 2. CARILLAS Y DISEÑO DE SONRISA
  'estetica-carillas': {
    slug: 'estetica-carillas',
    activeSubNavId: 'carillas',
    seoTitle: "Carillas Dentales y Diseño de Sonrisa | Precios DKV Dentisalud",
    seoDescription: "Cambia el color, forma y tamaño de tus dientes. Descubre nuestras carillas de composite, porcelana y disilicato de litio con diseño digital 3D.",
    breadcrumbs: [
      { label: "Inicio", href: "/" },
      { label: "Tratamientos", href: "/tratamientos" },
      { label: "Estética Dental", href: "/tratamientos/estetica" },
      { label: "Carillas y Diseño", href: "#" }
    ],
    hero: {
      badgeText: "Transformación Total",
      title: { dark: "CARILLAS Y DISEÑO DE", normal: "SONRISA" },
      description: [
        "El objetivo: Cambiar radicalmente el color, la forma, el tamaño o cerrar espacios (diastemas) entre los dientes frontales.",
        "Las carillas son unas láminas finísimas que se adhieren fuertemente a la cara visible del diente, logrando una armonía perfecta."
      ]
    },
    intro: {
      badgeText: "Tratamientos Base",
      title: "Opción Básica y Tradicional",
      description: "Soluciones rápidas y efectivas disponibles en todas nuestras clínicas para mejorar la estética de tus dientes frontales de forma económica."
    },
    rows: [
      {
        id: "carillas-composite",
        name: "Carillas Estéticas de Composite",
        price: "75 €",
        // --- INICIO DE LA MODIFICACIÓN NANO BANANA ---
        // Sustituimos 'content' por 'points' para usar el nuevo diseño de grid iconográfico
        points: [
          {
            icon: 'Timer',
            text: <><strong className="text-dkv-green-dark font-bold">Rápido y económico.</strong><br />En una sola sesión.</>
          },
          {
            icon: 'Paintbrush',
            text: <><strong className="text-dkv-green-dark font-bold">Modelado directo.</strong><br />Resina estética capa a capa sobre tu diente.</>
          },
          {
            icon: 'Zap',
            text: <><strong className="text-dkv-green-dark font-bold">Endurecido con luz.</strong><br />Resultado inmediato.</>
          }
        ],
        footerNote: "* Precio por diente. Ideal para pequeñas correcciones de forma o color."
        // --- FIN DE LA MODIFICACIÓN ---
      },
      {
        id: "carillas-porcelana",
        name: "Carillas Estéticas de Porcelana",
        price: "180 €",
        content: (
          <>
            <p><strong>Máxima estabilidad de color.</strong> A diferencia de la resina, estas "losetas" de cerámica se fabrican a medida en el laboratorio. No se tiñen ni pierden color con el paso de los años (no absorben café ni tabaco).</p>
            <div className="bg-dkv-gray-light/30 rounded-2xl p-5 border border-dkv-gray-border mt-4">
              <ul className="space-y-4">
                <li className="flex flex-col md:flex-row md:justify-between items-start md:items-center pb-3 border-b border-dkv-gray-border/50">
                  <span className="font-bold text-dkv-gray">Carilla de porcelana estándar <span className="font-normal block text-sm text-dkv-gray/80">(precio por diente)</span></span>
                  <span className="font-lemon text-lg text-dkv-green-dark shrink-0">180 €</span>
                </li>
                <li className="flex flex-col md:flex-row md:justify-between items-start md:items-center">
                  <span className="font-bold text-dkv-gray">Suplemento porcelanas y efectos especiales <span className="font-normal block text-sm text-dkv-gray/80">El laboratorio pinta y texturiza imitando las transparencias de un diente natural perfecto.</span></span>
                  <span className="font-lemon text-lg text-dkv-green-dark shrink-0">50 €</span>
                </li>
              </ul>
            </div>
          </>
        )
      }
    ],

    // data/treatments.tsx (Bloque Premium de 'estetica-carillas')
    premiumBlock: (
      <div id="alta-estetica-digital" className="bg-gradient-to-br from-dkv-green-dark to-[#022A27] rounded-2xl md:rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden mt-16 mb-12 text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#D4AF37] opacity-10 blur-[80px] rounded-full"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Diamond className="w-8 h-8 text-[#D4AF37]" />
            <span className="text-[#D4AF37] font-bold text-sm md:text-base uppercase tracking-[0.2em] font-fsme">Upgrade Premium Exclusivo</span>
          </div>
          
          {/* CABECERA PREMIUM: Reconstruida como Flexbox anidado en H2 */}
          <h2 className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 md:gap-4 mb-6 text-xl md:text-2xl font-lemon uppercase tracking-wide m-0 text-white">
            <span className="pr-4 mt-1">Alta Estética Digital (DSD)</span>
            <span className="flex items-center gap-3 self-end md:self-auto mt-2 md:mt-0">
              <ShareButton />
            </span>
          </h2>

          <p className="font-fsme text-lg mb-6 text-white/90 leading-relaxed">
            Para los pacientes más exigentes que buscan una transformación total (el famoso <strong>"Hollywood Smile"</strong>) sin sorpresas. Aquí no imaginamos el resultado; <strong>te lo probamos en tu boca antes de empezar</strong>. Disponible exclusivamente en nuestros Centros Propios Especiales.
          </p>

          <h3 className="font-lemon text-xl text-[#D4AF37] mb-4 uppercase mt-8 border-b border-white/20 pb-2">1. Diseño Digital de Sonrisas (Dental Smile Design)</h3>
          <p className="font-fsme text-sm text-white/80 mb-4">Estudio fotográfico y simulación por ordenador para que apruebes el resultado final antes de tocar tu esmalte real.</p>
          <div className="bg-white/10 rounded-2xl p-6 border border-white/20 backdrop-blur-sm mb-8">
            <ul className="space-y-4">
              <li className="flex flex-col md:flex-row md:justify-between items-start md:items-center pb-3 border-b border-white/20">
                <span className="font-bold text-white">Modelos de análisis y estudio fotográfico</span>
                <span className="font-lemon text-lg text-[#D4AF37] shrink-0 mt-1 md:mt-0">Incluido (0 €)</span>
              </li>
              <li className="flex flex-col md:flex-row md:justify-between items-start md:items-center pb-3 border-b border-white/20">
                <span className="font-bold text-white">Encerado diagnóstico estético <span className="font-normal block text-sm text-white/70">Diseño de tu sonrisa en ordenador</span></span>
                <span className="font-lemon text-lg text-[#D4AF37] shrink-0 mt-1 md:mt-0">Incluido (0 €)</span>
              </li>
              <li className="flex flex-col md:flex-row md:justify-between items-start md:items-center pb-3 border-b border-white/20">
                <span className="font-bold text-white">Mock-up (Carilla provisional de prueba) <span className="font-normal block text-sm text-white/70">Imprimimos tu nueva sonrisa y te la ponemos sobre tus dientes temporalmente.</span></span>
                <span className="font-lemon text-lg text-[#D4AF37] shrink-0 mt-1 md:mt-0">Incluido (0 €)</span>
              </li>
              <li className="flex flex-col md:flex-row md:justify-between items-start md:items-center">
                <span className="font-bold text-white">Informe presentación del estudio <span className="font-normal block text-sm text-white/70">Te llevas tu proyecto a casa.</span></span>
                <span className="font-lemon text-lg text-[#D4AF37] shrink-0 mt-1 md:mt-0">Incluido (0 €)</span>
              </li>
            </ul>
          </div>

          <h3 className="font-lemon text-xl text-[#D4AF37] mb-4 uppercase border-b border-white/20 pb-2">2. Fabricación de Carillas de Alta Gama</h3>
          <p className="font-fsme text-sm text-white/80 mb-4">Resistencia y estética suprema. Fabricación robótica de ultra precisión.</p>
          <div className="bg-white/10 rounded-2xl p-6 border border-white/20 backdrop-blur-sm">
            <ul className="space-y-6">
              <li className="flex flex-col md:flex-row md:justify-between items-start md:items-center pb-4 border-b border-white/20">
                <div>
                  <span className="font-bold text-white text-lg block mb-1">Carilla de porcelana 3D (CAD-CAM)</span>
                  <span className="font-normal text-sm text-white/80 block max-w-lg">Fabricada por ordenadores y robótica en 3D para un ajuste microscópico perfecto.</span>
                </div>
                <span className="font-lemon text-2xl text-[#D4AF37] shrink-0 mt-2 md:mt-0">396 € <span className="text-sm font-fsme text-white/70 block md:inline">/diente</span></span>
              </li>
              <li className="flex flex-col md:flex-row md:justify-between items-start md:items-center">
                <div>
                  <span className="font-bold text-white text-lg block mb-1">Carilla de Disilicato de Litio</span>
                  <span className="font-normal text-sm text-white/80 block max-w-lg">El material más avanzado del mundo. 3 veces más resistente que la porcelana tradicional, permite fabricar carillas del grosor de una lente de contacto. <strong className="text-[#D4AF37]">A menudo sin necesidad de limar el diente natural.</strong></span>
                </div>
                <span className="font-lemon text-2xl text-[#D4AF37] shrink-0 mt-2 md:mt-0">400 € <span className="text-sm font-fsme text-white/70 block md:inline">/diente</span></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    ),

    cta: {
      title: "Planifica tu tratamiento",
      infoNote: "La información reflejada en esta página tiene mero carácter orientativo. Para asegurar que tus dientes son aptos para recibir carillas y decidir el material óptimo (composite vs disilicato), necesitas la evaluación clínica de uno de nuestros especialistas en estética.",
      description: "Reserva tu cita de valoración y descubre cómo quedaría tu sonrisa ideal antes incluso de empezar. Encuentra tu centro más cercano:"
    }
  }

};

export function getTreatmentDefinition(slug: string): TreatmentDefinition | undefined {
  return treatmentsRegistry[slug];
}