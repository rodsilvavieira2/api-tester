import { RestRequest, ResponseComposition, RestContext } from 'msw'

import { User } from '../@types'
import { db } from './db'

export const authMiddleware = (
  cb: (
    req: RestRequest,
    res: ResponseComposition,
    ctx: RestContext,
    user: User
  ) => void
) => {
  return (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
    const authorization = req.headers.get('authorization')

    if (!authorization) {
      return res(
        ctx.status(401),
        ctx.json({ code: 'token.missing', message: 'missing token' })
      )
    }

    const [, token] = authorization.split(' ')

    const dbToken = db.tokens.findFirst({ where: { token: { equals: token } } })

    if (!dbToken) {
      return res(
        ctx.status(401),
        ctx.json({ code: 'token.invalid', message: 'invalid token' })
      )
    }

    const user = db.user.findFirst({
      where: { id: { equals: dbToken.owner?.id } }
    })

    if (!user) {
      return res(
        ctx.status(404),
        ctx.json({ code: 'user.not-found', message: 'user not found' })
      )
    }

    return cb(req, res, ctx, user)
  }
}
