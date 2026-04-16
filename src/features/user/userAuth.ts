import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserAuthState {
  token: string | null
  user: { id: string; name: string; email: string; role: 'user' } | null
}

const initialState: UserAuthState = { token: null, user: null }

const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    setUserCredentials(state, action: PayloadAction<{ token: string; user: UserAuthState['user'] }>) {
      state.token = action.payload.token
      state.user = action.payload.user
    },
    clearUserCredentials(state) {
      state.token = null
      state.user = null
    },
  },
})

export const { setUserCredentials, clearUserCredentials } = userAuthSlice.actions
export default userAuthSlice.reducer
