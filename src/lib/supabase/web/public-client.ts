// Cookies-free Supabase client for anonymous public reads (storefront).
// Using this instead of the @supabase/ssr server client keeps storefront
// pages statically renderable — the ssr client calls `cookies()`, which
// forces dynamic rendering.
//
// Auth is NOT supported here. For anything that needs a user session,
// import from ./server instead.

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let _client: SupabaseClient | null = null;

export function createPublicClient(): SupabaseClient {
  if (_client) return _client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) {
    throw new Error(
      "Supabase not configured: set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY"
    );
  }
  _client = createClient(url, anon, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return _client;
}
