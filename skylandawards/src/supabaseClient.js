import { createClient } from "@supabase/supabase-js";

const supabaseURL = 'https://tpnhgpnvlbfdcwvwixlp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwbmhncG52bGJmZGN3dndpeGxwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYwMzMwNTksImV4cCI6MjA1MTYwOTA1OX0.88HbMAom0UQ9dtzJz93KG1d8Iz6zSWJ-9xXJ6rC_LX4';

export const supabase = createClient(supabaseURL, supabaseAnonKey);