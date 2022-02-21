import { createApi } from '@reduxjs/toolkit/query/react'

import { User } from '../../../@types'
import { baseQueryWithReAuth } from '../util'
import { AuthReturn, CreateNewUserParams, LoginParams } from './types'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['user', 'projects', 'project-items', 'project-item-explore'],
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    getUser: builder.query<User, void>({
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
        url: '/signup',
        body,
        method: 'post'
      })
    })
  })
})

export const { useGetUserQuery, useLoginMutation, useCreateNewUserMutation } =
  baseApi
