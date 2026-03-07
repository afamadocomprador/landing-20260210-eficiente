import { Metadata } from "next";
import React from "react";

// Componentes reales extraídos de tu proyecto
import Header from "@/components/layout/Header";
import FooterLegal from "@/components/FooterLegal";
import CookieBanner from "@/components/CookieBanner";
import FixedBreadcrumb from "@/components/layout/FixedBreadcrumb";
import LeadForm from "@/components/LeadForm";
import { CheckCircle2, AlertCircle, Info, Stethoscope, ArrowRight } from "lucide-react"; // Añadido ArrowRight para el botón

// Importamos nuestro Índice Nivel Dios
import { GodLevelTOC } from "@/components/ui/GodLevelTOC"; 

import TreatmentsHero from "@/components/hero/TreatmentsHero";

export const metadata: Metadata = {
  title: "Salvando piezas - Odontología conservadora | DKV Dentisalud",
  description: "Guía de tratamientos conservadores para preservar tu dentadura natural: empastes, endodoncias y reconstrucciones con precios cerrados.",
};




// --- DATA ESTRUCTURADA PARA EL ÍNDICE (REGENERADA Y CORREGIDA) ---
// --- DATA ESTRUCTURADA PARA EL ÍNDICE (CON 3 NIVELES DE ANIDACIÓN) ---
const tocData = [
  {
    level: { id: "nivel-1", number: "Nivel 1", title: "Salvando el nervio" },
    treatments: [
      { id: "empaste", name: "Obturación (empaste)", price: "29 €" },
      { id: "reconstruccion", name: "Gran reconstrucción", price: "40 €" },
      { id: "bioactivo", name: "Sustitutivo dentinario bioactivo", price: "70 €" }
    ]
  },
  {
    level: { id: "nivel-2", number: "Nivel 2", title: "Infección y dolor intolerable" },
    treatments: [
      { 
        id: "urgencia", 
        name: "Pulpectomía de urgencias", 
        price: "30 €" 
      },
      { 
        id: "endodoncia", 
        name: "Endodoncia Completa",
        subTreatments: [
          { id: "endodoncia", name: "Endodoncia de un conducto", price: "80 €" },
          { id: "endodoncia", name: "Endodoncia de dos conductos", price: "94 €" },
          { id: "endodoncia", name: "Endodoncia multirradicular", price: "123 €" },
          { id: "endodoncia", name: "Suplemento Rotatorio", price: "15 €" }
        ]
      }
    ]
  },
  {
    level: { id: "nivel-3", number: "Nivel 3", title: "Fracaso de tratto. anterior" },
    treatments: [
      { id: "reendodoncia", name: "Reendodoncia", price: "130 €" },
      { id: "apicoformacion", name: "Apicoformación", price: "54 €" }
    ]
  },
  {
    level: { id: "nivel-4", number: "Nivel 4", title: "Infección supera a la raíz" },
    treatments: [
      { id: "reendodoncia", name: "Reendodoncia", price: "130 €" },
      { id: "apicoformacion", name: "Apicoformación", price: "54 €" },
      { id: "cirugia", name: "Apicectomía", price: "38 €" },
      { id: "reimplante", name: "Reimplante dental", price: "Incluido" }
    ]
  }
];



// --- Componentes de UI ---

const TreatmentRow = ({ id, name, price, titleTag = "h2", children }: { id: string, name: string, price?: string, titleTag?: "h2" | "p" | "h3", children: React.ReactNode }) => {
  const Tag = titleTag; 

  return (
    <div id={id} className="py-6 md:py-8 border-b border-dkv-gray-border last:border-0 group scroll-mt-[130px] md:scroll-mt-[150px]">
      <Tag className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-1 md:gap-2 mb-3 md:mb-4 text-base md:text-lg font-bold font-lemon text-dkv-green-dark leading-snug uppercase group-hover:text-dkv-green transition-colors">
        <span className="pr-4">{name}</span>
        {price && (
          <span className="flex items-center gap-2 shrink-0 text-xl md:text-2xl font-lemon font-bold text-dkv-green normal-case mt-1 md:mt-0">
            {price}
          </span>
        )}
      </Tag>
      
      <div className="text-dkv-gray font-fsme leading-relaxed text-sm md:text-base space-y-3">
        {children}
      </div>
    </div>
  );
};

