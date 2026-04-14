'use client'
import RoleGuard from '../../../components/RoleGuard'
import Notifications from '../../../Pages/Auth/AdminAuth/Notifications'
export default function UserNotificationsPage() {
  return <RoleGuard roles={['user']}><Notifications /></RoleGuard>
}
