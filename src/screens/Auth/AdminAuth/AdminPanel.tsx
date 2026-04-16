"use client";

import { useState } from "react";
import {
  Shield,
  BarChart2,
  CheckCircle2,
  Clock,
  Users,
  Newspaper,
  Tag,
  UserCog,
} from "lucide-react";

type Tab = "Overview" | "Content Moderation" | "User Management" | "Categories";

type PostStatus = "approved" | "pending" | "rejected";
type PostCategory = "POLITICS" | "CRIME" | "EVENTS" | "JOBS";

interface ActivityPost {
  id: number;
  category: PostCategory;
  title: string;
  status: PostStatus;
}

const activityPosts: ActivityPost[] = [
  {
    id: 1,
    category: "POLITICS",
    title: "City Council Approves New Metro Line Expansion Plan",
    status: "approved",
  },
  {
    id: 2,
    category: "CRIME",
    title: "Police Bust Cybercrime Ring Operating from Tech Hub",
    status: "approved",
  },
  {
    id: 3,
    category: "EVENTS",
    title: "Annual Cultural Festival to Feature 200+ Artists This Weekend",
    status: "approved",
  },
  {
    id: 4,
    category: "JOBS",
    title: "Top IT Firms to Hire 15,000 Freshers in Q2 Recruitment Drive",
    status: "approved",
  },
  {
    id: 5,
    category: "POLITICS",
    title: "Opposition Party Stages Massive Rally Against New Tax Policy",
    status: "approved",
  },
];

const categoryStyles: Record<PostCategory, string> = {
  POLITICS: "bg-blue-50 text-blue-500 border border-blue-100",
  CRIME: "bg-red-50 text-red-400 border border-red-100",
  EVENTS: "bg-purple-50 text-purple-500 border border-purple-100",
  JOBS: "bg-green-50 text-green-500 border border-green-100",
};

const statusStyles: Record<PostStatus, string> = {
  approved: "bg-blue-600 text-white",
  pending: "bg-yellow-400 text-white",
  rejected: "bg-red-500 text-white",
};

const tabs: { label: Tab; icon: React.ReactNode }[] = [
  { label: "Overview", icon: <BarChart2 size={15} /> },
  { label: "Content Moderation", icon: <Shield size={15} /> },
  { label: "User Management", icon: <UserCog size={15} /> },
  { label: "Categories", icon: <Tag size={15} /> },
];

const stats = [
  {
    label: "Total Posts",
    value: 8,
    icon: Newspaper,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    label: "Approved",
    value: 8,
    icon: CheckCircle2,
    iconBg: "bg-green-50",
    iconColor: "text-green-500",
  },
  {
    label: "Pending",
    value: 3,
    icon: Clock,
    iconBg: "bg-yellow-50",
    iconColor: "text-yellow-500",
  },
  {
    label: "Users",
    value: 5,
    icon: Users,
    iconBg: "bg-red-50",
    iconColor: "text-red-400",
  },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("Overview");

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-7">
        <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center">
          <Shield size={26} className="text-red-500" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Manage content, users, and platform settings.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-7 flex-wrap">
        {tabs.map(({ label, icon }) => (
          <button
            key={label}
            onClick={() => setActiveTab(label)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
              activeTab === label
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white text-gray-600 border border-gray-200 hover:border-blue-200 hover:text-blue-600"
            }`}
          >
            {icon}
            {label}
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

          {/* Recent Activity */}
          <div className="bg-white border border-gray-200 rounded-2xl px-6 py-5">
            <h2 className="text-sm font-extrabold text-gray-900 uppercase tracking-widest mb-5">
              Recent Activity
            </h2>

            <div className="flex flex-col">
              {activityPosts.map((post, idx) => (
                <div
                  key={post.id}
                  className={`flex items-center justify-between py-4 ${
                    idx !== activityPosts.length - 1
                      ? "border-b border-gray-100"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider ${categoryStyles[post.category]}`}
                    >
                      {post.category}
                    </span>
                    <p className="text-sm text-gray-800 font-medium">
                      {post.title}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-semibold px-4 py-1.5 rounded-full ml-4 whitespace-nowrap ${statusStyles[post.status]}`}
                  >
                    {post.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {activeTab === "Content Moderation" && (
        <div className="bg-white border border-gray-200 rounded-2xl px-6 py-5">
          <h2 className="text-sm font-extrabold text-gray-900 uppercase tracking-widest mb-5">
            Content Moderation
          </h2>
          <div className="flex flex-col">
            {activityPosts.map((post, idx) => (
              <div
                key={post.id}
                className={`flex items-center justify-between py-4 ${
                  idx !== activityPosts.length - 1
                    ? "border-b border-gray-100"
                    : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider ${categoryStyles[post.category]}`}
                  >
                    {post.category}
                  </span>
                  <p className="text-sm text-gray-800 font-medium">
                    {post.title}
                  </p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button className="text-xs font-semibold px-3 py-1.5 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors">
                    Approve
                  </button>
                  <button className="text-xs font-semibold px-3 py-1.5 rounded-full bg-red-100 text-red-500 hover:bg-red-200 transition-colors">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "User Management" && (
        <div className="bg-white border border-gray-200 rounded-2xl px-6 py-5">
          <h2 className="text-sm font-extrabold text-gray-900 uppercase tracking-widest mb-5">
            User Management
          </h2>
          <p className="text-gray-400 text-sm">5 registered users on the platform.</p>
        </div>
      )}

      {activeTab === "Categories" && (
        <div className="bg-white border border-gray-200 rounded-2xl px-6 py-5">
          <h2 className="text-sm font-extrabold text-gray-900 uppercase tracking-widest mb-5">
            Categories
          </h2>
          <div className="flex flex-wrap gap-2">
            {(["POLITICS", "CRIME", "EVENTS", "JOBS"] as PostCategory[]).map((cat) => (
              <span
                key={cat}
                className={`text-xs font-bold px-4 py-2 rounded-full tracking-wider ${categoryStyles[cat]}`}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}