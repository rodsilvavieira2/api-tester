import './seeds'
import { rest } from 'msw'

import { nanoid } from '@reduxjs/toolkit'

import { ProjectItem, ExplorerTreeNode } from '../@types'
import { db } from './db'
import { authMiddleware } from './middlewares'

type SessionBody = {
  email: string
  password: string
}

type NewUserBody = {
  fullName: string
  email: string
  password: string
}

type NewProjectsBody = {
  projectName: string
}

type NewProjectIemBody = {
  projectName: string
  projectItemName: string
}

type UpdateProjectItemBody = Partial<
  Omit<ProjectItem, 'id' | 'created_at' | 'updated_at'>
>

type NewProjectItemFolder = {
  name: string
}

type NewProjectItemRequest = {
  name: string
  method: string
  folderId?: string
}

export const handles = [
  rest.post<NewUserBody>('/new-user', (req, res, ctx) => {
    const { email, fullName, password } = req.body

    const isEmailInUse = db.user.findFirst({
      where: { email: { equals: email } }
    })

    if (isEmailInUse) {
      return res(
        ctx.status(400),
        ctx.json({
          code: 'auth.email-in-user',
          message: 'email already in use'
        }),
        ctx.delay(700)
      )
    }

    const user = db.user.create({
      id: nanoid(),
      email,
      fullName,
      password
    })

    const { id, updated_at, avatarURL, created_at } = user

    const accessToken = nanoid()

    const refreshToken = nanoid()

    db.tokens.create({
      id: nanoid(),
      token: accessToken,
      owner: user
    })

    return res(
      ctx.status(201),
      ctx.json({
        user: {
          id,
          fullName,
          email,
          updated_at,
          avatarURL,
          created_at
        },
        tokens: {
          refreshToken,
          accessToken
        }
      }),
      ctx.delay(700)
    )
  }),
  rest.get(
    '/project-items/:name',
    authMiddleware(async (req, res, ctx) => {
      const { name } = req.params

      const project = db.projects.findFirst({
        where: { name: { equals: String(name) } }
      })

      if (!project) {
        res(ctx.status(404))
      }

      const items = db.projectItems.findMany({
        where: { project: { id: { equals: project?.id } } }
      })

      return res(ctx.json(items), ctx.delay(300))
    })
  ),
  rest.post(
    '/project-items/:id/folder',
    authMiddleware(async (req, res, ctx) => {
      const { id } = req.params as { id: string }
      const { name } = req.body as NewProjectItemFolder

      const projectItem = db.projectItems.findFirst({
        where: {
          id: {
            equals: id
          }
        }
      })

      if (!projectItem) {
        return res(
          ctx.status(404),
          ctx.json({
            code: 'project-item.not-found'
          })
        )
      }

      const projectFolder = db.projectItemFolders.findFirst({
        where: {
          name: {
            equals: name
          }
        }
      })

      if (projectFolder) {
        return res(
          ctx.status(400),
          ctx.json({
            message: 'folder name already exists',
            code: 'project-item.folder-name-already-exists'
          })
        )
      }

      db.projectItemFolders.create({
        id: nanoid(),
        name,
        projectItem
      })

      return res(ctx.status(201), ctx.delay(500))
    })
  ),
  rest.post(
    '/project-item/:id/request',
    authMiddleware(async (req, res, ctx) => {
      const { id } = req.params as { id: string }
      const { folderId, method, name } = req.body as NewProjectItemRequest

      const projectItem = db.projectItems.findFirst({
        where: {
          id: {
            equals: id
          }
        }
      })

      if (!projectItem) {
        return res(
          ctx.status(404),
          ctx.json({
            code: 'project-item.not-found'
          })
        )
      }

      const projectItemRequest = db.projectItemRequests.findFirst({
        where: {
          name: {
            equals: name
          }
        }
      })

      if (projectItemRequest) {
        return res(
          ctx.status(400),
          ctx.json({
            code: 'project-item-request.name-already-exists'
          })
        )
      }

      const current = db.projectItemRequests.create({
        id: nanoid(),
        name,
        method,
        projectItem
      })

      if (folderId) {
        const folder = db.projectItemFolders.findFirst({
          where: {
            id: { equals: folderId }
          }
        })

        if (folder) {
          db.projectItemRequests.update({
            where: {
              id: {
                equals: current.id
              }
            },
            data: {
              projectItemFolder: folder
            }
          })
        }
      }

      return res(ctx.status(201))
    })
  ),
  rest.get(
    '/project-items/:id/details',
    authMiddleware(async (req, res, ctx) => {
      const { id } = req.params as { id: string }

      const folders = db.projectItemFolders.findMany({
        where: {
          projectItem: {
            id: {
              equals: id
            }
          }
        }
      })

      const requests = db.projectItemRequests.findMany({
        where: {
          projectItem: {
            id: {
              equals: id
            }
          }
        }
      })

      const explore: ExplorerTreeNode[] = folders.map((folder) => ({
        id: folder.id,
        name: folder.name,
        method: null,
        childrens: []
      }))

      requests.forEach((item) => {
        if (!item.projectItemFolder) {
          const { id: reqID, name, method } = item
          explore.push({
            id: reqID,
            name,
            method: method as any,
            childrens: null
          })
        } else {
          const folder = explore.find(
            (folderItem) => folderItem.id === item.projectItemFolder?.id
          )

          if (folder) {
            const { id: reqID, name, method } = item
            folder.childrens?.push({
              id: reqID,
              name,
              method: method as any,
              childrens: null
            })
          }
        }
      })

      return res(ctx.json({ explore, folders, requests }), ctx.delay(700))
    })
  ),
  rest.post(
    '/project-items',
    authMiddleware(async (req, res, ctx) => {
      const { projectItemName, projectName } = req.body as NewProjectIemBody

      const project = db.projects.findFirst({
        where: { name: { equals: projectName } }
      })

      const date = new Date().toISOString()

      if (!project) {
        return res(
          ctx.status(404),
          ctx.json({
            code: 'project.project-name-not-found',
            message: 'invalid project name'
          })
        )
      }

      const alreadyExists = db.projectItems.findFirst({
        where: {
          name: {
            equals: projectItemName
          }
        }
      })

      if (alreadyExists) {
        return res(
          ctx.status(400),
          ctx.json({
            code: 'project-item.name-already-exists'
          })
        )
      }

      db.projectItems.create({
        id: nanoid(),
        name: projectItemName,
        project,
        created_at: date,
        updated_at: date
      })

      return res(ctx.status(201))
    })
  ),
  rest.put(
    '/project-items/:id',
    authMiddleware(async (req, res, ctx) => {
      const { id } = req.params

      const { name } = req.body as UpdateProjectItemBody

      const alreadyExists = db.projectItems.findFirst({
        where: {
          name: {
            equals: name
          }
        }
      })

      if (alreadyExists) {
        return res(
          ctx.status(400),
          ctx.delay(500),
          ctx.json({
            code: 'project-item.name-already-exists'
          })
        )
      }

      db.projectItems.update({
        where: { id: { equals: String(id) } },
        data: { name }
      })

      return res(ctx.status(200), ctx.delay(500))
    })
  ),
  rest.delete(
    '/project-items/:id',
    authMiddleware(async (req, res, ctx) => {
      const { id } = req.params

      db.projectItems.delete({ where: { id: { equals: String(id) } } })

      return res(ctx.status(204), ctx.delay(500))
    })
  ),
  rest.get(
    '/projects',
    authMiddleware(async (req, res, ctx, user) => {
      const projects = db.projects.findMany({
        where: { owner: { id: { equals: user.id } } }
      })

      return res(ctx.json(projects), ctx.delay(2000))
    })
  ),
  rest.post(
    '/projects',
    authMiddleware(async (req, res, ctx, user) => {
      const { projectName } = req.body as NewProjectsBody

      const project = db.projects.findFirst({
        where: { name: { equals: projectName } }
      })

      if (project) {
        return res(
          ctx.status(400),
          ctx.delay(500),
          ctx.json({
            code: 'project.name-already-exists',
            message: 'project name already exists'
          })
        )
      }

      const date = new Date().toISOString()

      db.projects.create({
        id: nanoid(),
        owner: user as any,
        name: projectName,
        created_at: date,
        updated_at: date
      })

      return res(ctx.status(201))
    })
  ),
  rest.get(
    '/me',
    authMiddleware(async (req, res, ctx, user) => {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const { avatarURL, created_at, email, fullName, updated_at } = user

      return res(
        ctx.json({ avatarURL, created_at, email, fullName, updated_at })
      )
    })
  ),
  rest.post<SessionBody>('/session', (req, res, ctx) => {
    const { email, password } = req.body

    const user = db.user.findFirst({ where: { email: { equals: email } } })

    if (!user) {
      return res(
        ctx.status(401),
        ctx.json({
          code: 'auth.invalid-credentials',
          message: 'email or password invalid'
        }),
        ctx.delay(500)
      )
    }

    if (user.password !== password) {
      return res(
        ctx.status(401),
        ctx.json({
          code: 'auth.invalid-credentials',
          message: 'email or password invalid'
        }),
        ctx.delay(500)
      )
    }

    const { fullName, id, updated_at, avatarURL, created_at } = user

    const accessToken = nanoid()

    const refreshToken = nanoid()

    db.tokens.create({
      id: nanoid(),
      token: accessToken,
      owner: user
    })

    return res(
      ctx.json({
        user: {
          id,
          fullName,
          email,
          updated_at,
          avatarURL,
          created_at
        },
        tokens: {
          refreshToken,
          accessToken
        }
      })
    )
  })
]
