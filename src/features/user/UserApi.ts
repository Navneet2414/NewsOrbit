import { baseApi } from '../baseApi'

export interface UserProfile {
  id: string
  name: string
  email: string
  location: string
  bio: string
  avatar: string
  bookmarks: number
  following: number
  followers: number
  joinedDate: string
}

export interface UserBookmark {
  id: string
  newsId: string
  title: string
  category: string
  image: string
  savedAt: string
}

export interface UserNotification {
  id: string
  message: string
  read: boolean
  createdAt: string
}

export const UserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Auth
    userLogin: builder.mutation<{ success: boolean; token: string; data: UserProfile }, { email: string; password: string }>({
      query: (body) => ({ url: '/users/login', method: 'POST', body }),
    }),
    userRegister: builder.mutation<{ success: boolean; token: string; data: UserProfile }, { name: string; email: string; password: string }>({
      query: (body) => ({ url: '/users/register', method: 'POST', body }),
    }),

    // Profile
    getUserProfile: builder.query<UserProfile, void>({
      query: () => '/user/profile',
      providesTags: ['User'],
    }),
    updateUserProfile: builder.mutation<UserProfile, Partial<UserProfile>>({
      query: (body) => ({ url: '/user/profile', method: 'PUT', body }),
      invalidatesTags: ['User'],
    }),

    // Bookmarks
    getBookmarks: builder.query<UserBookmark[], void>({
      query: () => '/user/bookmarks',
      providesTags: ['User'],
    }),
    addBookmark: builder.mutation<UserBookmark, string>({
      query: (newsId) => ({ url: '/user/bookmarks', method: 'POST', body: { newsId } }),
      invalidatesTags: ['User'],
    }),
    removeBookmark: builder.mutation<void, string>({
      query: (id) => ({ url: `/user/bookmarks/${id}`, method: 'DELETE' }),
      invalidatesTags: ['User'],
    }),

    // Notifications
    getNotifications: builder.query<UserNotification[], void>({
      query: () => '/user/notifications',
      providesTags: ['User'],
    }),
    markNotificationRead: builder.mutation<void, string>({
      query: (id) => ({ url: `/user/notifications/${id}/read`, method: 'PATCH' }),
      invalidatesTags: ['User'],
    }),
  }),
})

export const {
  useUserLoginMutation,
  useUserRegisterMutation,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useGetBookmarksQuery,
  useAddBookmarkMutation,
  useRemoveBookmarkMutation,
  useGetNotificationsQuery,
  useMarkNotificationReadMutation,
} = UserApi
