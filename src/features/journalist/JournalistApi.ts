import { baseApi } from '../baseApi'

export interface JournalistArticle {
  _id: string
  title: string
  summary: string
  content: string
  category: string
  city: string
  image: string
  imagekitFileId?: string
  isPublished: boolean
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
  city: string
  bio: string
  followers: number
  articles: number
  verified: boolean
}

export interface UploadResponse {
  success: boolean
  url: string
  fileId: string
}

export const JournalistApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    journalistLogin: builder.mutation<{ token: string; data: JournalistProfile }, { email: string; password: string }>({
      query: (body) => ({ url: '/journalist/login', method: 'POST', body }),
    }),

    uploadImage: builder.mutation<UploadResponse, { base64: string; fileName: string; folder?: string }>({
      query: (body) => ({ url: '/upload', method: 'POST', body }),
    }),

    getMyArticles: builder.query<JournalistArticle[], void>({
      query: () => '/journalist/news',
      providesTags: ['Journalist'],
      transformResponse: (res: { success: boolean; data: JournalistArticle[] }) => res.data,
    }),

    getArticleById: builder.query<JournalistArticle, string>({
      query: (id) => `/journalist/news/${id}`,
      providesTags: ['Journalist'],
      transformResponse: (res: { success: boolean; data: JournalistArticle }) => res.data,
    }),

    createArticle: builder.mutation<JournalistArticle, Partial<JournalistArticle>>({
      query: (body) => ({ url: '/journalist/news', method: 'POST', body }),
      invalidatesTags: ['Journalist'],
      transformResponse: (res: { success: boolean; data: JournalistArticle }) => res.data,
    }),

    updateArticle: builder.mutation<JournalistArticle, { id: string } & Partial<JournalistArticle>>({
      query: ({ id, ...body }) => ({ url: `/journalist/news/${id}`, method: 'PUT', body }),
      invalidatesTags: ['Journalist'],
      transformResponse: (res: { success: boolean; data: JournalistArticle }) => res.data,
    }),

    deleteArticle: builder.mutation<void, string>({
      query: (id) => ({ url: `/journalist/news/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Journalist'],
    }),

    getJournalistProfile: builder.query<JournalistProfile, void>({
      query: () => '/journalist/profile',
      providesTags: ['Journalist'],
      transformResponse: (res: { success: boolean; data: JournalistProfile }) => res.data,
    }),

    updateJournalistProfile: builder.mutation<JournalistProfile, Partial<JournalistProfile>>({
      query: (body) => ({ url: '/journalist/profile', method: 'PUT', body }),
      invalidatesTags: ['Journalist'],
    }),
  }),
})

export const {
  useJournalistLoginMutation,
  useUploadImageMutation,
  useGetMyArticlesQuery,
  useGetArticleByIdQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
  useGetJournalistProfileQuery,
  useUpdateJournalistProfileMutation,
} = JournalistApi
