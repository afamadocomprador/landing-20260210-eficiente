// lib/services/config.ts

"use server";

export async function getCustomerServicePhone(): Promise<string> {
  // Aquí hoy leemos de una variable de entorno.
  // Mañana puedes hacer una consulta a base de datos (Supabase)
  // o poner lógica de horarios sin que el frontend se entere.
  
  const phone = process.env.CUSTOMER_SERVICE_PHONE || "+34976217463";
  return phone;
}
