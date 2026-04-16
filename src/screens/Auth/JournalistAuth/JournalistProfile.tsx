"use client";

import { MapPin, Calendar, FileText, Users, PenSquare, TrendingUp, Clock, Heart, MessageCircle, Share2 } from "lucide-react";

const posts = [
  { id: 1, category: "POLITICS", categoryColor: "text-blue-500 bg-blue-50 border border-blue-100", timeAgo: "2d ago", title: "City Council Approves New Metro Line Expansion Plan", excerpt: "The municipal corporation has greenlit a ₹12,000 crore metro expansion...", image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80", likes: 234, comments: 45, shares: 89, trending: true },
  { id: 2, category: "POLITICS", categoryColor: "text-blue-500 bg-blue-50 border border-blue-100", timeAgo: "5d ago", title: "Opposition Party Stages Massive Rally Against New Tax Policy", excerpt: "Thousands gathered at the central park to protest the proposed changes to GST rates...", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80", likes: 98, comments: 31, shares: 44, trending: false },
]

export default function JournalistProfile() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="w-full">
        <div className="bg-white border border-gray-200 rounded-2xl px-6 py-5 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80" alt="Priya Sharma" className="w-16 h-16 rounded-full object-cover flex-shrink-0" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Priya Sharma</h1>
                <p className="text-gray-500 text-sm mt-0.5 mb-3">Senior journalist covering politics and metro news.</p>
                <div className="flex items-center gap-4 text-gray-500 text-sm flex-wrap">
                  <span className="flex items-center gap-1.5"><MapPin size={14} className="text-gray-400" />Mumbai</span>
                  <span className="flex items-center gap-1.5"><Calendar size={14} className="text-gray-400" />Joined Jan 2024</span>
                  <span className="flex items-center gap-1.5"><FileText size={14} className="text-gray-400" />48 articles</span>
                  <span className="flex items-center gap-1.5"><Users size={14} className="text-gray-400" />3,200 followers</span>
                </div>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap">
              <PenSquare size={15} className="text-gray-500" />Edit Profile
            </button>
          </div>
        </div>
        <hr className="border-gray-200 mb-6" />
        <h2 className="text-xl font-bold text-gray-900 mb-5">My Articles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post) => (
            <div key={post.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.image} alt={post.title} className="w-full h-[220px] object-cover" />
                {post.trending && (
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                    <TrendingUp size={11} className="text-orange-400" />Trending
                  </div>
                )}
              </div>
              <div className="px-4 pt-4 pb-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full tracking-wider ${post.categoryColor}`}>{post.category}</span>
                  <span className="flex items-center gap-1 text-gray-400 text-xs"><Clock size={12} />{post.timeAgo}</span>
                </div>
                <h3 className="text-gray-900 font-bold text-[15px] leading-snug mb-2">{post.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-end gap-3 text-gray-400 text-sm">
                  <span className="flex items-center gap-1"><Heart size={13} />{post.likes}</span>
                  <span className="flex items-center gap-1"><MessageCircle size={13} />{post.comments}</span>
                  <span className="flex items-center gap-1"><Share2 size={13} />{post.shares}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
