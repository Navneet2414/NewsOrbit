import CategoryNews from '../../../components/Sidebartab/Categorynews'

const VALID = ['crime', 'politics', 'events', 'jobs']

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const cat = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
  if (!VALID.includes(category.toLowerCase())) return <p className="p-8 text-slate-500">Category not found.</p>
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6">
      <CategoryNews category={cat} />
    </div>
  )
}

export function generateStaticParams() {
  return VALID.map((c) => ({ category: c }))
}
