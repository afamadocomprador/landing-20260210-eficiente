import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";
// Importa tus componentes de mapa, layouts, etc.

export const dynamic = "force-dynamic"; // Importante para que no cachee esta página estáticamente

export default async function CercaDeMiPage() {
  // 1. Leemos el "secreto" que nos mandó el navegador
  const cookieStore = cookies();
  const lat = cookieStore.get("user_lat")?.value;
  const lng = cookieStore.get("user_lng")?.value;

  // Si por algún motivo entra a esta URL directamente sin coordenadas, lo devolvemos a la home
  if (!lat || !lng) {
    redirect("/");
  }

  // 2. Conectamos a Supabase en el servidor
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get: (name: string) => cookieStore.get(name)?.value } }
  );

  // 3. AQUÍ HARÍAS TU CONSULTA ESPACIAL A SUPABASE
  // (Ej: Dame los dentistas que estén a menos de 20km de lat/lng)
  // const { data: dentistas } = await supabase.rpc('get_dentistas_cercanos', {
  //   lat_usuario: parseFloat(lat),
  //   lng_usuario: parseFloat(lng),
  //   radio_km: 20
  // });

  return (
    <div className="flex flex-col min-h-screen bg-white font-fsme">
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-lemon text-dkv-green-dark mb-4">
          Clínicas más cercanas a ti
        </h1>
        <p className="text-gray-600 mb-8">
          Hemos buscado en un radio cercano a tu ubicación actual.
        </p>

        {/* Aquí pasarías los datos a tu componente de Mapa que ya tienes */}
        {/* <DentistsContainer dentistas={dentistas} latCenter={parseFloat(lat)} lngCenter={parseFloat(lng)} /> */}
        
        {/* Para probar que funciona, imprimimos las coordenadas: */}
        <div className="p-4 bg-gray-100 rounded-lg">
          Tus coordenadas invisibles son: {lat}, {lng}
        </div>
      </div>
    </div>
  );
}
