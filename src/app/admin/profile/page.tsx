'use client'
import RoleGuard from '../../../components/RoleGuard'
import AdminProfile from '../../../Pages/Auth/AdminAuth/AdminProfile'
export default function AdminProfilePage() {
  return <RoleGuard roles={['admin']}><AdminProfile /></RoleGuard>
}
