import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { SortBy } from '../../@types'
import { localStorageKeys } from '../../config'
import { getOnStorage } from '../../utils/local-storage'
import { RootState } from '../store'

export type ProjectDecisionActions = 'project.create' | 'project.rename'

export type ProjectItemDecisionActions =
  | 'project_item.create'
  | 'project_item.rename'
  | 'project_item.delete'
  | 'project_item.duplicate'

export type ProjectItemFolderDecisionActions =
  | 'project_item_folder.create'
  | 'project_item_folder.rename'
  | 'project_item_folder.delete'
  | 'project_item_folder.duplicate'

export type ProjectItemRequestDecisionActions =
  | 'project_item_request.create'
  | 'project_item_request.rename'
  | 'project_item_request.delete'
  | 'project_item_request.duplicate'

export type DecisionActionType =
  | ProjectDecisionActions
  | ProjectItemDecisionActions
  | ProjectItemFolderDecisionActions
  | ProjectItemRequestDecisionActions
  | 'no-action'

type Obj = Record<string, unknown>

type DecisionAction = {
  id: string | null
  type: DecisionActionType
  defaultValues?: Obj
  isOpen?: boolean
}

export type ToastData = {
  title: string
  description: string
  isClosable?: boolean
  duration?: null | number
  variant?: 'subtle' | 'solid' | 'left-accent' | 'top-accent'
  status?: 'info' | 'warning' | 'success' | 'error'
}

type UserMacroActionsState = {
  searchValue: string
  currentProjectID: string
  sortBy: SortBy
  decisionAction: DecisionAction
  toastData: ToastData | null
}

const currentProjectIDtLocalStore =
  getOnStorage(localStorageKeys.currentProject, 'localStorage') ||
  getOnStorage(localStorageKeys.currentProject, 'sessionStorage')

const initialState: UserMacroActionsState = {
  sortBy: 'newest',
  searchValue: '',
  toastData: null,
  decisionAction: {
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
    setDecisionAction: (state, action: PayloadAction<DecisionAction>) => {
      const { isOpen = true, ...rest } = action.payload
      state.decisionAction = { isOpen, ...rest }
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
    }
  }
})

export const userMacroActionsReducer = userMacroActionsSlice.reducer

export const {
  setSearchValue,
  setCurrentProjectID,
  setSortBy,
  setDecisionAction,
  setToastData
} = userMacroActionsSlice.actions

export const selectSearchValue = (state: RootState) =>
  state.userMacroActions.searchValue

export const selectCurrentProjectID = (state: RootState) =>
  state.userMacroActions.currentProjectID

export const selectDecisionAction = (state: RootState) =>
  state.userMacroActions.decisionAction

export const selectSortBy = (state: RootState) => state.userMacroActions.sortBy

export const selectToastData = (state: RootState) =>
  state.userMacroActions.toastData
