// ========================================
// CONEXIÓN A SUPABASE
// ========================================
// La publishable key está diseñada para usarse en el navegador
// (queda protegida por las políticas de RLS de la tabla, no por
// mantenerse en secreto). La secret key NUNCA debe estar aquí.

const SUPABASE_URL = "https://yrkhaysahhwzpzsfyuiu.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_8fJFSZedyHCaJlsh2dbzhg_xtyqEFEk";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
