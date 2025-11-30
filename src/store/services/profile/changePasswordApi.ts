/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../baseApi";

export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
  body: {
    success: boolean;
    message: string;
  };
}

export const changePasswordApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    changePassword: builder.mutation<
      ChangePasswordResponse,
      ChangePasswordPayload
    >({
      query: (payload) => ({
        url: `/auth/changePassword`,
        method: "POST",
        body: payload,
      }),
      // OPTIONAL: Invalidate user tag if you have one
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useChangePasswordMutation } = changePasswordApi;
