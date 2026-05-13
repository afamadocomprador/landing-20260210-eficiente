// app/@modal/(.)contacto/page.tsx
// app/@modal/(.)contacto/page.tsx


"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { X, Loader2, Phone } from "lucide-react";
import { usePostHog } from 'posthog-js/react';

// --- SERVICIOS Y COMPONENTES ANALÍTICOS ---
import { getCustomerServicePhone } from '@/lib/services/config';
import TrackedPhoneLink from '@/components/posthog/TrackedPhoneLink';

export default function ContactModalIntercepted() {
  const router = useRouter();
  const pathname = usePathname();
  const posthog = usePostHog();
  
  // Referencia para no duplicar el evento
  const formStartedRef = useRef(false);
  
  const [isAnimating, setIsAnimating] = useState(false);
  const [formData, setFormData] = useState({ nombre: '', telefono: '', email: '', cp: '', mensaje: '', consent: false });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [customerPhone, setCustomerPhone] = useState("+34 976 217 463");

  useEffect(() => {
    setIsAnimating(true);
    // Recuperamos el teléfono del servidor de forma transparente
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

  const closeModal = () => {
    setIsAnimating(false);
    setTimeout(() => {
      router.back();
    }, 400); 
  };

  // LIMPIEZA Y FORMATEO: Quitamos el +34 y lo agrupamos de 3 en 3 (ej. 976 217 463)
  const displayPhone = customerPhone
    .replace(/^\+34\s?/, '') 
    .replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3') 
    .trim();

  // Función para rastrear cuando el usuario empieza a escribir
  const handleFormStart = () => {
    if (!formStartedRef.current && posthog) {
      posthog.capture('formulario_iniciado', {
        origen: pathname,
        tipo_vista: 'modal_interceptado'
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
          leadId: `WEB-${Math.floor(Math.random() * 10000)}`
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        if (posthog) {
          posthog.capture('formulario_enviado', { origen: pathname, tipo_vista: 'modal_interceptado' });
        }
        setTimeout(closeModal, 3500);
      } else {
        if (posthog) {
          posthog.capture('formulario_error', { origen: pathname, tipo_vista: 'modal_interceptado', mensaje_error: 'Respuesta no exitosa API' });
        }
        throw new Error('Fallo en la respuesta del servidor');
      }
    } catch (error) {
      setSubmitStatus('error');
      if (posthog) {
        posthog.capture('formulario_error', { origen: pathname, tipo_vista: 'modal_interceptado', mensaje_error: 'Error de red' });
      }
    }
  };

  return (
    <div className={`fixed inset-0 z-[9999] flex flex-col justify-end md:justify-center items-center px-4 pb-0 md:p-4 transition-all duration-500 ease-out`}>
      {/* Fondo oscuro desenfocado */}
      <div 
        className={`absolute inset-0 bg-dkv-green-dark/60 backdrop-blur-sm transition-opacity duration-400 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
        onClick={closeModal}
      />

      {/* Contenedor del Modal */}
      <div className={`relative w-full md:max-w-[450px] bg-white shadow-2xl rounded-t-[28px] md:rounded-[28px] overflow-hidden transition-transform duration-500 flex flex-col max-h-[90vh] ${isAnimating ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-[100%] md:translate-y-10 md:scale-95 opacity-0'}`}>
        
        {/* --- CABECERA VERDE OSCURA --- */}
        <div className="bg-dkv-green-dark px-6 pt-7 pb-8 text-white shrink-0 relative">
          
          <div className="flex items-center justify-between mb-4">
            {/* 🚀 Título restaurado con text-white y fuente gorda forzada */}
            <h2 className="text-4xl md:text-5xl font-lemon text-white uppercase tracking-wide m-0 leading-none">
              CONTACTO
            </h2>
            <button 
              onClick={closeModal} 
              className="p-1 text-white/80 hover:text-white transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="w-7 h-7" strokeWidth={3} />
            </button>
          </div>

          <p className="text-[15px] font-fsme text-white/90 leading-snug mt-6 mb-6">
            <span className="font-bold text-white">HABLA con un agente exclusivo</span> para resolver cualquier duda.
          </p>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] text-white/70 font-fsme leading-tight mb-1">
                  Llámanos directamente
                </span>
                <TrackedPhoneLink 
                  phone={customerPhone}
                  seccion="Modal Contacto"
                  className="text-[26px] font-bold text-white leading-none tracking-tight hover:text-white/80 transition-colors font-fsme"
                >
                  {displayPhone}
                </TrackedPhoneLink>
              </div>
            </div>
            <p className="font-bold text-[16px] text-white font-fsme mt-2">
              Atención para toda España
            </p>
          </div>
        </div>

        {/* --- CUERPO / FORMULARIO BLANCO --- */}
        <div className="px-6 py-6 overflow-y-auto overscroll-contain bg-white flex-1">
          
          {/* Separador */}
          <div className="relative flex py-2 items-center mb-6">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink-0 mx-4 text-gray-700 text-sm font-bold uppercase tracking-widest">
              O envíanos tu consulta
            </span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          {/* Estado de envío y Formulario */}
          {submitStatus === 'success' ? (
            <div className="bg-green-50 text-dkv-green-dark p-8 rounded-2xl text-center border border-green-100 animate-in fade-in zoom-in duration-300">
              <span className="text-5xl mb-4 block">✅</span>
              <p className="font-bold text-xl mb-2">¡Consulta enviada!</p>
              <p className="text-sm text-gray-600">Hemos recibido tu mensaje correctamente.</p>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="flex flex-col gap-4">
              <input required type="text" placeholder="Tu Nombre" onFocus={handleFormStart} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 outline-none focus:bg-white focus:ring-2 focus:ring-dkv-green/50 transition-all font-fsme text-gray-800 text-base md:text-sm" value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} />
              <div className="grid grid-cols-2 gap-3">
                <input required type="tel" placeholder="Teléfono" onFocus={handleFormStart} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 outline-none focus:bg-white focus:ring-2 focus:ring-dkv-green/50 transition-all font-fsme text-gray-800 text-base md:text-sm" value={formData.telefono} onChange={e => setFormData({...formData, telefono: e.target.value})} />
                <input required type="email" placeholder="Email" onFocus={handleFormStart} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 outline-none focus:bg-white focus:ring-2 focus:ring-dkv-green/50 transition-all font-fsme text-gray-800 text-base md:text-sm" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
              <textarea required placeholder="¿En qué podemos ayudarte?" onFocus={handleFormStart} rows={4} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 outline-none focus:bg-white focus:ring-2 focus:ring-dkv-green/50 transition-all resize-none font-fsme text-gray-800 text-base md:text-sm" value={formData.mensaje} onChange={e => setFormData({...formData, mensaje: e.target.value})} />
              
              <label className="flex items-start gap-3 text-[12px] text-gray-500 cursor-pointer mt-1 bg-gray-50 p-3 rounded-xl border border-gray-100">
                <input required type="checkbox" onFocus={handleFormStart} className="mt-0.5 w-4 h-4 accent-dkv-green shrink-0 cursor-pointer" checked={formData.consent} onChange={e => setFormData({...formData, consent: e.target.checked})} />
                <span className="leading-tight">Acepto la <Link href="/politica-privacidad" className="underline text-dkv-green">política de privacidad</Link> y consiento el envío de información comercial.</span>
              </label>
              
              {submitStatus === 'error' && (
                <p className="text-red-500 text-sm font-bold text-center bg-red-50 py-2 rounded-lg">❌ Error de conexión. Inténtalo de nuevo.</p>
              )}

              <button type="submit" disabled={submitStatus === 'loading'} className="w-full bg-dkv-green-dark text-white font-extrabold text-lg rounded-xl py-4 mt-2 shadow-lg hover:shadow-xl hover:bg-dkv-green disabled:bg-gray-300 disabled:shadow-none transition-all flex justify-center items-center gap-2">
                {submitStatus === 'loading' ? <><Loader2 className="w-5 h-5 animate-spin" /> Enviando...</> : 'Enviar Consulta'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
