import { Metadata } from "next";
import React from "react";

// Componentes reales extraídos de tu proyecto
import Header from "@/components/layout/Header";
import FooterLegal from "@/components/FooterLegal";
import CookieBanner from "@/components/CookieBanner";
import FixedBreadcrumb from "@/components/layout/FixedBreadcrumb";
import LeadForm from "@/components/LeadForm";
import { CheckCircle2, AlertCircle, Info, Stethoscope } from "lucide-react";

// Importamos nuestro Índice Nivel Dios (Ajusta la ruta según donde lo hayas guardado)
import { GodLevelTOC } from "@/components/ui/GodLevelTOC"; 

export const metadata: Metadata = {
  title: "Salvando piezas - Odontología conservadora | DKV Dentisalud",
  description: "Guía de tratamientos conservadores para preservar tu dentadura natural: empastes, endodoncias y reconstrucciones con precios cerrados.",
};

// --- DATA ESTRUCTURADA PARA EL ÍNDICE ---
// Esto le dice al índice flotante exactamente qué IDs buscar para hacer el scroll.
const tocData = [
  {
    level: { id: "nivel-1", number: "Nivel 1", title: "El nervio sobrevive" },
    treatments: [
      { id: "empaste", name: "Obturación (empaste) con o sin recubrimiento pulpar" },
      { id: "bioactivo", name: "Sustitutivo dentinario bioactivo" },
      { id: "reconstruccion", name: "Gran reconstrucción" }
    ]
  },
  {
    level: { id: "nivel-2", number: "Nivel 2", title: "Dolor agudo e intolerable (Urgencia)" },
    treatments: [
      { id: "urgencia", name: "Pulpectomía de urgencias" }
    ]
  },
  {
    level: { id: "nivel-3", number: "Nivel 3", title: "Infección total y pérdida crítica" },
    treatments: [
      { id: "endodoncia", name: "Endodoncia Completa" }
    ]
  },
  {
    level: { id: "nivel-4", number: "Niveles 4 y 5", title: "Casos Complejos y Cirugía" },
    treatments: [
      { id: "reendodoncia", name: "Reendodoncia (1, 2 o 3 conductos)" },
      { id: "apicoformacion", name: "Apicoformación" },
      { id: "cirugia", name: "Apicectomía o Cirugía Periapical" },
      { id: "reimplante", name: "Reimplante de pieza dental" }
    ]
  }
];

// --- Componentes de UI ---
const TreatmentRow = ({ id, name, price, children }: { id: string, name: string, price: string, children: React.ReactNode }) => (
  <div id={id} className="py-8 border-b border-dkv-gray-border last:border-0 group scroll-mt-[130px]">
    <h2 className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-2 mb-4 text-lg md:text-xl font-bold font-lemon text-dkv-green-dark leading-tight uppercase group-hover:text-dkv-green transition-colors">
      <span>{name}</span>
      <span className="flex items-center gap-2 shrink-0 text-2xl font-lemon font-bold text-dkv-green normal-case">
        {price}
      </span>
    </h2>
    <div className="text-dkv-gray font-fsme leading-relaxed text-sm md:text-base space-y-3">
      {children}
    </div>
  </div>
);

const LevelTitle = ({ id, number, title, description }: { id: string, number: string, title: string, description?: string }) => (
  <div id={id} className="mt-16 mb-8 scroll-mt-[130px]">
    <span className="text-dkv-green font-bold text-xs uppercase tracking-[0.2em] font-fsme">{number}</span>
    <p className="text-2xl md:text-3xl font-bold font-lemon text-dkv-green-dark border-b-2 border-dkv-green pb-3 inline-block w-full mt-2 uppercase tracking-wide">
      {title}
    </p>
    {description && <p className="text-dkv-gray mt-4 font-fsme text-lg">{description}</p>}
  </div>
);

