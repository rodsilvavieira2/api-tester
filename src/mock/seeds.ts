import { nanoid } from '@reduxjs/toolkit'

import { db } from './db'

const user = db.user.create({
  id: 'user-id',
  fullName: 'Rodrigo Silva',
  email: 'rod@email.com',
  password: '123456',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
})

db.tokens.create({
  id: nanoid(),
  owner: user,
  token: 'rN_Fe1imY4BI2EYfZH7fM'
})

Array.from({ length: 20 }).forEach((_, i) => {
  const project = db.projects.create({
    id: nanoid(),
    name: `project-${i + 1}`,
    owner: user,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  })

  Array.from({ length: 20 }).forEach((__, j) => {
    const item = db.projectItems.create({
      id: nanoid(),
      name: `item-${j + 1}`,
      project,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })

    Array.from({ length: 3 }).forEach((___, k) => {
      const folder = db.projectItemFolders.create({
        id: nanoid(),
        name: `folder-${k + 1}`,
        projectItem: item
      })

      Array.from({ length: 4 }).forEach((____, m) => {
        db.projectItemRequests.create({
          id: nanoid(),
          name: `request_item-${m + 1}`,
          method: 'POST',
          projectItem: item,
          projectItemFolder: folder
        })
      })
    })
  })
})
