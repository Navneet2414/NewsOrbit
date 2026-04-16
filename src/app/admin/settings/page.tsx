'use client'
import RoleGuard from '../../../components/RoleGuard'
import Settings from '../../../screens/Auth/AdminAuth/Settings'
export default function AdminSettingsPage() {
  return <RoleGuard roles={['admin']}><Settings /></RoleGuard>
}