const LevelTitle = ({ id, number, title, description }: { id: string, number: string, title: string, description?: string }) => (
  <div id={id} className="mt-16 mb-8 scroll-mt-[130px] md:scroll-mt-[150px]">
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
    <div className="min-h-screen bg-white font-fsme text-dkv-gray selection:bg-dkv-green selection:text-white pb-32">
      <CookieBanner />
      <Header />

      <main className="pt-[30px] md:pt-[110px] lg:pt-[130px]">
        <FixedBreadcrumb items={breadcrumbs} />

        <TreatmentsHero 
          badgeText="Guía de Tratamientos y Presupuestos"
          title={{ dark: "SALVANDO PIEZAS", normal: "ODONTOLOGÍA CONSERVADORA" }}
          description={[
            "Tratar de salvar tu diente natural siempre será la alternativa económica, estética y biológica más inteligente.",
          ]}
        />

        <section className="bg-dkv-gray-border/30">
          <div className="container mx-auto px-4 max-w-4xl flow-root">
            
            {/* ⚡️ ELIMINADO EL CARTEL DE AVISO SUPERIOR PARA LIMPIAR EL DISEÑO */}

            {/* NIVEL 1 */}
            <LevelTitle 
              id="nivel-1"
              number="Nivel 1" 
              title="Salvando el nervio" 
              description="Aparece la caries, pero el nervio aún no está afectado o su inflamación es reversible. El objetivo prioritario es restaurar la anatomía evitando la endodoncia."
            />
            
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-dkv-gray-border/50">
              <TreatmentRow id="empaste" name="Obturación (empaste) con o sin recubrimiento pulpar" price="29 €">
                <p><strong>El problema:</strong> Pérdida de tejido dental leve.</p>
                <p><strong>Diferencia clínica:</strong> Si la caries es moderada, se coloca la resina directamente sobre el tejido sano. Si la caries roza el nervio, se aplica primero <em>recubrimiento pulpar</em> (capa de medicamento aislante y protector) antes del empaste definitivo.</p>
                <p className="flex items-center gap-2 text-dkv-green-dark font-bold mt-2"><CheckCircle2 className="w-4 h-4 text-dkv-green" /> Detiene el avance bacteriano y devuelve la función al diente.</p>
              </TreatmentRow>

              <TreatmentRow id="reconstruccion" name="Gran reconstrucción" price="40 €">
                <p><strong>El problema:</strong> El diente ha perdido una porción importante de su corona, pero el nervio sigue intacto y sano.</p>
                <p><strong>Tratamiento: </strong>Se esculpe el diente devolviéndole su tamaño, cúspides y puntos de contacto originales con resinas de alta resistencia.</p>
              </TreatmentRow>

              <TreatmentRow id="bioactivo" name="Sustitutivo dentinario bioactivo" price="70 €">
                <p><strong>El problema:</strong> La lesión es extrema y queda a escasas micras de exponer el nervio, pero este aún está vital.</p>
                <p><strong>En qué consiste: </strong> Uso de materiales de vanguardia llamados biocerámicas. Son bioactivas y promueven regeneración de la dentina interior.</p>
                <div className="mt-3 p-3 bg-dkv-gray-light border-l-2 border-dkv-green text-sm italic rounded-r-lg">
                  <strong>Importante:</strong> Actúa solo como escudo interno. La cavidad exterior siempre se sella con el empaste definitivo (composite) para aportar dureza.
                </div>
              </TreatmentRow>
            </div>

            {/* NIVEL 2 */}
            <LevelTitle 
              id="nivel-2"
              number="Nivel 2" 
              title="Infección y dolor intolerable" 
              description="El daño ha alcanzado la pulpa, generando una inflamación severa dentro del diente que causa un dolor punzante y constante. El tejido interno está irreversiblemente dañado o infectado."
            />
            
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-dkv-gray-border/50">
              <TreatmentRow id="urgencia" name="Pulpectomía de urgencias" price="30 €">
                <p><strong>El problema:</strong> Dolor agudo que requiere alivio drástico e inmediato.</p>
                <p><strong>Tratamiento: </strong>Bajo anestesia local, se extirpa la porción del nervio inflamado, se aplica medicacion calmante/desinfectante dentro de los conductos y se sellan temporalmente.</p>
                <div className="mt-3 flex items-start gap-2 text-sm">
                  <Info className="w-4 h-4 text-dkv-green shrink-0 mt-0.5" />
                  <span>Medida de urgencia previa a endodoncia completa.</span>
                </div>
              </TreatmentRow>
            </div>

            {/* AQUÍ ESTABA LA CAJA DEL NIVEL 3 EN TUS CÓDIGOS ANTERIORES. RESPETAMOS TU VERSIÓN ACTUAL Y NO LO AÑADIMOS. */}
            
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-dkv-gray-border/50">
              <TreatmentRow id="endodoncia" name="Endodoncia Completa" titleTag="p">
                <p className="mb-6">
                  Se vacían todos los conductos radiculares del diente, se rellenan de un material especial y se sellan.
                </p>

                <div className="bg-dkv-gray-light/30 rounded-2xl p-5 md:p-6 border border-dkv-gray-border">
                  <ul className="space-y-5">
                    <li className="pb-4 border-b border-dkv-gray-border/50">
                      <h2 className="flex flex-row justify-between items-start gap-4 mb-1.5">
                        <span className="font-bold text-dkv-gray text-base md:text-lg leading-tight">Endodoncia de un conducto</span>
                        <span className="font-lemon text-lg md:text-xl text-dkv-green-dark font-bold shrink-0 mt-0.5">80 €</span>
                      </h2>
                      <p className="text-sm md:text-base text-dkv-gray/80 italic pr-12">Dientes con 1 solo conducto (ej. incisivos)</p>
                    </li>
                    <li className="pb-4 border-b border-dkv-gray-border/50">
                      <h2 className="flex flex-row justify-between items-start gap-4 mb-1.5">
                        <span className="font-bold text-dkv-gray text-base md:text-lg leading-tight">Endodoncia de dos conductos</span>
                        <span className="font-lemon text-lg md:text-xl text-dkv-green-dark font-bold shrink-0 mt-0.5">94 €</span>
                      </h2>
                      <p className="text-sm md:text-base text-dkv-gray/80 italic pr-12">Dientes con 2 conductos (ej. premolares)</p>
                    </li>
                    <li>
                      <h2 className="flex flex-row justify-between items-start gap-4 mb-1.5">
                        <span className="font-bold text-dkv-gray text-base md:text-lg leading-tight">Endodoncia Multirradicular</span>
                        <span className="font-lemon text-lg md:text-xl text-dkv-green-dark font-bold shrink-0 mt-0.5">123 €</span>
                      </h2>
                      <p className="text-sm md:text-base text-dkv-gray/80 italic pr-12">Dientes con 3 o más conductos (ej. molares)</p>
                    </li>
                  </ul>
                  
                  <div className="mt-6 pt-5 border-t-2 border-dkv-gray-border">
                    <div className="bg-white p-4 md:p-5 rounded-xl shadow-sm border border-dkv-gray-border/50">
                      <h2 className="flex flex-row justify-between items-start gap-4 mb-2">
                        <span className="flex items-start gap-2 font-bold text-dkv-green-dark text-base md:text-lg leading-tight">
                          <Stethoscope className="w-5 h-5 text-dkv-green shrink-0 mt-0.5" />
                          <span>Suplemento Instrumentación Rotatoria</span>
                        </span>
                        <span className="font-lemon text-lg md:text-xl text-dkv-green font-bold shrink-0 mt-0.5">15 €</span>
                      </h2>
                      <p className="text-sm md:text-base text-dkv-gray leading-relaxed pl-7">Uso de tecnología mecanizada para una limpieza de los conductos extremadamente precisa y rápida.</p>
                    </div>
                  </div>
                </div>
              </TreatmentRow>
            </div>

            {/* NIVEL 3*/}
            <LevelTitle 
              id="nivel-3"
              number="Nivel 3" 
              title="Fracaso tratamiento anterior o anatomía inmadura" 
              description="Fracasos de tratamientos anteriores o raíces inmaduras sin cerrar"
            />
            
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-dkv-gray-border/50">
              <TreatmentRow id="reendodoncia" name="Reendodoncia (1, 2 o 3 conductos)" price="130 €">
                <p>Desmontar la restauración, retirar el material antiguo contaminado, volver a desinfectar exhaustivamente el sistema de conductos y sellarlo de nuevo.</p>
              </TreatmentRow>

              <TreatmentRow id="apicoformacion" name="Apicoformación" price="54 €">
                <p>Utilización de materiales biocerámicos especiales para crear una barrera artificial dura en la punta de una raíz "abierta" (inmadura).</p>
                <p className="text-sm italic text-dkv-gray/80">Precio por sesión clínica.</p>
              </TreatmentRow>

            </div>


            {/* NIVEL 4*/}
            <LevelTitle 
              id="nivel-4"
              number="Nivel 4" 
              title="Infección supera a la raíz" 
              description="Infección enquistada en el hueso y traumatismos severos."
            />
            
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-dkv-gray-border/50">

              <TreatmentRow id="cirugia" name="Apicectomía o Cirugía Periapical" price="38 €">
                <p>Acceso quirúrgico directo al hueso para extirpar la punta de la raíz infectada y sellar desde fuera un quiste que no responde a la endodoncia convencional.</p>
              </TreatmentRow>

              <TreatmentRow id="reimplante" name="Reimplante de pieza dental" price="Incluido">
                <p>Reposicionamiento de urgencia de un diente que ha salido expulsado completamente tras un impacto severo.</p>
              </TreatmentRow>
            </div>


            {/* ADVERTENCIA CLÍNICA Y CIERRE */}
            <div className="mt-16 bg-dkv-gray-light p-6 md:p-8 rounded-xl border border-dkv-gray-border font-fsme text-dkv-gray">
              <h3 className="font-bold text-dkv-green-dark mb-3 uppercase tracking-wide font-lemon text-sm">El factor de adaptación</h3>
              <p className="text-sm md:text-base leading-relaxed">
                Es fundamental mantener expectativas realistas. Después de intervenciones profundas como una endodoncia, reendodoncia o cirugía periapical, es normal experimentar inflamación local, sensibilidad o molestias al masticar durante los primeros 3 a 7 días. Durante las primeras semanas, y estrictamente hasta que su diente reciba la reconstrucción o corona definitiva, <strong>deberá evitar masticar alimentos duros por ese lado</strong> para proteger la estructura en su fase más vulnerable.
              </p>
            </div>

            <div className="mt-20 p-8 md:p-12 mb-12 rounded-3xl bg-dkv-green-dark text-white text-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-dkv-green opacity-20 blur-3xl rounded-full"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-dkv-green opacity-20 blur-3xl rounded-full"></div>
              <AlertCircle className="w-12 h-12 mx-auto mb-6 text-dkv-green" />
              <p className="text-xl md:text-2xl font-medium leading-relaxed italic font-fsme max-w-3xl mx-auto relative z-10">
                "Agotar las opciones clínicas y restauradoras para preservar su dentadura natural siempre será la alternativa biológica, estética y económicamente más inteligente frente a la extracción y los implantes."
              </p>
            </div>

          </div>
        </section>

        {/* ⚡️ NUEVA SECCIÓN DE CTA (FUSIONADA CON AVISO MÉDICO + BOTÓN) */}
        <section className="py-20 bg-white border-t border-dkv-gray-border">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Columna de Texto y Botón */}
              <div>
                <h2 className="text-3xl font-lemon text-dkv-green-dark mb-4">Planifique su tratamiento</h2>
                <p className="text-lg text-dkv-gray mb-6">
                  Le invitamos a solicitar una cita de valoración gratuita en nuestra clínica para estudiar su caso y ofrecerle el plan exacto que requiere para salvar su diente.
                </p>

                {/* Caja de Aviso Médico Integrada */}
                <div className="bg-dkv-gray-light p-4 rounded-xl border border-dkv-gray-border/50 mb-8 flex items-start gap-3">
                  <Info className="w-5 h-5 text-dkv-green shrink-0 mt-0.5" />
                  <p className="text-sm text-dkv-gray font-fsme leading-relaxed">
                    Esta información tiene un carácter meramente informativo. El diagnóstico médico exacto solo te lo puede proporcionar el dentista en clínica.
                  </p>
                </div>

                {/* Botón de Acción Principal */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="/cuadro-medico" 
                    className="inline-flex items-center justify-center bg-dkv-green text-white font-bold font-fsme py-3.5 px-8 rounded-full hover:bg-dkv-green-dark transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Buscar dentista
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </div>
              </div>

              {/* Columna del Formulario */}
              <div className="relative">
                 <LeadForm />
              </div>
              
            </div>
          </div>
        </section>

      </main>

      <GodLevelTOC tocData={tocData} />

      <FooterLegal />
    </div>
  );
}