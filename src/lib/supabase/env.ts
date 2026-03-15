type SupabaseBrowserEnv = {
  supabaseUrl: string;
  supabaseAnonKey: string;
};

function readEnvValue(name: "NEXT_PUBLIC_SUPABASE_URL" | "NEXT_PUBLIC_SUPABASE_ANON_KEY") {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required Supabase environment variable: ${name}`);
  }

  return value;
}

export function getSupabaseBrowserEnv(): SupabaseBrowserEnv {
  return {
    supabaseUrl: readEnvValue("NEXT_PUBLIC_SUPABASE_URL"),
    supabaseAnonKey: readEnvValue("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
  };
}
