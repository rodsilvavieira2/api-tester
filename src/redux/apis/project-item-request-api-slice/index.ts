import { baseApi } from '../base-api'

const projectItemRequestApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    newProjectItemRequest: builder.mutation({
      query: () => ''
    })
  })
})
