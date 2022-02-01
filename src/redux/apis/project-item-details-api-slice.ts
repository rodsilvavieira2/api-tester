import { nanoid } from '@reduxjs/toolkit'

import { ProjectItemDetails } from '../../@types'
import { baseApi } from './base-api'

type GetProjectItemDetailsDetails = {
  id: string
}

type NewProjectItemFolderParams = {
  id: string
  name: string
}

type DeleteProjectItemFolder = {
  id: string
}

type UpdateProjectItemFolderParams = {
  id: string
  name: string
}

const projectItemDetailsApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProjectItemDetails: builder.query<
      ProjectItemDetails,
      GetProjectItemDetailsDetails
    >({
      query: ({ id }) => `/project-items/${id}/details`,
      providesTags: () => {
        return ['project-item-details']
      }
    }),
    newProjectItemFolder: builder.mutation<void, NewProjectItemFolderParams>({
      query: ({ id, name }) => ({
        url: `project-items/${id}/folder`,
        body: {
          name
        },
        method: 'post'
      }),
      invalidatesTags: (error) => {
        return error ? [] : ['project-item-details']
      },
      async onQueryStarted ({ id, name }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          projectItemDetailsApiSlice.util.updateQueryData(
            'getProjectItemDetails',
            { id },
            (draft) => {
              draft.explore.push({
                id: nanoid(),
                name,
                childrens: [],
                method: null
              })
            }
          )
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      }
    }),
    deleteProjectItemFolder: builder.mutation<void, DeleteProjectItemFolder>({
      query: ({ id }) => ({
        url: `/project-items/${id}/folder/${id}`,
        method: 'delete'
      }),
      invalidatesTags: (error) => (error ? [] : ['project-item-details']),
      async onQueryStarted ({ id }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          projectItemDetailsApiSlice.util.updateQueryData(
            'getProjectItemDetails',
            { id },
            (draft) => {
              const newExplore = draft.explore.filter((item) => item.id !== id)

              draft.explore = newExplore
            }
          )
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      }
    }),
    updateProjectItemFolder: builder.mutation<void, UpdateProjectItemFolderParams>({
      query: ({ id, name }) => ({
        url: `/project-items/${id}/folder/${id}`,
        method: 'put',
        body: {
          name
        }
      }),
      invalidatesTags: (error) => (error ? [] : ['project-item-details']),
      async onQueryStarted ({ id, name }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          projectItemDetailsApiSlice.util.updateQueryData(
            'getProjectItemDetails',
            { id },
            (draft) => {
              const folder = draft.explore.find((item) => item.id === id)

              if (folder) folder.name = name
            }
          )
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      }
    }),
    newProjectItemRequest: builder.mutation<void, NewProjectItemFolderParams>({
      query: ({ id, name }) => ({
        url: `project-items/${id}/request`,
        body: {
          name
        },
        method: 'post'
      }),
      invalidatesTags: (error) => {
        return error ? [] : ['project-item-details']
      },
      async onQueryStarted ({ id, name }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          projectItemDetailsApiSlice.util.updateQueryData(
            'getProjectItemDetails',
            { id },
            (draft) => {
              draft.explore.push({
                id: nanoid(),
                name,
                childrens: [],
                method: null
              })
            }
          )
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      }
    })
  })
})

export const {
  useGetProjectItemDetailsQuery,
  useNewProjectItemFolderMutation,
  useDeleteProjectItemFolderMutation,
  useUpdateProjectItemFolderMutation
} = projectItemDetailsApiSlice
