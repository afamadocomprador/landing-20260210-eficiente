// app/@modal/(.)contacto/page.tsx

"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { X, Loader2 } from "lucide-react";
import { usePostHog } from 'posthog-js/react';

export default function ContactModalIntercepted() {
  const router = useRouter();
  const posthog = usePostHog();
  
  // Estado para la animación suave de entrada/salida
  const [isAnimating, setIsAnimating] = useState(false);
  
  const [formData, setFormData] = useState({ nombre: '', telefono: '', email: '', cp: '', mensaje: '', consent: false });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Al montarse, disparamos la animación de entrada
  useEffect(() => {
    setIsAnimating(true);
  }, []);

  // Función maestra de cierre: Hace la animación de salida y luego retrocede en el historial
  const closeModal = () => {
    setIsAnimating(false);
    setTimeout(() => {
      router.back();
    }, 400); // 400ms da tiempo a que termine la transición CSS antes de destruir el componente
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
          posthog.capture('lead_enviado', { origen: 'modal_interceptado' });
        }
        // Tras el éxito, esperamos 3.5 segundos para que lea el mensaje y cerramos automáticamente
        setTimeout(closeModal, 3500);
      } else {
        throw new Error('Fallo en la respuesta del servidor');
      }
    } catch (error) {
      setSubmitStatus('error');
    }
  };

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex flex-col justify-end md:justify-center items-center px-4 pb-0 md:p-4 transition-all duration-500 ease-out`}
    >
      {/* Fondo oscuro desenfocado */}
      <div 
        className={`absolute inset-0 bg-dkv-green-dark/60 backdrop-blur-sm transition-opacity duration-400 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={closeModal}
      />

      {/* Contenedor del Modal */}
      <div 
        className={`relative w-full md:max-w-[450px] bg-white shadow-2xl rounded-t-[28px] md:rounded-[28px] overflow-hidden transition-transform duration-500 flex flex-col max-h-[90vh] ${
          isAnimating ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-[100%] md:translate-y-10 md:scale-95 opacity-0'
        }`}
      >
        {/* Cabecera */}
        <div className="bg-[#F5F5F5] px-5 py-4 flex items-center justify-between border-b border-gray-200 shrink-0">
          <div className="flex items-center gap-1.5 text-[15px] font-bold text-dkv-green-dark font-fsme uppercase tracking-wider">
            <span>Atención al Paciente</span>
          </div>
          <button 
            onClick={closeModal} 
            className="p-1.5 rounded-full bg-[#E5E5E5] text-dkv-green-dark hover:bg-[#D5D5D5] transition-colors"
          >
            <X className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </div>

        {/* Cuerpo / Formulario */}
        <div className="px-5 pt-6 pb-10 md:pb-8 overflow-y-auto overscroll-contain">
          <h3 className="text-[26px] font-lemon text-dkv-green-dark uppercase tracking-tight mb-1 leading-none">
            CONTACTO
          </h3>
          <p className="text-gray-500 text-[16px] font-fsme mb-6">
            Envíanos tu duda o consulta. Te responderemos lo antes posible.
          </p>

          {submitStatus === 'success' ? (
            <div className="bg-green-50 text-dkv-green-dark p-8 rounded-2xl text-center border border-green-100 animate-in fade-in zoom-in duration-300">
              <span className="text-5xl mb-4 block">✅</span>
              <p className="font-bold text-xl mb-2">¡Consulta enviada!</p>
              <p className="text-sm text-gray-600">Hemos recibido tu mensaje correctamente.</p>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="flex flex-col gap-4">
              <input required type="text" placeholder="Tu Nombre" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 outline-none focus:bg-white focus:ring-2 focus:ring-dkv-green/50 transition-all font-fsme text-gray-800" value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} />
              <div className="grid grid-cols-2 gap-3">
                <input required type="tel" placeholder="Teléfono" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 outline-none focus:bg-white focus:ring-2 focus:ring-dkv-green/50 transition-all font-fsme text-gray-800" value={formData.telefono} onChange={e => setFormData({...formData, telefono: e.target.value})} />
                <input required type="email" placeholder="Email" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 outline-none focus:bg-white focus:ring-2 focus:ring-dkv-green/50 transition-all font-fsme text-gray-800" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
              <textarea required placeholder="¿En qué podemos ayudarte?" rows={4} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 outline-none focus:bg-white focus:ring-2 focus:ring-dkv-green/50 transition-all resize-none font-fsme text-gray-800" value={formData.mensaje} onChange={e => setFormData({...formData, mensaje: e.target.value})} />
              
              <label className="flex items-start gap-3 text-[12px] text-gray-500 cursor-pointer mt-1 bg-gray-50 p-3 rounded-xl border border-gray-100">
                <input required type="checkbox" className="mt-0.5 w-4 h-4 accent-dkv-green shrink-0" checked={formData.consent} onChange={e => setFormData({...formData, consent: e.target.checked})} />
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
