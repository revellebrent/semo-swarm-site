import { cache } from "react";

import { createClient } from "@supabase/supabase-js";

import { getSupabaseBrowserEnv } from "@/lib/supabase/env";
import type { Database } from "@/types/database";

export const createServerSupabaseClient = cache(() => {
  const { supabaseUrl, supabaseAnonKey } = getSupabaseBrowserEnv();

  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      headers: {
        "x-application-name": "semo-swarm-web",
      },
    },
  });
});
