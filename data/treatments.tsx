// Ruta: data/treatments.tsx
import { TreatmentDefinition } from '@/types/treatments';
import { Diamond, ShieldCheck, Smile, Sparkles, Layers } from 'lucide-react'; 
import ShareButton from "@/components/ui/ShareButton";

export const treatmentsRegistry: Record<string, TreatmentDefinition> = {
  
  // 1. BLANQUEAMIENTO DENTAL
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
        subTitle: <><strong>El Tratamiento Estrella:</strong> Es la opción que más recomendamos. Combina el choque rápido y potente de la clínica con el mantenimiento profundo y progresivo en casa.</>,
        points: [
          {
            icon: 'Combinado1',
            text: <><strong className="text-dkv-green-dark font-bold">Sesión Intensiva en Clínica.</strong><br />Aproximadamente una hora activada por luz de plasma o láser.</>
          },
          {
            icon: 'Combinado2',
            text: <><strong className="text-dkv-green-dark font-bold">Toma de Moldes a Medida.</strong><br />Confección de férulas personalizadas para un ajuste perfecto.</>
          },
          {
            icon: 'Combinado3',
            text: <><strong className="text-dkv-green-dark font-bold block">Kit Profesional para Casa.<br />Blanqueamiento Espectacular.</strong>Tono blanco, estable y duradero, a lo largo de los años.</>
          }
        ],
        footerNote: "* Precio por tratamiento combinado completo. Ideal para un blanqueamiento profundo y duradero."
      },
      {
        id: "blanqueamiento-consultorio",
        name: "Blanqueamiento Dental en Consultorio (Plasma o Láser)",
        price: "250 €",
        subTitle: "Ideal si buscas un resultado rápido.",
        points: [
          {
            icon: 'Consultorio1',
            text: <>Sesión de aproximadamente <strong className="text-dkv-green-dark font-bold">una hora.</strong> Rápido y eficaz.</>
          },
          {
            icon: 'Consultorio2',
            text: <><strong className="text-dkv-green-dark font-bold">Protección avanzada.</strong> Aislamiento cuidadoso de encías.</>
          },
          {
            icon: 'Consultorio3',
            text: <><strong className="text-dkv-green-dark font-bold">Gel de alta concentración activado por luz de plasma or láser.</strong> Activación potente.</>
          },
          {
            icon: 'Consultorio4',
            text: <><strong className="text-dkv-green-dark font-bold">Resultado inmediato.</strong> Sonrisa notablemente más blanca el mismo día.</>
          }
        ],
        footerNote: "* Precio por sesión completa. Ideal para un resultado rápido."
      },
      {
        id: "blanqueamiento-domicilio",
        name: "Blanqueamiento con Férulas en Domicilio",
        price: "216 €",
        points: [
          {
            icon: 'Ferulas1',
            text: <><strong className="text-dkv-green-dark font-bold">Suave y progresivo.</strong><br />Blanqueamiento cómodo en tu hogar.</>
          },
          {
            icon: 'Ferulas2',
            text: <><strong className="text-dkv-green-dark font-bold">Férulas a medida.</strong><br />Moldes personalizados para un ajuste perfecto.</>
          },
          {
            icon: 'Ferulas3',
            text: <><strong className="text-dkv-green-dark font-bold">Kit profesional completo.</strong><br />Gel blanqueador incluido.</>
          },
          {
            icon: 'Ferulas4',
            text: <><strong className="text-dkv-green-dark font-bold">Uso nocturno cómodo.</strong><br />Resultados visibles en semanas.</>
          }
        ],
        footerNote: "* Precio por tratamiento completo. Ideal para un blanqueamiento suave y gradual. Excelente para dientes sensibles."
      },
      {
        id: "blanqueamiento-interno",
        name: "Blanqueamiento de Diente No Vital",
        price: "50 €",
        points: [
          {
            icon: 'DienteOscuro',
            text: <><strong className="text-dkv-green-dark font-bold">Diente oscurecido.</strong><br />Tras un fuerte golpe o una endodoncia (matar el nervio).</>
          },
          {
            icon: 'BlanqueamientoInt',
            text: <><strong className="text-dkv-green-dark font-bold">Blanqueamiento interno.</strong><br />Se realiza desde el interior del diente afectado.</>
          },
          {
            icon: 'ColorIgualado',
            text: <><strong className="text-dkv-green-dark font-bold">Color igualado.</strong><br />Para igualar su color con los dientes vecinos sanos.</>
          }
        ],
        footerNote: "* Precio por pieza tratada. Ideal para igualar color tras endodoncia."
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
      },
      {
        id: "carillas-porcelana",
        name: "Carillas Estéticas de Porcelana",
        price: "180 €",
        points: [
          {
            icon: 'Porcelain1',
            text: <><strong className="text-dkv-green-dark font-bold">Estabilidad cromática.</strong><br />Máxima estabilidad, años sin teñirse (no café, tabaco).</>
          },
          {
            icon: 'Porcelain2',
            text: <><strong className="text-dkv-green-dark font-bold">Fabricado individualmente.</strong><br />A medida en laboratorio (no losetas).</>
          },
          {
            icon: 'Porcelain3',
            text: <><strong className="text-dkv-green-dark font-bold">Superficie impermeable.</strong><br />No absorbe café ni tabaco.</>
          }
        ],
        detailedPrices: [
          {
            icon: 'Porcelain4',
            title: 'Carilla de Porcelana Estándar',
            description: '(precio por diente)',
            price: '180 €'
          },
          {
            icon: 'Porcelain5',
            title: 'Suplemento Efectos Especiales',
            description: 'Pintado y texturizado para transparencias.',
            price: '50 €'
          }
        ],
        footerNote: "* Precio por diente. Ideal para pequeñas correcciones de forma o color."
      }
    ],

    premiumBlock: (
      <div id="alta-estetica-digital" className="bg-gradient-to-br from-dkv-green-dark to-[#022A27] rounded-2xl md:rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden mt-16 mb-12 text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#D4AF37] opacity-10 blur-[80px] rounded-full"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Diamond className="w-8 h-8 text-[#D4AF37]" />
            <span className="text-[#D4AF37] font-bold text-sm md:text-base uppercase tracking-[0.2em] font-fsme">Upgrade Premium Exclusivo</span>
          </div>
          
          <h2 className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 md:gap-4 mb-6 text-xl md:text-2xl font-lemon uppercase tracking-wide m-0 text-white">
            <span className="pr-4 mt-1">Alta Estética Digital (DSD)</span>
            <span className="flex items-center gap-3 self-end md:self-auto mt-2 md:mt-0">
              <ShareButton id="alta-estetica-digital" title="Alta Estética Digital (DSD)" />
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
  },

  // 3. INCRUSTACIONES DENTALES 
  'estetica-incrustaciones': {
    slug: 'estetica-incrustaciones',
    activeSubNavId: 'incrustaciones',
    seoTitle: "Incrustaciones Estéticas Dentales | Precios DKV Dentisalud",
    seoDescription: "Salva tu muela dañada con incrustaciones de porcelana a medida sin necesidad de tallarla. Estética, resistencia 100% invisible y tarifas exclusivas DKV.",
    breadcrumbs: [
      { label: "Inicio", href: "/" },
      { label: "Tratamientos", href: "/tratamientos" },
      { label: "Estética Dental", href: "/tratamientos/estetica" },
      { label: "Incrustaciones", href: "#" }
    ],
    hero: {
      badgeText: "Restauración Conservadora",
      title: { dark: "INCRUSTACIONES", normal: "ESTÉTICAS" },
      description: [
        "El objetivo: Salvar una muela muy dañada de forma totalmente estética (sin metales oscuros) y sin tener que rebajarla entera para ponerle una funda o corona.",
        "Fabricamos la parte de tu muela que falta a medida. Es como la pieza de un rompecabezas que encaja y se sella en tu diente para devolverle el 100% de su dureza."
      ]
    },
    intro: {
      badgeText: "¿Cuándo son necesarias?",
      title: "La Alternativa al Empaste Grande",
      description: "Cuando tienes una caries muy grande, se ha roto un trozo importante de muela o hay que cambiar un empaste antiguo de metal (amalgama) muy extenso, pero aún queda pared de diente sano. En lugar de un empaste tradicional (que podría fracturarse al ser tan grande y no soportar la fuerza de la masticación), el laboratorio fabrica un bloque sólido a medida."
    },
    rows: [
      {
        id: "incrustacion-porcelana",
        name: "Incrustación Estética de Porcelana",
        price: "140 €",
        points: [
          {
            icon: 'Incrustacion1',
            text: <><strong className="text-dkv-green-dark font-bold">Reconstrucción Estética.</strong> Restaura la estructura perdida tras caries muy extensas.</>
          },
          {
            icon: 'Incrustacion2',
            text: <><strong className="text-dkv-green-dark font-bold">Indicación.</strong> Recomendado para molares con grandes destrucciones o tratamiento de conducto.</>
          },
          {
            icon: 'Incrustacion3',
            text: <><strong className="text-dkv-green-dark font-bold">Alternativa Conservadora.</strong> Reconstrucción que preserva el diente sano frente a una corona.</>
          }
        ],
        footerNote: "* Precio por incrustación individual. Recomendado tras endodoncia o grandes destrucciones de caries."
      }
    ],
    cta: {
      title: "Planifica tu tratamiento",
      infoNote: "La información reflejada en esta página tiene mero carácter orientativo. Para asegurar que tu muela tiene paredes sanas suficientes para soportar una incrustación (y descartar la necesidad de una corona completa), es imprescindible una evaluación clínica y radiológica.",
      description: "Solicita tu cita de valoración y descubre la forma más conservadora y estética de salvar tus piezas dentales. Encuentra tu clínica más cercana:"
    }
  },

  // 4. PRÓTESIS REMOVIBLES
  'protesis-removibles': {
    slug: 'protesis-removibles',
    activeSubNavId: 'removible',
    seoTitle: "Prótesis Removibles y Dentaduras Postizas | Precios DKV",
    seoDescription: "Aparatos dentales de quita y pon. Prótesis completas, flexibles sin ganchos metálicos y esqueléticos con tarifas exclusivas DKV Dentisalud.",
    breadcrumbs: [
      { label: "Inicio", href: "/" },
      { label: "Tratamientos", href: "/tratamientos" },
      { label: "Prótesis y Rehabilitación", href: "/tratamientos/protesis" },
      { label: "Prótesis Removibles", href: "#" }
    ],
    hero: {
      badgeText: "Aparatos de Quita y Pon",
      title: { dark: "PRÓTESIS", normal: "REMOVIBLES" },
      description: [
        "La solución ideal cuando faltan muchos dientes y no se pueden (o no se desean) colocar implantes ni prótesis fijas.",
        "Te las quitas para dormir y limpiarlas. Diseños modernos y estéticos que te devolverán la confianza."
      ]
    },
    intro: {
      badgeText: "Recupera tu sonrisa",
      title: "Opciones Removibles Modernas",
      description: "La tecnología ha avanzado mucho. Hoy en día disponemos de materiales flexibles y ligeros que hacen que llevar un aparato removible sea mucho más cómodo y estético que antes. Descubre la opción que mejor encaja con tus necesidades."
    },
    rows: [
      {
        id: "completas",
        name: "Prótesis Completa",
        image: "/images/icons/protesis completa2 - hero.png",
        subTitle: <> <strong className="block text-dkv-green-dark/80 mt-1">Para quien no tiene ningún diente.</strong>Recupera la sonrisa completa al instante. Ideal para una <strong className="block text-dkv-green-dark/80 mt-1">rehabilitación total a bajo coste.</strong></>,
        price: "370 €",
        points: [
          {
            icon: 'ProtesisCompleta1',
            text: <><strong className="text-dkv-green-dark font-bold">Rehabilitación Tradicional.</strong><br />La solución de confianza "de toda la vida".</>
          },
          {
            icon: 'ProtesisCompleta5',
            text: <><strong className="text-dkv-green-dark font-bold">Restauración Funcional.</strong><br />Recuperación de la capacidad de masticar.</>
          },
          {
            icon: 'ProtesisCompleta6',
            text: <><strong className="text-dkv-green-dark font-bold">Soporte labial.</strong><br />Devuelve el soporte natural a los labios, reduciendo arrugas peribucales.</>
          },
          {
            icon: 'ProtesisCompleta2',
            text: <><strong className="text-dkv-green-dark font-bold">Ajuste por Succión.</strong><br />Sujeción natural mediante saliva sobre la encía.</>
          },
          {
            icon: 'ProtesisCompleta3',
            text: <><strong className="text-dkv-green-dark font-bold">Fácil Mantenimiento.</strong><br />Material de resina, de fácil higiene diaria.</>
          },
          {
            icon: 'ProtesisCompleta4',
            text: <><strong className="text-dkv-green-dark font-bold block">Consejo de Estabilidad.</strong>Se recomienda el uso de crema fijadora para un mejor fijado.</>
          }
        ],
        detailedPrices: [
          {
            title: 'Prótesis completa Superior ó Inferior',
            description: 'Una arcada.',
            price: '370 €'
          },
          {
            title: 'Prótesis completa Superior + Inferior',
            description: 'Dos arcadas (ambos maxilares).',
            price: '740 €'
          }
        ],
        footerNote: "* Solución tradicional de dentadura de quita y pon."
      },
      {
        id: "flexibles",
        name: "Prótesis Parciales Flexibles",
        image: "/images/icons/protesis flexible hero5.png",
        price: "Desde 477 €",
        points: [
          {
            icon: 'ProtesisFlexible4',
            text: <><strong className="text-dkv-green-dark font-bold">Flexibilidad y comodidad.</strong><br />Material flexible que evita dolorosas rozaduras.</>
          },
          {
            icon: 'ProtesisFlexible5',
            text: <><strong className="text-dkv-green-dark font-bold">Estética superior.</strong><br />Sin ganchos de metal. Resultan casi invisibles cuando sonríes.</>
          }
        ],
        detailedPrices: [
          {
            icon: 'ProtesisFlexible1',
            title: 'De 1 a 4 piezas dentales',
            description: '',
            price: '477 €'
          },
          {
            icon: 'ProtesisFlexible2',
            title: 'De 5 a 6 piezas dentales',
            description: '',
            price: '532 €'
          }, 
          {
            icon: 'ProtesisFlexible3',
            title: 'Más de 7 piezas dentales',
            description: '',
            price: '584 €'
          },
          {
            icon: 'Flexible7',
            title: '',
            description: 'Suplemento resinas hipoarlergénicas',
            price: '48 €'
          }
        ]
      },
      {
        id: "esqueleticas",
        name: "Prótesis Parciales Esqueléticas (Metálicas)",
        image: "/images/icons/protesis parcial esqueletica metalica - hero.png",
        price: "Desde 345 €",
        detailedPrices: [
          {
            icon: 'ProtesisEsqueletica1',
            title: 'De 1 a 4 piezas dentales',
            description: '',
            price: '345 €'
          },
          {
            icon: 'ProtesisEsqueletica2',
            title: 'De 5 a 6 piezas dentales',
            description: '',
            price: '434 €'
          }, 
          {
            icon: 'ProtesisEsqueletica3',
            title: 'De 7 a 8 piezas dentales',
            description: '',
            price: '551 €'
          }, 
          {
            icon: 'ProtesisEsqueletica4',
            title: 'Más de 8 piezas dentales',
            description: '',
            price: '650 €'
          }
        ],
        content: (
          <>
            <p><strong>Para los que quieren saborear la comida.</strong> En lugar de llevar mucho plástico rosa que tapa el paladar, estas prótesis tienen un "esqueleto" de metal muy fino y resistente. Al no tapar el paladar, la comida sabe mejor, ocupan menos espacio en la boca y son extremadamente estables al masticar.</p>
          </>
        )
      },
      {
        id: "acrilicas",
        name: "Prótesis Parciales de Resina (Acrílicas)",
        image: "/images/icons/protesis acrilicas gancho - hero2.png",
        price: "Desde 209 €",
        detailedPrices: [
          {
            icon: 'ProtesisAcrilica1',
            title: 'De 1 a 4 piezas dentales',
            description: '',
            price: '209 €'
          },
          {
            icon: 'ProtesisAcrilica2',
            title: 'De 5 a 6 piezas dentales',
            description: '',
            price: '281 €'
          }, 
          {
            icon: 'ProtesisAcrilica3',
            title: 'Más de 7 piezas dentales',
            description: '',
            price: '353 €'
          }
        ],
        content: (
          <>
            <p><strong>La opción más económica.</strong> Cuando te faltan algunas piezas y buscas salir del paso sin hacer un gran desembolso. Llevan una base de resina rosa (imitando la encía) y unos ganchitos de metal convencionales para agarrarse a tus dientes sanos restantes.</p>
          </>
        )
      },
      {
        id: "suplementos-removibles",
        name: "Mejoras y Personalización de tu Prótesis",
        content: (
          <>
            <p>Porque cada boca es un mundo, te ofrecemos suplementos opcionales para hacer que tu prótesis sea aún más dura, estética o hipoalergénica.</p>
            <div className="bg-dkv-gray-light/30 rounded-2xl p-5 border border-dkv-gray-border mt-4">
              <ul className="space-y-4">
                <li className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-dkv-gray-border/50">
                  <div>
                    <span className="font-bold text-dkv-gray flex items-center gap-2"><Smile className="w-4 h-4 text-dkv-green"/> Suplemento por dientes de porcelana</span>
                    <span className="font-normal text-sm text-dkv-gray/80 block mt-1">Sustituimos los dientes de resina del aparato por cerámica. Ideal si tienes una mordida muy fuerte.</span>
                  </div>
                  <span className="font-lemon text-xl text-dkv-green-dark shrink-0 mt-2 md:mt-0">90 €</span>
                </li>
                <li className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-dkv-gray-border/50">
                  <div>
                    <span className="font-bold text-dkv-gray flex items-center gap-2"><Sparkles className="w-4 h-4 text-dkv-green"/> Suplemento ganchos estéticos (por unidad)</span>
                    <span className="font-normal text-sm text-dkv-gray/80 block mt-1">Cambiamos el gancho de metal gris que sujeta la prótesis por uno transparente o color encía.</span>
                  </div>
                  <span className="font-lemon text-xl text-dkv-green-dark shrink-0 mt-2 md:mt-0">56 €</span>
                </li>
                <li className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-dkv-gray-border/50">
                  <div>
                    <span className="font-bold text-dkv-gray flex items-center gap-2"><Layers className="w-4 h-4 text-dkv-green"/> Ataches de precisión (108 €) / Complejos (120 €)</span>
                    <span className="font-normal text-sm text-dkv-gray/80 block mt-1">"Corchetes" totalmente ocultos. Se usan para enganchar la prótesis de quita y pon a unas fundas fijas sin que se vea absolutamente nada de metal al sonreír.</span>
                  </div>
                  <span className="font-lemon text-xl text-dkv-green-dark shrink-0 mt-2 md:mt-0">Desde 108 €</span>
                </li>
                <li className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div>
                    <span className="font-bold text-dkv-gray flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-dkv-green"/> Metales nobles / seminobles</span>
                    <span className="font-normal text-sm text-dkv-gray/80 block mt-1">Aleaciones exclusivas recomendadas para pacientes con alergias a ciertos metales.</span>
                  </div>
                  <span className="font-lemon text-xl text-dkv-green-dark shrink-0 mt-2 md:mt-0">72 €</span>
                </li>
              </ul>
            </div>
          </>
        )
      }
    ],
    cta: {
      title: "Vuelve a sonreír sin complejos",
      infoNote: "La información reflejada en esta página tiene mero carácter orientativo. Un odontólogo especialista debe estudiar cuántos dientes sanos te quedan y el estado de tu hueso para decidir qué tipo de soporte (esquelético, flexible o resina) te dará mayor estabilidad.",
      description: "Solicita tu cita de valoración en tu clínica más cercana. Diseñaremos un aparato cómodo y a medida para que te olvides de que lo llevas puesto."
    }
  },

  // 5. PRÓTESIS FIJAS
  'protesis-fijas': {
    slug: 'protesis-fijas',
    activeSubNavId: 'fija',
    seoTitle: "Prótesis Fijas y Coronas Dentales | Precios DKV Dentisalud",
    seoDescription: "Dientes artificiales que no se quitan. Coronas de zirconio, puentes de porcelana y restauraciones estéticas con tarifas exclusivas DKV.",
    breadcrumbs: [
      { label: "Inicio", href: "/" },
      { label: "Tratamientos", href: "/tratamientos" },
      { label: "Prótesis y Rehabilitación", href: "/tratamientos/protesis" },
      { label: "Prótesis Fijas", href: "#" }
    ],
    hero: {
      badgeText: "Dientes que no se quitan",
      title: { dark: "PRÓTESIS", normal: "FIJAS" },
      description: [
        "Dientes artificiales pegados firmemente a tus propios dientes naturales previamente limados, o a raíces muy dañadas.",
        "No te los tienes que quitar nunca; los cepillas y los sientes como si fueran tuyos."
      ]
    },
    rows: [
      {
        id: "alta-estetica",
        name: "Coronas y Puentes de Alta Estética (Sin metal)",
        image: "/images/icons/protesis fija corona estetica - hero.png",
        price: "Desde 299 €",
        content: (
          <>
            <p className="mb-3"><strong>Motivo:</strong> El diente dañado está en una zona visible y quieres que nadie note que es falso.</p>
            <p><strong>Cómo se hace:</strong> Tallamos un poco tu diente, tomamos medidas exactas y el laboratorio crea una funda o "corona" que encaja a la perfección, imitando la luz y textura natural.</p>
          </>
        ),
        detailedPrices: [
          {
            icon: 'Sparkles',
            title: "Corona de cerámica sin metal",
            description: "Deja pasar la luz natural, ideal para dientes frontales.",
            price: "299 €"
          },
          {
            icon: 'Diamond',
            title: "Corona o puente fijo de Zirconio",
            description: "El material más duro y blanco del mercado. No oscurece la encía con el tiempo.",
            price: "325 €"
          }
        ]
      },
      {
        id: "clasicas-metal",
        name: "Coronas y Puentes Clásicos (Con base de metal)",
        image: "/images/icons/protesis fija corona clasica - hero.png",
        price: "Desde 100 €",
        content: (
          <p><strong>Motivo:</strong> Buscas máxima resistencia para masticar en las muelas del fondo, o tienes un presupuesto más ajustado y la estética perfecta no es tu máxima prioridad.</p>
        ),
        detailedPrices: [
          {
            title: "Corona o puente de metal noble/seminoble con porcelana",
            description: "Interior de metal para soportar fuerza extrema, y exterior recubierto de porcelana blanca.",
            price: "210 €"
          },
          {
            title: "Corona o puente metal-resina",
            description: "Más económico. Exterior cubierto de resina estética en lugar de cerámica.",
            price: "144 €"
          },
          {
            title: "Corona o puente colada de metal",
            description: "Totalmente metálicas. Usadas solo en casos muy específicos o muelas muy escondidas.",
            price: "100 €"
          }
        ]
      },
      {
        id: "incrustaciones",
        name: "Incrustaciones",
        image: "/images/icons/incrustacion - hero.png",
        price: "Desde 65 €",
        subTitle: <> Cuando un empaste sería demasiado grande y se caería, el labrotario fabrica el "trozo de muela" exacto que te falta y nosotros lo encajamos como la pieza de un puzle.</>,
        points: [
          {
            icon: 'Incrustacion1',
            text: <><strong className="text-dkv-green-dark font-bold">Reconstrucción Estética.</strong> Restaura la estructura perdida tras caries muy extensas.</>
          },
          {
            icon: 'Incrustacion2',
            text: <><strong className="text-dkv-green-dark font-bold">Indicación.</strong> Recomendado para molares con grandes destrucciones o tratamiento de conducto.</>
          },
          {
            icon: 'Incrustacion3',
            text: <><strong className="text-dkv-green-dark font-bold">Alternativa Conservadora.</strong> Reconstrucción que preserva el diente sano frente a una corona.</>
          }
        ],
        detailedPrices: [
          {
            title: "Incrustación de resina.",
            description: "",
            price: "65 €"
          },
          {
            title: "Incrustación de composite",
            description: "",
            price: "72 €"
          },
          {
            title: "Incrustación estética de porcelana.",
            description: "Resistencia extrema.",
            price: "140 €"
          }
        ],
        footerNote: "* Precio por incrustación individual. Recomendado tras endodoncia o grandes destrucciones de caries."
      },
      {
        id: "restauracion-con-raiz",
        name: "Muñon colado",
        image: "/images/icons/munon colado - hero.png",
        price: "65 €",
        content: (
          <>
            <p className="mb-3"><strong>Motivo:</strong> Cuando se logra salvar tu raíz natural pero el resto del diente no es suficiente para tallar la base de la corona.</p>
            <p><strong>Cómo se hace:</strong> Fabricamos un "pilar" a medida que va inserto en la raíz para pegar encima la corona.</p>
          </>
        )
      },
      {
        id: "suplementos-fijos",
        name: "Suplementos Especiales y Refuerzos",
        content: (
          <p>Técnicas avanzadas para dar soporte o evitar dañar piezas sanas en casos concretos.</p>
        ),
        detailedPrices: [
          {
            title: "Puente tipo Maryland",
            description: "Un suplemento para pegar un diente falso apoyándose en la parte trasera de los dientes vecinos mediante unas \"aletas\", sin tener que limarlos apenas.",
            price: "70 €"
          },
          {
            title: "Barra de Ackerman",
            description: "Una barra de metal que une varias raíces o implantes para dar muchísima firmeza a una prótesis.",
            price: "70 €"
          }
        ]
      }
    ],
    cta: {
      title: "Planifica tu tratamiento",
      infoNote: "La información reflejada en esta página tiene mero carácter orientativo. Para asegurar qué tipo de corona (zirconio vs metal-cerámica) requiere tu caso o si podemos salvar tu raíz con una incrustación, es imprescindible una valoración clínica.",
      description: "Solicita tu cita de valoración en tu clínica más cercana. Analizaremos tu boca y te ofreceremos la solución fija más resistente y estética para ti."
    }
  },

  // 6. OCLUSIÓN Y BRUXISMO (NUEVA SECCIÓN v2)
  'protesis-bruxismo': {
    slug: 'protesis-bruxismo',
    activeSubNavId: 'bruxismo',
    seoTitle: "Oclusión y Férulas de Bruxismo | Precios DKV Dentisalud",
    seoDescription: "Protege tus dientes y articulación del desgaste nocturno. Férulas de descarga a medida y rehabilitación oclusal con tarifas exclusivas DKV.",
    breadcrumbs: [
      { label: "Inicio", href: "/" },
      { label: "Tratamientos", href: "/tratamientos" },
      { label: "Prótesis y Rehabilitación", href: "/tratamientos/protesis" },
      { label: "Oclusión y Bruxismo", href: "#" }
    ],
    hero: {
      badgeText: "Protección Articular y Dental",
      title: { dark: "OCLUSIÓN Y", normal: "BRUXISMO" },
      description: [
        "Si aprietas o rechinas los dientes por la noche (bruxismo), acabarás rompiendo tus dientes naturales, tus empastes y sufriendo dolores de cabeza y cuello.",
        "Protege tu sonrisa y tu articulación mandibular con nuestras férulas y tratamientos de rehabilitación."
      ]
    },
    intro: {
      badgeText: "Tu Escudo Protector",
      title: "Férulas de Descarga a Medida",
      description: "La solución más rápida y efectiva contra el desgaste dental nocturno. Un protector duro y fabricado a la medida exacta de tu boca que relaja la musculatura y absorbe toda la fuerza de la mandíbula mientras duermes."
    },
    rows: [
      {
        id: "ferulas",
        name: "Férulas de Descarga y Protección",
        image: "/images/icons/ferula descarga - hero.png",
        subTitle: <> Permite que tu mandíbula resbale libremente, "desprogramando" el hábito de apretar.</>,
        price: "Desde 108 €",
        points: [
          {
            icon: 'BruxismoFerula1',
            text: <><strong className="text-dkv-green-dark font-bold">Frenar Desgaste Dental.</strong> Protege tus dientes del destaste por bruxismo.</>
          },
          {
            icon: 'BruxismoFerula2',
            text: <><strong className="text-dkv-green-dark font-bold">Relajación Muscular.</strong> Alivia la tensión en la mandíbula y el cuello.</>
          },
          {
            icon: 'BruxismoFerula3',
            text: <><strong className="text-dkv-green-dark font-bold">Tratamiento Articular (ATM).</strong> Diseñada para problemas graves de ATM.</>
          },
          {
            icon: 'BruxismoFerula4',
            text: <><strong className="text-dkv-green-dark font-bold">Alivio de Sintomatología.</strong> Solucion para ruidos, dolores córniocos y bloqueos.</>
          }
        ],

        detailedPrices: [
          {
            title: "Férula de descarga simple",
            description: "Estándar para frenar el desgaste de los dientes y relajar la musculatura de la mandíbula y el cuello.",
            price: "108 €"
          },
          {
            title: "Férula compleja (Patología articular)",
            description: "Especial y más gruesa. Diseñada para pacientes que ya tienen problemas graves en la articulación (ATM): Ruidos al abrir la boca, dolores crónicos o bloqueos.",
            price: "217 €"
          },
          {
            title: "Revisión y ajuste de férula",
            description: "Al recibir el impacto que soportaban tus dientes es fundamental revisar en consulta periódicamente la férula para asegurar que sigue protegiendo tu articulación.",
            price: "25 €"
          }

        ]
      },
      {
        id: "estudios-oclusales",
        name: "Estudios de ATM y Rehabilitación",
        subTitle: " ",


        subTitle: <><strong>Devuelve el equilibrio neromuscular a tu rostro. </strong> Diagnóstico Avanzado mediante pruebas de alta precisión: Cuando el bruxismo ha causado dolores severos o asimetrías, necesitamos medir exactamente cómo se mueve tu mandíbula para diseñar tu mejor solución.</>,




/* *****************
        content: (
          <p>Pruebas de alta precisión para trazar el mapa de tus movimientos mandibulares y diseñar una solución que devuelva el equilibrio neuromuscular a tu rostro.</p>
        ),
********* */
        detailedPrices: [
          {
            /* icon: 'Zap', */
            title: "Axiografía y pruebas diagnósticas",
            description: "Estudio informatizado o mecánico del trazado exacto de los movimientos de tus cóndilos (articulación).",
            price: "180 €"
          },
          {
            /* icon: 'CheckCircle2', */
            title: "Sesión de rehabilitación neuro-oclusal",
            description: "Tratamiento en clínica para corregir las interferencias y aliviar las tensiones musculares.",
            price: "72 €"
          }
        ]
      },
      {
        id: "servicios-incluidos",
        name: "Procedimientos y Ajustes Incluidos",
        price: "Incluido (0 €)",
        content: (
          <p>Como parte de nuestro compromiso con la correcta función de tu boca, muchos de los procedimientos preparatorios y de ajuste de la mordida no tienen ningún coste para nuestros pacientes asegurados.</p>
        ),
        list: [
          {
            /* icon: 'CheckCircle2', */
            text: <><strong>Análisis Oclusal:</strong> Toma de modelos y evaluación de tu mordida en articulador.</>
          },
          {
            /* icon: 'CheckCircle2', */
            text: <><strong>Tallado Selectivo:</strong> Pequeños pulidos en el esmalte para eliminar puntos que chocan mal y desvían la mandíbula.</>
          },
          {
            /* icon: 'CheckCircle2', */
            text: <><strong>Retirar prótesis antiguas:</strong> Retirada de coronas o puentes viejos que estén causando mala mordida.</>
          }
        ]
      }
    ],

    cta: {
      title: "No dejes que el estrés rompa tus dientes",
      infoNote: "El bruxismo es una acción involuntaria. Si te levantas con dolor de cabeza, tensión en las cervicales o notas tus dientes más cortos y planos, necesitas una férula de descarga cuanto antes para frenar el daño.",
      description: "Solicita tu cita de valoración en tu clínica más cercana. Revisaremos tu articulación y te fabricaremos un escudo protector a medida."
    }
  }

};

export function getTreatmentDefinition(slug: string): TreatmentDefinition | undefined {
  return treatmentsRegistry[slug];
}