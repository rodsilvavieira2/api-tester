import { nanoid } from '@reduxjs/toolkit'

import { ProjectItemDetails } from '../../../@types'
import { setToastDataThunk } from '../../thunks'
import { baseApi } from '../base-api'
import {
  GetProjectItemDetailsDetails,
  NewProjectItemFolderParams,
  DeleteProjectItemFolderParams,
  UpdateProjectItemFolderParams
} from './types'

const projectItemFolderApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProjectItemDetails: builder.query<
      ProjectItemDetails,
      GetProjectItemDetailsDetails
    >({
      query: ({ projectItemID, projectID }) =>
        `/projects/${projectID}/items/${projectItemID}`,
      providesTags: () => {
        return ['project-item-explore']
      }
    }),
    newProjectItemFolder: builder.mutation<void, NewProjectItemFolderParams>({
      query: ({ projectItemID, projectID, name }) => ({
        url: `/projects/${projectID}/items/${projectItemID}/folder`,
        body: {
          name
        },
        method: 'post'
      }),
      invalidatesTags: (result, error) => {
        return error ? [] : ['project-item-explore']
      },
      async onQueryStarted (
        { name, projectID, projectItemID },
        { dispatch, queryFulfilled }
      ) {
        const path = dispatch(
          projectItemFolderApiSlice.util.updateQueryData(
            'getProjectItemDetails',
            { projectID, projectItemID },
            (draft) => {
              const nameAlreadyExists = draft.explore.find(
                (item) => item.name === name
              )

              if (nameAlreadyExists) {
                dispatch(
                  setToastDataThunk({
                    title: 'Pasta',
                    description: 'Nome de pasta em uso',
                    status: 'error'
                  })
                )

                return undefined
              }

              draft.explore.push({
                id: nanoid(),
                method: null,
                name,
                childrens: []
              })
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
    deleteProjectItemFolder: builder.mutation<
      void,
      DeleteProjectItemFolderParams
    >({
      query: ({ folderID, projectItemID, projectID }) => ({
        url: `/projects/${projectID}/items/${projectItemID}/folder/${folderID}`,
        method: 'delete'
      }),
      invalidatesTags: (response, error) => (error ? [] : ['project-item-explore']),
      async onQueryStarted (
        { projectID, projectItemID, folderID },
        { dispatch, queryFulfilled }
      ) {
        const path = dispatch(
          projectItemFolderApiSlice.util.updateQueryData(
            'getProjectItemDetails',
            { projectID, projectItemID },
            (draft) => {
              const explore = draft.explore.filter(
                (item) => item.id !== folderID
              )

              return {
                ...draft,
                explore
              }
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
    updateProjectItemFolder: builder.mutation<
      void,
      UpdateProjectItemFolderParams
    >({
      query: ({ id, name }) => ({
        url: `/project-items/${id}/folder/${id}`,
        method: 'put',
        body: {
          name
        }
      }),
      invalidatesTags: (error) => (error ? [] : ['project-item-explore'])
    })
  })
})

export const {
  useGetProjectItemDetailsQuery,
  useNewProjectItemFolderMutation,
  useDeleteProjectItemFolderMutation,
  useUpdateProjectItemFolderMutation
} = projectItemFolderApiSlice
