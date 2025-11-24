import { baseApi } from "./baseApi";
import { RootState } from "@/redux/store"; // Adjust path if needed

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

    // Create product mutation
    createProduct: builder.mutation<Product, Omit<CreateProductRequest, "sellerId"> & { userId: string }>({
      query: (payload) => {
        const { userId, ...rest } = payload;
        return {
          url: `/products/create`,
          method: "POST",
          body: {
            ...rest,
            sellerId: userId, // attach sellerId from auth state
          },
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
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductsMutation,
  useGetProductByIdQuery,
} = productsApi;
