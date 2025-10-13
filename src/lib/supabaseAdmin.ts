import { createClient } from '@supabase/supabase-js'

// Server-only Supabase client (uses service role key). Never expose this to the browser.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !serviceRoleKey) {
  console.warn('Supabase admin client missing URL or service role key.')
}

export const supabaseAdmin = createClient(url || '', serviceRoleKey || '', {
  auth: { persistSession: false, autoRefreshToken: false },
})


