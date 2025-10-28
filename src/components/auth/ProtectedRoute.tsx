import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';

interface ProtectedRouteProps {
    children: ReactNode;
    /** Allowed user roles. If not specified, any authenticated user can access */
    allowedRoles?: ("buyer" | "seller" | "admin")[];
    /** Require email verification */
    requireVerified?: boolean;
    /** Custom redirect path (default: /login) */
    redirectTo?: string;
}

const ProtectedRoute = ({
    children,
    allowedRoles,
    requireVerified = false,
    redirectTo = '/login',
}: ProtectedRouteProps) => {
    const { user, isAuthenticated } = useAppSelector((state) => state.auth);
    const location = useLocation();

    // Check if user is authenticated
    if (!isAuthenticated || !user) {
        // Redirect to login, but save the attempted location
        return <Navigate to={redirectTo} state={{ from: location }} replace />;
    }

    // Check if user is blocked or deleted
    if (user.isBlocked) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Account Blocked</h1>
                    <p className="text-gray-700">
                        Your account has been blocked. Please contact support for assistance.
                    </p>
                </div>
            </div>
        );
    }

    if (user.isDeleted) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Account Deleted</h1>
                    <p className="text-gray-700">
                        This account has been deleted.
                    </p>
                </div>
            </div>
        );
    }

    // Check email verification if required
    if (requireVerified && !user.isVerified) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
                    <h1 className="text-2xl font-bold text-yellow-600 mb-4">Email Verification Required</h1>
                    <p className="text-gray-700 mb-4">
                        Please verify your email address to access this page.
                    </p>
                    <a
                        href="/verify-email"
                        className="inline-block px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
                    >
                        Verify Email
                    </a>
                </div>
            </div>
        );
    }

    // Check user role if specific roles are required
    if (allowedRoles && allowedRoles.length > 0) {
        if (!allowedRoles.includes(user.role)) {
            return (
                <div className="flex items-center justify-center min-h-screen bg-gray-100">
                    <div className="max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
                        <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
                        <p className="text-gray-700 mb-4">
                            You don't have permission to access this page.
                        </p>
                        <p className="text-sm text-gray-500">
                            Required role: {allowedRoles.join(' or ')}
                        </p>
                        <p className="text-sm text-gray-500 mb-4">
                            Your role: {user.role}
                        </p>
                        <a
                            href="/"
                            className="inline-block px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
                        >
                            Go Home
                        </a>
                    </div>
                </div>
            );
        }
    }

    // User is authenticated and authorized
    return <>{children}</>;
};

export default ProtectedRoute;
