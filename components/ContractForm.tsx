"use client";
import React, { useState, useEffect } from 'react';
import { CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const ContractForm = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [pendingQuote, setPendingQuote] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('dkv_pending_quote');
    if (saved) {
      const data = JSON.parse(saved);
      // Validez de 2 horas para el presupuesto guardado
      if (Date.now() - data.timestamp < 7200000) {
        setPendingQuote(data);
      }
    }
  }, []);

  if (status === 'success') {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-8 text-center rounded-xl border-2 border-dkv-green shadow-xl">
        <div className="w-16 h-16 bg-dkv-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-10 h-10 text-dkv-green" />
        </div>
        <h3 className="text-2xl font-lemon text-dkv-green-dark uppercase">¡Solución en marcha!</h3>
        <p className="text-dkv-gray mt-2 font-fsme">Bernardo ha recibido tu configuración. Te contactaremos de inmediato para finalizar el alta.</p>
      </motion.div>
    );
  }

  return (
    <div id="contratacion" className="bg-white p-6 md:p-8 shadow-2xl border-t-4 border-dkv-green rounded-xl relative overflow-hidden">
      {/* Badge dinámico de presupuesto */}
      {pendingQuote && (
        <div className="mb-6 p-4 bg-dkv-green/5 border border-dkv-green/20 rounded-lg flex items-center gap-3">
          <Sparkles className="text-dkv-green w-5 h-5" />
          <div>
            <p className="text-[10px] font-bold text-dkv-green uppercase tracking-tighter">Tu solución configurada:</p>
            <p className="text-dkv-green-dark font-bold text-lg leading-none">
              {pendingQuote.estimatedPrice}€ {pendingQuote.paymentFrequency}
            </p>
          </div>
        </div>
      )}

      <h3 className="text-xl font-lemon text-dkv-green-dark uppercase mb-2">Datos para el Alta</h3>
      <p className="text-xs text-dkv-gray mb-6 font-fsme">Introduce tus datos para que podamos gestionar tu solución dental.</p>
      
      <form className="space-y-4">
        <input type="text" placeholder="Nombre completo" className="w-full p-4 bg-gray-50 border border-transparent focus:border-dkv-green focus:bg-white transition-all outline-none text-sm font-fsme" required />
        <div className="grid grid-cols-2 gap-4">
          <input type="tel" placeholder="Teléfono" className="w-full p-4 bg-gray-50 border border-transparent focus:border-dkv-green focus:bg-white transition-all outline-none text-sm font-fsme" required />
          <input type="text" placeholder="CP" className="w-full p-4 bg-gray-50 border border-transparent focus:border-dkv-green focus:bg-white transition-all outline-none text-sm font-fsme" required />
        </div>
        <input type="email" placeholder="Email para recibir el contrato" className="w-full p-4 bg-gray-50 border border-transparent focus:border-dkv-green focus:bg-white transition-all outline-none text-sm font-fsme" required />
        
        <button className="w-full bg-dkv-green hover:bg-dkv-green-hover text-white font-lemon py-5 rounded-full text-lg shadow-lg hover:shadow-xl transition-all uppercase mt-4">
          Quiero solucionarlo ya
        </button>
      </form>
    </div>
  );
};

export default ContractForm;
