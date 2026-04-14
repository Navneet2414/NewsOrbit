'use client'

import NewsCard from '../NewsCard'
import { NewsItem } from '../../types/news'

const allNews: NewsItem[] = [
  {
    id: 'featured-politics',
    category: 'Politics',
    title: 'City Council Approves New Metro Line Expansion Plan',
    summary: 'The municipal corporation has greenlit a $1.2B metro expansion that will connect the suburbs to the city center, expected to reduce commute times by 40%.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80',
    author: 'Priya Sharma',
    location: 'Mumbai',
    timeLabel: '7h ago',
    views: 156,
    comments: 87,
    shares: 120,
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
    id: 'news-8',
    category: 'Politics',
    title: 'State Budget Allocates ₹800 Crore for Rural Infrastructure',
    summary: 'The finance minister announced major spending on roads, water supply, and digital connectivity for underserved villages.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80',
    author: 'Arjun Pillai',
    location: 'Thiruvananthapuram',
    timeLabel: '14h ago',
    views: 245,
    comments: 93,
    shares: 78,
  },
  {
    id: 'featured-crime',
    category: 'Crime',
    title: 'Police Bust Cybercrime Ring Operating from Tech Hub',
    summary: 'In a major crackdown, the cyber cell arrested 12 suspects involved in a phishing scam that defrauded over 500 victims across the city.',
    image: 'https://images.unsplash.com/photo-1492724441997-5dc865305da4?auto=format&fit=crop&w=900&q=80',
    author: 'Rajesh Kumar',
    location: 'Bengaluru',
    timeLabel: '2h ago',
    views: 390,
    comments: 87,
    shares: 120,
  },
  {
    id: 'news-1',
    category: 'Crime',
    title: 'Night Patrol Units Increased After Robbery Spree in Old Town',
    summary: 'Police have deployed additional patrol units and CCTV monitoring after a series of break-ins reported in the heritage district.',
    image: 'https://images.unsplash.com/photo-1494522358652-9ca98b1c3869?auto=format&fit=crop&w=900&q=80',
    author: 'Suresh Raina',
    location: 'Jaipur',
    timeLabel: '8h ago',
    views: 89,
    comments: 46,
    shares: 42,
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
  {
    id: 'featured-events',
    category: 'Events',
    title: 'Annual Cultural Festival to Feature 200+ Artists This Weekend',
    summary: 'The three-day cultural extravaganza will showcase performances from renowned musicians, dancers, and theatre artists from across the country.',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    author: 'Yannova Patel',
    location: 'Delhi',
    timeLabel: '5h ago',
    views: 312,
    comments: 45,
    shares: 189,
  },
  {
    id: 'news-2',
    category: 'Events',
    title: 'City Marathon Draws Record 20,000 Participants',
    summary: "This year's annual city marathon saw unprecedented participation with runners from 15 countries competing across multiple categories.",
    image: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=900&q=80',
    author: 'Anita Desai',
    location: 'Mumbai',
    timeLabel: '3h ago',
    views: 210,
    comments: 58,
    shares: 134,
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
    id: 'featured-jobs',
    category: 'Jobs',
    title: 'Top IT Firms to Hire 15,000 Freshers in Q2 Recruitment Drive',
    summary: 'Major technology companies have announced a massive hiring push targeting fresh graduates, with roles spanning AI, cloud, and cybersecurity.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80',
    author: 'Vikram Hegde',
    location: 'Hyderabad',
    timeLabel: '1d ago',
    views: 446,
    comments: 39,
    shares: 254,
  },
  {
    id: 'news-3',
    category: 'Jobs',
    title: 'Startup Ecosystem Sees Record ₹5,000 Crore Investment in March',
    summary: 'The local startup scene witnessed unprecedented growth with multiple unicorn valuations and cross-border investment deals.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=900&q=80',
    author: 'Karan Mehta',
    location: 'Pune',
    timeLabel: '5h ago',
    views: 278,
    comments: 34,
    shares: 90,
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
]

const categoryLabel: Record<string, string> = {
  Crime:    'Latest Crime Reports',
  Politics: 'Political Updates',
  Events:   'Upcoming & Recent Events',
  Jobs:     'Job & Career News',
}

const accentPill: Record<string, string> = {
  Jobs:     'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100',
  Politics: 'bg-sky-50 text-sky-700 ring-1 ring-sky-100',
  Crime:    'bg-rose-50 text-rose-700 ring-1 ring-rose-100',
  Events:   'bg-amber-50 text-amber-800 ring-1 ring-amber-100',
}

interface CategoryNewsProps {
  category: string
}

const CategoryNews: React.FC<CategoryNewsProps> = ({ category }) => {
  const items = allNews.filter((n) => n.category === category)

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <span className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] ${accentPill[category]}`}>
          {category}
        </span>
        <h2 className="text-base font-semibold text-slate-900">{categoryLabel[category]}</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {items.map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}

export default CategoryNews
