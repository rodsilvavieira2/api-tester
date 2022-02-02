import { createSelector } from '@reduxjs/toolkit'

import { Project } from '../../../@types'
import { setToastDataThunk } from '../../thunks'
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
      invalidatesTags: (result, error) => (error ? [] : ['projects']),
      async onQueryStarted ({ id }, { dispatch, queryFulfilled }) {
        const path = dispatch(
          projectsApiSlice.util.updateQueryData(
            'getAllProjects',
            undefined,
            (draft) => {
              const newState = draft.filter((item) => item.id !== id)

              draft = newState
            }
          )
        )

        try {
          await queryFulfilled
        } catch {
          path.undo()
        }
      }
    }),
    updateProject: builder.mutation<void, UpdateProjectParams>({
      query: ({ id, name }) => ({
        url: `/projects/${id}`,
        body: {
          name
        },
        method: 'put'
      }),
      invalidatesTags: (result, error) => (error ? [] : ['projects']),
      async onQueryStarted ({ id, name }, { dispatch, queryFulfilled }) {
        const path = dispatch(
          projectsApiSlice.util.updateQueryData(
            'getAllProjects',
            undefined,
            (draft) => {
              const alreadyExists = draft.find(item => item.name === name)

              if (alreadyExists) {
                dispatch(setToastDataThunk({
                  title: 'Projeto',
                  description: 'Nome de projeto em uso',
                  status: 'error'
                }))
                return undefined
              }

              const project = draft.find(item => item.id === id)

              if (project && name) project.name = name
            }
          )
        )

        try {
          await queryFulfilled
        } catch {
          path.undo()
        }
      }
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
