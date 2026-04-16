'use client'

import { FiArrowUpRight, FiTrendingUp } from 'react-icons/fi'
import { TrendingItem } from '../types/news'
import { useGetPublicNewsQuery } from '../features/news/NewsApi'

const staticTrending: TrendingItem[] = [
  { id: 't1', title: 'City Council Approves New Metro Line Expansion Plan', location: 'Mumbai', timeLabel: '2h ago', likes: 234 },
  { id: 't2', title: 'Police Bust Cybercrime Ring Operating from Tech Hub', location: 'Bengaluru', timeLabel: '3h ago', likes: 156 },
  { id: 't3', title: 'Top IT Firms to Hire 15,000 Freshers in Q2 Recruitment Drive', location: 'Hyderabad', timeLabel: '4h ago', likes: 445 },
]

const TrendingPanel: React.FC = () => {
  const { data: newsPage } = useGetPublicNewsQuery({ page: 1, limit: 10 })
  const dbNews = newsPage?.data ?? []

  const dbTrending: TrendingItem[] = dbNews.map((n) => ({
    id:        n._id,
    title:     n.title,
    location:  n.city,
    timeLabel: new Date(n.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
    likes:     n.views ?? 0,
  }))

  // DB news first, then static, cap at 5
  const trendingItems = [...dbTrending, ...staticTrending].slice(0, 5)

  return (
    <aside className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-50 text-orange-500">
          <FiTrendingUp className="h-5 w-5" />
        </span>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-900">Trending Now</p>
      </div>

      <ul className="space-y-4">
        {trendingItems.map((item, index) => (
          <li key={item.id}>
            <button
              type="button"
              className="group flex w-full items-start justify-between gap-4 rounded-3xl p-3 text-left transition hover:bg-slate-50"
            >
              <div className="flex items-start gap-4">
                <span className="mt-0.5 text-3xl font-semibold text-slate-200 tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="space-y-1">
                  <h4 className="font-semibold leading-snug text-slate-900 line-clamp-2">{item.title}</h4>
                  <p className="text-sm text-slate-500">{item.location} · {item.likes ?? 0} views</p>
                </div>
              </div>
              <span className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-transparent text-slate-300 transition group-hover:border-slate-200 group-hover:bg-white group-hover:text-slate-500">
                <FiArrowUpRight className="h-4 w-4" />
              </span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default TrendingPanel
