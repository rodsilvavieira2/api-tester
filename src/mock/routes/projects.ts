import { rest } from 'msw'

import { nanoid } from '@reduxjs/toolkit'

import { ExplorerTreeNode } from '../../@types'
import { db } from '../db'
import { authMiddleware } from '../middleware'

export const projectsHandles = [
  rest.get(
    '/projects',
    authMiddleware(async (req, res, ctx, user) => {
      const projects = db.projects.findMany({
        where: { owner: { id: { equals: user.id } } }
      })

      return res(ctx.json(projects), ctx.delay(700))
    })
  ),
  rest.post(
    '/projects',
    authMiddleware(async (req, res, ctx, user) => {
      const { name } = req.body as { name: string }

      const project = db.projects.findFirst({
        where: { name: { equals: name } }
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

      const timestamp = new Date().toISOString()

      const newProject = db.projects.create({
        id: nanoid(),
        owner: user as any,
        name,
        created_at: timestamp,
        updated_at: timestamp
      })

      return res(ctx.status(201), ctx.delay(800), ctx.json(newProject))
    })
  ),
  rest.put(
    '/projects/:id',
    authMiddleware(async (req, res, ctx) => {
      const { id } = req.params as { id: string }

      const { name } = req.body as { name?: string }

      const project = db.projects.findFirst({
        where: {
          id: {
            equals: id
          }
        }
      })

      if (!project) {
        return res(
          ctx.status(404),
          ctx.json({
            code: 'project.not-found',
            message: 'project not found'
          })
        )
      }

      const alreadyExits = db.projects.findFirst({
        where: {
          name: {
            equals: name
          }
        }
      })

      if (alreadyExits) {
        return res(
          ctx.status(400),
          ctx.json({
            code: 'project.name-already-exists',
            message: 'project name already exists'
          })
        )
      }

      db.projects.update({
        where: {
          id: {
            equals: id
          }
        },
        data: {
          name
        }
      })

      return res(ctx.status(200), ctx.delay(700))
    })
  ),
  rest.delete(
    '/projects/:id',
    authMiddleware(async (req, res, ctx) => {
      const { id } = req.params as { id: string }

      const project = db.projects.findFirst({
        where: {
          id: {
            equals: id
          }
        }
      })

      if (!project) {
        return res(
          ctx.status(404),
          ctx.json({
            code: 'project.not-found',
            message: 'project not found'
          }),
          ctx.delay(500)
        )
      }

      db.projects.delete({
        where: {
          id: {
            equals: id
          }
        }
      })

      return res(ctx.status(204), ctx.delay(500))
    })
  ),
  // project/items
  rest.get(
    '/projects/:id/items',
    authMiddleware(async (req, res, ctx) => {
      const { id } = req.params as {id: string}

      const project = db.projects.findFirst({
        where: {
          id: {
            equals: id
          }
        }
      })

      if (!project) {
        return res(
          ctx.status(404),
          ctx.json({
            code: 'project.not-found'
          })
        )
      }

      const projectItems = db.projectItems.findMany({
        where: {
          project: {
            id: {
              equals: id
            }
          }
        }
      })

      return res(
        ctx.delay(500),
        ctx.json(projectItems)
      )
    })
  ),
  rest.post(
    '/projects/:id/items',
    authMiddleware(async (req, res, ctx) => {
      const { id } = req.params as { id: string }
      const { name } = req.body as {
        name: string
      }

      const project = db.projects.findFirst({
        where: {
          id: {
            equals: id
          }
        }
      })

      if (!project) {
        return res(
          ctx.status(404),
          ctx.json({
            code: 'project.not-found'
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
            code: 'project-item.name-already-exists'
          })
        )
      }

      const timestamp = new Date().toISOString()

      const newProjectItem = db.projectItems.create({
        id: nanoid(),
        name,
        project,
        created_at: timestamp,
        updated_at: timestamp
      })

      return res(ctx.status(201), ctx.json(newProjectItem))
    })
  ),
  rest.get(
    '/projects/:id/items/:itemID',
    authMiddleware(async (req, res, ctx) => {
      const { id, itemID } = req.params as { id: string; itemID: string }

      const project = db.projects.findFirst({
        where: {
          id: {
            equals: id
          }
        }
      })

      if (!project) {
        return res(
          ctx.status(404),
          ctx.json({
            code: 'project.not-found'
          })
        )
      }

      const projectItem = db.projectItems.findFirst({
        where: {
          id: {
            equals: itemID
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

      return res(ctx.json({ explore }), ctx.delay(700))
    })
  ),
  rest.delete(
    '/projects/:id/items/:itemID',
    authMiddleware(async (req, res, ctx) => {
      const { id, itemID } = req.params as { id: string; itemID: string }

      const project = db.projects.findFirst({
        where: {
          id: {
            equals: id
          }
        }
      })

      if (!project) {
        return res(
          ctx.status(404),
          ctx.json({
            code: 'project.not-found'
          })
        )
      }

      const projectItem = db.projectItems.findFirst({
        where: {
          id: {
            equals: itemID
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

      db.projectItems.delete({
        where: {
          id: {
            equals: itemID
          }
        }
      })

      return res(ctx.status(204))
    })
  )
]
