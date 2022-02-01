import {
  createEntityAdapter,
  createSelector,
  EntityState
} from '@reduxjs/toolkit'

import { Project } from '../../../@types'
import { setCurrentProjectIDThunk, setToastDataThunk } from '../../thunks'
import { baseApi } from '../base-api'
import {
  DeleteProjectParams,
  NewProjectParams,
  UpdateProjectParams
} from './types'

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
    createProject: builder.mutation<Project, NewProjectParams>({
      query: (body) => ({
        url: 'projects',
        body,
        method: 'post'
      }),
      invalidatesTags: (result, error) => (error ? [] : ['projects']),
      async onCacheEntryAdded (args, { dispatch, cacheDataLoaded }) {
        try {
          const { data } = await cacheDataLoaded
          dispatch(setCurrentProjectIDThunk(data.id))
        } catch {}
      }
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

export const { selectAll: selectAllProjects } = projectAdapter.getSelectors()

export const selectAvailableProjects = createSelector(
  [(data: EntityState<Project>) => selectAllProjects(data)],
  (projects) => projects.map(({ id, name }) => ({ id, name }))
)
