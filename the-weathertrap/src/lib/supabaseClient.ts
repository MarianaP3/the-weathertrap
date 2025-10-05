/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js'

const supabaseUrl: string = import.meta.env.PUBLIC_SUPABASE_URL as string
const supabaseKey: string = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string

export const supabase = createClient(supabaseUrl, supabaseKey)