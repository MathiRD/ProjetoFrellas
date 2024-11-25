import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@env';

const Supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export default Supabase;