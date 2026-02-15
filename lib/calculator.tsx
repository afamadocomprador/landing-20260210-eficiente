export type PaymentFrequency = 'anual' | 'semestral' | 'trimestral' | 'mensual';

export interface PriceDetails {
  total: number;
  frequency: PaymentFrequency;
  perPerson: number;
  isAllowed: boolean;
  annualizedTotal: number;
  savingsVsAnnual: number;
}

export interface QuoteResult {
  price: Record<PaymentFrequency, PriceDetails>; 
  adultsCount: number;
  childrenCount: number;
  appliedDiscounts: string[];
}

// TARIFAS OFICIALES ÉLITE (Actualizadas según tu fuente)
const TARIFFS = {
  MENSUAL: 10.90,
  TRIMESTRAL: 31.80,
  SEMESTRAL: 62.36,
  ANUAL: 121.68
};

export function calculatePremiums(adults: number, children: number): QuoteResult {
  // 1. DETERMINAR QUIÉN PAGA (Lógica DKV: Niños gratis solo si hay adultos)
  const payingMembers = adults > 0 ? adults : children;
  
  // 2. MOTOR DE DISPONIBILIDAD BANCARIA
  const isFrequencyAvailable = (freq: PaymentFrequency): boolean => {
    if (payingMembers === 0) return false;

    // REGLA 1: 1 SOLO PAGADOR -> Solo Anual y Semestral
    if (payingMembers === 1) {
       return freq === 'anual' || freq === 'semestral';
    }

    // REGLA 2: 2 O 3 PAGADORES -> Todo menos mensual
    if (payingMembers >= 2 && payingMembers <= 3) {
       return freq !== 'mensual';
    }

    // REGLA 3: 4 O MÁS PAGADORES -> Todo disponible
    return true;
  };

  const modes: PaymentFrequency[] = ['mensual', 'trimestral', 'semestral', 'anual'];
  const priceResult: any = {};
  const annualBaseTotal = TARIFFS.ANUAL * payingMembers;

  modes.forEach(freq => {
      let multiplier = 1;
      let tariff = 0;

      switch(freq) {
          case 'mensual':    tariff = TARIFFS.MENSUAL; multiplier = 12; break;
          case 'trimestral': tariff = TARIFFS.TRIMESTRAL; multiplier = 4; break;
          case 'semestral':  tariff = TARIFFS.SEMESTRAL; multiplier = 2; break;
          case 'anual':      tariff = TARIFFS.ANUAL; multiplier = 1; break;
      }

      const totalReceipt = tariff * payingMembers;
      const annualized = totalReceipt * multiplier;
      
      priceResult[freq] = {
          total: totalReceipt,
          frequency: freq,
          perPerson: totalReceipt / (adults + children || 1),
          isAllowed: isFrequencyAvailable(freq),
          annualizedTotal: annualized,
          savingsVsAnnual: annualized - annualBaseTotal
      };
  });

  return {
    price: priceResult as Record<PaymentFrequency, PriceDetails>,
    adultsCount: adults,
    childrenCount: children,
    appliedDiscounts: (adults > 0 && children > 0) ? ['Pack Familiar'] : []
  };
}
