"use client";

import { Share2, Check } from "lucide-react";
import { useState, useEffect } from "react";

export default function ShareButton({ id, title }: { id: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleShare = async () => {
    // ⚡️ Construimos la URL con el Query Param (SEO) y el Hash (Scroll)
    const url = `${window.location.origin}${window.location.pathname}?share=${id}#${id}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Tratamiento: ${title} | DKV Dentisalud`,
          text: `Mira la información y el precio de este tratamiento: ${title}`,
          url: url,
        });
      } catch (error) {
        console.log("Operación de compartir cancelada", error);
      }
    } else {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!mounted) return null;

  return (
    <button
      onClick={handleShare}
      className="group flex items-center justify-center p-2.5 bg-dkv-gray-light hover:bg-dkv-green/10 text-dkv-gray hover:text-dkv-green rounded-full transition-all duration-300 flex-shrink-0 border border-transparent hover:border-dkv-green/30"
      title="Compartir tratamiento"
    >
      {copied ? (
        <Check className="w-5 h-5 text-dkv-green" />
      ) : (
        <Share2 className="w-5 h-5 transition-transform group-hover:scale-110" />
      )}
    </button>
  );
}