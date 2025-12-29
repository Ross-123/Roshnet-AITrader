import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY environment variables are not set. Authentication will not work.');
}

export const supabase = createClient(
  supabaseUrl || 'VITE_SUPABASE_URL',
  supabaseAnonKey || 'VITE_SUPABASE_ANON_KEY'
); 