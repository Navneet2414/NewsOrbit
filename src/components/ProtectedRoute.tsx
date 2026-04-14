'use client'

import { ReactNode } from 'react'
import { FiLock } from 'react-icons/fi'
import { useAuth, Role } from '../context/AuthContext'

interface ProtectedRouteProps {
  allowedRoles: NonNullable<Role>[]
  children: ReactNode
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const { role } = useAuth()

  if (!role || !allowedRoles.includes(role)) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50 p-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50">
          <FiLock className="h-7 w-7 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Access Denied</h2>
        <p className="max-w-sm text-sm text-gray-500">
          You don't have permission to view this page.
          {!role && ' Please sign in to continue.'}
        </p>
        <p className="rounded-full bg-slate-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-slate-500">
          Required: {allowedRoles.join(' or ')}
        </p>
      </div>
    )
  }

  return <>{children}</>
}

export default ProtectedRoute
