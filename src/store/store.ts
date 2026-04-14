import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from '../features/baseApi'
import adminAuthReducer from '../features/admin/adminauth'
import journalistAuthReducer from '../features/journalist/journalistAuth'
import userAuthReducer from '../features/user/userAuth'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    adminAuth: adminAuthReducer,
    journalistAuth: journalistAuthReducer,
    userAuth: userAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
