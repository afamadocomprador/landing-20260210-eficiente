// app/contacto/page.tsx

// app/contacto/page.tsx

"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Loader2, Phone } from "lucide-react";
import { usePostHog } from 'posthog-js/react';

// --- SERVICIOS Y COMPONENTES ANALÍTICOS ---
import { getCustomerServicePhone } from '@/lib/services/config';
import TrackedPhoneLink from '@/components/posthog/TrackedPhoneLink';

export default function ContactPage() {
  const posthog = usePostHog();
  const pathname = usePathname();
  
  const formStartedRef = useRef(false);

  const [formData, setFormData] = useState({ nombre: '', telefono: '', email: '', cp: '', mensaje: '', consent: false });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [customerPhone, setCustomerPhone] = useState("+34 976 217 463"); 

  useEffect(() => {
    async function fetchPhone() {
      try {
        const phone = await getCustomerServicePhone();
        setCustomerPhone(phone);
      } catch (error) {
        console.warn("No se pudo cargar el teléfono del servidor.");
      }
    }
    fetchPhone();
  }, []);

  const displayPhone = customerPhone
    .replace(/^\+34\s?/, '') 
    .replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3') 
    .trim();

  const handleFormStart = () => {
    if (!formStartedRef.current && posthog) {
      posthog.capture('formulario_iniciado', {
        origen: pathname,
        tipo_vista: 'pagina_completa'
      });
      formStartedRef.current = true;
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('loading');

    try {
      const response = await fetch('/api/lead-notification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: formData.nombre,
          telefono: formData.telefono,
          email: formData.email,
          cp: formData.cp,
          mensaje: formData.mensaje,
          consentCommercial: formData.consent,
          leadId: `WEB-DIRECT-${Math.floor(Math.random() * 10000)}`
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        if (posthog) {
          posthog.capture('formulario_enviado', { origen: pathname, tipo_vista: 'pagina_completa' });
        }
      } else {
        if (posthog) {
          posthog.capture('formulario_error', { origen: pathname, tipo_vista: 'pagina_completa', mensaje_error: 'Respuesta no exitosa API' });
        }
        throw new Error('Fallo en la respuesta del servidor');
      }
    } catch (error) {
      setSubmitStatus('error');
      if (posthog) {
        posthog.capture('formulario_error', { origen: pathname, tipo_vista: 'pagina_completa', mensaje_error: error instanceof Error ? error.message : 'Error de red' });
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-110px)] bg-[#F0F0F0] py-4 md:py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
        
        {/* PANEL IZQUIERDO: Información */}
        {/* 🚀 justify-start en móvil para quitar el centrado vertical que creaba espacio vacío arriba, y pt-6 para acercarlo al borde */}
        <div className="bg-dkv-green-dark px-6 pt-6 pb-8 md:p-10 lg:p-16 lg:w-2/5 text-white flex flex-col justify-start md:justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-10 translate-x-10 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10">
            {/* 🚀 mb-1 y leading-none para que el título se pegue totalmente al párrafo inferior */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-lemon uppercase tracking-wide mb-1 md:mb-6 leading-none mt-0">
              Atención al Usuario
            </h1>
            <p className="font-fsme text-base md:text-lg lg:text-xl text-white/80 mb-6 md:mb-10 leading-relaxed mt-2">
              <span className="font-bold text-white">HABLA con un agente exclusivo</span> para resolver cualquier duda sobre coberturas, precios pactados o tratamientos.
            </p>

            <div className="space-y-6 md:space-y-8 font-fsme text-white/90">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-white/60 mb-1">Llámanos directamente</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <TrackedPhoneLink 
                       phone={customerPhone} 
                       seccion="Pagina Contacto" 
                       className="font-bold text-2xl hover:text-white/80 transition-colors block leading-none"
                    >
                       {displayPhone}
                    </TrackedPhoneLink>
                  </div>
                </div>
              </div>
              
              {/* 🚀 BLOQUE RESTAURADO: Solo la frase que querías mantener, sin icono ni florituras */}
              <div>
                <p className="font-bold text-lg leading-tight">Atención para toda España</p>
              </div>

            </div>
          </div>
        </div>

        {/* PANEL DERECHO: Formulario */}
        <div className="px-6 py-8 md:p-10 lg:p-16 lg:w-3/5 bg-white">
          <h2 className="text-2xl font-lemon text-dkv-green-dark uppercase tracking-tight mb-2">
            Envíanos tu consulta
          </h2>
          <p className="text-gray-500 text-sm md:text-base font-fsme mb-6 md:mb-8">
            Rellena el siguiente formulario y un agente exclusivo se pondrá en contacto contigo a la mayor brevedad.
          </p>

          {submitStatus === 'success' ? (
            <div className="bg-green-50 text-dkv-green-dark p-10 rounded-2xl text-center border border-green-100 animate-in fade-in zoom-in duration-300 h-full flex flex-col items-center justify-center min-h-[400px]">
              <span className="text-6xl mb-6 block">✅</span>
              <p className="font-bold text-2xl mb-3">¡Consulta enviada con éxito!</p>
              <p className="text-lg text-gray-600 font-fsme">
                Hemos recibido tu mensaje correctamente. Un agente exclusivo revisará tu solicitud y te contactará en breve.
              </p>
              <Link 
                href="/"
                className="mt-8 bg-dkv-green-dark text-white font-bold py-3 px-8 rounded-xl hover:bg-dkv-green transition-colors"
              >
                Volver a la página principal
              </Link>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="flex flex-col gap-4 md:gap-5">
              <div>
                <label className="block text-sm font-bold text-dkv-green-dark mb-1.5 font-fsme">Nombre completo *</label>
                <input required type="text" placeholder="Ej. María García" onFocus={handleFormStart} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 md:p-4 outline-none focus:bg-white focus:ring-2 focus:ring-dkv-green/50 transition-all font-fsme text-gray-800 text-base md:text-sm" value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                <div>
                  <label className="block text-sm font-bold text-dkv-green-dark mb-1.5 font-fsme">Teléfono *</label>
                  <input required type="tel" placeholder="Ej. 600 000 000" onFocus={handleFormStart} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 md:p-4 outline-none focus:bg-white focus:ring-2 focus:ring-dkv-green/50 transition-all font-fsme text-gray-800 text-base md:text-sm" value={formData.telefono} onChange={e => setFormData({...formData, telefono: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-dkv-green-dark mb-1.5 font-fsme">Correo electrónico *</label>
                  <input required type="email" placeholder="tucorreo@ejemplo.com" onFocus={handleFormStart} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 md:p-4 outline-none focus:bg-white focus:ring-2 focus:ring-dkv-green/50 transition-all font-fsme text-gray-800 text-base md:text-sm" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-dkv-green-dark mb-1.5 font-fsme">¿En qué podemos ayudarte? *</label>
                <textarea required placeholder="Escribe aquí tu duda, consulta sobre un tratamiento, código postal..." onFocus={handleFormStart} rows={4} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 md:p-4 outline-none focus:bg-white focus:ring-2 focus:ring-dkv-green/50 transition-all resize-none font-fsme text-gray-800 text-base md:text-sm" value={formData.mensaje} onChange={e => setFormData({...formData, mensaje: e.target.value})} />
              </div>
              
              <label className="flex items-start gap-3 text-sm text-gray-500 cursor-pointer mt-1 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <input required type="checkbox" onFocus={handleFormStart} className="mt-1 w-5 h-5 accent-dkv-green shrink-0 cursor-pointer" checked={formData.consent} onChange={e => setFormData({...formData, consent: e.target.checked})} />
                <span className="leading-relaxed">He leído y acepto la <Link href="/politica-privacidad" className="underline text-dkv-green hover:text-dkv-green-dark transition-colors">política de privacidad</Link> y consiento el tratamiento de mis datos para la gestión de mi consulta y el envío de información comercial.</span>
              </label>
              
              {submitStatus === 'error' && (
                <p className="text-red-500 text-sm font-bold text-center bg-red-50 py-3 rounded-lg border border-red-100 mt-2">❌ Ha ocurrido un error de conexión. Por favor, inténtalo de nuevo.</p>
              )}

              <button type="submit" disabled={submitStatus === 'loading'} className="w-full bg-dkv-green-dark text-white font-extrabold text-lg rounded-xl py-4 mt-2 md:mt-4 shadow-lg hover:shadow-xl hover:bg-dkv-green disabled:bg-gray-300 disabled:shadow-none transition-all flex justify-center items-center gap-2">
                {submitStatus === 'loading' ? <><Loader2 className="w-6 h-6 animate-spin" /> Procesando envío...</> : 'Enviar Consulta'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}