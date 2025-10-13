'use client'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export type AuthUser = {
  name: string
  email: string
  city?: string
  country?: string
  isAdmin?: boolean
}

type AuthContextValue = {
  user: AuthUser | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (name: string, email: string, password: string) => Promise<void>
  signOut: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

const STORAGE_KEY = 'dasza_auth_user_v1'

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)

  useEffect(() => {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null
    if (raw) setUser(JSON.parse(raw))
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUser({ name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User', email: session.user.email || '' })
      } else {
        setUser(null)
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    else localStorage.removeItem(STORAGE_KEY)
  }, [user])

  const value = useMemo<AuthContextValue>(() => ({
    user,
    async signIn(email, password) {
      await supabase.auth.signInWithPassword({ email, password })
    },
    async signUp(name, email, password) {
      await supabase.auth.signUp({ email, password, options: { data: { name } } })
    },
    signOut() {
      supabase.auth.signOut()
    },
  }), [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}


