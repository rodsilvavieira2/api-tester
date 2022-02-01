import { createEntityAdapter, EntityState } from '@reduxjs/toolkit'

import { ProjectItem } from '../../@types'
import { baseApi } from './base-api'

type GetProjectItemsParams = {
  id: string
}

type CreateProjectIemParams = {
  projectName: string
  projectItemName: string
}

type DeleteProjectItemParams = Pick<ProjectItem, 'id'>

type UpdateProjectItemParams = Partial<
  Omit<ProjectItem, 'id' | 'created_at' | 'updated_at'>
> &
  Pick<ProjectItem, 'id'>

const projectItemsAdapter = createEntityAdapter<ProjectItem>({
  selectId: (data) => data.id
})

const initialState = projectItemsAdapter.getInitialState()

export const projectItemsApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProjectItems: builder.query<
      EntityState<ProjectItem>,
      GetProjectItemsParams
    >({
      query: ({ id }) => `/project-items/${id}`,
      transformResponse: (resp: ProjectItem[]) => {
        return projectItemsAdapter.setAll(initialState, resp)
      },
      providesTags: (resp = { ids: [], entities: {} }) => {
        return [
          ...resp.ids.map((id) => ({ type: 'project-items' as const, id })),
          'project-items'
        ]
      }
    }),
    createProjectIem: builder.mutation<void, CreateProjectIemParams>({
      query: (body) => ({
        url: 'project-items',
        body,
        method: 'post'
      }),
      invalidatesTags: (result, error) => {
        return error ? [] : ['project-items']
      }
    }),
    updateProjectItem: builder.mutation<void, UpdateProjectItemParams>({
      query: ({ id, ...rest }) => ({
        url: `project-items/${id}`,
        body: rest,
        method: 'put'
      }),
      invalidatesTags: (result, error, { id }) => {
        return error ? [] : [{ type: 'project-items', id }]
      }
    }),
    deleteProjectItem: builder.mutation<void, DeleteProjectItemParams>({
      query: ({ id }) => ({
        url: `project-items/${id}`,
        method: 'delete'
      }),
      invalidatesTags: (result, error, { id }) => {
        return error ? [] : [{ type: 'project-items', id }]
      }
    })
  })
})

export const {
  useGetProjectItemsQuery,
  useCreateProjectIemMutation,
  useUpdateProjectItemMutation,
  useDeleteProjectItemMutation
} = projectItemsApiSlice

export const { selectAll: selectAllProjectItems } =
  projectItemsAdapter.getSelectors()
