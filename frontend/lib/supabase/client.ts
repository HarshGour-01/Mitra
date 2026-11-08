import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://jyklwvsrvvwhrlzvmjag.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5a2x3dnNydnZ3aHJsenZtamFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM1MzIzMzgsImV4cCI6MjEwOTEwODMzOH0.0G892rZrZcIsRXO-8Q91dKR0MISULAbMBH9feeS4IBk";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storageKey: "mitra_auth_session",
  },
});
