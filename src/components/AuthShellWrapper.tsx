'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { AuthProvider } from '../context/AuthContext'
import { CategoryProvider } from '../context/CategoryContext'
import AppShell from './AppShell'

export default function AuthShellWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isAuthPage = pathname === '/login' || pathname === '/signup'

  return (
    <AuthProvider>
      <CategoryProvider>
        {isAuthPage ? children : <AppShell>{children}</AppShell>}
      </CategoryProvider>
    </AuthProvider>
  )
}
