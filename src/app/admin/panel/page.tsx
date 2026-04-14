'use client'
import RoleGuard from '../../../components/RoleGuard'
import AdminPanel from '../../../Pages/Auth/AdminAuth/AdminPanel'
export default function AdminPanelPage() {
  return <RoleGuard roles={['admin']}><AdminPanel /></RoleGuard>
}
