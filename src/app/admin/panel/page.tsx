'use client'
import RoleGuard from '../../../components/RoleGuard'
import AdminPanel from '../../../screens/Auth/AdminAuth/AdminPanel'
export default function AdminPanelPage() {
  return <RoleGuard roles={['admin']}><AdminPanel /></RoleGuard>
}
