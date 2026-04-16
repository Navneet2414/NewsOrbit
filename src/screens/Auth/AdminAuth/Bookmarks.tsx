"use client";

import {
  Bookmark,
  TrendingUp,
  Clock,
  Heart,
  MessageCircle,
  Share2,
} from "lucide-react";

interface BookmarkedPost {
  id: number;
  category: string;
  categoryColor: string;
  timeAgo: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  city: string;
  likes: number;
  comments: number;
  shares: number;
  trending?: boolean;
}

const bookmarkedPosts: BookmarkedPost[] = [
  {
    id: 1,
    category: "POLITICS",
    categoryColor: "text-blue-500 bg-blue-50 border border-blue-100",
    timeAgo: "8d ago",
    title: "City Council Approves New Metro Line Expansion Plan",
    excerpt:
      "The municipal corporation has greenlit a ₹12,000 crore metro expansion that will...",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80",
    author: "Priya Sharma",
    city: "Mumbai",
    likes: 234,
    comments: 45,
    shares: 89,
    trending: true,
  },
  {
    id: 2,
    category: "CRIME",
    categoryColor: "text-red-400 bg-red-50 border border-red-100",
    timeAgo: "8d ago",
    title: "Police Bust Cybercrime Ring Operating from Tech Hub",
    excerpt:
      "In a major crackdown, the cyber cell arrested 12 suspects involved in a phishing scam that...",
    image: "https://images.unsplash.com/photo-1603736890758-b90fba9c4b40?w=800&q=80",
    author: "Rajesh Kumar",
    city: "Bangalore",
    likes: 156,
    comments: 67,
    shares: 120,
    trending: true,
  },
  {
    id: 3,
    category: "EVENTS",
    categoryColor: "text-purple-500 bg-purple-50 border border-purple-100",
    timeAgo: "8d ago",
    title: "Annual Cultural Festival to Feature 200+ Artists This Weekend",
    excerpt:
      "The three-day cultural extravaganza will showcase performances from renowned...",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
    author: "Ananya Patel",
    city: "Delhi",
    likes: 312,
    comments: 23,
    shares: 156,
  },
];

export default function BookmarksPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center">
          <Bookmark size={24} className="text-blue-500" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bookmarks</h1>
          <p className="text-gray-500 text-sm mt-0.5">Articles you&apos;ve saved for later.</p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-3 gap-5">
        {bookmarkedPosts.map((post) => (
          <BookmarkCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

function BookmarkCard({ post }: { post: BookmarkedPost }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
      {/* Image */}
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-[220px] object-cover"
        />
        {post.trending && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
            <TrendingUp size={11} className="text-orange-400" />
            Trending
          </div>
        )}
      </div>

      {/* Body */}
      <div className="px-4 pt-4 pb-4">
        {/* Category + Time */}
        <div className="flex items-center gap-3 mb-3">
          <span
            className={`text-[11px] font-bold px-2.5 py-1 rounded-full tracking-wider ${post.categoryColor}`}
          >
            {post.category}
          </span>
          <span className="flex items-center gap-1 text-gray-400 text-xs">
            <Clock size={12} />
            {post.timeAgo}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-gray-900 font-bold text-[15px] leading-snug mb-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-sm">
            <span className="font-semibold text-gray-800">{post.author}</span>
            <span className="text-gray-300">·</span>
            <span className="text-gray-500">{post.city}</span>
          </div>

          <div className="flex items-center gap-3 text-gray-400 text-sm">
            <span className="flex items-center gap-1">
              <Heart size={13} />
              {post.likes}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle size={13} />
              {post.comments}
            </span>
            <span className="flex items-center gap-1">
              <Share2 size={13} />
              {post.shares}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
