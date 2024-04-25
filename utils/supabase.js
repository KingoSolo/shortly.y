import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qfhxlovxibynovakbuox.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmaHhsb3Z4aWJ5bm92YWtidW94Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMzMTUwODIsImV4cCI6MjAyODg5MTA4Mn0.DAVUZoc5HCe_lfbMv_x5z3aZnfEK52naJKOA17s11qc';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
