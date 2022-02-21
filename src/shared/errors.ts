export type ProjectItemCodeErrors =
  | 'project-item.name-already-exists'
  | 'project-item.not-found'
  | 'project-item.folder-name-already-exists'

export type ProjectCodeErrors =
  | 'project.project-name-not-found'
  | 'project.name-already-exists'
  | 'project.server-error'

export type AuthCodeErrors =
  | 'auth.invalid_credentials'
  | 'auth.email_already_exists'
