import Hero from '../../../components/Hero'
import NewsSection from '../../../components/NewsSection'
import TrendingPanel from '../../../components/TrendingPanel'
import Footer from '../../../components/Footer'

const VALID = ['crime', 'politics', 'events', 'jobs']

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  if (!VALID.includes(category.toLowerCase())) {
    return <p className="p-8 text-slate-500">Category not found.</p>
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_20rem]">
        <div className="lg:col-span-2 lg:row-start-1"><Hero /></div>
        <div className="lg:col-start-1 lg:row-start-2">
          <div className="lg:hidden mb-8"><TrendingPanel /></div>
          <NewsSection />
        </div>
        <aside className="hidden lg:block lg:col-start-2 lg:row-start-2">
          <div className="sticky top-6"><TrendingPanel /></div>
        </aside>
        <div className="lg:col-span-2 lg:row-start-3"><Footer /></div>
      </div>
    </div>
  )
}

export function generateStaticParams() {
  return VALID.map((c) => ({ category: c }))
}
