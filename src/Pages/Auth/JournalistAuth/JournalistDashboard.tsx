"use client";

import { FileText, Heart, MessageCircle, TrendingUp, Plus, BarChart2, Eye } from "lucide-react";
import { useState } from "react";

type Tab = "Overview" | "My Articles";
type Status = "approved" | "pending" | "rejected";

interface Article { id: number; title: string; likes: number; comments: number; views: number; status: Status }

const articles: Article[] = [
  { id: 1, title: "City Council Approves New Metro Line Expansion Plan", likes: 234, comments: 45, views: 890, status: "approved" },
  { id: 2, title: "Opposition Party Stages Massive Rally Against New Tax Policy", likes: 98, comments: 31, views: 420, status: "pending" },
  { id: 3, title: "Annual Cultural Festival to Feature 200+ Artists This Weekend", likes: 312, comments: 23, views: 670, status: "approved" },
]

const stats = [
  { label: "Total Articles", value: 3, icon: FileText, iconBg: "bg-blue-50", iconColor: "text-blue-500" },
  { label: "Total Likes", value: 644, icon: Heart, iconBg: "bg-red-50", iconColor: "text-red-400" },
  { label: "Comments", value: 99, icon: MessageCircle, iconBg: "bg-green-50", iconColor: "text-green-500" },
  { label: "Total Views", value: 1980, icon: Eye, iconBg: "bg-purple-50", iconColor: "text-purple-500" },
]

const statusStyles: Record<Status, string> = {
  approved: "bg-blue-600 text-white",
  pending: "bg-yellow-400 text-white",
  rejected: "bg-red-500 text-white",
}

export default function JournalistDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("Overview")
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center">
            <FileText size={26} className="text-emerald-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Journalist Dashboard</h1>
            <p className="text-gray-500 text-sm mt-0.5">Write, manage and track your articles.</p>
          </div>
        </div>
        <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-2xl transition-colors text-sm shadow-sm">
          <Plus size={18} strokeWidth={2.5} /> New Article
        </button>
      </div>

      <div className="flex items-center gap-2 mb-6">
        {(["Overview", "My Articles"] as Tab[]).map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${activeTab === tab ? "bg-emerald-600 text-white shadow-sm" : "bg-white text-gray-600 border border-gray-200 hover:border-emerald-200 hover:text-emerald-600"}`}>
            {tab === "Overview" ? <BarChart2 size={15} /> : <FileText size={15} />}{tab}
          </button>
        ))}
      </div>

      {activeTab === "Overview" && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map(({ label, value, icon: Icon, iconBg, iconColor }) => (
              <div key={label} className="bg-white border border-gray-200 rounded-2xl px-6 py-5 flex items-center gap-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${iconBg}`}><Icon size={20} className={iconColor} /></div>
                <div><p className="text-2xl font-bold text-gray-900 leading-none">{value}</p><p className="text-gray-500 text-xs mt-1">{label}</p></div>
              </div>
            ))}
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl px-6 py-5">
            <h2 className="text-sm font-extrabold text-gray-900 uppercase tracking-widest mb-5">Recent Articles</h2>
            {articles.map((a, i) => (
              <div key={a.id} className={`flex items-center justify-between py-3 ${i !== articles.length - 1 ? "border-b border-gray-100" : ""}`}>
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">{a.title}</p>
                  <div className="flex items-center gap-4 text-gray-400 text-xs">
                    <span className="flex items-center gap-1"><Heart size={12} />{a.likes}</span>
                    <span className="flex items-center gap-1"><MessageCircle size={12} />{a.comments}</span>
                    <span className="flex items-center gap-1"><Eye size={12} />{a.views}</span>
                  </div>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusStyles[a.status]}`}>{a.status}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === "My Articles" && (
        <div className="bg-white border border-gray-200 rounded-2xl px-6 py-5">
          <h2 className="text-sm font-extrabold text-gray-900 uppercase tracking-widest mb-5">My Articles</h2>
          {articles.map((a, i) => (
            <div key={a.id} className={`flex items-center justify-between py-3 ${i !== articles.length - 1 ? "border-b border-gray-100" : ""}`}>
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-1">{a.title}</p>
                <div className="flex items-center gap-4 text-gray-400 text-xs">
                  <span className="flex items-center gap-1"><Heart size={12} />{a.likes}</span>
                  <span className="flex items-center gap-1"><Eye size={12} />{a.views}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-xs font-semibold px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">Edit</button>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusStyles[a.status]}`}>{a.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
