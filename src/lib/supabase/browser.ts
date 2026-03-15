import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import { getSupabaseBrowserEnv } from "@/lib/supabase/env";
import type { Database } from "@/types/database";

let browserClient: SupabaseClient<Database> | undefined;

export function createBrowserSupabaseClient() {
  if (browserClient) {
    return browserClient;
  }

  const { supabaseUrl, supabaseAnonKey } = getSupabaseBrowserEnv();

  browserClient = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
    global: {
      headers: {
        "x-application-name": "semo-swarm-web",
      },
    },
  });

  return browserClient;
}
