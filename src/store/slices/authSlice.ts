/**
 * Auth Slice
 * 
 * Manages authentication state including user info and tokens.
 * This works alongside authApi for managing local auth state.
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authApi } from '../services/authApi';
import type { User } from '../services/authApi';

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

// Load initial state from localStorage
const loadAuthFromStorage = (): Pick<AuthState, 'user' | 'token' | 'isAuthenticated'> => {
    try {
        const token = localStorage.getItem('authToken');
        const userStr = localStorage.getItem('user');
        const user = userStr ? JSON.parse(userStr) : null;

        return {
            token,
            user,
            isAuthenticated: !!token && !!user,
        };
    } catch (error) {
        console.error('Error loading auth from storage:', error);
        return {
            token: null,
            user: null,
            isAuthenticated: false,
        };
    }
};

const initialState: AuthState = {
    ...loadAuthFromStorage(),
    isLoading: false,
};

/**
 * Auth Slice
 * 
 * Use this for managing authentication state in your components.
 * 
 * @example
 * const { user, isAuthenticated } = useAppSelector((state) => state.auth);
 */
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        /**
         * Set credentials (user and token)
         */
        setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;

            // Persist to localStorage
            localStorage.setItem('authToken', action.payload.token);
            localStorage.setItem('user', JSON.stringify(action.payload.user));
        },

        /**
         * Update user info
         */
        updateUser: (state, action: PayloadAction<Partial<User>>) => {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
                localStorage.setItem('user', JSON.stringify(state.user));
            }
        },

        /**
         * Logout and clear auth state
         */
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;

            // Clear localStorage
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
        },
    },

    // Handle auth API responses
    extraReducers: (builder) => {
        builder
            // Login
            .addMatcher(authApi.endpoints.login.matchPending, (state) => {
                state.isLoading = true;
            })
            .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.isLoading = false;

                localStorage.setItem('authToken', action.payload.token);
                localStorage.setItem('user', JSON.stringify(action.payload.user));
            })
            .addMatcher(authApi.endpoints.login.matchRejected, (state) => {
                state.isLoading = false;
            })

            // Signup
            .addMatcher(authApi.endpoints.verifyEmail.matchPending, (state) => {
                console.log("🔄 Verify Email: PENDING");
                state.isLoading = true;
            })
            .addMatcher(authApi.endpoints.verifyEmail.matchFulfilled, (state, action) => {
                console.log("✅ Verify Email: FULFILLED", action.payload);
                console.log("📦 User:", action.payload.user);
                console.log("🔑 Token:", action.payload.approvalToken);
                
                state.user = action.payload.user;
                state.token = action.payload.approvalToken;
                state.isAuthenticated = true;
                state.isLoading = false;

                localStorage.setItem('authToken', action.payload.approvalToken);
                localStorage.setItem('user', JSON.stringify(action.payload.user));
                
                console.log("💾 Saved to localStorage");
                console.log("📊 New Auth State:", {
                    user: state.user,
                    token: state.token,
                    isAuthenticated: state.isAuthenticated
                });
            })
            .addMatcher(authApi.endpoints.verifyEmail.matchRejected, (state, action) => {
                console.log("❌ Verify Email: REJECTED", action);
                state.isLoading = false;
            })

            // Logout
            .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;

                localStorage.removeItem('authToken');
                localStorage.removeItem('user');
            });
    },
});

export const { setCredentials, updateUser, logout } = authSlice.actions;
export default authSlice.reducer;
