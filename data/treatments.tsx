// Ruta: data/treatments.tsx
import { TreatmentDefinition } from '@/types/treatments';
import { Diamond, ShieldCheck, Smile, Sparkles, Layers, Settings, Activity, Wind, CheckCircle2, AlertCircle, Info, Bug, HeartPulse, Stethoscope, Microscope, RefreshCcw, Scissors, Moon, Heart, Zap, Baby, ShieldAlert, ArrowLeftRight, ClipboardList, Scan, Brain, Paintbrush, BookOpen, Ruler, Droplet, CalendarCheck, ShieldPlus, Link as LinkIcon, MoveUp } from 'lucide-react'; 
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
        "Elimina manchas de café, tabaco o la edad sin dañar tu esmalte. Una sonrisa más joven y brillante en un tratamiento rápido y 100% seguro."
      ]
    },
/*
    intro: {
      badgeText: "¿Cuándo es necesario?",
      title: "Devuelve el Blanco Natural a tus Dientes",
      description: "Cuando sientes que tus dientes han perdido su blanco natural o están amarillentos, pero estás contento con su forma y posición. También es la solución ideal cuando un diente se ha oscurecido tras matar el nervio (endodoncia). El tratamiento se puede activar con luz en la clínica o aplicar gradualmente en casa."
    },
*/
    rows: [

      {
        id: "blanqueamiento-consultorio",
        name: "Blanqueamiento en Clínica",
        /* price: "250 €", */
        subTitle: "El tratamiento ideal si buscas resultados casi inmediatos.",
        points: [
          {
            icon: 'Consultorio1',
            text: <>Sesión aproximada de <strong className="text-dkv-green-dark font-bold">una hora.</strong> Rápido y eficaz.</>
          },
          {
            icon: 'Consultorio2',
            text: <><strong className="text-dkv-green-dark font-bold">Protección avanzada.</strong> Aislamiento cuidadoso de encías.</>
          },
          {
            icon: 'Consultorio3',
            text: <><strong className="text-dkv-green-dark font-bold">Gel de alta concentración activado por luz de plasma o láser.</strong> Activación potente.</>
          },
          {
            icon: 'Consultorio4',
            text: <><strong className="text-dkv-green-dark font-bold">Resultado inmediato.</strong> Sonrisa notablemente más blanca el mismo día.</>
          }
        ],
        detailedPrices: [
          {
            icon: '',
            title: 'Blanqueamiento en consultorio',
            description: 'Tratamiento intensivo bajo supervisión para un aclarado rápido de color',
            price: '250 €'
          },
        ],
        footerNote: "* Precio por sesión."
      },
      {
        id: "blanqueamiento-domicilio",
        name: "Blanqueamiento con férulas (en casa)",
        /* price: "216 €", */
        subTitle: "Perfecto para dientes sensibles. Un aclarado de color cómodo y respetuoso.",
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
        detailedPrices: [
          {
            icon: '',
            title: 'Blanqueamiento en domicilio',
            description: 'Sistema gradual con férulas nocturnas adaptadas.',
            price: '216 €'
          },
        ],
        footerNote: "* Precio por tratamiento completo."
      },

      {
        id: "blanqueamiento-combinado",
        name: "Blanqueamiento Combinado",
        /* price: "300 €", */
/*
        subTitle: <><strong>El estándar médico de oro. </strong> El blanco más profundo y estable para tu sonrisa.</>,
*/
        subTitle: <>Choque rápido en la clínica + mantenimiento en casa. El estándar de oro médico para un blanco más profundo y duradero.</>,

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
        detailedPrices: [
          {
            icon: '',
            title: 'Blanqueamiento combinado.',
            description: 'Enérgico en clíncia + estabilización en casa.',
            price: '300 €'
          },
        ],

        footerNote: "* Precio por tratamiento combinado completo."
      },
      {
        id: "blanqueamiento-interno",
        name: "Blanqueamiento Interno (Dientes oscuros)",
        subTitle: <>Devuelve la luz a un diente oscurecido tras un golpe o una endodoncia.</>,
        points: [
          {
            icon: 'DienteOscuro',
            text: <><strong className="text-dkv-green-dark font-bold">Diente oscurecido.</strong><br />Tras un fuerte golpe o una endodoncia.</>
          },
          {
            icon: 'BlanqueamientoInt',
            text: <><strong className="text-dkv-green-dark font-bold">Blanqueamiento interno.</strong><br />Se realiza desde el interior del diente.</>
          },
          {
            icon: 'ColorIgualado',
            text: <><strong className="text-dkv-green-dark font-bold">Color igualado.</strong><br />Para igualar su color con los dientes vecinos sanos.</>
          }
        ],
        detailedPrices: [
          {
            icon: '',
            title: 'Blanqueamiento no vital.',
            description: 'Focalizado para recuperar el tono de un diente oscurecido.',
            price: '50 €'
          },
        ],
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
      badgeText: "Diseña tu sonrisa",
      title: { dark: "CARILLAS", normal: "DENTALES" },
      description: [
        "Mejora la estética de tus dientes, cierra espacios y consigue una sonrisa armónica."
      ]
    },
/*
    intro: {
      badgeText: "Tratamientos Base",
      title: "Opción Básica y Tradicional",
      description: "Soluciones rápidas y efectivas disponibles en todas nuestras clínicas para mejorar la estética de tus dientes frontales de forma económica."
    },
*/

    rows: [
      {
        id: "carillas-composite",
        name: "Carillas de composite (resina)",
        /* price: "75 €", */
        subTitle: <> Esculpidas a mano directamente sobre tu diente en una sola sesión. Ideales para pequeñas correcciones, fracturas o presupuestos ajustados.</>,
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

        detailedPrices: [
          {
            icon: '',
            title: 'Carilla de composite.',
            description: 'Reconstrucción estética modelada directamente en clínica.',
            price: '75 €'
          },
        ],


        footerNote: "* Precio por pieza tratada."
      },
      {
        id: "carillas-porcelana",
        name: "Carillas de Porcelana (Alta Estética)",
        /* price: "180 €", */
        subTitle: <> Fabricadas en laboratorio a medida. Aportan una naturalidad insuperable, no pierden su brillo y jamás se tiñen con el café o el tabaco.</>,
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
            title: 'Carilla de Porcelana',
            description: 'Lámina cerámica de alta resistencia fabricada a medida. (Precio por diente).',
            price: '180 €'
          },
          {
            icon: 'Porcelain5',
            title: 'Suplemento Efecto Especial Carilla Porcelana',
            description: 'Pintado y texturizado para recrear transparencias naturales.',
            price: <span className="text-dkv-green">+ 50 €</span>
          }
        ]
        /* footerNote: "* Precio por diente." */
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
                <span className="font-bold text-white">Informe presentation del estudio <span className="font-normal block text-sm text-white/70">Te llevas tu proyecto a casa.</span></span>
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
        "Salva tu muela sin necesidad de una corona (funda). Reponemos solo la parte dañada con una pieza a medida que devuelve el 100% de la fuerza y estética natural."      ]
    },
