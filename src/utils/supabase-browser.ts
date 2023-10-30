import { Database } from "../../types/database.types";
import { createBrowserSupabaseClient, crea } from "@supabase/auth-helpers-nextjs";

export const createClient = () => createBrowserSupabaseClient<Database>();
