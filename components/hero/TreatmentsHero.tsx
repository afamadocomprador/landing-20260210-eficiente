import React from "react";
import Image from "next/image";

interface TreatmentsHeroProps {
  badgeText?: string;
  title: { dark: string; normal: string; };
  description: string[]; // Usamos un array de strings para evitar conflictos en el servidor
  image?: { src: string; alt: string; };
}

// ⚡️ Aseguramos el export default
export default function TreatmentsHero({ 
  badgeText = "Guía de Tratamientos y Presupuestos", 
  title, 
  description, 
  image 
}: TreatmentsHeroProps) {
  
  return (
    <section className="bg-white pt-0 pb-12 md:pt-16 md:pb-24 border-b border-dkv-gray-border relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        
        <div className={`mx-auto ${image ? 'max-w-6xl grid lg:grid-cols-2 gap-12 lg:gap-8 items-center' : 'max-w-4xl'}`}>
          
          <div className="relative pl-8 md:pl-10 pb-8 pr-4 mt-4 md:mt-0">
            
            {/* Elemento Decorativo Nivel Dios */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none" aria-hidden="true">
              <div className="absolute top-1 left-0 w-4 h-4 bg-white border-2 border-dkv-green-dark rounded-full z-20"></div>
              <div className="absolute top-3 left-[7px] right-[7px] h-[calc(100%-15px)] border-l-2 border-b-2 border-dkv-green-dark rounded-bl-[30px] z-10">
                <div className="absolute -right-[9px] -bottom-[9px] w-4 h-4 bg-white border-2 border-dkv-green-dark rounded-full z-20"></div>
              </div>
            </div>

            <div className="relative z-20 space-y-5 pt-1">
              {badgeText && (
                <div>
                  <span className="inline-block py-1 px-3 bg-dkv-green/10 text-dkv-green-dark font-bold text-xs uppercase tracking-wider rounded-full mb-2">
                    {badgeText}
                  </span>
                </div>
              )}

              <h1 className="font-lemon text-4xl md:text-5xl lg:text-6xl text-dkv-green-dark leading-tight text-left">
                 {title.dark} <br />
                 <span className="text-dkv-green">{title.normal}</span>
              </h1>
              
              <div className="font-fsme text-gray-700 text-lg md:text-xl leading-relaxed text-left space-y-4 max-w-2xl">
                {description.map((paragraph, index) => (
                  <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
                ))}
              </div>
            </div>
          </div>

          {/* Imagen Opcional */}
          {image && (
            <div className="relative w-full h-[300px] md:h-[400px] lg:h-[450px] rounded-3xl overflow-hidden shadow-xl border border-dkv-gray-border/50 animate-fade-in-up">
              <Image 
                src={image.src} 
                alt={image.alt} 
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority 
              />
            </div>
          )}
          
        </div>
      </div>
    </section>
  );
}