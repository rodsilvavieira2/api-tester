import { ProjectItem } from '../../../@types'
import { baseApi } from '../base-api'
import { GetProjectItemsParams, CreateNewProjectItemParams, UpdateProjectItemParams, DeleteProjectItemParams } from './types'

export const projectItemsApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProjectItems: builder.query<ProjectItem[], GetProjectItemsParams>({
      query: ({ projectID }) => `/projects/${projectID}/items`,
      providesTags: (resp = []) => {
        return [
          ...resp.map(({ id }) => ({ type: 'project-items' as const, id })),
          'project-items'
        ]
      }
    }),
    createProjectIem: builder.mutation<void, CreateNewProjectItemParams>({
      query: ({ projectID, ...rest }) => ({
        url: `/projects/${projectID}/items`,
        body: {
          ...rest
        },
        method: 'post'
      }),
      invalidatesTags: (result, error) => {
        return error ? [] : ['project-items']
      }
    }),
    updateProjectItem: builder.mutation<void, UpdateProjectItemParams>({
      query: ({ projectID, projectItemID, ...rest }) => ({
        url: `projects/${projectID}/items/${projectItemID}}`,
        body: {
          ...rest
        },
        method: 'put'
      }),
      invalidatesTags: (result, error, { projectItemID }) => {
        return error ? [] : [{ type: 'project-items', projectItemID }]
      }
    }),
    deleteProjectItem: builder.mutation<void, DeleteProjectItemParams>({
      query: ({ projectID, projectItemID }) => ({
        url: `projects/${projectID}/items/${projectItemID}`,
        method: 'delete'
      }),
      invalidatesTags: (result, error, { projectItemID }) => {
        return error ? [] : [{ type: 'project-items', projectItemID }]
      }
    })
  })
})

export const {
  useGetAllProjectItemsQuery,
  useCreateProjectIemMutation,
  useUpdateProjectItemMutation,
  useDeleteProjectItemMutation
} = projectItemsApiSlice
