import { Obj } from '../../../@types'

export type SortBy = 'newest' | 'oldest' | 'ascending' | 'descending'

export type ProjectModalTypes = 'project.create' | 'project.rename'

export type ProjectItemModalTypes =
  | 'project_item.create'
  | 'project_item.rename'
  | 'project_item.duplicate'

export type ProjectItemFolderModalTypes =
  | 'project_item_folder.create'
  | 'project_item_folder.rename'
  | 'project_item_folder.delete'
  | 'project_item_folder.duplicate'

export type ProjectItemRequestModalTypes =
  | 'project_item_request.create'
  | 'project_item_request.rename'
  | 'project_item_request.delete'
  | 'project_item_request.duplicate'

export type DecisionActionType =
  | ProjectModalTypes
  | ProjectItemModalTypes
  | ProjectItemFolderModalTypes
  | ProjectItemRequestModalTypes
  | 'no-action'

export type ModalData = {
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

export type ProjectAlertsTypes = 'project.delete'
export type ProjectItemAlertsTypes = 'project_item.delete'
export type ProjectItemFolderAlertsTypes = 'project_item_folder.delete'

export type AlertTypes =
  | ProjectAlertsTypes
  | ProjectItemAlertsTypes
  | ProjectItemFolderAlertsTypes

export type AlertData = {
  id: string | null
  type: AlertTypes | 'no-action'
  defaultValues: Obj
  isOpen: boolean
}

export type UserMacroActionsState = {
  searchValue: string
  currentProjectID: string
  sortBy: SortBy
  modalData: ModalData
  alertData: AlertData
  toastData: ToastData | null
}
