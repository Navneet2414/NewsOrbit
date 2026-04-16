'use client'

import NewsCard from '../NewsCard'
import { useGetNewsByCategoryQuery, dbNewsToNewsItem } from '../../features/news/NewsApi'
import { FiLoader } from 'react-icons/fi'

const accentPill: Record<string, string> = {
  Jobs:     'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100',
  Politics: 'bg-sky-50 text-sky-700 ring-1 ring-sky-100',
  Crime:    'bg-rose-50 text-rose-700 ring-1 ring-rose-100',
  Events:   'bg-amber-50 text-amber-800 ring-1 ring-amber-100',
}

const categoryLabel: Record<string, string> = {
  Crime:    'Latest Crime Reports',
  Politics: 'Political Updates',
  Events:   'Upcoming & Recent Events',
  Jobs:     'Job & Career News',
}

const SkeletonCard = () => (
  <div className="animate-pulse overflow-hidden rounded-[28px] border border-slate-200 bg-white">
    <div className="h-48 bg-slate-200" />
    <div className="space-y-3 p-4">
      <div className="h-3 w-20 rounded-full bg-slate-200" />
      <div className="h-4 w-full rounded-full bg-slate-200" />
      <div className="h-3 w-2/3 rounded-full bg-slate-200" />
    </div>
  </div>
)

interface CategoryNewsProps {
  category: string
}

const CategoryNews: React.FC<CategoryNewsProps> = ({ category }) => {
  const { data, isLoading, isFetching } = useGetNewsByCategoryQuery({
    page: 1,
    limit: 6,
    category,
  })

  const items = (data?.data ?? []).map(dbNewsToNewsItem)
  const hasMore = data?.pagination?.hasMore ?? false

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <span className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] ${accentPill[category]}`}>
          {category}
        </span>
        <h2 className="text-base font-semibold text-slate-900">{categoryLabel[category]}</h2>
        {isFetching && <FiLoader className="h-4 w-4 animate-spin text-slate-400" />}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : items.length === 0 ? (
        <p className="py-8 text-center text-sm text-slate-400">No {category} news available.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {items.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
          {hasMore && (
            <div className="text-center">
              <p className="text-xs text-slate-400">
                Showing {items.length} of {data?.pagination?.total} articles
              </p>
            </div>
          )}
        </>
      )}
    </section>
  )
}

export default CategoryNews
