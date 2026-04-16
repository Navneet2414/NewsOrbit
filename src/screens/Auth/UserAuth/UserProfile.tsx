"use client";

import { MapPin, Calendar, Bookmark, Users, UserCheck, PenSquare } from "lucide-react";

export default function UserProfile() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="w-full">
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden mb-6">
          <div className="h-28 bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500" />
            <div className="px-6 pb-6">
              <div className="flex items-end justify-between -mt-10 mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
                  alt="User" className="h-20 w-20 rounded-[20px] border-4 border-white object-cover shadow-md" />
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  <PenSquare size={15} className="text-gray-500" />Edit Profile
                </button>
              </div>
            <h1 className="text-2xl font-bold text-gray-900">Guest User</h1>
            <p className="text-gray-500 text-sm mt-0.5 mb-3">user@newsorbit.com</p>
            <p className="text-sm leading-6 text-gray-600 mb-4">Passionate about local news, civic issues, and staying informed about what matters in my city.</p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-5">
              <span className="flex items-center gap-1.5"><MapPin size={14} className="text-gray-400" />Mumbai, India</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} className="text-gray-400" />Joined January 2024</span>
            </div>
            <div className="grid grid-cols-3 divide-x divide-gray-100 rounded-2xl bg-gray-50 text-center">
              <div className="py-3"><p className="text-base font-bold text-gray-900">24</p><p className="text-xs text-gray-500 flex items-center justify-center gap-1"><Bookmark size={11} />Saved</p></div>
              <div className="py-3"><p className="text-base font-bold text-gray-900">12</p><p className="text-xs text-gray-500 flex items-center justify-center gap-1"><Users size={11} />Following</p></div>
              <div className="py-3"><p className="text-base font-bold text-gray-900">38</p><p className="text-xs text-gray-500 flex items-center justify-center gap-1"><UserCheck size={11} />Followers</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
