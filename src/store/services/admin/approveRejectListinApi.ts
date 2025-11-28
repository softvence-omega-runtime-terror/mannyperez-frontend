/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../baseApi";

export interface IProductInformation {
  title: string;
  category: string;
  description: string;
  tags: string[];
}

export interface IPricingInventory {
  price: number;
  quantity: number;
}

export interface IPendingProduct {
  _id: string;
  sellerId: string;
  type: string;
  images: string[];
  productInformation: IProductInformation;
  pricingAndInventory: IPricingInventory[];
  createdAt: string;
  updatedAt: string;
}

export interface IPendingMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IPendingListingsResponse {
  products: IPendingProduct[];
  meta: IPendingMeta;
}

// ===========================
// API
// ===========================

export const pendingListingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET ALL PENDING LISTINGS
    getAllPendingListings: builder.query<
      IPendingListingsResponse,
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 10 } = {}) => ({
        url: `/admin/pending-products`,
        method: "GET",
        params: { page, limit },
      }),

      transformResponse: (response: any): IPendingListingsResponse => ({
        products: response?.data?.products || [],
        meta:
          response?.data?.meta || {
            total: 0,
            page: 1,
            limit: 10,
            totalPages: 1,
          },
      }),

      providesTags: ["pendingListings"],
    }),

    // ============================
    // SINGLE APPROVE / REJECT MUTATION
    // ============================
    approveOrRejectListing: builder.mutation<
      any,
      { productId: string; approvalStatus: boolean; rejectionReason?: string }
    >({
      query: ({ productId, approvalStatus, rejectionReason }) => ({
        url: `/products/${productId}/approve`,
        method: "PATCH",
        body: {
          approvalStatus: approvalStatus ? "true" : "false",
          ...(approvalStatus === false && { rejectionReason }),
        },
      }),

      invalidatesTags: ["pendingListings"],
    }),
  }),
});

export const {
  useGetAllPendingListingsQuery,
  useApproveOrRejectListingMutation,
} = pendingListingApi;
