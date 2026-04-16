import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface JournalistAuthState {
  token: string | null
  journalist: { id: string; name: string; email: string; role: 'journalist'; beat: string } | null
}

const initialState: JournalistAuthState = { token: null, journalist: null }

const journalistAuthSlice = createSlice({
  name: 'journalistAuth',
  initialState,
  reducers: {
    setJournalistCredentials(state, action: PayloadAction<{ token: string; journalist: JournalistAuthState['journalist'] }>) {
      state.token = action.payload.token
      state.journalist = action.payload.journalist
    },
    clearJournalistCredentials(state) {
      state.token = null
      state.journalist = null
    },
  },
})

export const { setJournalistCredentials, clearJournalistCredentials } = journalistAuthSlice.actions
export default journalistAuthSlice.reducer
