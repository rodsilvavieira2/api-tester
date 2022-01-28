import { createEntityAdapter, EntityState } from '@reduxjs/toolkit'

import { Project } from '../../@types'
import { baseApi } from './base-api'

type CreateProjectBody = {
  projectName: string
}

const projectAdapter = createEntityAdapter<Project>({
  selectId: (data) => data.id
})

const initialState = projectAdapter.getInitialState()

export const projectsApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProjects: builder.query<EntityState<Project>, void>({
      query: () => '/projects',
      transformResponse: (resp: Project[]) => {
        return projectAdapter.setAll(initialState, resp)
      },
      providesTags: ['projects']
    }),
    createProject: builder.mutation<void, CreateProjectBody>({
      query: (body) => ({
        url: 'projects',
        body,
        method: 'post'
      }),
      invalidatesTags: ['projects']
    })
  })
})

export const { useGetAllProjectsQuery, useCreateProjectMutation } = projectsApiSlice

export const { selectAll: selectAllProjects } = projectAdapter.getSelectors()
