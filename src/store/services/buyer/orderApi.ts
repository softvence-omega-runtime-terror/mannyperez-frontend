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
  quantity: number;
}

export interface ApiOrder {
  _id: string;
  createdAt?: string;
  orderStatus?: string;
  paymentStatus?: string;
  shippingAddress?: string;
  shippingMethod?: string;
  totalAmount?: number;
  productId?: any;
  buyerId?: any;
  quantity?: number;
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

export interface GetOrdersQuery {
  page?: number;
  limit?: number;
  search?: string;
  status?: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
}

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    

    createOrder: builder.mutation<OrderResponse, CreateOrderRequest>({
      query: (payload) => ({
        url: `/order/create-order`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Orders"],
    }),
    
     getMyselfOrders: builder.query<
      { data: ApiOrder[]; total?: number; meta?: { total: number } } | ApiOrder[],
      GetOrdersQuery | void
    >({
      query: (params) => ({
        url: `/order/get-myself-orders`,
        method: "GET",
        params,
      }),
      providesTags: ["Orders"],
    }),


  }),
  
});

export const { useCreateOrderMutation, useGetMyselfOrdersQuery } = orderApi;
