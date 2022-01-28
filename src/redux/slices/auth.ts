import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { User } from '../../@types'
import { baseApi } from '../apis'
import { RootState } from '../store'

type AuthInitialState = {
  user: User | null
  tokens: {
    accessToken: string | null
    refreshToken: string | null
  }
}

const initialState: AuthInitialState = {
  user: null,
  tokens: {
    accessToken: null,
    refreshToken: null
  }
}

type SetTokesPayload = {
  accessToken: string | null
  refreshToken: string | null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<SetTokesPayload>) => {
      state.tokens = action.payload
    },
    logout: () => {
      return initialState
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      baseApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.user
        state.tokens = payload.tokens
      }
    )
  }
})

export const authReducer = authSlice.reducer

export const selectUser = (state: RootState) => state.auth.user

export const { logout, setTokens } = authSlice.actions
