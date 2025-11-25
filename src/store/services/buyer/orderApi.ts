import { baseApi } from "../baseApi";

export interface CreateOrderRequest {
  buyerId: string;
  productId: string;
  shippingAddress: string;
  shippingMethod: string;
  shippingCost: number | string;
  priceId: string;
  platformFee: number;
  totalAmount: number;
}

export interface OrderResponse {
  order: {
    _id: string;
    buyerId: string;
    productId: string;
    shippingAddress: string;
    shippingMethod: string;
    shippingCost: string;
    priceId: string;
    platformFee: number;
    totalAmount: number;
    orderStatus: string;
    paymentStatus: string;
    isDue: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  stripeUrl: string | null;
}

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    // Create order mutation
    createOrder: builder.mutation<OrderResponse, CreateOrderRequest>({
      query: (payload) => ({
        url: `/order/create-order`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Orders"],
    }),

  }),
});

export const { useCreateOrderMutation } = orderApi;
