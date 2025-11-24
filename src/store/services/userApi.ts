import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSingleUser: builder.query({
      query: (id: string) => `/users/getSingleUser/${id}`,
    }),
  }),
});

export const { useGetSingleUserQuery } = userApi;