'use client'

import Link from 'next/link'
import { FiClock, FiEye, FiHeart, FiTrendingUp, FiZap, FiMessageCircle } from 'react-icons/fi'
import { useGetPublicNewsQuery, DBNewsItem } from '../../features/news/NewsApi'

const accentByCategory: Record<string, string> = {
  Jobs:     'bg-emerald-50 text-emerald-700 ring-emerald-200',
  Politics: 'bg-sky-50 text-sky-700 ring-sky-200',
  Crime:    'bg-rose-50 text-rose-700 ring-rose-200',
  Events:   'bg-amber-50 text-amber-800 ring-amber-200',
}

const SkeletonCard = () => (
  <div className="animate-pulse overflow-hidden rounded-[24px] bg-white shadow-md">
    <div className="h-48 bg-slate-200" />
    <div className="space-y-2 p-4">
      <div className="h-3 w-20 rounded-full bg-slate-200" />
      <div className="h-4 w-full rounded-full bg-slate-200" />
      <div className="h-3 w-2/3 rounded-full bg-slate-200" />
    </div>
  </div>
)

const DBNewsCard = ({ item }: { item: DBNewsItem }) => {
  const accent = accentByCategory[item.category] ?? 'bg-slate-50 text-slate-700 ring-slate-200'
  const timeLabel = new Date(item.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })

  return (
    <Link href={`/news/article/${item._id}`}
      className="group cursor-pointer overflow-hidden rounded-[24px] bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl block">
      <div className="overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80'}
          alt={item.title}
          className="h-48 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-center gap-2">
          <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ring-1 ${accent}`}>
            {item.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-slate-400">
            <FiClock className="h-3 w-3" />{timeLabel}
          </span>
        </div>
        <h3 className="text-sm font-semibold leading-snug text-slate-900 line-clamp-2 group-hover:text-sky-600 transition">{item.title}</h3>
        <p className="text-xs leading-5 text-slate-500 line-clamp-2">{item.summary}</p>
        <div className="flex items-center gap-3 pt-1 text-xs text-slate-400">
          <span className="flex items-center gap-1"><FiEye className="h-3 w-3" />{item.views ?? 0}</span>
          <span className="flex items-center gap-1"><FiMessageCircle className="h-3 w-3" />{item.comments ?? 0}</span>
          <span className="ml-auto">{item.city}</span>
        </div>
      </div>
    </Link>
  )
}

const CATEGORIES = ['Crime', 'Politics', 'Events', 'Jobs']

const TrendingPage: React.FC = () => {
  const { data, isLoading } = useGetPublicNewsQuery({ page: 1, limit: 20 })
  const allNews = data?.data ?? []

  // One per category for "Trending Now"
  const categoryTrending = CATEGORIES
    .map((cat) => allNews.find((n) => n.category === cat))
    .filter(Boolean) as DBNewsItem[]

  // Top 4 by views for "Most Liked"
  const mostLiked = [...allNews].sort((a, b) => (b.views ?? 0) - (a.views ?? 0)).slice(0, 4)

  return (
    <div className="space-y-10">

      {/* Trending Now */}
      <section>
        <div className="mb-2 flex items-center gap-3">
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-white text-orange-500 shadow-sm">
            <FiTrendingUp className="h-5 w-5" />
          </span>
          <h2 className="text-base font-semibold uppercase tracking-[0.24em] text-slate-900">Trending Now</h2>
        </div>
        <div className="mb-5 flex items-center gap-2 pl-1">
          <FiZap className="h-4 w-4 shrink-0 text-orange-400" />
          <p className="text-sm font-medium text-slate-500">Hot Right Now — stories everyone&apos;s talking about.</p>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categoryTrending.map((item) => <DBNewsCard key={item._id} item={item} />)}
          </div>
        )}
      </section>

      {/* Most Liked */}
      <section>
        <div className="mb-2 flex items-center gap-3">
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-white text-rose-500 shadow-sm">
            <FiHeart className="h-5 w-5" />
          </span>
          <h2 className="text-base font-semibold uppercase tracking-[0.24em] text-slate-900">Most Viewed</h2>
        </div>
        <div className="mb-5 flex items-center gap-2 pl-1">
          <FiHeart className="h-4 w-4 shrink-0 text-rose-400" />
          <p className="text-sm font-medium text-slate-500">The most viewed stories across all cities.</p>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mostLiked.map((item) => <DBNewsCard key={item._id} item={item} />)}
          </div>
        )}
      </section>

    </div>
  )
}

export default TrendingPage
