'use client'
import RoleGuard from '../../../components/RoleGuard'
import Bookmarks from '../../../screens/Auth/AdminAuth/Bookmarks'
export default function AdminBookmarksPage() {
  return <RoleGuard roles={['admin']}><Bookmarks /></RoleGuard>
}
