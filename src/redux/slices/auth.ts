import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { User } from '../../@types'
import { localStorageKeys } from '../../config'
import { getOnStorage } from '../../utils'
import { baseApi } from '../apis'
import { RootState } from '../store'

const accessToken =
  getOnStorage(localStorageKeys.accessToken, 'localStorage') ||
  getOnStorage(localStorageKeys.accessToken, 'sessionStorage')

const refreshToken =
  getOnStorage(localStorageKeys.refreshToken, 'localStorage') ||
  getOnStorage(localStorageKeys.refreshToken, 'sessionStorage')

type AuthInitialState = {
  user: User | null
  shouldRememberMe:boolean
  tokens: {
    accessToken: string | null
    refreshToken: string | null
  }
}

const initialState: AuthInitialState = {
  user: null,
  shouldRememberMe: !!accessToken,
  tokens: {
    accessToken,
    refreshToken
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
      return {
        shouldRememberMe: false,
        tokens: {
          accessToken: null,
          refreshToken: null
        },
        user: null
      }
    },
    setShouldRememberMe: (state, action:PayloadAction<boolean>) => {
      state.shouldRememberMe = action.payload
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

    builder.addMatcher(
      baseApi.endpoints.getUser.matchFulfilled,
      (state, { payload }) => {
        state.user = payload
      }
    )

    builder.addMatcher(
      baseApi.endpoints.createNewUser.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.user
        state.tokens = payload.tokens
      }
    )
  }
})

export const authReducer = authSlice.reducer

export const selectUser = (state: RootState) => state.auth.user

export const selectAccessToken = (state:RootState) => state.auth.tokens.accessToken

export const selectRefreshToken = (state:RootState) => state.auth.tokens.refreshToken

export const { logout, setTokens, setShouldRememberMe } = authSlice.actions
