import { ProjectItemDetails } from '../../@types'
import { baseApi } from './base-api'

type GetProjectItemDetailsDetails = {
  id: string
}

type NewProjectItemFolderParams = {
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
      }
    })
  })
})

export const { useGetProjectItemDetailsQuery, useNewProjectItemFolderMutation } = projectItemDetailsApiSlice
