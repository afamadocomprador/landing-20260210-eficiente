"use client";

import React, { useState, useEffect } from 'react';
import { Minus, Plus, TrendingDown, Star, Check } from 'lucide-react';
import { Button } from "@/components/ui/Button";
import { calculatePremiums, QuoteResult, PaymentFrequency } from '@/lib/calculator';
import { motion, AnimatePresence } from 'framer-motion';

export const CalculatorContainer = () => {
  // Iniciamos en 0 según el requisito de negocio
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [selectedFreq, setSelectedFreq] = useState<PaymentFrequency>('anual');
  const [quote, setQuote] = useState<QuoteResult | null>(null);

  const hasResults = quote !== null && (adults + children > 0);

  useEffect(() => {
    if (adults + children > 0) {
      const res = calculatePremiums(adults, children);
      setQuote(res);

      // Si la frecuencia que tenía el usuario deja de estar permitida (ej. baja de 4 a 1 adulto)
      // forzamos a 'anual' que siempre es válida.
      if (!res.price[selectedFreq].isAllowed) {
        setSelectedFreq('anual');
      }
    } else {
      setQuote(null);
    }
  }, [adults, children, selectedFreq]);

  const updateAdults = (inc: number) => setAdults(prev => Math.max(0, prev + inc));
  const updateChildren = (inc: number) => setChildren(prev => Math.max(0, prev + inc));

  const handleContratar = () => {
    if (quote) {
      const data = {
        adults,
        children,
        paymentFrequency: selectedFreq,
        estimatedPrice: quote.price[selectedFreq].total,
        timestamp: Date.now()
      };
      localStorage.setItem('dkv_pending_quote', JSON.stringify(data));
      document.getElementById('información')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col font-fsme">
      <div className="bg-dkv-green p-6 text-white shrink-0">
        <h2 className="text-2xl font-lemon mb-1 tracking-tight uppercase">DKV Dentisalud Élite</h2>
        <p className="text-white/80 text-[10px] uppercase tracking-widest font-bold">Calcula tu precio oficial</p>
      </div>

      <div className="p-6 space-y-6">
        {/* SELECTOR DE PERSONAS */}
        <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 space-y-5">
          <div className="flex items-center justify-between">
            <div className="font-bold text-dkv-green-dark text-base">Adultos (+14 años)</div>
            <div className="flex items-center gap-4 bg-white px-3 py-1.5 rounded-xl border border-gray-200 shadow-sm">
              <button onClick={() => updateAdults(-1)} disabled={adults <= 0} className="text-dkv-green disabled:opacity-20 transition-colors p-1 hover:bg-gray-50 rounded-full"><Minus size={20} /></button>
              <span className="font-lemon text-xl min-w-[24px] text-center tabular-nums text-dkv-green-dark">{adults}</span>
              <button onClick={() => updateAdults(1)} className="text-dkv-green transition-colors p-1 hover:bg-gray-50 rounded-full"><Plus size={20} /></button>
            </div>
          </div>

          <div className="h-px bg-gray-200/50" />

          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-dkv-green-dark text-base">Niños (0-13 años)</div>
              {/* LEYENDA NUEVA: Descuento familiar */}
              {adults > 0 && children > 0 && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] text-dkv-green font-bold flex items-center gap-1 mt-0.5 uppercase tracking-tighter">
                  <Check size={10} strokeWidth={3} /> Descuento familiar aplicado
                </motion.p>
              )}
            </div>
            <div className="flex items-center gap-4 bg-white px-3 py-1.5 rounded-xl border border-gray-200 shadow-sm">
              <button onClick={() => updateChildren(-1)} disabled={children <= 0} className="text-dkv-green disabled:opacity-20 transition-colors p-1 hover:bg-gray-50 rounded-full"><Minus size={20} /></button>
              <span className="font-lemon text-xl min-w-[24px] text-center tabular-nums text-dkv-green-dark">{children}</span>
              <button onClick={() => updateChildren(1)} className="text-dkv-green transition-colors p-1 hover:bg-gray-50 rounded-full"><Plus size={20} /></button>
            </div>
          </div>
        </div>

        <AnimatePresence mode="popLayout" initial={false}>
          {hasResults ? (
            <motion.div key="results" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2 ml-1 text-center sm:text-left">Elige tu forma de pago:</p>
              
              {(['anual', 'semestral', 'trimestral', 'mensual'] as PaymentFrequency[]).map((freq) => {
                const priceData = quote?.price[freq];
                
                // CRÍTICO: No mostramos las opciones que no cumplen el mínimo bancario
                if (!priceData?.isAllowed) return null;

                const isSelected = selectedFreq === freq;

                return (
                  <motion.div
                    layout
                    key={freq}
                    onClick={() => setSelectedFreq(freq)}
                    className={`relative border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${
                      isSelected ? 'border-dkv-green bg-green-50/30 shadow-md ring-1 ring-dkv-green' : 'border-gray-100 bg-white hover:border-gray-200'
                    }`}
                    whileTap={{ scale: 0.98 }}
                  >
                    {freq === 'anual' && (
                      <div className="absolute -top-2.5 right-4 bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                        <Star size={10} fill="currentColor" /> MEJOR PRECIO
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-dkv-green bg-dkv-green' : 'border-gray-200'}`}>
                           {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                        <div>
                          <h3 className="font-lemon text-dkv-green-dark capitalize text-lg leading-none">{freq}</h3>
                          
                          {/* LEYENDAS DE FRACCIONAMIENTO */}
                          {priceData.savingsVsAnnual > 0 ? (
                            <p className="text-[10px] text-orange-600 font-bold mt-1.5 flex items-center gap-1 uppercase tracking-tighter leading-none">
                              <TrendingDown size={10} /> +{priceData.savingsVsAnnual.toFixed(2)}€ recargo fraccionamiento
                            </p>
                          ) : freq === 'anual' ? (
                            <p className="text-[10px] text-dkv-green font-bold mt-1.5 uppercase tracking-tighter leading-none flex items-center gap-1">
                               <Check size={10} strokeWidth={3} /> Opción más económica
                            </p>
                          ) : null}
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="block text-2xl font-bold text-dkv-green font-lemon tracking-tighter leading-none">
                          {priceData.total.toFixed(2)}€
                        </span>
                        {freq !== 'mensual' && (
                          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                            {priceData.annualizedTotal.toFixed(0)}€ / año
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              <div className="pt-4">
                <Button 
                  onClick={handleContratar} 
                  className="w-full h-14 text-xl shadow-xl hover:scale-[1.02] transition-transform uppercase font-lemon bg-dkv-green text-white"
                >
                  Quiero solucionarlo ya
                </Button>
                <p className="text-[10px] text-gray-400 text-center mt-4 uppercase tracking-widest font-bold">
                   Emisión oficial · Bernardo Sobrecasas Gallizo
                </p>
              </div>



            </motion.div>
          ) : (
            <motion.div 
              key="empty" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-center py-12 text-gray-300 border-2 border-dashed border-gray-100 rounded-2xl font-bold uppercase text-[10px] tracking-widest leading-relaxed px-4"
            >
               Añade personas aseguradas para ver todas las opciones de pago
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
