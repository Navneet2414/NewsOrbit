'use client'
import RoleGuard from '../../../components/RoleGuard'
import Notifications from '../../../screens/Auth/AdminAuth/Notifications'
export default function UserNotificationsPage() {
  return <RoleGuard roles={['user']}><Notifications /></RoleGuard>
}
