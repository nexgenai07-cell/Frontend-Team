// Supabase client banane ki library import kar rahy hain
import { createClient } from "@supabase/supabase-js";

// .env file sy Project URL le rahy hain
// VITE_ prefix zaroori hai Vite projects mein
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

// .env file sy Publishable key le rahy hain
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Supabase client bana rahy hain
// Ye ek baar banta hai aur poori app mein use hota hai
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
