import { baseApi } from "../baseApi";

export interface User {
  _id: string;
  name: string;
  userName: string;
  email: string;
  phone?: string;
  role: string;
  img?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AllUsersResponse {
  users: User[];
  total: number;
  data: string[]
}

export const allUsersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // GET ALL USERS (Admin only)
    getAllUsers: builder.query<AllUsersResponse, void>({
      query: () => ({
        url: `/users/getAlluser`,
        method: "GET",
      }),
      providesTags: ["Users"],
    }),

  }),
});

export const { useGetAllUsersQuery } = allUsersApi;
