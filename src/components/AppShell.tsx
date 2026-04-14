'use client'

import { ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import { useAuth } from '../context/AuthContext'

const PATH_TO_ITEM: Record<string, string> = {
  '/':                        'All News',
  '/trending':                'Trending',
  '/news/crime':              'Crime',
  '/news/politics':           'Politics',
  '/news/events':             'Events',
  '/news/jobs':               'Jobs',
  '/journalists':             'Journalists',
  '/admin/dashboard':         'My Dashboard',
  '/admin/panel':             'Admin Panel',
  '/admin/profile':           'Profile',
  '/admin/bookmarks':         'Bookmarks',
  '/admin/notifications':     'Notifications',
  '/admin/settings':          'Settings',
  '/journalist/dashboard':    'My Dashboard',
  '/journalist/profile':      'Profile',
  '/journalist/bookmarks':    'Bookmarks',
  '/journalist/notifications':'Notifications',
  '/journalist/settings':     'Settings',
  '/user/dashboard':          'My Dashboard',
  '/user/profile':            'Profile',
  '/user/bookmarks':          'Bookmarks',
  '/user/notifications':      'Notifications',
  '/user/settings':           'Settings',
}

const ITEM_TO_PATH = (item: string, role: string | null): string => {
  const map: Record<string, string> = {
    'All News':     '/',
    'Trending':     '/trending',
    'Crime':        '/news/crime',
    'Politics':     '/news/politics',
    'Events':       '/news/events',
    'Jobs':         '/news/jobs',
    'Journalists':  '/journalists',
    'My Dashboard': role === 'admin' ? '/admin/dashboard' : role === 'journalist' ? '/journalist/dashboard' : '/user/dashboard',
    'Admin Panel':  '/admin/panel',
    'Profile':      role === 'admin' ? '/admin/profile' : role === 'journalist' ? '/journalist/profile' : '/user/profile',
    'Bookmarks':    role === 'admin' ? '/admin/bookmarks' : role === 'journalist' ? '/journalist/bookmarks' : '/user/bookmarks',
    'Notifications':role === 'admin' ? '/admin/notifications' : role === 'journalist' ? '/journalist/notifications' : '/user/notifications',
    'Settings':     role === 'admin' ? '/admin/settings' : role === 'journalist' ? '/journalist/settings' : '/user/settings',
  }
  return map[item] ?? '/'
}

export default function AppShell({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { role } = useAuth()

  const activeItem = PATH_TO_ITEM[pathname] ?? 'All News'

  const handleSelect = (item: string) => {
    if (item === 'Login') { router.push('/login'); return }
    router.push(ITEM_TO_PATH(item, role))
  }

  return (
    <div className="grid h-dvh grid-cols-1 lg:grid-cols-[18rem_1fr]">
      <Sidebar activeItem={activeItem} onSelect={handleSelect} />
      <div className="grid h-dvh grid-rows-[auto_1fr] bg-slate-100">
        <TopBar onSignIn={() => router.push('/login')} />
        <div className="h-full overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
