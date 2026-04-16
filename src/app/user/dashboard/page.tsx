'use client'
import RoleGuard from '../../../components/RoleGuard'
import UserDashboard from '../../../screens/Auth/UserAuth/UserDashboard'
export default function UserDashboardPage() {
  return <RoleGuard roles={['user']}><UserDashboard /></RoleGuard>
}
