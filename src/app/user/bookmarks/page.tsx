'use client'
import RoleGuard from '../../../components/RoleGuard'
import Bookmarks from '../../../Pages/Auth/AdminAuth/Bookmarks'
export default function UserBookmarksPage() {
  return <RoleGuard roles={['user']}><Bookmarks /></RoleGuard>
}
