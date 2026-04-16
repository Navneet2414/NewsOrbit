"use client";

import { Bookmark, Heart, Bell, FileText, BarChart2 } from "lucide-react";

const stats = [
  { label: "Saved Articles", value: 24, icon: Bookmark, iconBg: "bg-sky-50", iconColor: "text-sky-500" },
  { label: "Liked Articles", value: 87, icon: Heart, iconBg: "bg-red-50", iconColor: "text-red-400" },
  { label: "Notifications", value: 5, icon: Bell, iconBg: "bg-amber-50", iconColor: "text-amber-500" },
  { label: "Following", value: 12, icon: FileText, iconBg: "bg-emerald-50", iconColor: "text-emerald-500" },
]

const recentActivity = [
  { id: 1, action: "Bookmarked", title: "City Council Approves New Metro Line Expansion Plan", time: "2h ago", category: "Politics" },
  { id: 2, action: "Liked", title: "Top IT Firms to Hire 15,000 Freshers in Q2 Drive", time: "5h ago", category: "Jobs" },
  { id: 3, action: "Commented", title: "Annual Cultural Festival to Feature 200+ Artists", time: "1d ago", category: "Events" },
]

const categoryColors: Record<string, string> = {
  Politics: "bg-sky-50 text-sky-600 border border-sky-100",
  Jobs: "bg-emerald-50 text-emerald-600 border border-emerald-100",
  Events: "bg-amber-50 text-amber-700 border border-amber-100",
  Crime: "bg-rose-50 text-rose-600 border border-rose-100",
}

export default function UserDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex items-center gap-4 mb-7">
        <div className="w-14 h-14 bg-sky-50 rounded-2xl flex items-center justify-center">
          <BarChart2 size={26} className="text-sky-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
          <p className="text-gray-500 text-sm mt-0.5">Your reading activity and saved content.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map(({ label, value, icon: Icon, iconBg, iconColor }) => (
          <div key={label} className="bg-white border border-gray-200 rounded-2xl px-6 py-5 flex items-center gap-4">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${iconBg}`}>
              <Icon size={20} className={iconColor} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 leading-none">{value}</p>
              <p className="text-gray-500 text-xs mt-1">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl px-6 py-5">
        <h2 className="text-sm font-extrabold text-gray-900 uppercase tracking-widest mb-5">Recent Activity</h2>
        {recentActivity.map((item, i) => (
          <div key={item.id} className={`flex items-center justify-between py-3 ${i !== recentActivity.length - 1 ? "border-b border-gray-100" : ""}`}>
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-1">{item.title}</p>
              <div className="flex items-center gap-3">
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full tracking-wider ${categoryColors[item.category]}`}>{item.category}</span>
                <span className="text-xs text-gray-400">{item.time}</span>
              </div>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-600 ml-4 whitespace-nowrap">{item.action}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
