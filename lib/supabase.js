import { AppState } from 'react-native';
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { supabaseAnonKey, supabaseUrl } from '../constants';
import { Platform } from 'react-native';

// Check if localStorage is available
const isWeb = Platform.OS === 'web';
const safeLocalStorage = isWeb && typeof window !== 'undefined' ? window.localStorage : null;

// Use appropriate storage based on the platform
const storage = isWeb ? safeLocalStorage : AsyncStorage;

if (!storage && isWeb) {
  console.error('LocalStorage is not available in this environment');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage, // Use the appropriate storage
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, // Detect session in URL only on the web
  },
  
});
// Auto-refresh token management for React Native
if (!isWeb) {
  AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      supabase.auth.startAutoRefresh();
    } else {
      supabase.auth.stopAutoRefresh();
    }
  });
}
