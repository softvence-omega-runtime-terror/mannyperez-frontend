
import { baseApi } from './baseApi';


export const bottleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
  getProducts: builder.query({ 
      query:({page,limit})=>({
        url: `/products`,
        method: "GET",
     
       params: { page, limit },
      })
    }),
 createProducts: builder.mutation({ 
      query:(payload)=>({
        url: `/products`,
        method: "POST",
     
       body: payload,
      })
    }),
 updateProduct: builder.mutation({ 
      query:({payload,id})=>({
        url: `/products/${id}`,
        method: "PATCH",
     
       body: payload,
      })
    }),
 deleteProducts: builder.mutation({ 
      query:(id)=>({
        url: `/products/${id}`,
        method: "POST",
     
    
      })
    }),
})
})


export const {
  useGetProductsQuery,
  useCreateProductsMutation,
  useUpdateProductMutation,
  useDeleteProductsMutation
  
} = bottleApi;
