########################################
# Redux & RTK Query - Quick Reference
########################################

# ==========================================
# IMPORTING HOOKS (ALWAYS USE TYPED HOOKS)
# ==========================================

import { useAppDispatch, useAppSelector } from '@/store/hooks';

# ==========================================
# RTK QUERY - FETCHING DATA
# ==========================================

# Query Hook Pattern
const { data, isLoading, isError, error, isFetching, refetch } = useGetProductsQuery(params);

# Query with Skip
const { data } = useGetProductByIdQuery(productId, { skip: !productId });

# Query with Polling (auto-refresh every 5 seconds)
const { data } = useGetLiveEventsQuery(undefined, { pollingInterval: 5000 });

# Lazy Query (trigger manually)
const [trigger, result] = useLazyGetProductsQuery();
// Later: trigger({ page: 1 });

# ==========================================
# RTK QUERY - MUTATIONS
# ==========================================

# Mutation Hook Pattern
const [mutationFunction, { isLoading, isSuccess, isError, error }] = useCreateProductMutation();

# Execute Mutation with Error Handling
try {
  const result = await createProduct(data).unwrap();
  // Success!
} catch (err) {
  // Handle error
}

# Mutation with Reset
const [createProduct, { reset }] = useCreateProductMutation();
// Later: reset(); // Clear mutation state

# ==========================================
# REDUX SLICES - DISPATCHING ACTIONS
# ==========================================

const dispatch = useAppDispatch();

# Simple Action
dispatch(addToCart(product));

# Action with Payload
dispatch(updateQuantity({ id: '123', quantity: 2 }));

# Multiple Dispatches
dispatch(clearCart());
dispatch(showNotification({ type: 'success', message: 'Cart cleared!' }));

# ==========================================
# REDUX SLICES - SELECTING STATE
# ==========================================

# Single Value
const user = useAppSelector(state => state.auth.user);

# Multiple Values (Destructure)
const { items, total, itemCount } = useAppSelector(state => state.cart);

# Derived/Computed Value
const cartTotal = useAppSelector(state => {
  return state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
});

# ==========================================
# CACHE INVALIDATION
# ==========================================

# Automatically Refetch After Mutation
invalidatesTags: [{ type: 'Products', id: 'LIST' }]

# Provide Tags for Cache
providesTags: (result) => 
  result ? result.map(({ id }) => ({ type: 'Products', id })) : []

# Manual Refetch
const { refetch } = useGetProductsQuery();
// Later: refetch();

# ==========================================
# COMMON PATTERNS
# ==========================================

# Loading State UI
if (isLoading) return <LoadingSpinner />;
if (isError) return <ErrorMessage error={error} />;
if (!data) return null;

# Optimistic Updates
const [updateProduct] = useUpdateProductMutation();
await updateProduct({ 
  id: '123', 
  data: { title: 'New Title' } 
}).unwrap();

# Conditional Fetching
const { data } = useGetUserQuery(userId, { 
  skip: !userId // Don't fetch if no userId
});

# ==========================================
# FILE STRUCTURE FOR NEW FEATURES
# ==========================================

1. Create API Service: src/store/services/featureApi.ts
2. Create Slice (if needed): src/store/slices/featureSlice.ts
3. Add to Store: src/store/index.ts
4. Use in Components: Import hooks and use

# ==========================================
# DEBUGGING
# ==========================================

# Check Redux DevTools
- Open browser DevTools (F12)
- Go to Redux tab
- View actions, state changes, and time-travel

# Log Query State
const query = useGetProductsQuery();
console.log(query);

# Log Entire State
const state = useAppSelector(state => state);
console.log(state);

# ==========================================
# TYPE SAFETY
# ==========================================

# Always Define Types
export interface Product {
  id: string;
  title: string;
  price: number;
}

# Use Types in Queries
builder.query<Product[], void>({
  query: () => '/products'
})

# Type Mutation Response
builder.mutation<Product, CreateProductRequest>({
  query: (body) => ({ url: '/products', method: 'POST', body })
})

# ==========================================
# COMMON MISTAKES TO AVOID
# ==========================================

❌ Using plain useSelector/useDispatch
✅ Use useAppSelector/useAppDispatch

❌ Storing server data in local state
✅ Use RTK Query for server data

❌ Not handling loading/error states
✅ Always handle isLoading and isError

❌ Forgetting .unwrap() on mutations
✅ Use .unwrap() to catch errors properly

❌ Not setting tags for cache invalidation
✅ Use providesTags and invalidatesTags

# ==========================================
# PERFORMANCE TIPS
# ==========================================

1. Use selective selectors to prevent unnecessary re-renders
2. Use skip option to prevent unnecessary fetches
3. Set pollingInterval for real-time data
4. Use keepUnusedDataFor to control cache duration
5. Implement optimistic updates for better UX

# ==========================================
# COMMON USE CASES
# ==========================================

# Fetch List with Filters
useGetProductsQuery({ category: 'electronics', page: 1 })

# Create New Item
const [create] = useCreateProductMutation();
await create(formData).unwrap();

# Update Item
const [update] = useUpdateProductMutation();
await update({ id: '123', data: updates }).unwrap();

# Delete Item
const [remove] = useDeleteProductMutation();
await remove(productId).unwrap();

# Add to Cart (Local State)
dispatch(addToCart(product));

# Show Notification
dispatch(showNotification({ type: 'success', message: 'Done!' }));
