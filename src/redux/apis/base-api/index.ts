import { createApi } from '@reduxjs/toolkit/query/react'

import { User } from '../../../@types'
import { baseQueryWithReAuth } from '../util'
import { AuthReturn, CreateNewUserParams, LoginParams } from './types'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['user', 'projects', 'project-items', 'project-item-details'],
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    getUser: builder.mutation<User, void>({
      query: () => '/me'
    }),
    login: builder.mutation<AuthReturn, LoginParams>({
      query: (body) => ({
        url: '/session',
        body,
        method: 'post'
      })
    }),
    createNewUser: builder.mutation<AuthReturn, CreateNewUserParams>({
      query: (body) => ({
        url: '/new-user',
        body,
        method: 'post'
      })
    })
  })
})

export const { useGetUserMutation, useLoginMutation, useCreateNewUserMutation } = baseApi