export default function OdontologiaConservadoraPage() {
  const breadcrumbs = [
    { label: "Inicio", href: "/" },
    { label: "Tratamientos", href: "/tratamientos" },
    { label: "Odontología Conservadora", href: "#" }
  ];

  return (
    <div className="min-h-screen bg-white font-fsme text-dkv-gray selection:bg-dkv-green selection:text-white">
      <CookieBanner />
      <Header />

      <main className="pt-[110px]">
        <FixedBreadcrumb items={breadcrumbs} />

        {/* HERO SECCIÓN */}
        <section className="bg-dkv-gray-border/30 py-16 md:py-24 border-b border-dkv-gray-border relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10 max-w-4xl">
            <span className="inline-block py-1 px-3 bg-dkv-green/10 text-dkv-green-dark font-bold text-xs uppercase tracking-wider rounded-full font-fsme mb-6">
              Guía de Tratamientos y Presupuestos
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-lemon text-dkv-green-dark leading-tight mb-6">
              SALVANDO PIEZAS <br />
              <span className="text-dkv-green">ODONTOLOGÍA CONSERVADORA</span>
            </h1>
            <p className="text-lg text-dkv-gray font-fsme leading-relaxed">
              Cuando un dolor dental interrumpe tu rutina diaria, hay que evitar la extracción en lo posible.
            </p>
            <p className="text-lg text-dkv-gray font-fsme leading-relaxed mt-4">
              La pérdida de una pieza dental implica <strong>una inversión de tiempo y dinero mucho mayor a futuro</strong> para recuperar la capacidad de masticar. 
            </p>
            <p className="text-lg text-dkv-gray font-fsme leading-relaxed mt-4">
              La odontología conservadora moderna ofrece un abanico de soluciones diseñadas para frenar la enfermedad en cualquier estadio, preservando siempre la estructura de su diente natural.
            </p>
          </div>
        </section>

        {/* CUERPO DE CONTENIDO SIN RUIDO COGNITIVO */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            
            {/* --- CONTENIDO DETALLADO --- */}

            {/* NIVEL 1 */}
            <LevelTitle 
              id="nivel-1"
              number="Nivel 1" 
              title="El nervio sobrevive" 
              description="La caries hace acto de presencia, pero el nervio aún no está afectado o su inflamación es reversible. El objetivo prioritario es restaurar la anatomía evitando la endodoncia."
            />
            
            <TreatmentRow id="empaste" name="Obturación (empaste) con o sin recubrimiento pulpar" price="29€">
              <p><strong>El problema:</strong> Pérdida de tejido dental de leve a moderada.</p>
              <p><strong>Diferencia clínica:</strong> Si la caries es moderada, se realiza directamente sobre el tejido sano. Si la caries roza el nervio, se realiza con <em>recubrimiento pulpar</em> (capa de medicamento aislante). Ambos procedimientos cuestan lo mismo porque el objetivo de la cita es idéntico.</p>
              <p className="flex items-center gap-2 text-dkv-green-dark font-bold mt-2"><CheckCircle2 className="w-4 h-4 text-dkv-green" /> Detiene el avance bacteriano y devuelve la función al diente.</p>
            </TreatmentRow>

            <TreatmentRow id="bioactivo" name="Sustitutivo dentinario bioactivo" price="70€">
              <p><strong>El problema:</strong> La lesión es extrema y queda a escasas micras de exponer el nervio, pero este aún está vital.</p>
              <p><strong>En qué consiste:</strong> Base cavitaria de biocerámica. Libera minerales que calman el nervio y estimulan su regeneración.</p>
              <div className="mt-3 p-3 bg-dkv-gray-light border-l-2 border-dkv-green text-sm italic rounded-r-lg">
                <strong>Importante:</strong> Actúa solo como escudo interno. La cavidad exterior siempre se sella con el empaste definitivo (composite) para aportar dureza.
              </div>
            </TreatmentRow>

            <TreatmentRow id="reconstruccion" name="Gran reconstrucción" price="40€">
              <p><strong>El problema:</strong> El diente ha perdido una porción enorme de su corona, pero el nervio sigue intacto y sano.</p>
              <p>Esculpimos el diente devolviéndole su tamaño, cúspides y puntos de contacto originales con resinas de alta resistencia. Incluye recubrimiento pulpar si es necesario.</p>
            </TreatmentRow>

            {/* NIVEL 2 */}
            <LevelTitle 
              id="nivel-2"
              number="Nivel 2" 
              title="Dolor agudo e intolerable (Urgencia)" 
              description="El daño bacteriano o traumático ya ha alcanzado la pulpa, generando una inflamación severa dentro del diente que causa un dolor punzante y constante."
            />

            <TreatmentRow id="urgencia" name="Pulpectomía de urgencias" price="30€">
              <p><strong>El problema:</strong> Dolor agudo que requiere alivio drástico e inmediato.</p>
              <p>Bajo anestesia local, se extirpa la porción del nervio inflamado. El precio incluye la medicación calmante/desinfectante dentro de los conductos y el sellado temporal.</p>
              <div className="mt-3 flex items-start gap-2 text-sm">
                <Info className="w-4 h-4 text-dkv-green shrink-0 mt-0.5" />
                <span>Tarifa plana de urgencia sin importar si el diente tiene una o tres raíces.</span>
              </div>
            </TreatmentRow>

            {/* NIVEL 3 */}
            <LevelTitle 
              id="nivel-3"
              number="Nivel 3" 
              title="Infección total y pérdida crítica" 
              description="El tejido interno está irreversiblemente dañado o infectado, y el diente ha quedado estructuralmente debilitado."
            />

            <TreatmentRow id="endodoncia" name="Endodoncia Completa" price="Según raíces">
              <p>Se extrae todo el tejido enfermo hasta la punta de las raíces, se limpian los conductos y se sellan tridimensionalmente para aislar el medio interno.</p>
            </TreatmentRow>

            {/* NIVELES 4 Y 5 */}
            <LevelTitle 
              id="nivel-4"
              number="Niveles 4 y 5" 
              title="Casos Complejos y Cirugía" 
              description="Fracasos de tratamientos anteriores, raíces inmaduras o lesiones crónicas instaladas directamente en el hueso."
            />

            <TreatmentRow id="reendodoncia" name="Reendodoncia (1, 2 o 3 conductos)" price="130€">
              <p>Desmontar la restauración, retirar el material antiguo contaminado, volver a desinfectar exhaustivamente el sistema de conductos y sellarlo de nuevo.</p>
            </TreatmentRow>

            <TreatmentRow id="apicoformacion" name="Apicoformación" price="54€">
              <p>Utilización de materiales biocerámicos especiales para crear una barrera artificial dura en la punta de una raíz "abierta" (inmadura).</p>
              <p className="text-sm italic text-dkv-gray/80">Precio por sesión clínica.</p>
            </TreatmentRow>

            <TreatmentRow id="cirugia" name="Apicectomía o Cirugía Periapical" price="38€">
              <p>Acceso quirúrgico directo al hueso para extirpar la punta de la raíz infectada y sellar desde fuera un quiste que no responde a la endodoncia convencional.</p>
            </TreatmentRow>

            <TreatmentRow id="reimplante" name="Reimplante de pieza dental" price="Incluido">
              <p>Reposicionamiento de urgencia de un diente que ha salido expulsado completamente tras un impacto severo.</p>
            </TreatmentRow>

            {/* ADVERTENCIA CLÍNICA Y CIERRE */}
            <div className="mt-16 bg-dkv-gray-light p-6 md:p-8 rounded-xl border border-dkv-gray-border font-fsme text-dkv-gray">
              <h4 className="font-bold text-dkv-green-dark mb-3 uppercase tracking-wide font-lemon text-sm">El factor de adaptación</h4>
              <p className="text-sm md:text-base leading-relaxed">
                Es fundamental mantener expectativas realistas. Después de intervenciones profundas como una endodoncia, reendodoncia o cirugía periapical, es normal experimentar inflamación local, sensibilidad o molestias al masticar durante los primeros 3 a 7 días. Durante las primeras semanas, y estrictamente hasta que su diente reciba la reconstrucción o corona definitiva, <strong>deberá evitar masticar alimentos duros por ese lado</strong> para proteger la estructura en su fase más vulnerable.
              </p>
            </div>

            <div className="mt-20 p-8 md:p-12 rounded-3xl bg-dkv-green-dark text-white text-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-dkv-green opacity-20 blur-3xl rounded-full"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-dkv-green opacity-20 blur-3xl rounded-full"></div>
              <AlertCircle className="w-12 h-12 mx-auto mb-6 text-dkv-green" />
              <p className="text-xl md:text-2xl font-medium leading-relaxed italic font-fsme max-w-3xl mx-auto relative z-10">
                "Agotar las opciones clínicas y restauradoras para preservar su dentadura natural siempre será la alternativa biológica, estética y económicamente más inteligente frente a la extracción y los implantes."
              </p>
            </div>

          </div>
        </section>

        {/* CTA FORMULARIO */}
        <section className="py-20 bg-dkv-gray-border border-y border-dkv-gray/10">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-lemon text-dkv-green-dark mb-4">Planifique su tratamiento</h2>
                <p className="text-lg text-dkv-gray mb-6">
                  Le invitamos a solicitar una cita de valoración gratuita en nuestra clínica para estudiar su caso y ofrecerle el plan exacto que requiere para salvar su diente.
                </p>
              </div>
              <div className="relative">
                 <LeadForm />
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* AQUÍ ESTÁ LA MAGIA: Inyectamos el componente interactivo flotante */}
      <GodLevelTOC tocData={tocData} />

      <FooterLegal />
    </div>
  );
}