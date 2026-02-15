// Simple store para pasar datos entre componentes
export const saveQuoteForForm = (adults: number, children: number, freq: string, total: number) => {
  const quoteData = {
    adults,
    children,
    paymentFrequency: freq,
    estimatedPrice: total,
    timestamp: Date.now()
  };
  localStorage.setItem('dkv_pending_quote', JSON.stringify(quoteData));
};
