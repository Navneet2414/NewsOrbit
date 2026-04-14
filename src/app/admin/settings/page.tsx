'use client'
import RoleGuard from '../../../components/RoleGuard'
import Settings from '../../../Pages/Auth/AdminAuth/Settings'
export default function AdminSettingsPage() {
  return <RoleGuard roles={['admin']}><Settings /></RoleGuard>
}
