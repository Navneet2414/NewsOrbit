import Hero from '../components/Hero'
import NewsSection from '../components/NewsSection'
import TrendingPanel from '../components/TrendingPanel'
import Footer from '../components/Footer'

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_20rem]">
        <div className="lg:col-span-2 lg:row-start-1"><Hero /></div>
        <div className="lg:col-start-1 lg:row-start-2">
          <div className="lg:hidden mb-8"><TrendingPanel /></div>
          <NewsSection sidebarCategory="All News" />
        </div>
        <aside className="hidden lg:block lg:col-start-2 lg:row-start-2">
          <div className="sticky top-6"><TrendingPanel /></div>
        </aside>
        <div className="lg:col-span-2 lg:row-start-3"><Footer /></div>
      </div>
    </div>
  )
}
