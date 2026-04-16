'use client'

import { useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth, Role } from '../context/AuthContext'

export default function RoleGuard({ roles, children }: { roles: NonNullable<Role>[]; children: ReactNode }) {
  const { role } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!role || !roles.includes(role)) router.replace('/login')
  }, [role, roles, router])

  if (!role || !roles.includes(role)) return null
  return <>{children}</>
}
