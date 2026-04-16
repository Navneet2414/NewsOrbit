import { baseApi } from '../baseApi'

export interface AdminStats {
  totalPosts: number
  approved: number
  pending: number
  users: number
}

export interface AdminPost {
  id: string
  title: string
  category: string
  status: 'approved' | 'pending' | 'rejected'
  author: string
  createdAt: string
}

export interface AdminUser {
  id: string
  name: string
  email: string
  role: 'admin' | 'journalist' | 'user'
  createdAt: string
}

export const AdminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Auth
    adminLogin: builder.mutation<{ success: boolean; token: string; data: AdminUser }, { email: string; password: string }>({
      query: (body) => ({ url: '/admin/login', method: 'POST', body }),
    }),

    // Dashboard stats
    getAdminStats: builder.query<AdminStats, void>({
      query: () => '/admin/stats',
      providesTags: ['Admin'],
    }),

    // Posts / content moderation
    getAllPosts: builder.query<AdminPost[], void>({
      query: () => '/admin/posts',
      providesTags: ['Admin'],
    }),
    updatePostStatus: builder.mutation<AdminPost, { id: string; status: AdminPost['status'] }>({
      query: ({ id, status }) => ({ url: `/admin/posts/${id}/status`, method: 'PATCH', body: { status } }),
      invalidatesTags: ['Admin'],
    }),
    deletePost: builder.mutation<void, string>({
      query: (id) => ({ url: `/admin/posts/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Admin'],
    }),

    // User management
    getAllUsers: builder.query<AdminUser[], void>({
      query: () => '/admin/users',
      providesTags: ['Admin'],
    }),
    updateUserRole: builder.mutation<AdminUser, { id: string; role: AdminUser['role'] }>({
      query: ({ id, role }) => ({ url: `/admin/users/${id}/role`, method: 'PATCH', body: { role } }),
      invalidatesTags: ['Admin'],
    }),
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({ url: `/admin/users/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Admin'],
    }),

    // Admin profile
    getAdminProfile: builder.query<AdminUser, void>({
      query: () => '/admin/profile',
      providesTags: ['Admin'],
    }),
    updateAdminProfile: builder.mutation<AdminUser, Partial<AdminUser>>({
      query: (body) => ({ url: '/admin/profile', method: 'PUT', body }),
      invalidatesTags: ['Admin'],
    }),
  }),
})

export const {
  useAdminLoginMutation,
  useGetAdminStatsQuery,
  useGetAllPostsQuery,
  useUpdatePostStatusMutation,
  useDeletePostMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
  useGetAdminProfileQuery,
  useUpdateAdminProfileMutation,
} = AdminApi
