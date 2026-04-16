'use client'
import RoleGuard from '../../../components/RoleGuard'
import JournalistDashboard from '../../../screens/Auth/JournalistAuth/JournalistDashboard'
export default function JournalistDashboardPage() {
  return <RoleGuard roles={['journalist']}><JournalistDashboard /></RoleGuard>
}
