'use client'
import RoleGuard from '../../../components/RoleGuard'
import Settings from '../../../screens/Auth/AdminAuth/Settings'
export default function UserSettingsPage() {
  return <RoleGuard roles={['user']}><Settings /></RoleGuard>
}
