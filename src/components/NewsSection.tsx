'use client'

import { usePathname } from 'next/navigation'
import CategoryTabs from './CategoryTabs'
import FeaturedNews from './FeaturedNews'

const PATH_TO_CATEGORY: Record<string, string> = {
  '/':               'All News',
  '/news/crime':     'Crime',
  '/news/politics':  'Politics',
  '/news/events':    'Events',
  '/news/jobs':      'Jobs',
}

const NewsSection: React.FC = () => {
  const pathname = usePathname()
  const category = PATH_TO_CATEGORY[pathname] ?? 'All News'

  return (
    <div className="space-y-8">
      <CategoryTabs />
      <FeaturedNews selectedCategory={category} />
    </div>
  )
}

export default NewsSection
