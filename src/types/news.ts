export interface NewsItem {
  id: string
  category: string
  title: string
  summary: string
  image: string
  author: string
  location: string
  timeLabel: string
  views: number
  comments: number
  shares: number
  featured?: boolean
}

export interface TrendingItem {
  id: string
  title: string
  location: string
  timeLabel: string
  likes?: number
}

export interface UserProfile {
  id: string
  name: string
  email: string
  avatar: string
  location: string
  joinedDate: string
  bio: string
  bookmarks: number
  following: number
  followers: number
}

export interface Journalist {
  id: string
  name: string
  avatar: string
  beat: string
  location: string
  articles: number
  followers: number
  verified: boolean
  bio: string
}
