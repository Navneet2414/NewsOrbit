'use client'

import {
  FiBookmark, FiBriefcase, FiCalendar, FiFileText, FiFlag,
  FiGrid, FiHome, FiLock, FiShield, FiTrendingUp, FiUser,
  FiBell, FiUsers, FiEdit, FiLogOut, FiLogIn
} from 'react-icons/fi'
import Image from 'next/image'
import { useAuth, Role } from '../context/AuthContext'
import { useCategory } from '../context/CategoryContext'

interface SidebarProps {
  activeItem: string
  onSelect: (item: string) => void
}

const SECTIONS_BY_ROLE: Record<NonNullable<Role> | 'guest', { title: string; items: string[] }[]> = {
  admin: [
    { title: 'FEED',       items: ['All News', 'Trending'] },
    { title: 'CATEGORIES', items: ['Crime', 'Politics', 'Events', 'Jobs'] },
    { title: 'DASHBOARD',  items: ['My Dashboard', 'Admin Panel'] },
    { title: 'ACCOUNT',    items: ['Profile', 'Journalists', 'Notifications', 'Bookmarks', 'Settings'] },
  ],
  journalist: [
    { title: 'FEED',       items: ['All News', 'Trending'] },
    { title: 'CATEGORIES', items: ['Crime', 'Politics', 'Events', 'Jobs'] },
    { title: 'DASHBOARD',  items: ['My Dashboard'] },
    { title: 'ACCOUNT',    items: ['Profile', 'Notifications', 'Bookmarks', 'Settings'] },
  ],
  user: [
    { title: 'FEED',       items: ['All News', 'Trending'] },
    { title: 'CATEGORIES', items: ['Crime', 'Politics', 'Events', 'Jobs'] },
    { title: 'ACCOUNT',    items: ['My Dashboard', 'Profile', 'Journalists', 'Notifications', 'Bookmarks', 'Settings'] },
  ],
  guest: [
    { title: 'FEED',       items: ['All News', 'Trending'] },
    { title: 'CATEGORIES', items: ['Crime', 'Politics', 'Events', 'Jobs'] },
  ],
}

const iconByItem: Record<string, React.ReactNode> = {
  'All News':     <FiFileText className="h-5 w-5" />,
  Trending:       <FiTrendingUp className="h-5 w-5" />,
  Crime:          <FiShield className="h-5 w-5" />,
  Politics:       <FiFlag className="h-5 w-5" />,
  Events:         <FiCalendar className="h-5 w-5" />,
  Jobs:           <FiBriefcase className="h-5 w-5" />,
  'My Dashboard': <FiGrid className="h-5 w-5" />,
  'Admin Panel':  <FiLock className="h-5 w-5" />,
  Notifications:  <FiBell className="h-5 w-5" />,
  Bookmarks:      <FiBookmark className="h-5 w-5" />,
  Profile:        <FiUser className="h-5 w-5" />,
  Journalists:    <FiUsers className="h-5 w-5" />,
  Settings:       <FiHome className="h-5 w-5" />,
}

const roleBadge: Record<NonNullable<Role>, { label: string; color: string }> = {
  admin:      { label: 'Admin',      color: 'text-red-400' },
  journalist: { label: 'Journalist', color: 'text-emerald-400' },
  user:       { label: 'User',       color: 'text-sky-400' },
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem, onSelect }) => {
  const { user, role, logout } = useAuth()
  const { selected } = useCategory()
  const sections = SECTIONS_BY_ROLE[role ?? 'guest']

  // On homepage, highlight the active category from context
  const effectiveActive = (['Crime','Politics','Events','Jobs','All News'].includes(activeItem))
    ? selected
    : activeItem

  return (
    <aside className="hidden h-dvh w-72 flex-col border-r border-slate-800 bg-slate-950 text-slate-100 lg:flex">
      {/* Logo */}
      <div className="px-6 pt-8">
        <div className="flex items-center gap-4">
          <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-lg shadow-sky-500/10">
            <Image src="/newsorbit_logo.png" alt="NewsOrbit" width={48} height={48} className="h-12 w-12 object-cover" priority />
          </span>
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-white">newsOrbit</h1>
            <p className="text-sm text-slate-400">Your city, your news</p>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-white/5" />

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-6 py-6">
        <div className="space-y-7">
          {sections.map((section) => (
            <div key={section.title}>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-500">{section.title}</p>
              <ul className="space-y-2">
                {section.items.map((item) => (
                    <li key={item}>
                      <button type="button" onClick={() => onSelect(item)}
                        className={`group relative flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-medium outline-none transition focus-visible:ring-2 focus-visible:ring-sky-400/60 ${
                          (item === effectiveActive) ? 'bg-white/10 text-sky-200 ring-1 ring-white/10' : 'text-slate-200 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        {(item === effectiveActive) && <span className="absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-sky-500" />}
                        <span className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border ${
                          (item === effectiveActive) ? 'border-sky-400/20 bg-sky-500/10 text-sky-300' : 'border-white/5 bg-white/5 text-slate-300 group-hover:border-white/10'
                        }`}>
                          {iconByItem[item] ?? <FiFileText className="h-5 w-5" />}
                        </span>
                        <span className={item === effectiveActive ? 'text-sky-200' : 'text-slate-100'}>{item}</span>
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </nav>

      {/* User footer */}
      <div className="border-t border-white/5 px-6 py-5">
        {user ? (
          <div className="flex items-center gap-3">
            <img src={user.avatar} alt={user.name} className="h-10 w-10 shrink-0 rounded-2xl object-cover" />
            <div className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold text-slate-100">{user.name}</span>
              <span className={`block truncate text-xs font-semibold ${roleBadge[role!].color}`}>{roleBadge[role!].label}</span>
            </div>
            <button type="button" onClick={() => logout()} title="Sign out"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-400 transition hover:bg-white/10 hover:text-white">
              <FiLogOut className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button type="button" onClick={() => onSelect('Login')}
            className="flex w-full items-center gap-3 rounded-3xl bg-white/5 p-3 text-left ring-1 ring-white/10 transition hover:bg-white/10">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-slate-300">
              <FiLogIn className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold text-slate-100">Sign In</span>
              <span className="block truncate text-xs text-slate-400">Access your account</span>
            </span>
          </button>
        )}
      </div>
    </aside>
  )
}

export default Sidebar
