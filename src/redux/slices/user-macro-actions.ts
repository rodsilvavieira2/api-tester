import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { SortBy } from '../../@types'
import { localStorageKeys } from '../../config'
import { projectsApiSlice, selectAllProjects } from '../apis'
import { RootState } from '../store'

type ProjectItemInfo = {
  currentProjectItemName: string
  isOpen: boolean
}

type RenameProjectItemInfo = {
  currentProjectItemName: string
  isOpen: boolean
  id: string
}

type NewProjectItemFolderInfo = {
  id: string
  isOpen: boolean
}

type AvailableProject = {
  id: string
  name: string
}

type UserMacroActionsState = {
  searchValue: string
  currentProject: string
  sortBy: SortBy
  isCreateNewProjectModalOpen: boolean
  isCreateNewProjectItemModalOpen: boolean
  duplicateProjectItemInfo: ProjectItemInfo
  renameProjectItemInfo: RenameProjectItemInfo
  newProjectItemFolderInfo: NewProjectItemFolderInfo
  availableProjects: AvailableProject[]
}

const currentProjectLocalStore = window.localStorage.getItem(
  localStorageKeys.currentProject
)

const initialState: UserMacroActionsState = {
  isCreateNewProjectModalOpen: false,
  sortBy: 'newest',
  renameProjectItemInfo: {
    id: '',
    currentProjectItemName: '',
    isOpen: false
  },
  newProjectItemFolderInfo: {
    id: '',
    isOpen: false
  },
  duplicateProjectItemInfo: {
    currentProjectItemName: '',
    isOpen: false
  },
  isCreateNewProjectItemModalOpen: false,
  searchValue: '',
  currentProject: currentProjectLocalStore ?? '',
  availableProjects: []
}

const userMacroActionsSlice = createSlice({
  name: 'userMarcoActions',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload
    },
    setCurrentProject: (state, action: PayloadAction<string>) => {
      state.currentProject = action.payload
    },
    toggleCreateNewProjectOpen: (state) => {
      state.isCreateNewProjectModalOpen = !state.isCreateNewProjectModalOpen
    },
    toggleCreateNewProjectItemOpen: (state) => {
      state.isCreateNewProjectItemModalOpen =
        !state.isCreateNewProjectItemModalOpen
    },
    setDuplicateProjectItemInfo: (
      state,
      action: PayloadAction<ProjectItemInfo>
    ) => {
      state.duplicateProjectItemInfo = action.payload
    },
    setRenameProjectItemInfo: (
      state,
      action: PayloadAction<RenameProjectItemInfo>
    ) => {
      state.renameProjectItemInfo = action.payload
    },
    setNewProjectItemFolderInfo: (
      state,
      action: PayloadAction<NewProjectItemFolderInfo>
    ) => {
      state.newProjectItemFolderInfo = action.payload
    },
    setSortBy: (state, action: PayloadAction<SortBy>) => {
      state.sortBy = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      projectsApiSlice.endpoints.getAllProjects.matchFulfilled,
      (state, { payload }) => {
        const projects = selectAllProjects(payload)

        state.availableProjects = projects.map(({ id, name }) => ({ id, name }))

        if (!state.currentProject.length) {
          if (projects.length) {
            state.currentProject = projects[0].name
          }
        }
      }
    )
  }
})

export const userMacroActionsReducer = userMacroActionsSlice.reducer

export const {
  setSearchValue,
  setCurrentProject,
  toggleCreateNewProjectOpen,
  toggleCreateNewProjectItemOpen,
  setDuplicateProjectItemInfo,
  setRenameProjectItemInfo,
  setNewProjectItemFolderInfo,
  setSortBy
} = userMacroActionsSlice.actions

export const selectSearchValue = (state: RootState) =>
  state.userMacroActions.searchValue

export const selectCurrentProject = (state: RootState) =>
  state.userMacroActions.currentProject

export const selectAvailableProjects = (state: RootState) =>
  state.userMacroActions.availableProjects

export const selectIsCreateNewProjectModalOpen = (state: RootState) =>
  state.userMacroActions.isCreateNewProjectModalOpen

export const selectIsCreateNewProjectItemModalOpen = (state: RootState) =>
  state.userMacroActions.isCreateNewProjectItemModalOpen

export const selectDuplicateProjectItemInfo = (state: RootState) =>
  state.userMacroActions.duplicateProjectItemInfo

export const selectRenameProjectItemInfo = (state: RootState) =>
  state.userMacroActions.renameProjectItemInfo

export const selectSortBy = (state: RootState) => state.userMacroActions.sortBy

export const selectNewProjectItemFolderInfo = (state: RootState) =>
  state.userMacroActions.newProjectItemFolderInfo
