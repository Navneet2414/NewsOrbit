'use client'
import RoleGuard from '../../../components/RoleGuard'
import JournalistProfile from '../../../Pages/Auth/JournalistAuth/JournalistProfile'
export default function JournalistProfilePage() {
  return <RoleGuard roles={['journalist']}><JournalistProfile /></RoleGuard>
}
