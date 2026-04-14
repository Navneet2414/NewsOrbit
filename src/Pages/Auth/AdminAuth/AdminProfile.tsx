"use client";

import {
  MapPin,
  Calendar,
  FileText,
  Users,
  PenSquare,
  TrendingUp,
  Clock,
  Heart,
  MessageCircle,
  Share2,
} from "lucide-react";

interface UserPost {
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

const userPosts: UserPost[] = [
  {
    id: 1,
    category: "POLITICS",
    categoryColor: "text-blue-500 bg-blue-50 border border-blue-100",
    timeAgo: "8d ago",
    title: "City Council Approves New Metro Line Expansion Plan",
    excerpt:
      "The municipal corporation has greenlit a ₹12,000 crore metro expansion that will connect the suburbs to the city center,...",
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80",
    author: "Priya Sharma",
    city: "Mumbai",
    likes: 234,
    comments: 45,
    shares: 89,
    trending: true,
  },
];

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="w-full">

        {/* Profile Card */}
        <div className="bg-white border border-gray-200 rounded-2xl px-6 py-5 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl font-bold text-blue-500">P</span>
              </div>

              {/* Info */}
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Priya Sharma</h1>
                <p className="text-gray-500 text-sm mt-0.5 mb-3">
                  Senior journalist covering politics and metro news.
                </p>
                <div className="flex items-center gap-4 text-gray-500 text-sm flex-wrap">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-gray-400" />
                    Mumbai
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-gray-400" />
                    Joined 15/06/2025
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FileText size={14} className="text-gray-400" />
                    48 posts
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users size={14} className="text-gray-400" />
                    1200 followers
                  </span>
                </div>
              </div>
            </div>

            {/* Edit Profile Button */}
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap">
              <PenSquare size={15} className="text-gray-500" />
              Edit Profile
            </button>
          </div>
        </div>

        <hr className="border-gray-200 mb-6" />

        {/* My Posts Section */}
        <h2 className="text-xl font-bold text-gray-900 mb-5">My Posts</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {userPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PostCard({ post }: { post: UserPost }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
      {/* Image */}
      <div className="relative">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-[280px] object-cover"
        />
        {post.trending && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
            <TrendingUp size={11} className="text-orange-400" />
            Trending
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-5 pt-4 pb-5">
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
        <h3 className="text-gray-900 font-bold text-base leading-snug mb-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-500 text-sm leading-relaxed mb-4">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-sm">
            <span className="font-semibold text-gray-800">{post.author}</span>
            <span className="text-gray-300">·</span>
            <span className="text-gray-500">{post.city}</span>
          </div>

          <div className="flex items-center gap-4 text-gray-400 text-sm">
            <span className="flex items-center gap-1">
              <Heart size={14} />
              {post.likes}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle size={14} />
              {post.comments}
            </span>
            <span className="flex items-center gap-1">
              <Share2 size={14} />
              {post.shares}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}