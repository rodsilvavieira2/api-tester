type DateIndicators = {
  created_at: string
  updated_at: string
}

export type ID = string

export type User = {
  id: ID
  fullName: string
  email: string
  avatarURL: string | null
} & DateIndicators

export type ProjectItem = {
  id: string
  name: string
} & DateIndicators

export type Project = {
  id: string
  name: string
  ownerID: string
  items: ProjectItem[]
} & DateIndicators

export type JWTs = {
  accessToken: string
  refreshToken: string
}

export type HttpMethods =
  | 'POST'
  | 'GET'
  | 'PUT'
  | 'PATCH'
  | 'DELETE'
  | 'OPTIONS'
  | 'HEAD'

export type CustomError<T> = {
  status: number
  data?: {
    code?: T
    message?: string
  }
}

export type SortBy = 'newest' | 'oldest' | 'ascending' | 'descending'

export type ProjectItemFolderChildren = {
  id: string
  method: HttpMethods
  name: string
}

export type ProjectItemFolder = {
  id: string
  name: string
  children: ProjectItemFolderChildren[]
} & DateIndicators

export type ProjectItemDetails = {
  requests: {
    folders: ProjectItemFolder[]
    alone: ProjectItemFolderChildren[]
  }
}
