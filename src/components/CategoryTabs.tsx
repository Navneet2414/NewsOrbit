'use client'

import { useRouter, usePathname } from 'next/navigation'

const TABS = [
  { label: 'All News',  path: '/' },
  { label: 'Crime',     path: '/news/crime' },
  { label: 'Politics',  path: '/news/politics' },
  { label: 'Events',    path: '/news/events' },
  { label: 'Jobs',      path: '/news/jobs' },
]

const accentActive: Record<string, string> = {
  'All News': 'bg-slate-900 text-white shadow-md',
  Crime:      'bg-rose-600 text-white shadow-md',
  Politics:   'bg-sky-600 text-white shadow-md',
  Events:     'bg-amber-500 text-white shadow-md',
  Jobs:       'bg-emerald-600 text-white shadow-md',
}

const accentDot: Record<string, string> = {
  Crime:    'bg-rose-500',
  Politics: 'bg-sky-500',
  Events:   'bg-amber-400',
  Jobs:     'bg-emerald-500',
}

const CategoryTabs: React.FC = () => {
  const router   = useRouter()
  const pathname = usePathname()

  const activeLabel = TABS.find((t) => t.path === pathname)?.label ?? 'All News'

  return (
    <div className="mb-8 flex flex-wrap gap-2">
      {TABS.map(({ label, path }) => {
        const isActive = label === activeLabel
        return (
          <button
            key={label}
            type="button"
            onClick={() => router.push(path)}
            className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
              isActive
                ? accentActive[label] ?? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-600 shadow-sm hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            {label !== 'All News' && (
              <span className={`h-2 w-2 rounded-full ${isActive ? 'bg-white/70' : accentDot[label]}`} />
            )}
            {label}
          </button>
        )
      })}
    </div>
  )
}

export default CategoryTabs
