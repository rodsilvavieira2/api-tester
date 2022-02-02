import { User, JWTs } from '../../../@types'

export type LoginParams = {
  email: string
  password: string
}

export type AuthReturn = {
  user: User
  tokens: JWTs
}

export type CreateNewUserParams = {
  fullName: string
  email: string
  password: string
}
