/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "./baseApi";

// Product types
export interface Product {
  id: string;
  title?: string;
  description?: string;
  price?: number;

  category?: string;

  condition?: string;
  _id: string;
  sellerId:
    | string
    | { _id: string; name: string; userName: string; img: string };
  productInformation: {
    title: string;
    description: string;
    tags: string[];
    category: string;
  };
  pricingAndInventory: {
    price: number;
    quantity: number;
    _id: string;
  }[];
  images: string[];
  extraOptions?: {
    productVariants?: boolean;
    variants?: { size: string; color: string }[];
  };
  createdAt?: string;
  status?: "active" | "sold" | "pending" | string;

  socialDetails?: {
    views: number;
    likes: number;
    comments: any[];
  };

  updatedAt?: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  data: any;
}

export interface CreateProductRequest {
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  condition: string;
  extraOptions?: {
    productVariants?: boolean;
    variants?: { size: string; color: string }[];
  };
  sellerId: string;
}

// Products API
export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, void>({
      query: () => ({
        url: `/products`,
        method: "GET",
      }),
      providesTags: ["Products"],
    }),

    getMyProducts: builder.query<ProductsResponse, void>({
      query: () => ({
        url: `/products/seller/my-products`,
        method: "GET",
      }),
      providesTags: ["Products"],
    }),
    likeProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `/products/${id}/like`,
        method: "POST",
      }),
      invalidatesTags: ["Products"],
    }),
    likeComment: builder.mutation<void, string>({
      query: (id) => ({
        url: `/products/${id}/comment-like`,
        method: "POST",
      }),
      invalidatesTags: ["Products"],
    }),
    viewProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `/products/${id}/view`,
        method: "POST",
      }),
      invalidatesTags: ["Products"],
    }),
    commentOnProduct: builder.mutation<void, { id: string; comment: string }>({
      query: ({ id, comment }) => ({
        url: `/products/${id}/comment`,
        method: "POST",
        body: { message: comment },
      }),
      invalidatesTags: ["Products"],
    }),
    commentReply: builder.mutation<void, { id: string; comment: string }>({
      query: ({ id, comment }) => ({
        url: `/products/${id}/comment-reply`,
        method: "POST",
        body: { message: comment },
      }),
      invalidatesTags: ["Products"],
    }),

    // Create product mutation
    createProduct: builder.mutation<void, FormData>({
      query: (payload) => {
        console.log("Payload in createProduct:", payload);
        return {
          url: `/products/create`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["Products"],
    }),

    updateProduct: builder.mutation<Product, { payload: FormData; id: string }>(
      {
        query: ({ payload, id }) => ({
          url: `/products/${id}`,
          method: "PATCH",
          body: payload,
        }),
        invalidatesTags: ["Products"],
      }
    ),

    getProductById: builder.query<{ data: Product }, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      transformResponse: (response: any) => response?.data ?? response,
      providesTags: ["Products"],
    }),

    deleteProducts: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),

    getFeedProducts: builder.query<ProductsResponse, void>({
      query: () => ({
        url: `/products/feed`,
        method: "GET",
      }),
      providesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetMyProductsQuery,
  useLikeProductMutation,
  useLikeCommentMutation,
  useCommentOnProductMutation,
  useCommentReplyMutation,
  useViewProductMutation,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductsMutation,
  useGetProductByIdQuery,
  useGetFeedProductsQuery,
} = productsApi;
