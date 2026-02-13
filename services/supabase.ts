import { SUPABASE_ANON_KEY, SUPABASE_URL } from '@/constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    persistSession: true,
    autoRefreshToken: true,      // Add this
    detectSessionInUrl: false,   // Add this to prevent conflict with your manual parsing
    flowType: 'implicit',
  },
});