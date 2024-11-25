import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@env';

const Supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

//const Supabase = createClient("https://rggkbdolkrfbolbgtldu.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJnZ2tiZG9sa3JmYm9sYmd0bGR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI0ODQ5NzQsImV4cCI6MjA0ODA2MDk3NH0.dMtL6VklTcgpBO_OPu0ameRK4M3AzWbdYvVAnuNYETw");

export default Supabase;