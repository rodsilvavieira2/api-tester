import { Middleware } from 'redux'

import { localStorageKeys } from '../../config'
import { removeOfStorage, saveOnStorage, StorageType } from '../../utils'
import { RootState } from '../store'

export const UpdateLocalStorage: Middleware = (state) => (next) => (action) => {
  const currentState = state.getState() as RootState

  let storageType:StorageType = 'sessionStorage'

  if (currentState.auth.shouldRememberMe) storageType = 'localStorage'

  switch (action.type) {
    case 'baseApi/executeMutation/fulfilled': {
      if (
        action.meta.arg.endpointName === 'login' ||
        action.meta.arg.endpointName === 'createNewUser'
      ) {
        saveOnStorage({
          key: localStorageKeys.accessToken,
          data: action.payload.tokens.accessToken,
          storageType
        })

        saveOnStorage({
          key: localStorageKeys.refreshToken,
          data: action.payload.tokens.refreshToken,
          storageType
        })
      }
      break
    }

    case 'auth/logout': {
      removeOfStorage({ key: localStorageKeys.accessToken, storageType })

      removeOfStorage({ key: localStorageKeys.refreshToken, storageType })
      break
    }

    case 'userMarcoActions/setCurrentProjectID': {
      saveOnStorage({
        key: localStorageKeys.currentProject,
        data: action.payload,
        storageType
      })
      break
    }

    default: {
      return next(action)
    }
  }

  return next(action)
}
