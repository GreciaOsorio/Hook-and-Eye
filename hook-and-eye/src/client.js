import { createClient } from '@supabase/supabase-js'

const API_URL = 'https://faggazpjhgepgawunszo.supabase.co'
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhZ2dhenBqaGdlcGdhd3Vuc3pvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMjg4NzYsImV4cCI6MjA3ODgwNDg3Nn0.ZcUArGqdR95h4OOoRRBZvCTmcpJ1TomsRV1G2uDUez8'

export const supabase = createClient(API_URL, API_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: window.localStorage,
    storageKey: 'supabase.auth.token',
  }
})