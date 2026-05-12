// app/contacto/page.tsx

"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Loader2, Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";
import { usePostHog } from 'posthog-js/react';

export default function ContactPage() {
  const posthog = usePostHog();
  
  const [formData, setFormData] = useState({ nombre: '', telefono: '', email: '', cp: '', mensaje: '', consent: false });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

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
          posthog.capture('lead_enviado', { origen: 'pagina_contacto_directa' });
        }
      } else {
        throw new Error('Fallo en la respuesta del servidor');
      }
    } catch (error) {
      setSubmitStatus('error');
    }
  };

  return (
    <div className="min-h-[calc(100vh-110px)] bg-[#F0F0F0] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
        
        {/* PANEL IZQUIERDO: Información */}
        <div className="bg-dkv-green-dark p-10 lg:p-16 lg:w-2/5 text-white flex flex-col justify-center relative overflow-hidden">
          {/* Elemento decorativo de fondo */}
          <div className="absolute top-0 right-0 -translate-y-10 translate-x-10 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10">
            <h1 className="text-4xl lg:text-5xl font-lemon uppercase tracking-wide mb-6 leading-tight">
              Atención al Paciente
            </h1>
            <p className="font-fsme text-lg lg:text-xl text-white/80 mb-10 leading-relaxed">
              Estamos aquí para resolver cualquier duda sobre nuestros tratamientos, precios pactados o coberturas de tu póliza dental.
            </p>

            <div className="space-y-6 font-fsme text-white/90">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-white/60 mb-0.5">Llámanos</p>
                  <p className="font-bold text-lg">900 810 076</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-white/60 mb-0.5">Garantía DKV</p>
                  <p className="font-bold text-lg">Más de 2.000 clínicas</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PANEL DERECHO: Formulario */}
        <div className="p-10 lg:p-16 lg:w-3/5 bg-white">
          <h2 className="text-2xl font-lemon text-dkv-green-dark uppercase tracking-tight mb-2">
            Envíanos tu consulta
          </h2>
          <p className="text-gray-500 text-[16px] font-fsme mb-8">
            Rellena el siguiente formulario y un asesor médico se pondrá en contacto contigo a la mayor brevedad.
          </p>

          {submitStatus === 'success' ? (
            <div className="bg-green-50 text-dkv-green-dark p-10 rounded-2xl text-center border border-green-100 animate-in fade-in zoom-in duration-300 h-full flex flex-col items-center justify-center min-h-[400px]">
              <span className="text-6xl mb-6 block">✅</span>
              <p className="font-bold text-2xl mb-3">¡Consulta enviada con éxito!</p>
              <p className="text-lg text-gray-600 font-fsme">
                Hemos recibido tu mensaje correctamente. Nuestro equipo revisará tu solicitud y te contactará en breve.
              </p>
              <Link 
                href="/"
                className="mt-8 bg-dkv-green-dark text-white font-bold py-3 px-8 rounded-xl hover:bg-dkv-green transition-colors"
              >
                Volver a la página principal
              </Link>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-bold text-dkv-green-dark mb-1.5 font-fsme">Nombre completo *</label>
                <input required type="text" placeholder="Ej. María García" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 outline-none focus:bg-white focus:ring-2 focus:ring-dkv-green/50 transition-all font-fsme text-gray-800" value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-dkv-green-dark mb-1.5 font-fsme">Teléfono *</label>
                  <input required type="tel" placeholder="Ej. 600 000 000" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 outline-none focus:bg-white focus:ring-2 focus:ring-dkv-green/50 transition-all font-fsme text-gray-800" value={formData.telefono} onChange={e => setFormData({...formData, telefono: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-dkv-green-dark mb-1.5 font-fsme">Correo electrónico *</label>
                  <input required type="email" placeholder="tucorreo@ejemplo.com" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 outline-none focus:bg-white focus:ring-2 focus:ring-dkv-green/50 transition-all font-fsme text-gray-800" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-dkv-green-dark mb-1.5 font-fsme">¿En qué podemos ayudarte? *</label>
                <textarea required placeholder="Escribe aquí tu duda, consulta sobre un tratamiento, código postal..." rows={5} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 outline-none focus:bg-white focus:ring-2 focus:ring-dkv-green/50 transition-all resize-none font-fsme text-gray-800" value={formData.mensaje} onChange={e => setFormData({...formData, mensaje: e.target.value})} />
              </div>
              
              <label className="flex items-start gap-3 text-[13px] text-gray-500 cursor-pointer mt-2 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <input required type="checkbox" className="mt-0.5 w-5 h-5 accent-dkv-green shrink-0 cursor-pointer" checked={formData.consent} onChange={e => setFormData({...formData, consent: e.target.checked})} />
                <span className="leading-relaxed">He leído y acepto la <Link href="/politica-privacidad" className="underline text-dkv-green hover:text-dkv-green-dark transition-colors">política de privacidad</Link> y consiento el tratamiento de mis datos para la gestión de mi consulta y el envío de información comercial.</span>
              </label>
              
              {submitStatus === 'error' && (
                <p className="text-red-500 text-sm font-bold text-center bg-red-50 py-3 rounded-lg border border-red-100 mt-2">❌ Ha ocurrido un error de conexión. Por favor, inténtalo de nuevo.</p>
              )}

              <button type="submit" disabled={submitStatus === 'loading'} className="w-full bg-dkv-green-dark text-white font-extrabold text-lg rounded-xl py-4 mt-4 shadow-lg hover:shadow-xl hover:bg-dkv-green disabled:bg-gray-300 disabled:shadow-none transition-all flex justify-center items-center gap-2">
                {submitStatus === 'loading' ? <><Loader2 className="w-6 h-6 animate-spin" /> Procesando envío...</> : 'Enviar Consulta de Salud'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
