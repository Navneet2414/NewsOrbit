'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { AuthProvider } from '../context/AuthContext'
import AppShell from './AppShell'

export default function AuthShellWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isAuthPage = pathname === '/login' || pathname === '/signup'

  return (
    <AuthProvider>
      {isAuthPage ? children : <AppShell>{children}</AppShell>}
    </AuthProvider>
  )
}
