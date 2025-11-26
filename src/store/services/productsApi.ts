import { baseApi } from "./baseApi";

// Product types
export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  sellerId: string;
  condition: string;
  extraOptions?: {
    productVariants?: boolean;
    variants?: { size: string; color: string }[];
  };
  createdAt: string;
  status: "active" | "sold" | "pending";
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

    })
    ,
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
    commentOnProduct: builder.mutation<void, { id: string; comment: string }>({
      query: ({ id, comment }) => ({
        url: `/products/${id}/comment`,
        method: "POST",
        body: { 'message': comment },
      }),
      invalidatesTags: ["Products"],
    }),
    commentReply: builder.mutation<void, { id: string; comment: string }>({
      query: ({ id, comment }) => ({
        url: `/products/${id}/comment-reply`,
        method: "POST",
        body: { 'message': comment },
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

    updateProduct: builder.mutation<Product, { payload: Partial<CreateProductRequest>; id: string }>({
      query: ({ payload, id }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Products"],
    }),

    getProductById: builder.query<Product, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: ["Products"],
    }),

    deleteProducts: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
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
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductsMutation,
  useGetProductByIdQuery,
} = productsApi;
