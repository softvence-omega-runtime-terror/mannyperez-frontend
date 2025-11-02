# Store Directory - Redux Toolkit Setup

This directory contains all Redux state management configuration for the application.

## 📂 Directory Structure

```
store/
├── index.ts              # Store configuration and setup
├── hooks.ts              # Typed Redux hooks (USE THESE!)
│
├── services/             # RTK Query API services
│   ├── baseApi.ts       # Base API configuration (reference only)
│   ├── authApi.ts       # Authentication endpoints
│   ├── productsApi.ts   # Product endpoints
│   └── sellersApi.ts    # Seller endpoints
│
├── slices/              # Redux Toolkit slices (local state)
│   ├── authSlice.ts    # Authentication state
│   ├── cartSlice.ts    # Shopping cart state
│   └── uiSlice.ts      # UI state (modals, notifications)
│
└── examples/            # Example implementations
    ├── ProductListExample.tsx
    ├── CreateProductFormExample.tsx
    ├── ShoppingCartExample.tsx
    └── AuthenticationExample.tsx
```

## 🚀 Quick Start

### 1. Import Hooks (Always!)
```typescript
import { useAppDispatch, useAppSelector } from '@/store/hooks';
```

### 2. Use RTK Query for API Calls
```typescript
import { useGetProductsQuery } from '@/store/services/productsApi';

function MyComponent() {
  const { data, isLoading, error } = useGetProductsQuery({ page: 1 });
  // ...
}
```

### 3. Use Slices for Local State
```typescript
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { addToCart } from '@/store/slices/cartSlice';

function MyComponent() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(state => state.cart);
  
  dispatch(addToCart(product));
}
```

## 📖 Available APIs

### Products API
- `useGetProductsQuery()` - Get products list
- `useGetProductByIdQuery()` - Get single product
- `useGetFeaturedProductsQuery()` - Get featured products
- `useGetTrendingProductsQuery()` - Get trending products
- `useCreateProductMutation()` - Create product
- `useUpdateProductMutation()` - Update product
- `useDeleteProductMutation()` - Delete product

### Auth API
- `useLoginMutation()` - Login user
- `useSignupMutation()` - Register user
- `useLogoutMutation()` - Logout user
- `useGetCurrentUserQuery()` - Get current user
- `useRefreshTokenMutation()` - Refresh auth token

### Sellers API
- `useGetSellersQuery()` - Get sellers list
- `useGetSellerByIdQuery()` - Get single seller
- `useGetVerifiedSellersQuery()` - Get verified sellers
- `useGetSellerOfTheMonthQuery()` - Get top seller
- `useGetSellerStatsQuery()` - Get seller statistics
- `useGetSellerProductsQuery()` - Get seller's products

## 🔧 Available Slices

### Auth Slice
```typescript
const { user, token, isAuthenticated } = useAppSelector(state => state.auth);
dispatch(setCredentials({ user, token }));
dispatch(logout());
```

### Cart Slice
```typescript
const { items, total, itemCount } = useAppSelector(state => state.cart);
dispatch(addToCart(product));
dispatch(removeFromCart(itemId));
dispatch(updateQuantity({ id, quantity }));
dispatch(clearCart());
```

### UI Slice
```typescript
const { isLoginModalOpen } = useAppSelector(state => state.ui);
dispatch(openModal('login'));
dispatch(closeModal('login'));
dispatch(showNotification({ type: 'success', message: 'Done!' }));
```

## 📝 How to Add New Features

### Adding a New API Service

1. Create file in `services/` (e.g., `ordersApi.ts`)
2. Define types and endpoints
3. Export generated hooks
4. Add to store in `index.ts`

### Adding a New Slice

1. Create file in `slices/` (e.g., `filtersSlice.ts`)
2. Define state interface and initial state
3. Create reducers
4. Export actions and reducer
5. Add to store in `index.ts`

## 🎓 Learning Resources

- **Complete Guide:** See `/REDUX_SETUP_GUIDE.md`
- **Quick Reference:** See `/REDUX_CHEATSHEET.md`
- **Team Workflow:** See `/TEAM_WORKFLOW.md`
- **Examples:** Check `store/examples/` directory

## ⚠️ Important Notes

1. **Always use typed hooks** from `hooks.ts`, not from `react-redux`
2. **Use RTK Query for server data**, not `useState` + `fetch`
3. **Handle loading/error states** in your components
4. **Use DevTools** to debug state changes
5. **Follow existing patterns** when adding new features

## 🐛 Debugging

Open Redux DevTools in browser (F12 → Redux tab) to:
- View current state
- See action history
- Time-travel debug
- Track API requests

## 📞 Need Help?

1. Check examples in `examples/` directory
2. Read documentation files in project root
3. Ask team members
4. Check [Redux Toolkit Docs](https://redux-toolkit.js.org/)
