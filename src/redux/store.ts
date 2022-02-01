import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'

import { baseApi } from './apis'
import { UpdateLocalStorage } from './middlewares'
import { authReducer, userMacroActionsReducer } from './slices'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
    userMacroActions: userMacroActionsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware, UpdateLocalStorage)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
