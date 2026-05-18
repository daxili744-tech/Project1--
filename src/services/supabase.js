import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://setbopdxzfybmfvifgju.supabase.co'
const supabaseKey = 'sb_publishable_JsfsMfDOQ0M9CGoUEU4dBQ_90MBWsHn'
export const supabase = createClient(supabaseUrl, supabaseKey)
