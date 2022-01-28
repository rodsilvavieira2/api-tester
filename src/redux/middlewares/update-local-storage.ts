import { Middleware } from 'redux'

import { localStorageKeys } from '../../config'

export const UpdateLocalStorage: Middleware = () => (next) => (action) => {
  switch (action.type) {
    case 'baseApi/executeMutation/fulfilled': {
      if (action.meta.arg.endpointName === 'login') {
        window.localStorage.setItem(
          localStorageKeys.accessToken,
          action.payload.tokens.accessToken
        )

        window.localStorage.setItem(
          localStorageKeys.refreshToken,
          action.payload.tokens.refreshToken
        )
      }
      break
    }

    case 'auth/logout': {
      window.localStorage.removeItem(localStorageKeys.accessToken)

      window.localStorage.removeItem(localStorageKeys.refreshToken)
      break
    }

    case 'userMarcoActions/setCurrentProject': {
      window.localStorage.setItem(
        localStorageKeys.currentProject,
        action.payload
      )
      break
    }

    default: {
      return next(action)
    }
  }

  return next(action)
}
