'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { store } from '../store/store'
import { setAdminCredentials, clearAdminCredentials } from '../features/admin/adminauth'
import { setJournalistCredentials, clearJournalistCredentials } from '../features/journalist/journalistAuth'
import { setUserCredentials, clearUserCredentials } from '../features/user/userAuth'

export type Role = 'admin' | 'journalist' | 'user' | null

export interface AuthUser {
  name: string
  email: string
  role: Role
  avatar: string
}

interface AuthContextType {
  user: AuthUser | null
  role: Role
  loginWithCredentials: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  loginWithCredentials: async () => {},
  logout: async () => {},
})

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api/v1'

const ROLE_ENDPOINTS: Record<string, string> = {
  'admin@newsorbit.com':      `${API}/admin/login`,
  'priya@newsorbit.com':      `${API}/journalist/login`,
  'user@newsorbit.com':       `${API}/users/login`,
}

// Fallback: try all three endpoints in order
const ALL_ENDPOINTS = [
  { url: `${API}/admin/login`,      role: 'admin' as Role },
  { url: `${API}/journalist/login`, role: 'journalist' as Role },
  { url: `${API}/users/login`,      role: 'user' as Role },
]

const AVATARS: Record<NonNullable<Role>, string> = {
  admin:      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
  journalist: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  user:       'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null)

  const loginWithCredentials = async (email: string, password: string) => {
    const knownEndpoint = ROLE_ENDPOINTS[email.toLowerCase()]
    const endpoints = knownEndpoint
      ? [{ url: knownEndpoint, role: ALL_ENDPOINTS.find(e => e.url === knownEndpoint)?.role ?? null }]
      : ALL_ENDPOINTS

    let lastError = 'Invalid email or password.'

    for (const endpoint of endpoints) {
      try {
        const res = await fetch(endpoint.url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        })
        const json = await res.json()
        if (!res.ok || !json.success) { lastError = json.message ?? lastError; continue }

        const { token, data } = json
        const role = (data.role ?? endpoint.role) as NonNullable<Role>

        if (role === 'admin') {
          store.dispatch(setAdminCredentials({ token, admin: data }))
        } else if (role === 'journalist') {
          store.dispatch(setJournalistCredentials({ token, journalist: data }))
        } else {
          store.dispatch(setUserCredentials({ token, user: data }))
        }

        setUser({ name: data.name, email: data.email, role, avatar: AVATARS[role] })
        return
      } catch {
        continue
      }
    }

    throw new Error(lastError)
  }

  const logout = async () => {
    const state = store.getState()
    const token = state.adminAuth.token ?? state.journalistAuth.token ?? state.userAuth.token
    const role  = user?.role

    if (token && role) {
      const urlMap: Record<NonNullable<Role>, string> = {
        admin:      `${API}/admin/logout`,
        journalist: `${API}/journalist/logout`,
        user:       `${API}/users/logout`,
      }
      try {
        await fetch(urlMap[role], {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        })
      } catch { /* ignore network errors on logout */ }
    }

    store.dispatch(clearAdminCredentials())
    store.dispatch(clearJournalistCredentials())
    store.dispatch(clearUserCredentials())
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, role: user?.role ?? null, loginWithCredentials, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
