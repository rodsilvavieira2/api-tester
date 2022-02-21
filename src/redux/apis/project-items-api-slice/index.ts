import { ProjectItem, ExplorerTreeNode } from '../../../@types'
import { setToastDataThunk } from '../../thunks'
import { baseApi } from '../base-api'
import {
  GetProjectItemsParams,
  CreateNewProjectItemParams,
  UpdateProjectItemParams,
  DeleteProjectItemParams,
  GeProjectItemExploreParams
} from './types'

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
    getProjectItemExplore: builder.query<
      ExplorerTreeNode[],
      GeProjectItemExploreParams
    >({
      query: ({ projectID, projectItemID }) => ({
        url: `/projects/${projectID}/items/${projectItemID}/explore`
      }),
      providesTags: (resp, error) => (error ? [] : ['project-item-explore'])
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
        url: `/projects/${projectID}/items/${projectItemID}`,
        body: {
          ...rest
        },
        method: 'put'
      }),
      invalidatesTags: (result, error, { projectItemID }) => {
        return error ? [] : [{ type: 'project-items', projectItemID }]
      },
      async onQueryStarted (
        { projectItemID, projectID, name },
        { dispatch, queryFulfilled }
      ) {
        const path = dispatch(
          projectItemsApiSlice.util.updateQueryData(
            'getAllProjectItems',
            { projectID },
            (draft) => {
              const alreadyExists = draft.find((item) => item.name === name)

              if (alreadyExists) {
                dispatch(
                  setToastDataThunk({
                    title: 'Item de Projeto',
                    description: 'Nome de item de projeto em uso',
                    status: 'error'
                  })
                )
                return undefined
              }

              const project = draft.find((item) => item.id === projectItemID)

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
    }),
    deleteProjectItem: builder.mutation<void, DeleteProjectItemParams>({
      query: ({ projectID, projectItemID }) => ({
        url: `projects/${projectID}/items/${projectItemID}`,
        method: 'delete'
      }),
      invalidatesTags: (result, error, { projectItemID }) => {
        return error ? [] : [{ type: 'project-items', projectItemID }]
      },
      async onQueryStarted (
        { projectItemID, projectID },
        { dispatch, queryFulfilled }
      ) {
        const path = dispatch(
          projectItemsApiSlice.util.updateQueryData(
            'getAllProjectItems',
            { projectID },
            (draft) => {
              return draft.filter((item) => item.id !== projectItemID)
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
  useGetAllProjectItemsQuery,
  useCreateProjectIemMutation,
  useUpdateProjectItemMutation,
  useDeleteProjectItemMutation,
  useGetProjectItemExploreQuery
} = projectItemsApiSlice
