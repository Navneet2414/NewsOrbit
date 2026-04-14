'use client'
import RoleGuard from '../../../components/RoleGuard'
import Settings from '../../../Pages/Auth/AdminAuth/Settings'
export default function UserSettingsPage() {
  return <RoleGuard roles={['user']}><Settings /></RoleGuard>
}
