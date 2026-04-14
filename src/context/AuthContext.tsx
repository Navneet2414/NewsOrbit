'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

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
  login: (role: NonNullable<Role>) => void
  logout: () => void
}

const MOCK_USERS: Record<NonNullable<Role>, AuthUser> = {
  admin: {
    name: 'Admin User',
    email: 'admin@newsorbit.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
  },
  journalist: {
    name: 'Priya Sharma',
    email: 'priya@newsorbit.com',
    role: 'journalist',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  },
  user: {
    name: 'Guest User',
    email: 'user@newsorbit.com',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
  },
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  login: () => {},
  logout: () => {},
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const login = (role: NonNullable<Role>) => setUser(MOCK_USERS[role])
  const logout = () => setUser(null)
  return (
    <AuthContext.Provider value={{ user, role: user?.role ?? null, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
