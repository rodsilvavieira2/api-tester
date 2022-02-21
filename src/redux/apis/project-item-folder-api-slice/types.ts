import { HttpMethods } from '../../../@types'

export type GetProjectItemDetailsDetails = {
  projectID: string
  projectItemID: string
}

export type NewProjectItemFolderParams = {
  projectID: string
  projectItemID: string
  name: string
}

export type NewProjectItemRequestParams = {
  projectID: string
  projectItemID: string
  parentID?: string
  name: string
  method: HttpMethods
}

export type DeleteProjectItemFolderParams = {
  projectID: string
  projectItemID: string
  folderID: string
}

export type UpdateProjectItemFolderParams = {
  id: string
  name: string
}
