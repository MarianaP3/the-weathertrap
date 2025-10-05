/// <reference types="vite/client" />
import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl: string = import.meta.env.SUPABASE_URL as string
const supabaseKey: string = import.meta.env.SUPABASE_KEY as string

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey)

// Example type for a "tasks" table
/* export type Task = {
  id: number
  title: string
  completed: boolean
} */

