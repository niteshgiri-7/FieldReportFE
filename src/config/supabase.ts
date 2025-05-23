import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_DBURL;
const supabaseKey = import.meta.env.VITE_ANONKEY;
export const supabase = createClient(supabaseUrl, supabaseKey);
