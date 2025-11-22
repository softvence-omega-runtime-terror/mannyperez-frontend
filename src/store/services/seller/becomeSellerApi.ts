import { baseApi } from "../baseApi";

export const becomeSellerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    applyForSeller: builder.mutation({
      query: (formData: FormData) => ({
        url: "/seller/apply",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Sellers", "User"],
    }),
  }),
});

export const { useApplyForSellerMutation } = becomeSellerApi;
