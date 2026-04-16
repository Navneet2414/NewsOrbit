'use client'
import RoleGuard from '../../../components/RoleGuard'
import JournalistProfile from '../../../screens/Auth/JournalistAuth/JournalistProfile'
export default function JournalistProfilePage() {
  return <RoleGuard roles={['journalist']}><JournalistProfile /></RoleGuard>
}
