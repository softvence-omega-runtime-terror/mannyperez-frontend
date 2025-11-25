import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),

    sellerLogin: builder.mutation({
      query: (body) => ({
        url: "/auth/seller/login",
        method: "POST",
        body,
      }),
    }),

    signup: builder.mutation({
      query: (body) => ({
        url: "/auth/signup",
        method: "POST",
        body,
      }),
    }),

    verifyEmail: builder.mutation({
      query: (body) => ({
        url: "/auth/verify-email",
        method: "POST",
        body,
      }),
    }),

    logout: builder.mutation<void, { token?: string } | void>({
      query: (body) => ({
        url: "/auth/logout",
        method: "POST",
        body: body && (body as { token?: string }).token
          ? { token: (body as { token?: string }).token }
          : undefined,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSellerLoginMutation,
  useSignupMutation,
  useVerifyEmailMutation,
  useLogoutMutation,
} = authApi;
