'use client'
import RoleGuard from '../../../components/RoleGuard'
import Notifications from '../../../screens/Auth/AdminAuth/Notifications'
export default function AdminNotificationsPage() {
  return <RoleGuard roles={['admin']}><Notifications /></RoleGuard>
}
