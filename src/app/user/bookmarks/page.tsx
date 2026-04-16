'use client'
import RoleGuard from '../../../components/RoleGuard'
import Bookmarks from '../../../screens/Auth/AdminAuth/Bookmarks'
export default function UserBookmarksPage() {
  return <RoleGuard roles={['user']}><Bookmarks /></RoleGuard>
}
