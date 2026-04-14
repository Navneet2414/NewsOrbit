'use client'

import { FiMapPin, FiCalendar, FiBookmark, FiUsers, FiUserCheck, FiEdit2 } from 'react-icons/fi'
import { UserProfile } from '../../../types/news'

const user: UserProfile = {
  id: 'user-1',
  name: 'Guest User',
  email: 'guest@newsorbit.com',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
  location: 'Mumbai, India',
  joinedDate: 'January 2024',
  bio: 'Passionate about local news, civic issues, and staying informed about what matters in my city.',
  bookmarks: 24,
  following: 12,
  followers: 38,
}

const recentBookmarks = [
  { id: 'b1', title: 'City Council Approves New Metro Line Expansion Plan', category: 'Politics', timeLabel: '7h ago' },
  { id: 'b2', title: 'Top IT Firms to Hire 15,000 Freshers in Q2 Drive', category: 'Jobs', timeLabel: '1d ago' },
  { id: 'b3', title: 'Annual Cultural Festival to Feature 200+ Artists', category: 'Events', timeLabel: '5h ago' },
]

const accentPill: Record<string, string> = {
  Jobs:     'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100',
  Politics: 'bg-sky-50 text-sky-700 ring-1 ring-sky-100',
  Crime:    'bg-rose-50 text-rose-700 ring-1 ring-rose-100',
  Events:   'bg-amber-50 text-amber-800 ring-1 ring-amber-100',
}

const UserProfilePage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <div className="rounded-[28px] bg-white shadow-sm overflow-hidden">
        {/* Cover */}
        <div className="h-28 bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500" />

        <div className="px-6 pb-6">
          {/* Avatar + Edit */}
          <div className="flex items-end justify-between -mt-10 mb-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="h-20 w-20 rounded-[20px] border-4 border-white object-cover shadow-md"
            />
            <button
              type="button"
              className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <FiEdit2 className="h-3.5 w-3.5" /> Edit Profile
            </button>
          </div>

          <h2 className="text-lg font-bold text-slate-900">{user.name}</h2>
          <p className="text-sm text-slate-500">{user.email}</p>
          <p className="mt-3 text-sm leading-6 text-slate-600">{user.bio}</p>

          <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5"><FiMapPin className="h-3.5 w-3.5 text-slate-400" />{user.location}</span>
            <span className="flex items-center gap-1.5"><FiCalendar className="h-3.5 w-3.5 text-slate-400" />Joined {user.joinedDate}</span>
          </div>

          {/* Stats */}
          <div className="mt-5 grid grid-cols-3 divide-x divide-slate-100 rounded-2xl bg-slate-50 text-center">
            <div className="py-3">
              <p className="text-base font-bold text-slate-900">{user.bookmarks}</p>
              <p className="text-xs text-slate-500 flex items-center justify-center gap-1"><FiBookmark className="h-3 w-3" />Saved</p>
            </div>
            <div className="py-3">
              <p className="text-base font-bold text-slate-900">{user.following}</p>
              <p className="text-xs text-slate-500 flex items-center justify-center gap-1"><FiUsers className="h-3 w-3" />Following</p>
            </div>
            <div className="py-3">
              <p className="text-base font-bold text-slate-900">{user.followers}</p>
              <p className="text-xs text-slate-500 flex items-center justify-center gap-1"><FiUserCheck className="h-3 w-3" />Followers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Bookmarks */}
      <div className="rounded-[28px] bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <FiBookmark className="h-4 w-4 text-sky-500" />
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-900">Recent Bookmarks</h3>
        </div>
        <ul className="space-y-3">
          {recentBookmarks.map((b) => (
            <li key={b.id} className="flex items-start justify-between gap-3 rounded-2xl p-3 transition hover:bg-slate-50 cursor-pointer">
              <div className="space-y-1">
                <p className="text-sm font-medium text-slate-900 line-clamp-2">{b.title}</p>
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] ${accentPill[b.category]}`}>
                    {b.category}
                  </span>
                  <span className="text-xs text-slate-400">{b.timeLabel}</span>
                </div>
              </div>
              <FiBookmark className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default UserProfilePage
