'use client'
import RoleGuard from '../../../components/RoleGuard'
import UserProfile from '../../../screens/Auth/UserAuth/UserProfile'
export default function UserProfilePage() {
  return <RoleGuard roles={['user']}><UserProfile /></RoleGuard>
}
