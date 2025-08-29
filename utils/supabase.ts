import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient, processLock } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://wlptqflrqdkrghhpqpmi.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndscHRxZmxycWRrcmdoaHBxcG1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0MjkxMDAsImV4cCI6MjA3MjAwNTEwMH0.f6mlXR4sbC-85wb4KoODhxYBzY2TEVnG293PwfAnubQ'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    lock: processLock,
  },
})
