import { baseApi } from '../baseApi'
import type { NewsItem } from '../../types/news'

export interface DBNewsItem {
  _id: string
  title: string
  summary: string
  content: string
  category: string
  city: string
  image: string
  isPublished: boolean
  authorId: { _id: string; name: string } | string
  views: number
  comments: number
  createdAt: string
}

export interface PaginatedNewsResponse {
  data: DBNewsItem[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasMore: boolean
  }
}

export interface NewsQueryParams {
  page?: number
  limit?: number
  category?: string
}

export const NewsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPublicNews: builder.query<PaginatedNewsResponse, NewsQueryParams>({
      query: ({ page = 1, limit = 6, category } = {}) => {
        const params = new URLSearchParams({ page: String(page), limit: String(limit) })
        if (category && category !== 'All News') params.set('category', category)
        return `/users/news?${params.toString()}`
      },
      providesTags: ['News'],
      transformResponse: (res: { success: boolean } & PaginatedNewsResponse) => ({
        data: res.data ?? [],
        pagination: res.pagination,
      }),
      serializeQueryArgs: ({ queryArgs }) => queryArgs.category ?? 'All News',
      merge: (cache, incoming, { arg }) => {
        if ((arg.page ?? 1) === 1) return incoming
        return { data: [...cache.data, ...incoming.data], pagination: incoming.pagination }
      },
      forceRefetch: ({ currentArg, previousArg }) =>
        currentArg?.page !== previousArg?.page ||
        currentArg?.category !== previousArg?.category,
    }),

    getNewsByCategory: builder.query<PaginatedNewsResponse, NewsQueryParams>({
      query: ({ page = 1, limit = 6, category = 'All News' } = {}) => {
        if (!category || category === 'All News') {
          return `/users/news?page=${page}&limit=${limit}`
        }
        return `/users/news/category/${encodeURIComponent(category)}?page=${page}&limit=${limit}`
      },
      providesTags: ['News'],
      transformResponse: (res: { success: boolean } & PaginatedNewsResponse) => ({
        data: res.data ?? [],
        pagination: res.pagination,
      }),
      serializeQueryArgs: ({ queryArgs }) => `cat-${queryArgs.category ?? 'All News'}`,
      merge: (cache, incoming, { arg }) => {
        if ((arg.page ?? 1) === 1) return incoming
        return { data: [...cache.data, ...incoming.data], pagination: incoming.pagination }
      },
      forceRefetch: ({ currentArg, previousArg }) =>
        currentArg?.page !== previousArg?.page ||
        currentArg?.category !== previousArg?.category,
    }),

    getPublicNewsById: builder.query<DBNewsItem, string>({
      query: (id) => `/users/news/${id}`,
      providesTags: (_r, _e, id) => [{ type: 'News', id }],
      transformResponse: (res: { success: boolean; data: DBNewsItem }) => res.data,
    }),
  }),
})

export const { useGetPublicNewsQuery, useGetNewsByCategoryQuery, useGetPublicNewsByIdQuery } = NewsApi

export const dbNewsToNewsItem = (n: DBNewsItem): NewsItem => ({
  id:        n._id,
  category:  n.category,
  title:     n.title,
  summary:   n.summary,
  image:     n.image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&q=80',
  author:    typeof n.authorId === 'object' ? n.authorId.name : 'NewsOrbit',
  location:  n.city,
  timeLabel: new Date(n.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
  views:     n.views ?? 0,
  comments:  n.comments ?? 0,
  shares:    0,
  featured:  true,
})
