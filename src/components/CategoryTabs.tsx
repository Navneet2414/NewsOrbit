'use client'

const categories = ['All News', 'Crime', 'Politics', 'Events', 'Jobs']

interface CategoryTabsProps {
  selected: string
  onSelect: (category: string) => void
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ selected, onSelect }) => {
  return (
    <div className="mb-8 flex flex-wrap gap-3">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onSelect(category)}
          className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
            category === selected
              ? 'bg-blue-500 text-white shadow-[0_20px_50px_-30px_rgba(15,23,42,0.9)]'
              : 'bg-white text-slate-700 shadow-sm hover:bg-slate-50'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}

export default CategoryTabs
