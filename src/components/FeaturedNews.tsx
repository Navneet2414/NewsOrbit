'use client'

import NewsCard from './NewsCard'
import { NewsItem } from '../types/news'

const allNewsItems: NewsItem[] = [
  {
    id: 'featured-politics',
    category: 'Politics',
    title: 'City Council Approves New Metro Line Expansion Plan',
    summary: 'The municipal corporation has greenlit a $1.2B metro expansion that will connect the suburbs to the city center, expected to reduce commute times by 40%.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1400&q=80',
    author: 'Priya Sharma',
    location: 'Mumbai',
    timeLabel: '7h ago',
    views: 156,
    comments: 87,
    shares: 120,
    featured: true
  },
  {
    id: 'featured-crime',
    category: 'Crime',
    title: 'Police Bust Cybercrime Ring Operating from Tech Hub',
    summary: 'In a major crackdown, the cyber cell arrested 12 suspects involved in a phishing scam that defrauded over 500 victims across the city.',
    image: 'https://images.unsplash.com/photo-1492724441997-5dc865305da4?auto=format&fit=crop&w=1400&q=80',
    author: 'Rajesh Kumar',
    location: 'Bengaluru',
    timeLabel: '2h ago',
    views: 156,
    comments: 87,
    shares: 120,
    featured: true
  },
  {
    id: 'featured-events',
    category: 'Events',
    title: 'Annual Cultural Festival to Feature 200+ Artists This Weekend',
    summary: 'The three-day cultural extravaganza will showcase performances from renowned musicians, dancers, and theatre artists from across the country.',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80',
    author: 'Yannova Patel',
    location: 'Delhi',
    timeLabel: '5h ago',
    views: 312,
    comments: 45,
    shares: 189,
    featured: true
  },
  {
    id: 'featured-jobs',
    category: 'Jobs',
    title: 'Top IT Firms to Hire 15,000 Freshers in Q2 Recruitment Drive',
    summary: 'Major technology companies have announced a massive hiring push targeting fresh graduates, with roles spanning AI, cloud, and cybersecurity.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=80',
    author: 'Vikram Hegde',
    location: 'Hyderabad',
    timeLabel: '1d ago',
    views: 446,
    comments: 39,
    shares: 254,
    featured: true
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
    shares: 42
  },
  {
    id: 'news-2',
    category: 'Events',
    title: 'City Marathon Draws Record 20,000 Participants',
    summary: 'This year\'s annual city marathon saw unprecedented participation with runners from 15 countries competing across multiple categories.',
    image: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=900&q=80',
    author: 'Anita Desai',
    location: 'Mumbai',
    timeLabel: '3h ago',
    views: 210,
    comments: 58,
    shares: 134
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
    shares: 90
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
    shares: 67
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
    shares: 55
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
    shares: 198
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
    shares: 210
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
    shares: 78
  }
]

interface FeaturedNewsProps {
  selectedCategory: string
}

const FeaturedNews: React.FC<FeaturedNewsProps> = ({ selectedCategory }) => {
  const isAll = selectedCategory === 'All News'

  const categoryItems = isAll ? allNewsItems : allNewsItems.filter((n) => n.category === selectedCategory)

  // Pick featured: prefer flagged featured item, else first in category
  const featuredStory =
    categoryItems.find((n) => n.featured) ?? categoryItems[0]

  // Cards: rest after excluding the featured story
  const cardItems = featuredStory
    ? categoryItems.filter((n) => n.id !== featuredStory.id)
    : []

  if (!featuredStory) return null

  return (
    <section className="space-y-6">
      <div className="space-y-6">
        {/* Featured card — image as background, text overlaid */}
        <div className="relative overflow-hidden rounded-[32px] shadow-2xl">
          <img
            src={featuredStory.image}
            alt={featuredStory.title}
            className="h-[480px] w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-between p-6">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-red-300 backdrop-blur-sm flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
                </span>
                TRENDING
              </span>
              {/* <span className="text-sm text-white/70">Top story</span> */}
            </div>
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="font-semibold uppercase tracking-[0.2em] text-sky-400">{featuredStory.category}</span>
                <span className="text-white/60">{featuredStory.timeLabel}</span>
              </div>
              <h2 className="text-2xl font-semibold text-white sm:text-3xl">{featuredStory.title}</h2>
              <p className="max-w-2xl text-sm leading-7 text-white/75">{featuredStory.summary}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
                <span>{featuredStory.author}</span>
                <span>{featuredStory.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* News cards grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
          {cardItems.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedNews
