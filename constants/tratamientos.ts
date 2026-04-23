// constants/tratamientos.ts

import { 
  Baby, Sparkles, Stethoscope, Zap, Activity, 
  Moon, Smile, ShieldCheck, HeartPulse, Scissors 
} from "lucide-react";

export const tratamientosList = [
  { id: 1, hasSub: true, icon: Baby, image: "/images/tratamientos/estetica.png", title: "Precio de Estética" },
  { id: 2, hasSub: true, icon: Sparkles, image: "/images/tratamientos/ortodoncia-brackets-cristal-zafiro-standard-un-diente.png", title: "Precio de Ortodoncia" },
  { id: 3, hasSub: true, icon: Stethoscope, image: "/images/tratamientos/implantes.png", title: "Precio de Implantes" },
  { id: 4, hasSub: true, icon: Zap, image: "/images/tratamientos/endodoncia.png", title: "Precio de Empastes y Endodoncias" },
  { id: 5, hasSub: true, icon: Activity, title: "Precios de Prótesis", image: "/images/tratamientos/protesis.png" },
  { id: 9, href: "/tratamientos-v2/apnea", icon: Moon, title: "Precio para Apnea", image: "/images/tratamientos/ferula.png" },
  { id: 6, hasSub: true, icon: Smile, image: "/images/tratamientos/odontopediatria.png", title: "Niñ@s" },
  { id: 7, hasSub: true, icon: ShieldCheck, image: "/images/tratamientos/general.png", title: "Prevención" },
  { id: 10, hasSub: true, icon: HeartPulse, image: "/images/tratamientos/encias-y-periodoncia.png", title: "Precio de Periodoncia" },
  { id: 11, href: "/tratamientos-v2/cirugia-extracciones", icon: Scissors, title: "Precio de Extracciones", image: "/images/tratamientos/cirugia.png" },
];

