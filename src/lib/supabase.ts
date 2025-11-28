import { createClient } from '@supabase/supabase-js';

// ✅ Load environment variables (must start with VITE_)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// ✅ Add validation to prevent runtime crash
if (!supabaseUrl) {
  console.error('❌ Missing environment variable: VITE_SUPABASE_URL');
  throw new Error('VITE_SUPABASE_URL is required');
}

if (!supabaseAnonKey) {
  console.error('❌ Missing environment variable: VITE_SUPABASE_ANON_KEY');
  throw new Error('VITE_SUPABASE_ANON_KEY is required');
}

// ✅ Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'user';
  created_at: string;
}

export interface Member {
  id: string;
  joining_date: string;
  full_name: string;
  village: string;
  post?: string;
  taluka?: string;
  district?: string;
  state?: string;
  pincode?: string;
  mobile?: string;
  notes?: string;
  added_by: string;
  created_at: string;
  updated_at: string;
}

export interface Program {
  id: string;
  title: string;
  date: string;
  location: string;
  description?: string;
  image_url?: string;
  created_by: string;
  created_at: string;
}

export interface AddressData {
  village: string;
  taluka: string;
  district: string;
  state: string;
}
