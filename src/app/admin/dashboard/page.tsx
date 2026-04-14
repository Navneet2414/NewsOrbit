'use client'
import RoleGuard from '../../../components/RoleGuard'
import Dashboard from '../../../Pages/Auth/AdminAuth/Dashboard'
export default function AdminDashboardPage() {
  return <RoleGuard roles={['admin']}><Dashboard /></RoleGuard>
}
