'use client'

import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import Hero from './Hero'
import CategoryTabs from './CategoryTabs'
import FeaturedNews from './FeaturedNews'

const MainContent: React.FC = () => {
  const pathname = usePathname()

  const selectedCategory = useMemo(() => {
    const map: Record<string, string> = {
      '/': 'All News',
      '/news/crime': 'Crime',
      '/news/politics': 'Politics',
      '/news/events': 'Events',
      '/news/jobs': 'Jobs',
    }
    return map[pathname] ?? 'All News'
  }, [pathname])

  return (
    <main className="max-w-7xl mx-auto space-y-8">
      <Hero />
      <CategoryTabs />
      <FeaturedNews selectedCategory={selectedCategory} />
    </main>
  )
}

export default MainContent
