/**
 * Base API Configuration
 * 
 * This file contains the base configuration for all RTK Query APIs.
 * It includes common settings like base URL, headers, and error handling.
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../index';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.example.com';

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  
  // Prepare headers for each request
  prepareHeaders: (headers, { getState }) => {
    // Get token from auth state
    const token = (getState() as RootState).auth.token;
    
    // If we have a token, include it in the headers
    if (token) {
      headers.set('authorization', `${token}`);
    }
    
    return headers;
  },
  
  // Include credentials for cross-origin requests
  credentials: 'include',
});

/**
 * Base API configuration
 * 
 * This is used as a foundation for all API slices.
 * Don't use this directly - create specific API slices instead.
 */
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery,
  
  // Tag types for cache invalidation
  tagTypes: ['Products', 'User', 'Sellers', 'Cart', 'Orders', 'LiveEvents'],
  
  // Endpoints will be injected by individual API slices
  endpoints: () => ({}),
});
