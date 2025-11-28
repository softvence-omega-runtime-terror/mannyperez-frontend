import { baseApi } from "./baseApi";

export const sellerApi = baseApi.injectEndpoints({
  endpoints: (builders) => ({
    getSingleSeller: builders.query({
      query: (id) => ({
        url: `/seller/${id}`,
        method: "GET",
      }),
      providesTags: ["Sellers"],
    }),
  }),
});

export const { useGetSingleSellerQuery } = sellerApi;