/*
    intro: {
      badgeText: "¿Cuándo son necesarias?",
      title: "La Alternativa al Empaste Grande",
      description: "Cuando tienes una caries muy grande, se ha roto un trozo importante de muela o hay que cambiar un empaste antiguo de metal (amalgama) muy extenso, pero aún queda pared de diente sano. En lugar de un empaste tradicional (que podría fracturarse al ser tan grande y no soportar la fuerza de la masticación), el laboratorio fabrica un bloque sólido a medida."
    },
*/
    rows: [
      {
        id: "incrustacion-porcelana",
        name: "Incrustación Estética de Porcelana (Alta Resistencia)",
        /* price: "140 €", */
        subTitle: <> La opción más estética y duradera. Ideal para molares que soportan mucha fuerza al masticar o tras una endodoncia.</>,
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
            icon: '',
            title: 'Incrustación de porcelana.',
            description: 'Bloque cerámico fabricado a medida en laboratorio para restaurar el diente.',
            price: '140 €'
          }
        ],

        footerNote: "* Precio por incrustación individual."
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
/*
    intro: {
      badgeText: "Recupera tu sonrisa",
      title: "Opciones Removibles Modernas",
      description: "La tecnología ha avanzado mucho. Hoy en día disponemos de materiales flexibles y ligeros que hacen que llevar un aparato removible sea mucho más cómodo y estético que antes. Descubre la option que mejor encaja con tus necesidades."
    },
*/
    rows: [
      {
        id: "completas",
        name: "Prótesis Removible Completa",
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
            text: <><strong className="text-dkv-green-dark font-bold">Soporte labial.</strong><br />Devuelve el soporte natural a los labios, reduciendo arrugas peribucales.</>
          },
          {
            icon: 'ProtesisCompleta6',
            text: <><strong className="text-dkv-green-dark font-bold">Restauración Funcional.</strong><br />Recuperación de la capacidad de masticar.</>
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
        footerNote: "* Solución tradicional de dentadura de quita y pon. Precio por maxilar o arcada."
      },
      {
        id: "flexibles",
        name: "Prótesis Parciales Flexibles",
        image: "/images/icons/protesis flexible hero5.png",
        price: "Desde 477 €",
        subTitle: "Flexibilidad y comodidad.",
        points: [
          {
            icon: 'ProtesisFlexible4',
            text: <><strong className="text-dkv-green-dark font-bold">Material flexible </strong><br /> que evita dolorosas rozaduras.</>
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
            icon: '',
            title: '',
            description: 'Suplemento resinas hipoarlergénicas',
            price: <span className="text-dkv-green">+ 48 €</span>
          }
        ]
      },
      {
        id: "esqueleticas",
        name: "Prótesis Parciales Esqueléticas (Metálicas)",
        image: "/images/icons/protesis parcial esqueletica metalica - hero.png",
        price: "Desde 345 €",
        subTitle: "Mejor sentido del gusto.",
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

        points: [
          {
            icon: '',
            text: <><strong>Para los que quieren saborear la comida.</strong> En lugar de llevar mucho plástico rosa que tapa el paladar, estas prótesis tienen un "esqueleto" de metal muy fino y resistente. Al no tapar el paladar, la comida sabe mejor, ocupan menos espacio en la boca y son extremadamente estables al masticar.</>
          }
        ]

      },
      {
        id: "acrilicas",
        name: "Prótesis Parciales de Resina (Acrílicas)",
        image: "/images/icons/protesis acrilicas gancho - hero2.png",
        price: "Desde 209 €",
        subTitle: "La opción más económica.",
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

        points: [
          {
            icon: '',
            text: <>Cuando te faltan algunas piezas y buscas salir del paso <strong>sin hacer un gran desembolso</strong>. Llevan una base de resina rosa (imitando la encía) y unos ganchitos de metal convencionales para agarrarse a tus dientes sanos restantes.</>
          }
        ]


      },
      {
        id: "suplementos-removibles",
        name: "Mejoras, Arreglos y Personalización de tu Prótesis",
        subTitle: "Añadiendo los extras.",

        priceGroups: [
          {
            title: "Suplementos",
            description: "",
            items: [
              { icon: '',
                title: "Ganchos Estéticos", 
                description: "Por unidad. Sustituimos el gancho de metal gris que sujeta la prótesis por uno transparente o color encía.", 
                price: <span className="text-dkv-green">+ 56 €</span>},
              { icon: '',
                title: "Metales Nobles / Seminobles", 
                description: "Aleaciones exclusivas recomendadas para pacientes con alergias a ciertos metales.", 
                price: <span className="text-dkv-green">+ 72 €</span>},
              { icon: '',
                title: "Dientes de Porcelana", 
                description: "Sustituimos los dientes de resina del aparato por cerámica. Ideal si tienes una mordida muy fuerte.", 
                price: <span className="text-dkv-green">+ 90 €</span>}
            ]
          },
          {
            title: "Ataches-aditamentos",
            description: "Son 'corchetes' totalmente ocultos. Se usan para enganchar la prótesis de quita y pon a unas fundas fijas sin que se vea absolutamente nada de metal al sonreir.",
            items: [
              { icon: '',
title: "De precisión simple", description: "", price: "108 €" },
              { icon: '',
title: "De precisión compleja", description: "", price: "120 €" }
            ]
          },

          {
            title: "Arreglos",
            description: "Cuando un aparato se parte, pierde un gancho o cuando necesitas añadirle un diente nuevo a tu prótesis actual.",
            items: [
              { icon: '',
                title: "Añadir una pieza o gancho al aparato",
                description: "Si pierdes un diente natural más, o se rompe una sujeción, se lo añadimos a la prótesis que ya tienes.",
                price: "49 €"
              },
              { icon: '',
                title: "Compostura en aparato partido de resina",
                description: "Para cuando el aparato de resina acrílica sufre un golpe (típica caída al lavabo al limpiarlo) y se parte.",
                price: "43 €"
              },
              { icon: '',
                title: "Otras composturas",
                description: "Ajustes estructurales menores en laboratorio.",
                price: "36 €"
              }
            ]
          },

          {
            title: "Rebases",
            description: "Con el tiempo, al no haber raíces, tu hueso y tu encía merman (se encogen). Como resultado, un aparato que antes encajaba perfecto, ahora empieza a 'bailar'. El rebase consiste en rellenar la prótesis por dentro con resina nueva para que vuelva a encajar como un guante.",
            items: [
              { icon: '',
                title: "Rebase en consulta",
                description: "Método rápido realizado en el propio sillón dental con resinas autopolimerizables.",
                price: "50 €"
              },
              { icon: '',
                title: "Rebase en laboratorio",
                description: "Más resistente y duradero. Se toman medidas y se realiza un relleno con resina termopolimerizada de alta densidad.",
                price: "65 €"
              },
              { icon: '',
                title: "Compostura de rebases",
                description: "Para ajustes mayores o reestructuraciones completas del lecho de la prótesis.",
                price: "70 €"
              }
            ]
          }

        ],

        points: [
          {
            icon: '',
            text: <>Porque cada boca es un mundo, te ofrecemos suplementos opcionales para hacer que tu prótesis sea aún más dura, estética o hipoalergénica.</>
          }
        ]

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
        subTitle: "Mejor aspecto.",

        points: [
          {
            icon: '',
            text: <><strong>Motivo:</strong> El diente dañado está en una zona visible y quieres que nadie note que es falso.</>
          },
          {
            icon: '',
            text: <><strong>Cómo se hace:</strong> Tallamos un poco tu diente, tomamos medidas exactas y el laboratorio crea una funda o "corona" que encaja a la perfección, imitando la luz y textura natural.</>
          }
        ],


        priceGroups: [
          {
            title: "Sin metal",
            description: "",
            items: [
              { icon: '',
                title: "Corona de cerámica", 
                description: "Deja pasar la luz natural, ideal para dientes frontales.", 
                price: "299 €" },
              { icon: '',
                title: "Corona o Puente de Zirconio", 
                description: "El material más duro y blanco del mercado. No oscurece la encía con el tiempo.", 
                price: "325 €"}
            ]
          }
        ]

      },
      {
        id: "clasicas-metal",
        name: "Coronas y Puentes Clásicos (Con base de metal)",
        image: "/images/icons/protesis fija corona clasica - hero.png",
        price: "Desde 100 €",
        subTitle: "Relación calidad / precio óptima.",
        points: [
          {
            icon: '',
            text: <><strong>Motivo:</strong> Buscas máxima resistencia para masticar en las muelas del fondo, o tienes un presupuesto más ajustado y la estética perfecta no es tu máxima prioridad.</>
          }
        ],

        detailedPrices: [
          {
            title: "Corona o puente de metal con porcelana",
            description: "Interior de metal noble / seminoble para soportar fuerza extrema, y exterior recubierto de porcelana blanca.",
            price: "210 €"
          },
          {
            title: "Corona o puente de metal con resina",
            description: "Más económico. Exterior cubierto de resina estética en lugar de cerámica.",
            price: "144 €"
          },
          {
            title: "Corona o puente de metal",
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
        subTitle: "El esqueleto.",

        points: [
          {
            icon: '',
            text: <><strong>Motivo:</strong> Cuando se logra salvar tu raíz natural pero el resto del diente no es suficiente para tallar la base de la corona.</>
          },
          {
            icon: '',
            text: <><strong>Cómo se hace:</strong> Fabricamos un "pilar" a medida que va inserto en la raíz para pegar encima la corona.</>
          }
        ],

      },
      {
        id: "suplementos-fijos",
        name: "Suplementos Especiales y Refuerzos",
        subTitle: "Técnicas avanzadas.",
        points: [
          {
            icon: '',
            text: <>Dar soporte o evitar dañar piezas sanas en casos concretos.</>
          }
        ],

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
      },
      {
        id: "reparacion-fija",
        name: "Ajustes y Reparaciones de Prótesis Fijas",
        subTitle: "Taller.",
        points: [
          {
            icon: '',
            text: <>Soluciones para coronas y puentes que han sufrido una fractura estética o que simplemente necesitan ser vueltos a cementar.</>
          }
        ],


        priceGroups: [
          {
            title: "Cementación de coronas y puentes caídos",
            description: "",
            items: [
              { icon: '',
                title: "", 
                description: "Si se te ha despegado una funda que está en buen estado, te la volvemos a pegar con un cemento especial de alta resistencia.", 
                price: "22 €"}
            ]
          },
          {
            title: "Soldar metal",
            description: "",
            items: [
              { icon: '',
                title: "", 
                description: "Para puentes o esqueléticos que han sufrido una fractura en su estructura interna.", 
                price: "36 €"}
            ]
          },
          {
            title: "Reparaciones de facetas estéticas",
            description: "Si se te ha 'desconchado' la capa blanca visible de una corona, la reparamos sin tener que cambiarla entera.",
            items: [
              { icon: '',
                title: "Faceta de Resina", 
                description: "", 
                price: "43 €"},
              { icon: '',
                title: "Faceta de Porcelana", 
                description: "", 
                price: "45 €"},
              { icon: '',
                title: "Faceta de Cerámica", 
                description: "", 
                price: "50 €"}
            ]
          },
          {
            title: "Ajustes oclusales",
            description: "En prótesis ya colocadas.",
            items: [
              { icon: '',
                title: "", 
                description: "Ligeros pulidos si notas que la corona choca de forma extraña al morder.", 
                price: "Incluido"}
            ]
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

  // 6. OCLUSIÓN Y BRUXISMO
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
/*
    intro: {
      badgeText: "Tu Escudo Protector",
      title: "Férulas de Descarga a Medida",
      description: "Protector fabricado a la medida exacta de tu boca que absorbe toda la fuerza de la mandíbula mientras duermes."
    },
*/
    rows: [
      {
        id: "ferulas",
        name: "Férulas de Descarga y Protección",
        image: "/images/icons/ferula descarga - hero.png",
        subTitle: <> Fabricada a medida exacta, permite que tu mandíbula resbale libremente, "desprogramando" el hábito de apretar y minimizando el desgaste dental nocturno.</>,
        price: "Desde 108 €",
        points: [
          {
            icon: 'BruxismoFerula1',
            text: <><strong className="text-dkv-green-dark font-bold">Frenar Desgaste Dental.</strong> Protege tus dientes del desgaste por bruxismo.</>
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

        priceGroups: [
          {
            title: "Férulas",
            description: "",
            items: [
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
            ]
          },

          {
            title: "Preparación",
            description: "",
            items: [
              {
                title: "Análisis Oclusal",
                description: "Toma de modelos y evaluación de tu mordida en articulador.",
                price: "Incluido"
              },
              {
                title: "Retirar Prótesis Antiguas",
                description: "Retirada de coronas o puentes viejos que estén causando mala mordida.",
                price: "Incluido"
              }

            ]
          },


          {
            title: "Revisiones Periódicas",
            description: "",
            items: [
              {
                title: "Ajuste de férula",
                description: "Al recibir el impacto que soportaban tus dientes es fundamental revisar en consulta periódicamente la férula para asegurar que sigue protegiendo tu articulación.",
                price: "25 €"
              },
              {
                title: "Tallado selectivo",
                description: "Pequeños pulidos en el esmalte para eliminar puntos que chocan mal y desvían la mandíbula.",
                price: "Incluido"
              }

            ]
          }

        ]



      },
      {
        id: "estudios-oclusales",
        name: "Estudios de ATM y Rehabilitación",
        subTitle: <><strong>Devuelve el equilibrio neromuscular a tu rostro. </strong> Diagnóstico Avanzado mediante pruebas de alta precisión: Cuando el bruxismo ha causado dolores severos o asimetrías, necesitamos medir exactamente cómo se mueve tu mandíbula para diseñar tu mejor solución.</>,

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
      }
    ],

    cta: {
      title: "No dejes que el estrés rompa tus dientes",
      infoNote: "El bruxismo es una acción involuntaria. Si te levantas con dolor de cabeza, tensión en las cervicales o notas tus dientes más cortos y planos, necesitas una férula de descarga cuanto antes para frenar el daño.",
      description: "Solicita tu cita de valoración en tu clínica más cercana. Revisaremos tu articulación y te fabricaremos un escudo protector a medida."
    }
  },

  // 7. ORTODONCIA METÁLICA
  'ortodoncia-metalica': {
    slug: 'ortodoncia-metalica',
    activeSubNavId: 'lingual', 
    seoTitle: "Ortodoncia Fija Metálica | Precios Cerrados DKV Dentisalud",
    seoDescription: "Tratamientos de ortodoncia metálica convencional y autoligable. Eficacia probada y durabilidad con precios exclusivos para asegurados DKV.",
    breadcrumbs: [
      { label: "Inicio", href: "/" },
      { label: "Tratamientos", href: "/tratamientos" },
      { label: "Ortodoncia", href: "/tratamientos/ortodoncia" },
      { label: "Metálica", href: "#" }
    ],
    hero: {
      badgeText: "Ortodoncia Tradicional",
      title: { dark: "ORTODONCIA FIJA", normal: "METÁLICA" },
      description: [
        "El sistema más robusto y de eficacia probada. Perfecto para corregir cualquier tipo de maloclusión garantizando la máxima durabilidad."
      ]
    },
    rows: [
      {
        id: "brackets-metalicos-convencionales",
        name: "Brackets Metálicos Convencionales",
        image: "/images/tratamientos/ortodoncia-brackets-metalico-standard.png",
        secondaryImage: "/images/tratamientos/ortodoncia-brackets-metalico-standard-un-diente.png",
        subTitle: "El sistema tradicional, más robusto y económico. ",

        points: [
          {
            icon: '',
            text: <>Perfecto para corregir cualquier tipo de maloclusión, muy utilizado en adolescentes por su durabilidad.
</>
          }
        ],


/*
        detailedPrices: [
          {
            title: "Aparato por maxilar",
            price: "298 €"
          }
        ],
*/

        priceGroups: [
          {
            title: "",
            description: "",
            items: [
              { icon: '',
title: "Aparato", description: "(por maxilar)", price: "298 €" }
            ]
          },
          {
            title: "Tratamientos asociados",
            description: "",
            items: [
              { icon: '',
title: "Visita de revision", description: "(suele ser mensual)", price: "30 €" },
              { icon: '',
title: "Reposición de bracket", description: "(por pieza estropeada)", price: "20 €"}
            ]
          }
        ]


        /* footerNote: "Tratamientos asociados: Visitas de revisión (30€) y reposición de bracket (20€)." */
      },
      {
        id: "brackets-metalicos-autoligables",
        name: "Brackets Metálicos Autoligables",
        image: "/images/tratamientos/ortodoncia-brackets-metalico-autoligable.png",
        secondaryImage: "/images/tratamientos/ortodoncia-brackets-metalico-autoligable-un-diente.png",
        subTitle: "Evolución tecnológica del bracket metálico tradicional que prescinde de ataduras. ",


        points: [
          {
            icon: '',
            text: <><strong>Por qué elegirlo:</strong> Poseen una pequeña "compuerta" que sujeta el arco, eliminando las gomitas elásticas. Esto reduce la fricción, aplica fuerzas más biológicas y facilita enormemente el cepillado diario.
</>
          },
        ],



/*
        detailedPrices: [
          {
            title: "Aparato por maxilar",
            price: "298 €"
          },
          {
            title: "Suplemento autoligable (por maxilar)",
            price: <span className="text-dkv-green">+ 140 €</span>
          }
        ]
*/

        priceGroups: [
          {
            title: "Desglose Técnica Autoligable",
            description: "",
            items: [
              { icon: '',
title: "Aparato base", description: "(por maxilar)", price: "298 €" },
              { icon: '',
title: "Suplemento Autoligable", description: "(por maxilar)", price: <span className="text-dkv-green">+ 140 €</span>}
            ]
          },
          {
            title: "Tratamientos asociados",
            description: "",
            items: [
              { icon: '',
title: "Visita de revision", description: "(suele ser mensual)", price: "30 €" },
              { icon: '',
title: "Reposición de bracket", description: "(por pieza estropeada)", price: "20 €"}
            ]
          }
        ]

        /* footerNote: "Tratamientos asociados: Visitas de revisión (30€) y reposición de bracket (20€)." */
      },
      {
        id: "brackets-antes-y-despues",
        name: "Estudio Previo / Estabilización Posterior",
        subTitle: "'Cosas' que hacer antes y después de los brackets.",
        priceGroups: [
          {
            title: "Diagnóstico Preciso Inicial",
            description: "Una planificación previa óptima es fundamental para tu tratamiento.",
            items: [
              { icon: 'OrtoIniFin1',
title: "Estudio cefalométrico", description: "(Radiografía ángulos óseos)", price: "50 €" },
              { icon: 'OrtoIniFin2',
title: "Estudio fotográfico", description: "(Proporciones faciales)", price: "30 €" },
              { icon: 'OrtoIniFin3',
title: "Modelos de estudio", price: "Incluido" }
            ]
          },
          {
            title: "Estabilización y Mantenimiento",
            description: "Los dientes tienen memoria y tienden a moverse al retirar los aparatos.",
            items: [
              { icon: 'OrtoIniFin4',
title: "Aparatología estabilizadora", description: "(Por aparato)", price: "108 €" },
              { icon: 'OrtoIniFin5',
title: "Vista revisión post-tratamiento", price: "25 €" }
            ]
          }
        ]
      }



    ],
    cta: {
      title: "Planifica tu tratamiento",
      infoNote: "La información reflejada en esta página tiene mero carácter orientativo. El diagnóstico profesional que necesitas únicamente te lo podrá proporcionar un dentista en su consulta.",
      description: "Te invitamos a solicitar una cita de valoración en uno de nuestros centros dentales para estudiar tu caso, y ofrecerte el plan exacto que se requiere para alinear tu sonrisa. Encuentra tu centro:"
    }
  },

  // 8. ORTODONCIA ZAFIRO 
  'ortodoncia-zafiro': {
    slug: 'ortodoncia-zafiro',
    activeSubNavId: 'zafiro',
    seoTitle: "Ortodoncia Estética de Zafiro | Precios Cerrados DKV Dentisalud",
    seoDescription: "Brackets de cristal de zafiro de máxima transparencia que no se tiñen. La opción perfecta que combina eficacia tradicional con estética premium.",
    breadcrumbs: [
      { label: "Inicio", href: "/" },
      { label: "Tratamientos", href: "/tratamientos" },
      { label: "Ortodoncia", href: "/tratamientos/ortodoncia" },
      { label: "Zafiro", href: "#" }
    ],
    hero: {
      badgeText: "Ortodoncia Estética",
      title: { dark: "ORTODONCIA ESTETICA DE", normal: "ZAFIRO" },
      description: [
        "La opción ideal para quienes requieren la eficacia y precisión del bracket tradicional, pero con un nivel superior de discreción visual que no altera tu sonrisa.",
      ]
    },
    rows: [
      {
        id: "brackets-zafiro-convencionales",
        name: "Brackets de Zafiro",
        image: "/images/tratamientos/ortodoncia-brackets-cristal-zafiro-standard.png",
        secondaryImage: "/images/tratamientos/ortodoncia-brackets-cristal-zafiro-standard-un-diente.png",
        subTitle: "Evolución estética del bracket metálico tradicional. ",

        points: [
          {
            icon: '',
            text: <>A diferencia de los antiguos brackets de plástico o cerámica convencional, nuestros brackets están tallados en <strong>cristal de zafiro puro</strong>.
</>
          },
          {
            icon: '',
            text: <><strong>La gran ventaja (No se tiñen):</strong> El zafiro mantiene su total transparencia durante todo el tratamiento. No importa si tomas café, té o vino tinto; el bracket seguirá siendo invisible y mimetizándose con el color natural de tu diente de principio a fin.
</>
          }
        ],


/*
        detailedPrices: [
          {
            title: "Aparato base por maxilar",
            price: "298 €"
          },
          {
            title: <span className="text-dkv-green-dark">Suplemento estético Zafiro (por maxilar)</span>,
            price: <span className="text-dkv-green">+ 180 €</span>
          }
        ],

*/


        priceGroups: [
          {
            title: "Desglose Técnica de Zafiro",
            description: "",
            items: [
              { icon: '',
title: "Aparato base", description: "(por maxilar)", price: "298 €" },
              { icon: '',
title: "Suplemento Zafiro Estético", description: "(por maxilar)", price: <span className="text-dkv-green">+ 180 €</span>}
            ]
          },
          {
            title: "Tratamientos asociados",
            description: "",
            items: [
              { icon: '',
title: "Visita de revision", description: "(suele ser mensual)", price: "30 €" },
              { icon: '',
title: "Reposición de bracket", description: "(por pieza estropeada)", price: "20 €"}
            ]
          }
        ]


       /*  footerNote: "Tratamientos asociados: Visitas de revisión (30€) y reposición de bracket (20€)." */
      },
      {
        id: "brackets-zafiro-autoligables",
        name: "Brackets de Zafiro Autoligables",
        image: "/images/tratamientos/ortodoncia-brackets-cristal-zafiro-autoligable.png",
        secondaryImage: "/images/tratamientos/ortodoncia-brackets-cristal-zafiro-autoligable-un-diente.png",
        subTitle: "Evolución tecnológica del bracket estético de zafiro tradicional que prescinde de ataduras.",

        points: [
          {
            icon: '',
            text: <>La combinación perfecta entre la más alta estética y la ingeniería biomecánica más avanzada.
</>
          },
          {
            icon: '',
            text: <><strong>Por qué elegirlo:</strong> Al ser autoligables, incorporan un clip de cierre invisible que sujeta el arco sin necesidad de "gomitas". Esto significa menos fricción, movimientos dentales más rápidos y orgánicos, menos molestias y una higiene diaria mucho más sencilla.
</>
          }
        ],

/*
        detailedPrices: [
          {
            title: "Aparato base por maxilar",
            price: "298 €"
          },
          {
            title: <span className="text-dkv-green-dark">Suplemento estético Zafiro (por maxilar)</span>,
            price: <span className="text-dkv-green">+ 180 €</span>
          },
          {
            title: <span className="text-dkv-green-dark">Suplemento tecnología Autoligable (por maxilar)</span>,
            price: <span className="text-dkv-green">+ 140 €</span>
          }
        ],
*/

        priceGroups: [
          {
            title: "Desglose Técnica de Zafiro Autoligable",
            description: "",
            items: [
              { icon: '',
title: "Aparato base", description: "(por maxilar)", price: "298 €" },
              { icon: '',
title: "Suplemento Zafiro Estético", description: "(por maxilar)", price: <span className="text-dkv-green">+ 180 €</span>},
              { icon: '',
title: "Suplemento Autoligable", description: "(por maxilar)", price: <span className="text-dkv-green">+ 140 €</span>}
            ]
          },
          {
            title: "Tratamientos asociados",
            description: "",
            items: [
              { icon: '',
title: "Visita de revision", description: "(suele ser mensual)", price: "30 €" },
              { icon: '',
title: "Reposición de bracket", description: "(por pieza estropeada)", price: "20 €"}
            ]
          }
        ]






        /* footerNote: "Tratamientos asociados: Visitas de revisión (30€) y reposición de bracket (20€)." */
      },

      {
        id: "brackets-antes-y-despues",
        name: "Estudio Previo / Estabilización Posterior",
        subTitle: "'Cosas' que hacer antes y después de los brackets.",
        priceGroups: [
          {
            title: "Diagnóstico Preciso Inicial",
            description: "Una planificación previa óptima es fundamental para tu tratamiento.",
            items: [
              { icon: 'OrtoIniFin1',
title: "Estudio cefalométrico", description: "(Radiografía ángulos óseos)", price: "50 €" },
              { icon: 'OrtoIniFin2',
title: "Estudio fotográfico", description: "(Proporciones faciales)", price: "30 €" },
              { icon: 'OrtoIniFin3',
title: "Modelos de estudio", price: "Incluido" }
            ]
          },
          {
            title: "Estabilización y Mantenimiento",
            description: "Los dientes tienen memoria y tienden a moverse al retirar los aparatos.",
            items: [
              { icon: 'OrtoIniFin4',
title: "Aparatología estabilizadora", description: "(Por aparato)", price: "108 €" },
              { icon: 'OrtoIniFin5',
title: "Vista revisión post-tratamiento", price: "25 €" }
            ]
          }
        ]
      }




    ],
    cta: {
      title: "Empieza tu diseño de sonrisa",
      infoNote: "La información reflejada tiene mero carácter orientativo. Acude a una primera visita para que un ortodoncista evalúe si la ortodoncia de zafiro es el tratamiento óptimo para tu caso particular.",
      description: "Solicita tu cita de valoración y descubre cómo la tecnología de cristal de zafiro puede alinear tu sonrisa de forma estética y eficiente:"
    }
  },

  // 9. ORTODONCIA REMOVIBLES (INFANTIL)
  'ortodoncia-removible': {
    slug: 'ortodoncia-removible',
    activeSubNavId: 'ortodoncia-removible',
    seoTitle: "Ortodoncia Removible Infantil | Precios DKV Dentisalud",
    seoDescription: "Aparatos de quita y pon para ensanchar el paladar y corregir hábitos en niños. Guiamos el crecimiento de su sonrisa con tarifas DKV.",
    breadcrumbs: [
      { label: "Inicio", href: "/" },
      { label: "Tratamientos", href: "/tratamientos" },
      { label: "Ortodoncia", href: "/tratamientos/ortodoncia" },
      { label: "Ortodoncia Removible", href: "#" }
    ],
    hero: {
      badgeText: "Aparato infantil de Quita y Pon",
      title: { dark: "ORTODONCIA", normal: "REMOVIBLE" },
      description: [
        "Muchos padres nos preguntan: '¿Por qué ponerle aparato ahora si aún tiene dientes de leche?'",
        "La respuesta es sencilla: no estamos alineando dientes definitivos, estamos creando el espacio necesario en el hueso para que, cuando salgan los definitivos, quepan perfectamente."
      ]
    },
/*
    intro: {
      badgeText: "Guiando el Crecimiento",
      title: "Ortodoncia Funcional e Interceptiva",
      description: "Usamos aparatos removibles porque son la herramienta ideal para corregir el crecimiento del hueso y eliminar malos hábitos mientras el niño aún está en desarrollo. Aquí te desglosamos las opciones y su inversión con tu tarifa DKV Dentisalud Élite."
    },
*/
    rows: [
      {
        id: "aparatos-activos",
        name: "Aparato activo (Expansor / Corrector)",
        price: "Desde 200 €",
        image: "/images/tratamientos/ortodoncia-removible.png",
        subTitle: "Los motores del cambio.",

        points: [
          {
            icon: '',
            text: <>El objetivo es ensanchar un paladar que se ha quedado estrecho, frenar una mandíbula que crece demasiado o estimular una que se ha quedado atrás.
</>
          },
          {
            icon: '',
            text: <><strong>Uno o dos aparatos:</strong> Cuando el problema está localizado en un solo hueso (generalmente el paladar superior, que necesita expansión) se usa un solo aparato. Sin embargo, cuando se necesita coordinar el crecimiento superior e inferior para que encajen como una caja y su tapa, hay que aplicar aparatos en ambos maxilares.
</>
          },
          {
            icon: '',
            text: <><strong>El beneficio:</strong> Evitan que los dientes definitivos salgan amontonados y corrigen "mordidas cruzadas" que, de no tratarse ahora, desgastarían los dientes de forma asimétrica y requerirían cirugía maxilofacial en la edad adulta.
</>
          }

        ],



        priceGroups: [
          {
            title: "",
            description: "",
            items: [
              { icon: '',
title: "Aparatología un maxilar", description: "(superior ó inferior)", price: "200 €" },
              { icon: '',
title: "Aparatología ambos maxilares", description: "", price: "400 €"}
            ]
          },
          {
            title: "Tratamientos asociados",
            description: "",
            items: [
              { icon: '',
title: "Visita de revision", description: "El seguimiento, la clave del éxito.", price: "25 €" }
            ]
          }
        ]
      },
      {
        id: "corrector-respiracion",
        name: "Corrector de respiración por la boca",
        price: "87 €",
        subTitle: "Salvando un riesgo.",

        points: [
          {
            icon: '',
            text: <><strong>¿Cuando es necesario?</strong>  La forma en que un niño respira o traga saliva define la forma de su cara.  Muchos niños respiran por la boca (por alergias, vegetaciones o simple hábito). Al tener la boca abierta siempre, la lengua no empuja el paladar y este se queda estrecho (cara alargada y ojeras).
</>
          },
          {
            icon: '',
            text: <><strong>El beneficio:</strong> Esta placa se coloca en la boca y obliga físicamente al niño a respirar por la nariz, reeducando su sistema respiratorio y permitiendo que su cara crezca con las proporciones correctas.
</>
          },
          {
            icon: '',
            text: <>Estos aparatos no "empujan" huesos directamente, sino que <strong>reeducan los músculos de la boca</strong>.
</>
          }

        ],




       footerNote: "* Precio por aparato." 

      },


      {
        id: "corrector-posicion",
        name: "Corrector de posición",
        price: "144 €",
        subTitle: "Consiguiendo la mordida ideal.",

        points: [
          {
            icon: '',
            text: <><strong>¿Cuando es necesario?</strong>  Suele emplearse en fases finales para asentar la mordida como si fuera un molde perfecto, o para guiar los dientes a su posición final aprovechando la propia fuerza de los músculos del niño al morderlo.
</>
          },
          {
            icon: '',
            text: <>Es un aparato elástico (parecido a los protectores de los boxeadores) que abraza los dientes de arriba y abajo a la vez.
</>
          }

        ],

       footerNote: "* Precio por aparato." 
      },


    ],
    premiumBlock: (
      <div className="mt-16 p-8 md:p-12 mb-12 rounded-3xl bg-dkv-green-dark text-white text-center shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-dkv-green opacity-20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-dkv-green opacity-20 blur-3xl rounded-full"></div>
        <AlertCircle className="w-12 h-12 mx-auto mb-6 text-dkv-green-light" />
        <h3 className="font-lemon text-xl mb-4 text-dkv-green-light uppercase tracking-wide">El Consejo Clínico para Padres</h3>
        <p className="text-xl font-medium leading-relaxed italic font-fsme max-w-3xl mx-auto relative z-10 text-white/90">
          "La aparatología removible hace verdadera magia en las caras de los niños, pero tiene un 'talón de Aquiles' que debemos contarte: <strong>depende al 100% de la colaboración de tu hijo.</strong> El aparato debe llevarse un mínimo de 14 a 16 horas diarias (toda la noche y parte de la tarde en casa). Si el niño no se lo pone, el hueso no cambia. Como profesionales, nuestro trabajo es fabricar el aparato perfecto y ajustar los tornillos; el vuestro en casa es ser 'policías del aparato' durante unos meses. ¡El esfuerzo valdrá la pena para toda su vida!"
        </p>
      </div>
    ),
    cta: {
      title: "Anticípate al problema",
      infoNote: "Recomendamos una primera visita con el ortodoncista a los 6 o 7 años de edad. Es el momento perfecto para evaluar el crecimiento de sus maxilares y detectar de forma temprana paladares estrechos o mordidas cruzadas.",
      description: "Encuentra tu clínica DKV más cercana y pide una cita de valoración ortodóntica infantil:"
    }
  },

  // 10. ORTODONCIA LINGUAL
  'ortodoncia-lingual': {
    slug: 'ortodoncia-lingual',
    activeSubNavId: 'lingual',
    seoTitle: "Ortodoncia Lingual 100% Invisible | Precios Cerrados DKV Dentisalud",
    seoDescription: "La única técnica ortodóntica verdaderamente imperceptible. Brackets colocados en la cara interna del diente para pacientes con altas exigencias estéticas.",
    breadcrumbs: [
      { label: "Inicio", href: "/" },
      { label: "Tratamientos", href: "/tratamientos" },
      { label: "Ortodoncia", href: "/tratamientos/ortodoncia" },
      { label: "Lingual", href: "#" }
    ],
    hero: {
      badgeText: "100% Invisible",
      title: { dark: "ORTODONCIA", normal: "LINGUAL" },
      description: [
        "La única técnica verdaderamente imperceptible desde el exterior, diseñada para pacientes con las más altas exigencias sociolaborales que no desean comprometer su imagen."
      ]
    },
    rows: [
      {
        id: "ortodoncia-lingual",
        name: "Ortodoncia Fija Lingual (100% Invisible)",
        image: "/images/tratamientos/ortodoncia-lingual.png",
        subTitle: "Máxima expresión de la ortodoncia estética.",

        points: [
          {
            icon: '',
            text: <>Consiste en la colocación de brackets diseñados a medida en la <strong>cara interna (lingual) de los dientes</strong>.
</>
          },
          {
            icon: '',
            text: <><strong>Por qué elegirlo:</strong> Porque quedan totalmente ocultos a la vista de los demás. Nadie sabrá que llevas ortodoncia, ni siquiera en distancias cortas. Ofrece un control tridimensional del movimiento dental idéntico al de los brackets exteriores de alta gama, pero con cero impacto en tu estética facial durante el tratamiento.
</>
          }
        ],


/* *****************
        detailedPrices: [
          {
            title: "Aparato base por maxilar",
            price: "298 €"
          },
          {
            title: <span className="text-dkv-green-dark">Suplemento técnica lingual a medida (por maxilar)</span>,
            price: <span className="text-dkv-green">+ 1.442 €</span>
          }
        ],
***************** */


        priceGroups: [
          {
            title: "Desglose de la Técnica Lingual",
            description: "",
            items: [
              { icon: '',
title: "Aparato base", description: "(por maxilar)", price: "298 €" },
              { icon: '',
title: "Suplemento Técnica Lingual a Medida", description: "(por maxilar)", price: <span className="text-dkv-green">+ 1.442 €</span> }
            ]
          },
          {
            title: "Tratamientos asociados",
            description: "",
            items: [
              { icon: '',
title: "Visita de revision", description: "(suele ser mensual)", price: "30 €" },
              { icon: '',
title: "Reposición de bracket", description: "(por pieza estropeada)", price: "20 €"}
            ]
          }

        ]


        /* footerNote: "Tratamientos asociados: Visitas de revisión periódica." */
      },







      {
        id: "brackets-antes-y-despues",
        name: "Estudio Previo / Estabilización Posterior",
        subTitle: "'Cosas' que hacer antes y después de los brackets.",
        priceGroups: [
          {
            title: "Diagnóstico Preciso Inicial",
            description: "Una planificación previa óptima es fundamental para tu tratamiento.",
            items: [
              { icon: 'OrtoIniFin1',
title: "Estudio cefalométrico", description: "(Radiografía ángulos óseos)", price: "50 €" },
              { icon: 'OrtoIniFin2',
title: "Estudio fotográfico", description: "(Proporciones faciales)", price: "30 €" },
              { icon: 'OrtoIniFin3',
title: "Modelos de estudio", price: "Incluido" }
            ]
          },
          {
            title: "Estabilización y Mantenimiento",
            description: "Los dientes tienen memoria y tienden a moverse al retirar los aparatos.",
            items: [
              { icon: 'OrtoIniFin4',
title: "Aparatología estabilizadora", description: "(Por aparato)", price: "108 €" },
              { icon: 'OrtoIniFin5',
title: "Vista revisión post-tratamiento", price: "25 €" }
            ]
          }
        ]
      }



    ],
    cta: {
      title: "Alta especialización clínica",
      infoNote: "La ortodoncia lingual es una técnica compleja que requiere un alto nivel de pericia por parte del especialista. La información aquí reflejada es orientativa; el diagnóstico final te lo dará un ortodoncista certificado.",
      description: "Pide tu cita de valoración en nuestros centros para que analicemos tu oclusión y confirmemos si eres candidato para la técnica lingual."
    }
  },

  // 11. ORTODONCIA INVISIBLE (INVISALIGN)
  'ortodoncia-invisalign': {
    slug: 'ortodoncia-invisalign',
    activeSubNavId: 'invisalign',
    seoTitle: "Ortodoncia Invisible Invisalign | Precios Cerrados DKV Dentisalud",
    seoDescription: "Alineadores transparentes y removibles. El sistema más demandado por adultos para una ortodoncia cómoda, estética y planificada en 3D.",
    breadcrumbs: [
      { label: "Inicio", href: "/" },
      { label: "Tratamientos", href: "/tratamientos" },
      { label: "Ortodoncia", href: "/tratamientos/ortodoncia" },
      { label: "Invisalign", href: "#" }
    ],
    hero: {
      badgeText: "El sistema más demandado",
      title: { dark: "ORTODONCIA", normal: "INVISIBLE" },
      description: [
        "La revolución de la ortodoncia. Alineadores transparentes y removibles para diseñar tu sonrisa sin interrumpir tu estilo de vida ni tu comodidad.",
      ]
    },
    rows: [
      {
        id: "ortodoncia-invisalign",
        name: "Alineadores Transparentes / Invisalign",
        image: "/images/tratamientos/ortodoncia-invisalign.png",
        /* price: "Desde 3.210 €", */
        subTitle: "El sistema más demandado por pacientes adultos por su comodidad y altísima estética. Consiste en una secuencia de férulas transparentes y removibles fabricadas a medida mediante tecnología digital tridimensional.",
        secondaryImage: "/images/tratamientos/ortodoncia-invisalign-un-diente.png",
        points: [
          {
            icon: 'Invisalign1',
            text: <><strong className="text-dkv-green-dark font-bold"> Comodidad Absoluta.</strong> Prácticamente invisibles y sin riesgo de rozaduras.</>
          },
          {
            icon: 'Invisalign2',
            text: <><strong className="text-dkv-green-dark font-bold"> Libertad Total.</strong> Removibles para comer con total normalidad.</>
          },
          {
            icon: 'Invisalign3',
            text: <><strong className="text-dkv-green-dark font-bold"> Higiene Perfecta.</strong> Cepillado sin obstátulos metálicos.</>
          },
          {
            icon: 'Invisalign4',
            text: <><strong className="text-dkv-green-dark font-bold">Previsibilidad.</strong> Programa 3D para ver tu sonrisa antes con software digital.</>
          },
          {
            icon: 'Invisalign5',
            text: <><strong className="text-dkv-green-dark font-bold">Factor de Adaptación.</strong> Ligera presión inciial. Puede afectar levemente a la pronunciación los primeros días.</>
          }
        ],


        priceGroups: [
          {
            title: "Tratamiento completo Invisalign",
            description: "Ambos maxilares.",
            items: [
              { icon: 'InvisalignPrecio1',
title: (
      <>
        <span className="sr-only">Tratamiento completo ambos maxilares</span> Hasta 12 Meses
      </>
    ), description: "", price: "3.210 €" },
              { icon: 'InvisalignPrecio2',
title: "Tratamiento completo ambos maxilares hasta 24 meses", description: "", price: "4.000 €" }
            ]
          }
        ],


        content: (
          <>
            
            {/* 💎 BLOQUE PREMIUM: CENTROS PROPIOS (Integrado dentro o justo antes de precios) */}
            <div id="garantia-centros-propios" className="bg-gradient-to-br from-dkv-green-dark to-[#022A27] rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden my-8 text-white border border-[#D4AF37]/30">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-5 blur-[80px] rounded-full"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#D4AF37] opacity-10 blur-[60px] rounded-full"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <Diamond className="w-6 h-6 text-[#D4AF37]" />
                  <span className="text-[#D4AF37] font-bold text-xs md:text-sm uppercase tracking-[0.2em] font-fsme">Garantía Exclusiva</span>
                </div>
                <h3 className="text-xl md:text-2xl font-lemon mb-3 uppercase tracking-wide">
                  Centros Propios Especiales DKV
                </h3>
                <p className="font-fsme text-base text-white/90 leading-relaxed mb-0">
                  Los tratamientos de Ortodoncia Invisible que vendemos se realizan <strong>EXCLUSIVAMENTE en nuestros Centros Propios Especiales</strong>. Solo a través de nuestra red clínica de élite podemos asegurar el rigor de la planificación 3D, la autenticidad de los materiales y ofrecerte una <strong>garantía total sobre los resultados</strong>. Si no es en un Centro Propio, no está garantizado.
                </p>
              </div>
            </div>

          </>
        )
      },


      {
        id: "brackets-antes-y-despues",
        name: "Estudio Previo / Estabilización Posterior",
        subTitle: "Todo lo necesario antes de empezar y para asegurar que tu sonrisa no se mueva al terminar",
        priceGroups: [
          {
            title: "Diagnóstico Preciso Inicial",
            description: "Planificación previa fundamental para el éxito del tratamiento.",
            items: [
              { icon: 'OrtoIniFin1',
title: "Estudio cefalométrico", description: "Radiografía de ángulos óseos.", price: "50 €" },
              { icon: 'OrtoIniFin2',
title: "Estudio fotográfico", description: "Análisis de proporciones faciales.", price: "30 €" },
              { icon: 'OrtoIniFin3',
title: "Modelos de estudio", price: "Incluido" }
            ]
          },
          {
            title: "Estabilización y Mantenimiento",
            description: "Evita que los dientes vuelvan a su posición original al retirar los alineadores.",
            items: [
              { icon: 'OrtoIniFin4',
title: "Aparatología estabilizadora", description: "Precio por aparato.", price: "108 €" },
              { icon: 'OrtoIniFin5',
title: "Revisión post-tratamiento", price: "25 €" }
            ]
          }
        ]
      }


    ],
    cta: {
      title: "Diseña tu sonrisa en 3D",
      infoNote: "El primer paso es un escaneado digital de tu boca. Acude a una primera visita en uno de nuestros Centros Propios Especiales para evaluar tu caso, garantizar los resultados y previsualizar cómo quedará tu sonrisa.",
      description: "Encuentra tu centro DKV Especializado más cercano y pide tu cita de valoración sin compromiso:"
    }
  },



// 12. IMPLANTE DENTAL INDIVIDUAL (NUEVO v2)
  'implante-individual': {
    slug: 'implante-individual',
    activeSubNavId: 'individual',
    seoTitle: "Implante Dental Individual | Precios Cerrados DKV Dentisalud",
    seoDescription: "Repón un diente perdido con un implante de titanio de alta gama y corona a medida. Presupuesto cerrado con radiología 3D incluida y garantía DKV.",
    breadcrumbs: [
      { label: "Inicio", href: "/" },
      { label: "Tratamientos", href: "/tratamientos" },
      { label: "Implantología", href: "/tratamientos/implantologia" },
      { label: "Implante Individual", href: "#" }
    ],
    hero: {
      badgeText: "Sustitución de 1 Pieza",
      title: { dark: "IMPLANTE", normal: "INDIVIDUAL" },
      description: [
        "Para pacientes que habiendo perdido un diente (por caries, fractura o golpe), necesitan reponerlo con la máxima naturalidad sin dañar los dientes sanos vecinos."
      ]
    },
    rows: [
      {
        id: "implante-individual",
        name: "Rehabilitación Completa Individual",
        price: "Desde 1.180 €",
        image: "/images/tratamientos/implantes.png",
        subTitle: "Recupera diente estético y funcional donde antes había un hueco.",

        points: [
          {
            icon: '',
            text: <><strong>Tratamiento base </strong> contemplando las fases de Diagnóstico, Quirúrgica y Prótésica, y procedimientos clínicos necesarios para devolverte un diente perfecto desde cero.</>
          }
        ],


        priceGroups: [
          {
            title: "Fase de Diagnóstico (80 €)",
            description: "Una planificación previa óptima es fundamental para tu tratamiento.",
            items: [
              { icon: '',
title: "Estudio implantológico", description: "", price: "Incluido" },
              { icon: '',
title: "Férula RX", description: "", price: "Incluido" },
              { icon: '',
title: "Férula Quirúgica", description: "", price: "Incluido" },
              { icon: '',
title: "Ortopantomografía", description: "", price: "Incluido" },
              { icon: '',
title: "Dental Scan", description: "1 Maxilar.", price: "80 €" }
            ]
          },
          {
            title: "Fase Quirúrgica (550 €)",
            description: "Implante en hueso.",
            items: [
              { icon: '',
title: "Cirugía Pre-Protésica", description: "", price: "Incluido" },
              { icon: '',
title: "Tornillo de cicatrización", description: "", price: "Incluido" },
              { icon: '',
title: "Tornillo de cementación", description: "", price: "Incluido" },
              { icon: '',
title: "Implante de Titanio", price: "550 €" }
            ]
          },
          {
            title: "Fase Protésica (550 €)",
            description: "El diente visible.",
            items: [
              { icon: '',
title: "Aditamento Protésico", description: "", price: "247 €" },
              { icon: '',
title: "Corona Metal-Cerámica", description: "", price: "303 €" }
            ]
          }
        ],

        footerNote: "* Según valoración clínica o estética pueden ser necesarios tratamientos adicionales.Consultar precios franquiciados."
      },


      {
        id: "estetica-adicional",
        name: "Máxima Estética (Zonas Frontales y Provisionales)",
        subTitle: "Según necesidad estética: Tratamientos adicionales posibles",

        points: [
          {
            icon: '',
            text: <>Si es un diente frontal, recomendamos cambiar la corona de metal-porcelana por una <strong>Corona de Zirconio</strong>, ya que no tiene metal y la luz la atraviesa como un diente real. También disponemos de <strong>Coronas de resina</strong> para fases provisionales si no quieres estar sin diente durante la integración.</>
          }
        ],




        detailedPrices: [
          {
            icon: '',
            title: 'Corona de Zirconio',
            description: '(sobre implante)',
            price: '325 €'
          },
          {
            icon: '',
            title: 'Corna de resina',
            description: '(provisional)',
            price: '274 €'
          }
        ]



      },
      {
        id: "angulos",
        name: "Ajuste de Ángulo Protésico",
        subTitle: "Según Valoración Clínica: Tratamientos adicionales posibles",

        points: [
          {
            icon: '',
            text: <>Si el hueso disponible nos obliga a poner el implante inclinado (para asegurar la fijación), necesitaremos una pieza intermedia especial para enderezar el diente final y que la mordida sea perfecta.</>
          }
        ],


        detailedPrices: [
          {
            icon: '',
            title: 'Falso muñón de titanio',
            description: '',
            price: '216 €'
          },
          {
            icon: '',
            title: 'Supra/Meso Estructuras',
            description: '(por pieza)',
            price: '87 €'
          }
        ]





      }
    ],
    premiumBlock: (
      <div id="upgrade-premium" className="bg-gradient-to-br from-dkv-green-dark to-[#022A27] rounded-2xl md:rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden mt-12 mb-12 scroll-mt-[220px] text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#D4AF37] opacity-10 blur-[80px] rounded-full"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Diamond className="w-8 h-8 text-[#D4AF37]" />
            <span className="text-[#D4AF37] font-bold text-sm md:text-base uppercase tracking-[0.2em] font-fsme">Upgrade Premium</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-lemon mb-6 uppercase tracking-wide">
            Cirugía Guiada 3D "Sin Puntos"
          </h2>
          <p className="font-fsme text-lg mb-6 text-white/90 leading-relaxed">
            ¿Tienes fobia al dentista o no puedes permitirte tener la cara hinchada mañana? Disponible <strong>EXCLUSIVAMENTE en nuestros Centros Propios Especiales</strong>, realizamos la cirugía primero en el ordenador. Fabricamos una plantilla que nos permite colocar el implante sin tener que usar bisturí ni dar puntos de sutura.
          </p>

          <div className="bg-white/10 rounded-2xl p-6 border border-white/20 backdrop-blur-sm mt-8">
            <ul className="space-y-4">
              <li className="flex flex-col md:flex-row md:justify-between items-start md:items-center pb-3 border-b border-white/20">
                <span className="font-bold text-white">Estudio o planificación de implantología guiada</span>
                <span className="font-lemon text-lg text-[#D4AF37] shrink-0 mt-1 md:mt-0">125 €</span>
              </li>
              <li className="flex flex-col md:flex-row md:justify-between items-start md:items-center pb-3 border-b border-white/20">
                <span className="font-bold text-white">Suplemento de implantología guiada CAD-CAM</span>
                <span className="font-lemon text-lg text-[#D4AF37] shrink-0 mt-1 md:mt-0">Incluido (0 €)</span>
              </li>
              <li className="flex flex-col md:flex-row md:justify-between items-start md:items-center">
                <span className="font-bold text-white">Férula de cirugía guiada implantológica (Impresión 3D)</span>
                <span className="font-lemon text-lg text-[#D4AF37] shrink-0 mt-1 md:mt-0">375 €</span>
              </li>
            </ul>
          </div>
          
          <div className="mt-6 flex flex-col md:flex-row items-start md:items-center justify-end gap-3">
            <span className="text-white/80 font-fsme text-sm uppercase tracking-wide">Inversión adicional sobre presupuesto base:</span>
            <span className="text-3xl font-lemon text-[#D4AF37]">+500 €</span>
          </div>
        </div>
      </div>
    ),
    cta: {
      title: "Planifica tu tratamiento",
      infoNote: "La información reflejada en esta página tiene mero carácter orientativo. El diagnóstico profesional que necesitas (y la confirmación de si requieres tratamientos adicionales o tecnología guiada 3D) te lo proporcionará nuestro equipo de implantología.",
      description: "Solicita tu cita y averigua si en tu clínica más cercana disponen de la tecnología exclusiva para realizar el Upgrade Premium de Cirugía Guiada \"Sin Puntos\". Encuentra tu centro:"
    }
  },










  // 12. ARCADA COMPLETA FIJA SOBRE IMPLANTES
  'implante-arcada': {
    slug: 'implante-arcada',
    activeSubNavId: 'arcada',
    seoTitle: "Arcada Completa Fija sobre Implantes | Precios DKV Dentisalud",
    seoDescription: "Recupera todos tus dientes fijos. Presupuesto real total de rehabilitación completa con implantes, radiología 3D y garantía DKV.",
    breadcrumbs: [
      { label: "Inicio", href: "/" },
      { label: "Tratamientos", href: "/tratamientos" },
      { label: "Implantología", href: "/tratamientos/implantologia" },
      { label: "Arcada Completa Fija", href: "#" }
    ],
    hero: {
      badgeText: "Todos los Dientes Fijos",
      title: { dark: "ARCADA COMPLETA", normal: "FIJA" },
      description: [
        "Para pacientes que van a perder o han perdido todos los dientes de un maxilar y desean una dentadura 100% fija que no haya que quitarse para dormir.",
        "Devolvemos la función y estética a toda tu boca. Muerde manzanas y sonríe con total seguridad."
      ]
    },
/*
    intro: {
      badgeText: "Presupuesto Real Total",
      title: "El Caso Ideal (Técnica de 4 Implantes)",
      description: "Colocamos 4 (o 6) implantes estratégicos que actúan como pilares. Sobre ellos, atornillamos una structure completa de dientes que no roza el paladar y te permite morder con total seguridad. A diferencia de las ofertas trampa del sector, en DKV Dentisalud te mostramos la inversión total real sumando implantes y prótesis."
    },
*/
    rows: [
      {
        id: "arcada-completa",
        name: "Rehabilitación Fija de Arcada Completa",
        price: "6.128 €",
        image: "/images/tratamientos/protesis.png",
        subTitle: "Dentadura nueva completa fijada mediante implantes.",

        points: [
          {
            icon: '',
            text: <>Este tratamiento contempla las fases, radiología avanzada y components necesarios para fijar la estructura a tu maxilar mediante 4 implantes de titanio.</>
          }
        ],

        priceGroups: [
          {
            title: "Fase de Diagnóstico (110 €)",
            description: "Una planificación previa óptima es fundamental para tu tratamiento.",
            items: [
              { icon: '',
title: "Estudio implantológico", description: "", price: "Incluido" },
              { icon: '',
title: "Férula RX", description: "", price: "Incluido" },
              { icon: '',
title: "Férula Quirúgica", description: "", price: "Incluido" },
              { icon: '',
title: "Teleradiografia lateral de craneo", description: "", price: "Incluido" },
              { icon: '',
title: "Radiografía de ATM", description: "", price: "Incluido" },
              { icon: '',
title: "Dental Scan", description: "Ambos Maxilares.", price: "110 €" }
            ]
          },
          {
            title: "Fase Quirúrgica (2.200 €)",
            description: "Implantes en hueso.",
            items: [
              { icon: '',
title: "Cirugía Pre-Protésica", description: "", price: "Incluido" },
              { icon: '',
title: "Tornillo de cicatrización", description: "Tornillo x 4", price: "Incluido" },
              { icon: '',
title: "Tornillo de cementación", description: "Tornillo x 4", price: "Incluido" },
              { icon: '',
title: "Implantes de Titanio", description: "Implante (4 x 550 €)", price: "2.220 €" }
            ]
          },
          {
            title: "Fase Protésica (4.808 €)",
            description: "El diente visible.",
            items: [
              { icon: '',
title: "Aditamentos Protésicos", description: "Aditamentos (4 x 247 €)", price: "1.978 €" },
              { icon: '',
title: "Dentadura Fija", description: "Arcada fija completa", price: "2.830 €" }
            ]
          }
        ],


        footerNote: "* Según valoración clínica o estética pueden ser necesarios tratamientos adicionales.Consultar precios franquiciados."





      }


    ],
    premiumBlock: (
      <div id="upgrade-premium" className="bg-gradient-to-br from-dkv-green-dark to-[#022A27] rounded-2xl md:rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden mt-12 mb-12 scroll-mt-[220px] text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#D4AF37] opacity-10 blur-[80px] rounded-full"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Diamond className="w-8 h-8 text-[#D4AF37]" />
            <span className="text-[#D4AF37] font-bold text-sm md:text-base uppercase tracking-[0.2em] font-fsme">Upgrade Premium</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-lemon mb-6 uppercase tracking-wide">
            Planificación Digital Integral 3D
          </h2>
          <p className="font-fsme text-lg mb-6 text-white/90 leading-relaxed">
            En cirugías completas, la tecnología marca una diferencia brutal en el postoperatorio. Disponible <strong>EXCLUSIVAMENTE en nuestros Centros Propios Especiales</strong>, diseñamos la posición de todos los implantes por ordenador para evitar terminaciones nerviosas y reducir el tiempo de sillón de horas a minutos, logrando una intervención mínimamente invasiva.
          </p>

          <div className="bg-white/10 rounded-2xl p-6 border border-white/20 backdrop-blur-sm mt-8">
            <ul className="space-y-4">
              <li className="flex flex-col md:flex-row md:justify-between items-start md:items-center pb-3 border-b border-white/20">
                <span className="font-bold text-white">Estudio o planificación de implantología guiada</span>
                <span className="font-lemon text-lg text-[#D4AF37] shrink-0 mt-1 md:mt-0">125 €</span>
              </li>
              <li className="flex flex-col md:flex-row md:justify-between items-start md:items-center pb-3 border-b border-white/20">
                <span className="font-bold text-white">Suplemento de implantología guiada CAD-CAM</span>
                <span className="font-lemon text-lg text-[#D4AF37] shrink-0 mt-1 md:mt-0">Incluido (0 €)</span>
              </li>
              <li className="flex flex-col md:flex-row md:justify-between items-start md:items-center">
                <span className="font-bold text-white">Férula de cirugía guiada (Para toda la arcada)</span>
                <span className="font-lemon text-lg text-[#D4AF37] shrink-0 mt-1 md:mt-0">375 €</span>
              </li>
            </ul>
          </div>
          
          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-end gap-3">
            <span className="text-white/80 font-fsme text-sm uppercase tracking-wide">Inversión adicional única para toda la boca:</span>
            <span className="text-3xl font-lemon text-[#D4AF37]">+500 €</span>
          </div>
        </div>
      </div>
    ),
    cta: {
      title: "Planifica tu tratamiento",
      infoNote: "La información reflejada en esta página tiene mero carácter orientativo. Una rehabilitación de arcada completa requiere un diseño de alta precisión. El diagnóstico definitivo te lo proporcionará nuestro equipo de implantología y cirugía maxilofacial en consulta.",
      description: "Te invitamos a solicitar tu Estudio Implantológico Gratuito. Analizaremos tu boca con tecnología 3D para diseñar tu nueva sonrisa y darte un presupuesto cerrado. Encuentra tu clínica:"
    }
  },

  // 13. SOBREDENTADURA SOBRE IMPLANTES
  'implante-sobredentadura': {
    slug: 'implante-sobredentadura',
    activeSubNavId: 'sobredentadura',
    seoTitle: "Sobredentadura sobre Implantes | Precios DKV Dentisalud",
    seoDescription: "Fija tu dentadura postiza con implantes y anclajes de precisión. La solución removible más económica y segura con tarifas exclusivas DKV.",
    breadcrumbs: [
      { label: "Inicio", href: "/" },
      { label: "Tratamientos", href: "/tratamientos" },
      { label: "Implantología", href: "/tratamientos/implantologia" },
      { label: "Sobredentadura", href: "#" }
    ],
    hero: {
      badgeText: "Económica y Segura",
      title: { dark: "SOBREDENTADURA", normal: "REMOVIBLE" },
      description: [
        "Pacientes sin dientes a los que su 'dentadura postiza' tradicional se les cae o les hace llagas. Busca seguridad total al hablar y comer, con un presupuesto más ajustado.",
        "Una prótesis de quita y pon que hace 'clic' sobre implantes y queda perfectamente sujeta. Mínimamente invasiva, fácil de limpiar y totalmente estable."
      ]
    },
/*
    intro: {
      badgeText: "Presupuesto Real Total",
      title: "El Caso Ideal (Estabilización con 2 Implantes)",
      description: "La forma más inteligente y económica de estabilizar una mandíbula inferior. Tu nueva prótesis llevará unos 'broches' ocultos. Al ponértela, hace 'clic' sobre los 2 implantes y queda bloqueada. Podrás masticar con firmeza y solo te la quitarás tú para limpiarla."
    },
*/
    rows: [
      {
        id: "sobredentadura-ideal",
        name: "Sobredentadura removible sobre 2 Implantes",
        price: "Desde 2.530 €",
        subTitle: "Dentadura completa de quita y pon con un 'click'.",

        points: [
          {
            icon: '',
            text: <>En el caso de la mandíbula inferior suele bastar con anclaje en dos puntos, es decir, <strong>en dos implantes</strong>. Es la forma más inteligente y económica de estabilizar una mandíbula inferior. Tu nueva prótesis llevará unos 'broches' ocultos. Al ponértela, hace 'clic' sobre los 2 implantes y queda bloqueada. Podrás masticar con firmeza y solo te la quitarás tú para limpiarla.</>
          }
        ],


        priceGroups: [
          {
            title: "Fase de Diagnóstico (80 €)",
            description: "Una planificación previa óptima es fundamental para tu tratamiento.",
            items: [
              { icon: '',
title: "Estudio implantológico", description: "", price: "Incluido" },
              { icon: '',
title: "Férula RX", description: "", price: "Incluido" },
              { icon: '',
title: "Férula Quirúgica", description: "", price: "Incluido" },
              { icon: '',
title: "Teleradiografia lateral de craneo", description: "", price: "Incluido" },
              { icon: '',
title: "Radiografía de ATM", description: "", price: "Incluido" },
              { icon: '',
title: "Dental Scan", description: "Un Maxilar.", price: "80 €" }
            ]
          },
          {
            title: "Fase Quirúrgica (1.560 €)",
            description: "Implantes en hueso.",
            items: [
              { icon: '',
title: "Cirugía Pre-Protésica", description: "", price: "Incluido" },
              { icon: '',
title: "Implantes de Titanio", description: "Implante (2 x 550 €)", price: "1.100 €" },
              { icon: '',
title: "Sistemas de Fijación", description: "Anclajes para sobredentaduras tipo Bolas/Locator (2 x 230 €)", price: "460 €" }

            ]
          },
          {
            title: "Fase Protésica (890 €)",
            description: "La dentadura visible.",
            items: [
              { icon: '',
title: "Sobredentadura", description: "Reforzada completa.", price: "890 €" }
            ]
          }
        ],


        footerNote: "* Según valoración clínica o estética pueden ser necesarios tratamientos adicionales.Consultar precios franquiciados."

      },


    ],
    premiumBlock: (
      <div id="upgrade-premium" className="bg-gradient-to-br from-dkv-green-dark to-[#022A27] rounded-2xl md:rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden mt-12 mb-12 scroll-mt-[220px] text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#D4AF37] opacity-10 blur-[80px] rounded-full"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Diamond className="w-8 h-8 text-[#D4AF37]" />
            <span className="text-[#D4AF37] font-bold text-sm md:text-base uppercase tracking-[0.2em] font-fsme">Garantía Exclusiva</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-lemon mb-6 uppercase tracking-wide">
            Implantes Guiados "Cero Estrés"
          </h2>
          <p className="font-fsme text-lg mb-6 text-white/90 leading-relaxed">
            Ideado especialmente para pacientes de edad avanzada o con mucho temor dental. Disponible <strong>EXCLUSIVAMENTE en nuestros Centros Propios Especiales</strong>, usamos la cirugía guiada por ordenador y férulas 3D para colocar los anclajes a través de la encía sin cortes ni puntos. El resultado es un menor trauma y una recuperación casi inmediata.
          </p>

          <div className="bg-white/10 rounded-2xl p-6 border border-white/20 backdrop-blur-sm mt-8">
            <ul className="space-y-4">
              <li className="flex flex-col md:flex-row md:justify-between items-start md:items-center pb-3 border-b border-white/20">
                <span className="font-bold text-white">Estudio o planificación de implantología guiada</span>
                <span className="font-lemon text-lg text-[#D4AF37] shrink-0 mt-1 md:mt-0">125 €</span>
              </li>
              <li className="flex flex-col md:flex-row md:justify-between items-start md:items-center pb-3 border-b border-white/20">
                <span className="font-bold text-white">Suplemento de implantología guiada CAD-CAM</span>
                <span className="font-lemon text-lg text-[#D4AF37] shrink-0 mt-1 md:mt-0">Incluido (0 €)</span>
              </li>
              <li className="flex flex-col md:flex-row md:justify-between items-start md:items-center">
                <span className="font-bold text-white">Férula de cirugía guiada (Impresión 3D)</span>
                <span className="font-lemon text-lg text-[#D4AF37] shrink-0 mt-1 md:mt-0">375 €</span>
              </li>
            </ul>
          </div>
          
          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-end gap-3">
            <span className="text-white/80 font-fsme text-sm uppercase tracking-wide">Inversión adicional sobre el presupuesto base:</span>
            <span className="text-3xl font-lemon text-[#D4AF37]">+500 €</span>
          </div>
        </div>
      </div>
    ),
    cta: {
      title: "Planifica tu tratamiento",
      infoNote: "La información reflejada en esta página tiene mero carácter orientativo. Únicamente el odontólogo, tras estudiar tu escáner 3D, podrá confirmar si tu hueso es apto para estabilizarse con 2 implantes, o si por seguridad requirieras 4.",
      description: "Te invitamos a solicitar una cita gratuita de valoración. Analizaremos tu boca y te daremos el presupuesto exacto para que vuelvas a morder con seguridad. Encuentra tu clínica:"
    }
  },








// 13b. REGENERACION DE HUESO
  'regeneracion-hueso': {
    slug: 'regeneracion-hueso',
    activeSubNavId: 'hueso',
    seoTitle: "Regeneración de Huseo | Precios Cerrados DKV Dentisalud",
    seoDescription: "Dependiendo del estado de tu hueso maxilar tras años de desgaste, podríamos necesitar acondicionarlo para reconstrucción y que sea un soporte eficiente.",
    breadcrumbs: [
      { label: "Inicio", href: "/" },
      { label: "Tratamientos", href: "/tratamientos" },
      { label: "Implantología", href: "/tratamientos/implantologia" },
      { label: "Reconstrucción Hueso", href: "#" }
    ],
    hero: {
      badgeText: "Falta de hueso",
      title: { dark: "REGENERACION DE", normal: "HUESO" },
      description: [
        "Para pacientes que habiendo perdido un diente (por caries, fractura o golpe), necesitan reponerlo con la máxima naturalidad sin dañar los dientes sanos vecinos."
      ]
    },
    rows: [
      {
        id: "regeneracion-biologica",
        name: "Regeneración de Hueso y Cicatrización",
        subTitle: "Según Valoración Clínica: Preparar el terreno es vital. Dependiendo del estado de tu hueso maxilar tras años de desgaste, podríamos necesitar acondicionarlo con alguno de estos procedimientos.",
        priceGroups: [
          {
            title: "Falta de Hueso",
            description: "Si perdiste la pieza hace tiempo, es posible que el hueso haya mermado. Usaremos material regenerativo y membranas para reconstruir los cimientos.",
            items: [
              { icon: '',
title: "Elevación de seno cerrado", description: "", price: "130 €" },
              { icon: '',
title: "Material de relleno regenerativo", description: "", price: "175 €" },
              { icon: '',
title: "Membrana reabsorvible y/o Malla de Titanio", description: "", price: "200 €" }
            ]
          },
          {
            title: "Cicatrización acelarada",
            description: "Aplicación de plasma para reducir la inflamación y acelarar la curación.",
            items: [
              { icon: '',
title: "Plasma Rico en Plaquetas", description: "(P.R.G.F.)", price: "150 €" }
            ]
          },


          {
            title: "Acondicionamiento de Hueso",
            description: "Si hay extracciones recientes o infecciones previas puede ser necesario nivelar el hueso maxilar.",
            items: [
              { icon: '',
title: "Vestibuloplastia", description: "(por cuadrante)", price: "75 €" },
              { icon: '',
title: "Alveoloplastia", description: "", price: "99 €" },
              { icon: '',
title: "Remodelación maxilar", description: "", price: "99 €" }
            ]
          }

        ]

      }

    ],

    cta: {
      title: "Planifica tu tratamiento",
      infoNote: "La información reflejada en esta página tiene mero carácter orientativo. El diagnóstico profesional que necesitas (y la confirmación de si requieres tratamientos adicionales o tecnología guiada 3D) te lo proporcionará nuestro equipo de implantología.",
      description: "Solicita tu cita y averigua si en tu clínica más cercana disponen de la tecnología exclusiva para realizar el Upgrade Premium de Cirugía Guiada \"Sin Puntos\". Encuentra tu centro:"
    }
  },







  // 14. ODONTOLOGÍA CONSERVADORA: RECONSTRUCCIÓN
  'conservadora-reconstruccion': {
    slug: 'conservadora-reconstruccion',
    activeSubNavId: 'reconstruccion',
    seoTitle: "Empastes y Reconstrucciones Dentales | DKV Dentisalud",
    seoDescription: "Frena la caries a tiempo con nuestros empastes, grandes reconstrucciones y tratamientos bioactivos. Salvar tu diente es nuestra prioridad.",
    breadcrumbs: [
      { label: "Inicio", href: "/" },
      { label: "Tratamientos", href: "/tratamientos" },
      { label: "Odontología Conservadora", href: "/tratamientos/odontologia-conservadora" },
      { label: "Reconstrucción", href: "#" }
    ],
    hero: {
      badgeText: "Frenando la caries a tiempo",
      title: { dark: "RECONSTRUCCIÓN", normal: "DENTAL" },
      description: [
        "Salvar tu diente natural es nuestra prioridad. No hay implante ni prótesis en el mundo que supere la obra de la naturaleza.",
        "Cuando las bacterias de la caries atacan, el tiempo es vital. Limpiamos el tejido infectado y rellenamos el hueco para devolverle al diente su forma, fuerza y color natural."
      ]
    },
    rows: [
      {
        id: "empaste",
        /* name: "Obturación con o sin recubrimiento pulpar", */
        name: "Empaste", 
        price: "29 €",
        image: "/images/empaste.png",
        imageAlt: "Esquema visual de un empaste dental o obturación",
        subTitle: "El clásico 'empaste'.",

        points: [
          {
            icon: '',
            text: <><strong>¿Qué es y cuándo se usa?</strong> Lo usamos cuando la caries es de tamaño pequeño o mediano.</>
          },
          {
            icon: '',
            text: <><strong>El beneficio:</strong> Limpiamos la zona oscura, aplicamos una resina del color exacto de tu diente y la endurecemos con luz. Tu diente vuelve a estar sano y funcional en 20 minutos.</>
          }

        ],


        footerNote: "Incluye recubrimiento pulpar en caso necesario."

      },
      {
        id: "gran-reconstruccion",
        name: "Reconstrucción",
        price: "40 €",
        subTitle: "Daños extensos.",

        points: [
          {
            icon: '',
            text: <><strong>¿Por qué hace falta?</strong> A veces, la caries ha destruido más de la mitad del diente o se te ha roto un trozo grande al morder algo duro. Un empaste normal no aguantaría la presión.</>
          },
          {
            icon: '',
            text: <><strong>La técnica:</strong> Reconstruimos la anatomía completa de la muela, a menudo usando pequeños encofrados para darle su forma original.</>
          }

        ],



        priceGroups: [
          {
            title: "Solución temporal",
            description: "Si acudes con una urgencia y no hay tiempo para hacer la reconstrucción definitiva, o si estamos esperando a ver cómo reacciona el nervio, te ponemos una pasta temporal para que te vayas a casa sin agujeros y sin dolor.",
            items: [
              { icon: '',
title: "Empaste Provisional", description: "", price: "Incluido" }
            ]
          },
          {
            title: "Suplemento Refuerzo de soporte",
            description: "Cuando el diente está tan destruido eue la gran reconstrucción no tiene donde agarrarse, introducimos un pequeño 'poste' o pilar de fibra de vidrio en la raíz para que actúe como los cimientos de un edificio y sujete el material.",
            items: [
              { icon: '',
                title: "Porte o pin", 
                description: "(por Unidad)", 
                price: <span className="text-dkv-green">+ 8 €</span>
              }

            ]
          }
        ],

        footerNote: "Incluye recubrimiento pulpar en caso necesario."

      },
      {
        id: "bioactivo",
        name: "Sustitutivo dentinario bioactivo",
        price: "70 €",
        subTitle: "¡La última oportunidad del nervio!",

        points: [
          {
            icon: '',
            text: <>Si la caries es tan profunda que casi toca el nervio, poner un empaste normal podría irritarlo y acabar en endodoncia.</>
          },
          {
            icon: '',
            text: <>En su lugar, aplicamos este material "inteligente" (base cavitaria) que <strong>libera minerales, calma el nervio y ayuda a que el diente se cure a sí mismo por dentro</strong> antes de sellarlo definitivamente.
</>
          }

        ],





        footerNote: "Incluye el composite necesario para sellar el diente."
      },
      {
        id: "reimplante",
        name: "Reimplante de pieza dental",
        price: "Incluido",
        subTitle: "Segunda vida.",

        points: [
          {
            icon: '',
            text: <><strong>Para accidentes:</strong> Si te das un golpe y se te sale un diente entero, ven corriendo a la clínica. Volvemos a colocarlo en su sitio y lo inmovilizamos para intentar que vuelva a agarrarse al hueso de forma natural.</>
          }

        ],


      }
    ],
    premiumBlock: (
      <div className="mt-16 bg-dkv-green-dark text-white p-8 md:p-12 mb-12 rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <AlertCircle className="w-32 h-32 text-white" />
        </div>
        <div className="relative z-10">
          <h3 className="font-lemon text-xl mb-4 text-dkv-green-light uppercase tracking-wide">El Veredicto de tu Consultor</h3>
          <p className="font-fsme text-lg leading-relaxed italic text-white/90">
            "No retrases el tratamiento de una caries por miedo al dentista. Un empaste de 29 € se hace en media hora y apenas molesta. Si lo dejas pasar, el 'bichito' llegará al nervio, el dolor será insoportable y el tratamiento (Endodoncia + Gran reconstrucción) pasará a costar más de 160 €, requiriendo varias citas. <strong>En la odontología conservadora, el tiempo es literalmente salud (y dinero).</strong>"
          </p>
        </div>
      </div>
    ),
    cta: {
      title: "Actúa antes de que duela",
      infoNote: "La caries en sus etapas iniciales es silenciosa. Cuando empieza a doler al beber cosas frías o dulces, significa que está profundizando hacia el nervio.",
      description: "Solicita una cita en tu clínica más cercana. Un diagnóstico a tiempo con una radiografía (incluida en tu póliza) salvará tu diente de forma rápida y económica:"
    }
  },

  // 15. ENDODONCIAS Y TRATAMIENTO DE CONDUCTOS
  'conservadora-endodoncia': {
    slug: 'conservadora-endodoncia',
    activeSubNavId: 'endodoncias',
    seoTitle: "Endodoncias y Tratamiento de Conductos | DKV Dentisalud",
    seoDescription: "Salvamos tu diente cuando el dolor no te deja dormir. Endodoncias, urgencias y endodoncia microscópica exclusiva en Centros Propios DKV.",
    breadcrumbs: [
      { label: "Inicio", href: "/" },
      { label: "Tratamientos", href: "/tratamientos" },
      { label: "Odontología Conservadora", href: "/tratamientos/odontologia-conservadora" },
      { label: "Endodoncias", href: "#" }
    ],
    hero: {
      badgeText: "Cuando el dolor no te deja dormir",
      title: { dark: "TRATAMIENTO DE", normal: "ENDODONCIA" },
      description: [
        "El objetivo es salvar un diente en el que la caries ha llegado hasta el centro (la pulpa o nervio), causando una infección y ese dolor punzante y terrible que no se va con analgésicos.",
        "Te explicamos cada paso del camino para conservar tu sonrisa sana y sin dolor."
      ]
    },
    rows: [
      {
        id: "tratamiento-conductos",
        name: "Endodoncias",
        price: "Desde 80 €",
        image: "/images/endodoncia.png",
        imageAlt: "Esquema de una endodoncia completa en un diente",
        subTitle: "Salvando el conducto radicular.",




        priceGroups: [
          {
            title: "Según la pieza dental",
            description: "El tratamiento de una pieza dental incluye todas sus raíces.",
            items: [
              { icon: '',
title: "Endodoncia de un conducto", description: "Normalmente para los incisivos y caninos, que solo tienen una raíz.", price: "80 €" },
              { icon: '',
title: "Endodoncia de dos conducto", description: "Usada habitualmente para los dientes premolares.", price: "94 €" },
              { icon: '',
title: "Endodoncia de tres o más conductos", description: "Para las grandes muelas del fondo, que son más difíciles y laboriosas de tratar.", price: "123 €" },
              { icon: '',
title: "Suplemento sistema rotatorio", description: "En lugar de limpiar las raíces a mano con pequeñas limas, usamos un motor de precisión con limas súper flexibles. Limpia mejor, más rápido, y llega a las curvas más difíciles de tus raíces, asegurando el éxito del tratamiento.", 
price: <span className="text-dkv-green">+ 15 €</span>
}
            ]
          }

        ],

        points: [
          {
            icon: '',
            text: <>Conocido coloquialmente como "matar el nervio". La técnica consiste en vaciar las raíces del diente, desinfectarlas por dentro y rellenarlas con un material plástico (gutapercha) para que las bacterias no vuelvan a entrar. El precio depende del número de raíces que tenga el diente:</>
          }
        ],

      },


      {
        id: "urgencias",
        name: "Pulpectomía de urgencia",
        price: "30 €",
        subTitle: "El alivio inmediato.",

        points: [
          {
            icon: '',
            text: <>Si llegas a la clínica de urgencia llorando de dolor, te anestesiamos, abrimos el diente y sacamos la parte superior del nervio infectado. <strong>El dolor desaparece al instante. </strong> En este caso la endodoncia definitiva se terminará en una cita posterior.</>
          }
        ],


        footerNote: "Incluye las curas."

      }



    ],
    premiumBlock: (
      <div id="microscopio" className="bg-gradient-to-br from-slate-900 to-[#022A27] rounded-2xl md:rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden mt-8 mb-4 scroll-mt-[220px] text-white">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Microscope className="w-32 h-32 text-[#D4AF37]" />
        </div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#D4AF37] opacity-10 blur-[80px] rounded-full"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Diamond className="w-6 h-6 text-[#D4AF37]" />
            <span className="text-[#D4AF37] font-bold text-sm md:text-base uppercase tracking-[0.2em] font-fsme">Upgrade Premium</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-lemon mb-4 uppercase tracking-wide">
            Endodoncia Microscópica
          </h2>
          <div className="inline-block bg-[#D4AF37]/20 border border-[#D4AF37]/40 px-4 py-1.5 rounded-full text-sm font-bold text-[#D4AF37] mb-6 uppercase tracking-widest">
            Exclusivo en Centros Propios Especiales
          </div>

          <p className="font-fsme text-lg mb-6 text-white/90 leading-relaxed max-w-2xl">
            Las raíces de los dientes son conductos más finos que un cabello humano, y muchas veces están escondidos, curvados o calcificados. Trabajar a simple vista o con gafas lupa normales tiene sus límites.
          </p>

          <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm mt-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 mb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#D4AF37] shrink-0" />
                <h3 className="font-bold text-lg text-white">Suplemento por utilización de microscopía</h3>
              </div>
              <span className="bg-[#D4AF37] text-slate-900 px-4 py-1.5 rounded-full text-xl font-lemon font-bold mt-4 md:mt-0">
                Incluido (0 €)
              </span>
            </div>
            
            <p className="text-white/80 font-fsme leading-relaxed">
              <strong>¿Por qué es un salto de calidad brutal?</strong> En nuestros centros especiales, realizamos la endodoncia utilizando un Microscopio Clínico Operatorio que amplía la visión hasta 20 o 30 veces. Nos permite encontrar micro-conductos que de otra forma pasarían desapercibidos (y que causarían dolor en el futuro), limpiar con una precisión absoluta y salvar dientes que en otras clínicas estarían desahuciados. <strong>Y lo mejor de todo: este despliegue tecnológico no tiene coste adicional para ti.</strong>
            </p>
          </div>
        </div>
      </div>
    ),
    cta: {
      title: "No sufras innecesariamente",
      infoNote: "Si el dolor te despierta por la noche o necesitas tomar analgésicos constantemente, tu nervio dental necesita ayuda urgente. Un diagnóstico a tiempo salvará la muela de la extracción.",
      description: "Te invitamos a solicitar una cita de valoración en uno de nuestros centros dentales para estudiar tu caso y aliviar tu dolor inmediatamente. Encuentra tu centro:"
    }
  },

  // 16. CIRUGÍA PERIAPICAL Y REENDODONCIAS
  'conservadora-cirugia': {
    slug: 'conservadora-cirugia',
    activeSubNavId: 'casos-complejos',
    seoTitle: "Cirugía Periapical y Reendodoncias | DKV Dentisalud",
    seoDescription: "Segundas oportunidades para tu diente. Reendodoncias, apicectomías y apicoformaciones para curar infecciones complejas y evitar la extracción.",
    breadcrumbs: [
      { label: "Inicio", href: "/" },
      { label: "Tratamientos", href: "/#tratamientos" },
      { label: "Odontología Conservadora", href: "/tratamientos/odontologia-conservadora" },
      { label: "Cirugía y Casos Complejos", href: "#" }
    ],
    hero: {
      badgeText: "Casos Complejos",
      title: { dark: "SEGUNDAS OPORTUNIDADES", normal: "Y CIRUGÍA" },
      description: [
        "¿Qué hacer cuando una endodoncia antigua vuelve a dar problemas o se infecta años después?",
        "Agotar las opciones clínicas para preservar tu dentadura natural siempre será la alternativa biológica y económica más inteligente frente a la extracción."
      ]
    },
    rows: [
      {
        id: "reendodoncia",
        name: "Reendodoncia",
        price: "130 €",
        subTitle: "Endodoncia de repetición.",

        points: [
          {
            icon: '',
            text: <><strong>¿En qué consiste?</strong> Hay que destapar el diente, sacar el material antiguo contaminado, volver a desinfectar todo el sistema de conductos a fondo y volver a sellar.</>
          },
          {
            icon: '',
            text: <>Es un trabajo muy minucioso (generalmente provocado por filtraciones en coronas antiguas o bacterias resistentes) cuyo único fin es intentar no tener que extraer la muela.</>
          }
        ],

        footerNote: "Precio por diente (independiente del número de raices)."

      },
      {
        id: "apicectomia",
        name: "Apicectomía (Cirugía periapical)",
        price: "38 €",
        image: "/images/apicectomia.png",
        imageAlt: "Ilustración visual de una apicectomía o cirugía periapical",
        subTitle: "La alternativa quirúrgica.",

        points: [
          {
            icon: '',
            text: <>Si la infección en la punta de la raíz (el ápice) no se cura ni siquiera repitiendo la endodoncia y se ha enquistado en el hueso, debemos intervenir desde fuera.</>
          },
          {
            icon: '',
            text: <>Abrimos un poquito la encía, cortamos la punta infectada de la raíz, extirpamos el quiste y sellamos la raíz desde abajo.</>
          }
        ],


      },
      {
        id: "apicoformacion",
        name: "Apicoformación",
        price: "54 €",
        subTitle: "Para dientes inmaduros.",

        points: [
          {
            icon: '',
            text: <>Tratamiento especial, generalmente para jóvenes, que han sufrido un traumatismo severo en un diente definitivo cuya raíz aún no se había formado por completo.</>
          },
          {
            icon: '',
            text: <>Utilizamos materiales especiales biocerámicos para ayudar a "cerrar" y crear una barrera artificial dura en la punta de esa raíz inmadura de forma química.</>
          }
        ],

        footerNote: "Precio por sesión."

      }
    ],

    cta: {
      title: "La última frontera",
      infoNote: "Agotar las opciones clínicas y restauradoras para preservar su dentadura natural siempre será la alternativa biológica, estética y económicamente más inteligente frente a la extracción y los implantes.",
      description: "Si te han dicho que tu muela no tiene salvación, pide una segunda opinión. Nuestros especialistas evaluarán si la cirugía periapical o la reendodoncia pueden salvarla:"
    }
  },

  // 17. TRATAMIENTO DE APNEA DEL SUEÑO Y RONQUIDO
  'apnea': {
    slug: 'apnea',
    activeSubNavId: 'apnea',
    seoTitle: "Tratamiento de SAHS (Síndrome de Apnea-Hipopnea del Sueño) | DKV Dentisalud",
    seoDescription: "Dispositivos de Avance Mandibular (DAM) para tratar la apnea. Tecnología exclusiva en Centros Propios Especiales DKV.",
    breadcrumbs: [
      { label: "Inicio", href: "/" },
      { label: "Tratamientos", href: "/tratamientos" },
      { label: "Medicina del Sueño", href: "#" }
    ],
    hero: {
      badgeText: "Medicina Dental del Sueño",
      title: { dark: "FERULA DE", normal: "APNEA (SAHS)" },
      description: [
        "El Síndrome de Apnea-Hipopnea del Sueño (SAHS) no es solo una molestia. Puede ser el síntoma de una patología grave que pone en riesgo tu corazón.",
        "La principal alternativa cómoda y eficaz a la máquina CPAP es el Dispositivo de Avance Mandibular (DAM) o 'Férula de Apnea'. Se trata de una férula fabricada a medida que mantiene adelantada tu mandíbula, favoreciendo la apertura de la vía aérea.",
        "En nuestros centros propios especialistas."
      ]
    },
    rows: [
      {
        id: "dam",
        name: "Dispositivo de Avance Mandibular (DAM)",
        price: "875 €",

        subTitle: "Sueño reparador.",


        points: [
          {
            icon: '',
            text: <>Fabricamos a medida tus férulas duales conectadas. El beneficio es inmediato: despeja la garganta, elimina el ronquido y permite un sueño reparador desde la primera noche.</>
          }
        ],

        priceGroups: [
          {
            title: "Dispositivo de Avance Mandibular",
            description: "",
            items: [
              {
                title: "Férula Apnea (SAHS)",
                description: "Dos años de garantía.",
                price: "800 €"
              }
            ]
          },

          {
            title: "Preparación",
            description: "Es necesario medir cuánto podemos adelantar tu mandíbula de forma segura para tu articulación.",
            items: [
              {
                title: "Estudio Biomecánico",
                description: "Estudio, montaje en articulador y toma de registros.",
                price: "75 €"
              },
              {
                title: "Tele-Radiografía",
                description: "",
                price: "Incluido"
              },
              {
                title: "Ortopantomografía",
                description: "",
                price: "Incluido"
              }
            ]
          },


          {
            title: "Revisión Periódica",
            description: "",
            items: [
              {
                title: "Ajuste de férula",
                description: "Revisión periódica del avance y comodidad de tu musculatura.",
                price: "35 €"
              },
              {
                title: "Reparación y Rebase",
                description: "",
                price: "Incluido"
              }

            ]
          }

        ]

      }

    ],


    premiumBlock: (
      <div className="mt-12 bg-dkv-green-dark text-white p-8 md:p-10 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Heart className="w-32 h-32 text-white" />
        </div>
        <div className="relative z-10">
          <h3 className="font-lemon text-xl mb-4 text-dkv-green-light uppercase tracking-wide">El Consejo Clínico</h3>
          <p className="font-fsme text-lg leading-relaxed italic text-white/90">
               Exclusivo en Centros Propios Especiales DKV.
          </p>
        </div>
      </div>
    ),


    cta: {
      title: "Recupera tus mañanas",
      infoNote: "Este tratamiento está indicado para ronquido simple y SAHS leve o moderado. En casos graves, el DAM puede ser un complemento excelente a otros tratamientos médicos.",
      description: "Si te levantas cansado, con dolor de cabeza o tu pareja nota pausas en tu respiración, localiza tu Centro Propio DKV más cercano para un estudio del sueño:"
    }
  },

  // 18. PREVENCIÓN Y EDUCACIÓN DENTAL INFANTIL
  'pediatria-prevencion': {
    slug: 'pediatria-prevencion',
    activeSubNavId: 'prevencion',
    seoTitle: "Prevención y Educación Dental Infantil | DKV Dentisalud",
    seoDescription: "Protege la sonrisa de tus hijos. Selladores, fluoraciones y enseñanza de higiene bucal con tratamientos gratuitos en tu póliza DKV.",
    breadcrumbs: [
      { label: "Inicio", href: "/" },
      { label: "Tratamientos", href: "/tratamientos" },
      { label: "Odontopediatría", href: "/tratamientos/pediatria-prevencion" },
      { label: "Educación y Prevención", href: "#" }
    ],
    hero: {
      badgeText: "El escudo protector",
      title: { dark: "EDUCACION Y", normal: "PREVENCION" },
      description: [
        "Cuidar la boca de los más pequeños no es solo curar caries; es educar, prevenir y guiar el crecimiento de sus huesos y dientes definitivos.",
        "El objetivo es evitar que aparezca la caries enseñando buenos hábitos y fortaleciendo el esmalte antes de que los problemas empiecen."
      ]
    },
    rows: [
      {
        id: "higiene-educacion",
        name: "Educación y Tratamientos Preventivos",
        subTitle: "Los niños no nacen sabiendo cepillarse.",

        points: [
          {
            icon: '',
            text: <>De forma lúdica, instauramos un hábito que les ahorrará muchos problemas y dolor en el futuro.</>
          }
        ],


        priceGroups: [
          {
            title: "Educación y Limpieza Base",
            description: "",
            items: [
              {
                title: "Cursillo Odontológico",
                description: "Enseñanza de cepillado y técnicas de higiene bucal para padres y niños.",
                price: "Incluido"
              },
              {
                title: "Limpieza de boca",
                description: "Retiramos la placa bacteriana y el sarro que el cepillo de casa no logra quitar, evitando la inflamación de las encías.",
                price: "Incluido"
              }
            ]
          },
          {
            title: "Reforzando el Esmalte",
            description: "El flúor es un mineral esencial que el diente absorve, actuando como un 'escudo', endureciendo el esmalte de forma inmediata y haciéndolo super resistente a los ataques de los ácidos de las bacterias.",
            items: [
              {
                title: "Fluorización Tópica",
                description: "Aplicamos un gel o barniz de flúor de alta concentración sobre los dientes del niño.",
                price: "Incluido"
              }
            ]
          },
          {
            title: "Evitando Primer Foco de Caries",
            description: "Las primeras muelas definitivas salen a los 6 años. Suelen tener uno surcos muy profundos, donde las cerdas del cepillo no llegan, y ahí es donde empiezan el 90% de las caries infantiles.",
            items: [
              {
                title: "Selladores de Fisuras",
                description: "Pintamos esos surcos con una resina transparente que los 'sella' dejándolos completamente lisos.",
                price: "17 €"
              }
            ]
          },
          {
            title: "Vigilando Caries escondidas",
            description: "Mediante pruebas fundamentales e indoloras el odontopediatra puede ver si hay caries escondidas entre los dientes que no se detectan a simple vista.",
            items: [
              {
                title: "Radiovisiografía Digital (RVG)",
                description: "Radiografía intra-oral digital de última generación con una dosis de radiación mínima (casi nula).",
                price: "Incluido"
              }
            ]
          }

        ]

      }
    ],
    premiumBlock: (
      <div className="mt-12 bg-dkv-green-dark text-white p-8 md:p-10 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Heart className="w-32 h-32 text-white" />
        </div>
        <div className="relative z-10">
          <h3 className="font-lemon text-xl mb-4 text-dkv-green-light uppercase tracking-wide">El Consejo Clínico</h3>
          <p className="font-fsme text-lg leading-relaxed italic text-white/90">
            "Un mantenedor de espacio o un simple sellador hoy te puede ahorrar un tratamiento de ortodoncia de miles de euros mañana. La odontopediatría no es un gasto, es la inversión más rentable en la salud estructural de tus hijos. Además, verás que <strong>la inmensa mayoría de los tratamientos preventivos están incluidos a coste cero</strong> en DKV Dentisalud Elite."
          </p>
        </div>
      </div>
    ),
    cta: {
      title: "Su primera visita",
      infoNote: "\"Total, como se le van a caer, ¿para qué arreglar los dientes de leche?\". Este gran mito es el origen de muchísimos problemas de espacio, dolores e infecciones graves.",
      description: "Acostumbra a tu hijo a visitar al dentista desde pequeño en un entorno amigable y sin dolor. Pide cita para su primera revisión y limpieza sin coste:"
    }
  },

  // 19. ODONTOLOGÍA CONSERVADORA INFANTIL
  'pediatria-conservadora': {
    slug: 'pediatria-conservadora',
    activeSubNavId: 'conservadora-pediatria',
    seoTitle: "Odontología Conservadora Infantil | DKV Dentisalud",
    seoDescription: "Empastes, reconstrucciones y coronas para niños. Curamos la caries de tus hijos para que coman y sonrían sin dolor con coberturas DKV.",
    breadcrumbs: [
      { label: "Inicio", href: "/" },
      { label: "Tratamientos", href: "/tratamientos" },
      { label: "Odontopediatría", href: "/tratamientos/odontopediatria" },
      { label: "Odontología Conservadora", href: "#" }
    ],
    hero: {
      badgeText: "Curando al bichito",
      title: { dark: "ODONTOLOGÍA", normal: "CONSERVADORA" },
      description: [
        "Cuando la prevención no ha sido suficiente y aparece la caries, nuestro objetivo es actuar rápido.",
        "Limpiamos la infección y restauramos el diente para que tu hijo pueda volver a comer y sonreír sin dolor."
      ]
    },
    rows: [
      {
        id: "obturacion",
        name: "Caries: Hola y Adios",
        subTitle: "Empastes y más.",
/*
        subTitle: (
          <div className="flex items-center justify-center gap-2 text-dkv-green">
            <Bug className="w-5 h-5" />
            <span className="font-bold tracking-widest text-xs uppercase">El famoso "empaste"</span>
          </div>
        ),
*/
        points: [
          {
            icon: '',
            text: <>En función del avance de la caries tendremos que aplicar diferentes medidas para erradicarla.</>
          }
        ],



        priceGroups: [
          {
            title: "caries inicial",
            description: "Limpiamos cuidadosamente la caries y rellenamos el hueco con una resina estética del mismo color del diente para devolverle su función y forma.",
            items: [
              {
                title: "Obturación",
                description: "100% incluido para menores de 15 años",
                price: "Incluido"
              }
            ]
          },
          {
            title: "Caries avanzada",
            description: "Cuando la caries es tan grande que ha destruido una parte considerable de la estructura del diente, tal que un empaste no aguantaría la fuerza de la masticación.",
            items: [
              {
                title: "Reconstrucción molares definitivos",
                description: "Reconstruimos la anatomía completa del diente para devolverle toda su fuerza original.",
                price: "40 €"
              }
            ]
          },
          {
            title: "Caries total",
            description: "Imagina que una muela de leche está destrozada por la caries, pero el niño aún tiene 5 años y esa muela no se va a caer de forma natural hasta los 10 años. No podemos sacarla porque perderíamos el espacio para el diente definitivo, y tampoco podemos hacer un empaste normal porque se rompería. ",
            items: [
              {
                title: "Corona prefabricada metálica (acero)",
                description: "Limpiaremos la muela y le pondremos un 'casquito' de acero inoxidable que la protege hasta que llegue el momento de que se caiga sola.",
                price: "65 €"
              }
            ]
          }

        ]

      }
    ],
    cta: {
      title: "No esperes a que duela",
      infoNote: "Los niños a menudo no avisan de que tienen una molestia hasta que la caries ya ha llegado al nervio. Las revisiones periódicas nos permiten detectar y empastar estas pequeñas lesiones a tiempo (y sin coste para ti).",
      description: "Acude con tu pequeño a tu clínica DKV más cercana. Trataremos esa caries en un ambiente relajado y con las técnicas menos invasivas:"
    }
  },

  // 20. ODONTOPEDIATRÍA: ENDODONCIA INFANTIL
  'pediatria-endodoncia': {
    slug: 'pediatria-endodoncia',
    activeSubNavId: 'endodoncia-pediatria',
    seoTitle: "Endodoncia Infantil y Pulpotomía | DKV Dentisalud",
    seoDescription: "Salvamos los dientes de leche de tu hijo cuando la caries llega al nervio. Pulpotomías, pulpectomías y urgencias dentales infantiles con DKV.",
    breadcrumbs: [
      { label: "Inicio", href: "/" },
      { label: "Tratamientos", href: "/tratamientos" },
      { label: "Odontopediatría", href: "/tratamientos/odontopediatria" },
      { label: "Endodoncia Infantil", href: "#" }
    ],
    hero: {
      badgeText: "Cuando la caries llega al nervio",
      title: { dark: "ENDODONCIA", normal: "INFANTIL" },
      description: [
        "Salvar un diente de leche que duele es fundamental para no tener que extraerlo antes de tiempo y perder el espacio.",
        "Sí, ¡los dientes de leche también tienen nervio y raíz! Descubre cómo curamos las infecciones profundas sin dolor."
      ]
    },
    rows: [
      {
        id: "infeccion",
        name: "Infección: Hola y Adios",
        subTitle: "Haciendo frente a la infección.",
/*
        price: "44 €",
        subTitle: (
          <div className="flex items-center justify-center gap-2 text-dkv-gray">
            <Activity className="w-5 h-5 text-dkv-green" />
            <span className="font-bold tracking-widest text-xs uppercase text-dkv-green">Endodoncia Parcial</span>
          </div>
        ),
*/
        
        points: [
          {
            icon: '',
            text: <>En función del grado de avance de la <strong> infección </strong> en el diente del niño, tomaremos las medidas necesarias para erradicarla.</>
          }
        ],



        priceGroups: [
          {
            title: "Infección leve",
            description: "La caries es muy profunda pero solo ha tocado la parte superior de la cámara del nervio.",
            items: [
              {
                title: "Endodoncia a medias (Pulpotomía)",
                description: "Quitamos solo la parte infectada, aplicamos medicamento para calmar el tejido sano restanto y sellamos la muela. El diente deja de doler inmediatamente y se mantiene vivo y sano en sus raíces hasta que se caiga de forma natural.",
                price: "44 €"
              }
            ]
          },
          {
            title: "Infección importante",
            description: "La infección ha avanzado tanto que ha llegado hasta el final de las raíces del diente de leche.",
            items: [
              {
                title: "Endodoncia infantil (Pulpectomía)",
                description: "Limpiamos de bacterias los conductos completos y los rellenamos de una pasta especial, que se reabsorverá por sí sola cuando la raíz de leche desaparezca por el empuje del diente definitivo.",
                price: "36 €"
              }
            ]
          },
          {
            title: "Salvando raiz definitiva",
            description: "Si tu hijo se da un golpe fuerte jugando y se rompe un diente definitivo que acaba de salir, seguramente no habrá terminado de formar su raíz por completo dentro del hueso.",
            items: [
              {
                title: "Apicoformación",
                description: "Estimulamos la raíz mediante medicamentos especiales en varias sesiones para que termine de crecer y cerrarse. Salvamos la pieza para toda la vida. Precio por sesión.",
                price: "20 €"
              }
            ]
          },
          {
            title: "Salvando diente definitivo",
            description: "Si tu hijo se da un golpe en el parque o haciendo deporte y un diente definitivo sale volando entero (de cuajo, con su raíz), no lo des por perdido.",
            items: [
              {
                title: "1) Recoge el diente.",
                description: "Siempre por la corona. Nunca toques la raíz amarilla.",
                price: ""
              },
              {
                title: "2) Conserva el diente.",
                description: "Sumerge el diente en un vaso con leche fría o suero. Nunca en agua ni lo frotes.",
                price: ""
              },
              {
                title: "3) Ven corriendo.",
                description: "Lo volveremos a colocar en su sitio para tratar de salvarlo.",
                price: "Incluido"
              }

            ]
          }

        ]

      },
    ],
    cta: {
      title: "Salva el diente a tiempo",
      infoNote: "El dolor espontáneo por la noche, o al beber cosas frías y calientes, es el principal síntoma de que la caries ha llegado al nervio. Actuar rápido es clave para evitar flemones.",
      description: "Si tu hijo se queja de dolor de muelas, no esperes. Nuestros especialistas en odontopediatría le atenderán de urgencia con la máxima delicadeza:"
    }
  },

  // 21. ODONTOPEDIATRÍA: CIRUGÍA Y ESPACIO
  'pediatria-extracciones-y-espacio': {
    slug: 'pediatria-extracciones-y-espacio',
    activeSubNavId: 'cirugia-pediatria',
    seoTitle: "Extracciones Infantiles y Mantenedores de Espacio | DKV Dentisalud",
    seoDescription: "Guiamos el recambio dental de tus hijos. Extracciones de dientes de leche y mantenedores de espacio para evitar ortodoncias complejas.",
    breadcrumbs: [
      { label: "Inicio", href: "/" },
      { label: "Tratamientos", href: "/tratamientos" },
      { label: "Odontopediatría", href: "/tratamientos/odontopediatria" },
      { label: "Extracciones y Espacio", href: "#" }
    ],
    hero: {
      badgeText: "Guiando el recambio",
      title: { dark: "EXTRACCIONES Y GESTIÓN", normal: "DEL ESPACIO" },
      description: [
        "El objetivo: Asegurar que los dientes definitivos tengan sitio para salir rectos y evitar ortodoncias complejísimas en el futuro.",
        "Para ello extraemos a tiempo las piezas que estorban y colocamos aparatología sencilla para guardar el sitio cuando una muela se pierde prematuramente."
      ]
    },
    rows: [
      {
        id: "extracciones",
        name: "Extracciones dentales y Mantenedores de espacio",
        subTitle: "Gestionando piezas faltantes.",
/*
        price: "0 €",
        subTitle: (
          <div className="flex items-center gap-2 text-dkv-green font-bold text-lg uppercase tracking-[0.2em] font-fsme mb-2">
            Intervenciones Menores
          </div>
        ),
*/
/*
        content: (
          <>
            <div className="flex items-center gap-2 mb-4 text-dkv-gray">
              <Scissors className="w-5 h-5 text-dkv-green" />
              <span className="font-bold tracking-widest text-xs uppercase text-dkv-green">Quitar las "dobles filas"</span>
            </div>
            <p><strong>¿Por qué se hace?</strong> Principalmente para quitar dientes de leche que están muy infectados y no se pueden salvar mediante endodoncia.</p>
            <div className="bg-white p-5 rounded-2xl border border-dkv-gray-border/50 mt-4">
              <p className="text-sm text-dkv-gray leading-relaxed m-0">
                También es muy común realizarlas para extraer aquellos <strong>dientes que no se caen a tiempo</strong> y están estorbando al diente definitivo, obligándolo a salir torcido por detrás o por delante de la encía (lo que coloquialmente llamamos dientes "en doble fila").
              </p>
            </div>
          </>
        ),

*/


        priceGroups: [
          {
            title: "Extracciones",
            description: "Solo en casos extremos, de dientes de leche muy infectados o bien que obstruyan la salida de dientes definitivos.",
            items: [
              {
                title: "Extracción Dental simple",
                description: "Dientes de leche my infectados, o que no se caen a tiempo.",
                price: "Incluido"
              },
              {
                title: "Extracción Supernumerario retenido",
                description: "Dientre extra atrapado en el hueso bloqueando a los dientes normales. Precio por unidad.",
                price: "25 €"
              }

            ]
          },
          {
            title: "Guardar espacio al diente definitivo",
            description: "Si se pierde una muela de leche antes de tiempo, es necesario mantener el hueco hasta que salga debajo la muela definitiva. En otro caso el resto de dientes se torcerán para tapar el hueco y la muela definitiva se verá atrapada al salir.",
            items: [
              {
                title: "Mantenedor fijo unilateral",
                description: "Pegado a un solo lado de la boca para guardar un hueco concreto.",
                price: "58 €"
              },
              {
                title: "Mantenedor fijo bilateral",
                description: "Arco metálico que cruza por detrás de los dientes para sujetar espacios a ambos lados a la vez.",
                price: "87 €"
              },
              {
                title: "Mantenedor removible",
                description: "Aparato de resina de quita y pon, que además de guardar el sitio puede llevar un diente falso por estética.",
                price: "72 €"
              }
            ]
          }

        ]

      }
      
      
    ],
    cta: {
      title: "Prevenir es Ahorrar",
      infoNote: "\"Un mantenedor de espacio de 58 € hoy te puede ahorrar un tratamiento de ortodoncia de 3.000 € mañana.\"",
      description: "Acude con tu pequeño a una revisión gratuita. Nuestro equipo de odontopediatría evaluará si el recambio dental se está produciendo correctamente."
    }
  },

  // 22. PREVENCIÓN: PRIMERA VISITA
  'prevencion-primera-visita': {
    slug: 'prevencion-primera-visita',
    activeSubNavId: 'primera-visita',
    seoTitle: "Primera Visita y Diagnóstico Dental | DKV Dentisalud",
    seoDescription: "Tu ITV dental. Consulta, radiografías y diagnóstico de dolor orofacial incluidos en tu póliza. Descubre a tiempo cualquier problema.",
    breadcrumbs: [
      { label: "Inicio", href: "/" },
      { label: "Tratamientos", href: "/tratamientos" },
      { label: "Prevención", href: "/tratamientos/prevencion/primera-visita" },
      { label: "Primera Visita", href: "#" }
    ],
    hero: {
      badgeText: "Tu ITV Dental",
      title: { dark: "REVISIÓN Y", normal: "DIAGNÓSTICO" },
      description: [
        "Para todo el mundo. Es la puerta de entrada a la clínica. El objetivo aquí no es curar, sino evitar que te enfermes y descubrir a tiempo cualquier pequeño problema antes de que duela (y cueste dinero).",
        "En esta fase evaluamos tu salud total y ponemos nombre a lo que te duele."
      ]
    },
    rows: [
      {
        id: "consulta",
        name: "Primera visita y revisiones",
        price: "Incluido",
        subTitle: "Valorando tu salud dental.",
/*
        subTitle: (
          <div className="flex flex-col gap-2 mb-2">
            <span className="text-dkv-green font-bold text-lg uppercase tracking-[0.2em] font-fsme">El mapa de tu boca</span>
            <div className="flex items-center gap-2 text-dkv-gray">
              <ClipboardList className="w-5 h-5 text-dkv-green" />
              <span className="font-bold tracking-widest text-xs uppercase text-dkv-green">Tu evaluación inicial</span>
            </div>
          </div>
        ),
*/
        priceGroups: [
          {
            title: "Consulta Inicial y Revisión",
            description: "Solo en casos extremos, de dientes de leche muy infectados o bien que obstruyan la salida de dientes definitivos.",
            items: [
              {
                title: "Consulta, presupuesto y plan de tratamiento",
                description: "Nuestros doctores analizan tu casi sin compromiso para trazar la hoja de ruta.",
                price: "Incluido"
              },
              {
                title: "Visita de revisión o control.",
                description: "Tu revisión anual obligatoria para mantener tus dientes bajo estricto control.",
                price: "Incluido"
              },
              {
                title: "Consulta dolor facial.",
                description: "Neuralgia, Dolor facial o Parálisis. No siempre el dolor es causado por una caries. A veces el origen es neurológico o muscular.",
                price: "Incluído"
              }
            ]
          },
          {
            title: "Radiografías",
            description: "Tipos de radiografías instantáneas imprescindibles para ver debajo de la encía, o confirmar si hay caries escondidas entre los dientes donde el ojo no llega.",
            items: [
              {
                title: "Radiografía Intrabucal",
                description: "",
                price: "Incluído"
              },
              {
                title: "Radiografía Periapical",
                description: "",
                price: "Incluído"
              },
              {
                title: "Radiografía RVG Digital",
                description: "",
                price: "Incluído"
              },
              {
                title: "Ortopantomografía",
                description: "",
                price: "Incluído"
              },
              {
                title: "Radiografías de control",
                description: "",
                price: "Incluído"
              },

              {
                title: "Radiografías Oclusales",
                description: "Radiografías de mordida para valorar grandes áreas del maxilar de un solo vistazo.",
                price: "Incluido"
              }
            ]
          }

        ]

      }
    ],
    cta: {
      title: "Prevenir cuesta 0 €",
      infoNote: "El 80% de los problemas graves (y costosos) en odontología podrían evitarse con una simple revisión anual de 20 minutos. Aprovecha las coberturas gratuitas de tu póliza.",
      description: "Encuentra tu clínica dental DKV más cercana y reserva hoy mismo tu Primera Visita y revisión general:"
    }
  },



// 22b. PREVENCIÓN Y EDUCACIÓN
  'prevencion-higiene': {
    slug: 'prevencion-higiene',
    activeSubNavId: 'higiene',
    seoTitle: "Higiene Dental y Prevención | DKV Dentisalud",
    seoDescription: "Limpiezas, fluorizaciones, bicarbonato y selladores a coste cero. Mantén tus dientes limpios y fuertes con tu seguro DKV.",
    breadcrumbs: [
      { label: "Inicio", href: "/" },
      { label: "Tratamientos", href: "/tratamientos" },
      { label: "Prevención", href: "/tratamientos/prevencion-higiene" },
      { label: "Higiene y Prevención", href: "#" }
    ],
    hero: {
      badgeText: "El escudo protector",
      title: { dark: "HIGIENE Y", normal: "PREVENCIÓN" },
      description: [
        "Tratamientos esenciales para mantener tus dientes limpios y fuertes frente a las bacterias.",
        "De nada sirve curar si no prevenimos. Aprovecha al máximo las coberturas gratuitas de tu póliza para blindar tu sonrisa."
      ]
    },
    rows: [
      {
        id: "limpieza-prevencion",
        name: "Medidas preventivas",
        price: "Incluido",
        subTitle: "Más vale prevenir.",
/*
        subTitle: (
          <div className="flex items-center gap-2 text-dkv-green font-bold text-lg uppercase tracking-[0.2em] font-fsme mb-2">
            Mantenimiento Base: Limpieza y Estética Natural
          </div>
        ),
*/
        priceGroups: [
          {
            title: "Limpieza de boca",
            description: "",
            items: [
              {
                title: "Limpieza dental",
                description: "Elimina el sarro superficial que el cepillado no puede quitar.",
                price: "Incluido"
              },
              {
                title: "Bicarbonato.",
                description: "Aeropulidor para eliminar manchas de café, té o tabaco, devolviendo el brillo a tus dientes sin dañar la superficie.",
                price: "Incluido"
              },
              {
                title: "Fluorización tópica.",
                description: "Aplicación de flúor para que tus dientes resistan mejor los ataques ácidos de las bacterias.",
                price: "Incluído"
              }
            ]
          },
          {
            title: "Higienización",
            description: "",
            items: [
              {
                title: "Sellado de fisuras.",
                description: "Relleno de surcos profundos de muelas adultas para que no entre comida ni se forme placa bacteriana.",
                price: "Incluído"
              },
              {
                title: "Formación Higiene.",
                description: "Capacitacion sobre la técnica correcta de cepillado, uso del hilo dental y de cepillos interproximales.",
                price: "Incluído"
              }
            ]
          }

        ]


      }
    ],
    cta: {
      title: "Tu sonrisa al 100%",
      infoNote: "Si notas tus dientes ásperos, manchas superficiales o hace más de un año que no te haces una limpieza profesional, es el momento perfecto para blindar tu boca.",
      description: "Disfruta de tu \"ITV dental\" y sal de la clínica con los dientes limpios, pulidos y fortalecidos sin pagar absolutamente nada. Busca tu centro:"
    }
  },












  // 23. PERIODONCIA: DIAGNÓSTICO Y CURETAJES
  'periodoncia-basica': {
    slug: 'periodoncia-basica',
    activeSubNavId: 'diagnostico-basico',
    seoTitle: "Diagnóstico Periodontal y Curetajes | DKV Dentisalud",
    seoDescription: "Tratamiento básico de encías. Periodontograma, detartraje y curetajes para frenar la piorrea y salvar tus dientes desde la raíz.",
    breadcrumbs: [
      { label: "Inicio", href: "/" },
      { label: "Tratamientos", href: "/tratamientos" },
      { label: "Periodoncia", href: "/tratamientos/periodoncia/basico" },
      { label: "Diagnóstico y Tratamiento Básico", href: "#" }
    ],
    hero: {
      badgeText: "Fase inicial de la enfermedad",
      title: { dark: "ENCÍAS Y", normal: "PERIODONCIA" },
      description: [
        "Si te sangran las encías al cepillarte, tienes mal aliento crónico o notas que algún diente se mueve, puedes sufrir una tenes enfermedad periodontal como la gingivitis o la 'piorrea'.",
        "De nada sirve un diente sin caries si el hueso y la encía que lo sujetan están enfermos."
      ]
    },
    rows: [
      {
        id: "periodontograma",
        name: "Diagnóstico y medición (Periodontograma)",
        price: "Incluido",
        subTitle: (
          <div className="flex flex-col gap-2 mb-2">
            <span className="text-dkv-green font-bold text-lg uppercase tracking-[0.2em] font-fsme">Fase Inicial de la enfermedad</span>
          </div>
        ),

        points: [
          {
            icon: '',
            text: <><strong className="text-dkv-green-dark font-bold"> El mapa.</strong> Para tratar la enfermedad de las encías, primero necesitamos saber exactamente dónde está y qué profundidad tiene.</>
          },
          {
            icon: '',
            text: <><strong className="text-dkv-green-dark font-bold">Medición precisa.</strong> Utilizando una pequeña sonda milimetrada, medimos el espacio entre el diente y la encía (la "bolsa periodontal") diente por diente. Así sabemos milímetro a milímetro cuánto hueso de soporte has perdido y dónde debemos atacar la infección.</>
          }
        ]

      },
      {
        id: "detartraje",
        name: "Detartraje subgingival",
        price: "Incluido",
        subTitle: (
          <div className="flex flex-col gap-2 mb-2">
            <span className="text-dkv-green font-bold text-lg uppercase tracking-[0.2em] font-fsme">Limpieza profunda</span>
          </div>
        ),

        points: [
          {
            icon: '',
            text: <><strong className="text-dkv-green-dark font-bold">Bajo las encías.</strong><br />A diferencia de la limpieza normal (que solo quita el sarro visible), el detartraje es una limpieza un poco más profunda y focalizada que nos permite eliminar la placa bacteriana que ha empezado a esconderse justo por debajo de la encía.
</>
          }
        ],

      },
      {
        id: "curetaje",
        name: "Curetaje",
        price: "40 €",
        subTitle: (
          <div className="flex flex-col gap-2 mb-2">
            <span className="text-dkv-green font-bold text-lg uppercase tracking-[0.2em] font-fsme">Limpieza de raíces</span>
          </div>
        ),

        points: [
          {
            icon: '',
            text: <><strong>¿Cuando es necesario?</strong> Las bacterias han penetrado muy por debajo de la encía, y han llegado a crear duras costras pegadas a la raíz de tu diente.
</>
          },
          {
            icon: '',
            text: <><strong>¿En qué consiste?</strong> Con anestesia local, introducimos unas herramientas especiales llamadas curetas con las que alisamos y pulimos las raíces de tus dientes. Esto elimina las bacterias que se están comiendo tu hueso y permite que la encía vuelva a pegarse al diente.
</>
          }

        ],




        footerNote: "* Precio por cuadrante."
      },
      {
        id: "fluor-sensibilidad",
        name: "Aplicación gel de flúor",
        price: "Incluido",
        subTitle: (
          <div className="flex flex-col gap-2 mb-2">
            <span className="text-dkv-green font-bold text-lg uppercase tracking-[0.2em] font-fsme">Alivio post-tratamiento para sensibilidad dentinaria</span>
          </div>
        ),

        points: [
          {
            icon: '',
            text: <><strong>¿Cuando es necesario?</strong> Tras realizar los curetajes y quitar el sarro que "abrigaba" la raíz, los dientes pueden quedar temporalmente sensibles a los alimentos y bebidas frías.
</>
          },
          {
            icon: '',
            text: <><strong>¿En qué consiste?</strong> Aplicamos un gel desensibilizante de flúor de alta concentración que sella los poros del diente y proporciona un alivio inmediato.
</>
          }

        ],




      }
    ],
    cta: {
      title: "Actúa antes de perder hueso",
      infoNote: "El sangrado de encías nunca es normal. Es el primer grito de auxilio de tu boca indicando que hay una infección activa comiéndose el hueso que soporta tus dientes.",
      description: "No esperes a que tus dientes se muevan. Un diagnóstico periodontal a tiempo (incluido en tu póliza) puede salvar tu sonrisa. Busca tu clínica:"
    }
  },

  // 24. PERIODONCIA: ESTABILIZACIÓN
  'periodoncia-estabilizacion': {
    slug: 'periodoncia-estabilizacion',
    activeSubNavId: 'estabilizacion',
    seoTitle: "Mantenimiento Periodontal y Ferulización | DKV Dentisalud",
    seoDescription: "Frena la caída de tus dientes. Mantenimientos periodontales y ferulización de dientes móviles con tu tarifa DKV.",
    breadcrumbs: [
      { label: "Inicio", href: "/" },
      { label: "Tratamientos", href: "/tratamientos" },
      { label: "Periodoncia", href: "/tratamientos/periodoncia-estabilizacion" },
      { label: "Estabilización", href: "#" }
    ],
    hero: {
      badgeText: "Control crónico",
      title: { dark: "MANTENIMIENTO Y", normal: "ESTABILIZACIÓN" },
      description: [
        "La 'piorrea' (enfermedad periodontal) es crónica. De nada sirve limpiar a fondo si no mantenemos la infección a raya a lo largo del tiempo.",
        "Toca consolidar los resultados del tratamiento básico y estabilizar los dientes que han empezado a moverse por la pérdida de hueso."
      ]
    },
    rows: [
      {
        id: "revisiones-periodontales",
        name: "Control Periodontal",
        subTitle: (
          <div className="flex flex-col gap-2 mb-2">
            <span className="text-dkv-green font-bold text-lg uppercase tracking-[0.2em] font-fsme">Vigilancia constante</span>
          </div>
        ),

        points: [
          {
            icon: '',
            text: <><strong>Revisión períódica.</strong> Evaluamos periódicamente el estado de tus encías, la profundidad de las bolsas periodontales y tu índice de placa para asegurarnos de que la enfermedad está inactiva y detenida.
</>
          },
          {
            icon: '',
            text: <> <strong>Limpieza periodontal.</strong>Cada 4 o 6 meses es estrictamente necesario que los pacientes con problemas de encías se sometan a una limpieza médica súper exhaustiva para que la infección no vuelva a penetrar bajo la encía.
</>
          },
          {
            icon: '',
            text: <><strong>Importante. </strong> Saltarse estos mantenimientos es la principal causa de recaída. La limpieza dental estándar anual no es suficiente para los pacientes que ya han perdido soporte óseo.
</>
          }


        ],

        detailedPrices: [
          {
            icon: '',
            title: 'Revisión periódica',
            description: '',
            price: 'Incluido'
          },
          {
            icon: '',
            title: 'Limpieza periodontal',
            description: '',
            price: "65 €"
          }
        ]

      },

      {
        id: "ferulizacion",
        name: "Ferulización Periodontal",
        subTitle: (
          <div className="flex flex-col gap-2 mb-2">
            <span className="text-dkv-green font-bold text-lg uppercase tracking-[0.2em] font-fsme mt-4">Firmeza estructural dental</span>
          </div>
        ),

        points: [
          {
            icon: '',
            text: <><strong>El beneficio:</strong> Si tus dientes se mueven porque han perdido hueso, los unimos a otros firmes por la parte de atrás con una fibra invisible o alambre trenzado adherido con resina. Esto reparte las fuerzas masticatorias, dándoles firmeza para que puedas morder sin miedo a que se caigan.
</>
          }
        ],
        detailedPrices: [
          {
            icon: '',
            title: 'Por pieza dental',
            description: '',
            price: '18 €'
          },
          {
            icon: '',
            title: 'Por sextante',
            description: 'Tramo completo de colmillo a colmillo.',
            price: "100 €"
          }
        ]

      }
    ],
    cta: {
      title: "No des tu diente por perdido",
      infoNote: "Incluso los dientes con una gran movilidad pueden salvarse durante años si logramos detener la infección bacteriana y los ferulizamos a tiempo.",
      description: "Acude a uno de nuestros especialistas en periodoncia para valorar si tus dientes tienen salvación. Encuentra tu centro DKV más cercano:"
    }
  },

  // 25. PERIODONCIA: MICRO-CIRUGÍA Y LÁSER 
  'periodoncia-micro-cirugia': {
    slug: 'periodoncia-micro-cirugia',
    activeSubNavId: 'micro-cirugia',
    seoTitle: "Micro-cirugía de Encías y Láser Periodontal | DKV Dentisalud",
    seoDescription: "Tratamientos periodontales avanzados. Gingivectomía, cirugía a colgajo, tecnología láser y plasma rico en plaquetas (PRGF).",
    breadcrumbs: [
      { label: "Inicio", href: "/" },
      { label: "Tratamientos", href: "/tratamientos" },
      { label: "Periodoncia", href: "/tratamientos/periodoncia/basico" },
      { label: "Micro-Cirugía", href: "#" }
    ],
    hero: {
      badgeText: "Intervenciones de precisión",
      title: { dark: "MICRO-CIRUGÍA", normal: "DE ENCÍAS" },
      description: [
        "Tratamientos quirúrgicos especializados para modelar, sanar y acceder a las zonas más profundas de tus encías.",
        "Descubre la vanguardia en periodoncia quirúrgica para erradicar las infecciones más rebeldes y mejorar la estética de tu sonrisa."
      ]
    },
    rows: [
      {
        id: "colgajo",
        name: "Cirugía periodontal a colgajo",
        subTitle: (
          <div className="flex flex-col gap-2 mb-2">
            <span className="text-dkv-green font-bold text-lg uppercase tracking-[0.2em] font-fsme mt-4">Sin tregua</span>
          </div>
        ),


        points: [
          {
            icon: '',
            text: <><strong>¿Por qué hace falta?</strong> Si la infección es tan profunda que el curetaje tradicional no llega a limpiar el fondo de la bolsa periodontal.
</>
          },
          {
            icon: '',
            text: <>Bajo anestesia, apartamos suavemente la encía como si fuera la solapa de un sobre, limpiamos el hueso y las raíces directamente visualizando el daño, y volvemos a cerrar y suturar.
</>
          }
        ],



        detailedPrices: [
          {
            icon: '',
            title: 'Por pieza dental',
            description: '',
            price: '26 €'
          },
          {
            icon: '',
            title: 'Por cuadrante completo',
            description: '',
            price: "100 €"
          }
        ]


      },

      {
        id: "epulis",
        name: "Extirpación de épulis",
        price: "40 €",
        subTitle: "Extirpar quistes.",
/*
        subTitle: (
          <div className="flex flex-col gap-2 mb-2">
            <span className="text-dkv-green font-bold text-lg uppercase tracking-[0.2em] font-fsme">Acceso Directo</span>
            <div className="flex items-center gap-2 text-dkv-gray">
              <Activity className="w-5 h-5 text-dkv-green" />
              <span className="font-bold tracking-widest text-xs uppercase text-dkv-green">Lesiones localizadas</span>
            </div>
          </div>
        ),
*/
/*
        content: (
          <p>
            Intervención menor para quitar un pequeño bulto benigno o quiste que se haya formado en la encía, generalmente a causa de una irritación crónica.
          </p>
        )
*/
        points: [
          {
            icon: '',
            text: <><strong>Intervención menor  </strong> para quitar un pequeño bulto benigno o quiste que se haya formado en la encía, generalmente a causa de una irritación crónica.

</>
          }
        ]


      },
      {
        id: "regenerativo",
        name: "Regenerando Hueso perdido",
        subTitle: "Perfeccionando el soporte óseo.",
/*
        subTitle: (
          <div className="flex flex-col gap-2 mb-2">
            <span className="text-dkv-green font-bold text-lg uppercase tracking-[0.2em] font-fsme mt-4">Sin tregua</span>
          </div>
        ),
*/

        points: [
          {
            icon: '',
            text: <><strong>¿Por qué hace falta?</strong> Se busca recuperar el soporte óseo perdido alrededor de los dientes debido a enfermedades o infecciones.
</>
          },
          {
            icon: '',
            text: <>De este modo se permite salvar piezas dentales que de otro modo se perderían.
</>
          }
        ],



        detailedPrices: [
          {
            icon: '',
            title: 'Cirugía periondontal de injerto',
            description: 'Cuando tras limpiar la cirugía de colgajo, se detecta que se ha perdido hueso de soporte. Precio por cirugía.',
            price: '130 €'
          },
          {
            icon: '',
            title: 'Membranas regenerativas',
            description: 'Junto con injertos para guiar la regeneración de nuevo hueso y encía y que el tejido blando no invada el espacio donde debe crecer el hueso.',
            price: "150 €"
          },
          {
            icon: '',
            title: 'Ingerto autólogo',
            description: 'Hueso del propio paciente.',
            price: "190 €"
          },
          {
            icon: '',
            title: 'Otros materiales de injerto.',
            description: 'Hidroxiapatita, hueso liofilizado, etc. Precio por unidad.',
            price: "150 €"
          }
        ]


      },


      {
        id: "gingivectomia",
        name: "Alargamiento de la corona",
        subTitle: (
          <div className="flex flex-col gap-2 mb-2">
            <span className="text-dkv-green font-bold text-lg uppercase tracking-[0.2em] font-fsme mt-4">Beneficio estético</span>
          </div>
        ),

        points: [
          {
            icon: '',
            text: <><strong>Recuperación de sonrisa.</strong> Una vez controlada la infección y el hueso, estos tratamientos se enfocan en recortar la encía con absoluta precisión si está demasiado inflamada (hiperplasia) o si "tapa" demasiado al diente, mejorando también enormemente la estética de tu sonrisa.

</>
          }
        ],



        detailedPrices: [
          {
            icon: '',
            title: 'Gingivectomía total',
            description: 'Elimina exceso de encía para aumentar la longitud de los dientes sin necesidad de tocar hueso. Precio por cuadrante',
            price: '17 €'
          },
          {
            icon: '',
            title: 'Alargamiento coronario',
            description: 'Además de recortar exceso de encía implica remodelar el hueso para exponer más estructura dental.',
            price: "100 €"
          }
        ]



      },






    ],
    premiumBlock: (
      <div id="cirugia-alta-complejidad" className="bg-gradient-to-br from-slate-900 to-[#022A27] rounded-2xl md:rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden mt-12 mb-4 scroll-mt-[120px] text-white">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <MoveUp className="w-32 h-32 text-[#D4AF37]" />
        </div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#D4AF37] opacity-10 blur-[80px] rounded-full"></div>


        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Diamond className="w-6 h-6 text-[#D4AF37]" />
            <span className="text-[#D4AF37] font-bold text-sm md:text-base uppercase tracking-[0.2em] font-fsme">Upgrade Premium</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-lemon mb-4 uppercase tracking-wide leading-tight">
            Cirugía Maxilar de Alta Complejidad
          </h2>
          <div className="inline-block bg-[#D4AF37]/20 border border-[#D4AF37]/40 px-4 py-1.5 rounded-full text-sm font-bold text-[#D4AF37] mb-8 uppercase tracking-widest">
            Exclusivo en Centros Propios
          </div>



          <div className="space-y-6">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 mb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <Zap className="w-6 h-6 text-[#D4AF37] shrink-0" />
                  <h3 className="font-bold text-lg md:text-xl text-white">Suplemento láser de diodo en cirugía periodontal</h3>
                </div>
                <span className="text-[#D4AF37] font-lemon font-bold text-2xl mt-4 md:mt-0 shrink-0">
                  55 € <span className="text-sm font-fsme text-white/70 block md:inline md:ml-1">/acto</span>
                </span>
              </div>
              <p className="text-white/80 font-fsme leading-relaxed text-lg">
                <strong>El beneficio:</strong> Usamos la luz del láser en lugar del bisturí tradicional. Esto cauteriza al instante, desinfecta a nivel microscópico, no sangra y <strong>elimina prácticamente el dolor postoperatorio.</strong>
              </p>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 mb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <Droplet className="w-6 h-6 text-[#D4AF37] shrink-0" />
                  <h3 className="font-bold text-lg md:text-xl text-white">Terapia regenerativa con Plasma (PRGF)</h3>
                </div>
                <span className="text-[#D4AF37] font-lemon font-bold text-2xl mt-4 md:mt-0 shrink-0">
                  150 €
                </span>
              </div>
              <p className="text-white/80 font-fsme leading-relaxed text-lg">
                Usamos las proteínas y factores de crecimiento de tu propia sangre (Plasma Rico en Plaquetas) para aplicarlas en la zona intervenida, logrando que tus encías y huesos <strong>cicatricen a velocidad récord</strong> y de forma totalmente natural.
              </p>
            </div>
          </div>





          <div className="space-y-6">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 mb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <MoveUp className="w-6 h-6 text-[#D4AF37] shrink-0" />
                  <h3 className="font-bold text-lg md:text-xl text-white">Elevación de seno abierto</h3>
                </div>
                <span className="text-[#D4AF37] font-lemon font-bold text-2xl mt-4 md:mt-0 shrink-0">
                  310 €
                </span>
              </div>
              <p className="text-white/80 font-fsme leading-relaxed text-lg mb-3">
                <strong>¿Por qué se hace?</strong> Es una técnica avanzada para pacientes que han perdido las muelas superiores hace mucho tiempo y apenas les queda 1 o 2 milímetros de hueso debajo del pómulo.
              </p>
              <p className="text-white/80 font-fsme leading-relaxed text-lg">
                <strong>La técnica:</strong> A través de una pequeña "ventana" lateral en la encía, elevamos la membrana respiratoria y creamos un gran lecho óseo capaz de soportar futuros implantes con total seguridad.
              </p>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 mb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <Stethoscope className="w-6 h-6 text-[#D4AF37] shrink-0" />
                  <h3 className="font-bold text-lg md:text-xl text-white">Técnicas de Regeneración Tisular Guiada (RTG)</h3>
                </div>
                <span className="text-[#D4AF37] font-lemon font-bold text-2xl mt-4 md:mt-0 shrink-0">
                  325 €
                </span>
              </div>
              <p className="text-white/80 font-fsme leading-relaxed text-lg">
                Técnicas de microcirugía guiada con membrana reabsorbible para reconstruir defectos óseos enormes con la máxima predictibilidad clínica, recuperando la anatomía original de tu maxilar.
              </p>
            </div>
          </div>

        </div>
      </div>
    ),
    cta: {
      title: "Mínima invasión, máxima eficacia",
      infoNote: "La tecnología actual nos permite realizar intervenciones en las encías de forma rápida, segura y con un postoperatorio sumamente llevadero.",
      description: "Acude a uno de nuestros especialistas para valorar la salud profunda de tus encías y la viabilidad de utilizar tecnología láser en tu tratamiento:"
    }
  },

  // 26. CIRUGÍA AVANZADA: EXTRACCIONES COMPLEJAS 
  'cirugia-extracciones': {
    slug: 'cirugia-extracciones',
    activeSubNavId: 'extracciones',
    seoTitle: "Extracciones Complejas y Muelas del Juicio | DKV Dentisalud",
    seoDescription: "Cirugía de muelas del juicio impactadas y amputaciones radiculares. Intervenciones precisas y seguras con la garantía de tu seguro DKV.",
    breadcrumbs: [
      { label: "Inicio", href: "/" },
      { label: "Tratamientos", href: "/tratamientos" },
      { label: "Cirugía Avanzada", href: "/tratamientos/cirugia-avanzada/extracciones" },
      { label: "Extracciones Complejas", href: "#" }
    ],
    hero: {
      badgeText: "Muelas del juicio y más",
      title: { dark: "EXTRACCIONES", normal: "DENTALES" },
      description: [
        "Intervenciones precisas y seguras para pacientes que necesitan extracciones muy complejas o dientes severamente dañados.",
        "Técnicas avanzadas para minimizar el impacto, preservar el hueso sano y asegurar una recuperación rápida y sin complicaciones."
      ]
    },
    rows: [
      {
        id: "muelas-juicio",
        name: "Extracciones",
        subTitle: "Ultimo recurso.",
/*        price: "25 €", */

/*
        subTitle: (
          <div className="flex flex-col gap-2 mb-2">
            <span className="text-dkv-green font-bold text-lg uppercase tracking-[0.2em] font-fsme">Cirugía Menor (con o sin quiste)</span>
          </div>
        ),
*/
/*
        content: (
          <>
            <p>
              <strong>¿Por qué se hace?</strong> Cuando las muelas del juicio vienen torcidas, empujan al resto de dientes causando apiñamiento, o se quedan atrapadas parcial o totalmente bajo el hueso (impactadas).
            </p>
            <div className="bg-dkv-gray-light/50 p-5 rounded-2xl border border-dkv-gray-border/80 mt-4">
              <p className="text-sm text-dkv-gray leading-relaxed m-0">
                A diferencia de una extracción simple, esto requiere una pequeña intervención quirúrgica para partirlas (odontosección) y sacarlas sin dañar el hueso circundante ni los nervios o dientes vecinos de la boca.
              </p>
            </div>
          </>
        ),
*/

        points: [
          {
            icon: '',
            text: <><strong>Diagnóstico. </strong> Si el diente es extraíble, es una <strong>extracción simple</strong>. Si solo queda la raíz, son <strong>restos radiculares</strong>. Si es una muela del juicio erupcionada es <strong>simple</strong>, si está bajo la encía es <strong>submucosa</strong>, y si está dentro del hueso es <strong>cirugía</strong>.
</>
          },
          {
            icon: '',
            text: <><strong>Conservación. </strong> Antes de extraer un molar entero, se puede intentar una <strong>amputación radicular</strong> para salvar la raíz sana.
</>
          },

          {
            icon: '',
            text: <><strong>Regeneración. </strong>  Tras cualquier extracción compleja o de muela del juicio, es muy recomendable un <strong>tratamiento regenerativo alveolar</strong> para preservar el hueso para un futuro implante. .
</>
          }

        ],


        priceGroups: [
          {
            title: "Extracciòn dental",
            description: "(no muelas del juicio)",
            items: [
              { icon: '',
title: "Extracción dental simple", description: "Diente visible en la boca, generalmente sin necesidad de incisión en la encía.", price: "Incluido"},
              { icon: '',
title: "Extracción dental compleja. Restos radiculares", description: "Raíces dentales fracturadas o remanentes de dientes que han perdido su corono. A menudo requiere incisión en encía para acceder a la raíz.", price: "Incluido"},
              { icon: '',
title: "Amputación radicular (hemisección)", description: "Eliminar una de las raíces de un molar multirradicular por estar dañada, conservando el resto del diente sano. Evita la extracción de todo el diente.", price: "Incluido"}

            ]
          },
          {
            title: "Muela del juicio",
            description: "",
            items: [
              { icon: '',
title: "Extracción Muela del juicio normal", description: "La muela ha salido ya completamente de la encía. A veces se sutura.", price: "15 €" },
              { icon: '',
title: "Extracción Muela del juicio submucosa", description: "La muela no ha erupcionado del todo, está cubierta al menos en parte por la encía, pero no llega a estar retenida en el hueso.", price: "15 €"},
              { icon: '',
title: "Cirugía Muela del juicio", description: "Para muelas retenidas en el hueso o en posición horizontal. Con o sin quiste dentinario.", price: "25 €"}

            ]
          },
          {
            title: "Tratamiento regenerativo Alveolar Post-Exodoncia",
            description: "Tras una extracción es muy recomendable para evitar que el hueso alveolar (donde estaba la raíz) se pierda o reabsorba, preparando la zona para un futuro implante.",
            items: [
              { icon: '',
title: "Una pieza", description: "Tras sacar el diente, se coloca hueso artifical en el alveolo para favorecer la cicatrización ósea. Incluye materiales de relleno.", price: "80 €" },
              { icon: '',
title: "Más de una pieza", description: "Similar al anterior pero aplicado a la extracción de dos o más dientes. Incluye materiales de relleno.", price: "150 €"}
            ]
          }

        ]

      }
    ],
    cta: {
      title: "En manos expertas",
      infoNote: "La cirugía oral avanzada requiere pericia y experiencia. Nuestros cirujanos maxilofaciales y odontólogos especialistas garantizan intervenciones limpias con el mejor postoperatorio posible.",
      description: "Si te han diagnosticado la necesidad de extraer una muela del juicio o un caso complejo, busca tu clínica DKV más cercana y ponte en las mejores manos:"
    }
  }


};

export function getTreatmentDefinition(slug: string): TreatmentDefinition | undefined {
  return treatmentsRegistry[slug];
}