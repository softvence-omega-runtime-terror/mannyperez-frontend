import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define types
export interface User {
    _id: string;
    name: string;
    email: string;
    role: "buyer" | "seller" | "admin";
    isVerified: boolean;
    isBlocked: boolean;
    isDeleted: boolean;
    isLoggedIn: boolean;
    twoFactorAuthEnabled: boolean;
    aggriedToTerms: boolean;
    savedProducts: string[];
    recentLoginDevices: any[];
    avatar?: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface SignupRequest {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    aggriedToTerms: boolean; // Note: Backend has typo "aggriedToTerms" instead of "agreedToTerms"
    role: 'buyer' | 'seller';
}

export interface VerifyEmailRequest {
    email: string;
    code: string;
}

export interface VerifyEmailResponse {
    approvalToken: string;
    message: string;
    refreshToken: string;
    user: User;
}

export interface ResendVerificationRequest {
    email: string;
}

export interface AuthResponse {
    user: User;
    approvalToken: string;
    refreshToken?: string;
}

/**
 * Authentication API
 */
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://api.example.com',
    }),
    tagTypes: ['User'],

    endpoints: (builder) => ({
        /**
         * Login user
         * 
         * @example
         * const [login, { isLoading }] = useLoginMutation();
         * const result = await login({ email: 'user@example.com', password: 'pass123' });
         */
        login: builder.mutation<AuthResponse, LoginRequest>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['User'],
        }),

        signup: builder.mutation<AuthResponse, SignupRequest>({
            query: (userData) => ({
                url: '/auth/signup',
                method: 'POST',
                body: userData,
            }),
            invalidatesTags: ['User'],
        }),

        verifyEmail: builder.mutation<VerifyEmailResponse, VerifyEmailRequest>({
            query: ({ email, code }) => ({
                url: '/auth/verify-email',
                method: 'POST',
                body: { email, code }
            })
        }),

        logout: builder.mutation<void, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            invalidatesTags: ['User'],
        }),

        /**
         * Get current user profile
         * 
         * @example
         * const { data: user, isLoading } = useGetCurrentUserQuery();
         */
        getCurrentUser: builder.query<User, void>({
            query: () => '/auth/me',
            providesTags: ['User'],
        }),

        /**
         * Refresh access token
         * 
         * @example
         * const [refreshToken] = useRefreshTokenMutation();
         */
        refreshToken: builder.mutation<{ token: string }, { refreshToken: string }>({
            query: (body) => ({
                url: '/auth/refresh',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useSignupMutation,
    useVerifyEmailMutation,
    useLogoutMutation,
    useGetCurrentUserQuery,
    useRefreshTokenMutation,
} = authApi;
