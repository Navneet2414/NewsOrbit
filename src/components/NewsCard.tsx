import { NewsItem } from '../types/news'
import { FiClock, FiHeart, FiMessageCircle, FiShare2 } from 'react-icons/fi'

interface NewsCardProps {
  item: NewsItem
}

const NewsCard: React.FC<NewsCardProps> = ({ item }) => {
  const accentByCategory: Record<
    string,
    { badge: string; title: string; icon: string; pill: string }
  > = {
    Jobs: {
      badge: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
      title: 'text-slate-900',
      icon: 'text-emerald-600',
      pill: 'bg-emerald-50 text-emerald-700 ring-emerald-100'
    },
    Politics: {
      badge: 'bg-sky-50 text-sky-700 ring-sky-100',
      title: 'text-slate-900',
      icon: 'text-sky-600',
      pill: 'bg-sky-50 text-sky-700 ring-sky-100'
    },
    Crime: {
      badge: 'bg-rose-50 text-rose-700 ring-rose-100',
      title: 'text-slate-900',
      icon: 'text-rose-600',
      pill: 'bg-rose-50 text-rose-700 ring-rose-100'
    },
    Events: {
      badge: 'bg-amber-50 text-amber-800 ring-amber-100',
      title: 'text-slate-900',
      icon: 'text-amber-600',
      pill: 'bg-amber-50 text-amber-800 ring-amber-100'
    }
  }

  const accent = accentByCategory[item.category] ?? {
    badge: 'bg-slate-50 text-slate-700 ring-slate-100',
    title: 'text-slate-900',
    icon: 'text-slate-500',
    pill: 'bg-slate-50 text-slate-700 ring-slate-100'
  }

  return (
    <article className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="h-64 w-full object-cover object-center transition duration-500 group-hover:scale-[1.03] sm:h-72"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/10 via-transparent to-transparent" />
      </div>

      <div className="space-y-4 p-5">
        <div className="flex flex-wrap items-center gap-3">
          <span className={`inline-flex items-center rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] ring-1 ${accent.pill}`}>
            {item.category}
          </span>
          <span className="inline-flex items-center gap-2 text-sm text-slate-500">
            <FiClock className={`h-4 w-4 ${accent.icon}`} />
            {item.timeLabel}
          </span>
        </div>

        <h3 className={`text-lg font-semibold leading-snug ${accent.title} line-clamp-2`}>{item.title}</h3>
        <p className="text-sm leading-7 text-slate-600 line-clamp-2">{item.summary}</p>

        <div className="flex items-center justify-between gap-4 pt-2 text-sm text-slate-600">
          <div className="min-w-0">
            <span className="font-medium text-slate-900">{item.author}</span>
            <span className="mx-2 text-slate-300">·</span>
            <span className="text-slate-500">{item.location}</span>
          </div>
          <div className="flex shrink-0 items-center gap-4 text-slate-500">
            <span className="inline-flex items-center gap-2">
              <FiHeart className={`h-4 w-4 ${accent.icon}`} />
              {item.views}
            </span>
            <span className="inline-flex items-center gap-2">
              <FiMessageCircle className="h-4 w-4" />
              {item.comments}
            </span>
            <span className="inline-flex items-center gap-2">
              <FiShare2 className="h-4 w-4" />
              {item.shares}
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}

export default NewsCard
