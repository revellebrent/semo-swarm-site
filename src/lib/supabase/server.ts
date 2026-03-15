import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

import { getSupabaseBrowserEnv } from "@/lib/supabase/env";
import type { Database } from "@/types/database";

export async function createServerSupabaseClient() {
  const { supabaseUrl, supabaseAnonKey } = getSupabaseBrowserEnv();
  const cookieStore = await cookies();

  return createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Components cannot always write cookies. Middleware keeps sessions refreshed.
        }
      },
    },
    global: {
      headers: {
        "x-application-name": "semo-swarm-web",
      },
    },
  });
}
