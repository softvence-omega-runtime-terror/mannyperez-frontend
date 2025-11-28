import { baseApi } from "./baseApi";

export type PaymentStatus = 'completed' | 'due' | 'refunded' | 'pending' | 'failed';;

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSinglePayment: builder.query({
      query: (id: string) => `/payment/get-single-payment/${id}`,
    }),
  }),
});

export const { useGetSinglePaymentQuery } = paymentApi;
