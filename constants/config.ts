// constants/config.ts

export const SITE_CONFIG = {
  domain: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  brandName: 'DKV Dentisalud Élite',
  agentName: 'Bernardo Sobrecasas',
  // IDs Maestros para el Grafo
  ids: {
    agent: `${process.env.NEXT_PUBLIC_SITE_URL || ''}/#agente-exclusivo`,
    masterCatalog: `${process.env.NEXT_PUBLIC_SITE_URL || ''}/tratamientos/#baremo-maestro`,
    packsCatalog: `${process.env.NEXT_PUBLIC_SITE_URL || ''}/tratamientos/#packs-destacados`
  }
};
