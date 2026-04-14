import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AdminAuthState {
  token: string | null
  admin: { id: string; name: string; email: string; role: 'admin' } | null
}

const initialState: AdminAuthState = { token: null, admin: null }

const adminAuthSlice = createSlice({
  name: 'adminAuth',
  initialState,
  reducers: {
    setAdminCredentials(state, action: PayloadAction<{ token: string; admin: AdminAuthState['admin'] }>) {
      state.token = action.payload.token
      state.admin = action.payload.admin
    },
    clearAdminCredentials(state) {
      state.token = null
      state.admin = null
    },
  },
})

export const { setAdminCredentials, clearAdminCredentials } = adminAuthSlice.actions
export default adminAuthSlice.reducer
