/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../baseApi";

// =======================
// TYPES
// =======================

// Meta data of pagination
export interface IPaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Single product type (adjust fields based on your backend)
export interface IProduct {
  _id: string;
  name: string;
  price: number;
  images?: string[];
  [key: string]: any;
}

// Full API response
export interface IPendingListingsResponse {
  data: {
    products: IProduct[];
    meta: IPaginationMeta;
  };
}

// Query params
export interface IPendingListingsQuery {
  page?: number;
  limit?: number;
}

export const pendingListingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPendingListings: builder.query<
      {
        products: IProduct[];
        meta: IPaginationMeta;
      },
      IPendingListingsQuery
    >({
      query: ({ page = 1, limit = 10 } = {}) => ({
        url: `/admin/pending-products`,
        method: "GET",
        params: { page, limit },
      }),

      transformResponse: (response: IPendingListingsResponse) => {
        return {
          products: response?.data?.products || [],
          meta: response?.data?.meta || {
            total: 0,
            page: 1,
            limit: 10,
            totalPages: 1,
          },
        };
      },

      providesTags: ["pendingListings"],
    }),
  }),
});

export const { useGetAllPendingListingsQuery } = pendingListingApi;
