// app/tratamientos/apnea/page.tsx

import { Metadata } from "next";
import React from "react";
import Link from "next/link";

// Componentes de Layout y UI
import Header from "@/components/layout/Header";
import FooterLegal from "@/components/FooterLegal";
import CookieBanner from "@/components/CookieBanner";
import FixedBreadcrumb from "@/components/layout/FixedBreadcrumb";
import TreatmentsHero from "@/components/hero/TreatmentsHero";
import HeroSearch from '@/components/home/HeroSearch';
import ScrollReveal from "@/components/ui/ScrollReveal";
import ShareButton from "@/components/ui/ShareButton";

import { Moon, ShieldCheck, Activity, Zap, CheckCircle2, Diamond, Info, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Tratamiento de Apnea del Sueño y Ronquido | DKV Dentisalud",
  description: "Dispositivos de Avance Mandibular (DAM) para tratar la apnea y el ronquido. Tecnología exclusiva en Centros Propios Especiales DKV.",
};

// --- Componente Ficha de Tratamiento Estándar (Idéntico a Arcada Completa) ---
const TreatmentRow = ({ id, name, price, image, imageAlt, secondaryImage, secondaryImageAlt, titleTag = "h2", children }: any) => {
  const Tag = titleTag; 
  return (
    <div id={id} className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-md border border-dkv-gray-border/80 hover:shadow-xl hover:border-dkv-green/40 hover:-translate-y-1 transition-all duration-300 group scroll-mt-[220px]">
      <Tag className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 md:gap-4 mb-5 text-lg md:text-xl font-bold font-lemon text-dkv-green-dark leading-snug uppercase">
        <span className="pr-4 mt-1">{name}</span>
        <span className="flex items-center gap-3 self-end md:self-auto mt-2 md:mt-0">
          {price && (
            <span className="inline-flex items-center justify-center bg-dkv-green/10 px-4 py-1.5 rounded-full shrink-0 text-2xl font-lemon font-bold text-dkv-green normal-case">
              {price}
            </span>
          )}
          <ShareButton id={id} title={name} />
        </span>
      </Tag>

      {image && (
        <div className="mb-6 w-full overflow-hidden rounded-xl border border-gray-100 flex items-center justify-center bg-gray-50/50 py-4">
          <img src={image} alt={imageAlt || name} className="w-full h-auto object-contain max-h-[200px] md:max-h-[250px] transition-transform duration-700 group-hover:scale-105" loading="lazy" />
        </div>
      )}
      
      <div className="text-dkv-gray font-fsme leading-relaxed text-lg md:text-lg space-y-4">
        {children}
      </div>

      {secondaryImage && (
        <div className="mt-8 w-full overflow-hidden rounded-xl border border-gray-100 flex items-center justify-center bg-gray-50/30 py-4">
          <img src={secondaryImage} alt={secondaryImageAlt || `${name} - detalle`} className="w-full h-auto object-contain max-h-[140px] md:max-h-[180px] transition-transform duration-700 group-hover:scale-105" loading="lazy" />
        </div>
      )}
    </div>
  );
};

