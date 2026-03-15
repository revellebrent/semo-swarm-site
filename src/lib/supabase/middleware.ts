import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

import { getSupabaseBrowserEnv } from "@/lib/supabase/env";
import type { Database } from "@/types/database";

export async function updateSession(request: NextRequest) {
  const { supabaseUrl, supabaseAnonKey } = getSupabaseBrowserEnv();

  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          request.cookies.set(name, value);
          response = NextResponse.next({
            request,
          });
          response.cookies.set(name, value, options);
        });
      },
    },
    global: {
      headers: {
        "x-application-name": "semo-swarm-web",
      },
    },
  });

  await supabase.auth.getUser();

  return response;
}
