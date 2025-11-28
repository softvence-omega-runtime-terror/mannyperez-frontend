import { baseApi } from "./baseApi";

export interface CreateOrderRequest {
  productId: string;
  shippingAddress: string;
  shippingMethod: string;
  shippingCost: number;
  priceId: string;
  isDue: boolean;
  quantity: number;
}

export interface CreateOrderResponse {
  message?: string;
  success?: boolean;
  data?: unknown;
}

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<CreateOrderResponse, CreateOrderRequest>({
      query: (body) => ({
        url: "/order/create-order",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = orderApi;
