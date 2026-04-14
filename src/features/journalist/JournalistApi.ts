import { baseApi } from '../baseApi'

export interface JournalistArticle {
  id: string
  title: string
  summary: string
  category: string
  image: string
  status: 'approved' | 'pending' | 'rejected'
  likes: number
  comments: number
  views: number
  createdAt: string
}

export interface JournalistProfile {
  id: string
  name: string
  email: string
  beat: string
  location: string
  bio: string
  followers: number
  articles: number
  verified: boolean
}

export const JournalistApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Auth
    journalistLogin: builder.mutation<{ token: string; journalist: JournalistProfile }, { email: string; password: string }>({
      query: (body) => ({ url: '/journalist/login', method: 'POST', body }),
    }),

    // Articles
    getMyArticles: builder.query<JournalistArticle[], void>({
      query: () => '/journalist/articles',
      providesTags: ['Journalist'],
    }),
    createArticle: builder.mutation<JournalistArticle, Partial<JournalistArticle>>({
      query: (body) => ({ url: '/journalist/articles', method: 'POST', body }),
      invalidatesTags: ['Journalist'],
    }),
    updateArticle: builder.mutation<JournalistArticle, { id: string } & Partial<JournalistArticle>>({
      query: ({ id, ...body }) => ({ url: `/journalist/articles/${id}`, method: 'PUT', body }),
      invalidatesTags: ['Journalist'],
    }),
    deleteArticle: builder.mutation<void, string>({
      query: (id) => ({ url: `/journalist/articles/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Journalist'],
    }),

    // Profile
    getJournalistProfile: builder.query<JournalistProfile, void>({
      query: () => '/journalist/profile',
      providesTags: ['Journalist'],
    }),
    updateJournalistProfile: builder.mutation<JournalistProfile, Partial<JournalistProfile>>({
      query: (body) => ({ url: '/journalist/profile', method: 'PUT', body }),
      invalidatesTags: ['Journalist'],
    }),

    // Stats
    getJournalistStats: builder.query<{ totalArticles: number; totalLikes: number; totalViews: number; totalComments: number }, void>({
      query: () => '/journalist/stats',
      providesTags: ['Journalist'],
    }),
  }),
})

export const {
  useJournalistLoginMutation,
  useGetMyArticlesQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
  useGetJournalistProfileQuery,
  useUpdateJournalistProfileMutation,
  useGetJournalistStatsQuery,
} = JournalistApi
