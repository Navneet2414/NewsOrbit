'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

const CATEGORIES = ['All News', 'Crime', 'Politics', 'Events', 'Jobs'] as const
export type Category = typeof CATEGORIES[number]

interface CategoryContextType {
  selected: Category
  setSelected: (c: Category) => void
  categories: readonly Category[]
}

const CategoryContext = createContext<CategoryContextType>({
  selected: 'All News',
  setSelected: () => {},
  categories: CATEGORIES,
})

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [selected, setSelected] = useState<Category>('All News')
  return (
    <CategoryContext.Provider value={{ selected, setSelected, categories: CATEGORIES }}>
      {children}
    </CategoryContext.Provider>
  )
}

export const useCategory = () => useContext(CategoryContext)
