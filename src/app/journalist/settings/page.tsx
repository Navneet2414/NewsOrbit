'use client'
import RoleGuard from '../../../components/RoleGuard'
import Settings from '../../../screens/Auth/AdminAuth/Settings'
export default function JournalistSettingsPage() {
  return <RoleGuard roles={['journalist']}><Settings /></RoleGuard>
}
