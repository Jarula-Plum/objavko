// Public project URL and publishable key: both are meant to ship to the browser,
// data is protected by Row Level Security. Valid env vars override them (e.g. for a test project).
const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
const envKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()

export const SUPABASE_URL = envUrl?.startsWith('https://') ? envUrl : 'https://lscjbjxvmpauexyxztey.supabase.co'
export const SUPABASE_KEY = envUrl?.startsWith('https://') && envKey ? envKey : 'sb_publishable_iNrdMD3XDbWpPUTHfjyl5w_qPnUlUa0'
