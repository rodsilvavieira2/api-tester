import {
  createSelector
} from '@reduxjs/toolkit'

import { Project } from '../../../@types'
import { baseApi } from '../base-api'
import {
  DeleteProjectParams,
  NewProjectParams,
  UpdateProjectParams
} from './types'

export const projectsApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProjects: builder.query<Project[], void>({
      query: () => '/projects',
      providesTags: ['projects']
    }),
    createProject: builder.mutation<Project, NewProjectParams>({
      query: (body) => ({
        url: 'projects',
        body,
        method: 'post'
      }),
      invalidatesTags: (result, error) => (error ? [] : ['projects'])
    }),
    deleteProject: builder.mutation<void, DeleteProjectParams>({
      query: ({ id }) => ({
        url: `/projects/${id}`,
        method: 'delete'
      }),
      invalidatesTags: (result, error) => (error ? [] : ['projects'])
    }),
    updateProject: builder.mutation<void, UpdateProjectParams>({
      query: ({ id, name }) => ({
        url: `/projects/${id}`,
        body: {
          name
        },
        method: 'put'
      }),
      invalidatesTags: (result, error) => (error ? [] : ['projects'])
    })
  })
})

export const {
  useGetAllProjectsQuery,
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useUpdateProjectMutation
} = projectsApiSlice

export const selectAvailableProjects = createSelector(
  [(data: Project[]) => data],
  (projects) => projects.map(({ id, name }) => ({ id, name }))
)
