// data/treatments.tsx


import { TreatmentDefinition } from '@/types/treatments';
import { Diamond, ShieldCheck, Smile, Sparkles, Layers, Settings, Activity, Wind, CheckCircle2, AlertCircle, Info, Bug, HeartPulse, Stethoscope, Microscope, RefreshCcw, Scissors, Moon, Heart, Zap, Baby, ShieldAlert, ArrowLeftRight, ClipboardList, Scan, Brain, Paintbrush, BookOpen, Ruler, Droplet, CalendarCheck, ShieldPlus, Link as LinkIcon, MoveUp } from 'lucide-react'; 
import ShareButton from "@/components/ui/ShareButton";

export const treatmentsRegistry: Record<string, TreatmentDefinition> = {
  
  // 1. BLANQUEAMIENTO DENTAL
  'estetica-blanqueamiento': {
    slug: 'estetica-blanqueamientoo',
    activeSubNavId: 'blanqueamiento',
    seoTitle: "Blanqueamiento Dental Profesional | Resultados Rápidos",
    seoDescription: "Recupera el blanco natural de tus dientes sin dañar el esmalte. Presupuesto claro y sin sorpresas. Encuentra tu clínica más cercana y luce tu sonrisa hoy.",
    breadcrumbs: [
      { label: "Tratamientos", href: "/#tratamientos" },
      { label: "Estética Dental", href: "/?modal=1#tratamientos" },
      { label: "Blanqueamiento", href: "#" }
    ],
    hero: {
      badgeText: "Recupera la luz de tu sonrisa",
      title: { dark: "BLANQUEAMIENTO", normal: "DENTAL" },
      description: [
        "Elimina manchas (café, tabaco, ...) sin dañar tu esmalte. Una sonrisa más joven y brillante en un tratamiento rápido y 100% seguro."
      ]
    },
    rows: [
      {
        id: "blanqueamiento-consultorio",
        name: "Blanqueamiento Dental en Consulta",
        subTitle: "El tratamiento ideal si buscas resultados casi inmediatos.",
        points: [
          { icon: 'Consultorio1', text: <>Sesión aproximada de <strong className="text-dkv-green-dark font-bold">una hora.</strong> Rápido y eficaz.</> },
          { icon: 'Consultorio2', text: <><strong className="text-dkv-green-dark font-bold">Protección avanzada.</strong> Aislamiento cuidadoso de encías.</> },
          { icon: 'Consultorio3', text: <><strong className="text-dkv-green-dark font-bold">Gel de alta concentración activado por luz de plasma o láser.</strong> Activación potente.</> },
          { icon: 'Consultorio4', text: <><strong className="text-dkv-green-dark font-bold">Resultado inmediato.</strong> Sonrisa notablemente más blanca el mismo día.</> }
        ],
        detailedPrices: [
          {
            icon: '',
            title: [
              { tipo: 'normal', texto: 'Blanqueamiento Dental en consulta' },
              { tipo: 'oculto', texto: '. Precio: 250 €.' }
            ],
            description: 'Tratamiento intensivo bajo supervisión para un aclarado rápido de color',
            price: '250 €'
          },
        ],
        footerNote: "* Precio por sesión."
      },
      {
        id: "blanqueamiento-domicilio",
        name: "Blanqueamiento Dental con férulas (en casa)",
        subTitle: "Perfecto para dientes sensibles. Un aclarado de color cómodo y respetuoso.",
        points: [
          { icon: 'Ferulas1', text: <><strong className="text-dkv-green-dark font-bold">Suave y progresivo.</strong><br />Blanqueamiento cómodo en tu hogar.</> },
          { icon: 'Ferulas2', text: <><strong className="text-dkv-green-dark font-bold">Férulas a medida.</strong><br />Moldes personalizados para un ajuste perfecto.</> },
          { icon: 'Ferulas3', text: <><strong className="text-dkv-green-dark font-bold">Kit profesional completo.</strong><br />Gel blanqueador incluido.</> },
          { icon: 'Ferulas4', text: <><strong className="text-dkv-green-dark font-bold">Uso nocturno cómodo.</strong><br />Resultados visibles en semanas.</> }
        ],
        detailedPrices: [
          {
            icon: '',
            /* ✨ */ title: [
              { tipo: 'normal', texto: 'Blanqueamiento Dental en domicilio' },
              { tipo: 'oculto', texto: '. Precio: 216 €.' }
            ],
            description: 'Sistema gradual con férulas nocturnas adaptadas.',
            price: '216 €'
          },
        ],
        footerNote: "* Precio por tratamiento completo."
      },
      {
        id: "blanqueamiento-combinado",
        name: "Blanqueamiento Dental Combinado",
        subTitle: <>Choque rápido en la clínica + mantenimiento en casa. El estándar de oro médico para un blanco más profundo y duradero.</>,
        points: [
          { icon: 'Combinado1', text: <><strong className="text-dkv-green-dark font-bold">Sesión Intensiva en Clínica.</strong><br />Aproximadamente una hora activada por luz de plasma o láser.</> },
          { icon: 'Combinado2', text: <><strong className="text-dkv-green-dark font-bold">Toma de Moldes a Medida.</strong><br />Confección de férulas personalizadas para un ajuste perfecto.</> },
          { icon: 'Combinado3', text: <><strong className="text-dkv-green-dark font-bold block">Kit Profesional para Casa.<br />Blanqueamiento Espectacular.</strong>Tono blanco, estable y duradero, a lo largo de los años.</> }
        ],
        detailedPrices: [
          {
            icon: '',
            /* ✨ */ title: [
              { tipo: 'normal', texto: 'Blanqueamiento Dental combinado' },
              { tipo: 'oculto', texto: ' (en casa y en domicilio). Precio: 300 €.' }
            ],
            description: 'Enérgico en clíncia + estabilización en casa.',
            price: '300 €'
          },
        ],
        footerNote: "* Precio por tratamiento combinado completo."
      },
      {
        id: "blanqueamiento-interno",
        name: "Blanqueamiento Dental Interno (Dientes oscuros)",
        subTitle: <>Devuelve la luz a un diente oscurecido tras un golpe o una endodoncia.</>,
        points: [
          { icon: 'DienteOscuro', text: <><strong className="text-dkv-green-dark font-bold">Diente oscurecido.</strong><br />Tras un fuerte golpe o una endodoncia.</> },
          { icon: 'BlanqueamientoInt', text: <><strong className="text-dkv-green-dark font-bold">Blanqueamiento interno.</strong><br />Se realiza desde el interior del diente.</> },
          { icon: 'ColorIgualado', text: <><strong className="text-dkv-green-dark font-bold">Color igualado.</strong><br />Para igualar su color con los dientes vecinos sanos.</> }
        ],
        detailedPrices: [
          {
            icon: '',
            /* ✨ */ title: [
              { tipo: 'normal', texto: 'Blanqueamiento Dental diente no vital' },
              { tipo: 'oculto', texto: '. Precio: 50 €.' }
            ],
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
     /* 🗑️  seoTitle: "Carillas Dentales y Diseño de Sonrisa | Precios DKV Dentisalud", */
     /* 🗑️  seoDescription: "Cambia el color, forma y tamaño de tus dientes. Descubre nuestras carillas de composite, porcelana y disilicato de litio con diseño digital 3D.", */
    /* ✨ */  seoTitle: "Carillas Dentales Estéticas | Sonrisa Natural y Definitiva",
    /* ✨ */   seoDescription: "Diseña tu sonrisa con carillas ultrafinas. Alta estética y naturalidad con tarifas transparentes. Pide cita de valoración en tu centro dental más cercano.",
    breadcrumbs: [
      { label: "Tratamientos", href: "/#tratamientos" },
      { label: "Estética Dental", href: "/?modal=1#tratamientos" },
      { label: "Carillas y Diseño", href: "#" }
    ],
    hero: {
      badgeText: "Diseña tu sonrisa",
      title: { dark: "CARILLAS", normal: "DENTALES" },
      description: [
        "Mejora la estética de tus dientes, cierra espacios y consigue una sonrisa armónica."
      ]
    },
    rows: [
      {
        id: "carillas-composite",
        name: "Carillas de composite (resina)",
        subTitle: <> Esculpidas a mano directamente sobre tu diente en una sola sesión. Ideales para pequeñas correcciones, fracturas o presupuestos ajustados.</>,
        points: [
          { icon: 'Timer', text: <><strong className="text-dkv-green-dark font-bold">Rápido y económico.</strong><br />En una sola sesión.</> },
          { icon: 'Paintbrush', text: <><strong className="text-dkv-green-dark font-bold">Modelado directo.</strong><br />Resina estética capa a capa sobre tu diente.</> },
          { icon: 'Zap', text: <><strong className="text-dkv-green-dark font-bold">Endurecido con luz.</strong><br />Resultado inmediato.</> }
        ],
        detailedPrices: [
          {
            icon: '',
            /* ✨ */ title: [
              { tipo: 'normal', texto: 'Carilla de composite' },
              { tipo: 'oculto', texto: '. Precio: 75 €.' }
            ],
            description: 'Reconstrucción estética modelada directamente en clínica.',
            price: '75 €'
          },
        ],
        footerNote: "* Precio por pieza tratada."
      },
      {
        id: "carillas-porcelana",
        name: "Carillas de Porcelana (Alta Estética)",
        subTitle: <> Fabricadas en laboratorio a medida. Aportan una naturalidad insuperable, no pierden su brillo y jamás se tiñen con el café o el tabaco.</>,
        points: [
          { icon: 'Porcelain1', text: <><strong className="text-dkv-green-dark font-bold">Estabilidad cromática.</strong><br />Máxima estabilidad, años sin teñirse (no café, tabaco).</> },
          { icon: 'Porcelain2', text: <><strong className="text-dkv-green-dark font-bold">Fabricado individualmente.</strong><br />A medida en laboratorio (no losetas).</> },
          { icon: 'Porcelain3', text: <><strong className="text-dkv-green-dark font-bold">Superficie impermeable.</strong><br />No absorbe café ni tabaco.</> }
        ],
        detailedPrices: [
          {
            icon: 'Porcelain4',
            /* ✨ */ title: [
              { tipo: 'normal', texto: 'Carilla de Porcelana' },
              { tipo: 'oculto', texto: '. Precio: 180 €.' }
            ],
            description: 'Lámina cerámica de alta resistencia fabricada a medida. (Precio por diente).',
            price: '180 €'
          },
          {
            icon: 'Porcelain5',
            /* ✨ */ title: [
              { tipo: 'normal', texto: 'Suplemento Efecto Especial Carilla Porcelana' },
              { tipo: 'oculto', texto: '. Precio: + 50 €.' }
            ],
            description: 'Pintado y texturizado para recrear transparencias naturales.',
            price: <span className="text-dkv-green">+ 50 €</span>
          }
        ]
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
     /* 🗑️  seoTitle: "Incrustaciones Estéticas Dentales | Precios DKV Dentisalud", */
     /* 🗑️  seoDescription: "Salva tu muela dañada con incrustaciones de porcelana a medida sin necesidad de tallarla. Estética, resistencia 100% invisible y tarifas exclusivas DKV.", */
    /* ✨ */  seoTitle: "Incrustaciones Dentales | Salva tu Muela sin Fundas",
    /* ✨ */   seoDescription: "La alternativa conservadora a las coronas para muelas muy rotas. Máxima resistencia masticatoria con un precio sin sorpresas. Descubre tu clínica más próxima.",
    breadcrumbs: [
      { label: "Tratamientos", href: "/#tratamientos" },
      { label: "Estética Dental", href: "/?modal=1#tratamientos" },
      { label: "Incrustaciones", href: "#" }
    ],
    hero: {
      badgeText: "Restauración Conservadora",
      title: { dark: "INCRUSTACIONES", normal: "ESTÉTICAS" },
      description: [
        "Salva tu muela sin necesidad de una corona (funda). Reponemos solo la parte dañada con una pieza a medida que devuelve el 100% de la fuerza y estética natural."      ]
    },
    rows: [
      {
        id: "incrustacion-porcelana",
        name: "Incrustación Estética de Porcelana (Alta Resistencia)",
        subTitle: <> La opción más estética y duradera. Ideal para molares que soportan mucha fuerza al masticar o tras una endodoncia.</>,
        points: [
          { icon: 'Incrustacion1', text: <><strong className="text-dkv-green-dark font-bold">Reconstrucción Estética.</strong> Restaura la estructura perdida tras caries muy extensas.</> },
          { icon: 'Incrustacion2', text: <><strong className="text-dkv-green-dark font-bold">Indicación.</strong> Recomendado para molares con grandes destrucciones o tratamiento de conducto.</> },
          { icon: 'Incrustacion3', text: <><strong className="text-dkv-green-dark font-bold">Alternativa Conservadora.</strong> Reconstrucción que preserva el diente sano frente a una corona.</> }
        ],
        detailedPrices: [
          {
            icon: '',
            /* ✨ */ title: [
              { tipo: 'normal', texto: 'Incrustación de porcelana' },
              { tipo: 'oculto', texto: '. Precio: 140 €.' }
            ],
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
     /* 🗑️  seoTitle: "Prótesis Removibles y Dentaduras Postizas | Precios DKV", */
     /* 🗑️  seoDescription: "Aparatos dentales de quita y pon. Prótesis completas, flexibles sin ganchos metálicos y esqueléticos con tarifas exclusivas DKV Dentisalud.", */
    /* ✨ */  seoTitle: "Dentaduras Postizas y Prótesis Removibles | Cómodas y Seguras",
    /* ✨ */   seoDescription: "Recupera tu capacidad de masticar con aparatos dentales modernos y estéticos. Presupuesto claro desde el primer día en tu clínica de confianza más cercana.",
    breadcrumbs: [
      { label: "Tratamientos", href: "/#tratamientos" },
      { label: "Prótesis y Rehabilitación", href: "/?modal=5#tratamientos" },
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
    rows: [
      {
        id: "completas",
        name: "Prótesis Removible Completa",
        image: "/images/icons/protesis completa2 - hero.png",
        subTitle: <> <strong className="block text-dkv-green-dark/80 mt-1">Para quien no tiene ningún diente.</strong>Recupera la sonrisa completa al instante. Ideal para una <strong className="block text-dkv-green-dark/80 mt-1">rehabilitación total a bajo coste.</strong></>,
        price: "370 €",
        points: [
          { icon: 'ProtesisCompleta1', text: <><strong className="text-dkv-green-dark font-bold">Rehabilitación Tradicional.</strong><br />La solución de confianza "de toda la vida".</> },
          { icon: 'ProtesisCompleta5', text: <><strong className="text-dkv-green-dark font-bold">Soporte labial.</strong><br />Devuelve el soporte natural a los labios, reduciendo arrugas peribucales.</> },
          { icon: 'ProtesisCompleta6', text: <><strong className="text-dkv-green-dark font-bold">Restauración Funcional.</strong><br />Recuperación de la capacidad de masticar.</> },
          { icon: 'ProtesisCompleta2', text: <><strong className="text-dkv-green-dark font-bold">Ajuste por Succión.</strong><br />Sujeción natural mediante saliva sobre la encía.</> },
          { icon: 'ProtesisCompleta3', text: <><strong className="text-dkv-green-dark font-bold">Fácil Mantenimiento.</strong><br />Material de resina, de fácil higiene diaria.</> },
          { icon: 'ProtesisCompleta4', text: <><strong className="text-dkv-green-dark font-bold block">Consejo de Estabilidad.</strong>Se recomienda el uso de crema fijadora para un mejor fijado.</> }
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
          { icon: 'ProtesisFlexible4', text: <><strong className="text-dkv-green-dark font-bold">Material flexible </strong><br /> que evita dolorosas rozaduras.</> },
          { icon: 'ProtesisFlexible5', text: <><strong className="text-dkv-green-dark font-bold">Estética superior.</strong><br />Sin ganchos de metal. Resultan casi invisibles cuando sonríes.</> }
        ],
        detailedPrices: [
          {
            icon: 'ProtesisFlexible1',
            /* ✨ */ title: [
              { tipo: 'oculto', texto: 'Prótesis parcial flexible ' },
              { tipo: 'normal', texto: 'De 1 a 4 piezas dentales' },
              { tipo: 'oculto', texto: '. Precio: 477 €.' }
            ],
            description: '',
            price: '477 €'
          },
          {
            icon: 'ProtesisFlexible2',
            /* ✨ */ title: [
              { tipo: 'oculto', texto: 'Prótesis parcial flexible ' },
              { tipo: 'normal', texto: 'De 5 a 6 piezas dentales' },
              { tipo: 'oculto', texto: '. Precio: 532 €.' }
            ],
            description: '',
            price: '532 €'
          }, 
          {
            icon: 'ProtesisFlexible3',
            /* ✨ */ title: [
              { tipo: 'oculto', texto: 'Prótesis parcial flexible ' },
              { tipo: 'normal', texto: 'Más de 7 piezas dentales' },
              { tipo: 'oculto', texto: '. Precio: 584 €.' }
            ],
            description: '',
            price: '584 €'
          },
          {
            icon: '',
            /* ✨ */ title: [
              { tipo: 'normal', texto: '' },
              { tipo: 'oculto', texto: 'Suplemento resinas hipoarlergénicas. Precio: + 48 €.' }
            ],
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
            /* ✨ */ title: [
              { tipo: 'oculto', texto: 'Prótesis parcial esquelética ' },
              { tipo: 'normal', texto: 'De 1 a 4 piezas dentales' },
              { tipo: 'oculto', texto: '. Precio: 345 €.' }
            ],
            description: '',
            price: '345 €'
          },
          {
            icon: 'ProtesisEsqueletica2',
            /* ✨ */ title: [
              { tipo: 'oculto', texto: 'Prótesis parcial esquelética ' },
              { tipo: 'normal', texto: 'De 5 a 6 piezas dentales' },
              { tipo: 'oculto', texto: '. Precio: 434 €.' }
            ],
            description: '',
            price: '434 €'
          }, 
          {
            icon: 'ProtesisEsqueletica3',
            /* ✨ */ title: [
              { tipo: 'oculto', texto: 'Prótesis parcial esquelética ' },
              { tipo: 'normal', texto: 'De 7 a 8 piezas dentales' },
              { tipo: 'oculto', texto: '. Precio: 551 €.' }
            ],
            description: '',
            price: '551 €'
          }, 
          {
            icon: 'ProtesisEsqueletica4',
            /* ✨ */ title: [
              { tipo: 'oculto', texto: 'Prótesis parcial esquelética ' },
              { tipo: 'normal', texto: 'Más de 8 piezas dentales' },
              { tipo: 'oculto', texto: '. Precio: 650 €.' }
            ],
            description: '',
            price: '650 €'
          }
        ],
        points: [
          { icon: '', text: <><strong>Para los que quieren saborear la comida.</strong> En lugar de llevar mucho plástico rosa que tapa el paladar, estas prótesis tienen un "esqueleto" de metal muy fino y resistente. Al no tapar el paladar, la comida sabe mejor, ocupan menos espacio en la boca y son extremadamente estables al masticar.</> }
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
            /* ✨ */ title: [
              { tipo: 'oculto', texto: 'Prótesis parcial de resina acrílica ' },
              { tipo: 'normal', texto: 'De 1 a 4 piezas dentales' },
              { tipo: 'oculto', texto: '. Precio: 209 €.' }
            ],
            description: '',
            price: '209 €'
          },
          {
            icon: 'ProtesisAcrilica2',
            /* ✨ */ title: [
              { tipo: 'oculto', texto: 'Prótesis parcial de resina acrílica ' },
              { tipo: 'normal', texto: 'De 5 a 6 piezas dentales' },
              { tipo: 'oculto', texto: '. Precio: 281 €.' }
            ],
            description: '',
            price: '281 €'
          }, 
          {
            icon: 'ProtesisAcrilica3',
            /* ✨ */ title: [
              { tipo: 'oculto', texto: 'Prótesis parcial de resina acrílica ' },
              { tipo: 'normal', texto: 'Más de 7 piezas dentales' },
              { tipo: 'oculto', texto: '. Precio: 353 €.' }
            ],
            description: '',
            price: '353 €'
          }
        ],
        points: [
          { icon: '', text: <>Cuando te faltan algunas piezas y buscas salir del paso <strong>sin hacer un gran desembolso</strong>. Llevan una base de resina rosa (imitando la encía) y unos ganchitos de metal convencionales para agarrarse a tus dientes sanos restantes.</> }
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
                /* ✨ */ title: [
                  { tipo: 'normal', texto: 'Ganchos Estéticos' },
                  { tipo: 'oculto', texto: '. Precio: + 56 €.' }
                ],
                description: "Por unidad. Sustituimos el gancho de metal gris que sujeta la prótesis por uno transparente o color encía.", 
                price: <span className="text-dkv-green">+ 56 €</span>},
              { icon: '',
                /* ✨ */ title: [
                  { tipo: 'normal', texto: 'Metales Nobles / Seminobles' },
                  { tipo: 'oculto', texto: '. Precio: + 72 €.' }
                ],
                description: "Aleaciones exclusivas recomendadas para pacientes con alergias a ciertos metales.", 
                price: <span className="text-dkv-green">+ 72 €</span>},
              { icon: '',
                /* ✨ */ title: [
                  { tipo: 'normal', texto: 'Dientes de Porcelana' },
                  { tipo: 'oculto', texto: '. Precio: + 90 €.' }
                ],
                description: "Sustituimos los dientes de resina del aparato por cerámica. Ideal si tienes una mordida muy fuerte.", 
                price: <span className="text-dkv-green">+ 90 €</span>}
            ]
          },
          {
            title: "Ataches-aditamentos",
            description: "Son 'corchetes' totalmente ocultos. Se usan para enganchar la prótesis de quita y pon a unas fundas fijas sin que se vea absolutamente nada de metal al sonreir.",
            items: [
              { icon: '',
                /* ✨ */ title: [
                  { tipo: 'oculto', texto: 'Ataches-aditamentos ' },
                  { tipo: 'normal', texto: 'De precisión simple' },
                  { tipo: 'oculto', texto: '. Precio: 108 €.' }
                ],
                description: "", price: "108 €" },
              { icon: '',
                /* ✨ */ title: [
                  { tipo: 'oculto', texto: 'Ataches-aditamentos ' },
                  { tipo: 'normal', texto: 'De precisión compleja' },
                  { tipo: 'oculto', texto: '. Precio: 120 €.' }
                ],
                description: "", price: "120 €" }
            ]
          },
          {
            title: "Arreglos",
            description: "Cuando un aparato se parte, pierde un gancho o cuando necesitas añadirle un diente nuevo a tu prótesis actual.",
            items: [
              { icon: '',
                /* ✨ */ title: [
                  { tipo: 'normal', texto: 'Añadir una pieza o gancho al aparato' },
                  { tipo: 'oculto', texto: '. Precio: 49 €.' }
                ],
                description: "Si pierdes un diente natural más, o se rompe una sujeción, se lo añadimos a la prótesis que ya tienes.",
                price: "49 €" },
              { icon: '',
                /* ✨ */ title: [
                  { tipo: 'normal', texto: 'Compostura en aparato partido de resina' },
                  { tipo: 'oculto', texto: '. Precio: 43 €.' }
                ],
                description: "Para cuando el aparato de resina acrílica sufre un golpe (típica caída al lavabo al limpiarlo) y se parte.",
                price: "43 €" },
              { icon: '',
                /* ✨ */ title: [
                  { tipo: 'normal', texto: 'Otras composturas' },
                  { tipo: 'oculto', texto: '. Precio: 36 €.' }
                ],
                description: "Ajustes estructurales menores en laboratorio.",
                price: "36 €" }
            ]
          },
          {
            title: "Rebases",
            description: "Con el tiempo, al no haber raíces, tu hueso y tu encía merman (se encogen). Como resultado, un aparato que antes encajaba perfecto, ahora empieza a 'bailar'. El rebase consiste en rellenar la prótesis por dentro con resina nueva para que vuelva a encajar como un guante.",
            items: [
              { icon: '',
                /* ✨ */ title: [
                  { tipo: 'normal', texto: 'Rebase en consulta' },
                  { tipo: 'oculto', texto: '. Precio: 50 €.' }
                ],
                description: "Método rápido realizado en el propio sillón dental con resinas autopolimerizables.",
                price: "50 €" },
              { icon: '',
                /* ✨ */ title: [
                  { tipo: 'normal', texto: 'Rebase en laboratorio' },
                  { tipo: 'oculto', texto: '. Precio: 65 €.' }
                ],
                description: "Más resistente y duradero. Se toman medidas y se realiza un relleno con resina termopolimerizada de alta densidad.",
                price: "65 €" },
              { icon: '',
                /* ✨ */ title: [
                  { tipo: 'normal', texto: 'Compostura de rebases' },
                  { tipo: 'oculto', texto: '. Precio: 70 €.' }
                ],
                description: "Para ajustes mayores o reestructuraciones completas del lecho de la prótesis.",
                price: "70 €" }
            ]
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
     /* 🗑️  seoTitle: "Prótesis Fijas y Coronas Dentales | Precios DKV Dentisalud", */
     /* 🗑️  seoDescription: "Dientes artificiales que no se quitan. Coronas de zirconio, puentes de porcelana y restauraciones estéticas con tarifas exclusivas DKV.", */
    /* ✨ */  seoTitle: "Prótesis Fijas y Coronas Dentales | Dientes que No se Quitan",
    /* ✨ */   seoDescription: "Recupera la firmeza al masticar con coronas de zirconio y metal-cerámica. Alta durabilidad y presupuesto transparente. Encuentra tu clínica más cercana.",
    breadcrumbs: [
      { label: "Tratamientos", href: "/#tratamientos" },
      { label: "Prótesis y Rehabilitación", href: "/?modal=5#tratamientos" },
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
          { icon: '', text: <><strong>Motivo:</strong> El diente dañado está en una zona visible y quieres que nadie note que es falso.</> },
          { icon: '', text: <><strong>Cómo se hace:</strong> Tallamos un poco tu diente, tomamos medidas exactas y el laboratorio crea una funda o "corona" que encaja a la perfección, imitando la luz y textura natural.</> }
        ],
        priceGroups: [
          {
            title: "Sin metal",
            description: "",
            items: [
              { icon: '',
                /* ✨ */ title: [
                  { tipo: 'normal', texto: 'Corona de cerámica' },
                  { tipo: 'oculto', texto: '. Precio: 299 €.' }
                ],
                description: "Deja pasar la luz natural, ideal para dientes frontales.", 
                price: "299 €" },
              { icon: '',
                /* ✨ */ title: [
                  { tipo: 'normal', texto: 'Corona o Puente de Zirconio' },
                  { tipo: 'oculto', texto: '. Precio: 325 €.' }
                ],
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
          { icon: '', text: <><strong>Motivo:</strong> Buscas máxima resistencia para masticar en las muelas del fondo, o tienes un presupuesto más ajustado y la estética perfecta no es tu máxima prioridad.</> }
        ],
        detailedPrices: [
          {
            /* ✨ */ title: [
              { tipo: 'normal', texto: 'Corona o puente de metal con porcelana' },
              { tipo: 'oculto', texto: '. Precio: 210 €.' }
            ],
            description: "Interior de metal noble / seminoble para soportar fuerza extrema, y exterior recubierto de porcelana blanca.",
            price: "210 €"
          },
          {
            /* ✨ */ title: [
              { tipo: 'normal', texto: 'Corona o puente de metal con resina' },
              { tipo: 'oculto', texto: '. Precio: 144 €.' }
            ],
            description: "Más económico. Exterior cubierto de resina estética en lugar de cerámica.",
            price: "144 €"
          },
          {
            /* ✨ */ title: [
              { tipo: 'normal', texto: 'Corona o puente de metal' },
              { tipo: 'oculto', texto: '. Precio: 100 €.' }
            ],
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
          { icon: 'Incrustacion1', text: <><strong className="text-dkv-green-dark font-bold">Reconstrucción Estética.</strong> Restaura la estructura perdida tras caries muy extensas.</> },
          { icon: 'Incrustacion2', text: <><strong className="text-dkv-green-dark font-bold">Indicación.</strong> Recomendado para molares con grandes destrucciones o tratamiento de conducto.</> },
          { icon: 'Incrustacion3', text: <><strong className="text-dkv-green-dark font-bold">Alternativa Conservadora.</strong> Reconstrucción que preserva el diente sano frente a una corona.</> }
        ],
        detailedPrices: [
          {
            /* ✨ */ title: [
              { tipo: 'normal', texto: 'Incrustación de resina' },
              { tipo: 'oculto', texto: '. Precio: 65 €.' }
            ],
            description: "",
            price: "65 €"
          },
          {
            /* ✨ */ title: [
              { tipo: 'normal', texto: 'Incrustación de composite' },
              { tipo: 'oculto', texto: '. Precio: 72 €.' }
            ],
            description: "",
            price: "72 €"
          },
          {
            /* ✨ */ title: [
              { tipo: 'normal', texto: 'Incrustación estética de porcelana' },
              { tipo: 'oculto', texto: '. Precio: 140 €.' }
            ],
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
          { icon: '', text: <><strong>Motivo:</strong> Cuando se logra salvar tu raíz natural pero el resto del diente no es suficiente para tallar la base de la corona.</> },
          { icon: '', text: <><strong>Cómo se hace:</strong> Fabricamos un "pilar" a medida que va inserto en la raíz para pegar encima la corona.</> }
        ]
      },
      {
        id: "suplementos-fijos",
        name: "Suplementos Especiales y Refuerzos",
        subTitle: "Técnicas avanzadas.",
        points: [
          { icon: '', text: <>Dar soporte o evitar dañar piezas sanas en casos concretos.</> }
        ],
        detailedPrices: [
          {
            /* ✨ */ title: [
              { tipo: 'normal', texto: 'Puente tipo Maryland' },
              { tipo: 'oculto', texto: '. Precio: 70 €.' }
            ],
            description: "Un suplemento para pegar un diente falso apoyándose en la parte trasera de los dientes vecinos mediante unas \"aletas\", sin tener que limarlos apenas.",
            price: "70 €"
          },
          {
            /* ✨ */ title: [
              { tipo: 'normal', texto: 'Barra de Ackerman' },
              { tipo: 'oculto', texto: '. Precio: 70 €.' }
            ],
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
          { icon: '', text: <>Soluciones para coronas y puentes que han sufrido una fractura estética o que simplemente necesitan ser vueltos a cementar.</> }
        ],
        priceGroups: [
          {
            title: "Cementación de coronas y puentes caídos",
            description: "",
            items: [
              { icon: '',
                /* ✨ */ title: [
                  { tipo: 'oculto', texto: 'Cementación de coronas y puentes caídos. Precio: 22 €.' }
                ],
                description: "Si se te ha despegado una funda que está en buen estado, te la volvemos a pegar con un cemento especial de alta resistencia.", 
                price: "22 €"}
            ]
          },
          {
            title: "Soldar metal",
            description: "",
            items: [
              { icon: '',
                /* ✨ */ title: [
                  { tipo: 'oculto', texto: 'Soldar metal en prótesis fija. Precio: 36 €.' }
                ],
                description: "Para puentes o esqueléticos que han sufrido una fractura en su estructura interna.", 
                price: "36 €"}
            ]
          },
          {
            title: "Reparaciones de facetas estéticas",
            description: "Si se te ha 'desconchado' la capa blanca visible de una corona, la reparamos sin tener que cambiarla entera.",
            items: [
              { icon: '',
                /* ✨ */ title: [
                  { tipo: 'oculto', texto: 'Reparaciones de facetas estéticas: ' },
                  { tipo: 'normal', texto: 'Faceta de Resina' },
                  { tipo: 'oculto', texto: '. Precio: 43 €.' }
                ],
                description: "", price: "43 €"},
              { icon: '',
                /* ✨ */ title: [
                  { tipo: 'oculto', texto: 'Reparaciones de facetas estéticas: ' },
                  { tipo: 'normal', texto: 'Faceta de Porcelana' },
                  { tipo: 'oculto', texto: '. Precio: 45 €.' }
                ],
                description: "", price: "45 €"},
              { icon: '',
                /* ✨ */ title: [
                  { tipo: 'oculto', texto: 'Reparaciones de facetas estéticas: ' },
                  { tipo: 'normal', texto: 'Faceta de Cerámica' },
                  { tipo: 'oculto', texto: '. Precio: 50 €.' }
                ],
                description: "", price: "50 €"}
            ]
          },
          {
            title: "Ajustes oclusales",
            description: "En prótesis ya colocadas.",
            items: [
              { icon: '',
                /* ✨ */ title: [
                  { tipo: 'oculto', texto: 'Ajustes oclusales en prótesis fija. Incluido (gratuito en consulta para asociad@ a DKV DENTISALUD ELITE).' }
                ],
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
     /* 🗑️  seoTitle: "Oclusión y Férulas de Bruxismo | Precios DKV Dentisalud", */
     /* 🗑️  seoDescription: "Protege tus dientes y articulación del desgaste nocturno. Férulas de descarga a medida y rehabilitación oclusal con tarifas exclusivas DKV.", */
    /* ✨ */  seoTitle: "Férula de Descarga a Medida | Frena el Bruxismo y el Dolor",
    /* ✨ */   seoDescription: "Protege tus dientes del desgaste nocturno y alivia la tensión de la mandíbula. Férulas exactas con tarifas claras. Solicita valoración en tu centro más cercano.",
    breadcrumbs: [
      { label: "Tratamientos", href: "/#tratamientos" },
      { label: "Prótesis y Rehabilitación", href: "/?modal=5#tratamientos" },
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
    rows: [
      {
        id: "ferulas",
        name: "Férulas de Descarga y Protección",
        image: "/images/icons/ferula descarga - hero.png",
        subTitle: <> Fabricada a medida exacta, permite que tu mandíbula resbale libremente, "desprogramando" el hábito de apretar y minimizando el desgaste dental nocturno.</>,
        price: "Desde 108 €",
        points: [
          { icon: 'BruxismoFerula1', text: <><strong className="text-dkv-green-dark font-bold">Frenar Desgaste Dental.</strong> Protege tus dientes del desgaste por bruxismo.</> },
          { icon: 'BruxismoFerula2', text: <><strong className="text-dkv-green-dark font-bold">Relajación Muscular.</strong> Alivia la tensión en la mandíbula y el cuello.</> },
          { icon: 'BruxismoFerula3', text: <><strong className="text-dkv-green-dark font-bold">Tratamiento Articular (ATM).</strong> Diseñada para problemas graves de ATM.</> },
          { icon: 'BruxismoFerula4', text: <><strong className="text-dkv-green-dark font-bold">Alivio de Sintomatología.</strong> Solucion para ruidos, dolores córniocos y bloqueos.</> }
        ],
        priceGroups: [
          {
            title: "Férulas",
            description: "",
            items: [
              {
                /* ✨ */ title: [
                  { tipo: 'normal', texto: 'Férula de descarga simple' },
                  { tipo: 'oculto', texto: '. Precio: 108 €.' }
                ],
                description: "Estándar para frenar el desgaste de los dientes y relajar la musculatura de la mandíbula y el cuello.",
                price: "108 €"
              },
              {
                /* ✨ */ title: [
                  { tipo: 'normal', texto: 'Férula compleja (Patología articular)' },
                  { tipo: 'oculto', texto: '. Precio: 217 €.' }
                ],
                description: "Especial y más gruesa. Diseñada para pacientes que ya tienen problemas graves en la articulación (ATM): Ruidos al abrir la boca, dolores crónicos o bloqueos.",
                price: "217 €"
              }
            ]
          },
          {
            title: "Preparación",
            description: "",
            items: [
              {
                /* ✨ */ title: [
                  { tipo: 'normal', texto: 'Análisis Oclusal' },
                  { tipo: 'oculto', texto: '. Incluido (gratuito en consulta para asociad@ a DKV DENTISALUD ELITE).' }
                ],
                description: "Toma de modelos y evaluación de tu mordida en articulador.",
                price: "Incluido"
              },
              {
                /* ✨ */ title: [
                  { tipo: 'normal', texto: 'Retirar Prótesis Antiguas' },
                  { tipo: 'oculto', texto: '. Incluido (gratuito en consulta para asociad@ a DKV DENTISALUD ELITE).' }
                ],
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
                /* ✨ */ title: [
                  { tipo: 'normal', texto: 'Ajuste de férula' },
                  { tipo: 'oculto', texto: '. Precio: 25 €.' }
                ],
                description: "Al recibir el impacto que soportaban tus dientes es fundamental revisar en consulta periódicamente la férula para asegurar que sigue protegiendo tu articulación.",
                price: "25 €"
              },
              {
                /* ✨ */ title: [
                  { tipo: 'normal', texto: 'Tallado selectivo' },
                  { tipo: 'oculto', texto: '. Incluido (gratuito en consulta para asociad@ a DKV DENTISALUD ELITE).' }
                ],
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
            /* ✨ */ title: [
              { tipo: 'normal', texto: 'Axiografía y pruebas diagnósticas' },
              { tipo: 'oculto', texto: '. Precio: 180 €.' }
            ],
            description: "Estudio informatizado o mecánico del trazado exacto de los movimientos de tus cóndilos (articulación).",
            price: "180 €"
          },
          {
            /* ✨ */ title: [
              { tipo: 'normal', texto: 'Sesión de rehabilitación neuro-oclusal' },
              { tipo: 'oculto', texto: '. Precio: 72 €.' }
            ],
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
    activeSubNavId: 'metalica', 
     /* 🗑️  seoTitle: "Ortodoncia Fija Metálica | Precios Cerrados DKV Dentisalud", */
     /* 🗑️  seoDescription: "Tratamientos de ortodoncia metálica convencional y autoligable. Eficacia probada y durabilidad con precios exclusivos para asegurados DKV.", */
    /* ✨ */  seoTitle: "Ortodoncia Fija Metálica | Dientes Alineados y Resistentes",
    /* ✨ */   seoDescription: "El sistema clásico y más duradero para corregir tu mordida. Tratamiento eficaz con un presupuesto definitivo desde el inicio. Busca tu clínica más cercana.",
    breadcrumbs: [
      { label: "Tratamientos", href: "/#tratamientos" },
      { label: "Ortodoncia", href: "/?modal=2#tratamientos" },
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
        subTitle: "El sistema tradicional, más robusto y económico.",
        points: [
          { icon: 'OrtoMetal1', text: <><strong className="text-dkv-green-dark font-bold">Robustez y Fiabilidad.</strong><br /> El sistema tradicional más robusto y probado.</> },
          { icon: 'OrtoMetal2', text: <><strong className="text-dkv-green-dark font-bold">Solución económica. </strong><br />La opción de ortodoncia más asequible.</> },
          { icon: 'OrtoMetal3', text: <><strong className="text-dkv-green-dark font-bold">Solución versátil. </strong><br />Corrige todo tipo de maloclusiones.</> },
          { icon: 'OrtoMetal4', text: <><strong className="text-dkv-green-dark font-bold">Ideal para adolescentes. </strong><br /> Por su excepcional durabilidad y gran resistencia al desgaste.</> }
        ],
        priceGroups: [
          {
            title: "",
            description: "",
            items: [
              { icon: '',
                /* ✨ */ title: [
                  { tipo: 'oculto', texto: 'Ortodoncia fija metálica convencional: ' },
                  { tipo: 'normal', texto: 'Aparato' },
                  { tipo: 'oculto', texto: '. Precio: 298 €.' }
                ],
                description: "(por maxilar)", price: "298 €" }
            ]
          },
          {
            title: "Tratamientos asociados",
            description: "",
            items: [
              { icon: '',
                /* ✨ */ title: [
                  { tipo: 'oculto', texto: 'Ortodoncia fija metálica: ' },
                  { tipo: 'normal', texto: 'Visita de revision' },
                  { tipo: 'oculto', texto: '. Precio: 30 €.' }
                ],
                description: "(suele ser mensual)", price: "30 €" },
              { icon: '',
                /* ✨ */ title: [
                  { tipo: 'oculto', texto: 'Ortodoncia fija metálica: ' },
                  { tipo: 'normal', texto: 'Reposición de bracket' },
                  { tipo: 'oculto', texto: '. Precio: 20 €.' }
                ],
                description: "(por pieza estropeada)", price: "20 €"}
            ]
          }
        ]
      },
      {
        id: "brackets-metalicos-autoligables",
        name: "Brackets Metálicos Autoligables",
        image: "/images/tratamientos/ortodoncia-brackets-metalico-autoligable.png",
        secondaryImage: "/images/tratamientos/ortodoncia-brackets-metalico-autoligable-un-diente.png",
        subTitle: "Evolución tecnológica del bracket metálico tradicional que prescinde de ataduras.",
        points: [
          { icon: 'OrtoMetal5', text: <><strong className="text-dkv-green-dark font-bold"> Por qué elegirlo.</strong><br /> Poseen una pequeña "compuerta" que sujeta el arco, eliminando las gomitas elásticas. Esto reduce la fricción, aplica fuerzas más biológicas y facilita enormemente el cepillado diario.</> }
        ],
        priceGroups: [
          {
            title: "Desglose Técnica Autoligable",
            description: "",
            items: [
              { icon: '',
                /* ✨ */ title: [
                  { tipo: 'oculto', texto: 'Ortodoncia fija metálica autoligable: ' },
                  { tipo: 'normal', texto: 'Aparato base' },
                  { tipo: 'oculto', texto: '. Precio: 298 €.' }
                ],
                description: "(por maxilar)", price: "298 €" },
              { icon: '',
                /* ✨ */ title: [
                  { tipo: 'oculto', texto: 'Ortodoncia fija metálica autoligable: ' },
                  { tipo: 'normal', texto: 'Suplemento Autoligable' },
                  { tipo: 'oculto', texto: '. Precio: + 140 €.' }
                ],
                description: "(por maxilar)", price: <span className="text-dkv-green">+ 140 €</span>}
            ]
          },
          {
            title: "Tratamientos asociados",
            description: "",
            items: [
              { icon: '',
                /* ✨ */ title: [
                  { tipo: 'oculto', texto: 'Ortodoncia autoligable: ' },
                  { tipo: 'normal', texto: 'Visita de revision' },
                  { tipo: 'oculto', texto: '. Precio: 30 €.' }
                ],
                description: "(suele ser mensual)", price: "30 €" },
              { icon: '',
                /* ✨ */ title: [
                  { tipo: 'oculto', texto: 'Ortodoncia autoligable: ' },
                  { tipo: 'normal', texto: 'Reposición de bracket' },
                  { tipo: 'oculto', texto: '. Precio: 20 €.' }
                ],
                description: "(por pieza estropeada)", price: "20 €"}
            ]
          }
        ]
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
                /* ✨ */ title: [
                  { tipo: 'normal', texto: 'Estudio cefalométrico' },
                  { tipo: 'oculto', texto: '. Precio: 50 €.' }
                ],
                description: "(Radiografía ángulos óseos)", price: "50 €" },
              { icon: 'OrtoIniFin2',
                /* ✨ */ title: [
                  { tipo: 'normal', texto: 'Estudio fotográfico' },
                  { tipo: 'oculto', texto: '. Precio: 30 €.' }
                ],
                description: "(Proporciones faciales)", price: "30 €" },
              { icon: 'OrtoIniFin3',
                /* ✨ */ title: [
                  { tipo: 'normal', texto: 'Modelos de estudio' },
                  { tipo: 'oculto', texto: '. Incluido (gratuito en consulta para asociad@ a DKV DENTISALUD ELITE).' }
                ],
                price: "Incluido" }
            ]
          },
          {
            title: "Estabilización y Mantenimiento",
            description: "Los dientes tienen memoria y tienden a moverse al retirar los aparatos.",
            items: [
              { icon: 'OrtoIniFin4',
                /* ✨ */ title: [
                  { tipo: 'normal', texto: 'Aparatología estabilizadora' },
                  { tipo: 'oculto', texto: '. Precio: 108 €.' }
                ],
                description: "(Por aparato)", price: "108 €" },
              { icon: 'OrtoIniFin5',
                /* ✨ */ title: [
                  { tipo: 'normal', texto: 'Vista revisión post-tratamiento' },
                  { tipo: 'oculto', texto: '. Precio: 25 €.' }
                ],
                price: "25 €" }
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
     /* 🗑️  seoTitle: "Ortodoncia Estética de Zafiro | Precios Cerrados DKV Dentisalud", */
     /* 🗑️  seoDescription: "Brackets de cristal de zafiro de máxima transparencia que no se tiñen. La opción perfecta que combina eficacia tradicional con estética premium.", */
    /* ✨ */  seoTitle: "Brackets de Zafiro Estéticos | Ortodoncia que No se Nota",
    /* ✨ */   seoDescription: "Alinea tus dientes con cristal de zafiro transparente que no se tiñen. Tarifas claras y sin letra pequeña. Empieza tu tratamiento en un centro cercano.",
    breadcrumbs: [
      { label: "Tratamientos", href: "/#tratamientos" },
      { label: "Ortodoncia", href: "/?modal=2#tratamientos" },
      { label: "Zafiro", href: "#" }
    ],
    hero: {
      badgeText: "Ortodoncia Estética",
      title: { dark: "ORTODONCIA ESTETICA DE", normal: "ZAFIRO" },
      description: [
        "La opción ideal para quienes requieren la eficacia y precisión del bracket tradicional, pero con un nivel superior de discreción visual que no altera tu sonrisa."
      ]
    },
    rows: [
      {
        id: "brackets-zafiro-convencionales",
        name: "Brackets de Zafiro",
        image: "/images/tratamientos/ortodoncia-brackets-cristal-zafiro-standard.png",
        secondaryImage: "/images/tratamientos/ortodoncia-brackets-cristal-zafiro-standard-un-diente.png",
        subTitle: "Evolución estética del bracket metálico tradicional.",
        points: [
          { icon: 'OrtoZafiro1', text: <>A diferencia de los antiguos brackets de plástico o cerámica convencional, nuestros brackets están tallados en <strong>cristal de zafiro puro</strong>.</> },
          { icon: 'OrtoZafiro2', text: <><strong>La gran ventaja (No se tiñen):</strong> El zafiro mantiene su total transparencia durante todo el tratamiento. No importa si tomas café, té o vino tinto; el bracket seguirá siendo invisible y mimetizándose con el color natural de tu diente de principio a fin.</> }
        ],
        priceGroups: [
          {
            title: "Desglose Técnica de Zafiro",
            description: "",
            items: [
              { icon: '',
                /* ✨ */ title: [
                  { tipo: 'oculto', texto: 'Ortodoncia estética de zafiro convencional: ' },
                  { tipo: 'normal', texto: 'Aparato base' },
                  { tipo: 'oculto', texto: '. Precio: 298 €.' }
                ],
                description: "(por maxilar)", price: "298 €" },
              { icon: '',
                /* ✨ */ title: [
                  { tipo: 'oculto', texto: 'Ortodoncia estética de zafiro convencional: ' },
                  { tipo: 'normal', texto: 'Suplemento Zafiro Estético' },
                  { tipo: 'oculto', texto: '. Precio: + 180 €.' }
                ],
                description: "(por maxilar)", price: <span className="text-dkv-green">+ 180 €</span>}
            ]
          },
          {
            title: "Tratamientos asociados",
            description: "",
            items: [
              { icon: '',
                /* ✨ */ title: [
                  { tipo: 'oculto', texto: 'Ortodoncia estética de zafiro: ' },
                  { tipo: 'normal', texto: 'Visita de revision' },
                  { tipo: 'oculto', texto: '. Precio: 30 €.' }
                ],
                description: "(suele ser mensual)", price: "30 €" },
              { icon: '',
                /* ✨ */ title: [
                  { tipo: 'oculto', texto: 'Ortodoncia estética de zafiro: ' },
                  { tipo: 'normal', texto: 'Reposición de bracket' },
                  { tipo: 'oculto', texto: '. Precio: 20 €.' }
                ],
                description: "(por pieza estropeada)", price: "20 €"}
            ]
          }
        ]
      },
      {
        id: "brackets-zafiro-autoligables",
        name: "Brackets de Zafiro Autoligables",
        image: "/images/tratamientos/ortodoncia-brackets-cristal-zafiro-autoligable.png",
        secondaryImage: "/images/tratamientos/ortodoncia-brackets-cristal-zafiro-autoligable-un-diente.png",
        subTitle: "Evolución tecnológica del bracket estético de zafiro tradicional que prescinde de ataduras.",
        points: [
          { icon: 'OrtoZafiro3', text: <>La combinación perfecta entre la más alta estética y la ingeniería biomecánica más avanzada.</> },
          { icon: 'OrtoZafiro4', text: <><strong>Por qué elegirlo:</strong> Al ser autoligables, incorporan un clip de cierre invisible que sujeta el arco sin necesidad de "gomitas". Esto significa menos fricción, movimientos dentales más rápidos y orgánicos, menos molestias y una higiene diaria mucho más sencilla.</> }
        ],
        priceGroups: [
          {
            title: "Desglose Técnica de Zafiro Autoligable",
            description: "",
            items: [
              { icon: '',
                /* ✨ */ title: [
                  { tipo: 'oculto', texto: 'Ortodoncia estética de zafiro autoligable: ' },
                  { tipo: 'normal', texto: 'Aparato base' },
                  { tipo: 'oculto', texto: '. Precio: 298 €.' }
                ],
                description: "(por maxilar)", price: "298 €" },
              { icon: '',
                /* ✨ */ title: [
                  { tipo: 'oculto', texto: 'Ortodoncia estética de zafiro autoligable: ' },
                  { tipo: 'normal', texto: 'Suplemento Zafiro Estético' },
                  { tipo: 'oculto', texto: '. Precio: + 180 €.' }
                ],
                description: "(por maxilar)", price: <span className="text-dkv-green">+ 180 €</span>},
              { icon: '',
                /* ✨ */ title: [
                  { tipo: 'oculto', texto: 'Ortodoncia estética de zafiro autoligable: ' },
                  { tipo: 'normal', texto: 'Suplemento Autoligable' },
                  { tipo: 'oculto', texto: '. Precio: + 140 €.' }
                ],
                description: "(por maxilar)", price: <span className="text-dkv-green">+ 140 €</span>}
            ]
          },
          {
            title: "Tratamientos asociados",
            description: "",
            items: [
              { icon: '',
                /* ✨ */ title: [
                  { tipo: 'oculto', texto: 'Ortodoncia zafiro autoligable: ' },
                  { tipo: 'normal', texto: 'Visita de revision' },
                  { tipo: 'oculto', texto: '. Precio: 30 €.' }
                ],
                description: "(suele ser mensual)", price: "30 €" },
              { icon: '',
                /* ✨ */ title: [
                  { tipo: 'oculto', texto: 'Ortodoncia zafiro autoligable: ' },
                  { tipo: 'normal', texto: 'Reposición de bracket' },
                  { tipo: 'oculto', texto: '. Precio: 20 €.' }
                ],
                description: "(por pieza estropeada)", price: "20 €"}
            ]
          }
        ]
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
                /* ✨ */ title: [
                  { tipo: 'normal', texto: 'Estudio cefalométrico' },
                  { tipo: 'oculto', texto: '. Precio: 50 €.' }
                ],
                description: "(Radiografía ángulos óseos)", price: "50 €" },
              { icon: 'OrtoIniFin2',
                /* ✨ */ title: [
                  { tipo: 'normal', texto: 'Estudio fotográfico' },
                  { tipo: 'oculto', texto: '. Precio: 30 €.' }
                ],
                description: "(Proporciones faciales)", price: "30 €" },
              { icon: 'OrtoIniFin3',
                /* ✨ */ title: [
                  { tipo: 'normal', texto: 'Modelos de estudio' },
                  { tipo: 'oculto', texto: '. Incluido (gratuito en consulta para asociad@ a DKV DENTISALUD ELITE).' }
                ],
                price: "Incluido" }
            ]
          },
          {
            title: "Estabilización y Mantenimiento",
            description: "Los dientes tienen memoria y tienden a moverse al retirar los aparatos.",
            items: [
              { icon: 'OrtoIniFin4',
                /* ✨ */ title: [
                  { tipo: 'normal', texto: 'Aparatología estabilizadora' },
                  { tipo: 'oculto', texto: '. Precio: 108 €.' }
                ],
                description: "(Por aparato)", price: "108 €" },
              { icon: 'OrtoIniFin5',
                /* ✨ */ title: [
                  { tipo: 'normal', texto: 'Vista revisión post-tratamiento' },
                  { tipo: 'oculto', texto: '. Precio: 25 €.' }
                ],
                price: "25 €" }
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
    seoTitle: "Aparato dental para Niños | Ensancha su Paladar a tiempo",
    seoDescription: "Aparatos de quita y pon para guiar el crecimiento dental de tus hijos. Previene ortodoncias complejas con un presupuesto transparente en tu clínica más cercana.",
    breadcrumbs: [
      { label: "Tratamientos", href: "/#tratamientos" },
      { label: "Ortodoncia", href: "/?modal=2#tratamientos" },
      { label: "Ortodoncia Infantil", href: "#" }
    ],
    hero: {
      badgeText: "Aparato infantil de Quita y Pon",
      title: { dark: "ORTODONCIA", normal: "INFANTIL" },
      description: [
        "Muchos padres nos preguntan: '¿Por qué ponerle aparato ahora si se le van a caer los dientes de leche?'",
        "La respuesta es sencilla: A esta edad no estamos poniendo los dientes rectos, estamos creando el espacio necesario en el hueso para que, cuando salgan los definitivos, quepan perfectamente, ahorrando años de brackets cuando el niño crezca."
      ]
    },
    rows: [
      {
        id: "aparatos-activos",
        name: "Aparatos para ensanchar (Expansores)",
        price: "Desde 200 €",
        image: "/images/tratamientos/ortodoncia-removible.png",
        subTitle: "Haciendo sitio para los dientes nuevos.",
        points: [
          { icon: 'OrtoRemo1', text: <><strong className="text-dkv-green-dark font-bold">Control Desarrollo Arcadas.</strong><br />Hacer más ancho un paladar que se ha quedado estrecho, o ayudar a que la mandíbula de abajo crezca a la par que la de arriba.</> },
          { icon: 'OrtoRemo2', text: <><strong className="text-dkv-green-dark font-bold"> Un aparato.</strong><br /> Generalmente cuando el problema está localizado en el paladar superior porque necesita expansión.</> },
          { icon: 'OrtoRemo3', text: <><strong className="text-dkv-green-dark font-bold"> Dos aparatos. </strong><br /> Cuando necesitamos que la parte de arriba y la de abajo crezcan a la vez para que la boca cierre perfectamente, como si fuera una caja con su tapa.</> }
        ],
        priceGroups: [
          {
            title: "",
            description: "",
            items: [
              { icon: '',
                /* ✨ */ title: [
                  { tipo: 'oculto', texto: 'Ortodoncia removible: ' },
                  { tipo: 'normal', texto: 'Aparatología un maxilar' },
                  { tipo: 'oculto', texto: '. Precio: 200 €.' }
                ],
                description: "(Solo para arriba o solo para abajo)", price: "200 €" },
              { icon: '',
                title: [
                  { tipo: 'oculto', texto: 'Ortodoncia removible: ' },
                  { tipo: 'normal', texto: 'Aparatología ambos maxilares' },
                  { tipo: 'oculto', texto: '. Precio: 400 €.' }
                ],
                description: "(Para arriba y abajo a la vez)", price: "400 €"}
            ]
          },
          {
            title: "Mantenimineto y Revisiones",
            description: "Ajustar los tornillos y ver cómo crece la boca es el 50% del éxito.",
            items: [
              { icon: '',
                title: [
                  { tipo: 'oculto', texto: 'Ortodoncia removible: ' },
                  { tipo: 'normal', texto: 'Visita de revision' },
                  { tipo: 'oculto', texto: '. Precio: 25 €.' }
                ],
                description: "Vigiliancia períódica en consulta.", price: "25 €" }
            ]
          }
        ]
      },
      {
        id: "corrector-respiracion",
        name: "Corrector para niños que respiran por la boca",
        price: "87 €",
        subTitle: "Cortando un mal hábito de raíz.",
        points: [
          { icon: 'OrtoRemo6', text: <><strong className="text-dkv-green-dark font-bold">El problema silencioso.</strong> Muchos niños respiran por la boca (por mocos o alergias) o se chupan el dedo. Al llevar la boca siempre abierta, el paladar se hunde y la cara se queda alargada y con ojeras.</> },
          { icon: 'OrtoRemo7', text: <><strong className="text-dkv-green-dark font-bold"> El escudo protector.</strong> Esta placa se coloca en la boca y obliga físicamente al niño a respirar por la nariz, reeducando su sistema respiratorio y permitiendo que su cara crezca con las proporciones correctas.</> },
          { icon: 'OrtoRemo8', text: <><strong className="text-dkv-green-dark font-bold"> Entrenamiento. </strong>Estos aparatos no 'empujan' huesos directamente, sino que <strong>entrenan los músculos de la cara</strong> para que vuelvan a trabajar correctamente.</> }
        ],
        detailedPrices: [
          {
            /* ✨ */ title: [
              { tipo: 'normal', texto: 'Corrector de respiración por la boca' },
              { tipo: 'oculto', texto: '. Precio: 87 €.' }
            ],
            description: "",
            price: "87 €"
          }
        ],
        footerNote: "* Precio por aparato." 
      },
      {
        id: "corrector-posicion",
        name: "Aparato para corregir la postura (La mordida)",
        price: "144 €",
        subTitle: "Entrenando la mordida perfecta.",
        points: [
          { icon: 'OrtoRemo4', text: <><strong className="text-dkv-green-dark font-bold">Corrección de mordida.</strong> Suele emplearse en fases finales de ortodoncia para asentar la mordida como si fuera un molde perfecto.</> },
          { icon: 'OrtoRemo5', text: <><strong className="text-dkv-green-dark font-bold">Prevenciòn de apiñamiento. </strong> Ayuda a guiar el crecimiento de dientes definitivos evitando que se amontonen por falta de espacio.</> }
        ],
        detailedPrices: [
          {
            /* ✨ */ title: [
              { tipo: 'normal', texto: 'Corrector de posición' },
              { tipo: 'oculto', texto: '. Precio: 144 €.' }
            ],
            description: "",
            price: "144 €"
          }
        ],
        footerNote: "* Precio por aparato." 
      }
    ],
    premiumBlock: (
      <div className="mt-16 p-8 md:p-12 mb-12 rounded-3xl bg-dkv-green-dark text-white text-center shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-dkv-green opacity-20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-dkv-green opacity-20 blur-3xl rounded-full"></div>
        <AlertCircle className="w-12 h-12 mx-auto mb-6 text-dkv-green-light" />
        <h3 className="font-lemon text-xl mb-4 text-dkv-green-light uppercase tracking-wide">El Consejo Clínico para Padres</h3>
        <p className="text-xl font-medium leading-relaxed italic font-fsme max-w-3xl mx-auto relative z-10 text-white/90">
          "Los aparatos de quita y pon hacen verdadera magia en las caras de los niños, pero tienen una norma innegociable: <strong>dependen al 100% de que el niño los use. </strong> El aparato debe llevarse un mínimo de 14 a 16 horas diarias (toda la noche y parte de la tarde en casa). Si el niño no se lo pone, el paladar no se ensancha. En consulta hacemos el aparato perfecto y ajustamos los tornillos, pero en casa os toca a vosotros hacer de 'policías' del aparato.¡El esfuerzo valdrá la pena para toda su vida!"
        </p>
      </div>
    ),
    cta: {
      title: "Anticípate al problema",
      infoNote: "Lo ideal es llevar a los niños a su primera revisión de ortodoncia a los 6 o 7 años. A esa edad los huesos aún están blandos y es facilísimo solucionar un paladar estrecho o una mala mordida.",
      description: "Encuentra tu clínica DKV DENTISALUD ELITE más cercana y pide una revisión para tu hijo:"
    }
  },

  // 10. ORTODONCIA LINGUAL
  'ortodoncia-lingual': {
    slug: 'ortodoncia-lingual',
    activeSubNavId: 'lingual',
     /* 🗑️  seoTitle: "Ortodoncia Lingual 100% Invisible | Precios Cerrados DKV Dentisalud", */
     /* 🗑️  seoDescription: "La única técnica ortodóntica verdaderamente imperceptible. Brackets colocados en la cara interna del diente para pacientes con altas exigencias estéticas.", */
    /* ✨ */  seoTitle: "Ortodoncia Lingual | Brackets 100% Invisibles",
    /* ✨ */   seoDescription: "Alinea tu sonrisa con brackets ocultos en la cara interna del diente. Máxima estética y precisión con tarifas transparentes. Encuentra tu centro cercano.",
    breadcrumbs: [
      { label: "Tratamientos", href: "/#tratamientos" },
      { label: "Ortodoncia", href: "/?modal=2#tratamientos" },
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
          { icon: 'OrtoLingual1', text: <><strong className="text-dkv-green-dark font-bold"> Totalmente Invisible.</strong> Oculta a la vista de los demás. Nadie sabrá que llevas ortodoncia, ni siquiera en distancias cortas. </> },
          { icon: 'OrtoLingual2', text: <><strong className="text-dkv-green-dark font-bold"> La cara oculta de la Luna.</strong> Consiste en la colocación de brackets diseñados a medida en la <strong>cara interna (lingual) de los dientes</strong>. </> },
          { icon: 'OrtoLingual3', text: <><strong className="text-dkv-green-dark font-bold"> Corrección total en 3D. </strong> Control tridimensional del movimiento dental idéntico al de los brackets exteriores de alta gama, pero con cero impacto en tu estética facial durante el tratamiento..</> },
        ],
        priceGroups: [
          {
            title: "Desglose de la Técnica Lingual",
            description: "",
            items: [
              { icon: '',
                /* ✨ */ title: [
                  { tipo: 'oculto', texto: 'Ortodoncia fija lingual invisible: ' },
                  { tipo: 'normal', texto: 'Aparato base' },
                  { tipo: 'oculto', texto: '. Precio: 298 €.' }
                ],
                description: "(por maxilar)", price: "298 €" },
              { icon: '',
                /* ✨ */ title: [
                  { tipo: 'oculto', texto: 'Ortodoncia fija lingual invisible: ' },
                  { tipo: 'normal', texto: 'Suplemento Técnica Lingual a Medida' },
                  { tipo: 'oculto', texto: '. Precio: + 1.442 €.' }
                ],
                description: "(por maxilar)", price: <span className="text-dkv-green">+ 1.442 €</span> }
            ]
          },
          {
            title: "Tratamientos asociados",
            description: "",
            items: [
              { icon: '',
                /* ✨ */ title: [
                  { tipo: 'oculto', texto: 'Ortodoncia lingual: ' },
                  { tipo: 'normal', texto: 'Visita de revision' },
                  { tipo: 'oculto', texto: '. Precio: 30 €.' }
                ],
                description: "(suele ser mensual)", price: "30 €" },
              { icon: '',
                /* ✨ */ title: [
                  { tipo: 'oculto', texto: 'Ortodoncia lingual: ' },
                  { tipo: 'normal', texto: 'Reposición de bracket' },
                  { tipo: 'oculto', texto: '. Precio: 20 €.' }
                ],
                description: "(por pieza estropeada)", price: "20 €"}
            ]
          }
        ]
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
                /* ✨ */ title: [
                  { tipo: 'normal', texto: 'Estudio cefalométrico' },
                  { tipo: 'oculto', texto: '. Precio: 50 €.' }
                ],
                description: "(Radiografía ángulos óseos)", price: "50 €" },
              { icon: 'OrtoIniFin2',
                /* ✨ */ title: [
                  { tipo: 'normal', texto: 'Estudio fotográfico' },
                  { tipo: 'oculto', texto: '. Precio: 30 €.' }
                ],
                description: "(Proporciones faciales)", price: "30 €" },
              { icon: 'OrtoIniFin3',
                /* ✨ */ title: [
                  { tipo: 'normal', texto: 'Modelos de estudio' },
                  { tipo: 'oculto', texto: '. Incluido (gratuito en consulta para asociad@ a DKV DENTISALUD ELITE).' }
                ],
                price: "Incluido" }
            ]
          },
          {
            title: "Estabilización y Mantenimiento",
            description: "Los dientes tienen memoria y tienden a moverse al retirar los aparatos.",
            items: [
              { icon: 'OrtoIniFin4',
                /* ✨ */ title: [
                  { tipo: 'normal', texto: 'Aparatología estabilizadora' },
                  { tipo: 'oculto', texto: '. Precio: 108 €.' }
                ],
                description: "(Por aparato)", price: "108 €" },
              { icon: 'OrtoIniFin5',
                /* ✨ */ title: [
                  { tipo: 'normal', texto: 'Vista revisión post-tratamiento' },
                  { tipo: 'oculto', texto: '. Precio: 25 €.' }
                ],
                price: "25 €" }
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
     /* 🗑️  seoTitle: "Ortodoncia Invisible Invisalign | Precios Cerrados DKV Dentisalud", */
     /* 🗑️  seoDescription: "Alineadores transparentes y removibles. El sistema más demandado por adultos para una ortodoncia cómoda, estética y planificada en 3D.", */
    /* ✨ */  seoTitle: "Ortodoncia Invisible | Alineadores Transparentes y Cómodos",
    /* ✨ */   seoDescription: "Diseña tu sonrisa sin brackets. Férulas a medida, removibles y estéticas. Conoce el coste total sin sorpresas en tu clínica dental especializada más próxima.",
    breadcrumbs: [
      { label: "Tratamientos", href: "/#tratamientos" },
      { label: "Ortodoncia", href: "/?modal=2#tratamientos" },
      { label: "Invisalign", href: "#" }
    ],
    hero: {
      badgeText: "El sistema más demandado",
      title: { dark: "ORTODONCIA", normal: "INVISIBLE" },
      description: [
        "La revolución de la ortodoncia. Alineadores transparentes y removibles para diseñar tu sonrisa sin interrumpir tu estilo de vida ni tu comodidad."
      ]
    },
    rows: [
      {
        id: "ortodoncia-invisalign",
        name: "Alineadores Transparentes / Invisalign",
        image: "/images/tratamientos/ortodoncia-invisalign.png",
        subTitle: "El sistema más demandado por pacientes adultos por su comodidad y altísima estética. Consiste en una secuencia de férulas transparentes y removibles fabricadas a medida mediante tecnología digital tridimensional.",
        secondaryImage: "/images/tratamientos/ortodoncia-invisalign-un-diente.png",
        points: [
          { icon: 'Invisalign1', text: <><strong className="text-dkv-green-dark font-bold"> Comodidad Absoluta.</strong> Prácticamente invisibles y sin riesgo de rozaduras.</> },
          { icon: 'Invisalign2', text: <><strong className="text-dkv-green-dark font-bold"> Libertad Total.</strong> Removibles para comer con total normalidad.</> },
          { icon: 'Invisalign3', text: <><strong className="text-dkv-green-dark font-bold"> Higiene Perfecta.</strong> Cepillado sin obstátulos metálicos.</> },
          { icon: 'Invisalign4', text: <><strong className="text-dkv-green-dark font-bold">Previsibilidad.</strong> Programa 3D para ver tu sonrisa antes con software digital.</> },
          { icon: 'Invisalign5', text: <><strong className="text-dkv-green-dark font-bold">Factor de Adaptación.</strong> Ligera presión inicial. Puede afectar levemente a la pronunciación los primeros días.</> }
        ],
        priceGroups: [
          {
            title: "Tratamiento completo Invisalign",
            description: "Ambos maxilares.",
            items: [
              { icon: 'InvisalignPrecio1',
                /* ✨ */ title: [
                  { tipo: 'oculto', texto: 'Tratamiento completo ambos maxilares ' },
                  { tipo: 'normal', texto: 'Hasta 12 Meses' },
                  { tipo: 'oculto', texto: '. Precio: 3.210 €.' }
                ],
                description: "", price: "3.210 €" },
              { icon: 'InvisalignPrecio2',
                /* ✨ */ title: [
                  { tipo: 'oculto', texto: 'Tratamiento completo ambos maxilares ' },
                  { tipo: 'normal', texto: 'Hasta 24 meses' },
                  { tipo: 'oculto', texto: '. Precio: 4.000 €.' }
                ],
                description: "", price: "4.000 €" }
            ]
          }
        ],
        content: (
          <>
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
                /* ✨ */ title: [
                  { tipo: 'normal', texto: 'Estudio cefalométrico' },
                  { tipo: 'oculto', texto: '. Precio: 50 €.' }
                ],
                description: "Radiografía de ángulos óseos.", price: "50 €" },
              { icon: 'OrtoIniFin2',
                /* ✨ */ title: [
                  { tipo: 'normal', texto: 'Estudio fotográfico' },
                  { tipo: 'oculto', texto: '. Precio: 30 €.' }
                ],
                description: "Análisis de proporciones faciales.", price: "30 €" },
              { icon: 'OrtoIniFin3',
                /* ✨ */ title: [
                  { tipo: 'normal', texto: 'Modelos de estudio' },
                  { tipo: 'oculto', texto: '. Incluido (gratuito en consulta para asociad@ a DKV DENTISALUD ELITE).' }
                ],
                price: "Incluido" }
            ]
          },
          {
            title: "Estabilización y Mantenimiento",
            description: "Evita que los dientes vuelvan a su posición original al retirar los alineadores.",
            items: [
              { icon: 'OrtoIniFin4',
                /* ✨ */ title: [
                  { tipo: 'normal', texto: 'Aparatología estabilizadora' },
                  { tipo: 'oculto', texto: '. Precio: 108 €.' }
                ],
                description: "Precio por aparato.", price: "108 €" },
              { icon: 'OrtoIniFin5',
                /* ✨ */ title: [
                  { tipo: 'normal', texto: 'Revisión post-tratamiento' },
                  { tipo: 'oculto', texto: '. Precio: 25 €.' }
                ],
                price: "25 €" }
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
    seoTitle: "Implante Dental de Titanio | Recupera tu Diente Fijo",
    seoDescription: "Repón tu diente con la máxima naturalidad y seguridad. Cirugía avanzada y presupuesto totalmente transparente. Pide tu valoración en una clínica cercana.",
    breadcrumbs: [
      { label: "Tratamientos", href: "/#tratamientos" },
      { label: "Implantología", href: "/?modal=3#tratamientos" },
      { label: "Implante Individual", href: "#" }
    ],
    hero: {
      badgeText: "Como si fuera tu propio diente",
      title: { dark: "IMPLANTE", normal: "INDIVIDUAL" },
      description: [
        "Perder un diente (por un golpe, una caries o una infección) afecta a tu forma de masticar y a tu confianza al sonreir. ",
        "El implante es la solución más parecida a la naturaleza: Colocamos una 'raíz' nueva de titanio en tu maxilar sobre la que fijamos un 'diente' a medida, sin tener que limar ni estropear los dientes sanos que tienes al lado."
      ]
    },
    rows: [
      {
        id: "implante-individual",
        name: "Implante y Diente Definitivo (Tratamiento completo)",
        price: "Desde 1.180 €",
        //image: "/images/tratamientos/implantes.png",
        image: "/images/tratamientos/implind5.png",
        subTitle: "Tu nuevo diente paso a paso y sin letra pequeña.",
        points: [
          { icon: 'ImplInd1', text: <><strong>Tratamiento base </strong> contemplando las fases diagnóstica, quirúrgica y prótésica, y procedimientos clínicos necesarios para devolverte un diente perfecto desde cero.</> }
        ],
        priceGroups: [
          {
            title: "1. Estudio y Planificación (80 €)",
            description: "No operamos a ciegas. Medimos exactamente cuánto hueso tienes para asegurar el éxito.",
            items: [
              { icon: 'ImplInd2',
                title: [
                  { tipo: 'normal', texto: 'Dental Scan' },
                  { tipo: 'oculto', texto: '. Precio: 80 €.' }
                ],
                description: "1 Maxilar.", price: "80 €" },
              { icon: 'ImplInd3',
                title: [
                  { tipo: 'normal', texto: 'Estudio implantológico' },
                  { tipo: 'oculto', texto: '. Incluido (gratuito en consulta para asociad@ a DKV DENTISALUD ELITE).' }
                ],
                description: "", price: "Incluido" },
              { icon: 'ImplInd4',
                title: [
                  { tipo: 'normal', texto: 'Férula RX y Férula Quirúrgica' },
                  { tipo: 'oculto', texto: '. Incluido (gratuito en consulta para asociad@ a DKV DENTISALUD ELITE).' }
                ],
                description: "", price: "Incluido" },
              { icon: 'ImplInd5',
                title: [
                  { tipo: 'normal', texto: 'Ortopantomo-grafía' },
                  { tipo: 'oculto', texto: '. Incluido (gratuito en consulta para asociad@ a DKV DENTISALUD ELITE).' }
                ],
                description: "", price: "Incluido" }
            ]
          },
          {
            title: "2. La Cirugía. Tu nueva raíz (550 €)",
            description: "Colocación del implante en el hueso bajo anestesia local.",
            items: [
              { icon: 'ImplInd6',
                title: [
                  { tipo: 'normal', texto: 'Cirugía Pre-Protésica' },
                  { tipo: 'oculto', texto: '. Incluido (gratuito en consulta para asociad@ a DKV DENTISALUD ELITE).' }
                ],
                description: "", price: "Incluido" },
              { icon: 'ImplInd7',
                title: [
                  { tipo: 'normal', texto: 'Tornillo de cicatrización' },
                  { tipo: 'oculto', texto: '. Incluido (gratuito en consulta para asociad@ a DKV DENTISALUD ELITE).' }
                ],
                description: "", price: "Incluido" },
              { icon: 'ImplInd8',
                title: [
                  { tipo: 'normal', texto: 'Tornillo de cementación' },
                  { tipo: 'oculto', texto: '. Incluido (gratuito en consulta para asociad@ a DKV DENTISALUD ELITE).' }
                ],
                description: "", price: "Incluido" },
              { icon: 'ImplInd9',
                /* ✨ */ title: [
                  { tipo: 'normal', texto: 'Implante de Titanio' },
                  { tipo: 'oculto', texto: '. Precio: 550 €.' }
                ],
                price: "550 €" }
            ]
          },
          {
            title: "3. El Diente Nuevo: La Corona (550 €)",
            description: "Una vez que el implante ha agarrado fuerte al hueso, fabricamos y atornillamos tu diente.",
            items: [
              { icon: 'ImplInd11',
                /* ✨ */ title: [
                  { tipo: 'normal', texto: 'Aditamento Protésico' },
                  { tipo: 'oculto', texto: '. Precio: 247 €.' }
                ],
                description: "La pieza que une el implante que está dentro de la encía con el diente que está fuera.", price: "247 €" },
              { icon: 'ImplInd10',
                /* ✨ */ title: [
                  { tipo: 'normal', texto: 'Corona Metal-Cerámica' },
                  { tipo: 'oculto', texto: '. Precio: 303 €.' }
                ],
                description: "El diente duro y resistente a la masticación.", price: "303 €" }
            ]
          }
        ],
        footerNote: "* En función del estado de tu hueso podrían ser necesarios tratamientos previos. Consultar apartado."
      },
      {
        id: "estetica-adicional",
        name: "Opciones de Alta Estética y Dientes Provisionales",
        subTitle: "Alternativa para dientes que se ven al sonreír.",
        points: [
          { icon: 'ImplInd12', text: <>Si el diente que te falta es visible al sonreir, recomendamos usar una <strong>Corona de Zirconio</strong> en lugar de una corona de metal-porcelana. El zirconio deja pasar la luz igual que un diente natural</> },
          { icon: 'ImplInd13', text: <>Además, durante el tiempo en que el implante queda soldado al hueso, te podemos poner un <strong>diente provisional de resina</strong> para que no tengas que ir sin diente.</> }
        ],
        detailedPrices: [
          {
            icon: '',
            title: [
              { tipo: 'normal', texto: 'Corona de Zirconio' },
              { tipo: 'oculto', texto: '. Precio: 325 €.' }
            ],
            description: '(opción estética sobre la de metal-cerámica)',
            price: '325 €'
          },
          {
            icon: '',
            title: [
              { tipo: 'normal', texto: 'Corona de resina' },
              { tipo: 'oculto', texto: '. Precio: 274 €.' }
            ],
            description: '(diente temporal para el periodo de cicatrización -opcional-)',
            price: '274 €'
          }
        ]
      },
      {
        id: "angulos",
        name: "Piezas Especiales (Para huesos difíciles)",
        subTitle: "Cuando la anatomía nos obliga a esquivar nervios y trabajar el tornillo con inclinación, se hace necesaria una pieza adicional para dar la verticalidad adecuada a la corona.",
        points: [
          { icon: 'ImplInd14', text: <> En esos casos, necesitamos usar una pieza intermedia especial (como un 'codo' de fontanería) para que el diente final quede perfectamente recto y que la mordida sea perfecta.</> }
        ],
        detailedPrices: [
          {
            icon: '',
            title: [
              { tipo: 'normal', texto: 'Falso muñón de titanio' },
              { tipo: 'oculto', texto: '. Precio: 216 €.' }
            ],
            description: '',
            price: '216 €'
          },
          {
            icon: '',
            /* ✨ */ title: [
              { tipo: 'normal', texto: 'Supra/Meso Estructuras' },
              { tipo: 'oculto', texto: '. Precio: 87 €.' }
            ],
            description: '(estructuras de adaptación, precio por pieza)',
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
            Cirugía 3D guiada por Ordenador:  "Sin Puntos"
          </h2>
          <p className="font-fsme text-lg mb-6 text-white/90 leading-relaxed">
            ¿Te da pánico el bisturí o no puedes permitirte tener la cara hinchada mañana para ir a trabajar? Disponible <strong>EXCLUSIVAMENTE en nuestros Centros Propios Especiales</strong>, realizamos la cirugía primero en el ordenador. Imprimimos una plantilla 3D que nos quía para colocar el implante <strong> sin tener que usar bisturí ni dar puntos de sutura </strong>.
          </p>

          <div className="bg-white/10 rounded-2xl p-6 border border-white/20 backdrop-blur-sm mt-8">
            <ul className="space-y-4">
              <li className="flex flex-col md:flex-row md:justify-between items-start md:items-center pb-3 border-b border-white/20">
                <span className="font-bold text-white">Planificación de cirugía por ordenador 3D</span>
                <span className="font-lemon text-lg text-[#D4AF37] shrink-0 mt-1 md:mt-0">125 €</span>
              </li>
              <li className="flex flex-col md:flex-row md:justify-between items-start md:items-center pb-3 border-b border-white/20">
                <span className="font-bold text-white">Suplemento de software CAD-CAM</span>
                <span className="font-lemon text-lg text-[#D4AF37] shrink-0 mt-1 md:mt-0">Incluido (0 €)</span>
              </li>
              <li className="flex flex-col md:flex-row md:justify-between items-start md:items-center">
                <span className="font-bold text-white">Férula quirúrgica de guiado (Impresión 3D)</span>
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
      title: "Vuelve a morder con ganas.",
      infoNote: "Cada boca es un mundo. Solo viendo un escáner 3D de tu hueso podemos confirmarte al 100% que tienes la base necesaria para soportar un implante, o si necesitas alguna preparación previa.",
      description: "Pide una cita de valoración en tu clínica más cercana. Analizaremos tu caso y te daremos un plan claro para que recuperes tu diente:"
    }
  },


// 12. ARCADA COMPLETA FIJA SOBRE IMPLANTES
  'implante-arcada': {
    slug: 'implante-arcada',
    activeSubNavId: 'arcada',
    /* ✨ */ seoTitle: "Arcada Completa sobre Implantes | Todos tus Dientes Fijos",
    /* ✨ */ seoDescription: "Recupera la función y estética de toda tu boca. Dentadura fija atornillada con tarifas claras y sin sobrecostes. Visita a tu cirujano en un centro cercano.",
    breadcrumbs: [
      { label: "Tratamientos", href: "/#tratamientos" },
      { label: "Implantología", href: "/?modal=3#tratamientos" },
      { label: "Arcada Completa Fija", href: "#" }
    ],
    hero: {
      badgeText: "Todos los Dientes Fijos",
      title: { dark: "ARCADA COMPLETA", normal: "FIJA" },
      description: [
        "Olvida para siempre la 'dentadura en el vaso de agua'. Si quedas sin ningún diente arriba o abajo, esta es la solución definitiva", 
        "Colocamos una dentadura completa atornillada fijamente a 4 implantes.",
        "No tiene paladar de plástico, no se quita para dormir y te permite volver a morder un bocadillo y sonreír a carcajadas con total seguridad."
      ]
    },
    rows: [
      {
        id: "arcada-completa",
        name: "Rehabilitación Fija de Arcada Completa",
        price: "6.128 €",
        //image: "/images/tratamientos/protesis.png",
        image: "/images/tratamientos/implante-arcada.png",
        subTitle: "Dentadura nueva completa fijada mediante implantes.",
        points: [
          {
            icon: '',
            text: <><strong>Tratamiento base </strong> contemplando las fases diagnóstica, quirúrgica y protésica, y procedimientos clínicos necesarios para fijar la estructura a tu maxilar mediante 4 implantes de titanio.</>
          }
        ],
        priceGroups: [
          {
            title: "Fase de Diagnóstico (110 €)",
            description: "Una planificación previa óptima es fundamental para tu tratamiento.",
            items: [
              { icon: 'ImplInd2',
                title: [
                  { tipo: 'normal', texto: 'Dental Scan' },
                  { tipo: 'oculto', texto: '. Precio: 110 €.' }
                ],
                description: "Ambos Maxilares.", price: "110 €" },
              { icon: 'ImplInd3',
                title: [
                  { tipo: 'normal', texto: 'Estudio implantológico' },
                  { tipo: 'oculto', texto: '. Incluido (gratuito en consulta para asociad@ a DKV DENTISALUD ELITE).' }
                ],
                description: "", price: "Incluido" },
              { icon: 'ImplInd4',
                title: [
                  { tipo: 'normal', texto: 'Férula RX y Férula Quirúrgica' },
                  { tipo: 'oculto', texto: '. Incluido (gratuito en consulta para asociad@ a DKV DENTISALUD ELITE).' }
                ],
                description: "", price: "Incluido" },

              { icon: '',
                /* ✨ */  title: [
                  { tipo: 'normal', texto: 'Teleradiografía lateral de cráneo' },
                  { tipo: 'oculto', texto: '. Incluido (gratuito en consulta para asociad@ a DKV DENTISALUD ELITE).' }
                ],
                description: "", price: "Incluido" },
              { icon: 'ImplInd5',
                /* ✨ */  title: [
                  { tipo: 'normal', texto: 'Radiografía de ATM' },
                  { tipo: 'oculto', texto: '. Incluido (gratuito en consulta para asociad@ a DKV DENTISALUD ELITE).' }
                ],
                description: "", price: "Incluido" }
            ]
          },
          {
            title: "Fase Quirúrgica (2.200 €)",
            description: "Implantes en hueso.",
            items: [
              { icon: 'ImplInd6',
                title: [
                  { tipo: 'normal', texto: 'Cirugía Pre-Protésica' },
                  { tipo: 'oculto', texto: '. Incluido (gratuito en consulta para asociad@ a DKV DENTISALUD ELITE).' }
                ],
                description: "Cirugía x 4", price: "Incluido" },
              { icon: 'ImplInd7',
                title: [
                  { tipo: 'normal', texto: 'Tornillo de cicatrización' },
                  { tipo: 'oculto', texto: '. Incluido (gratuito en consulta para asociad@ a DKV DENTISALUD ELITE).' }
                ],
                description: "Tornillo x 4", price: "Incluido" },
              { icon: 'ImplInd8',
                title: [
                  { tipo: 'normal', texto: 'Tornillo de cementación' },
                  { tipo: 'oculto', texto: '. Incluido (gratuito en consulta para asociad@ a DKV DENTISALUD ELITE).' }
                ],
                description: "Tornillo x 4", price: "Incluido" },
              { icon: 'ImplInd9',
                /* ✨ */  title: [
                  { tipo: 'normal', texto: 'Implantes de Titanio' },
                  { tipo: 'oculto', texto: '. Precio: 2.220 €.' }
                ],
                description: "Implante (4 x 550 €)", price: "2.220 €" }
            ]
          },
          {
            title: "Fase Protésica (4.808 €)",
            description: "El diente visible.",
            items: [
              { icon: 'ImplInd11',
                title: [
                  { tipo: 'normal', texto: 'Aditamentos Protésicos' },
                  { tipo: 'oculto', texto: '. Precio: 1.978 €.' }
                ],
                description: "Adit... (4 x 247 €)", price: "1.978 €" },
              { icon: 'ImplInd15',
                title: [
                  { tipo: 'normal', texto: 'Dentadura Fija' },
                  { tipo: 'oculto', texto: '. Precio: 2.830 €.' }
                ],
                description: "Arcada fija completa", price: "2.830 €" }
            ]
          }
        ],
        footerNote: "* En función del estado de tu hueso podrían ser necesarios tratamientos previos. Consultar apartado."
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
    seoTitle: "Dentadura postiza de quita y pon con fijación sobre Implantes mediante mecanismo de corchete",
    seoDescription: "Sujeta mediante un 'click' a dos implantes. No se te volverá a despegar. No más llagas ni pegamentos. Consulta el presupuesto aquí.",
    breadcrumbs: [
      { label: "Tratamientos", href: "/#tratamientos" },
      { label: "Implantología", href: "/?modal=3#tratamientos" },
      { label: "Sobredentadura", href: "#" }
    ],
    hero: {
      badgeText: "Económica y Segura",
      title: { dark: "DENTADURA POSTIZA CON ", normal: "'CLIC'" },
      description: [
        "Para pacientes a los que su 'dentadura postiza' de abajo se les mueve constantemente, no pueden comer pan o les salen llagas en la encía.",
        "Es una dentadura de quita y pon, pero que hace un fuerte 'clic' sobre dos implantes y queda bloqueada en su sitio. Solo te la quitarás tú para lavarla. Adiós a las pastas pegajosas y al miedo a sonreir.",
        "Nota. Para mandíbula superior también es viable, necesitando más puntos de sujección por la fuerza de gravedad (3 o hasta 4 implantes en lugar de 2)."
      ]
    },
    rows: [
      {
        id: "sobredentadura-ideal",
        name: "Dentadura anclada sobre 2 Implantes",
        price: "Desde 2.530 €",
        subTitle: "La opción más inteligente y económica para estabilizar la mandíbula inferior.",
        points: [
          {
            icon: '',
            text: <>Tu nueva dentadura llevará unos "broches" ocultos en su interior. Al ponértela, estos encajarán sobre los dos anclajes de titanio que habremos colocado en tu hueso. <br/> <strong> Quedará completamente sujeta. </strong> <br/> Podrás masticar cosas duras con firmeza y hablar sin que 'baile'.</>
          }
        ],
        priceGroups: [
          {
            title: "1. Estudio y Planificación (80 €)",
            description: "Comprobamos el grosor de tu hueso para colocar los anclajes de forma 100% segura.",
            items: [
              { icon: 'ImplInd2',
                title: [
                  { tipo: 'normal', texto: 'Dental Scan' },
                  { tipo: 'oculto', texto: '. Precio: 80 €.' }
                ],
                description: "Un maxilar.", price: "80 €" },
              { icon: 'ImplInd3',
                title: [
                  { tipo: 'normal', texto: 'Estudio implantológico' },
                  { tipo: 'oculto', texto: '. Incluido (gratuito en consulta para asociad@ a DKV DENTISALUD ELITE).' }
                ],
                description: "", price: "Incluido" },
              { icon: 'ImplInd4',
                title: [
                  { tipo: 'normal', texto: 'Férula RX y Férula Quirúrgica' },
                  { tipo: 'oculto', texto: '. Incluido (gratuito en consulta para asociad@ a DKV DENTISALUD ELITE).' }
                ],
                description: "", price: "Incluido" },

              { icon: '',
                /* ✨ */  title: [
                  { tipo: 'normal', texto: 'Teleradiografía lateral de cráneo' },
                  { tipo: 'oculto', texto: '. Incluido (gratuito en consulta para asociad@ a DKV DENTISALUD ELITE).' }
                ],
                description: "", price: "Incluido" },
              { icon: 'ImplInd5',
                /* ✨ */  title: [
                  { tipo: 'normal', texto: 'Radiografía de ATM' },
                  { tipo: 'oculto', texto: '. Incluido (gratuito en consulta para asociad@ a DKV DENTISALUD ELITE).' }
                ],
                description: "", price: "Incluido" }
            ]
          },
          {
            title: "2. Los Anclajes: La Cirugía (1.560 €)",
            description: "Colocamos las dos 'raíces' de titanio y los 'corchetes' que sujetarán tu dentadura.",
            items: [
              { icon: 'ImplInd6',
                title: [
                  { tipo: 'normal', texto: 'Cirugía Pre-Protésica' },
                  { tipo: 'oculto', texto: '. Incluido (gratuito en consulta para asociad@ a DKV DENTISALUD ELITE).' }
                ],
                description: "Preparación de la encía.", price: "Incluido" },
              { icon: 'ImplInd9',
                title: [
                  { tipo: 'normal', texto: '2 Implantes de Titanio' },
                  { tipo: 'oculto', texto: '. Precio: 1.100 €.' }
                ],
                description: "Las nuevas raíces artificiales (2 x 550 €)", price: "1.100 €" },
              { icon: 'ImplInd7',
                title: [
                  { tipo: 'normal', texto: 'Sistemas de Fijación' },
                  { tipo: 'oculto', texto: '. Precio: 460 €.' }
                ],
                description: "Las dos cabezas de titanio con fomra de bola o corchete donde enganchará la dentadura (2 x 230 €)", price: "460 €" }
            ]
          },
          {
            title: "3. Fase Protésica (890 €)",
            description: "La dentadura visible y reforzada.",
            items: [
              { icon: '',
                /* ✨ */  title: [
                  { tipo: 'normal', texto: 'Dentadura Completa Especial (Sobredentadura)' },
                  { tipo: 'oculto', texto: '. Precio: 890 €.' }
                ],
                description: "Fabricada en resina de alta resistencia, a tu medida y con los 'broches' instalados en su interior.", price: "890 €" }
            ]
          }
        ],
        footerNote: "* Si tuvieras muy poco hueso podrían ser necesarios tratamientos previos. Consultar apartado."
      }
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
      seoTitle: "Regeneración de Hueso Dental | Preparando los cimientos",
      seoDescription: "Recupera el hueso perdido en tu boca para poder colocar implantes seguros. Hueso artifical y cicatrización rápido. Cirugía segura con un presupuesto claro. Encuentra tu clínica más próxima.",
    breadcrumbs: [
      { label: "Tratamientos", href: "/#tratamientos" },
      { label: "Implantología", href: "/?modal=3#tratamientos" },
      { label: "Reconstrucción Hueso", href: "#" }
    ],
    hero: {
      badgeText: "Preparando los cimientos",
      title: { dark: "REGENERACION DE", normal: "HUESO" },
      description: [
        "Cuando pierdes un diente y pasa el tiempo, el hueso que lo sujetaba se atrofia y encoge. Es como intentar clavar un tornillo en una pared de pladur que se deshace.",
        "Para que un implante sea firme y dure toda la vida, necesita unos cimientos sólidos. Con estas técnicas, volvemos a 'fabricar' hueso donde lo habías perdido para que la intervención sea un éxito rotundo."
      ]
    },
    rows: [
      {
        id: "regeneracion-biologica",
        name: "Acondicionamiento y nuevo hueso",
        subTitle: "Según Valoración Clínica: Si tu escáner 3D nos dice que falta hueso, usaremos alguno de estos procedimientos para crearlo.",
        priceGroups: [
          {
            title: "Fabricando Hueso Nuevo",
            description: "Añadimos material de relleno para que tu propio cuerpo lo convierta en hueso duro y resistente en unos meses.",
            items: [
              { icon: '',
                /* ✨ */  title: [
                  { tipo: 'normal', texto: 'Ganar altura en el hueso (Elevación de seno cerrado)' },
                  { tipo: 'oculto', texto: '. Precio: 130 €.' }
                ],
                description: "A veces, en las muelas superiores, falta altura porque las cavidades nadales están muy cerca. Empujamos suavemente hacia arriba para que quepa el implante de forma segura.", price: "130 €" },
              { icon: '',
                /* ✨ */  title: [
                  { tipo: 'normal', texto: 'Añadir hueso artificial (Material de relleno regenerativo)' },
                  { tipo: 'oculto', texto: '. Precio: 175 €.' }
                ],
                description: "Pequeños gránulos de hueso esterilizado qie sirven de 'andamio' para que tu propio cuerpo genere hueso de forma natural.", price: "175 €" },
              { icon: '',
                /* ✨ */  title: [
                  { tipo: 'normal', texto: 'Malla protectora (Membrana reabsorvible y/o Malla de Titanio)' },
                  { tipo: 'oculto', texto: '. Precio: 200 €.' }
                ],
                description: "Una especie de 'tirita' interna que sujeta el hueso nuevo en su sitio como si fuera una tienda de campaña, evitando que la encía se meta dentra del hueco antes de que se genere.", price: "200 €" }
            ]
          },
          {
            title: "Cicatrización acelarada",
            description: "Aplicación de plasma para reducir la inflamación y acelarar la curación.",
            items: [
              { icon: '',
                /* ✨ */  title: [
                  { tipo: 'normal', texto: 'Plasma Rico en Plaquetas' },
                  { tipo: 'oculto', texto: '. Precio: 150 €.' }
                ],
                description: "Sacamos una pequeña muestra de tu sangre, la centrifugamos y extraemos las defensas y factores de crecimiento. Lo aplicamos en la herida para reducir hinchazón y cicatrice a velocidad récord.", price: "150 €" }
            ]
          },
          {
            title: "Alisando el terreno",
            description: "A veces sí hay hueso, pero está muy irregular por culpa de una infección antigua o una mala extracción del pasado.",
            items: [
              { icon: '',
                /* ✨ */  title: [
                  { tipo: 'normal', texto: 'Alisar bordes afilados (Alveoloplastia)' },
                  { tipo: 'oculto', texto: '. Precio: 99 €.' }
                ],
                description: "Limamos los picos de hueso para que quede una superficie plana y perfecta donde situar el implante. Precio por cuadrante.", price: "99 €" },
              { icon: '',
                /* ✨ */  title: [
                  { tipo: 'normal', texto: 'Remodelar la forma del hueso (Remodelación maxilar)' },
                  { tipo: 'oculto', texto: '. Precio: 99 €.' }
                ],
                description: "Ajuste milimétrico de la forma del maxilar para asegurar el éxito.", price: "99 €" },
              { icon: '',
                /* ✨ */  title: [
                  { tipo: 'normal', texto: 'Ajuste de encía (Vesibuloplastia)' },
                  { tipo: 'oculto', texto: '. Precio: 75 €.' }
                ],
                description: "Acondicionar la encía en caso necesario. Precio", price: "75 €" },
            ]
          }
        ]
      }
    ],
    cta: {
      title: "Crea una base sólida",
      infoNote: "Muchos pacientes a los que les han dicho que 'no tienen hueso para implantes' pueden ser operados hoy en día con total éxito gracias a estas técnicas regenerativas.",
      description: "Pide una valoración. Estudiaremos tu escáner 3D y te diremos exactamente cómo podemos preparar tu hueso para que vuelvas a sonreír con seguridad. Encuentra tu centro:"
    }
  },

  // 14. ODONTOLOGÍA CONSERVADORA: RECONSTRUCCIÓN
  'conservadora-reconstruccion': {
    slug: 'conservadora-reconstruccion',
    activeSubNavId: 'reconstruccion',
    seoTitle: "Empastes y Reconstrucciones Dentales | Salva tu Diente",
    seoDescription: "Frena la caries a tiempo y evita el dolor. Restauraciones estéticas duraderas con tarifas 100% transparentes. Acude a una revisión a tu clínica más cercana.",
    breadcrumbs: [
      { label: "Tratamientos", href: "/#tratamientos" },
      { label: "Odontología Conservadora", href: "/?modal=4#tratamientos" },
      { label: "Reconstrucción", href: "#" }
    ],
    hero: {
      badgeText: "Frenando la caries a tiempo",
      title: { dark: "RECONSTRUCCIÓN", normal: "DENTAL" },
      description: [
        "Salvar tu diente natural es nuestra primera opción. No hay implante ni prótesis en el mundo que supere la obra de la naturaleza.",
        "Cuando la caries ataca o te partes una muela, el tiempo es oro. Limpiamos la zona  dañada y rellenamos el hueco para devolverle al diente su forma, fuerza y color blanco original."
      ]
    },
    rows: [
      {
        id: "empaste",
        name: "Empaste Simple (Para caries pequeñas)", 
        price: "29 €",
        image: "/images/empaste.png",
        imageAlt: "Esquema visual de un empaste dental o obturación",
        subTitle: "Solución rápida e indolora.",
        points: [
          { icon: '', text: <><strong>¿Cómo lo hacemos?</strong> Tratando la caries a tiempo, el arreglo es rapidísimo. Limpiamos la zona oscura, aplicamos una resina del color exacto de tu diente y la endurecemos con una luz especial. En 20 minutos te vas a casa con el diente perfecto, sano y funcional.</> }
        ],
        detailedPrices: [
          {
            /* ✨ */ title: [
              { tipo: 'normal', texto: 'Empaste (Obturación)' },
              { tipo: 'oculto', texto: ' Con o sin recubrimiento pulpar. Precio: 29 €.' }
            ],
            price: "29 €"
          }
        ],
        footerNote: "Incluye recubrimiento pulpar en caso necesario (proteger el nervio si la caries era profunda)."
      },
      {
        id: "gran-reconstruccion",
        name: "Gran Reconstrucción (Para daños extensos)",
        price: "40 €",
        subTitle: "Cuando falta un trozo de muela.",
        points: [
          { icon: '', text: <><strong>¿Por qué hace falta?</strong> ¿Se te ha roto un trozo de muela al morder algo duro o la caries se ha comido la mitad del diente? Un empaste normal se caería al masticar. Necesitamos 'esculpir' la muela de nuevo, usando moldes especiales para devolverle su fuerza orginal.</> }
        ],
        priceGroups: [
          {
            title: "Solución de urgencia (Provisional)",
            description: "Si acudes de urgencia con mucho dolor y no hay tiempo para terminar el trabajo definitivo, te ponemos una pasta temporal para tapar el agujero y que te vayas a casa tranquilo.",
            items: [
              { icon: '',
                /* ✨ */  title: [
                  { tipo: 'normal', texto: 'Empaste Provisional' },
                  { tipo: 'oculto', texto: '. Incluido (gratuito en consulta para asociad@ a DKV DENTISALUD ELITE).' }
                ],
                description: "", price: "Incluido" }
            ]
          },
          {
            title: "Refuerzo para que no se caiga (El 'Poste')",
            description: "Si el diente está tan roto que la reconstrucción nueva no tiene de dónde agarrarse, introducimos un pequeño palito de fibra de vidrio en la raíz. Funciona como los pilares de un edificio, sujetando todas la pasta desde dentro para que no se parta al comer.",
            items: [
              { icon: '',
                /* ✨ */  title: [
                  { tipo: 'normal', texto: 'Poste o pin' },
                  { tipo: 'oculto', texto: ' de refuerzo. Precio: + 8 €.' }
                ],
                description: "(por Unidad)", 
                price: <span className="text-dkv-green">+ 8 €</span>
              }
            ]
          }
        ],
        detailedPrices: [
          {
            /* ✨ */ title: [
              { tipo: 'normal', texto: 'Reconstrucción compleja' },
              { tipo: 'oculto', texto: '. Precio: 40 €.' }
            ],
            price: "40 €"
          }
        ],
        footerNote: "Incluye recubrimiento pulpar en caso necesario."
      },
      {
        id: "bioactivo",
        name: "Escudo Protector del Nervio (Material Bioactivo)",
        price: "70 €",
        subTitle: "¡La última oportunidad para no matar el nervio!",
        points: [
          { icon: '', text: <>A veces la caries es tan profunda que casi roza el nervio. Si ponemos un empaste normal directamente encima, el nervio se irritará, dolerá y acabará endoconcia (tendremos que matarlo).</> },
          { icon: '', text: <>En vez de eso, ponemos una capa de este material 'inteligente'. Funciona como una tirita que <strong>libera minerales, calma el nervio y ayuda a que el diente se cure a sí mismo por dentro</strong> antes de sellarlo.</> }
        ],
        detailedPrices: [
          {
            /* ✨ */ title: [
              { tipo: 'normal', texto: 'Sustitutivo dentinario bioactivo' },
              { tipo: 'oculto', texto: '. Precio: 70 €.' }
            ],
            price: "70 €"
          }
        ],
        footerNote: "Incluye el empaste necesario para sellar el diente por arriba."
      },
      {
        id: "reimplante",
        name: "Urgencia por accidente (Reimplante)",
        price: "Incluido",
        subTitle: "Salvar un diente caido.",
        points: [
          { icon: '', text: <><strong> Si te das un golpe y se te sale un diente entero de cuajo, no lo tires. </strong> Mételo en un vaso de leche fría o suero (¡nunca lo laves con agua ni toques la raíz!) y ven corriendo a la clínica. Te lo volvemos a colocar en su sitio y lo sujetamos para intentar que tu cuerpo lo vuelva a vuelva a aceptar.</> }
        ],
        detailedPrices: [
          {
            /* ✨ */ title: [
              { tipo: 'normal', texto: 'Reimplante de pieza dental' },
              { tipo: 'oculto', texto: '. Incluido (gratuito en consulta para asociad@ a DKV DENTISALUD ELITE).' }
            ],
            price: "Incluido"
          }
        ]
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
            "No retrases el tratamiento de una caries por miedo al dentista o por dejarlo para otro mes. Un empaste simple de 29 € se hace en 20 minutos y apenas molesta. Si lo dejas pasar, la infección llegará al nervio, el dolor será insoportable y arreglarlo  (Endodoncia + Gran reconstrucción) pasará a costar más de 120 €, requiriendo varias visitas. <strong> En tus dientes, el tiempo el tiempo es literalmente salud (y dinero).</strong>"
          </p>
        </div>
      </div>
    ),
    cta: {
      title: "Actúa antes de que duela",
      infoNote: "La caries en sus etapas iniciales no duele, es silenciosa. Cuando empieza a doler al beber cosas frías o comer dulces, significa que el agujero ya es profundo y se acerca al nervio.",
      description: "Un diagnóstico a tiempo con una simple radiografía (incluida) localizaremos las caries ocultas y salvaremos tu diente de forma rápida y barata. Solicita una cita en tu clínica más cercana. "
    }
  },

  // 15. ENDODONCIAS Y TRATAMIENTO DE CONDUCTOS
  'conservadora-endodoncia': {
    slug: 'conservadora-endodoncia',
    activeSubNavId: 'endodoncias',
    seoTitle: "Matar el Nervio sin Dolor | Endodoncias y Urgencias",
    seoDescription: "Salvamos tu muela cuando la caries llega al nervio. Quitamos el dolor de raíz con un presupuesto definitivo. Pide cita rápidamente en tu centro dental más cercano.",
    breadcrumbs: [
      { label: "Tratamientos", href: "/#tratamientos" },
      { label: "Odontología Conservadora", href: "/?modal=4#tratamientos" },
      { label: "Endodoncias", href: "#" }
    ],
    hero: {
      badgeText: "Cuando el dolor no te deja dormir",
      title: { dark: "TRATAMIENTO DE", normal: "ENDODONCIA" },
      description: [
        "Ese dolor punzante que late al ritmo del corazón, que empeora al tumbarte y que ya no se va ni con pastillas ... significa que la caries ha atravesado el diente y está infectando el nervio.",
        "Tranquilidad, tiene solución.  El objetivo es anestesiarte, limpiar esa infección por dentro y salvar tu muela para que no te la tengan que arrancar. Te explicamos cómo lo hacemos sin dolor."
      ]
    },
    rows: [
      {
        id: "tratamiento-conductos",
        name: "La Endodoncia (Matar el nervio)",
        price: "Desde 80 €",
        image: "/images/endodoncia.png",
        imageAlt: "Esquema de una endodoncia completa en un diente",
        subTitle: "Limpiar por dentro para que deje de doler.",
        points: [
          { icon: '', text: <><strong>¿Cómo se hace?</strong> Vaciamos las raíces del diente infectado, las limpiamos a fondo y las rellenamos con un material plástico especial para sellarlas y que las bacterias no vuelvan a entrar jamás.</> },
          { icon: '', text: <><strong>¿Por qué varían los precios?</strong> Depende de qué diente sea. Los dientes de delante (incisivos) solo tienen 1 raíz. Las muelas grandes del fondo pueden tener 3 o 4 raíces muy finas y curvadas, lo que requiere muchísimo más tiempo y precisión médica.</> }
        ],
        priceGroups: [
          {
            title: "Según el tamaño de la muela",
            description: "El tratamiento te cubre la limpieza de todas las raíces que tenga ese diente.",
            items: [
              { icon: '',
                /* ✨ */  title: [
                  { tipo: 'normal', texto: 'Endodoncia de un conducto' },
                  { tipo: 'oculto', texto: '. Precio: 80 €.' }
                ],
                description: "Para los dientes de delante (palas y colmillos), que solo tienen una raíz.", price: "80 €" },
              { icon: '',
                /* ✨ */  title: [
                  { tipo: 'normal', texto: 'Endodoncia de dos conductos' },
                  { tipo: 'oculto', texto: '. Precio: 94 €.' }
                ],
                description: "Usada habitualmente para los piezas intermedias (premolares).", price: "94 €" },
              { icon: '',
                /* ✨ */  title: [
                  { tipo: 'normal', texto: 'Endodoncia de tres o más conductos' },
                  { tipo: 'oculto', texto: '. Precio: 123 €.' }
                ],
                description: "Para las grandes muelas del fondo. Son más difíciles y laboriosas de tratar.", price: "123 €" }
           ]
          },
          {
            title: "Limpieza Avanzada",
            description: "Tecnología para asegurar el éxito.",
            items: [
              { icon: '',
                /* ✨ */  title: [
                  { tipo: 'normal', texto: 'Suplemento Limpieza mecanizada (Sistema Rotatorio)' },
                  { tipo: 'oculto', texto: '. Precio: + 15 €.' }
                ],
                description: "En lugar de limpiar las raíces a mano con pequeñas limas, usamos un motor de precisión con limas súper flexibles. Facilita y acelera la limpieza, llegando a las curvas más difíciles de tus raíces.", 
                price: <span className="text-dkv-green">+ 15 €</span>
              }
            ]
          }
        ]
      },
      {
        id: "urgencias",
        name: "Cura de Urgencia (Alivio inmediato)",
        price: "30 €",
        subTitle: "Quitarte el dolor hoy mismo.",
        points: [
          { icon: '', text: <>Si llegas a la clínica llorando de dolor nuestra prioridad es que dejes de sufrir. <br/> <strong> Te anestesiamos,  abrimos el diente para liberar la presión y la infección, y el dolor desaparece al instante. </strong> <br/> Te ponemos un medicamento y te vas a casa a descansar. La limpieza final (la endodoncia) te la terminaremos en una cita posterior con más calma. </> }
        ],
        detailedPrices: [
          {
            /* ✨ */ title: [
              { tipo: 'normal', texto: 'Cura de urgencia (Pulpectomía)' },
              { tipo: 'oculto', texto: '. Precio: 30 €.' }
            ],
            price: "30 €"
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
            Las raíces de los dientes son conductos más finos que un cabello humano, y muchas veces están escondidos, muy curvados o taponados. Intentar limpiarlos a simple vista o con gafas lupa normales tiene sus límites.
          </p>

          <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm mt-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 mb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#D4AF37] shrink-0" />
                <h3 className="font-bold text-lg text-white">Suplemento por utilización de Microscopía</h3>
              </div>
              <span className="bg-[#D4AF37] text-slate-900 px-4 py-1.5 rounded-full text-xl font-lemon font-bold mt-4 md:mt-0">
                Incluido (0 €)
              </span>
            </div>
            
            <p className="text-white/80 font-fsme leading-relaxed">
              <strong>¿Por qué es un salto de calidad brutal?</strong> En nuestros centros propios especiales, realizamos la endodoncia utilizando un Microscopio Clínico Operatorio que amplía la visión hasta 20 o 30 veces. Nos permite encontrar micro-conductos que de otra forma pasarían por alto, limpiar con una precisión absoluta y salvar muelas que en otras clínicas estarían desahuciados. <strong>Y lo mejor de todo: este despliegue tecnológico no tiene coste adicional para ti.</strong>
            </p>
          </div>
        </div>
      </div>
    ),
    cta: {
      title: "No sufras ni una noche más",
      infoNote: "Si el dolor te despierta por la noche, empeora con el calor o necesitas tomar Ibuprofeno cada 4 horas, tu nervio dental está pidiendo ayuda urgente. Tratarlo a tiempo es la única forma de no perder la muela completa.",
      description: "Te invitamos a solicitar una cita de valoración en uno de nuestros centros dentales para estudiar tu caso y aliviar tu dolor inmediatamente. Encuentra tu centro:"
    }
  },

  // 16. CIRUGÍA PERIAPICAL Y REENDODONCIAS
  'conservadora-cirugia': {
    slug: 'conservadora-cirugia',
    activeSubNavId: 'casos-complejos',
    /* ✨ */ seoTitle: "Reendodoncia y Cirugía de Quistes | Evita la Extracción",
    /* ✨ */ seoDescription: "¿Te duele un antigua endodoncia? Aún se podría curar esa infección rebelde, así como los quistes. Presupuesto claro muy cerca de ti.",
    breadcrumbs: [
      { label: "Tratamientos", href: "/#tratamientos" },
      { label: "Odontología Conservadora", href: "/?modal=4#tratamientos" },
      { label: "Cirugía y Casos Complejos", href: "#" }
    ],
    hero: {
      badgeText: "Segundas Oportunidades",
      title: { dark: "CIRUGIA Y CASOS", normal: "COMPLEJOS" },
      description: [
        "¿Qué para cuando una muela tratada hace tiempo te vuelve a doler o te sale un flemón? Significa que puede volver a tener bacterias, incluso formarse un quiste en el hueso por su causa.",
        "Antes de arrancarte la muela y ponerte un implante (solución cara), vamos a agotar hasta la última solución médica para curar la infección y que conserves tu diente original."
      ]
    },
    rows: [
      {
        id: "reendodoncia",
        name: "Repetir la Endodoncia (Reendodoncia)",
        price: "130 €",
        subTitle: "Limpiar a fondo lo que se volvió a ensuciar.",
        points: [
          { icon: '', text: <><strong>¿Por qué sucede?</strong> En general, la necesidad de una reendodoncia no es frecuente, pero pueden darse casos, por ejemplo, de filtraciones por desplazamiento de coronas antiguas, dando lugar a nueva infección de la pieza.</> },
          { icon: '', text: <><strong>¿En qué consiste?</strong> Destapamos el diente, sacamos la pasta antigua que se ha contaminado con los años, desinfectamos a conciencia todos los canales de la raíz y volvemos a sellar.</> }
        ],
        detailedPrices: [
          {
            /* ✨ */ title: [
              { tipo: 'normal', texto: 'Reendodoncia' },
              { tipo: 'oculto', texto: '. Precio: 130 €.' }
            ],
            price: "130 €"
          }
        ],
        footerNote: "Precio por diente (independiente del número de raices que tenga)."
      },
      {
        id: "apicectomia",
        name: "Cortar el quiste de raíz (Apicectomía)",
        price: "38 €",
        image: "/images/apicectomia.png",
        imageAlt: "Ilustración visual de una apicectomía o cirugía periapical",
        subTitle: "Cuando limpiar por dentro no es suficiente.",
        points: [
          { icon: '', text: <>A veces, el quiste al final de la raíz se hace rebelde y no es posible eliminarlo limpiando desde dentro de la misma.</> },
          { icon: '', text: <><strong> La alternativa quirúrgica: </strong> Abrimos un poquito la encía, cortamos solo la punta infectada de la raíz (el ápice), extirpamos el quiste y sellamos la raíz desde abajo. Problema resuelto salvando tu diente.</> }
        ],
        detailedPrices: [
          {
            /* ✨ */ title: [
              { tipo: 'normal', texto: 'Apicectomía (Cirugía periapical)' },
              { tipo: 'oculto', texto: '. Precio: 38 €.' }
            ],
            price: "38 €"
          }
        ]
      },
      {
        id: "apicoformacion",
        name: "Cerrar raíces jóvenes (Apicoformación)",
        price: "54 €",
        subTitle: "Para dientes definitivos que aún estaban creciendo.",
        points: [
          { icon: '', text: <><strong> El problema. </strong> Si tu hijo adolescente sufre un accidente en una pieza dental definitiva y se la parte, es probable que la raíz de ese diente aún no haya terminado de formarse.</> },
          { icon: '', text: <><strong> La solución. </strong> Utilizamos 'cementos inteligentes' (biocerámicos) que estimulan al diente y crean un 'tapón' artificial en la punta de la raíz. Así conseguimos que se cierre y salvamos el diente definitivo para toda la vida. </> }
        ],
        detailedPrices: [
          {
            /* ✨ */ title: [
              { tipo: 'normal', texto: 'Apicoformación' },
              { tipo: 'oculto', texto: '. Precio: 54 €.' }
            ],
            price: "54 €"
          }
        ],
        footerNote: "Precio por sesión."
      }
    ],
    cta: {
      title: "La última frontera",
      infoNote: "Un implante, siendo muy buena solución, siempre debe ser la opción 'B'. Tu propio diente es el mejor implante que existe. Luchar por él con estos tratamientos es la solución biológica y económica más inteligente.",
      description: "Si te han dicho que tu muela 'no tiene arreglo' y hay que extraerla, ven a vernos. Nuestros especialistas evaluarán si la cirugía periapical o la reendodoncia pueden salvarla:"
    }
  },

  // 17. TRATAMIENTO DE APNEA DEL SUEÑO Y RONQUIDO
  'apnea': {
    slug: 'apnea',
    activeSubNavId: 'apnea',
    seoTitle: "Férula para Apnea del Sueño y Ronquidos | Vuelve a Descansasr",
    seoDescription: "¿Roncas o usas máquina CPAP? Descubre la férula a medida que abre tu garganta para dormir del tirón.. Presupuesto sin sorpresas para cuidar tu descanso. Descubre tu clínica más cercana.",
    breadcrumbs: [
      { label: "Tratamientos", href: "/#tratamientos" },
      { label: "Medicina del Sueño", href: "/?modal=9#tratamientos" },
      { label: "Férula Apnea", href: "#" }
    ],
    hero: {
      badgeText: "Medicina Dental del Sueño",
      title: { dark: "FERULA DE APNEA", normal: "Y RONQUIDO" },
      description: [
        "Roncar muy fuerte o hacer pausas al respirar (apneas) no es solo molestar a tu parej; es un riesgo porque a tu cerebro le falta oxígeno durante la noche.",
        "Si tienes apnea leve o moderada, o simplemente no soportas dormir con la mascarilla de la máquina de aire (CPAP), tenemos la solución más cómoda: Una férula a medida que despeja tu garganta para que el aire fluya sin ruidos."
      ]
    },
    rows: [
      {
        id: "dam",
        name: "Férula Antirronquidos (Dispositivo d eAvande Mandibular -DAM-)",
        price: "875 €",
        subTitle: "Vuelve a dormir del tirón desde la primera noche.",
        points: [
          { icon: '', text: <><strong>¿Cómo funciona?</strong> Es una funda doble (para los dientes de arriba y de abajo) que te pones solo para dormir. Unos tensores empujan tu mandíbula inferior unos milímetros hacia adelante. Al hacer esto, tu garganta se abre, tu lengua no se cae hacia atrás y <strong>el ronquido desaparece de inmediato</strong>.</> }
        ],
        priceGroups: [
          {
            title: "El Aparato DAM",
            description: "Fabricación a medida con materiales confortables que no rozan.",
            items: [
              {
                title: [
                  { tipo: 'normal', texto: 'Férula Apnea (SAHS)' },
                  { tipo: 'oculto', texto: '(Dispositivo DAM). Precio: 800 €.' }
                ],
                description: "Fabricación individualizada con 2 años de garantía.",
                price: "800 €"
              }
            ]
          },
          {
            title: "Preparación (El 'traje a medida')",
            description: "No es buena idea comprarla por internet. Es necesario medir tu boca para no dañar tus articulaciones al adelantar la mandíbula.",
            items: [
              {
                title: [
                  { tipo: 'normal', texto: 'Estudio de tu mordida' },
                  { tipo: 'oculto', texto: ' (biomecánido). Precio: 75 €.' }
                ],
                description: "(Estudio biomécanico). Calculamos al milímetro cuanto podemos adeltnar tu barbilla de forma 100% cómoda y segura.",
                price: "75 €"
              },
              {
                title: [
                  { tipo: 'normal', texto: 'Radiografía de perfil (Tele-Radiografía)' },
                  { tipo: 'oculto', texto: '. Incluido (gratuito en consulta para asociad@ a DKV DENTISALUD ELITE).' }
                ],
                description: "Para ver la vía aérea de tu garganta.",
                price: "Incluido"
              },
              {
                title: [
                  { tipo: 'normal', texto: 'Radiografí general (Ortopantomografía)' },
                  { tipo: 'oculto', texto: '. Incluido (gratuito en consulta para asociad@ a DKV DENTISALUD ELITE).' }
                ],
                description: "Para comprobar que tus dientes están fuertes como para sujetar la férula.",
                price: "Incluido"
              }
            ]
          },
          {
            title: "Revisión Periódica",
            description: "Acompañamiento clínico para mejorar tus resultados.",
            items: [
              {
                title: [
                  { tipo: 'normal', texto: 'Visita de ajuste de férula' },
                  { tipo: 'oculto', texto: '. Precio: 35 €.' }
                ],
                description: "Ajustamos los tensores poco a poco hasta encontrar el punto exacto donde dejas de roncar y duermes cómodo.",
                price: "35 €"
              },
              {
                title: [
                  { tipo: 'normal', texto: 'Mantenimiento (Reparación y Rebase)' },
                  { tipo: 'oculto', texto: '. Incluido (gratuito en consulta para asociad@ a DKV DENTISALUD ELITE).' }
                ],
                description: "Si la férula se afloja con el tiempo, la reajustamos sin coste.",
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
          <h3 className="font-lemon text-xl mb-4 text-dkv-green-light uppercase tracking-wide">El Consejo Clínico: Exige Especialistas</h3>
          <p className="font-fsme text-lg leading-relaxed italic text-white/90 mb-4">
               Tratar la apnea no consiste en comprar un molde de plástico estándar y morderlo. Eso puede destrozar la articulación de tu mandíbula. Requiere un profundo conocimiento de la medicina del sueño y de cómo se comporta la musculatura de tu cuello mientras estás inconsciente.          
         </p>
         <p className="font-fsme text-lg leading-relaxed italic text-white/90">
               Por eso, este tratamiento se realiza <strong>exclusivamente en nuestros Centros Propios Especiales DKV</strong>, donde contamos con odontólogos formados específicamente en vías aéreas y trastornos del sueño.
         </p>
        </div>
      </div>
    ),
    cta: {
      title: "Recupera tus mañanas y tu energía",
      infoNote: "Este tratamiento está totalmente indicado para ronquido simple o Apnea (SAHS) leve o moderada. Si tu caso es muy grave, la férula puede usarse combinada con la máquina CPAP, permitiéndote bajar la presión del aire de la máquina para que sea mucho más soportable.",
      description: "Si te levantas cansado, con dolor de cabeza por las mañanas o tu pareja se asusta por tus pausas al respirar, localiza tu Centro Propio DKV más cercano:"
    }
  },

  // 18. PREVENCIÓN Y EDUCACIÓN DENTAL INFANTIL
  'pediatria-prevencion': {
    slug: 'pediatria-prevencion',
    activeSubNavId: 'prevencion',
    seoTitle: "Sin miedo al dentista infantil | Revisiones y Prevención",
    /* ✨ */ seoDescription: "Protege la sonrisa de tus hijos desde pequeños. Limpiezas, flúor y selladores y infantiles. La mayoría gratis con su tarjeta. Encuentra tu dentista más cercano.",
    breadcrumbs: [
      { label: "Tratamientos", href: "/#tratamientos" },
      { label: "Odontopediatría", href: "/?modal=6#tratamientos" },
      { label: "Educación y Prevención", href: "#" }
    ],
    hero: {
      badgeText: "El escudo protector",
      title: { dark: "PREVENCION Y", normal: "EDUCACION DENTAL" },
      description: [
        "Traer a tus hijos al dentista desde pequeñitos no es solo para curar caries; es para que pierdan el miedo, aprendan a cepillarse jugando y tengan unos dientes fuertes.",
        "De hecho, el mejor dentista es el que no tiene que usar el torno. Nuestro objetivo es poner un 'escudo' a sus dientes antes de que los bichitos ataquen."
      ]
    },
    rows: [
      {
        id: "higiene-educacion",
        name: "Higiene y Protección",
        subTitle: "Los niños no nacen sabiendo cepillarse, ¡hay que enseñarles!",
        points: [
          { icon: '', text: <>A través de juegos y sin hacerles ningún daño, les enseñamos hábitos que les ahorrarán muchísimo dolor (y a tí muchísimo dinero) en el futuro.</> }
        ],
        priceGroups: [
          {
            title: "Escuela de Cepillado y Limpieza",
            description: "La base para unas encías sanas que no sangren al lavarse los dientes.",
            items: [
              {
                title: [
                  { tipo: 'normal', texto: 'Aprender a cepillarse (Cursillo Odontológico)' },
                  { tipo: 'oculto', texto: '. Incluido (gratuito en consulta para asociad@ a DKV DENTISALUD ELITE).' }
                ],
                description: "Les enseñamos trucos para llegar a los rincones difíciles y usar el hilo dental.",
                price: "Incluido"
              },
              {
                title: [
                  { tipo: 'normal', texto: 'Limpieza de boca infantil' },
                  { tipo: 'oculto', texto: '. Incluido (gratuito en consulta para asociad@ a DKV DENTISALUD ELITE).' }
                ],
                description: "Retiramos con suavidad la placa bacteriana y el sarro que el cepillo de casa no logra quitar.",
                price: "Incluido"
              }
            ]
          },
          {
            title: "Reforzando el Esmalte",
            description: "Las vitaminas que sus dientes necesitan para hacerse duros como piedras.",
            items: [
              {
                /* ✨ */  title: [
                  { tipo: 'normal', texto: 'Baño de Flúor (Fluorización Tópica)' },
                  { tipo: 'oculto', texto: '. Incluido (gratuito en consulta para asociad@ a DKV DENTISALUD ELITE).' }
                ],
                description: "Pintamos sus dientes con un gel de flúor que se abserve y crea un escudo super resistente contra los ácidos de las golosinas y el azúcar.",
                price: "Incluido"
              }
            ]
          },
          {
            title: "El Mejor invento Anti-Caries",
            description: "A los 6 años salen las primera muelas de adulto. Tienen unos surcos tan profundos que las cerdas del cepillo difícilmente llegan al fondo, y ahí empiezan el 90% de las caries infantiles.",
            items: [
              {
                title: [
                  { tipo: 'normal', texto: 'Pintar los surcos (Selladores de Fisuras)' },
                  { tipo: 'oculto', texto: '. Precio: 17 €.' }
                ],
                description: "Pintamos esos surcos con una resina transparente que los 'sella' dejándolos completamente lisos. Los bichitos ya no pueden esconderse.",
                price: "17 €"
              }
            ]
          },
          {
            title: "Vigilando Caries escondidas",
            description: "Las caries más traicioneras son las que se esconden justo entre medio de dos dientes. No se ven a simple vista hasta que ya es tarde.",
            items: [
              {
                title: [
                  { tipo: 'normal', texto: 'Radiografía rápida (RVG Digital)' },
                  { tipo: 'oculto', texto: '. Incluido (gratuito en consulta para asociad@ a DKV DENTISALUD ELITE).' }
                ],
                description: "Una 'foto' digital de los dientes súper rápida y con una radiación casi nula (totalmente segura).",
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
          <Baby className="w-32 h-32 text-white" />
        </div>
        <div className="relative z-10">
          <h3 className="font-lemon text-xl mb-4 text-dkv-green-light uppercase tracking-wide">El gran mito de los "Dientes de leche"</h3>
          <p className="font-fsme text-lg leading-relaxed italic text-white/90">
            Seguro que has oído a alguien decir: "Total, como son de leche y se le van a caer, ¿para qué arreglarlos?". ¡Es el mayor error de salud! Una caries en un diente de leche avanza rapidísimo hacia el nervio causando un dolor horrible al niño. Además, <strong>la infección pasa al hueso y puede manchar o destruir el diente definitivo que está creciendo debajo</strong>.
          </p>
          <p className="font-fsme text-lg leading-relaxed italic text-white/90 mt-4">
            La prevención no es un gasto, es salud. Y como ves, <strong>casi todos estos tratamientos de prevención están cubiertos a coste cero</strong> con DKV Dentisalud Elite.
          </p>

          <p className="font-fsme text-lg leading-relaxed italic text-white/90">
            "Un mantenedor de espacio o un simple sellador hoy te puede ahorrar un tratamiento de ortodoncia de miles de euros mañana. La odontopediatría no es un gasto, es la inversión más rentable en la salud estructural de tus hijos. Además, verás que <strong>la inmensa mayoría de los tratamientos preventivos están incluidos a coste cero</strong> en DKV Dentisalud Elite."
          </p>
        </div>
      </div>
    ),
    cta: {
      title: "Que su primera vez sea jugando",
      infoNote: "Recomendamos hacer la primera visita al dentista cuando cumplen 1 añito y una revisión general cada 6 meses. Si vienen cuando no les duele nada, jamás le tendrán miedo al sillón.",
      description: "Acostumbra a tu hijo a visitarnos en un entorno amigable. Pide cita para su primera revisión y limpieza (sin coste en consulta para tí):"
    }
  },

  // 19. ODONTOLOGÍA CONSERVADORA INFANTIL
  'pediatria-conservadora': {
    slug: 'pediatria-conservadora',
    activeSubNavId: 'conservadora-pediatria',
    /* ✨ */ seoTitle: "Empastes Infantiles | Curamos sus Caries sin generarles Miedo",
    /* ✨ */ seoDescription: "Curamos la caries de tu hijo con paciencia y cariño. Empastes (sin cargo en consulta para menores de 15 años) y coronas. Busca tu dentista aquí.",
    breadcrumbs: [
      { label: "Tratamientos", href: "/#tratamientos" },
      { label: "Odontopediatría", href: "/?modal=6#tratamientos" },
      { label: "Odontología Conservadora", href: "#" }
    ],
    hero: {
      badgeText: "Curando al bichito",
      title: { dark: "ODONTOLOGÍA", normal: "CONSERVADORA" },
      description: [
        "Cuando el cepillado no ha sido suficiente y los 'bichitos' (las bacterias) han hecho un agujerito en el diente, nuestro objetivo es actuar súper rápido y con muchísimo tacto.",
        "Limpiamos la infección, sin que apenas se den cuenta, y tapamos el diente para que tu hijo vuelva a comer y sonreir sin dolor."
      ]
    },
    rows: [
      {
        id: "obturacion",
        name: "Caries: Hola y Adios",
        subTitle: "Magia para tapar agujeritos.",
        points: [
          { icon: '', text: <>Dependiendo de lo grande que sea la cueva que ha hecho el 'bichito' en el diente, usaremos una técnica u otra para que quede como nuevo.</> }
        ],
        priceGroups: [
          {
            title: "El agujerito pequeño (Caries inicial)",
            description: "Limpiamos el diente con cuidado y rellenamos el hueco con una 'plastilina' blanca del mismo color del diente, que endurecemos con una linterna mágica de luz azul.",
            items: [
              {
                title: [
                  { tipo: 'normal', texto: 'Empaste infantil (Obturación)' },
                  { tipo: 'oculto', texto: '. Incluido (gratuito en consulta para asociad@ a DKV DENTISALUD ELITE).' }
                ],
                description: "100% incluido para niños menores de 15 años",
                price: "Incluido"
              }
            ]
          },
          {
            title: "Falta un trozo de muela (Caries avanzada)",
            description: "A veces la caries es enorme y se ha comido media muela de las que ya son definitivas (las que ya no se caen). Un empaste normal así de grande se caería al masticar pan o carne.",
            items: [
              {
                /* ✨ */  title: [
                  { tipo: 'normal', texto: 'Gran reconstrucción (Molares definitivos)' },
                  { tipo: 'oculto', texto: '. Precio: 40 €.' }
                ],
                description: "Reconstruimos la forma completa de la muela adulta, con unos moldes especiales, para devolverle la fuerza y que le dure muchísimo tiempo.",
                price: "40 €"
              }
            ]
          },
          {
            title: "La muela destrozada (Caries total)",
            description: "Imagina una muela de leche destrozada por la caries en un niño de 5 años. Esa muela no se va a caer hasta los 10 años. No podemos arranccarla (porque perderíamos el hueco para el diente nuevo), y una gran reconstrucción de tal tamaño no aguantaría 5 años de masticación.",
            items: [
              {
                title: [
                  { tipo: 'normal', texto: 'Casquito de superhéroe (Corona de acero)' },
                  { tipo: 'oculto', texto: '. Precio: 65 €.' }
                ],
                description: "Limpiamos la muela y le ponemos una 'armadura' o 'casquito' de acero inoxidable. Protege la muela perfectamente hasta que llegue el día en que se caiga sola.",
                price: "65 €"
              }
            ]
          }
        ]
      }
    ],
premiumBlock: (
      <div className="mt-16 bg-dkv-green-dark text-white p-8 md:p-12 mb-12 rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Heart className="w-32 h-32 text-white" />
        </div>
        <div className="relative z-10">
          <h3 className="font-lemon text-xl mb-4 text-dkv-green-light uppercase tracking-wide">El Consejo para Padres</h3>
          <p className="font-fsme text-lg leading-relaxed italic text-white/90">
            "Los niños tienen una tolerancia al dolor diferente. A veces tienen una caries enorme y no se quejan hasta que la infección ha llegado al nervio y se les hincha la cara. Cuando un niño deja de comer por un lado de la boca o rechaza cosas frías, <strong>actúa rápido</strong>. Empastar una muela a tiempo, además de ser <strong>gratis en consulta</strong>, le evitará lloros, infecciones y tener que tomar antibióticos."
          </p>
        </div>
      </div>
    ),
    cta: {
      title: "No esperes a que llore por la noche",
      infoNote: "Las revisiones periódicas nos ayudan a detectar estas pequeñas lesiones a tiempo, empastándolas en 15 minutos sin que el niño sufra absolutamente nada.",
      description: "Acude con tu pequeño a tu dentista DKV DENTISALUD ELITE más cercano. Curaremos al 'bichito' en un ambiente relajado y pensado para ellos. Encuentra tu consulta:"
    }
  },

  // 20. ODONTOPEDIATRÍA: ENDODONCIA INFANTIL
  'pediatria-endodoncia': {
    slug: 'pediatria-endodoncia',
    activeSubNavId: 'endodoncia-pediatria',
    seoTitle: "Curar el Nervio en Niños | Adios al Dolor de Muelas",
    seoDescription: "Curamos la caries profunda en dientes de leche para quitar el dolor sin tener que arrancarlos. Trato con cariño y precio definitivo. No esperes para pedir cita.",
    breadcrumbs: [
      { label: "Tratamientos", href: "/#tratamientos" },
      { label: "Odontopediatría", href: "/?modal=6#tratamientos" },
      { label: "Endodoncia Infantil", href: "#" }
    ],
    hero: {
      badgeText: "Cuando el dolor no le deja dormir",
      title: { dark: "CURAR EL NERVIO", normal: "INFANTIL" },
      description: [
        "Sí, ¡los dientes de leche también tiene raíces y nervios! Cuando una caries es muy grande y llega hasta él, el niño siente un dolor horrible, sobre todo por las noches.",
        "Nuestra prioridad número uno es quitarle el dolor al instante. Y lo segunda: Curar la infección por dentro con mucha suavidad para no tener que arrancarle la muela antes de tiempo."
      ]
    },
    rows: [
      {
        id: "infeccion",
        name: "Curando la infección paso a paso",
        subTitle: "Tratamientos para que deje de doler en el acto.",
        points: [
          { icon: '', text: <>Dependiendo de cuánto haya avanzado el 'bichito' hacia el interior de la muela, usaremos una 'tirita' u otra para curar el nervio de tu peque.</> }
        ],
        priceGroups: [
          {
            title: "Cuando la caries acaba de tocar el nervio",
            description: "La infección es profunda, pero solo ha llegado a rozar el nervio.",
            items: [
              {
                title: [
                  { tipo: 'normal', texto: 'Limpieza parcial del nervio (Pulpotomía)' },
                  { tipo: 'oculto', texto: '. Precio: 44 €.' }
                ],
                description: "Dormimos la muela, limpiamos solo la parte superior del nervio afectada, y ponemos una 'medicina' para calmarlo. El diente deja de doler en el acto y sigue vivo hasta que se caiga de forma natural.",
                price: "44 €"
              }
            ]
          },
          {
            title: "Cuando la infección llega a las raíces",
            description: "La infección ha bajado hasta el final de las raíces del diente de leche.",
            items: [
              {
                title: [
                  { tipo: 'normal', texto: 'Limpieza total del nervio (Pulpectomía)' },
                  { tipo: 'oculto', texto: '. Precio: 36 €.' }
                ],
                description: "Limpiamos todos los conductos de la raíz y los rellenamos con una pasta especial, que se reabsorverá por sí sola cuando la raíz de leche desaparezca por el empuje del diente definitivo.",
                price: "36 €"
              }
            ]
          },
          {
            title: "Golpe en un diente nuevo",
            description: "Tu hijo se da un golpe fuerte jugando y se parte un diente definitivo que acaba de salir. Es un drama, porque la raíz de ese diente aún no se había terminado de formar por dentro de la encía.",
            items: [
              {
                title: [
                  { tipo: 'normal', texto: 'Ayudar a que la raíz de cierre (Apicoformación)' },
                  { tipo: 'oculto', texto: '. Precio: 20 €.' }
                ],
                description: "En varias sesiones, le ponemos uno medicamentos especiales a la raíz rota para que termine de crecer y cerrarse por sí sola. Así le salvamos su diente definitivo. (Precio por sesión)",
                price: "20 €"
              }
            ]
          },
          {
            title: "¡Del golpe se le ha caido el diente entero!",
            description: "Si tu peque se cae en el parque y un dienteo de los que no se caen ya (definitivo) sale volando entero (con su raíz amarilla incluída), ¡no lo des por perdido!",
            items: [
              {
                title: [
                  { tipo: 'normal', texto: '1) Cógelo por la parte blanca.' }
                ],
                description: "Nunca toques la raíz amarilla con los dedos.",
                price: ""
              },
              {
                title: [
                  { tipo: 'normal', texto: '2) Mételo en un vaso.' }
                ],
                description: "Usa leche fría o suero de la farmacia. ¡Nunca lo laves con agua ni lo frotes!",
                price: ""
              },
              {
                title: [
                  { tipo: 'normal', texto: '3) Ven corriendo a la consulta.' },
                  { tipo: 'oculto', texto: ' Reimplante de pieza dental. Incluido (gratuito en consulta para asociad@ a DKV DENTISALUD ELITE).' }
                ],
                description: "Trataremos de volver a 'plantarlo' en su hueco y sujetarlo para el que cuerpo lo acepte.",
                price: "Incluido"
              }
            ]
          }
        ]
      }
    ],
    cta: {
      title: "Salva su muela a tiempo",
      infoNote: "El dolor de muelas al beber cosas frías o calientes, o que le despierte por la noche, es la señal de alarma. Actuar rápido evitará que se le hinche la cara con un flemón doloroso.",
      description: "Si tu hijo se queja de la boca, no le des solo jarabe. Nuestros dentistas le atenderán con paciencia y delicadeza para que deje de sufrir. Encuentra su dentista:"
    }
  },

  // 21. ODONTOPEDIATRÍA: CIRUGÍA Y ESPACIO
  'pediatria-extracciones-y-espacio': {
    slug: 'pediatria-extracciones-y-espacio',
    activeSubNavId: 'cirugia-pediatria',
    /* ✨ */ seoTitle: "Quitar Dientes de Leche y Guardasitios Infantil",
    /* ✨ */ seoDescription: "Guiamos el recambio de sus dientes. Evita que le salgan torcidos o atrapados con los mantenedores de espacio. Tarifas claras en tu clínica más cercana.",
    breadcrumbs: [
      { label: "Tratamientos", href: "/#tratamientos" },
      { label: "Odontopediatría", href: "/?modal=6#tratamientos" },
      { label: "Extracciones y Espacio", href: "#" }
    ],
    hero: {
      badgeText: "Evitando el atasco dental",
      title: { dark: "QUITAR DIENTES", normal: "Y GUARDAR EL SITIO" },
      description: [
        "El objetivo es asegurar que los dientes de adulto tengan sitio de sobra para salir rectos, evitando tratamientos de ortodoncia largos y costosos en el futuro.",
        "A veces, la mejor forma de ayudar es quitar a tiempo un diente de leche que estorba, o colocar un pequeño aparato para 'guardarle el sitio' al nuevo diente si se pierde una muela de leche antes de tiempo."
      ]
    },
    rows: [
      {
        id: "extracciones",
        name: "Quitar dientes y 'Guardasitios'",
        subTitle: "Dirigiendo el tráfico en la boca de tu peque.",
        priceGroups: [
          {
            title: "Quitar el diente (solo cuando es necesario)",
            description: "No nos gusta arrancar dientes, pero a veces es inevitable si están destrozados por la infección o si se han puesto 'rebeldes' y no dejan sitio para el nuevo.",
            items: [
              {
                title: [
                  { tipo: 'normal', texto: 'Quitar un diente de leche (Extracción Dental simple)' },
                  { tipo: 'oculto', texto: '. Incluido (gratuito en consulta para asociad@ a DKV DENTISALUD ELITE).' }
                ],
                description: "Para muelas imposibles de curar, o para ese típico diente de leche que se resiste a caer y está haciendo que el definitivo salga torcido o por detrás (doble fila).",
                price: "Incluido"
              },
              {
                /* ✨ */  title: [
                  { tipo: 'normal', texto: 'Quitar el diente intruso (Extracción Supernumerario retenido)' },
                  { tipo: 'oculto', texto: '. Precio: 25 €.' }
                ],
                description: "A veces, la naturaleza se equivoca y fabrica un diente extra que se queda atrapado en la encía, sin terminar de salir y taponando la salida de dientes normales. Precio por unidad.",
                price: "25 €"
              }
            ]
          },
          {
            title: "El 'Guardasitios' (Mantenedores de espacio)",
            description: "Imagina que a tu peque de 5 años hay que quitarle una muela por caries. El problema es que el diente nuevo no saldrá hasta los 10 años. Si no ponemos un 'guardasitios', los dientes vecinos se irán juntando hasta cerrar el hueco, y el diente definitivo se quedará atrapado para siempre en el hueso.",
            items: [
              {
                /* ✨ */  title: [
                  { tipo: 'normal', texto: 'Guardasitios para un hueco (Mantenedor fijo unilateral)' },
                  { tipo: 'oculto', texto: '. Precio: 58 €.' }
                ],
                description: "Un anillito de metal pegado a la muela de al lado con un tope para que nadie le quiete el sitio al diente que ha de salir.",
                price: "58 €"
              },
              {
                title: [
                  { tipo: 'normal', texto: 'Guardasitio para varios huecos (Mantenedor fijo bilateral)' },
                  { tipo: 'oculto', texto: '. Precio: 87 €.' }
                ],
                description: "Un pequeño alambre que cruza por detrás de los dientes para sujetar los espacios de los dos lados de la boca a la vez.",
                price: "87 €"
              },
              {
                title: [
                  { tipo: 'normal', texto: 'Guardasitios de quita y pon (Mantenedor removible)' },
                  { tipo: 'oculto', texto: '. Precio: 72 €.' }
                ],
                description: "Aparato de resina que tu peque se puede quitar, y que si hace falta en los dientes de delante, puede llevar un dientecito falso para que pueda sonreir tranquilo.",
                price: "72 €"
              }
            ]
          }
        ]
      }
    ],
    cta: {
      title: "Prevenir hoy te ahorra miles de euros mañana",
      infoNote: "\"Un mantenedor de espacio de 58 € hoy te puede ahorrar literalmente un tratamiento de ortodoncia compleja de 3.000 € en el futuro.\"",
      description: "Acude con tu peque a una revisión gratuita en consulta. Nuestro equipo de dentistas  vigilará que el recambio de sus dientes se desarrolle de forma correcta."
    }
  },

  // 22. PREVENCIÓN: PRIMERA VISITA
  'prevencion-primera-visita': {
    slug: 'prevencion-primera-visita',
    activeSubNavId: 'primera-visita',
    seoTitle: "Tu ITV Dental Anual | Revisión y diagnóstico sin coste en consulta",
    seoDescription: "Anticipate al dolor con una revisión completa, radiografías y prespuesto, de ser necesarios, sin coste en consulta. Encuentra nuestro centro dental más próximo.",
    breadcrumbs: [
      { label: "Tratamientos", href: "/#tratamientos" },
      { label: "Prevención", href: "/?modal=7#tratamientos" },
      { label: "Primera Visita", href: "#" }
    ],
    hero: {
      badgeText: "Tu ITV Dental",
      title: { dark: "REVISIÓN Y", normal: "DIAGNÓSTICO" },
      description: [
        "Para todo el mundo. Es la puerta de entrada a la clínica. Aquí el objetivo no es curar, sino hacerte un chequeo a fondo para evitar que enfermes y localizar cualquier problema por pequeño que sea antes de que duela (y cueste dinero).",
        "Evaluamos tu boca por completo, le ponemos nombre a lo que te duele y te hacemos un plan a medida. Y lo mejor: Casi todo en esta fase sin coste en consulta."
      ]
    },
    rows: [
      {
        id: "consulta",
        name: "La Consulta: Hablar y Revisar",
        price: "Incluido",
        subTitle: "Valorando el estado real de tu boca.",
        priceGroups: [
          {
            title: "Primera visita y chequeos",
            description: "Nos sentamos contigo, estudiamos tu boca y te explicamos con claridad.",
            items: [
              {
                /* ✨ */  title: [
                  { tipo: 'normal', texto: 'Primera visita y plan a medida' },
                  { tipo: 'oculto', texto: '. Incluido (gratuito en consulta para asociad@ a DKV DENTISALUD ELITE).' }
                ],
                description: "Nuestros doctores analizan tu caso sin compromiso y te proporcionan la 'hoja de ruta' exacta para lo que necesitas.",
                price: "Incluido"
              },
              {
                /* ✨ */  title: [
                  { tipo: 'normal', texto: 'Tu ITV anual (Visita de revisión)' },
                  { tipo: 'oculto', texto: '. Incluido (gratuito en consulta para asociad@ a DKV DENTISALUD ELITE).' }
                ],
                description: "El chequeo de control anual obligatorio para asegurar que tu boca sigue perfecta.",
                price: "Incluido"
              },
              {
                /* ✨ */  title: [
                  { tipo: 'normal', texto: 'Consulta de dolor extraño (Cara y mandíbula)' },
                  { tipo: 'oculto', texto: '. Incluido (gratuito en consulta para asociad@ a DKV DENTISALUD ELITE).' }
                ],
                description: "A veces te duele la cabeza, la cara o el oido y no es por una caries. Un motivo puede ser la tensión muscular o el bruxismo. Comprobamos en dicho sentido para confirmar la causa.",
                price: "Incluído"
              }
            ]
          },
          {
            title: "Radiografías",
            description: "Son instantáneas e imprescindibles para ver debajo de la encía y entre los dientes, donde el ojo humano no llega.",
            items: [
              {
                /* ✨ */  title: [
                  { tipo: 'normal', texto: 'Radiografía Intrabucal' },
                  { tipo: 'oculto', texto: '. Incluido (gratuito en consulta para asociad@ a DKV DENTISALUD ELITE).' }
                ],
                description: "Esa plaquita pequeña que te introducimos en la boca. Indolora, nos permite ver si una caries ha llegado al nervio o si hay una infección en la raíz.",
                price: "Incluído"
              },
              {
                /* ✨ */  title: [
                  { tipo: 'normal', texto: 'Radiografía Periapical' },
                  { tipo: 'oculto', texto: '. Incluido (gratuito en consulta para asociad@ a DKV DENTISALUD ELITE).' }
                ],
                description: "",
                price: "Incluído"
              },
              {
                /* ✨ */  title: [
                  { tipo: 'normal', texto: 'Radiografía RVG Digital' },
                  { tipo: 'oculto', texto: '. Incluido (gratuito en consulta para asociad@ a DKV DENTISALUD ELITE).' }
                ],
                description: "",
                price: "Incluído"
              },
              {
                /* ✨ */  title: [
                  { tipo: 'normal', texto: 'Ortopantomografía' },
                  { tipo: 'oculto', texto: '. Incluido (gratuito en consulta para asociad@ a DKV DENTISALUD ELITE).' }
                ],
                description: "La máquina grande que da vueltas alrededor de tu cabeza. Nos da un mapa completo de toda tu boca, el hueso y las muelas del juicio de un solo vistazo.",
                price: "Incluído"
              },
              {
                /* ✨ */  title: [
                  { tipo: 'normal', texto: 'Radiografías de seguimiento' },
                  { tipo: 'oculto', texto: '. Incluido (gratuito en consulta para asociad@ a DKV DENTISALUD ELITE).' }
                ],
                description: "Las radiografías que hacemos durante o después de un tratamiento para asegurarnos de que todo va perfecto.",
                price: "Incluído"
              },
              {
                /* ✨ */  title: [
                  { tipo: 'normal', texto: 'Radiografía de mordida (Oclusal)' },
                  { tipo: 'oculto', texto: '. Incluido (gratuito en consulta para asociad@ a DKV DENTISALUD ELITE).' }
                ],
                description: "Muerdes una placa y nos permite ver el paladar entero desde arriba para buscar dientes que no han salido o quistes grandes.",
                price: "Incluido"
              }
            ]
          }
        ]
      }
    ],
    cta: {
      title: "Prevenir sin coste en consulta",
      infoNote: "El 80% de los problemas graves (y costosos) en odontología podrían evitarse acudiendo a tu revisión anual de 20 minutos. Si no vas, estás desaprovechando las mejores coberturas gratuitas.",
      description: "Encuentra nuestra clínica dental más cercana y reserva hoy mismo tu primera visita y chequeo general:"
    }
  },

  // 22b. PREVENCIÓN Y EDUCACIÓN
  'prevencion-higiene': {
    slug: 'prevencion-higiene',
    activeSubNavId: 'higiene',
    seoTitle: "Limpieza de Boca y Quitar Manchas | Tu Sonrisa al 100%",
    seoDescription: "Elimina el sarro duro y las manchas de café y tabaco sin dolor. La famosa limpieza dental, sin cargo en consulta. Pide cita en tu centro dental más cercano.",
    breadcrumbs: [
      { label: "Tratamientos", href: "/#tratamientos" },
      { label: "Prevención", href: "/?modal=7#tratamientos" },
      { label: "Higiene y Prevención", href: "#" }
    ],
    hero: {
      badgeText: "El escudo protector",
      title: { dark: "HIGIENE Y", normal: "LIMPIEZA DENTAL" },
      description: [
        "El sarro es esa placa dura que se pega a los dientes y que el cepillo de casa ya no puede eliminar. Si lo dejas ahí, las encías se inflaman, sangran y causan mal aliento.",
        "Una buena limpieza profesional al año es el secreto para no tener problemas graves. Aprovecha la cobertura sin cargo en consulta para salir con los dientes impecables."
      ]
    },
    rows: [
      {
        id: "limpieza-prevencion",
        name: "Limpieza profunda y protección",
        price: "Incluido",
        subTitle: "Más vale prevenir que curar (y pagar).",
        priceGroups: [
          {
            title: "Limpieza y Brillo",
            description: "Despedimos al sarro y a las manchas superficiales.",
            items: [
              {
                title: [
                  { tipo: 'normal', texto: 'Limpieza de boca (Eliminar el sarro)' },
                  { tipo: 'oculto', texto: '. Incluido (gratuito en consulta para asociad@ a DKV DENTISALUD ELITE).' }
                ],
                description: "Usamos una punta de ultrasonidos que vibra suavemente con agua para despegar el sarro endurecido que se acumula (sobre todo detrás de los dientes de abajo) sin dañar tu esmalte.",
                price: "Incluido"
              },
              {
                title: [
                  { tipo: 'normal', texto: 'Chorro antimanchas (Bicarbonato)' },
                  { tipo: 'oculto', texto: '. Incluido (gratuito en consulta para asociad@ a DKV DENTISALUD ELITE).' }
                ],
                description: "Un lavado a presión con agua y polvos especiales para borrar las manchas oscuras del café, el té o el tabaco, devolviendo el brillo natural a tu sonrisa.",
                price: "Incluido"
              },
              {
                title: [
                  { tipo: 'normal', texto: 'Baño de Flúor (Fluorización tópica)' },
                  { tipo: 'oculto', texto: '. Incluido (gratuito en consulta para asociad@ a DKV DENTISALUD ELITE).' }
                ],
                description: "Aplicamos un gel que tus dientes absorben, haciéndose muy resistentes a los ataques ácidos de las bacterias.",
                price: "Incluído"
              }
            ]
          },
          {
            title: "Protección Extra",
            description: "Pequeños trucos frente a las caries.",
            items: [
              {
                /* ✨ */  title: [
                  { tipo: 'normal', texto: 'Tapar los surcos (Sellado de fisuras)' },
                  { tipo: 'oculto', texto: '. Incluido (gratuito en consulta para asociad@ a DKV DENTISALUD ELITE).' }
                ],
                description: "Rellenamos las 'arrugas' profundas de las muelas con una resina invisible para que la comida no se queda atrapada. ¡Adiós caries de masticación!",
                price: "Incluído"
              },
              {
                /* ✨ */  title: [
                  { tipo: 'normal', texto: 'Trucos de cepillado (Formación)' },
                  { tipo: 'oculto', texto: '. Incluido (gratuito en consulta para asociad@ a DKV DENTISALUD ELITE).' }
                ],
                description: "Te enseñamos a usar bien el hilo dental y los cepillos pequeños (interdentales) para que no te sangren las encías jamás en casa.",
                price: "Incluído"
              }
            ]
          }
        ]
      }
    ],
    cta: {
      title: "Tu sonrisa al 100% sin pagar de más",
      infoNote: "Si notas tus dientes ásperos al pasar la lengua, ves manchas oscuras en los bordes o hace más de un año que no te haces una limpieza profesional, es el momento perfecto para blindar tu boca.",
      description: "Disfruta de tu limpieza anual sin cargo en consulta y sal de la clínica con los dientes limpios, pulidos y fortalecidos. Busca tu centro:"
    }
  },

  // 23. PERIODONCIA: DIAGNÓSTICO Y CURETAJES
  'periodoncia-basica': {
    slug: 'periodoncia-basica',
    activeSubNavId: 'diagnostico-basico',
    seoTitle: "Tratamiento de Encías y Piorrea | Salva tus dientes",
    seoDescription: "Si te sangran las encías, tienes una infección. Frena la pérdida de hueso con limpiezas profundas (curetajes) sin dolor y con presupuesto trasparente.",
    breadcrumbs: [
      { label: "Tratamientos", href: "/#tratamientos" },
      { label: "Periodoncia", href: "/?modal=10#tratamientos" },
      { label: "Diagnóstico y Tratamiento Básico", href: "#" }
    ],
    hero: {
      badgeText: "Fase inicial de la enfermedad",
      title: { dark: "SANGRADO DE ENCIAS", normal: "(PIORREA)" },
      description: [
        "Si te sangran las encías al lavarte los dientes o notal mal aliento crónico, tu boca te está pidiendo auxilio. Tienes una infección activa (Gingivitis o Piorrea).",
        "De nada sirve tener unos dientes preciosos y sin caries, si el hueso y la encía que los sujeta por debajo se están deshaciendo. El objetivo aquí es frenar la infección en seco para que tus dientes no empiecen a moverse."
      ]
    },
    rows: [
      {
        id: "periodontograma",
        name: "Midiendo el daño (Periodontograma)",
        price: "Incluido",
        subTitle: (
          <div className="flex flex-col gap-2 mb-2">
            <span className="text-dkv-green font-bold text-lg uppercase tracking-[0.2em] font-fsme">Medir antes de curar</span>
          </div>
        ),
        points: [
          { icon: '', text: <><strong className="text-dkv-green-dark font-bold"> El mapa de tu boca.</strong> Para curar las encías, primero necesitamos saber exactamente dónde está escondida la infección y cuánto hueso dse ha 'comido'.</> },
          { icon: '', text: <><strong className="text-dkv-green-dark font-bold">Una regla milimétrica.</strong> Usamos una pequeña sonda (una minúscula regla) para medir el espacio entre tu diente y la encía. Así sabemos, milímetro a milímetro, dónde tenemos que atacar a las bacterias.</> }
        ]
      },
      {
        id: "detartraje",
        name: "Limpieza bajo la encía (Detartraje)",
        price: "Incluido",
        subTitle: (
          <div className="flex flex-col gap-2 mb-2">
            <span className="text-dkv-green font-bold text-lg uppercase tracking-[0.2em] font-fsme">Un paso más allá en limpieza.</span>
          </div>
        ),
        points: [
          { icon: '', text: <><strong className="text-dkv-green-dark font-bold">Buscando lo invisible bajo las encías.</strong><br />A diferencia de la limpieza de boca normal (que solo quita el sarro que se ve a simple vista), esta es una limpieza un poco más profunda enfocada en sacar la placa pegajosa que ya ha empezado a metersa por debajo de la lìnea de la encía.</> }
        ]
      },
      {
        id: "curetaje",
        name: "Limpieza de las raíces (Curetajes)",
        price: "40 €",
        subTitle: (
          <div className="flex flex-col gap-2 mb-2">
            <span className="text-dkv-green font-bold text-lg uppercase tracking-[0.2em] font-fsme">Raspado  hasta la raíz</span>
          </div>
        ),
        points: [
          { icon: '', text: <><strong>¿Cuando hace falta?</strong> Cuando las bacterias llevan tiempo ahí abajo, se convierten en unas costras duras y tóxicas pegadas a la raíz del diente, escondidas bajo la encía. El cepillo de dientes no les hace ni cosquillas.</> },
          { icon: '', text: <><strong>¿Cómo lo hacemos?</strong> Para tu total comodidad te ponemos anestesia local. Usamos unas herramientas finitas (curetas) para raspar, alisar y pulir la raíz de tu diente por debajo de la encía. Al quitar esa costra, tu encía sana y vuelve a abrazar al diente con fuerza.</> }
        ],
        footerNote: "* Precio por cuadrante (la boca se divide en 4 partes)."
      },
      {
        id: "fluor-sensibilidad",
        name: "Gel calmante para la sensibilidad",
        price: "Incluido",
        subTitle: (
          <div className="flex flex-col gap-2 mb-2">
            <span className="text-dkv-green font-bold text-lg uppercase tracking-[0.2em] font-fsme">Alivio inmediato</span>
          </div>
        ),
        points: [
          { icon: '', text: <><strong>El efecto secundario: </strong> Tras hacerte los curetajes y quitarte ese sarro que 'abrigaba' la raíz, es normal que los dientes se queden unos días sensibles al beber agua fría o comer cosas calientes.</> },
          { icon: '', text: <><strong>La solución: </strong> Te aplicamos un gel especial de flúor muy concentrado que sella los poros microscópicos del diente, dándote un alivio inmediato para que te vayas a casa con toda tranquilidad.</> }
        ]
      }
    ],
    cta: {
      title: "El sangrado es un grito de auxilio",
      infoNote: "Las encías sanas NUNCA sangran. Si escupes sangre al lavarte los dientes, hay una infección comiéndose el hueso que soporta tu dentadura.",
      description: "No esperes a que tus dientes empiecen a moverse. Un buen diagnóstico a tiempo (sin coste en consulta) salvará tu sonrisa. Busca tu clínica:"
    }
  },

  // 24. PERIODONCIA: ESTABILIZACIÓN
  'periodoncia-estabilizacion': {
    slug: 'periodoncia-estabilizacion',
    activeSubNavId: 'estabilizacion',
    seoTitle: "Frenar la Piorrea y Sujetar Dientes | Mantenimiento de Encías",
    seoDescription: "Evita que tus dientes se caigan. Revisiones periódicas y estabilización de dientes con precios claros. Cuida tus encías en nuestro centro dental más cercano.",
    breadcrumbs: [
      { label: "Tratamientos", href: "/#tratamientos" },
      { label: "Periodoncia", href: "/?modal=10#tratamientos" },
      { label: "Estabilización", href: "#" }
    ],
    hero: {
      badgeText: "Control para toda la vida",
      title: { dark: "MANTENIMIENTO Y", normal: "FIJACION DE DIENTES" },
      description: [
        "La 'piorrea' (enfermedad de las encías) es como la diabetes, es decir, no se llega a curar, pero se controla perfectamente. De nada sirve hacer una limpieza profunda si luego nos olvidamos de revisar.",
        "Ahora toca mantener a las bacterias a raya y sujetar esos dientes que han empezado a moverse para que vuelvas a comer sin miedo y con total seguridad."
      ]
    },
    rows: [
      {
        id: "revisiones-periodontales",
        name: "Mantenimiento (Para que la infección no vuelva)",
        subTitle: (
          <div className="flex flex-col gap-2 mb-2">
            <span className="text-dkv-green font-bold text-lg uppercase tracking-[0.2em] font-fsme">Vigilancia constante</span>
          </div>
        ),
        points: [
          { icon: '', text: <><strong>La revisión.</strong> Miramos con lupa que la infección permanezca inactiva, y que no se sigue comiendo el hueso midiendo tu encía.</> },
          { icon: '', text: <><strong>La limpieza especial.</strong> Cada 4 o 6 meses toca hacer una limpieza médica (más a fondo que la normal). Es vital para mantener a raya a las bacterias que intentan volver a meterse debajo de la encía.</> },
          { icon: '', text: <><strong>La regla de oro. </strong> Saltarse estas visitas es el motivo número uno por el que la piorrea vuelve a atacar. Si has perdido hueso, la limpieza anual normal ya no es suficiente para tu boca.</> }
        ],
        detailedPrices: [
          {
            icon: '',
            title: [
              { tipo: 'normal', texto: 'Revisión de control de encías' },
              { tipo: 'oculto', texto: '. Incluido (gratuito en consulta para asociad@ a DKV DENTISALUD ELITE).' }
            ],
            description: '',
            price: 'Incluido'
          },
          {
            icon: '',
            title: [
              { tipo: 'normal', texto: 'Limpieza especial de mantenimiento' },
              { tipo: 'oculto', texto: ' (Limpieza periodontal). Precio: 65 €.' }
            ],
            description: 'Limpieza periodontal profunda',
            price: "65 €"
          }
        ]
      },
      {
        id: "ferulizacion",
        name: "Sujetar los dientes que se mueven (Ferulización)",
        subTitle: (
          <div className="flex flex-col gap-2 mb-2">
            <span className="text-dkv-green font-bold text-lg uppercase tracking-[0.2em] font-fsme mt-4">Recuperar firmeza al masticar</span>
          </div>
        ),
        points: [
          { icon: '', text: <><strong>El truco invisible:</strong> Si has perdido hueso y notas que algún diente 'baila', no te asustes. Lo que hacemos es "atarlos" por detrás a los dientes vecinos que están más fuertes, usando una fibra blanca invisible y un poco de resina.</> },
          { icon: '', text: <><strong>El beneficio:</strong> Al unirlos todos en bloque, la fuerza al masticar se reparte y el diente flojo deja de moverse. Volveras a masticar sin miedo a que se caiga.</> }
        ],
        detailedPrices: [
          {
            icon: '',
            title: [
              { tipo: 'oculto', texto: 'Ferulización periodontal ' },
              { tipo: 'normal', texto: 'Fijar un solo diente' },
              { tipo: 'oculto', texto: '. Precio: 18 €.' }
            ],
            description: 'Precio por pieza dental atada.',
            price: '18 €'
          },
          {
            icon: '',
            /* ✨ */  title: [
              { tipo: 'oculto', texto: 'Ferulización periodontal ' },
              { tipo: 'normal', texto: 'Fijar un tramo entero (6 dientes)' },
              { tipo: 'oculto', texto: '. Precio: 100 €.' }
            ],
            description: 'Tramo completo unido (por ejemplo de colmillo a colmillo).',
            price: "100 €"
          }
        ]
      }
    ],
    cta: {
      title: "Tus dientes aún tienen mucha vida",
      infoNote: "Incluso los dientes que se mueven bastante pueden durarte muchísimos años si logramos frenar la infección a tiempo y los sujetamos a sus vecinos sanos.",
      description: "Acude a uno de nuestros especialistas en periodoncia para ver si podemos salvar tus dientes. Encuentra tu centro más cercano:"
    }
  },

  // 25. PERIODONCIA: MICRO-CIRUGÍA Y LÁSER 
  'periodoncia-micro-cirugia': {
    slug: 'periodoncia-micro-cirugia',
    activeSubNavId: 'micro-cirugia',
    seoTitle: "Cirugía de Encías y Láser | Periodoncia salvando tus Dientes sin Dolor",
    seoDescription: "Limpieza profunda de encías, injertos de hueso y cirugía láser sin sangrado. Recuperación rápida con precios claros. Encuentra tu centro dental más cercano.",
    breadcrumbs: [
      { label: "Tratamientos", href: "/#tratamientos" },
      { label: "Periodoncia", href: "/?modal=10#tratamientos" },
      { label: "Micro-Cirugía", href: "#" }
    ],
    hero: {
      badgeText: "Limpieza profunda y reconstrucción",
      title: { dark: "CIRUGÍA AVANZADA", normal: "DE ENCÍAS" },
      description: [
        "A veces, el sarro y la infección están tan profundos que una limpieza normal no llega al fondo del problema. Si no actuamos, el diente acabará cayéndose.",
        "Con estas intervenciones de precisión, abrimos un poquito para limpiar la raíz viéndola directamente, y si hace falta, rellenamos con hueso nuevo las zonas dañadas para salvar tu pieza."
      ]
    },
    rows: [
      {
        id: "colgajo",
        name: "Limpieza Quirúrgica Profunda (Cirugía a colgajo)",
        subTitle: (
          <div className="flex flex-col gap-2 mb-2">
            <span className="text-dkv-green font-bold text-lg uppercase tracking-[0.2em] font-fsme mt-4">Sin escondites para el sarro</span>
          </div>
        ),
        points: [
          { icon: '', text: <><strong>¿Por qué hace falta?</strong> Cuando la infección es tan profunda que las herramientas normales no llegan a limpiar el fondo de la bolsa de sarro.</> },
          { icon: '', text: <><strong>¿Cómo se hace?</strong> Con la zona dormida, apartamos suavemente la encía (como si abriéramos la solapa de un sobre). Así vemos perfectamente el hueso y la raíz, los limpiamos a conciencia, y volvemos a cerrar con unos puntos muy finos.</> }
        ],
        detailedPrices: [
          {
            icon: '',
            /* ✨ */  title: [
              { tipo: 'oculto', texto: 'Cirugía periodontal a colgajo ' },
              { tipo: 'normal', texto: 'Limpiar un solo diente' },
              { tipo: 'oculto', texto: '. Precio: 26 €.' }
            ],
            description: '',
            price: '26 €'
          },
          {
            icon: '',
            /* ✨ */  title: [
              { tipo: 'oculto', texto: 'Cirugía periodontal a colgajo ' },
              { tipo: 'normal', texto: 'Limpiar un cuadrante entero' },
              { tipo: 'oculto', texto: '. Precio: 100 €.' }
            ],
            description: '(Precio por cuadrante completo de la boca)',
            price: "100 €"
          }
        ]
      },
      {
        id: "epulis",
        name: "Quitar bultitos en la encía (Épulis)",
        price: "40 €",
        subTitle: "Fuera roces y molestias.",
        points: [
          { icon: '', text: <><strong>Intervención muy sencilla y rápida</strong> para quitar un pequeño bulto benigno o quiste que sale en la encía, casi siempre por el roce continuo de una dentadura postiza o un diente roto.</> }
        ]
      },
      {
        id: "regenerativo",
        name: "Regenerar el hueso perdido (Injertos)",
        subTitle: "Reconstruyendo el soporte de tu diente.",
        points: [
          { icon: '', text: <><strong>¿Por qué hace falta?</strong> La infección bacteriana se ha comido parte del hueso que sujeta tu diente. Si no lo rellenamos, ese diente se soltará por no tener donde sujetarse.</> },
          { icon: '', text: <>Añadimos materiales especiales para que tu organismo vuelva a fabricar hueso natural en esa zona.</> }
        ],
        detailedPrices: [
          {
            icon: '',
            title: [
              { tipo: 'normal', texto: 'Cirugía periodontal de injerto de hueso' },
              { tipo: 'oculto', texto: '. Precio: 130 €.' }
            ],
            description: 'Intervención para preparar el hueco y colocar el material.',
            price: '130 €'
          },
          {
            icon: '',
            title: [
              { tipo: 'normal', texto: 'Malla de sujeción (Membrana regenerativa)' },
              { tipo: 'oculto', texto: '. Precio: 150 €.' }
            ],
            description: 'Malla que sujeta la encía para que no invada el hueco que ha de ocupar el nuevo hueso regenerado.',
            price: "150 €"
          },
          {
            icon: '',
            title: [
              { tipo: 'normal', texto: 'Hueso del propio paciente (Injerto autólogo)' },
              { tipo: 'oculto', texto: '. Precio: 190 €.' }
            ],
            description: 'La opción biológica más segura.',
            price: "190 €"
          },
          {
            icon: '',
            title: [
              { tipo: 'normal', texto: 'Hueso artificial (Otros materiales de injerto)' },
              { tipo: 'oculto', texto: '. Precio: 150 €.' }
            ],
            description: 'Material de relleno estéril que tu cuerpo asimila. Precio por unidad.',
            price: "150 €"
          }
        ]
      },
      {
        id: "gingivectomia",
        name: "Recorte estético de la encía",
        subTitle: (
          <div className="flex flex-col gap-2 mb-2">
            <span className="text-dkv-green font-bold text-lg uppercase tracking-[0.2em] font-fsme mt-4">Solución a la 'sonrisa de encía'</span>
          </div>
        ),
        points: [
          { icon: '', text: <><strong>Dientes más grandes y bonitos.</strong> Si sientes que tus dientes son muy cortos, o que enseñas demasiada encía al sonreír (o está inflamada), recortamos milimétricamente los bordes de la encía para destapar el diente y mejorar tu sonrisa de forma espectacular.</> }
        ],
        detailedPrices: [
          {
            icon: '',
            title: [
              { tipo: 'normal', texto: 'Recorte de encía simple (Gingivectomía)' },
              { tipo: 'oculto', texto: '. Precio: 17 €.' }
            ],
            description: 'Quitar el exceso de encía sin tocar el hueso. Precio por zona (cuadrante).',
            price: '17 €'
          },
          {
            icon: '',
            title: [
              { tipo: 'normal', texto: 'Alargamiento completo del diente' },
              { tipo: 'oculto', texto: '. Precio: 100 €.' }
            ],
            description: 'Además de recortar la encía, limamos un poquito el hueso para exponer más diente natural.',
            price: "100 €"
          }
        ]
      }
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
            Cirugía Avanzada y Láser Dental
          </h2>
          <div className="inline-block bg-[#D4AF37]/20 border border-[#D4AF37]/40 px-4 py-1.5 rounded-full text-sm font-bold text-[#D4AF37] mb-8 uppercase tracking-widest">
            Exclusivo en Centros Propios Especiales
          </div>

          <div className="space-y-6">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 mb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <Zap className="w-6 h-6 text-[#D4AF37] shrink-0" />
                  <h3 className="font-bold text-lg md:text-xl text-white">Operar con Luz Láser (Sin bisturí)</h3>
                </div>
                <span className="text-[#D4AF37] font-lemon font-bold text-2xl mt-4 md:mt-0 shrink-0">
                  55 € <span className="text-sm font-fsme text-white/70 block md:inline md:ml-1">/acto</span>
                </span>
              </div>
              <p className="text-white/80 font-fsme leading-relaxed text-lg">
                <strong>El beneficio:</strong> Usamos la luz láser en lugar del clásico bisturí para cortar la encía. El láser cauteriza y desinfecta al instante, evitando el sangrado y <strong>eliminando prácticamente el dolor e hinchazon de los días posteriores.</strong>
              </p>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 mb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <Droplet className="w-6 h-6 text-[#D4AF37] shrink-0" />
                  <h3 className="font-bold text-lg md:text-xl text-white">Cicatrización acelerada con tu propio plasma (PRGF)</h3>
                </div>
                <span className="text-[#D4AF37] font-lemon font-bold text-2xl mt-4 md:mt-0 shrink-0">
                  150 €
                </span>
              </div>
              <p className="text-white/80 font-fsme leading-relaxed text-lg">Sacamos una muestra de tu sangre para extraer tus propias plaquetas y defensas naturales. Las ponemos en la zona intervenida, logrando que tus encías <strong>cicatricen a velocidad récord</strong>, de forma 100% natural.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 mb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <MoveUp className="w-6 h-6 text-[#D4AF37] shrink-0" />
                  <h3 className="font-bold text-lg md:text-xl text-white">Hacer sitio arriba (Elevación de seno abierto)</h3>
                </div>
                <span className="text-[#D4AF37] font-lemon font-bold text-2xl mt-4 md:mt-0 shrink-0">
                  310 €
                </span>
              </div>
              <p className="text-white/80 font-fsme leading-relaxed text-lg mb-3">
                <strong>¿Por qué se hace?</strong> Es para pacientes que perdieron las muelas de arriba hace años y ya no les queda altura de hueso para poner un implante (chocaría con la cavidad nasal).
              </p>
              <p className="text-white/80 font-fsme leading-relaxed text-lg">
                <strong>La técnica:</strong> Levantamos suavemente esa cavidad desde dentro y metemos hueso para crear unos cimientos fuertes y seguros para tus futuros implantes.
              </p>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 mb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <Stethoscope className="w-6 h-6 text-[#D4AF37] shrink-0" />
                  <h3 className="font-bold text-lg md:text-xl text-white">Reconstrucción de huecos gigantes (Regeneración Tisular Guiada -RTG-)</h3>
                </div>
                <span className="text-[#D4AF37] font-lemon font-bold text-2xl mt-4 md:mt-0 shrink-0">
                  325 €
                </span>
              </div>
              <p className="text-white/80 font-fsme leading-relaxed text-lg">
Usamos mallas especiales para tapar agujeros enormes en el hueso (ej causados por grandes quistes). Es la ingeniería más avanzada para recuperar la forma original de tu mandíbula.
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
    cta: {
      title: "Tecnología para no sufrir",
      infoNote: "La tecnología láser y el uso de plasma nos permiten realizar intervenciones en las encías que hace años eran un suplicio, de forma rápida, segura y con un postoperatorio fácil de llevar.",
      description: "Acude a uno de nuestros especialistas para valorar la salud profunda de tus encías y descubrir cómo el láser puede hacerte la vida más fácil:"
    }
  },

  // 26. CIRUGÍA AVANZADA: EXTRACCIONES COMPLEJAS 
  'cirugia-extracciones': {
    slug: 'cirugia-extracciones',
    activeSubNavId: 'extracciones',
    seoTitle: "Extracción de Muelas del Juicio y Dientes Rotos",
    seoDescription: "¿Te duele la muela del juicio o tienes una raíz hundida? Te lo solucionamos rápido y con precios súper claros. Pide cita en nuestros centros dentales.",
    breadcrumbs: [
      { label: "Tratamientos", href: "/#tratamientos" },
      { label: "Cirugía Avanzada", href: "/?modal=11#tratamientos" },
      { label: "Extracciones Complejas", href: "#" }
    ],
    hero: {
      badgeText: "Muelas del juicio y más",
      title: { dark: "EXTRACCIONES", normal: "DENTALES" },
      description: [
        "A nadie le gusta que le saquen una muela, pero cuando un diente está destrozado o las muelas del juicio están empujando y generando dolor, lo importante es hacerlo rápido.",
        "Nuestros dentistas usan técnicas avanzadas para quitar esa muela molesta en minutos, minimizar el impacto en tu encía y que te recuperes rápidamente y sin complicaciones."
      ]
    },
    rows: [
      {
        id: "muelas-juicio",
        name: "Extracciones",
        subTitle: "El mal trago pasa volando.",
        points: [
          { icon: '', text: <><strong>El diagnóstico es la clave.</strong> Si el diente se ve entero, sacarlo es facilísimo. Si está muy roto o es una muela del juicio que viene torcida dentro del hueso, lleva un poquito más de trabajo, pero con la anestesia adecuada no sentirás absolutamente nada.</> },
          { icon: '', text: <><strong>Pensando en el mañana.</strong> Si tras quitar la muela tienes pensado ponerte un implante, te recomendamos "rellenar el hueco" en el mismo momento para que tu hueso no se encoja.</> }
        ],
        priceGroups: [
          {
            title: "Extracción de dientes (que no son del juicio)",
            description: "Por ej para muelas rotas, picadas o que se mueven demasiado.",
            items: [
              { icon: '',
                title: [
                  { tipo: 'normal', texto: 'Sacar un diente normal (Extracción simple)' },
                  { tipo: 'oculto', texto: '. Incluido (gratuito en consulta para asociad@ a DKV DENTISALUD ELITE).' }
                ],
                description: "El diente está a la vista y sale entero sin necesidad de abrir la encía.", price: "Incluido"},
              { icon: '',
                title: [
                  { tipo: 'normal', texto: 'Sacar raíces rotas (Restos radiculares)' },
                  { tipo: 'oculto', texto: '. Incluido (gratuito en consulta para asociad@ a DKV DENTISALUD ELITE).' }
                ],
                description: "Cuando la muela se ha partido a ras de encía y solo queda el 'tocón' hundido. Si es necesario, abrimos un poquito la encía para sacarlo con cuidado.", price: "Incluido"},
              { icon: '',
                title: [
                  { tipo: 'normal', texto: 'Salvar media muela (Amputación radicular)' },
                  { tipo: 'oculto', texto: '. Incluido (gratuito en consulta para asociad@ a DKV DENTISALUD ELITE).' }
                ],
                description: "Si una muela grande tiene varias raíces y solo una está mala, cortamos la mala y salvamos el resto del diente. Evita la extracción de toda la pieza.", price: "Incluido"}
            ]
          },
          {
            title: "Las Muelas del Juicio",
            description: "Las muelas que salen tarde y casi siempre estorban.",
            items: [
              { icon: '',
                /* ✨ */  title: [
                  { tipo: 'normal', texto: 'Extracción de Muela del juicio que ya ha salido (normal)' },
                  { tipo: 'oculto', texto: '. Precio: 15 €.' }
                ],
                description: "La muela ha salido entera y se saca fácilmente.", price: "15 €" },
              { icon: '',
                /* ✨ */  title: [
                  { tipo: 'normal', texto: 'Extracción de Muela del juicio a medio salir (submucosa)' },
                  { tipo: 'oculto', texto: '. Precio: 15 €.' }
                ],
                description: "La muela asoma, pero sigue medio tapada por la encía.", price: "15 €"},
              { icon: '',
                /* ✨ */  title: [
                  { tipo: 'normal', texto: 'Muela del juicio escondida o torcida (cirugía)' },
                  { tipo: 'oculto', texto: '. Precio: 25 €.' }
                ],
                description: "La muela está tumbada o atrapada dentro del hueso. Hay que hacer una pequeña intervención para liberarla y dar algún punto de sutura.", price: "25 €"}
            ]
          },
          {
            title: "Rellenar el hueco para el futuro",
            description: "Cuando sacas un diente, la encía y el hueso se hunden al quedarse vacíos. Si vas a querer ponerte un implante en el futuro, rellenamos el hueco en el mismo momento de la extracción con hueso artificial para que tu encía no se encoja y sea mucho más fácil poner el implante después.",
            items: [
              { icon: '',
                title: [
                  { tipo: 'normal', texto: 'Rellenar el hueco de un diente' },
                  { tipo: 'oculto', texto: 'Tratamiento regenerativo alveolar post-exodoncia: Una pieza. Precio: 80 €.' }
                ],
                description: "(Tratamiento regenerativo post-exodoncia). Incluye el material de relleno.", price: "80 €" },
              { icon: '',
                title: [
                  { tipo: 'normal', texto: 'Rellenar el hueco de varios dientes' },
                  { tipo: 'oculto', texto: 'Tratamiento regenerativo alveolar post-exodoncia: Más de una pieza. Precio: 150 €.' }
                ],
                description: "Si sacamos dos o más dientes seguidos. Incluye el material de relleno.", price: "150 €"}
            ]
          }
        ]
      }
    ],
    cta: {
      title: "En manos expertas",
      infoNote: "Quitar una muela del juicio escondida requiere muchísima destreza para no tocar nervios importantes, hacerlo rápido y que al día siguiente tengas pocas molestias.",
      description: "Si te está doliendo la muela del juicio o tienes un diente partido que no tiene salvación, busca nuestro centro dental más cercano y quítate el problema de encima hoy mismo:"
    }
  }

};

export function getTreatmentDefinition(slug: string): TreatmentDefinition | undefined {
  return treatmentsRegistry[slug];
}
