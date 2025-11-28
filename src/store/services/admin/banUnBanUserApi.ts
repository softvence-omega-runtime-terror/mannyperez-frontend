import { baseApi } from "../baseApi";

export interface BanUnbanResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: any; // you can type the user object if needed
}

export const banUnBanUserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    //  BAN user
    banUser: builder.mutation<BanUnbanResponse, string>({
      query: (userId) => ({
        url: `/admin/ban-user/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Users"], // IMPORTANT (same as your getAllUsers)
    }),

    //  UNBAN user
    unbanUser: builder.mutation<BanUnbanResponse, string>({
      query: (userId) => ({
        url: `/admin/unban-user/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Users"], // refresh user list
    }),

  }),
});

export const {
  useBanUserMutation,
  useUnbanUserMutation,
} = banUnBanUserApi;
