'use client'
import RoleGuard from '../../../components/RoleGuard'
import Bookmarks from '../../../screens/Auth/AdminAuth/Bookmarks'
export default function JournalistBookmarksPage() {
  return <RoleGuard roles={['journalist']}><Bookmarks /></RoleGuard>
}
