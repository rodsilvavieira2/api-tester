import { rest } from 'msw'

import { nanoid } from '@reduxjs/toolkit'

import { db } from '../db'
import { authMiddleware } from '../middleware'

export const authHandles = [
  rest.post('/new-user', (req, res, ctx) => {
    const { email, fullName, password } = req.body as {
      email: string
      password: string
      fullName: string
    }

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
    '/me',
    authMiddleware(async (req, res, ctx, user) => {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const { avatarURL, created_at, email, fullName, updated_at } = user

      return res(
        ctx.json({ avatarURL, created_at, email, fullName, updated_at })
      )
    })
  ),
  rest.post('/session', (req, res, ctx) => {
    const { email, password } = req.body as { email: string; password: string }

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
