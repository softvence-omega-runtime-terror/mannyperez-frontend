import { baseApi } from "./baseApi";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSinglePayment: builder.query({
      query: (id: string) => `/payment/get-single-payment/${id}`,
    }),
  }),
});

export const { useGetSinglePaymentQuery } = paymentApi;
