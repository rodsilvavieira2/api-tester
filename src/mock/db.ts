import { factory, primaryKey, nullable, oneOf } from '@mswjs/data'

export const db = factory({
  user: {
    id: primaryKey(String),
    fullName: String,
    email: String,
    password: String,
    avatarURL: nullable(String),
    created_at: String,
    updated_at: String
  },
  tokens: {
    id: primaryKey(String),
    token: String,
    owner: oneOf('user'),
    created_at: String,
    updated_at: String
  },
  projects: {
    id: primaryKey(String),
    owner: oneOf('user'),
    name: String,
    created_at: String,
    updated_at: String
  },
  projectItems: {
    id: primaryKey(String),
    name: String,
    project: oneOf('projects'),
    created_at: String,
    updated_at: String
  },
  projectItemFolders: {
    id: primaryKey(String),
    name: String,
    projectItem: oneOf('projectItems'),
    created_at: String,
    updated_at: String
  },
  projectItemRequests: {
    id: primaryKey(String),
    name: String,
    method: String,
    projectItem: oneOf('projectItems'),
    projectItemFolder: nullable(oneOf('projectItemFolders')),
    created_at: String,
    updated_at: String
  }
})
