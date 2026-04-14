'use client'

import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import TopBar from '../components/TopBar'
import NewsSection from '../components/NewsSection'
import TrendingPage from '../components/Sidebartab/TrendingPage'
import CategoryNews from '../components/Sidebartab/Categorynews'
import JournalistPage from '../components/Sidebartab/Journalist/JournalistPage'
import Dashboard from '../Pages/Auth/AdminAuth/Dashboard'
import AdminPanel from '../Pages/Auth/AdminAuth/AdminPanel'
import AdminProfile from '../Pages/Auth/AdminAuth/AdminProfile'
import BookmarksPage from '../Pages/Auth/AdminAuth/Bookmarks'
import NotificationsPage from '../Pages/Auth/AdminAuth/Notifications'
import SettingsPage from '../Pages/Auth/AdminAuth/Settings'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import TrendingPanel from '../components/TrendingPanel'

export default function HomePage() {
  const [activeItem, setActiveItem] = useState('All News')

  const sidebarCategories = ['Crime', 'Politics', 'Events', 'Jobs']
  const isCategoryView = sidebarCategories.includes(activeItem)
  const isTrending = activeItem === 'Trending'
  const isProfile = activeItem === 'Profile'
  const isJournalist = activeItem === 'Journalists'
  const isDashboard = activeItem === 'My Dashboard'
  const isAdminPanel = activeItem === 'Admin Panel'
  const isBookmarks = activeItem === 'Bookmarks'
  const isNotifications = activeItem === 'Notifications'
  const isSettings = activeItem === 'Settings'
  const isFullWidth = isTrending || isCategoryView || isJournalist

  return (
    <div className="grid h-dvh grid-cols-1 lg:grid-cols-[18rem_1fr]">
      <Sidebar activeItem={activeItem} onSelect={setActiveItem} />

      <div className="grid h-dvh grid-rows-[auto_1fr] bg-slate-100">
        <TopBar />

        <div className="h-full overflow-y-auto">
          {isDashboard ? (
            <Dashboard />
          ) : isAdminPanel ? (
            <AdminPanel />
          ) : isProfile ? (
            <AdminProfile />
          ) : isBookmarks ? (
            <BookmarksPage />
          ) : isNotifications ? (
            <NotificationsPage />
          ) : isSettings ? (
            <SettingsPage />
          ) : (
          <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_20rem]">
              {!isFullWidth && (
                <div className="lg:col-span-2 lg:row-start-1">
                  <Hero />
                </div>
              )}

              <div className="lg:col-start-1 lg:row-start-2">
                {!isFullWidth && (
                  <div className="lg:hidden">
                    <TrendingPanel />
                  </div>
                )}
                <div className="mt-8 space-y-8 lg:mt-0">
                  {isTrending ? (
                    <TrendingPage />
                  ) : isCategoryView ? (
                    <CategoryNews category={activeItem} />
                  ) : isProfile ? (
                    <UserProfilePage />
                  ) : isJournalist ? (
                    <JournalistPage />
                  ) : (
                    <NewsSection sidebarCategory={activeItem} />
                  )}
                </div>
              </div>

              {!isFullWidth && (
                <aside className="hidden lg:block lg:col-start-2 lg:row-start-2">
                  <div className="sticky top-6">
                    <TrendingPanel />
                  </div>
                </aside>
              )}

              <div className="lg:col-span-2 lg:row-start-3">
                <Footer />
              </div>
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  )
}
