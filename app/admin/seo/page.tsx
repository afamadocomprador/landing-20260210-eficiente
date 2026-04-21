//app/admin/seo/page.tsx
import { createClient } from '@supabase/supabase-js';
import SeoTable from './SeoTable';

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
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Observatorio SEO</h1>
          <p className="text-slate-500">Análisis de landings y centros dentales.</p>
        </header>

        {/* Pasamos los datos al componente de cliente */}
        <SeoTable initialData={audits || []} />
      </div>
    </div>
  );
}