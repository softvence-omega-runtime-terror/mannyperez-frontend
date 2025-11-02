/**
 * Sellers API Service
 * 
 * Handles all seller-related API endpoints including seller profiles,
 * verified sellers, and seller stats.
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../index';

// Define types
export interface Seller {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  verified: boolean;
  tier: 'bronze' | 'silver' | 'gold' | 'diamond';
  rating: number;
  totalSales: number;
  joinedDate: string;
  bio?: string;
  location?: string;
}

export interface SellerStats {
  totalProducts: number;
  activeLiveEvents: number;
  totalSales: number;
  rating: number;
  reviewCount: number;
}

export interface SellersResponse {
  sellers: Seller[];
  total: number;
  page: number;
  limit: number;
}

/**
 * Sellers API
 */
export const sellersApi = createApi({
  reducerPath: 'sellersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://api.example.com',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Sellers', 'SellerDetail', 'SellerStats'],
  
  endpoints: (builder) => ({
    /**
     * Get all sellers with pagination and filters
     * 
     * @example
     * const { data, isLoading } = useGetSellersQuery({ page: 1, verified: true });
     */
    getSellers: builder.query<SellersResponse, { page?: number; limit?: number; verified?: boolean }>({
      query: ({ page = 1, limit = 10, verified }) => ({
        url: '/sellers',
        params: { page, limit, verified },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.sellers.map(({ id }) => ({ type: 'Sellers' as const, id })),
              { type: 'Sellers', id: 'LIST' },
            ]
          : [{ type: 'Sellers', id: 'LIST' }],
    }),

    /**
     * Get seller by ID
     * 
     * @example
     * const { data: seller } = useGetSellerByIdQuery('seller-123');
     */
    getSellerById: builder.query<Seller, string>({
      query: (id) => `/sellers/${id}`,
      providesTags: (result, error, id) => [{ type: 'SellerDetail', id }],
    }),

    /**
     * Get verified sellers
     * 
     * @example
     * const { data: verifiedSellers } = useGetVerifiedSellersQuery();
     */
    getVerifiedSellers: builder.query<Seller[], void>({
      query: () => '/sellers/verified',
      providesTags: [{ type: 'Sellers', id: 'VERIFIED' }],
    }),

    /**
     * Get seller of the month
     * 
     * @example
     * const { data: topSeller } = useGetSellerOfTheMonthQuery();
     */
    getSellerOfTheMonth: builder.query<Seller, void>({
      query: () => '/sellers/seller-of-the-month',
      providesTags: [{ type: 'Sellers', id: 'TOP_SELLER' }],
    }),

    /**
     * Get seller stats
     * 
     * @example
     * const { data: stats } = useGetSellerStatsQuery('seller-123');
     */
    getSellerStats: builder.query<SellerStats, string>({
      query: (sellerId) => `/sellers/${sellerId}/stats`,
      providesTags: (result, error, id) => [{ type: 'SellerStats', id }],
    }),

    /**
     * Get seller's products
     * 
     * @example
     * const { data } = useGetSellerProductsQuery({ sellerId: '123', page: 1 });
     */
    getSellerProducts: builder.query<any, { sellerId: string; page?: number; limit?: number }>({
      query: ({ sellerId, page = 1, limit = 10 }) => ({
        url: `/sellers/${sellerId}/products`,
        params: { page, limit },
      }),
    }),
  }),
});

export const {
  useGetSellersQuery,
  useGetSellerByIdQuery,
  useGetVerifiedSellersQuery,
  useGetSellerOfTheMonthQuery,
  useGetSellerStatsQuery,
  useGetSellerProductsQuery,
} = sellersApi;
