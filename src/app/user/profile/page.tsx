'use client'
import RoleGuard from '../../../components/RoleGuard'
import UserProfile from '../../../Pages/Auth/UserAuth/UserProfile'
export default function UserProfilePage() {
  return <RoleGuard roles={['user']}><UserProfile /></RoleGuard>
}
