'use client'

import { useState, useEffect } from 'react'
import CategoryTabs from './CategoryTabs'
import FeaturedNews from './FeaturedNews'

const categoryItems = ['Crime', 'Politics', 'Events', 'Jobs']

interface NewsSectionProps {
  sidebarCategory: string
}

const NewsSection: React.FC<NewsSectionProps> = ({ sidebarCategory }) => {
  // If sidebar clicked a category, use it; otherwise default to All News
  const initial = categoryItems.includes(sidebarCategory) ? sidebarCategory : 'All News'
  const [selectedCategory, setSelectedCategory] = useState(initial)

  // Sync when sidebar selection changes
  useEffect(() => {
    setSelectedCategory(categoryItems.includes(sidebarCategory) ? sidebarCategory : 'All News')
  }, [sidebarCategory])

  return (
    <div className="space-y-8">
      <CategoryTabs selected={selectedCategory} onSelect={setSelectedCategory} />
      <FeaturedNews selectedCategory={selectedCategory} />
    </div>
  )
}

export default NewsSection
