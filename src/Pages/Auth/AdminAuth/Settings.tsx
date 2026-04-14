import React, { useState } from 'react';
import { Settings, User, Bell, ShieldCheck, ChevronDown } from 'lucide-react';

// --- Types ---

interface ProfileData {
  fullName: string;
  email: string;
  bio: string;
  city: string;
}

interface NotificationSetting {
  id: string;
  label: string;
  enabled: boolean;
}

const initialProfile: ProfileData = {
  fullName: "Priya Sharma",
  email: "priya@example.com",
  bio: "Senior journalist covering politics and metro news.",
  city: "Mumbai",
};

const initialNotifications: NotificationSetting[] = [
  { id: 'comments', label: 'New comments on my posts', enabled: true },
  { id: 'likes', label: 'Likes on my posts', enabled: true },
  { id: 'news', label: 'New news in my city', enabled: false },
  { id: 'admin', label: 'Admin actions on my posts', enabled: true },
];

// --- Sub-Components ---

// Reusable Section Header
const SectionHeader: React.FC<{ icon: React.ReactNode; title: string }> = ({ icon, title }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
      {icon}
    </div>
    <h2 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h2>
  </div>
);

// Custom Switch Toggle Component
const Switch: React.FC<{ checked: boolean; onChange: () => void }> = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={onChange}
    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${
      checked ? 'bg-blue-600' : 'bg-slate-200'
    }`}
  >
    <span
      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
        checked ? 'translate-x-5' : 'translate-x-0'
    }`}
    />
  </button>
);

// --- Main Page Component ---

export default function SettingsPage() {
  const [profile, setProfile] = useState<ProfileData>(initialProfile);
  const [notifications, setNotifications] = useState<NotificationSetting[]>(initialNotifications);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const toggleNotification = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, enabled: !n.enabled } : n))
    );
  };

  const inputClasses = "w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500 text-sm";
  const labelClasses = "block text-sm font-medium text-slate-700 mb-1.5";
  const cardClasses = "bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm";

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans">
      <div className=" mx-auto space-y-8">
        
        {/* Page Title */}
        <div className="flex items-center gap-4 mb-10">
          <div className="p-3 bg-blue-100/70 rounded-2xl text-blue-700">
            <Settings className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-serif font-bold text-slate-950">Settings</h1>
        </div>

        {/* PROFILE SECTION */}
        <div className={cardClasses}>
          <SectionHeader icon={<User className="w-6 h-6" />} title="PROFILE" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="fullName" className={labelClasses}>Full Name</label>
              <input type="text" id="fullName" name="fullName" value={profile.fullName} onChange={handleProfileChange} className={inputClasses} placeholder="Enter your full name" />
            </div>
            <div>
              <label htmlFor="email" className={labelClasses}>Email</label>
              <input type="email" id="email" name="email" value={profile.email} onChange={handleProfileChange} className={inputClasses} placeholder="your.email@example.com" />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="bio" className={labelClasses}>Bio</label>
            <textarea id="bio" name="bio" value={profile.bio} onChange={handleProfileChange} rows={4} className={`${inputClasses} resize-none`} placeholder="Tell us about yourself..." />
          </div>

          <div>
            <label htmlFor="city" className={labelClasses}>City</label>
            <div className="relative">
              <input type="text" id="city" name="city" value={profile.city} onChange={handleProfileChange} className={`${inputClasses} pr-10`} placeholder="Select or enter your city" />
              <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            </div>
          </div>
        </div>

        {/* NOTIFICATIONS SECTION */}
        <div className={cardClasses}>
          <SectionHeader icon={<Bell className="w-6 h-6" />} title="NOTIFICATIONS" />
          <div className="space-y-5">
            {notifications.map((setting) => (
              <div key={setting.id} className="flex items-center justify-between gap-4 py-1">
                <span className="text-base text-slate-800 font-medium">{setting.label}</span>
                <Switch checked={setting.enabled} onChange={() => toggleNotification(setting.id)} />
              </div>
            ))}
          </div>
        </div>

        {/* SECURITY SECTION */}
        <div className={cardClasses}>
          <SectionHeader icon={<ShieldCheck className="w-6 h-6" />} title="SECURITY" />
          
          <div className="space-y-6 max-w-lg">
            <div>
              <label htmlFor="currentPassword" className={labelClasses}>Current Password</label>
              <input type="password" id="currentPassword" defaultValue="password123" className={`${inputClasses} font-mono text-lg tracking-widest`} />
            </div>
            <div>
              <label htmlFor="newPassword" className={labelClasses}>New Password</label>
              <input type="password" id="newPassword" defaultValue="newpassword456" className={`${inputClasses} font-mono text-lg tracking-widest`} />
            </div>
            <button type="button" className="px-5 py-2.5 rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50 transition">
              Change Password
            </button>
          </div>
        </div>

        {/* GLOBAL ACTIONS */}
        <div className="flex justify-end gap-3 pt-6 border-t border-slate-200">
          <button type="button" className="px-6 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50 transition">
            Cancel
          </button>
          <button type="button" className="px-6 py-2.5 rounded-xl bg-blue-600 text-sm font-semibold text-white shadow hover:bg-blue-700 transition">
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
}