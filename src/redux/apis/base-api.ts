import { createApi } from '@reduxjs/toolkit/query/react'

import { JWTs, User } from '../../@types'
import { baseQueryWithReAuth } from './util'

type LoginCredentials = {
  email: string
  password: string
}

type LoginReturn = {
  user: User,
  tokens: JWTs
}

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['user', 'projects', 'project-items', 'project-item-details'],
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    getUser: builder.mutation<User, void>({
      query: () => '/me'
    }),
    login: builder.mutation<LoginReturn, LoginCredentials>({
      query: (body) => ({
        url: '/session',
        body,
        method: 'post'
      })
    })
  })
})

export const { useGetUserMutation, useLoginMutation } = baseApi