export const subOptionsMap: Record<number, any[]> = {
  1: [ // Estética
    { id: 'blanqueamiento', title: 'Blanqueamiento', href: '/tratamientos-v2/estetica-blanqueamiento', tag: 'Luz y armonía' }, 
    { id: 'carillas', title: 'Carillas y Diseño', href: '/tratamientos-v2/estetica-carillas', tag: 'Hollywood Smile' },
    { id: 'incrustaciones', title: 'Incrustaciones', href: '/tratamientos-v2/estetica-incrustaciones', tag: 'Reconstrucción' },
    { id: 'sep-orto-estetica', isSeparator: true, title: 'Alineación Estética' },
    { id: 'invisalign-est', title: 'Invisalign', href: '/tratamientos-v2/ortodoncia-invisalign', tag: 'Ortodoncia Invisible' }, 
    { id: 'lingual-est', title: 'Ortodoncia Lingual', href: '/tratamientos-v2/ortodoncia-lingual', tag: 'Aparato Interior' },
    { id: 'zafiro-est', title: 'Brackets de Zafiro', href: '/tratamientos-v2/ortodoncia-zafiro', tag: 'Estética Fija' },
  ],
  2: [ // Ortodoncia
    { id: 'invisalign', title: 'Invisalign', href: '/tratamientos-v2/ortodoncia-invisalign', tag: 'Invisible' }, 
    { id: 'lingual', title: 'Lingual', href: '/tratamientos-v2/ortodoncia-lingual', tag: 'Interior' },
    { id: 'zafiro', title: 'Zafiro', href: '/tratamientos-v2/ortodoncia-zafiro', tag: 'Estética Fija' },
    { id: 'metalica', title: 'Metálica', href: '/tratamientos-v2/ortodoncia-metalica', tag: 'Tradicional' },
    { id: 'sep-orto-infantil', isSeparator: true, title: 'Ortodoncia Infantil' },
    { id: 'ortodoncia-removible', title: 'Ortodoncia Removible', href: '/tratamientos-v2/ortodoncia-removible', tag: 'Aparatos de quita y pon' }
  ],
  3: [ // Implantes
    { id: 'individual', title: 'Implante Individual', href: '/tratamientos-v2/implante-individual', tag: 'Sustitución de 1 pieza' },
    { id: 'arcada', title: 'Arcada Completa Fija', href: '/tratamientos-v2/implante-arcada', tag: 'Todos los dientes fijos' },
    { id: 'sobredentadura', title: 'Sobredentadura', href: '/tratamientos-v2/implante-sobredentadura', tag: 'Económica y segura' },
    { id: 'hueso', title: 'Regeneración de Hueso', href: '/tratamientos-v2/regeneracion-hueso', tag: 'Según el estado de tu hueso' }
  ],
  5: [ // Prótesis
    { id: 'fijas', title: 'Prótesis Fijas', href: '/tratamientos-v2/protesis-fijas', tag: 'Dientes que no se quitan' },
    { id: 'removibles', title: 'Prótesis Removibles', href: '/tratamientos-v2/protesis-removibles', tag: 'De quita y pon' },
    { id: 'bruxismo', title: 'Oclusión y Bruxismo', href: '/tratamientos-v2/protesis-bruxismo', tag: 'Protección' }
  ],
  6: [ // Pediatría
    { id: 'prevencion', title: 'Prevención y Educación', href: '/tratamientos-v2/pediatria-prevencion', tag: 'Escudo protector' },
    { id: 'conservadora', title: 'Curando la Caries', href: '/tratamientos-v2/pediatria-conservadora', tag: 'Odontología conservadora' },
    { id: 'endodoncia', title: 'Endodoncia Infantil', href: '/tratamientos-v2/pediatria-endodoncia', tag: 'Salvar el diente' },
    { id: 'espacios', title: 'Salvando los Espacios', href: '/tratamientos-v2/pediatria-extracciones-y-espacio', tag: 'Para los dientes que vienen' },
    { id: 'sep-orto-infantil-ped', isSeparator: true, title: 'Ortodoncia Infantil' },
    { id: 'ortodoncia-removible-ped', title: 'Ortodoncia Removible', href: '/tratamientos-v2/ortodoncia-removible', tag: 'Aparatos de quita y pon' }
  ],
  4: [ // Conservadora
    { id: 'reconstruccion', title: 'Reconstrucción', href: '/tratamientos-v2/conservadora-reconstruccion', tag: 'Frenar la caries a tiempo' },
    { id: 'endodoncias', title: 'Endodoncias', href: '/tratamientos-v2/conservadora-endodoncia', tag: 'Cuando no te deja dormir' },
    { id: 'cirugia-complejos', title: 'Cirugía y Casos Complejos', href: '/tratamientos-v2/conservadora-cirugia', tag: 'Segundas oportunidades' }
  ],
  7: [ // Prevención
    { id: 'primera-visita', title: 'Primera visita', href: '/tratamientos-v2/prevencion-primera-visita', tag: 'Diagnóstico inicial' },
    { id: 'higiene', title: 'Higiene y prevención', href: '/tratamientos-v2/prevencion-higiene', tag: 'Mantenimiento' }
  ],
  10: [ // Periodoncia
    { id: 'diagnostico-basico', title: 'Gingivitis y Piorrea', href: '/tratamientos-v2/periodoncia-basica', tag: 'Fase inicial' },
    { id: 'estabilizacion', title: 'Estabilización', href: '/tratamientos-v2/periodoncia-estabilizacion', tag: 'Control de la enfermedad' },
    { id: 'micro-cirugia', title: 'Micro cirugía', href: '/tratamientos-v2/periodoncia-micro-cirugia', tag: 'Regeneración' }
  ],
  11: [ // Cirugía
    { id: 'extracciones', title: 'Extracciones', href: '/tratamientos-v2/cirugia-extracciones', tag: 'Muelas del juicio y más' }
  ]
};

export const modalTitles: Record<number, { title: string, subtitle: string }> = {
  1: { title: "ESTÉTICA DENTAL", subtitle: "Elige el tratamiento que deseas:" },
  2: { title: "ORTODONCIA", subtitle: "Elige el tipo de aparato:" },
  3: { title: "IMPLANTES", subtitle: "Elige la solución que necesitas:" },
  5: { title: "PRÓTESIS Y REHABILITACIÓN", subtitle: "Elige el tipo de tratamiento:" },
  6: { title: "ODONTOPEDIATRÍA", subtitle: "Cuidando la sonrisa de los más pequeños:" },
  4: { title: "ODONTOLOGÍA CONSERVADORA", subtitle: "Salvar tu diente es nuestra prioridad:" },
  7: { title: "PREVENCIÓN", subtitle: "La base de una boca sana:" },
  10: { title: "PERIODONCIA", subtitle: "Cuida el soporte de tus dientes:" },
  11: { title: "EXTRACCIONES", subtitle: "Extracciones y regeneración:" }
};