import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { localStorageKeys } from '../../../config'
import { getOnStorage } from '../../../utils/local-storage'
import { RootState } from '../../store'
import { AlertData, ModalData, SortBy, ToastData, UserMacroActionsState } from './types'

const currentProjectIDtLocalStore =
  getOnStorage(localStorageKeys.currentProject, 'localStorage') ||
  getOnStorage(localStorageKeys.currentProject, 'sessionStorage')

const sortBy = (getOnStorage(localStorageKeys.sortBy, 'localStorage') ||
  getOnStorage(localStorageKeys.sortBy, 'sessionStorage') ||
  'oldest') as SortBy

const initialState: UserMacroActionsState = {
  sortBy: sortBy,
  searchValue: '',
  toastData: null,
  alertData: {
    id: null,
    type: 'no-action',
    isOpen: false,
    defaultValues: {}
  },
  modalData: {
    id: null,
    isOpen: false,
    type: 'no-action'
  },
  currentProjectID: currentProjectIDtLocalStore ?? ''
}

const userMacroActionsSlice = createSlice({
  name: 'userMarcoActions',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload
    },
    setCurrentProjectID: (state, action: PayloadAction<string>) => {
      state.currentProjectID = action.payload
    },
    setSortBy: (state, action: PayloadAction<SortBy>) => {
      state.sortBy = action.payload
    },
    setModalData: (
      state,
      action: PayloadAction<Omit<ModalData, 'id'> & Partial<Pick<ModalData, 'id'>>>
    ) => {
      const { id = null, isOpen = true, ...rest } = action.payload
      state.modalData = { id, isOpen, ...rest }
    },
    setToastData: (state, action: PayloadAction<ToastData | null>) => {
      if (action.payload) {
        const {
          description,
          status = 'success',
          title,
          duration = 3000,
          isClosable = true,
          variant = 'left-accent'
        } = action.payload

        state.toastData = {
          description,
          status,
          title,
          duration,
          isClosable,
          variant
        }
      }
    },
    setAlertData: (
      state,
      action: PayloadAction<
        Pick<AlertData, 'type'> & Partial<Omit<AlertData, 'type'>>
      >
    ) => {
      const {
        id = null,
        isOpen = true,
        defaultValues = {},
        ...rest
      } = action.payload

      state.alertData = { id, isOpen, defaultValues, ...rest }
    }
  }
})

export const userMacroActionsReducer = userMacroActionsSlice.reducer

export const {
  setSearchValue,
  setCurrentProjectID,
  setSortBy,
  setModalData,
  setToastData,
  setAlertData
} = userMacroActionsSlice.actions

export const selectSearchValue = (state: RootState) =>
  state.userMacroActions.searchValue

export const selectCurrentProjectID = (state: RootState) =>
  state.userMacroActions.currentProjectID

export const selectModalData = (state: RootState) =>
  state.userMacroActions.modalData

export const selectSortBy = (state: RootState) => state.userMacroActions.sortBy

export const selectToastData = (state: RootState) =>
  state.userMacroActions.toastData

export const selectAlertData = (state: RootState) =>
  state.userMacroActions.alertData
