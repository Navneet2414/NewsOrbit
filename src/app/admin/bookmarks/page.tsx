'use client'
import RoleGuard from '../../../components/RoleGuard'
import Bookmarks from '../../../Pages/Auth/AdminAuth/Bookmarks'
export default function AdminBookmarksPage() {
  return <RoleGuard roles={['admin']}><Bookmarks /></RoleGuard>
}
