"use client";

import { useState } from "react";
import {
  FileText,
  Heart,
  MessageCircle,
  TrendingUp,
  Plus,
  BarChart2,
  Eye,
} from "lucide-react";

interface Post {
  id: number;
  title: string;
  likes: number;
  comments: number;
  views: number;
  status: "approved" | "pending" | "rejected";
}

const mockPosts: Post[] = [
  {
    id: 1,
    title: "City Council Approves New Metro Line Expansion Plan",
    likes: 234,
    comments: 45,
    views: 89,
    status: "approved",
  },
];

const stats = [
  {
    label: "Total Posts",
    value: 1,
    icon: FileText,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    label: "Total Likes",
    value: 234,
    icon: Heart,
    iconBg: "bg-red-50",
    iconColor: "text-red-400",
  },
  {
    label: "Comments",
    value: 45,
    icon: MessageCircle,
    iconBg: "bg-green-50",
    iconColor: "text-green-500",
  },
  {
    label: "Shares",
    value: 89,
    icon: TrendingUp,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-500",
  },
];

type Tab = "Overview" | "My Posts";

const statusStyles: Record<Post["status"], string> = {
  approved: "bg-blue-600 text-white",
  pending: "bg-yellow-400 text-white",
  rejected: "bg-red-500 text-white",
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("Overview");

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center">
            <FileText size={26} className="text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 text-sm mt-0.5">
              Manage and publish your news articles.
            </p>
          </div>
        </div>

        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-2xl transition-colors text-sm shadow-sm">
          <Plus size={18} strokeWidth={2.5} />
          Create Post
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6">
        {(["Overview", "My Posts"] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
              activeTab === tab
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white text-gray-600 border border-gray-200 hover:border-blue-200 hover:text-blue-600"
            }`}
          >
            {tab === "Overview" ? (
              <BarChart2 size={15} />
            ) : (
              <FileText size={15} />
            )}
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Overview" && (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {stats.map(({ label, value, icon: Icon, iconBg, iconColor }) => (
              <div
                key={label}
                className="bg-white border border-gray-200 rounded-2xl px-6 py-5 flex items-center gap-4"
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center ${iconBg}`}
                >
                  <Icon size={20} className={iconColor} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 leading-none">
                    {value}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">{label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Posts Performance */}
          <div className="bg-white border border-gray-200 rounded-2xl px-6 py-5">
            <h2 className="text-sm font-extrabold text-gray-900 uppercase tracking-widest mb-5">
              Recent Posts Performance
            </h2>

            <div className="flex flex-col gap-3">
              {mockPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-1.5">
                      {post.title}
                    </p>
                    <div className="flex items-center gap-4 text-gray-400 text-xs">
                      <span className="flex items-center gap-1">
                        <Heart size={12} />
                        {post.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle size={12} />
                        {post.comments}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye size={12} />
                        {post.views}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${statusStyles[post.status]}`}
                  >
                    {post.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {activeTab === "My Posts" && (
        <div className="bg-white border border-gray-200 rounded-2xl px-6 py-5">
          <h2 className="text-sm font-extrabold text-gray-900 uppercase tracking-widest mb-5">
            My Posts
          </h2>
          <div className="flex flex-col gap-3">
            {mockPosts.map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1.5">
                    {post.title}
                  </p>
                  <div className="flex items-center gap-4 text-gray-400 text-xs">
                    <span className="flex items-center gap-1">
                      <Heart size={12} />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle size={12} />
                      {post.comments}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye size={12} />
                      {post.views}
                    </span>
                  </div>
                </div>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${statusStyles[post.status]}`}
                >
                  {post.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}