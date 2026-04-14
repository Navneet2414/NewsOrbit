import { useState } from 'react'
import Hero from './Hero'
import CategoryTabs from './CategoryTabs'
import FeaturedNews from './FeaturedNews'

const MainContent: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All News')

  return (
    <main className="max-w-7xl mx-auto space-y-8">
      <Hero />
      <CategoryTabs selected={selectedCategory} onSelect={setSelectedCategory} />
      <FeaturedNews selectedCategory={selectedCategory} />
    </main>
  )
}

export default MainContent
