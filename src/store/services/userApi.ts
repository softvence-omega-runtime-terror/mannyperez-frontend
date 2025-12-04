import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSingleUser: builder.query({
      query: (id: string) => `/users/getSingleUser/${id}`,
    }),
    followUnfollowUser: builder.mutation<void, string>({
      query: (id: string) => ({
        url: `/users/follow/${id}`,
        method: "PATCH",
      })
    })
  }),
});


export const { useGetSingleUserQuery, useFollowUnfollowUserMutation } = userApi;