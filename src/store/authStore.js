import { create } from 'zustand'
import { supabase } from '@/lib/supabaseClient'

export const useAuthStore = create(() => ({
  session: null,
  user: null,
  // 'loading' until the first auth event fires, then 'signedIn' | 'signedOut'.
  status: 'loading',
}))

export function signInWithPassword(email, password) {
  return supabase.auth.signInWithPassword({ email, password })
}

export function signUpWithPassword(email, password, fullName) {
  return supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } },
  })
}

export function signInWithOAuth(provider, redirectPath = '/') {
  return supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(redirectPath)}`,
    },
  })
}

export function signOut() {
  return supabase.auth.signOut()
}

// supabase-js persists the session itself; this store is just a thin
// reactive mirror of it, so it never uses zustand's persist middleware.
supabase.auth.onAuthStateChange((_event, session) => {
  useAuthStore.setState({
    session,
    user: session?.user ?? null,
    status: session ? 'signedIn' : 'signedOut',
  })
})
