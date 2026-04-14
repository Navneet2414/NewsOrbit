'use client'
import RoleGuard from '../../../components/RoleGuard'
import Settings from '../../../Pages/Auth/AdminAuth/Settings'
export default function JournalistSettingsPage() {
  return <RoleGuard roles={['journalist']}><Settings /></RoleGuard>
}
