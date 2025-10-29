/**
 * Products API Service
 * 
 * This file contains all API endpoints related to products.
 * It uses RTK Query for automatic caching, refetching, and state management.
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../index';
import { baseApi } from './baseApi';

// Define types for your API responses
export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  sellerId: string;
  condition: string;
  createdAt: string;
  status: 'active' | 'sold' | 'pending';
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
}

export interface CreateProductRequest {
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  condition: string;
}

/**
 * Products API
 * 
 * Contains all product-related endpoints
 */
export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
  getProducts: builder.query({ 
      query:({page,limit})=>({
        url: `/products`,
        method: "GET",
     
       params: { page, limit },
      }),
      providesTags:['Products']
    }),
 createProducts: builder.mutation({ 
      query:(payload)=>({
        url: `/products`,
        method: "POST",
     
       body: payload,
      }),
      invalidatesTags:['Products']
    }),
 updateProduct: builder.mutation({ 
      query:({payload,id})=>({
        url: `/products/${id}`,
        method: "PATCH",
     
       body: payload,
      }),
       invalidatesTags:['Products']
    }),
 deleteProducts: builder.mutation({ 
      query:(id)=>({
        url: `/products/${id}`,
        method: "POST",
     
    
      }),
       invalidatesTags:['Products']
    }),
})
})


export const {
  useGetProductsQuery,
  useCreateProductsMutation,
  useUpdateProductMutation,
  useDeleteProductsMutation
  
} = productsApi;