export default function ApneaSueñoPage() {
  const breadcrumbs = [
    { label: "Inicio", href: "/" },
    { label: "Tratamientos", href: "/tratamientos" },
    { label: "Medicina del Sueño", href: "#" }
  ];

  return (
    <div className="min-h-screen bg-white font-fsme text-dkv-gray selection:bg-dkv-green selection:text-white pb-32">
      <CookieBanner />
      <Header />

      <main className="pt-[30px] md:pt-[110px] lg:pt-[130px]">
        <FixedBreadcrumb items={breadcrumbs} behavior="smart" />

        <TreatmentsHero 
          badgeText="Medicina Dental del Sueño"
          title={{ dark: "RONQUIDO Y", normal: "APNEA (SAHS)" }} 
          description={[
            "Roncar no es solo un ruido molesto; puede ser el síntoma de una patología grave que pone en riesgo tu corazón.",
            "En nuestros centros propios especialistas, tratamos la apnea mediante Dispositivos de Avance Mandibular (DAM), una alternativa cómoda y eficaz a las máquinas CPAP."
          ]}
        />

        <section className="bg-dkv-gray-border/30 pt-12 pb-20">
          <div className="container mx-auto px-4 max-w-4xl flow-root">
            <div className="space-y-8">
              
              {/* 🏆 BLOQUE EXCLUSIVIDAD (Con el estilo exacto de Arcada Completa Fija) */}
              <ScrollReveal delay={100} direction="up">
                <div id="servicio-exclusivo" className="bg-gradient-to-br from-dkv-green-dark to-[#022A27] rounded-2xl md:rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden mt-4 mb-12 scroll-mt-[220px] text-white">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 blur-[100px] rounded-full"></div>
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#D4AF37] opacity-10 blur-[80px] rounded-full"></div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <Diamond className="w-8 h-8 text-[#D4AF37]" />
                      <span className="text-[#D4AF37] font-bold text-sm md:text-base uppercase tracking-[0.2em] font-fsme">Servicio de Alta Especialización</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-lemon mb-6 uppercase tracking-wide">
                      Exclusivo en Centros Propios Especiales
                    </h2>
                    <p className="font-fsme text-lg mb-6 text-white/90 leading-relaxed">
                      Este tratamiento requiere tecnología de medición biomecánica y formación específica en medicina del sueño. Por ello, solo está disponible en nuestra red de <strong>Centros Propios Especiales DKV</strong>.
                    </p>

                    <div className="bg-white/10 rounded-2xl p-6 border border-white/20 backdrop-blur-sm mt-8">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="flex gap-4 items-start">
                          <Zap className="text-[#D4AF37] shrink-0 w-6 h-6" />
                          <p className="text-sm text-white/90 font-fsme">
                            <strong>Alternativa a la CPAP:</strong> Ideal para pacientes con apnea leve o moderada que no toleran la máscara de aire.
                          </p>
                        </div>
                        <div className="flex gap-4 items-start">
                          <Heart className="text-[#D4AF37] shrink-0 w-6 h-6" />
                          <p className="text-sm text-white/90 font-fsme">
                            <strong>Salud Cardiovascular:</strong> Reduce drásticamente el riesgo de hipertensión y accidentes cerebrovasculares.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* FICHAS CLÍNICAS (Estilo estándar DKV, sin dorados) */}
              <ScrollReveal delay={200} direction="up">
                <TreatmentRow id="estudio" name="Estudio Biomecánico y Radiología" price="75 €">
                  <p>No trabajamos "a ojo". Realizamos un montaje en articulador y pruebas radiológicas completas (Ortopantomografía y Telerradiografía) para medir cuánto podemos adelantar tu mandíbula de forma segura para tu articulación.</p>
                  
                  <div className="bg-dkv-gray-light/30 rounded-2xl p-5 border border-dkv-gray-border mt-4">
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <li className="flex items-center gap-2 font-bold text-dkv-gray"><CheckCircle2 className="w-5 h-5 text-dkv-green"/> Escaneado 3D de la mordida</li>
                      <li className="flex items-center gap-2 font-bold text-dkv-gray"><CheckCircle2 className="w-5 h-5 text-dkv-green"/> Análisis de vía aérea</li>
                      <li className="flex items-center gap-2 font-bold text-dkv-gray"><CheckCircle2 className="w-5 h-5 text-dkv-green"/> Montaje en articulador</li>
                      <li className="flex items-center gap-2 font-bold text-dkv-gray"><CheckCircle2 className="w-5 h-5 text-dkv-green"/> Estudio radiológico completo</li>
                    </ul>
                  </div>
                </TreatmentRow>
              </ScrollReveal>

              <ScrollReveal delay={300} direction="up">
                <TreatmentRow id="dam" name="Dispositivo de Avance Mandibular (DAM)" price="800 €">
                  <div className="flex items-center gap-2 mb-4">
                    <ShieldCheck className="w-5 h-5 text-dkv-green" />
                    <span className="text-dkv-green-dark font-bold text-sm uppercase tracking-wide">Tratamiento Definitivo - Garantía 2 años</span>
                  </div>
                  <p className="mb-6">
                    Fabricamos a medida tus férulas duales conectadas. El beneficio es inmediato: despeja la garganta, elimina el ronquido y permite un sueño reparador desde la primera noche.
                  </p>
                  <div className="bg-dkv-gray-light/50 p-4 rounded-xl border border-dkv-gray-border/50 text-dkv-gray-dark text-[17px] italic font-medium">
                    "Muchos pacientes asumen que roncar es 'normal'. Cuando descubren que un dispositivo dental puede devolverles la energía y proteger su corazón, les cambia la vida."
                  </div>
                </TreatmentRow>
              </ScrollReveal>

              <ScrollReveal delay={150} direction="up">
                <div className="grid md:grid-cols-2 gap-8 mt-8">
                  <div className="bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl border border-dkv-gray-border/80 shadow-md">
                    <h3 className="font-lemon text-dkv-green-dark mb-4 uppercase text-lg">Ajuste Anual</h3>
                    <p className="text-dkv-gray mb-6">Revisión periódica del avance y comodidad de tu musculatura.</p>
                    <div className="flex justify-end">
                      <span className="bg-dkv-green/10 px-4 py-1.5 rounded-full text-2xl font-lemon font-bold text-dkv-green">35 €</span>
                    </div>
                  </div>
                  <div className="bg-dkv-green/5 p-6 md:p-8 rounded-2xl md:rounded-3xl border border-dkv-green/20 shadow-md">
                    <h3 className="font-lemon text-dkv-green-dark mb-4 uppercase text-lg">Mantenimiento</h3>
                    <p className="text-dkv-gray mb-6">Reparación, rebase y adaptación a nuevos arreglos dentales.</p>
                    <div className="flex justify-end">
                      <span className="bg-dkv-green/10 px-4 py-1.5 rounded-full text-2xl font-lemon font-bold text-dkv-green">Incluido</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

            </div>
          </div>
        </section>

        {/* ⚡️ SECCIÓN DE CTA */}
        <section className="py-20 bg-white border-t border-dkv-gray-border">
          <div className="container mx-auto px-4 max-w-5xl">
            <ScrollReveal>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-lemon text-dkv-green-dark mb-4">Recupera tus mañanas</h2>
                  <div className="bg-dkv-gray-light p-4 rounded-xl border border-dkv-gray-border/50 mb-8 flex items-start gap-3">
                    <Info className="w-5 h-5 text-dkv-green shrink-0 mt-0.5" />
                    <p className="text-lg text-dkv-gray font-fsme leading-relaxed">
                      <strong>Nota clínica:</strong> Este tratamiento está indicado para ronquido simple y SAHS leve o moderado. En casos graves, el DAM puede ser un complemento excelente a otros tratamientos médicos.
                    </p>
                  </div>
                  <p className="text-lg text-dkv-gray mb-6">
                    Si te levantas cansado, con dolor de cabeza o tu pareja nota pausas en tu respiración, localiza tu Centro Propio DKV más cercano para un estudio del sueño:
                  </p>
                </div>
                
                <div className="w-full">
                  <HeroSearch />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

      </main>

      <FooterLegal />
    </div>
  );
}
