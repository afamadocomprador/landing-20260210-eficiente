// app/admin/seo/page.tsx

import { createClient } from '@supabase/supabase-js';
import SeoTable from './SeoTable';
import SeoDoctor from '@/components/seo/SeoDoctor'; 
import GlobalScanner from './GlobalScanner'; 
import SeoAnalytics from './SeoAnalytics';
import SeoBatchProcessor from './SeoBatchProcessor'; // <-- Importamos nuestro nuevo componente

export const revalidate = 0;

export default async function SeoDashboardPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: audits } = await supabase
    .from('seo_audits')
    .select('*')
    .order('last_scan', { ascending: false });

  return (
    <div className="min-h-screen bg-slate-50 p-8 text-slate-800">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <header>
          <h1 className="text-3xl font-bold text-slate-900">Observatorio SEO</h1>
          <p className="text-slate-500">Auditoría en tiempo real y análisis estructural de la red de clínicas.</p>
        </header>

        {/* 1. SECCIÓN: DOCTOR SEO */}
        <section>
          <SeoDoctor />
        </section>

        {/* NUEVA SECCIÓN: INYECCIÓN BATCH DE SEO */}
        <section>
          <SeoBatchProcessor />
        </section>

        {/* 2. SECCIÓN: AUDITORÍA GLOBAL */}
        <section>
          <GlobalScanner />
        </section>

        {/* 3. SECCIÓN: ANALÍTICA CRUZADA */}
        <section>
          <SeoAnalytics audits={audits || []} />
        </section>

        {/* 4. SECCIÓN: TABLA HISTÓRICA */}
        <section>
          <SeoTable initialData={audits || []} />
        </section>

      </div>
    </div>
  );
}