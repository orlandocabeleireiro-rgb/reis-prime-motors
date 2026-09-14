import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Se as variáveis de ambiente não estiverem definidas (ex. build sem as
// configurar na Vercel), o cliente fica "desligado" em vez de rebentar a
// build — o resto do site continua a funcionar, só o login/criar conta
// fica indisponível.
export const supabase = url && key ? createClient(url, key) : null;
