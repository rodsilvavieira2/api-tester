export type GetProjectItemsParams = {
  projectID: string
}

export type CreateNewProjectItemParams = {
  projectID: string,
  name: string
}

export type UpdateProjectItemParams = {
  projectID: string,
  projectItemID: string
  name: string
}

export type DeleteProjectItemParams = {
  projectID: string
  projectItemID: string
}

export type GeProjectItemExploreParams = {
  projectID: string
  projectItemID: string
}
