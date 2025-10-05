/// <reference types="vite/client" />
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// Example type for a "tasks" table
/* export type Task = {
  id: number
  title: string
  completed: boolean
} */

