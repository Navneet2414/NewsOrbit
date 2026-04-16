'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import NewsCard from './NewsCard'
import { useGetNewsByCategoryQuery, dbNewsToNewsItem } from '../features/news/NewsApi'
import { FiLoader, FiChevronDown } from 'react-icons/fi'

interface FeaturedNewsProps {
  selectedCategory: string
}

const SkeletonCard = () => (
  <div className="animate-pulse overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
    <div className="h-64 bg-slate-200 sm:h-72" />
    <div className="space-y-3 p-5">
      <div className="h-3 w-24 rounded-full bg-slate-200" />
      <div className="h-5 w-full rounded-full bg-slate-200" />
      <div className="h-4 w-3/4 rounded-full bg-slate-200" />
    </div>
  </div>
)

const PAGE_SIZE = 6

const FeaturedNews: React.FC<FeaturedNewsProps> = ({ selectedCategory }) => {
  const [page, setPage] = useState(1)

  // Reset to page 1 when category changes
  useEffect(() => { setPage(1) }, [selectedCategory])

  const category = selectedCategory === 'All News' ? undefined : selectedCategory

  const { data, isLoading, isFetching } = useGetNewsByCategoryQuery({
    page,
    limit: PAGE_SIZE,
    category,
  })

  const news       = data?.data ?? []
  const pagination = data?.pagination
  const hasMore    = pagination?.hasMore ?? false

  if (isLoading) return (
    <section className="space-y-6">
      <div className="animate-pulse h-[480px] w-full rounded-[32px] bg-slate-200" />
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
        {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
      </div>
    </section>
  )

  if (!news.length) return (
    <p className="py-16 text-center text-sm text-slate-400">No news found for this category.</p>
  )

  const featured      = news[0]
  const cards         = news.slice(1)
  const authorName    = typeof featured.authorId === 'object' ? featured.authorId.name : 'NewsOrbit'
  const publishedDate = new Date(featured.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

  return (
    <section className="space-y-6">

      {/* Featured hero card — only show on page 1 */}
      {page === 1 && (
        <Link href={`/news/article/${featured._id}`} className="block relative overflow-hidden rounded-[32px] shadow-2xl cursor-pointer group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={featured.image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1400&q=80'}
            alt={featured.title}
            className="h-[480px] w-full object-cover object-center transition duration-500 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-between p-6">
            <div>
              <span className="rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-red-300 backdrop-blur-sm flex items-center gap-2 w-fit">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
                </span>
                TRENDING
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="font-semibold uppercase tracking-[0.2em] text-sky-400">{featured.category}</span>
                <span className="text-white/60">{featured.city}</span>
                <span className="text-white/40">·</span>
                <span className="text-white/60">{publishedDate}</span>
              </div>
              <h2 className="text-2xl font-semibold text-white sm:text-3xl">{featured.title}</h2>
              <p className="max-w-2xl text-sm leading-7 text-white/75 line-clamp-2">{featured.summary}</p>
              <p className="text-sm text-white/60">{authorName}</p>
            </div>
          </div>
        </Link>
      )}

      {/* News cards grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
        {(page === 1 ? cards : news).map((n) => (
          <NewsCard key={n._id} item={dbNewsToNewsItem(n)} />
        ))}
      </div>

      {/* Pagination info + Load More */}
      {pagination && (
        <div className="flex flex-col items-center gap-3 pt-2">
          <p className="text-xs text-slate-400">
            Showing {Math.min(page * PAGE_SIZE, pagination.total)} of {pagination.total} articles
          </p>
          {hasMore && (
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={isFetching}
              className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:border-slate-300 disabled:opacity-60"
            >
              {isFetching
                ? <><FiLoader className="h-4 w-4 animate-spin" /> Loading…</>
                : <><FiChevronDown className="h-4 w-4" /> Load More</>
              }
            </button>
          )}
        </div>
      )}

    </section>
  )
}

export default FeaturedNews
