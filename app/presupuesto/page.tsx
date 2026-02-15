import { CalculatorContainer } from '@/components/calculator/CalculatorContainer';
import ContractForm from '@/components/ContractForm';
import FooterLegal from '@/components/FooterLegal';

export default function PresupuestoPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-fsme">
      {/* ... Header ... */}
      <main className="flex-grow py-12 px-4 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <CalculatorContainer />
          <div className="space-y-8">
            <div className="bg-dkv-green-dark p-8 rounded-xl text-white">
              <h1 className="text-3xl font-lemon mb-4 uppercase">Alta Directa</h1>
              <p className="opacity-90">Si ya tienes claro tu presupuesto, completa el formulario para que Bernardo Sobrecasas tramite tu póliza inmediatamente.</p>
            </div>
            <ContractForm />
          </div>
        </div>
      </main>
      <FooterLegal />
    </div>
  );
}
