'use client'

import { useState } from 'react'
import { FiMapPin, FiCheckCircle, FiFileText, FiUsers } from 'react-icons/fi'
import { Journalist } from '../../../types/news'

const journalists: Journalist[] = [
  {
    id: 'j1',
    name: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    beat: 'Politics',
    location: 'Mumbai',
    articles: 142,
    followers: 3200,
    verified: true,
    bio: 'Senior political correspondent covering municipal governance, elections, and public policy.',
  },
  {
    id: 'j2',
    name: 'Rajesh Kumar',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    beat: 'Crime',
    location: 'Bengaluru',
    articles: 98,
    followers: 1850,
    verified: true,
    bio: 'Investigative journalist specialising in cybercrime, law enforcement, and judicial affairs.',
  },
  {
    id: 'j3',
    name: 'Yannova Patel',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80',
    beat: 'Events',
    location: 'Delhi',
    articles: 76,
    followers: 2100,
    verified: false,
    bio: 'Culture and lifestyle reporter covering festivals, arts, and community events across the country.',
  },
  {
    id: 'j4',
    name: 'Vikram Hegde',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    beat: 'Jobs',
    location: 'Hyderabad',
    articles: 115,
    followers: 4400,
    verified: true,
    bio: 'Business and careers journalist tracking the startup ecosystem, hiring trends, and tech industry.',
  },
  {
    id: 'j5',
    name: 'Deepa Menon',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    beat: 'Politics',
    location: 'Chennai',
    articles: 89,
    followers: 2750,
    verified: true,
    bio: 'Political analyst and reporter focused on state legislature, taxation policy, and civic rights.',
  },
  {
    id: 'j6',
    name: 'Rohan Bose',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    beat: 'Events',
    location: 'Bengaluru',
    articles: 63,
    followers: 1200,
    verified: false,
    bio: 'Food, travel, and events writer documenting the cultural pulse of South India.',
  },
]

const beatAccent: Record<string, { pill: string; bg: string }> = {
  Politics: { pill: 'bg-sky-50 text-sky-700 ring-1 ring-sky-100',         bg: 'from-sky-500 to-indigo-500' },
  Crime:    { pill: 'bg-rose-50 text-rose-700 ring-1 ring-rose-100',       bg: 'from-rose-500 to-pink-500' },
  Events:   { pill: 'bg-amber-50 text-amber-800 ring-1 ring-amber-100',    bg: 'from-amber-400 to-orange-500' },
  Jobs:     { pill: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100', bg: 'from-emerald-500 to-teal-500' },
}

const JournalistPage: React.FC = () => {
  const [followed, setFollowed] = useState<Record<string, boolean>>({})

  const toggle = (id: string) => setFollowed((prev) => ({ ...prev, [id]: !prev[id] }))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-base font-bold text-slate-900">Our Journalists</h2>
        <p className="mt-1 text-sm text-slate-500">Follow reporters covering the stories that matter to you.</p>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {journalists.map((j) => {
          const accent = beatAccent[j.beat] ?? { pill: 'bg-slate-50 text-slate-700 ring-1 ring-slate-100', bg: 'from-slate-400 to-slate-600' }
          const isFollowed = followed[j.id] ?? false

          return (
            <div key={j.id} className="overflow-hidden rounded-[28px] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              {/* Cover strip */}
              <div className={`h-16 bg-gradient-to-r ${accent.bg}`} />

              <div className="px-5 pb-5">
                {/* Avatar row */}
                <div className="flex items-end justify-between -mt-8 mb-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={j.avatar}
                    alt={j.name}
                    className="h-16 w-16 rounded-[16px] border-4 border-white object-cover shadow-md"
                  />
                  <button
                    type="button"
                    onClick={() => toggle(j.id)}
                    className={`rounded-2xl px-4 py-1.5 text-xs font-semibold transition ${
                      isFollowed
                        ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        : 'bg-slate-900 text-white hover:bg-slate-700'
                    }`}
                  >
                    {isFollowed ? 'Following' : 'Follow'}
                  </button>
                </div>

                {/* Name + verified */}
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold text-slate-900">{j.name}</h3>
                  {j.verified && <FiCheckCircle className="h-4 w-4 text-sky-500" />}
                </div>

                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] ${accent.pill}`}>
                    {j.beat}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-400">
                    <FiMapPin className="h-3 w-3" />{j.location}
                  </span>
                </div>

                <p className="mt-2.5 text-xs leading-5 text-slate-500 line-clamp-2">{j.bio}</p>

                {/* Stats */}
                <div className="mt-4 flex items-center gap-4 border-t border-slate-100 pt-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <FiFileText className="h-3.5 w-3.5 text-slate-400" />
                    <strong className="text-slate-800">{j.articles}</strong> articles
                  </span>
                  <span className="flex items-center gap-1">
                    <FiUsers className="h-3.5 w-3.5 text-slate-400" />
                    <strong className="text-slate-800">{j.followers.toLocaleString()}</strong> followers
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default JournalistPage
