// components/FooterLegal.tsx
import React from 'react';
import Link from 'next/link';

const FooterLegal = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      {/* --- FRANJA SUPERIOR --- */}
      <div className="bg-dkv-gray text-white py-12 font-fsme">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 text-sm font-light">
  
             {/* Columna 1: Navegación Interna -> USAMOS <Link> */}
             <div>
               <h4 className="font-bold mb-6 text-lg uppercase tracking-wide font-lemon">DKV SEGUROS</h4>
               <ul className="space-y-3 opacity-90">
                 <li>
                   <Link href="/seguros-salud" className="hover:underline hover:text-white/80 transition-colors">
                     Seguros de Salud
                   </Link>
                 </li>
                 <li>
                   <Link href="/seguros-dentales" className="hover:underline hover:text-white/80 transition-colors">
                     Seguros Dentales
                   </Link>
                 </li>
                 <li>
                   <Link href="/cuadro-medico" className="hover:underline hover:text-white/80 transition-colors">
                     Cuadro Médico
                   </Link>
                 </li>
               </ul>
             </div>
  
             {/* Columna 2: Contacto -> MANTENEMOS <a> (Protocolos tel: y mailto:) */}
             <div>
               <h4 className="font-bold mb-6 text-lg uppercase tracking-wide font-lemon">ATENCIÓN AL CLIENTE</h4>
               <ul className="space-y-3 opacity-90">
                 <li>
                   Teléfono: <a href="tel:900000000" className="hover:underline font-bold">900 000 000</a>
                 </li>
                 <li>
                   Email: <a href="mailto:atencion@dkv.es" className="hover:underline">atencion@dkv.es</a>
                 </li>
               </ul>
             </div>

             {/* Columna 3: Información Estática */}
             <div>
               <h4 className="font-bold mb-6 text-lg uppercase tracking-wide font-lemon">AGENTE EXCLUSIVO</h4>
               <div className="flex items-start gap-4">
                  <div className="border border-white/30 px-3 py-1.5 rounded text-xs font-bold tracking-widest font-lemon">DKV</div>
                  <div>
                    <p className="font-bold text-base">Bernardo Sobrecasas Gallizo</p>
                    <p className="text-xs opacity-70 mt-1">Agente de Seguros Exclusivo</p>
                    <p className="text-xs opacity-70">Nº Registro DGSFP: C016125451380V</p>
                  </div>
               </div>
             </div>
          </div>
        </div>
      </div>

      {/* --- FRANJA INFERIOR --- */}
      <div className="bg-dkv-gray-border py-8 border-t border-dkv-gray/10 text-dkv-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* TEXTO LEGAL COMPLETO RESTAURADO */}
          <div className="text-[10px] leading-relaxed mb-6 text-justify md:text-left opacity-80 space-y-2 font-fsme">
            <p>
              <strong>INFORMACIÓN LEGAL:</strong> Esta web está gestionada por Bernardo Sobrecasas Gallizo, Agente de Seguros Exclusivo de DKV Seguros y Reaseguros S.A.E. Tiene concertado seguro de Responsabilidad Civil profesional conforme a la legislación vigente.
            </p>
            <p>
              <strong>ASEGURADORA:</strong> DKV Seguros y Reaseguros, S.A.E. (Sociedad Unipersonal). Inscrita en el R.M. de Zaragoza, tomo 1.711, folio 214, hoja Z-15.152. NIF A-50004209. Sede social: Torre DKV, Avda. María Zambrano 31, 50018 Zaragoza.
            </p>
            <p>
              <strong>PROTECCIÓN DE DATOS:</strong> Responsable: DKV Seguros. Finalidad: Gestión de la solicitud y comercialización. Derechos: Puede ejercitar sus derechos de acceso, rectificación, supresión y otros enviando un correo a bernardo.sobrecasas@segurosdkv.es.
            </p>
            <p>
              <strong>CONDICIONES:</strong> Las primas y coberturas están sujetas a las Condiciones Generales y Particulares de la póliza DKV Dentisalud Élite. Los tratamientos con coste 0€ se refieren a los servicios incluidos en la franquicia dental sin coste adicional. Los ahorros mostrados son estimaciones basadas en precios medios de mercado 2024.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-dkv-gray/10 pt-6">
            <p className="text-[11px] font-bold text-dkv-gray uppercase tracking-wider font-fsme">
              &copy; {currentYear} Bernardo Sobrecasas. Todos los derechos reservados.
            </p>
            
            {/* Navegación Legal -> USAMOS <Link> */}
            <div className="flex gap-6 text-[11px] font-bold text-dkv-gray font-fsme">
               <Link href="/aviso-legal" className="hover:text-dkv-green transition-colors">
                 Aviso Legal
               </Link>
               <Link href="/politica-privacidad" className="hover:text-dkv-green transition-colors">
                 Política de Privacidad
               </Link>
               <Link href="/politica-cookies" className="hover:text-dkv-green transition-colors">
                 Política de Cookies
               </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterLegal;