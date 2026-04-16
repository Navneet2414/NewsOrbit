'use client'
import RoleGuard from '../../../components/RoleGuard'
import Notifications from '../../../screens/Auth/AdminAuth/Notifications'
export default function JournalistNotificationsPage() {
  return <RoleGuard roles={['journalist']}><Notifications /></RoleGuard>
}
