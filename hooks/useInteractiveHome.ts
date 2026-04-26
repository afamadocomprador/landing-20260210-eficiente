// hooks/useInteractiveHome.ts

import { useState, useEffect } from 'react';

export const useInteractiveHome = () => {
  const [activeFloatingId, setActiveFloatingId] = useState<number | string | null>(null);

  useEffect(() => {
    if (activeFloatingId !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [activeFloatingId]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const modalId = params.get('modal');
    if (modalId) {
      setActiveFloatingId(parseInt(modalId));
    }
  }, []);

  return { activeFloatingId, setActiveFloatingId };
};
