/* eslint-disable @typescript-eslint/no-explicit-any */
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
  priceId?: string;
  platformFee?: number;
  shippingAddress?: string;
  shippingMethod?: string;
  totalAmount?: number;
  productId?: any;
  buyerId?: any;
  quantity?: number;
  buyer?: any;
  product?: any;
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

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface SellerOrdersResponse {
  data: ApiOrder[];
  meta?: {
    currentPage?: number;
    perPage?: number;
    totalOrders?: number;
    totalPages?: number;
  };
  message?: string;
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
        params: params ? params : {},
      }),
      providesTags: ["Orders"],
    }),

    getSingleOrder: builder.query<{ data: ApiOrder } | ApiOrder, string>({
      query: (id) => ({
        url: `/order/get-single-order/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Orders", id }],
    }),

    kelaDelivery: builder.mutation({
      query: (id: string) => ({
        url: `order/delivery/${id}`,
        method: "PATCH",

      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Orders", id },
        "Orders",
      ],
    }),
    OrderComplete: builder.mutation({
      query: (id: string) => ({
        url: `order/complete/${id}`,
        method: "PATCH",

      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Orders", id },
        "Orders",
      ],
    }),
    getSellerOrder: builder.query<
      SellerOrdersResponse | ApiOrder[] | any,
      GetOrdersQuery | void
    >({
      query: (params) => ({
        url: `/order/seller-orders`,
        method: "GET",
        params: params ? params : {},
      }), 
      providesTags: ["Orders"],
    
    }),

  }),

});

export const {
  useCreateOrderMutation,
  useGetMyselfOrdersQuery,
  useGetSingleOrderQuery,
  useKelaDeliveryMutation,
  useOrderCompleteMutation,
  useGetSellerOrderQuery,
} = orderApi;
