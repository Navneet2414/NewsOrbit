import React from 'react';
import { 
  Bell, 
  MessageSquare, 
  Heart, 
  ShieldCheck, 
  Newspaper, 
  UserPlus, 
  XCircle,
  type LucideIcon,
} from 'lucide-react';


type NotificationType = 'comment' | 'like' | 'approval' | 'news' | 'follower' | 'rejection';

interface NotificationItem {
  id: number;
  type: NotificationType;
  title: string;
  description: string;
  timeAgo: string;
  isUnread: boolean;
}

const notifications: NotificationItem[] = [
  {
    id: 1,
    type: 'comment',
    title: 'New Comment',
    description: 'Ananya Patel commented on your post about Metro Line Expansion.',
    timeAgo: '8d ago',
    isUnread: true,
  },
  {
    id: 2,
    type: 'like',
    title: 'Post Liked',
    description: 'Your post received 50 new likes.',
    timeAgo: '8d ago',
    isUnread: true,
  },
  {
    id: 3,
    type: 'approval',
    title: 'Post Approved',
    description: "Your article 'City Council Approves New Metro Line' has been approved.",
    timeAgo: '8d ago',
    isUnread: false,
  },
  {
    id: 4,
    type: 'news',
    title: 'Breaking News',
    description: 'New trending story in Mumbai: Police Bust Cybercrime Ring.',
    timeAgo: '8d ago',
    isUnread: false,
  },
  {
    id: 5,
    type: 'follower',
    title: 'New Follower',
    description: 'Vikram Reddy started following you.',
    timeAgo: '8d ago',
    isUnread: false,
  },
];

const IconMap: Record<NotificationType, LucideIcon> = {
  comment: MessageSquare,
  like: Heart,
  approval: ShieldCheck,
  news: Newspaper,
  follower: UserPlus,
  rejection: XCircle,
};

export default function NotificationList() {
  return (
    <div className=" mx-auto p-6 m-2 bg-white min-h-screen font-sans">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-blue-50 rounded-xl">
          <Bell className="w-6 h-6 text-blue-600 fill-blue-100" />
        </div>
        <h1 className="text-3xl font-serif font-bold text-slate-900">Notifications</h1>
      </div>

      {/* List */}
      <div className="space-y-4">
        {notifications.map((notif) => {
          const Icon = IconMap[notif.type];
          
          return (
            <div 
              key={notif.id}
              className={`relative flex items-start gap-4 p-5 rounded-2xl border transition-all
                ${notif.isUnread 
                  ? 'bg-blue-50/40 border-blue-100 shadow-sm' 
                  : 'bg-white border-slate-100'}`}
            >
              {/* Icon Container */}
              <div className={`p-3 rounded-full flex-shrink-0 
                ${notif.isUnread ? 'bg-blue-100' : 'bg-slate-100'}`}>
                <Icon className={`w-5 h-5 ${notif.isUnread ? 'text-blue-600' : 'text-slate-500'}`} />
              </div>

              {/* Text Content */}
              <div className="flex-1 space-y-1">
                <h3 className="font-bold text-slate-900 text-lg">{notif.title}</h3>
                <p className="text-slate-500 leading-relaxed text-[15px]">
                  {notif.description}
                </p>
                <span className="block text-slate-400 text-sm mt-1">
                  {notif.timeAgo}
                </span>
              </div>

              {/* Unread Indicator */}
              {notif.isUnread && (
                <div className="absolute top-6 right-6 w-2.5 h-2.5 bg-blue-600 rounded-full" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
