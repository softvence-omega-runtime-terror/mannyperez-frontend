/**
 * Products API Service
 * 
 * This file contains all API endpoints related to products.
 * It uses RTK Query for automatic caching, refetching, and state management.
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../index';

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
export const productsApi = createApi({
  reducerPath: 'productsApi',
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
  tagTypes: ['Products', 'ProductDetail'],
  
  endpoints: (builder) => ({
    /**
     * Get all products with pagination and filters
     * 
     * @example
     * const { data, isLoading, error } = useGetProductsQuery({ page: 1, limit: 10 });
     */
    getProducts: builder.query<ProductsResponse, { page?: number; limit?: number; category?: string }>({
      query: ({ page = 1, limit = 10, category }) => ({
        url: '/products',
        params: { page, limit, category },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.products.map(({ id }) => ({ type: 'Products' as const, id })),
              { type: 'Products', id: 'LIST' },
            ]
          : [{ type: 'Products', id: 'LIST' }],
    }),

    /**
     * Get a single product by ID
     * 
     * @example
     * const { data, isLoading } = useGetProductByIdQuery('product-123');
     */
    getProductById: builder.query<Product, string>({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: 'ProductDetail', id }],
    }),

    /**
     * Get featured products
     * 
     * @example
     * const { data } = useGetFeaturedProductsQuery();
     */
    getFeaturedProducts: builder.query<Product[], void>({
      query: () => '/products/featured',
      providesTags: [{ type: 'Products', id: 'FEATURED' }],
    }),

    /**
     * Get trending products
     * 
     * @example
     * const { data } = useGetTrendingProductsQuery();
     */
    getTrendingProducts: builder.query<Product[], void>({
      query: () => '/products/trending',
      providesTags: [{ type: 'Products', id: 'TRENDING' }],
    }),

    /**
     * Create a new product
     * 
     * @example
     * const [createProduct, { isLoading }] = useCreateProductMutation();
     * await createProduct(productData);
     */
    createProduct: builder.mutation<Product, CreateProductRequest>({
      query: (body) => ({
        url: '/products',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),

    /**
     * Update a product
     * 
     * @example
     * const [updateProduct] = useUpdateProductMutation();
     * await updateProduct({ id: '123', data: updatedData });
     */
    updateProduct: builder.mutation<Product, { id: string; data: Partial<CreateProductRequest> }>({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Products', id: 'LIST' },
        { type: 'ProductDetail', id },
      ],
    }),

    /**
     * Delete a product
     * 
     * @example
     * const [deleteProduct] = useDeleteProductMutation();
     * await deleteProduct('product-123');
     */
    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetFeaturedProductsQuery,
  useGetTrendingProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
