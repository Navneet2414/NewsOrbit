'use client'

import { FiClock, FiHeart, FiTrendingUp, FiZap } from 'react-icons/fi'
import { NewsItem } from '../../types/news'

const allNews: NewsItem[] = [
  {
    id: 'featured-politics',
    category: 'Politics',
    title: 'City Council Approves New Metro Line Expansion Plan',
    summary: 'The municipal corporation has greenlit a $1.2B metro expansion that will connect the suburbs to the city center.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80',
    author: 'Priya Sharma',
    location: 'Mumbai',
    timeLabel: '7h ago',
    views: 156,
    comments: 87,
    shares: 120,
  },
  {
    id: 'featured-crime',
    category: 'Crime',
    title: 'Police Bust Cybercrime Ring Operating from Tech Hub',
    summary: 'In a major crackdown, the cyber cell arrested 12 suspects involved in a phishing scam that defrauded over 500 victims.',
    image: 'https://images.unsplash.com/photo-1492724441997-5dc865305da4?auto=format&fit=crop&w=900&q=80',
    author: 'Rajesh Kumar',
    location: 'Bengaluru',
    timeLabel: '2h ago',
    views: 390,
    comments: 87,
    shares: 120,
  },
  {
    id: 'featured-events',
    category: 'Events',
    title: 'Annual Cultural Festival to Feature 200+ Artists This Weekend',
    summary: 'The three-day cultural extravaganza will showcase performances from renowned musicians, dancers, and theatre artists.',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    author: 'Yannova Patel',
    location: 'Delhi',
    timeLabel: '5h ago',
    views: 312,
    comments: 45,
    shares: 189,
  },
  {
    id: 'featured-jobs',
    category: 'Jobs',
    title: 'Top IT Firms to Hire 15,000 Freshers in Q2 Recruitment Drive',
    summary: 'Major technology companies have announced a massive hiring push targeting fresh graduates across AI, cloud, and cybersecurity.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80',
    author: 'Vikram Hegde',
    location: 'Hyderabad',
    timeLabel: '1d ago',
    views: 446,
    comments: 39,
    shares: 254,
  },
  {
    id: 'news-4',
    category: 'Politics',
    title: 'Opposition Party Stages Massive Rally Against New Tax Policy',
    summary: 'Thousands gathered at the central park to protest the proposed changes to GST rates on essential commodities.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
    author: 'Deepa Menon',
    location: 'Chennai',
    timeLabel: '20h ago',
    views: 198,
    comments: 112,
    shares: 67,
  },
  {
    id: 'news-6',
    category: 'Events',
    title: 'International Food Festival Returns to City Centre',
    summary: 'Over 80 stalls representing cuisines from 30 countries will be set up across the main promenade for the five-day festival.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=80',
    author: 'Rohan Bose',
    location: 'Bengaluru',
    timeLabel: '6h ago',
    views: 320,
    comments: 72,
    shares: 198,
  },
  {
    id: 'news-7',
    category: 'Jobs',
    title: 'Government Launches Skill Development Portal for Youth',
    summary: 'The new online platform offers free certification courses in 50+ trades to help unemployed youth find placement faster.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
    author: 'Shalini Nair',
    location: 'Delhi',
    timeLabel: '9h ago',
    views: 390,
    comments: 88,
    shares: 210,
  },
  {
    id: 'news-5',
    category: 'Crime',
    title: 'Fraud Ring Targeting Senior Citizens Dismantled',
    summary: 'Authorities arrested a gang of 8 who posed as bank officials to swindle elderly residents out of their savings.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80',
    author: 'Meena Iyer',
    location: 'Kolkata',
    timeLabel: '12h ago',
    views: 134,
    comments: 61,
    shares: 55,
  },
]

const categories = ['Crime', 'Politics', 'Events', 'Jobs']

const accentByCategory: Record<string, string> = {
  Jobs: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  Politics: 'bg-sky-50 text-sky-700 ring-sky-200',
  Crime: 'bg-rose-50 text-rose-700 ring-rose-200',
  Events: 'bg-amber-50 text-amber-800 ring-amber-200',
}

const NewsCard = ({ item }: { item: NewsItem }) => (
  <div className="relative overflow-hidden rounded-[24px] shadow-md group cursor-pointer">
    <img
      src={item.image}
      alt={item.title}
      className="h-48 w-full object-cover transition duration-500 group-hover:scale-[1.03] sm:h-52"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />
    <div className="absolute inset-0 flex flex-col justify-between p-4">
      <span className={`self-start rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ring-1 ${accentByCategory[item.category]}`}>
        {item.category}
      </span>
      <div className="space-y-1.5">
        <h3 className="text-sm font-semibold leading-snug text-white line-clamp-2">{item.title}</h3>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/60">
          <span className="flex items-center gap-1"><FiClock className="h-3 w-3" />{item.timeLabel}</span>
          <span className="flex items-center gap-1"><FiHeart className="h-3 w-3" />{item.views}</span>
          <span>{item.location}</span>
        </div>
      </div>
    </div>
  </div>
)

const TrendingPage: React.FC = () => {
  const categoryTrending = categories.map((cat) => allNews.find((n) => n.category === cat)!)
  const mostLiked = [...allNews].sort((a, b) => b.views - a.views).slice(0, 4)

  return (
    <div className="space-y-10 px-0">
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
          <p className="text-sm font-medium text-slate-500">Hot Right Now — stories everyone's talking about.</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {categoryTrending.map((item) => <NewsCard key={item.id} item={item} />)}
        </div>
      </section>

      {/* Most Liked */}
      <section>
        <div className="mb-2 flex items-center gap-3">
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-white text-rose-500 shadow-sm">
            <FiHeart className="h-5 w-5" />
          </span>
          <h2 className="text-base font-semibold uppercase tracking-[0.24em] text-slate-900">Most Liked</h2>
        </div>
        <div className="mb-5 flex items-center gap-2 pl-1">
          <FiHeart className="h-4 w-4 shrink-0 text-rose-400" />
          <p className="text-sm font-medium text-slate-500">The most talked about stories across all cities.</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {mostLiked.map((item) => <NewsCard key={item.id} item={item} />)}
        </div>
      </section>
    </div>
  )
}

export default TrendingPage
